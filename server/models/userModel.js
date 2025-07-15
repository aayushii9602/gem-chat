import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    mobile: { type: String, required: true, unique: true },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    otp: { type: String }, // hashed or plain for dev
    otpExpiresAt: { type: Date },
    password: { type: String },
    subscriptionExpiresAt: { type: Date },
    subscriptionTier: {
      type: String,
      enum: ["Basic", "Pro"],
      default: "Basic",
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
