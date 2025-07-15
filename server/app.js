import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConfig.js";
import userRoutes from "./routes/userRoutes.js";
import chatroomRoutes from "./routes/chatroomRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";

// Load environment variables from a .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// router middleware
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chatroom", chatroomRoutes);
app.use("/api/v1/subscription", subscriptionRoutes);

export default app;
