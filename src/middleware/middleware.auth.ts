import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const validation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const decode = jwt.verify(token, config.tokenSecret as unknown as string);

      if (decode) {
        next();
      } else {
        const err = `Token is not valid`;
        res.status(401);
        next(err);
      }
    } else {
      const err = `Token is not exist`;
      res.status(401);
      next(err);
    }
  } catch (error) {
    const err = `Auth Error`;
    res.status(401);
    next(err);
  }
};

export default validation;
