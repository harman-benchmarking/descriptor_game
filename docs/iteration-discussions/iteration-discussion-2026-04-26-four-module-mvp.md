# Four-Module MVP Expansion Discussion

This document defines the MVP direction for expanding the game beyond Spectral descriptors into four modules:

- `Spectral`
- `Spatial`
- `Dynamic`
- `Integrity`

The goal is to make the game architecture broad enough for all four descriptor families without overbuilding every module at once.

## Core Decision

The game should use a four-continent world structure.

| Continent | Listening domain | Main question |
|---|---|---|
| `Spectral` | Tone and frequency balance | What frequency energy changed? |
| `Spatial` | Image, width, depth, room | Where is the sound and how large is the scene? |
| `Dynamic` | Attack, recovery, compression, headroom | How does the sound move over time? |
| `Integrity` | Noise, defects, faults, artifacts | What unwanted sound or failure is present? |

Recommended MVP region prompt sets:

| Module | Keep aspect name | Internal atlas regions |
|---|---|---|
| `Spectral` | `Spectral` | `Thunderstep Highlands`, `Emberbody Valley`, `Resonance Canyons`, `Masking Mire`, `Frosthollow Expanse`, `Scoopshine Basin`, `Glassedge Spires` |
| `Spatial` | `Spatial` | `Anchorpoint Stage`, `Echoreach Halls`, future `Farspan Isles` |
| `Dynamic` | `Dynamic` | `Snapback Springs`, `Pressureflow Basin`, `Ceilingbreak Spires` |
| `Integrity` | `Integrity` | `Staticveil Fen`, `Glitchgap Rift`, `Rattleforge Yards` |

Each continent has its own Learn gates and its own atlas.

Important rule:

- Completing a module's Learn gates unlocks that module's atlas.
- The player should not need to complete all four modules before entering any atlas.

This keeps the game open and prevents the four-module structure from becoming a giant tutorial wall.

## World Flow

Recommended top-level flow:

```text
World Atlas
  |
  +-- Spectral Continent
  |     +-- Spectral Learn Gates
  |     +-- Spectral Atlas
  |
  +-- Spatial Continent
  |     +-- Spatial Learn Gates
  |     +-- Spatial Atlas
  |
  +-- Dynamic Continent
  |     +-- Dynamic Learn Gates
  |     +-- Dynamic Atlas
  |
  +-- Integrity Continent
        +-- Integrity Learn Gates
        +-- Integrity Atlas
```

The current `Learn` screen should eventually become a module-selectable Learn system.

The current `Spectral` screen should eventually become either:

- a selected continent atlas screen, or
- one entry inside a larger `World Atlas` screen.

My recommendation:

- Keep the current top nav simple for now.
- Rename/reshape screens gradually:
  - `Learn` becomes module-aware.
  - `Spectral` becomes the first implemented continent atlas.
  - Add `World Atlas` only when at least two modules have usable MVP content.

## Universal Module Pattern

Every module should follow the same high-level pattern:

1. The player enters a module.
2. The module shows 2 to 3 Learn gates.
3. Gates teach basic descriptor cards through guided listening.
4. Basic cards unlock through blind listening tests.
5. Completing all gates in that module unlocks that module's atlas.
6. The atlas shows regions for that module.
7. Regions focus on discovery crafting, recipes, and meaning.
8. Review Lab later handles cross-module blind practice and mastery.

This keeps implementation generic:

```ts
type DescriptorModuleId = "spectral" | "spatial" | "dynamic" | "integrity";

type DescriptorModuleDefinition = {
  id: DescriptorModuleId;
  labelKey: string;
  summaryKey: string;
  gateIds: string[];
  regionIds: string[];
};
```

## Learn Gate MVP

Learn gates should be data-driven across all four modules.

```ts
type LearnGateDefinition = {
  id: string;
  moduleId: DescriptorModuleId;
  labelKey: string;
  summaryKey: string;
  giftCards: string[];
  firstCatch: string;
  laterUnlocks: string[];
  anchors: string[];
};
```

The blind listening test can also be shared:

```ts
type ListeningChallengeDefinition = {
  moduleId: DescriptorModuleId;
  gateId: string;
  targetId: string;
  confuserIds: string[];
  promptKey: string;
  correctHintKey: string;
  wrongHintKeys: Record<string, string>;
  unlockThreshold: number;
};
```

This means the UI can stay mostly the same while the content and DSP profiles change by module.

## Atlas MVP

Each module should have one atlas screen with regions.

The atlas is not the same as Learn:

