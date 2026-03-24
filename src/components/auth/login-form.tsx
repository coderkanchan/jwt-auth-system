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
import { Eye, EyeOff } from "lucide-react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const LoginForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState(false);

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
            router.replace(DEFAULT_LOGIN_REDIRECT);
            router.refresh();
          }
        }
      } catch {
        setError("Something went wrong!");
      }
    });
  };

  return (
    <div className="max-w-xl w-full mx-auto p-6 bg-white rounded-lg shadow-md">

      <h2 className="text-2xl font-bold mb-4 text-center text-gray-500">
        {showTwoFactor ? "Two-Factor Authentication" : "Login"}
      </h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {showTwoFactor && (
          <div className="space-y-2">
            <p className="text-xs text-gray-500 mb-2">Enter the 6-digit code sent to your email.</p>
            <input
              {...form.register("code")}
              disabled={isPending}
              required
              placeholder="------"
              className="p-2  flex h-10 w-full text-gray-500 rounded-md border-2 border-gray-400 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:border-none"
            />
          </div>
        )}

        {!showTwoFactor && (
          <>
            <div>
              <input
                {...form.register("email")}
                disabled={isPending}
                placeholder="Email"
                className={`flex w-full text-gray-500 rounded-md border-2 bg-white px-3 py-4 text-sm focus-visible:outline-none focus-visible:ring-2  disabled:cursor-not-allowed disabled:opacity-50 focus:border-none ${form.formState.errors.email ? "border-red-500 focus-visible:ring-red-500 placeholder:text-red-500" : "border-gray-400 focus-visible:ring-blue-600 placeholder:text-gray-500"}`}
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm font-medium mt-1 ml-1">{form.formState.errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-1">
              <div className="relative flex items-center">
                <input
                  {...form.register("password")}
                  disabled={isPending}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`flex w-full text-gray-500 rounded-md border-2 bg-white px-3 py-4 pr-10 text-sm focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${form.formState.errors.password
                    ? "border-red-500 focus-visible:ring-red-500 placeholder:text-red-500"
                    : "border-gray-400 focus-visible:ring-blue-600 placeholder:text-gray-500"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-500 hover:text-gray-700 transition-colors"
                  style={{ top: '1.25rem' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {form.formState.errors.password && (
                <p className="text-red-500 text-sm font-medium mt-1">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-end mt-1">
              <Link
                href="/reset"
                className="text-sm font-medium text-purple-900 hover:underline transition"
              >
                Forgot password?
              </Link>
            </div>
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
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer"
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
          </div>
        )}
        <p className="text-center mt-5 text-base font-medium text-gray-500">
          Don't have an account?{" "}
          <Link href="/register" className="text-indigo-800 hover:underline">
            register
          </Link>
        </p>
      </form>
    </div>
  );
};