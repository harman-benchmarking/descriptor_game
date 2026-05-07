export type CompressorProfile = {
  thresholdDb: number;
  ratio: number;
  attackMs: number;
  releaseMs: number;
  makeupGainDb: number;
};

export const compressorProfiles: Record<string, CompressorProfile> = {};
