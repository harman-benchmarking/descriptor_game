# MVP Next Iteration Discussion

This document captures the next implementation ideas before changing code. It is intentionally a discussion plan, not an implementation record.

## User Requests

Requested changes:
- Card detail view should show the `Player-Facing Identity` content from `docs/descriptor-detail-pages.md`.
- Reset/clear interaction should deselect multiple active cards quickly.
- Collection should have a development-only clear button that removes all saved progress.
- Card usage should become friendly again: clicking an unlocked card should immediately apply its filter or macro recipe.
- Card details should still be available, but not at the cost of one-click playback.
- Discovery thumbnails, `Thunderstep Highlands`, and Learn basics should have consistent square image dimensions.
- Rename the `Region A` navigation button to `Spectral`.
- The seven regions should feel more like a large MMO-style map choice with bigger pictures.

## My Recommendation

The current "click card to inspect, then press Use card" flow is too slow for a sound game. The user's instinct is right: listening needs instant feedback.

Recommended card interaction:
- Primary card click applies the card immediately.
- A separate info/detail control opens the enlarged card detail.
- Locked discovery card click opens details/hints because it cannot be played yet.
- Unlocked discovery card click plays the discovery macro immediately.
- In detail modal, keep a `Use card` button as a secondary path, but do not require it.

This gives both fast play and deep inspection:
- Fast path: click card, hear sound.
- Deep path: click info icon, read identity/details.

## Decision Update: Spectral Atlas Flow

After discussion, the Spectral screen should behave like entering an atlas/world map:

- Click `Spectral` to see only the seven regions.
- The atlas page should not show the playback strip, active cards, EQ curve, region basics, discoveries, or side panels.
- All seven region tiles should have equal visual weight and square images.
- Clicking an unlocked playable region enters a new region page.
- Inside the region page, the playback strip, active cards, EQ curve, region basics, and discoveries return.
- The region page should provide a clear `Back to Atlas` route.
- Locked preview regions can remain visible on the atlas, but they should not open the full listening tools yet.

My input:
- This is stronger than showing details below the atlas because it preserves the fantasy of "entering" a sound territory.
- It also keeps the UI cleaner: atlas is for choosing a place, region page is for listening and experimenting.
- Later, each region can have its own challenges, discoveries, and map art without crowding the top-level atlas.

## Card Detail Content

Source: `docs/descriptor-detail-pages.md`.

Use these rows from `### Player-Facing Identity` as the top of the modal:
- `Card name`
- `Creature identity`
- `Feeling`
- `Listen for`
- `Where to find it`

Then show technical rows below in a collapsed or secondary section:
- `Stable ID`
- `Aliases`
- `Card type`
- `Frequency territory`
- `EQ move`
- `Recipes and evolutions`
- `Conflicts`
- `What it is not`
- `Difficulty notes`
- `Visual identity`

Implementation options:
- Short-term: manually add MVP detail fields to TypeScript data for the 18 basics plus 4 Region A discoveries.
- Better next step: create a structured `cardDetails.ts` file copied from `descriptor-detail-pages.md`.
- Later: parse the Markdown into JSON, but that is unnecessary for the next iteration.

My recommendation:
- Use `cardDetails.ts` now. Markdown parsing would add complexity before the game loop is stable.

## Active Card Clearing

There are two different "clear" actions and they should be visually separate:

| Action | Meaning | Recommended label |
|---|---|---|
| Clear active cards | Deselect all currently active basics/discoveries; keep save progress | `Clear sound` |
| Reset progress | Remove learned basics, discoveries, settings/progress | `Reset progress` |
| Dev clear records | Remove all save records during development | `Dev: wipe save` |

Recommended behavior:
- Playback bar `Clear` should clear all active cards and return to neutral EQ.
- Settings `Reset progress` should remain a deliberate destructive action.
- Collection gets a development-only button named `Dev: wipe save`.

Open question:
- Should `Dev: wipe save` be always visible during MVP, or hidden behind a small developer toggle in Settings?

My recommendation:
- Keep it visible in Collection for now, but style it as destructive and development-only.

## Click-To-Apply Interaction

Recommended card rules:

| Card state | Primary click | Detail/info click |
|---|---|---|
| Learned basic | Toggle its filter on/off | Open details |
| Locked basic | Open details explaining how to unlock | Open details |
| Unlocked discovery | Apply macro recipe | Open details |
| Locked discovery | Open hint/details | Open details |
| Region card | Enter region if available | Open region detail/preview later |

UI affordance:
- Add a small info icon button in the card corner.
- Keep the rest of the card as the play/apply surface.
- On mobile, the info icon must be large enough to tap.

