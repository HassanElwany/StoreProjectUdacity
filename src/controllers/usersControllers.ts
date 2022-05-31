import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";

const userModel = new UserModel();

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.createUser(req.body);
    res.status(200).send(`user created`);
    console.log(user);
    return user;
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.getMany();
    res.json({
      status: "success",
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.getUserId(req.params.id as unknown as number);
    res.json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.updateUser(req.body);
    res.json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.deleteUserId(
      req.params.id as unknown as number
    );
    res.json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export { create, getUsers, getUser, updateUser, deleteUser };
