"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");

    startTransition(async () => {

      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        setError("Invalid credentials!");
      }
    });
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* <input
          {...form.register("email")}
          disabled={isPending}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          {...form.register("password")}
          disabled={isPending}
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? "Logging in..." : "Login"}
        </button> */}
        
        <Input
          {...form.register("email")}
          placeholder="Email Address"
          type="email"
        />
        <Input
          {...form.register("password")}
          placeholder="Password"
          type="password"
        />
        <Button isLoading={isPending} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};