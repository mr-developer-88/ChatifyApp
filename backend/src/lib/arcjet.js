import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import { ENV } from "./env.js";

const mode = (ENV.ARCJET_ENV === "production" ? "LIVE" : "DRY_RUN");
const aj = arcjet({
    key: ENV.ARCJET_KEY,
    rules: [
        shield({ mode }),
        detectBot({
            mode,
            allow: [
                "CATEGORY:SEARCH_ENGINE", 
            ],
        }),
        slidingWindow({
            mode,
            max: 100,
            interval: 60
        })
    ],
});

export default aj;