import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserButton } from "./user-button"; 


export const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex justify-between items-center py-3 px-8 bg-zinc-900 shadow-md text-white">
      <Link href="/" className="font-bold text-xl tracking-tight hover:text-sky-400 transition">
        JWT Auth
      </Link>

      <div className="flex gap-x-8 items-center">
        {session && (
          <div className="hidden sm:flex gap-x-6">
            <Link href="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition">
              Dashboard
            </Link>
          </div>
        )}

        {!session ? (
          <div className="flex gap-x-4 items-center">
            <Link href="/login" className="text-sm font-medium hover:text-sky-400 transition">
              Login
            </Link>
            <Link
              href="/register"
              className="bg-sky-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-sky-700 transition"
            >
              Sign up
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-x-4">
            <UserButton user={session.user} />
          </div>
        )}
      </div>
    </nav>
  );
};

