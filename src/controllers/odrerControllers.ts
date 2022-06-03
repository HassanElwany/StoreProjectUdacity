import { Request, Response, NextFunction } from "express";
import OrderModel from "../models/order.model";
import Order from "../types/order.type";
import orderProducts from "../types/orderProducts.type";
const orderModel = new OrderModel();

// get all orders
const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await orderModel.getManyOrders();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// create order
const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      order_status: req.body.status,
    };
    const newOrder = await orderModel.createOrder(order);
    res.json(newOrder);
  } catch (err) {
    next(err);
  }
};

// get order by order_id

const gOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.getOrderById(
      req.params.id as unknown as number
    );
    res.json(order);
  } catch (err) {
    next(err);
  }
};

//get order by user_id

const gOrderByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await orderModel.getOrderByUserId(
      req.params.id as unknown as number
    );
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// delete order
const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedOrder = await orderModel.deleteOrder(
      req.params.id as unknown as number
    );
    res.json(deletedOrder);
  } catch (err) {
    next(err);
  }
};

//creat order of products

const createOrderOfProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order: orderProducts = {
      products_id: req.body.product_id,
      order_id: req.body.order_id,
      quantity: req.body.quantity,
    };
    const createdOrder = await orderModel.createOrderProducts(order);
    res.json(createdOrder);
  } catch (err) {
    next(err);
  }
};

// delete order of products
const deleteOrderOfProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedOrder = await orderModel.deleteOrderProducts(
      req.body.id as unknown as number
    );
    res.json(deletedOrder);
  } catch (err) {
    next(err);
  }
};

export {
  deleteOrder,
  deleteOrderOfProducts,
  createOrder,
  createOrderOfProducts,
  gOrderById,
  gOrderByUserId,
  getOrders,
};
