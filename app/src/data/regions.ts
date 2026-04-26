export type GateId = "bass" | "mid" | "treble";

export type GateDefinition = {
  id: GateId;
  labelKey: string;
  summaryKey: string;
  giftCards: string[];
  firstCatch: string;
  laterUnlocks: string[];
  anchors: string[];
};

export const gateDefinitions: GateDefinition[] = [
  {
    id: "bass",
    labelKey: "gate.bass.label",
    summaryKey: "gate.bass.summary",
    giftCards: ["rumble", "thin"],
    firstCatch: "thump",
    laterUnlocks: ["boomy", "punchy", "muddy"],
    anchors: ["rumble", "thump"]
  },
  {
    id: "mid",
    labelKey: "gate.mid.label",
    summaryKey: "gate.mid.summary",
    giftCards: ["warm", "hollow"],
    firstCatch: "boxy",
    laterUnlocks: ["honky", "nasal", "shouty"],
    anchors: ["warm", "boxy"]
  },
  {
    id: "treble",
    labelKey: "gate.treble.label",
    summaryKey: "gate.treble.summary",
    giftCards: ["bright", "dull"],
    firstCatch: "harsh",
    laterUnlocks: ["sibilant", "shrill", "airy"],
    anchors: ["bright", "harsh"]
  }
];

export type RegionDefinition = {
  id: string;
  labelKey: string;
  summaryKey: string;
  imageSrc: string;
  playable: boolean;
};

export const regionDefinitions: RegionDefinition[] = [
  {
    id: "a",
    labelKey: "region.a.label",
    summaryKey: "region.a.summary",
    imageSrc: "/icons/regions/spectrial-region-a-thunderstep-highlands.png",
    playable: true
  },
  {
    id: "b",
    labelKey: "region.b.label",
    summaryKey: "region.b.summary",
    imageSrc: "/icons/regions/spectrial-region-b-emberbody-valley.png",
    playable: false
  },
  {
    id: "c",
    labelKey: "region.c.label",
    summaryKey: "region.c.summary",
    imageSrc: "/icons/regions/spectrial-region-c-resonance-canyons.png",
    playable: false
  },
  {
    id: "d",
    labelKey: "region.d.label",
    summaryKey: "region.d.summary",
    imageSrc: "/icons/regions/spectrial-region-d-masking-mire.png",
    playable: false
  },
  {
    id: "e",
    labelKey: "region.e.label",
    summaryKey: "region.e.summary",
    imageSrc: "/icons/regions/spectrial-region-e-glassedge-spires.png",
    playable: false
  },
  {
    id: "f",
    labelKey: "region.f.label",
    summaryKey: "region.f.summary",
    imageSrc: "/icons/regions/spectrial-region-f-scoopshine-basin.png",
    playable: false
  },
  {
    id: "g",
    labelKey: "region.g.label",
    summaryKey: "region.g.summary",
    imageSrc: "/icons/regions/spectrial-region-g-frosthollow-expanse.png",
    playable: false
  }
];
