import dotenv, { config } from "dotenv";

dotenv.config();

const {
  PORT,
  ENV,
  postgres_HOST,
  postgres_PORT,
  postgres_DB,
  postgres_DB_TEST,
  postgres_USER,
  postgres_PASSWORD,
  BCRYPT,
  SALT_ROUNDS,
  TOKEN_SECRET,
} = process.env;

export default {
  port: PORT,
  host: postgres_HOST,
  dbPort: postgres_PORT,
  database: ENV === "dev" ? postgres_DB : postgres_DB_TEST,
  user: postgres_USER,
  password: postgres_PASSWORD,
  pepper: BCRYPT,
  salt: SALT_ROUNDS,
  tokenSecret: TOKEN_SECRET,
};
