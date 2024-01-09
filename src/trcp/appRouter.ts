import { router } from "./trcp";
import { consentRouter } from "./routers/requestConsentRouter";

const appRouter = router({
  consent: consentRouter,
});

export default appRouter;
