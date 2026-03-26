import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserButton } from "./user-button"; 

export const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex justify-between items-center py-3 px-8 bg-emerald-700 border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <Link href="/" className="font-extrabold text-2xl tracking-tighter text-sky-600 hover:opacity-80 transition">
        AUTH<span className="text-zinc-900">PRO</span>
      </Link>

      <div className="flex items-center gap-x-4">
        {!session ? (
          <div className="flex gap-x-4 items-center">
            <Link href="/login" className="text-base font-medium text-zinc-200 hover:text-sky-400 transition">
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-zinc-900 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-800 transition"
            >
              Get Started
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-x-3 border-l pl-4 border-gray-200">
            <UserButton user={session.user} />
          </div>
        )}
      </div>
    </nav>
  );
};