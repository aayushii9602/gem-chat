import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";

dotenv.config();

// In-memory OTP store
const otpStore = new Map();

// Generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Create JWT token
function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

// /auth/signup
export async function signup(req, res) {
  try {
    const { mobile, name } = req.body;
    if (!mobile)
      return res.status(400).json({ message: "Mobile number is required" });

    let user = await UserModel.findOne({ mobile });
    if (user)
      return res.status(200).json({ message: "User already exists", user });

    user = await UserModel.create({ mobile, name });
    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// /auth/send-otp
export async function sendOTP(req, res) {
  const { mobile } = req.body;
  if (!mobile)
    return res.status(400).json({ message: "Mobile number is required" });

  const otp = generateOTP();
  const expiresAt = Date.now() + 3 * 60 * 1000;
  otpStore.set(mobile, { otp, expiresAt });

  // For demo, return OTP in response
  return res.status(200).json({ message: "OTP generated", otp });
}

// /auth/verify-otp
export async function verifyOTP(req, res) {
  const { mobile, otp } = req.body;
  const record = otpStore.get(mobile);

  if (!record) return res.status(400).json({ message: "No OTP found" });
  if (Date.now() > record.expiresAt) {
    otpStore.delete(mobile);
    return res.status(400).json({ message: "OTP expired" });
  }
  if (record.otp !== otp)
    return res.status(400).json({ message: "Invalid OTP" });

  const user = await UserModel.findOne({ mobile });
  if (!user) return res.status(404).json({ message: "User not found" });

  const token = generateToken(user._id);
  otpStore.delete(mobile);

  return res.status(200).json({ message: "OTP verified", token });
}

// /auth/forgot-password
export async function forgotPassword(req, res) {
  const { mobile } = req.body;
  const user = await UserModel.findOne({ mobile });
  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = generateOTP();
  const expiresAt = Date.now() + 3 * 60 * 1000;
  otpStore.set(mobile, { otp, expiresAt });

  return res.status(200).json({ message: "OTP sent for password reset", otp });
}

// /auth/change-password (requires auth middleware)
export async function changePassword(req, res) {
  try {
    const userId = req.user._id;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 4)
      return res
        .status(400)
        .json({ message: "Password must be at least 4 characters" });

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
