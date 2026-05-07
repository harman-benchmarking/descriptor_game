import { Info, Lock, Sparkles } from "lucide-react";
import type { DescriptorCard as DescriptorCardType } from "../../cards/cardTypes";

type Props = {
  card: DescriptorCardType;
  label: string;
  summary: string;
  alt: string;
  active?: boolean;
  locked?: boolean;
  compact?: boolean;
  onClick?: () => void;
  onInspect?: () => void;
};

export function DescriptorCard({ card, label, summary, alt, active, locked, compact, onClick, onInspect }: Props) {
  const primaryAction = onClick ?? onInspect;

  return (
    <article
      className={`descriptor-card ${active ? "is-active" : ""} ${locked ? "is-locked" : ""} ${compact ? "is-compact" : ""}`}
    >
      <button className="card-main-button" type="button" onClick={primaryAction} disabled={!primaryAction} aria-pressed={active}>
        <span className="card-image-wrap">
          {locked ? <span className="locked-orb" /> : <img className="card-image" src={card.icon.src} alt={alt} loading="lazy" />}
          {locked ? <Lock className="card-corner-icon" aria-hidden="true" /> : null}
          {active ? <Sparkles className="card-corner-icon" aria-hidden="true" /> : null}
        </span>
        <span className="card-title">{label}</span>
        {!compact ? <span className="card-summary">{summary}</span> : null}
      </button>
      {onInspect ? (
        <button className="card-info-button" type="button" onClick={onInspect} title={`Details: ${label}`}>
          <Info aria-hidden="true" />
        </button>
      ) : null}
    </article>
  );
}
