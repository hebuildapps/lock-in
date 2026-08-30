"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, SlidersHorizontal } from "lucide-react";

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

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 flex items-center gap-2 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <button
        onClick={onOpenSettings}
        className="p-2.5 rounded-full bg-[#121212]/90 hover:bg-[#1c1c1c] border border-[#272727] text-neutral-300 hover:text-white shadow-xl backdrop-blur-md transition-all active:scale-95"
        aria-label={soundEnabled ? "Open sound controls" : "Open sound controls (muted)"}
        title={soundEnabled ? "Sound on" : "Muted"}
      >
        {soundEnabled ? (
          <Volume2 className="w-4 h-4" />
        ) : (
          <VolumeX className="w-4 h-4 text-neutral-500" />
        )}
      </button>

      <button
        onClick={onOpenSettings}
        className="p-2.5 rounded-full bg-[#121212]/90 hover:bg-[#1c1c1c] border border-[#272727] text-neutral-300 hover:text-white shadow-xl backdrop-blur-md transition-all active:scale-95"
        aria-label="Open settings"
        title="Settings & Audio"
      >
        <SlidersHorizontal className="w-4 h-4" />
      </button>
    </div>
  );
}
