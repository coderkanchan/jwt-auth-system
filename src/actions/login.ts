// "use server";

// import * as z from "zod";
// import { LoginSchema } from "@/schemas";
// import { getUserByEmail } from "@/data/user";
// import { sendVerificationEmail } from "@/lib/mail";
// import { generateVerificationToken } from "@/lib/tokens";
// import bcrypt from "bcryptjs";

// export const login = async (values: z.infer<typeof LoginSchema>) => {
//   const validatedFields = LoginSchema.safeParse(values);

//   if (!validatedFields.success) {
//     return { error: "Invalid fields!" };
//   }

//   const { email, password } = validatedFields.data;
//   const normalizedEmail = email.toLowerCase();

//   const existingUser = await getUserByEmail(normalizedEmail);
//   console.log(existingUser)
//   if (!existingUser || !existingUser.email || !existingUser.password) {
//     return { error: "Email does not exist!" };
//   }

//   const passwordsMatch = await bcrypt.compare(
//     password,
//     existingUser.password
//   );

//   if (!passwordsMatch) {
//     return { error: "Invalid credentials!" };
//   }

//   if (!existingUser.emailVerified) {
//     const verificationToken = await generateVerificationToken(existingUser.email);

//     await sendVerificationEmail(
//       verificationToken.email,
//       verificationToken.token,
//     );

//     return { success: "Confirmation email sent!" };
//   }

//   return { success: "Login Successful!" };
// };

"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/tokens";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import TwoFactorToken from "@/models/TwoFactorToken";
import TwoFactorConfirmation from "@/models/TwoFactorConfirmation";

export const login = async (values: z.infer<typeof LoginSchema>, code?: string) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;
  const normalizedEmail = email.toLowerCase();

  await connectDB();
  const existingUser = await getUserByEmail(normalizedEmail);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  const passwordsMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordsMatch) return { error: "Invalid credentials!" };

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    return { success: "Confirmation email sent!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await TwoFactorToken.findOne({ email: normalizedEmail });

      if (!twoFactorToken || twoFactorToken.token !== code) {
        return { error: "Invalid code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) return { error: "Code expired!" };

      await TwoFactorToken.deleteOne({ _id: twoFactorToken._id });
      await TwoFactorConfirmation.deleteOne({ userId: existingUser._id });
      await TwoFactorConfirmation.create({ userId: existingUser._id });

      return { success: "2FA Verified" };

    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }

  return { success: "Credentials Validated!" };
};