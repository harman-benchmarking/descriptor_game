import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, BookOpen, Boxes, Map, Settings, Sparkles } from "lucide-react";
import { baseFiltersForBasicIds, buildEffectiveFilters, expandDiscoveryToBasicIds } from "../audio/dsp/eqFilters";
import { buildCurvePoints } from "../audio/dsp/curveResponse";
import { WebAudioEngine } from "../audio/engine/WebAudioEngine";
import { allBasicIds, descriptorById, descriptorCatalog } from "../cards/descriptorCatalog";
import { discoveryCards } from "../cards/discoveryRecipes";
import { describeRemovedCards, toggleBasicCard } from "../cards/cardReducer";
import { exactMatchedDiscovery, matchedDiscoveries } from "../cards/recipeMatcher";
import { parseDescriptorDetailPages, type PlayerFacingIdentity } from "../cards/cardDetails";
import { gateDefinitions, regionDefinitions, type GateDefinition, type GateId } from "../data/regions";
import { trackDefinitions } from "../data/tracks";
import { createTranslator, type Locale } from "../i18n/i18n";
import { clearSaveData, loadSaveData, storeSaveData } from "../persistence/storage";
import { defaultSaveData, type IntensityMode, type PlaybackMode, type SaveDataV1 } from "../persistence/saveData";
import { CardGrid } from "../ui/components/CardGrid";
import { CardDetailModal, type CardDetailTarget } from "../ui/components/CardDetailModal";
import { DescriptorCard } from "../ui/components/DescriptorCard";
import { DiscoveryCard } from "../ui/components/DiscoveryCard";
import { EqCurveView } from "../ui/components/EqCurveView";
import { LanguagePicker } from "../ui/components/LanguagePicker";
import { PlaybackControls } from "../ui/components/PlaybackControls";
import type { ScreenId } from "./routes";
import type { DescriptorCard as DescriptorCardType } from "../cards/cardTypes";

const regionAIngredientIds = ["rumble", "thump", "punchy", "bright", "airy"];

function freshDefaultSave(): SaveDataV1 {
  return {
    ...defaultSaveData,
    unlockedDiscoveryIds: [],
    learnedBasicIds: [],
    completedChallenges: {},
    settings: { ...defaultSaveData.settings }
  };
}

