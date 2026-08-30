"use client";

import { Check, ShieldCheck, Zap, Sparkles, Terminal, Flame, Coffee, Moon } from "lucide-react";

export function HowItWorks() {
  return (
    <section className="py-28 px-4 max-w-6xl mx-auto border-t border-neutral-200 font-sans">
      {/* Editorial Header inspired by NEMO OS / design.md */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffedd5] border border-[#fed7aa] text-xs font-geist text-[#c2410c] font-semibold">
          <span>WORKFLOW BLUEPRINT</span>
        </div>
        <h2 className="font-garamond text-4xl sm:text-6xl font-normal tracking-tight text-[#0f172a]">
          How <span className="italic font-serif">flocii</span> enforces momentum
        </h2>
        <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed text-pretty font-light">
          Three sequential phases engineered to isolate your attention and eliminate task fracturing.
        </p>
      </div>

      {/* Editorial Layout: Left Highlighted Parchment Step vs Right Deep Olive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
        {/* Step 1: Warm Parchment Editorial Box (Nemo OS Inspired) */}
        <div className="md:col-span-5 bg-[#FAF6F0] border border-[#E8DFC8] rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-geist text-xs uppercase tracking-widest text-[#78350F] font-bold">
                PHASE 01
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#fde68a] text-[#854d0e] font-geist text-[11px] font-bold">
                MANDATORY
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-garamond text-3xl sm:text-4xl text-[#291D00] font-normal tracking-tight">
                Single Goal Declaration
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#574c35] leading-relaxed font-normal">
                Declare exactly one deliverable before the timer starts. Multitasking is mathematically locked out.
              </p>
            </div>

            {/* Simulated Objective Input Chip */}
            <div className="p-4 bg-white/90 border border-[#e0d6be] rounded-2xl space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-[11px] font-geist text-[#78350f]">
                <span>Deliverable Target</span>
                <span className="text-[#f85121] font-bold">*</span>
              </div>
              <div className="font-serif italic text-sm text-[#1c1917]">
                &ldquo;Ship auth verification handler&rdquo;
              </div>
            </div>

            <ul className="space-y-2 text-xs text-[#574c35] pt-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#3D6F12] shrink-0" />
                <span>Zero task switching allowed</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#3D6F12] shrink-0" />
                <span>Locked into browser localStorage</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-[#e2d8be] mt-6 flex items-center justify-between text-[11px] font-geist text-[#78350F]">
            <span>Commitment Gate</span>
            <span className="font-bold text-[#3D6F12]">Uncompromising</span>
          </div>
        </div>

        {/* Steps 2 & 3: Deep Forest Olive & Charcoal Editorial Stack */}
        <div className="md:col-span-7 flex flex-col justify-between gap-6">
          {/* Phase 02: Deep Botanical Olive Card */}
          <div className="bg-[#2d4d1d] text-white rounded-3xl p-8 sm:p-9 shadow-lg relative overflow-hidden flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-geist text-xs uppercase tracking-widest text-[#a3e635] font-bold">
                PHASE 02
              </span>
              <span className="px-3 py-0.5 rounded-full bg-white/10 text-white font-geist text-[11px] font-bold border border-white/20">
                IMMERSION
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-garamond text-2xl sm:text-3xl text-white font-normal tracking-tight">
                Full-Screen Zen Lockdown
              </h3>
              <p className="font-sans text-xs sm:text-sm text-neutral-200 leading-relaxed font-light">
                Launch ASCII matrices in Fire or Rain modes. Pair with procedural wind synthesizers or your custom YouTube stream with zero distracting browser UI.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-white/10 border border-white/15 rounded-xl text-xs font-geist flex items-center gap-2 text-white">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Fire / Rain ASCII</span>
              </div>
              <div className="p-3 bg-white/10 border border-white/15 rounded-xl text-xs font-geist flex items-center gap-2 text-white">
                <Coffee className="w-4 h-4 text-cyan-300" />
                <span>YouTube Lofi Stream</span>
              </div>
            </div>
          </div>

          {/* Phase 03: High-Contrast Obsidian Penalty Card */}
          <div className="bg-[#0f172a] text-white border border-neutral-800 rounded-3xl p-8 sm:p-9 shadow-lg relative overflow-hidden flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-geist text-xs uppercase tracking-widest text-[#f85121] font-bold">
                PHASE 03
              </span>
              <span className="px-3 py-0.5 rounded-full bg-red-500/20 text-red-300 font-geist text-[11px] font-bold border border-red-500/30">
                +120S PENALTY
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-garamond text-2xl sm:text-3xl text-white font-normal tracking-tight">
                Brutal Accountability
              </h3>
              <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                If your window loses focus or you navigate to social media tabs, the sprint pauses and a mandatory +2 minute penalty is added to your remaining time.
              </p>
            </div>

            <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-xl flex items-center justify-between text-xs font-geist text-red-200">
              <span>Single Reset Rule</span>
              <span className="font-bold text-red-400">Max 1 Per Sprint</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
