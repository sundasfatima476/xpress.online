import { useState } from "react";
import AccountLayout from "../layouts/AccountLayout";
import { useToast } from "../context/ToastContext";

const TOGGLES = [
  { key: "orderUpdates", label: "Order & shipping updates", defaultOn: true },
  { key: "promotions", label: "Promotions & new arrivals", defaultOn: true },
  { key: "newsletter", label: "Weekly style newsletter", defaultOn: false },
];

export default function AccountSettings() {
  const toast = useToast();
  const [prefs, setPrefs] = useState(
    TOGGLES.reduce((acc, t) => ({ ...acc, [t.key]: t.defaultOn }), {})
  );

  const toggle = (key) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
    toast?.showToast("Preferences updated", "info");
  };

  return (
    <AccountLayout title="Settings">
      <div className="card-surface p-6 md:p-8 max-w-xl">
        <h2 className="font-serif text-xl mb-5">Notification Preferences</h2>
        <div className="space-y-4">
          {TOGGLES.map((t) => (
            <label key={t.key} className="flex items-center justify-between py-2 cursor-pointer">
              <span className="text-sm text-charcoal/75">{t.label}</span>
              <button
                type="button"
                onClick={() => toggle(t.key)}
                className={`w-11 h-6 rounded-full relative transition-colors ${prefs[t.key] ? "bg-forest" : "bg-charcoal/20"}`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-softwhite transition-transform ${
                    prefs[t.key] ? "translate-x-[22px]" : "translate-x-0.5"
                  }`}
                />
              </button>
            </label>
          ))}
        </div>
      </div>
    </AccountLayout>
  );
}
