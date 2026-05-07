# Learn True Listening Test Discussion

This document captures the proposed logic for making `Learn` into a real listening test instead of a label-matching exercise.

## Current Problem

The current Learn challenge is too easy because the correct descriptor is visible as a button label. If the challenge is about `Thump`, the user can pass by clicking `Thump` without listening.

That means the current system tests recognition of UI labels, not recognition of sound.

## Core Principle

The answer should come from listening first.

The UI can name the learning target during teaching, but during the actual test the answer should not be printed directly on the option the user clicks.

## Four-Module Update

After adding `Spatial`, `Dynamic`, and `Integrity`, this design should no longer be treated as a spectral-only EQ test.

The same high-level idea still works:

- Teach the descriptor openly.
- Practice it through blind A/B/C audio choices.
- Reveal labels only after the learner answers.

But the implementation must be module-aware because each module has a different way it can leak the answer:

| Module | What the user is learning | Main leakage risk | MVP test rule |
|---|---|---|---|
| Spectral | Frequency-balance changes | EQ curve shape reveals the target | Hide or neutralize the curve during blind choice |
| Spatial | Position, distance, and room | Source-position visualizer reveals left/right/near/far | Hide the source marker until after answer |
| Dynamic | Attack, recovery, compression, motion, overload | Waveform/envelope display can show pumping, clipping, gaps, or flattening | Show a neutral motion meter before answer; reveal waveform after answer |
| Integrity | Noise, ticks, dropouts, artifacts | Artifact timeline makes clicks, crackle, and dropout visible | Hide event markers before answer; reveal timeline after answer |

My recommendation:

- Keep one shared listening-test framework.
- Give each module its own confuser table, visualizer policy, and short contrast hints.
- Do not build four separate testing systems.

## Recommended Learn Structure

Split Learn into three related modes:

| Mode | Purpose | User sees | User does |
|---|---|---|---|
| Teach | Introduce a descriptor | Card name, art, description, processed sound | Toggle flat/processed and learn the sound |
| Practice | Guided blind comparison | Target name plus unlabeled audio choices | Find the target from A/B/C |
| Test | Real identification | Unlabeled or lightly prompted sound | Choose the descriptor from cards |

For the MVP, implement `Teach` plus `Practice` first. Save the stricter full `Test` mode for the next iteration after the blind comparison is stable.

## MVP Recommendation: Module-Aware Blind A/B/C Practice

The first true test should be a blind A/B/C listening test.

Example:

- Prompt: `Find Thump.`
- Options: `A`, `B`, `C`
- One option applies the target DSP filter.
- The other options apply nearby confuser filters.
- The option order is shuffled every trial.
- The user must listen, then choose A, B, or C.

This removes the current loophole while keeping the task approachable.

For the four-module MVP, the same pattern should be used for every module, but the prompt wording should adapt:

| Module | Prompt pattern | Example |
|---|---|---|
| Spectral | `Find {descriptor}.` | `Find Thump.` |
| Spatial | `Where is the sound {descriptor}?` or `Find {descriptor}.` | `Find Left.` |
| Dynamic | `Which version sounds {descriptor}?` | `Which version sounds Pumping?` |
| Integrity | `Find the {descriptor} artifact.` | `Find the Dropout artifact.` |

## Why This Is Better

- It forces audio comparison.
- It still gives the learner a named target, which is useful for early training.
- It lets the game teach contrast, not just isolated definitions.
- It works with the existing TypeScript and WebAudio DSP system.
- It avoids needing Python or external DSP tooling for the MVP.

## Confuser Logic

Wrong answers should be meaningful confusers, not random cards.

Good confusers share frequency territory, perceptual family, or common real-world confusion with the target.

Spectral examples:

| Target | Better confusers | Weak confusers |
|---|---|---|
| Rumble | Thump, Boomy, Thin | Airy, Sibilant |
| Thump | Rumble, Punchy, Boomy | Nasal, Airy |
| Punchy | Thump, Bright, Boomy | Hollow, Warm |
| Bright | Airy, Sibilant, Harsh | Rumble, Muddy |
| Airy | Bright, Sibilant, Dull | Thump, Boxy |

My input:

- Confusers are the real curriculum. They teach the border between descriptors.
- A test with random unrelated choices feels fair but teaches less.
- Each descriptor should eventually have a curated list of 3 to 5 confusers.

## Module-Specific Confusers

The non-spectral modules need their own confuser logic. Reusing spectral-style "near frequency" thinking would be misleading.

### Spatial

Spatial confusers should test axes:

