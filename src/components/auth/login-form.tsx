"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { Social } from "@/components/auth/social"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';

export const LoginForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials!");
      } if (result?.ok) {
        toast.success('Welcome back!', {
          description: 'Login Successful. Redirecting...', duration: 1500
        });
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 3000);
      }


    });
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-600">Login</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...form.register("email")}
          disabled={isPending}
          placeholder="Email"
          className="p-2 flex h-10 w-full text-gray-500 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:border-none"
        />
        <input
          {...form.register("password")}
          disabled={isPending}
          type="password"
          placeholder="Password"
          className="p-2 flex h-10 w-full text-gray-500 rounded-md border border-gray-400 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:border-none"
        />
        {error &&
          <p className="text-red-500 text-sm">
            {error}
          </p>
        }
        {success && (
          <div className="space-y-2">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg text-sm">
              {success}
            </div>
            <p className="text-center text-xs text-gray-500 italic">
              Please check your inbox to verify your account.
            </p>
          </div>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>

        <div className="mt-4">
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full text-gray-400 border-t" />
            </div>
            <div className="relative flex justify-center text-xs text-gray-500 uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Social />
        </div>

        <p className="text-center mt-5 text-xs font-semibold text-gray-400">
          Already have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            register
          </Link>
        </p>
      </form>
    </div>
  );
};