import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import Error from "../interface/interface.err";

const handelUnauth = (next: NextFunction) => {
  const error: Error = new Error("login Error: try again");
  error.status = 401;
  next(error);
};

const validation = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get("Authorization");
    if (authHeader) {
      const bearer = authHeader.split(" ")[0].toLowerCase();
      const token = authHeader.split(" ")[1];
      if (token && bearer === "bearer") {
        const decode = jwt.verify(
          token,
          config.tokenSecret as unknown as string
        );
        if (decode) {
          next();
        } else {
          handelUnauth(next);
        }
      } else {
        handelUnauth(next);
      }
    } else {
      handelUnauth(next);
    }
  } catch (error) {
    handelUnauth(next);
  }
};

export default validation;
