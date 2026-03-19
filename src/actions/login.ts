"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import bcrypt from "bcryptjs";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;
  const normalizedEmail = email.toLowerCase();

  const existingUser = await getUserByEmail(normalizedEmail);
  console.log(existingUser)
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  const passwordsMatch = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!passwordsMatch) {
    return { error: "Invalid credentials!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Confirmation email sent!" };
  }

  return { success: "Login Successful!" };
};