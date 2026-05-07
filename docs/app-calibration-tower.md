# Calibration Tower

This document owns the Calibration Tower function: blind descriptor challenges, scoring, floor locks, and promotion.

## Purpose

Calibration Tower is the challenging listening mode. Training Grounds teaches the cards; Tower tests whether the player can identify hidden descriptor changes without visual or label help.

## Current Floors

| Floor | Name | Answer set | Required learned basics | Promotion score |
|---|---|---|---|---:|
| Floor 1 | Named Colors | `Bassy`, `Vivid`, `Sharp`, `Empty`, `Faded`, `Distant` | `Boomy`, `Boxy`, `Bright`, `Harsh`, `Thin`, `Hollow`, `Dull` | `8` |
| Floor 2 | Six Anchors | `Boomy`, `Honky`, `Bright`, `Thin`, `Hollow`, `Dull` | `Boomy`, `Honky`, `Bright`, `Thin`, `Hollow`, `Dull` | `10` |
| Floor 3 | Recipe Pairs | All current spectral two-card Discovery recipes; player chooses two ingredients from six visible basics | All spectral basics used by those recipes | `12` |
| Floor 4 | Recipe Triads | All current spectral three-card Discovery recipes; player chooses three ingredients from six visible basics | All spectral basics used by those recipes | `14` |
| Floor 5 | Missing Ingredient | All current spectral Discovery recipes with three or more ingredients; player completes a visible recipe by choosing one missing ingredient from six visible basics | All spectral basics used by those recipes | `16` |
| Floor 6 | Name The Discovery | All current spectral Discovery recipes with three or more ingredients; player chooses the named Discovery from six visible Discovery cards | All spectral basics used by those recipes | `18` |

Floor 1 is intentionally easier than the original six-anchor challenge because the named Discovery cards have stronger color identities.

Floor 2 is the harder six-anchor calibration layer.

Floor 3 starts ingredient recognition. It plays one hidden two-card spectral Discovery recipe, shows six basic ingredient choices, and asks the player to select the two basics that made the sound.

Floor 4 continues the same ingredient-recognition format with three-card spectral Discovery recipes. It still shows six visible basic choices, but asks the player to select the three basics that made the sound.

Floor 5 shifts from full recipe guessing to recipe completion. It plays one hidden spectral Discovery recipe, shows that recipe with one ingredient blanked out, and asks the player to choose the missing basic ingredient from six choices.

Floor 6 is the exam floor for larger Discovery identities. It plays one hidden spectral Discovery recipe with no recipe hint and asks the player to choose the named Discovery card from six visible Discovery cards.

## Floor 1 Recipes

| Answer | Hidden active basics |
|---|---|
| `Bassy` | `Boomy + Boxy` |
| `Vivid` | `Boomy + Bright` |
| `Sharp` | `Bright + Harsh` |
| `Empty` | `Thin + Hollow` |
| `Faded` | `Thin + Dull` |
| `Distant` | `Hollow + Dull` |

## Floor 2 Anchors

| Gate | Boost-ish anchor | Cut anchor |
|---|---|---|
| Bass | `Boomy` | `Thin` |
| Mid | `Honky` | `Hollow` |
| Treble | `Bright` | `Dull` |

## Floor 3 Recipe Pair Targets

Floor 3 target selection uses every current two-card Discovery recipe whose ingredients are both spectral basics:

`Powerful`, `Impactful`, `Shimmering`, `Tinny`, `Spitty`, `Metallic`, `Aggressive`, `Sharp`, `Crisp`, `Scooped`, `Distant`, `Lean`, `Empty`, `Faded`, `Full`, `Thick`, `Bassy`, `Vivid`, `Bloated`, `Muffled`, `Mellow`, `Chesty`, `Cupped`, `Pinched`, `Tubular`, `Brassy`, and `Cloudy`.

For each trial, the answer pool is generated dynamically:

- the two correct ingredient basics;
- four distractor basics sampled from the same spectral ingredient universe;
- six total visible choices;
- answer is submitted automatically when two ingredients are selected.

## Floor 4 Recipe Triad Targets

Floor 4 target selection uses every current three-card Discovery recipe whose ingredients are all spectral basics:

`Canned`, `Reedy`, `Brittle`, `Cold`, `Woolly`, `Fatiguing`, `Veiled`, `Energetic`, and `Vintage`.

For each trial, the answer pool is generated dynamically:

- the three correct ingredient basics;
- three distractor basics sampled from the same spectral ingredient universe;
- six total visible choices;
- answer is submitted automatically when three ingredients are selected.

## Floor 5 Missing Ingredient Targets

Floor 5 target selection uses every current spectral Discovery recipe with three or more basic ingredients:

`Canned`, `Reedy`, `Brittle`, `Cold`, `Woolly`, `Fatiguing`, `Veiled`, `Energetic`, `Vintage`, `Plasticky`, `Congested`, `Exciting`, `Piercing`, and `Buried`.

For each trial, the answer pool is generated dynamically:

- one hidden target recipe;
- one randomly blanked ingredient from that recipe;
- five distractor basics sampled from the same spectral ingredient universe, excluding the other ingredients already shown in the visible recipe;
- six total visible choices;
- answer is submitted immediately when one ingredient is selected.

## Floor 6 Discovery Naming Targets

Floor 6 target selection uses the same larger Discovery pool as Floor 5:

