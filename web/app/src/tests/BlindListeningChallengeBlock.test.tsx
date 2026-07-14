import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BlindListeningChallengeBlock } from "../app/App";
import { gateDefinitions } from "../data/regions";
import type { BlindPreviewStartResult } from "../learn/blindTrialSession";

const bassGate = gateDefinitions.find((gate) => gate.id === "bass")!;

function renderChallenge(onPreview: () => Promise<BlindPreviewStartResult>) {
  const onStartNewTrial = vi.fn();
  const onSubmit = vi.fn();
  render(
    <BlindListeningChallengeBlock
      gate={bassGate}
      targetId="thump"
      learnedBasicSet={new Set()}
      activeBasicIds={[]}
      playing={false}
      blindPreviewState={null}
      t={(key) => key}
      onPreview={onPreview}
      onStartNewTrial={onStartNewTrial}
      onPausePreview={vi.fn()}
      onSubmit={onSubmit}
      onToggleBasic={vi.fn()}
      onInspectDescriptor={vi.fn()}
    />
  );
  return { onStartNewTrial, onSubmit };
}

function answerButtons() {
  return screen.getAllByRole("button", { name: /listening\.choose/ });
}

describe("BlindListeningChallengeBlock", () => {
  it("enables answers only after playback reports that it started", async () => {
    const { onSubmit } = renderChallenge(async () => "started");
    expect(answerButtons()).toHaveLength(3);
    answerButtons().forEach((button) => expect(button).toBeDisabled());

    fireEvent.click(screen.getByTitle("listening.play A"));
    await waitFor(() => answerButtons().forEach((button) => expect(button).toBeEnabled()));

    fireEvent.click(answerButtons()[0]);
    expect(onSubmit).toHaveBeenCalledOnce();
    answerButtons().forEach((button) => expect(button).toBeDisabled());
  });

  it("keeps answers disabled and shows retry guidance when playback fails", async () => {
    renderChallenge(async () => "failed");
    fireEvent.click(screen.getByTitle("listening.play A"));

    expect(await screen.findByRole("alert")).toHaveTextContent("listening.previewFailed");
    answerButtons().forEach((button) => expect(button).toBeDisabled());
  });

  it("does not let an old playback completion unlock a newly generated trial", async () => {
    let resolvePreview!: (outcome: BlindPreviewStartResult) => void;
    const previewPromise = new Promise<BlindPreviewStartResult>((resolve) => {
      resolvePreview = resolve;
    });
    const { onStartNewTrial } = renderChallenge(() => previewPromise);

    fireEvent.click(screen.getByTitle("listening.play A"));
    fireEvent.click(screen.getByRole("button", { name: "listening.nextTrial" }));
    expect(onStartNewTrial).toHaveBeenCalledOnce();
    answerButtons().forEach((button) => expect(button).toBeDisabled());

    await act(async () => resolvePreview("started"));
    answerButtons().forEach((button) => expect(button).toBeDisabled());
  });
});
