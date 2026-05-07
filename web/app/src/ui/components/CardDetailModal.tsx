import { X } from "lucide-react";
import { descriptorById } from "../../cards/descriptorCatalog";
import { discoveryCards } from "../../cards/discoveryRecipes";
import { aliasVocabularyCards, type AliasVocabularyCard } from "../../cards/aliasVocabulary";
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
  onInspectDescriptor: (id: string) => void;
  onInspectDiscovery: (id: string) => void;
  onInspectAlias: (alias: AliasVocabularyCard) => void;
  onUseDescriptor: (id: string) => void;
  onUseDiscovery: (id: string) => void;
  unlockedDiscoverySet: Set<string>;
  useActionLabel?: string;
  detail?: PlayerFacingIdentity;
};

export function CardDetailModal({
  target,
  t,
  onClose,
  onInspectDescriptor,
  onInspectDiscovery,
  onInspectAlias,
  onUseDescriptor,
  onUseDiscovery,
  unlockedDiscoverySet,
  useActionLabel,
  detail
}: Props) {
  if (!target) return null;

  const isDescriptor = target.kind === "descriptor";
  const visibleDetail = isDescriptor || target.unlocked ? detail : undefined;
  const imageSrc = target.card.icon.src;
  const label = isDescriptor ? t(target.card.textKeys.label) : target.unlocked ? t(target.card.textKeys.label) : "???";
  const description = isDescriptor
    ? t(target.card.textKeys.summary)
    : target.unlocked
      ? t(target.card.textKeys.explanation)
      : t(target.card.textKeys.hint);
  const alt = t(target.card.icon.altKey);
  const creatureIdentity = visibleDetail?.creatureIdentity;
  const feeling = visibleDetail?.feeling ?? description;
  const listenFor = visibleDetail?.listenFor;
  const detailSections = [
    { label: t("detail.whereToFindIt"), value: visibleDetail?.whereToFindIt },
    { label: t("detail.frequencyTerritory"), value: visibleDetail?.frequencyTerritory },
    { label: t("detail.eqMove"), value: visibleDetail?.eqMove },
    { label: t("detail.recipesAndEvolutions"), value: visibleDetail?.recipesAndEvolutions },
    { label: t("detail.whatItIsNot"), value: visibleDetail?.whatItIsNot },
    { label: t("detail.difficultyNotes"), value: visibleDetail?.difficultyNotes }
  ].filter((section): section is { label: string; value: string } => Boolean(section.value));
  const discoveryIngredientCards =
    target.kind === "discovery" && target.unlocked
      ? target.card.ingredientIds
          .map((id) => descriptorById.get(id))
          .filter((card): card is DescriptorCard => Boolean(card))
      : [];
  const descriptorEvolutionCards =
    target.kind === "descriptor" ? discoveryCards.filter((card) => card.ingredientIds.includes(target.card.id)) : [];
  const descriptorAliasCards =
    target.kind === "descriptor" ? aliasVocabularyCards.filter((alias) => alias.anchorIds.includes(target.card.id)) : [];
  const discoveryAliasCards =
    target.kind === "discovery" && target.unlocked
      ? aliasVocabularyCards.filter((alias) => alias.discoveryAnchorIds?.includes(target.card.id))
      : [];
  const relatedAliasCards = isDescriptor ? descriptorAliasCards : discoveryAliasCards;
  const actionButton =
    target.kind === "descriptor" && target.unlocked ? (
      <button className="text-button" type="button" onClick={() => onUseDescriptor(target.card.id)}>
        {useActionLabel ?? t("action.useCard")}
      </button>
    ) : target.kind === "discovery" && target.unlocked ? (
      <button className="text-button" type="button" onClick={() => onUseDiscovery(target.card.id)}>
        {useActionLabel ?? t("action.useCard")}
      </button>
    ) : null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="card-detail-modal" role="dialog" aria-modal="true" aria-labelledby="card-detail-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose} title={t("action.close")}>
          <X aria-hidden="true" />
        </button>

        <div className="detail-art-panel">
          <div className="detail-art">
            {!target.unlocked ? <span className="locked-orb detail-locked" /> : <img src={imageSrc} alt={alt} />}
          </div>
          <div className="detail-actions">
            {actionButton}
            {!target.unlocked ? <span className="locked-note">{t("detail.locked")}</span> : null}
          </div>
        </div>

        <div className="detail-copy">
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
            {detailSections.map((section) => (
              <div key={section.label}>
                <h3>{section.label}</h3>
                <p>{section.value}</p>
              </div>
            ))}
            {relatedAliasCards.length > 0 ? (
              <>
                <h3>{t("detail.vocabularyCards")}</h3>
                <div className="detail-compact-card-list">
                  {relatedAliasCards.map((alias) => (
                    <button key={alias.id} className="detail-compact-card-button" type="button" onClick={() => onInspectAlias(alias)}>
                      <img src={alias.icon.src} alt={alias.icon.alt} loading="lazy" />
                      <strong>{alias.label}</strong>
                    </button>
                  ))}
                </div>
              </>
            ) : null}
            {discoveryIngredientCards.length > 0 ? (
              <>
                <h3>{t("detail.basicIngredients")}</h3>
                <div className="detail-compact-card-list">
                  {discoveryIngredientCards.map((ingredient) => (
                    <button key={ingredient.id} className="detail-compact-card-button" type="button" onClick={() => onInspectDescriptor(ingredient.id)}>
                      <img src={ingredient.icon.src} alt={t(ingredient.icon.altKey)} loading="lazy" />
                      <strong>{t(ingredient.textKeys.label)}</strong>
                    </button>
                  ))}
                </div>
              </>
            ) : null}
            {descriptorEvolutionCards.length > 0 ? (
              <>
                <h3>{t("detail.evolvesInto")}</h3>
                <div className="detail-compact-card-list">
                  {descriptorEvolutionCards.map((evolution) => {
                    const unlocked = unlockedDiscoverySet.has(evolution.id);
                    return (
                      <button key={evolution.id} className="detail-compact-card-button" type="button" onClick={() => onInspectDiscovery(evolution.id)}>
                        {unlocked ? (
                          <img src={evolution.icon.src} alt={t(evolution.icon.altKey)} loading="lazy" />
                        ) : (
                          <span className="locked-orb detail-compact-locked" aria-hidden="true" />
                        )}
                        <strong>{unlocked ? t(evolution.textKeys.label) : "???"}</strong>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

export type { CardDetailTarget };
