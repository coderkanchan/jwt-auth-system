"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"; 
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaUser, FaSignOutAlt, FaCog } from "react-icons/fa";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface UserButtonProps {
  user?: {
    name?: string | null;
    image?: string | null;
  }
};

export const UserButton = ({ user }: UserButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex items-center gap-x-3 hover:opacity-80 transition cursor-pointer">
          <span className="text-sm font-medium hidden md:block">
            {user?.name}
          </span>
          <Avatar className="h-9 w-9 border-2 border-gray-400">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="bg-sky-500 text-white">
              {user?.name?.[0].toUpperCase() || <FaUser />}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 px-2 py-2" align="end">
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/settings" className="flex items-center gap-x-2">
            <FaCog className="h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => signOut()}
          className="cursor-pointer text-red-600 focus:text-red-600 flex items-center gap-x-2"
        >
          <FaSignOutAlt className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};