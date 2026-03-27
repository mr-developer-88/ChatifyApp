import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import { ENV } from "./env.js";

const isProd = ENV.NODE_ENV === "production";
const mode = "LIVE";
// const mode = isProd ? "LIVE" : "DRY_RUN";

const aj = arcjet({
  key: ENV.ARCJET_KEY,
  rules: [
    shield({ mode }),
    detectBot({
      mode,
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    slidingWindow({
      mode,
      max: 100,
      interval: 60,
    }),
  ],
});

export default aj;