- Left/right/centered tests horizontal position.
- Near/far tests depth and directness.
- Dry/reverberant tests room field.

Recommended MVP confusers:

| Target | Better confusers | Notes |
|---|---|---|
| Left | Centered, Right | Requires headphones; do not show the source marker before answer |
| Right | Centered, Left | Same axis as Left |
| Centered | Left, Right | Useful anchor for lateral position |
| Near | Far, Dry | Near can be confused with dry/direct sound |
| Far | Near, Reverberant | Far can be confused with extra room |
| Dry | Reverberant, Near | Dry is a room cue, not simply "close" |
| Reverberant | Dry, Far | Reverb and distance overlap but are not identical |

### Dynamic

Dynamic confusers should test motion and envelope behavior:

| Target | Better confusers | Notes |
|---|---|---|
| Snappy | Softened, Tight | Attack sharpness versus recovery control |
| Softened | Snappy, Compressed | Rounded attack can be confused with level control |
| Tight | Loose, Snappy | Recovery is different from attack |
| Loose | Tight, Pumping | Loose recovery can feel like motion but should not duck cyclically |
| Compressed | Flat, Softened | Compressed controls peaks; Flat removes expressive contrast |
| Pumping | Compressed, Loose | Pumping is audible level duck-and-return |
| Flat | Compressed, Softened | Flat has low dynamic contrast without obvious compressor movement |
| Clipped | Distorted, Compressed | Clipped is hard peak damage and ceiling impact |
| Distorted | Clipped, Pumping | Distorted roughness follows the signal; it is not necessarily a hard ceiling |

### Integrity

Integrity confusers should test artifact families:

| Target | Better confusers | Notes |
|---|---|---|
| Hiss | Hum, Buzz | Continuous noise versus tonal interference |
| Hum | Buzz, Hiss | Low steady tone versus rough harmonic tone |
| Buzz | Hum, Crackle | Electrical roughness versus intermittent defects |
| Click | Crackle, Dropout | Single event versus repeated events or missing audio |
| Crackle | Click, Buzz | Clusters of small ticks versus steady roughness |
| Dropout | Click, Crackle | Missing sound should be audible, not only visible |

## Suggested Unlock Rules

For MVP:

| Learn section | Unlock behavior |
|---|---|
| Gift pair | User can still claim these instantly after listening. This keeps onboarding gentle. |
| First catch | Unlock after 1 correct blind A/B/C trial. |
| Later unlocks | Unlock after 2 correct blind A/B/C trials for that target. |
| Region unlock | Requires all basic cards learned through the Learn flow. |

Alternative stricter rule:

- Later unlocks require 3 correct out of 4 trials.

My recommendation:

- Start with 2 correct trials for later unlocks.
- Increase difficulty only after the listening UI feels fast and pleasant.

## Trial Flow

Recommended interaction:

1. The challenge creates one target and two confusers.
2. The three choices are shuffled and labeled `A`, `B`, `C`.
3. Clicking `Play A`, `Play B`, or `Play C` previews that hidden filter.
4. The user can replay choices freely.
5. The user clicks `Choose A`, `Choose B`, or `Choose C`.
6. The app reveals whether the answer was correct.
7. If correct, progress increments.
8. If wrong, the app reveals what was heard and gives one short contrast hint.
9. The next trial reshuffles choices.

UI note:

- The play action and the choose action should be separate.
- If one click both plays and answers, the user cannot compare options properly.
- For spatial, dynamic, and integrity, the module visualizer should stay neutral until the answer is submitted.

## Feedback Copy

Feedback should teach, not punish.

Examples:

| Result | Copy pattern |
|---|---|
| Correct | `Yes. Thump is the short low-bass hit.` |
| Wrong | `That was closer to Rumble. Thump is shorter and more impact-like.` |
| Almost related | `Close. Punchy has more attack; Thump is lower and heavier.` |

Feedback should reveal labels only after the user chooses.

Four-module feedback examples:

| Module | Wrong-answer copy pattern |
|---|---|
| Spectral | `That was closer to Rumble. Thump is shorter and more impact-like.` |
| Spatial | `That was closer to Centered. Left should pull the image clearly to the left side.` |
| Dynamic | `That was closer to Compressed. Pumping should duck and return in a repeating motion.` |
| Integrity | `That was closer to Click. Dropout should briefly remove part of the sound.` |

## Data Model Needed

Add a small challenge definition layer.

The original shape should be expanded to include module-specific behavior:

