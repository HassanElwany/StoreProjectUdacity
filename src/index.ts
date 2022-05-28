import express, { application, Application, Request, Response } from "express";
import helmet from "helmet";
import middlewareErr from "./middleware/middleware.err";
import config from "./config";
import db from "./database";

const PORT = config.port || 3000;

const app: Application = express();

app.use(express.json());
app.use(helmet());

app.get("/", (req: Request, res: Response) => {
  res.send(`Hello from express `);
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});

//testing db
db.connect().then((client) => {
  return client
    .query("SELECT NOW()")
    .then((res) => {
      client.release();
      console.log(res.rows);
    })
    .catch((err) => {
      client.release();
      console.log(err.stack);
    });
});

app.use(middlewareErr);

app.use((req: Request, res: Response) => {
  res.status(400).json({
    message: `the page you searching for it doesn't exist`,
  });
});
export default app;
