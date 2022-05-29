import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";

const userModel = new UserModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.createUser(req.body);
    res.status(200).send(`user created`);
    return user;
  } catch (err) {
    next(err);
  }
};
