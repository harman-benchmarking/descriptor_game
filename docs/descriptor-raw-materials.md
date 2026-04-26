# Descriptor Raw Materials

This document is the source-of-truth for descriptor data used by the collectible sound-card game: names, EQ moves, conflicts, recipes, regions, vocabulary, frequency ladder, and icon prompt material.

Related player-facing descriptor identity work lives in `descriptor-detail-pages.md`.

## Current Product Shape

Visible basics: `18`

Unlockable discoveries: `30`

Total descriptor vocabulary represented by the current system: `48`

Basic groups:
- `Bass`: low frequency movement, impact, bloom, body loss, mud.
- `Mid`: warmth, enclosure, hollow body, honk, nasal color, shout.
- `Treble`: edge, dullness, sibilance, shrillness, brightness, air.

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
| `rumble` | `Rumble` | `Droning` | `35 Hz, +4.5 dB, Q 0.7` | deep sub-bass movement felt more than heard | `Thin` |
| `thump` | `Thump` | none | `55 Hz, +3.5 dB, Q 0.9` | short low-bass impact and physical hit | `Thin` |
| `boomy` | `Boomy` | `Bassy` | `70 Hz, +4.5 dB, Q 0.65` | broad low-end bloom and lingering bass | `Thin` |
| `punchy` | `Punchy` | none | `95 Hz, +3.5 dB, Q 1.2` | focused bass hit with more attack than bloom | `Thin` |
| `thin` | `Thin` | `Lacking`, `Weak` | `100 Hz, -5.0 dB, Q 0.7` | reduced bass and body foundation | `Rumble`, `Thump`, `Boomy`, `Punchy`, `Muddy`, `Warm` |
| `muddy` | `Muddy` | `Bassy` | `125 Hz, +4.5 dB, Q 0.8` | upper-bass cloud that masks clarity | `Thin` |

### Mid Basics

| ID | Label | Aliases | EQ | Summary | Conflicts |
|---|---|---|---|---|---|
| `warm` | `Warm` | `Chesty` | `250 Hz, +3.0 dB, Q 0.7` | broad low-mid body without obvious boxiness | `Thin`, `Hollow` |
| `boxy` | `Boxy` | `Chesty` | `350 Hz, +4.0 dB, Q 1.1` | narrow low-mid enclosure or cardboard resonance | none |
| `hollow` | `Hollow` | `Cold`, `Muffled` | `600 Hz, -5.0 dB, Q 0.85` | scooped body that makes the center feel empty | `Warm` |
| `honky` | `Honky` | `Colored` | `900 Hz, +4.2 dB, Q 1.15` | colored cup-like midrange projection | none |
| `nasal` | `Nasal` | none | `1800 Hz, +4.0 dB, Q 1.2` | forward nose-like resonance in voices and leads | none |
| `shouty` | `Shouty` | `Presence` | `2600 Hz, +4.8 dB, Q 1.05` | aggressive presence that makes vocals push forward | none |

### Treble Basics

| ID | Label | Aliases | EQ | Summary | Conflicts |
|---|---|---|---|---|---|
| `harsh` | `Harsh` | `Tinny`, `Metallic` | `4000 Hz, +4.5 dB, Q 1.0` | upper-mid and lower-treble edge that causes fatigue | `Dull` |
| `dull` | `Dull` | `Dark`, `Muffled` | `6500 Hz, -5.0 dB, Q 0.55` | broad loss of detail and openness | `Bright`, `Airy`, `Harsh`, `Sibilant`, `Shrill` |
| `sibilant` | `Sibilant` | `Crisp` | `8000 Hz, +5.0 dB, Q 1.5` | consonants and cymbal edges jump forward | `Dull`, `Shrill` |
| `shrill` | `Shrill` | none | `8500 Hz, +6.0 dB, Q 1.9` | overdriven sibilance with a brittle top edge | `Dull`, `Sibilant` |
| `bright` | `Bright` | `Crisp` | `10000 Hz, +3.5 dB, Q 0.65` | broad top-end openness and shine | `Dull` |
| `airy` | `Airy` | none | `14000 Hz, +3.0 dB, Q 0.7` | high-treble extension and open air above the mix | `Dull` |

