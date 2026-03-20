import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(1, "Password is required"),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Full name is required"),
});

export const SettingsSchema = z.object({
  isTwoFactorEnabled: z.optional(z.boolean()),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});