# Spectral Descriptors

This document is the source-of-truth for the Spectral descriptor module: EQ moves, conflicts, recipes, spectral regions, vocabulary, and frequency ladder.

Related player-facing descriptor identity work lives in `descriptor-detail-pages.md`.
Icon visual language and prompt wording live in `descriptor-icon-design-language.md`.
The companion module files are `descriptor-spatial-descriptors.md`, `descriptor-dynamic-descriptors.md`, and `descriptor-integrity-descriptors.md`.

## Spectral Product Shape

Visible basics: `18`

Unlockable discoveries: `41`, including the promoted `Bassy` and `Vivid` combo cards and the Frosthollow `Empty` and `Faded` combo cards.

Total descriptor vocabulary represented by this spectral roadmap: `59`

Basic groups:
- `Bass`: low frequency movement, impact, bloom, body loss, mud.
- `Mid`: warmth, enclosure, hollow body, honk, nasal color, shout.
- `Treble`: edge, dullness, glassiness, sibilance, brightness, air.

Discovery tiers:

| Tier | Ingredient count | Current UI name | Game meaning |
|---|---:|---|---|
| `COMBO` | `2` | `Combo` | simple recipe, early discovery |
| `BIG_COMBO` | `3` | `Big combo` | stronger identity, mid-game recipe |
| `MEGA_COMBO` | `4..5` | `Mega combo` | rare recipe, boss/card/achievement tier |

## Basic Descriptor Catalog

### Bass Basics

| ID | Label | Aliases | EQ | Summary | Conflicts |
|---|---|---|---|---|---|
| `rumble` | `Rumble` | `Droning` | `35 Hz, +4.0 dB, Q 0.7` | deep sub-bass movement felt more than heard | `Thin` |
| `thump` | `Thump` | none | `55 Hz, +3.0 dB, Q 0.9` | short low-bass impact and physical hit | `Thin` |
| `boomy` | `Boomy` | none | `70 Hz, +4.5 dB, Q 0.65` | broad low-end bloom and lingering bass | `Thin` |
| `punchy` | `Punchy` | none | `95 Hz, +3.5 dB, Q 1.2` | focused bass hit with more attack than bloom | `Thin` |
| `thin` | `Thin` | `Lacking`, `Weak` | `100 Hz, -5.0 dB, Q 0.7` | reduced bass and body foundation | `Rumble`, `Thump`, `Boomy`, `Punchy`, `Muddy`, `Warm` |
| `muddy` | `Muddy` | none | `125 Hz, +4.5 dB, Q 0.8` | upper-bass cloud that masks clarity | `Thin` |

### Mid Basics

| ID | Label | Aliases | EQ | Summary | Conflicts |
|---|---|---|---|---|---|
| `warm` | `Warm` | none | `250 Hz, +3.0 dB, Q 0.7` | broad low-mid body without obvious boxiness | `Thin`, `Hollow` |
| `boxy` | `Boxy` | none | `350 Hz, +4.0 dB, Q 1.1` | narrow low-mid enclosure or cardboard resonance | none |
| `hollow` | `Hollow` | none | `600 Hz, -5.0 dB, Q 0.85` | scooped body that makes the center feel empty | `Warm` |
| `honky` | `Honky` | `Colored` | `900 Hz, +4.2 dB, Q 1.15` | colored cup-like midrange projection | none |
| `nasal` | `Nasal` | none | `1800 Hz, +4.0 dB, Q 1.2` | forward nose-like resonance in voices and leads | none |
| `shouty` | `Shouty` | `Presence` | `2600 Hz, +4.8 dB, Q 1.05` | aggressive presence that makes vocals push forward | none |

### Treble Basics

| ID | Label | Aliases | EQ | Summary | Conflicts |
|---|---|---|---|---|---|
| `harsh` | `Harsh` | none | `4000 Hz, +4.5 dB, Q 1.0` | upper-mid and lower-treble edge that causes fatigue | `Dull` |
| `dull` | `Dull` | `Dark` | `6500 Hz, -5.0 dB, Q 0.55` | broad loss of detail and openness | `Bright`, `Airy`, `Harsh`, `Glassy`, `Sibilant` |
| `glassy` | `Glassy` | none | `6300 Hz, +4.5 dB, Q 1.15` | hard reflective upper-treble sheen | `Dull` |
| `sibilant` | `Sibilant` | `Shrill` | `8000 Hz, +5.0 dB, Q 1.5` | consonants and cymbal edges jump forward | `Dull` |
| `bright` | `Bright` | none | `10000 Hz, +3.5 dB, Q 0.65` | broad top-end openness and shine | `Dull` |
| `airy` | `Airy` | none | `14000 Hz, +4.0 dB, Q 0.7` | high-treble extension and open air above the mix | `Dull` |

### Descriptor Detail Pages

Detailed card-back/page content lives in `descriptor-detail-pages.md` for separate design discussion.

## Conflict System

The current behavior is replacement, not blocking.

