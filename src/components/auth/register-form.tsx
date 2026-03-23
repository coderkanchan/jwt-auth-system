"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useTransition } from "react";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { register } from "@/actions/register";
import { Social } from "./social";
import Link from "next/link";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import { checkVerificationStatus } from "@/actions/check-status";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const RegisterForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [emailForStatus, setEmailForStatus] = useState("");
  const [savedPassword, setSavedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const data = await register(values);

        if (data?.error) {
          setError(data.error);
          form.setValue("password", "");
        }

        if (data?.success) {
          setSuccess(data.success);
          setEmailForStatus(values.email.toLowerCase());
          setSavedPassword(values.password);
          form.reset();

          toast.info("Verification mail sent! Monitoring status...");
        }
      } catch (err) {
        setError("Something went wrong.");
      }
    });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (success && emailForStatus && savedPassword) {
      interval = setInterval(async () => {
        try {
          const status = await checkVerificationStatus(emailForStatus);

          if (status.isVerified) {
            clearInterval(interval);

            const result = await signIn("credentials", {
              email: emailForStatus.toLowerCase(),
              password: savedPassword,
              redirect: false,
            });

            if (result?.error) {
              toast.error("Verified! Please login manually.");
              router.replace("/login");
            } else {

              toast.success("Account verified! Welcome to Dashboard.");
              router.replace(DEFAULT_LOGIN_REDIRECT);
              router.refresh();
            }
          }
        } catch (error) {
          console.error("Polling error:", error);
        }
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [success, emailForStatus, savedPassword, router]);

  return (
    <div className="max-w-xl w-full p-6 bg-white rounded-xl shadow-lg border border-gray-100">

      <h2 className="text-2xl font-bold text-center mb-6 text-gray-500">Create an Account</h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        <div>
          <input
            {...form.register("name")}
            disabled={isPending}
            placeholder="Full Name"
            className={`flex h-10 w-full text-gray-500 rounded-md border-2 border-gray-400 bg-white px-3 py-6  text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 focus:border-none transition-all duration-500 ease-in ${form.formState.errors.name ? "border-red-500 focus-visible:ring-red-500" : "border-gray-400 focus-visible:ring-blue-600"}`}
          />
          {form.formState.errors.name && (
            <p className="text-red-500 text-xs mt-1 ml-1">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            {...form.register("email")}
            disabled={isPending}
            placeholder="Email"
            className={`flex h-10 w-full text-gray-500 rounded-md border-2  bg-white px-3 py-6  text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 focus:border-none transition-all duration-500 ease ${form.formState.errors.email ? "border-red-500" : "border-gray-400"}`}
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-xs mt-1 ml-1">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div className="relative">
          <input
            {...form.register("password")}
            disabled={isPending}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`flex h-10 w-full text-gray-500 rounded-md border-2 bg-white px-3 py-5 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 focus:border-none transition-all duration-500 ease ${form.formState.errors.password ? " border-red-500" : "border-gray-400"} `}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {form.formState.errors.password && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.password.message}</p>
          )}
        </div>

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
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 cursor-pointer">
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

        <p className="text-center mt-5 text-base font-medium text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-800 hover:underline">
            Login
          </Link>
        </p>
      </form>

    </div>
  );
};