# Descriptor Technical Design

This is the implementation source of truth for Descriptor Playground. It absorbs the active technical decisions from the iteration discussion notes and reflects the current Vite/React app structure.

## Runtime And Platform

Descriptor Playground is a TypeScript web app.

| Area | Current choice |
|---|---|
| App shell | Vite + React + TypeScript |
| Runtime audio | Web Audio API |
| Persistence | Browser `localStorage` |
| Build output | Static web build |
| Runtime backend | None |
| Runtime Python | None |
| Tests | Vitest |

Python and other offline tools may be used for asset preparation, but runtime app behavior should remain TypeScript/Web Audio.

## Current Folder Shape

The implemented app lives under `web/app/`.

```text
web/app/
  src/
    app/
      App.tsx
      routes.ts
    audio/
      dsp/
      engine/
      analysis/
    cards/
      aliasVocabulary.ts
      blendCrafting.ts
      cardDetails.ts
      cardReducer.ts
      cardTypes.ts
      descriptorCatalog.ts
      discoveryRecipes.ts
      recipeMatcher.ts
    data/
      regions.ts
      tracks.ts
    i18n/
    learn/
      listeningChallenges.ts
    persistence/
    tests/
    ui/
      components/
      styles/
  public/
```

## Screen Architecture

`App.tsx` is currently the central orchestrator. Route ids are defined in `routes.ts`.

| Screen id | Component/function | Role |
|---|---|---|
| `building` | `BuildingScreen` | Campus hub. |
| `orientation` | `OrientationCenterScreen` | App function directory. |
| `learn` | `LearnScreen` | Training Grounds. |
| `region` | `RegionScreen` | Atlas and region crafting. |
| `tower` | `CalibrationTowerScreen` | Calibration Tower. |
| `languageHall` | `LanguageHallScreen` | Lexicon Hall. |
| `collection` | `CollectionScreen` | Card collection and dev tools. |
| `sandbox` | `SandboxScreen` | Sound Lab. |
| `settings` | `SettingsScreen` | Settings and reset. |

Future refactors may split these into files, but behavior should preserve the same data contracts.

## Card Data Contracts

### Basic Descriptors

Basics live in `descriptorCatalog.ts`.

Rules:

- Every basic id must be unique.
- Every basic belongs to exactly one module.
- Every basic must be reachable through a Training Grounds gate.
- Conflict ids must point to existing basic ids.
- Spectral basics use EQ filters; non-spectral basics use module-specific audio/visual profiles.

### Discovery Cards

Discoveries live in `discoveryRecipes.ts`.

Rules:

- Every Discovery id must be unique.
- Every ingredient id must be an existing basic id.
- Recipe ingredients must not contain conflict pairs.
- Exact recipe identity is determined by `exactMatchedDiscovery`.
- Discovery cards can be active as macro identities by expanding to ingredient basics.

### Alias Cards

Aliases live in `aliasVocabulary.ts`.

Rules:

- Alias ids must not collide with Discovery ids.
- Alias anchors and option ids must be basic descriptor ids.
- Correct answer ids must be included in the option set.
- Correct answer ids should be included in the alias anchor ids.
- Ambiguous aliases may have more than one correct answer.

## Training Grounds Implementation

Gate data lives in `regions.ts`. Blind trial data lives in `learn/listeningChallenges.ts`.

Gate contract:

```ts
type GateDefinition = {
  id: GateId;
  moduleId: DescriptorModuleId;
  labelKey: string;
  summaryKey: string;
  giftCards: string[];
  firstCatch: string;
  laterUnlocks: string[];
  anchors: string[];
  challengeAnchors?: Partial<Record<string, string[]>>;
};
```

Unlocking basics writes to:

- `learnedBasicIds`
- `completedChallenges`

Spectral blind listening trials must include the cut anchor:

| Gate | Required cut anchor |
|---|---|
| `bass` | `thin` |
| `mid` | `hollow` |
| `treble` | `dull` |

The guard test is in `listeningChallenges.test.ts`.

The Dynamic Pressureflow first catch displays as `Flat`, but the descriptor id is `flat-dynamics` and its audio profile id is `flat`.

## Atlas And Region Crafting Implementation

`playableRegionContent` lives in `data/regions.ts`.

Each region content record has:

- `ingredientIds`
- `discoveryIds`

Crafting uses:

- `blendCrafting.ts`
- `recipeMatcher.ts`
- `tryRegionBlend` in `App.tsx`

Blend result statuses:

| Status | Meaning |
|---|---|
| `empty` | No active cards. |
| `unlocked` | Exact recipe and not previously unlocked. |
| `known` | Exact recipe already unlocked. |
| `overloaded` | Contains recipe ingredients plus extras. |
| `near` | Meaningful partial match. |
| `miss` | No meaningful match. |

Region shelf invariant:

- Every listed Discovery must be craftable from that region's ingredients.
- Every craftable Discovery from that region's ingredients must be listed.
- Every Discovery must have at least one valid playable region.

The guard test is in `recipeMatcher.test.ts`.

## Calibration Tower Implementation

Tower definitions currently live in `App.tsx`.

Current floors:

| Floor | Answer ids | Promotion score |
|---|---|---:|
| `floor1` | `bassy`, `vivid`, `sharp`, `empty`, `faded`, `distant` | `8` |
| `floor2` | `boomy`, `honky`, `bright`, `thin`, `hollow`, `dull` | `10` |
| `floor3` | all current spectral two-card Discovery IDs; generated ingredient-choice UI | `12` |

