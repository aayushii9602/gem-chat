import { ChatroomModel } from "../models/chatroomModel.js";
import { MessageModel } from "../models/messageModel.js";
// import addMessageToQueue from "../queues/messageQueue.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

/* GEMINI connection */
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* HELPER FUCNTIONS */
const callGeminiAPI = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Gemini couldn't respond.";
  }
};

/* CORE APIS */

export async function createChatroom(req, res, next) {
  try {
    const chatroom = await ChatroomModel.create({
      name: req.body.name,
      user: req.user._id,
    });

    return res.status(201).json({ success: true, data: chatroom });
  } catch (err) {
    next(err);
  }
}

export async function getChatroom(req, res, next) {
  try {
    const chatrooms = await ChatroomModel.find({ user: req.user._id });
    res.status(200).json({ success: true, data: chatrooms });
  } catch (err) {
    next(err);
  }
}

export async function getChatroomById(req, res, next) {
  try {
    const chatroom = await ChatroomModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!chatroom) {
      return res
        .status(404)
        .json({ success: false, message: "Chatroom not found" });
    }

    const messages = await MessageModel.find({ chatroom: chatroom._id }).sort({
      createdAt: 1,
    });

    res.status(200).json({ success: true, data: { chatroom, messages } });
  } catch (err) {
    next(err);
  }
}


export const sendMessageToGemini = async (req, res) => {
  try {
    const { content } = req.body;
    const chatroomId = req.params.id;

    const chatroom = await ChatroomModel.findOne({ _id: chatroomId, user: req.user._id });
    if (!chatroom) {
      return res.status(404).json({ success: false, message: 'Chatroom not found' });
    }

    // Save user message
    const userMessage = await MessageModel.create({
      chatroom: chatroomId,
      sender: 'user',
      content,
      status: 'completed',
    });

    // Get Gemini response directly
    const geminiReply = await callGeminiAPI(content);

    // Save Gemini response
    const botMessage = await MessageModel.create({
      chatroom: chatroomId,
      sender: 'gemini',
      content: geminiReply,
      status: 'completed',
    });

    return res.status(200).json({
      success: true,
      message: 'Message processed with Gemini',
      data: { userMessage, botMessage },
    });
  } catch (error) {
    console.error('Error sending message to Gemini:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// export async function sendMessageToChatroom(req, res, next) {
//   try {
//     const chatroom = await ChatroomModel.findOne({
//       _id: req.params.id,
//       user: req.user._id,
//     });

//     if (!chatroom) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Chatroom not found" });
//     }

//     // 1. Save user message
//     const userMessage = await MessageModel.create({
//       chatroom: chatroom._id,
//       sender: "user",
//       content: req.body.content,
//       status: "pending",
//     });

//     // 2. Add job to queue
//     await addMessageToQueue({ messageId: userMessage._id });

//     // 3. Respond immediately with user message
//     res.status(201).json({ success: true, data: userMessage });
//   } catch (err) {
//     next(err);
//   }
// }