When selecting a descriptor:
1. If the descriptor is already active, remove it.
2. If it is inactive, check conflict rules in both directions.
3. Remove any active conflicting descriptors.
4. Add the new descriptor.
5. Sort active descriptor IDs by catalog order.
6. Re-apply EQ.
7. Show removed descriptor names in the inspector.

Conflict pairs:

| Conflict | Reason |
|---|---|
| `Rumble` vs `Thin` | sub foundation boost vs body loss |
| `Thump` vs `Thin` | low impact boost vs body loss |
| `Boomy` vs `Thin` | bass bloom vs bass/body reduction |
| `Punchy` vs `Thin` | focused low punch vs body loss |
| `Muddy` vs `Thin` | upper-bass lift vs body loss |
| `Warm` vs `Thin` | low-mid body vs reduced foundation |
| `Warm` vs `Hollow` | body fullness vs scooped center |
| `Harsh` vs `Dull` | edge/pain vs reduced detail |
| `Bright` vs `Dull` | shine/open top vs darkening |
| `Airy` vs `Dull` | air extension vs top-end reduction |
| `Sibilant` vs `Dull` | narrow treble bite vs broad treble cut |
| `Glassy` vs `Dull` | hard reflective sheen vs broad treble cut |

Game interpretation:
- Conflicts are elemental oppositions.
- Replacement can become a strategic move rather than an error.
- The player can learn "sound chemistry": some traits stack, others displace.

## Discovery Recipes

Discovery labels do not add new filters. They name combinations of selected basic descriptors.

Matching rules:
- A recipe matches when all ingredients are active.
- Multiple recipes can match at once.
- The collection records every matched recipe.
- The active curve label shows one primary recipe.

Primary discovery sorting:
1. More ingredients wins.
2. Higher priority wins.
3. Catalog order breaks ties.

Validation rules:
- Recipe IDs must be unique.
- Every ingredient must exist as a basic descriptor.
- Two recipes cannot use the same ingredient set.
- Ingredient count must match the tier.
- A recipe cannot contain conflicting descriptors.

### Combo Recipes

| ID | Discovery | Ingredients | Priority | Explanation |
|---|---|---|---:|---|
| `tinny` | `Tinny` | `Thin + Harsh` | `80` | weak body plus upper edge |
| `spitty` | `Spitty` | `Thin + Sibilant` | `90` | exposed consonants without enough body |
| `metallic` | `Metallic` | `Harsh + Glassy` | `80` | upper edge plus reflective hard sheen |
| `full` | `Full` | `Warm + Bright` | `70` | low-mid body with an open top |
| `thick` | `Thick` | `Warm + Boomy` | `70` | body plus excess low-end mass |
| `bassy` | `Bassy` | `Boomy + Boxy` | `70` | low-end bloom plus boxy low-mid enclosure |
| `vivid` | `Vivid` | `Boomy + Bright` | `70` | low-end bloom plus bright top clarity |
| `bloated` | `Bloated` | `Boomy + Muddy` | `70` | low bloom plus upper-bass cloud |
| `muffled` | `Muffled` | `Muddy + Dull` | `70` | cloud plus missing detail |
| `mellow` | `Mellow` | `Warm + Dull` | `60` | body with a softened top |
| `chesty` | `Chesty` | `Warm + Boxy` | `70` | warm body plus enclosed low-mid resonance |
| `cupped` | `Cupped` | `Boxy + Honky` | `75` | enclosure plus mid projection |
| `pinched` | `Pinched` | `Honky + Nasal` | `75` | forward mid color plus nose resonance |
| `tubular` | `Tubular` | `Boxy + Nasal` | `70` | box enclosure plus nasal tube color |
| `brassy` | `Brassy` | `Nasal + Harsh` | `75` | nasal resonance with a hard upper edge |
| `cloudy` | `Cloudy` | `Muddy + Boxy` | `75` | low-mid cloud plus enclosure |
| `aggressive` | `Aggressive` | `Shouty + Harsh` | `80` | presence push plus fatigue |
| `shimmering` | `Shimmering` | `Bright + Airy` | `75` | broad top shine plus high air extension |
| `scooped` | `Scooped` | `Hollow + Airy` | `80` | recessed center with open air above it |
| `lean` | `Lean` | `Thin + Bright` | `80` | missing body plus clear exposed top |
| `sharp` | `Sharp` | `Bright + Harsh` | `75` | clear top-end shine plus hard upper edge |
| `crisp` | `Crisp` | `Bright + Glassy` | `70` | broad treble plus hard polished definition |
| `distant` | `Distant` | `Hollow + Dull` | `70` | scooped center plus reduced detail |
| `empty` | `Empty` | `Thin + Hollow` | `75` | missing foundation plus missing center body |
| `faded` | `Faded` | `Thin + Dull` | `70` | reduced body plus reduced detail |
| `powerful` | `Powerful` | `Rumble + Thump` | `70` | deep low extension plus impact |
| `impactful` | `Impactful` | `Thump + Punchy` | `70` | low hit plus focused punch |

### Big Combo Recipes

