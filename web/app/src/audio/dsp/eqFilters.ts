import type { DescriptorCard, EqFilterSpec } from "../../cards/cardTypes";
import { descriptorById } from "../../cards/descriptorCatalog";
import { discoveryById } from "../../cards/discoveryRecipes";

export const maxEqBands = 8;
export const gainClampDb = { min: -24, max: 24 };
export const qClamp = { min: 0.05, max: 18 };
export const intensityCapByBucketStackCount = [
  { stackCount: 1, maxIntensity: 2.0 },
  { stackCount: 2, maxIntensity: 1.8 },
  { stackCount: 3, maxIntensity: 1.6 },
  { stackCount: 4, maxIntensity: 1.4 },
  { stackCount: 5, maxIntensity: 1.2 }
];
export const strictBoostIntensityCapByBucketStackCount = [
  { stackCount: 1, maxIntensity: 2.0 },
  { stackCount: 2, maxIntensity: 1.75 },
  { stackCount: 3, maxIntensity: 1.5 },
  { stackCount: 4, maxIntensity: 1.25 },
  { stackCount: 5, maxIntensity: 1.0 }
];
export const bassBoostIntensityCapByBucketStackCount = strictBoostIntensityCapByBucketStackCount;
export const trebleBoostIntensityCapByBucketStackCount = strictBoostIntensityCapByBucketStackCount;
export const boostIntensityCapByGroup = {
  bass: bassBoostIntensityCapByBucketStackCount,
  mid: intensityCapByBucketStackCount,
  treble: trebleBoostIntensityCapByBucketStackCount
};

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function clampFrequency(frequencyHz: number, sampleRate: number): number {
  return clamp(frequencyHz, 20, sampleRate * 0.5 * 0.95);
}

export function normalizeFilter(filter: EqFilterSpec, sampleRate: number, intensity: number): EqFilterSpec {
  return {
    frequencyHz: clampFrequency(filter.frequencyHz, sampleRate),
    gainDb: clamp(filter.gainDb * intensity, gainClampDb.min, gainClampDb.max),
    q: clamp(filter.q, qClamp.min, qClamp.max)
  };
}

function capTableForBucketKey(bucketKey?: string): typeof intensityCapByBucketStackCount {
  if (!bucketKey?.endsWith(":boost")) return intensityCapByBucketStackCount;

  const [group] = bucketKey.split(":");
  if (group === "bass" || group === "mid" || group === "treble") {
    return boostIntensityCapByGroup[group];
  }

  return intensityCapByBucketStackCount;
}

export function maxIntensityForBucketStackCount(stackCount: number, bucketKey?: string): number {
  const capTable = capTableForBucketKey(bucketKey);
  const lastCap = capTable[capTable.length - 1];
  if (stackCount <= 1) return capTable[0].maxIntensity;
  if (stackCount >= lastCap.stackCount) return lastCap.maxIntensity;

  return capTable.find((cap) => cap.stackCount === stackCount)?.maxIntensity ?? lastCap.maxIntensity;
}

export function scaleIntensityForBucketStackCount(stackCount: number, selectedIntensity: number, bucketKey?: string): number {
  return Math.min(selectedIntensity, maxIntensityForBucketStackCount(stackCount, bucketKey));
}

type FilterEntry = {
  descriptor: DescriptorCard;
  filter: EqFilterSpec;
  bucketKey: string;
};

export type EffectiveIntensityRange = {
  min: number;
  max: number;
};

function directionForGain(gainDb: number): "boost" | "cut" {
  return gainDb >= 0 ? "boost" : "cut";
}

function spectralBucketKey(descriptor: DescriptorCard, filter: EqFilterSpec): string {
  return `${descriptor.group}:${directionForGain(filter.gainDb)}`;
}

function spectralFilterEntries(activeBasicIds: string[]): FilterEntry[] {
  return activeBasicIds.flatMap((id) => {
    const descriptor = descriptorById.get(id);
    if (!descriptor || descriptor.moduleId !== "spectral") return [];
    return descriptor.filters.map((filter) => ({
      descriptor,
      filter,
      bucketKey: spectralBucketKey(descriptor, filter)
    }));
  });
}

function bucketCountsFor(entries: FilterEntry[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    counts.set(entry.bucketKey, (counts.get(entry.bucketKey) ?? 0) + 1);
  }
  return counts;
}

export function effectiveIntensityForActiveSpectralBuckets(activeBasicIds: string[], selectedIntensity: number): number {
  return effectiveIntensityRangeForActiveSpectralBuckets(activeBasicIds, selectedIntensity).min;
}

export function effectiveIntensityRangeForActiveSpectralBuckets(activeBasicIds: string[], selectedIntensity: number): EffectiveIntensityRange {
  const entries = spectralFilterEntries(activeBasicIds).slice(0, maxEqBands);
  if (entries.length === 0) return { min: selectedIntensity, max: selectedIntensity };
  const counts = bucketCountsFor(entries);
  const cappedIntensities = entries.map((entry) => scaleIntensityForBucketStackCount(counts.get(entry.bucketKey) ?? 1, selectedIntensity, entry.bucketKey));
  return {
    min: Math.min(selectedIntensity, ...cappedIntensities),
    max: Math.max(...cappedIntensities)
  };
}

export function headroomIntensityForActiveSpectralBuckets(activeBasicIds: string[], selectedIntensity: number): number {
  const entries = spectralFilterEntries(activeBasicIds).slice(0, maxEqBands);
  if (entries.length === 0) return selectedIntensity;

  const counts = bucketCountsFor(entries);
  const cappedIntensities = entries.map((entry) => scaleIntensityForBucketStackCount(counts.get(entry.bucketKey) ?? 1, selectedIntensity, entry.bucketKey));
  const stackedBoostPressure = Array.from(counts.entries())
    .filter(([bucketKey, count]) => bucketKey.endsWith(":boost") && count > 1)
    .reduce((sum, [, count]) => sum + count - 1, 0);

  return Math.max(...cappedIntensities) + stackedBoostPressure * 0.45;
}

export function buildEffectiveFilters(activeBasicIds: string[], selectedIntensity: number, sampleRate = 48000): EqFilterSpec[] {
  const entries = spectralFilterEntries(activeBasicIds).slice(0, maxEqBands);
  const counts = bucketCountsFor(entries);

  return entries.map((entry) =>
    normalizeFilter(entry.filter, sampleRate, scaleIntensityForBucketStackCount(counts.get(entry.bucketKey) ?? 1, selectedIntensity, entry.bucketKey))
  );
}

export function expandDiscoveryToBasicIds(discoveryId: string): string[] {
  return discoveryById.get(discoveryId)?.ingredientIds ?? [];
}
