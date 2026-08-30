"use client";

import { useState } from "react";
import { Play, ShieldAlert, Sparkles, Volume2, Maximize, Clock, ShieldCheck, Terminal, Youtube } from "lucide-react";
import { InteractiveSessionWidget } from "./InteractiveSessionWidget";

export function CoreMechanics() {
  const [activeTab, setActiveTab] = useState<"sandbox" | "video">("sandbox");

  return (
    <div className="w-full bg-white text-[#0f172a] space-y-24">
      {/* 1. App Demo Showcase (Replaces Sloppy Section) */}
      <section id="demo-showcase" className="max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#f85121] font-bold">
            LIVE PROTOCOL DEMO
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0f172a]">
            Experience deep work in action
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 text-pretty">
            Test the sprint timer, preview procedural soundscapes, or simulate what happens when you switch tabs.
          </p>
        </div>

        {/* Demo Container */}
        <div className="bg-[#f8fafc] border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          {/* Tab Selector */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveTab("sandbox")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all ${
                activeTab === "sandbox"
                  ? "bg-[#0f172a] text-white shadow-sm"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
              }`}
            >
              Interactive Sandbox
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all ${
                activeTab === "video"
                  ? "bg-[#0f172a] text-white shadow-sm"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
              }`}
            >
              Demo Video Player
            </button>
          </div>

          {activeTab === "sandbox" ? (
            <div className="max-w-xl mx-auto">
              <InteractiveSessionWidget />
            </div>
          ) : (
            <div className="max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden bg-black border border-neutral-800 shadow-2xl relative flex items-center justify-center">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/gen-landingpg-illustration.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-white text-xs font-mono text-center">
                  <span>Custom App Walkthrough Ready</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. Replit-Style High-Impact Orange Showcase Section with Custom Metallic Bevel Frames */}
      <section className="w-full bg-[#f85121] py-24 sm:py-32 px-4 sm:px-6 text-white overflow-hidden relative">
        <div className="max-w-6xl mx-auto space-y-20">
          {/* Main Orange Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold bg-white/10 px-3 py-1 rounded-full border border-white/20">
              AGENT OF DISCIPLINE
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              Ruthless focus by design.
            </h2>
            <p className="text-base sm:text-lg text-white/90 font-normal max-w-xl mx-auto text-pretty">
              Every mechanism in Lock-In is built with one clear mandate: eliminate context switching and keep you in deep flow.
            </p>
          </div>

          {/* Alternating 3-Card Stream */}
          <div className="space-y-16 sm:space-y-24 max-w-5xl mx-auto">
            {/* Feature Row 1: Tab Penalty Engine (Left: Beveled Metallic Frame Mock, Right: Copy) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="replit-frame-outer">
                <div className="replit-frame-inner p-6 sm:p-8 space-y-4 text-white">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-neutral-400">
                    <span className="text-amber-400 flex items-center gap-1.5 font-semibold">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Visibility Penalty Trigger</span>
                    </span>
                    <span className="bg-white/10 px-2 py-0.5 rounded text-white font-mono">+120s</span>
                  </div>
                  <div className="p-6 bg-[#0a1018] rounded-xl text-center space-y-2 border border-red-500/30">
                    <div className="text-4xl sm:text-5xl font-mono font-bold text-white tabular-nums tracking-tight">
                      01:58:00
                    </div>
                    <div className="text-xs font-mono text-red-400">
                      Tab Switch Detected • Timer Cooldown
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-1">
                    <span>Document.visibilityState</span>
                    <span className="text-emerald-400 font-bold">Enforced</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-left">
                <span className="text-xs font-mono uppercase tracking-wider text-white/80 font-semibold">
                  01 / VISIBILITY ENFORCEMENT
                </span>
                <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                  Stop window drifting before it breaks your flow
                </h3>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                  Lock-In monitors browser focus. Navigating away to social media or secondary tabs pauses the active sprint and applies an enforced 2-minute penalty cooldown.
                </p>
              </div>
            </div>

            {/* Feature Row 2: Pure ASCII Zen Canvas (Left: Copy, Right: Beveled Metallic Frame Mock) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="space-y-4 text-left order-2 md:order-1">
                <span className="text-xs font-mono uppercase tracking-wider text-white/80 font-semibold">
                  02 / TOTAL IMMERSION
                </span>
                <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                  ASCII Zen Matrix & JetBrains Mono Clock
                </h3>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                  Eliminate visual clutter with animated ASCII canvas themes (Fire and Rain matrices) and a crystal-clear digital clock rendered in JetBrains Mono Nerf font.
                </p>
              </div>

              <div className="replit-frame-outer order-1 md:order-2">
                <div className="replit-frame-inner p-6 sm:p-8 space-y-4 text-white">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-neutral-400">
                    <span className="text-cyan-400 font-semibold">ASCII Zen Canvas</span>
                    <span className="bg-white/10 px-2 py-0.5 rounded text-white font-mono">JetBrains Mono</span>
                  </div>
                  <div className="p-8 bg-[#0a1018] rounded-xl text-center space-y-3 border border-cyan-500/20">
                    <div className="text-4xl sm:text-5xl font-mono font-bold text-cyan-300 tabular-nums tracking-tight">
                      02:00:00
                    </div>
                    <div className="text-xs font-mono text-neutral-400">
                      &ldquo;Ship Authentication Protocol&rdquo;
                    </div>
                  </div>
                  <div className="flex items-center justify-around text-[11px] font-mono text-neutral-400 pt-1">
                    <span>[F] Fire</span>
                    <span>•</span>
                    <span>[R] Rain</span>
                    <span>•</span>
                    <span>[M] Mute</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Row 3: Audio Synthesizer & YouTube Lofi (Left: Beveled Metallic Frame Mock, Right: Copy) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="replit-frame-outer">
                <div className="replit-frame-inner p-6 sm:p-8 space-y-4 text-white">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-neutral-400">
                    <span className="text-emerald-400 font-semibold">Audio Protocol</span>
                    <span className="bg-white/10 px-2 py-0.5 rounded text-white font-mono">Web Audio API</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-neutral-300">
                      Wind Resonator (180Hz)
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-neutral-300">
                      Fireplace Synth (900Hz)
                    </div>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between text-xs font-mono text-white">
                    <span className="flex items-center gap-1.5">
                      <Youtube className="w-4 h-4 text-red-500" />
                      <span>YouTube Lofi Stream</span>
                    </span>
                    <span className="text-emerald-400 font-bold">Active</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-left">
                <span className="text-xs font-mono uppercase tracking-wider text-white/80 font-semibold">
                  03 / AUDITORY ISOLATION
                </span>
                <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                  In-browser synthesis or your custom YouTube lofi
                </h3>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                  Synthesize isolation noise directly in browser with 0 KB network bandwidth, or feed your own YouTube lofi live streams that play automatically as soon as your sprint starts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
