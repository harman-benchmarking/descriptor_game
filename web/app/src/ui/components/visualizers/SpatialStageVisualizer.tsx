import { spatialStateFromIds } from "./visualizerState";

type Props = {
  activeDescriptorIds: string[];
};

export function SpatialStageVisualizer({ activeDescriptorIds }: Props) {
  const state = spatialStateFromIds(activeDescriptorIds);
  const widthRadius = state.width === "wide" || state.width === "separated" ? 118 : state.width === "narrow" || state.width === "crowded" ? 58 : 92;
  const markerX = 160 + state.x * widthRadius;
  const markerY = 120 - state.y * 66;
  const reflectionRadius = state.reflection === "reverberant" ? 42 : state.reflection === "dry" ? 16 : 26;
  const reflectionOpacity = state.reflection === "dry" ? 0.12 : state.reflection === "reverberant" ? 0.42 : 0.24;
  const markerRadius = state.image === "blurred" ? 18 : state.image === "focused" ? 10 : state.y === 1 ? 15 : state.y === -1 ? 9 : 12;
  const fieldClassName = `spatial-field is-${state.width}`;
  const markerClassName = `spatial-marker is-${state.image}`;

  return (
    <svg className="module-visualizer spatial-visualizer" viewBox="0 0 320 240" role="img" aria-label="Spatial source position">
      <rect className="visualizer-bg" x="0" y="0" width="320" height="240" rx="8" />
      <ellipse className={fieldClassName} cx="160" cy="120" rx={widthRadius} ry="72" />
      <line className="visualizer-grid-line" x1="48" y1="120" x2="272" y2="120" />
      <line className="visualizer-grid-line" x1="160" y1="42" x2="160" y2="198" />
      <circle className="spatial-center" cx="160" cy="120" r="4" />
      <text className="visualizer-label" x="160" y="28">
        Near
      </text>
      <text className="visualizer-label" x="160" y="220">
        Far
      </text>
      <text className="visualizer-label" x="34" y="124">
        L
      </text>
      <text className="visualizer-label" x="286" y="124">
        R
      </text>
      <circle className="spatial-reflection" cx={markerX} cy={markerY} r={reflectionRadius} style={{ opacity: reflectionOpacity }} />
      <circle className={markerClassName} cx={markerX} cy={markerY} r={markerRadius} />
    </svg>
  );
}
