import type { AudioProfile, DescriptorCard, DescriptorGroup, DescriptorModuleId, EqFilterSpec } from "./cardTypes";

const iconPath = (id: string) => `/icons/descriptors/${id}.png`;
const placeholderIconPath = "/icons/descriptors/0000.png";
const completedProfileIconIds = new Set([
  "left",
  "right",
  "centered",
  "near",
  "far",
  "dry",
  "reverberant",
  "snappy",
  "softened",
  "tight",
  "loose",
  "compressed",
  "pumping",
  "flat-dynamics",
  "clipped",
  "distorted",
  "hiss",
  "hum",
  "buzz",
  "click",
  "crackle",
  "dropout",
  "focused",
  "blurred",
  "wide",
  "narrow",
  "static",
  "whine",
  "dirty",
  "pop",
  "squeak"
]);
const profileIconSourceIds = new Map([["flat-dynamics", "flat"]]);
const profileIconPath = (id: string) => (completedProfileIconIds.has(id) ? iconPath(profileIconSourceIds.get(id) ?? id) : placeholderIconPath);

const spectralCard = (
  id: string,
  group: DescriptorGroup,
  aliases: string[],
  filter: EqFilterSpec,
  conflictsWith: string[],
  headphoneRecommended = false
): DescriptorCard => ({
  id,
  role: "basic",
  moduleId: "spectral",
  group,
  aliases,
  filters: [filter],
  audioProfile: {
    kind: "spectralEq",
    filters: [filter]
  },
  conflictsWith,
  icon: {
    src: iconPath(id),
    altKey: `card.${id}.alt`
  },
  learning: {
    recommendedStartIntensity: 2.0,
    revealCurveAfterCompletions: 1,
    headphoneRecommended
  },
  textKeys: {
    label: `card.${id}.label`,
    summary: `card.${id}.summary`
  }
});

const profileCard = (
  id: string,
  moduleId: Exclude<DescriptorModuleId, "spectral">,
  group: DescriptorGroup,
  audioProfile: AudioProfile,
  conflictsWith: string[] = [],
  headphoneRecommended = false,
  aliases: string[] = []
): DescriptorCard => ({
  id,
  role: "basic",
  moduleId,
  group,
  aliases,
  filters: [],
  audioProfile,
  conflictsWith,
  icon: {
    src: profileIconPath(id),
    altKey: `card.${id}.alt`
  },
  learning: {
    recommendedStartIntensity: 2.0,
    revealCurveAfterCompletions: 1,
    headphoneRecommended
  },
  textKeys: {
    label: `card.${id}.label`,
    summary: `card.${id}.summary`
  }
});

export const spectralDescriptors: DescriptorCard[] = [
  spectralCard("rumble", "bass", ["Droning"], { frequencyHz: 35, gainDb: 4.0, q: 0.7 }, ["thin"], true),
  spectralCard("thump", "bass", [], { frequencyHz: 55, gainDb: 3.0, q: 0.9 }, ["thin"], true),
  spectralCard("boomy", "bass", [], { frequencyHz: 70, gainDb: 4.5, q: 0.65 }, ["thin"]),
  spectralCard("punchy", "bass", [], { frequencyHz: 95, gainDb: 3.5, q: 1.2 }, ["thin"]),
  spectralCard("thin", "bass", ["Weak", "Lightweight"], { frequencyHz: 100, gainDb: -5.0, q: 0.7 }, [
    "rumble",
    "thump",
    "boomy",
    "punchy",
    "muddy",
    "warm"
  ]),
  spectralCard("muddy", "bass", [], { frequencyHz: 125, gainDb: 4.5, q: 0.8 }, ["thin"]),
  spectralCard("warm", "mid", [], { frequencyHz: 250, gainDb: 3.0, q: 0.7 }, ["thin", "hollow"]),
  spectralCard("boxy", "mid", [], { frequencyHz: 350, gainDb: 4.0, q: 1.1 }, []),
  spectralCard("hollow", "mid", ["Lacking"], { frequencyHz: 600, gainDb: -5.0, q: 0.85 }, ["warm", "boxy", "honky"]),
  spectralCard("honky", "mid", ["Colored"], { frequencyHz: 900, gainDb: 4.2, q: 1.15 }, []),
  spectralCard("nasal", "mid", [], { frequencyHz: 1800, gainDb: 4.0, q: 1.2 }, []),
  spectralCard("shouty", "mid", ["Presence"], { frequencyHz: 2600, gainDb: 4.8, q: 1.05 }, []),
  spectralCard("harsh", "treble", ["Edgy"], { frequencyHz: 4000, gainDb: 4.5, q: 1.0 }, ["dull"]),
  spectralCard("dull", "treble", ["Dark"], { frequencyHz: 6500, gainDb: -5.0, q: 0.55 }, [
    "bright",
    "airy",
    "harsh",
    "sibilant",
    "glassy"
  ]),
  spectralCard("sibilant", "treble", ["Shrill"], { frequencyHz: 8000, gainDb: 5.0, q: 1.5 }, ["dull"]),
  spectralCard("glassy", "treble", [], { frequencyHz: 6300, gainDb: 4.5, q: 1.15 }, ["dull"]),
  spectralCard("bright", "treble", ["Shiny"], { frequencyHz: 10000, gainDb: 3.5, q: 0.65 }, ["dull"], true),
  spectralCard("airy", "treble", ["Extended"], { frequencyHz: 14000, gainDb: 4.0, q: 0.7 }, ["dull"], true)
];