### Descriptor Detail Pages

Detailed card-back/page content has been extracted into `icon/descriptor-detail-pages.md` for separate design discussion.

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
| `Shrill` vs `Dull` | piercing top vs broad treble cut |
| `Sibilant` vs `Shrill` | same narrow high-frequency severity lane |

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
| `metallic` | `Metallic` | `Harsh + Sibilant` | `80` | upper edge plus narrow treble bite |
| `full` | `Full` | `Warm + Bright` | `70` | low-mid body with an open top |
| `thick` | `Thick` | `Warm + Boomy` | `70` | body plus excess low-end mass |
| `bloated` | `Bloated` | `Boomy + Muddy` | `70` | low bloom plus upper-bass cloud |
| `muffled` | `Muffled` | `Muddy + Dull` | `70` | cloud plus missing detail |
| `mellow` | `Mellow` | `Warm + Dull` | `60` | body with a softened top |
| `cupped` | `Cupped` | `Boxy + Honky` | `75` | enclosure plus mid projection |
| `pinched` | `Pinched` | `Honky + Nasal` | `75` | forward mid color plus nose resonance |
| `aggressive` | `Aggressive` | `Shouty + Harsh` | `80` | presence push plus fatigue |
| `crisp` | `Crisp` | `Bright + Sibilant` | `70` | broad treble plus consonant bite |
| `distant` | `Distant` | `Hollow + Dull` | `70` | scooped center plus reduced detail |
| `powerful` | `Powerful` | `Rumble + Thump` | `70` | deep low extension plus impact |
| `impactful` | `Impactful` | `Thump + Punchy` | `70` | low hit plus focused punch |

### Big Combo Recipes

| ID | Discovery | Ingredients | Priority | Explanation |
|---|---|---|---:|---|
| `canned` | `Canned` | `Boxy + Honky + Nasal` | `100` | stacked enclosure and mid resonances |
| `v_shaped` | `V-shaped` | `Boomy + Hollow + Bright` | `95` | bass and treble emphasized around a recessed center |
| `brittle` | `Brittle` | `Thin + Bright + Sibilant` | `95` | light body plus exposed high frequencies |
| `woolly` | `Woolly` | `Boomy + Muddy + Dull` | `90` | heavy low end plus weak detail |
| `fatiguing` | `Fatiguing` | `Shouty + Harsh + Sibilant` | `100` | forward presence plus sharp high-frequency pain |
| `cold` | `Cold` | `Hollow + Bright + Thin` | `85` | missing body with exposed top end |
| `veiled` | `Veiled` | `Muddy + Boxy + Dull` | `90` | low-mid clutter plus missing clarity |
| `energetic` | `Energetic` | `Rumble + Thump + Bright` | `80` | big low-end impact plus shine |
| `vintage` | `Vintage` | `Warm + Boxy + Dull` | `80` | thick low mids plus softened top |

### Mega Combo Recipes

| ID | Discovery | Ingredients | Priority | Explanation |
|---|---|---|---:|---|
| `congested` | `Congested` | `Muddy + Boxy + Honky + Dull` | `120` | many masking regions with reduced top clarity |
| `plasticky` | `Plasticky` | `Thin + Hollow + Harsh + Sibilant` | `120` | low body, scooped center, and artificial upper bite |
| `exciting` | `Exciting` | `Rumble + Thump + Bright + Airy` | `110` | low-end force plus extended top |
| `hyped` | `Hyped` | `Boomy + Hollow + Bright + Sibilant` | `120` | smile-shaped tone with extra consonant bite |
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
| `Canned` | `Cupped`, `Pinched` | `Canned = Cupped + Nasal = Pinched + Boxy = Cupped + Pinched` |
| `V-shaped` | none | no current lower recipe bridge |
| `Brittle` | `Spitty`, `Crisp` | `Brittle = Spitty + Bright = Crisp + Thin` |
| `Woolly` | `Bloated`, `Muffled` | `Woolly = Bloated + Dull = Muffled + Boomy` |
| `Fatiguing` | `Metallic`, `Aggressive` | `Fatiguing = Metallic + Shouty = Aggressive + Sibilant` |
| `Cold` | none | no current lower recipe bridge |
| `Veiled` | `Muffled` | `Veiled = Muffled + Boxy` |
| `Energetic` | `Powerful` | `Energetic = Powerful + Bright` |
| `Vintage` | `Mellow` | `Vintage = Mellow + Boxy` |

