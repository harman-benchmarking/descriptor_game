import type { AudioProfile, DynamicProfileId, EqFilterSpec, IntegrityProfileId, SpatialProfileId } from "../../cards/cardTypes";
import { descriptorById } from "../../cards/descriptorCatalog";
import { normalizeFilter } from "../dsp/eqFilters";
import { masterTrimForIntensity } from "../dsp/loudness";
import { rampParam } from "./AudioGraph";
import { createLoopingAudioElement } from "./TrackLoader";

type PlaybackMode = "flat" | "processed";

type BrowserAudioWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

const identityCurve = (() => {
  const curve = new Float32Array(256);
  for (let index = 0; index < curve.length; index += 1) {
    curve[index] = (index / (curve.length - 1)) * 2 - 1;
  }
  return curve;
})();

function makeClipCurve(limit = 0.58) {
  const curve = new Float32Array(512);
  for (let index = 0; index < curve.length; index += 1) {
    const input = (index / (curve.length - 1)) * 2 - 1;
    curve[index] = Math.max(-limit, Math.min(limit, input)) / limit;
  }
  return curve;
}

function makeDistortionCurve(drive = 3.2) {
  const curve = new Float32Array(512);
  const normalizer = Math.tanh(drive);
  for (let index = 0; index < curve.length; index += 1) {
    const input = (index / (curve.length - 1)) * 2 - 1;
    curve[index] = Math.tanh(input * drive) / normalizer;
  }
  return curve;
}

function makeOverdriveCurve(limit = 0.62, drive = 4.2) {
  const curve = new Float32Array(512);
  const normalizer = Math.tanh(drive);
  for (let index = 0; index < curve.length; index += 1) {
    const input = (index / (curve.length - 1)) * 2 - 1;
    const saturated = Math.tanh(input * drive) / normalizer;
    curve[index] = Math.max(-limit, Math.min(limit, saturated)) / limit;
  }
  return curve;
}

function disconnectNode(node: AudioNode | null) {
  try {
    node?.disconnect();
  } catch {
    // Already disconnected. Web Audio throws for double-disconnects in some browsers.
  }
}

export class WebAudioEngine {
  private context: AudioContext | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private source: MediaElementAudioSourceNode | null = null;
  private dryGain: GainNode | null = null;
  private wetGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private spatialGain: GainNode | null = null;
  private widthSplitter: ChannelSplitterNode | null = null;
  private widthMerger: ChannelMergerNode | null = null;
  private widthLToL: GainNode | null = null;
  private widthRToL: GainNode | null = null;
  private widthLToR: GainNode | null = null;
  private widthRToR: GainNode | null = null;
  private spatialPanner: StereoPannerNode | null = null;
  private spatialTone: BiquadFilterNode | null = null;
  private reflectionDelay: DelayNode | null = null;
  private reflectionTone: BiquadFilterNode | null = null;
  private reflectionGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private dynamicGain: GainNode | null = null;
  private shaper: WaveShaperNode | null = null;
  private dropoutGain: GainNode | null = null;
  private integrityGain: GainNode | null = null;
  private eqNodes: BiquadFilterNode[] = [];
  private integritySources: Array<AudioScheduledSourceNode | AudioNode> = [];
  private integrityTimers: number[] = [];
  private trackSrc: string;
  private playing = false;
  private currentFilters: EqFilterSpec[] = [];
  private currentProfiles: AudioProfile[] = [];
  private currentEqOutputIntensity = 1;
  private currentProfileIntensity = 1;
  private currentPlaybackMode: PlaybackMode = "processed";

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
    this.spatialGain = this.context.createGain();
    this.widthSplitter = this.context.createChannelSplitter(2);
    this.widthMerger = this.context.createChannelMerger(2);
    this.widthLToL = this.context.createGain();
    this.widthRToL = this.context.createGain();
    this.widthLToR = this.context.createGain();
    this.widthRToR = this.context.createGain();
    this.spatialPanner = this.context.createStereoPanner();
    this.spatialTone = this.context.createBiquadFilter();
    this.reflectionDelay = this.context.createDelay(0.3);
    this.reflectionTone = this.context.createBiquadFilter();
    this.reflectionGain = this.context.createGain();
    this.compressor = this.context.createDynamicsCompressor();
    this.dynamicGain = this.context.createGain();
    this.shaper = this.context.createWaveShaper();
    this.dropoutGain = this.context.createGain();
    this.integrityGain = this.context.createGain();

