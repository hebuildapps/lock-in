"use client";

import { Download, Play, Monitor, PlayCircle } from "lucide-react";

interface LandingHeroProps {
  onLaunchApp: () => void;
  onOpenDownload: () => void;
}

export function LandingHero({ onLaunchApp, onOpenDownload }: LandingHeroProps) {
  const scrollToDemo = () => {
    const el = document.getElementById("demo-showcase");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black">
      {/* Background Video Layer - No zoom, no color tint layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-[100%] h-[95%] object-cover object-center"
        >
          <source src="/gen-landingpg-illustration.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Hero Content Overlay (Relay/Higgsfield layout) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 pt-32 sm:pt-36 pb-32 sm:pb-36 flex-1 flex flex-col justify-between">
        {/* Top Tag & Title Area */}
        <div className="max-w-2xl space-y-5 text-left font-sans">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-xs font-geist text-neutral-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f85121]" />
            <span className="tracking-wide">Deep Work Protocol</span>
          </div>

          <h1 className="font-garamond text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-[0.98] drop-shadow-xl">
            Real focus, <br />
            <span className="italic font-serif">real control.</span>
          </h1>

          <p className="font-sans text-sm sm:text-base md:text-lg text-white/90 max-w-lg font-light leading-relaxed drop-shadow-md">
            The focus utility that enforces brutal accountability with tab loss penalties, procedural synthesizers, and ASCII Zen immersion.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2 font-sans">
            <button
              onClick={onLaunchApp}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-neutral-100 text-black font-medium text-sm shadow-2xl transition-all active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Zen Sprint</span>
            </button>

            <button
              onClick={scrollToDemo}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/30 text-white font-medium text-sm backdrop-blur-md transition-all active:scale-95 shadow-lg cursor-pointer"
            >
              <PlayCircle className="w-4 h-4 text-neutral-200" />
              <span>How it works</span>
            </button>
          </div>
        </div>

        {/* Bottom Metrics Bar on Video Hero (Positioned cleanly above the overlapping blur) */}
        <div className="pt-12 mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight drop-shadow">
              +120s
            </div>
            <div className="text-xs text-white/80 font-mono mt-0.5 drop-shadow">
              Tab-Drift Penalty
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight drop-shadow">
              &lt;0 KB
            </div>
            <div className="text-xs text-white/80 font-mono mt-0.5 drop-shadow">
              Audio Bandwidth
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight drop-shadow">
              1 Limit
            </div>
            <div className="text-xs text-white/80 font-mono mt-0.5 drop-shadow">
              Single Reset Rule
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#f85121] tracking-tight drop-shadow">
              100%
            </div>
            <div className="text-xs text-white/80 font-mono mt-0.5 drop-shadow">
              Local-First Privacy
            </div>
          </div>
        </div>
      </div>

      {/* Seamless Overlapping Blur Gradient that sits directly over the video bottom */}
      <div id="hero-gradient-trigger" className="absolute bottom-0 inset-x-0 z-20 pointer-events-none overflow-hidden">
        <style dangerouslySetInnerHTML={{
          __html: `
            .gradient-overlap {
              display: block;
              width: 100%;
              height: 120px;
              position: relative;
            }
            .gradient-overlap:after {
              content: '';
              display: block;
              width: 100%;
              height: 100vw;
              background-color: rgb(255, 255, 255);
              position: absolute;
              bottom: 0;
              transform: translateY(100%);
            }
          `
        }} />
        <div
          className="gradient-overlap"
          style={{
            background: "linear-gradient(0deg, rgb(255, 255, 255), rgb(255, 255, 255), rgb(255, 255, 255), rgb(254, 254, 254), rgb(253, 253, 254), rgb(250, 251, 252), rgb(247, 248, 250), rgb(243, 244, 248), rgb(237, 239, 244), rgb(229, 232, 240), rgb(219, 224, 234), rgb(207, 214, 227), rgb(193, 201, 219), rgb(176, 187, 209), rgb(156, 170, 197), rgb(133, 150, 184), rgb(107, 128, 169), rgb(90, 109, 144), rgb(75, 92, 121), rgb(62, 78, 102), rgb(52, 66, 86), rgb(42, 55, 72), rgb(34, 46, 60), rgb(28, 39, 51), rgb(23, 34, 43), rgb(19, 29, 37), rgb(16, 26, 33), rgb(14, 23, 29), rgb(13, 22, 27), rgb(12, 21, 26), rgb(11, 20, 25), rgb(11, 20, 25), transparent)"
          }}
        />
      </div>
    </section>
  );
}
