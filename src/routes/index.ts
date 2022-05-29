import { Router } from "express";
import usersRouter from "./routers/usersRouter";

const routes = Router();

routes.use("/users", usersRouter);

export default routes;
