import express, { application, Application, Request, Response } from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import middlewareErr from "./middleware/middleware.err";
import cors from "cors";
import config from "./config";
import routes from "./routes/index";
const PORT = config.port || 3000;

const app: Application = express();

app.use(express.json());
app.use(helmet());
app.use(bodyParser.json());
const corsOptions = {
  origin: "http://otherdomain.com",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/routers", routes);

app.get("/", (req: Request, res: Response) => {
  res.send(`Hello from express `);
});

app.use(middlewareErr);

app.use((req: Request, res: Response) => {
  res.status(400).json({
    message: `the page you searching for it doesn't exist`,
  });
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});

export default app;