Mega combo relationships:

| Higher card | Contains lower card(s) | Evolution reading |
|---|---|---|
| `Congested` | `Muffled`, `Cupped`, `Veiled` | `Congested = Veiled + Honky = Muffled + Cupped` |
| `Plasticky` | `Tinny`, `Spitty`, `Metallic` | `Plasticky = Tinny + Hollow + Sibilant = Spitty + Hollow + Harsh = Metallic + Thin + Hollow` |
| `Exciting` | `Powerful`, `Energetic` | `Exciting = Energetic + Airy = Powerful + Bright + Airy` |
| `Hyped` | `Crisp`, `V-shaped` | `Hyped = V-shaped + Sibilant = Crisp + Boomy + Hollow` |
| `Buried` | `Bloated`, `Muffled`, `Cupped`, `Woolly`, `Veiled`, `Congested` | `Buried = Congested + Boomy = Woolly + Cupped = Veiled + Boomy + Honky` |
| `Piercing` | `Tinny`, `Spitty`, `Metallic`, `Aggressive`, `Fatiguing`, `Plasticky` | `Piercing = Plasticky + Shouty = Fatiguing + Thin + Hollow = Aggressive + Spitty + Hollow` |

Design implications:
- These relationships can become visible evolution chains after the player unlocks the lower card.
- A hinted recipe can say "add Air" after `Energetic` is unlocked, instead of revealing the full `Exciting` recipe immediately.
- Cards without a lower recipe bridge, currently `V-shaped` and `Cold`, may feel more surprising because they appear as direct three-card discoveries.
- `Plasticky` has lower combo bridges but no current big-combo bridge; it jumps from simple recipe fragments to a mega identity.
- This suggests an optional future design pass: either keep those jumps for mystery, or add intermediate bridge recipes if progression needs to feel smoother.

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
- Some basics can appear in more than one region because their role changes by recipe context. For example, `Bright` can mean open balance in Region `B`, treble bite in Region `E`, shine/hype in Region `F`, or exposed coldness in Region `G`.
- If a support ingredient becomes part of the region's main emotional identity, the region name should acknowledge it.

Geographical map names:

| Region | Map name | Functional subtitle |
|---|---|---|
| `A` | `Thunderstep Highlands` | impact, energy, and spark |
| `B` | `Emberbody Valley` | warmth, body, and fullness |
| `C` | `Resonance Canyons` | mid enclosure |
| `D` | `Masking Mire` | mud, masking, and burial |
| `E` | `Glassedge Spires` | treble edge, artificiality, and pain |
| `F` | `Scoopshine Basin` | scoop, shine, and hype |
| `G` | `Frosthollow Expanse` | distance, coldness, and emptiness |

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
| Big combo | `Energetic` | `Powerful + Bright` | bass force with shine |
| Mega combo | `Exciting` | `Energetic + Airy` | full low-end force plus extended top |

Design notes:
- `Exciting = Energetic + Airy` is the cleanest current evolution example.
- `Impactful` is a side branch. It teaches `Thump` versus `Punchy`, but no current higher recipe uses it.
- This region is a good early atlas path because the sound changes should be relatively easy to hear at practice intensity.

