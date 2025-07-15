import express from "express";
import {
  createStripeCheckoutSession,
  handleStripeWebhook,
  getSubscriptionStatus,
} from "../controller/subscriptionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/subscribe/pro", authMiddleware, createStripeCheckoutSession);
router.post(
  "/webhook/stripe",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);
router.get("/status", authMiddleware, getSubscriptionStatus);

export default router;
