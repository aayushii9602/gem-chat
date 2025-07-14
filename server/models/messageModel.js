import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chatroom",
      required: true,
    },
    sender: { type: String, enum: ["user", "gemini"], required: true },
    content: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "completed",
    },
  },
  { timestamps: true }
);

export const MessageModel = mongoose.model("Message", messageSchema);
