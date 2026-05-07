export function masterTrimForIntensity(intensity: number): number {
  if (intensity <= 1.2) return 0.92;
  if (intensity <= 1.8) return 0.82;
  if (intensity <= 2.2) return 0.72;
  return 0.64;
}
