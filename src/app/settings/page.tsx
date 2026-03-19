import { currentUser } from "@/lib/auth-user";
import { SettingsForm } from "@/components/settings-form";
import { getUserByEmail } from "@/data/user"; 

const SettingsPage = async () => {
  const user = await currentUser();

  const dbUser = await getUserByEmail(user?.email || "");

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <SettingsForm initial2FA={dbUser?.isTwoFactorEnabled} />
    </div>
  );
}

export default SettingsPage;