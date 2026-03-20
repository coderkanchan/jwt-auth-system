import mongoose, { Schema, model, models } from "mongoose";

const passwordResetTokenSchema = new Schema({
  email: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  expires: { type: Date, required: true }
});

passwordResetTokenSchema.index({ expires: 1 }, { expireAfterSeconds: 0 });

const PasswordResetToken = models.PasswordResetToken || model("PasswordResetToken", passwordResetTokenSchema);

export default PasswordResetToken;