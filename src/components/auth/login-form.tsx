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
import { login } from "@/actions/login"

export const LoginForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "", code: "" }, 
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const data = await login(values, form.getValues("code"));

        if (data?.error) {
          setError(data.error);
          return;
        }

        if (data?.success === "Confirmation email sent!") {
          setSuccess(data.success);
          return;
        }

        if (data?.twoFactor) {
          setShowTwoFactor(true);
          toast.info("Please check your email for the OTP code.");
          return;
        }

        if (data?.success === "Credentials Validated!" || data?.success === "2FA Verified") {
          const result = await signIn("credentials", {
            email: values.email.toLowerCase(),
            password: values.password,
            redirect: false,
          });

          if (result?.error) {
            setError("Invalid credentials!");
            return;
          }

          if (result?.ok) {
            toast.success('Welcome back!');
            router.push("/dashboard");
            router.refresh();
          }
        }
      } catch {
        setError("Something went wrong!");
      }
    });
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-600">
        {showTwoFactor ? "Two-Factor Authentication" : "Login"}
      </h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        {showTwoFactor && (
          <div className="space-y-2">
            <p className="text-xs text-gray-500 mb-2">Enter the 6-digit code sent to your email.</p>
            <input
              {...form.register("code")}
              disabled={isPending}
              placeholder="------"
              className="p-2 flex h-10 w-full text-gray-500 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:border-none"
            />
          </div>
        )}

        {!showTwoFactor && (
          <>
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
              className="p-2 flex h-10 w-full text-gray-500 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:border-none"
            />
          </>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && (
          <div className="p-3 bg-green-100 text-green-600 rounded-lg text-sm">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? "Confirming..." : showTwoFactor ? "Verify Code" : "Login"}
        </button>

        {!showTwoFactor && (
          <div className="mt-4">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full text-gray-400 border-t" />
              </div>
              <div className="relative flex justify-center text-xs text-gray-500 uppercase">
                <span className="bg-white px-2">Or continue with</span>
              </div>
            </div>
            <Social />
           
            <p className="text-center mt-5 text-xs font-semibold text-gray-400">
              Already have an account?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                register
              </Link>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};