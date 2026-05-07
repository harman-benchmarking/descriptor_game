import type { DescriptorModuleId } from "../cards/cardTypes";

export type GateId =
  | "bass"
  | "mid"
  | "treble"
  | "spatial-position"
  | "spatial-image"
  | "dynamic-snapback"
  | "dynamic-pressureflow"
  | "integrity-contamination"
  | "integrity-glitch";

export type DescriptorModuleDefinition = {
  id: DescriptorModuleId;
  labelKey: string;
  summaryKey: string;
};

export const moduleDefinitions: DescriptorModuleDefinition[] = [
  {
    id: "spectral",
    labelKey: "module.spectral.label",
    summaryKey: "module.spectral.summary"
  },
  {
    id: "spatial",
    labelKey: "module.spatial.label",
    summaryKey: "module.spatial.summary"
  },
  {
    id: "dynamic",
    labelKey: "module.dynamic.label",
    summaryKey: "module.dynamic.summary"
  },
  {
    id: "integrity",
    labelKey: "module.integrity.label",
    summaryKey: "module.integrity.summary"
  }
];

export const playableRegionContent: Record<string, { ingredientIds: string[]; discoveryIds: string[] }> = {
  a: {
    ingredientIds: ["rumble", "thump", "punchy", "bright", "airy"],
    discoveryIds: ["powerful", "impactful", "shimmering", "energetic", "exciting"]
  },
  b: {
    ingredientIds: ["warm", "bright", "boomy", "dull", "boxy"],
    discoveryIds: ["full", "thick", "bassy", "vivid", "mellow", "chesty", "vintage"]
  },
  c: {
    ingredientIds: ["boxy", "honky", "nasal", "harsh"],
    discoveryIds: ["cupped", "pinched", "tubular", "brassy", "canned", "reedy"]
  },
  d: {
    ingredientIds: ["boomy", "muddy", "dull", "boxy", "honky"],
    discoveryIds: ["bassy", "bloated", "muffled", "cloudy", "cupped", "woolly", "veiled", "congested", "buried"]
  },
  g: {
    ingredientIds: ["hollow", "dull", "thin", "airy"],
    discoveryIds: ["distant", "scooped", "empty", "faded", "cold"]
  },
  e: {
    ingredientIds: ["thin", "harsh", "sibilant", "glassy", "hollow", "bright", "shouty"],
    discoveryIds: [
      "tinny",
      "spitty",
      "metallic",
      "aggressive",
      "sharp",
      "crisp",
      "lean",
      "empty",
      "brittle",
      "fatiguing",
      "plasticky",
      "piercing"
    ]
  },
  "spatial-1": {
    ingredientIds: ["left", "right", "centered", "focused", "blurred", "wide"],
    discoveryIds: ["precise", "diffuse"]
  },
  "spatial-3": {
    ingredientIds: ["near", "far", "dry", "reverberant", "wide"],
    discoveryIds: ["intimate", "set_back", "spacious"]
  },
  "dynamic-1": {
    ingredientIds: ["snappy", "softened", "tight", "loose"],
    discoveryIds: ["sluggish"]
  },
  "dynamic-2": {
    ingredientIds: ["compressed", "pumping", "flat-dynamics", "clipped", "distorted"],
    discoveryIds: ["surging", "overdriven"]
  },
  "integrity-1": {
    ingredientIds: ["hiss", "static", "hum", "buzz", "whine", "dirty", "click", "pop", "crackle", "dropout", "squeak"],
    discoveryIds: []
  }
};

export type GateDefinition = {
  id: GateId;
  moduleId: DescriptorModuleId;
  labelKey: string;
  summaryKey: string;
  giftCards: string[];
  firstCatch: string;
  laterUnlocks: string[];
  anchors: string[];
  challengeAnchors?: Partial<Record<string, string[]>>;
};