Reason:
- The sound game needs low-friction experimentation.
- The detail view is important, but it should not interrupt listening.

## Discovery Identity Logic

Current issue:
- `Rumble + Thump` unlocks `Powerful`.
- If the user adds `Airy`, the active sound should not be presented as simply `Powerful`.

Recommended rule:
- Exact recipe match controls the active identity.
- Subset recipe matches can unlock cards, but should appear as "Unlocked from this blend" or "Contained discoveries".
- Extra unmatched ingredients make the active sound a custom blend.

Examples:

| Active basics | Unlock result | Active identity |
|---|---|---|
| `Rumble + Thump` | unlocks `Powerful` | `Powerful` |
| `Rumble + Thump + Bright` | unlocks `Powerful`, `Energetic` | `Energetic` |
| `Rumble + Thump + Airy` | unlocks `Powerful` | `Custom blend` |
| `Rumble + Thump + Bright + Airy` | unlocks `Powerful`, `Energetic`, `Exciting` | `Exciting` |

Recommended UI copy:
- Active identity: `Custom blend`
- Secondary line: `Contains: Powerful`

This keeps collection rewards without misleading the player about the current sound.

## Image Dimensions

Problem:
- Some thumbnails currently render with different proportions.
- Discoveries, Learn basics, and region previews do not feel visually consistent.

Recommended card image rule:
- All descriptor and discovery card image areas use `aspect-ratio: 1 / 1`.
- Image object-fit should be `cover`.
- Card containers can differ in height, but the art window should stay square.

Recommended region map rule:
- Region map should not use tiny card thumbnails.
- The seven regions should be large map tiles.
- Each region tile should use the same square footprint, with the full picture visible.

My recommendation:
- Use square art for descriptor/discovery cards.
- Use large square region panels for the Spectral map.
- This keeps the atlas visually stable and makes every region feel equally selectable.

## Rename Region A To Spectral

Recommended navigation:
- Rename top nav `Region A` to `Spectral`.
- The screen title can be `Spectral Atlas`.
- Region `A` remains `Thunderstep Highlands` inside the Spectral Atlas.

Reason:
- `Region A` sounds like an implementation placeholder.
- `Spectral` communicates the larger map system.
- Later dynamic/spatial/integrity systems can become separate atlas tabs or later worlds.

Possible future nav:
- `Learn`
- `Spectral`
- `Collection`
- `Sandbox`
- `Settings`

## Bigger Region Map

Goal:
- The region choice should feel like choosing a zone from an MMO map, not selecting a small menu card.

Recommended layout:
- `Spectral Atlas` screen has a large equal-tile map area.
- Region `A` is unlocked after basics are learned.
- Regions `B-G` are visible as locked preview territories.
- On desktop: use equally sized square region tiles.
- On mobile: use a vertical list of large region panels.

Region tile content:
- Large region image.
- Region name.
- Short perceptual theme.
- Lock/open state.
- Progress badge, for example `4/4 discoveries`.

My recommendation:
- Do not make the map too literal yet. Use the existing region art as big selectable territory cards first.
- Add connecting paths or atlas map lines after all seven regions become playable.

## Proposed Implementation Order

1. Restore click-to-apply behavior.
2. Add a separate info/detail icon on cards.
3. Add `cardDetails.ts` with `Player-Facing Identity` for the MVP cards.
4. Update detail modal to show player-facing identity first and technical details second.
5. Rename nav `Region A` to `Spectral` and screen title to `Spectral Atlas`.
6. Redesign Spectral screen with larger region tiles.
7. Make descriptor/discovery art windows square.
8. Add `Clear sound` behavior for active selections.
9. Add Collection `Dev: wipe save` button.
10. Add contained-discovery copy for subset unlocks.

## Open Questions Before Coding

1. For details, should the modal include all technical rows immediately, or should technical rows be collapsed by default?
2. Should `Dev: wipe save` live in Collection, Settings, or both during development?
3. Should locked basics in Learn open a detail page, or should they stay visibly locked until earned?
4. For the Spectral Atlas, do you prefer:
   - seven equally large square region panels? Current answer: yes.
5. Should exact recipe identity be strict everywhere, or should the game sometimes label "mostly Powerful" when extra compatible cards are added?

## My Preferred Answers

My preferred defaults:
- Technical rows collapsed by default.
- `Dev: wipe save` in Collection only for now.
- Locked basics can open detail pages, but the action button should say how to unlock instead of playing.
- Use one large featured Region A tile and six medium locked preview tiles.
- Keep exact identity strict; show subset discoveries separately as contained discoveries.
