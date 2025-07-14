import { Queue } from "bullmq";
import { MessageModel } from "../models/messageModel";

// 1. Create queue instance
const messageQueue = new Queue("gemini-messages", { connection });

// 2. Exportable function to add a job
const addMessageToQueue = async (data) => {
  await messageQueue.add("process-message", data);
};

// 3. Gemini API mock function
const callGeminiAPI = async (prompt) => {
  return `Gemini says: ${prompt}`;
};

// 4. Create the worker to process jobs
const worker = new Worker(
  "gemini-messages",
  async (job) => {
    const { messageId } = job.data;

    const originalMessage = await MessageModel.findById(messageId);
    if (!originalMessage) return;

    const response = await callGeminiAPI(originalMessage.content);

    await Message.create({
      chatroom: originalMessage.chatroom,
      sender: "gemini",
      content: response,
      status: "completed",
    });

    await Message.updateOne({ _id: messageId }, { status: "completed" });
  },
  { connection }
);

// Optional: Handle worker errors
worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed:`, err);
});

module.exports = { addMessageToQueue };
