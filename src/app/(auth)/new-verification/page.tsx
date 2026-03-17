// "use client";

// import { useCallback, useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { newVerification } from "@/actions/new-verification";

// export default function NewVerificationPage() {
//   const [error, setError] = useState<string | undefined>();
//   const [success, setSuccess] = useState<string | undefined>();
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token");

//   const onSubmit = useCallback(() => {
//     if (!token) {
//       setError("Missing token!");
//       return;
//     }

//     newVerification(token)
//       .then((data) => {
//         setSuccess(data.success);
//         setError(data.error);
//       })
//       .catch(() => {
//         setError("Something went wrong!");
//       });
//   }, [token]);

//   useEffect(() => {
//     onSubmit();
//   }, [onSubmit]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <div className="p-8 bg-white shadow-xl rounded-xl w-[400px] text-center">
//         <h1 className="text-2xl font-bold mb-4">Confirming Verification</h1>
//         {!success && !error && <p>Loading...</p>}
//         {success && <p className="text-green-500 font-semibold">{success}</p>}
//         {error && <p className="text-red-500 font-semibold">{error}</p>}
//       </div>
//     </div>
//   );
// }



"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";

export default function NewVerificationPage() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <div className="p-8 bg-white shadow-xl rounded-xl w-[400px] text-center border border-slate-200">
        <h1 className="text-2xl font-bold mb-4 text-slate-800">Email Verification</h1>
        {!success && !error && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
        {success && <p className="text-green-600 font-medium p-3 bg-green-50 rounded-lg">{success}</p>}
        {error && <p className="text-red-600 font-medium p-3 bg-red-50 rounded-lg">{error}</p>}

        {(success || error) && (
          <a href="/login" className="mt-6 inline-block text-blue-600 hover:underline font-medium">
            Back to login
          </a>
        )}
      </div>
    </div>
  );
}