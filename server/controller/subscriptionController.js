import Stripe from "stripe";
import dotenv from "dotenv";
import { UserModel } from "../models/userModel.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const DOMAIN = process.env.DOMAIN;

// 1. Start Checkout Session
export async function createStripeCheckoutSession(req, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRO_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN}/cancel`,
      customer_email: req.user.email,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error);
    return res
      .status(500)
      .json({ message: "Failed to create checkout session" });
  }
}

// 2. Stripe Webhook (event listener)
export async function handleStripeWebhook(req, res) {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle event type
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log("session", session);
    const email = session.customer_details.email;
    console.log("email", email);

    // Mark user as Pro
    await UserModel.findOneAndUpdate({ email }, { subscriptionTier: "Pro" });
    console.log(`✔️ Subscription activated for ${email}`);
  }

  res.status(200).json({ received: true });
}

// 3. Get Subscription Tier
export async function getSubscriptionStatus(req, res) {
  try {
    const user = await UserModel.findOne({ _id: req.user._id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      subscriptionTier: user.subscriptionTier || "Basic",
    });
  } catch (err) {
    console.error("Get subscription error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