Floor 3 uses a separate `ingredientPair` mode. The hidden target is a two-card spectral Discovery recipe. The UI shows six basic ingredient choices: the two correct ingredients plus four spectral distractors. The player selects two ingredients; the answer is order-insensitive. Floor 3 scoring is richer than the earlier floors: two correct ingredients gives `+2`; one correct ingredient plus a same-family substitute for the missing ingredient gives `+1`; one correct ingredient plus an unrelated wrong ingredient gives `0`; no correct ingredients gives `-1`. Same-family means descriptor group plus EQ direction, such as `bass:boost` or `treble:cut`.

Score helpers:

- `towerChallengeKey`
- `towerScoreFor`
- `isTowerFloorUnlocked`

Scoring:

- Floors 1 and 2 correct: `+2`
- Floors 1 and 2 wrong: `-1`
- Floor 3 full match: `+2`
- Floor 3 one correct plus same-family substitute: `+1`
- Floor 3 one correct plus unrelated wrong: `0`
- Floor 3 no correct ingredients: `-1`
- floor: `0`

Floor unlocking is score-based. A higher floor is selectable only when previous floor scores meet their promotion target.

## Lexicon Hall Implementation

Lexicon Hall uses:

- `aliasVocabularyCards`
- `LanguageHallScreen`
- `unlockAlias`
- `AliasDetailModal`

Correct selection writes the alias id to `unlockedAliasIds` and records `languageHall.<aliasId>` in `completedChallenges`.

Each current alias has exactly one live challenge context. The UI uses that context's prompt, option ids, and answer ids.

## Collection And Dev Tools

Collection uses saved card state to render locked/unlocked cards.

Basics and Discoveries remain inspectable when locked. Locked alias tiles are disabled until unlocked.

Dev tools:

- `unlockAllBasics`
- `unlockAllDiscoveries`
- `unlockAllAliases`
- `resetProgress`

These tools are intentionally surfaced in Collection because they mutate card progress.

## Save Data And Persistence

Current save shape includes:

```ts
type SaveDataV1 = {
  schemaVersion: 1;
  locale: Locale;
  unlockedDiscoveryIds: string[];
  unlockedAliasIds: string[];
  learnedBasicIds: string[];
  completedChallenges: Record<string, number>;
  settings: {
    reducedMotion: boolean;
    intensity: number;
    preferHints: boolean;
  };
};
```

Persistence rules:

- Store locally in browser storage under `descriptor-cards-save-v1`.
- Accept only saves with `schemaVersion: 1`; parse failures, missing schema versions, and other schema versions return defaults.
- Normalize valid schema-1 progress arrays/settings and read legacy `practiceIntensity` when `settings.intensity` is absent.
- Clamp intensity to the supported range `0.5` to `2.0`.
- Treat `settings.intensity` as the Sound Lab slider value only. Training Grounds, Calibration Tower, and Atlas use the fixed default intensity for stable challenge behavior.
- Reset clears progress and app active state.

## Audio Engine

Audio is owned by `WebAudioEngine` and DSP helpers.

Core behavior:

- Start/resume audio after a user gesture.
- Select bundled track.
- Toggle flat/processed playback.
- Apply active basic descriptors.
- Scale active effects by intensity.
- Keep output safe and stable.

Spectral descriptors use EQ filter chains. Spectral EQ intensity is capped by bucket stack count, where a bucket is descriptor group plus direction: bass/mid/treble and boost/cut. This means `Boomy + Thump` at selected `200%` uses `175%` for the bass-boost bucket, `Harsh + Sibilant` uses `175%` for the treble-boost bucket, and `Boomy + Bright` can keep both filters at `200%`. Bass and treble boosts use the dedicated table `1 -> 200%`, `2 -> 175%`, `3 -> 150%`, `4 -> 125%`, and `5+ -> 100%`. Mid boosts and the fallback table currently use `1 -> 200%`, `2 -> 180%`, `3 -> 160%`, `4 -> 140%`, and `5+ -> 120%`. Dynamic, Spatial, and Integrity descriptors use module-specific profiles and visualizers.

## Visualizer Policy

The EQ curve is Spectral-specific. Do not use it as universal truth for Spatial, Dynamic, or Integrity descriptors.

Current visualizer families:

| Module | Visualizer |
|---|---|
| Spectral | EQ curve |
| Spatial | Spatial stage |
| Dynamic | Dynamic motion/lab |
| Integrity | Artifact timeline |

Blind tests should hide or neutralize visual answer clues until after submission.

## Track Policy

Reference tracks live in `data/tracks.ts` and public audio assets.

Training tracks should be stable daily references rather than dramatic region-flavor tracks. Region-flavor loops can still be used for Atlas crafting and stress tests.

## Tests And Data Guards

Important guard tests:

- unique basic, Discovery, and alias ids;
- basic ids exactly assigned through gates;
- every Training Grounds unlock target has a listening challenge;
- every Spectral blind trial includes the cut anchor;
- Discovery recipe ingredients are valid and non-conflicting;
- region Discovery shelves are craftable and exhaustive for their ingredient tray;
- alias option ids are real basic ids;
- EQ curve math remains finite;
- audio safety clamps remain valid.

Run:

```text
npm.cmd test
npm.cmd run build
```

from `web/app/`.

## Documentation Policy

The active docs are:

- this technical design document;
- `descriptor-gameplay-rules-and-concept.md`;
- the focused `app-*.md` feature docs;
- descriptor module docs for card data.

The `iteration-discussions/` folder is historical. Its decisions have been absorbed into current docs and implementation. Do not reintroduce stale iteration facts such as `Shrill` as a basic, `Bassy` as an alias, or the old Mid gift pair.
