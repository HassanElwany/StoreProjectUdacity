import { Request, Response, NextFunction } from "express";
import Error from "../interface/interface.err";

const middlewareErr = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || `Something is fail`;
  res.status(status).json({ status, message });
};

export default middlewareErr;
