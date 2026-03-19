import { v4 as uuidv4 } from "uuid";
import VerificationToken from "@/models/VerificationToken";
import { connectDB } from "./db";

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
