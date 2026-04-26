# Descriptor Gameplay Rules And Concept

This document is the source-of-truth for how the descriptor game should feel and play: player goals, card discovery, region exploration, evolution rules, review lab behavior, and design direction.

## Core Game Idea

Descriptor Playground already behaves like the seed of a discovery game:
- The player selects simple sound descriptors.
- Each descriptor changes the music through EQ.
- Non-compatible traits replace each other.
- Certain combinations unlock named discoveries.
- The active curve becomes a readable "sound creature" or "sound spell".
- The collection board records discovered combinations.

Independent game framing:
- Basic descriptors are the player's primary verbs.
- EQ curves are the physics behind those verbs.
- Discovery descriptors are recipes, badges, characters, or cards.
- A/B listening is the truth test: "Can you hear what changed?"
- Intensity is the difficulty, drama, or power level.
- The icon set can become the visual cast of the game.

## Parallel Spectrum Gates

The game should not require a linear `Bass -> Mid -> Treble -> Regions` tutorial. That would be easy to implement, but it may feel too much like a school course.

Instead, use three parallel onboarding gates:
- `Bass Gate`
- `Mid Gate`
- `Treble Gate`

These gates teach the descriptor alphabet. The seven regions are where the player uses those letters to make words, recipes, and evolved cards.

Core principle:
- Spectrum gates teach the alphabet.
- Completing all three gates unlocks the seven-region map.
- Regions are where the player uses the full basic vocabulary to make meaningful descriptor words, recipes, and evolved cards.

Starter gate structure:

| Gate | Gift pair | First catch | Later unlocks | Feel |
|---|---|---|---|---|
| `Bass Gate` | `Rumble`, `Thin` | `Thump` | `Boomy`, `Punchy`, `Muddy` | body, force, foundation |
| `Mid Gate` | `Warm`, `Hollow` | `Boxy` | `Honky`, `Nasal`, `Shouty` | body, enclosure, center |
| `Treble Gate` | `Bright`, `Dull` | `Harsh` | `Sibilant`, `Shrill`, `Airy` | detail, shine, edge |

Total basic-card count:
- Each gate teaches 6 basic cards.
- The full pre-region vocabulary is 18 basic cards.
- Since each gate gives 2 cards as gifts and asks the player to earn only 4, this should be short enough to act as onboarding rather than a long first world.

Gate opening lines:
- Bass Gate: "The Floor-Shaker wakes the ground. The Hollow-Step steals the floor."
- Mid Gate: "The Hearth-Bear gives body. The Echo-Shell scoops the center away."
- Treble Gate: "The Spark-Flicker lights the top. The Veil-Moth dims it."

Starter gift rule:
- Each gate gives one boost/energy card and one cut/absence card after a guided demonstration.
- These gift pairs teach that descriptors can mean either adding energy or noticing missing energy.
- The player should receive the gift pair without passing a quiz.

First catch rule:
- Each gate then asks the player to catch one simple third card through a friendly A/B task.
- Bass first catch: `Thump`.
- Mid first catch: `Boxy`.
- Treble first catch: `Harsh`.
- This creates a satisfying early unlock without blocking the player's first cards.

How the player gets basic descriptors:
1. The player enters any available gate.
2. The gate demonstrates the boost/cut gift pair with exaggerated A/B listening.
3. The gift pair becomes playable immediately.
4. The player catches the third card through a simple A/B recognition task.
5. Later cards in the gate unlock through anchor-based A/B choices.
6. Mastery happens later with harder, more confusable choices.

Anchor-based later unlocks:
- For first acquisition, use two familiar anchor cards plus the new card.
- This makes the unlock algorithm simple and keeps the quiz friendly.
- The familiar anchors teach the player what the new descriptor is not.

| Gate | Acquisition anchors | Later unlock choice examples |
|---|---|---|
| `Bass Gate` | `Rumble`, `Thump` | `Rumble` + `Thump` + `Boomy`; `Rumble` + `Thump` + `Punchy`; `Rumble` + `Thump` + `Muddy` |
| `Mid Gate` | `Warm`, `Boxy` | `Warm` + `Boxy` + `Honky`; `Warm` + `Boxy` + `Nasal`; `Warm` + `Boxy` + `Shouty` |
| `Treble Gate` | `Bright`, `Harsh` | `Bright` + `Harsh` + `Sibilant`; `Bright` + `Harsh` + `Shrill`; `Bright` + `Harsh` + `Airy` |

