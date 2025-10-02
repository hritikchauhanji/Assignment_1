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
      console.log("MongoDB connected!");
    } catch (err) {
      console.error("MongoDB connection failed:", err);
      throw err;
    }
  }
};

const serverlessHandler = serverless(app);

// Export Vercel serverless function
export const handler = async (req, res) => {
  await connect(); // safe wrapper, no duplicate connects
  return serverlessHandler(req, res);
};