#### Region B: Emberbody Valley (Warmth, Body, And Fullness) Roadmap

Theme: fullness, warmth, thickness, mellow or softened detail.

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

Warm + Dull
      |
   Mellow
      + Boxy
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
| Combo | `Mellow` | `Warm + Dull` | body with softened top |
| Big combo | `Vintage` | `Mellow + Boxy` | softened, thick, enclosed character |

Design notes:
- `Full` and `Thick` are good positive/reward cards.
- `Mellow -> Vintage` is a strong emotional evolution: soft becomes nostalgic/colored.
- `Warm` conflicts with `Hollow`, so this region should feel like the opposite of the cold/scooped region.

#### Region C: Resonance Canyons (Mid Enclosure) Roadmap

Theme: cup, nose, box, enclosure, small-device coloration.

Elements involved:
- `Boxy`
- `Honky`
- `Nasal`

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
```

Table:

| Stage | Card | Recipe | Role |
|---|---|---|---|
| Element | `Boxy` | basic | cabinet/cardboard resonance |
| Element | `Honky` | basic | cup-like mid projection |
| Element | `Nasal` | basic | nose-like resonance |
| Combo | `Cupped` | `Boxy + Honky` | enclosed projection |
| Combo | `Pinched` | `Honky + Nasal` | squeezed nasal mid color |
| Big combo | `Canned` | `Cupped + Nasal` or `Pinched + Boxy` | stacked enclosure and mid resonances |

Design notes:
- `Canned` is a good example of a card with two parents.
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
| Combo | `Cupped` | `Boxy + Honky` | enclosed mid projection |
| Big combo | `Woolly` | `Bloated + Dull` or `Muffled + Boomy` | heavy low end plus weak detail |
| Big combo | `Veiled` | `Muffled + Boxy` | low-mid clutter plus missing clarity |
| Mega combo | `Congested` | `Veiled + Honky` or `Muffled + Cupped` | many masking regions |
| Mega combo | `Buried` | `Congested + Boomy`, `Woolly + Cupped`, or `Veiled + Boomy + Honky` | extreme masking and reduced clarity |

Design notes:
- This region is the strongest negative audio-system-rating branch.
- `Buried` has the richest parentage in the current atlas.
- This branch can teach the difference between low-end quantity and actual clarity.

#### Region E: Glassedge Spires (Treble Edge, Artificiality, And Pain) Roadmap

Theme: thinness, sibilance, shrillness, metal, artificial tone, fatigue, piercing pain.

Elements involved:
- `Thin`
- `Harsh`
- `Sibilant`
- `Shrill`
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

Bright + Sibilant
      |
    Crisp
      + Thin
      |
   Brittle

Harsh + Sibilant
      |
   Metallic
      + Shouty
      |
   Fatiguing

Shouty + Harsh
      |
  Aggressive
      + Sibilant
      |
   Fatiguing

Thin + Hollow + Harsh + Sibilant
      |
   Plasticky
      + Shouty
      |
   Piercing

Shrill
  standalone severe-treble lesson inside Region E
```

Table:

| Stage | Card | Recipe | Role |
|---|---|---|---|
| Element | `Thin` | basic | reduced body/foundation |
| Element | `Harsh` | basic | upper edge/fatigue |
| Element | `Sibilant` | basic | consonant and cymbal bite |
| Element | `Shrill` | basic | severe narrow high-treble edge |
| Element | `Hollow` | basic | scooped center |
| Element | `Bright` | basic | broad top shine |
| Element | `Shouty` | basic | forward presence push |
| Combo | `Tinny` | `Thin + Harsh` | weak body plus upper edge |
| Combo | `Spitty` | `Thin + Sibilant` | exposed consonants without body |
| Combo | `Metallic` | `Harsh + Sibilant` | edge plus narrow treble bite |
| Combo | `Aggressive` | `Shouty + Harsh` | presence push plus fatigue |
| Combo | `Crisp` | `Bright + Sibilant` | broad treble plus consonant bite |
| Big combo | `Brittle` | `Spitty + Bright` or `Crisp + Thin` | light body plus exposed high frequencies |
| Big combo | `Fatiguing` | `Aggressive + Sibilant` or `Metallic + Shouty` | forward presence plus sharp highs |
| Mega combo | `Plasticky` | `Tinny + Hollow + Sibilant`, `Spitty + Hollow + Harsh`, or `Metallic + Thin + Hollow` | artificial low-body upper bite |
| Mega combo | `Piercing` | `Plasticky + Shouty`, `Fatiguing + Thin + Hollow`, or `Aggressive + Spitty + Hollow` | body loss plus stacked upper emphasis |

