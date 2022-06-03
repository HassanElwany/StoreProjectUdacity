import { Router } from "express";
import usersRouter from "./routers/usersRouter";
import productsRouter from "./routers/productsRouter";
import orderRouter from "./routers/orderRouter";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/products", productsRouter);
routes.use("/orders", orderRouter);

export default routes;
