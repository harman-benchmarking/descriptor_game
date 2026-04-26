export type TrackDefinition = {
  id: string;
  labelKey: string;
  src: string;
};

export const trackDefinitions: TrackDefinition[] = [
  {
    id: "region-a-loop",
    labelKey: "track.regionA.label",
    src: "/audio/demo/region-a-loop.wav"
  }
];
