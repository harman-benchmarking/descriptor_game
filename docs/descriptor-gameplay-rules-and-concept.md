# Descriptor Gameplay Rules And Concept

This is the player-facing source of truth for Descriptor Playground. It absorbs the active decisions from the iteration discussion notes and describes the current app as a set of connected play functions.

## Core Game Idea

Descriptor Playground is a listening game about turning audio descriptors into playable cards.

- Basic descriptor cards are the player's verbs.
- Discovery cards are named recipes built from basics.
- Alias cards connect daily-life listening words to stable descriptor anchors.
- Training Grounds teaches the vocabulary.
- Atlas regions let the player craft meaningful sound identities.
- Calibration Tower tests blind recognition with score-based promotion.
- Sound Lab lets the player freely experiment with learned cards.
- Collection records progress and provides internal dev shortcuts.

Listening is always the truth test. Visuals, curves, icons, and card art help the player remember what they heard, but they should not replace hearing.

## Current World Structure

The app is organized as a campus:

| Function | Player role |
|---|---|
| Campus | Main hub for the main buildings and top-level navigation. |
| Orientation Center | Directory that explains the app functions. |
| Training Grounds | Learn basic descriptor cards through gate practice. |
| Atlas | Explore regions and craft Discovery recipes. |
| Calibration Tower | Identify hidden descriptor changes under score pressure. |
| Lexicon Hall | Unlock alias words by mapping them to descriptor anchors. |
| Sound Lab | Freely mix learned basics and inspect visual feedback. |
| Collection | Browse basics, Discoveries, aliases, and dev unlock tools. |
| Settings | Language, intensity, and reset. |

The app should feel explorable, not like a forced linear course. Prerequisites should exist only where they protect fairness.

## Training Grounds

Training Grounds teaches basics by module and gate.

Each gate has:

- a gift pair that is claimed without a quiz;
- a first catch;
- later unlock targets;
- blind or visible-choice practice depending on the gate.

Current implemented gates:

| Module | Gate | Gift pair | First catch | Later unlocks |
|---|---|---|---|---|
| Spectral | Bass Gate | `Boomy`, `Thin` | `Thump` | `Rumble`, `Punchy`, `Muddy` |
| Spectral | Mid Gate | `Hollow`, `Boxy` | `Honky` | `Warm`, `Nasal`, `Shouty` |
| Spectral | Treble Gate | `Bright`, `Dull` | `Harsh` | `Sibilant`, `Glassy`, `Airy` |
| Spatial | Position Gate | `Left`, `Right` | `Centered` | `Near`, `Far` |
| Spatial | Image Gate | `Focused`, `Blurred` | `Wide` | `Narrow`, `Dry`, `Reverberant` |
| Dynamic | Snapback Gate | `Tight`, `Loose` | `Softened` | `Snappy` |
| Dynamic | Pressureflow Gate | `Compressed`, `Pumping` | `Flat` (`flat-dynamics`) | `Clipped`, `Distorted` |
| Integrity | Contamination Gate | `Hiss`, `Hum` | `Static` | `Buzz`, `Whine`, `Dirty` |
| Integrity | Glitch Gate | `Click`, `Dropout` | `Pop` | `Crackle`, `Squeak` |

### Spectral Cut-Anchor Rule

Every Spectral Training Grounds blind trial must include the gate's cut anchor among the three choices:

| Gate | Required cut anchor |
|---|---|
| Bass | `Thin` |
| Mid | `Hollow` |
| Treble | `Dull` |

This keeps the trial focused on both frequency area and direction. The player should not only learn "where is it?" but also "was energy added or removed?"

## Atlas And Region Crafting

The Atlas is a region map. Regions are visible early and become enterable when the player has learned the basics for that module.

Regions should focus on crafting and meaning, not repeated exams. The Training Grounds teach basic cards; regions ask the player to combine them into recognizable sound identities.

Current region rule:

- Region pages show an ingredient tray of basic cards.
- Region pages show a Discovery shelf.
- If a Discovery recipe can be crafted from a region's ingredient tray, it should appear on that region's shelf.
- Every Discovery card must have at least one playable region where its ingredients are available.

Important current Discovery placement:

- `Bassy = Boomy + Boxy` and belongs in Emberbody Valley.
- `Bassy` also appears in Masking Mire because that region can craft it.
- `Empty = Thin + Hollow`, `Faded = Thin + Dull`, and `Distant = Hollow + Dull` belong in Frosthollow Expanse.
- Glassedge Spires also lists `Scooped`, `Empty`, and `Cold` because its ingredient tray can craft them.

