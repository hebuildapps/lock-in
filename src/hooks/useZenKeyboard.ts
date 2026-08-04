"use client";

import { useEffect } from "react";
import type { AmbientTrack, UiMode, ZenTheme } from "@/lib/zen/types";
import { AMBIENT_KEY_MAP } from "@/lib/zen/types";

interface UseZenKeyboardOptions {
  enabled: boolean;
  uiMode: UiMode;
  setUiMode: (mode: UiMode) => void;
  setZenTheme: (theme: ZenTheme) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean | ((prev: boolean) => boolean)) => void;
  onAmbientTrack: (track: AmbientTrack) => void;
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

export function useZenKeyboard({
  enabled,
  uiMode,
  setUiMode,
  setZenTheme,
  soundEnabled,
  setSoundEnabled,
  onAmbientTrack,
}: UseZenKeyboardOptions) {
  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTypingTarget(e.target)) return;

      const key = e.key.toLowerCase();

      if (key === "n") {
        e.preventDefault();
        setUiMode("normal");
        return;
      }
      if (key === "z") {
        e.preventDefault();
        setUiMode("zen");
        return;
      }
      if (key === "f" && uiMode === "zen") {
        e.preventDefault();
        setZenTheme("fire");
        return;
      }
      if (key === "r" && uiMode === "zen") {
        e.preventDefault();
        setZenTheme("rain");
        return;
      }
      if (key === "m") {
        e.preventDefault();
        setSoundEnabled((prev) => !prev);
        return;
      }
      if (AMBIENT_KEY_MAP[e.key] && soundEnabled) {
        e.preventDefault();
        onAmbientTrack(AMBIENT_KEY_MAP[e.key]);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    enabled,
    uiMode,
    setUiMode,
    setZenTheme,
    soundEnabled,
    setSoundEnabled,
    onAmbientTrack,
  ]);
}
