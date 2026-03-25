"use server";
import * as z from "zod";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { SettingsSchema } from "@/schemas";
import { currentUser } from "@/lib/auth-user";
import { revalidatePath } from "next/cache";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  await connectDB();
  const dbUser = await User.findById(user.id);

  if (!dbUser) {
    return { error: "User not found" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  await User.findByIdAndUpdate(user.id, { ...values, });

  revalidatePath("/settings");
  return { success: "Settings Updated!" };
};
