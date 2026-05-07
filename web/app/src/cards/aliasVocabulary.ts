import type { DescriptorModuleId } from "./cardTypes";

export type AliasVocabularyKind = "single_anchor" | "ambiguous" | "discovery_alias";

export type AliasVocabularyCard = {
  id: string;
  label: string;
  moduleId: DescriptorModuleId;
  kind: AliasVocabularyKind;
  anchorIds: string[];
  discoveryAnchorIds?: string[];
  summary: string;
  icon: {
    src: string;
    alt: string;
  };
  contexts: AliasVocabularyContext[];
};

export type AliasVocabularyContext = {
  id: string;
  prompt: string;
  answerIds: string[];
  optionIds: string[];
  explanation: string;
};

const aliasIconPath = (id: string) => `/icons/descriptors/${id}.png`;

export const aliasVocabularyCards: AliasVocabularyCard[] = [
  {
    id: "droning",
    label: "Droning",
    moduleId: "spectral",
    kind: "single_anchor",
    anchorIds: ["rumble"],
    summary: "Sustained low movement pointing toward Rumble.",
    icon: {
      src: aliasIconPath("droning"),
      alt: "Droning alias card"
    },
    contexts: [
      {
        id: "droning-low-roll",
        prompt: "The low end keeps rolling underneath the music.",
        answerIds: ["rumble"],
        optionIds: ["thump", "rumble", "punchy", "boomy"],
        explanation: "That sustained sub movement is closest to Rumble."
      }
    ]
  },
  {
    id: "lacking",
    label: "Lacking",
    moduleId: "spectral",
    kind: "single_anchor",
    anchorIds: ["hollow"],
    summary: "A casual way to describe a missing center or empty body.",
    icon: {
      src: aliasIconPath("lacking"),
      alt: "Lacking alias card"
    },
    contexts: [
      {
        id: "lacking-center",
        prompt: "The sound feels empty in the middle, like the body has been scooped out.",
        answerIds: ["hollow"],
        optionIds: ["thin", "dull", "hollow", "softened"],
        explanation: "That missing center points toward the Hollow anchor."
      }
    ]
  },
  {
    id: "weak",
    label: "Weak",
    moduleId: "spectral",
    kind: "single_anchor",
    anchorIds: ["thin"],
    summary: "An emotional word for missing weight or foundation.",
    icon: {
      src: aliasIconPath("weak"),
      alt: "Weak alias card"
    },
    contexts: [
      {
        id: "weak-weight",
        prompt: "The sound lacks weight and cannot push forward.",
        answerIds: ["thin"],
        optionIds: ["softened", "flat-dynamics", "thin", "hollow"],
        explanation: "Weak can mean reduced body, so Thin is the closest anchor here."
      }
    ]
  },
  {
    id: "colored",
    label: "Colored",
    moduleId: "spectral",
    kind: "single_anchor",
    anchorIds: ["honky"],
    summary: "Midrange tone that sounds tinted or shaped.",
    icon: {
      src: aliasIconPath("colored"),
      alt: "Colored alias card"
    },
    contexts: [
      {
        id: "colored-mid",
        prompt: "Voices sound tinted by a cup-like midrange color.",
        answerIds: ["honky"],
        optionIds: ["boxy", "nasal", "warm", "honky"],
        explanation: "That projected mid color points toward Honky."
      }
    ]
  },
  {
    id: "presence",
    label: "Presence",
    moduleId: "spectral",
    kind: "single_anchor",
    anchorIds: ["shouty"],
    summary: "Forward upper-mid energy that brings sound closer.",
    icon: {
      src: aliasIconPath("presence"),
      alt: "Presence alias card"
    },
    contexts: [
      {
        id: "presence-forward",
        prompt: "The vocal steps forward and becomes more immediate.",
        answerIds: ["shouty"],
        optionIds: ["bright", "sibilant", "shouty", "harsh"],
        explanation: "Forward upper-mid push is the Shouty anchor."
      }
    ]
  },
  {
    id: "dark",
    label: "Dark",
    moduleId: "spectral",
    kind: "single_anchor",
    anchorIds: ["dull"],
    summary: "Reduced top-end light and detail.",
    icon: {
      src: aliasIconPath("dark"),
      alt: "Dark alias card"
    },
    contexts: [
      {
        id: "dark-top",
        prompt: "Cymbals and small details lose light at the top.",
        answerIds: ["dull"],
        optionIds: ["hollow", "dull", "muddy", "warm"],
        explanation: "Reduced top detail is the Dull anchor."
      }
    ]
  },
  {
    id: "lightweight",
    label: "Lightweight",
    moduleId: "spectral",
    kind: "single_anchor",
    anchorIds: ["thin"],
    summary: "A papery word for sound that cannot carry much body or weight.",
    icon: {
      src: aliasIconPath("lightweight"),
      alt: "Lightweight alias card"
    },
    contexts: [
      {
        id: "lightweight-body",
        prompt: "The sound feels papery and underfilled, like it cannot hold much weight.",
        answerIds: ["thin"],
        optionIds: ["hollow", "thin", "softened", "dull"],
        explanation: "That missing weight and body points toward the Thin anchor."
      }
    ]
  },
  {
    id: "edgy",
    label: "Edgy",
    moduleId: "spectral",
    kind: "single_anchor",
    anchorIds: ["harsh"],
    summary: "A casual word for upper sound that feels hard, abrasive, or tiring.",
    icon: {
      src: aliasIconPath("edgy"),
      alt: "Edgy alias card"
    },
    contexts: [
      {
        id: "edgy-upper-edge",
        prompt: "Guitars and vocals have a rough upper edge that starts to feel uncomfortable.",
        answerIds: ["harsh"],
        optionIds: ["sibilant", "harsh", "shouty", "bright"],
        explanation: "That abrasive upper edge points toward Harsh."
      }
    ]
  },
  {
    id: "shrill",
    label: "Shrill",
    moduleId: "spectral",
    kind: "single_anchor",
    anchorIds: ["sibilant"],
    summary: "A strong word for painful hissy treble that points toward Sibilant.",
    icon: {
      src: aliasIconPath("shrill"),
      alt: "Shrill alias card"
    },
    contexts: [
      {
        id: "shrill-hissy-pain",
        prompt: "The high edge feels painfully hissy and piercing on consonants.",
        answerIds: ["sibilant"],
        optionIds: ["glassy", "sibilant", "harsh", "bright"],
        explanation: "Painful hiss and consonant bite point toward Sibilant."
      }
    ]
  },
  {
    id: "shiny",
    label: "Shiny",
    moduleId: "spectral",
    kind: "single_anchor",
    anchorIds: ["bright"],
    summary: "A broad word for extra top-end light and polished glint.",
    icon: {
      src: aliasIconPath("shiny"),
      alt: "Shiny alias card"
    },
    contexts: [
      {
        id: "shiny-top-light",
        prompt: "Cymbals and vocal details catch extra glossy light at the top.",
        answerIds: ["bright"],
        optionIds: ["airy", "bright", "sibilant", "harsh"],
        explanation: "General top-end shine is closest to Bright before it becomes bite or hiss."
      }
    ]
  },
  {
    id: "extended",
    label: "Extended",
    moduleId: "spectral",
    kind: "single_anchor",
    anchorIds: ["airy"],
    summary: "A word for treble that reaches upward and keeps open space above the tone.",
    icon: {
      src: aliasIconPath("extended"),
      alt: "Extended alias card"
    },
    contexts: [
      {
        id: "extended-high-reach",
        prompt: "The very top seems to reach upward, with breath and cymbal tails floating above the mix.",
        answerIds: ["airy"],
        optionIds: ["bright", "glassy", "airy", "sibilant"],
        explanation: "That high reach and open air points toward Airy more than ordinary Bright."
      }
    ]
  },
  {
    id: "squawky",
    label: "Squawky",
    moduleId: "spectral",
    kind: "discovery_alias",
    anchorIds: [],
    discoveryAnchorIds: ["brassy"],
    summary: "Alias language for Brassy: a rough brassy bite in everyday listening words.",
    icon: {
      src: aliasIconPath("squawky"),
      alt: "Squawky alias card"
    },
    contexts: [
      {
        id: "squawky-brassy-bite",
        prompt: "A voice or lead tone sounds squawky, with a brassy bite instead of a smooth tone.",
        answerIds: ["brassy"],
        optionIds: ["pinched", "brassy", "canned", "metallic"],
        explanation: "In this app, Squawky resolves to the Brassy discovery card."
      }
    ]
  },
  {
    id: "anechoic",
    label: "Anechoic",
    moduleId: "spatial",
    kind: "single_anchor",
    anchorIds: ["dry"],
    summary: "A technical word for sound with almost no room reflection around it.",
    icon: {
      src: aliasIconPath("anechoic"),
      alt: "Anechoic alias card"
    },
    contexts: [
      {
        id: "anechoic-no-room",
        prompt: "A voice sounds close and reflection-free, with notes stopping almost immediately.",
        answerIds: ["dry"],
        optionIds: ["near", "dry", "centered", "reverberant"],
        explanation: "Reflection-free space points toward Dry."
      }
    ]
  },
  {
    id: "echoey",
    label: "Echoey",
    moduleId: "spatial",
    kind: "single_anchor",
    anchorIds: ["reverberant"],
    summary: "A casual word for sound whose room reflections keep returning after the source.",
    icon: {
      src: aliasIconPath("echoey"),
      alt: "Echoey alias card"
    },
    contexts: [
      {
        id: "echoey-room-return",
        prompt: "A clap keeps coming back from the room after the source has stopped.",
        answerIds: ["reverberant"],
        optionIds: ["wide", "far", "dry", "reverberant"],
        explanation: "Obvious returning room reflections point toward Reverberant."
      }
    ]
  },
  {
    id: "electrical",
    label: "Electrical",
    moduleId: "integrity",
    kind: "ambiguous",
    anchorIds: ["hum", "buzz"],
    summary: "A broad fault word for powered interference that may be smooth like Hum or rough like Buzz.",
    icon: {
      src: aliasIconPath("electrical"),
      alt: "Electrical alias card"
    },
    contexts: [
      {
        id: "electrical-power-leak",
        prompt: "A powered-on tone or vibration sits under the music and feels separate from the song.",
        answerIds: ["hum", "buzz"],
        optionIds: ["hiss", "hum", "buzz", "static"],
        explanation: "Electrical is broad enough that Hum and Buzz can both be valid fault anchors."
      }
    ]
  },
  {
    id: "burst",
    label: "Burst",
    moduleId: "integrity",
    kind: "single_anchor",
    anchorIds: ["pop"],
    summary: "A larger single playback fault that jumps out once and vanishes.",
    icon: {
      src: aliasIconPath("burst"),
      alt: "Burst alias card"
    },
    contexts: [
      {
        id: "burst-single-fault",
        prompt: "One rounded fault jumps out during a quiet gap, bigger than a tiny click but still just one moment.",
        answerIds: ["pop"],
        optionIds: ["click", "pop", "crackle", "dropout"],
        explanation: "That single larger fault event points toward Pop."
      }
    ]
  }
];

export const aliasVocabularyById = new Map(aliasVocabularyCards.map((card) => [card.id, card]));

export const aliasVocabularyContextOrder = aliasVocabularyCards.flatMap((card) =>
  card.contexts.map((context) => ({
    aliasId: card.id,
    context
  }))
);
