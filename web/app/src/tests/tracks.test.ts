import { describe, expect, it } from "vitest";
import { preferredTrackForGate, trackDefinitions } from "../data/tracks";

describe("track definitions", () => {
  it("uses daily reference loops as the primary spectral learn tracks", () => {
    expect(preferredTrackForGate("bass").id).toBe("daily-drum-bass-groove-loop");
    expect(preferredTrackForGate("mid").id).toBe("daily-spoken-center-loop");
    expect(preferredTrackForGate("treble").id).toBe("daily-acoustic-pop-loop");
  });

  it("uses speech and acoustic loops for spatial learn gates", () => {
    expect(preferredTrackForGate("spatial-position").id).toBe("daily-spoken-center-loop");
    expect(preferredTrackForGate("spatial-image").id).toBe("daily-piano-guitar-loop");
  });

  it("uses speech as the primary integrity learn carrier", () => {
    expect(preferredTrackForGate("integrity-contamination").id).toBe("daily-spoken-center-loop");
    expect(preferredTrackForGate("integrity-glitch").id).toBe("daily-spoken-center-loop");
  });

  it("keeps legacy stylized tracks out of spectral learn defaults", () => {
    const spectralGateIds = ["bass", "mid", "treble"] as const;
    const spectralDefaults = spectralGateIds.map((gateId) => preferredTrackForGate(gateId).id);

    expect(spectralDefaults).not.toContain("jpop-reference-loop");
    expect(spectralDefaults).not.toContain("region-a-loop");
  });

  it("points every track at a public audio asset", () => {
    expect(trackDefinitions.every((track) => track.src.startsWith("/audio/demo/"))).toBe(true);
  });
});
