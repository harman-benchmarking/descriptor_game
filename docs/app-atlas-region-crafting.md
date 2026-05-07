# Atlas And Region Crafting

This document owns the Atlas function: region access, ingredient trays, Discovery shelves, and blend crafting.

## Purpose

The Atlas is where learned basic descriptors become named Discovery cards. Training teaches letters; regions let the player make words.

## Region Access Rule

Regions are visible on the Atlas. A playable region opens when the player has learned all basic cards for that region's module.

Current playable region count:

| Module | Playable regions |
|---|---:|
| Spectral | `6` |
| Spatial | `2` |
| Dynamic | `2` |
| Integrity | `1` |

## Current Region Content

Region content is data-owned in `playableRegionContent`.

| Region | Ingredients | Discovery shelf |
|---|---|---|
| Thunderstep Highlands | `Rumble`, `Thump`, `Punchy`, `Bright`, `Airy` | `Powerful`, `Impactful`, `Shimmering`, `Energetic`, `Exciting` |
| Emberbody Valley | `Warm`, `Bright`, `Boomy`, `Dull`, `Boxy` | `Full`, `Thick`, `Bassy`, `Vivid`, `Mellow`, `Chesty`, `Vintage` |
| Resonance Canyons | `Boxy`, `Honky`, `Nasal`, `Harsh` | `Cupped`, `Pinched`, `Tubular`, `Brassy`, `Canned`, `Reedy` |
| Masking Mire | `Boomy`, `Muddy`, `Dull`, `Boxy`, `Honky` | `Bassy`, `Bloated`, `Muffled`, `Cloudy`, `Cupped`, `Woolly`, `Veiled`, `Congested`, `Buried` |
| Frosthollow Expanse | `Hollow`, `Dull`, `Thin`, `Airy` | `Distant`, `Scooped`, `Empty`, `Faded`, `Cold` |
| Glassedge Spires | `Thin`, `Harsh`, `Sibilant`, `Glassy`, `Hollow`, `Bright`, `Shouty` | `Tinny`, `Spitty`, `Metallic`, `Aggressive`, `Sharp`, `Crisp`, `Lean`, `Empty`, `Brittle`, `Fatiguing`, `Plasticky`, `Piercing` |
| Anchorpoint Stage | `Left`, `Right`, `Centered`, `Focused`, `Blurred`, `Wide` | `Precise`, `Diffuse` |
| Echoreach Halls | `Near`, `Far`, `Dry`, `Reverberant`, `Wide` | `Intimate`, `Set Back`, `Spacious` |
| Snapback Springs | `Snappy`, `Softened`, `Tight`, `Loose` | `Sluggish` |
| Pressurebreak Basin | `Compressed`, `Pumping`, `Flat` (`flat-dynamics`), `Clipped`, `Distorted` | `Surging`, `Overdriven` |
| Faultveil Rift | `Hiss`, `Static`, `Hum`, `Buzz`, `Whine`, `Dirty`, `Click`, `Pop`, `Crackle`, `Dropout`, `Squeak` | none yet |

`Scoopshine Basin` is retired. `Scooped` remains live in Frosthollow Expanse, while `V-Shaped` and `Hyped` are retired with the Basin until a future replacement plan is chosen. `Pressurebreak Basin` is the player-facing region label. The region image file still uses the older `pressureflow` filename. Faultveil Rift has an ingredient tray but no Discovery shelf yet, so the blend side rail is not shown for that region.

## Discovery Shelf Invariant

For every playable region:

- Every listed Discovery must be craftable from that region's ingredient tray.
- Every Discovery recipe craftable from that region's ingredient tray must appear on that region's shelf.
- Every Discovery card must have at least one playable region where all of its ingredients are available.

This prevents the class of bug where a recipe unlocks but is absent from the region shelf.

## Blend Crafting Results

`evaluateDiscoveryBlend` returns:

| Status | Meaning |
|---|---|
| `empty` | No active ingredients. |
| `unlocked` | Exact recipe match and not previously unlocked. |
| `known` | Exact recipe match and already unlocked. |
| `overloaded` | Active set contains one or more recipes plus extra ingredients. |
| `near` | Partial match close enough to hint toward a recipe. |
| `miss` | No meaningful recipe signal. |

## Details Included

Atlas details are region and recipe details, not a second Training Grounds quiz:

- Each region page lists the exact ingredient basics shown in the table above.
- Each Discovery shelf lists every recipe craftable from that region's ingredient tray.
- Locked Discovery cards remain visible by silhouette/hint; unlocked Discovery cards reveal their label, icon, and explanation.
- Discovery detail modals show the unlocked recipe's basic ingredients and let the player inspect those basic cards.
- Basic detail modals show the Discovery cards that can evolve from that basic, including locked Discovery placeholders when the recipe is not yet unlocked.
- Crafting feedback distinguishes exact new recipes, known recipes, overloaded blends, near misses, and misses.

## Implementation References

- Region and shelf data: `web/app/src/data/regions.ts`
- Region UI: `web/app/src/app/App.tsx` `RegionScreen`
- Blend side rail: `web/app/src/app/App.tsx` `RegionCraftingPanel`
- Blend rules: `web/app/src/cards/blendCrafting.ts`
- Recipe matching: `web/app/src/cards/recipeMatcher.ts`
- Guard tests: `web/app/src/tests/recipeMatcher.test.ts`
