import type { EqFilterSpec } from "../../cards/cardTypes";
import { descriptorById } from "../../cards/descriptorCatalog";
import { discoveryById } from "../../cards/discoveryRecipes";

export const maxEqBands = 8;
export const gainClampDb = { min: -24, max: 24 };
export const qClamp = { min: 0.05, max: 18 };

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

export function buildEffectiveFilters(activeBasicIds: string[], intensity: number, sampleRate = 48000): EqFilterSpec[] {
  return baseFiltersForBasicIds(activeBasicIds)
    .slice(0, maxEqBands)
    .map((filter) => normalizeFilter(filter, sampleRate, intensity));
}

export function baseFiltersForBasicIds(activeBasicIds: string[]): EqFilterSpec[] {
  return activeBasicIds.flatMap((id) => descriptorById.get(id)?.filters ?? []);
}

export function expandDiscoveryToBasicIds(discoveryId: string): string[] {
  return discoveryById.get(discoveryId)?.ingredientIds ?? [];
}