```ts
export type ListeningChallengeDefinition = {
  moduleId: DescriptorModuleId;
  gateId: GateId;
  targetId: string;
  confuserIds: string[];
  promptKey: string;
  correctHintKey: string;
  wrongHintKeys: Record<string, string>;
  requiresHeadphones?: boolean;
  visualizerPolicy: "hidden_until_answer" | "neutral_until_answer" | "safe_visible";
  targetPreviewMode: "allowed_before_trial" | "practice_only" | "never";
};
```

Generated trial shape:

```ts
export type ListeningTrial = {
  targetId: string;
  options: Array<{
    label: "A" | "B" | "C";
    descriptorId: string;
  }>;
};
```

Important implementation detail:

- Generate and store the trial in React state.
- Do not reshuffle on every render.
- Reshuffle only when starting a new trial.
- Store the module id with the trial so preview playback chooses the correct DSP path and visualizer policy.

## Audio Behavior

When the user previews an option:

- Set active basics to that option's hidden descriptor ID.
- Set playback mode to processed.
- Keep the main playback engine and EQ curve synced with the preview.

After the user answers:

- Keep the chosen sound active long enough for feedback.
- If wrong, optionally add a `Play target` button so they can hear the contrast.
- Reveal the module-specific visualizer only after the answer is submitted.
- For Spatial, use a headphones recommendation before the test starts.
- For Dynamic, use a transient-rich loop so attack, recovery, pumping, clipping, and distortion are actually audible.
- For Integrity, use a clean enough loop or passage so hiss, hum, clicks, crackle, buzz, and dropout are not masked.

## Visualizer Policy

The visualizer is excellent for teaching, but risky for testing.

Recommended policy:

| Phase | Visualizer behavior |
|---|---|
| Teach | Show the full module visualizer |
| Practice before answer | Show a neutral or hidden visualizer |
| Practice after answer | Reveal the actual module visualizer |
| Full Test mode | Keep visualizer hidden until the answer is submitted |

This is especially important for:

- Spatial: a source dot would reveal left/right/near/far immediately.
- Dynamic: a waveform can reveal clipping, pumping, and flatness.
- Integrity: a gap or artifact marker can reveal dropout/click/crackle visually.

## UI Recommendation

Each test option should look like a small audio tile:

- Large `A`, `B`, or `C`.
- A play icon button.
- A choose/check button.
- No descriptor name until after submission.

On mobile, the tile should remain large enough for comfortable tapping.

## Anti-Loophole Rules

The test should avoid:

- Showing descriptor labels on answer buttons before the user chooses.
- Using target-colored art or icons that reveal the answer.
- Reusing the same answer position repeatedly.
- Making unrelated confusers that are too obvious.
- Unlocking a descriptor from just opening its detail page.
- Showing module-specific visual evidence that gives away the answer before listening.

The goal is not to block developer tools or source inspection. The goal is to make normal gameplay require listening.

## Implementation Order

1. Create `listeningChallenges.ts` with target/confuser definitions for all four modules.
2. Add a trial generator that shuffles A/B/C choices.
3. Add module-aware `visualizerPolicy` handling.
4. Replace the current `ChallengeBlock` answer buttons with blind audio option tiles.
5. Add trial state to `LearnScreen` or a dedicated `ListeningChallengeBlock`.
6. Add progress tracking for correct trials.
7. Keep gift cards simple for now.
8. Add feedback copy to locale JSON.
9. Verify that correct answers are not visible before choosing.
10. Add unit tests for trial generation, confuser selection, visualizer policy, and unlock thresholds.

## Open Questions Before Coding

1. Should the first catch unlock after 1 correct trial or 2?
2. Should wrong answers reset the streak, or should we count total correct answers?
3. Should the user be allowed to hear the named target before entering the blind test?
4. Should the full Test mode use named descriptor cards as answers, or stay fully unlabeled longer?
5. Should the EQ curve be hidden during blind trials so it cannot reveal the answer visually?
6. Should Spatial tests require headphones before the user can start?
7. Should Dynamic and Integrity use different demo loops from Spectral for clearer audibility?
8. Should the visualizer be completely hidden, or shown as a neutral "listening mode" surface before answer?

## My Preferred Defaults

- First catch unlocks after 1 correct trial.
- Later unlocks require 2 correct trials total, not a streak.
- Teach mode lets the user hear the target before blind practice.
- Practice uses A/B/C audio choices.
- Full Test mode can come later.
- Hide or neutralize all module visualizers during blind trials, because the curve/stage/waveform/timeline can become a visual answer key.
- Require a headphones recommendation for Spatial, but do not hard-block the test.
- Use module-specific confusers from the beginning; this is the heart of the curriculum.