## Calibration Tower

Calibration Tower is the expert listening module. It begins after Training Grounds has created enough vocabulary.

Current floors:

| Floor | Name | Answer set | Promotion score |
|---|---|---|---:|
| Floor 1 | Named Colors | `Bassy`, `Vivid`, `Sharp`, `Empty`, `Faded`, `Distant` | `8` |
| Floor 2 | Six Anchors | `Boomy`, `Honky`, `Bright`, `Thin`, `Hollow`, `Dull` | `10` |
| Floor 3 | Recipe Pairs | Hidden two-card spectral Discovery; choose the two basic ingredients from six choices | `12` |

Scoring:

- correct: `+2`
- wrong: `-1`
- minimum: `0`

Higher floors unlock only when previous floor score requirements are satisfied. Attempts and correct counts remain useful stats, but promotion is score-based.

Floor 1 was moved before Floor 2 because the named Discovery colors are easier to recognize than the raw six-anchor challenge.

Floor 3 turns the task from naming to recipe anatomy. The hidden sound is one current spectral two-card Discovery recipe. The player sees six possible basic ingredients and must select the two that created the target.

Floor 3 also uses partial-credit scoring: two correct ingredients gives `+2`; one correct ingredient plus a same-family substitute for the missing ingredient gives `+1`; one correct plus an unrelated wrong ingredient gives `0`; no correct ingredients gives `-1`. Same-family means group plus EQ direction, such as `bass:boost`.

## Lexicon Hall

Lexicon Hall teaches alias language. Alias cards are not new audio recipes. They are language bridges from casual terms to stable descriptor anchors.

Rules:

- Each alias has anchor descriptor ids.
- The player chooses from descriptor options.
- Correct selection unlocks the alias card.
- Unlearned answers may appear visually locked, but they remain selectable so the alias is never impossible.
- `Bassy` is not an alias. It is a Discovery card.
- `Electrical` is the current ambiguous alias example and accepts `Hum` or `Buzz`.

## Sound Lab

Sound Lab is the free experiment surface:

- It shows learned basics only.
- It allows multiple active basics.
- It intentionally allows conflicting basics to coexist for experimentation.
- It exposes module visualizers and active-card feedback without writing new unlock progress.

This is where the player can use the vocabulary as a toy, not as a test.

## Collection

Collection records:

- learned basic cards;
- unlocked Discovery cards;
- unlocked alias cards.

It also holds internal dev unlock buttons:

- unlock all basics;
- unlock all discoveries;
- unlock all aliases;
- wipe save.

These buttons are iteration tools and should not be treated as player progression.

## Absorbed Iteration Decisions

The active decisions from `docs/iteration-discussions/` are now folded into the current docs:

| Iteration topic | Current absorbed decision |
|---|---|
| Four-module MVP | The app has Spectral, Spatial, Dynamic, and Integrity modules with shared gate structure. |
| True listening test | Blind A/B/C practice hides labels until answer and hides answer-preview visuals. |
| Module-specific visualizers | EQ curve is Spectral-only; Spatial, Dynamic, and Integrity have dedicated visualizers. |
| Spatial/Dynamic/Integrity feasibility | Runtime stays Web Audio/TypeScript; advanced DSP can wait. |
| Dynamic SVG visualizer | Dynamic visual feedback separates compression, flatness, clipping, and pumping. |
| Alias vocabulary hall | Alias vocabulary is a separate Lexicon Hall; `Bassy` is Discovery-only. |
| Learn gate track plan | Daily reference tracks support gates; region-flavor tracks are not the default Learn baseline. |
| Shrill to Glassy | `Glassy` is the Treble basic; `Shrill` remains an alias for `Sibilant`. |
| Golden Ear research | Calibration Tower is the expert module with score-based floor promotion. |

Iteration discussion files are historical. If they conflict with this document, the feature docs, or implemented data, this document wins.

## Current Design Direction

The strongest direction is:

1. Teach basic descriptors in Training Grounds.
2. Let players craft Discovery identities in Atlas regions.
3. Let players practice expert blind recognition in Calibration Tower.
4. Let players connect casual words to anchors in Lexicon Hall.
5. Keep Sound Lab open for experimentation.
6. Keep Collection as the memory of all earned vocabulary.

The game should stay descriptor-first, ear-first, and playful enough that technical EQ learning feels like a consequence of curiosity rather than a lecture.
