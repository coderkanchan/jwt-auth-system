import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String
  }, { timestamps: true }
);

export default mongoose.models.User || mongoose.model("user", userSchema);