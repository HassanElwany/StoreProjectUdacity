import db from "../database/index";
import Order from "../types/order.type";
import orderProducts from "../types/orderProducts.type";
import ProductModel from "./product.model";

class OrderModel {
  // creating order
  async createOrder(order: Order): Promise<Order> {
    try {
      const client = await db.connect();
      const sql = `INSERT INTO orders (user_id, order_status) VALUES($1, $2) RETURNING *`;
      const result = await client.query(sql, [
        order.user_id,
        order.order_status,
      ]);
      client.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `product creation failed, messageError: ${(err as Error).message}`
      );
    }
  }
  // get array of orders
  async getManyOrders(): Promise<Order[]> {
    try {
      const client = await db.connect();
      const sql = `SELECT * FROM orders`;
      const result = await client.query(sql);
      client.release();
      return result.rows;
    } catch (err) {
      throw new Error(`can't get products ${(err as Error).message}`);
    }
  }

  // get specific order by their unique id
  async getOrderById(id: number): Promise<Order> {
    try {
      const client = await db.connect();
      const sql = `SELECT * FROM orders WHERE id=($1)`;
      const result = await client.query(sql, [id]);
      client.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Order id number ${id} doesn't exist or something wrong ${
          (err as Error).message
        }`
      );
    }
  }

  //get orders for specific user by user id num
  async getOrderByUserId(id: number): Promise<Order[]> {
    try {
      const client = await db.connect();
      const sql = `SELECT * FROM orders WHERE user_id=($1)`;
      const result = await client.query(sql, [id]);
      client.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `can not fetch orders for this user. Error: ${(err as Error).message}`
      );
    }
  }

  //delete an order by id
  async deleteOrder(id: number): Promise<Order> {
    try {
      const client = await db.connect();
      const sql = `DELETE FROM orders WHERE id=($1) Returning *`;
      const result = await client.query(sql, [id]);
      client.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `can not delete order which has id num: ${id}, ${
          (err as Error).message
        }`
      );
    }
  }

  // create an order from products
  async createOrderProducts(order: orderProducts): Promise<orderProducts> {
    try {
      const client = await db.connect();
      const sql = `SELECT INTO order-products(quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING products_id, quantity`;
      const result = await client.query(sql, [
        order.quantity,
        order.order_id,
        order.products_id,
      ]);
      client.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `cannot make a new order right now, Error: ${(err as Error).message}`
      );
    }
  }

  //delete order has already products
  async deleteOrderProducts(id: number): Promise<orderProducts> {
    try {
      const client = await db.connect();
      const sql = `DELETE FROM order-products WHERE id=($1) RETURNING *`;
      const result = await client.query(sql, [id]);
      client.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `cannot delete order right now, Error: ${(err as Error).message}`
      );
    }
  }
}

export default OrderModel;
