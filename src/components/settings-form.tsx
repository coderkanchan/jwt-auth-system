"use client";

import { useTransition } from "react";
import { settings } from "@/actions/settings";
import { toast } from "sonner";

interface SettingsFormProps {
  initial2FA?: boolean;
};

export const SettingsForm = ({ initial2FA }: SettingsFormProps) => {
  const [isPending, startTransition] = useTransition();

  const onToggle2FA = (checked: boolean) => {
    startTransition(() => {
      settings({ isTwoFactorEnabled: checked })
        .then((data) => {
          if (data.error) toast.error(data.error);
          if (data.success) toast.success(data.success);
        });
    });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border">
      <h3 className="text-lg font-medium mb-4">Security Settings</h3>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-700">Two Factor Authentication</p>
          <p className="text-sm text-gray-500">Enable an extra layer of security</p>
        </div>
        <input
          type="checkbox"
          disabled={isPending}
          defaultChecked={initial2FA}
          onChange={(e) => onToggle2FA(e.target.checked)}
          className="w-5 h-5 cursor-pointer"
        />
      </div>
    </div>
  );
};