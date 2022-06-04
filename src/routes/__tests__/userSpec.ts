import supertest from "supertest";
import db from "../../database/index";
import UserModel from "../../models/user.model";
import User from "../../types/user.type";
import app from "../../index";

const userModel = new UserModel();
const request = supertest(app);
let token = "";

describe("user routers endPoints", () => {
  const user = {
    email: "hassan@hassan.com",
    user_name: "hasa",
    first_name: "n",
    last_name: "m",
    password: "nm1234",
  } as User;
  beforeAll(async () => {
    const userCreated = await userModel.createUser(user);
    user.id = userCreated.id;
  });

  afterAll(async () => {
    const client = await db.connect();
    const sql =
      "ALTER SEQUENCE users_id_seq RESTART WITH 1;\n DELETE FROM users;";
    await client.query(sql);
    client.release();
  });

  describe("validate method", () => {
    it(" should be to get token", async () => {
      const res = await request
        .post("routers/users/authentication")
        .set("content-type", "application/json")
        .send({
          email: "hassan@hassan.com",
          password: "nm1234",
        });
      expect(res.status).toBe(200);
      const { id, email, token: userToken } = res.body.data;
      expect(email).toBe("hassan@hassan.com");
      expect(id).toBe(user.id);
      token = userToken;
    });

    it("should failed test with another email", async () => {
      const res = await request
        .post("routers/users/authentication")
        .set("content-type", "application/json")
        .send({
          email: "hasn@hassan.com",
          password: "nm1234",
        });
      expect(res.status).toBe(401);
    });
  });
});
