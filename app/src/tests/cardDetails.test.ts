import { describe, expect, it } from "vitest";
import { parseDescriptorDetailPages } from "../cards/cardDetails";

describe("card detail parser", () => {
  it("extracts player-facing identity rows from descriptor detail markdown", () => {
    const markdown = `
## Rumble

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | \`Rumble\` |
| Creature identity | **The Floor-Shaker**: a slow sub-bass creature. |
| Feeling | The sound gains weight. |
| Listen for | Sub synths and kick drums. |
| Where to find it | Region \`A\`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | \`rumble\` |
`;

    const details = parseDescriptorDetailPages(markdown);
    expect(details.rumble.cardName).toBe("Rumble");
    expect(details.rumble.creatureIdentity).toBe("The Floor-Shaker: a slow sub-bass creature.");
    expect(details.rumble.listenFor).toBe("Sub synths and kick drums.");
    expect(details.rumble.whereToFindIt).toBe("Region A.");
  });
});
