"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "How does the tab-switching penalty work?",
    a: "Lock-In listens to the browser document visibility API and window blur events. When you navigate away from the session window to check social media or other tabs, the app adds a +2 minute penalty cooldown to your sprint and pauses the active countdown.",
  },
  {
    q: "Is any user data or focus history sent to a server?",
    a: "No. Lock-In is strictly local-first and client-side. All session records, completed milestones, and unlocked badges are saved exclusively in your browser's localStorage. Zero analytics or telemetry tracking scripts are loaded.",
  },
  {
    q: "How are ambient sounds generated and how does YouTube lofi work?",
    a: "Soundscapes are synthesized locally in real time using the browser Web Audio API (noise buffers, biquad filters, and oscillators). You can also provide any YouTube lofi link, which plays automatically in the background when your sprint begins.",
  },
  {
    q: "Can I use Lock-In completely offline?",
    a: "Yes. Once the web application or Windows binary is loaded, no internet connection is required. All timer logic, audio generation, and badge rewards work offline.",
  },
  {
    q: "What keyboard shortcuts are supported during a sprint?",
    a: "Press F for Fire matrix theme, R for Rain matrix theme, M to mute all audio, and keys 1 and 2 to toggle wind and fireplace procedural synthesizers.",
  },
  {
    q: "Why is there only one reset allowed per session?",
    a: "Standard timers allow users to reset whenever they feel tired or lose focus, which weakens discipline. Limiting resets to a single use creates genuine accountability to complete what you start.",
  },
];

export function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 px-4 max-w-4xl mx-auto border-t border-neutral-200 scroll-mt-20 font-sans">
      <div className="text-left max-w-2xl mb-12">
        <span className="text-xs font-geist uppercase tracking-widest text-[#f85121] font-bold">
          FAQ
        </span>
        <h2 className="font-garamond text-4xl sm:text-5xl font-normal tracking-tight text-[#0f172a] mt-2 mb-3">
          Frequently asked questions
        </h2>
        <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed text-pretty font-light">
          Everything you need to know about <span className="font-serif italic font-medium">flocii</span> architecture and mechanics.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-[#f8fafc] border border-neutral-200 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-3.5 text-left flex items-center justify-between gap-4 text-[8px] sm:text-base font-garamond text-[#0f172a] hover:text-[#f85121] transition-colors"
                aria-expanded={isOpen}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#f85121]" : ""
                    }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-200 pt-4 animate-in fade-in duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
