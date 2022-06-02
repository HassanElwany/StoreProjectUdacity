import UserModel from "../user.model";
import db from "../../database";
import User from "../../types/user.type";

const userModel = new UserModel();

describe("user model", () => {
  describe("existence of the methods", () => {
    it("get users should exist", () => {
      expect(userModel.getMany).toBeDefined();
    });
    it("get user by id existence", () => {
      expect(userModel.getUserId).toBeDefined();
    });
    it("update user existence", () => {
      expect(userModel.updateUser).toBeDefined();
    });
    it("delete existence", () => {
      expect(userModel.deleteUserId).toBeDefined();
    });
    it("existence of creat methods", () => {
      expect(userModel.createUser).toBeDefined();
    });
    it("existence of auth", () => {
      expect(userModel.auth).toBeDefined();
    });
  });

  describe("testing model logic", () => {
    const userTest1 = {
      email: "test@test.com",
      user_name: "test",
      first_name: "testf",
      last_name: "testl",
      password: "test123",
    } as User;

    const userTest2 = {
      email: "test1@test.com",
      user_name: "test1",
      first_name: "testf",
      last_name: "testl",
      password: "test123",
    } as User;

    const updateUserTest1 = {
      email: "test0@test.com",
      user_name: "test",
      first_name: "testf",
      last_name: "testl",
      password: "test123",
      id: 1,
    } as User;

    beforeAll(async () => {
      await userModel.createUser(userTest1);
    });

    afterAll(async () => {
      const client = await db.connect();
      const sql =
        "ALTER SEQUENCE users_id_seq RESTART WITH 1;\n DELETE FROM users;";
      await client.query(sql);
      client.release();
    });

    it("testing create should return user", async () => {
      const user = await userModel.createUser(userTest2);
      expect(user.id).toEqual(2);
    });

    it("get many users tested should return array of users objects", async () => {
      const users = await userModel.getMany();
      expect(users[0].id).toEqual(1);
      expect(users[0].user_name).toEqual("test");
      expect(users.length).toBe(2);
    });

    it("tested get by id should return specific user by id", async () => {
      const user1 = await userModel.getUserId(1);
      const user2 = await userModel.getUserId(2);
      expect(user1.user_name).toBe("test");
      expect(user2.user_name).toBe("test1");
    });

    describe("Auth Module", () => {
      describe("Test methods exists", () => {
        it("should have Authenticate user", () => {
          expect(userModel.auth).toBeDefined();
        });
      });
    });
  });
});
