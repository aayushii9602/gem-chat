import mongoose from "mongoose";

const chatroomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const ChatroomModel = mongoose.model("Chatroom", chatroomSchema);
