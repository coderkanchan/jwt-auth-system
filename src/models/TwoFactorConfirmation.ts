import mongoose, { Schema, models, model } from "mongoose";

const TwoFactorConfirmationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
});

const TwoFactorConfirmation = models.TwoFactorConfirmation || model("TwoFactorConfirmation", TwoFactorConfirmationSchema);
export default TwoFactorConfirmation;