| Area | Purpose |
|---|---|
| `Learn gates` | Teach and test basic descriptor recognition |
| `Atlas regions` | Let the player craft discovery cards from known basics |
| `Review Lab` | Later mixed blind practice, mastery, and weak-card review |

The atlas page should feel like choosing a place.

The region page should feel like entering that place and using sound tools.

Recommended atlas rule:

- Top-level atlas shows regions only.
- Playback tools, active cards, and curve views appear after entering a region.

This matches the current Spectral Atlas decision.

## Proposed Module Breakdown

### Spectral Module

Status: current MVP focus.

Learn gates:

| Gate | Gift pair | First catch | Later unlocks |
|---|---|---|---|
| `Bass Gate` | `Rumble`, `Thin` | `Thump` | `Boomy`, `Punchy`, `Muddy` |
| `Mid Gate` | `Warm`, `Hollow` | `Boxy` | `Honky`, `Nasal`, `Shouty` |
| `Treble Gate` | `Bright`, `Dull` | `Harsh` | `Sibilant`, `Shrill`, `Airy` |

Atlas regions:

| Region | Theme |
|---|---|
| `Thunderstep Highlands` | impact, energy, spark |
| `Emberbody Valley` | fullness, warmth, mellow body |
| `Resonance Canyons` | boxy, cupped, canned color |
| `Masking Mire` | congestion, masking, burial |
| `Frosthollow Expanse` | hollow, distant, cold space |
| `Scoopshine Basin` | smile curve, crispness, hype |
| `Glassedge Spires` | harshness, bite, fatigue |

Runtime DSP:

- Web Audio `BiquadFilterNode` EQ filters.
- Existing curve rendering.
- Fully TypeScript for runtime.

### Spatial Module

Status: feasible for MVP, but needs stereo-focused track material.

Implemented Learn gates:

| Gate | Basic cards |
|---|---|
| `Position Gate` | `Left`, `Right`, `Centered`, `Near`, `Far` |
| `Image Gate` | `Focused`, `Blurred`, `Wide`, `Narrow`, `Dry`, `Reverberant` |

Gate names are physical/listening-control categories. Atlas region names stay separate because regions describe descriptor chemistry and discovery relationships.

`Separated` and `Crowded` are kept as future Spatial vocabulary, not active MVP basics. As single global DSP effects, they collapse into `Wide` and `Narrow`; they need multi-source or stem-like training material.

Atlas regions:

Image prompts should be attached to the three Spatial regions below, not to a renamed top-level continent.

| Region | Theme |
|---|---|
| `Anchorpoint Stage` | placement and image clarity |
| `Echoreach Halls` | closeness, distance, room, reflection |
| `Farspan Isles` | future scene size and spacing between parts |

Runtime DSP:

- Stereo panning for `Left`, `Right`, `Centered`.
- Mid/side gain or channel split/merge for `Wide` and `Narrow`.
- Convolver or delay/reverb send for `Dry` and `Reverberant`.
- Gain, filtering, and early reflection balance for `Near` and `Far`.
- Multi-source or stem-like scenes later for `Separated` and `Crowded`.

MVP caution:

- Spatial tests should use headphones as the recommended mode.
- Some spatial cues collapse on mono speakers.
- The app should warn the user when a spatial challenge is unreliable without stereo playback.

### Dynamic Module

Status: feasible for MVP, but needs careful loudness matching.

Current MVP Learn gates:

| Gate | Gift pair | First catch | Later unlocks |
|---|---|---|---|
| `Snapback Gate` | `Snappy`, `Softened` | `Loose` | `Tight` |
| `Pressureflow Gate` | `Compressed`, `Pumping` | `Flat` | `Clipped`, `Distorted` |

The earlier three-gate shape still maps well to the atlas regions, but `Overload And Headroom Gate` is too small for MVP Learn until `Lively`, `Constrained`, or `Strained` are promoted from later vocabulary.

Atlas regions:

Image prompts should be attached to the three Dynamic regions below, not to a renamed top-level continent.

| Region | Theme |
|---|---|
| `Snapback Springs` | how hits start, stop, and reset |
| `Pressureflow Basin` | density, gain reduction, pumping, flattening |
| `Ceilingbreak Spires` | clean headroom, overload, clipping, distortion |

Runtime DSP:

- `DynamicsCompressorNode` profiles for compression, density, squashing, pumping-like behavior.
- Gain automation or sidechain-like simulation for pumping and breathing.
- Transient shaping may need `AudioWorkletNode` later.
- `WaveShaperNode` for clipping, distortion, and overdrive.
- Conservative output trimming and loudness matching are mandatory.

