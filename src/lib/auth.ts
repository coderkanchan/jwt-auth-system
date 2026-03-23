import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "./db";
import User from "@/models/User";
import { LoginSchema } from "@/schemas";
import GoogleProvider from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  debug: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: { email: {}, password: {} },

      async authorize(credentials) {

        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const normalizedEmail = email.toLowerCase();
          await connectDB();

          const user = await User.findOne({ email: normalizedEmail }).select("+password");

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return {
              id: user._id.toString(),
              email: user.email,
              name: user.name,
              role: user.role,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      await connectDB();

      if (account?.provider !== "credentials") {
        try {
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              emailVerified: new Date(),
              role: "user",
            });
          }
          return true;
        } catch (error) {
          console.error("Error in social sign-in:", error);
          return false;
        }
      }
      try {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser || !existingUser.emailVerified) {
          return false;
        }
        return true;
      } catch (error) {
        console.error("Error in credentials sign-in:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = (user as any).id;
      }
      else if (token.email) {
        const dbUser = await User.findOne({ email: token.email }).lean();
        if (dbUser) {
          token.role = dbUser.role;
          token.id = dbUser._id.toString();
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
};