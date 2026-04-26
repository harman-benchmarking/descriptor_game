export function isHeadphoneRecommended(frequencies: number[]): boolean {
  return frequencies.some((frequency) => frequency <= 63 || frequency >= 16000);
}
