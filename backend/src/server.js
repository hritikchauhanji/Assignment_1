import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import serverless from "serverless-http";

// dotenv.config({
//   path: "./env",
// });

dotenv.config(); // default .env or Vercel environment variables

// connectDB()
//   .then(() => {
//     app.listen(process.env.PORT || 8000, () => {
//       console.log(`Server is running at port : ${process.env.PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log("MONGO db connection failed !!! ", err);
//   });

// for vercel
let isConnected = false;
const connect = async () => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (err) {
      console.error("MongoDB connection failed:", err);
      // Vercel will return 500 automatically
    }
  }
};

// Wrap handler to connect DB before handling any request
export const handler = async (req, res) => {
  await connectDB(); // ensure DB is connected
  const serverlessHandler = serverless(app);
  return serverlessHandler(req, res);
};
