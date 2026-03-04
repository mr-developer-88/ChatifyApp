import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const { JWT_SECRET } = ENV;
    if(!JWT_SECRET) {
        console.error("JWT_SECRET is not configured!")
        return res.status(500).json({ message:"Server misconfiguration"})
    }
    let decoded;
    try {
        decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        const message = error.name === "TokenExpiredError" ? "Unauthorized - Token expired" : "Unauthorized - Invalid token";
        return res.status(401).json({ message: message
         });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = user;
    next();

  } catch (error) {
    console.log("Error in protectRoute middleware:", error.message);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};