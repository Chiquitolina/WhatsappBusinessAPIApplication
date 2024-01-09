import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { router } from "./trcp/appRouter";
import { sendWhatsappMessage } from "./services/whatsAppService";

const app = express();

app.use(express.json());

const appRouter = router({
  // ...
});

app.get("/", (req, res) => {
  sendWhatsappMessage("+54 341 312-8576", "request");
  res.send("Hola mundo!");
});

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
