"use client";

import { useEffect, useRef, useState } from "react";
import { PiGearFineDuotone, PiSpeakerHighDuotone, PiSpeakerSlashDuotone } from "react-icons/pi";

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
      className={`fixed bottom-4 left-4 z-40 flex flex-col gap-2 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <button
        onClick={onOpenSettings}
        className="neo-border bg-card text-foreground p-2 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none neo-shadow-sm"
        aria-label={
          soundEnabled ? "Open sound settings" : "Open sound settings (muted)"
        }
        title={soundEnabled ? "Sound on" : "Muted"}
      >
        {soundEnabled ? (
          <PiSpeakerHighDuotone className="w-4 h-4" />
        ) : (
          <PiSpeakerSlashDuotone className="w-4 h-4" />
        )}
      </button>
      <button
        onClick={onOpenSettings}
        className="neo-border bg-card text-foreground p-2 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none neo-shadow-sm"
        aria-label="Open settings"
        title="Settings"
      >
        <PiGearFineDuotone className="w-4 h-4" />
      </button>
    </div>
  );
}
