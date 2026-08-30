import type { ZenTheme } from "./types";
import fireData from "./fireFrames.json";
import rainData from "./rainFrames.json";

export type ThemeOverlay = Record<ZenTheme, string>;

export const THEME_OVERLAYS: ThemeOverlay = {
  fire: "radial-gradient(circle at center, rgba(255,120,0,0.8) 0%, rgba(10,10,10,1) 85%)",
  rain: "radial-gradient(circle at center, rgba(80,120,200,0.6) 0%, rgba(10,10,10,1) 85%)",
};

const THEME_BUNDLED_FRAMES: Record<ZenTheme, { fps: number; frames: string[] }> = {
  fire: fireData,
  rain: rainData,
};

export class AsciiPlayer {
  theme: ZenTheme;
  private containerEl: HTMLElement;
  private overlayEl: HTMLElement | null;
  private frames: string[] = [];
  private currentFrame = 0;
  private isPlaying = false;
  private reqId: number | null = null;
  private lastTime = 0;
  private fps = 24;
  private frameInterval = 1000 / 24;
  private destroyed = false;

  constructor(
    theme: ZenTheme,
    containerEl: HTMLElement,
    overlayEl: HTMLElement | null
  ) {
    this.theme = theme;
    this.containerEl = containerEl;
    this.overlayEl = overlayEl;
    this.applyTheme();
  }

  // Instant synchronous memory load - ZERO network fetch delay
  async load(): Promise<boolean> {
    try {
      const bundle = THEME_BUNDLED_FRAMES[this.theme];
      if (bundle && bundle.frames && bundle.frames.length > 0) {
        this.fps = bundle.fps || 24;
        this.frameInterval = 1000 / this.fps;
        this.frames = bundle.frames;

        if (!this.destroyed && this.frames.length > 0) {
          this.containerEl.innerHTML = "";
          const pre = document.createElement("pre");
          pre.textContent = this.frames[0];
          this.containerEl.appendChild(pre);
          return true;
        }
      }
      return false;
    } catch (err) {
      console.error("[AsciiPlayer] Error loading bundled frames:", err);
      this.frames = [];
      return false;
    }
  }

  applyTheme() {
    if (!this.overlayEl) return;
    this.overlayEl.style.background = THEME_OVERLAYS[this.theme];
  }

  showStatic() {
    if (this.frames.length === 0) return;
    this.pause();
    const pre = this.containerEl.querySelector("pre");
    if (pre) pre.textContent = this.frames[0];
    else {
      this.containerEl.innerHTML = "";
      const el = document.createElement("pre");
      el.textContent = this.frames[0];
      this.containerEl.appendChild(el);
    }
  }

  play() {
    if (this.frames.length === 0 || this.destroyed) return;
    this.isPlaying = true;
    this.lastTime = performance.now();
    if (this.reqId == null) {
      this.reqId = requestAnimationFrame(this.loop);
    }
  }

  pause() {
    this.isPlaying = false;
    if (this.reqId != null) {
      cancelAnimationFrame(this.reqId);
      this.reqId = null;
    }
  }

  destroy() {
    this.destroyed = true;
    this.pause();
    this.containerEl.innerHTML = "";
    this.frames = [];
  }

  private loop = (time: number) => {
    if (!this.isPlaying || this.destroyed) {
      this.reqId = null;
      return;
    }

    this.reqId = requestAnimationFrame(this.loop);

    const deltaTime = time - this.lastTime;
    if (deltaTime >= this.frameInterval) {
      this.lastTime = time - (deltaTime % this.frameInterval);
      const pre = this.containerEl.querySelector("pre");
      if (pre) {
        pre.textContent = this.frames[this.currentFrame];
      } else {
        this.containerEl.innerHTML = "";
        const el = document.createElement("pre");
        el.textContent = this.frames[this.currentFrame];
        this.containerEl.appendChild(el);
      }
      this.currentFrame = (this.currentFrame + 1) % this.frames.length;
    }
  };
}
