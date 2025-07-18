import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("DECODED:", decoded);
    const user = await UserModel.findOne({ _id: decoded.userId });
    // console.log("USER:", user);
    req.user = user;
    next();
  } catch (err) {
    console.error(err);

    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