Design notes:
- This region may be difficult for beginners because several high-frequency words are close together.
- It should be taught later, after the player understands `Bright`, `Harsh`, and `Sibilant`.
- `Shrill` belongs in Region `E` as a standalone severe-treble card, even though it is not used by the current discovery recipes.
- `Piercing` currently uses `Sibilant`, not `Shrill`, because `Shrill` conflicts with `Sibilant` in the current catalog.

#### Region F: Scoopshine Basin (Scoop, Shine, And Hype) Roadmap

Theme: smile-shaped sound, recessed center, shiny top.

Elements involved:
- `Boomy`
- `Hollow`
- `Bright`
- `Sibilant`

Roadmap:

```text
Boomy + Hollow + Bright
      |
   V-shaped
      + Sibilant
      |
    Hyped

Bright + Sibilant
      |
    Crisp
      + Boomy + Hollow
      |
    Hyped
```

Table:

| Stage | Card | Recipe | Role |
|---|---|---|---|
| Element | `Boomy` | basic | emphasized low end |
| Element | `Hollow` | basic | recessed center/body |
| Element | `Bright` | basic | top-end shine |
| Element | `Sibilant` | basic | narrow treble bite |
| Combo | `Crisp` | `Bright + Sibilant` | shiny bite |
| Big combo | `V-shaped` | `Boomy + Hollow + Bright` | bass/treble around recessed center |
| Mega combo | `Hyped` | `V-shaped + Sibilant` or `Crisp + Boomy + Hollow` | smile curve plus extra bite |

Design notes:
- `V-shaped` is a direct discovery because no current two-card recipe bridges into it.
- `Hyped = V-shaped + Sibilant` is a strong evolution once `V-shaped` is unlocked.
- This branch is important for headphone rating vocabulary.

#### Region G: Frosthollow Expanse (Distance, Coldness, And Emptiness) Roadmap

Theme: missing body, distance, reduced detail, exposed top.

Elements involved:
- `Hollow`
- `Dull`
- `Bright`
- `Thin`

Roadmap:

```text
Hollow + Dull
      |
   Distant

Hollow + Bright + Thin
      |
    Cold
```

Table:

| Stage | Card | Recipe | Role |
|---|---|---|---|
| Element | `Hollow` | basic | scooped center/body |
| Element | `Dull` | basic | reduced detail |
| Element | `Bright` | basic | exposed top |
| Element | `Thin` | basic | missing foundation |
| Combo | `Distant` | `Hollow + Dull` | far-away, reduced-detail sound |
| Big combo | `Cold` | `Hollow + Bright + Thin` | missing body with exposed top |

Design notes:
- `Distant` and `Cold` should feel related emotionally, but they do not currently evolve into each other.
- `Cold` is a direct discovery with no lower recipe bridge.
- This branch should be useful for describing lean, analytical, or emotionally detached systems.

## Complete Vocabulary Index

Selectable basics:
`Rumble`, `Thump`, `Boomy`, `Punchy`, `Thin`, `Muddy`, `Warm`, `Boxy`, `Hollow`, `Honky`, `Nasal`, `Shouty`, `Harsh`, `Dull`, `Sibilant`, `Shrill`, `Bright`, `Airy`.

