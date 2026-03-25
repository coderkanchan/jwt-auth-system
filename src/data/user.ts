import { connectDB } from "@/lib/db";
import User from "@/models/User";

export const getUserByEmail = async (email: string) => {
  try {
    await connectDB();
    const user = await User.findOne({ email }).select("+password");
    return user;
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    await connectDB();
    const user = await User.findById(id);
    return user;
  } catch (error) {
    return null;
  }
};