export function App() {
  const [screen, setScreen] = useState<ScreenId>("learn");
  const [selectedGateId, setSelectedGateId] = useState<GateId>("bass");
  const [saveData, setSaveData] = useState<SaveDataV1>(() => loadSaveData());
  const [activeBasicIds, setActiveBasicIds] = useState<string[]>([]);
  const [activeDiscoveryId, setActiveDiscoveryId] = useState<string | null>(null);
  const [playbackMode, setPlaybackMode] = useState<PlaybackMode>("processed");
  const [intensityMode, setIntensityMode] = useState<IntensityMode>("practice");
  const [selectedTrackId, setSelectedTrackId] = useState(trackDefinitions[0].id);
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [spectralView, setSpectralView] = useState<"atlas" | "region">("atlas");
  const [audioReady, setAudioReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [notice, setNotice] = useState("status.saved");
  const [detailTarget, setDetailTarget] = useState<CardDetailTarget | null>(null);
  const [cardDetails, setCardDetails] = useState<Record<string, PlayerFacingIdentity>>({});
  const engineRef = useRef<WebAudioEngine | null>(null);

  const t = useMemo(() => createTranslator(saveData.locale), [saveData.locale]);
  const selectedTrack = trackDefinitions.find((track) => track.id === selectedTrackId) ?? trackDefinitions[0];
  const selectedGate = gateDefinitions.find((gate) => gate.id === selectedGateId) ?? gateDefinitions[0];
  const learnedBasicSet = useMemo(() => new Set(saveData.learnedBasicIds), [saveData.learnedBasicIds]);
  const unlockedDiscoverySet = useMemo(() => new Set(saveData.unlockedDiscoveryIds), [saveData.unlockedDiscoveryIds]);
  const allBasicsLearned = allBasicIds.every((id) => learnedBasicSet.has(id));
  const activeBaseFilters = useMemo(() => baseFiltersForBasicIds(activeBasicIds), [activeBasicIds]);
  const intensity = intensityMode === "practice" ? saveData.settings.practiceIntensity : saveData.settings.ratingIntensity;
  const effectiveFilters = useMemo(() => buildEffectiveFilters(activeBasicIds, intensity, engineRef.current?.sampleRate), [activeBasicIds, intensity]);
  const curvePoints = useMemo(() => buildCurvePoints(effectiveFilters), [effectiveFilters]);
  const matched = useMemo(() => matchedDiscoveries(activeBasicIds), [activeBasicIds]);
  const exactDiscovery = useMemo(() => exactMatchedDiscovery(activeBasicIds), [activeBasicIds]);
  const primaryDiscovery = activeDiscoveryId ? discoveryCards.find((card) => card.id === activeDiscoveryId) : exactDiscovery;
  const activeIdentityLabel =
    activeBasicIds.length === 0
      ? "Neutral"
      : primaryDiscovery
        ? t(primaryDiscovery.textKeys.label)
        : t("detail.customBlend");
  const containedDiscoveryLabels =
    activeBasicIds.length > 0
      ? matched.filter((recipe) => recipe.id !== primaryDiscovery?.id).map((recipe) => t(recipe.textKeys.label))
      : [];
  const isAtlasOnly = screen === "region" && spectralView === "atlas";

  useEffect(() => {
    storeSaveData(saveData);
  }, [saveData]);

  useEffect(() => {
    engineRef.current = new WebAudioEngine(selectedTrack.src);
    return () => engineRef.current?.dispose();
  }, []);

  useEffect(() => {
    fetch("/docs/descriptor-detail-pages.md")
      .then((response) => (response.ok ? response.text() : ""))
      .then((markdown) => setCardDetails(parseDescriptorDetailPages(markdown)))
      .catch(() => setCardDetails({}));
  }, []);

  useEffect(() => {
    void engineRef.current?.setTrack(selectedTrack.src);
  }, [selectedTrack.src]);

  useEffect(() => {
    engineRef.current?.setEqFilters(activeBaseFilters, intensity);
    engineRef.current?.setPlaybackMode(playbackMode);
  }, [activeBaseFilters, intensity, playbackMode]);

  useEffect(() => {
    const newMatches = matched.filter((recipe) => !unlockedDiscoverySet.has(recipe.id));
    if (newMatches.length === 0) return;

    setSaveData((current) => ({
      ...current,
      unlockedDiscoveryIds: [...new Set([...current.unlockedDiscoveryIds, ...newMatches.map((recipe) => recipe.id)])]
    }));
    setNotice(exactMatchedDiscovery(activeBasicIds)?.textKeys.label ?? "detail.customBlend");
  }, [activeBasicIds, matched, unlockedDiscoverySet]);

  const updateSave = (updater: (current: SaveDataV1) => SaveDataV1) => setSaveData((current) => updater(current));

  const learnBasics = (ids: string[], challengeId: string) => {
    updateSave((current) => ({
      ...current,
      learnedBasicIds: [...new Set([...current.learnedBasicIds, ...ids])],
      completedChallenges: {
        ...current.completedChallenges,
        [challengeId]: (current.completedChallenges[challengeId] ?? 0) + 1
      }
    }));
    setActiveDiscoveryId(null);
    setActiveBasicIds(ids);
    setPlaybackMode("processed");
    setNotice("status.saved");
  };

  const handleChallengeChoice = (gate: GateDefinition, targetId: string, choiceId: string) => {
    setActiveDiscoveryId(null);
    setActiveBasicIds([choiceId]);
    setPlaybackMode("processed");
    if (choiceId === targetId) {
      learnBasics([targetId], `${gate.id}.${targetId}`);
      return;
    }
    setNotice("status.tryAgain");
  };

  const handleToggleBasic = (id: string) => {
    const previous = activeBasicIds;
    const next = toggleBasicCard(previous, id);
    const removed = describeRemovedCards(previous, next);
    setActiveDiscoveryId(null);
    setActiveBasicIds(next);
    setPlaybackMode("processed");
    setNotice(removed.length > 0 ? removed.map((removedId) => descriptorById.get(removedId)?.textKeys.label ?? removedId).join(", ") : "status.saved");
  };

  const inspectDescriptor = (id: string) => {
    const card = descriptorById.get(id);
    if (!card) return;
    setDetailTarget({
      kind: "descriptor",
      card,
      unlocked: learnedBasicSet.has(id)
    });
  };

  const inspectDiscovery = (id: string) => {
    const card = discoveryCards.find((candidate) => candidate.id === id);
    if (!card) return;
    setDetailTarget({
      kind: "discovery",
      card,
      unlocked: unlockedDiscoverySet.has(id)
    });
  };

  const playDiscovery = (id: string) => {
    const ingredientIds = expandDiscoveryToBasicIds(id);
    setActiveBasicIds(ingredientIds);
    setActiveDiscoveryId(id);
    setPlaybackMode("processed");
    setNotice("status.saved");
  };

  const useInspectedDescriptor = (id: string) => {
    handleToggleBasic(id);
    setDetailTarget(null);
  };

  const useInspectedDiscovery = (id: string) => {
    playDiscovery(id);
    setDetailTarget(null);
  };

  const startAudio = async () => {
    await engineRef.current?.play();
    setAudioReady(true);
    setPlaying(true);
  };

  const togglePlay = async () => {
    if (!engineRef.current?.isReady) {
      await startAudio();
      return;
    }
    if (engineRef.current.isPlaying) {
      engineRef.current.pause();
      setPlaying(false);
      return;
    }
    await engineRef.current.play();
    setAudioReady(true);
    setPlaying(true);
  };

  const setCurrentIntensity = (value: number) => {
    updateSave((current) => ({
      ...current,
      settings: {
        ...current.settings,
        [intensityMode === "practice" ? "practiceIntensity" : "ratingIntensity"]: value
      }
    }));
  };

  const resetProgress = () => {
    clearSaveData();
    setSaveData(freshDefaultSave());
    setActiveBasicIds([]);
    setActiveDiscoveryId(null);
    setNotice("status.saved");
  };

  const clearActiveSound = () => {
    setActiveBasicIds([]);
    setActiveDiscoveryId(null);
    setNotice("status.saved");
  };

  const navItems = [
    { id: "learn" as const, label: t("nav.learn"), icon: BookOpen },
    { id: "region" as const, label: t("nav.region"), icon: Map },
    { id: "collection" as const, label: t("nav.collection"), icon: Boxes },
    { id: "sandbox" as const, label: t("nav.sandbox"), icon: Sparkles },
    { id: "settings" as const, label: t("nav.settings"), icon: Settings }
  ];

  return (
    <div className={`app-shell ${isAtlasOnly ? "is-spectral-view" : ""}`}>
      <header className="app-header">
        <div>
          <p className="eyebrow">{t("region.a.summary")}</p>
          <h1>{t("app.title")}</h1>
        </div>
        <nav className="top-nav" aria-label="Main">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={screen === item.id ? "is-active" : ""}
                type="button"
                onClick={() => {
                  setScreen(item.id);
                  if (item.id === "region") {
                    setSpectralView("atlas");
                  }
                }}
              >
                <Icon aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {!isAtlasOnly ? (
        <PlaybackControls
          audioReady={audioReady}
          playing={playing}
          playbackMode={playbackMode}
          intensityMode={intensityMode}
          intensity={intensity}
          onStart={startAudio}
          onTogglePlay={togglePlay}
          onPlaybackMode={setPlaybackMode}
          onIntensityMode={setIntensityMode}
          onIntensityChange={setCurrentIntensity}
          onClear={clearActiveSound}
          t={t}
        />
      ) : null}

      <main className="main-grid">
        <section className="primary-stage">
          {screen === "learn" ? (
            <LearnScreen
              selectedGate={selectedGate}
              selectedGateId={selectedGateId}
              setSelectedGateId={setSelectedGateId}
              learnedBasicSet={learnedBasicSet}
              activeBasicIds={activeBasicIds}
              t={t}
              learnBasics={learnBasics}
              handleChallengeChoice={handleChallengeChoice}
              handleToggleBasic={handleToggleBasic}
              inspectDescriptor={inspectDescriptor}
            />
          ) : null}

          {screen === "region" ? (
            <RegionScreen
              allBasicsLearned={allBasicsLearned}
              learnedBasicIds={saveData.learnedBasicIds}
              activeBasicIds={activeBasicIds}
              activeDiscoveryId={activeDiscoveryId}
              unlockedDiscoverySet={unlockedDiscoverySet}
              selectedRegionId={selectedRegionId}
              spectralView={spectralView}
              enterRegion={(id) => {
                const region = regionDefinitions.find((candidate) => candidate.id === id);
                const canEnter = Boolean(region?.playable && allBasicsLearned);
                setSelectedRegionId(id);
                setSpectralView(canEnter ? "region" : "atlas");
              }}
              backToAtlas={() => setSpectralView("atlas")}
              t={t}
              handleToggleBasic={handleToggleBasic}
              playDiscovery={playDiscovery}
              inspectDescriptor={inspectDescriptor}
              inspectDiscovery={inspectDiscovery}
            />
          ) : null}

          {screen === "collection" ? (
            <CollectionScreen
              learnedBasicIds={saveData.learnedBasicIds}
              activeBasicIds={activeBasicIds}
              unlockedDiscoverySet={unlockedDiscoverySet}
              activeDiscoveryId={activeDiscoveryId}
              t={t}
              handleToggleBasic={handleToggleBasic}
              playDiscovery={playDiscovery}
              inspectDescriptor={inspectDescriptor}
              inspectDiscovery={inspectDiscovery}
              resetProgress={resetProgress}
            />
          ) : null}

          {screen === "sandbox" ? (
            <SandboxScreen
              selectedTrackId={selectedTrackId}
              setSelectedTrackId={setSelectedTrackId}
              learnedBasicIds={saveData.learnedBasicIds}
              activeBasicIds={activeBasicIds}
              unlockedDiscoverySet={unlockedDiscoverySet}
              activeDiscoveryId={activeDiscoveryId}
              t={t}
              handleToggleBasic={handleToggleBasic}
              playDiscovery={playDiscovery}
              inspectDescriptor={inspectDescriptor}
              inspectDiscovery={inspectDiscovery}
            />
          ) : null}

          {screen === "settings" ? (
            <SettingsScreen
              saveData={saveData}
              setLocale={(locale) => updateSave((current) => ({ ...current, locale }))}
              setPracticeIntensity={(value) =>
                updateSave((current) => ({ ...current, settings: { ...current.settings, practiceIntensity: value } }))
              }
              setRatingIntensity={(value) =>
                updateSave((current) => ({ ...current, settings: { ...current.settings, ratingIntensity: value } }))
              }
              resetProgress={resetProgress}
              t={t}
            />
          ) : null}
        </section>

        {!isAtlasOnly ? (
        <aside className="side-rail">
          <div className="status-band">
            <div>
              <span>{t("home.progress")}</span>
              <strong>
                {saveData.learnedBasicIds.length}/{allBasicIds.length}
              </strong>
            </div>
            <div>
              <span>{t("home.discoveries")}</span>
              <strong>
                {saveData.unlockedDiscoveryIds.length}/{discoveryCards.length}
              </strong>
            </div>
          </div>

          <section className="tool-surface">
            <div className="section-heading">
              <h2>{t("section.activeCards")}</h2>
              <p>{activeIdentityLabel}</p>
            </div>
            <div className="active-stack">
              {activeBasicIds.length === 0 ? <span className="empty-state">Neutral</span> : null}
              {activeBasicIds.map((id) => {
                const card = descriptorById.get(id);
                if (!card) return null;
                return <span key={id}>{t(card.textKeys.label)}</span>;
              })}
            </div>
            {containedDiscoveryLabels.length > 0 ? <p className="contains-line">Contains: {containedDiscoveryLabels.join(", ")}</p> : null}
          </section>

          <section className="tool-surface">
            <div className="section-heading">
              <h2>{t("section.curve")}</h2>
              <p>{Math.round(intensity * 100)}%</p>
            </div>
            <EqCurveView points={curvePoints} />
          </section>
        </aside>
        ) : null}
      </main>

      <CardDetailModal
        target={detailTarget}
        t={t}
        onClose={() => setDetailTarget(null)}
        onUseDescriptor={useInspectedDescriptor}
        onUseDiscovery={useInspectedDiscovery}
        detail={detailTarget ? cardDetails[detailTarget.card.id] : undefined}
      />
    </div>
  );
}

type LearnProps = {
  selectedGate: GateDefinition;
  selectedGateId: GateId;
  setSelectedGateId: (id: GateId) => void;
  learnedBasicSet: Set<string>;
  activeBasicIds: string[];
  t: (key: string) => string;
  learnBasics: (ids: string[], challengeId: string) => void;
  handleChallengeChoice: (gate: GateDefinition, targetId: string, choiceId: string) => void;
  handleToggleBasic: (id: string) => void;
  inspectDescriptor: (id: string) => void;
};

function LearnScreen({ selectedGate, selectedGateId, setSelectedGateId, learnedBasicSet, activeBasicIds, t, learnBasics, handleChallengeChoice, handleToggleBasic, inspectDescriptor }: LearnProps) {
  const gateCards = [...selectedGate.giftCards, selectedGate.firstCatch, ...selectedGate.laterUnlocks]
    .map((id) => descriptorById.get(id))
    .filter((card): card is DescriptorCardType => Boolean(card));
  const giftsClaimed = selectedGate.giftCards.every((id) => learnedBasicSet.has(id));

  return (
    <div className="screen-flow">
      <div className="gate-tabs">
        {gateDefinitions.map((gate) => (
          <button key={gate.id} className={selectedGateId === gate.id ? "is-active" : ""} type="button" onClick={() => setSelectedGateId(gate.id)}>
            <span>{t(gate.labelKey)}</span>
            <small>{t(gate.summaryKey)}</small>
          </button>
        ))}
      </div>

      <section className="tool-surface">
        <div className="section-heading">
          <h2>{t(selectedGate.labelKey)}</h2>
          <p>{t(selectedGate.summaryKey)}</p>
        </div>

        <div className="lesson-row">
          <div>
            <h3>{t("section.gifts")}</h3>
            <div className="mini-card-row">
              {selectedGate.giftCards.map((id) => {
                const card = descriptorById.get(id)!;
                return (
                  <DescriptorCard
                    key={id}
                    card={card}
                    label={t(card.textKeys.label)}
                    summary={t(card.textKeys.summary)}
                    alt={t(card.icon.altKey)}
                    active={activeBasicIds.includes(id)}
                    locked={!learnedBasicSet.has(id)}
                    compact
                    onClick={learnedBasicSet.has(id) ? () => handleToggleBasic(id) : () => inspectDescriptor(id)}
                    onInspect={() => inspectDescriptor(id)}
                  />
                );
              })}
            </div>
            {!giftsClaimed ? (
              <button className="text-button" type="button" onClick={() => learnBasics(selectedGate.giftCards, `${selectedGate.id}.gifts`)}>
                {t("action.claimGift")}
              </button>
            ) : null}
          </div>

          <ChallengeBlock gate={selectedGate} targetId={selectedGate.firstCatch} learnedBasicSet={learnedBasicSet} t={t} onChoice={handleChallengeChoice} title={t("section.firstCatch")} />
        </div>
      </section>

      <section className="tool-surface">
        <div className="section-heading">
          <h2>{t("section.laterUnlocks")}</h2>
          <p>{t(selectedGate.summaryKey)}</p>
        </div>
        <div className="challenge-grid">
          {selectedGate.laterUnlocks.map((targetId) => (
            <ChallengeBlock key={targetId} gate={selectedGate} targetId={targetId} learnedBasicSet={learnedBasicSet} t={t} onChoice={handleChallengeChoice} />
          ))}
        </div>
      </section>

      <section className="tool-surface">
        <div className="section-heading">
          <h2>{t("section.basics")}</h2>
          <p>{gateCards.length} cards</p>
        </div>
        <CardGrid
          cards={gateCards}
          activeIds={activeBasicIds}
          unlockedIds={[...learnedBasicSet]}
          t={t}
          compact
          onCardClick={handleToggleBasic}
          onInspectCard={inspectDescriptor}
        />
      </section>
    </div>
  );
}

type ChallengeProps = {
  gate: GateDefinition;
  targetId: string;
  learnedBasicSet: Set<string>;
  title?: string;
  t: (key: string) => string;
  onChoice: (gate: GateDefinition, targetId: string, choiceId: string) => void;
};

function ChallengeBlock({ gate, targetId, learnedBasicSet, title, t, onChoice }: ChallengeProps) {
  const target = descriptorById.get(targetId)!;
  const isUnlocked = learnedBasicSet.has(targetId);
  const choices = [...new Set([targetId, ...gate.anchors])].filter((id) => descriptorById.has(id));

  return (
    <div className="challenge-block">
      <h3>{title ?? t(target.textKeys.label)}</h3>
      <p>{isUnlocked ? t(target.textKeys.summary) : t(target.textKeys.summary)}</p>
      <div className="choice-row">
        {choices.map((choiceId) => {
          const choice = descriptorById.get(choiceId)!;
          return (
            <button key={choiceId} className="choice-button" type="button" onClick={() => onChoice(gate, targetId, choiceId)}>
              {t(choice.textKeys.label)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

type RegionProps = {
  allBasicsLearned: boolean;
  learnedBasicIds: string[];
  activeBasicIds: string[];
  activeDiscoveryId: string | null;
  unlockedDiscoverySet: Set<string>;
  selectedRegionId: string | null;
  spectralView: "atlas" | "region";
  enterRegion: (id: string) => void;
  backToAtlas: () => void;
  t: (key: string) => string;
  handleToggleBasic: (id: string) => void;
  playDiscovery: (id: string) => void;
  inspectDescriptor: (id: string) => void;
  inspectDiscovery: (id: string) => void;
};

function RegionScreen({
  allBasicsLearned,
  learnedBasicIds,
  activeBasicIds,
  activeDiscoveryId,
  unlockedDiscoverySet,
  selectedRegionId,
  spectralView,
  enterRegion,
  backToAtlas,
  t,
  handleToggleBasic,
  playDiscovery,
  inspectDescriptor,
  inspectDiscovery
}: RegionProps) {
  const regionCards = regionDefinitions;
  const ingredientCards = regionAIngredientIds.map((id) => descriptorById.get(id)!).filter(Boolean);
  const selectedRegion = regionDefinitions.find((region) => region.id === selectedRegionId);
  const selectedRegionOpen = selectedRegion?.playable && allBasicsLearned;

  if (spectralView === "region" && selectedRegion?.id === "a" && selectedRegionOpen) {
    return (
      <div className="screen-flow">
        <section className="region-hero">
          <img src={selectedRegion.imageSrc} alt={t(selectedRegion.labelKey)} />
          <div>
            <button className="text-button" type="button" onClick={backToAtlas}>
              <ArrowLeft aria-hidden="true" />
              <span>{t("action.backToAtlas")}</span>
            </button>
            <p className="eyebrow">{t("spectral.title")}</p>
            <h2>{t(selectedRegion.labelKey)}</h2>
            <p>{t(selectedRegion.summaryKey)}</p>
          </div>
        </section>

        <section className="tool-surface">
          <div className="section-heading">
            <h2>{t("section.basics")}</h2>
            <p>{t("region.a.summary")}</p>
          </div>
          <CardGrid
            cards={ingredientCards}
            activeIds={activeBasicIds}
            unlockedIds={learnedBasicIds}
            t={t}
            onCardClick={handleToggleBasic}
            onInspectCard={inspectDescriptor}
          />
        </section>

        <RecipeShelf unlockedDiscoverySet={unlockedDiscoverySet} activeDiscoveryId={activeDiscoveryId} t={t} onPlay={playDiscovery} onInspect={inspectDiscovery} />
      </div>
    );
  }

  return (
    <div className="screen-flow">
      <section className="spectral-atlas">
        <div className="region-map">
          {regionCards.map((region) => {
            const open = region.playable && allBasicsLearned;
            return (
              <button
                key={region.id}
                className={`region-tile ${open ? "is-open" : "is-locked"}`}
                type="button"
                onClick={() => enterRegion(region.id)}
              >
                <img src={region.imageSrc} alt={t(region.labelKey)} loading="lazy" />
                <span>
                  <strong>{t(region.labelKey)}</strong>
                  <small>{open ? t(region.summaryKey) : t("status.regionLocked")}</small>
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function RecipeShelf({
  unlockedDiscoverySet,
  activeDiscoveryId,
  t,
  onPlay,
  onInspect
}: {
  unlockedDiscoverySet: Set<string>;
  activeDiscoveryId: string | null;
  t: (key: string) => string;
  onPlay: (id: string) => void;
  onInspect: (id: string) => void;
}) {
  return (
    <section className="tool-surface">
      <div className="section-heading">
        <h2>{t("section.recipes")}</h2>
        <p>{t("region.a.summary")}</p>
      </div>
      <div className="discovery-grid">
        {discoveryCards.map((card) => (
          <DiscoveryCard
            key={card.id}
            card={card}
            label={t(card.textKeys.label)}
            explanation={t(card.textKeys.explanation)}
            hint={t(`hint.${card.id}`)}
            alt={t(card.icon.altKey)}
            unlocked={unlockedDiscoverySet.has(card.id)}
            active={activeDiscoveryId === card.id}
            onClick={unlockedDiscoverySet.has(card.id) ? () => onPlay(card.id) : () => onInspect(card.id)}
            onInspect={() => onInspect(card.id)}
          />
        ))}
      </div>
    </section>
  );
}

function CollectionScreen({
  learnedBasicIds,
  activeBasicIds,
  unlockedDiscoverySet,
  activeDiscoveryId,
  t,
  handleToggleBasic,
  playDiscovery,
  inspectDescriptor,
  inspectDiscovery,
  resetProgress
}: {
  learnedBasicIds: string[];
  activeBasicIds: string[];
  unlockedDiscoverySet: Set<string>;
  activeDiscoveryId: string | null;
  t: (key: string) => string;
  handleToggleBasic: (id: string) => void;
  playDiscovery: (id: string) => void;
  inspectDescriptor: (id: string) => void;
  inspectDiscovery: (id: string) => void;
  resetProgress: () => void;
}) {
  return (
    <div className="screen-flow">
      <section className="tool-surface">
        <div className="section-heading">
          <h2>{t("section.basics")}</h2>
          <p>
            {learnedBasicIds.length}/{descriptorCatalog.length}
          </p>
          <button className="danger-button compact-danger" type="button" onClick={resetProgress}>
            {t("action.devWipe")}
          </button>
        </div>
        <CardGrid
          cards={descriptorCatalog}
          activeIds={activeBasicIds}
          unlockedIds={learnedBasicIds}
          t={t}
          compact
          onCardClick={handleToggleBasic}
          onInspectCard={inspectDescriptor}
        />
      </section>

      <RecipeShelf unlockedDiscoverySet={unlockedDiscoverySet} activeDiscoveryId={activeDiscoveryId} t={t} onPlay={playDiscovery} onInspect={inspectDiscovery} />
    </div>
  );
}

function SandboxScreen({
  selectedTrackId,
  setSelectedTrackId,
  learnedBasicIds,
  activeBasicIds,
  unlockedDiscoverySet,
  activeDiscoveryId,
  t,
  handleToggleBasic,
  playDiscovery,
  inspectDescriptor,
  inspectDiscovery
}: {
  selectedTrackId: string;
  setSelectedTrackId: (id: string) => void;
  learnedBasicIds: string[];
  activeBasicIds: string[];
  unlockedDiscoverySet: Set<string>;
  activeDiscoveryId: string | null;
  t: (key: string) => string;
  handleToggleBasic: (id: string) => void;
  playDiscovery: (id: string) => void;
  inspectDescriptor: (id: string) => void;
  inspectDiscovery: (id: string) => void;
}) {
  const unlockedBasics = descriptorCatalog.filter((card) => learnedBasicIds.includes(card.id));

  return (
    <div className="screen-flow">
      <section className="tool-surface">
        <div className="section-heading">
          <h2>{t("nav.sandbox")}</h2>
          <select value={selectedTrackId} onChange={(event) => setSelectedTrackId(event.target.value)}>
            {trackDefinitions.map((track) => (
              <option key={track.id} value={track.id}>
                {t(track.labelKey)}
              </option>
            ))}
          </select>
        </div>
        <CardGrid
          cards={unlockedBasics}
          activeIds={activeBasicIds}
          unlockedIds={learnedBasicIds}
          t={t}
          onCardClick={handleToggleBasic}
          onInspectCard={inspectDescriptor}
        />
      </section>

      <RecipeShelf unlockedDiscoverySet={unlockedDiscoverySet} activeDiscoveryId={activeDiscoveryId} t={t} onPlay={playDiscovery} onInspect={inspectDiscovery} />
    </div>
  );
}

function SettingsScreen({
  saveData,
  setLocale,
  setPracticeIntensity,
  setRatingIntensity,
  resetProgress,
  t
}: {
  saveData: SaveDataV1;
  setLocale: (locale: Locale) => void;
  setPracticeIntensity: (value: number) => void;
  setRatingIntensity: (value: number) => void;
  resetProgress: () => void;
  t: (key: string) => string;
}) {
  return (
    <div className="screen-flow">
      <section className="tool-surface settings-stack">
        <div className="section-heading">
          <h2>{t("nav.settings")}</h2>
          <p>{t("status.saved")}</p>
        </div>
        <LanguagePicker locale={saveData.locale} onChange={setLocale} label={t("settings.language")} />
        <label className="settings-range">
          <span>{t("settings.practiceIntensity")}</span>
          <strong>{Math.round(saveData.settings.practiceIntensity * 100)}%</strong>
          <input min="0.5" max="2.2" step="0.05" type="range" value={saveData.settings.practiceIntensity} onChange={(event) => setPracticeIntensity(Number(event.target.value))} />
        </label>
        <label className="settings-range">
          <span>{t("settings.ratingIntensity")}</span>
          <strong>{Math.round(saveData.settings.ratingIntensity * 100)}%</strong>
          <input min="0.5" max="1.2" step="0.05" type="range" value={saveData.settings.ratingIntensity} onChange={(event) => setRatingIntensity(Number(event.target.value))} />
        </label>
        <button className="danger-button" type="button" onClick={resetProgress}>
          {t("action.reset")}
        </button>
      </section>
    </div>
  );
}
