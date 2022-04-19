import express, { Application, Request, Response } from "express";

const PORT = 3000;
const app: Application = express();

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
