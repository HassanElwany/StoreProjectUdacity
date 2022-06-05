import db from "../database/index";
import User from "../types/user.type";
import bcrypt from "bcrypt";
import config from "../config";
import { Connection } from "pg";

const hashedPass = (password: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};

class UserModel {
  // create new user
  async createUser(user: User): Promise<User> {
    try {
      const client = await db.connect();
      const sql = `INSERT INTO users (email, user_name, first_name, last_name, password)
            values($1, $2, $3, $4, $5) RETURNING id, email, user_name`;
      const result = await client.query(sql, [
        user.email,
        user.user_name,
        user.first_name,
        user.last_name,
        hashedPass(user.password),
      ]);
      client.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`user creation failed: ${err}`);
    }
  }

  async getMany(): Promise<User[]> {
    try {
      const client = await db.connect();
      const sql = `SELECT id, email, user_name, first_name, last_name FROM users`;
      const result = await client.query(sql);
      client.release();
      return result.rows;
    } catch (err) {
      throw new Error(`can't get users ${(err as Error).message}`);
    }
  }

  async getUserId(id: number): Promise<User> {
    try {
      const client = await db.connect();
      const sql = `SELECT id, email, user_name, first_name, last_name FROM users WHERE id=($1)`;
      const result = await client.query(sql, [id]);
      client.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `user id number ${id} doesn't exist or something wrong ${
          (err as Error).message
        }`
      );
    }
  }
  async updateUser(user: User): Promise<User> {
    try {
      const client = await db.connect();
      const sql = `UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5
      WHERE id=$6
      RETURNING id, email, user_name, first_name, last_name`;

      const result = await client.query(sql, [
        user.email,
        user.user_name,
        user.first_name,
        user.last_name,
        hashedPass(user.password),
        user.id,
      ]);
      client.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `can not update user ${user.user_name}, Error: ${
          (err as Error).message
        }`
      );
    }
  }

  async deleteUserId(id: number): Promise<User> {
    try {
      const client = await db.connect();
      const sql = `DELETE FROM users
                    WHERE id=($1)
                    RETURNING id, email, user_name, first_name, last_name`;
      const result = await client.query(sql, [id]);
      client.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `can not delete user which has id num: ${id}, ${(err as Error).message}`
      );
    }
  }

  async auth(id: number, password: string): Promise<User | null> {
    const client = await db.connect();
    const sql = `SELECT * FROM users WHERE id=($1)`;
    const result = await client.query(sql, [id]);
    if (result.rows.length) {
      const user = result.rows[0];
      console.log(user);

      if (bcrypt.compareSync(password + config.pepper, user.password)) {
        console.log("success");
        return user;
      }
    }
    console.log("password failed");
    return null;
  }
}

export default UserModel;
