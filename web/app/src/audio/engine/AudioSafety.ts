export function isHeadphoneRecommended(frequencies: number[]): boolean {
  return frequencies.some((frequency) => frequency <= 63 || frequency >= 16000);
}

export const finalSafetySettings = Object.freeze({
  thresholdDb: -2,
  kneeDb: 0,
  ratio: 20,
  attackSeconds: 0.001,
  releaseSeconds: 0.08,
  ceilingDb: -1,
  ceilingCurveLength: 4096,
  ceilingOversample: "4x" as OverSampleType
});

export function decibelsToLinear(decibels: number): number {
  return 10 ** (decibels / 20);
}

export function configureFinalSafetyLimiter(limiter: DynamicsCompressorNode) {
  limiter.threshold.value = finalSafetySettings.thresholdDb;
  limiter.knee.value = finalSafetySettings.kneeDb;
  limiter.ratio.value = finalSafetySettings.ratio;
  limiter.attack.value = finalSafetySettings.attackSeconds;
  limiter.release.value = finalSafetySettings.releaseSeconds;
}

export function clampToFinalSafetyCeiling(sample: number): number {
  const ceiling = decibelsToLinear(finalSafetySettings.ceilingDb);
  return Math.max(-ceiling, Math.min(ceiling, sample));
}

export function makeFinalSafetyCeilingCurve() {
  const curve = new Float32Array(finalSafetySettings.ceilingCurveLength);
  for (let index = 0; index < curve.length; index += 1) {
    const input = (index / (curve.length - 1)) * 2 - 1;
    curve[index] = clampToFinalSafetyCeiling(input);
  }
  return curve;
}

// This is the compressor's hard-knee static transfer, used for deterministic
// headroom checks. Attack/release behavior still belongs to the browser node.
export function estimateFinalLimiterSteadyStateDb(inputDb: number): number {
  if (inputDb <= finalSafetySettings.thresholdDb) return inputDb;
  return finalSafetySettings.thresholdDb +
    (inputDb - finalSafetySettings.thresholdDb) / finalSafetySettings.ratio;
}

export function connectFinalSafetyChain(
  master: AudioNode,
  limiter: DynamicsCompressorNode,
  ceiling: WaveShaperNode,
  destination: AudioNode
) {
  master.connect(limiter);
  limiter.connect(ceiling);
  ceiling.connect(destination);
}
