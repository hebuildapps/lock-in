"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon, Monitor } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes: Array<{ value: "light" | "dark" | "system"; icon: React.ReactNode; label: string }> = [
    { value: "light", icon: <Sun className="w-5 h-5" />, label: "Light" },
    { value: "dark", icon: <Moon className="w-5 h-5" />, label: "Dark" },
    { value: "system", icon: <Monitor className="w-5 h-5" />, label: "System" },
  ];

  return (
    <div className="flex gap-2">
      {themes.map((t) => (
        <button
          key={t.value}
          onClick={() => setTheme(t.value)}
          className={`neo-border p-3 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${
            theme === t.value
              ? "bg-foreground text-background neo-shadow-sm"
              : "bg-background text-foreground neo-shadow-sm"
          }`}
          aria-label={`Switch to ${t.label} theme`}
          aria-pressed={theme === t.value}
        >
          {t.icon}
        </button>
      ))}
    </div>
  );
}
