import { ChatroomModel } from "../models/chatroomModel";
import { MessageModel } from "../models/messageModel";

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
