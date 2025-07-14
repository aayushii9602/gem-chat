import express from "express";
import {
  createChatroom,
  getChatroom,
  getChatroomById,
} from "../controller/chatroomController.js";
const router = express.Router();

router.post("/", authMiddleware, createChatroom);
router.get("/", authMiddleware, getChatroom);
router.get("/:id", authMiddleware, getChatroomById);

export default router;
