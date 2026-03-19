"use server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export const checkVerificationStatus = async (email: string) => {
  try {
    await connectDB();
    const user = await User.findOne({ email });
    return { isVerified: !!user?.emailVerified };
  } catch (error) {
    return { isVerified: false };
  }
};