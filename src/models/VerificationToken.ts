import mongoose, { Schema, models, model } from "mongoose";

const VerificationTokenSchema = new Schema({
  email: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  expires: { type: Date, required: true },
});

const VerificationToken = models.VerificationToken || model("VerificationToken", VerificationTokenSchema);
export default VerificationToken;