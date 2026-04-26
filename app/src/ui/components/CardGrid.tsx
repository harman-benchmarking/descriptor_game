import type { DescriptorCard } from "../../cards/cardTypes";
import { DescriptorCard as DescriptorCardView } from "./DescriptorCard";

type Props = {
  cards: DescriptorCard[];
  activeIds: string[];
  unlockedIds: string[];
  t: (key: string) => string;
  compact?: boolean;
  onCardClick: (id: string) => void;
  onInspectCard?: (id: string) => void;
};

export function CardGrid({ cards, activeIds, unlockedIds, t, compact, onCardClick, onInspectCard }: Props) {
  const unlocked = new Set(unlockedIds);
  const active = new Set(activeIds);

  return (
    <div className="card-grid">
      {cards.map((card) => (
        <DescriptorCardView
          key={card.id}
          card={card}
          label={t(card.textKeys.label)}
          summary={t(card.textKeys.summary)}
          alt={t(card.icon.altKey)}
          active={active.has(card.id)}
          locked={!unlocked.has(card.id)}
          compact={compact}
          onClick={unlocked.has(card.id) ? () => onCardClick(card.id) : onInspectCard ? () => onInspectCard(card.id) : undefined}
          onInspect={onInspectCard ? () => onInspectCard(card.id) : undefined}
        />
      ))}
    </div>
  );
}