    this.dryGain.gain.value = 0;
    this.wetGain.gain.value = 1;
    this.masterGain.gain.value = 0.82;
    this.spatialGain.gain.value = 1;
    this.spatialTone.type = "lowpass";
    this.spatialTone.frequency.value = 20000;
    this.spatialTone.Q.value = 0.7;
    this.reflectionDelay.delayTime.value = 0.07;
    this.reflectionTone.type = "lowpass";
    this.reflectionTone.frequency.value = 6500;
    this.reflectionGain.gain.value = 0;
    this.dynamicGain.gain.value = 1;
    this.shaper.curve = identityCurve;
    this.shaper.oversample = "2x";
    this.dropoutGain.gain.value = 1;
    this.integrityGain.gain.value = 1;
    this.setNeutralCompressor();

    this.dryGain.connect(this.masterGain);
    this.wetGain.connect(this.masterGain);
    this.masterGain.connect(this.context.destination);
    this.rebuildEqChainIfNeeded(0);
    this.applyEqFilters();
    this.applyProfileLayers();
    this.setPlaybackMode(this.currentPlaybackMode);

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
    void this.context?.suspend();
    this.playing = false;
  }

  setEqFilters(filters: EqFilterSpec[], intensity: number) {
    this.currentFilters = filters;
    this.currentEqOutputIntensity = intensity;
    this.applyEqFilters();
  }

  setAudioProfiles(activeDescriptorIds: string[], intensity: number) {
    this.currentProfiles = activeDescriptorIds
      .map((id) => descriptorById.get(id)?.audioProfile)
      .filter((profile): profile is AudioProfile => Boolean(profile));
    this.currentProfileIntensity = intensity;
    this.applyProfileLayers();
  }

  setPlaybackMode(mode: PlaybackMode) {
    this.currentPlaybackMode = mode;
    if (!this.context || !this.dryGain || !this.wetGain) return;
    const now = this.context.currentTime;
    const fade = 0.008;
    rampParam(this.dryGain.gain, mode === "flat" ? 1 : 0, now, fade);
    rampParam(this.wetGain.gain, mode === "processed" ? 1 : 0, now, fade);
  }

  clearEq() {
    this.setEqFilters([], 1);
    this.setAudioProfiles([], 1);
  }

  dispose() {
    this.pause();
    this.clearIntegritySources();
    disconnectNode(this.source);
    this.eqNodes.forEach((node) => disconnectNode(node));
    [
      this.dryGain,
      this.wetGain,
      this.masterGain,
      this.spatialGain,
      this.widthSplitter,
      this.widthMerger,
      this.widthLToL,
      this.widthRToL,
      this.widthLToR,
      this.widthRToR,
      this.spatialPanner,
      this.spatialTone,
      this.reflectionDelay,
      this.reflectionTone,
      this.reflectionGain,
      this.compressor,
      this.dynamicGain,
      this.shaper,
      this.dropoutGain,
      this.integrityGain
    ].forEach((node) => disconnectNode(node));
    void this.context?.close();
    this.context = null;
  }

  private applyEqFilters() {
    if (!this.context) return;

    const now = this.context.currentTime;
    const safeFilters = this.currentFilters.slice(0, 8).map((filter) => normalizeFilter(filter, this.context!.sampleRate, 1));

    this.rebuildEqChainIfNeeded(safeFilters.length);

    safeFilters.forEach((filter, index) => {
      const node = this.eqNodes[index];
      node.type = "peaking";
      rampParam(node.frequency, filter.frequencyHz, now, 0.02);
      rampParam(node.gain, filter.gainDb, now, 0.02);
      rampParam(node.Q, filter.q, now, 0.02);
    });

    if (this.masterGain) {
      rampParam(this.masterGain.gain, masterTrimForIntensity(this.currentEqOutputIntensity), now, 0.02);
    }
  }

  private applyProfileLayers() {
    if (!this.context) return;
    const spatialIds = this.currentProfiles.filter((profile) => profile.kind === "spatial").map((profile) => profile.profileId);
    const dynamicIds = this.currentProfiles.filter((profile) => profile.kind === "dynamic").map((profile) => profile.profileId);
    const integrityIds = this.currentProfiles.filter((profile) => profile.kind === "integrity").map((profile) => profile.profileId);

    this.applySpatialProfiles(spatialIds);
    this.applyDynamicProfiles(dynamicIds);
    this.applyIntegrityProfiles(integrityIds);
  }

  private applySpatialProfiles(profileIds: SpatialProfileId[]) {
    if (!this.context || !this.spatialGain || !this.spatialPanner || !this.spatialTone || !this.reflectionDelay || !this.reflectionGain) return;

    const active = new Set(profileIds);
    const now = this.context.currentTime;
    let pan = 0;
    let mediaGain = 1;
    let lowpassHz = 20000;
    let reflectionAmount = 0;
    let reflectionDelaySec = 0.065;
    let widthAmount = 1;

    if (active.has("left")) pan = -0.9;
    if (active.has("right")) pan = 0.9;
    if (active.has("centered")) pan = 0;

    if (active.has("near")) {
      mediaGain *= 1.06;
      reflectionAmount = Math.max(reflectionAmount, 0.015);
      reflectionDelaySec = 0.022;
    }

    if (active.has("far")) {
      mediaGain *= 0.72;
      lowpassHz = Math.min(lowpassHz, 6200);
      reflectionAmount = Math.max(reflectionAmount, 0.2);
      reflectionDelaySec = 0.095;
    }

    if (active.has("focused")) {
      widthAmount = Math.min(widthAmount, 0.86);
      reflectionAmount = Math.min(reflectionAmount, 0.01);
      reflectionDelaySec = Math.min(reflectionDelaySec, 0.035);
    }

    if (active.has("blurred")) {
      widthAmount = Math.max(widthAmount, 1.18);
      lowpassHz = Math.min(lowpassHz, 12000);
      reflectionAmount = Math.max(reflectionAmount, 0.18);
      reflectionDelaySec = Math.max(reflectionDelaySec, 0.075);
    }

    if (active.has("wide")) {
      widthAmount = Math.max(widthAmount, 1.45);
    }

    if (active.has("narrow")) {
      widthAmount = Math.min(widthAmount, 0.34);
    }

    if (active.has("separated")) {
      widthAmount = Math.max(widthAmount, 1.25);
      reflectionAmount = Math.min(reflectionAmount, 0.04);
      reflectionDelaySec = Math.min(reflectionDelaySec, 0.045);
    }

    if (active.has("crowded")) {
      widthAmount = Math.min(widthAmount, 0.25);
      lowpassHz = Math.min(lowpassHz, 10500);
      reflectionAmount = Math.max(reflectionAmount, 0.16);
      reflectionDelaySec = Math.max(reflectionDelaySec, 0.055);
    }

    if (active.has("dry")) {
      reflectionAmount = 0;
    }

    if (active.has("reverberant")) {
      reflectionAmount = Math.max(reflectionAmount, 0.32);
      reflectionDelaySec = 0.12;
      lowpassHz = Math.min(lowpassHz, 9000);
    }

    this.setStereoWidth(widthAmount, now);
    rampParam(this.spatialPanner.pan, pan, now, 0.03);
    rampParam(this.spatialGain.gain, mediaGain, now, 0.03);
    rampParam(this.spatialTone.frequency, lowpassHz, now, 0.03);
    rampParam(this.reflectionDelay.delayTime, reflectionDelaySec, now, 0.03);
    rampParam(this.reflectionGain.gain, reflectionAmount * this.currentProfileIntensity, now, 0.03);
  }

  private setStereoWidth(width: number, now: number) {
    if (!this.widthLToL || !this.widthRToL || !this.widthLToR || !this.widthRToR) return;

    const safeWidth = Math.max(0, Math.min(1.6, width));
    const sameChannelGain = 0.5 + safeWidth * 0.5;
    const crossChannelGain = 0.5 - safeWidth * 0.5;

    rampParam(this.widthLToL.gain, sameChannelGain, now, 0.03);
    rampParam(this.widthRToR.gain, sameChannelGain, now, 0.03);
    rampParam(this.widthRToL.gain, crossChannelGain, now, 0.03);
    rampParam(this.widthLToR.gain, crossChannelGain, now, 0.03);
  }

  private applyDynamicProfiles(profileIds: DynamicProfileId[]) {
    if (!this.context || !this.compressor || !this.dynamicGain || !this.shaper) return;

    const active = new Set(profileIds);
    const now = this.context.currentTime;
    let threshold = 0;
    let ratio = 1;
    let attack = 0.003;
    let release = 0.25;
    let knee = 0;
    let makeupGain = 1;
    let shaperCurve = identityCurve;
    let oversample: OverSampleType = "2x";

    if (active.has("snappy")) {
      threshold = -16;
      ratio = 1.35;
      attack = 0.026;
      release = 0.14;
      knee = 12;
      makeupGain = 1.01;
    }

    if (active.has("softened")) {
      threshold = -25;
      ratio = 4;
      attack = 0.004;
      release = 0.18;
      knee = 8;
      makeupGain = 1.05;
    }

    if (active.has("tight")) {
      threshold = Math.min(threshold, -22);
      ratio = Math.max(ratio, 2.4);
      attack = Math.max(attack, 0.012);
      release = 0.11;
      knee = Math.max(knee, 8);
      makeupGain = Math.max(makeupGain, 1.03);
    }

    if (active.has("loose")) {
      threshold = Math.min(threshold, -24);
      ratio = Math.max(ratio, 3);
      attack = Math.max(attack, 0.012);
      release = 0.68;
      knee = Math.max(knee, 8);
      makeupGain = Math.max(makeupGain, 1.04);
    }

    if (active.has("compressed")) {
      threshold = -26;
      ratio = 5;
      attack = 0.012;
      release = 0.26;
      knee = 10;
      makeupGain = 1.08;
    }

    if (active.has("flat")) {
      threshold = -32;
      ratio = 8;
      attack = 0.025;
      release = 0.48;
      knee = 8;
      makeupGain = 1.1;
    }

    if (active.has("pumping")) {
      threshold = -34;
      ratio = 10;
      attack = 0.004;
      release = 0.085;
      knee = 2;
      makeupGain = 1.1;
    }

    if (active.has("clipped") && active.has("distorted")) {
      threshold = -24;
      ratio = Math.max(ratio, 5);
      attack = 0.002;
      release = 0.09;
      knee = 1;
      makeupGain = 1.04;
      shaperCurve = makeOverdriveCurve();
      oversample = "4x";
    } else if (active.has("clipped")) {
      threshold = -20;
      ratio = Math.max(ratio, 3.5);
      attack = 0.002;
      release = 0.08;
      knee = 0;
      makeupGain = 1.1;
      shaperCurve = makeClipCurve();
      oversample = "2x";
    } else if (active.has("distorted")) {
      threshold = -22;
      ratio = Math.max(ratio, 2.5);
      attack = 0.006;
      release = 0.16;
      knee = 4;
      makeupGain = 1.06;
      shaperCurve = makeDistortionCurve();
      oversample = "4x";
    }

    rampParam(this.compressor.threshold, threshold, now, 0.03);
    rampParam(this.compressor.ratio, ratio, now, 0.03);
    rampParam(this.compressor.attack, attack, now, 0.03);
    rampParam(this.compressor.release, release, now, 0.03);
    rampParam(this.compressor.knee, knee, now, 0.03);
    rampParam(this.dynamicGain.gain, makeupGain, now, 0.03);
    this.shaper.curve = shaperCurve;
    this.shaper.oversample = oversample;
  }

  private applyIntegrityProfiles(profileIds: IntegrityProfileId[]) {
    if (!this.context || !this.integrityGain) return;
    this.clearIntegritySources();
    const active = new Set(profileIds);
    const intensity = Math.min(1.8, Math.max(0.4, this.currentProfileIntensity));

    if (active.has("hiss")) {
      this.startLoopingNoise("highpass", 2600, 0.004 * intensity);
    }

    if (active.has("static")) {
      this.startLoopingNoise("bandpass", 3200, 0.006 * intensity);
      this.startImpulseTimer(760, () => this.playImpulse(1.1, 0.0125 * intensity, 3600));
    }

    if (active.has("hum")) {
      this.startOscillator("sine", 60, 0.033 * intensity);
      this.startOscillator("sine", 120, 0.0135 * intensity);
    }

    if (active.has("buzz")) {
      this.startOscillator("sawtooth", 60, 0.015 * intensity, 900);
      this.startOscillator("sine", 180, 0.0075 * intensity);
    }

    if (active.has("whine")) {
      this.startWhine(1450, 0.014 * intensity);
    }

    if (active.has("dirty")) {
      this.startLoopingNoise("bandpass", 1800, 0.006 * intensity);
      this.startOscillator("sawtooth", 90, 0.004 * intensity, 1100);
      this.startImpulseTimer(1480, () => this.playImpulse(1.0, 0.018 * intensity, 3000));
    }

    if (active.has("click")) {
      this.startImpulseTimer(1150, () => this.playImpulse(2.2, 0.12 * intensity, 3600));
    }

    if (active.has("pop")) {
      this.startImpulseTimer(1650, () => this.playImpulse(18, 0.105 * intensity, 520));
    }

    if (active.has("crackle")) {
      this.startImpulseTimer(520, () => {
        const count = 2 + Math.floor(Math.random() * 4);
        for (let index = 0; index < count; index += 1) {
          window.setTimeout(() => this.playImpulse(1.4, 0.06 * intensity, 4800), index * 28 + Math.random() * 18);
        }
      });
    }

    if (active.has("dropout")) {
      this.startDropoutTimer();
    }

    if (active.has("squeak")) {
      this.startImpulseTimer(1850, () => this.playChirp(95, 1650, 3200, 0.035 * intensity));
    }
  }

  private setNeutralCompressor() {
    if (!this.compressor) return;
    this.compressor.threshold.value = 0;
    this.compressor.ratio.value = 1;
    this.compressor.attack.value = 0.003;
    this.compressor.release.value = 0.25;
    this.compressor.knee.value = 0;
  }

  private rebuildEqChainIfNeeded(count: number) {
    if (
      !this.context ||
      !this.source ||
      !this.dryGain ||
      !this.spatialGain ||
      !this.widthSplitter ||
      !this.widthMerger ||
      !this.widthLToL ||
      !this.widthRToL ||
      !this.widthLToR ||
      !this.widthRToR ||
      !this.spatialPanner ||
      !this.spatialTone ||
      !this.reflectionDelay ||
      !this.reflectionTone ||
      !this.reflectionGain ||
      !this.compressor ||
      !this.dynamicGain ||
      !this.shaper ||
      !this.dropoutGain ||
      !this.integrityGain ||
      !this.wetGain
    ) {
      return;
    }
    if (this.eqNodes.length === count) {
      this.connectChain();
      return;
    }

    this.eqNodes.forEach((node) => disconnectNode(node));
    this.eqNodes = Array.from({ length: count }, () => this.context!.createBiquadFilter());
    this.connectChain();
  }

  private connectChain() {
    if (
      !this.source ||
      !this.dryGain ||
      !this.spatialGain ||
      !this.widthSplitter ||
      !this.widthMerger ||
      !this.widthLToL ||
      !this.widthRToL ||
      !this.widthLToR ||
      !this.widthRToR ||
      !this.spatialPanner ||
      !this.spatialTone ||
      !this.reflectionDelay ||
      !this.reflectionTone ||
      !this.reflectionGain ||
      !this.compressor ||
      !this.dynamicGain ||
      !this.shaper ||
      !this.dropoutGain ||
      !this.integrityGain ||
      !this.wetGain
    ) {
      return;
    }

    [
      this.source,
      ...this.eqNodes,
      this.spatialGain,
      this.widthSplitter,
      this.widthMerger,
      this.widthLToL,
      this.widthRToL,
      this.widthLToR,
      this.widthRToR,
      this.spatialPanner,
      this.spatialTone,
      this.reflectionDelay,
      this.reflectionTone,
      this.reflectionGain,
      this.compressor,
      this.dynamicGain,
      this.shaper,
      this.dropoutGain,
      this.integrityGain
    ].forEach((node) => disconnectNode(node));

    this.source.connect(this.dryGain);

    const processedHead = this.eqNodes[0] ?? this.spatialGain;
    this.source.connect(processedHead);
    this.eqNodes.forEach((node, index) => {
      const next = this.eqNodes[index + 1] ?? this.spatialGain!;
      node.connect(next);
    });

    this.spatialGain.connect(this.widthSplitter);
    this.widthSplitter.connect(this.widthLToL, 0);
    this.widthSplitter.connect(this.widthRToL, 1);
    this.widthSplitter.connect(this.widthLToR, 0);
    this.widthSplitter.connect(this.widthRToR, 1);
    this.widthLToL.connect(this.widthMerger, 0, 0);
    this.widthRToL.connect(this.widthMerger, 0, 0);
    this.widthLToR.connect(this.widthMerger, 0, 1);
    this.widthRToR.connect(this.widthMerger, 0, 1);
    this.widthMerger.connect(this.spatialPanner);
    this.spatialPanner.connect(this.spatialTone);
    this.spatialTone.connect(this.compressor);
    this.compressor.connect(this.dynamicGain);
    this.dynamicGain.connect(this.shaper);
    this.shaper.connect(this.dropoutGain);
    this.dropoutGain.connect(this.wetGain);

    this.spatialTone.connect(this.reflectionDelay);
    this.reflectionDelay.connect(this.reflectionTone);
    this.reflectionTone.connect(this.reflectionGain);
    this.reflectionGain.connect(this.dropoutGain);

    this.integrityGain.connect(this.wetGain);
  }

  private clearIntegritySources() {
    this.integrityTimers.forEach((timer) => window.clearInterval(timer));
    this.integrityTimers = [];
    this.integritySources.forEach((node) => {
      if ("stop" in node) {
        try {
          node.stop();
        } catch {
          // Source may already have ended.
        }
      }
      disconnectNode(node);
    });
    this.integritySources = [];

    if (this.context && this.dropoutGain) {
      const now = this.context.currentTime;
      this.dropoutGain.gain.cancelScheduledValues(now);
      this.dropoutGain.gain.setTargetAtTime(1, now, 0.01);
    }
  }

  private startLoopingNoise(filterType: BiquadFilterType, frequencyHz: number, gainValue: number) {
    if (!this.context || !this.integrityGain) return;
    const buffer = this.context.createBuffer(1, this.context.sampleRate * 2, this.context.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let index = 0; index < channel.length; index += 1) {
      channel[index] = Math.random() * 2 - 1;
    }

    const source = this.context.createBufferSource();
    const filter = this.context.createBiquadFilter();
    const gain = this.context.createGain();
    source.buffer = buffer;
    source.loop = true;
    filter.type = filterType;
    filter.frequency.value = frequencyHz;
    gain.gain.value = gainValue;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.integrityGain);
    source.start();
    this.integritySources.push(source, filter, gain);
  }

  private startOscillator(type: OscillatorType, frequencyHz: number, gainValue: number, lowpassHz?: number) {
    if (!this.context || !this.integrityGain) return;
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequencyHz;
    gain.gain.value = gainValue;

    if (lowpassHz) {
      const filter = this.context.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = lowpassHz;
      oscillator.connect(filter);
      filter.connect(gain);
      this.integritySources.push(filter);
    } else {
      oscillator.connect(gain);
    }

    gain.connect(this.integrityGain);
    oscillator.start();
    this.integritySources.push(oscillator, gain);
  }

  private startWhine(frequencyHz: number, gainValue: number) {
    if (!this.context || !this.integrityGain) return;
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    const lfo = this.context.createOscillator();
    const lfoDepth = this.context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequencyHz;
    gain.gain.value = gainValue;
    lfo.type = "sine";
    lfo.frequency.value = 0.18;
    lfoDepth.gain.value = 55;

    lfo.connect(lfoDepth);
    lfoDepth.connect(oscillator.frequency);
    oscillator.connect(gain);
    gain.connect(this.integrityGain);

    oscillator.start();
    lfo.start();
    this.integritySources.push(oscillator, gain, lfo, lfoDepth);
  }

  private startImpulseTimer(intervalMs: number, callback: () => void) {
    callback();
    const timer = window.setInterval(callback, intervalMs);
    this.integrityTimers.push(timer);
  }

  private playImpulse(durationMs: number, gainValue: number, filterFrequencyHz: number) {
    if (!this.context || !this.integrityGain) return;
    const sampleCount = Math.max(1, Math.floor((durationMs / 1000) * this.context.sampleRate));
    const buffer = this.context.createBuffer(1, sampleCount, this.context.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let index = 0; index < sampleCount; index += 1) {
      const envelope = 1 - index / sampleCount;
      channel[index] = (Math.random() * 2 - 1) * envelope;
    }

    const source = this.context.createBufferSource();
    const filter = this.context.createBiquadFilter();
    const gain = this.context.createGain();
    source.buffer = buffer;
    filter.type = "bandpass";
    filter.frequency.value = filterFrequencyHz;
    filter.Q.value = 0.8;
    gain.gain.value = gainValue;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.integrityGain);
    source.onended = () => {
      disconnectNode(source);
      disconnectNode(filter);
      disconnectNode(gain);
    };
    source.start();
  }

  private playChirp(durationMs: number, startFrequencyHz: number, endFrequencyHz: number, gainValue: number) {
    if (!this.context || !this.integrityGain) return;
    const now = this.context.currentTime;
    const durationSeconds = durationMs / 1000;
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(startFrequencyHz, now);
    oscillator.frequency.exponentialRampToValueAtTime(endFrequencyHz, now + durationSeconds);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(gainValue, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

    oscillator.connect(gain);
    gain.connect(this.integrityGain);
    oscillator.onended = () => {
      disconnectNode(oscillator);
      disconnectNode(gain);
    };
    oscillator.start(now);
    oscillator.stop(now + durationSeconds);
  }

  private startDropoutTimer() {
    this.scheduleDropoutPulse();
    const timer = window.setInterval(() => this.scheduleDropoutPulse(), 2200);
    this.integrityTimers.push(timer);
  }

  private scheduleDropoutPulse() {
    if (!this.context || !this.dropoutGain) return;
    const now = this.context.currentTime;
    const gain = this.dropoutGain.gain;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(1, now);
    gain.linearRampToValueAtTime(0.08, now + 0.035);
    gain.linearRampToValueAtTime(0.08, now + 0.18);
    gain.linearRampToValueAtTime(1, now + 0.25);
  }
}
