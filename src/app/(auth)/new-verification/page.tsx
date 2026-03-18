"use client";

// import { useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { newVerification } from "@/actions/new-verification";
// import { toast } from "sonner";

// export default function NewVerificationPage() {
//   const [isPending, setIsPending] = useState(false);
//   const [error, setError] = useState<string | undefined>();
//   const [success, setSuccess] = useState<string | undefined>();

//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const token = searchParams.get("token");

//   const onVerify = async () => {
//     if (!token) {
//       setError("Missing token!");
//       return;
//     }

//     setIsPending(true);
//     setError("");
//     setSuccess("");

//     try {
//       const data = await newVerification(token);

//       if (data?.error) {
//         setError(data.error);
//         setIsPending(false);
//       }

//       if (data?.success) {
//         setSuccess(data.success);
//         toast.success("Verification successful! Opening dashboard...");

//         setTimeout(() => {
//           router.push("/dashboard");
//           router.refresh();
//         }, 2000);
//       }
//     } catch (err) {
//       setError("Something went wrong!");
//       setIsPending(false);
//     }
//   };

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { toast } from "sonner";
import { signIn } from "next-auth/react"; 

export default function NewVerificationPage() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const router = useRouter();
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
        setSuccess(data.success);

        const loginResult = await signIn("credentials", {
          email: data.email,
          password: data.password, 
          redirect: false,
        });

        if (loginResult?.error) {
          setError("Verification successful but login failed. Please login manually.");
          setIsPending(false);
          return;
        }

        toast.success("Account Verified & Logged In! ✨");

        setTimeout(() => {
          router.push("/dashboard");
          router.refresh(); 
        }, 2000);
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
        <p className="text-gray-500 mb-8">
          Is it really you? Click the button below to confirm your identity and access your dashboard.
        </p>

        {!success && !error && (
          <button
            onClick={onVerify}
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95 disabled:bg-gray-400"
          >
            {isPending ? "Verifying..." : "Yes, Verify My Account"}
          </button>
        )}

        {success && (
          <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl font-medium animate-pulse">
            ✅ {success} Redirecting...
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-medium">
            ❌ {error}
          </div>
        )}

        <button
          onClick={() => router.push("/login")}
          className="mt-6 text-sm text-gray-400 hover:text-blue-600 transition"
        >
          Cancel and go back
        </button>
      </div>
    </div>
  );
}