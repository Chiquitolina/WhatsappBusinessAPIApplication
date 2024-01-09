import { sendWhatsappMessage } from "../../services/whatsAppService";
import { router, publicProcedure } from "../trcp";
import { z } from "zod";

export const consentRouter = router({
  requestConsent: publicProcedure
    .input(
      z.object({
        phoneNumber: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { phoneNumber } = input;
      const templateName = "request";
      const response = await sendWhatsappMessage(phoneNumber, templateName);

      return response;
    }),
});
