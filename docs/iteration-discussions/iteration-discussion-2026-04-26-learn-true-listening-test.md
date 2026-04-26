# Learn True Listening Test Discussion

This document captures the proposed logic for making `Learn` into a real listening test instead of a label-matching exercise.

## Current Problem

The current Learn challenge is too easy because the correct descriptor is visible as a button label. If the challenge is about `Thump`, the user can pass by clicking `Thump` without listening.

That means the current system tests recognition of UI labels, not recognition of sound.

## Core Principle

The answer should come from listening first.

The UI can name the learning target during teaching, but during the actual test the answer should not be printed directly on the option the user clicks.

## Recommended Learn Structure

Split Learn into three related modes:

| Mode | Purpose | User sees | User does |
|---|---|---|---|
| Teach | Introduce a descriptor | Card name, art, description, processed sound | Toggle flat/processed and learn the sound |
| Practice | Guided blind comparison | Target name plus unlabeled audio choices | Find the target from A/B/C |
| Test | Real identification | Unlabeled or lightly prompted sound | Choose the descriptor from cards |

For the MVP, implement `Teach` plus `Practice` first. Save the stricter full `Test` mode for the next iteration after the blind comparison is stable.

## MVP Recommendation: Blind A/B/C Practice

The first true test should be a blind A/B/C listening test.

Example:

- Prompt: `Find Thump.`
- Options: `A`, `B`, `C`
- One option applies the target DSP filter.
- The other options apply nearby confuser filters.
- The option order is shuffled every trial.
- The user must listen, then choose A, B, or C.

This removes the current loophole while keeping the task approachable.

## Why This Is Better

- It forces audio comparison.
- It still gives the learner a named target, which is useful for early training.
- It lets the game teach contrast, not just isolated definitions.
- It works with the existing TypeScript and WebAudio DSP system.
- It avoids needing Python or external DSP tooling for the MVP.

## Confuser Logic

Wrong answers should be meaningful confusers, not random cards.

Good confusers share frequency territory, perceptual family, or common real-world confusion with the target.

Examples:

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

## Feedback Copy

Feedback should teach, not punish.

Examples:

| Result | Copy pattern |
|---|---|
| Correct | `Yes. Thump is the short low-bass hit.` |
| Wrong | `That was closer to Rumble. Thump is shorter and more impact-like.` |
| Almost related | `Close. Punchy has more attack; Thump is lower and heavier.` |

Feedback should reveal labels only after the user chooses.

## Data Model Needed

Add a small challenge definition layer.

Possible TypeScript shape:

```ts
export type ListeningChallengeDefinition = {
  targetId: string;
  confuserIds: string[];
  promptKey: string;
  correctHintKey: string;
  wrongHintKeys: Record<string, string>;
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

## Audio Behavior

When the user previews an option:

- Set active basics to that option's hidden descriptor ID.
- Set playback mode to processed.
- Keep the main playback engine and EQ curve synced with the preview.

After the user answers:

- Keep the chosen sound active long enough for feedback.
- If wrong, optionally add a `Play target` button so they can hear the contrast.

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

The goal is not to block developer tools or source inspection. The goal is to make normal gameplay require listening.

## Implementation Order

1. Create `listeningChallenges.ts` with target/confuser definitions.
2. Add a trial generator that shuffles A/B/C choices.
3. Replace the current `ChallengeBlock` answer buttons with blind audio option tiles.
4. Add trial state to `LearnScreen` or a dedicated `ListeningChallengeBlock`.
5. Add progress tracking for correct trials.
6. Keep gift cards simple for now.
7. Add feedback copy to locale JSON.
8. Verify that correct answers are not visible before choosing.
9. Add unit tests for trial generation and unlock thresholds.

## Open Questions Before Coding

1. Should the first catch unlock after 1 correct trial or 2?
2. Should wrong answers reset the streak, or should we count total correct answers?
3. Should the user be allowed to hear the named target before entering the blind test?
4. Should the full Test mode use named descriptor cards as answers, or stay fully unlabeled longer?
5. Should the EQ curve be hidden during blind trials so it cannot reveal the answer visually?

## My Preferred Defaults

- First catch unlocks after 1 correct trial.
- Later unlocks require 2 correct trials total, not a streak.
- Teach mode lets the user hear the target before blind practice.
- Practice uses A/B/C audio choices.
- Full Test mode can come later.
- Hide or simplify the EQ curve during blind trials if we want a stricter test, because the curve can become a visual answer key.
