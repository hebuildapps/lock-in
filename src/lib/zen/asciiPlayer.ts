import type { ZenTheme } from "./types";

export type ThemeOverlay = Record<ZenTheme, string>;

export const THEME_OVERLAYS: ThemeOverlay = {
  fire: "radial-gradient(circle at center, rgba(255,120,0,0.8) 0%, rgba(10,10,10,1) 85%)",
  rain: "radial-gradient(circle at center, rgba(80,120,200,0.6) 0%, rgba(10,10,10,1) 85%)",
};

interface FrameIndex {
  fps: number;
  frames: string[];
}

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

  async load(): Promise<boolean> {
    try {
      const base = `/zen/frames/${this.theme}`;
      const indexRes = await fetch(`${base}/index.json`);
      if (!indexRes.ok) throw new Error(`index.json ${indexRes.status}`);
      const index = (await indexRes.json()) as FrameIndex;
      this.fps = index.fps || 24;
      this.frameInterval = 1000 / this.fps;

      // Load frames in batches of 15 to avoid saturating HTTP/2 connections
      const texts: string[] = [];
      const batchSize = 15;
      for (let i = 0; i < index.frames.length; i += batchSize) {
        const chunk = index.frames.slice(i, i + batchSize);
        const chunkTexts = await Promise.all(
          chunk.map(async (name) => {
            const res = await fetch(`${base}/${name}`);
            if (!res.ok) throw new Error(`frame ${name}`);
            return res.text();
          })
        );
        texts.push(...chunkTexts);
      }

      if (this.destroyed) return false;
      this.frames = texts;
      if (this.frames.length > 0) {
        this.containerEl.innerHTML = "";
        const pre = document.createElement("pre");
        pre.textContent = this.frames[0];
        this.containerEl.appendChild(pre);
      }
      return this.frames.length > 0;
    } catch (err) {
      console.warn("Generating built-in procedural ASCII frames:", err);
      // Generate guaranteed built-in animated ASCII frames so Zen Mode NEVER fails
      this.frames = this.generateBuiltinFrames(this.theme);
      this.fps = 24;
      this.frameInterval = 1000 / 24;

      if (!this.destroyed && this.frames.length > 0) {
        this.containerEl.innerHTML = "";
        const pre = document.createElement("pre");
        pre.textContent = this.frames[0];
        this.containerEl.appendChild(pre);
        return true;
      }
      return false;
    }
  }

  private generateBuiltinFrames(theme: ZenTheme): string[] {
    const frames: string[] = [];
    const width = 80;
    const height = 24;

    if (theme === "fire") {
      const chars = [" ", ".", "^", ":", "*", "s", "S", "#", "@"];
      for (let f = 0; f < 30; f++) {
        let frameStr = "";
        for (let y = 0; y < height; y++) {
          let line = "";
          for (let x = 0; x < width; x++) {
            const distFromCenter = Math.abs(x - width / 2) / (width / 2);
            const intensity = Math.max(0, 1 - y / height - distFromCenter * 0.7 + Math.sin(x * 0.3 + f * 0.4) * 0.2);
            const charIdx = Math.min(chars.length - 1, Math.max(0, Math.floor(intensity * chars.length)));
            line += chars[charIdx];
          }
          frameStr += line + "\n";
        }
        frames.push(frameStr);
      }
    } else {
      // Rain ASCII generator
      const rainChars = [" ", " ", " ", ".", ":", "|", "!", "i", "l", "/"];
      for (let f = 0; f < 30; f++) {
        let frameStr = "";
        for (let y = 0; y < height; y++) {
          let line = "";
          for (let x = 0; x < width; x++) {
            const drop = (x * 7 + (y - f * 2) * 13) % 29 === 0 ? rainChars[(x + y) % rainChars.length] : " ";
            line += drop;
          }
          frameStr += line + "\n";
        }
        frames.push(frameStr);
      }
    }
    return frames;
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