`Canned`, `Reedy`, `Brittle`, `Cold`, `Woolly`, `Fatiguing`, `Veiled`, `Energetic`, `Vintage`, `Plasticky`, `Congested`, `Exciting`, `Piercing`, and `Buried`.

For each trial, the answer pool is generated dynamically:

- one hidden target Discovery;
- five distractor Discovery cards sampled from the same larger spectral Discovery pool;
- six total visible Discovery choices;
- answer is submitted immediately when one Discovery card is selected.

## Scoring

Tower scoring is point-based:

- Floors 1 and 2 correct answer: `+2`
- Floors 1 and 2 wrong answer: `-1`
- Floor 3 two correct ingredients: `+2`
- Floor 3 one correct ingredient plus one same-family substitute for the missing ingredient: `+1`
- Floor 3 one correct ingredient plus one unrelated wrong ingredient: `0`
- Floor 3 no correct ingredients: `-1`
- Floor 4 three correct ingredients: `+2`
- Floor 4 two correct ingredients plus one same-family substitute for the missing ingredient: `+1`
- Floor 4 two correct ingredients plus one unrelated wrong ingredient: `0`
- Floor 4 one or zero correct ingredients: `-1`
- Floor 5 correct missing ingredient: `+2`
- Floor 5 same-family substitute for the missing ingredient: `+1`
- Floor 5 unrelated wrong ingredient: `-1`
- Floor 6 correct Discovery name: `+2`
- Floor 6 wrong Discovery that shares at least two basic ingredients with the target: `+1`
- Floor 6 wrong Discovery from the same Atlas region only: `0`
- Floor 6 unrelated wrong Discovery: `-1`
- Minimum score: `0`

For ingredient floors, "same family" means the same spectral group and EQ direction, such as `bass:boost`, `mid:cut`, or `treble:boost`.

Promotion uses score, not raw correct count. Floor 2 is locked until Floor 1 reaches its promotion score. Floor 3 is locked until Floor 2 reaches its promotion score. Floor 4 is locked until Floor 3 reaches its promotion score. Floor 5 is locked until Floor 4 reaches its promotion score. Floor 6 is locked until Floor 5 reaches its promotion score. Future floors should follow the same rule: a floor unlocks only when all earlier floors satisfy their promotion score.

The app still records attempts and correct counts for progress display and future diagnostics.

For backward compatibility, if `completedChallenges["tower.<floor>.score"]` is absent, the app reads the score as `tower.<floor>.correct * 2`.

## Challenge Flow

1. The floor selects a hidden target from the floor answer set.
2. The player plays the hidden processed sound.
3. Answer cards become available only after the hidden sound has been played.
4. The player chooses one answer card on Floors 1 and 2, two ingredient cards on Floor 3, three ingredient cards on Floor 4, one missing ingredient on Floor 5, or one Discovery card on Floor 6.
5. The Tower reveals the correct answer and analysis.
6. The primary action becomes `Next sound`, which starts the next hidden trial.
7. The player may replay the revealed answer after feedback.

Target selection avoids repeating the previous target when possible. `Next sound` immediately creates and plays the next hidden trial.

Tower challenge actions replace the standard `Play` button inside the shared Audio Controls surface. The Tower action row always keeps three stable slots: `Play hidden sound` / `Replay answer`, `Pause`, and `Next sound`. Unavailable actions stay visible but disabled. Before an answer, the first slot stays labeled `Play hidden sound` even after replaying; `Next sound` is disabled. After an answer, `Replay answer` and `Next sound` are enabled. `Next sound` uses a forward/skip icon, not a refresh icon. The regular intensity slider and `Clear` sound button are hidden in Tower.

## Unlock Prerequisites

Each floor also requires its underlying basic cards to be learned in Training Grounds. If required basics are missing, the floor shows a locked panel and points the player back to Training Grounds.

## Details Included

Tower details are intentionally focused on answer calibration:

- Floor tabs show floor status and promotion progress.
- The side rail below the visualizer shows the current score, attempts, correct count, promotion target, listening instruction text, and latest answer feedback.
- Floor 1 answer feedback in the side rail reveals the Discovery recipe after the answer: `Bassy = Boomy + Boxy`, `Vivid = Boomy + Bright`, `Sharp = Bright + Harsh`, `Empty = Thin + Hollow`, `Faded = Thin + Dull`, and `Distant = Hollow + Dull`.
- Floor 2 answer feedback in the side rail reveals the gate, boost/cut direction, and territory for `Boomy`, `Thin`, `Honky`, `Hollow`, `Bright`, and `Dull`.
- Ingredient-floor answer feedback reveals the named Discovery target with its icon and correct basic ingredients.
- The Tower does not unlock cards directly; it writes score, attempts, and correct counts into `completedChallenges`.
- The Tower keeps the shared Audio Controls side rail visible, including flat/processed reference controls and track choice.
- The main Tower surface is kept compact: it shows the floor selector, answer grid, locked prerequisite panel when needed, and answer-card highlighting after an answer.

## Implementation References

- Tower definitions: `web/app/src/app/App.tsx`
- Score helpers: `towerScoreFor`, `isTowerFloorUnlocked`
- Answer handling: `chooseTowerAnswer`
- UI: `CalibrationTowerScreen`
- Product rationale: `descriptor-golden-ear-absolute-scale-research.md`
