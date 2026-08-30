"use client";

import { useEffect, useRef } from "react";

interface YouTubeAudioPlayerProps {
  url?: string;
  playing: boolean;
  volume?: number;
}

export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  
  // Direct 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  
  // Standard URLs (youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID, youtube.com/live/ID)
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|live\/)([^#&?]*).*/;
  const match = trimmed.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export function YouTubeAudioPlayer({ url, playing, volume = 0.5 }: YouTubeAudioPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoId = url ? extractYouTubeVideoId(url) : null;

  useEffect(() => {
    if (!iframeRef.current || !videoId) return;

    try {
      if (playing) {
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "playVideo", args: [] }),
          "*"
        );
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "setVolume", args: [Math.round(volume * 100)] }),
          "*"
        );
      } else {
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
          "*"
        );
      }
    } catch {
      // ignore cross-origin postMessage warnings
    }
  }, [playing, videoId, volume]);

  if (!videoId) return null;

  return (
    <div className="hidden pointer-events-none" aria-hidden="true">
      <iframe
        ref={iframeRef}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&autoplay=${playing ? 1 : 0}&loop=1&playlist=${videoId}&controls=0`}
        allow="autoplay"
        title="Background YouTube Lofi Player"
      />
    </div>
  );
}
