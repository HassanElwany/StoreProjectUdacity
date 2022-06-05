import { Router } from "express";
import {
  create,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  authentication,
} from "../../controllers/usersControllers";
import validation from "../../middleware/middleware.auth";

const userRoutes = Router();

userRoutes.get("/", validation, getUsers);

userRoutes.get("/:id", validation, getUser);

userRoutes.post("/", create);

userRoutes.post("");

userRoutes.route("/authentication").post(authentication);

export default userRoutes;
