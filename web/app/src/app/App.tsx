import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, BookOpen, Boxes, Building2, Check, ChevronLeft, ChevronRight, Lock, Map as MapIcon, Pause, Play, RotateCcw, Settings, SkipForward, X } from "lucide-react";
import { buildEffectiveFilters, effectiveIntensityRangeForActiveSpectralBuckets, expandDiscoveryToBasicIds, headroomIntensityForActiveSpectralBuckets, maxEqBands } from "../audio/dsp/eqFilters";
import { buildCurvePoints } from "../audio/dsp/curveResponse";
import { WebAudioEngine } from "../audio/engine/WebAudioEngine";
import { allBasicIds, basicIdsForModule, descriptorById, descriptorCatalog } from "../cards/descriptorCatalog";
import { discoveryById, discoveryCards } from "../cards/discoveryRecipes";
import { aliasVocabularyCards, type AliasVocabularyCard } from "../cards/aliasVocabulary";
import { describeRemovedCards, toggleBasicCard } from "../cards/cardReducer";
import { evaluateDiscoveryBlend, type BlendCraftStatus } from "../cards/blendCrafting";
import { normalizeDetailId, parseDescriptorDetailPages, type PlayerFacingIdentity } from "../cards/cardDetails";
import { gateDefinitions, moduleDefinitions, playableRegionContent, regionDefinitions, type GateDefinition, type GateId } from "../data/regions";
import { preferredTrackForGate, trackDefinitions } from "../data/tracks";
import { createTranslator, type Locale } from "../i18n/i18n";
import { createListeningTrial, listeningChallengeFor, type ListeningTrialOption } from "../learn/listeningChallenges";
import { clearSaveData, loadSaveData, storeSaveData } from "../persistence/storage";
import { defaultSaveData, type PlaybackMode, type SaveDataV1 } from "../persistence/saveData";
import { CardGrid } from "../ui/components/CardGrid";
import { CardDetailModal, type CardDetailTarget } from "../ui/components/CardDetailModal";
import { DescriptorCard } from "../ui/components/DescriptorCard";
import { DiscoveryCard } from "../ui/components/DiscoveryCard";
import { EqCurveView } from "../ui/components/EqCurveView";
import { LanguagePicker } from "../ui/components/LanguagePicker";
import { activeVisualizerModule, ModuleVisualizer, moduleVisualizerLabelKey } from "../ui/components/visualizers/ModuleVisualizer";
import { DynamicMotionVisualizer } from "../ui/components/visualizers/DynamicMotionVisualizer";
import { IntegrityArtifactVisualizer } from "../ui/components/visualizers/IntegrityArtifactVisualizer";
import { SpatialStageVisualizer } from "../ui/components/visualizers/SpatialStageVisualizer";
import { PlaybackControls } from "../ui/components/PlaybackControls";
import type { ScreenId } from "./routes";
import type { DescriptorCard as DescriptorCardType, DescriptorModuleId, DiscoveryCard as DiscoveryCardType } from "../cards/cardTypes";

type BlindPreviewState = {
  gateId: GateId;
  targetId: string;
  optionLabel: string;
  submitted: boolean;
};

type TowerTrial = {
  floorId: TowerFloorId;
  targetId: string;
  selectedId: string | null;
  selectedIngredientIds: string[];
  missingIngredientId: string | null;
  optionIds: string[];
  previewed: boolean;
  submitted: boolean;
};

type BlendAttempt = {
  id: string;
  regionId: string;
  blendKey: string;
  ids: string[];
  status: BlendCraftStatus;
  discoveryId?: string;
};

type TowerFloorId = "floor1" | "floor2" | "floor3" | "floor4" | "floor5" | "floor6";
type TowerFloorMode = "singleChoice" | "ingredientRecipe" | "missingIngredient" | "discoveryChoice";

type TowerFloorDefinition = {
  id: TowerFloorId;
  mode: TowerFloorMode;
  labelKey: string;
  shortKey: string;
  titleKey: string;
  subtitleKey: string;
  instructionKey: string;
  promotionScore: number;
  answerIds: readonly string[];
  requiredBasicIds: readonly string[];
  ingredientAnswerCount?: number;
};

type CurriculumStageProgress = {
  completed: number;
  total: number;
  complete: boolean;
};

type CurriculumProgress = {
  training: CurriculumStageProgress;
  atlas: CurriculumStageProgress;
  lexicon: CurriculumStageProgress;
  towerUnlocked: boolean;
};

const towerFloorOneAnswerIds = ["bassy", "vivid", "sharp", "empty", "faded", "distant"] as const;
const towerFloorTwoAnswerIds = ["boomy", "honky", "bright", "thin", "hollow", "dull"] as const;

function spectralDiscoveryIdsByIngredientCount(count: number) {
  return discoveryCards
    .filter((card) => card.ingredientIds.length === count && card.ingredientIds.every((id) => descriptorById.get(id)?.moduleId === "spectral"))
    .map((card) => card.id);
}

function spectralDiscoveryIdsByMinimumIngredientCount(count: number) {
  return discoveryCards
    .filter((card) => card.ingredientIds.length >= count && card.ingredientIds.every((id) => descriptorById.get(id)?.moduleId === "spectral"))
    .map((card) => card.id);
}

function requiredBasicsForTowerAnswers(answerIds: readonly string[]) {
  return [...new Set(answerIds.flatMap((id) => discoveryById.get(id)?.ingredientIds ?? []))];
}

const towerFloorThreeAnswerIds = spectralDiscoveryIdsByIngredientCount(2);
const towerFloorThreeRequiredBasicIds = requiredBasicsForTowerAnswers(towerFloorThreeAnswerIds);
const towerFloorFourAnswerIds = spectralDiscoveryIdsByIngredientCount(3);
const towerFloorFourRequiredBasicIds = requiredBasicsForTowerAnswers(towerFloorFourAnswerIds);
const towerFloorFiveAnswerIds = spectralDiscoveryIdsByMinimumIngredientCount(3);
const towerFloorFiveRequiredBasicIds = requiredBasicsForTowerAnswers(towerFloorFiveAnswerIds);
const towerFloorSixAnswerIds = towerFloorFiveAnswerIds;
const towerFloorSixRequiredBasicIds = towerFloorFiveRequiredBasicIds;
const towerCorrectScoreDelta = 2;
const towerWrongScoreDelta = -1;
const towerIngredientChoiceCount = 6;
const towerDiscoveryChoiceCount = 6;

const towerFloorDefinitions: TowerFloorDefinition[] = [
  {
    id: "floor1",
    mode: "singleChoice",
    labelKey: "tower.firstFloor",
    shortKey: "tower.firstFloor.short",
    titleKey: "tower.floorOne.title",
    subtitleKey: "tower.floorOne.subtitle",
    instructionKey: "tower.instructions.named",
    promotionScore: 8,
    answerIds: towerFloorOneAnswerIds,
    requiredBasicIds: ["boomy", "boxy", "bright", "harsh", "thin", "hollow", "dull"]
  },
  {
    id: "floor2",
    mode: "singleChoice",
    labelKey: "tower.secondFloor",
    shortKey: "tower.secondFloor.short",
    titleKey: "tower.floorTwo.title",
    subtitleKey: "tower.floorTwo.subtitle",
    instructionKey: "tower.instructions.named",
    promotionScore: 10,
    answerIds: towerFloorTwoAnswerIds,
    requiredBasicIds: towerFloorTwoAnswerIds
  },
  {
    id: "floor3",
    mode: "ingredientRecipe",
    labelKey: "tower.thirdFloor",
    shortKey: "tower.thirdFloor.short",
    titleKey: "tower.floorThree.title",
    subtitleKey: "tower.floorThree.subtitle",
    instructionKey: "tower.instructions.ingredients",
    promotionScore: 12,
    answerIds: towerFloorThreeAnswerIds,
    requiredBasicIds: towerFloorThreeRequiredBasicIds,
    ingredientAnswerCount: 2
  },
  {
    id: "floor4",
    mode: "ingredientRecipe",
    labelKey: "tower.fourthFloor",
    shortKey: "tower.fourthFloor.short",
    titleKey: "tower.floorFour.title",
    subtitleKey: "tower.floorFour.subtitle",
    instructionKey: "tower.instructions.ingredientsThree",
    promotionScore: 14,
    answerIds: towerFloorFourAnswerIds,
    requiredBasicIds: towerFloorFourRequiredBasicIds,
    ingredientAnswerCount: 3
  },
  {
    id: "floor5",
    mode: "missingIngredient",
    labelKey: "tower.fifthFloor",
    shortKey: "tower.fifthFloor.short",
    titleKey: "tower.floorFive.title",
    subtitleKey: "tower.floorFive.subtitle",
    instructionKey: "tower.instructions.missingIngredient",
    promotionScore: 16,
    answerIds: towerFloorFiveAnswerIds,
    requiredBasicIds: towerFloorFiveRequiredBasicIds
  },
  {
    id: "floor6",
    mode: "discoveryChoice",
    labelKey: "tower.sixthFloor",
    shortKey: "tower.sixthFloor.short",
    titleKey: "tower.floorSix.title",
    subtitleKey: "tower.floorSix.subtitle",
    instructionKey: "tower.instructions.discoveryName",
    promotionScore: 18,
    answerIds: towerFloorSixAnswerIds,
    requiredBasicIds: towerFloorSixRequiredBasicIds
  }
];

const towerFloorById = new Map(towerFloorDefinitions.map((floor) => [floor.id, floor]));

function shuffled<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function sameIdSet(left: readonly string[], right: readonly string[]) {
  if (left.length !== right.length) return false;
  const rightSet = new Set(right);
  return left.every((id) => rightSet.has(id));
}

function towerTrialSubmitted(trial: TowerTrial) {
  return trial.submitted;
}

function towerTrialCorrect(trial: TowerTrial) {
  return towerScoreDeltaForTrial(trial) === towerCorrectScoreDelta;
}

function descriptorFamilyKey(id: string): string | null {
  const descriptor = descriptorById.get(id);
  const filter = descriptor?.filters[0];
  if (!descriptor || !filter) return null;
  return `${descriptor.group}:${filter.gainDb >= 0 ? "boost" : "cut"}`;
}

function towerIngredientScoreDelta(selectedIds: readonly string[], targetIds: readonly string[]) {
  if (sameIdSet(selectedIds, targetIds)) return towerCorrectScoreDelta;

  const correctSelectedIds = selectedIds.filter((id) => targetIds.includes(id));
  const wrongSelectedIds = selectedIds.filter((id) => !targetIds.includes(id));
  const missingTargetIds = targetIds.filter((id) => !selectedIds.includes(id));
  if (correctSelectedIds.length === targetIds.length - 1 && wrongSelectedIds.length === 1 && missingTargetIds.length === 1) {
    const wrongSelectedId = wrongSelectedIds[0];
    const missingTargetId = missingTargetIds[0];
    const wrongFamily = wrongSelectedId ? descriptorFamilyKey(wrongSelectedId) : null;
    const missingFamily = missingTargetId ? descriptorFamilyKey(missingTargetId) : null;
    return wrongFamily && wrongFamily === missingFamily ? 1 : 0;
  }

  return towerWrongScoreDelta;
}

function towerMissingIngredientScoreDelta(selectedId: string | null, missingIngredientId: string | null) {
  if (!selectedId || !missingIngredientId) return towerWrongScoreDelta;
  if (selectedId === missingIngredientId) return towerCorrectScoreDelta;
  const selectedFamily = descriptorFamilyKey(selectedId);
  const missingFamily = descriptorFamilyKey(missingIngredientId);
  return selectedFamily && selectedFamily === missingFamily ? 1 : towerWrongScoreDelta;
}

function sharedIngredientCount(leftIds: readonly string[], rightIds: readonly string[]) {
  const rightSet = new Set(rightIds);
  return leftIds.filter((id) => rightSet.has(id)).length;
}

function regionIdsForDiscovery(discoveryId: string) {
  return Object.entries(playableRegionContent)
    .filter(([, content]) => content.discoveryIds.includes(discoveryId))
    .map(([regionId]) => regionId);
}

function towerDiscoveryChoiceScoreDelta(selectedId: string | null, targetId: string) {
  if (!selectedId) return towerWrongScoreDelta;
  if (selectedId === targetId) return towerCorrectScoreDelta;

  const selected = discoveryById.get(selectedId);
  const target = discoveryById.get(targetId);
  if (!selected || !target) return towerWrongScoreDelta;

  if (sharedIngredientCount(selected.ingredientIds, target.ingredientIds) >= 2) return 1;

  const targetRegionIds = new Set(regionIdsForDiscovery(targetId));
  const sharesRegion = regionIdsForDiscovery(selectedId).some((regionId) => targetRegionIds.has(regionId));
  return sharesRegion ? 0 : towerWrongScoreDelta;
}

function towerScoreDeltaForTrial(trial: TowerTrial) {
  const floor = towerFloorById.get(trial.floorId);
  if (floor?.mode === "ingredientRecipe") {
    return towerIngredientScoreDelta(trial.selectedIngredientIds, basicIdsForTowerTarget(trial.targetId));
  }
  if (floor?.mode === "missingIngredient") {
    return towerMissingIngredientScoreDelta(trial.selectedId, trial.missingIngredientId);
  }
  if (floor?.mode === "discoveryChoice") {
    return towerDiscoveryChoiceScoreDelta(trial.selectedId, trial.targetId);
  }
  return trial.selectedId === trial.targetId ? towerCorrectScoreDelta : towerWrongScoreDelta;
}

function towerFeedbackKeyForScoreDelta(scoreDelta: number) {
  if (scoreDelta === towerCorrectScoreDelta) return "tower.feedback.correct";
  if (scoreDelta > 0) return "tower.feedback.close";
  return "tower.feedback.notYet";
}

function towerFeedbackClassForScoreDelta(scoreDelta: number) {
  if (scoreDelta === towerCorrectScoreDelta) return "is-correct";
  if (scoreDelta > 0) return "is-partial";
  return "is-wrong";
}

function towerScoreDeltaKey(scoreDelta: number) {
  if (scoreDelta === towerCorrectScoreDelta) return "tower.scoreDelta.correct";
  if (scoreDelta === 1) return "tower.scoreDelta.partial";
  if (scoreDelta === 0) return "tower.scoreDelta.neutral";
  return "tower.scoreDelta.wrong";
}

function createTowerIngredientOptions(targetId: string, floor: TowerFloorDefinition): string[] {
  const targetIngredientIds = basicIdsForTowerTarget(targetId);
  const distractorIds = floor.requiredBasicIds.filter((id) => !targetIngredientIds.includes(id));
  return shuffled([...targetIngredientIds, ...shuffled(distractorIds).slice(0, Math.max(0, towerIngredientChoiceCount - targetIngredientIds.length))]);
}

