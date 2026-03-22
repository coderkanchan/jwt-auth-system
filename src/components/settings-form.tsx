"use client";

import { useState, useTransition, useEffect } from "react";
import { settings } from "@/actions/settings";
import { toast } from "sonner";

interface SettingsFormProps {
  initial2FA?: boolean;
};

export const SettingsForm = ({ initial2FA }: SettingsFormProps) => {
  const [isPending, startTransition] = useTransition();

  const [isEnabled, setIsEnabled] = useState(initial2FA);

  useEffect(() => {
    setIsEnabled(initial2FA);
  }, [initial2FA]);

  const onToggle2FA = (checked: boolean) => {

    setIsEnabled(checked);

    startTransition(() => {
      settings({ isTwoFactorEnabled: checked })
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
            setIsEnabled(!checked); 
          }
          if (data.success) {
            toast.success(data.success);
          }
        })
        .catch(() => {
          toast.error("Something went wrong!");
          setIsEnabled(!checked);
        });
    });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border max-w-md">
      <h3 className="text-lg font-medium mb-4 text-gray-700">Security Settings</h3>
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <p className="font-semibold text-gray-800 text-sm">Two-Factor Authentication</p>
          <p className="text-xs text-gray-500">Enable OTP verification for extra security</p>
        </div>
        <input
          type="checkbox"
          disabled={isPending}
          checked={isEnabled} 
          onChange={(e) => onToggle2FA(e.target.checked)}
          className="w-5 h-5 cursor-pointer accent-blue-600"
        />
      </div>
    </div>
  );
};