| ID | Discovery | Ingredients | Priority | Explanation |
|---|---|---|---:|---|
| `canned` | `Canned` | `Boxy + Honky + Nasal` | `100` | stacked enclosure and mid resonances |
| `reedy` | `Reedy` | `Boxy + Nasal + Harsh` | `95` | boxed nasal tone with a dry hard edge |
| `brittle` | `Brittle` | `Thin + Bright + Sibilant` | `95` | light body plus exposed high frequencies |
| `woolly` | `Woolly` | `Boomy + Muddy + Dull` | `90` | heavy low end plus weak detail |
| `fatiguing` | `Fatiguing` | `Shouty + Harsh + Sibilant` | `100` | forward presence plus sharp high-frequency pain |
| `cold` | `Cold` | `Thin + Hollow + Airy` | `85` | missing body with exposed air |
| `veiled` | `Veiled` | `Muddy + Boxy + Dull` | `90` | low-mid clutter plus missing clarity |
| `energetic` | `Energetic` | `Rumble + Thump + Bright` | `80` | big low-end impact plus shine |
| `vintage` | `Vintage` | `Warm + Boxy + Dull` | `80` | thick low mids plus softened top |

### Mega Combo Recipes

| ID | Discovery | Ingredients | Priority | Explanation |
|---|---|---|---:|---|
| `congested` | `Congested` | `Muddy + Boxy + Honky + Dull` | `120` | many masking regions with reduced top clarity |
| `plasticky` | `Plasticky` | `Thin + Hollow + Harsh + Glassy` | `120` | low body, scooped center, and artificial reflective bite |
| `exciting` | `Exciting` | `Rumble + Thump + Bright + Airy` | `110` | low-end force plus extended top |
| `buried` | `Buried` | `Boomy + Muddy + Boxy + Honky + Dull` | `130` | too much low/mid masking with reduced clarity |
| `piercing` | `Piercing` | `Thin + Hollow + Shouty + Harsh + Sibilant` | `130` | body loss plus stacked upper-mid and treble emphasis |

### Recipe Evolution Relationships

Some higher-tier discoveries naturally contain lower-tier discoveries. This is useful for progression because a card can evolve from a known recipe by adding one more descriptor.

Example:
- `Energetic = Rumble + Thump + Bright`
- `Exciting = Rumble + Thump + Bright + Airy`
- Therefore: `Exciting = Energetic + Airy`

Big combo relationships:

| Higher card | Contains lower card(s) | Evolution reading |
|---|---|---|
| `Canned` | `Cupped`, `Pinched`, `Tubular` | `Canned = Cupped + Nasal = Pinched + Boxy = Tubular + Honky` |
| `Reedy` | `Tubular`, `Brassy` | `Reedy = Tubular + Harsh = Brassy + Boxy` |
| `Brittle` | `Spitty`, `Lean` | `Brittle = Spitty + Bright = Lean + Sibilant` |
| `Woolly` | `Bloated`, `Muffled` | `Woolly = Bloated + Dull = Muffled + Boomy` |
| `Fatiguing` | `Aggressive` | `Fatiguing = Aggressive + Sibilant` |
| `Cold` | `Scooped`, `Empty` | `Cold = Scooped + Thin = Empty + Airy` |
| `Veiled` | `Muffled`, `Cloudy` | `Veiled = Muffled + Boxy = Cloudy + Dull` |
| `Energetic` | `Powerful` | `Energetic = Powerful + Bright` |
| `Vintage` | `Mellow`, `Chesty` | `Vintage = Mellow + Boxy = Chesty + Dull` |

Mega combo relationships:

| Higher card | Contains lower card(s) | Evolution reading |
|---|---|---|
| `Congested` | `Muffled`, `Cupped`, `Veiled`, `Cloudy` | `Congested = Veiled + Honky = Muffled + Cupped = Cloudy + Honky + Dull` |
| `Plasticky` | `Tinny`, `Metallic` | `Plasticky = Tinny + Hollow + Glassy = Metallic + Thin + Hollow` |
| `Exciting` | `Powerful`, `Energetic`, `Shimmering` | `Exciting = Energetic + Airy = Powerful + Shimmering` |
| `Buried` | `Bloated`, `Muffled`, `Cupped`, `Woolly`, `Veiled`, `Cloudy`, `Congested` | `Buried = Congested + Boomy = Woolly + Cupped = Veiled + Boomy + Honky` |
| `Piercing` | `Tinny`, `Spitty`, `Aggressive`, `Fatiguing` | `Piercing = Fatiguing + Thin + Hollow = Aggressive + Spitty + Hollow` |

