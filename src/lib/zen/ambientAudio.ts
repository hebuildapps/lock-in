import type { AmbientTrack } from "./types";
import { AMBIENT_TRACKS } from "./types";

type AmbientNode = {
  stop: () => void;
  gainNode: GainNode;
};

class AmbientAudioEngine {
  private audioCtx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private nodes: Partial<Record<AmbientTrack, AmbientNode>> = {};
  private soundEnabled = true;
  private volume = 0.5;

  ensureAudio() {
    if (this.audioCtx) return;
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    this.audioCtx = new Ctx();
    this.masterGain = this.audioCtx.createGain();
    this.masterGain.gain.value = this.soundEnabled ? this.volume : 0;
    this.masterGain.connect(this.audioCtx.destination);
    void this.audioCtx.resume?.().catch(() => {});
  }

  setEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    this.applyMaster();
    if (!enabled) this.stopAll();
  }

  isEnabled() {
    return this.soundEnabled;
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.applyMaster();
  }

  getVolume() {
    return this.volume;
  }

  getActiveTracks() {
    return AMBIENT_TRACKS.filter((t) => this.nodes[t]);
  }

  private applyMaster() {
    if (!this.audioCtx || !this.masterGain) return;
    const now = this.audioCtx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setTargetAtTime(
      this.soundEnabled ? this.volume : 0,
      now,
      0.02
    );
  }

  private makeNoiseBuffer(ctx: AudioContext) {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.6 + (Math.random() * 2 - 1) * 0.2;
    }
    return buffer;
  }

  stop(key: AmbientTrack) {
    const node = this.nodes[key];
    if (!node) return;
    node.stop();
    delete this.nodes[key];
  }

  stopAll() {
    (Object.keys(this.nodes) as AmbientTrack[]).forEach((k) => this.stop(k));
  }

  toggleTrack(key: AmbientTrack) {
    if (!this.soundEnabled) return null;
    if (this.nodes[key]) {
      this.stop(key);
    } else {
      this.start(key);
    }
    return this.getActiveTracks();
  }

  playTrack(key: AmbientTrack) {
    if (!this.soundEnabled) return;
    this.start(key);
  }

  private start(key: AmbientTrack) {
    this.ensureAudio();
    if (!this.audioCtx || !this.masterGain) return;
    if (this.audioCtx.state === "suspended") {
      void this.audioCtx.resume?.().catch(() => {});
    }

    const ctx = this.audioCtx;
    const outGain = ctx.createGain();
    outGain.gain.value = 0;
    outGain.connect(this.masterGain);

    const now = ctx.currentTime;
    const targetVol = 0.8;
    outGain.gain.setValueAtTime(0, now);
    outGain.gain.linearRampToValueAtTime(targetVol, now + 0.6);

    const noise = ctx.createBufferSource();
    noise.buffer = this.makeNoiseBuffer(ctx);
    noise.loop = true;

    let stopFn = () => {};

    if (key === "wind") {
      const hp = ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 180;
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 900;

      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.value = 0.08;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.35;
      lfo.connect(lfoGain);
      lfoGain.connect(outGain.gain);

      noise.connect(hp);
      hp.connect(lp);
      lp.connect(outGain);
      noise.start();
      lfo.start();

      stopFn = () => {
        const t = ctx.currentTime;
        outGain.gain.cancelScheduledValues(t);
        outGain.gain.setTargetAtTime(0, t, 0.05);
        setTimeout(() => {
          try {
            noise.stop();
          } catch {
            /* noop */
          }
          try {
            lfo.stop();
          } catch {
            /* noop */
          }
          noise.disconnect();
          hp.disconnect();
          lp.disconnect();
          lfo.disconnect();
          lfoGain.disconnect();
          outGain.disconnect();
        }, 350);
      };
    } else if (key === "fireplace") {
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 900;
      lp.Q.value = 0.7;
      const trem = ctx.createOscillator();
      trem.type = "sine";
      trem.frequency.value = 0.2;
      const tremGain = ctx.createGain();
      tremGain.gain.value = 0.45;
      trem.connect(tremGain);
      tremGain.connect(outGain.gain);

      noise.connect(lp);
      lp.connect(outGain);
      noise.start();
      trem.start();

      const crackle = ctx.createBufferSource();
      crackle.buffer = this.makeNoiseBuffer(ctx);
      const crackleGain = ctx.createGain();
      crackleGain.gain.value = 0;
      const crackleLP = ctx.createBiquadFilter();
      crackleLP.type = "lowpass";
      crackleLP.frequency.value = 3500;
      crackle.connect(crackleLP);
      crackleLP.connect(crackleGain);
      crackleGain.connect(outGain);
      crackle.loop = true;

      const crackleInterval = setInterval(() => {
        if (!this.nodes[key]) return;
        const t = ctx.currentTime;
        crackleGain.gain.cancelScheduledValues(t);
        crackleGain.gain.setValueAtTime(0, t);
        crackleGain.gain.linearRampToValueAtTime(0.5, t + 0.01);
        crackleGain.gain.linearRampToValueAtTime(0, t + 0.08);
      }, 520);

      crackle.start();

      stopFn = () => {
        clearInterval(crackleInterval);
        const t = ctx.currentTime;
        outGain.gain.cancelScheduledValues(t);
        outGain.gain.setTargetAtTime(0, t, 0.05);
        setTimeout(() => {
          try {
            noise.stop();
          } catch {
            /* noop */
          }
          try {
            trem.stop();
          } catch {
            /* noop */
          }
          try {
            crackle.stop();
          } catch {
            /* noop */
          }
          noise.disconnect();
          lp.disconnect();
          trem.disconnect();
          tremGain.disconnect();
          crackle.disconnect();
          crackleLP.disconnect();
          crackleGain.disconnect();
          outGain.disconnect();
        }, 400);
      };
    }

    this.nodes[key] = { stop: stopFn, gainNode: outGain };
  }

  destroy() {
    this.stopAll();
    if (this.audioCtx) {
      void this.audioCtx.close().catch(() => {});
      this.audioCtx = null;
      this.masterGain = null;
    }
  }
}

let engine: AmbientAudioEngine | null = null;

export function getAmbientEngine() {
  if (typeof window === "undefined") return null;
  if (!engine) engine = new AmbientAudioEngine();
  return engine;
}
