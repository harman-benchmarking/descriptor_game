import { describe, expect, it } from "vitest";
import {
  beginBlindPreview,
  canSubmitBlindTrial,
  createBlindTrialSession,
  settleBlindPreview,
  submitBlindTrialChoice
} from "../learn/blindTrialSession";
import { listeningChallengeFor } from "../learn/listeningChallenges";

const definition = listeningChallengeFor("bass", "thump")!;

describe("blind listening trial sessions", () => {
  it("keeps scoring locked until playback successfully starts", () => {
    const initial = createBlindTrialSession(definition, "trial-1", () => 0.99);
    const option = initial.trial.options[0];
    expect(canSubmitBlindTrial(initial)).toBe(false);

    const pending = beginBlindPreview(initial, option.label);
    expect(canSubmitBlindTrial(pending.session)).toBe(false);
    expect(submitBlindTrialChoice(pending.session, option)).toBe(pending.session);

    const failed = settleBlindPreview(pending.session, pending.attempt, "failed");
    expect(failed.previewFailed).toBe(true);
    expect(failed.previewedLabels).toEqual([]);
    expect(canSubmitBlindTrial(failed)).toBe(false);

    const retry = beginBlindPreview(failed, option.label);
    const started = settleBlindPreview(retry.session, retry.attempt, "started");
    expect(started.previewFailed).toBe(false);
    expect(started.previewedLabels).toEqual([option.label]);
    expect(canSubmitBlindTrial(started)).toBe(true);

    const submitted = submitBlindTrialChoice(started, option);
    expect(submitted.result).toEqual({ correct: true, option });
    expect(canSubmitBlindTrial(submitted)).toBe(false);
  });

  it("creates a fresh identity and option mapping for a new trial", () => {
    const first = createBlindTrialSession(definition, "trial-1", () => 0.99);
    const next = createBlindTrialSession(definition, "trial-2", () => 0);

    expect(next.id).not.toBe(first.id);
    expect(next.trial.options).not.toEqual(first.trial.options);
    expect(next.previewedLabels).toEqual([]);
    expect(next.pendingPreview).toBeNull();
    expect(next.result).toBeNull();
    expect(canSubmitBlindTrial(next)).toBe(false);
  });

  it("ignores a successful playback completion from a replaced trial", () => {
    const first = createBlindTrialSession(definition, "trial-1", () => 0.99);
    const oldPreview = beginBlindPreview(first, first.trial.options[0].label);
    const next = createBlindTrialSession(definition, "trial-2", () => 0);

    const afterStaleCompletion = settleBlindPreview(next, oldPreview.attempt, "started");
    expect(afterStaleCompletion).toBe(next);
    expect(afterStaleCompletion.previewedLabels).toEqual([]);
    expect(canSubmitBlindTrial(afterStaleCompletion)).toBe(false);
  });

  it("only accepts the latest playback request within the current trial", () => {
    const initial = createBlindTrialSession(definition, "trial-1", () => 0.99);
    const firstPreview = beginBlindPreview(initial, "A");
    const secondPreview = beginBlindPreview(firstPreview.session, "B");

    const afterOldCompletion = settleBlindPreview(secondPreview.session, firstPreview.attempt, "started");
    expect(afterOldCompletion).toBe(secondPreview.session);
    expect(canSubmitBlindTrial(afterOldCompletion)).toBe(false);

    const afterLatestCompletion = settleBlindPreview(afterOldCompletion, secondPreview.attempt, "started");
    expect(afterLatestCompletion.previewedLabels).toEqual(["B"]);
    expect(canSubmitBlindTrial(afterLatestCompletion)).toBe(true);
  });
});