Design implications:
- These relationships can become visible evolution chains after the player unlocks the lower card.
- A hinted recipe can say "add Air" after `Energetic` is unlocked, instead of revealing the full `Exciting` recipe immediately.
- `Cold` now has two-card bridge discoveries, which should make that unlock feel less abrupt.
- `Plasticky` has lower combo bridges but no current big-combo bridge; it jumps from simple recipe fragments to a mega identity.
- `Crisp` now uses `Glassy`, so it no longer bridges into `Brittle`; `Brittle` still uses `Sibilant` for consonant bite.
- Region C now keeps the harsher extension path focused on `Brassy` and `Reedy`; `Squawky` is alias language for `Brassy` rather than a separate craftable recipe.
- Scoopshine Basin is retired; `Scooped` survives in Frosthollow Expanse, while `V-shaped` and `Hyped` are retired until a future replacement plan is chosen.
- The recently promoted bridge recipes below target the biggest progression gaps without adding new filters.
- This suggests an optional future design pass: either keep remaining jumps for mystery, or add intermediate bridge recipes if progression needs to feel smoother.

### Recently Promoted Descriptor Bridges

These bridge descriptors are now part of the live combo recipe table above. They add common audio vocabulary and make several higher-tier discoveries easier to teach.

| Priority | Discovery | Recipe | Best home | Why it helps | Current status |
|---|---|---|---|---|---|
| High | `Shimmering` | `Bright + Airy` | `A` Thunderstep Highlands | Natural treble-positive bridge before `Exciting`. | live combo |
| High | `Scooped` | `Hollow + Airy` | `G` Frosthollow Expanse | Bridges into `Cold = Scooped + Thin` and keeps the retired Scoopshine vocabulary's strongest reusable piece. | live combo |
| High | `Lean` | `Thin + Bright` | `E` Glassedge Spires | Very common audio word; missing body plus clear/exposed top. Bridges `Brittle` without adding load to Frosthollow's Airy-based cold branch. | live combo |
| High | `Empty` | `Thin + Hollow` | `G` Frosthollow Expanse | Plain daily-language bridge for missing foundation plus missing center; can evolve into `Cold = Empty + Airy`. | live combo |
| Medium | `Faded` | `Thin + Dull` | `G` Frosthollow Expanse | Plain daily-language cut-only bridge for reduced body plus reduced detail. | live combo |
| Medium | `Bassy` | `Boomy + Boxy` | `B` Emberbody Valley | Promoted from alias; makes "bassy" a concrete low bloom plus box-enclosure recipe instead of a loose `Boomy`/`Muddy` synonym. | live combo |
| Medium | `Vivid` | `Boomy + Bright` | `B` Emberbody Valley | Gives Floor 1 a simple two-ended boost card without borrowing `Exciting` or retired smile-curve vocabulary. | live combo |
| Medium | `Chesty` | `Warm + Boxy` | `B` Emberbody Valley | Promoted from alias; bridges `Vintage = Chesty + Dull`. | live combo |
| Medium | `Cloudy` | `Muddy + Boxy` | `D` Masking Mire | Good bridge into `Veiled = Cloudy + Dull`. | live combo |
| Medium-low | `Tubular` | `Boxy + Nasal` | `C` Resonance Canyons | Completes the C-region triangle, but name may overlap with `Canned`. | live combo |
| Medium-low | `Sharp` | `Bright + Harsh` | `E` Glassedge Spires | Useful hard-bright bridge, but risks overlap with `Harsh`, `Glassy`, and `Crisp`. | live combo |

Naming notes:
- `Sharp` remains the canonical live discovery for `Bright + Harsh`; do not add `Glary` as a separate recipe with the same ingredients.
- `Glary` can remain a possible alias for `Sharp` if source/user language needs it later.
- `Cloudy` should be tested against `Muffled`, `Veiled`, and `Muddy` so it reads as low-mid cloud plus enclosure, not merely darkened detail.
- `Tubular` needs playtest validation because it may feel close to `Canned`, `Cupped`, or `Honky`.

### Evolution Atlas Roadmap

This is the full current roadmap for all descriptor cards involved in combo and evolution play. It is not a single tree. It is a set of connected atlas regions.

Atlas node types:

| Node type | Meaning |
|---|---|
| `Element` | selectable basic descriptor card |
| `Combo` | two-element discovery |
| `Big combo` | three-element discovery |
| `Mega combo` | four/five-element apex discovery |
| `Shortcut` | unlocked discovery card that can stand in for its ingredients |
| `Direct discovery` | higher-tier recipe without a lower recipe bridge |
| `Side branch` | useful card with no current higher evolution |

Region naming rule:
- A region name should describe the main perceptual destination of that branch, not every support ingredient.
- Some basics can appear in more than one region because their role changes by recipe context. For example, `Bright` can mean open balance in Region `B`, hard top detail in Region `E`, or clean shine in Region `A`; `Airy` can mean high extension in Region `A` or cold open exposure in Region `G`.
- If a support ingredient becomes part of the region's main emotional identity, the region name should acknowledge it.

Geographical map names:

| Region | Map name | Functional subtitle |
|---|---|---|
| `A` | `Thunderstep Highlands` | impact, energy, and spark |
| `B` | `Emberbody Valley` | warmth, body, and fullness |
| `C` | `Resonance Canyons` | mid enclosure, nasal edge, and brassy bite |
| `D` | `Masking Mire` | mud, masking, and burial |
| `G` | `Frosthollow Expanse` | distance, coldness, emptiness, and exposed air |
| `E` | `Glassedge Spires` | treble edge, artificiality, and pain |

