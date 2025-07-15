# 💬 Gemini Chatroom Backend API

A secure, multi-user backend built with Node.js and Express for managing chatrooms, user authentication, Stripe-based subscriptions, and AI replies from Google Gemini API.

---

## 🚀 Features

- ✅ OTP-based user authentication
- ✅ JWT-protected routes
- ✅ Chatroom management & messaging
- ✅ Google Gemini API integration
- ✅ Stripe Checkout for subscription (sandbox)
- ✅ Subscription status tracking
- ✅ Modular controller, routes, and middleware setup

---

## 🧱 Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- Google Generative AI (Gemini)
- Stripe Checkout (sandbox)
- JWT

---

## 📁 Folder Structure
<img width="481" height="886" alt="image" src="https://github.com/user-attachments/assets/6a5dc242-6e7e-4def-870c-9bdc05337bbc" />

---

## 🔐 Environment Variables (`.env`)

## 🔐 Environment Variables (`.env`)

```env
PORT=2001

MONGO_URI=your_mongo_uri

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_google_gemini_api_key

STRIPE_SECRET_KEY=sk_test_...

STRIPE_PRO_PRICE_ID=price_...

STRIPE_WEBHOOK_SECRET=whsec_...

DOMAIN=http://localhost:3000
```

---

## 📬 API Routes

---

### ✅ Auth (`/api/v1/auth`)

| Method | Route             | Description                              |
|--------|-------------------|------------------------------------------|
| POST   | `/signup`         | Register a new user                      |
| POST   | `/send-otp`       | Send OTP for login/signup (**mocked**)   |
| POST   | `/verify-otp`     | Verify OTP and return JWT token          |
| POST   | `/change-password`| Change password (**JWT protected**)      |

---

### 💬 Chatroom (`/api/v1/chatroom`)

| Method | Route           | Description                           |
|--------|------------------|---------------------------------------|
| POST   | `/`              | Create a new chatroom                 |
| GET    | `/`              | List all chatrooms for user           |
| GET    | `/:id`           | Get chatroom details by ID            |
| POST   | `/:id/message`   | Send a message → receive AI reply     |

---

### 💳 Subscription (`/api/v1/subscription`)

| Method | Route               | Description                           |
|--------|---------------------|---------------------------------------|
| POST   | `/subscribe/pro`    | Create Stripe Checkout session        |
| POST   | `/webhook/stripe`   | Handle Stripe webhook events          |
| GET    | `/status`           | Get current user subscription status  |

---

# 🚀 Project Setup Guide

This guide explains how to set up the backend project, including environment configuration, dependencies, and how to get necessary API keys like Google Gemini and Stripe.

---

## 🛠️ Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or hosted e.g. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Stripe account ([https://dashboard.stripe.com/register](https://dashboard.stripe.com/register))
- Google Cloud account with Generative AI access

---

## 📁 Installation

```bash
git clone https://github.com/aayushii9602/gem-chat.git
cd server
npm install
```

## Add environment variables
PORT=2001
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret

GOOGLE_API_KEY=your_google_gemini_api_key

STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRO_PRICE_ID=price_...        # obtained from Stripe dashboard
STRIPE_WEBHOOK_SECRET=whsec_...      # from Stripe CLI (used for webhook verification)

DOMAIN=http://localhost:3000         # For Stripe redirect

---
## 🔑 How to Get API Keys

### 1. 🔐 Google Gemini API Key

- Go to [Google AI Studio](https://makersuite.google.com/app)
- Click your profile icon → **Get API key**
- Copy the API key and add it to your `.env` file as:

```env
GOOGLE_API_KEY=your_google_gemini_api_key
```


