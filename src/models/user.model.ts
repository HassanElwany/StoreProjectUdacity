import db from "../database/index";
import User from "../types/user.type";

class UserModel {
  // create new user
  async createUser(u: User): Promise<User> {
    try {
      const client = await db.connect();
      const sql = `INSERT INTO users (email, user_name, first_name, last_name, password)
            values($1, $2, $3, $4, $5) returning *`;
      const result = await client.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        u.password,
      ]);
      client.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`user creation failed: ${err}`);
    }
  }
}

export default UserModel;
