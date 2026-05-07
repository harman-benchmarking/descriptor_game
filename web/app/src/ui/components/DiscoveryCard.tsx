import { Info, Lock, Stars } from "lucide-react";
import type { DiscoveryCard as DiscoveryCardType } from "../../cards/cardTypes";

type Props = {
  card: DiscoveryCardType;
  label: string;
  explanation: string;
  hint: string;
  alt: string;
  unlocked: boolean;
  active?: boolean;
  onClick?: () => void;
  onInspect?: () => void;
};

export function DiscoveryCard({ card, label, explanation, hint, alt, unlocked, active, onClick, onInspect }: Props) {
  const primaryAction = onClick ?? onInspect;

  return (
    <article
      className={`discovery-card ${active ? "is-active" : ""} ${unlocked ? "" : "is-locked"}`}
    >
      <button className="card-main-button" type="button" onClick={primaryAction} disabled={!primaryAction} aria-pressed={active}>
        <span className="card-image-wrap">
          {unlocked ? <img className="card-image" src={card.icon.src} alt={alt} loading="lazy" /> : <span className="locked-orb" />}
          {unlocked ? <Stars className="card-corner-icon" aria-hidden="true" /> : <Lock className="card-corner-icon" aria-hidden="true" />}
        </span>
        <span className="card-title">{unlocked ? label : "???"}</span>
        <span className="card-summary">{unlocked ? explanation : hint}</span>
      </button>
      {onInspect ? (
        <button className="card-info-button" type="button" onClick={onInspect} title={`Details: ${label}`}>
          <Info aria-hidden="true" />
        </button>
      ) : null}
    </article>
  );
}
