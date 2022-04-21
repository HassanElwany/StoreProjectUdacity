import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config";
import db from "./database";
console.log(config);

const PORT = config.port || 3000;
const app: Application = express();

app.use(morgan("common"));

app.use(express.json());

app.use(helmet());

// db test
db.connect().then((client) => {
  return client
  .query('SELECT NOW()').then((res) =>{
    client.release();
    console.log(res.rows);
  })
  .catch((err) => {
    client.release();
    console.log(err.stack);
  });
});

//starting for server
app.get("/", (req: Request, res: Response) => {
  res.json({
    massage: "Hello Hassan",
  });
});
app.listen(PORT, () => {
  console.log(`server is runing on port: ${PORT}`);
});

export default app;
