"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Accessibility } from "lucide-react";

export function ReducedMotionToggle() {
  const { reducedMotion, setReducedMotion } = useTheme();

  return (
    <button
      onClick={() => setReducedMotion(!reducedMotion)}
      className={`neo-border p-3 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${
        reducedMotion
          ? "bg-foreground text-background neo-shadow-sm"
          : "bg-background text-foreground neo-shadow-sm"
      }`}
      aria-label={reducedMotion ? "Disable reduced motion" : "Enable reduced motion"}
      aria-pressed={reducedMotion}
      title="Toggle Reduced Motion"
    >
      <Accessibility className="w-5 h-5" />
    </button>
  );
}
