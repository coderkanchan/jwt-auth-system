"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex flex-col items-center w-full gap-y-4">
      <button
        className="w-full inline-flex items-center justify-center rounded-md text-md font-semibold transition-colors  bg-blue-600 text-white hover:bg-blue-700 h-10 p-6 disabled:bg-gray-400 cursor-pointer"
        type="button"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5 mr-2" />
        Google
      </button>



      <button
        className="w-full inline-flex items-center justify-center rounded-md font-semibold bg-gray-800 text-white hover:bg-black h-10 p-6 disabled:bg-gray-400 cursor-pointer text-md"
        onClick={() => onClick("github")}
      >
        <FaGithub className="h-5 w-5 mr-2" />
        GitHub
      </button>
    </div >
  );
};