function createTowerMissingIngredientOptions(targetId: string, floor: TowerFloorDefinition, missingIngredientId: string): string[] {
  const targetIngredientIds = basicIdsForTowerTarget(targetId);
  const distractorIds = floor.requiredBasicIds.filter((id) => id !== missingIngredientId && !targetIngredientIds.includes(id));
  return shuffled([missingIngredientId, ...shuffled(distractorIds).slice(0, Math.max(0, towerIngredientChoiceCount - 1))]);
}

function createTowerDiscoveryOptions(targetId: string, floor: TowerFloorDefinition): string[] {
  const distractorIds = floor.answerIds.filter((id) => id !== targetId);
  return shuffled([targetId, ...shuffled(distractorIds).slice(0, Math.max(0, towerDiscoveryChoiceCount - 1))]);
}

const towerFloorTwoMeta: Record<string, { gateKey: string; directionKey: string; territoryKey: string }> = {
  boomy: {
    gateKey: "tower.gate.bass",
    directionKey: "tower.direction.boost",
    territoryKey: "tower.territory.boomy"
  },
  thin: {
    gateKey: "tower.gate.bass",
    directionKey: "tower.direction.cut",
    territoryKey: "tower.territory.thin"
  },
  honky: {
    gateKey: "tower.gate.mid",
    directionKey: "tower.direction.boost",
    territoryKey: "tower.territory.honky"
  },
  hollow: {
    gateKey: "tower.gate.mid",
    directionKey: "tower.direction.cut",
    territoryKey: "tower.territory.hollow"
  },
  bright: {
    gateKey: "tower.gate.treble",
    directionKey: "tower.direction.boost",
    territoryKey: "tower.territory.bright"
  },
  dull: {
    gateKey: "tower.gate.treble",
    directionKey: "tower.direction.cut",
    territoryKey: "tower.territory.dull"
  }
};

function createTowerTrial(floorId: TowerFloorId = "floor1", previousTargetId?: string): TowerTrial {
  const floor = towerFloorById.get(floorId) ?? towerFloorDefinitions[0];
  const candidates = floor.answerIds.filter((id) => id !== previousTargetId);
  const targetIds = candidates.length > 0 ? candidates : floor.answerIds;
  const targetId = targetIds[Math.floor(Math.random() * targetIds.length)];
  const targetIngredientIds = basicIdsForTowerTarget(targetId);
  const missingIngredientId =
    floor.mode === "missingIngredient" ? targetIngredientIds[Math.floor(Math.random() * targetIngredientIds.length)] ?? null : null;
  const optionIds =
    floor.mode === "ingredientRecipe"
      ? createTowerIngredientOptions(targetId, floor)
      : floor.mode === "missingIngredient" && missingIngredientId
        ? createTowerMissingIngredientOptions(targetId, floor, missingIngredientId)
        : floor.mode === "discoveryChoice"
          ? createTowerDiscoveryOptions(targetId, floor)
          : [...floor.answerIds];

  return {
    floorId: floor.id,
    targetId,
    selectedId: null,
    selectedIngredientIds: [],
    missingIngredientId,
    optionIds,
    previewed: false,
    submitted: false
  };
}

function basicIdsForTowerTarget(id: string): string[] {
  return discoveryById.has(id) ? expandDiscoveryToBasicIds(id) : [id];
}

function towerChallengeKey(floorId: TowerFloorId, metric: "attempts" | "correct" | "score") {
  return `tower.${floorId}.${metric}`;
}

function towerScoreFor(completedChallenges: Record<string, number>, floorId: TowerFloorId) {
  const storedScore = completedChallenges[towerChallengeKey(floorId, "score")];
  if (typeof storedScore === "number") return storedScore;
  return (completedChallenges[towerChallengeKey(floorId, "correct")] ?? 0) * towerCorrectScoreDelta;
}

function isTowerFloorUnlocked(floorId: TowerFloorId, completedChallenges: Record<string, number>) {
  const floorIndex = towerFloorDefinitions.findIndex((floor) => floor.id === floorId);
  if (floorIndex <= 0) return true;
  return towerFloorDefinitions
    .slice(0, floorIndex)
    .every((floor) => towerScoreFor(completedChallenges, floor.id) >= floor.promotionScore);
}

function stageProgress(totalIds: readonly string[], unlockedIds: ReadonlySet<string>): CurriculumStageProgress {
  const completed = totalIds.filter((id) => unlockedIds.has(id)).length;
  return {
    completed,
    total: totalIds.length,
    complete: completed === totalIds.length
  };
}

function curriculumProgress(
  learnedBasicIds: readonly string[],
  unlockedDiscoverySet: ReadonlySet<string>,
  unlockedAliasSet: ReadonlySet<string>
): CurriculumProgress {
  const learnedBasicSet = new Set(learnedBasicIds);
  const training = stageProgress(
    descriptorCatalog.map((card) => card.id),
    learnedBasicSet
  );
  const atlas = stageProgress(
    discoveryCards.map((card) => card.id),
    unlockedDiscoverySet
  );
  const lexicon = stageProgress(
    aliasVocabularyCards.map((card) => card.id),
    unlockedAliasSet
  );

  return {
    training,
    atlas,
    lexicon,
    towerUnlocked: training.complete && atlas.complete && lexicon.complete
  };
}

function nextCurriculumStep(progress: CurriculumProgress) {
  if (!progress.training.complete) return "orientation.training.title";
  if (!progress.atlas.complete) return "orientation.atlas.title";
  if (!progress.lexicon.complete) return "orientation.lexicon.title";
  return "orientation.tower.title";
}

function freshDefaultSave(): SaveDataV1 {
  return {
    ...defaultSaveData,
    unlockedDiscoveryIds: [],
    unlockedAliasIds: [],
    learnedBasicIds: [],
    completedChallenges: {},
    settings: { ...defaultSaveData.settings }
  };
}

function formatIntensityReadout(selectedIntensity: number, appliedIntensity: number | { min: number; max: number }): string {
  const selectedPercent = Math.round(selectedIntensity * 100);
  const appliedMinPercent = Math.round((typeof appliedIntensity === "number" ? appliedIntensity : appliedIntensity.min) * 100);
  const appliedMaxPercent = Math.round((typeof appliedIntensity === "number" ? appliedIntensity : appliedIntensity.max) * 100);

  if (selectedPercent === appliedMinPercent && selectedPercent === appliedMaxPercent) return `${selectedPercent}%`;
  if (appliedMinPercent === appliedMaxPercent) return `${selectedPercent}% -> ${appliedMinPercent}%`;
  return `${selectedPercent}% -> ${appliedMinPercent}-${appliedMaxPercent}%`;
}

