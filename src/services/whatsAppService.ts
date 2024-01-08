import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function sendWhatsappMessage(phone: string, templateName: string) {
  const API_URL = `https://graph.facebook.com/v18.0/215258368329271/messages`;

  try {
    const response = await axios.post(
      API_URL,
      {
        messaging_product: "whatsapp",
        to: phone,
        type: "template",
        template: {
          name: templateName,
          language: {
            code: "en_US",
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error sending WhatsApp template message:", error);
    throw error;
  }
}
