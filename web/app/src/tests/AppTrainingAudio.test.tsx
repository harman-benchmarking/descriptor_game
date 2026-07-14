import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const audio = vi.hoisted(() => ({
  play: vi.fn<() => Promise<"started" | "cancelled">>(),
  pause: vi.fn(),
  clearEq: vi.fn(),
  dispose: vi.fn(),
  setTrack: vi.fn(async () => "cancelled" as const),
  setAudioProfiles: vi.fn(),
  setEqFilters: vi.fn(),
  setPlaybackMode: vi.fn()
}));

vi.mock("../audio/engine/WebAudioEngine", () => ({
  WebAudioEngine: class {
    get isReady() {
      return false;
    }

    get isPlaying() {
      return false;
    }

    get sampleRate() {
      return 48_000;
    }

    play = audio.play;
    pause = audio.pause;
    clearEq = audio.clearEq;
    dispose = audio.dispose;
    setTrack = audio.setTrack;
    setAudioProfiles = audio.setAudioProfiles;
    setEqFilters = audio.setEqFilters;
    setPlaybackMode = audio.setPlaybackMode;
  }
}));

import { App } from "../app/App";

describe("App Training audio lifecycle", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise(() => undefined))
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  async function enterTraining() {
    render(<App />);
    fireEvent.click(screen.getByText("Training Grounds", { selector: "strong" }).closest("button")!);
    await screen.findAllByRole("button", { name: "New trial" });
  }

  it("shows an active Pause control only after playback reaches playing status", async () => {
    audio.play.mockResolvedValue("started");
    await enterTraining();

    fireEvent.click(screen.getAllByTitle("Play A")[0]);
    expect(await screen.findByTitle("Pause A")).toBeVisible();
    expect(audio.play).toHaveBeenCalledOnce();
  });

  it("pauses old audio and rejects its late completion when New trial is pressed", async () => {
    let resolvePlayback!: (result: "started" | "cancelled") => void;
    audio.play.mockImplementation(
      () =>
        new Promise<"started" | "cancelled">((resolve) => {
          resolvePlayback = resolve;
        })
    );

    await enterTraining();
    const newTrialButtons = screen.getAllByRole("button", { name: "New trial" });
    audio.pause.mockClear();

    fireEvent.click(screen.getAllByTitle("Play A")[0]);
    expect(audio.play).toHaveBeenCalledOnce();
    fireEvent.click(newTrialButtons[0]);
    expect(audio.pause).toHaveBeenCalledOnce();

    await act(async () => resolvePlayback("started"));
    await waitFor(() => expect(screen.queryAllByTitle("Pause A")).toHaveLength(0));
    screen.getAllByRole("button", { name: /Choose [ABC]/ }).forEach((button) => expect(button).toBeDisabled());
  });

  it("does not unlock scoring when another play action supersedes the preview request", async () => {
    let resolvePreview!: (result: "started" | "cancelled") => void;
    audio.play
      .mockImplementationOnce(
        () =>
          new Promise<"started" | "cancelled">((resolve) => {
            resolvePreview = resolve;
          })
      )
      .mockResolvedValueOnce("started");

    await enterTraining();
    fireEvent.click(screen.getAllByTitle("Play A")[0]);
    fireEvent.click(screen.getByRole("button", { name: "Start audio" }));
    await waitFor(() => expect(audio.play).toHaveBeenCalledTimes(2));

    await act(async () => resolvePreview("cancelled"));

    expect(await screen.findByRole("alert")).toHaveTextContent("Playback could not start");
    screen.getAllByRole("button", { name: /Choose [ABC]/ }).forEach((button) => expect(button).toBeDisabled());
  });
});