#### Region A: Thunderstep Highlands (Impact, Energy, And Spark) Roadmap

Theme: physical bass force, impact, top-end spark, excitement.

Elements involved:
- `Rumble`
- `Thump`
- `Punchy`
- `Bright`
- `Airy`

Roadmap:

```text
Rumble + Thump
      |
   Powerful
      + Bright
      |
   Energetic
      + Airy
      |
   Exciting

Bright + Airy
      |
  Shimmering
      + Powerful
      |
   Exciting

Thump + Punchy
      |
   Impactful
```

Table:

| Stage | Card | Recipe | Role |
|---|---|---|---|
| Element | `Rumble` | basic | deep sub movement |
| Element | `Thump` | basic | low-bass hit |
| Element | `Punchy` | basic | focused bass attack |
| Element | `Bright` | basic | top-end shine |
| Element | `Airy` | basic | high-treble extension |
| Combo | `Powerful` | `Rumble + Thump` | first bass-force discovery |
| Combo | `Impactful` | `Thump + Punchy` | side branch for transient-style low impact |
| Combo | `Shimmering` | `Bright + Airy` | treble-positive sparkle bridge |
| Big combo | `Energetic` | `Powerful + Bright` | bass force with shine |
| Mega combo | `Exciting` | `Energetic + Airy` or `Powerful + Shimmering` | full low-end force plus extended top |

Design notes:
- `Exciting = Energetic + Airy` is the cleanest current evolution example.
- `Shimmering = Bright + Airy` gives the treble-positive half of `Exciting` its own reward card before bass force is added.
- `Impactful` is a side branch. It teaches `Thump` versus `Punchy`, but no current higher recipe uses it.
- This region is a good early atlas path because the sound changes should be relatively easy to hear at higher intensity.

#### Region B: Emberbody Valley (Warmth, Body, And Fullness) Roadmap

Theme: fullness, warmth, bassy body, vivid bass-plus-bright color, thickness, mellow or softened detail.

Elements involved:
- `Warm`
- `Bright`
- `Boomy`
- `Dull`
- `Boxy`

Roadmap:

```text
Warm + Bright
      |
    Full

Warm + Boomy
      |
    Thick

Boomy + Boxy
      |
    Bassy

Boomy + Bright
      |
    Vivid

Warm + Dull
      |
   Mellow
      + Boxy
      |
   Vintage

Warm + Boxy
      |
    Chesty
      + Dull
      |
   Vintage
```

Table:

| Stage | Card | Recipe | Role |
|---|---|---|---|
| Element | `Warm` | basic | low-mid body |
| Element | `Bright` | basic | open top |
| Element | `Boomy` | basic | low-end bloom |
| Element | `Dull` | basic | reduced detail |
| Element | `Boxy` | basic | enclosure resonance |
| Combo | `Full` | `Warm + Bright` | balanced body plus open top |
| Combo | `Thick` | `Warm + Boomy` | warm body plus low-end mass |
| Combo | `Bassy` | `Boomy + Boxy` | bass bloom plus boxed low-mid body |
| Combo | `Vivid` | `Boomy + Bright` | bass bloom plus bright top clarity |
| Combo | `Mellow` | `Warm + Dull` | body with softened top |
| Combo | `Chesty` | `Warm + Boxy` | warm body plus enclosed low-mid resonance |
| Big combo | `Vintage` | `Mellow + Boxy` or `Chesty + Dull` | softened, thick, enclosed character |

Design notes:
- `Full` and `Thick` are good positive/reward cards.
- `Bassy` belongs here because its main identity is bass/body abundance; `Boxy` is the borrowed enclosure ingredient.
- `Vivid` belongs here as the simple two-ended boost card: `Boomy` plus `Bright`, without the hollow center used by retired smile-curve vocabulary.
- `Mellow -> Vintage` is a strong emotional evolution: soft becomes nostalgic/colored.
- `Chesty` gives the warm-plus-boxy body bridge a common audio word before `Dull` turns it into `Vintage`.
- `Warm` conflicts with `Hollow`, so this region should feel like the opposite of the cold/scooped region.

#### Region C: Resonance Canyons (Mid Enclosure And Edge) Roadmap

Theme: cup, nose, box, enclosure, small-device coloration, and harder brassy/reedy edge.

Elements involved:
- `Boxy`
- `Honky`
- `Nasal`
- `Harsh`

Roadmap:

```text
Boxy + Honky
      |
   Cupped
      + Nasal
      |
   Canned

Honky + Nasal
      |
   Pinched
      + Boxy
      |
   Canned

Boxy + Nasal
      |
   Tubular
      + Honky
      |
    Canned

Nasal + Harsh
      |
   Brassy
      + Boxy
      |
   Reedy
```

Table:

