import type { EqFilterSpec } from "../../cards/cardTypes";

export type CurvePoint = {
  frequencyHz: number;
  gainDb: number;
};

const minFrequency = 31;
const maxFrequency = 16000;

export function logFrequencySamples(count = 96): number[] {
  return Array.from({ length: count }, (_, index) => {
    const ratio = index / Math.max(1, count - 1);
    return minFrequency * (maxFrequency / minFrequency) ** ratio;
  });
}

export function gaussianPreviewGain(frequencyHz: number, filter: EqFilterSpec): number {
  const logDistance = Math.log2(frequencyHz / filter.frequencyHz);
  const width = Math.max(0.15, 1 / Math.max(0.05, filter.q));
  return filter.gainDb * Math.exp(-0.5 * (logDistance / width) ** 2);
}

export function buildCurvePoints(filters: EqFilterSpec[], sampleCount = 96): CurvePoint[] {
  return logFrequencySamples(sampleCount).map((frequencyHz) => ({
    frequencyHz,
    gainDb: filters.reduce((sum, filter) => sum + gaussianPreviewGain(frequencyHz, filter), 0)
  }));
}
