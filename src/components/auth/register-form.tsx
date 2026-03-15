"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { register } from "@/actions/register";
import { Social } from "./social";
export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
        <input
          {...form.register("name")}
          disabled={isPending}
          placeholder="Full Name"
          required
          className="w-full p-3 border border-gray-500 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          {...form.register("email")}
          disabled={isPending}
          placeholder="Email"
          required
          className="w-full p-3 border border-gray-500 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          {...form.register("password")}
          disabled={isPending}
          type="password"
          required
          placeholder="Password"
          className="w-full p-3 border border-gray-500 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {error && <div className="p-3 bg-red-100 text-red-600 rounded-lg text-sm">
          {error}
        </div>
        }
        {success &&
          <div className="p-3 bg-green-100 text-green-600 rounded-lg text-sm">
            {success}
          </div>}

        <button type="submit" disabled={isPending} className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400">
          {isPending ? "Creating Account..." : "Register"}
        </button>

        <div className="mt-4">
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full text-gray-400 border-t" />
            </div>
            <div className="relative flex justify-center text-xs text-gray-400 uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Social />
        </div>
      </form>
    </div>
  );
};