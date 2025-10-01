import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Generate token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Register
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) throw new ApiError(400, "Email already exists");

  const user = await User.create({ username, email, password });
  const token = generateToken(user._id);
  res.cookie("token", token, { httpOnly: true });
  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { id: user._id, username, email },
        "Registered successfully"
      )
    );
});

// Login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new ApiError(404, "User not found");

  const match = await user.comparePassword(password);
  if (!match) throw new ApiError(401, "Invalid credentials");

  const token = generateToken(user._id);
  res.cookie("token", token, { httpOnly: true });
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { id: user._id, username: user.username, email },
        "Login successful"
      )
    );
});