Unlockable discoveries:
`Tinny`, `Spitty`, `Metallic`, `Full`, `Thick`, `Bloated`, `Muffled`, `Mellow`, `Cupped`, `Pinched`, `Aggressive`, `Crisp`, `Distant`, `Powerful`, `Impactful`, `Canned`, `V-shaped`, `Brittle`, `Woolly`, `Fatiguing`, `Cold`, `Veiled`, `Energetic`, `Vintage`, `Congested`, `Plasticky`, `Exciting`, `Hyped`, `Buried`, `Piercing`.

Aliases and absorbed source labels:

| Term | Current role | Maps to |
|---|---|---|
| `Droning` | alias | `Rumble` |
| `Bassy` | alias | `Boomy` or `Muddy` |
| `Lacking` | alias | `Thin` |
| `Weak` | alias | `Thin` |
| `Chesty` | alias | `Warm` or `Boxy` |
| `Colored` | alias | `Honky` |
| `Presence` | alias | `Shouty` |
| `Dark` | alias | `Dull` |
| `Tinny` | alias plus discovery | `Harsh`, and unlocks from `Thin + Harsh` |
| `Metallic` | alias plus discovery | `Harsh`, and unlocks from `Harsh + Sibilant` |
| `Muffled` | alias plus discovery | `Dull` or `Hollow`, and unlocks from `Muddy + Dull` |
| `Crisp` | alias plus discovery | `Bright` or `Sibilant`, and unlocks from `Bright + Sibilant` |
| `Cold` | alias plus discovery | `Hollow`, and unlocks from `Hollow + Bright + Thin` |
| `Sharp` | source-only | no current token |

Deferred vocabulary:
- `Smooth`: useful future descriptor, but no current recipe.
- `Clean`: better treated as a neutral/reference quality unless a specific recipe is designed.
- `Flat`: playback/reference mode, not a tonal descriptor.

## HARMAN Chart To Game Frequency Ladder

| Frequency | Descriptor territory |
|---|---|
| `31 Hz` | droning, deep sub movement, part of body-loss cuts |
| `63 Hz` | boomy, bassy, low-end bloom |
| `125 Hz` | muddy, bassy, upper-bass cloud, thin/weak when cut |
| `250 Hz` | warm, chesty, low-mid body |
| `500 Hz` | boxy, cold/hollow/muffled when cut |
| `1 kHz` | colored, honky |
| `2 kHz` | honky, nasal, shouty, dull/dark/muffled when cut |
| `4 kHz` | harsh, tinny, metallic, dull/muffled/dark when cut |
| `8 kHz` | sibilant, crisp, shrill, dull/muffled/dark when cut |
| `16 kHz` | bright, crisp, air, sharpness, dark when cut |

## Icon And Visual Material

The existing visual direction is documented in `icon/descriptor-icon-design-language.md`.

Useful game translation:
- Each descriptor icon is a small emotional scene about sound.
- The icon should communicate the descriptor through shape, mood, color, and sound-motion cues.
- Waveforms can become characters, objects, pressure lines, vibration marks, or environmental forces.
- The basic descriptors are the visible button set.
- Discovery descriptors are the collection or reward set.
- The icon language already supports a collectible card or creature system.

Current icon target list:
- Basics: `18`
- Discoveries: `30`
- Total: `48`

Current PNG assets present in `icon` include all `18` basics and many early discovery icons. There are also versioned variants for `crisp` and `v-shaped`.

Missing or not yet visible as final discovery PNGs at the time this file was written:
`Brittle`, `Woolly`, `Fatiguing`, `Cold`, `Veiled`, `Energetic`, `Vintage`, `Congested`, `Plasticky`, `Exciting`, `Hyped`, `Buried`, `Piercing`.

## Region And Utility Icon Prompts

### Seven Region Icon Prompts

These prompts are for the seven region-level icons, not individual descriptor cards. They should feel like gateways or map-region emblems for the Evolution Atlas. The `Review Lab` can have a separate UI icon later, but it is not a map region.

