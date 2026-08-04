"use client";

import { useEffect, useRef } from "react";
import { AsciiPlayer, THEME_OVERLAYS } from "@/lib/zen/asciiPlayer";
import type { ZenTheme } from "@/lib/zen/types";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<AsciiPlayer | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!container) return;

    let cancelled = false;
    const player = new AsciiPlayer(theme, container, overlay);
    playerRef.current = player;

    void player.load().then((ok) => {
      if (cancelled || !ok) return;
      if (reducedMotion || !playing) player.showStatic();
      else player.play();
    });

    return () => {
      cancelled = true;
      player.destroy();
      playerRef.current = null;
    };
  }, [theme]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    if (reducedMotion) {
      player.showStatic();
      return;
    }
    if (playing) player.play();
    else player.pause();
  }, [playing, reducedMotion]);

  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.style.background = THEME_OVERLAYS[theme];
    }
  }, [theme]);

  return (
    <div className="zen-layer" aria-hidden="true">
      <div ref={containerRef} className="zen-ascii-bg" />
      <div ref={overlayRef} className="zen-ascii-overlay" />
    </div>
  );
}
