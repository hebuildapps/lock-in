"use client";

import { useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LofiStream {
  id: string;
  title: string;
  creator: string;
  videoId: string;
}

const LOFI_STREAMS: LofiStream[] = [
  {
    id: "lofi-girl",
    title: "Cozy Reading Night 📖 Chill Lofi Beats with a City View 🌃s",
    creator: "Lofi tone art",
    videoId: "eBgVPPj4kwI",
  },
  {
    id: "synthwave",
    title: "Synthwave Radio • Chill Synth / Retro Beats",
    creator: "Lofi Girl",
    videoId: "4xDzrJKXOOY",
  },
  {
    id: "rain-lofi",
    title: "Coffee Shop & Rain Lofi Jazz Ambience",
    creator: "Calm Cafe",
    videoId: "lTRiuFIWV54",
  },
  {
    id: "tokyo-night",
    title: "Tokyo Night Walk • Asian Ambient Lo-Fi",
    creator: "ChillHop Music",
    videoId: "7NOSDKb0HlU",
  },
  {
    id: "cozy-bedroom",
    title: "Cozy Bedroom Lofi Chill Beats for Deep Work",
    creator: "Chill with Taiki",
    videoId: "5qap5aO4i9A",
  },
  {
    id: "rain-lofi",
    title: " Rain Outside the Window ☔ Gentle Lofi Beats for Relaxing ",
    creator: "lofi tone art",
    videoId: "syBlbx4vlAM",
  },
  {
    id: "anime-lofi",
    title: "Ghibli Inspired Piano Lofi Beats for Concentration",
    creator: "Studio Chill",
    videoId: "TURbeWK2wwg",
  },
  {
    id: "midnight-cafe",
    title: "Midnight Coding Lofi • Late Night Chill Sessions",
    creator: "Code & Chill",
    videoId: "rUxyKA_-grg",
  },
];

export function AudioTestBench() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Pointer drag gesture tracking
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentDragDelta = useRef(0);

  const total = LOFI_STREAMS.length;

  const handlePrev = useCallback(() => {
    setIsPlayingAudio(false);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setIsPlayingAudio(false);
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Pointer Drag Handlers
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    currentDragDelta.current = 0;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - startX.current;
    currentDragDelta.current = delta;
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
    const threshold = 60;
    if (currentDragDelta.current < -threshold) {
      handleNext();
    } else if (currentDragDelta.current > threshold) {
      handlePrev();
    }
    currentDragDelta.current = 0;
  };

  return (
    <section id="audio-bench" className="py-12 px-4 max-w-6xl mx-auto scroll-mt-20 font-sans overflow-hidden select-none">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-1 space-y-2">
        <h2 className="font-garamond text-3xl sm:text-4xl font-normal tracking-tight text-[#0f172a]">
          Curated Soundtracks for Deep Work
        </h2>
      </div>

      {/* 3D Spanned Forward Horizontal Carousel */}
      <div className="relative w-full max-w-5xl mx-auto py-0 flex flex-col items-center">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/95 hover:bg-white text-[#0f172a] shadow-xl border border-neutral-200 transition-all active:scale-95 cursor-pointer"
          aria-label="Previous lofi stream"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/95 hover:bg-white text-[#0f172a] shadow-xl border border-neutral-200 transition-all active:scale-95 cursor-pointer"
          aria-label="Next lofi stream"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Viewport */}
        <div
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="relative w-full h-[320px] sm:h-[400px] md:h-[440px] flex items-center justify-center cursor-grab touch-pan-y"
        >
          {LOFI_STREAMS.map((stream, idx) => {
            let offset = idx - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            // Wide spacing so +1 and -1 cards don't overlap awkwardly with +2 and -2
            const translateX = offset * 320;
            const scale = isCenter ? 1.05 : 0.86 - Math.abs(offset) * 0.08;

            // Critical stacking hierarchy: Center is 30, ±1 is 20, ±2 is 10
            const zIndex = 30 - Math.abs(offset) * 10;
            const opacity = 1; // Keep cards fully bright and visible

            return (
              <div
                key={stream.id}
                onMouseEnter={() => {
                  if (isCenter) setIsHovered(true);
                }}
                onMouseLeave={() => {
                  if (isCenter) {
                    setIsHovered(false);
                    setIsPlayingAudio(false);
                  }
                }}
                onClick={() => {
                  if (!isCenter) {
                    setIsPlayingAudio(false);
                    setActiveIndex(idx);
                  }
                }}
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
                className={`absolute w-[300px] sm:w-[440px] md:w-[500px] aspect-video rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] bg-black border ${isCenter
                  ? "border-[#f85121] shadow-2xl shadow-[#f85121]/20 ring-1 ring-[#f85121]/50"
                  : "border-neutral-300 shadow-xl hover:border-neutral-400"
                  }`}
              >
                {isCenter ? (
                  /* Center Active Card: Only streams when hovered / active, stops cleanly on mouse out */
                  <div className="w-full h-full relative flex items-center justify-center bg-black overflow-hidden">
                    {isHovered ? (
                      <iframe
                        className="absolute inset-0 w-full h-full border-0 pointer-events-auto"
                        src={`https://www.youtube-nocookie.com/embed/${stream.videoId}?autoplay=1&mute=${isPlayingAudio ? "0" : "1"
                          }&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0`}
                        title={stream.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    ) : (
                      /* Static Crisp Poster Frame when cursor is not inside card */
                      <img
                        src={`https://img.youtube.com/vi/${stream.videoId}/maxresdefault.jpg`}
                        alt={stream.title}
                        draggable="false"
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${stream.videoId}/hqdefault.jpg`;
                        }}
                      />
                    )}

                    {/* Big Custom Center Play SVG Button (Only visible if hovered and audio not unmuted) */}
                    {(!isHovered || !isPlayingAudio) && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsHovered(true);
                          setIsPlayingAudio(true);
                        }}
                        className="absolute inset-0 bg-black/25 z-20 flex items-center justify-center cursor-pointer group transition-all"
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#f85121] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-[#ff5722] transition-all">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 256"
                            className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-0.5"
                          >
                            <rect width="256" height="256" fill="none" />
                            <path
                              d="M72,39.88V216.12a8,8,0,0,0,12.15,6.69l144.08-88.12a7.82,7.82,0,0,0,0-13.38L84.15,33.19A8,8,0,0,0,72,39.88Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Side Cards (Crisp Full-Color Poster Preview, Normal Brightness) */
                  <div className="w-full h-full relative bg-neutral-900 pointer-events-none select-none">
                    <img
                      src={`https://img.youtube.com/vi/${stream.videoId}/hqdefault.jpg`}
                      alt={stream.title}
                      draggable="false"
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center gap-2 mt-8">
          {LOFI_STREAMS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => {
                setIsPlayingAudio(false);
                setActiveIndex(dotIdx);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${dotIdx === activeIndex
                ? "bg-[#0f172a] w-7"
                : "bg-neutral-300 hover:bg-neutral-400 w-2"
                }`}
              aria-label={`Jump to stream ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
