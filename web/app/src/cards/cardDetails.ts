export type PlayerFacingIdentity = {
  cardName?: string;
  creatureIdentity?: string;
  feeling?: string;
  listenFor?: string;
  whereToFindIt?: string;
  aliases?: string;
  frequencyTerritory?: string;
  eqMove?: string;
  recipesAndEvolutions?: string;
  whatItIsNot?: string;
  difficultyNotes?: string;
};

const rowKeyByLabel: Record<string, keyof PlayerFacingIdentity> = {
  "Card name": "cardName",
  "Creature identity": "creatureIdentity",
  Feeling: "feeling",
  "Listen for": "listenFor",
  "Where to find it": "whereToFindIt",
  Aliases: "aliases",
  "Frequency territory": "frequencyTerritory",
  "EQ move": "eqMove",
  "Recipes and evolutions": "recipesAndEvolutions",
  "What it is not": "whatItIsNot",
  "Difficulty notes": "difficultyNotes"
};

export function normalizeDetailId(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function cleanMarkdownCell(value: string): string {
  return value
    .trim()
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\\\|/g, "|");
}

export function parseDescriptorDetailPages(markdown: string): Record<string, PlayerFacingIdentity> {
  const details: Record<string, PlayerFacingIdentity> = {};
  const lines = markdown.split(/\r?\n/);
  let currentId: string | null = null;
  let inPlayerIdentity = false;

  for (const line of lines) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      currentId = normalizeDetailId(heading[1]);
      inPlayerIdentity = false;
      if (!details[currentId]) details[currentId] = {};
      continue;
    }

    if (line.startsWith("### ")) {
      inPlayerIdentity = line.trim() === "### Player-Facing Identity";
      continue;
    }

    if (!currentId || !inPlayerIdentity || !line.startsWith("|")) continue;
    const cells = line
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());
    if (cells.length < 2 || cells[0] === "Row" || cells[0].startsWith("---")) continue;

    const key = rowKeyByLabel[cells[0]];
    if (!key) continue;
    details[currentId][key] = cleanMarkdownCell(cells.slice(1).join("|"));
  }

  return details;
}