Mastery choice rule:
- Unlock choices should be friendly.
- Mastery choices should use nearby or easily confused descriptors.
- Example bass mastery sets: `Boomy` vs `Muddy` vs `Thump`; `Thump` vs `Punchy` vs `Boomy`; `Rumble` vs `Boomy` vs `Muddy`.
- Example mid mastery sets: `Boxy` vs `Honky` vs `Nasal`; `Warm` vs `Boxy` vs `Hollow`.
- Example treble mastery sets: `Bright` vs `Airy` vs `Sibilant`; `Harsh` vs `Sibilant` vs `Shrill`.

Region map unlock rule:
- The seven regions can be visible from the beginning as locked silhouettes or distant territories.
- The player can enter the regions only after all 18 basic cards are playable.
- This keeps the regions from becoming fragmented by missing ingredients.
- Once unlocked, all seven regions open in parallel.
- Difficulty badges can still recommend a path, but they should not hard-lock the player into a chapter order.

Implementation note:

```ts
const gateProgress = {
  bass: {
    giftCards: ["rumble", "thin"],
    firstCatch: "thump",
    laterUnlocks: ["boomy", "punchy", "muddy"],
    unlockedCards: ["rumble", "thin", "thump"]
  },
  mid: {
    giftCards: ["warm", "hollow"],
    firstCatch: "boxy",
    laterUnlocks: ["honky", "nasal", "shouty"],
    unlockedCards: ["warm", "hollow", "boxy"]
  },
  treble: {
    giftCards: ["bright", "dull"],
    firstCatch: "harsh",
    laterUnlocks: ["sibilant", "shrill", "airy"],
    unlockedCards: ["bright", "dull", "harsh"]
  }
};

const allBasicCards = [
  "rumble", "thin", "thump", "boomy", "punchy", "muddy",
  "warm", "hollow", "boxy", "honky", "nasal", "shouty",
  "bright", "dull", "harsh", "sibilant", "shrill", "airy"
];

const unlockedCards = new Set(
  Object.values(gateProgress).flatMap(gate => gate.unlockedCards)
);

const regionsUnlocked = allBasicCards.every(card => unlockedCards.has(card));
```

Design benefit:
- The player can choose which spectrum gate to explore first.
- The game still has a learnable structure.
- Regions feel earned because they open from real listening vocabulary.
- The region map can be balanced around a complete basic-card toolbox.
- The onboarding stays playful and short instead of becoming a long prerequisite world.

## Parallel Region Strategy

After the Spectrum Gates, the game should treat the atlas as seven parallel sound regions rather than linear chapters. The former `H` concept should become a global `Review Lab` or `Practice Lab`, not an eighth map region.

Reason:
- Audio-system rating is exploratory; players may care about bass, warmth, clarity, harshness, or hype in any order.
- A collectible card game feels better when multiple regions become available together and the player can follow curiosity.
- Parallel regions make the game feel less like a school course and more like a sound atlas.
- The player can still receive gentle recommendations without being locked into a single path.
- Unlocking all basic cards first means every region can rely on the same complete vocabulary.
- A real region should have a coherent perceptual identity. `H` was a container for side cases, so it works better as a review system.

Region list:

| Region | Map name | Main purpose |
|---|---|---|
| `A` | Thunderstep Highlands | physical bass force, impact, top-end spark, excitement |
| `B` | Emberbody Valley | fullness, warmth, thickness, mellow body |
| `C` | Resonance Canyons | boxy, cupped, canned, nasal coloration |
| `D` | Masking Mire | congestion, masking, muffling, buried sound |
| `E` | Glassedge Spires | harshness, sibilance, shrillness, fatigue, piercing tone |
| `F` | Scoopshine Basin | V-shaped, crisp, hyped, boosted smile-curve sound |
| `G` | Frosthollow Expanse | hollow, distant, cold, missing body |

Recommended access model:
- During the Spectrum Gates, show all regions as locked preview territories.
- Unlock the full region map after all 18 basic cards are playable.
- Once unlocked, all seven regions become available in parallel.
- Use difficulty badges or gentle recommendations instead of strict order.
- Suggested first regions can be `A`, `B`, and `C`, but the player may choose any open region.
- Unlock the `Review Lab` after the player has made progress in several regions. It should be a practice mode, not a region on the map.

