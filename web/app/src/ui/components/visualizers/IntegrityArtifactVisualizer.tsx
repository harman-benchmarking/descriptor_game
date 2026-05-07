import { integrityStateFromIds } from "./visualizerState";

type Props = {
  activeDescriptorIds: string[];
};

export function IntegrityArtifactVisualizer({ activeDescriptorIds }: Props) {
  const state = integrityStateFromIds(activeDescriptorIds);
  const showClick = state.events.includes("click");
  const showPop = state.events.includes("pop");
  const showCrackle = state.events.includes("crackle");
  const showDropout = state.events.includes("dropout");
  const showSqueak = state.events.includes("squeak");

  return (
    <svg className="module-visualizer integrity-visualizer" viewBox="0 0 320 240" role="img" aria-label="Integrity artifact timeline">
      <rect className="visualizer-bg" x="0" y="0" width="320" height="240" rx="8" />
      <path className="integrity-wave" d="M18 120 C42 92 62 148 86 120 S130 92 154 120 S198 148 222 120 S266 92 302 120" />
      {state.noise !== "none" ? <rect className={`integrity-noise is-${state.noise}`} x="18" y="78" width="284" height="84" rx="8" /> : null}
      {state.tone !== "none" ? (
        <path
          className={`integrity-tone is-${state.tone}`}
          d="M18 172 C42 156 54 188 78 172 S114 156 138 172 S174 188 198 172 S238 156 302 172"
        />
      ) : null}
      {showDropout ? <rect className="integrity-dropout" x="190" y="74" width="42" height="100" rx="5" /> : null}
      {showClick ? <line className="integrity-spike" x1="86" y1="54" x2="86" y2="184" /> : null}
      {showPop ? <circle className="integrity-pop" cx="118" cy="120" r="24" /> : null}
      {showCrackle ? (
        <g className="integrity-crackle">
          <line x1="238" y1="78" x2="238" y2="158" />
          <line x1="252" y1="64" x2="252" y2="170" />
          <line x1="266" y1="82" x2="266" y2="150" />
          <line x1="280" y1="70" x2="280" y2="166" />
        </g>
      ) : null}
      {showSqueak ? <path className="integrity-squeak" d="M42 70 C62 34 82 104 102 68 S142 34 162 68" /> : null}
      <text className="visualizer-label" x="160" y="218">
        Artifact timeline
      </text>
    </svg>
  );
}
