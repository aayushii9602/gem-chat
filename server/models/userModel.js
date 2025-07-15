import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    mobile: { type: String, required: true, unique: true },
    name: { type: String },
    otp: { type: String }, // hashed or plain for dev
    otpExpiresAt: { type: Date },
    password: { type: String },
    subscription: {
      type: String,
      enum: ["Basic", "Pro"],
      default: "Basic",
    },
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