Possible region states:

| State | Meaning |
|---|---|
| `Locked preview` | visible during the gates, but not enterable yet |
| `Available` | player can enter now |
| `Recommended` | suggested next based on progress |
| `Completed` | all current cards in this region unlocked |
| `Mastered` | player can identify or craft the region cards at rating intensity |

Regional play rule:
- Regions should not mainly be A/B exams.
- The gates already use A/B listening to teach the basic descriptor cards.
- Regions should focus on card play, sound crafting, recipe discovery, and emotional descriptor meaning.
- A/B should appear as confirmation, hint, or optional mastery, not as the main burden on top of combo finding.

Recommended region loop:
1. The player enters a region and hears a curated loop that suits that territory.
2. The region shows several discovery silhouettes, card slots, or creature shadows.
3. The player freely plays basic cards onto the music and hears the sound change immediately.
4. The game gives emotional recipe clues, not technical EQ instructions.
5. The player crafts combinations from known basic cards.
6. The region gives soft feedback such as ingredient count, warmer/colder response, environment reaction, clearer silhouettes, or gentle rejection of unsuitable cards.
7. When the recipe is correct, the discovery card appears as a creature/card reward.
8. The game can then play a simple confirmation comparison: flat sound versus the discovered sound.
9. Blind A/B recognition returns later as mastery stars, Review Lab practice, or low-intensity verification.

Example clue style:
- "Make the sound feel forceful and sparkling."
- "Find the creature that shakes the floor."
- "This discovery needs weight, impact, and light."
- "Remove the body and leave a colder space behind."

Challenge split:

| Phase | Main challenge |
|---|---|
| `Spectrum Gates` | hear one basic descriptor by A/B comparison |
| `Regions` | combine known descriptors into meaningful sound identities |
| `Review Lab` | recognize cards blindly, compare similar traits, and verify at rating intensity |

Gameplay pacing:
- Early region visits should show more hints and use higher practice intensity.
- Later visits within the same region can hide the curve until after successful listening.
- The player can move between regions whenever they want.
- Unlocked combo cards can become shortcuts across regions.
- The full Evolution Atlas should become more visible as the player unlocks cards, not because they reached a linear chapter number.

Review Lab role:
- The `Review Lab` pulls cards from all seven regions instead of owning its own vocabulary.
- Use it for weak-card review, rare standalone drills, mixed-region comparison, daily/random challenges, and rating-intensity verification.
- It can highlight side landmarks such as `Shrill`, `Punchy`, `Airy`, `Full`, `Thick`, and `Distant` after those cards are introduced in their natural regions.
- It should feel like a practice utility or meta-space, not like a region of the Evolution Atlas.

## Evolution Atlas Mechanism

The game should use an evolution graph, not a strict evolution tree.

Reason:
- Many recipes overlap.
- Some higher cards contain more than one lower card.
- A strict tree would force one parent per card, but the current recipe system naturally allows multiple paths.

Best structure:
- Basics are elements.
- Combos are first discoveries.
- Big combos are evolved discoveries.
- Mega combos are apex cards.

