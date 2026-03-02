import "dotenv/config";

export const ENV = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV || "development",
    CLIENT_URL: process.env.CLIENT_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
}

// PORT=3000
// MONGO_URI=mongodb+srv://patriotaasim123_db_user:dMhwyuO9IxlXp14a@cluster0.ooksh8n.mongodb.net/?appName=Cluster0

// NODE_ENV=development

// JWT_SECRET=your_jwt_secret_key

// RESEND_API_KEY=re_QGpXSs2X_MhQ2vQPj63xAWyjsbJ39xWfv

// EMAIL_FROM=onboarding@resend.dev
// EMAIL_FROM_NAME=DevTeamChatify

// CLIENT_URL=http://localhost:5173