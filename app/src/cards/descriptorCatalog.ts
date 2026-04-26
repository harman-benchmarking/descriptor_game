import type { DescriptorCard, DescriptorGroup, EqFilterSpec } from "./cardTypes";

const iconPath = (id: string) => `/icons/descriptors/${id}.png`;

const card = (
  id: string,
  group: DescriptorGroup,
  aliases: string[],
  filter: EqFilterSpec,
  conflictsWith: string[],
  headphoneRecommended = false
): DescriptorCard => ({
  id,
  role: "basic",
  group,
  aliases,
  filters: [filter],
  conflictsWith,
  icon: {
    src: iconPath(id),
    altKey: `card.${id}.alt`
  },
  learning: {
    recommendedStartIntensity: 1.8,
    revealCurveAfterCompletions: 1,
    headphoneRecommended
  },
  textKeys: {
    label: `card.${id}.label`,
    summary: `card.${id}.summary`
  }
});

export const descriptorCatalog: DescriptorCard[] = [
  card("rumble", "bass", ["Droning"], { frequencyHz: 35, gainDb: 4.5, q: 0.7 }, ["thin"], true),
  card("thump", "bass", [], { frequencyHz: 55, gainDb: 3.5, q: 0.9 }, ["thin"], true),
  card("boomy", "bass", ["Bassy"], { frequencyHz: 70, gainDb: 4.5, q: 0.65 }, ["thin"]),
  card("punchy", "bass", [], { frequencyHz: 95, gainDb: 3.5, q: 1.2 }, ["thin"]),
  card("thin", "bass", ["Lacking", "Weak"], { frequencyHz: 100, gainDb: -5.0, q: 0.7 }, [
    "rumble",
    "thump",
    "boomy",
    "punchy",
    "muddy",
    "warm"
  ]),
  card("muddy", "bass", ["Bassy"], { frequencyHz: 125, gainDb: 4.5, q: 0.8 }, ["thin"]),
  card("warm", "mid", ["Chesty"], { frequencyHz: 250, gainDb: 3.0, q: 0.7 }, ["thin", "hollow"]),
  card("boxy", "mid", ["Chesty"], { frequencyHz: 350, gainDb: 4.0, q: 1.1 }, []),
  card("hollow", "mid", ["Cold", "Muffled"], { frequencyHz: 600, gainDb: -5.0, q: 0.85 }, ["warm"]),
  card("honky", "mid", ["Colored"], { frequencyHz: 900, gainDb: 4.2, q: 1.15 }, []),
  card("nasal", "mid", [], { frequencyHz: 1800, gainDb: 4.0, q: 1.2 }, []),
  card("shouty", "mid", ["Presence"], { frequencyHz: 2600, gainDb: 4.8, q: 1.05 }, []),
  card("harsh", "treble", ["Tinny", "Metallic"], { frequencyHz: 4000, gainDb: 4.5, q: 1.0 }, ["dull"]),
  card("dull", "treble", ["Dark", "Muffled"], { frequencyHz: 6500, gainDb: -5.0, q: 0.55 }, [
    "bright",
    "airy",
    "harsh",
    "sibilant",
    "shrill"
  ]),
  card("sibilant", "treble", ["Crisp"], { frequencyHz: 8000, gainDb: 5.0, q: 1.5 }, ["dull", "shrill"]),
  card("shrill", "treble", [], { frequencyHz: 8500, gainDb: 6.0, q: 1.9 }, ["dull", "sibilant"]),
  card("bright", "treble", ["Crisp"], { frequencyHz: 10000, gainDb: 3.5, q: 0.65 }, ["dull"], true),
  card("airy", "treble", [], { frequencyHz: 14000, gainDb: 3.0, q: 0.7 }, ["dull"], true)
];

export const descriptorById = new Map(descriptorCatalog.map((descriptor) => [descriptor.id, descriptor]));

export const allBasicIds = descriptorCatalog.map((descriptor) => descriptor.id);

export function getDescriptorOrThrow(id: string): DescriptorCard {
  const descriptor = descriptorById.get(id);
  if (!descriptor) {
    throw new Error(`Unknown descriptor: ${id}`);
  }
  return descriptor;
}
