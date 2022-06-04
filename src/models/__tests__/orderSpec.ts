import OrderModel from "../order.model";
import Order from "../../types/order.type";
import orderProducts from "../../types/orderProducts.type";

const orderModel = new OrderModel();

//testing existence of methods
it("get all orders ", () => {
  expect(orderModel.getManyOrders).toBeDefined();
});

it("get order by id", () => {
  expect(orderModel.getOrderById).toBeDefined();
});

it("get order by user id", () => {
  expect(orderModel.getOrderByUserId).toBeDefined();
});

it("create order", () => {
  expect(orderModel.createOrder).toBeDefined();
});

it(" delete order", () => {
  expect(orderModel.deleteOrder).toBeDefined();
});

it(" creat order products", () => {
  expect(orderModel.createOrderProducts).toBeDefined();
});

// testing functionality of methods

it("order created as ", async () => {
  const order: Order = await orderModel.createOrder({
    user_id: 1,
    order_status: "pending",
  });
  expect(order).toEqual({
    id: 1,
    user_id: 1,
    order_status: "pending",
  });
});

it("get all orders should return array of orders", async () => {
  const orders = await orderModel.getManyOrders();
  expect(orders.length).toBe(1);
});

it("create orderProducts should return order data", async () => {
  const createdOrder: orderProducts = await orderModel.createOrderProducts({
    order_id: 1,
    products_id: 1,
    quantity: 3,
  });
  expect(createdOrder).toEqual({
    id: 1,
    order_id: 1,
    products_id: 1,
    quantity: 3,
  });
});
