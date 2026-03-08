import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import path from 'path';
import { connectDB } from './lib/db.js';
import { ENV } from './lib/env.js';
import cors from "cors"


const app = express();
const __dirname = path.resolve();

const PORT  = ENV.PORT || 3000;

app.use(express.json()); // req.body / for parsing application/json
app.use(cors({origin: ENV.CLIENT_URL, credentials: true}))
app.use(cookieParser()); // for parsing cookies

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes)



// make ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use((_, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
}


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
  } ).catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit with failure code
  });