Example chain:

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
```

This should be represented as a recipe evolution DAG, or directed acyclic graph. In game-language, call it the `Evolution Atlas`.

Recommended UI split:

| View | Purpose |
|---|---|
| `Spectrum Gates` | teaches and unlocks the 18 basic descriptor cards |
| `Region Map` | lets the player choose which sound territory to explore after the gates |
| `Evolution Atlas` | shows unlocked recipe relationships and evolution paths |
| `Collection Book` | shows all cards as locked/unlocked collectibles |
| `Crafting Table` | lets the player try combinations and discover cards |

Core mechanic:
- Before a discovery is unlocked, the player crafts it with basic descriptor cards.
- After a discovery is unlocked, it becomes a playable shortcut card.
- Shortcut cards expand internally back into their basic ingredients for audio processing.
- This gives collection cards real utility without changing the EQ logic.

Example:
- Before unlocking `Energetic`, the player needs `Rumble + Thump + Bright`.
- After unlocking `Energetic`, the player can play `Energetic` directly.
- To craft `Exciting`, the player can use either:
  - `Rumble + Thump + Bright + Airy`
  - `Energetic + Airy`
- Internally, both paths apply the same basics: `Rumble + Thump + Bright + Airy`.

Direct discoveries:
- Cards such as `V-shaped` and `Cold` currently have no lower recipe bridge.
- These can remain direct discoveries.
- Direct discoveries are good for surprise and mystery.
- They should appear in the Evolution Atlas as direct multi-element nodes rather than evolved child nodes.

Design rule:
- The Spectrum Gates unlock the basic alphabet first.
- The Region Map opens in parallel after all basic cards are unlocked.
- The Evolution Atlas explains relationships after discovery.
- The collection gives emotional reward.
- The crafting table creates playful experimentation.

## Open Atlas And Song Strategy Brainstorm

This section is provisional brainstorming. Consolidate later after the game loop becomes clearer.

After the player learns the seven sound regions, the game can unlock a final non-region mode for broader spectral listening. It should not be treated as Region `H`. It should feel like the world opens outward after the player has learned the map.

Possible names:
- `Open Atlas`
- `Spectral Garden`
- `Listening Frontier`
- `Descriptor Observatory`
- `Free Descriptor Mode`

Current favorite:
- `Open Atlas`

Meaning:
- The seven regions teach the core descriptor territories.
- The final mode asks the player to hear across the whole spectrum.
- It can connect to the current Android app's spectral training idea, but in a less technical and more game-like frame.
- It should support the idea that descriptors are not a closed dictionary.

Song strategy:
- Use a hybrid track plan rather than only region-specific tracks or only generic tracks.
- Region-specific training tracks make each descriptor easier to hear.
- Shared reference tracks teach transfer across regions.
- Imported/user tracks become a sandbox and endgame layer.

Region-specific track examples:
- Region `A`: bass, kick, synth, impact, energetic drops.
- Region `B`: voices, warm instruments, body, mellow tone.
- Region `C`: vocals, small speakers, nasal/boxy coloration, midrange instruments.
- Region `D`: dense mixes, low-mid masking, covered detail.
- Region `E`: cymbals, consonants, upper edge, sharp percussion.
- Region `F`: modern headphone-style bass and treble, smile-curve pop/electronic material.
- Region `G`: sparse voices, ambience, acoustic space, distance, coldness.

Track layers:

| Track layer | Purpose |
|---|---|
| Region tracks | Curated short loops that make a region's descriptors obvious. |
| Reference tracks | Shared songs used across multiple regions to teach transfer. |
| Imported tracks | Player-owned music for sandbox exploration and endgame discovery. |

Visualization stance:
- Do not make EQ curves the central experience.
- The main goal is to give the user a practical idea of descriptors, not to teach graphs.
- Use creatures, region environments, card glow, vibration, and A/B listening as the main feedback language.
- Keep technical EQ details optional, probably in a details drawer or card-back section.
- Reveal curves only after the player has learned to hear the descriptor, or in an optional technical view.

Possible ending / slogan direction:
- `The world of descriptors is infinite. Find yours.`
- `You have learned the map. Now name what you hear.`
- `Descriptors are not the end of listening. They are where listening begins.`
- `Every sound has a shape. Every listener can name one.`
- `The world of descriptors is infinite. The next one may be yours.`

Current favorite ending line:
- `The world of descriptors is infinite. The next one may be yours.`

## Independent Game Design Hooks

Possible verbs:
- Listen: compare flat and processed audio.
- Select: choose descriptor cards.
- Mix: stack compatible descriptors.
- Replace: use conflicts to undo or purify a sound.
- Discover: unlock named combos.
- Collect: fill a descriptor collection.
- Diagnose: identify a hidden curve by ear.
- Craft: build a requested tone from basic descriptors.
- Duel: apply descriptors to meet or counter a target sound.
- Tune: adjust intensity to match a reference.

Possible loop:
1. Hear a sound.
2. Choose one or more descriptor cards.
3. A curve and icon respond.
4. The game gives perceptual feedback.
5. Correct combinations unlock discovery creatures/cards.
6. Later stages ask the player to recognize or craft discoveries from audio alone.

Possible progression:
- Skill milestone: single descriptors by band.
- Skill milestone: compatible stacks.
- Skill milestone: conflict replacement.
- Skill milestone: combo discovery.
- Skill milestone: big combo crafting.
- Skill milestone: mega combo recognition.
- Parallel atlas exploration: choose any available region and follow curiosity.
- Endgame: player-created recipes, daily ear puzzles, imported-song challenges.

Possible challenge types:
- `Name the Trait`: hear an EQ change, choose the descriptor.
- `Build the Sound`: match a target descriptor or discovery.
- `Clean the Mix`: remove the harmful descriptor from a stack.
- `Combo Hunt`: find all discoveries in a tier.
- `A/B Duel`: identify which version is flat.
- `Intensity Match`: adjust strength until it matches a hidden target.
- `Recipe Memory`: recreate a discovery from its icon or name.
- `Blind Collection`: unlock recipes without seeing ingredient hints.

## Current Design Direction

The intended game direction is an ear-training tool on the leisure side, framed as a collectible card game. The goal is not to make a strict technical exam. The goal is to give players a practical, emotional vocabulary for rating and describing audio systems.

Confirmed direction:
- Genre: leisure-side ear training plus collectible card game.
- Card form: descriptors are cards, supported by the independent icon set.
- Core vocabulary style: emotional and perceptual, not frequency-first.
- Audio-system goal: help players understand words they might use when rating headphones, speakers, or other audio systems.
- Localization target: English, Chinese, German, and Japanese.
- Imported songs: sandbox feature, not the core progression.
- Curve visibility: unlocked after the player learns to hear the descriptor.
- Icons: rewards first, then playable cards after unlock.
- Conflicts: should not feel like penalties.

Open design choice:
- Discovery recipes should probably be hinted, not fully hidden and not fully visible. Fully hidden can become frustrating, while fully visible removes the joy of discovery. A good middle ground is to show silhouettes, vague clue text, or partial ingredient families, then reveal exact ingredients after unlock.

## Basic Vs Discovery Strategy

Yes, basic descriptors and discovery recipes should use different strategies.

Basic descriptors are the harder learning layer. A single `+3 dB` to `+5 dB` bell can be difficult to hear, especially in normal listening conditions. The player should first hear exaggerated examples before being asked to recognize realistic audio-system differences.

Discovery descriptors are the reward and collection layer. They are often easier to perceive because they combine several boosts and cuts across a wider frequency range. A recipe like `Hyped`, `Canned`, or `Piercing` can sound more obvious than a single basic descriptor.

| Layer | Role | Suggested strategy |
|---|---|---|
| Basic cards | Learn the vocabulary | Guided A/B listening, one trait at a time, exaggerated intensity first |
| Discovery cards | Collectible rewards | Hinted recipes, broader audible effects, unlock animations, playable after discovery |
| Sandbox | Audio-system rating toy | Let players apply collected cards to music or imported audio |

Basic card progression:
- Start with very audible intensity, such as `150%` to `220%`.
- Use strong A/B comparison and repeated listening.
- Show the card/icon before demanding recognition.
- Ask the player to connect sound feeling to descriptor name.
- Reveal the curve only after the player has heard the descriptor enough.
- Later reduce intensity toward realistic rating levels.

Discovery card progression:
- Let players combine basic cards to unlock discoveries.
- Use hints instead of exact recipe spoilers at first.
- Make discovery sounds broader and more obvious than basic cards.
- After unlock, allow discovery cards to be played directly as cards.
- Use discovery cards as rewards, collection goals, and sandbox tools.

Intensity should probably be separated into two concepts:
- Practice intensity: exaggerated so the player can clearly hear the descriptor.
- Rating intensity: closer to subtle real audio-system differences.

This split protects the game from becoming too difficult too early. It also keeps the collection system satisfying: basics teach the ears, discoveries reward the player with stronger, more memorable sound identities.

## Current Strongest Seed

The strongest independent-game seed is a "sound alchemy" game:
- Basic descriptors are ingredients.
- EQ curves are the hidden physics.
- Discovery descriptors are recipes.
- Icons are collectible beings or cards.
- A/B listening is the validation ritual.
- The player gradually learns to hear the difference between words that seem similar, such as `Bright`, `Sibilant`, `Shrill`, `Harsh`, and `Airy`.

This keeps the playful discovery feeling while preserving the real ear-training value.

