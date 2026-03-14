import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LogoutButton } from "./auth/logout-button";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-sm">
      <Link href="/" className="font-bold text-xl">
        JWT Auth
      </Link>
      <div className="flex gap-x-4 items-center">
        {!session ? (
          <>
            <Link href="/login" className="text-sm font-medium">Login</Link>
            <Link href="/register" className="bg-black text-white px-4 py-2 rounded-md text-sm">Register</Link>
          </>
        ) : (
          <>
            <span className="text-sm text-gray-600">Hi, {session.user?.name}</span>
            <LogoutButton>
              <button className="text-sm bg-red-500 text-white px-4 py-2 rounded-md">
                Logout
              </button>
            </LogoutButton>
          </>
        )}
      </div>
    </nav>
  );
};