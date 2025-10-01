import mongoose from "mongoose";

const dataRowSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phoneNumber: String,
    age: Number,
    fathersNumber: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("DataRow", dataRowSchema);
