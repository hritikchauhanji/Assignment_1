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

let dbConnected = false;

const ensureDB = async () => {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
};

// serverless-http expects us to export a function
const expressHandler = serverless(app);

export default async function handler(req, res) {
  try {
    await ensureDB();
    return expressHandler(req, res);
  } catch (err) {
    console.error("Handler error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
