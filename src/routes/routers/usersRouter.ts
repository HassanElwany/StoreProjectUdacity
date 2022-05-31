import { Router } from "express";
import {
  create,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../../controllers/usersControllers";

const routes = Router();

routes.route("/").get(getUsers).post(create);

routes.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default routes;
