"use client";

import { useSession } from "next-auth/react";
import { FormError } from "../form-error"

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
      <FormError message="You do not have permission to view this content!" />
    );
  }

  return (
    <>{children}</>
  );
};