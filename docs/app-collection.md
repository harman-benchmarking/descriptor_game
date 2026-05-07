# Collection

This document owns the Collection function.

## Purpose

Collection is the player's record of learned basics, unlocked Discovery recipes, and unlocked alias vocabulary.

## Current Sections

Collection groups cards by descriptor module:

- Basics from `descriptorCatalog`
- Discoveries from `discoveryCards`
- Alias cards from `aliasVocabularyCards`

Within each module grid, cards are ordered as basics, aliases, then Discoveries. Locked cards remain visible as silhouettes or placeholders. Basics and Discoveries can still be opened for detail inspection while locked; locked alias tiles are disabled until the alias is unlocked.

## Card Families Included

| Module | Basic descriptors |
|---|---|
| Spectral | `Rumble`, `Thump`, `Boomy`, `Punchy`, `Thin`, `Muddy`, `Warm`, `Boxy`, `Hollow`, `Honky`, `Nasal`, `Shouty`, `Harsh`, `Dull`, `Sibilant`, `Glassy`, `Bright`, `Airy` |
| Spatial | `Left`, `Right`, `Centered`, `Near`, `Far`, `Focused`, `Blurred`, `Wide`, `Narrow`, `Dry`, `Reverberant` |
| Dynamic | `Snappy`, `Softened`, `Tight`, `Loose`, `Compressed`, `Pumping`, `Flat` (`flat-dynamics`), `Clipped`, `Distorted` |
| Integrity | `Hiss`, `Static`, `Hum`, `Buzz`, `Whine`, `Dirty`, `Click`, `Pop`, `Crackle`, `Dropout`, `Squeak` |

| Module | Discovery cards |
|---|---|
| Spectral | `Powerful`, `Impactful`, `Shimmering`, `Tinny`, `Spitty`, `Metallic`, `Aggressive`, `Sharp`, `Crisp`, `Scooped`, `Distant`, `Lean`, `Empty`, `Faded`, `Full`, `Thick`, `Bassy`, `Vivid`, `Bloated`, `Muffled`, `Mellow`, `Chesty`, `Cupped`, `Pinched`, `Tubular`, `Brassy`, `Cloudy`, `Canned`, `Reedy`, `Brittle`, `Cold`, `Woolly`, `Fatiguing`, `Veiled`, `Energetic`, `Vintage`, `Plasticky`, `Congested`, `Exciting`, `Piercing`, `Buried` |
| Spatial | `Precise`, `Diffuse`, `Intimate`, `Set Back`, `Spacious` |
| Dynamic | `Sluggish`, `Surging`, `Overdriven` |
| Integrity | none yet |

| Module | Alias cards |
|---|---|
| Spectral | `Droning`, `Lacking`, `Weak`, `Colored`, `Presence`, `Dark`, `Lightweight`, `Edgy`, `Shrill`, `Shiny`, `Extended`, `Squawky` |
| Spatial | `Anechoic`, `Echoey` |
| Dynamic | none yet |
| Integrity | `Electrical`, `Burst` |

## Details Included

The Collection is the main detail-browsing surface.

Descriptor detail modals show:

- icon or locked placeholder;
- card label and summary;
- parsed detail rows when present in `public/docs/descriptor-detail-pages.md`: `Creature identity`, `Feeling`, `Listen for`, `Where to find it`, `Frequency territory`, `EQ move`, `Recipes and evolutions`, `What it is not`, and `Difficulty notes`;
- related alias cards that point to the descriptor;
- Discovery evolutions that use the descriptor as an ingredient;
- a `Use card` action only when the basic is learned.

Discovery detail modals show:

- icon and explanation when unlocked, or a locked placeholder and hint when locked;
- alias cards that name the Discovery, then basic ingredient cards when the Discovery is unlocked;
- a `Use card` action only when the Discovery is unlocked.

Alias detail modals show:

- icon;
- alias summary;
- each language-example prompt;
- anchor descriptor cards, or the linked Discovery card when the alias names a Discovery directly.

The parser also recognizes `Where to find it`, but the current detail modal does not render that field.

## Dev Buttons

Collection currently includes dev buttons:

| Button | Effect |
|---|---|
| `Dev: get all basics` | Writes every basic id to `learnedBasicIds`. |
| `Dev: get all discoveries` | Writes every Discovery id to `unlockedDiscoveryIds`. |
| `Dev: get all aliases` | Writes every alias id to `unlockedAliasIds`. |
| `Dev: wipe save` | Clears local progress and resets app state. |

These buttons are intentionally in Collection because they are card-state tools, not player-facing settings.

## Implementation References

- UI: `web/app/src/app/App.tsx` `CollectionScreen`
- Dev unlock handlers: `unlockAllBasics`, `unlockAllDiscoveries`, `unlockAllAliases`
- Basics: `web/app/src/cards/descriptorCatalog.ts`
- Discoveries: `web/app/src/cards/discoveryRecipes.ts`
- Aliases: `web/app/src/cards/aliasVocabulary.ts`
