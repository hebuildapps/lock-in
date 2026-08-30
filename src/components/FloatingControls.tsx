"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface FloatingControlsProps {
  soundEnabled: boolean;
  onOpenSettings: () => void;
}

export function FloatingControls({
  soundEnabled,
  onOpenSettings,
}: FloatingControlsProps) {
  const [visible, setVisible] = useState(true);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { theme, setTheme } = useTheme();
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const reset = () => {
      setVisible(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => setVisible(false), 5000);
    };

    reset();
    window.addEventListener("mousemove", reset);
    window.addEventListener("keydown", reset);
    return () => {
      window.removeEventListener("mousemove", reset);
      window.removeEventListener("keydown", reset);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const handleToggleTheme = () => {
    setIsRotating(true);
    const isDark = theme === "dark" || (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setTheme(isDark ? "light" : "dark");
    setTimeout(() => setIsRotating(false), 600);
  };

  const isDarkEffective = theme === "dark" || (theme === "system" && typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)")?.matches);

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 flex items-center gap-2 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      {/* Sound Toggle Button */}
      <button
        onClick={onOpenSettings}
        className="p-2.5 rounded-full bg-[#121212]/90 hover:bg-[#1c1c1c] border border-[#272727] text-neutral-300 hover:text-white shadow-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer"
        aria-label={soundEnabled ? "Open sound controls" : "Open sound controls (muted)"}
        title={soundEnabled ? "Sound on" : "Muted"}
      >
        {soundEnabled ? (
          <Volume2 className="w-4 h-4" />
        ) : (
          <VolumeX className="w-4 h-4 text-neutral-500" />
        )}
      </button>

      {/* Half-Filled / Half-Empty Yin-Yang Style Theme Toggle Button with 360-degree rotation */}
      <button
        onClick={handleToggleTheme}
        className="p-2.5 rounded-full bg-[#121212]/90 hover:bg-[#1c1c1c] border border-[#272727] text-neutral-300 hover:text-white shadow-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer group"
        aria-label="Toggle Light/Dark Theme"
        title={isDarkEffective ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        <div
          className="w-4 h-4 flex items-center justify-center transition-transform duration-500 ease-out"
          style={{ transform: isRotating ? "rotate(360deg)" : "rotate(0deg)" }}
        >
          {/* Half-filled circle SVG */}
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 text-neutral-200 group-hover:text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Outer Circle Outline */}
            <circle cx="12" cy="12" r="9" stroke="currentColor" fill="none" />
            {/* Left Half Filled */}
            <path
              d="M12 3a9 9 0 0 0 0 18V3z"
              fill="currentColor"
              stroke="none"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}
