import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LogoutButton } from "./auth/logout-button";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-gray-500 shadow-sm text-white">
      <Link href="/" className="font-bold text-xl hover:opacity-80 transition">
        JWT Auth
      </Link>

      <div className="flex gap-x-6 items-center">
        {!session ? (
          <div className="flex gap-x-4 items-center">
            <Link href="/login" className="text-sm font-medium hover:underline">
              Login
            </Link>
            <Link
              href="/register"
              className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex gap-x-4 items-center">
            <Link href="/dashboard" className="text-sm hover:underline">
              Dashboard
            </Link>

            <Link href="/settings" className="text-sm hover:underline">
              Settings
            </Link>

            <span className="text-sm text-gray-200 border-l pl-4 border-gray-400">
              Hi, <span className="font-semibold">{session.user?.name}</span>
            </span>

            <LogoutButton>
              <button className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition">
                Logout
              </button>
            </LogoutButton>
          </div>
        )}
      </div>
    </nav>
  );
};






