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


