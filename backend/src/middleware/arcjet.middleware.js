import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ message: "Rate limit exceed, Please try again later." });
            }
            else if (decision.reason.isBot()) {
                return res.status(403).json({ message: "Bots are not allowed to access this resource." });
            } else {
                return res.status(403).json({ message: "Access denied by security policy." });
            }
        }

        // check for spoofed bot
        if(decision.results.some(isSpoofedBot)) {
            return res.status(403).json({
                error: "Access denied due to suspected bot activity. If you believe this is an error, please contact support.",
                message: "Malicious bot activity detected. Access denied."
            })
        }

        next();
    } catch (error) {
        console.log("Error in Arcjet middleware:", error);
        next();
    }
}