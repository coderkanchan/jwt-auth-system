"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { register } from "@/actions/register";
import { Social } from "./social";
import Link from "next/link";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const router = useRouter();
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

        if (data.success || data.error) {
          form.reset();
        }

        if (data?.success) {
          toast.success('Welcome back!', {
            description: 'Account Created Successful. Redirecting...', duration: 800
          });
          setTimeout(() => {
            router.push("/dashboard");
          }, 3000);
        }
      });
    });
  };

  return (
    <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-500">Create an Account</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
        <input
          {...form.register("name")}
          disabled={isPending}
          placeholder="Full Name"
          required
          className="p-2  flex h-10 w-full text-gray-500 rounded-md border-2 border-gray-400 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:border-none"
        />
        <input
          {...form.register("email")}
          disabled={isPending}
          placeholder="Email"
          required
          className="p-2  flex h-10 w-full text-gray-500 rounded-md border-2 border-gray-400 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:border-none"
        />
        <input
          {...form.register("password")}
          disabled={isPending}
          type="password"
          required
          placeholder="Password"
          className="p-2  flex h-10 w-full text-gray-500 rounded-md border-2 border-gray-400 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:border-none"
        />

        {error &&
          <div className="p-3 bg-red-100 text-red-600 rounded-lg text-sm">
            {error}
          </div>
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
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400">
          {isPending ? "Creating Account..." : "Register"}
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
          <Link href="/login" className="text-blue-500 hover:underline">
            login
          </Link>
        </p>

      </form>
    </div>
  );
};