| Stage | Card | Recipe | Role |
|---|---|---|---|
| Element | `Boxy` | basic | cabinet/cardboard resonance |
| Element | `Honky` | basic | cup-like mid projection |
| Element | `Nasal` | basic | nose-like resonance |
| Element | `Harsh` | basic | hard upper edge |
| Combo | `Cupped` | `Boxy + Honky` | enclosed projection |
| Combo | `Pinched` | `Honky + Nasal` | squeezed nasal mid color |
| Combo | `Tubular` | `Boxy + Nasal` | box enclosure plus nasal tube color |
| Combo | `Brassy` | `Nasal + Harsh` | nasal resonance with hard bite |
| Big combo | `Canned` | `Cupped + Nasal`, `Pinched + Boxy`, or `Tubular + Honky` | stacked enclosure and mid resonances |
| Big combo | `Reedy` | `Tubular + Harsh` or `Brassy + Boxy` | boxed nasal tone with dry edge |

Design notes:
- `Canned` is a good example of a card with two parents.
- `Tubular` completes the `Boxy + Nasal` side of the triangle, but should be playtested against `Canned` for naming overlap.
- `Brassy` is the first audition target for `Nasal + Harsh`; it should sound like nasal tone acquiring a hard brass-like edge, not like broad brightness.
- `Squawky` remains useful daily language, but it now lives as an alias card for `Brassy` so the Canyons shelf stays focused.
- `Reedy` is the stronger three-card candidate. Keep it under playtest until the naming feels distinct enough from `Canned`, `Brassy`, and generic `Harsh`.
- This branch should be visually compact and container-like.
- It is likely useful for audio-system rating because small speakers and cheap devices often produce this family of coloration.

#### Region D: Masking Mire (Mud, Masking, And Burial) Roadmap

Theme: low-mid cloud, masking, covered detail, buried sound.

Elements involved:
- `Boomy`
- `Muddy`
- `Dull`
- `Boxy`
- `Honky`

Roadmap:

```text
Boomy + Muddy
      |
   Bloated
      + Dull
      |
   Woolly

Muddy + Dull
      |
   Muffled
      + Boxy
      |
   Veiled
      + Honky
      |
   Congested
      + Boomy
      |
   Buried

Muddy + Boxy
      |
   Cloudy
      + Dull
      |
   Veiled

Boxy + Honky
      |
   Cupped
      + Muffled
      |
   Congested
      + Boomy
      |
   Buried
```

Table:

| Stage | Card | Recipe | Role |
|---|---|---|---|
| Element | `Boomy` | basic | low-end bloom |
| Element | `Muddy` | basic | upper-bass cloud |
| Element | `Dull` | basic | reduced top detail |
| Element | `Boxy` | basic | enclosed low-mid tone |
| Element | `Honky` | basic | projected mid color |
| Combo | `Bloated` | `Boomy + Muddy` | swollen bass/low-mid mass |
| Combo | `Muffled` | `Muddy + Dull` | cloud plus missing detail |
| Combo | `Cloudy` | `Muddy + Boxy` | low-mid cloud plus enclosure |
| Combo | `Cupped` | `Boxy + Honky` | enclosed mid projection |
| Big combo | `Woolly` | `Bloated + Dull` or `Muffled + Boomy` | heavy low end plus weak detail |
| Big combo | `Veiled` | `Muffled + Boxy` or `Cloudy + Dull` | low-mid clutter plus missing clarity |
| Mega combo | `Congested` | `Veiled + Honky`, `Muffled + Cupped`, or `Cloudy + Honky + Dull` | many masking regions |
| Mega combo | `Buried` | `Congested + Boomy`, `Woolly + Cupped`, or `Veiled + Boomy + Honky` | extreme masking and reduced clarity |

Design notes:
- This region is the strongest negative audio-system-rating branch.
- `Buried` has the richest parentage in the current atlas.
- `Cloudy` gives `Muddy + Boxy` a lower bridge into `Veiled`, so `Veiled` no longer has to appear only as a direct three-card discovery.
- This branch can teach the difference between low-end quantity and actual clarity.

#### Region G: Frosthollow Expanse (Distance, Coldness, And Emptiness) Roadmap

Theme: missing body, distance, reduced detail, exposed air.

Elements involved:
- `Hollow`
- `Dull`
- `Thin`
- `Airy`

Roadmap:

```text
Hollow + Dull
      |
   Distant

Thin + Hollow
      |
    Empty
      + Airy
      |
     Cold

Thin + Dull
      |
    Faded

Thin + Hollow + Airy
      |
    Cold

Hollow + Airy
      |
   Scooped
      + Thin
      |
    Cold

```

Table:

| Stage | Card | Recipe | Role |
|---|---|---|---|
| Element | `Hollow` | basic | scooped center/body |
| Element | `Dull` | basic | reduced detail |
| Element | `Thin` | basic | missing foundation |
| Element | `Airy` | basic | exposed high-air extension |
| Combo | `Distant` | `Hollow + Dull` | far-away, reduced-detail sound |
| Combo | `Scooped` | `Hollow + Airy` | recessed center with open air above it |
| Combo | `Empty` | `Thin + Hollow` | missing foundation plus missing center body |
| Combo | `Faded` | `Thin + Dull` | reduced body plus reduced detail |
| Big combo | `Cold` | `Thin + Hollow + Airy`, `Scooped + Thin`, or `Empty + Airy` | missing body with exposed air |

