import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, select: false },
  emailVerified: { type: Date, default: null },
  role: { type: String, enum: ["user", "admin"], default: "user" },
}, { timestamps: true });

const User = models.User || model("User", UserSchema);
export default User;