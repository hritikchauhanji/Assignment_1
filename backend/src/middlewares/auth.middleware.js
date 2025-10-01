import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new ApiError(401, "Not authorized");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return next(new ApiError(401, "Invalid or expired token"));
  }
};
