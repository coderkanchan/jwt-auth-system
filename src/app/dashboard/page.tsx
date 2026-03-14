import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Welcome, {session.user?.name}!</h1>
      <p className="text-gray-600">You are logged in as {session.user?.email}</p>
      <p className="mt-4 p-2 bg-blue-100 inline-block rounded">Role: {session.user?.role}</p>
    </div>
  );
}