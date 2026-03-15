"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export const Social = () => {
  const onClick = () => {
    signIn("google", {
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        //size="lg"
        className="w-full"
        //variant="outline"
        onClick={onClick}
      >
        <FcGoogle className="h-5 w-5 mr-2" />
        Continue with Google
      </Button>
    </div>
  );
};