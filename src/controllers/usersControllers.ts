import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import UserModel from "../models/user.model";
import User from "../types/user.type";

const userModel = new UserModel();

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.createUser(req.body);
    res.status(200).send(`user created`);
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

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.body.id as unknown as number;
    const password = req.body.password as unknown as string;

    if (id === undefined || password === undefined) {
      res.status(400);
      res.send("ID or Password are missing");
      return false;
    }

    const user: User | null = await userModel.auth(id, password);
    const token = jwt.sign({ user: user }, config.tokenSecret as string);

    if (user === null) {
      res.status(401);
      res.send(`Wrong password for user with id ${id}.`);

      return false;
    }

    res.json(token);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

export { create, getUsers, getUser, updateUser, deleteUser, authentication };