export const spatialDescriptors: DescriptorCard[] = [
  profileCard("left", "spatial", "spatial-position", { kind: "spatial", profileId: "left" }, ["right", "centered"], true),
  profileCard("right", "spatial", "spatial-position", { kind: "spatial", profileId: "right" }, ["left", "centered"], true),
  profileCard("centered", "spatial", "spatial-position", { kind: "spatial", profileId: "centered" }, ["left", "right"], true),
  profileCard("near", "spatial", "spatial-position", { kind: "spatial", profileId: "near" }, ["far"], true),
  profileCard("far", "spatial", "spatial-position", { kind: "spatial", profileId: "far" }, ["near"], true),
  profileCard("focused", "spatial", "spatial-image", { kind: "spatial", profileId: "focused" }, ["blurred"], true),
  profileCard("blurred", "spatial", "spatial-image", { kind: "spatial", profileId: "blurred" }, ["focused"], true),
  profileCard("wide", "spatial", "spatial-image", { kind: "spatial", profileId: "wide" }, ["narrow"], true),
  profileCard("narrow", "spatial", "spatial-image", { kind: "spatial", profileId: "narrow" }, ["wide"], true),
  profileCard("dry", "spatial", "spatial-image", { kind: "spatial", profileId: "dry" }, ["reverberant"], true, ["Anechoic"]),
  profileCard("reverberant", "spatial", "spatial-image", { kind: "spatial", profileId: "reverberant" }, ["dry"], true, ["Echoey"])
];

export const dynamicDescriptors: DescriptorCard[] = [
  profileCard("snappy", "dynamic", "dynamic-snapback", { kind: "dynamic", profileId: "snappy" }, ["softened"]),
  profileCard("softened", "dynamic", "dynamic-snapback", { kind: "dynamic", profileId: "softened" }, ["snappy"]),
  profileCard("tight", "dynamic", "dynamic-snapback", { kind: "dynamic", profileId: "tight" }, ["loose"]),
  profileCard("loose", "dynamic", "dynamic-snapback", { kind: "dynamic", profileId: "loose" }, ["tight"]),
  profileCard("compressed", "dynamic", "dynamic-pressureflow", { kind: "dynamic", profileId: "compressed" }),
  profileCard("pumping", "dynamic", "dynamic-pressureflow", { kind: "dynamic", profileId: "pumping" }),
  profileCard("flat-dynamics", "dynamic", "dynamic-pressureflow", { kind: "dynamic", profileId: "flat" }),
  profileCard("clipped", "dynamic", "dynamic-pressureflow", { kind: "dynamic", profileId: "clipped" }),
  profileCard("distorted", "dynamic", "dynamic-pressureflow", { kind: "dynamic", profileId: "distorted" })
];

export const integrityDescriptors: DescriptorCard[] = [
  profileCard("hiss", "integrity", "integrity-contamination", { kind: "integrity", profileId: "hiss" }),
  profileCard("static", "integrity", "integrity-contamination", { kind: "integrity", profileId: "static" }),
  profileCard("hum", "integrity", "integrity-contamination", { kind: "integrity", profileId: "hum" }, [], false, ["Electrical"]),
  profileCard("buzz", "integrity", "integrity-contamination", { kind: "integrity", profileId: "buzz" }, [], false, ["Electrical"]),
  profileCard("whine", "integrity", "integrity-contamination", { kind: "integrity", profileId: "whine" }),
  profileCard("dirty", "integrity", "integrity-contamination", { kind: "integrity", profileId: "dirty" }),
  profileCard("click", "integrity", "integrity-glitch", { kind: "integrity", profileId: "click" }),
  profileCard("pop", "integrity", "integrity-glitch", { kind: "integrity", profileId: "pop" }, [], false, ["Burst"]),
  profileCard("crackle", "integrity", "integrity-glitch", { kind: "integrity", profileId: "crackle" }),
  profileCard("dropout", "integrity", "integrity-glitch", { kind: "integrity", profileId: "dropout" }),
  profileCard("squeak", "integrity", "integrity-glitch", { kind: "integrity", profileId: "squeak" })
];

export const descriptorCatalog: DescriptorCard[] = [
  ...spectralDescriptors,
  ...spatialDescriptors,
  ...dynamicDescriptors,
  ...integrityDescriptors
];

const aliasIdFor = (alias: string) => alias.toLowerCase().trim().replace(/[-\s]+/g, "_");

export const descriptorById = new Map<string, DescriptorCard>(descriptorCatalog.map((descriptor) => [descriptor.id, descriptor]));

for (const descriptor of descriptorCatalog) {
  for (const alias of descriptor.aliases) {
    const aliasId = aliasIdFor(alias);
    if (!descriptorById.has(aliasId)) {
      descriptorById.set(aliasId, descriptor);
    }
  }
}

export const allBasicIds = descriptorCatalog.map((descriptor) => descriptor.id);
export const spectralBasicIds = spectralDescriptors.map((descriptor) => descriptor.id);

export function basicIdsForModule(moduleId: DescriptorModuleId): string[] {
  return descriptorCatalog.filter((descriptor) => descriptor.moduleId === moduleId).map((descriptor) => descriptor.id);
}

export function getDescriptorOrThrow(id: string): DescriptorCard {
  const descriptor = descriptorById.get(id);
  if (!descriptor) {
    throw new Error(`Unknown descriptor: ${id}`);
  }
  return descriptor;
}
