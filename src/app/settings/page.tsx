import { currentUser } from "@/lib/auth-user";
import { SettingsForm } from "@/components/settings-form";

const SettingsPage = async () => {
  const user = await currentUser();

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <SettingsForm initial2FA={user?.isTwoFactorEnabled} />
    </div>
  );
}

export default SettingsPage;