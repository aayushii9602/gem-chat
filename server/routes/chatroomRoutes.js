import express from "express";
import {
  createChatroom,
  getChatroom,
  getChatroomById,
  sendMessageToGemini,
} from "../controller/chatroomController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createChatroom);
router.get("/", authMiddleware, getChatroom);
router.get("/:id", authMiddleware, getChatroomById);
router.post("/:id/message", authMiddleware, sendMessageToGemini);

export default router;