Design notes:
- `Distant` and `Cold` should feel related emotionally, but they do not currently evolve into each other.
- `Cold` now uses `Airy`, not `Bright`, so it reads as missing body plus cold open extension rather than simple shine.
- `Cold` has two lower bridge readings: `Scooped + Thin` and `Empty + Airy`.
- `Lean` now belongs to the Glassedge body-loss path, not this region, so Frosthollow can stay focused on `Dull`, `Hollow`, `Thin`, and `Airy`.
- `Faded` is a cut-only Frosthollow side branch. It should read as loss of body plus loss of detail, not dynamic lifelessness.
- This branch should be useful for describing lean, analytical, or emotionally detached systems.

#### Region E: Glassedge Spires (Treble Edge, Artificiality, And Pain) Roadmap

Theme: thinness, sibilance, glassiness, metal, artificial tone, fatigue, piercing pain.

Elements involved:
- `Thin`
- `Harsh`
- `Glassy`
- `Sibilant`
- `Hollow`
- `Bright`
- `Shouty`

Roadmap:

```text
Thin + Harsh
      |
    Tinny

Thin + Sibilant
      |
   Spitty
      + Bright
      |
   Brittle

Bright + Glassy
      |
     Crisp

Thin + Bright
      |
     Lean
      + Sibilant
      |
    Brittle

Bright + Harsh
      |
     Sharp

Harsh + Glassy
      |
   Metallic

Shouty + Harsh
      |
  Aggressive
      + Sibilant
      |
   Fatiguing

Thin + Hollow + Harsh + Glassy
      |
   Plasticky

Thin + Hollow + Shouty + Harsh + Sibilant
      |
   Piercing
```

Table:

| Stage | Card | Recipe | Role |
|---|---|---|---|
| Element | `Thin` | basic | reduced body/foundation |
| Element | `Harsh` | basic | upper edge/fatigue |
| Element | `Glassy` | basic | reflective upper-treble sheen |
| Element | `Sibilant` | basic | consonant and cymbal bite |
| Element | `Hollow` | basic | scooped center |
| Element | `Bright` | basic | broad top shine |
| Element | `Shouty` | basic | forward presence push |
| Combo | `Tinny` | `Thin + Harsh` | weak body plus upper edge |
| Combo | `Spitty` | `Thin + Sibilant` | exposed consonants without body |
| Combo | `Metallic` | `Harsh + Glassy` | edge plus reflective hard sheen |
| Combo | `Aggressive` | `Shouty + Harsh` | presence push plus fatigue |
| Combo | `Sharp` | `Bright + Harsh` | clear top-end shine plus hard upper edge |
| Combo | `Crisp` | `Bright + Glassy` | broad treble plus hard polished definition |
| Combo | `Lean` | `Thin + Bright` | missing body plus exposed clear top |
| Big combo | `Brittle` | `Spitty + Bright` or `Lean + Sibilant` | light body plus exposed high frequencies |
| Big combo | `Fatiguing` | `Aggressive + Sibilant` | forward presence plus sharp highs |
| Mega combo | `Plasticky` | `Tinny + Hollow + Glassy` or `Metallic + Thin + Hollow` | artificial low-body reflective bite |
| Mega combo | `Piercing` | `Fatiguing + Thin + Hollow` or `Aggressive + Spitty + Hollow` | body loss plus stacked upper emphasis |

Design notes:
- This region may be difficult for beginners because several high-frequency words are close together.
- It should be taught later, after the player understands `Bright`, `Harsh`, and `Sibilant`.
- `Glassy` sits between `Harsh` and `Sibilant` as the hard reflective sheen lesson.
- `Sharp` now gives `Bright + Harsh` a clean bridge: clearer and shinier than `Harsh`, harder-edged than `Bright`, but rougher than `Crisp`.
- `Lean` gives `Thin + Bright` a common audio word and a clean lower bridge into `Brittle`.
- `Shrill` remains useful human language, but now belongs to the alias vocabulary as a `Sibilant` alias rather than a selectable basic.
- `Piercing` currently keeps `Sibilant` because it needs consonant bite rather than `Plasticky`'s reflective artificiality.

## Complete Vocabulary Index

Selectable basics:
`Rumble`, `Thump`, `Boomy`, `Punchy`, `Thin`, `Muddy`, `Warm`, `Boxy`, `Hollow`, `Honky`, `Nasal`, `Shouty`, `Harsh`, `Dull`, `Glassy`, `Sibilant`, `Bright`, `Airy`.

Unlockable discoveries:
`Tinny`, `Spitty`, `Metallic`, `Full`, `Thick`, `Bassy`, `Vivid`, `Bloated`, `Muffled`, `Mellow`, `Chesty`, `Cupped`, `Pinched`, `Tubular`, `Brassy`, `Cloudy`, `Aggressive`, `Shimmering`, `Scooped`, `Lean`, `Sharp`, `Crisp`, `Distant`, `Empty`, `Faded`, `Powerful`, `Impactful`, `Canned`, `Reedy`, `Brittle`, `Woolly`, `Fatiguing`, `Cold`, `Veiled`, `Energetic`, `Vintage`, `Congested`, `Plasticky`, `Exciting`, `Buried`, `Piercing`.

