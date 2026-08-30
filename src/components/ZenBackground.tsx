"use client";

import { useEffect, useRef } from "react";
import type { ZenTheme } from "@/lib/zen/types";
import fireData from "@/lib/zen/fireFrames.json";
import rainData from "@/lib/zen/rainFrames.json";
import { useTheme } from "@/components/ThemeProvider";

export const THEME_OVERLAYS: Record<ZenTheme, string> = {
  fire: "radial-gradient(circle at center, rgba(255,120,0,0.8) 0%, rgba(10,10,10,1) 85%)",
  rain: "radial-gradient(circle at center, rgba(80,120,200,0.6) 0%, rgba(10,10,10,1) 85%)",
};

export const THEME_ASCII_COLORS: Record<ZenTheme, { light: string; dark: string }> = {
  fire: {
    light: "#ea580c", // Vibrant burning fire orange in light mode
    dark: "#ff7800",  // Glowing orange flame in dark mode
  },
  rain: {
    light: "#0284c7", // Refreshing crisp rain blue in light mode
    dark: "#60a5fa",  // Ambient glowing rain blue in dark mode
  },
};

interface ZenBackgroundProps {
  theme: ZenTheme;
  reducedMotion?: boolean;
  playing?: boolean;
}

export function ZenBackground({
  theme,
  reducedMotion = false,
  playing = true,
}: ZenBackgroundProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const { theme: appTheme } = useTheme();

  const isDark =
    appTheme === "dark" ||
    (appTheme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)")?.matches);

  useEffect(() => {
    const frames = theme === "fire" ? fireData.frames : rainData.frames;
    if (!frames || frames.length === 0) return;

    const preEl = preRef.current;
    if (!preEl) return;

    if (reducedMotion || !playing) {
      preEl.textContent = frames[Math.min(40, frames.length - 1)];
      return;
    }

    let currentFrame = 0;
    let lastTime = performance.now();
    let reqId: number | null = null;
    const fps = (theme === "fire" ? fireData.fps : rainData.fps) || 24;
    const frameInterval = 1000 / fps;

    preEl.textContent = frames[currentFrame];

    const loop = (time: number) => {
      reqId = requestAnimationFrame(loop);
      const deltaTime = time - lastTime;
      if (deltaTime >= frameInterval) {
        lastTime = time - (deltaTime % frameInterval);
        if (preRef.current) {
          preRef.current.textContent = frames[currentFrame];
        }
        currentFrame = (currentFrame + 1) % frames.length;
      }
    };

    reqId = requestAnimationFrame(loop);

    return () => {
      if (reqId != null) {
        cancelAnimationFrame(reqId);
        reqId = null;
      }
    };
  }, [theme, playing, reducedMotion]);

  const initialFrames = theme === "fire" ? fireData.frames : rainData.frames;
  const initialText = initialFrames && initialFrames.length > 40 ? initialFrames[40] : "";
  const activeColor = isDark
    ? THEME_ASCII_COLORS[theme].dark
    : THEME_ASCII_COLORS[theme].light;

  return (
    <div className="zen-layer" aria-hidden="true">
      <div className="zen-ascii-bg">
        <pre
          ref={preRef}
          className="select-none transition-colors duration-500 font-mono"
          style={{ color: activeColor }}
        >
          {initialText}
        </pre>
      </div>
      {/* Radial spotlight overlay ONLY active in dark mode to prevent murky muddy screen in light mode */}
      {isDark && (
        <div
          className="zen-ascii-overlay"
          style={{ background: THEME_OVERLAYS[theme] }}
        />
      )}
    </div>
  );
}
