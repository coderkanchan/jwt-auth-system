"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaUser, FaSignOutAlt, FaCog, FaTachometerAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";
import Link from "next/link";

export const UserButton = ({ user }: { user: any }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="h-9 w-9 border-2 border-sky-500/20 hover:border-sky-500 transition cursor-pointer">
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500 text-white font-medium">
            {user?.name?.[0].toUpperCase() || <FaUser />}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 p-2" align="end" sideOffset={10}>
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-sm font-semibold leading-none">{user?.name}</p>
          <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          <div className="mt-2">
            <span className="inline-flex items-center rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-medium text-sky-700 uppercase tracking-wider">
              {user?.role || "User"}
            </span>
          </div>
        </div>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem asChild className="cursor-pointer focus:bg-sky-50 py-2">
          <Link href="/dashboard" className="flex items-center gap-x-2">
            <FaTachometerAlt className="h-4 w-4 text-gray-500" />
            Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer focus:bg-sky-50 py-2">
          <Link href="/settings" className="flex items-center gap-x-2">
            <FaCog className="h-4 w-4 text-gray-500" />
            Account Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem
          onClick={() => signOut()}
          className="cursor-pointer text-red-600 focus:text-white focus:bg-red-500 flex items-center gap-x-2 py-2"
        >
          <FaSignOutAlt className="h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};