Live basic aliases:

| Term | Current role | Maps to |
|---|---|---|
| `Droning` | alias | `Rumble` |
| `Lacking` | alias | `Thin` |
| `Weak` | alias | `Thin` |
| `Colored` | alias | `Honky` |
| `Presence` | alias | `Shouty` |
| `Dark` | alias | `Dull` |
| `Lightweight` | alias | `Thin` |
| `Edgy` | alias | `Harsh` |
| `Shrill` | alias | `Sibilant` |
| `Shiny` | alias | `Bright` |
| `Extended` | alias | `Airy` |
| `Squawky` | alias | `Brassy` |

Discovery-only labels:

| Term | Current role | Recipe |
|---|---|---|
| `Tinny` | discovery | `Thin + Harsh` |
| `Bassy` | discovery | `Boomy + Boxy` |
| `Vivid` | discovery | `Boomy + Bright` |
| `Chesty` | discovery | `Warm + Boxy` |
| `Metallic` | discovery | `Harsh + Glassy` |
| `Muffled` | discovery | `Muddy + Dull` |
| `Crisp` | discovery | `Bright + Glassy` |
| `Cold` | discovery | `Thin + Hollow + Airy` |
| `Sharp` | discovery | `Bright + Harsh` |
| `Empty` | discovery | `Thin + Hollow` |
| `Faded` | discovery | `Thin + Dull` |

Rule: a live alias must not share a label with an unlockable discovery. If a word is better as daily language for a combination, point the alias at the Discovery anchor instead of creating a duplicate recipe.

Deferred vocabulary:
- `Smooth`: useful future descriptor, but no current recipe.
- `Clean`: better treated as a neutral/reference quality unless a specific recipe is designed.
- `Flat`: playback/reference mode, not a tonal descriptor.

## HARMAN Chart To Game Frequency Ladder

| Frequency | Descriptor territory |
|---|---|
| `31 Hz` | droning, deep sub movement, part of body-loss cuts |
| `63 Hz` | boomy, low-end bloom, the low ingredient of Bassy |
| `125 Hz` | muddy, cloudy, upper-bass cloud, thin/weak when cut |
| `250 Hz` | warm, chesty, low-mid body |
| `500 Hz` | boxy, Bassy low-mid enclosure, scooped, cold/hollow/muffled when cut |
| `1 kHz` | colored, honky, tubular support |
| `2 kHz` | honky, nasal, tubular, brassy/reedy support, shouty, dull/dark/muffled when cut |
| `4 kHz` | harsh, brassy/reedy edge, tinny, metallic, dull/muffled/dark when cut |
| `6.3 kHz` | glassy, metallic sheen, crisp definition, plasticky reflective bite, dull/muffled/dark when cut |
| `8 kHz` | sibilant, spitty, fatiguing bite, shrill as alias language, dull/muffled/dark when cut |
| `16 kHz` | bright, shimmering, air, sharpness, lean exposure, dark when cut |

## Icon And Visual Material

The existing visual direction is documented in `descriptor-icon-design-language.md`.

Useful game translation:
- Each descriptor icon is a small emotional scene about sound.
- The icon should communicate the descriptor through shape, mood, color, and sound-motion cues.
- Waveforms can become characters, objects, pressure lines, vibration marks, or environmental forces.
- The basic descriptors are the visible button set.
- Discovery descriptors are the collection or reward set.
- The icon language already supports a collectible card or creature system.

Current icon target list:
- Basics: `18`
- Discoveries: `41`, including promoted `Bassy` and `Vivid` plus Frosthollow `Empty` and `Faded`
- Spectral alias cards: `12`, including `Squawky` as Brassy language
- Total spectral card icons: `71`

Current PNG assets present in `icon` include all `18` basics and many early discovery icons. There are also versioned variants for `crisp`.

Missing or not yet visible as final discovery PNGs at the time this file was written:
`Shimmering`, `Scooped`, `Lean`, `Chesty`, `Cloudy`, `Tubular`, `Sharp`, `Brittle`, `Woolly`, `Fatiguing`, `Cold`, `Veiled`, `Energetic`, `Vintage`, `Congested`, `Plasticky`, `Exciting`, `Buried`, `Piercing`.

## Region And Utility Icon Prompt Ownership

Spectral region prompt wording now lives in `descriptor-icon-design-language.md`, under `15.2 Spectral Region Icon Prompts`, beside the Spatial, Dynamic, and Integrity region prompts.

The `Review Lab` utility prompt lives in the same icon-language document under `15.6 Review Lab UI Icon Direction`.

This document keeps the Spectral roadmap, descriptor membership, recipes, and perceptual intent. The icon design-language document owns canvas rules, palette/shape locks, and copy-pasteable generation prompts.