Shared requirements for all region icons:
- square `1254 x 1254 px` fully filled PNG
- no text, no letters, no numbers
- no baked rounded corners
- readable at small size
- central emblem inside the middle `65%` of the canvas
- hand-painted, soft lighting, game-card quality
- sound, waveform, vibration, or EQ-curve cues included
- visually related to the descriptor icon design language
- more symbolic and map-like than a single descriptor character

Region A: Thunderstep Highlands (Impact, Energy, And Spark)

```text
Create a square game region icon for "Thunderstep Highlands" in a collectible sound-card game. Show a powerful physical-energy gateway: deep earth-like bass waves rising from the ground, a squat glowing sub-bass core, impact rings, and bright upper-air sparks suggesting shine, air, and excitement. The shape language should feel heavy, physical, rhythmic, and energized, with wide slow waveform curves, subtle shockwave arcs, and small sky-blue/gold treble glints above the bass core. Palette: deep navy, dark red earth, burnt orange, cobalt shadow, small gold and sky-blue highlights. Mood: forceful, grounded, exciting, but not aggressive. No text, no letters, no numbers. Full-canvas hand-painted square PNG, no rounded corners, readable at small icon size.
```

Region B: Emberbody Valley (Warmth, Body, And Fullness)

```text
Create a square game region icon for "Emberbody Valley" in a collectible sound-card game. Show a simple environmental warm acoustic territory rather than a single object: a broad sheltered amber resonance chamber, low-mid grotto, or soft rounded valley with a calm glowing center. Prioritize large smooth shapes, fullness, warmth, and gentle body over decoration. Use one or two thick slow waveform rivers or arcs, gently wrapping through the space, with very few small details. The upper area should feel dim and relaxed to suggest softened treble and mellow detail. The region should feel full, rounded, cushioned, musical, and emotionally warm, while still reading as a map-region gateway for the Evolution Atlas. Palette: honey gold, ember orange, dark plum, maroon, caramel brown, subdued cobalt shadow, soft cream highlights. Avoid hanging lights, many beads, busy ridges, excessive tiny hills, close-up bowls, tabletop objects, literal blankets, characters, and text. No letters, no numbers. Full-canvas hand-painted square PNG, no rounded corners, readable at small icon size.
```

Region C: Resonance Canyons (Mid Enclosure)

```text
Create a square game region icon for "Resonance Canyons" in a collectible sound-card game. Show an environmental enclosed midrange territory rather than a small prop: a narrow acoustic canyon, boxed-in chamber landscape, or horn-shaped corridor made from warm wood, brass, and cardboard-like walls. Midrange waveform paths should bounce between close parallel surfaces, compress through a flared tunnel, and gather in a nasal resonant pocket at the center. The region should suggest boxy, cupped, canned, honky, and nasal coloration without using a face as the main subject. Palette: cardboard tan, brass yellow, muted gold, honey oak, olive shadow, dusty violet accents, soft dark brown edges. Shape language: rectangular wall planes, curved horn passages, compressed mid waves, enclosed map gateway. Mood: quirky, enclosed, resonant, slightly vintage, but still explorable as a region in the Evolution Atlas. Avoid close-up boxes, tabletop objects, characters, literal ears, and text. No letters, no numbers. Full-canvas hand-painted square PNG, no rounded corners, readable at small icon size.
```

Region D: Masking Mire (Mud, Masking, And Burial)

```text
Create a square game region icon for "Masking Mire" in a collectible sound-card game. Show a sound-wave relic half-buried in layered mud, fog, and low-mid clouds, with muffled waveform arcs struggling to pass through. Include overlapping cloudy forms, partially hidden resonance shapes, and a heavy low-end haze. Palette: olive brown, muted teal, dark umber, gray-green fog, smoky violet shadow, dim amber glints. Mood: obscured, congested, heavy, buried, low clarity. No text, no letters, no numbers. Full-canvas hand-painted square PNG, no rounded corners, readable at small icon size.
```