export const gateDefinitions: GateDefinition[] = [
  {
    id: "bass",
    moduleId: "spectral",
    labelKey: "gate.bass.label",
    summaryKey: "gate.bass.summary",
    giftCards: ["boomy", "thin"],
    firstCatch: "thump",
    laterUnlocks: ["rumble", "punchy", "muddy"],
    anchors: ["boomy", "thin"]
  },
  {
    id: "mid",
    moduleId: "spectral",
    labelKey: "gate.mid.label",
    summaryKey: "gate.mid.summary",
    giftCards: ["hollow", "boxy"],
    firstCatch: "honky",
    laterUnlocks: ["warm", "nasal", "shouty"],
    anchors: ["hollow", "boxy"]
  },
  {
    id: "treble",
    moduleId: "spectral",
    labelKey: "gate.treble.label",
    summaryKey: "gate.treble.summary",
    giftCards: ["bright", "dull"],
    firstCatch: "harsh",
    laterUnlocks: ["sibilant", "glassy", "airy"],
    anchors: ["bright", "dull"]
  },
  {
    id: "spatial-position",
    moduleId: "spatial",
    labelKey: "gate.spatial.position.label",
    summaryKey: "gate.spatial.position.summary",
    giftCards: ["left", "right"],
    firstCatch: "centered",
    laterUnlocks: ["near", "far"],
    anchors: ["left", "right"]
  },
  {
    id: "spatial-image",
    moduleId: "spatial",
    labelKey: "gate.spatial.image.label",
    summaryKey: "gate.spatial.image.summary",
    giftCards: ["focused", "blurred"],
    firstCatch: "wide",
    laterUnlocks: ["narrow", "dry", "reverberant"],
    anchors: ["focused", "blurred"],
    challengeAnchors: {
      wide: ["narrow", "blurred"],
      narrow: ["wide", "focused"],
      dry: ["reverberant", "focused"],
      reverberant: ["dry", "blurred"]
    }
  },
  {
    id: "dynamic-snapback",
    moduleId: "dynamic",
    labelKey: "gate.dynamic.snapback.label",
    summaryKey: "gate.dynamic.snapback.summary",
    giftCards: ["tight", "loose"],
    firstCatch: "softened",
    laterUnlocks: ["snappy"],
    anchors: ["tight", "loose"],
    challengeAnchors: {
      softened: ["tight", "loose", "snappy"],
      snappy: ["tight", "loose", "softened"]
    }
  },
  {
    id: "dynamic-pressureflow",
    moduleId: "dynamic",
    labelKey: "gate.dynamic.pressureflow.label",
    summaryKey: "gate.dynamic.pressureflow.summary",
    giftCards: ["compressed", "pumping"],
    firstCatch: "flat-dynamics",
    laterUnlocks: ["clipped", "distorted"],
    anchors: ["compressed", "pumping"],
    challengeAnchors: {
      clipped: ["compressed", "pumping", "flat-dynamics"],
      distorted: ["compressed", "pumping", "flat-dynamics", "clipped"]
    }
  },
  {
    id: "integrity-contamination",
    moduleId: "integrity",
    labelKey: "gate.integrity.contamination.label",
    summaryKey: "gate.integrity.contamination.summary",
    giftCards: ["hiss", "hum"],
    firstCatch: "static",
    laterUnlocks: ["buzz", "whine", "dirty"],
    anchors: ["hiss", "hum"],
    challengeAnchors: {
      static: ["hiss", "crackle"],
      buzz: ["hum", "whine"],
      whine: ["hum", "buzz"],
      dirty: ["hiss", "static", "buzz"]
    }
  },
  {
    id: "integrity-glitch",
    moduleId: "integrity",
    labelKey: "gate.integrity.glitch.label",
    summaryKey: "gate.integrity.glitch.summary",
    giftCards: ["click", "dropout"],
    firstCatch: "pop",
    laterUnlocks: ["crackle", "squeak"],
    anchors: ["click", "dropout"],
    challengeAnchors: {
      pop: ["click", "dropout"],
      crackle: ["click", "static"],
      squeak: ["click", "whine"]
    }
  }
];

export type RegionDefinition = {
  id: string;
  moduleId: DescriptorModuleId;
  labelKey: string;
  summaryKey: string;
  imageSrc: string;
  playable: boolean;
};

export const regionDefinitions: RegionDefinition[] = [
  {
    id: "a",
    moduleId: "spectral",
    labelKey: "region.a.label",
    summaryKey: "region.a.summary",
    imageSrc: "/icons/regions/spectrial-region-a-thunderstep-highlands.png",
    playable: true
  },
  {
    id: "b",
    moduleId: "spectral",
    labelKey: "region.b.label",
    summaryKey: "region.b.summary",
    imageSrc: "/icons/regions/spectrial-region-b-emberbody-valley.png",
    playable: true
  },
  {
    id: "c",
    moduleId: "spectral",
    labelKey: "region.c.label",
    summaryKey: "region.c.summary",
    imageSrc: "/icons/regions/spectrial-region-c-resonance-canyons.png",
    playable: true
  },
  {
    id: "d",
    moduleId: "spectral",
    labelKey: "region.d.label",
    summaryKey: "region.d.summary",
    imageSrc: "/icons/regions/spectrial-region-d-masking-mire.png",
    playable: true
  },
  {
    id: "g",
    moduleId: "spectral",
    labelKey: "region.g.label",
    summaryKey: "region.g.summary",
    imageSrc: "/icons/regions/spectrial-region-g-frosthollow-expanse.png",
    playable: true
  },
  {
    id: "e",
    moduleId: "spectral",
    labelKey: "region.e.label",
    summaryKey: "region.e.summary",
    imageSrc: "/icons/regions/spectrial-region-e-glassedge-spires.png",
    playable: true
  },
  {
    id: "spatial-1",
    moduleId: "spatial",
    labelKey: "region.spatial.1.label",
    summaryKey: "region.spatial.1.summary",
    imageSrc: "/icons/regions/spatial-region-1-anchorpoint-stage.png",
    playable: true
  },
  {
    id: "spatial-3",
    moduleId: "spatial",
    labelKey: "region.spatial.3.label",
    summaryKey: "region.spatial.3.summary",
    imageSrc: "/icons/regions/spatial-region-3-echoreach-halls.png",
    playable: true
  },
  {
    id: "dynamic-1",
    moduleId: "dynamic",
    labelKey: "region.dynamic.1.label",
    summaryKey: "region.dynamic.1.summary",
    imageSrc: "/icons/regions/dynamic-region-1-snapback-springs-v3.png",
    playable: true
  },
  {
    id: "dynamic-2",
    moduleId: "dynamic",
    labelKey: "region.dynamic.2.label",
    summaryKey: "region.dynamic.2.summary",
    imageSrc: "/icons/regions/dynamic-region-2-pressureflow-basin-v2.png",
    playable: true
  },
  {
    id: "integrity-1",
    moduleId: "integrity",
    labelKey: "region.integrity.1.label",
    summaryKey: "region.integrity.1.summary",
    imageSrc: "/icons/regions/integrity-region-1-faultveil-rift-v2.png",
    playable: true
  }
];
