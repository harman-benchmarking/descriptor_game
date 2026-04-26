import { X } from "lucide-react";
import type { DescriptorCard, DiscoveryCard } from "../../cards/cardTypes";
import type { PlayerFacingIdentity } from "../../cards/cardDetails";

type CardDetailTarget =
  | {
      kind: "descriptor";
      card: DescriptorCard;
      unlocked: boolean;
    }
  | {
      kind: "discovery";
      card: DiscoveryCard;
      unlocked: boolean;
    };

type Props = {
  target: CardDetailTarget | null;
  t: (key: string) => string;
  onClose: () => void;
  onUseDescriptor: (id: string) => void;
  onUseDiscovery: (id: string) => void;
  detail?: PlayerFacingIdentity;
};

export function CardDetailModal({ target, t, onClose, onUseDescriptor, onUseDiscovery, detail }: Props) {
  if (!target) return null;

  const isDescriptor = target.kind === "descriptor";
  const imageSrc = target.card.icon.src;
  const label = isDescriptor ? t(target.card.textKeys.label) : target.unlocked ? t(target.card.textKeys.label) : "???";
  const description = isDescriptor
    ? t(target.card.textKeys.summary)
    : target.unlocked
      ? t(target.card.textKeys.explanation)
      : t(target.card.textKeys.hint);
  const alt = t(target.card.icon.altKey);
  const creatureIdentity = detail?.creatureIdentity;
  const feeling = detail?.feeling ?? description;
  const listenFor = detail?.listenFor;
  const whereToFindIt = detail?.whereToFindIt;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="card-detail-modal" role="dialog" aria-modal="true" aria-labelledby="card-detail-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose} title={t("action.close")}>
          <X aria-hidden="true" />
        </button>

        <div className="detail-art">
          {target.kind === "discovery" && !target.unlocked ? <span className="locked-orb detail-locked" /> : <img src={imageSrc} alt={alt} />}
        </div>

        <div className="detail-copy">
          <p className="eyebrow">{isDescriptor ? t("detail.basic") : t("detail.discovery")}</p>
          <h2 id="card-detail-title">{label}</h2>
          {creatureIdentity ? <p className="creature-identity">{creatureIdentity}</p> : null}
          <p>{feeling}</p>

          <div className="player-identity-list">
            {listenFor ? (
              <>
                <h3>{t("detail.listenFor")}</h3>
                <p>{listenFor}</p>
              </>
            ) : null}
            {whereToFindIt ? (
              <>
                <h3>{t("detail.whereToFindIt")}</h3>
                <p>{whereToFindIt}</p>
              </>
            ) : null}
          </div>

          <div className="detail-actions">
            {target.kind === "descriptor" && target.unlocked ? (
              <button className="text-button" type="button" onClick={() => onUseDescriptor(target.card.id)}>
                {t("action.useCard")}
              </button>
            ) : null}
            {target.kind === "discovery" && target.unlocked ? (
              <button className="text-button" type="button" onClick={() => onUseDiscovery(target.card.id)}>
                {t("action.useCard")}
              </button>
            ) : null}
            {!target.unlocked ? <span className="locked-note">{t("detail.locked")}</span> : null}
          </div>
        </div>
      </section>
    </div>
  );
}

export type { CardDetailTarget };
