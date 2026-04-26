import type { CurvePoint } from "../../audio/dsp/curveResponse";

type Props = {
  points: CurvePoint[];
};

const width = 640;
const height = 220;
const pad = 24;
const minDb = -18;
const maxDb = 18;
const minFrequency = 31;
const maxFrequency = 16000;

function xForFrequency(frequencyHz: number) {
  const ratio = Math.log(frequencyHz / minFrequency) / Math.log(maxFrequency / minFrequency);
  return pad + ratio * (width - pad * 2);
}

function yForGain(gainDb: number) {
  const clamped = Math.max(minDb, Math.min(maxDb, gainDb));
  const ratio = (clamped - minDb) / (maxDb - minDb);
  return height - pad - ratio * (height - pad * 2);
}

export function EqCurveView({ points }: Props) {
  const path =
    points.length === 0
      ? ""
      : points
          .map((point, index) => `${index === 0 ? "M" : "L"} ${xForFrequency(point.frequencyHz).toFixed(2)} ${yForGain(point.gainDb).toFixed(2)}`)
          .join(" ");

  const labels = [31, 63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];

  return (
    <svg className="curve-view" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="EQ curve">
      <rect x="0" y="0" width={width} height={height} rx="8" />
      <line className="curve-zero" x1={pad} y1={yForGain(0)} x2={width - pad} y2={yForGain(0)} />
      {labels.map((frequency) => (
        <g key={frequency}>
          <line className="curve-grid" x1={xForFrequency(frequency)} y1={pad} x2={xForFrequency(frequency)} y2={height - pad} />
          <text x={xForFrequency(frequency)} y={height - 7}>
            {frequency >= 1000 ? `${frequency / 1000}k` : frequency}
          </text>
        </g>
      ))}
      {path ? <path className="curve-line" d={path} /> : null}
    </svg>
  );
}
