import express from "express";
import {
  signup,
  sendOTP,
  verifyOTP,
  forgotPassword,
  changePassword,
} from "../controller/userController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/signup", signup); // Register user
router.post("/send-otp", sendOTP); // Send login OTP
router.post("/verify-otp", verifyOTP); // Verify OTP and get JWT
router.post("/forgot-password", forgotPassword); // Send OTP for password reset

// Protected routes
router.post("/change-password", authMiddleware, changePassword); // Change password

export default router;
