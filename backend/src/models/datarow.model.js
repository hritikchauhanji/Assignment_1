import mongoose from "mongoose";

const dataRowSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: String,
    age: Number,
    fathersNumber: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Compound index to enforce unique email per user
dataRowSchema.index({ email: 1, createdBy: 1 }, { unique: true });

export default mongoose.model("DataRow", dataRowSchema);
