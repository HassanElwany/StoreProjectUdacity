import supertest from "supertest";
import db from "../../database/index";
import app from "../../index";
import User from "../../types/user.type";
import UserModel from "../../models/user.model";
import Product from "../../types/product.type";
import ProductModel from "../../models/product.model";

const productModel = new ProductModel();

const userModel = new UserModel();

const request = supertest(app);

let token = "";

describe("Products routes responses", () => {
  const product: Product = {
    name: "book",
    price: 5,
  };

  const user: User = {
    email: "test@gmail.com",
    user_name: "tsetuser",
    first_name: "ts",
    last_name: "tester",
    password: "ts1234",
  };

  beforeAll(async () => {
    await productModel.createProduct(product);
    await userModel.createUser(user);
    const response = await request
      .post("/routers/users/authentication")
      .set("Content-type", "application/json")
      .send({ user_name: "tsetuser", password: "ts1234" });
    token = response.body.token;
  });

  afterAll(async () => {
    const client = await db.connect();
    const sql =
      "ALTER SEQUENCE products_id_seq RESTART WITH 1;\n DELETE FROM products;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n DELETE FROM users;";
    await client.query(sql);
    client.release();
  });

  it("creation test", async (): Promise<void> => {
    const response = await request
      .post("/routers/products")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "laptop",
        price: 30,
      });
    expect(response.status).toBe(200);
    const bodyData = response.body.data;
    expect(bodyData.id).toEqual(2);
    expect(bodyData.price).toEqual(30);
  });
});