MVP caution:

- Loudness can cheat the test. Louder often sounds better or more obvious.
- Dynamic examples should be level-matched as much as possible.
- Start with obvious practice intensity, then reduce intensity for mastery later.

### Integrity Module

Status: feasible for MVP, with a mix of synthetic defects and curated samples.

Possible Learn gates:

| Gate | Basic cards |
|---|---|
| `Noise And Interference Gate` | `Hiss`, `Static`, `Hum`, `Buzz`, `Whine`, `Dirty` |
| `Intermittent Defects Gate` | `Click`, `Pop`, `Crackle`, `Dropout` |
| `Mechanical Faults Gate` | `Rattle`, `Squeak`, `Rub Buzz` |

Atlas regions:

Image prompts should be attached to the three Integrity regions below, not to a renamed top-level continent.

| Region | Theme |
|---|---|
| `Staticveil Fen` | broadband noise, tonal interference, contamination |
| `Glitchgap Rift` | short events, gaps, unstable contact |
| `Rattleforge Yards` | physical vibration, squeak, driver rub |

Runtime DSP:

- Noise generators for `Hiss`, `Static`, and dirty contamination.
- Oscillators plus harmonics for `Hum`, `Buzz`, and `Whine`.
- Scheduled impulse events for `Click`, `Pop`, and `Crackle`.
- Gain drop automation for `Dropout`.
- Curated or synthetic samples for `Rattle`, `Squeak`, and `Rub Buzz`.

MVP caution:

- Integrity sounds can become annoying quickly.
- Keep examples short and carefully gain-limited.
- Some mechanical faults may be better as bundled samples than pure synthesis.

## Can One Learn-Test System Apply To All Four?

Yes.

The same blind A/B/C listening test can apply to all four modules if each descriptor has:

- a module ID,
- a DSP or sample profile,
- curated confusers,
- prompt text,
- feedback text,
- unlock threshold,
- optional playback requirements.

Extra module-specific requirements:

| Module | Special requirement |
|---|---|
| `Spectral` | EQ curve may reveal the answer, so hide it during stricter tests. |
| `Spatial` | Stereo/headphone check should be recommended. |
| `Dynamic` | Loudness matching is required. |
| `Integrity` | Defect intensity must be safe and not irritating. |

## Save Data Implications

The current save model should evolve from one global basic-card list into module-aware progress.

Possible shape:

```ts
type ModuleProgress = {
  learnedBasicIds: string[];
  unlockedDiscoveryIds: string[];
  completedChallenges: Record<string, number>;
  atlasUnlocked: boolean;
};

type SaveDataV2 = {
  version: 2;
  locale: Locale;
  modules: Record<DescriptorModuleId, ModuleProgress>;
  settings: {
    practiceIntensity: number;
    ratingIntensity: number;
  };
};
```

Migration idea:

- Existing learned Spectral basics move into `modules.spectral.learnedBasicIds`.
- Existing Spectral discoveries move into `modules.spectral.unlockedDiscoveryIds`.
- Other modules start empty.

## Navigation Implications

Near-term MVP navigation:

| Nav item | Meaning |
|---|---|
| `Learn` | module-aware Learn gates |
| `Atlas` or `World` | continent selector or currently selected module atlas |
| `Collection` | cards grouped by module |
| `Sandbox` | free-play tools, eventually module-filtered |
| `Settings` | locale, intensity, reset |

Short-term implementation recommendation:

- Keep `Learn`, `Spectral`, `Collection`, `Sandbox`, `Settings`.
- Add module selection inside `Learn`.
- Add other module data gradually.
- Rename `Spectral` to `Atlas` only when there is at least one more playable module.

Reason:

- Renaming too early may make the app feel bigger than it currently is.
- Keeping `Spectral` visible is honest while it is the only playable atlas.

## Collection Implications

Collection should be grouped by module:

```text
Collection
  Spectral
    Basics
    Discoveries
  Spatial
    Basics
    Discoveries
  Dynamic
    Basics
    Discoveries
  Integrity
    Basics
    Discoveries
```

MVP behavior:

- Show all four modules as tabs or sections.
- Locked/unimplemented modules can show planning placeholders.
- Do not mix all descriptor cards into one giant flat grid once the four-module vocabulary grows.

## MVP Implementation Phases

### Phase 1: Data Architecture

Goal: make the current Spectral MVP module-aware without changing the player experience too much.

Tasks:

