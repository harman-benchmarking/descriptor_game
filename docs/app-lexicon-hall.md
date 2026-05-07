# Lexicon Hall

This document owns Lexicon Hall and alias-card unlocking.

## Purpose

Lexicon Hall teaches daily-life listening words that point toward stable descriptor anchors. Alias cards do not create new audio recipes; they help players translate informal language into the existing descriptor system.

## Alias Card Rule

An alias card has:

- `id`
- player-facing `label`
- `moduleId`
- `kind`: `single_anchor` or `ambiguous`
- `anchorIds`
- one current live challenge context
- answer options that are basic descriptor ids

`Bassy` is not an alias card. It is a Discovery card: `Boomy + Boxy -> Bassy`.

The player-facing function name is Lexicon Hall. The current implementation still uses internal names such as `languageHall`, `LanguageHallScreen`, and `completedChallenges["languageHall.<aliasId>"]`.

## Current Alias Challenges

| Alias | Module | Kind | Anchor(s) | Prompt | Accepted answer(s) | Options |
|---|---|---|---|---|---|---|
| `Droning` | Spectral | single anchor | `Rumble` | The low end keeps rolling underneath the music. | `Rumble` | `Thump`, `Rumble`, `Punchy`, `Boomy` |
| `Lacking` | Spectral | single anchor | `Hollow` | The sound feels empty in the middle, like the body has been scooped out. | `Hollow` | `Thin`, `Dull`, `Hollow`, `Softened` |
| `Weak` | Spectral | single anchor | `Thin` | The sound lacks weight and cannot push forward. | `Thin` | `Softened`, `Flat` (`flat-dynamics`), `Thin`, `Hollow` |
| `Colored` | Spectral | single anchor | `Honky` | Voices sound tinted by a cup-like midrange color. | `Honky` | `Boxy`, `Nasal`, `Warm`, `Honky` |
| `Presence` | Spectral | single anchor | `Shouty` | The vocal steps forward and becomes more immediate. | `Shouty` | `Bright`, `Sibilant`, `Shouty`, `Harsh` |
| `Dark` | Spectral | single anchor | `Dull` | Cymbals and small details lose light at the top. | `Dull` | `Hollow`, `Dull`, `Muddy`, `Warm` |
| `Lightweight` | Spectral | single anchor | `Thin` | The sound feels papery and underfilled, like it cannot hold much weight. | `Thin` | `Hollow`, `Thin`, `Softened`, `Dull` |
| `Edgy` | Spectral | single anchor | `Harsh` | Guitars and vocals have a rough upper edge that starts to feel uncomfortable. | `Harsh` | `Sibilant`, `Harsh`, `Shouty`, `Bright` |
| `Shrill` | Spectral | single anchor | `Sibilant` | The high edge feels painfully hissy and piercing on consonants. | `Sibilant` | `Glassy`, `Sibilant`, `Harsh`, `Bright` |
| `Shiny` | Spectral | single anchor | `Bright` | Cymbals and vocal details catch extra glossy light at the top. | `Bright` | `Airy`, `Bright`, `Sibilant`, `Harsh` |
| `Extended` | Spectral | single anchor | `Airy` | The very top seems to reach upward, with breath and cymbal tails floating above the mix. | `Airy` | `Bright`, `Glassy`, `Airy`, `Sibilant` |
| `Anechoic` | Spatial | single anchor | `Dry` | A voice sounds close and reflection-free, with notes stopping almost immediately. | `Dry` | `Near`, `Dry`, `Centered`, `Reverberant` |
| `Echoey` | Spatial | single anchor | `Reverberant` | A clap keeps coming back from the room after the source has stopped. | `Reverberant` | `Wide`, `Far`, `Dry`, `Reverberant` |
| `Electrical` | Integrity | ambiguous | `Hum`, `Buzz` | A powered-on tone or vibration sits under the music and feels separate from the song. | `Hum`, `Buzz` | `Hiss`, `Hum`, `Buzz`, `Static` |
| `Burst` | Integrity | single anchor | `Pop` | One rounded fault jumps out during a quiet gap, bigger than a tiny click but still just one moment. | `Pop` | `Click`, `Pop`, `Crackle`, `Dropout` |

## Challenge Flow

1. The player opens an alias card.
2. The prompt describes a real listening-language situation.
3. The player chooses from four descriptor anchors.
4. If the selected anchor is accepted, the alias unlocks.
5. The unlocked alias appears in Collection and can be inspected.

Unlearned anchor options are visually locked, but they remain selectable. This keeps Lexicon Hall from becoming impossible because of a missing prerequisite.

## Ambiguous Alias Rule

Ambiguous aliases can accept more than one correct anchor. The current live example is:

| Alias | Accepted anchors |
|---|---|
| `Electrical` | `Hum`, `Buzz` |

## Details Included

Unlocked alias cards show their icon and summary in Collection. Locked alias cards show a locked placeholder and cannot open their detail modal.

Alias detail modals show the alias icon, summary, language-example prompt, and anchor cards. They do not currently show the answer option ids or explanations after unlock; those details live in `aliasVocabulary.ts` and are documented in the challenge table above.

Lexicon Hall challenge cards include:

- the alias label;
- the current prompt;
- four answer options by descriptor anchor;
- locked styling for unlearned anchors, while still allowing selection;
- accepted answers from `answerIds`, including both `Hum` and `Buzz` for `Electrical`.

## Implementation References

- Alias data: `web/app/src/cards/aliasVocabulary.ts`
- Unlock handler: `web/app/src/app/App.tsx` `unlockAlias`
- UI: `web/app/src/app/App.tsx` `LanguageHallScreen`
- Details: `AliasDetailModal`
- Guard tests: `web/app/src/tests/recipeMatcher.test.ts`
