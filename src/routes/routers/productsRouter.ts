import { Router } from "express";
import {
  getAllProduct,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../../controllers/productControllers";
import validation from "../../middleware/middleware.auth";

const routes = Router();

routes.route("/").get(getAllProduct).post(validation, createProduct);

routes
  .route("/:id")
  .get(getProductById)
  .patch(validation, updateProduct)
  .delete(validation, deleteProduct);

export default routes;
