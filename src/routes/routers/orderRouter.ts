import { Router } from "express";
import {
  deleteOrder,
  deleteOrderOfProducts,
  createOrder,
  createOrderOfProducts,
  gOrderById,
  gOrderByUserId,
  getOrders,
} from "../../controllers/odrerControllers";
import validation from "../../middleware/middleware.auth";

const routes = Router();

routes.get("/", validation, getOrders);
routes.get("/:id", validation, gOrderById);
routes.get("/users/:id", validation, gOrderByUserId);
routes.post("/", validation, createOrder);
routes.post("/products", validation, createOrderOfProducts);
routes.delete("/", validation, deleteOrder);
routes.delete("/products", validation, deleteOrderOfProducts);

export default routes;
