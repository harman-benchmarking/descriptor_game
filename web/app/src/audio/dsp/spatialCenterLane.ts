export const centerLaneEncodeGain = 0.5;

export type SideDecodeGains = {
  lToL: number;
  rToL: number;
  lToR: number;
  rToR: number;
};

export function clampSpatialWidth(width: number) {
  return Math.max(0, Math.min(2, width));
}

export function sideDecodeGainsForWidth(width: number): SideDecodeGains {
  const sideGain = clampSpatialWidth(width) * 0.5;

  return {
    lToL: sideGain,
    rToL: -sideGain,
    lToR: -sideGain,
    rToR: sideGain
  };
}
