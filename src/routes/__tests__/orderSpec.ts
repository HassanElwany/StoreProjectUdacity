import supertest from "supertest";
import app from "../../index";
import db from "../../database/index";
import User from "../../types/user.type";
import UserModel from "../../models/user.model";
import Product from "../../types/product.type";
import ProductModel from "../../models/product.model";
import Order from "../../types/order.type";
import OrderModel from "../../models/order.model";

const productModel = new ProductModel();

const userModel = new UserModel();

const orderModel = new OrderModel();

const request = supertest(app);

let token = "";

describe("Test orders routes responses", () => {
  const order1: Order = { order_status: "active", user_id: 1 };
  const order2: Order = { order_status: "complete", user_id: 1 };

  const user: User = {
    email: "test@gmail.com",
    user_name: "tsetuser",
    first_name: "ts",
    last_name: "tester",
    password: "ts1234",
  };
  const product: Product = {
    name: "book",
    price: 5,
  };

  beforeAll(async () => {
    await userModel.createUser(user);
    await productModel.createProduct(product);
    await orderModel.createOrder(order1);
    await orderModel.createOrder(order2);
    const response = await request
      .post("/routers/users/authentication")
      .set("Content-type", "application/json")
      .send({ user_name: "tsetuser", password: "ts1234" });
    token = response.body.token;
  });

  afterAll(async () => {
    const client = await db.connect();
    const sql =
      "ALTER SEQUENCE users_id_seq RESTART WITH 1;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n ALTER SEQUENCE order_products_id_seq RESTART WITH 1;\n DELETE FROM order_products;\n DELETE FROM orders;\n DELETE FROM products;\n DELETE FROM users;";
    await client.query(sql);
    client.release();
  });
  it("Tests INDEX route response", async (): Promise<void> => {
    const response = await request
      .get("/api/orders/1")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    const bodyData = response.body.data;
    expect(bodyData[0].id).toEqual(1);
    expect(bodyData[0].status).toEqual("active");
    expect(bodyData[0].user_id).toEqual(1);
    expect(bodyData[1].id).toEqual(2);
    expect(bodyData[1].status).toEqual("complete");
    expect(bodyData[1].user_id).toEqual(1);
    expect(bodyData.length).toEqual(2);
  });

  it("Tests GET COMPLETED ORDERS route response", async (): Promise<void> => {
    const response = await request
      .get("/api/orders/completed/1")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    const bodyData = response.body.data;
    expect(bodyData[0].id).toEqual(2);
    expect(bodyData[0].status).toEqual("complete");
    expect(bodyData[0].user_id).toEqual("1");
    expect(bodyData.length).toEqual(1);
  });
});
