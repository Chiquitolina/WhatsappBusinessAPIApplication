import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { sendWhatsappMessage } from "./services/whatsAppService";
import appRouter from "./trcp/appRouter";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  sendWhatsappMessage("+54 341 312-8576", "request");
  res.send("Hola mundo!");
});

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
