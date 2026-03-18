import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
//import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-bold text-white drop-shadow-md">
          Auth Service
        </h1>
        <p className="text-white text-lg">
          A professional JWT Authentication System with Next.js
        </p>

        <div className="flex justify-center gap-4">
          {session ? (
            <Link href="/dashboard">
              <button className=" inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 w-full disabled:bg-gray-400">
                Go to Dashboard
              </button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <button className=" inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 w-full disabled:bg-gray-400">
                  Sign In
                </button>
              </Link>
              <Link href="/register">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 w-full disabled:bg-gray-400">
                  Get Started
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}