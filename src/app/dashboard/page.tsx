import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { RoleGate } from "@/components/auth/role-gate";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  console.log(session?.user);
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <div className="p-10">

        <h1 className="text-2xl font-bold">Welcome, {session.user?.name}!</h1>

        <p className="text-gray-600">You are logged in as {session.user?.email}</p>

        <p className="mt-4 p-2 bg-blue-500 inline-block rounded">Role: {session.user?.role}</p>

        <div className="bg-gray-500 p-6 rounded-lg border border-gray-200">
          <p><strong>User ID:</strong> {session?.user?.id}</p>
          <p><strong>Email:</strong> {session?.user?.email}</p>
          <p><strong>Role:</strong> <span className="capitalize">{session?.user?.role}</span></p>
        </div>

        <p>Role: {session?.user?.role || "No Role Found"}</p>
      </div>
      <RoleGate allowedRole="admin">
        <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-400 rounded-xl">
          <h3 className="font-bold text-yellow-800 italic">Admin Secret Section</h3>
          <p className="text-sm text-yellow-700">Ye content sirf Admin users ko dikh raha hai.</p>
        </div>
      </RoleGate>
    </>

  );
}