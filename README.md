# ChatifyApp 💬

An enterprise-grade, real-time chat application built with the **MERN** stack and **Socket.io**. Designed for seamless communication with a focus on premium UI/UX, robust performance, and rock-solid security.

---

## ✨ Features

- **Real-Time Messaging**: Lightning-fast, instant messaging powered by Socket.io.
- **Unread Notifications**: Live chat badges and unread message counters with dynamic sorting (latest messages float to the top).
- **Premium UI/UX**: Edge-to-edge, fully responsive glassmorphic design utilizing DaisyUI and TailwindCSS. Fully optimized for Mobile, Tablet, and Desktop screens.
- **Image Sharing**: Optimized image uploads via Cloudinary (auto-format, auto-quality compression).
- **Secure Authentication**: JWT-based secure authentication.
- **Optimized Performance**: Frontend code-splitting with `React.lazy`, `Suspense`, and heavy-component memoization (`React.memo`).
- **Enterprise Security**: Hardened backend protected by Arcjet, Helmet.js, and Express Rate Limiting to prevent XSS, DDoS, and brute-force attacks.
- **Online Presence**: See exactly who is online in real-time.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **Zustand** (Global State Management)
- **TailwindCSS** + **DaisyUI** (Styling & Theming)
- **React Router DOM** (Navigation)
- **Lucide React** (Icons)

### Backend
- **Node.js** & **Express.js**
- **MongoDB** & **Mongoose** (Database & ODM, Advanced Aggregation Pipelines)
- **Socket.io** (Real-time bi-directional event-based communication)
- **Cloudinary** (Media storage and optimization)
- **Helmet.js** & **Express Rate Limit** (Security)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- A [Cloudinary](https://cloudinary.com/) account for image uploads.

### Environment Variables
Create a `.env` file in the `backend` directory and add the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development

# Cloudinary Setup
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ChatifyApp.git
   cd ChatifyApp
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the Frontend development server:**
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`.

---

## 📈 Future Enhancements for Maintenance

To maintain this project professionally and keep expanding it, consider adding:
1. **Group Chats**: Extend the schema to support multiple users in a single room.
2. **Typing Indicators**: Emit `typing` and `stopTyping` socket events.
3. **Read Receipts (Double Ticks)**: Track when a specific message is viewed by the recipient.
4. **Message Deletion/Editing**: Allow users to un-send or fix typos in messages.
5. **Push Notifications**: Integrate Firebase Cloud Messaging (FCM) or browser service workers.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/ChatifyApp/issues).

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
