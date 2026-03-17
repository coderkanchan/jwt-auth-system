import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";

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
              <Button className="bg-gray-400 text-black hover:bg-gray-200 w-auto px-8">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button className="bg-blue-400 text-black hover:bg-gray-800 w-auto px-8">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 w-auto px-8 border-none">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}