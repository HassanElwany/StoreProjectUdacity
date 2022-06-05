import { Router } from "express";
import usersRoutes from "./routers/usersRouter";
import productsRouter from "./routers/productsRouter";
import orderRouter from "./routers/orderRouter";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/products", productsRouter);
routes.use("/orders", orderRouter);

export default routes;
