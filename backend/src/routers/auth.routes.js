import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validate } from "../validators/validate.js";

const router = Router();

router.post(
  "/register",
  [
    body("username").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  validate,
  registerUser
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  validate,
  loginUser
);

export default router;
