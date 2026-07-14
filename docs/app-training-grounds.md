# Training Grounds

This document owns the Training Grounds function: basic-card learning, gift pairs, blind listening trials, and gate progression.

## Purpose

Training Grounds teaches the basic descriptor vocabulary. It is the foundation for every later app function:

- Atlas crafting needs learned basics as ingredients.
- Calibration Tower requires learned basics before a floor can be attempted.
- Sound Lab only exposes learned basics.
- Lexicon Hall can show locked-looking answers, but its alias anchors are all basic descriptors.

## Module And Gate Model

Training is module-aware. Each module has one or more gates. A gate has:

- `giftCards`: claimed together without a quiz.
- `firstCatch`: the first earned target.
- `laterUnlocks`: additional earned targets.
- `anchors`: fallback visible-choice anchors.
- `challengeAnchors`: optional fallback anchors for gates that do not have a blind challenge.

All current earned targets have a blind listening challenge in `listeningChallenges.ts`, so the active A/B/C options come from that file rather than from `challengeAnchors`. The fallback anchors remain part of the gate data contract.

Current implemented gate split:

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

`Flat` is the player-facing label. The implemented descriptor id is `flat-dynamics`, and its audio profile id is `flat`.

## Active Blind Listening Matrix

Blind trials are always three hidden audio options: target plus two confusers, shuffled as `A`, `B`, and `C`.

| Gate | Target | Active confusers |
|---|---|---|
| Bass | `Thump` | `Thin`, `Warm` |
| Bass | `Rumble` | `Thin`, `Boxy` |
| Bass | `Punchy` | `Thin`, `Warm` |
| Bass | `Muddy` | `Thin`, `Honky` |
| Mid | `Honky` | `Hollow`, `Boomy` |
| Mid | `Warm` | `Hollow`, `Bright` |
| Mid | `Nasal` | `Hollow`, `Boomy` |
| Mid | `Shouty` | `Hollow`, `Bright` |
| Treble | `Harsh` | `Dull`, `Honky` |
| Treble | `Sibilant` | `Dull`, `Nasal` |
| Treble | `Glassy` | `Dull`, `Boxy` |
| Treble | `Airy` | `Dull`, `Shouty` |
| Position | `Centered` | `Left`, `Right` |
| Position | `Near` | `Centered`, `Far` |
| Position | `Far` | `Centered`, `Near` |
| Image | `Wide` | `Narrow`, `Blurred` |
| Image | `Narrow` | `Wide`, `Focused` |
| Image | `Dry` | `Reverberant`, `Focused` |
| Image | `Reverberant` | `Dry`, `Blurred` |
| Snapback | `Softened` | `Tight`, `Loose` |
| Snapback | `Snappy` | `Softened`, `Tight` |
| Pressureflow | `Flat` (`flat-dynamics`) | `Compressed`, `Pumping` |
| Pressureflow | `Clipped` | `Flat` (`flat-dynamics`), `Compressed` |
| Pressureflow | `Distorted` | `Clipped`, `Pumping` |
| Contamination | `Static` | `Hiss`, `Crackle` |
| Contamination | `Buzz` | `Hum`, `Whine` |
| Contamination | `Whine` | `Hum`, `Buzz` |
| Contamination | `Dirty` | `Hiss`, `Static` |
| Glitch | `Pop` | `Click`, `Dropout` |
| Glitch | `Crackle` | `Click`, `Static` |
| Glitch | `Squeak` | `Click`, `Whine` |

## Spectral Cut-Anchor Rule

Every Spectral blind trial includes the gate's cut anchor among the three options:

| Gate | Required cut anchor |
|---|---|
| Bass | `Thin` |
| Mid | `Hollow` |
| Treble | `Dull` |

This makes every spectral trial test both frequency region and boost/cut direction.

## Trial Flow

1. The card label is visible as the target to learn.
2. The answer options are hidden as `A`, `B`, and `C`.
3. The player previews one option at a time.
4. Answer submission stays disabled until the audio engine confirms that at least one preview in the current trial started successfully. A rejected start leaves scoring locked and shows retry guidance.
5. Labels remain hidden until the answer is submitted.
6. Correct answers unlock the target basic card.
7. Incorrect answers reveal feedback but do not unlock the card.
8. Starting a new trial stops current audio, clears preview/result state, assigns a new trial identity, and reshuffles the options. Late playback completion from the replaced trial is ignored.

## Save Effects

Unlocking basics writes:

- `learnedBasicIds`
- `completedChallenges[challengeId]`

Gift pairs use challenge ids like `<gate>.gifts`. Blind target challenges use ids like `<gate>.<target>`.

## Details Included

Training Grounds exposes the descriptor details needed for the current learning task:

- Gate cards show the gift pair, first catch, later unlock targets, and locked/unlocked state.
- Blind trials show the target descriptor label but hide answer labels until submission.
- The active trial options are the target plus the two active confusers listed above.
- Learned basics become inspectable in Collection and usable in Sound Lab.
- Training does not unlock Discovery cards or alias cards directly.

## Audio And Visual Fairness

Training should not reveal the answer through the active curve or visualizer before submission. The app hides answer-preview visuals during blind preview states.

Training mode restricts preview to one active basic card at a time so the player hears the target or option clearly.

The shared playback panel remains available in Training Grounds, but the intensity slider is hidden there. Training uses the fixed default intensity internally, so the Sound Lab slider cannot change challenge strength mid-trial.

## Implementation References

- Gate data: `web/app/src/data/regions.ts`
- Blind trial data: `web/app/src/learn/listeningChallenges.ts`
- Blind trial state and stale-request guards: `web/app/src/learn/blindTrialSession.ts`
- Training UI: `web/app/src/app/App.tsx` `LearnScreen`
- Trial UI: `web/app/src/app/App.tsx` `BlindListeningChallengeBlock`
- Guard tests: `web/app/src/tests/listeningChallenges.test.ts`, `blindTrialSession.test.ts`, `BlindListeningChallengeBlock.test.tsx`, and `AppTrainingAudio.test.tsx`
