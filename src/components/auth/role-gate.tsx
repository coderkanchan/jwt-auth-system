"use client";

import { useSession } from "next-auth/react";
import { FormError } from "@/components/form-error"; 

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: string;
};

export const RoleGate = ({
  children,
  allowedRole,
}: RoleGateProps) => {
  const { data: session } = useSession();
  const role = (session?.user as any)?.role;

  if (role !== allowedRole) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        You do not have permission to view this content!
      </div>
    );
  }

  return (
    <>{children}</>
  );
};