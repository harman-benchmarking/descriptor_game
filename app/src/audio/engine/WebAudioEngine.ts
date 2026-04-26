import type { EqFilterSpec } from "../../cards/cardTypes";
import { normalizeFilter } from "../dsp/eqFilters";
import { masterTrimForIntensity } from "../dsp/loudness";
import { rampParam } from "./AudioGraph";
import { createLoopingAudioElement } from "./TrackLoader";

type PlaybackMode = "flat" | "processed";

type BrowserAudioWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

export class WebAudioEngine {
  private context: AudioContext | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private source: MediaElementAudioSourceNode | null = null;
  private dryGain: GainNode | null = null;
  private wetGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private eqNodes: BiquadFilterNode[] = [];
  private trackSrc: string;
  private playing = false;

  constructor(trackSrc: string) {
    this.trackSrc = trackSrc;
  }

  get isReady() {
    return this.context !== null;
  }

  get isPlaying() {
    return this.playing;
  }

  get sampleRate() {
    return this.context?.sampleRate ?? 48000;
  }

  async initialize() {
    if (this.context) {
      await this.context.resume();
      return;
    }

    const AudioContextClass = window.AudioContext ?? (window as BrowserAudioWindow).webkitAudioContext;
    if (!AudioContextClass) {
      throw new Error("Web Audio is not available in this browser.");
    }

    this.context = new AudioContextClass();
    this.audioElement = createLoopingAudioElement(this.trackSrc);
    this.source = this.context.createMediaElementSource(this.audioElement);
    this.dryGain = this.context.createGain();
    this.wetGain = this.context.createGain();
    this.masterGain = this.context.createGain();

    this.dryGain.gain.value = 0;
    this.wetGain.gain.value = 1;
    this.masterGain.gain.value = 0.82;

    this.dryGain.connect(this.masterGain);
    this.wetGain.connect(this.masterGain);
    this.masterGain.connect(this.context.destination);
    this.rebuildEqChainIfNeeded(0);

    await this.context.resume();
  }

  async setTrack(src: string) {
    this.trackSrc = src;
    if (!this.audioElement) return;
    const shouldResume = !this.audioElement.paused;
    this.audioElement.pause();
    this.audioElement.src = src;
    this.audioElement.load();
    if (shouldResume) {
      await this.play();
    }
  }

  async play() {
    await this.initialize();
    await this.context?.resume();
    await this.audioElement?.play();
    this.playing = true;
  }

  pause() {
    this.audioElement?.pause();
    this.playing = false;
  }

  setEqFilters(filters: EqFilterSpec[], intensity: number) {
    if (!this.context) return;

    const now = this.context.currentTime;
    const safeFilters = filters.slice(0, 8).map((filter) => normalizeFilter(filter, this.context!.sampleRate, intensity));

    this.rebuildEqChainIfNeeded(safeFilters.length);

    safeFilters.forEach((filter, index) => {
      const node = this.eqNodes[index];
      node.type = "peaking";
      rampParam(node.frequency, filter.frequencyHz, now, 0.02);
      rampParam(node.gain, filter.gainDb, now, 0.02);
      rampParam(node.Q, filter.q, now, 0.02);
    });

    if (this.masterGain) {
      rampParam(this.masterGain.gain, masterTrimForIntensity(intensity), now, 0.02);
    }
  }

  setPlaybackMode(mode: PlaybackMode) {
    if (!this.context || !this.dryGain || !this.wetGain) return;
    const now = this.context.currentTime;
    const fade = 0.008;
    rampParam(this.dryGain.gain, mode === "flat" ? 1 : 0, now, fade);
    rampParam(this.wetGain.gain, mode === "processed" ? 1 : 0, now, fade);
  }

  clearEq() {
    this.setEqFilters([], 1);
  }

  dispose() {
    this.pause();
    this.source?.disconnect();
    this.eqNodes.forEach((node) => node.disconnect());
    this.dryGain?.disconnect();
    this.wetGain?.disconnect();
    this.masterGain?.disconnect();
    void this.context?.close();
    this.context = null;
  }

  private rebuildEqChainIfNeeded(count: number) {
    if (!this.context || !this.source || !this.dryGain || !this.wetGain) return;
    if (this.eqNodes.length === count) {
      this.connectChain();
      return;
    }

    this.eqNodes.forEach((node) => node.disconnect());
    this.eqNodes = Array.from({ length: count }, () => this.context!.createBiquadFilter());
    this.connectChain();
  }

  private connectChain() {
    if (!this.source || !this.dryGain || !this.wetGain) return;

    this.source.disconnect();
    this.eqNodes.forEach((node) => node.disconnect());
    this.source.connect(this.dryGain);

    if (this.eqNodes.length === 0) {
      this.source.connect(this.wetGain);
      return;
    }

    this.source.connect(this.eqNodes[0]);
    this.eqNodes.forEach((node, index) => {
      const next = this.eqNodes[index + 1] ?? this.wetGain;
      node.connect(next);
    });
  }
}