Region E: Glassedge Spires (Treble Edge, Artificiality, And Pain)

```text
Create a square game region icon for "Glassedge Spires" in a collectible sound-card game. Show a sharp crystalline treble gate made of thin metallic waveform shards, sibilant streaks, shrill needle-like peaks, and bright pressure lines. The center should feel tense and artificial, with jagged high-frequency energy and a warning-like glow, but avoid gore or horror. Palette: icy white, electric blue, silver, acid yellow, rusty orange accents, dark plum shadow. Shape language: narrow spikes, metallic edges, thin hiss trails, forward pressure beams, shrill high-treble points. Mood: sharp, fatiguing, artificial, piercing, high-frequency pain. No text, no letters, no numbers. Full-canvas hand-painted square PNG, no rounded corners, readable at small icon size.
```

Region F: Scoopshine Basin (Scoop, Shine, And Hype)

```text
Create a square game region icon for "Scoopshine Basin" in a collectible sound-card game. Show an environmental V-shaped sound territory rather than a literal EQ emblem: a glossy neon canyon or amphitheater with heavy bass cliffs rising on one side, crystalline treble towers on the other, and a recessed hollow valley through the center. A glowing smile-curve river or path should sweep through the landscape without becoming a graph. Include low-end glow, bright high-frequency shards, polished reflections, and an exciting boosted atmosphere. Palette: deep indigo, electric blue, cyan, sky blue, pale gold, hot white sparkle, subtle purple shadow, small warm bass highlights. Shape language: wide V canyon, raised side landmarks, scooped center, shiny arcs, glittering treble peaks. Mood: shiny, exciting, boosted, modern, slightly overhyped, explorable as a region in the Evolution Atlas. Avoid literal graph axes, close-up control panels, tabletop objects, characters, and text. No letters, no numbers. Full-canvas hand-painted square PNG, no rounded corners, readable at small icon size.
```

Region G: Frosthollow Expanse (Distance, Coldness, And Emptiness)

```text
Create a square game region icon for "Frosthollow Expanse" in a collectible sound-card game. Show a very sparse environmental cold hollow territory: a wide blue-gray acoustic basin or empty frosted chamber with a large quiet center and one small pale waveform doorway far away in the distance. Prioritize hollowness, negative space, emotional emptiness, and long silent depth over surface detail. Use only a few thin icy highlights, light mist, and very sparse distant waveform traces; avoid many lines, busy terrain, decorative particles, or complicated foreground structures. The region should feel like a lonely map destination in the Evolution Atlas, not a single object. Palette: pale blue, icy cyan, blue-gray, muted lavender, white frost, navy shadow, tiny dim silver highlights. Shape language: small isolated sound form, hollow basin, open empty center, thin distant waves, quiet depth. Mood: distant, cold, sparse, quiet, emotionally detached, empty. Avoid close-up objects, control panels, characters, literal ears, and text. No letters, no numbers. Full-canvas hand-painted square PNG, no rounded corners, readable at small icon size.
```

### Review Lab UI Icon Direction

The `Review Lab` is not Region `H`, so its visual should not look like another world-map territory. If it needs an icon, treat it as a utility or practice-space icon in the menu layer.

```text
Create a square UI icon for "Review Lab" in a collectible sound-card game. This is not a map region. Show a calm dark listening calibration room with a central circular meter or listening pool, a few small card silhouettes or sound tokens placed neatly around it, and restrained waveform arcs suggesting review practice. The icon should feel like a practice utility, not an eighth sound territory. Palette: dark neutral background with controlled accents of amber, cyan, pale gold, violet, and soft white. Shape language: organized lab space, calibration circle, subtle sound paths, quiet review mood. Avoid landscape scale, region gateway framing, constellation imagery, star maps, final-chapter framing, cluttered tools, many small objects, text, letters, and numbers. Full-canvas hand-painted square PNG, no rounded corners, readable at small icon size.
```
