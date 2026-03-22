"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex flex-col items-center w-full gap-y-2">
      <button
        className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 disabled:bg-gray-400"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5 mr-2" />
        Continue with Google
      </button>

      <button
        className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 bg-gray-900 text-white hover:bg-black h-10 px-4 py-2 disabled:bg-gray-400"
        onClick={() => onClick("github")}
      >
        <FaGithub className="h-5 w-5 mr-2" />
        Continue with GitHub
      </button>
    </div>
  );
};