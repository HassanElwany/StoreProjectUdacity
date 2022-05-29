import { Router } from "express";
import * as controllers from "../../controllers/usersControllers";

const routes = Router();

routes.post("/", controllers.create);

export default routes;
