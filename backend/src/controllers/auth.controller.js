import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    const name = typeof fullName === "string" ? fullName.trim() : "";
    const noremalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const pass = typeof password === "string" ? password : "";

    try {
        if (!name || !noremalizedEmail || !pass) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (pass.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(noremalizedEmail)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email: noremalizedEmail });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName: name,
            email: noremalizedEmail,
            password: hashedPassword,
        });


        if (newUser) {
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);

            // ✅ send email BEFORE returning response
            try {
                await sendWelcomeEmail(
                    savedUser.email,
                    savedUser.fullName,
                    ENV.CLIENT_URL
                );
            } catch (error) {
                console.error("Failed to send welcome email:", error.message);
            }

            return res.status(201).json({
                _id: savedUser._id,
                fullName: savedUser.fullName,
                email: savedUser.email,
                profilePic: savedUser.profilePic,
            });
        }

    } catch (error) {
        console.log("Signup Error:", error);
        return res.status(500).json({ error: error.message });
    }
};