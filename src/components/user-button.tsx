"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaUser, FaSignOutAlt, FaCog, FaTachometerAlt, FaEdit } from "react-icons/fa";
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

      <DropdownMenuContent className="w-72 p-2" align="end" sideOffset={10}>
  
        <div className="flex items-center gap-x-3 p-3 bg-zinc-50/50 rounded-t-md">
          <Avatar className="h-10 w-10 border shadow-sm">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="bg-sky-500 text-white">
              {user?.name?.[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-0.5 overflow-hidden">
            <p className="text-sm font-bold truncate text-zinc-800">{user?.name}</p>
            <p className="text-[11px] truncate text-muted-foreground">{user?.email}</p>
            <div className="mt-1">
              <span className="inline-flex items-center rounded-full bg-sky-100 px-2 py-0.5 text-[9px] font-bold text-sky-700 uppercase tracking-tight">
                {user?.role || "User"}
              </span>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem asChild className="cursor-pointer focus:bg-sky-50 py-2.5">
          <Link href="/dashboard" className="flex items-center gap-x-2">
            <FaTachometerAlt className="h-4 w-4 text-zinc-500" />
            <span className="font-medium">Dashboard</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer focus:bg-sky-50 py-2.5">
          <Link href="/settings" className="flex items-center gap-x-2">
            <FaEdit className="h-4 w-4 text-zinc-500" />
            <span className="font-medium">Edit Profile & Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem
          onClick={() => signOut()}
          className="cursor-pointer text-red-600 focus:text-white focus:bg-red-500 flex items-center gap-x-2 py-2.5"
        >
          <FaSignOutAlt className="h-4 w-4" />
          <span className="font-medium">Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};