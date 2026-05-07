import { dynamicStateFromIds } from "./visualizerState";
import type { DynamicVisualizerState } from "./visualizerState";

type Props = {
  activeDescriptorIds: string[];
};

type WavePoint = {
  x: number;
  y: number;
};

const CENTER_Y = 120;
const THRESHOLD_Y = 86;
const CLIP_CEILING_Y = 72;
const MAX_DUCK_Y = 178;
const SCOPE_LEFT = 42;
const SCOPE_WIDTH = 556;
const SCOPE_RIGHT = SCOPE_LEFT + SCOPE_WIDTH;
const SCOPE_OUTPUT_CENTER_Y = 144;
const SCOPE_AMP_SCALE = 0.88;

const neutralState: DynamicVisualizerState = {
  attack: "neutral",
  recovery: "neutral",
  compression: "none",
  motion: "neutral",
  contrast: "normal",
  overload: "none"
};

const baseEnvelope: WavePoint[] = [
  { x: 12, y: 128 },
  { x: 34, y: 76 },
  { x: 56, y: 150 },
  { x: 84, y: 54 },
  { x: 118, y: 154 },
  { x: 148, y: 82 },
  { x: 184, y: 142 },
  { x: 218, y: 60 },
  { x: 252, y: 152 },
  { x: 286, y: 94 },
  { x: 308, y: 126 }
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const format = (value: number) => Number(value.toFixed(1));
const pointsToPolyline = (points: WavePoint[]) => points.map((point) => `${point.x},${format(point.y)}`).join(" ");
const isLoudPeak = (point: WavePoint) => point.y < CENTER_Y - 18;
const scopeX = (x: number) => SCOPE_LEFT + ((x - 12) / (308 - 12)) * SCOPE_WIDTH;
const scopeY = (y: number, centerY: number) => centerY + (y - CENTER_Y) * SCOPE_AMP_SCALE;
const scopePoints = (points: WavePoint[], centerY: number) => points.map((point) => ({ x: scopeX(point.x), y: scopeY(point.y, centerY) }));

function compressedPeakY(y: number, ratio = 0.4) {
  if (y >= THRESHOLD_Y) return y;
  const overshoot = THRESHOLD_Y - y;
  const kneeRatio = overshoot < 12 ? 0.58 : ratio;
  return THRESHOLD_Y - overshoot * kneeRatio;
}

function envelopePoints(state: DynamicVisualizerState) {
  let pumpSag = 0;

  return baseEnvelope.map((point, index) => {
    let y = point.y;

    if (point.y < CENTER_Y) {
      if (state.attack === "softened") {
        y = CENTER_Y + (y - CENTER_Y) * 0.58;
      }

      if (state.attack === "snappy") {
        y = CENTER_Y + (y - CENTER_Y) * 1.12;
      }
    }

    if (state.compression === "compressed") {
      y = compressedPeakY(y);
    }

    if (state.contrast === "flat") {
      y = CENTER_Y + (y - CENTER_Y) * 0.32;
    }

    if (state.motion === "pumping") {
      y += pumpSag;
      pumpSag *= 0.52;
      if (point.y < THRESHOLD_Y) {
        pumpSag = Math.max(pumpSag, 18);
      }
    }

    if (state.overload === "distorted" && isLoudPeak(point)) {
      y += index % 2 === 0 ? -7 : 6;
    }

    y = clamp(y, 48, MAX_DUCK_Y);
    return { x: point.x, y };
  });
}

function clippedPlateauPoints(points: WavePoint[]) {
  return points.flatMap((point, index) => {
    const referencePoint = baseEnvelope[index] ?? point;
    const clipDepth = CLIP_CEILING_Y - Math.min(point.y, referencePoint.y);

    if (clipDepth <= 0) {
      return [point];
    }

    const previous = points[index - 1];
    const next = points[index + 1];
    const halfWidth = clamp(6 + clipDepth * 0.36, 9, 18);
    const minimumX = previous ? previous.x + 5 : point.x - halfWidth;
    const maximumX = next ? next.x - 5 : point.x + halfWidth;
    const plateauStart = clamp(point.x - halfWidth, minimumX, point.x - 3);
    const plateauEnd = clamp(point.x + halfWidth, point.x + 3, maximumX);

    return [
      { x: plateauStart, y: CLIP_CEILING_Y },
      { x: plateauEnd, y: CLIP_CEILING_Y }
    ];
  });
}

function compressionMarkers(state: DynamicVisualizerState, outputPoints: WavePoint[]) {
  const preCompressionPoints = envelopePoints({
    ...state,
    compression: "none",
    motion: "neutral",
    contrast: "normal",
    overload: "none"
  });

  return preCompressionPoints
    .map((point, index) => ({
      x: point.x,
      y1: point.y,
      y2: outputPoints[index]?.y ?? point.y
    }))
    .filter((marker) => marker.y1 < THRESHOLD_Y && Math.abs(marker.y2 - marker.y1) > 1);
}

function scopedCompressionMarkers(state: DynamicVisualizerState, outputPoints: WavePoint[]) {
  return compressionMarkers(state, outputPoints).map((marker) => ({
    x: scopeX(marker.x),
    y1: scopeY(marker.y1, SCOPE_OUTPUT_CENTER_Y),
    y2: scopeY(marker.y2, SCOPE_OUTPUT_CENTER_Y)
  }));
}

function distortionClusters(points: WavePoint[]) {
  return baseEnvelope.flatMap((referencePoint, index) => {
    if (!isLoudPeak(referencePoint)) return [];
    const point = points[index] ?? referencePoint;

    return [[
      { x: point.x - 10, y: clamp(point.y + 10, 48, MAX_DUCK_Y) },
      { x: point.x - 4, y: clamp(point.y - 8, 48, MAX_DUCK_Y) },
      { x: point.x + 3, y: clamp(point.y + 7, 48, MAX_DUCK_Y) },
      { x: point.x + 10, y: clamp(point.y - 4, 48, MAX_DUCK_Y) }
    ]];
  });
}

function scopedDistortionClusters(points: WavePoint[]) {
  return distortionClusters(points).map((line) => scopePoints(line, SCOPE_OUTPUT_CENTER_Y));
}

function looseRecoveryTrails(points: WavePoint[]) {
  return baseEnvelope.flatMap((referencePoint, index) => {
    if (!isLoudPeak(referencePoint)) return [];

    const point = points[index] ?? referencePoint;
    const startX = scopeX(point.x) + 6;
    const startY = scopeY(point.y, SCOPE_OUTPUT_CENTER_Y) + 4;
    const endX = Math.min(startX + 78, SCOPE_RIGHT);
    const endY = scopeY(CENTER_Y - 8, SCOPE_OUTPUT_CENTER_Y);
    const controlOneX = startX + 28;
    const controlTwoX = startX + 52;
    const controlOneY = startY + 22;
    const controlTwoY = endY - 10;

    return [`M ${format(startX)} ${format(startY)} C ${format(controlOneX)} ${format(controlOneY)} ${format(controlTwoX)} ${format(controlTwoY)} ${format(endX)} ${format(endY)}`];
  });
}

export function DynamicMotionVisualizer({ activeDescriptorIds }: Props) {
  const state = dynamicStateFromIds(activeDescriptorIds);
  const neutralPoints = envelopePoints(neutralState);
  const shapedPoints = envelopePoints(state);
  const showThreshold = state.compression === "compressed" || state.motion === "pumping";
  const showCompressionMarkers = state.compression === "compressed";
  const pulseClass = state.motion === "pumping" ? "is-pumping" : "";
  const hasClipLine = state.overload === "clipped" || state.overload === "overdriven";
  const hasDistortion = state.overload === "distorted" || state.overload === "overdriven";
  const outputPoints = hasClipLine ? clippedPlateauPoints(shapedPoints) : shapedPoints;
  const scopedNeutralOutputPoints = scopePoints(neutralPoints, SCOPE_OUTPUT_CENTER_Y);
  const scopedOutputPoints = scopePoints(outputPoints, SCOPE_OUTPUT_CENTER_Y);
  const distortionLines = hasDistortion ? scopedDistortionClusters(outputPoints) : [];
  const recoveryTrails = state.recovery === "loose" ? looseRecoveryTrails(outputPoints) : [];

  return (
    <div className={`module-visualizer dynamic-lab ${pulseClass} ${hasClipLine ? "has-clipping" : ""}`} role="img" aria-label="Dynamic motion lab">
      <svg className="dynamic-lab-scope" viewBox="0 0 640 304" aria-hidden="true">
        <rect className="visualizer-bg" x="0" y="0" width="640" height="304" rx="8" />
        <rect className="dynamic-scope-lane" x="28" y="32" width="584" height="224" rx="8" />
        <line className="visualizer-grid-line" x1={SCOPE_LEFT} y1={SCOPE_OUTPUT_CENTER_Y} x2={SCOPE_RIGHT} y2={SCOPE_OUTPUT_CENTER_Y} />
        <polyline className="dynamic-input dynamic-output-reference" points={pointsToPolyline(scopedNeutralOutputPoints)} />
        {showThreshold ? (
          <line
            className="dynamic-threshold"
            x1={SCOPE_LEFT}
            y1={scopeY(THRESHOLD_Y, SCOPE_OUTPUT_CENTER_Y)}
            x2={SCOPE_RIGHT}
            y2={scopeY(THRESHOLD_Y, SCOPE_OUTPUT_CENTER_Y)}
          />
        ) : null}
        {hasClipLine ? (
          <line
            className="dynamic-clip-ceiling"
            x1={SCOPE_LEFT}
            y1={scopeY(CLIP_CEILING_Y, SCOPE_OUTPUT_CENTER_Y)}
            x2={SCOPE_RIGHT}
            y2={scopeY(CLIP_CEILING_Y, SCOPE_OUTPUT_CENTER_Y)}
          />
        ) : null}
        {showCompressionMarkers
          ? scopedCompressionMarkers(state, shapedPoints).map((marker) => (
              <line key={marker.x} className="dynamic-gain-reduction" x1={marker.x} y1={marker.y1} x2={marker.x} y2={marker.y2} />
            ))
          : null}
        {state.motion === "pumping" ? <rect className="dynamic-motion-band" x={SCOPE_LEFT} y="70" width={SCOPE_WIDTH} height="148" rx="8" /> : null}
        {recoveryTrails.map((path, index) => (
          <path key={index} className="dynamic-recovery-tail" d={path} />
        ))}
        <polyline className={`dynamic-output ${hasClipLine ? "is-clipped" : ""}`} points={pointsToPolyline(scopedOutputPoints)} />
        {distortionLines.map((line, index) => (
          <polyline key={index} className="dynamic-distortion" points={pointsToPolyline(line)} />
        ))}
      </svg>
    </div>
  );
}
