import { describe, expect, it, vi } from "vitest";
import { WebAudioEngine } from "../audio/engine/WebAudioEngine";

function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>((next) => {
    resolve = next;
  });
  return { promise, resolve };
}

function injectPlaybackNodes(
  engine: WebAudioEngine,
  context: Pick<AudioContext, "resume" | "suspend">,
  audioElement: Pick<HTMLAudioElement, "play" | "pause" | "paused">
) {
  Object.assign(engine as unknown as Record<string, unknown>, {
    context,
    audioElement
  });
}

describe("WebAudioEngine playback cancellation", () => {
  it("does not reach the media element when pause invalidates a pending context resume", async () => {
    const resume = deferred();
    const mediaPlay = vi.fn(async () => undefined);
    const mediaPause = vi.fn();
    const contextResume = vi.fn(() => resume.promise);
    const engine = new WebAudioEngine("/audio/test.wav");

    injectPlaybackNodes(
      engine,
      {
        resume: contextResume,
        suspend: vi.fn(async () => undefined)
      },
      {
        play: mediaPlay,
        pause: mediaPause,
        paused: true
      }
    );

    const pendingPlay = engine.play();
    await vi.waitFor(() => expect(contextResume).toHaveBeenCalledOnce());
    engine.pause();
    resume.resolve();
    await expect(pendingPlay).resolves.toBe("cancelled");

    expect(mediaPlay).not.toHaveBeenCalled();
    expect(engine.isPlaying).toBe(false);
  });

  it("re-pauses a late media start after the request was cancelled", async () => {
    const mediaStart = deferred();
    let mediaPlaying = false;
    const mediaPlay = vi.fn(async () => {
      await mediaStart.promise;
      mediaPlaying = true;
    });
    const mediaPause = vi.fn(() => {
      mediaPlaying = false;
    });
    const engine = new WebAudioEngine("/audio/test.wav");

    injectPlaybackNodes(
      engine,
      {
        resume: vi.fn(async () => undefined),
        suspend: vi.fn(async () => undefined)
      },
      {
        play: mediaPlay,
        pause: mediaPause,
        get paused() {
          return !mediaPlaying;
        }
      }
    );

    const pendingPlay = engine.play();
    await vi.waitFor(() => expect(mediaPlay).toHaveBeenCalledOnce());
    engine.pause();
    mediaStart.resolve();
    await expect(pendingPlay).resolves.toBe("cancelled");

    expect(mediaPause).toHaveBeenCalledTimes(2);
    expect(mediaPlaying).toBe(false);
    expect(engine.isPlaying).toBe(false);
  });

  it("reports only the newest overlapping play request as started", async () => {
    const firstStart = deferred();
    const mediaPause = vi.fn();
    const mediaPlay = vi
      .fn<() => Promise<void>>()
      .mockImplementationOnce(() => firstStart.promise)
      .mockResolvedValueOnce(undefined);
    const engine = new WebAudioEngine("/audio/test.wav");

    injectPlaybackNodes(
      engine,
      {
        resume: vi.fn(async () => undefined),
        suspend: vi.fn(async () => undefined)
      },
      {
        play: mediaPlay,
        pause: mediaPause,
        paused: false
      }
    );

    const firstPlay = engine.play();
    await vi.waitFor(() => expect(mediaPlay).toHaveBeenCalledOnce());
    const latestPlay = engine.play();

    await expect(latestPlay).resolves.toBe("started");
    firstStart.resolve();
    await expect(firstPlay).resolves.toBe("cancelled");

    expect(mediaPause).not.toHaveBeenCalled();
    expect(engine.isPlaying).toBe(true);
  });
});
