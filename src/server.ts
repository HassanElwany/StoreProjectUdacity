import express, { Application } from "express";

const app: Application = express();
const PORT = 3000;
//starting for server

app.listen(PORT, () => {
  console.log(`server is runing on port: ${PORT}`);
});

export default app;
