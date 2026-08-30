"use client";

import { useEffect, useRef, useState } from "react";

const TAGLINE_TEXT = "Attention is scarce. Context switching is costly. flocii turns your screen into a ruthless focus sanctuary.";

export function TaglineReveal() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeWordsCount, setActiveWordsCount] = useState(0);

  const words = TAGLINE_TEXT.split(" ");

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Smooth scroll-based word fade progression
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.35;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));

      const wordsToHighlight = Math.floor(progress * words.length);
      setActiveWordsCount(wordsToHighlight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [words.length]);

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-32 px-6 flex justify-center items-center text-center bg-white text-[#0f172a]"
      aria-label="Core mission statement"
    >
      <div className="max-w-[780px] mx-auto">
        <p className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-[1.3] text-balance select-none">
          {words.map((word, idx) => {
            const isHighlighted = idx <= activeWordsCount;
            return (
              <span
                key={idx}
                className={`inline-block mr-[0.3em] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  isHighlighted
                    ? "text-[#0f172a] opacity-100 blur-0 font-medium"
                    : "text-neutral-400 opacity-25 blur-[0.5px]"
                }`}
              >
                {word}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
