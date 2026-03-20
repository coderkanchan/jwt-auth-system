import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import VerificationToken from "@/models/VerificationToken";
import TwoFactorToken from "@/models/TwoFactorToken";
import { connectDB } from "./db";
import PasswordResetToken from "@/models/PasswordResetToken";

export const generateVerificationToken = async (email: string) => {
  const normalizedEmail = email.toLowerCase();
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  await connectDB();

  await VerificationToken.deleteOne({ email: normalizedEmail });

  const verificationToken = await VerificationToken.create({
    email: normalizedEmail,
    token,
    expires,
  });

  return verificationToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const normalizedEmail = email.toLowerCase();

  const token = crypto.randomInt(100000, 1000000).toString();

  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  await connectDB();

  await TwoFactorToken.deleteOne({ email: normalizedEmail });

  const twoFactorToken = await TwoFactorToken.create({
    email: normalizedEmail,
    token,
    expires,
  });

  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  await PasswordResetToken.deleteOne({ email });

  const passwordResetToken = await PasswordResetToken.create({
    email,
    token,
    expires,
  });

  return passwordResetToken;
};