1. Add `moduleId` to descriptor cards.
2. Add `moduleId` to discovery cards.
3. Add module definitions.
4. Move Spectral gates into generic gate definitions.
5. Move Spectral regions into module-aware region definitions.
6. Prepare save data migration to module progress.

Acceptance:

- Current Spectral game still works.
- The code no longer assumes every card belongs to one global Spectral set.

### Phase 2: Module-Aware Learn

Goal: prepare Learn for four modules.

Tasks:

1. Add module selector inside Learn.
2. Show Spectral gates under Spectral.
3. Add placeholder gates for Spatial, Dynamic, and Integrity.
4. Implement blind A/B/C challenge as a generic component.
5. Use Spectral as the first live data set.

Acceptance:

- The user can see four Learn modules.
- Only Spectral needs to be fully playable at first.
- The challenge component is not hardcoded to Spectral.

### Phase 3: Module Atlas Model

Goal: create the atlas structure that can scale to four continents.

Tasks:

1. Rename internal `region` route concepts to module atlas concepts.
2. Keep the current Spectral Atlas UI.
3. Add locked placeholder cards for Spatial, Dynamic, and Integrity continents.
4. Allow a module atlas to unlock independently when its Learn gates are completed.

Acceptance:

- Spectral Atlas behaves as it does now.
- The architecture can represent four continents.
- Other continents can exist as visible roadmap placeholders.

### Phase 4: First Non-Spectral Prototype

Goal: prove the shared system works outside EQ.

Implementation status as of 2026-04-27:

- `Anchorpoint Stage` is the first non-Spectral atlas slice brought online.
- It uses `Left`, `Right`, `Centered`, `Focused`, and `Blurred` as its first region card set.
- It should open from the atlas when the Spatial Learn module basics are completed, independent from Spectral completion.

Recommended first candidate: `Integrity`.

Reason:

- Hiss, hum, click, pop, crackle, and dropout are easy to synthesize clearly.
- The descriptors are obvious enough to validate the generic Learn-test system.
- It does not require advanced stereo or compression calibration.

Alternative candidate: `Spatial Position`.

Reason:

- Left, right, centered are very intuitive.
- But headphone/stereo reliability needs more UI care.

My recommendation:

- Prototype Integrity first for technical reliability.
- Prototype Spatial second for game feel and world fantasy.
- Prototype Dynamic after loudness-matching rules are stronger.

## MVP Non-Goals

Do not attempt these in the first four-module MVP:

- Full content for every region in every module.
- Complete card art for every future descriptor.
- Perfect dynamic/transient DSP.
- Advanced HRTF or head tracking.
- Full cross-module recipe system.
- Backend or Python runtime.
- A giant world map with all regions fully playable.

The MVP should prove the architecture, not finish the whole game.

## Key Product Risk

The main risk is making the game feel too large before the player has a strong first loop.

Countermeasure:

- Keep Spectral polished.
- Add the four-continent structure as a visible roadmap.
- Make only one small slice of a second module playable first.
- Avoid presenting dozens of locked cards as chores.

## My Preferred Direction

My preferred MVP direction:

1. Keep Spectral as the polished first continent.
2. Make Learn module-aware.
3. Implement the blind A/B/C test generically.
4. Convert current data to module-aware structures.
5. Add placeholder Spatial, Dynamic, and Integrity Learn modules.
6. Add placeholder continents in the future World Atlas.
7. Build one tiny Integrity prototype gate to prove non-Spectral descriptors.
8. Then decide whether Spatial or Dynamic should be the second full continent.

This gives the project a big-world shape without forcing the whole world to be finished immediately.

## Open Questions

1. Should the top nav eventually say `Atlas`, `World`, or keep the active module name?
2. Should each module have exactly 3 gates, or can the number vary?
3. Should Spectral remain the only module with 7 atlas regions?
4. Should the first non-Spectral playable prototype be Integrity or Spatial?
5. Should module completion require all basics only, or also a few mastery checks?
6. Should the four continents share one visual map, or each have its own continent page?
7. Should Collection show future unimplemented modules, or only modules with playable content?

## Current Answer Candidate

Recommended current answers:

- Use `Learn` as a module-aware screen.
- Keep `Spectral` in top nav until another module has playable content.
- Let gate counts vary by module, but start with 3 gates each.
- Let atlas region counts vary by module.
- Unlock each module atlas independently.
- Use one shared blind-test system across all four modules.
- Build Integrity as the first non-Spectral technical prototype.
- Introduce a true `World Atlas` only when at least two continents have playable content.
