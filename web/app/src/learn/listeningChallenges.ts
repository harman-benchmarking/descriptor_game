import type { GateId } from "../data/regions";

export type ListeningOptionLabel = "A" | "B" | "C";

export type ListeningTrialOption = {
  label: ListeningOptionLabel;
  descriptorId: string;
};

export type ListeningChallengeDefinition = {
  gateId: GateId;
  targetId: string;
  confuserIds: string[];
};

export type ListeningTrial = {
  targetId: string;
  options: ListeningTrialOption[];
};

const challengeDefinitions: ListeningChallengeDefinition[] = [
  {
    gateId: "bass",
    targetId: "thump",
    confuserIds: ["boomy", "thin"]
  },
  {
    gateId: "bass",
    targetId: "rumble",
    confuserIds: ["boomy", "thin"]
  },
  {
    gateId: "bass",
    targetId: "punchy",
    confuserIds: ["thin", "thump"]
  },
  {
    gateId: "bass",
    targetId: "muddy",
    confuserIds: ["boomy", "thin"]
  },
  {
    gateId: "mid",
    targetId: "honky",
    confuserIds: ["hollow", "boxy"]
  },
  {
    gateId: "mid",
    targetId: "warm",
    confuserIds: ["hollow", "boxy"]
  },
  {
    gateId: "mid",
    targetId: "nasal",
    confuserIds: ["hollow", "honky"]
  },
  {
    gateId: "mid",
    targetId: "shouty",
    confuserIds: ["hollow", "honky"]
  },
  {
    gateId: "treble",
    targetId: "harsh",
    confuserIds: ["bright", "dull"]
  },
  {
    gateId: "treble",
    targetId: "sibilant",
    confuserIds: ["dull", "bright"]
  },
  {
    gateId: "treble",
    targetId: "glassy",
    confuserIds: ["dull", "sibilant"]
  },
  {
    gateId: "treble",
    targetId: "airy",
    confuserIds: ["bright", "dull"]
  },
  {
    gateId: "spatial-position",
    targetId: "centered",
    confuserIds: ["left", "right"]
  },
  {
    gateId: "spatial-position",
    targetId: "near",
    confuserIds: ["centered", "far"]
  },
  {
    gateId: "spatial-position",
    targetId: "far",
    confuserIds: ["centered", "near"]
  },
  {
    gateId: "spatial-image",
    targetId: "wide",
    confuserIds: ["narrow", "blurred"]
  },
  {
    gateId: "spatial-image",
    targetId: "narrow",
    confuserIds: ["wide", "focused"]
  },
  {
    gateId: "spatial-image",
    targetId: "dry",
    confuserIds: ["reverberant", "focused"]
  },
  {
    gateId: "spatial-image",
    targetId: "reverberant",
    confuserIds: ["dry", "blurred"]
  },
  {
    gateId: "dynamic-snapback",
    targetId: "softened",
    confuserIds: ["tight", "loose"]
  },
  {
    gateId: "dynamic-snapback",
    targetId: "snappy",
    confuserIds: ["softened", "tight"]
  },
  {
    gateId: "dynamic-pressureflow",
    targetId: "flat-dynamics",
    confuserIds: ["compressed", "pumping"]
  },
  {
    gateId: "dynamic-pressureflow",
    targetId: "clipped",
    confuserIds: ["flat-dynamics", "compressed"]
  },
  {
    gateId: "dynamic-pressureflow",
    targetId: "distorted",
    confuserIds: ["clipped", "pumping"]
  },
  {
    gateId: "integrity-contamination",
    targetId: "static",
    confuserIds: ["hiss", "crackle"]
  },
  {
    gateId: "integrity-contamination",
    targetId: "buzz",
    confuserIds: ["hum", "whine"]
  },
  {
    gateId: "integrity-contamination",
    targetId: "whine",
    confuserIds: ["hum", "buzz"]
  },
  {
    gateId: "integrity-contamination",
    targetId: "dirty",
    confuserIds: ["hiss", "static"]
  },
  {
    gateId: "integrity-glitch",
    targetId: "pop",
    confuserIds: ["click", "dropout"]
  },
  {
    gateId: "integrity-glitch",
    targetId: "crackle",
    confuserIds: ["click", "static"]
  },
  {
    gateId: "integrity-glitch",
    targetId: "squeak",
    confuserIds: ["click", "whine"]
  }
];

export function listeningChallengeFor(gateId: GateId, targetId: string): ListeningChallengeDefinition | undefined {
  return challengeDefinitions.find((definition) => definition.gateId === gateId && definition.targetId === targetId);
}

export function createListeningTrial(
  definition: ListeningChallengeDefinition,
  random: () => number = Math.random
): ListeningTrial {
  const optionIds = [definition.targetId, ...definition.confuserIds.slice(0, 2)];

  for (let index = optionIds.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [optionIds[index], optionIds[swapIndex]] = [optionIds[swapIndex], optionIds[index]];
  }

  return {
    targetId: definition.targetId,
    options: optionIds.map((descriptorId, index) => ({
      label: ["A", "B", "C"][index] as ListeningOptionLabel,
      descriptorId
    }))
  };
}
