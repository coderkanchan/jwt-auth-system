"use client";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export default function NewVerificationPage() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);

        if (data.success) {
          toast.success("Email verified!");
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        }
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error, router]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-10 bg-white shadow-2xl rounded-2xl w-[450px] text-center border border-gray-100">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Confirming...</h2>

        {!success && !error && (
          <div className="flex justify-center items-center py-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl font-medium animate-bounce">
            {success} ✨ Redirecting to login...
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-medium">
            {error} ❌
          </div>
        )}

        <button
          onClick={() => router.push("/login")}
          className="mt-8 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}