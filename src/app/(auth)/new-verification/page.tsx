"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";

 const VerificationForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onVerify = async () => {
    if (!token) {
      setError("Missing token!");
      return;
    }

    setIsPending(true);
    setError("");
    setSuccess("");

    try {
      const data = await newVerification(token);

      if (data?.error) {
        setError(data.error);
        setIsPending(false);
        return;
      }

      if (data?.success) {
        setSuccess("Email verified successfully! You can close this tab and return to the registration page.");
        setIsPending(false);
      }
    } catch (err) {
      setError("Something went wrong!");
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <div className="p-10 bg-white shadow-2xl rounded-3xl w-full max-w-md text-center border border-gray-100">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Confirm Email</h2>

        {!success && !error && (
          <>
            <p className="text-gray-500 mb-8">Click the button below to confirm your identity.</p>
            <button
              onClick={onVerify}
              disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg disabled:bg-gray-400"
            >
              {isPending ? "Verifying..." : "Yes, Verify My Account"}
            </button>
          </>
        )}

        {success && (
          <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl font-medium">
            ✅ {success}
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-medium">
            ❌ {error}
          </div>
        )}
      </div>
    </div>
  );
}


export default function NewVerificationPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <Suspense fallback={<div className="text-gray-500">Loading verification details...</div>}>
        <VerificationForm />
      </Suspense>
    </div>
  );
}

