"use client";

import { useEffect, useRef, useState } from "react";

const TARGET_TEXT = "Attention is scarce. Context switching is costly. Lock-In turns your screen into a ruthless focus sanctuary.";
const GLYPHS = "01#*/&%$@_!><~";

export function TaglineReveal() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [displayText, setDisplayText] = useState("");
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || hasTriggered) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Trigger when within reading viewport
      if (rect.top <= windowHeight * 0.75) {
        setHasTriggered(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasTriggered]);

  useEffect(() => {
    if (!hasTriggered) {
      // Show scrambled preview initially
      const scrambled = TARGET_TEXT.split("")
        .map((char) => (char === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
        .join("");
      setDisplayText(scrambled);
      return;
    }

    let iteration = 0;
    const maxIterations = TARGET_TEXT.length;
    
    const interval = setInterval(() => {
      setDisplayText((_) => {
        return TARGET_TEXT.split("")
          .map((letter, index) => {
            if (index < iteration) {
              return letter;
            }
            if (letter === " " || letter === "." || letter === "-") {
              return letter;
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");
      });

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(TARGET_TEXT);
      }

      iteration += 1.5;
    }, 28);

    return () => clearInterval(interval);
  }, [hasTriggered]);

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-32 px-6 flex justify-center items-center text-center bg-white text-[#0f172a]"
      aria-label="Mission statement"
    >
      <div className="max-w-[780px] mx-auto">
        <p className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.25] text-[#0f172a] select-none">
          &ldquo;{displayText}&rdquo;
        </p>
      </div>
    </section>
  );
}
