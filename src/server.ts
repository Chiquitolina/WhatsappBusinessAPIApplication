import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { sendWhatsappMessage } from "./services/whatsAppService";
import appRouter from "./trcp/appRouter";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
  })
);

app.get("/", (req, res) => {
  sendWhatsappMessage("+54 341 312-8576", "request");
  res.send("Hola mundo!");
});

app.get("/whatsapp-webhook", (req, res) => {
  const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN;

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post("/whatsapp-webhook", (req, res) => {
  const entries = req.body.entry;

  for (const entry of entries) {
    for (const change of entry.changes) {
      if (change.field === "messages") {
        // Imprimir la estructura completa del objeto 'messages'
        console.log(
          "Messages:",
          JSON.stringify(change.value.messages, null, 2)
        );
      }
    }
  }
  res.status(200).send("Evento recibido");
});

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
