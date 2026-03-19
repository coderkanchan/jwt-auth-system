import mongoose, { Schema, models, model } from "mongoose";

const TwoFactorTokenSchema = new Schema({
  email: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  expires: { type: Date, required: true },
});

const TwoFactorToken = models.TwoFactorToken || model("TwoFactorToken", TwoFactorTokenSchema);
export default TwoFactorToken;