import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola mundo!");
});

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
