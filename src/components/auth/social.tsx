"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
export const Social = () => {
  const onClick = () => {
    signIn("google", {
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <button
        //size="lg"
        className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2  disabled:bg-gray-400"
        //variant="outline"
        onClick={onClick}
      >
        <FcGoogle className="h-5 w-5 mr-2" />
        Continue with Google
      </button>
    </div>
  );
};