export function App() {
  const [screen, setScreen] = useState<ScreenId>("building");
  const [selectedLearnModuleId, setSelectedLearnModuleId] = useState<DescriptorModuleId>("spectral");
  const [selectedGateId, setSelectedGateId] = useState<GateId>("bass");
  const [saveData, setSaveData] = useState<SaveDataV1>(() => loadSaveData());
  const [activeBasicIds, setActiveBasicIds] = useState<string[]>([]);
  const [activeDiscoveryId, setActiveDiscoveryId] = useState<string | null>(null);
  const [playbackMode, setPlaybackMode] = useState<PlaybackMode>("processed");
  const [selectedTrackId, setSelectedTrackId] = useState(() => preferredTrackForGate("bass").id);
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [spectralView, setSpectralView] = useState<"atlas" | "region">("atlas");
  const [audioReady, setAudioReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [notice, setNotice] = useState("status.saved");
  const [detailTarget, setDetailTarget] = useState<CardDetailTarget | null>(null);
  const [blindPreviewState, setBlindPreviewState] = useState<BlindPreviewState | null>(null);
  const [selectedTowerFloorId, setSelectedTowerFloorId] = useState<TowerFloorId>("floor1");
  const [towerTrial, setTowerTrial] = useState<TowerTrial>(() => createTowerTrial("floor1"));
  const [regionBlendAttempts, setRegionBlendAttempts] = useState<BlendAttempt[]>([]);
  const [regionBlendAttemptKeys, setRegionBlendAttemptKeys] = useState<string[]>([]);
  const [cardDetails, setCardDetails] = useState<Record<string, PlayerFacingIdentity>>({});
  const [aliasDetail, setAliasDetail] = useState<AliasVocabularyCard | null>(null);
  const engineRef = useRef<WebAudioEngine | null>(null);
  const preserveCollectionSandboxTransferRef = useRef(false);

  const t = useMemo(() => createTranslator(saveData.locale), [saveData.locale]);
  const selectedTrack = trackDefinitions.find((track) => track.id === selectedTrackId) ?? trackDefinitions[0];
  const moduleGates = gateDefinitions.filter((gate) => gate.moduleId === selectedLearnModuleId);
  const selectedGate = moduleGates.find((gate) => gate.id === selectedGateId) ?? moduleGates[0] ?? gateDefinitions[0];
  const learnedBasicSet = useMemo(() => new Set(saveData.learnedBasicIds), [saveData.learnedBasicIds]);
  const unlockedDiscoverySet = useMemo(() => new Set(saveData.unlockedDiscoveryIds), [saveData.unlockedDiscoveryIds]);
  const unlockedAliasSet = useMemo(() => new Set(saveData.unlockedAliasIds), [saveData.unlockedAliasIds]);
  const curriculum = useMemo(
    () => curriculumProgress(saveData.learnedBasicIds, unlockedDiscoverySet, unlockedAliasSet),
    [saveData.learnedBasicIds, unlockedAliasSet, unlockedDiscoverySet]
  );
  const moduleBasicsUnlocked = useMemo(
    () =>
      new Map<DescriptorModuleId, boolean>(
        moduleDefinitions.map((module) => [module.id, basicIdsForModule(module.id).every((id) => learnedBasicSet.has(id))])
      ),
    [learnedBasicSet]
  );
  const labIntensity = saveData.settings.intensity;
  const activeIntensity = screen === "sandbox" ? labIntensity : defaultSaveData.settings.intensity;
  const appliedIntensityRange = useMemo(
    () => effectiveIntensityRangeForActiveSpectralBuckets(activeBasicIds, activeIntensity),
    [activeBasicIds, activeIntensity]
  );
  const eqOutputIntensity = useMemo(() => headroomIntensityForActiveSpectralBuckets(activeBasicIds, activeIntensity), [activeBasicIds, activeIntensity]);
  const intensityReadout = formatIntensityReadout(activeIntensity, appliedIntensityRange);
  const effectiveFilters = useMemo(() => buildEffectiveFilters(activeBasicIds, activeIntensity, engineRef.current?.sampleRate), [activeBasicIds, activeIntensity]);
  const curvePoints = useMemo(() => buildCurvePoints(effectiveFilters), [effectiveFilters]);
  const hideBlindPreview = screen === "learn" && Boolean(blindPreviewState && !blindPreviewState.submitted);
  const hideTowerPreview = screen === "tower" && !towerTrial.selectedId;
  const hideAnswerPreview = hideBlindPreview || hideTowerPreview;
  const displayActiveBasicIds = hideAnswerPreview ? [] : activeBasicIds;
  const displayCurvePoints = hideAnswerPreview ? buildCurvePoints([]) : curvePoints;
  const isAtlasOnly = screen === "region" && spectralView === "atlas";
  const selectedAtlasRegion = regionDefinitions.find((region) => region.id === selectedRegionId);
  const selectedPlayableRegionContent = selectedRegionId ? playableRegionContent[selectedRegionId] : undefined;
  const selectedRegionBlendAttempts = regionBlendAttempts.filter((attempt) => attempt.regionId === selectedRegionId);
  const selectedRegionBlendAttemptKeys = regionBlendAttemptKeys.filter((key) => key.startsWith(`${selectedRegionId}:`));
  const showRegionForge =
    screen === "region" &&
    spectralView === "region" &&
    Boolean(selectedAtlasRegion && moduleBasicsUnlocked.get(selectedAtlasRegion.moduleId)) &&
    Boolean(selectedPlayableRegionContent?.discoveryIds.length);
  const selectedTowerFloor = towerFloorById.get(selectedTowerFloorId) ?? towerFloorDefinitions[0];
  const selectedTowerFloorReady = selectedTowerFloor.requiredBasicIds.every((id) => learnedBasicSet.has(id));
  const hideSideRail = isAtlasOnly || screen === "building" || screen === "orientation" || screen === "languageHall" || screen === "collection";
  const fallbackVisualizerModuleId: DescriptorModuleId =
    screen === "region" ? selectedAtlasRegion?.moduleId ?? "spectral" : screen === "tower" ? "spectral" : selectedLearnModuleId;
  const visualizerModuleId = activeVisualizerModule(displayActiveBasicIds, fallbackVisualizerModuleId);
  const currentPlaceKey = useMemo(() => {
    if (screen === "learn") return `learn:${selectedLearnModuleId}:${selectedGateId}`;
    if (screen === "tower") return `tower:${selectedTowerFloorId}`;
    if (screen === "region") return `region:${spectralView}:${selectedRegionId ?? "atlas"}`;
    return screen;
  }, [screen, selectedGateId, selectedLearnModuleId, selectedRegionId, selectedTowerFloorId, spectralView]);
  const previousPlaceKeyRef = useRef<string | null>(null);

  const selectLearnModule = (moduleId: DescriptorModuleId) => {
    setSelectedLearnModuleId(moduleId);
    setActiveBasicIds([]);
    setActiveDiscoveryId(null);
    setBlindPreviewState(null);
    const firstGate = gateDefinitions.find((gate) => gate.moduleId === moduleId);
    if (firstGate) {
      setSelectedGateId(firstGate.id);
      setSelectedTrackId(preferredTrackForGate(firstGate.id).id);
    }
  };

  const selectLearnGate = (gateId: GateId) => {
    setSelectedGateId(gateId);
    setSelectedTrackId(preferredTrackForGate(gateId).id);
    setActiveBasicIds([]);
    setActiveDiscoveryId(null);
    setBlindPreviewState(null);
  };

  const selectTowerFloor = (floorId: TowerFloorId) => {
    if (!isTowerFloorUnlocked(floorId, saveData.completedChallenges)) {
      setNotice("tower.locked.progress");
      return;
    }
    setSelectedTowerFloorId(floorId);
    setActiveBasicIds([]);
    setActiveDiscoveryId(null);
    setBlindPreviewState(null);
    setTowerTrial(createTowerTrial(floorId));
  };

  const enterTrainingGrounds = () => {
    setSelectedLearnModuleId("spectral");
    setSelectedGateId("bass");
    setSelectedTrackId(preferredTrackForGate("bass").id);
    setActiveBasicIds([]);
    setActiveDiscoveryId(null);
    setBlindPreviewState(null);
    setScreen("learn");
  };

  const enterCalibrationTower = () => {
    if (!curriculum.towerUnlocked) {
      setNotice("orientation.tower.lockedNotice");
      return;
    }
    setSelectedTrackId("daily-acoustic-pop-loop");
    setActiveBasicIds([]);
    setActiveDiscoveryId(null);
    setBlindPreviewState(null);
    setTowerTrial((current) =>
      current.floorId !== selectedTowerFloorId || towerTrialSubmitted(current) ? createTowerTrial(selectedTowerFloorId, current.targetId) : current
    );
    setPlaybackMode("processed");
    setScreen("tower");
  };

  const enterLanguageHall = () => {
    if (!curriculum.atlas.complete) {
      setNotice("orientation.lexicon.lockedNotice");
      return;
    }
    setScreen("languageHall");
  };

  const returnToCampus = () => {
    setBlindPreviewState(null);
    setScreen("building");
  };

  useEffect(() => {
    storeSaveData(saveData);
  }, [saveData]);

  useEffect(() => {
    const previousPlaceKey = previousPlaceKeyRef.current;
    previousPlaceKeyRef.current = currentPlaceKey;
    if (previousPlaceKey === null || previousPlaceKey === currentPlaceKey) return;

    const preserveCollectionSandboxTransfer =
      preserveCollectionSandboxTransferRef.current && previousPlaceKey === "collection" && currentPlaceKey === "sandbox";
    preserveCollectionSandboxTransferRef.current = false;
    if (preserveCollectionSandboxTransfer) return;

    engineRef.current?.pause();
    engineRef.current?.clearEq();
    setPlaying(false);
    setActiveBasicIds([]);
    setActiveDiscoveryId(null);
    setBlindPreviewState(null);
  }, [currentPlaceKey]);

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
    engineRef.current?.setAudioProfiles(activeBasicIds, activeIntensity);
    engineRef.current?.setEqFilters(effectiveFilters, eqOutputIntensity);
    engineRef.current?.setPlaybackMode(playbackMode);
  }, [activeBasicIds, activeIntensity, effectiveFilters, eqOutputIntensity, playbackMode]);

  useEffect(() => {
    if (screen !== "learn") return;
    if (activeDiscoveryId) {
      setActiveDiscoveryId(null);
    }
    if (activeBasicIds.length > 1) {
      setActiveBasicIds([activeBasicIds[0]]);
    }
  }, [activeBasicIds, activeDiscoveryId, screen]);

  useEffect(() => {
    if (screen !== "sandbox") return;
    if (activeDiscoveryId) {
      setActiveDiscoveryId(null);
    }
  }, [activeDiscoveryId, screen]);

  const updateSave = (updater: (current: SaveDataV1) => SaveDataV1) => setSaveData((current) => updater(current));

  const recordBlendAttempt = (attempt: BlendAttempt) => {
    setRegionBlendAttempts((current) =>
      [attempt, ...current.filter((item) => item.regionId !== attempt.regionId || item.blendKey !== attempt.blendKey)].slice(0, 12)
    );
    const regionBlendKey = `${attempt.regionId}:${attempt.blendKey}`;
    setRegionBlendAttemptKeys((current) => (current.includes(regionBlendKey) ? current : [...current, regionBlendKey]));
  };

  const tryRegionBlend = () => {
    const regionId = selectedRegionId && playableRegionContent[selectedRegionId] ? selectedRegionId : "a";
    const result = evaluateDiscoveryBlend(activeBasicIds, saveData.unlockedDiscoveryIds);
    const discoveryId = result.discovery?.id;
    recordBlendAttempt({
      id: `${Date.now()}-${result.blendKey}`,
      regionId,
      blendKey: result.blendKey,
      ids: result.activeIds,
      status: result.status,
      discoveryId
    });

    if (result.status === "unlocked" && result.discovery) {
      const discovery = result.discovery;
      updateSave((current) => ({
        ...current,
        unlockedDiscoveryIds: [...new Set([...current.unlockedDiscoveryIds, discovery.id])]
      }));
      setActiveDiscoveryId(discovery.id);
      setNotice(discovery.textKeys.label);
      return;
    }

    if (result.status === "known" && result.discovery) {
      setActiveDiscoveryId(result.discovery.id);
      setNotice(result.discovery.textKeys.label);
      return;
    }

    setActiveDiscoveryId(null);
    setNotice(result.status === "empty" ? "craft.empty" : "status.tryAgain");
  };

  const learnBasics = (ids: string[], challengeId: string) => {
    updateSave((current) => ({
      ...current,
      learnedBasicIds: [...new Set([...current.learnedBasicIds, ...ids])],
      completedChallenges: {
        ...current.completedChallenges,
        [challengeId]: (current.completedChallenges[challengeId] ?? 0) + 1
      }
    }));
    setBlindPreviewState(null);
    setActiveDiscoveryId(null);
    setActiveBasicIds(ids.slice(0, 1));
    setPlaybackMode("processed");
    setNotice("status.saved");
  };

  const handleChallengeChoice = (gate: GateDefinition, targetId: string, choiceId: string) => {
    setBlindPreviewState(null);
    setActiveDiscoveryId(null);
    setActiveBasicIds([choiceId]);
    setPlaybackMode("processed");
    if (choiceId === targetId) {
      learnBasics([targetId], `${gate.id}.${targetId}`);
      return;
    }
    setNotice("status.tryAgain");
  };

  const previewBlindChallengeChoice = (gate: GateDefinition, targetId: string, option: ListeningTrialOption) => {
    setBlindPreviewState({
      gateId: gate.id,
      targetId,
      optionLabel: option.label,
      submitted: false
    });
    setActiveDiscoveryId(null);
    setActiveBasicIds([option.descriptorId]);
    setPlaybackMode("processed");
    void engineRef.current?.play().then(() => {
      setAudioReady(true);
      setPlaying(true);
    });
  };

  const submitBlindChallengeChoice = (gate: GateDefinition, targetId: string, option: ListeningTrialOption) => {
    setBlindPreviewState({
      gateId: gate.id,
      targetId,
      optionLabel: option.label,
      submitted: true
    });
    setActiveDiscoveryId(null);
    setActiveBasicIds([option.descriptorId]);
    setPlaybackMode("processed");
    if (option.descriptorId === targetId) {
      learnBasics([targetId], `${gate.id}.${targetId}`);
      return;
    }
    setNotice("status.tryAgain");
  };

  const playTowerHiddenSound = async () => {
    setBlindPreviewState(null);
    setActiveDiscoveryId(null);
    setActiveBasicIds(basicIdsForTowerTarget(towerTrial.targetId));
    setPlaybackMode("processed");
    setTowerTrial((current) => ({ ...current, previewed: true }));
    await engineRef.current?.play();
    setAudioReady(true);
    setPlaying(true);
  };

  const recordTowerResult = (floorId: TowerFloorId, scoreDelta: number) => {
    const attemptsKey = towerChallengeKey(floorId, "attempts");
    const correctKey = towerChallengeKey(floorId, "correct");
    const scoreKey = towerChallengeKey(floorId, "score");
    const floor = towerFloorById.get(floorId) ?? towerFloorDefinitions[0];
    const previousScore = towerScoreFor(saveData.completedChallenges, floorId);
    const nextScore = Math.max(0, previousScore + scoreDelta);
    const promoted = previousScore < floor.promotionScore && nextScore >= floor.promotionScore;
    const correct = scoreDelta === towerCorrectScoreDelta;
    updateSave((current) => ({
      ...current,
      completedChallenges: {
        ...current.completedChallenges,
        [attemptsKey]: (current.completedChallenges[attemptsKey] ?? 0) + 1,
        [correctKey]: (current.completedChallenges[correctKey] ?? 0) + (correct ? 1 : 0),
        [scoreKey]: Math.max(0, towerScoreFor(current.completedChallenges, floorId) + scoreDelta)
      }
    }));
    setNotice(promoted ? "tower.feedback.promoted" : towerFeedbackKeyForScoreDelta(scoreDelta));
  };

  const chooseTowerAnswer = (id: string) => {
    if (towerTrialSubmitted(towerTrial) || !towerTrial.previewed) return;
    const floor = towerFloorById.get(towerTrial.floorId) ?? towerFloorDefinitions[0];

    if (floor.mode === "ingredientRecipe") {
      if (!towerTrial.optionIds.includes(id)) return;
      const ingredientAnswerCount = floor.ingredientAnswerCount ?? basicIdsForTowerTarget(towerTrial.targetId).length;
      const selectedIngredientIds = towerTrial.selectedIngredientIds.includes(id)
        ? towerTrial.selectedIngredientIds.filter((ingredientId) => ingredientId !== id)
        : [...towerTrial.selectedIngredientIds, id];

      if (selectedIngredientIds.length > ingredientAnswerCount) return;

      if (selectedIngredientIds.length < ingredientAnswerCount) {
        setTowerTrial((current) => ({ ...current, selectedIngredientIds }));
        return;
      }

      const scoreDelta = towerIngredientScoreDelta(selectedIngredientIds, basicIdsForTowerTarget(towerTrial.targetId));
      setBlindPreviewState(null);
      setActiveDiscoveryId(towerTrial.targetId);
      setActiveBasicIds(basicIdsForTowerTarget(towerTrial.targetId));
      setPlaybackMode("processed");
      setTowerTrial((current) => ({ ...current, selectedIngredientIds, submitted: true }));
      recordTowerResult(towerTrial.floorId, scoreDelta);
      return;
    }

    if (floor.mode === "missingIngredient") {
      if (!towerTrial.optionIds.includes(id)) return;
      const scoreDelta = towerMissingIngredientScoreDelta(id, towerTrial.missingIngredientId);
      setBlindPreviewState(null);
      setActiveDiscoveryId(towerTrial.targetId);
      setActiveBasicIds(basicIdsForTowerTarget(towerTrial.targetId));
      setPlaybackMode("processed");
      setTowerTrial((current) => ({ ...current, selectedId: id, submitted: true }));
      recordTowerResult(towerTrial.floorId, scoreDelta);
      return;
    }

    if (floor.mode === "discoveryChoice") {
      if (!towerTrial.optionIds.includes(id)) return;
      const scoreDelta = towerDiscoveryChoiceScoreDelta(id, towerTrial.targetId);
      setBlindPreviewState(null);
      setActiveDiscoveryId(discoveryById.has(towerTrial.targetId) ? towerTrial.targetId : null);
      setActiveBasicIds(basicIdsForTowerTarget(towerTrial.targetId));
      setPlaybackMode("processed");
      setTowerTrial((current) => ({ ...current, selectedId: id, submitted: true }));
      recordTowerResult(towerTrial.floorId, scoreDelta);
      return;
    }

    setBlindPreviewState(null);
    setActiveDiscoveryId(discoveryById.has(towerTrial.targetId) ? towerTrial.targetId : null);
    setActiveBasicIds(basicIdsForTowerTarget(towerTrial.targetId));
    setPlaybackMode("processed");
    setTowerTrial((current) => ({ ...current, selectedId: id, submitted: true }));
    const correct = id === towerTrial.targetId;
    recordTowerResult(towerTrial.floorId, correct ? towerCorrectScoreDelta : towerWrongScoreDelta);
  };

  const startNextTowerTrial = async () => {
    const nextTrial = createTowerTrial(selectedTowerFloorId, towerTrial.floorId === selectedTowerFloorId ? towerTrial.targetId : undefined);
    setBlindPreviewState(null);
    setActiveDiscoveryId(null);
    setActiveBasicIds(basicIdsForTowerTarget(nextTrial.targetId));
    setPlaybackMode("processed");
    setTowerTrial({ ...nextTrial, previewed: true });
    await engineRef.current?.play();
    setAudioReady(true);
    setPlaying(true);
    setNotice("tower.nextSoundStarted");
  };

  const handleToggleBasic = (id: string) => {
    const descriptor = descriptorById.get(id);
    if (!descriptor) return;
    const previous = activeBasicIds.filter((activeId) => descriptorById.get(activeId)?.moduleId === descriptor.moduleId);
    const next = toggleBasicCard(previous, id);
    const removed = describeRemovedCards(previous, next);
    setBlindPreviewState(null);
    setActiveDiscoveryId(null);
    setActiveBasicIds(next);
    setPlaybackMode("processed");
    setNotice(removed.length > 0 ? removed.map((removedId) => descriptorById.get(removedId)?.textKeys.label ?? removedId).join(", ") : "status.saved");
  };

  const handleLearnToggleBasic = (id: string) => {
    if (!descriptorById.has(id)) return;
    setBlindPreviewState(null);
    setActiveDiscoveryId(null);
    setActiveBasicIds(activeBasicIds.length === 1 && activeBasicIds[0] === id ? [] : [id]);
    setPlaybackMode("processed");
    setNotice("status.saved");
  };

  const handleSandboxToggleBasic = (id: string) => {
    if (!descriptorById.has(id)) return;
    setBlindPreviewState(null);
    setActiveDiscoveryId(null);
    if (!activeBasicIds.includes(id) && activeBasicIds.length >= maxEqBands) {
      setNotice("sandbox.maxTestCards");
      return;
    }
    setActiveBasicIds(activeBasicIds.includes(id) ? activeBasicIds.filter((activeId) => activeId !== id) : [...activeBasicIds, id]);
    setPlaybackMode("processed");
    setNotice("status.saved");
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
    if (activeDiscoveryId === id) {
      setBlindPreviewState(null);
      setActiveBasicIds([]);
      setActiveDiscoveryId(null);
      setPlaybackMode("processed");
      setNotice("status.saved");
      return;
    }

    const ingredientIds = expandDiscoveryToBasicIds(id);
    setBlindPreviewState(null);
    setActiveBasicIds(ingredientIds);
    setActiveDiscoveryId(id);
    setPlaybackMode("processed");
    setNotice("status.saved");
  };

  const useInspectedDescriptor = (id: string) => {
    if (screen === "learn") {
      handleLearnToggleBasic(id);
    } else if (screen === "sandbox") {
      handleSandboxToggleBasic(id);
    } else if (screen === "collection") {
      preserveCollectionSandboxTransferRef.current = true;
      setScreen("sandbox");
      handleSandboxToggleBasic(id);
    } else {
      handleToggleBasic(id);
    }
    setDetailTarget(null);
  };

  const useInspectedDiscovery = (id: string) => {
    if (screen === "collection") {
      preserveCollectionSandboxTransferRef.current = true;
      setScreen("sandbox");
      setBlindPreviewState(null);
      setActiveBasicIds(expandDiscoveryToBasicIds(id));
      setActiveDiscoveryId(null);
      setPlaybackMode("processed");
      setNotice("status.saved");
      setDetailTarget(null);
      return;
    }
    playDiscovery(id);
    setDetailTarget(null);
  };

  const unlockAlias = (id: string) => {
    updateSave((current) => ({
      ...current,
      unlockedAliasIds: [...new Set([...current.unlockedAliasIds, id])],
      completedChallenges: {
        ...current.completedChallenges,
        [`languageHall.${id}`]: (current.completedChallenges[`languageHall.${id}`] ?? 0) + 1
      }
    }));
    setNotice("status.saved");
  };

  const startAudio = async () => {
    await engineRef.current?.play();
    setAudioReady(true);
    setPlaying(true);
  };

  const pauseAudio = () => {
    engineRef.current?.pause();
    setPlaying(false);
  };

  const togglePlay = async () => {
    if (!engineRef.current?.isReady) {
      await startAudio();
      return;
    }
    if (engineRef.current.isPlaying) {
      pauseAudio();
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
        intensity: value
      }
    }));
  };

  const resetProgress = () => {
    clearSaveData();
    setSaveData(freshDefaultSave());
    setActiveBasicIds([]);
    setActiveDiscoveryId(null);
    setBlindPreviewState(null);
    setSelectedTowerFloorId("floor1");
    setTowerTrial(createTowerTrial("floor1"));
    setRegionBlendAttempts([]);
    setRegionBlendAttemptKeys([]);
    setNotice("status.saved");
  };

  const unlockAllBasics = () => {
    updateSave((current) => ({
      ...current,
      learnedBasicIds: allBasicIds,
      completedChallenges: {
        ...current.completedChallenges,
        "dev.unlockAllBasics": (current.completedChallenges["dev.unlockAllBasics"] ?? 0) + 1
      }
    }));
    setNotice("status.saved");
  };

  const unlockAllDiscoveries = () => {
    updateSave((current) => ({
      ...current,
      unlockedDiscoveryIds: discoveryCards.map((card) => card.id),
      completedChallenges: {
        ...current.completedChallenges,
        "dev.unlockAllDiscoveries": (current.completedChallenges["dev.unlockAllDiscoveries"] ?? 0) + 1
      }
    }));
    setNotice("status.saved");
  };

  const unlockAllAliases = () => {
    updateSave((current) => ({
      ...current,
      unlockedAliasIds: aliasVocabularyCards.map((card) => card.id),
      completedChallenges: {
        ...current.completedChallenges,
        "dev.unlockAllAliases": (current.completedChallenges["dev.unlockAllAliases"] ?? 0) + 1
      }
    }));
    setNotice("status.saved");
  };

  const clearActiveSound = () => {
    setActiveBasicIds([]);
    setActiveDiscoveryId(null);
    setBlindPreviewState(null);
    setNotice("status.saved");
  };

  const navItems = [
    { id: "building" as const, label: t("nav.building"), icon: Building2 },
    { id: "region" as const, label: t("nav.region"), icon: MapIcon },
    { id: "collection" as const, label: t("nav.collection"), icon: Boxes },
    { id: "settings" as const, label: t("nav.settings"), icon: Settings }
  ];

  return (
    <div className={`app-shell ${hideSideRail ? "is-single-column" : ""}`}>
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
                className={screen === item.id || (item.id === "building" && (screen === "orientation" || screen === "learn" || screen === "tower" || screen === "sandbox" || screen === "languageHall")) ? "is-active" : ""}
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

      <main className="main-grid">
        <section className="primary-stage">
          {screen === "learn" ? (
            <LearnScreen
              selectedGate={selectedGate}
              selectedGateId={selectedGateId}
              setSelectedGateId={selectLearnGate}
              selectedModuleId={selectedLearnModuleId}
              setSelectedModuleId={selectLearnModule}
              moduleGates={moduleGates}
              learnedBasicSet={learnedBasicSet}
              activeBasicIds={displayActiveBasicIds}
              playing={playing}
              blindPreviewState={blindPreviewState}
              t={t}
              learnBasics={learnBasics}
              handleChallengeChoice={handleChallengeChoice}
              previewBlindChallengeChoice={previewBlindChallengeChoice}
              pauseBlindPreview={pauseAudio}
              submitBlindChallengeChoice={submitBlindChallengeChoice}
              handleToggleBasic={handleLearnToggleBasic}
              inspectDescriptor={inspectDescriptor}
              backToCampus={returnToCampus}
            />
          ) : null}

          {screen === "tower" ? (
            <CalibrationTowerScreen
              trial={towerTrial}
              selectedFloorId={selectedTowerFloorId}
              learnedBasicSet={learnedBasicSet}
              completedChallenges={saveData.completedChallenges}
              t={t}
              onSelectFloor={selectTowerFloor}
              onChooseAnswer={chooseTowerAnswer}
              backToCampus={returnToCampus}
              enterLearn={enterTrainingGrounds}
            />
          ) : null}

          {screen === "region" ? (
            <RegionScreen
              moduleBasicsUnlocked={moduleBasicsUnlocked}
              learnedBasicIds={saveData.learnedBasicIds}
              activeBasicIds={activeBasicIds}
              activeDiscoveryId={activeDiscoveryId}
              unlockedDiscoverySet={unlockedDiscoverySet}
              selectedRegionId={selectedRegionId}
              spectralView={spectralView}
              enterRegion={(id) => {
                const region = regionDefinitions.find((candidate) => candidate.id === id);
                const canEnter = Boolean(region && region.playable && moduleBasicsUnlocked.get(region.moduleId));
                setSelectedRegionId(id);
                setSpectralView(canEnter ? "region" : "atlas");
                if (canEnter && id !== selectedRegionId) {
                  setActiveBasicIds([]);
                  setActiveDiscoveryId(null);
                }
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
              unlockedAliasSet={unlockedAliasSet}
              unlockedDiscoverySet={unlockedDiscoverySet}
              t={t}
              inspectAlias={setAliasDetail}
              inspectDescriptor={inspectDescriptor}
              inspectDiscovery={inspectDiscovery}
              unlockAllBasics={unlockAllBasics}
              unlockAllDiscoveries={unlockAllDiscoveries}
              unlockAllAliases={unlockAllAliases}
              resetProgress={resetProgress}
            />
          ) : null}

          {screen === "building" ? (
            <BuildingScreen
              learnedBasicIds={saveData.learnedBasicIds}
              unlockedAliasSet={unlockedAliasSet}
              unlockedDiscoverySet={unlockedDiscoverySet}
              completedChallenges={saveData.completedChallenges}
              t={t}
              enterOrientation={() => setScreen("orientation")}
              enterLearn={enterTrainingGrounds}
              enterTower={enterCalibrationTower}
              enterLanguageHall={enterLanguageHall}
              enterLaboratory={() => setScreen("sandbox")}
            />
          ) : null}

          {screen === "orientation" ? (
            <OrientationCenterScreen
              learnedBasicIds={saveData.learnedBasicIds}
              unlockedDiscoverySet={unlockedDiscoverySet}
              unlockedAliasSet={unlockedAliasSet}
              t={t}
              enterLearn={enterTrainingGrounds}
              enterTower={enterCalibrationTower}
              enterLanguageHall={enterLanguageHall}
              enterLaboratory={() => setScreen("sandbox")}
              enterAtlas={() => {
                setScreen("region");
                setSpectralView("atlas");
              }}
              enterCollection={() => setScreen("collection")}
              backToCampus={returnToCampus}
            />
          ) : null}

          {screen === "languageHall" ? (
            <LanguageHallScreen
              learnedBasicSet={learnedBasicSet}
              unlockedDiscoverySet={unlockedDiscoverySet}
              unlockedAliasSet={unlockedAliasSet}
              t={t}
              onUnlockAlias={unlockAlias}
              backToCampus={returnToCampus}
            />
          ) : null}

          {screen === "sandbox" ? (
            <SandboxScreen
              learnedBasicIds={saveData.learnedBasicIds}
              activeBasicIds={activeBasicIds}
              t={t}
              handleToggleBasic={handleSandboxToggleBasic}
              inspectDescriptor={inspectDescriptor}
              backToCampus={returnToCampus}
            />
          ) : null}

          {screen === "settings" ? (
            <SettingsScreen
              saveData={saveData}
              setLocale={(locale) => updateSave((current) => ({ ...current, locale }))}
              resetProgress={resetProgress}
              t={t}
            />
          ) : null}
        </section>

        {!hideSideRail ? (
        <aside className="side-rail">
          {screen === "sandbox" ? (
            <SandboxActiveExperiment activeBasicIds={activeBasicIds} activeDiscoveryId={activeDiscoveryId} t={t} />
          ) : null}

          <section className="tool-surface">
            <div className="section-heading">
              <h2>{t("section.audioControls")}</h2>
              <p>{audioReady ? t("status.audioReady") : t("action.startAudio")}</p>
            </div>
            <PlaybackControls
              audioReady={audioReady}
              playing={playing}
              playbackMode={playbackMode}
              selectedTrackId={selectedTrackId}
              tracks={trackDefinitions}
              intensity={labIntensity}
              primaryActionSlot={
                screen === "tower" ? (
                  <TowerAudioActions
                    trial={towerTrial}
                    ready={selectedTowerFloorReady}
                    playing={playing}
                    t={t}
                    onPlayHiddenSound={playTowerHiddenSound}
                    onNextTrial={startNextTowerTrial}
                    onPauseAudio={pauseAudio}
                  />
                ) : undefined
              }
              showIntensityControl={screen === "sandbox"}
              showClearButton={screen !== "tower"}
              onStart={startAudio}
              onTogglePlay={togglePlay}
              onPlaybackMode={setPlaybackMode}
              onTrackChange={setSelectedTrackId}
              onIntensityChange={setCurrentIntensity}
              onClear={clearActiveSound}
              t={t}
            />
          </section>

          {screen === "sandbox" ? (
            <SandboxVisualizerTiles activeDescriptorIds={displayActiveBasicIds} curvePoints={displayCurvePoints} intensityReadout={intensityReadout} t={t} />
          ) : (
            <section className="tool-surface">
              <div className="section-heading">
                <h2>{t(moduleVisualizerLabelKey(visualizerModuleId))}</h2>
                <p>{intensityReadout}</p>
              </div>
              <ModuleVisualizer activeDescriptorIds={displayActiveBasicIds} fallbackModuleId={fallbackVisualizerModuleId} curvePoints={displayCurvePoints} />
            </section>
          )}

          {screen === "tower" ? (
            <TowerProgressPanel
              floor={selectedTowerFloor}
              trial={towerTrial}
              completedChallenges={saveData.completedChallenges}
              t={t}
            />
          ) : null}

          {showRegionForge ? (
            <RegionCraftingPanel
              activeBasicIds={activeBasicIds}
              blendAttempts={selectedRegionBlendAttempts}
              uniqueBlendCount={selectedRegionBlendAttemptKeys.length}
              t={t}
              onTryBlend={tryRegionBlend}
            />
          ) : null}
        </aside>
        ) : null}
      </main>

      <CardDetailModal
        target={detailTarget}
        t={t}
        onClose={() => setDetailTarget(null)}
        onInspectDescriptor={inspectDescriptor}
        onInspectDiscovery={inspectDiscovery}
        onInspectAlias={(alias) => {
          setDetailTarget(null);
          setAliasDetail(alias);
        }}
        onUseDescriptor={useInspectedDescriptor}
        onUseDiscovery={useInspectedDiscovery}
        unlockedDiscoverySet={unlockedDiscoverySet}
        useActionLabel={screen === "collection" ? t("action.useInSandbox") : undefined}
        detail={detailTarget ? cardDetails[detailTarget.card.id] ?? cardDetails[normalizeDetailId(detailTarget.card.id)] : undefined}
      />
      <AliasDetailModal
        alias={aliasDetail}
        t={t}
        onClose={() => setAliasDetail(null)}
        onInspectDescriptor={(id) => {
          setAliasDetail(null);
          inspectDescriptor(id);
        }}
        onInspectDiscovery={(id) => {
          setAliasDetail(null);
          inspectDiscovery(id);
        }}
      />
    </div>
  );
}

type LearnProps = {
  selectedGate: GateDefinition;
  selectedGateId: GateId;
  setSelectedGateId: (id: GateId) => void;
  selectedModuleId: DescriptorModuleId;
  setSelectedModuleId: (id: DescriptorModuleId) => void;
  moduleGates: GateDefinition[];
  learnedBasicSet: Set<string>;
  activeBasicIds: string[];
  playing: boolean;
  blindPreviewState: BlindPreviewState | null;
  t: (key: string) => string;
  learnBasics: (ids: string[], challengeId: string) => void;
  handleChallengeChoice: (gate: GateDefinition, targetId: string, choiceId: string) => void;
  previewBlindChallengeChoice: (gate: GateDefinition, targetId: string, option: ListeningTrialOption) => void;
  pauseBlindPreview: () => void;
  submitBlindChallengeChoice: (gate: GateDefinition, targetId: string, option: ListeningTrialOption) => void;
  handleToggleBasic: (id: string) => void;
  inspectDescriptor: (id: string) => void;
  backToCampus: () => void;
};

function LearnScreen({
  selectedGate,
  selectedGateId,
  setSelectedGateId,
  selectedModuleId,
  setSelectedModuleId,
  moduleGates,
  learnedBasicSet,
  activeBasicIds,
  playing,
  blindPreviewState,
  t,
  learnBasics,
  handleChallengeChoice,
  previewBlindChallengeChoice,
  pauseBlindPreview,
  submitBlindChallengeChoice,
  handleToggleBasic,
  inspectDescriptor,
  backToCampus
}: LearnProps) {
  const gateCards = [...selectedGate.giftCards, selectedGate.firstCatch, ...selectedGate.laterUnlocks]
    .map((id) => descriptorById.get(id))
    .filter((card): card is DescriptorCardType => Boolean(card));
  const trialTargetIds = [selectedGate.firstCatch, ...selectedGate.laterUnlocks];
  const giftsClaimed = selectedGate.giftCards.every((id) => learnedBasicSet.has(id));
  const firstCatchUnlocked = learnedBasicSet.has(selectedGate.firstCatch);
  const laterTrialsComplete = selectedGate.laterUnlocks.every((id) => learnedBasicSet.has(id));
  const gateComplete = gateCards.length > 0 && gateCards.every((card) => learnedBasicSet.has(card.id));
  const trainingStatus = gateComplete
    ? t("training.status.complete")
    : !giftsClaimed
      ? `${t("training.status.next")} ${t("section.gifts")}`
      : !firstCatchUnlocked
        ? `${t("training.status.next")} ${t("section.firstCatch")}`
        : `${t("training.status.next")} ${t("section.laterUnlocks")}`;

  return (
    <div className="screen-flow">
      <section className="training-ground-hero">
        <div className="training-hero-art">
          <img src="/icons/buildings/training-grounds.png" alt={t("building.learnHall.alt")} loading="lazy" />
        </div>
        <div className="training-hero-copy">
          <span className="training-kicker">{t("training.heading")}</span>
          <h2>{t(selectedGate.labelKey)}</h2>
          <span className={`training-status-chip ${gateComplete ? "is-complete" : ""}`}>{trainingStatus}</span>
        </div>
        <button className="text-button training-back-button" type="button" onClick={backToCampus}>
          <ArrowLeft aria-hidden="true" />
          {t("action.backToCampus")}
        </button>
      </section>

      <section className="tool-surface training-switchboard">
        <div className="section-heading">
          <h2>{t("training.lanes")}</h2>
        </div>
        <div className="module-tabs">
          {moduleDefinitions.map((module) => (
            <button key={module.id} className={selectedModuleId === module.id ? "is-active" : ""} type="button" onClick={() => setSelectedModuleId(module.id)}>
              <span>{t(module.labelKey)}</span>
            </button>
          ))}
        </div>

        <div className="gate-tabs">
          {moduleGates.map((gate) => (
            <button key={gate.id} className={selectedGateId === gate.id ? "is-active" : ""} type="button" onClick={() => setSelectedGateId(gate.id)}>
              <span>{t(gate.labelKey)}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="tool-surface">
        <div className="section-heading">
          <h2>{t("section.gifts")}</h2>
        </div>

        <div className="gift-pair-layout">
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
          <div className="gift-pair-copy">
            <p className="gate-opening-line">{t(`gate.${selectedGate.id}.openingLine`)}</p>
            <p>{t(`giftPair.${selectedGate.id}.explanation`)}</p>
            {!giftsClaimed ? (
              <button className="text-button gift-claim-button" type="button" onClick={() => learnBasics(selectedGate.giftCards, `${selectedGate.id}.gifts`)}>
                {t("action.claimGift")}
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <section className="tool-surface">
        <div className="section-heading">
          <h2>{t("section.laterUnlocks")}</h2>
        </div>
        <div className="challenge-grid">
          {trialTargetIds.map((targetId) => (
            <ChallengeBlock
              key={targetId}
              gate={selectedGate}
              targetId={targetId}
              learnedBasicSet={learnedBasicSet}
              activeBasicIds={activeBasicIds}
              playing={playing}
              blindPreviewState={blindPreviewState}
              t={t}
              onChoice={handleChallengeChoice}
              onPreviewBlindChoice={previewBlindChallengeChoice}
              onPauseBlindPreview={pauseBlindPreview}
              onSubmitBlindChoice={submitBlindChallengeChoice}
              onToggleBasic={handleToggleBasic}
              onInspectDescriptor={inspectDescriptor}
            />
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
  activeBasicIds: string[];
  playing: boolean;
  blindPreviewState: BlindPreviewState | null;
  title?: string;
  t: (key: string) => string;
  onChoice: (gate: GateDefinition, targetId: string, choiceId: string) => void;
  onPreviewBlindChoice: (gate: GateDefinition, targetId: string, option: ListeningTrialOption) => void;
  onPauseBlindPreview: () => void;
  onSubmitBlindChoice: (gate: GateDefinition, targetId: string, option: ListeningTrialOption) => void;
  onToggleBasic: (id: string) => void;
  onInspectDescriptor: (id: string) => void;
};

function ChallengeBlock({
  gate,
  targetId,
  learnedBasicSet,
  activeBasicIds,
  playing,
  blindPreviewState,
  title,
  t,
  onChoice,
  onPreviewBlindChoice,
  onPauseBlindPreview,
  onSubmitBlindChoice,
  onToggleBasic,
  onInspectDescriptor
}: ChallengeProps) {
  const listeningDefinition = listeningChallengeFor(gate.id, targetId);

  if (listeningDefinition) {
    return (
      <BlindListeningChallengeBlock
        gate={gate}
        targetId={targetId}
        learnedBasicSet={learnedBasicSet}
        activeBasicIds={activeBasicIds}
        playing={playing}
        blindPreviewState={blindPreviewState}
        title={title}
        t={t}
        onPreview={onPreviewBlindChoice}
        onPausePreview={onPauseBlindPreview}
        onSubmit={onSubmitBlindChoice}
        onToggleBasic={onToggleBasic}
        onInspectDescriptor={onInspectDescriptor}
      />
    );
  }

  const target = descriptorById.get(targetId)!;
  const isUnlocked = learnedBasicSet.has(targetId);
  const challengeAnchors = gate.challengeAnchors?.[targetId] ?? gate.anchors;
  const choices = [...new Set([targetId, ...challengeAnchors])].filter((id) => descriptorById.has(id));

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

function BlindListeningChallengeBlock({
  gate,
  targetId,
  learnedBasicSet,
  activeBasicIds,
  playing,
  blindPreviewState,
  title,
  t,
  onPreview,
  onPausePreview,
  onSubmit,
  onToggleBasic,
  onInspectDescriptor
}: {
  gate: GateDefinition;
  targetId: string;
  learnedBasicSet: Set<string>;
  activeBasicIds: string[];
  playing: boolean;
  blindPreviewState: BlindPreviewState | null;
  title?: string;
  t: (key: string) => string;
  onPreview: (gate: GateDefinition, targetId: string, option: ListeningTrialOption) => void;
  onPausePreview: () => void;
  onSubmit: (gate: GateDefinition, targetId: string, option: ListeningTrialOption) => void;
  onToggleBasic: (id: string) => void;
  onInspectDescriptor: (id: string) => void;
}) {
  const definition = listeningChallengeFor(gate.id, targetId)!;
  const target = descriptorById.get(targetId)!;
  const isUnlocked = learnedBasicSet.has(targetId);
  const [trial, setTrial] = useState(() => createListeningTrial(definition));
  const [previewedLabel, setPreviewedLabel] = useState<string | null>(null);
  const [result, setResult] = useState<{ correct: boolean; option: ListeningTrialOption } | null>(null);

  useEffect(() => {
    setTrial(createListeningTrial(definition));
    setPreviewedLabel(null);
    setResult(null);
  }, [definition]);

  const targetLabel = t(target.textKeys.label);
  const startNextTrial = () => {
    setTrial(createListeningTrial(definition));
    setPreviewedLabel(null);
    setResult(null);
  };

  const isActivePreview = (option: ListeningTrialOption) =>
    Boolean(
      blindPreviewState &&
        !blindPreviewState.submitted &&
        blindPreviewState.gateId === gate.id &&
        blindPreviewState.targetId === targetId &&
        blindPreviewState.optionLabel === option.label
    );

  const previewOption = (option: ListeningTrialOption) => {
    if (isActivePreview(option) && playing) {
      onPausePreview();
      return;
    }
    setPreviewedLabel(option.label);
    onPreview(gate, targetId, option);
  };

  const submitOption = (option: ListeningTrialOption) => {
    const nextResult = { correct: option.descriptorId === targetId, option };
    setResult(nextResult);
    onSubmit(gate, targetId, option);
  };

  return (
    <div className={`challenge-block blind-challenge ${result ? "has-result" : ""}`}>
      <div className="challenge-card-header">
        <div className="challenge-card-preview">
          <DescriptorCard
            card={target}
            label={targetLabel}
            summary={t(target.textKeys.summary)}
            alt={t(target.icon.altKey)}
            active={activeBasicIds.includes(targetId)}
            locked={!isUnlocked}
            compact
            onClick={isUnlocked ? () => onToggleBasic(targetId) : () => onInspectDescriptor(targetId)}
            onInspect={() => onInspectDescriptor(targetId)}
          />
        </div>
        {isUnlocked ? <p className="listening-unlocked">{t("listening.unlockedPractice")}</p> : null}
      </div>
      <div className="blind-option-grid">
        {trial.options.map((option) => {
          const descriptor = descriptorById.get(option.descriptorId)!;
          const hasPreviewed = previewedLabel === option.label;
          const isPreviewing = isActivePreview(option);
          const isPlayingPreview = isPreviewing && playing;
          const isChosen = result?.option.label === option.label;
          const isCorrectAnswer = Boolean(result && option.descriptorId === targetId);
          const isWrongChoice = Boolean(result && isChosen && option.descriptorId !== targetId);
          const revealLabel = Boolean(result);

          return (
            <div
              key={option.label}
              className={`blind-option ${isPreviewing ? "is-previewing" : ""} ${isChosen ? "is-chosen" : ""} ${isCorrectAnswer ? "is-correct-answer" : ""} ${isWrongChoice ? "is-wrong-choice" : ""}`}
            >
              <strong>{option.label}</strong>
              <span>{revealLabel ? t(descriptor.textKeys.label) : hasPreviewed ? t("listening.heard") : t("listening.unheard")}</span>
              <div className="blind-option-actions">
                <button
                  className="icon-button"
                  type="button"
                  onClick={() => previewOption(option)}
                  title={`${isPlayingPreview ? t("action.pause") : t("listening.play")} ${option.label}`}
                >
                  {isPlayingPreview ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
                </button>
                <button className="text-button" type="button" disabled={Boolean(result)} onClick={() => submitOption(option)}>
                  <Check aria-hidden="true" />
                  <span>
                    {t("listening.choose")} {option.label}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <button className="text-button" type="button" onClick={startNextTrial}>
        <RotateCcw aria-hidden="true" />
        <span>{t("listening.nextTrial")}</span>
      </button>
    </div>
  );
}

function TowerAudioActions({
  trial,
  ready,
  playing,
  t,
  onPlayHiddenSound,
  onNextTrial,
  onPauseAudio
}: {
  trial: TowerTrial;
  ready: boolean;
  playing: boolean;
  t: (key: string) => string;
  onPlayHiddenSound: () => void;
  onNextTrial: () => void;
  onPauseAudio: () => void;
}) {
  const answered = towerTrialSubmitted(trial);
  const playLabel = answered ? t("tower.replayAnswer") : t("tower.playHidden");

  return (
    <div className="tower-audio-actions">
      <button className={`icon-button ${answered ? "" : "primary"}`} type="button" disabled={!ready} onClick={onPlayHiddenSound} title={playLabel}>
        <Play aria-hidden="true" />
        <span>{playLabel}</span>
      </button>
      <button className="icon-button" type="button" disabled={!playing} onClick={onPauseAudio} title={t("action.pause")}>
        <Pause aria-hidden="true" />
        <span>{t("action.pause")}</span>
      </button>
      <button className={`icon-button ${answered ? "primary" : ""}`} type="button" disabled={!ready || !answered} onClick={onNextTrial} title={t("tower.nextSound")}>
        <SkipForward aria-hidden="true" />
        <span>{t("tower.nextSound")}</span>
      </button>
    </div>
  );
}

function TowerProgressPanel({
  floor,
  trial,
  completedChallenges,
  t
}: {
  floor: (typeof towerFloorDefinitions)[number];
  trial: TowerTrial;
  completedChallenges: Record<string, number>;
  t: (key: string) => string;
}) {
  const attempts = completedChallenges[towerChallengeKey(floor.id, "attempts")] ?? 0;
  const correctCount = completedChallenges[towerChallengeKey(floor.id, "correct")] ?? 0;
  const floorScore = towerScoreFor(completedChallenges, floor.id);
  const floorScorePercent = Math.min(100, Math.round((floorScore / floor.promotionScore) * 100));
  const target = descriptorById.get(trial.targetId) ?? discoveryById.get(trial.targetId);
  const selected = trial.selectedId ? descriptorById.get(trial.selectedId) ?? discoveryById.get(trial.selectedId) ?? null : null;
  const answered = towerTrialSubmitted(trial);
  const scoreDelta = answered ? towerScoreDeltaForTrial(trial) : 0;
  const selectedIngredientCards = trial.selectedIngredientIds.map((id) => descriptorById.get(id)).filter((card): card is DescriptorCardType => Boolean(card));
  const selectedText = selected ? t(selected.textKeys.label) : selectedIngredientCards.map((card) => t(card.textKeys.label)).join(" + ");
  const targetIngredientCards =
    target?.role === "discovery"
      ? target.ingredientIds.map((id) => descriptorById.get(id)).filter((card): card is DescriptorCardType => Boolean(card))
      : [];
  const targetMeta = target?.role === "basic" ? towerFloorTwoMeta[target.id] : undefined;

  return (
    <section className="tool-surface tower-progress-panel">
      <div className="section-heading">
        <h2>{t("tower.scoreLabel")}</h2>
        <p>{t(floor.instructionKey)}</p>
      </div>
      <div className="tower-score-card">
        <span>{t(floor.labelKey)}</span>
        <strong>{`${floorScore}/${floor.promotionScore} ${t("tower.score")}`}</strong>
        <div className="tower-score-meter" aria-hidden="true">
          <span style={{ width: `${floorScorePercent}%` }} />
        </div>
        <small>{`${correctCount}/${attempts} ${t("tower.accuracy")}`}</small>
      </div>
      {answered && target && selectedText ? (
        <div className={`language-feedback tower-feedback ${towerFeedbackClassForScoreDelta(scoreDelta)}`}>
          <strong>{`${t(towerFeedbackKeyForScoreDelta(scoreDelta))} ${t(towerScoreDeltaKey(scoreDelta))}`}</strong>
          <span>
            {scoreDelta === towerCorrectScoreDelta
              ? `${t("tower.feedback.was")} ${t(target.textKeys.label)}.`
              : `${t("tower.feedback.youChose")} ${selectedText}. ${t("tower.feedback.was")} ${t(target.textKeys.label)}.`}
          </span>
          {target.role === "discovery" ? (
            <div className="tower-recipe-result">
              <img src={target.icon.src} alt={t(target.icon.altKey)} loading="lazy" />
              <div className="tower-recipe-ingredients">
                {targetIngredientCards.map((card) => (
                  <span key={card.id}>{t(card.textKeys.label)}</span>
                ))}
              </div>
            </div>
          ) : targetMeta ? (
            <div className="tower-analysis-grid">
              <span>{t(targetMeta.gateKey)}</span>
              <span>{t(targetMeta.directionKey)}</span>
              <span>{t(targetMeta.territoryKey)}</span>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function CalibrationTowerScreen({
  trial,
  selectedFloorId,
  learnedBasicSet,
  completedChallenges,
  t,
  onSelectFloor,
  onChooseAnswer,
  backToCampus,
  enterLearn
}: {
  trial: TowerTrial;
  selectedFloorId: TowerFloorId;
  learnedBasicSet: Set<string>;
  completedChallenges: Record<string, number>;
  t: (key: string) => string;
  onSelectFloor: (floorId: TowerFloorId) => void;
  onChooseAnswer: (id: string) => void;
  backToCampus: () => void;
  enterLearn: () => void;
}) {
  const floor = towerFloorById.get(selectedFloorId) ?? towerFloorDefinitions[0];
  const isIngredientRecipeFloor = floor.mode === "ingredientRecipe";
  const isMissingIngredientFloor = floor.mode === "missingIngredient";
  const usesDynamicChoices = isIngredientRecipeFloor || isMissingIngredientFloor || floor.mode === "discoveryChoice";
  const answerOptionIds = usesDynamicChoices ? trial.optionIds : floor.answerIds;
  const answerCards = answerOptionIds
    .map((id) => descriptorById.get(id) ?? discoveryById.get(id))
    .filter((card): card is DescriptorCardType | DiscoveryCardType => Boolean(card));
  const requiredCards = floor.requiredBasicIds.map((id) => descriptorById.get(id)).filter((card): card is DescriptorCardType => Boolean(card));
  const missingRequiredCards = requiredCards.filter((card) => !learnedBasicSet.has(card.id));
  const ready = missingRequiredCards.length === 0;
  const answered = towerTrialSubmitted(trial);
  const floorScore = towerScoreFor(completedChallenges, floor.id);
  const floorComplete = floorScore >= floor.promotionScore;
  const targetIngredientIds = basicIdsForTowerTarget(trial.targetId);
  const targetIngredientCards = targetIngredientIds.map((id) => descriptorById.get(id)).filter((card): card is DescriptorCardType => Boolean(card));
  const selectedIngredientCards = trial.selectedIngredientIds.map((id) => descriptorById.get(id)).filter((card): card is DescriptorCardType => Boolean(card));
  const ingredientAnswerCount = floor.ingredientAnswerCount ?? targetIngredientIds.length;

  return (
    <div className="screen-flow">
      <section className="training-ground-hero tower-hero">
        <div className="training-hero-art">
          <img src="/icons/buildings/calibration-tower.png" alt={t("building.tower.alt")} loading="lazy" />
        </div>
        <div className="training-hero-copy">
          <span className="training-kicker">{t("tower.heading")}</span>
          <h2>{t(floor.labelKey)}</h2>
          <span className={`training-status-chip ${floorComplete ? "is-complete" : ""}`}>
            {floorComplete ? t("tower.status.complete") : t("tower.status.incomplete")}
          </span>
        </div>
        <button className="text-button training-back-button" type="button" onClick={backToCampus}>
          <ArrowLeft aria-hidden="true" />
          {t("action.backToCampus")}
        </button>
      </section>

      <section className="tool-surface training-switchboard">
        <div className="section-heading">
          <h2>{t("tower.floors")}</h2>
        </div>
        <div className="gate-tabs tower-floor-tabs">
          {towerFloorDefinitions.map((candidate) => {
            const candidateScore = towerScoreFor(completedChallenges, candidate.id);
            const candidateUnlocked = isTowerFloorUnlocked(candidate.id, completedChallenges);
            const candidateComplete = candidateScore >= candidate.promotionScore;
            const candidateProgress = candidateUnlocked
              ? `${candidateScore}/${candidate.promotionScore} ${t("tower.score")}`
              : t("tower.status.locked");

            return (
              <button
                key={candidate.id}
                className={`${selectedFloorId === candidate.id ? "is-active" : ""} ${candidateComplete ? "is-complete" : ""} ${!candidateUnlocked ? "is-locked" : ""}`}
                type="button"
                disabled={!candidateUnlocked}
                onClick={() => onSelectFloor(candidate.id)}
              >
                <span>{t(candidate.labelKey)}</span>
                <small>{candidateProgress}</small>
              </button>
            );
          })}
        </div>
      </section>

      <section className="tool-surface tower-floor">
        {!ready ? (
          <div className="tower-locked-panel">
            <strong>{t("tower.locked.title")}</strong>
            <p>{t("tower.locked.body")}</p>
            <div className="active-stack">
              {missingRequiredCards.map((card) => (
                <span key={card.id}>{t(card.textKeys.label)}</span>
              ))}
            </div>
            <button className="text-button" type="button" onClick={enterLearn}>
              {t("orientation.training.action")}
            </button>
          </div>
        ) : (
          <>
            {isIngredientRecipeFloor ? (
              <div className="tower-recipe-answer">
                <span>{t("tower.recipeAnswer")}</span>
                <div className={`tower-recipe-slots ${ingredientAnswerCount >= 3 ? "tower-known-recipe-slots" : ""}`}>
                  {Array.from({ length: ingredientAnswerCount }, (_, index) => {
                    const card = selectedIngredientCards[index];
                    return <span key={index}>{card ? t(card.textKeys.label) : t("tower.ingredientSlot")}</span>;
                  })}
                </div>
              </div>
            ) : null}
            {isMissingIngredientFloor ? (
              <div className="tower-recipe-answer">
                <span>{t("tower.missingRecipe")}</span>
                <div className="tower-recipe-slots tower-known-recipe-slots">
                  {targetIngredientCards.map((card) => {
                    const isMissingIngredient = card.id === trial.missingIngredientId;
                    return (
                      <span key={card.id} className={isMissingIngredient ? `is-missing ${answered ? "is-revealed" : ""}` : ""}>
                        {isMissingIngredient && !answered ? t("tower.missingSlot") : t(card.textKeys.label)}
                      </span>
                    );
                  })}
                </div>
              </div>
            ) : null}
            <div className="tower-option-grid">
              {answerCards.map((card) => {
                const isSelected = isIngredientRecipeFloor ? trial.selectedIngredientIds.includes(card.id) : trial.selectedId === card.id;
                const isTarget = isIngredientRecipeFloor
                  ? answered && targetIngredientIds.includes(card.id)
                  : isMissingIngredientFloor
                    ? answered && trial.missingIngredientId === card.id
                    : answered && trial.targetId === card.id;
                const isWrong = answered && isSelected && !isTarget;
                const summaryKey = card.role === "discovery" ? card.textKeys.explanation : card.textKeys.summary;

                return (
                  <button
                    key={card.id}
                    className={`tower-option ${isSelected ? "is-selected" : ""} ${isTarget ? "is-correct" : ""} ${isWrong ? "is-wrong" : ""}`}
                    type="button"
                    disabled={!trial.previewed || answered}
                    onClick={() => onChooseAnswer(card.id)}
                  >
                    <img src={card.icon.src} alt={t(card.icon.altKey)} loading="lazy" />
                    <span className="tower-option-label">{t(card.textKeys.label)}</span>
                    <small>{t(summaryKey)}</small>
                  </button>
                );
              })}
            </div>

            {!trial.previewed ? <p className="tower-footnote">{t("tower.mustPlay")}</p> : null}
          </>
        )}
      </section>

    </div>
  );
}

type RegionProps = {
  moduleBasicsUnlocked: Map<DescriptorModuleId, boolean>;
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
  moduleBasicsUnlocked,
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
  const selectedRegion = regionDefinitions.find((region) => region.id === selectedRegionId);
  const selectedRegionContent = selectedRegion ? playableRegionContent[selectedRegion.id] : undefined;
  const ingredientCards = (selectedRegionContent?.ingredientIds ?? []).map((id) => descriptorById.get(id)!).filter(Boolean);
  const regionDiscoveries = (selectedRegionContent?.discoveryIds ?? []).map((id) => discoveryById.get(id)!).filter(Boolean);
  const selectedRegionOpen = selectedRegion ? Boolean(selectedRegion.playable && moduleBasicsUnlocked.get(selectedRegion.moduleId)) : false;

  if (spectralView === "region" && selectedRegion && selectedRegionContent && selectedRegionOpen) {
    return (
      <div className="screen-flow">
        <section className="region-hero">
          <img src={selectedRegion.imageSrc} alt={t(selectedRegion.labelKey)} />
          <div>
            <button className="text-button" type="button" onClick={backToAtlas}>
              <ArrowLeft aria-hidden="true" />
              <span>{t("action.backToAtlas")}</span>
            </button>
            <h2>{t(selectedRegion.labelKey)}</h2>
            <p>{t(selectedRegion.summaryKey)}</p>
          </div>
        </section>

        <section className="tool-surface">
          <div className="section-heading">
            <h2>{t("section.basics")}</h2>
            <p>{t(selectedRegion.summaryKey)}</p>
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

        {regionDiscoveries.length > 0 ? (
          <RecipeShelf
            cards={regionDiscoveries}
            unlockedDiscoverySet={unlockedDiscoverySet}
            activeDiscoveryId={activeDiscoveryId}
            t={t}
            summary={t(selectedRegion.summaryKey)}
            onPlay={playDiscovery}
            onInspect={inspectDiscovery}
          />
        ) : null}
      </div>
    );
  }

  return (
    <div className="screen-flow">
      <section className="spectral-atlas">
        <div className="atlas-heading">
          <h2>{t("atlas.heading")}</h2>
        </div>
        <div className="region-map">
          {regionCards.map((region) => {
            const open = Boolean(region.playable && moduleBasicsUnlocked.get(region.moduleId));
            const status = open ? t(region.summaryKey) : region.playable ? t("status.regionLocked") : t("status.previewRegion");
            const module = moduleDefinitions.find((candidate) => candidate.id === region.moduleId);
            return (
              <button
                key={region.id}
                className={`region-tile ${open ? "is-open" : "is-locked"}`}
                type="button"
                onClick={() => enterRegion(region.id)}
              >
                <img src={region.imageSrc} alt={t(region.labelKey)} loading="lazy" />
                <span className="region-module-chip">{module ? t(module.labelKey) : region.moduleId}</span>
                <span className="region-tile-copy">
                  <strong>{t(region.labelKey)}</strong>
                  <small>{status}</small>
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function RegionCraftingPanel({
  activeBasicIds,
  blendAttempts,
  uniqueBlendCount,
  t,
  onTryBlend
}: {
  activeBasicIds: string[];
  blendAttempts: BlendAttempt[];
  uniqueBlendCount: number;
  t: (key: string) => string;
  onTryBlend: () => void;
}) {
  const [showAllAttempts, setShowAllAttempts] = useState(false);
  const activeCards = activeBasicIds.map((id) => descriptorById.get(id)).filter((card): card is DescriptorCardType => Boolean(card));
  const hintKey = uniqueBlendCount >= 6 ? "craft.hint.deep" : uniqueBlendCount >= 3 ? "craft.hint.mid" : "craft.hint.start";
  const visibleAttempts = showAllAttempts ? blendAttempts : blendAttempts.slice(0, 2);
  const canToggleAttempts = blendAttempts.length > 2;

  return (
    <section className="tool-surface craft-panel">
      <div className="section-heading">
        <h2>{t("section.blendCraft")}</h2>
        <p>
          {uniqueBlendCount} {t("craft.uniqueBlends")}
        </p>
      </div>
      <div className="craft-action-row">
        <div className="craft-current-stack">
          {activeCards.length > 0 ? (
            activeCards.map((card) => <span key={card.id}>{t(card.textKeys.label)}</span>)
          ) : (
            <span className="empty-state">{t("craft.empty")}</span>
          )}
        </div>
        <button className="text-button craft-button" type="button" onClick={onTryBlend} disabled={activeCards.length === 0}>
          {t("action.tryBlend")}
        </button>
      </div>
      <p className="craft-hint">{t(hintKey)}</p>
      <div className="attempt-footer">
        <div className="attempt-footer-heading">
          <strong>{t("section.recentAttempts")}</strong>
          {canToggleAttempts ? (
            <button className="text-button compact-action" type="button" onClick={() => setShowAllAttempts((current) => !current)}>
              {showAllAttempts ? t("action.showFewerAttempts") : t("action.showAllAttempts")}
            </button>
          ) : null}
        </div>
        <div className="blend-attempt-list" aria-live="polite">
          {visibleAttempts.length === 0 ? (
            <span className="empty-state">{t("craft.noAttempts")}</span>
          ) : (
            visibleAttempts.map((attempt) => {
              const discovery = attempt.discoveryId ? discoveryCards.find((card) => card.id === attempt.discoveryId) : undefined;
              return (
                <div key={attempt.id} className={`blend-attempt is-${attempt.status}`}>
                  <div className="blend-attempt-cards">
                    {attempt.ids.length > 0 ? (
                      attempt.ids.map((id) => {
                        const card = descriptorById.get(id);
                        return <span key={id}>{card ? t(card.textKeys.label) : id}</span>;
                      })
                    ) : (
                      <span>{t("craft.empty")}</span>
                    )}
                  </div>
                  <strong>
                    {t(`craft.status.${attempt.status}`)}
                    {discovery ? ` ${t(discovery.textKeys.label)}` : ""}
                  </strong>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

function SandboxActiveExperiment({
  activeBasicIds,
  activeDiscoveryId,
  t
}: {
  activeBasicIds: string[];
  activeDiscoveryId: string | null;
  t: (key: string) => string;
}) {
  const activeCards = activeBasicIds.map((id) => descriptorById.get(id)).filter((card): card is DescriptorCardType => Boolean(card));
  const activeDiscovery = activeDiscoveryId ? discoveryCards.find((card) => card.id === activeDiscoveryId) : undefined;

  return (
    <section className="tool-surface sandbox-workbench">
      <div>
        <strong>{t("sandbox.activeExperiment")}</strong>
        <p>{activeDiscovery ? t(activeDiscovery.textKeys.label) : t("sandbox.freeMixWithLimit")}</p>
      </div>
      <div className="active-stack">
        {activeCards.length === 0 ? <span className="empty-state">{t("sandbox.emptyExperiment")}</span> : null}
        {activeCards.map((card) => (
          <span key={card.id}>{t(card.textKeys.label)}</span>
        ))}
      </div>
    </section>
  );
}

function SandboxVisualizerTiles({
  activeDescriptorIds,
  curvePoints,
  intensityReadout,
  t
}: {
  activeDescriptorIds: string[];
  curvePoints: Parameters<typeof EqCurveView>[0]["points"];
  intensityReadout: string;
  t: (key: string) => string;
}) {
  return (
    <>
      <section className="tool-surface sandbox-visualizer-tile">
        <div className="section-heading">
          <h2>{t("visualizer.spectral.label")}</h2>
          <p>{intensityReadout}</p>
        </div>
        <EqCurveView points={curvePoints} />
      </section>

      <section className="tool-surface sandbox-visualizer-tile">
        <div className="section-heading">
          <h2>{t("visualizer.spatial.label")}</h2>
        </div>
        <SpatialStageVisualizer activeDescriptorIds={activeDescriptorIds} />
      </section>

      <section className="tool-surface sandbox-visualizer-tile">
        <div className="section-heading">
          <h2>{t("visualizer.dynamic.label")}</h2>
        </div>
        <DynamicMotionVisualizer activeDescriptorIds={activeDescriptorIds} />
      </section>

      <section className="tool-surface sandbox-visualizer-tile">
        <div className="section-heading">
          <h2>{t("visualizer.integrity.label")}</h2>
        </div>
        <IntegrityArtifactVisualizer activeDescriptorIds={activeDescriptorIds} />
      </section>
    </>
  );
}

function RecipeShelf({
  cards = discoveryCards,
  unlockedDiscoverySet,
  activeDiscoveryId,
  t,
  summary,
  onPlay,
  onInspect,
  playUnlocked = true
}: {
  cards?: DiscoveryCardType[];
  unlockedDiscoverySet: Set<string>;
  activeDiscoveryId: string | null;
  t: (key: string) => string;
  summary?: string;
  onPlay: (id: string) => void;
  onInspect: (id: string) => void;
  playUnlocked?: boolean;
}) {
  return (
    <section className="tool-surface">
      <div className="section-heading">
        <h2>{t("section.recipes")}</h2>
        <p>{summary ?? t("region.a.summary")}</p>
      </div>
      <div className="discovery-grid">
        {cards.map((card) => (
          <DiscoveryCard
            key={card.id}
            card={card}
            label={t(card.textKeys.label)}
            explanation={t(card.textKeys.explanation)}
            hint={t(`hint.${card.id}`)}
            alt={t(card.icon.altKey)}
            unlocked={unlockedDiscoverySet.has(card.id)}
            active={playUnlocked && activeDiscoveryId === card.id}
            onClick={unlockedDiscoverySet.has(card.id) && playUnlocked ? () => onPlay(card.id) : () => onInspect(card.id)}
            onInspect={() => onInspect(card.id)}
          />
        ))}
      </div>
    </section>
  );
}

function moduleIdForDiscovery(card: DiscoveryCardType): DescriptorModuleId | null {
  const ingredientModuleIds = card.ingredientIds
    .map((id) => descriptorById.get(id)?.moduleId)
    .filter((moduleId): moduleId is DescriptorModuleId => Boolean(moduleId));

  return ingredientModuleIds[0] ?? null;
}

function BuildingScreen({
  learnedBasicIds,
  unlockedAliasSet,
  unlockedDiscoverySet,
  completedChallenges,
  t,
  enterOrientation,
  enterLearn,
  enterTower,
  enterLanguageHall,
  enterLaboratory
}: {
  learnedBasicIds: string[];
  unlockedAliasSet: Set<string>;
  unlockedDiscoverySet: Set<string>;
  completedChallenges: Record<string, number>;
  t: (key: string) => string;
  enterOrientation: () => void;
  enterLearn: () => void;
  enterTower: () => void;
  enterLanguageHall: () => void;
  enterLaboratory: () => void;
}) {
  const progress = curriculumProgress(learnedBasicIds, unlockedDiscoverySet, unlockedAliasSet);
  const learnProgress = `${learnedBasicIds.length}/${descriptorCatalog.length}`;
  const aliasProgress = `${aliasVocabularyCards.filter((card) => unlockedAliasSet.has(card.id)).length}/${aliasVocabularyCards.length}`;
  const lexiconUnlocked = progress.atlas.complete;
  const lexiconProgress = lexiconUnlocked ? aliasProgress : t("orientation.lexicon.lockedChip");
  const towerFirstFloor = towerFloorDefinitions[0];
  const towerFirstFloorScore = towerScoreFor(completedChallenges, towerFirstFloor.id);
  const towerProgress = progress.towerUnlocked
    ? towerFirstFloorScore > 0
      ? `${towerFirstFloorScore}/${towerFirstFloor.promotionScore}`
      : t("tower.firstFloor.short")
    : t("orientation.tower.lockedChip");

  return (
    <div className="screen-flow">
      <section className="spectral-atlas building-hub">
        <div className="atlas-heading">
          <h2>{t("building.heading")}</h2>
        </div>
        <div className="region-map building-map">
          <button className="region-tile building-tile building-tile-featured is-open" type="button" onClick={enterOrientation}>
            <img src="/icons/buildings/orientation-center.png" alt={t("building.orientationCenter.alt")} loading="lazy" />
            <span className="region-module-chip">{t("building.startChip")}</span>
            <span className="region-tile-copy">
              <strong>{t("building.orientationCenter.label")}</strong>
              <small>{t("building.orientationCenter.summary")}</small>
            </span>
          </button>
          <button className="region-tile building-tile is-open" type="button" onClick={enterLearn}>
            <img src="/icons/buildings/training-grounds.png" alt={t("building.learnHall.alt")} loading="lazy" />
            <span className="region-module-chip">{learnProgress}</span>
            <span className="region-tile-copy">
              <strong>{t("building.learnHall.label")}</strong>
              <small>{t("building.learnHall.summary")}</small>
            </span>
          </button>
          <button
            className={`region-tile building-tile ${progress.towerUnlocked ? "is-open" : "is-locked"}`}
            type="button"
            disabled={!progress.towerUnlocked}
            onClick={enterTower}
          >
            <img src="/icons/buildings/calibration-tower.png" alt={t("building.tower.alt")} loading="lazy" />
            <span className="region-module-chip">{towerProgress}</span>
            <span className="region-tile-copy">
              <strong>{t("building.tower.label")}</strong>
              <small>{progress.towerUnlocked ? t("building.tower.summary") : t("orientation.tower.lockedBody")}</small>
            </span>
          </button>
          <button
            className={`region-tile building-tile ${lexiconUnlocked ? "is-open" : "is-locked"}`}
            type="button"
            disabled={!lexiconUnlocked}
            onClick={enterLanguageHall}
          >
            <img src="/icons/buildings/lexicon-hall.png" alt={t("building.languageHall.alt")} loading="lazy" />
            <span className="region-module-chip">{lexiconProgress}</span>
            <span className="region-tile-copy">
              <strong>{t("building.languageHall.label")}</strong>
              <small>{lexiconUnlocked ? t("building.languageHall.summary") : t("orientation.lexicon.lockedBody")}</small>
            </span>
          </button>
          <button className="region-tile building-tile is-open" type="button" onClick={enterLaboratory}>
            <img src="/icons/buildings/sound-lab.png" alt={t("building.laboratory.alt")} loading="lazy" />
            <span className="region-module-chip">{t("building.toolChip")}</span>
            <span className="region-tile-copy">
              <strong>{t("building.laboratory.label")}</strong>
              <small>{t("building.laboratory.summary")}</small>
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}

function OrientationCenterScreen({
  learnedBasicIds,
  unlockedDiscoverySet,
  unlockedAliasSet,
  t,
  enterLearn,
  enterTower,
  enterLanguageHall,
  enterLaboratory,
  enterAtlas,
  enterCollection,
  backToCampus
}: {
  learnedBasicIds: string[];
  unlockedDiscoverySet: Set<string>;
  unlockedAliasSet: Set<string>;
  t: (key: string) => string;
  enterLearn: () => void;
  enterTower: () => void;
  enterLanguageHall: () => void;
  enterLaboratory: () => void;
  enterAtlas: () => void;
  enterCollection: () => void;
  backToCampus: () => void;
}) {
  const progress = curriculumProgress(learnedBasicIds, unlockedDiscoverySet, unlockedAliasSet);
  const towerStage: CurriculumStageProgress = {
    completed: [progress.training, progress.atlas, progress.lexicon].filter((stage) => stage.complete).length,
    total: 3,
    complete: progress.towerUnlocked
  };
  const statusFor = (stage: CurriculumStageProgress) => (stage.complete ? t("orientation.status.complete") : t("orientation.status.inProgress"));
  const progressLabel = (stage: CurriculumStageProgress) => `${stage.completed}/${stage.total}`;
  const lexiconUnlocked = progress.atlas.complete;
  const pathPlaces = [
    {
      id: "training",
      index: "01",
      imageSrc: "/icons/buildings/training-grounds.png",
      imageAlt: t("building.learnHall.alt"),
      title: t("orientation.training.title"),
      body: t("orientation.training.body"),
      action: t("orientation.training.action"),
      onClick: enterLearn,
      stage: progress.training,
      status: statusFor(progress.training),
      locked: false,
      lockedNote: ""
    },
    {
      id: "atlas",
      index: "02",
      imageSrc: "/icons/regions/spectrial-region-a-thunderstep-highlands.png",
      imageAlt: t("region.a.label"),
      title: t("orientation.atlas.title"),
      body: t("orientation.atlas.body"),
      action: t("orientation.atlas.action"),
      onClick: enterAtlas,
      stage: progress.atlas,
      status: statusFor(progress.atlas),
      locked: false,
      lockedNote: ""
    },
    {
      id: "lexicon",
      index: "03",
      imageSrc: "/icons/buildings/lexicon-hall.png",
      imageAlt: t("building.languageHall.alt"),
      title: t("orientation.lexicon.title"),
      body: lexiconUnlocked ? t("orientation.lexicon.body") : t("orientation.lexicon.lockedBody"),
      action: lexiconUnlocked ? t("orientation.lexicon.action") : t("orientation.lexicon.lockedAction"),
      onClick: enterLanguageHall,
      stage: progress.lexicon,
      status: lexiconUnlocked ? statusFor(progress.lexicon) : t("orientation.status.locked"),
      locked: !lexiconUnlocked,
      lockedNote: lexiconUnlocked ? "" : `${t("orientation.lexicon.remaining")} ${progressLabel(progress.atlas)}`
    },
    {
      id: "tower",
      index: "04",
      imageSrc: "/icons/buildings/calibration-tower.png",
      imageAlt: t("building.tower.alt"),
      title: t("orientation.tower.title"),
      body: progress.towerUnlocked ? t("orientation.tower.body") : t("orientation.tower.lockedBody"),
      action: progress.towerUnlocked ? t("orientation.tower.action") : t("orientation.tower.lockedAction"),
      onClick: enterTower,
      stage: towerStage,
      status: progress.towerUnlocked ? t("orientation.status.unlocked") : t("orientation.status.locked"),
      locked: !progress.towerUnlocked,
      lockedNote: progress.towerUnlocked ? "" : `${t("orientation.tower.remaining")} ${t(nextCurriculumStep(progress))}`
    }
  ];
  const utilityPlaces = [
    {
      id: "soundLab",
      imageSrc: "/icons/buildings/sound-lab.png",
      imageAlt: t("building.laboratory.alt"),
      title: t("orientation.soundLab.title"),
      body: t("orientation.soundLab.body"),
      action: t("orientation.soundLab.action"),
      onClick: enterLaboratory
    },
    {
      id: "collection",
      imageSrc: "/icons/buildings/0000.png",
      imageAlt: t("orientation.collection.alt"),
      title: t("orientation.collection.title"),
      body: t("orientation.collection.body"),
      action: t("orientation.collection.action"),
      onClick: enterCollection
    }
  ];

  return (
    <div className="screen-flow">
      <section className="training-ground-hero orientation-hero">
        <div className="training-hero-art">
          <img src="/icons/buildings/orientation-center.png" alt={t("building.orientationCenter.alt")} loading="lazy" />
        </div>
        <div className="training-hero-copy">
          <span className="training-kicker">{t("orientation.title")}</span>
          <h2>{t("orientation.pathTitle")}</h2>
          <p>{t("orientation.pathBody")}</p>
          <span className={`training-status-chip ${progress.towerUnlocked ? "is-complete" : ""}`}>
            {progress.towerUnlocked ? t("orientation.status.ready") : `${t("orientation.next")} ${t(nextCurriculumStep(progress))}`}
          </span>
        </div>
        <button className="text-button training-back-button" type="button" onClick={backToCampus}>
          <ArrowLeft aria-hidden="true" />
          {t("action.backToCampus")}
        </button>
      </section>

      <section className="tool-surface orientation-center orientation-path-section">
        <div className="section-heading">
          <h2>{t("orientation.pathSectionTitle")}</h2>
          <p>{t("orientation.pathSectionBody")}</p>
        </div>
        <div className="orientation-path-grid">
          {pathPlaces.map((place) => (
            <article className={`orientation-path-card ${place.stage.complete ? "is-complete" : ""} ${place.locked ? "is-locked" : ""}`} key={place.id}>
              <img src={place.imageSrc} alt={place.imageAlt} loading="lazy" />
              <div className="orientation-path-copy">
                <span className="orientation-place-index">{place.index}</span>
                <div>
                  <h3>{place.title}</h3>
                  <p>{place.body}</p>
                </div>
              </div>
              <div className="orientation-progress-stack">
                {place.locked ? <p className="orientation-locked-note">{place.lockedNote}</p> : null}
                <div className="orientation-progress-line">
                  <span>{place.status}</span>
                  <strong>{progressLabel(place.stage)}</strong>
                </div>
                <div className="tower-score-meter" aria-hidden="true">
                  <span style={{ width: `${place.stage.total > 0 ? Math.round((place.stage.completed / place.stage.total) * 100) : 0}%` }} />
                </div>
              </div>
              <button className="text-button" type="button" disabled={Boolean(place.locked)} onClick={place.onClick}>
                {place.action}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="tool-surface orientation-center orientation-tools-section">
        <div className="section-heading">
          <h2>{t("orientation.tools.title")}</h2>
          <p>{t("orientation.tools.body")}</p>
        </div>
        <div className="orientation-tool-grid">
          {utilityPlaces.map((place) => (
            <article className="orientation-tool-card" key={place.id}>
              <img src={place.imageSrc} alt={place.imageAlt} loading="lazy" />
              <div>
                <h3>{place.title}</h3>
                <p>{place.body}</p>
              </div>
              <button className="text-button" type="button" onClick={place.onClick}>
                {place.action}
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function LanguageHallScreen({
  learnedBasicSet,
  unlockedDiscoverySet,
  unlockedAliasSet,
  t,
  onUnlockAlias,
  backToCampus
}: {
  learnedBasicSet: Set<string>;
  unlockedDiscoverySet: Set<string>;
  unlockedAliasSet: Set<string>;
  t: (key: string) => string;
  onUnlockAlias: (id: string) => void;
  backToCampus: () => void;
}) {
  const [selectedAliasId, setSelectedAliasId] = useState<string | null>(null);
  const [selectedAnchorId, setSelectedAnchorId] = useState<string | null>(null);
  const selectedAlias = selectedAliasId ? aliasVocabularyCards.find((card) => card.id === selectedAliasId) ?? null : null;
  const currentContext = selectedAlias?.contexts[0] ?? null;
  const correctAnswerIds = currentContext?.answerIds ?? [];
  const selectedCorrect = selectedAnchorId ? correctAnswerIds.includes(selectedAnchorId) : false;
  const completedCount = aliasVocabularyCards.filter((card) => unlockedAliasSet.has(card.id)).length;
  const selectedAliasIndex = selectedAlias ? aliasVocabularyCards.findIndex((card) => card.id === selectedAlias.id) : -1;
  const selectedAliasUnlocked = selectedAlias ? unlockedAliasSet.has(selectedAlias.id) : false;

  const openAliasChallenge = (aliasId: string) => {
    setSelectedAliasId(aliasId);
    setSelectedAnchorId(null);
  };

  const moveAliasChallenge = (offset: number) => {
    if (selectedAliasIndex < 0) return;
    const nextIndex = (selectedAliasIndex + offset + aliasVocabularyCards.length) % aliasVocabularyCards.length;
    openAliasChallenge(aliasVocabularyCards[nextIndex].id);
  };

  const chooseAliasAnswer = (id: string) => {
    if (!selectedAlias || !currentContext) return;
    if (selectedCorrect) return;
    setSelectedAnchorId(id);
    if (currentContext.answerIds.includes(id) && !unlockedAliasSet.has(selectedAlias.id)) {
      onUnlockAlias(selectedAlias.id);
    }
  };

  const returnToHall = () => {
    setSelectedAliasId(null);
    setSelectedAnchorId(null);
  };

  if (selectedAlias && currentContext) {
    return (
      <div className="screen-flow">
        <LanguageHallHero
          title={selectedAlias.label}
          status={selectedAliasUnlocked ? t("languageHall.unlockedStatus") : t("languageHall.lockedStatus")}
          complete={selectedAliasUnlocked}
          t={t}
          backToCampus={backToCampus}
        />
        <section className="tool-surface language-hall">
          <button className="text-button language-action" type="button" onClick={returnToHall}>
            <ArrowLeft aria-hidden="true" />
            {t("languageHall.backToHall")}
          </button>
          <div className="language-test-nav">
            <button className="icon-button" type="button" onClick={() => moveAliasChallenge(-1)} title={t("languageHall.previousCard")}>
              <ChevronLeft aria-hidden="true" />
            </button>
            <span className="language-test-position">
              {selectedAliasIndex + 1}/{aliasVocabularyCards.length}
            </span>
            <span className={`language-test-status ${selectedAliasUnlocked ? "is-unlocked" : "is-locked"}`}>
              {selectedAliasUnlocked ? t("languageHall.unlockedStatus") : t("languageHall.lockedStatus")}
            </span>
            <button className="icon-button" type="button" onClick={() => moveAliasChallenge(1)} title={t("languageHall.nextCard")}>
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
          <div className="language-exercise">
            <div className="alias-prompt-card">
              <span>{selectedAlias.kind === "ambiguous" ? t("languageHall.ambiguous") : t("languageHall.alias")}</span>
              <strong>{selectedAlias.label}</strong>
              <p>{currentContext.prompt}</p>
            </div>
            <div className="alias-option-grid">
              {currentContext.optionIds.map((id) => {
                const descriptor = descriptorById.get(id);
                const discovery = discoveryById.get(id);
                if (!descriptor && !discovery) return null;
                const unlocked = descriptor ? learnedBasicSet.has(id) : unlockedDiscoverySet.has(id);
                const imageSrc = descriptor?.icon.src ?? discovery!.icon.src;
                const imageAlt = descriptor ? t(descriptor.icon.altKey) : t(discovery!.icon.altKey);
                const label = descriptor ? t(descriptor.textKeys.label) : t(discovery!.textKeys.label);
                const selected = selectedAnchorId === id;
                const isCorrect = Boolean(selectedCorrect && correctAnswerIds.includes(id));
                const isWrong = Boolean(selected && !correctAnswerIds.includes(id));
                return (
                  <button
                    key={id}
                    className={`alias-option ${unlocked ? "" : "is-locked"} ${selected ? "is-selected" : ""} ${isCorrect ? "is-correct" : ""} ${isWrong ? "is-wrong" : ""}`}
                    type="button"
                    disabled={selectedCorrect}
                    onClick={() => chooseAliasAnswer(id)}
                  >
                    {unlocked ? (
                      <img src={imageSrc} alt={imageAlt} />
                    ) : (
                      <span className="alias-option-locked-art" aria-hidden="true">
                        <span className="locked-orb" />
                        <Lock className="card-corner-icon" aria-hidden="true" />
                      </span>
                    )}
                    <span className="alias-option-label">{label}</span>
                  </button>
                );
              })}
            </div>
            {selectedAnchorId ? (
              <div className={`language-feedback ${selectedCorrect ? "is-correct" : "is-wrong"}`}>
                {selectedCorrect ? `${currentContext.explanation} ${t("languageHall.unlockedOne")}` : t("languageHall.tryAnother")}
              </div>
            ) : null}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="screen-flow">
      <LanguageHallHero
        title={t("languageHall.aliasCards")}
        status={`${completedCount}/${aliasVocabularyCards.length} ${t("languageHall.vocabularyProgress")}`}
        complete={completedCount === aliasVocabularyCards.length}
        t={t}
        backToCampus={backToCampus}
      />
      <section className="tool-surface language-hall">
        <div className="card-grid language-alias-grid">
          {aliasVocabularyCards.map((alias) => {
            const unlocked = unlockedAliasSet.has(alias.id);
            return (
              <article key={alias.id} className={`descriptor-card language-alias-card ${unlocked ? "is-unlocked" : "is-locked"}`}>
                <button className="card-main-button" type="button" onClick={() => openAliasChallenge(alias.id)}>
                  <span className="card-image-wrap">
                    {unlocked ? <img className="card-image" src={alias.icon.src} alt={alias.icon.alt} loading="lazy" /> : <span className="locked-orb" />}
                    {unlocked ? <Check className="card-corner-icon" aria-hidden="true" /> : <Lock className="card-corner-icon" aria-hidden="true" />}
                  </span>
                  <span className="card-title">{alias.label}</span>
                </button>
              </article>
            );
          })}
        </div>
      </section>

    </div>
  );
}

function LanguageHallHero({
  title,
  status,
  complete,
  t,
  backToCampus
}: {
  title: string;
  status: string;
  complete: boolean;
  t: (key: string) => string;
  backToCampus: () => void;
}) {
  return (
    <section className="training-ground-hero lexicon-hero">
      <div className="training-hero-art">
        <img src="/icons/buildings/lexicon-hall.png" alt={t("building.languageHall.alt")} loading="lazy" />
      </div>
      <div className="training-hero-copy">
        <span className="training-kicker">{t("languageHall.title")}</span>
        <h2>{title}</h2>
        <span className={`training-status-chip ${complete ? "is-complete" : ""}`}>{status}</span>
      </div>
      <button className="text-button training-back-button" type="button" onClick={backToCampus}>
        <ArrowLeft aria-hidden="true" />
        {t("action.backToCampus")}
      </button>
    </section>
  );
}

function AliasVocabularyTile({
  alias,
  unlocked,
  t,
  onClick
}: {
  alias: AliasVocabularyCard;
  unlocked: boolean;
  t: (key: string) => string;
  onClick?: () => void;
}) {
  return (
    <article className={`alias-card ${unlocked ? "is-unlocked" : "is-locked"}`}>
      <button className="card-main-button" type="button" onClick={onClick} disabled={!onClick}>
        <span className="card-image-wrap">
          {unlocked ? <img className="card-image" src={alias.icon.src} alt={alias.icon.alt} loading="lazy" /> : <span className="locked-orb" />}
          <span className="alias-card-type-mark" title={t("detail.alias")} aria-hidden="true">
            <BookOpen aria-hidden="true" />
          </span>
          {unlocked ? null : <Lock className="card-corner-icon alias-lock-icon" aria-hidden="true" />}
        </span>
        <span className="card-title">{unlocked ? alias.label : "???"}</span>
        <span className="card-summary">{unlocked ? alias.summary : t("languageHall.lockedAliasHint")}</span>
      </button>
    </article>
  );
}

function AliasDetailModal({
  alias,
  t,
  onClose,
  onInspectDescriptor,
  onInspectDiscovery
}: {
  alias: AliasVocabularyCard | null;
  t: (key: string) => string;
  onClose: () => void;
  onInspectDescriptor: (id: string) => void;
  onInspectDiscovery: (id: string) => void;
}) {
  if (!alias) return null;

  const anchors = alias.anchorIds.map((id) => descriptorById.get(id)).filter((card): card is DescriptorCardType => Boolean(card));
  const discoveryAnchors = (alias.discoveryAnchorIds ?? [])
    .map((id) => discoveryById.get(id))
    .filter((card): card is DiscoveryCardType => Boolean(card));

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="card-detail-modal alias-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="alias-detail-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose} title={t("action.close")}>
          <X aria-hidden="true" />
        </button>

        <div className="detail-art">
          <img src={alias.icon.src} alt={alias.icon.alt} loading="lazy" />
        </div>

        <div className="detail-copy">
          <h2 id="alias-detail-title">{alias.label}</h2>
          <p className="creature-identity">{alias.summary}</p>

          <div className="player-identity-list">
            {alias.contexts.map((context) => (
              <div key={context.id} className="alias-context-block">
                <h3>{t("detail.languageExample")}</h3>
                <p>{context.prompt}</p>
              </div>
            ))}

            <h3>{t("detail.anchorCards")}</h3>
            <div className="detail-compact-card-list">
              {anchors.map((anchor) => (
                <button key={anchor.id} className="detail-compact-card-button" type="button" onClick={() => onInspectDescriptor(anchor.id)}>
                  <img src={anchor.icon.src} alt={t(anchor.icon.altKey)} loading="lazy" />
                  <strong>{t(anchor.textKeys.label)}</strong>
                </button>
              ))}
              {discoveryAnchors.map((anchor) => (
                <button key={anchor.id} className="detail-compact-card-button" type="button" onClick={() => onInspectDiscovery(anchor.id)}>
                  <img src={anchor.icon.src} alt={t(anchor.icon.altKey)} loading="lazy" />
                  <strong>{t(anchor.textKeys.label)}</strong>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CollectionScreen({
  learnedBasicIds,
  unlockedAliasSet,
  unlockedDiscoverySet,
  t,
  inspectAlias,
  inspectDescriptor,
  inspectDiscovery,
  unlockAllBasics,
  unlockAllDiscoveries,
  unlockAllAliases,
  resetProgress
}: {
  learnedBasicIds: string[];
  unlockedAliasSet: Set<string>;
  unlockedDiscoverySet: Set<string>;
  t: (key: string) => string;
  inspectAlias: (alias: AliasVocabularyCard) => void;
  inspectDescriptor: (id: string) => void;
  inspectDiscovery: (id: string) => void;
  unlockAllBasics: () => void;
  unlockAllDiscoveries: () => void;
  unlockAllAliases: () => void;
  resetProgress: () => void;
}) {
  const learnedBasicSet = new Set(learnedBasicIds);

  return (
    <div className="screen-flow">
      <section className="tool-surface">
        <div className="section-heading">
          <h2>{t("nav.collection")}</h2>
          <div className="section-actions">
            <button className="text-button compact-action" type="button" onClick={unlockAllBasics}>
              {t("action.devUnlockBasics")}
            </button>
            <button className="text-button compact-action" type="button" onClick={unlockAllDiscoveries}>
              {t("action.devUnlockDiscoveries")}
            </button>
            <button className="text-button compact-action" type="button" onClick={unlockAllAliases}>
              {t("action.devUnlockAliases")}
            </button>
            <button className="danger-button compact-danger" type="button" onClick={resetProgress}>
              {t("action.devWipe")}
            </button>
          </div>
        </div>
        <div className="collection-module-stack">
          {moduleDefinitions.map((module) => {
            const moduleCards = descriptorCatalog.filter((card) => card.moduleId === module.id);
            const moduleDiscoveries = discoveryCards.filter((card) => moduleIdForDiscovery(card) === module.id);
            const moduleAliases = aliasVocabularyCards.filter((alias) => alias.moduleId === module.id);

            return (
              <section key={module.id} className="collection-module">
                <div className="section-heading">
                  <h2>{t(module.labelKey)}</h2>
                </div>
                <div className="collection-card-grid">
                  {moduleCards.map((card) => (
                    <DescriptorCard
                      key={card.id}
                      card={card}
                      label={t(card.textKeys.label)}
                      summary={t(card.textKeys.summary)}
                      alt={t(card.icon.altKey)}
                      active={false}
                      locked={!learnedBasicSet.has(card.id)}
                      compact
                      onClick={() => inspectDescriptor(card.id)}
                    />
                  ))}
                  {moduleAliases.map((alias) => {
                    const unlocked = unlockedAliasSet.has(alias.id);
                    return (
                      <AliasVocabularyTile
                        key={alias.id}
                        alias={alias}
                        unlocked={unlocked}
                        t={t}
                        onClick={unlocked ? () => inspectAlias(alias) : undefined}
                      />
                    );
                  })}
                {moduleDiscoveries.length > 0 ? (
                  <>
                    {moduleDiscoveries.map((card) => (
                      <DiscoveryCard
                        key={card.id}
                        card={card}
                        label={t(card.textKeys.label)}
                        explanation={t(card.textKeys.explanation)}
                        hint={t(`hint.${card.id}`)}
                        alt={t(card.icon.altKey)}
                        unlocked={unlockedDiscoverySet.has(card.id)}
                        active={false}
                        onClick={() => inspectDiscovery(card.id)}
                      />
                    ))}
                  </>
                ) : null}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function SandboxScreen({
  learnedBasicIds,
  activeBasicIds,
  t,
  handleToggleBasic,
  inspectDescriptor,
  backToCampus
}: {
  learnedBasicIds: string[];
  activeBasicIds: string[];
  t: (key: string) => string;
  handleToggleBasic: (id: string) => void;
  inspectDescriptor: (id: string) => void;
  backToCampus: () => void;
}) {
  const unlockedBasics = descriptorCatalog.filter((card) => learnedBasicIds.includes(card.id));
  const activeStatus =
    activeBasicIds.length === 0
      ? t("sandbox.emptyExperiment")
      : activeBasicIds.length === 1
        ? `1 ${t("sandbox.activeCard")}`
        : `${activeBasicIds.length} ${t("sandbox.activeCards")}`;

  return (
    <div className="screen-flow">
      <section className="training-ground-hero sound-lab-hero">
        <div className="training-hero-art">
          <img src="/icons/buildings/sound-lab.png" alt={t("building.laboratory.alt")} loading="lazy" />
        </div>
        <div className="training-hero-copy">
          <span className="training-kicker">{t("building.laboratory.label")}</span>
          <h2>{t("sandbox.freeMix")}</h2>
          <span className={`training-status-chip ${activeBasicIds.length > 0 ? "is-complete" : ""}`}>{activeStatus}</span>
        </div>
        <button className="text-button training-back-button" type="button" onClick={backToCampus}>
          <ArrowLeft aria-hidden="true" />
          {t("action.backToCampus")}
        </button>
      </section>
      <section className="tool-surface">
        <CardGrid
          cards={unlockedBasics}
          activeIds={activeBasicIds}
          unlockedIds={learnedBasicIds}
          t={t}
          onCardClick={handleToggleBasic}
          onInspectCard={inspectDescriptor}
        />
      </section>
    </div>
  );
}

function SettingsScreen({
  saveData,
  setLocale,
  resetProgress,
  t
}: {
  saveData: SaveDataV1;
  setLocale: (locale: Locale) => void;
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
        <button className="danger-button" type="button" onClick={resetProgress}>
          {t("action.reset")}
        </button>
      </section>
    </div>
  );
}
