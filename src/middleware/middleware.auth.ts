import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const handleAuth = (next: NextFunction) => {
  const error: Error = new Error("login Error: try again");
  next(error);
};

const validation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
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
          handleAuth(next);
        }
      } else {
        handleAuth(next);
      }
    } else {
      handleAuth(next);
    }
  } catch (error) {
    handleAuth(next);
  }
};

export default validation;
