import type { GateId } from "./regions";

export type TrackDefinition = {
  id: string;
  labelKey: string;
  src: string;
  learnSuitability?: Partial<Record<GateId, "primary" | "fallback">>;
};

export const trackDefinitions: TrackDefinition[] = [
  {
    id: "daily-drum-bass-groove-loop",
    labelKey: "track.dailyDrumBassGroove.label",
    src: "/audio/demo/learn/daily-drum-bass-groove-loop.wav",
    learnSuitability: {
      bass: "primary"
    }
  },
  {
    id: "daily-spoken-center-loop",
    labelKey: "track.dailySpokenCenter.label",
    src: "/audio/demo/learn/daily-spoken-center-loop.wav",
    learnSuitability: {
      mid: "primary",
      "spatial-position": "primary",
      "spatial-image": "fallback",
      "integrity-contamination": "primary",
      "integrity-glitch": "primary"
    }
  },
  {
    id: "daily-acoustic-pop-loop",
    labelKey: "track.dailyAcousticPop.label",
    src: "/audio/demo/learn/daily-acoustic-pop-loop.wav",
    learnSuitability: {
      bass: "fallback",
      mid: "fallback",
      treble: "primary"
    }
  },
  {
    id: "daily-piano-guitar-loop",
    labelKey: "track.dailyPianoGuitar.label",
    src: "/audio/demo/learn/daily-piano-guitar-loop.wav",
    learnSuitability: {
      treble: "fallback",
      "spatial-image": "primary"
    }
  },
  {
    id: "jpop-reference-loop",
    labelKey: "track.jpopReference.label",
    src: "/audio/demo/jpop-reference-loop.wav"
  },
  {
    id: "region-a-loop",
    labelKey: "track.regionA.label",
    src: "/audio/demo/region-a-loop.wav"
  }
];

export function preferredTrackForGate(gateId: GateId): TrackDefinition {
  return (
    trackDefinitions.find((track) => track.learnSuitability?.[gateId] === "primary") ??
    trackDefinitions.find((track) => track.learnSuitability?.[gateId] === "fallback") ??
    trackDefinitions[0]
  );
}
