import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "../src/routers/auth.routes.js";
import dataRoutes from "../src/routers/data.routes.js";
import { errorMiddleware } from "../src/middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/data", dataRoutes);
app.use(errorMiddleware);

export { app };
