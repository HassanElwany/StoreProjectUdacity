import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import Product from "../types/product.type";
import ProductModel from "../models/product.model";

const productModel = new ProductModel();

const getAllProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productModel.getMany();
    res.json({
      status: "success",
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };
    const result = await productModel.createProduct(product);
    res.json({
      status: "success",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productModel.getProductId(
      req.params.id as unknown as number
    );
    res.json({
      status: "success",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedProduct: Product = {
      name: req.body.name,
      price: req.body.price,
    };
    const updatedProcess = await productModel.updateProduct(
      req.body.id,
      updatedProduct
    );
    res.json({
      status: "success",
      data: updatedProcess,
    });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedProduct = await productModel.deleteProductId(
      req.params.id as unknown as number
    );
    res.json({
      status: "success",
      data: deletedProduct,
    });
  } catch (err) {
    next(err);
  }
};

export {
  getAllProduct,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
