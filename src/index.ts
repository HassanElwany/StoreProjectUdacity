import express, { application, Application, Request, Response } from "express";

const PORT = 3000;
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send(`Hello from express `);
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});

export default app;
