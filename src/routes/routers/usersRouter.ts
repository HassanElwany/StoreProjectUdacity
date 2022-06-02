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

const routes = Router();

routes.route("/").get(validation, getUsers).post(create);

routes
  .route("/:id")
  .get(validation, getUser)
  .patch(validation, updateUser)
  .delete(validation, deleteUser);
routes.route("/authentication").post(authentication);

export default routes;
