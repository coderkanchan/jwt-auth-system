"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { reset } from "@/actions/reset";
import Link from "next/link";

export default function ResetPage() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">Forgot Password</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...form.register("email")}
            placeholder="Enter your email"
            type="email"
            disabled={isPending}
            className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            Send Reset Email
          </button>
        </form>
        <div className="text-center mt-4 text-sm">
          <Link href="/login" className="text-blue-500 hover:underline">Back to login</Link>
        </div>
      </div>
    </div>
  );
}