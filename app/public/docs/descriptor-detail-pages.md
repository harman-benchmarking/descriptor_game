# Descriptor Detail Pages

This document is for discussing descriptor identities and card-back content for the independent descriptor playground game.

Each descriptor should feel like a collectible sound creature. The creature identity is a memory hook, not a literal technical explanation. The player should understand the feeling first, then read the technical details if they want to go deeper.

## Detail Page Format

Keep the first five rows simple, vivid, and player-facing. The technical rows can follow afterward.

### Player-Facing Rows

| Row | Purpose |
|---|---|
| `Card name` | descriptor name and simple role |
| `Creature identity` | memorable creature-like identity or title |
| `Feeling` | what the sound feels like emotionally or physically |
| `Listen for` | practical music cues a player can notice |
| `Where to find it` | region and game location |

### Technical Rows

| Row | Purpose |
|---|---|
| `Stable ID` | internal descriptor ID |
| `Aliases` | alternate vocabulary |
| `Card type` | basic, combo, big combo, mega combo, shortcut |
| `Frequency territory` | approximate listening band, plus exact EQ center frequency |
| `EQ move` | boost or cut, gain amount, and Q/bandwidth character |
| `Boost/cut meaning` | why this is a boost or cut in audio-system language |
| `Recipes and evolutions` | discoveries that use this descriptor |
| `Conflicts` | descriptors that replace or oppose it |
| `What it is not` | nearby descriptors the player may confuse with it |
| `Difficulty notes` | whether it needs exaggerated practice intensity or hidden/hinted play |
| `Visual identity` | icon idea and region visual connection |

## Rumble

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Rumble` |
| Creature identity | **The Floor-Shaker**: a slow sub-bass creature that sleeps under the music and wakes the ground when the low notes arrive. |
| Feeling | The sound gains weight, pressure, and a deep moving floor. You feel it more than you clearly hear it. |
| Listen for | Sub synths, cinematic drones, the lowest part of a kick drum, and bass notes that make the room feel larger. |
| Where to find it | Region `A`: `Thunderstep Highlands` (`Impact, Energy, And Spark`). It is an early basic card and the first step toward `Powerful`, `Energetic`, and `Exciting`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `rumble` |
| Aliases | `Droning` |
| Card type | Basic element card |
| Frequency territory | Sub-bass. Practical listening zone: about `20-60 Hz`; catalog center: `35 Hz`. It sits near the `31 Hz` ladder point and can spill toward the `63 Hz` bass area because the Q is broad. |
| EQ move | Boost: `+4.5 dB` at `35 Hz`, `Q 0.7`. |
| Boost/cut meaning | This is a low-frequency boost. It adds sub foundation and physical pressure rather than removing energy. |
| Recipes and evolutions | `Rumble + Thump -> Powerful`; `Powerful + Bright -> Energetic`; `Energetic + Airy -> Exciting`. Equivalent full paths: `Rumble + Thump + Bright` and `Rumble + Thump + Bright + Airy`. |
| Conflicts | `Thin`, because `Thin` removes bass/body foundation while `Rumble` adds sub foundation. |
| What it is not | Not `Thump`, which is a shorter low-bass hit around `55 Hz`; not `Boomy`, which is broader lingering bass around `70 Hz`; not `Muddy`, which clouds the upper-bass/low-mid area around `125 Hz`. |
| Difficulty notes | Easier than many narrow treble descriptors when exaggerated, because sub-bass changes feel physical. On small speakers or quiet playback it may be hard to hear; use headphones/sub-capable playback or higher practice intensity. |
| Visual identity | Heavy ground waves, a sub-bass core, slow wide waveform arcs, and controlled sparks when shown inside Region A's energy path. Individual icon file: `icon/rumble.png`; region context: `icon/region/region-a-thunderstep-highlands.png`. |

## Thump

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Thump` |
| Creature identity | **The Ground-Knocker**: a compact low-bass creature that lands one solid hit and leaves a clear footprint in the music. |
| Feeling | The sound gets a quick physical bump: tighter and more immediate than deep rumble, like a low note tapping your chest. |
| Listen for | Kick-drum hits, low toms, bass plucks, and any beat where the first impact matters more than the long tail. |
| Where to find it | Region `A`: `Thunderstep Highlands` (`Impact, Energy, And Spark`). It is an early basic card that can join `Rumble` to make `Powerful`, or join `Punchy` to make `Impactful`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `thump` |
| Aliases | none |
| Card type | Basic element card |
| Frequency territory | Low bass. Practical listening zone: about `45-80 Hz`; catalog center: `55 Hz`. It sits above `Rumble` and below the broader `Boomy` region. |
| EQ move | Boost: `+3.5 dB` at `55 Hz`, `Q 0.9`. |
| Boost/cut meaning | This is a low-frequency boost. It adds short bass impact and physical hit rather than long sub-bass pressure. |
| Recipes and evolutions | `Rumble + Thump -> Powerful`; `Thump + Punchy -> Impactful`; `Powerful + Bright -> Energetic`; `Energetic + Airy -> Exciting`. |
| Conflicts | `Thin`, because `Thin` removes bass/body foundation while `Thump` adds low-bass impact. |
| What it is not | Not `Rumble`, which is deeper and slower around `35 Hz`; not `Boomy`, which is broader and more lingering around `70 Hz`; not `Punchy`, which is a more focused attack around `95 Hz`. |
| Difficulty notes | Best learned with rhythmic material and clear kick hits. It can be easier than subtle midrange colors, but it may blur into `Boomy` on headphones or speakers with loose bass. |
| Visual identity | A compact impact mark, low-bass shock ring, or heavy pulse striking the ground. Individual icon file: `icon/thump.png`; region context: `icon/region/region-a-thunderstep-highlands.png`. |

## Punchy

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Punchy` |
| Creature identity | **The Snap-Striker**: a quick bass creature that darts forward and knocks the beat into shape. |
| Feeling | The sound gets firmer, faster, and more physical, like each hit has a clean little shove behind it. |
| Listen for | Kick attack, bass plucks, low drum hits, and grooves that suddenly feel more direct and bouncy. |
| Where to find it | Region `A`: `Thunderstep Highlands` (`Impact, Energy, And Spark`). It is a basic card that joins `Thump` to make `Impactful`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `punchy` |
| Aliases | none |
| Card type | Basic element card |
| Frequency territory | Upper bass / low impact zone. Practical listening zone: about `80-120 Hz`; catalog center: `95 Hz`. It sits above `Thump` and below the heavier low-mid body area. |
| EQ move | Boost: `+3.5 dB` at `95 Hz`, `Q 1.2`. |
| Boost/cut meaning | This is a bass-impact boost. It adds focused low-end attack and rhythmic push rather than removing weight or adding deep sub pressure. |
| Recipes and evolutions | `Thump + Punchy -> Impactful`. |
| Conflicts | `Thin`, because `Thin` removes bass/body foundation while `Punchy` adds focused low-end impact. |
| What it is not | Not `Thump`, which is lower and rounder around `55 Hz`; not `Boomy`, which is broader and more lingering around `70 Hz`; not `Muddy`, which clouds the upper-bass/low-mid area around `125 Hz`. |
| Difficulty notes | Best learned with drum loops, bass lines, and short rhythmic hits. It can be confused with general loudness or stronger kick level, so compare it against nearby bass descriptors. |
| Visual identity | A compact fist-like pulse, sharp bass shock mark, or spring-loaded low-end creature. Individual icon file: `icon/punchy.png`; region context: `icon/region/region-a-thunderstep-highlands.png`. |

## Bright

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Bright` |
| Creature identity | **The Spark-Flicker**: a nimble treble creature that skims across the top of the music and leaves tiny flashes behind. |
| Feeling | The sound gets clearer, shinier, and more awake, with the edges of notes catching the light. |
| Listen for | Cymbal shimmer, vocal consonants, pick noise, snare snap, and little details that step forward at the top. |
| Where to find it | Region `A`: `Thunderstep Highlands` (`Impact, Energy, And Spark`). It adds top-end spark to the path from `Powerful` toward `Energetic` and `Exciting`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `bright` |
| Aliases | `Crisp` |
| Card type | Basic element card |
| Frequency territory | High treble / presence sparkle. Practical listening zone: about `8-12 kHz`; catalog center: `10000 Hz`. It sits below the very high air extension of `Airy`. |
| EQ move | Boost: `+3.5 dB` at `10000 Hz`, `Q 0.65`. |
| Boost/cut meaning | This is a high-frequency boost. It adds clarity, edge, and treble sparkle rather than reducing darkness or adding low-end power. |
| Recipes and evolutions | Region A path support: `Powerful + Bright -> Energetic`; `Energetic + Airy -> Exciting`. Also appears in Region `B`, `E`, `F`, and `G` contexts. |
| Conflicts | `Dull`, because `Dull` removes high-frequency clarity while `Bright` adds top-end spark. |
| What it is not | Not `Airy`, which is higher and more floating around `14000 Hz`; not `Harsh`, which is more biting around `4000 Hz`; not simple volume, even though extra treble can make a sound feel louder. |
| Difficulty notes | Easier on material with cymbals, vocals, acoustic guitar, or crisp percussion. It may be hard to judge on dull speakers, noisy rooms, or very compressed mixes. |
| Visual identity | Small treble sparks, crisp star-like flashes, and a quick silver-gold creature riding the Region A energy path. Individual icon file: `icon/bright.png`; region context: `icon/region/region-a-thunderstep-highlands.png`. |

## Airy

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Airy` |
| Creature identity | **The Sky-Glider**: a light high-treble creature that opens its wings above the music and lets the sound breathe. |
| Feeling | The sound gets more open, lifted, and spacious, like the top of the mix has more room around it. |
| Listen for | Cymbal trails, breath on vocals, room sparkle, reverb tails, and the soft shine above the main notes. |
| Where to find it | Region `A`: `Thunderstep Highlands` (`Impact, Energy, And Spark`). It is the final air-and-spark extension that helps `Energetic` become `Exciting`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `airy` |
| Aliases | none |
| Card type | Basic element card |
| Frequency territory | Very high treble / air band. Practical listening zone: about `12-16 kHz`; catalog center: `14000 Hz`. It sits above `Bright` as the final open-air extension. |
| EQ move | Boost: `+3.0 dB` at `14000 Hz`, `Q 0.7`. |
| Boost/cut meaning | This is a very high-frequency boost. It adds air, openness, and extended sparkle rather than core brightness or midrange clarity. |
| Recipes and evolutions | Region A path support: `Energetic + Airy -> Exciting`. Equivalent full path: `Rumble + Thump + Bright + Airy`. |
| Conflicts | `Dull`, because `Dull` removes high-frequency openness while `Airy` adds upper-treble extension. |
| What it is not | Not `Bright`, which is lower and more crisp around `10000 Hz`; not hiss, which is unwanted noise; not `Harsh`, which is sharper and more biting lower down. |
| Difficulty notes | One of the more playback-dependent descriptors. It works best on full-range headphones or speakers and with material that already has cymbal trails, breath, or room detail. |
| Visual identity | High floating arcs, soft sky sparks, pale shimmer trails, and a lightweight creature hovering at the top of Region A's energy path. Individual icon file: `icon/airy.png`; region context: `icon/region/region-a-thunderstep-highlands.png`. |

## Powerful

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Powerful` |
| Creature identity | **The Bass Titan**: a heavy low-end creature with deep roots and a striking footfall. |
| Feeling | The sound feels bigger, stronger, and more physical, with both deep pressure and a clear low hit. |
| Listen for | Big kicks, bass drops, heavy synth bass, cinematic hits, and grooves that feel anchored to the floor. |
| Where to find it | Region `A`: `Thunderstep Highlands` (`Impact, Energy, And Spark`). Discover it by combining `Rumble` and `Thump`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `powerful` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Low-end force made from sub-bass extension and low-bass impact. Ingredient centers: `35 Hz` from `Rumble` and `55 Hz` from `Thump`. |
| EQ move | Discovery label only. It expands to `Rumble` boost `+4.5 dB` at `35 Hz`, `Q 0.7`, plus `Thump` boost `+3.5 dB` at `55 Hz`, `Q 0.9`. |
| Boost/cut meaning | This is a combined low-frequency boost recipe. It adds deep foundation and physical impact rather than removing energy. |
| Recipes and evolutions | `Rumble + Thump -> Powerful`; `Powerful + Bright -> Energetic`; `Energetic + Airy -> Exciting`. |
| Conflicts | `Thin`, because `Thin` removes bass/body foundation while `Powerful` adds low-end weight and impact. |
| What it is not | Not just `Rumble`, which is deeper and slower; not just `Thump`, which is shorter and more compact; not `Boomy`, which is a broader lingering bass color. |
| Difficulty notes | Easier to hear on bass-capable playback. On small speakers it may collapse into a general loudness change, so use headphones or stronger practice intensity. |
| Visual identity | A massive low-bass creature with ground rings, heavy steps, and controlled Region A sparks. Individual icon file: `icon/powerful.png`; region context: `icon/region/region-a-thunderstep-highlands.png`. |

## Impactful

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Impactful` |
| Creature identity | **The Hit-Maker**: a compact impact creature that snaps the beat forward with a solid low strike. |
| Feeling | The sound feels more direct, punchy, and forceful, like each hit has a clearer landing point. |
| Listen for | Kick attacks, bass plucks, tom hits, tight drops, and beats that suddenly feel more decisive. |
| Where to find it | Region `A`: `Thunderstep Highlands` (`Impact, Energy, And Spark`). Discover it by combining `Thump` and `Punchy`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `impactful` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Low hit plus focused punch. Ingredient centers: `55 Hz` from `Thump` and `95 Hz` from `Punchy`. |
| EQ move | Discovery label only. It expands to `Thump` boost `+3.5 dB` at `55 Hz`, `Q 0.9`, plus `Punchy` boost `+3.5 dB` at `95 Hz`, `Q 1.2`. |
| Boost/cut meaning | This is a boost recipe for impact and attack. It strengthens the front edge and body of low rhythmic sounds. |
| Recipes and evolutions | `Thump + Punchy -> Impactful`. Discovery labels do not add new filters; this card expands to its ingredient descriptors. |
| Conflicts | `Thin`, because `Thin` removes low/body foundation while `Impactful` adds hit and punch. |
| What it is not | Not `Powerful`, which reaches deeper with `Rumble`; not just `Punchy`, which is more focused on attack; not `Boomy`, which lingers instead of striking cleanly. |
| Difficulty notes | Best learned with drums, plucked bass, and rhythmic material. It can be confused with simple loudness unless the player listens for the clearer hit shape. |
| Visual identity | A low-bass footprint with a sharp center burst, like a creature stamping the beat into place. Individual icon file: `icon/impactful.png`; region context: `icon/region/region-a-thunderstep-highlands.png`. |

## Energetic

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Energetic` |
| Creature identity | **The Spark-Charger**: a bass-powered creature with bright sparks racing over its shell. |
| Feeling | The sound feels strong, lively, and switched on, with bass force underneath and shine on top. |
| Listen for | Driving pop mixes, punchy electronic drops, bright drums over heavy bass, and choruses that feel more awake. |
| Where to find it | Region `A`: `Thunderstep Highlands` (`Impact, Energy, And Spark`). Discover it as `Rumble + Thump + Bright`, or `Powerful + Bright`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `energetic` |
| Aliases | none |
| Card type | Big combo discovery card |
| Frequency territory | Bass force with shine. Ingredient centers: `35 Hz` from `Rumble`, `55 Hz` from `Thump`, and `10000 Hz` from `Bright`. |
| EQ move | Discovery label only. It expands to `Rumble` boost `+4.5 dB` at `35 Hz`, `Q 0.7`, plus `Thump` boost `+3.5 dB` at `55 Hz`, `Q 0.9`, plus `Bright` boost `+3.5 dB` at `10000 Hz`, `Q 0.65`. |
| Boost/cut meaning | This is a combined boost recipe. It adds low-end power and high-frequency brightness rather than introducing a separate filter. |
| Recipes and evolutions | `Rumble + Thump + Bright -> Energetic`; equivalent shortcut: `Powerful + Bright -> Energetic`; `Energetic + Airy -> Exciting`. |
| Conflicts | `Thin`, because the recipe depends on bass foundation; `Dull`, because it opposes the `Bright` ingredient. |
| What it is not | Not `Powerful`, which lacks the bright shine; not just `Bright`, which lacks bass force; not `Exciting`, which adds extended top-end air. |
| Difficulty notes | Listen for the combination, not just one ingredient. It should feel both stronger below and more lit up above. |
| Visual identity | A heavy bass body with bright electric accents, Region A sparks, and a forward-moving energy pose. Individual icon file: `icon/energetic.png`; region context: `icon/region/region-a-thunderstep-highlands.png`. |

## Exciting

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Exciting` |
| Creature identity | **The Sky-Spark Colossus**: a full-range creature with thunder in its feet and glittering air above its head. |
| Feeling | The sound feels bigger, brighter, more open, and more thrilling, with full low-end force plus an extended top. |
| Listen for | Huge choruses, festival drops, sparkling cymbals over heavy bass, and mixes that feel wide, lifted, and intense. |
| Where to find it | Region `A`: `Thunderstep Highlands` (`Impact, Energy, And Spark`). Discover it as `Rumble + Thump + Bright + Airy`, or `Energetic + Airy`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `exciting` |
| Aliases | none |
| Card type | Mega combo discovery card |
| Frequency territory | Full low-end force plus extended top. Ingredient centers: `35 Hz` from `Rumble`, `55 Hz` from `Thump`, `10000 Hz` from `Bright`, and `14000 Hz` from `Airy`. |
| EQ move | Discovery label only. It expands to `Rumble` boost `+4.5 dB` at `35 Hz`, `Q 0.7`, plus `Thump` boost `+3.5 dB` at `55 Hz`, `Q 0.9`, plus `Bright` boost `+3.5 dB` at `10000 Hz`, `Q 0.65`, plus `Airy` boost `+3.0 dB` at `14000 Hz`, `Q 0.7`. |
| Boost/cut meaning | This is a combined boost recipe. It adds bass power, treble shine, and top-end openness through its ingredient descriptors. |
| Recipes and evolutions | `Rumble + Thump + Bright + Airy -> Exciting`; equivalent shortcut: `Energetic + Airy -> Exciting`. Discovery labels do not add new filters; they expand to ingredients. |
| Conflicts | `Thin`, because it removes the low-end foundation; `Dull`, because it opposes the `Bright` and `Airy` ingredients. |
| What it is not | Not `Energetic`, which has shine but less extended top; not just `Airy`, which lacks bass force; not simple loudness, because the shape spans deep lows and open highs. |
| Difficulty notes | Best heard on full-range material with bass and cymbal/top-end content. On limited speakers, the low or airy parts may disappear, making the recipe harder to recognize. |
| Visual identity | A towering Region A creature with shock rings below, bright sparks across the body, and airy light trails rising above. Individual icon file: `icon/exciting.png`; region context: `icon/region/region-a-thunderstep-highlands.png`. |

## Warm

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Warm` |
| Creature identity | **The Hearth-Glow**: a round low-mid creature that curls into the center of the music and gives it a gentle inner glow. |
| Feeling | The sound gains body, comfort, and closeness, like voices and instruments have more chest and warmth. |
| Listen for | Vocals getting fuller, guitars feeling woodier, pianos gaining body, and mixes feeling less thin or cold. |
| Where to find it | Region `B`: `Emberbody Valley` (`Warmth, Body, And Fullness`). It is the core basic card behind `Full`, `Thick`, `Mellow`, and `Vintage`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `warm` |
| Aliases | `Chesty` |
| Card type | Basic element card |
| Frequency territory | Low mids / body zone. Practical listening zone: about `200-350 Hz`; catalog center: `250 Hz`. It sits above upper-bass weight and below the boxier lower-mid area. |
| EQ move | Boost: `+3.0 dB` at `250 Hz`, `Q 0.7`. |
| Boost/cut meaning | This is a low-mid boost. It adds body and warmth rather than removing treble or adding bass bloom. |
| Recipes and evolutions | `Warm + Bright -> Full`; `Warm + Boomy -> Thick`; `Warm + Dull -> Mellow`; `Mellow + Boxy -> Vintage`, equivalent to `Warm + Boxy + Dull`. |
| Conflicts | `Thin`, because `Thin` removes bass/body foundation; `Hollow`, because `Hollow` scoops the center while `Warm` fills it in. |
| What it is not | Not `Boomy`, which is lower and more bass-heavy around `70 Hz`; not `Muddy`, which clouds around `125 Hz`; not `Boxy`, which is narrower and more enclosed around `350 Hz`. |
| Difficulty notes | Best learned on vocals, acoustic instruments, piano, and full-band mixes. It can be subtle at rating intensity, so start with exaggerated practice and compare against `Thin` or `Hollow`. |
| Visual identity | A rounded amber body glow, soft low-mid waves, and a calm creature nested inside Region B's warm chamber. Individual icon file: `icon/warm.png`; region context: `icon/region/region-b-emberbody-valley.png`. |

## Boomy

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Boomy` |
| Creature identity | **The Bass-Bloomer**: a broad low-end creature that swells outward after each hit and leaves big round ripples behind. |
| Feeling | The sound gets bigger and bassier, but the low end hangs around longer than a clean hit. |
| Listen for | Kick drums that bloom after impact, bass notes that spread wide, and mixes where the bottom feels large but less controlled. |
| Where to find it | Region `B`: `Emberbody Valley` (`Warmth, Body, And Fullness`). It joins `Warm` to make `Thick`, and also feeds heavier mud and hype paths later. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `boomy` |
| Aliases | `Bassy` |
| Card type | Basic element card |
| Frequency territory | Low bass bloom. Practical listening zone: about `60-90 Hz`; catalog center: `70 Hz`. It sits near the `63 Hz` ladder point, above `Thump` and below the upper-bass cloud of `Muddy`. |
| EQ move | Boost: `+4.5 dB` at `70 Hz`, `Q 0.65`. |
| Boost/cut meaning | This is a broad bass boost. It adds low-end size and lingering bloom rather than tight impact or low-mid body. |
| Recipes and evolutions | `Warm + Boomy -> Thick`; `Boomy + Muddy -> Bloated`; `Boomy + Hollow + Bright -> V-shaped`; `V-shaped + Sibilant -> Hyped`; `Congested + Boomy -> Buried`. |
| Conflicts | `Thin`, because `Thin` removes bass/body foundation while `Boomy` adds low-end bloom. |
| What it is not | Not `Rumble`, which is deeper sub movement around `35 Hz`; not `Thump`, which is a shorter hit around `55 Hz`; not `Punchy`, which is tighter around `95 Hz`; not `Muddy`, which clouds higher around `125 Hz`. |
| Difficulty notes | Easier to notice on bass-capable headphones or speakers. On loose playback it can blur into ordinary bass loudness, so use kick-and-bass material with clean gaps between hits. |
| Visual identity | A wide bass swell, rounded low waves, and a heavy amber pulse rolling through Region B's chamber. Individual icon file: `icon/boomy.png`; region context: `icon/region/region-b-emberbody-valley.png`. |

## Full

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Full` |
| Creature identity | **The Lantern-Bodied One**: a warm round creature with a clear light shining from the top of its shell. |
| Feeling | The sound feels complete and satisfying: body in the middle, openness at the top, and no obvious thinness. |
| Listen for | Vocals that feel filled out but still clear, instruments with body and shine, and mixes that feel balanced rather than hollow or dark. |
| Where to find it | Region `B`: `Emberbody Valley` (`Warmth, Body, And Fullness`). Discover it by combining `Warm` and `Bright`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `full` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Low-mid body plus open top. Ingredient centers: `250 Hz` from `Warm` and `10000 Hz` from `Bright`. |
| EQ move | Discovery label only. It expands to `Warm` boost `+3.0 dB` at `250 Hz`, `Q 0.7`, plus `Bright` boost `+3.5 dB` at `10000 Hz`, `Q 0.65`. |
| Boost/cut meaning | This is a combined boost recipe. It adds low-mid fullness and top-end openness through its ingredient descriptors. |
| Recipes and evolutions | `Warm + Bright -> Full`. Discovery labels do not add new filters; this card expands to its ingredient descriptors. |
| Conflicts | Through ingredients: `Thin` and `Hollow` oppose `Warm`; `Dull` opposes `Bright`. |
| What it is not | Not just `Warm`, which lacks the open top; not just `Bright`, which lacks body; not `Thick`, which adds low-end mass; not `Mellow`, which softens the top. |
| Difficulty notes | Listen for the two-part shape: center body plus treble openness. It can be mistaken for simple loudness if the player does not compare the middle and top separately. |
| Visual identity | A rounded amber body with small clear treble glints above it, like warmth with a clean opening at the top. Individual icon file: `icon/full.png`; region context: `icon/region/region-b-emberbody-valley.png`. |

## Thick

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Thick` |
| Creature identity | **The Heavy Cushion**: a broad warm creature with extra bass padding under its feet. |
| Feeling | The sound becomes denser, heavier, and more padded, with warmth plus extra low-end mass. |
| Listen for | Bass lines getting larger, drums feeling fatter, vocals gaining weight, and mixes feeling rich but possibly less nimble. |
| Where to find it | Region `B`: `Emberbody Valley` (`Warmth, Body, And Fullness`). Discover it by combining `Warm` and `Boomy`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `thick` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Bass bloom plus low-mid body. Ingredient centers: `70 Hz` from `Boomy` and `250 Hz` from `Warm`. |
| EQ move | Discovery label only. It expands to `Boomy` boost `+4.5 dB` at `70 Hz`, `Q 0.65`, plus `Warm` boost `+3.0 dB` at `250 Hz`, `Q 0.7`. |
| Boost/cut meaning | This is a combined low and low-mid boost recipe. It adds mass, body, and density through its ingredient descriptors. |
| Recipes and evolutions | `Warm + Boomy -> Thick`. Discovery labels do not add new filters; this card expands to its ingredient descriptors. |
| Conflicts | Through ingredients: `Thin` opposes low-end bloom and bass/body foundation; `Hollow` opposes `Warm`. |
| What it is not | Not `Full`, which uses open top instead of bass bloom; not `Mellow`, which darkens the top; not `Bloated`, which is `Boomy + Muddy`; not simply more bass, because `Warm` adds body too. |
| Difficulty notes | Easier on full-range playback and dense music. It can become hard to separate from `Boomy` unless the player listens for extra low-mid body. |
| Visual identity | A wide cushioned creature with amber body glow, heavy lower waves, and rounded bass bloom filling Region B's chamber. Individual icon file: `icon/thick.png`; region context: `icon/region/region-b-emberbody-valley.png`. |

## Mellow

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Mellow` |
| Creature identity | **The Soft Ember**: a warm creature with a shaded crown, glowing gently while the sharp edges fade. |
| Feeling | The sound feels relaxed, smooth, and softened, with body below and less sparkle above. |
| Listen for | Vocals becoming gentler, cymbals stepping back, guitars losing bite, and the whole mix feeling calmer. |
| Where to find it | Region `B`: `Emberbody Valley` (`Warmth, Body, And Fullness`). Discover it by combining `Warm` and `Dull`; add `Boxy` to evolve it into `Vintage`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `mellow` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Low-mid body with softened upper detail. Ingredient centers: `250 Hz` from `Warm` and `6500 Hz` from `Dull`. |
| EQ move | Discovery label only. It expands to `Warm` boost `+3.0 dB` at `250 Hz`, `Q 0.7`, plus `Dull` cut `-5.0 dB` at `6500 Hz`, `Q 0.55`. |
| Boost/cut meaning | This is a boost-plus-cut recipe. It adds body while reducing upper detail through its ingredient descriptors. |
| Recipes and evolutions | `Warm + Dull -> Mellow`; `Mellow + Boxy -> Vintage`, equivalent to `Warm + Boxy + Dull`. Discovery labels do not add new filters. |
| Conflicts | Through ingredients: `Thin` and `Hollow` oppose `Warm`; `Bright`, `Airy`, `Harsh`, `Sibilant`, and `Shrill` oppose `Dull`. |
| What it is not | Not `Warm` alone, because the top is softened; not `Dull` alone, because it still has body; not `Full`, which keeps an open top; not `Vintage`, which adds enclosed `Boxy` color. |
| Difficulty notes | Listen for relaxation rather than loss alone. It can sound like a volume or brightness change unless the player notices the added body at the same time. |
| Visual identity | A soft amber ember with dim upper sparks, rounded body waves, and a shaded top inside Region B's warm space. Individual icon file: `icon/mellow.png`; region context: `icon/region/region-b-emberbody-valley.png`. |

## Vintage

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Vintage` |
| Creature identity | **The Old Cabinet Spirit**: a warm, shaded creature living inside a resonant wooden chamber. |
| Feeling | The sound feels nostalgic, softened, thick, and enclosed, like the music has passed through an old speaker cabinet. |
| Listen for | Rounded vocals, softened cymbals, boxier drums, warm guitars, and mixes that feel colored, intimate, or old-fashioned. |
| Where to find it | Region `B`: `Emberbody Valley` (`Warmth, Body, And Fullness`). Discover it by evolving `Mellow` with `Boxy`, or by combining `Warm`, `Boxy`, and `Dull`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `vintage` |
| Aliases | none |
| Card type | Big combo discovery card |
| Frequency territory | Warm body, lower-mid enclosure, and softened upper detail. Ingredient centers: `250 Hz` from `Warm`, `350 Hz` from `Boxy`, and `6500 Hz` from `Dull`. |
| EQ move | Discovery label only. It expands to `Warm` boost `+3.0 dB` at `250 Hz`, `Q 0.7`, plus `Boxy` boost `+4.0 dB` at `350 Hz`, `Q 1.1`, plus `Dull` cut `-5.0 dB` at `6500 Hz`, `Q 0.55`. |
| Boost/cut meaning | This is a combined color recipe. It adds warm low mids and boxy enclosure while reducing upper detail through its ingredient descriptors. |
| Recipes and evolutions | `Warm + Boxy + Dull -> Vintage`; equivalent shortcut: `Mellow + Boxy -> Vintage`. Discovery labels do not add new filters; this card expands to its ingredient descriptors. |
| Conflicts | Through ingredients: `Thin` and `Hollow` oppose `Warm`; `Bright`, `Airy`, `Harsh`, `Sibilant`, and `Shrill` oppose `Dull`; `Boxy` has no listed conflicts. |
| What it is not | Not `Mellow`, which lacks the enclosed cabinet color; not `Boxy` alone, which lacks warmth and softened top; not `Thick`, which uses bass bloom; not `Veiled`, which is more masked and muddy. |
| Difficulty notes | A higher-tier identity: the player should listen for three clues at once, body, enclosure, and softened top. It may be easier after `Warm`, `Dull`, `Boxy`, and `Mellow` are learned separately. |
| Visual identity | A warm amber cabinet-chamber creature with rounded body waves, close lower-mid walls, and dimmed treble light above. Individual icon file: `icon/vintage.png`; region context: `icon/region/region-b-emberbody-valley.png`. |

## Boxy

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Boxy` |
| Creature identity | **The Cardboard Roomer**: a squat midrange creature that squeezes the music into a small cardboard chamber. |
| Feeling | The sound feels boxed in, woody, and a little trapped, like the music is bouncing inside a small cabinet. |
| Listen for | Voices, snares, guitars, piano body, and mixes that suddenly feel more like a cheap speaker or closed box. |
| Where to find it | Region `C`: `Resonance Canyons` (`Mid Enclosure`). It is a basic card that joins `Honky` to make `Cupped`, and helps `Pinched` become `Canned`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `boxy` |
| Aliases | `Chesty` |
| Card type | Basic element card |
| Frequency territory | Low-mid enclosure. Practical listening zone: about `250-500 Hz`; catalog center: `350 Hz`. It sits above warm body and below honky mid projection. |
| EQ move | Boost: `+4.0 dB` at `350 Hz`, `Q 1.1`. |
| Boost/cut meaning | This is a low-mid boost. It adds cabinet, cardboard, or room-like resonance rather than reducing clarity directly. |
| Recipes and evolutions | `Boxy + Honky -> Cupped`; `Cupped + Nasal -> Canned`; equivalent shortcut: `Pinched + Boxy -> Canned`. Also appears in `Vintage`, `Veiled`, `Congested`, and `Buried` outside Region C. |
| Conflicts | none |
| What it is not | Not `Warm`, which is broader and more pleasant around `250 Hz`; not `Muddy`, which clouds lower around `125 Hz`; not `Honky`, which projects more in the midrange around `900 Hz`. |
| Difficulty notes | Best learned with vocals, snare, acoustic instruments, or anything that reveals small-room coloration. It can be confused with warmth unless the player listens for the tighter enclosed shape. |
| Visual identity | Rectangular wall planes, cardboard chamber shapes, and compressed mid waves inside the Mid Enclosure region. Individual icon file: `icon/boxy.png`; region context: `icon/region/region-c-resonance-canyons.png`. |

## Honky

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Honky` |
| Creature identity | **The Cup-Caller**: a midrange creature that calls through a little horn and colors everything it touches. |
| Feeling | The sound pokes forward with a cupped, quacky, slightly old-radio color. |
| Listen for | Vocals, brass, guitars, sax, piano, and anything that starts sounding like it is speaking through a small tube or cup. |
| Where to find it | Region `C`: `Resonance Canyons` (`Mid Enclosure`). It is the shared middle card that can join `Boxy` to make `Cupped`, or join `Nasal` to make `Pinched`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `honky` |
| Aliases | `Colored` |
| Card type | Basic element card |
| Frequency territory | Midrange projection and color. Practical listening zone: about `700 Hz-1.2 kHz`; catalog center: `900 Hz`. It sits near the `1 kHz` ladder point. |
| EQ move | Boost: `+4.2 dB` at `900 Hz`, `Q 1.15`. |
| Boost/cut meaning | This is a midrange boost. It adds cup-like projection and obvious coloration rather than bass weight or treble edge. |
| Recipes and evolutions | `Boxy + Honky -> Cupped`; `Honky + Nasal -> Pinched`; `Boxy + Honky + Nasal -> Canned`. Also appears in `Congested` and `Buried` outside Region C. |
| Conflicts | none |
| What it is not | Not `Boxy`, which is lower and more cabinet-like; not `Nasal`, which sits higher and sounds more nose-focused; not `Shouty`, which is a stronger presence push around `2600 Hz`. |
| Difficulty notes | Usually clear on vocals and lead instruments. It can be hard to separate from `Nasal` at first, so compare the cup-like middle color against the higher nose-like color. |
| Visual identity | A curved horn passage, cup-shaped resonance pocket, and bouncing mid waves in Region C. Individual icon file: `icon/honky.png`; region context: `icon/region/region-c-resonance-canyons.png`. |

## Nasal

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Nasal` |
| Creature identity | **The Nose-Piper**: a narrow mid creature that pinches the music upward and makes voices sound nose-first. |
| Feeling | The sound feels squeezed, forward, and nasal, like the center of the voice is being pushed through a small opening. |
| Listen for | Lead vocals, backing vocals, synth leads, sax, and instruments that start sounding pinched or nose-like. |
| Where to find it | Region `C`: `Resonance Canyons` (`Mid Enclosure`). It is a basic card that joins `Honky` to make `Pinched`, and completes `Canned` when added to `Cupped`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `nasal` |
| Aliases | none |
| Card type | Basic element card |
| Frequency territory | Upper-mid nasal resonance. Practical listening zone: about `1.5-2.2 kHz`; catalog center: `1800 Hz`. It sits near the `2 kHz` ladder point and below `Shouty`. |
| EQ move | Boost: `+4.0 dB` at `1800 Hz`, `Q 1.2`. |
| Boost/cut meaning | This is an upper-mid boost. It pushes voice and lead-instrument resonance forward with a narrow nose-like color. |
| Recipes and evolutions | `Honky + Nasal -> Pinched`; `Boxy + Honky + Nasal -> Canned`; equivalent shortcut: `Cupped + Nasal -> Canned`. |
| Conflicts | none |
| What it is not | Not `Honky`, which is lower and cup-like around `900 Hz`; not `Shouty`, which is more aggressive and higher around `2600 Hz`; not `Harsh`, which is a sharper upper edge around `4000 Hz`. |
| Difficulty notes | Strongest on voice-heavy material. It may be subtle on dense mixes, so start with exaggerated practice intensity and listen for the squeezed center of the vocal. |
| Visual identity | A narrow resonant pocket, compressed upper-mid waves, and a small nasal tunnel inside Region C. Individual icon file: `icon/nasal.png`; region context: `icon/region/region-c-resonance-canyons.png`. |

## Cupped

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Cupped` |
| Creature identity | **The Hollow-Hand Herald**: a little enclosure creature that shapes the music like two hands cupped around a sound. |
| Feeling | The sound feels enclosed and projected, with a small hollow chamber around the midrange. |
| Listen for | Vocals, guitars, drums, brass, and anything that starts sounding like it is coming through a cup, tube, or small speaker shell. |
| Where to find it | Region `C`: `Resonance Canyons` (`Mid Enclosure`). Discover it by combining `Boxy` and `Honky`; add `Nasal` to evolve it into `Canned`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `cupped` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Enclosed low mids plus projected mids. Ingredient centers: `350 Hz` from `Boxy` and `900 Hz` from `Honky`. |
| EQ move | Discovery label only. It expands to `Boxy` boost `+4.0 dB` at `350 Hz`, `Q 1.1`, plus `Honky` boost `+4.2 dB` at `900 Hz`, `Q 1.15`. |
| Boost/cut meaning | This is a combined midrange boost recipe. It adds enclosure and cup-like projection through its ingredient descriptors. |
| Recipes and evolutions | `Boxy + Honky -> Cupped`; `Cupped + Nasal -> Canned`. Also appears as part of `Congested` and `Buried` outside Region C. Discovery labels do not add new filters; they expand to ingredients. |
| Conflicts | none |
| What it is not | Not just `Boxy`, which lacks the forward cup projection; not just `Honky`, which lacks the lower enclosure; not `Pinched`, which is more nasal and squeezed. |
| Difficulty notes | Usually easier than its single ingredients because two midrange boosts make the small-speaker shape more obvious. Good for teaching how discovery cards combine basic colors. |
| Visual identity | A cupped chamber, close parallel walls, and bouncing mid waves in the Region C enclosure. Individual icon file: `icon/cupped.png`; region context: `icon/region/region-c-resonance-canyons.png`. |

## Pinched

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Pinched` |
| Creature identity | **The Squeeze-Whistler**: a narrow mid creature that pulls the sound through a tight little opening. |
| Feeling | The sound feels squeezed, nasal, and tense in the middle, like voices have less room to open up. |
| Listen for | Vocals, synth leads, brass, and guitars that start sounding narrow, pointy, or nose-forward. |
| Where to find it | Region `C`: `Resonance Canyons` (`Mid Enclosure`). Discover it by combining `Honky` and `Nasal`; add `Boxy` to evolve it into `Canned`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `pinched` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Projected mid color plus nasal upper mids. Ingredient centers: `900 Hz` from `Honky` and `1800 Hz` from `Nasal`. |
| EQ move | Discovery label only. It expands to `Honky` boost `+4.2 dB` at `900 Hz`, `Q 1.15`, plus `Nasal` boost `+4.0 dB` at `1800 Hz`, `Q 1.2`. |
| Boost/cut meaning | This is a combined midrange boost recipe. It narrows and pushes the sound forward through honky and nasal ingredients. |
| Recipes and evolutions | `Honky + Nasal -> Pinched`; `Pinched + Boxy -> Canned`. Discovery labels do not add new filters; they expand to ingredients. |
| Conflicts | none |
| What it is not | Not `Cupped`, which includes lower box enclosure; not just `Nasal`, which lacks the honky middle color; not `Shouty`, which is louder and more aggressive higher up. |
| Difficulty notes | Best heard on vocals and lead instruments. It can feel close to `Nasal`, so the useful clue is the extra honky middle color pulling the sound into a tighter shape. |
| Visual identity | A squeezed horn neck, compressed waveform path, and narrow nasal mid pocket in Region C. Individual icon file: `icon/pinched.png`; region context: `icon/region/region-c-resonance-canyons.png`. |

## Canned

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Canned` |
| Creature identity | **The Tin-Chamber Keeper**: a stacked enclosure creature living inside a small resonant can. |
| Feeling | The sound feels boxed, cupped, and nasal all at once, like the music has been folded into a tiny speaker. |
| Listen for | Phone-speaker color, cheap portable speakers, old-radio mids, and voices that sound trapped inside a small container. |
| Where to find it | Region `C`: `Resonance Canyons` (`Mid Enclosure`). Discover it as `Boxy + Honky + Nasal`, or by evolving `Cupped + Nasal` or `Pinched + Boxy`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `canned` |
| Aliases | none |
| Card type | Big combo discovery card |
| Frequency territory | Stacked enclosure and mid resonances. Ingredient centers: `350 Hz` from `Boxy`, `900 Hz` from `Honky`, and `1800 Hz` from `Nasal`. |
| EQ move | Discovery label only. It expands to `Boxy` boost `+4.0 dB` at `350 Hz`, `Q 1.1`, plus `Honky` boost `+4.2 dB` at `900 Hz`, `Q 1.15`, plus `Nasal` boost `+4.0 dB` at `1800 Hz`, `Q 1.2`. |
| Boost/cut meaning | This is a combined midrange boost recipe. It stacks enclosure, cup-like projection, and nasal color without adding a separate canned filter. |
| Recipes and evolutions | `Boxy + Honky + Nasal -> Canned`; equivalent shortcuts: `Cupped + Nasal -> Canned` and `Pinched + Boxy -> Canned`. No current higher evolution in the catalog. Discovery labels do not add new filters; they expand to ingredients. |
| Conflicts | none |
| What it is not | Not `Cupped`, which lacks the nasal upper-mid ingredient; not `Pinched`, which lacks the lower box enclosure; not `Congested`, which adds muddy/dull masking outside Region C. |
| Difficulty notes | Easier to hear than the single Region C basics because the coloration is stacked across several mid bands. It is a good early discovery for teaching that small-device color can come from multiple resonances at once. |
| Visual identity | A compact can-like chamber, rectangular and horn-shaped passages, and three compressed mid wave paths converging in Region C. Individual icon file: `icon/canned.png`; region context: `icon/region/region-c-resonance-canyons.png`. |

## Muddy

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Muddy` |
| Creature identity | **The Cloud-Mixer**: a thick upper-bass creature that stirs the low notes into a foggy paste. |
| Feeling | The sound gets cloudy, heavy, and harder to see through, like the middle of the mix has been smeared. |
| Listen for | Bass guitars covering vocals, kick and low notes blurring together, and music that feels full but unclear. |
| Where to find it | Region `D`: `Masking Mire` (`Mud, Masking, And Burial`). It is the main basic card for `Bloated`, `Muffled`, `Veiled`, `Congested`, and `Buried`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `muddy` |
| Aliases | `Bassy` |
| Card type | Basic element card |
| Frequency territory | Upper bass / low-mid edge. Practical listening zone: about `100-180 Hz`; catalog center: `125 Hz`. It sits above `Boomy` bloom and below `Warm` body. |
| EQ move | Boost: `+4.5 dB` at `125 Hz`, `Q 0.8`. |
| Boost/cut meaning | This is an upper-bass boost. It adds low-mid cloud and masking rather than clean bass impact. |
| Recipes and evolutions | `Boomy + Muddy -> Bloated`; `Muddy + Dull -> Muffled`; `Boomy + Muddy + Dull -> Woolly`; `Muddy + Boxy + Dull -> Veiled`; `Muddy + Boxy + Honky + Dull -> Congested`; `Boomy + Muddy + Boxy + Honky + Dull -> Buried`. |
| Conflicts | `Thin`, because `Thin` removes bass/body foundation while `Muddy` adds upper-bass mass. |
| What it is not | Not `Boomy`, which is lower and more bass-tail focused around `70 Hz`; not `Warm`, which is broader body around `250 Hz`; not `Dull`, which removes top detail. |
| Difficulty notes | One of the most important negative rating descriptors. It may sound pleasant at first because it adds weight, so listen for lost separation. |
| Visual identity | Thick mud clouds, submerged waveform arcs, and a creature dragging clarity downward. Individual icon file: `icon/muddy.png`; region context: `icon/region/region-d-masking-mire.png`. |

## Dull

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Dull` |
| Creature identity | **The Spark-Eater**: a quiet shadow creature that covers the bright edges and leaves the music muted. |
| Feeling | The sound loses shine, detail, and openness. It feels covered, sleepy, or a little closed in. |
| Listen for | Softer cymbals, less vocal clarity, muted guitar pick noise, and mixes where the top feels missing. |
| Where to find it | Region `D`: `Masking Mire` (`Mud, Masking, And Burial`). It joins `Muddy` to make `Muffled` and helps the region evolve toward `Woolly`, `Veiled`, `Congested`, and `Buried`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `dull` |
| Aliases | `Dark`, `Muffled` |
| Card type | Basic element card |
| Frequency territory | Broad detail and openness band. Practical listening zone: about `4-10 kHz`; catalog center: `6500 Hz`. It darkens the detail band below `Bright` and `Airy`. |
| EQ move | Cut: `-5.0 dB` at `6500 Hz`, `Q 0.55`. |
| Boost/cut meaning | This is a high-frequency cut. It reduces clarity and openness rather than adding low-end mud directly. |
| Recipes and evolutions | `Muddy + Dull -> Muffled`; `Boomy + Muddy + Dull -> Woolly`; `Muddy + Boxy + Dull -> Veiled`; `Muddy + Boxy + Honky + Dull -> Congested`; `Boomy + Muddy + Boxy + Honky + Dull -> Buried`. Also supports `Mellow`, `Vintage`, and `Distant` outside Region D. |
| Conflicts | `Bright`, `Airy`, `Harsh`, `Sibilant`, and `Shrill`, because those add upper-frequency energy while `Dull` removes broad detail. |
| What it is not | Not `Muffled`, which combines `Dull` with `Muddy`; not `Hollow`, which scoops the center around `600 Hz`; not simply quiet playback. |
| Difficulty notes | Easier with cymbals, vocals, acoustic instruments, and room detail. On already dark material, it may be subtle. |
| Visual identity | Dimmed sparks, softened waveform edges, and a shadow veil over Region D fog. Individual icon file: `icon/dull.png`; region context: `icon/region/region-d-masking-mire.png`. |

## Bloated

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Bloated` |
| Creature identity | **The Swamp-Bellied Bass**: a swollen low-end creature that grows too large and spills into the mix. |
| Feeling | The sound feels puffed up, heavy, and slow, with bass mass that crowds the space around it. |
| Listen for | Big low notes that smear together, kicks with too much body, and bass that feels impressive but not clean. |
| Where to find it | Region `D`: `Masking Mire` (`Mud, Masking, And Burial`). Discover it by combining `Boomy` and `Muddy`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `bloated` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Low bloom plus upper-bass cloud. Ingredient centers: `70 Hz` from `Boomy` and `125 Hz` from `Muddy`. |
| EQ move | Discovery label only. It expands to `Boomy` boost `+4.5 dB` at `70 Hz`, `Q 0.65`, plus `Muddy` boost `+4.5 dB` at `125 Hz`, `Q 0.8`. |
| Boost/cut meaning | This is a combined bass boost recipe. It adds swollen low-end mass and masking through its ingredient descriptors. |
| Recipes and evolutions | `Boomy + Muddy -> Bloated`; `Bloated + Dull -> Woolly`. Discovery labels do not add new filters; this card expands to its ingredient descriptors. |
| Conflicts | `Thin`, because both ingredients oppose bass/body reduction. |
| What it is not | Not just `Boomy`, which is lower bloom only; not just `Muddy`, which is upper-bass cloud only; not `Woolly`, which also loses top detail through `Dull`. |
| Difficulty notes | Usually audible on bass-heavy material. The learning challenge is hearing that the extra bass is reducing clarity, not just making the track bigger. |
| Visual identity | A swollen bass creature, mud bubbles, and low waveform arcs bulging in Region D. Individual icon file: `icon/bloated.png`; region context: `icon/region/region-d-masking-mire.png`. |

## Muffled

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Muffled` |
| Creature identity | **The Blanket-Masker**: a quiet mud creature that throws a thick cover over the music. |
| Feeling | The sound feels covered, cloudy, and less detailed, like the music is playing from behind fabric. |
| Listen for | Vocals losing consonants, cymbals fading back, and low-mid thickness hiding the clear edges. |
| Where to find it | Region `D`: `Masking Mire` (`Mud, Masking, And Burial`). Discover it by combining `Muddy` and `Dull`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `muffled` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Upper-bass cloud plus reduced top detail. Ingredient centers: `125 Hz` from `Muddy` and `6500 Hz` from `Dull`. |
| EQ move | Discovery label only. It expands to `Muddy` boost `+4.5 dB` at `125 Hz`, `Q 0.8`, plus `Dull` cut `-5.0 dB` at `6500 Hz`, `Q 0.55`. |
| Boost/cut meaning | This is a boost-plus-cut masking recipe. It adds low cloud while reducing clarity through its ingredient descriptors. |
| Recipes and evolutions | `Muddy + Dull -> Muffled`; `Muffled + Boomy -> Woolly`; `Muffled + Boxy -> Veiled`; `Muffled + Cupped -> Congested`. Discovery labels do not add new filters; this card expands to its ingredient descriptors. |
| Conflicts | `Thin`, because of `Muddy`; `Bright`, `Airy`, `Harsh`, `Sibilant`, and `Shrill`, because of `Dull`. |
| What it is not | Not just `Dull`, which removes top detail without adding mud; not just `Muddy`, which clouds the low area without cutting the top; not `Veiled`, which adds `Boxy`. |
| Difficulty notes | A strong early discovery because the combined effect is easier to hear than either ingredient alone. Listen for both cover and cloud. |
| Visual identity | A covered waveform, dimmed treble sparks, and a muddy blanket shape in Region D. Individual icon file: `icon/muffled.png`; region context: `icon/region/region-d-masking-mire.png`. |

## Woolly

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Woolly` |
| Creature identity | **The Heavy Fleece**: a thick low-end creature covered in soft mud and darkened fur. |
| Feeling | The sound feels thick, fuzzy, and overcovered, with heavy lows and weak detail on top. |
| Listen for | Bass that feels soft around the edges, drums losing snap, and a mix that feels padded instead of clear. |
| Where to find it | Region `D`: `Masking Mire` (`Mud, Masking, And Burial`). Discover it as `Boomy + Muddy + Dull`, or by evolving `Bloated` with `Dull`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `woolly` |
| Aliases | none |
| Card type | Big combo discovery card |
| Frequency territory | Heavy low end plus reduced detail. Ingredient centers: `70 Hz` from `Boomy`, `125 Hz` from `Muddy`, and `6500 Hz` from `Dull`. |
| EQ move | Discovery label only. It expands to `Boomy` boost `+4.5 dB` at `70 Hz`, `Q 0.65`, plus `Muddy` boost `+4.5 dB` at `125 Hz`, `Q 0.8`, plus `Dull` cut `-5.0 dB` at `6500 Hz`, `Q 0.55`. |
| Boost/cut meaning | This is a low-end boost plus top-detail cut recipe. It makes the sound heavier while reducing clarity through its ingredient descriptors. |
| Recipes and evolutions | `Boomy + Muddy + Dull -> Woolly`; equivalent shortcuts: `Bloated + Dull -> Woolly` or `Muffled + Boomy -> Woolly`; `Woolly + Cupped -> Buried`. Discovery labels do not add new filters; this card expands to its ingredient descriptors. |
| Conflicts | `Thin`, because of `Boomy` and `Muddy`; `Bright`, `Airy`, `Harsh`, `Sibilant`, and `Shrill`, because of `Dull`. |
| What it is not | Not `Bloated`, which still has top detail; not `Muffled`, which lacks the extra `Boomy` low bloom; not `Veiled`, which adds `Boxy` instead of `Boomy`. |
| Difficulty notes | The broad recipe is easier to notice than a single basic card, but the player should learn to hear both the heavy lows and the missing top. |
| Visual identity | Fuzzy low waves, darkened mud layers, and a thick creature sinking into Region D. Individual icon file: `icon/woolly.png`; region context: `icon/region/region-d-masking-mire.png`. |

## Veiled

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Veiled` |
| Creature identity | **The Curtain-Keeper**: a covered low-mid creature that stands between the player and the clear sound. |
| Feeling | The sound feels hidden behind a curtain: still present, but less open, less clear, and harder to reach. |
| Listen for | Vocals losing presence, instruments blending together, and a cloudy midrange with the top pulled back. |
| Where to find it | Region `D`: `Masking Mire` (`Mud, Masking, And Burial`). Discover it as `Muddy + Boxy + Dull`, or by evolving `Muffled` with `Boxy`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `veiled` |
| Aliases | none |
| Card type | Big combo discovery card |
| Frequency territory | Low-mid clutter plus reduced clarity. Ingredient centers: `125 Hz` from `Muddy`, `350 Hz` from `Boxy`, and `6500 Hz` from `Dull`. |
| EQ move | Discovery label only. It expands to `Muddy` boost `+4.5 dB` at `125 Hz`, `Q 0.8`, plus `Boxy` boost `+4.0 dB` at `350 Hz`, `Q 1.1`, plus `Dull` cut `-5.0 dB` at `6500 Hz`, `Q 0.55`. |
| Boost/cut meaning | This is a masking recipe with low/low-mid boosts and a top-detail cut. It covers clarity through its ingredient descriptors. |
| Recipes and evolutions | `Muddy + Boxy + Dull -> Veiled`; equivalent shortcut: `Muffled + Boxy -> Veiled`; `Veiled + Honky -> Congested`; `Veiled + Boomy + Honky -> Buried`. Discovery labels do not add new filters; this card expands to its ingredient descriptors. |
| Conflicts | `Thin`, because of `Muddy`; `Bright`, `Airy`, `Harsh`, `Sibilant`, and `Shrill`, because of `Dull`. |
| What it is not | Not `Muffled`, which lacks the enclosed `Boxy` layer; not `Woolly`, which is more bass-bloom heavy; not `Distant`, which comes from a scooped center plus dullness. |
| Difficulty notes | Listen for covered clarity rather than just darkness. `Veiled` should feel obscured in the low mids as well as softened on top. |
| Visual identity | A half-transparent curtain of mud, low-mid blocks, and dimmed treble trails over Region D. Individual icon file: `icon/veiled.png`; region context: `icon/region/region-d-masking-mire.png`. |

## Congested

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Congested` |
| Creature identity | **The Traffic Jam of Sound**: a crowded masking creature where too many low and mid shapes try to pass through at once. |
| Feeling | The sound feels blocked, crowded, and hard to separate, like the whole middle of the mix is packed too tightly. |
| Listen for | Vocals, guitars, drums, and bass stepping on each other, with less sparkle to help them separate. |
| Where to find it | Region `D`: `Masking Mire` (`Mud, Masking, And Burial`). Discover it as `Muddy + Boxy + Honky + Dull`, or by joining `Muffled` with `Cupped`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `congested` |
| Aliases | none |
| Card type | Mega combo discovery card |
| Frequency territory | Multiple masking regions with reduced top clarity. Ingredient centers: `125 Hz` from `Muddy`, `350 Hz` from `Boxy`, `900 Hz` from `Honky`, and `6500 Hz` from `Dull`. |
| EQ move | Discovery label only. It expands to `Muddy` boost `+4.5 dB` at `125 Hz`, `Q 0.8`, plus `Boxy` boost `+4.0 dB` at `350 Hz`, `Q 1.1`, plus `Honky` boost `+4.2 dB` at `900 Hz`, `Q 1.15`, plus `Dull` cut `-5.0 dB` at `6500 Hz`, `Q 0.55`. |
| Boost/cut meaning | This is a multi-band masking recipe. It stacks low-mid and mid boosts while cutting detail through its ingredient descriptors. |
| Recipes and evolutions | `Muddy + Boxy + Honky + Dull -> Congested`; equivalent shortcuts: `Veiled + Honky -> Congested` or `Muffled + Cupped -> Congested`; `Congested + Boomy -> Buried`. Discovery labels do not add new filters; this card expands to its ingredient descriptors. |
| Conflicts | `Thin`, because of `Muddy`; `Bright`, `Airy`, `Harsh`, `Sibilant`, and `Shrill`, because of `Dull`. |
| What it is not | Not `Veiled`, which lacks `Honky`; not `Cupped`, which lacks mud and dullness; not `Buried`, which adds `Boomy` low-end bloom. |
| Difficulty notes | The overall clogged feeling is usually clear, but the ingredient path can be tricky. Use recipe hints and ingredient inspection after unlock. |
| Visual identity | Overlapping waveform lanes, blocked midrange shapes, and fogged detail sparks in Region D. Individual icon file: `icon/congested.png`; region context: `icon/region/region-d-masking-mire.png`. |

## Buried

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Buried` |
| Creature identity | **The Submerged Relic**: a huge masked creature with the song trapped under mud, fog, and low-mid weight. |
| Feeling | The sound feels deeply covered and hard to rescue, with lows, mids, and missing detail all hiding the music at once. |
| Listen for | Bass bloom, muddy body, boxy mids, honky color, and a dark top all stacking into one covered sound. |
| Where to find it | Region `D`: `Masking Mire` (`Mud, Masking, And Burial`). It is the apex discovery of the region. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `buried` |
| Aliases | none |
| Card type | Mega combo discovery card |
| Frequency territory | Extreme masking and reduced clarity. Ingredient centers: `70 Hz` from `Boomy`, `125 Hz` from `Muddy`, `350 Hz` from `Boxy`, `900 Hz` from `Honky`, and `6500 Hz` from `Dull`. |
| EQ move | Discovery label only. It expands to `Boomy` boost `+4.5 dB` at `70 Hz`, `Q 0.65`, plus `Muddy` boost `+4.5 dB` at `125 Hz`, `Q 0.8`, plus `Boxy` boost `+4.0 dB` at `350 Hz`, `Q 1.1`, plus `Honky` boost `+4.2 dB` at `900 Hz`, `Q 1.15`, plus `Dull` cut `-5.0 dB` at `6500 Hz`, `Q 0.55`. |
| Boost/cut meaning | This is the full Region D masking recipe. It adds low-end bloom, upper-bass cloud, low-mid enclosure, mid projection, and reduced top detail through its ingredient descriptors. |
| Recipes and evolutions | `Boomy + Muddy + Boxy + Honky + Dull -> Buried`; equivalent shortcuts: `Congested + Boomy -> Buried`, `Woolly + Cupped -> Buried`, or `Veiled + Boomy + Honky -> Buried`. Discovery labels do not add new filters; this card expands to its ingredient descriptors. |
| Conflicts | `Thin`, because of `Boomy` and `Muddy`; `Bright`, `Airy`, `Harsh`, `Sibilant`, and `Shrill`, because of `Dull`. |
| What it is not | Not `Congested`, which lacks the extra `Boomy` low bloom; not `Woolly`, which lacks the `Boxy` and `Honky` mid layers; not simple darkness, because the masking also comes from boosted lows and mids. |
| Difficulty notes | This is the clearest Region D apex, but it can sound simply bad unless the player inspects the layers. It uses five ingredient filters, still within the current recipe limit. |
| Visual identity | A sound-wave relic half-buried in layered mud, low-mid fog, and dim amber glints. Individual icon file: `icon/buried.png`; region context: `icon/region/region-d-masking-mire.png`. |

## Thin

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Thin` |
| Creature identity | **The Body-Thief**: a lean little creature that slips under the music and steals the weight from its bones. |
| Feeling | The sound feels lighter, weaker, and less grounded, like the low body has been shaved away. |
| Listen for | Bass lines losing size, kicks losing fullness, voices sounding smaller, and instruments feeling less supported. |
| Where to find it | Region `E`: `Glassedge Spires` (`Treble Edge, Artificiality, And Pain`). It is a support basic card that helps create `Tinny`, `Spitty`, `Brittle`, `Plasticky`, and `Piercing`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `thin` |
| Aliases | `Lacking`, `Weak` |
| Card type | Basic element card |
| Frequency territory | Bass/body foundation loss. Practical listening zone: about `80-140 Hz`; catalog center: `100 Hz`. It cuts the low support that makes sounds feel filled in. |
| EQ move | Cut: `-5.0 dB` at `100 Hz`, `Q 0.7`. |
| Boost/cut meaning | This is a low-frequency cut. It removes body and foundation rather than adding treble edge directly. |
| Recipes and evolutions | `Thin + Harsh -> Tinny`; `Thin + Sibilant -> Spitty`; `Thin + Bright + Sibilant -> Brittle`; `Thin + Hollow + Harsh + Sibilant -> Plasticky`; `Thin + Hollow + Shouty + Harsh + Sibilant -> Piercing`. Also supports `Cold` in Region G. |
| Conflicts | `Rumble`, `Thump`, `Boomy`, `Punchy`, `Muddy`, and `Warm`, because those add low or low-mid foundation while `Thin` removes it. |
| What it is not | Not `Hollow`, which scoops the center around `600 Hz`; not `Dull`, which removes treble detail; not quietness, even though losing body can make a sound feel smaller. |
| Difficulty notes | Easier to hear on voices, drums, and bass-rich material. On very small speakers, the missing body may already be absent, so the effect can be harder to notice. |
| Visual identity | A narrow, underfed waveform body with a missing low-end shadow and sharp Region E treble pressure above it. Individual icon file: `icon/thin.png`; region context: `icon/region/region-e-glassedge-spires.png`. |

## Harsh

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Harsh` |
| Creature identity | **The Edge-Scraper**: a hard treble creature that drags a bright metal claw across the front of the music. |
| Feeling | The sound feels rough, tense, and tiring, with a sharp edge that keeps pushing at your ears. |
| Listen for | Vocal bite, distorted guitars, snare crack, brass edge, and anything that starts to feel scratchy or uncomfortable. |
| Where to find it | Region `E`: `Glassedge Spires` (`Treble Edge, Artificiality, And Pain`). It is a core basic card for `Tinny`, `Metallic`, `Aggressive`, `Fatiguing`, `Plasticky`, and `Piercing`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `harsh` |
| Aliases | `Tinny`, `Metallic` |
| Card type | Basic element card |
| Frequency territory | Upper mids / lower treble edge. Practical listening zone: about `3-5 kHz`; catalog center: `4000 Hz`. |
| EQ move | Boost: `+4.5 dB` at `4000 Hz`, `Q 1.0`. |
| Boost/cut meaning | This is an upper-mid and lower-treble boost. It adds edge, bite, and fatigue rather than adding open top-end air. |
| Recipes and evolutions | `Thin + Harsh -> Tinny`; `Harsh + Sibilant -> Metallic`; `Shouty + Harsh -> Aggressive`; `Shouty + Harsh + Sibilant -> Fatiguing`; `Thin + Hollow + Harsh + Sibilant -> Plasticky`; `Thin + Hollow + Shouty + Harsh + Sibilant -> Piercing`. |
| Conflicts | `Dull`, because `Dull` removes high-frequency detail while `Harsh` adds painful edge. |
| What it is not | Not `Sibilant`, which is narrower and higher around `8000 Hz`; not `Shrill`, which is more severe around `8500 Hz`; not `Bright`, which is broader and shinier around `10000 Hz`. |
| Difficulty notes | Can become tiring quickly at high practice intensity, so short A/B rounds are better than long listening. It is easier on vocals, guitars, snares, and brass. |
| Visual identity | Jagged silver edges, tight pressure beams, and scratch-like waveform marks inside Region E's crystalline treble gate. Individual icon file: `icon/harsh.png`; region context: `icon/region/region-e-glassedge-spires.png`. |

## Sibilant

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Sibilant` |
| Creature identity | **The Hiss-Snapper**: a quick treble creature that leaps out whenever speech or cymbals make a sharp hiss. |
| Feeling | The sound gets spitty and biting at the edges, especially on little high-frequency details. |
| Listen for | Vocal S and T sounds, cymbal ticks, hi-hats, snare fizz, and bright consonants that jump forward. |
| Where to find it | Region `E`: `Glassedge Spires` (`Treble Edge, Artificiality, And Pain`). It is a core basic card for `Spitty`, `Metallic`, `Crisp`, `Brittle`, `Fatiguing`, `Plasticky`, and `Piercing`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `sibilant` |
| Aliases | `Crisp` |
| Card type | Basic element card |
| Frequency territory | Sibilance / narrow treble bite. Practical listening zone: about `7-9 kHz`; catalog center: `8000 Hz`. |
| EQ move | Boost: `+5.0 dB` at `8000 Hz`, `Q 1.5`. |
| Boost/cut meaning | This is a narrow high-frequency boost. It makes consonants and cymbal edges jump forward rather than adding broad shine. |
| Recipes and evolutions | `Thin + Sibilant -> Spitty`; `Harsh + Sibilant -> Metallic`; `Bright + Sibilant -> Crisp`; `Thin + Bright + Sibilant -> Brittle`; `Shouty + Harsh + Sibilant -> Fatiguing`; `Thin + Hollow + Harsh + Sibilant -> Plasticky`; `Thin + Hollow + Shouty + Harsh + Sibilant -> Piercing`; `V-shaped + Sibilant -> Hyped`. |
| Conflicts | `Dull`, because `Dull` reduces treble detail; `Shrill`, because both occupy the same narrow high-frequency severity lane. |
| What it is not | Not `Harsh`, which is lower and rougher around `4000 Hz`; not `Bright`, which is broader and more open; not `Shrill`, which is a more extreme high-treble lesson. |
| Difficulty notes | Best learned with vocal material and cymbals. It can be confused with normal clarity, so listen for the hiss and consonant bite becoming too forward. |
| Visual identity | Thin hiss trails, quick white-blue sparks, and needle-like cymbal flashes. Individual icon file: `icon/sibilant.png`; region context: `icon/region/region-e-glassedge-spires.png`. |

## Shrill

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Shrill` |
| Creature identity | **The Needle-Crier**: a severe high-treble creature that fires a thin bright point straight through the music. |
| Feeling | The sound feels piercing, brittle, and overexposed, like the top edge has become too sharp to relax around. |
| Listen for | Painful high vocal edges, ringing cymbals, whistle-like treble, and details that feel more like needles than sparkle. |
| Where to find it | Region `E`: `Glassedge Spires` (`Treble Edge, Artificiality, And Pain`). It is a standalone severe-treble lesson, not part of the current discovery recipes. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `shrill` |
| Aliases | none |
| Card type | Basic element card |
| Frequency territory | Severe narrow high treble. Practical listening zone: about `8-10 kHz`; catalog center: `8500 Hz`. |
| EQ move | Boost: `+6.0 dB` at `8500 Hz`, `Q 1.9`. |
| Boost/cut meaning | This is a narrow high-frequency boost. It exaggerates a painful top edge rather than adding pleasant brightness or air. |
| Recipes and evolutions | No current discovery recipes. It belongs in Region `E` as a standalone severe-treble card taught after `Bright`, `Harsh`, and `Sibilant`. |
| Conflicts | `Dull`, because `Dull` removes treble detail; `Sibilant`, because both occupy the same narrow high-frequency severity lane. |
| What it is not | Not `Sibilant`, which focuses on consonant and cymbal bite; not `Harsh`, which is lower around `4000 Hz`; not `Bright`, which is broader and less painful. |
| Difficulty notes | Use carefully at high intensity because it is intentionally uncomfortable. It is useful for teaching the difference between sparkle, sibilance, and true treble pain. |
| Visual identity | A thin needle peak, icy warning glow, and tense high-frequency shard. Individual icon file: `icon/shrill.png`; region context: `icon/region/region-e-glassedge-spires.png`. |

## Shouty

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Shouty` |
| Creature identity | **The Forward-Pusher**: a loud presence creature that leans into the music and shoves voices toward your face. |
| Feeling | The sound feels pushy, loud, and insistent, even when the volume has not changed. |
| Listen for | Vocals stepping too far forward, guitars barking, snares getting hard, and midrange sounds feeling like they are shouting. |
| Where to find it | Region `E`: `Glassedge Spires` (`Treble Edge, Artificiality, And Pain`). It joins `Harsh` to make `Aggressive`, joins `Metallic` to make `Fatiguing`, and pushes `Plasticky` into `Piercing`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `shouty` |
| Aliases | `Presence` |
| Card type | Basic element card |
| Frequency territory | Upper-mid presence. Practical listening zone: about `2-3.5 kHz`; catalog center: `2600 Hz`. |
| EQ move | Boost: `+4.8 dB` at `2600 Hz`, `Q 1.05`. |
| Boost/cut meaning | This is an upper-mid boost. It pushes vocals and instruments forward rather than adding sparkle or air. |
| Recipes and evolutions | `Shouty + Harsh -> Aggressive`; `Shouty + Harsh + Sibilant -> Fatiguing`; `Thin + Hollow + Shouty + Harsh + Sibilant -> Piercing`. |
| Conflicts | none |
| What it is not | Not `Harsh`, which is higher and scratchier around `4000 Hz`; not `Nasal`, which is a nose-like resonance around `1800 Hz`; not `Honky`, which is lower and more cup-like around `900 Hz`. |
| Difficulty notes | Can be mistaken for simple loudness. Use level-matched A/B listening and focus on voices or lead instruments moving forward. |
| Visual identity | A forward pressure beam, tense upper-mid wave, and creature posture leaning out of the card. Individual icon file: `icon/shouty.png`; region context: `icon/region/region-e-glassedge-spires.png`. |

## Tinny

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Tinny` |
| Creature identity | **The Little Metal Shell**: a thin, rattly creature with no body inside and a bright hard edge outside. |
| Feeling | The sound feels small, cheap, and metallic, like the low body has vanished and only the hard edge remains. |
| Listen for | Thin speakers, small phone-like playback, weak guitars with sharp edges, and voices that lose warmth but keep bite. |
| Where to find it | Region `E`: `Glassedge Spires` (`Treble Edge, Artificiality, And Pain`). Discover it by combining `Thin` and `Harsh`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `tinny` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Missing body plus upper edge. Ingredient centers: `100 Hz` from `Thin` and `4000 Hz` from `Harsh`. |
| EQ move | Discovery label only. It expands to `Thin` cut `-5.0 dB` at `100 Hz`, `Q 0.7`, plus `Harsh` boost `+4.5 dB` at `4000 Hz`, `Q 1.0`. |
| Boost/cut meaning | This is a cut-plus-boost recipe. It removes body while adding hard upper edge; the discovery card adds no new filter. |
| Recipes and evolutions | `Thin + Harsh -> Tinny`; `Tinny + Hollow + Sibilant -> Plasticky`; `Plasticky + Shouty -> Piercing`. |
| Conflicts | Inherits ingredient conflicts: `Dull` opposes `Harsh`; `Rumble`, `Thump`, `Boomy`, `Punchy`, `Muddy`, and `Warm` oppose `Thin`. |
| What it is not | Not just `Harsh`, which can still have body; not `Spitty`, which centers on consonant bite; not `Metallic`, which needs both `Harsh` and `Sibilant`. |
| Difficulty notes | Easier to hear on voices, guitars, and small-speaker style material. Listen for the combination of weak body and sharp edge. |
| Visual identity | A small hollow metal creature with thin walls, rattling edges, and a bright scratch line. Individual icon file: `icon/tinny.png`; region context: `icon/region/region-e-glassedge-spires.png`. |

## Spitty

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Spitty` |
| Creature identity | **The Consonant-Sprayer**: a skinny treble creature that spits tiny bright sparks from every vocal edge. |
| Feeling | The sound feels thin and splashy, with consonants and little treble hits jumping out too sharply. |
| Listen for | Exposed S sounds, bright lip noise, thin vocal recordings, sharp hi-hats, and weak body underneath the hiss. |
| Where to find it | Region `E`: `Glassedge Spires` (`Treble Edge, Artificiality, And Pain`). Discover it by combining `Thin` and `Sibilant`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `spitty` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Missing body plus narrow sibilance. Ingredient centers: `100 Hz` from `Thin` and `8000 Hz` from `Sibilant`. |
| EQ move | Discovery label only. It expands to `Thin` cut `-5.0 dB` at `100 Hz`, `Q 0.7`, plus `Sibilant` boost `+5.0 dB` at `8000 Hz`, `Q 1.5`. |
| Boost/cut meaning | This is a cut-plus-boost recipe. It removes foundation while exposing consonants and cymbal bite; the discovery card adds no new filter. |
| Recipes and evolutions | `Thin + Sibilant -> Spitty`; `Spitty + Bright -> Brittle`; `Spitty + Hollow + Harsh -> Plasticky`; `Aggressive + Spitty + Hollow -> Piercing`. |
| Conflicts | Inherits ingredient conflicts: `Dull` and `Shrill` oppose `Sibilant`; `Rumble`, `Thump`, `Boomy`, `Punchy`, `Muddy`, and `Warm` oppose `Thin`. |
| What it is not | Not just `Sibilant`, which may still have body; not `Crisp`, which pairs shine with sibilance; not `Tinny`, which uses lower harsh edge instead of narrow consonant bite. |
| Difficulty notes | Best learned with vocal clips. It can sound like bad recording quality, so compare against `Sibilant` alone to hear the missing body. |
| Visual identity | A thin creature flicking bright hiss droplets from a small empty body. Individual icon file: `icon/spitty.png`; region context: `icon/region/region-e-glassedge-spires.png`. |

## Metallic

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Metallic` |
| Creature identity | **The Chrome Stinger**: a shiny hard-edged creature whose treble rings like struck metal. |
| Feeling | The sound feels hard, cold, and artificial, with both scrape and sharp high bite. |
| Listen for | Ringy cymbals, hard guitar edge, cold vocal bite, metallic percussion, and treble that feels shiny but uncomfortable. |
| Where to find it | Region `E`: `Glassedge Spires` (`Treble Edge, Artificiality, And Pain`). Discover it by combining `Harsh` and `Sibilant`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `metallic` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Upper edge plus narrow treble bite. Ingredient centers: `4000 Hz` from `Harsh` and `8000 Hz` from `Sibilant`. |
| EQ move | Discovery label only. It expands to `Harsh` boost `+4.5 dB` at `4000 Hz`, `Q 1.0`, plus `Sibilant` boost `+5.0 dB` at `8000 Hz`, `Q 1.5`. |
| Boost/cut meaning | This is a combined treble boost recipe. It adds edge and sibilant bite through ingredients; the discovery card adds no new filter. |
| Recipes and evolutions | `Harsh + Sibilant -> Metallic`; `Metallic + Shouty -> Fatiguing`; `Metallic + Thin + Hollow -> Plasticky`; `Fatiguing + Thin + Hollow -> Piercing`. |
| Conflicts | `Dull`, because it opposes both treble ingredients; `Shrill`, because it conflicts with the `Sibilant` ingredient. |
| What it is not | Not `Harsh` alone, which lacks narrow high bite; not `Sibilant` alone, which lacks lower scrape; not `Tinny`, which needs missing body from `Thin`. |
| Difficulty notes | Easier on cymbals, electric guitars, and bright percussion. It can be confused with `Crisp`, but `Metallic` feels harder and more artificial. |
| Visual identity | Chrome shards, ringing treble lines, and sharp blue-white reflections. Individual icon file: `icon/metallic-v2.png`; region context: `icon/region/region-e-glassedge-spires.png`. |

## Aggressive

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Aggressive` |
| Creature identity | **The Face-Forward Bruiser**: a tense upper-mid creature that steps into the music and bares a harsh edge. |
| Feeling | The sound feels forceful, pushy, and tiring, like the music is leaning too close. |
| Listen for | Vocals pressing forward, guitars biting, snares snapping hard, and mixes that feel exciting at first but tiring fast. |
| Where to find it | Region `E`: `Glassedge Spires` (`Treble Edge, Artificiality, And Pain`). Discover it by combining `Shouty` and `Harsh`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `aggressive` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Forward presence plus harsh edge. Ingredient centers: `2600 Hz` from `Shouty` and `4000 Hz` from `Harsh`. |
| EQ move | Discovery label only. It expands to `Shouty` boost `+4.8 dB` at `2600 Hz`, `Q 1.05`, plus `Harsh` boost `+4.5 dB` at `4000 Hz`, `Q 1.0`. |
| Boost/cut meaning | This is a combined upper-mid boost recipe. It pushes sound forward and adds edge; the discovery card adds no new filter. |
| Recipes and evolutions | `Shouty + Harsh -> Aggressive`; `Aggressive + Sibilant -> Fatiguing`; `Aggressive + Spitty + Hollow -> Piercing`. |
| Conflicts | `Dull`, because it opposes the `Harsh` ingredient. |
| What it is not | Not `Shouty` alone, which lacks rough treble edge; not `Harsh` alone, which lacks the forward shove; not `Fatiguing`, which adds `Sibilant`. |
| Difficulty notes | Can be mistaken for louder playback. Use level-matched comparisons and listen for the forward, tiring quality rather than volume. |
| Visual identity | A forward-leaning pressure creature with sharp orange-blue edge marks. Individual icon file: `icon/aggressive.png`; region context: `icon/region/region-e-glassedge-spires.png`. |

## Brittle

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Brittle` |
| Creature identity | **The Thin Glass Mask**: a fragile bright creature that looks shiny but cracks when the music moves. |
| Feeling | The sound feels light, breakable, and overexposed, with too much top edge and not enough body underneath. |
| Listen for | Thin bright vocals, sharp acoustic guitars, cymbals with too much edge, and mixes that sound clear but fragile. |
| Where to find it | Region `E`: `Glassedge Spires` (`Treble Edge, Artificiality, And Pain`). Discover it as `Thin + Bright + Sibilant`, or as `Spitty + Bright` / `Crisp + Thin`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `brittle` |
| Aliases | none |
| Card type | Big combo discovery card |
| Frequency territory | Missing body plus exposed high frequencies. Ingredient centers: `100 Hz` from `Thin`, `10000 Hz` from `Bright`, and `8000 Hz` from `Sibilant`. |
| EQ move | Discovery label only. It expands to `Thin` cut `-5.0 dB` at `100 Hz`, `Q 0.7`, plus `Bright` boost `+3.5 dB` at `10000 Hz`, `Q 0.65`, plus `Sibilant` boost `+5.0 dB` at `8000 Hz`, `Q 1.5`. |
| Boost/cut meaning | This is a cut-plus-boost recipe. It removes body while exposing treble shine and bite; the discovery card adds no new filter. |
| Recipes and evolutions | `Thin + Bright + Sibilant -> Brittle`; equivalent shortcuts: `Spitty + Bright -> Brittle` and `Crisp + Thin -> Brittle`. |
| Conflicts | Inherits ingredient conflicts: `Dull` opposes `Bright` and `Sibilant`; `Shrill` opposes `Sibilant`; `Rumble`, `Thump`, `Boomy`, `Punchy`, `Muddy`, and `Warm` oppose `Thin`. |
| What it is not | Not `Crisp`, which keeps body; not `Spitty`, which lacks broad shine; not `Plasticky`, which adds a hollow center and harsh artificial edge. |
| Difficulty notes | Listen for the whole shape: less body plus more exposed top. It may sound impressive at first, then fragile or tiring. |
| Visual identity | A thin glass creature with bright cracks, sibilant chips, and a missing low-end shadow. Individual icon file: `icon/brittle.png`; region context: `icon/region/region-e-glassedge-spires.png`. |

## Fatiguing

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Fatiguing` |
| Creature identity | **The Ear-Tiring Furnace**: a forward, sharp creature that keeps pressing heat and edge into the music. |
| Feeling | The sound feels intense, tiring, and hard to relax into, like the upper mids and treble never stop pushing. |
| Listen for | Forward vocals, harsh guitars, sharp cymbals, loud snare edges, and mixes that make you want a break. |
| Where to find it | Region `E`: `Glassedge Spires` (`Treble Edge, Artificiality, And Pain`). Discover it as `Shouty + Harsh + Sibilant`, or as `Aggressive + Sibilant` / `Metallic + Shouty`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `fatiguing` |
| Aliases | none |
| Card type | Big combo discovery card |
| Frequency territory | Forward presence plus harsh and sibilant highs. Ingredient centers: `2600 Hz` from `Shouty`, `4000 Hz` from `Harsh`, and `8000 Hz` from `Sibilant`. |
| EQ move | Discovery label only. It expands to `Shouty` boost `+4.8 dB` at `2600 Hz`, `Q 1.05`, plus `Harsh` boost `+4.5 dB` at `4000 Hz`, `Q 1.0`, plus `Sibilant` boost `+5.0 dB` at `8000 Hz`, `Q 1.5`. |
| Boost/cut meaning | This is a stacked upper-mid and treble boost recipe. It adds pressure, edge, and bite through ingredients; the discovery card adds no new filter. |
| Recipes and evolutions | `Shouty + Harsh + Sibilant -> Fatiguing`; equivalent shortcuts: `Aggressive + Sibilant -> Fatiguing` and `Metallic + Shouty -> Fatiguing`; `Fatiguing + Thin + Hollow -> Piercing`. |
| Conflicts | `Dull`, because it opposes `Harsh` and `Sibilant`; `Shrill`, because it conflicts with the `Sibilant` ingredient. |
| What it is not | Not `Aggressive`, which lacks sibilant bite; not `Metallic`, which lacks the forward shout; not `Piercing`, which adds missing body and hollow center. |
| Difficulty notes | This is intentionally tiring. Use short listening rounds and compare against `Aggressive` and `Metallic` to hear the added sibilance or presence. |
| Visual identity | A hot sharp treble core with forward pressure beams and bright hiss sparks. Individual icon file: `icon/fatiguing.png`; region context: `icon/region/region-e-glassedge-spires.png`. |

## Plasticky

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Plasticky` |
| Creature identity | **The Fake Shell**: a hollow artificial creature with a cheap smooth body and sharp treble seams. |
| Feeling | The sound feels unnatural, light, and fake, with the center scooped out and the upper edge exaggerated. |
| Listen for | Cheap speaker tone, synthetic vocal body, hollow bright guitars, plasticky drums, and treble bite over an empty middle. |
| Where to find it | Region `E`: `Glassedge Spires` (`Treble Edge, Artificiality, And Pain`). Discover it as `Thin + Hollow + Harsh + Sibilant`, or through `Tinny`, `Spitty`, or `Metallic` paths. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `plasticky` |
| Aliases | none |
| Card type | Mega combo discovery card |
| Frequency territory | Low body loss, scooped center, harsh edge, and sibilant bite. Ingredient centers: `100 Hz` from `Thin`, `600 Hz` from `Hollow`, `4000 Hz` from `Harsh`, and `8000 Hz` from `Sibilant`. |
| EQ move | Discovery label only. It expands to `Thin` cut `-5.0 dB` at `100 Hz`, `Q 0.7`, plus `Hollow` cut `-5.0 dB` at `600 Hz`, `Q 0.85`, plus `Harsh` boost `+4.5 dB` at `4000 Hz`, `Q 1.0`, plus `Sibilant` boost `+5.0 dB` at `8000 Hz`, `Q 1.5`. |
| Boost/cut meaning | This is a cut-plus-boost recipe. It removes body and center while adding artificial upper bite; the discovery card adds no new filter. |
| Recipes and evolutions | `Thin + Hollow + Harsh + Sibilant -> Plasticky`; equivalent shortcuts: `Tinny + Hollow + Sibilant`, `Spitty + Hollow + Harsh`, or `Metallic + Thin + Hollow`; `Plasticky + Shouty -> Piercing`. |
| Conflicts | Inherits ingredient conflicts: `Dull` opposes `Harsh` and `Sibilant`; `Shrill` opposes `Sibilant`; `Warm` opposes `Hollow`; `Rumble`, `Thump`, `Boomy`, `Punchy`, `Muddy`, and `Warm` oppose `Thin`. |
| What it is not | Not `Metallic`, which lacks the missing body and hollow center; not `Brittle`, which uses `Bright` instead of `Harsh` and `Hollow`; not `Tinny`, which is simpler and smaller. |
| Difficulty notes | This is a broad discovery and should be easier to recognize than its individual ingredients once unlocked. Listen for fake tone, empty center, and sharp upper bite together. |
| Visual identity | A hollow synthetic shell with glossy edges, missing center glow, and sharp treble seams. Individual icon file: `icon/plasticky.png`; region context: `icon/region/region-e-glassedge-spires.png`. |

## Piercing

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Piercing` |
| Creature identity | **The Treble Lance**: a severe edge creature that gathers thinness, hollowness, shout, harshness, and hiss into one sharp point. |
| Feeling | The sound feels painfully forward and needle-bright, with no body to soften the impact. |
| Listen for | Vocals that stab, cymbals that sting, guitars that scrape, snares that jab, and mixes that feel impossible to relax into. |
| Where to find it | Region `E`: `Glassedge Spires` (`Treble Edge, Artificiality, And Pain`). Discover it as `Thin + Hollow + Shouty + Harsh + Sibilant`, or by evolving `Plasticky` or `Fatiguing`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `piercing` |
| Aliases | none |
| Card type | Mega combo discovery card |
| Frequency territory | Body loss plus stacked upper-mid and treble emphasis. Ingredient centers: `100 Hz` from `Thin`, `600 Hz` from `Hollow`, `2600 Hz` from `Shouty`, `4000 Hz` from `Harsh`, and `8000 Hz` from `Sibilant`. |
| EQ move | Discovery label only. It expands to `Thin` cut `-5.0 dB` at `100 Hz`, `Q 0.7`, plus `Hollow` cut `-5.0 dB` at `600 Hz`, `Q 0.85`, plus `Shouty` boost `+4.8 dB` at `2600 Hz`, `Q 1.05`, plus `Harsh` boost `+4.5 dB` at `4000 Hz`, `Q 1.0`, plus `Sibilant` boost `+5.0 dB` at `8000 Hz`, `Q 1.5`. |
| Boost/cut meaning | This is a five-ingredient cut-plus-boost recipe. It removes body and center while stacking forward presence, harsh edge, and sibilant bite; the discovery card adds no new filter. |
| Recipes and evolutions | `Thin + Hollow + Shouty + Harsh + Sibilant -> Piercing`; equivalent shortcuts: `Plasticky + Shouty`, `Fatiguing + Thin + Hollow`, or `Aggressive + Spitty + Hollow`. |
| Conflicts | Inherits ingredient conflicts: `Dull` opposes `Harsh` and `Sibilant`; `Shrill` opposes `Sibilant`; `Warm` opposes `Hollow` and `Thin`; `Rumble`, `Thump`, `Boomy`, `Punchy`, and `Muddy` oppose `Thin`. |
| What it is not | Not `Shrill`, which is a single severe treble card; not `Fatiguing`, which still has more body; not `Plasticky`, which lacks the forward `Shouty` push. |
| Difficulty notes | This is a late Region E apex card. It should be obvious at practice intensity, but uncomfortable, so use short comparisons and clear warnings in lesson pacing. |
| Visual identity | A narrow treble lance, jagged pressure rays, hollow center shadow, and sharp white-blue warning glow. Individual icon file: `icon/piercing.png`; region context: `icon/region/region-e-glassedge-spires.png`. |

## Crisp

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Crisp` |
| Creature identity | **The Glass-Spark**: a shiny treble creature that clicks, flashes, and makes tiny details feel freshly polished. |
| Feeling | The sound feels cleaner, sharper, and more detailed, with sparkle plus little consonant bites at the edge. |
| Listen for | Cymbal shimmer, vocal consonants, acoustic pick noise, snare snap, and small details that become easier to spot. |
| Where to find it | Region `F`: `Scoopshine Basin` (`Scoop, Shine, And Hype`). Discover it by combining `Bright` and `Sibilant`; it can help build `Hyped` with `Boomy` and `Hollow`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `crisp` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Broad top shine plus narrow treble bite. Ingredient centers: `10000 Hz` from `Bright` and `8000 Hz` from `Sibilant`. |
| EQ move | Discovery label only. It expands to `Bright` boost `+3.5 dB` at `10000 Hz`, `Q 0.65`, plus `Sibilant` boost `+5.0 dB` at `8000 Hz`, `Q 1.5`. |
| Boost/cut meaning | This is a combined treble boost recipe. It adds broad shine and narrow consonant edge through its ingredient descriptors. |
| Recipes and evolutions | `Bright + Sibilant -> Crisp`; `Crisp + Boomy + Hollow -> Hyped`; also supports `Brittle` as `Crisp + Thin`. Discovery cards do not add new filters; they expand to ingredient descriptors. |
| Conflicts | `Dull`, because it opposes both top-end ingredients; `Shrill`, because it opposes the `Sibilant` ingredient. |
| What it is not | Not just `Bright`, which lacks the narrow consonant bite; not just `Sibilant`, which lacks broad top shine; not `Hyped`, which adds bass bloom and a scooped center. |
| Difficulty notes | Easier than many single treble cards once unlocked, because the combined top-end change is broader. It still depends on material with cymbals, vocals, or bright percussion. |
| Visual identity | Polished glass sparks, small bright clicks, and crystalline treble flashes on Region F's high towers. Individual icon file: `icon/crisp.png`; region context: `icon/region/region-f-scoopshine-basin.png`. |

## V-shaped

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `V-shaped` |
| Creature identity | **The Smile-Curve Canyon**: a wide creature-landscape with bass rising on one side, treble glittering on the other, and a hollow valley in the middle. |
| Feeling | The sound feels boosted at the ends and scooped in the center: big bass, shiny top, less middle body. |
| Listen for | Headphones that sound exciting at first, bass and sparkle that stand out, vocals that feel slightly pulled back, and mixes with a polished smile shape. |
| Where to find it | Region `F`: `Scoopshine Basin` (`Scoop, Shine, And Hype`). Discover it directly by combining `Boomy`, `Hollow`, and `Bright`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `v_shaped` |
| Aliases | none |
| Card type | Big combo discovery card |
| Frequency territory | Bass and treble emphasized around a recessed center. Ingredient centers: `70 Hz` from `Boomy`, `600 Hz` from `Hollow`, and `10000 Hz` from `Bright`. |
| EQ move | Discovery label only. It expands to `Boomy` boost `+4.5 dB` at `70 Hz`, `Q 0.65`, plus `Hollow` cut `-5.0 dB` at `600 Hz`, `Q 0.85`, plus `Bright` boost `+3.5 dB` at `10000 Hz`, `Q 0.65`. |
| Boost/cut meaning | This is a smile-curve recipe: boosted low end, reduced middle body, and boosted top shine. The discovery adds no hidden filter beyond its ingredients. |
| Recipes and evolutions | `Boomy + Hollow + Bright -> V-shaped`; `V-shaped + Sibilant -> Hyped`. It is a direct discovery with no current two-card recipe bridge. Discovery cards do not add new filters; they expand to ingredient descriptors. |
| Conflicts | `Thin`, because it opposes `Boomy`; `Warm`, because it opposes `Hollow`; `Dull`, because it opposes `Bright`. |
| What it is not | Not `Crisp`, which is a treble-only discovery; not `Hyped`, which adds `Sibilant`; not `Distant`, which is hollow and dull rather than bassy and shiny. |
| Difficulty notes | A strong headphone-rating card. It should feel more obvious than its separate ingredients, but the player may need help noticing the pulled-back middle instead of only the bass and shine. |
| Visual identity | A wide V canyon, raised bass cliffs, bright treble towers, and a recessed hollow center. Individual icon file: `icon/v-shaped.png`; region context: `icon/region/region-f-scoopshine-basin.png`. |

## Hyped

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Hyped` |
| Creature identity | **The Neon Hype-Beast**: an overcharged smile-curve creature with glowing bass feet, a hollow middle, and razor-bright sparks flying from the top. |
| Feeling | The sound feels big, shiny, modern, and a little overexcited, with bass and treble pushed forward while the middle steps back. |
| Listen for | Headphones or speakers that sound impressive fast, bass that blooms, vocals that sit behind the shine, and S sounds or cymbals that feel extra spicy. |
| Where to find it | Region `F`: `Scoopshine Basin` (`Scoop, Shine, And Hype`). Discover it as `Boomy + Hollow + Bright + Sibilant`, or evolve it from `V-shaped + Sibilant`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `hyped` |
| Aliases | none |
| Card type | Mega combo discovery card |
| Frequency territory | Smile-shaped tone with extra treble bite. Ingredient centers: `70 Hz` from `Boomy`, `600 Hz` from `Hollow`, `10000 Hz` from `Bright`, and `8000 Hz` from `Sibilant`. |
| EQ move | Discovery label only. It expands to `Boomy` boost `+4.5 dB` at `70 Hz`, `Q 0.65`, plus `Hollow` cut `-5.0 dB` at `600 Hz`, `Q 0.85`, plus `Bright` boost `+3.5 dB` at `10000 Hz`, `Q 0.65`, plus `Sibilant` boost `+5.0 dB` at `8000 Hz`, `Q 1.5`. |
| Boost/cut meaning | This is a combined boost-and-cut recipe. It keeps the V-shaped scoop, then adds narrow bite through `Sibilant` rather than adding any hidden extra EQ. |
| Recipes and evolutions | `Boomy + Hollow + Bright + Sibilant -> Hyped`; equivalent shortcuts: `V-shaped + Sibilant -> Hyped` and `Crisp + Boomy + Hollow -> Hyped`. Discovery cards do not add new filters; they expand to ingredient descriptors. |
| Conflicts | `Thin`, because it opposes `Boomy`; `Warm`, because it opposes `Hollow`; `Dull`, because it opposes `Bright` and `Sibilant`; `Shrill`, because it opposes `Sibilant`. |
| What it is not | Not `V-shaped`, which lacks the extra consonant bite; not `Crisp`, which lacks bass bloom and the scooped center; not `Exciting`, which uses deep low force and air instead of a hollow smile curve. |
| Difficulty notes | Often easier to recognize than its separate basics because the full recipe is broad and dramatic. It is important for headphone rating vocabulary, but players should still learn the ingredient shape after unlock. |
| Visual identity | A neon smile-curve creature, glowing bass side, hollow center, crystalline treble side, and hot white sibilant sparks. Individual icon file: `icon/hyped.png`; region context: `icon/region/region-f-scoopshine-basin.png`. |

## Hollow

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Hollow` |
| Creature identity | **The Empty-Shell**: a scooped-out midrange creature with a quiet space where the music's body should be. |
| Feeling | The sound feels empty in the middle, like voices and instruments have lost their chest and center. |
| Listen for | Vocals that feel less solid, guitars with a missing body, snare tone that loses its middle, and mixes that seem to echo around a hole. |
| Where to find it | Region `G`: `Frosthollow Expanse` (`Distance, Coldness, And Emptiness`). It can join `Dull` to make `Distant`, or join `Bright` and `Thin` to make `Cold`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `hollow` |
| Aliases | `Cold`, `Muffled` |
| Card type | Basic element card |
| Frequency territory | Low-mid / center-body scoop. Practical listening zone: about `400-800 Hz`; catalog center: `600 Hz`. It sits near the `500 Hz` ladder point where cuts can read as cold, hollow, or muffled. |
| EQ move | Cut: `-5.0 dB` at `600 Hz`, `Q 0.85`. |
| Boost/cut meaning | This is a midrange cut. It removes body from the center of the sound rather than adding brightness or bass. |
| Recipes and evolutions | `Hollow + Dull -> Distant`; `Hollow + Bright + Thin -> Cold`; `Boomy + Hollow + Bright -> V-shaped`; `Thin + Hollow + Harsh + Sibilant -> Plasticky`; `Thin + Hollow + Shouty + Harsh + Sibilant -> Piercing`. |
| Conflicts | `Warm`, because `Warm` adds low-mid body while `Hollow` removes the center/body area. |
| What it is not | Not `Thin`, which removes bass foundation around `100 Hz`; not `Dull`, which removes high detail around `6500 Hz`; not `Boxy`, which adds enclosed midrange instead of scooping it out. |
| Difficulty notes | Best learned on vocals, guitars, piano, and snare body. It can be mistaken for lower volume, so listen for the missing center rather than overall loudness. |
| Visual identity | A scooped middle chamber, empty shell, or centerless creature with inward pale waveform lines. Individual icon file: `icon/hollow.png`; region context: `icon/region/region-g-frosthollow-expanse.png`. |

## Distant

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Distant` |
| Creature identity | **The Far-Door Echo**: a small pale sound creature heard from the end of a cold hallway. |
| Feeling | The music moves away from you. The center feels scooped out and the fine detail fades into the background. |
| Listen for | Vocals that step back, instruments that lose closeness, cymbals with less detail, and the whole mix feeling farther away. |
| Where to find it | Region `G`: `Frosthollow Expanse` (`Distance, Coldness, And Emptiness`). Discover it by combining `Hollow` and `Dull`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `distant` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Scooped center plus reduced detail. Ingredient centers: `600 Hz` from `Hollow` and `6500 Hz` from `Dull`. |
| EQ move | Discovery label only. It expands to `Hollow` cut `-5.0 dB` at `600 Hz`, `Q 0.85`, plus `Dull` cut `-5.0 dB` at `6500 Hz`, `Q 0.55`. |
| Boost/cut meaning | This is a combined cut recipe. It removes center body and top detail, making the sound feel farther away. |
| Recipes and evolutions | `Hollow + Dull -> Distant`. `Distant` and `Cold` are emotionally related in Region G, but they do not currently evolve into each other. Discovery cards do not add new filters; they expand to ingredient descriptors. |
| Conflicts | `Warm`, because it opposes `Hollow`; `Bright`, `Airy`, `Harsh`, `Sibilant`, and `Shrill`, because they oppose `Dull`. |
| What it is not | Not just `Hollow`, because it also loses top detail; not just `Dull`, because it also loses center body; not `Cold`, which keeps an exposed bright top. |
| Difficulty notes | Easier after the player has learned `Hollow` and `Dull` separately. Listen for distance and reduced closeness, not just darkness. |
| Visual identity | A small waveform doorway far away inside a wide empty blue-gray basin. Individual icon file: `icon/distant.png`; region context: `icon/region/region-g-frosthollow-expanse.png`. |

## Cold

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Cold` |
| Creature identity | **The Frost-Shell**: a lean hollow creature with no warm body, only a pale top glint over an empty middle. |
| Feeling | The sound feels cool, detached, and underfed. The body is missing, but the exposed top still catches the light. |
| Listen for | Vocals that feel pale, bass that lacks support, warmth that disappears, and bright details that remain exposed instead of cozy. |
| Where to find it | Region `G`: `Frosthollow Expanse` (`Distance, Coldness, And Emptiness`). Discover it directly by combining `Hollow`, `Bright`, and `Thin`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `cold` |
| Aliases | none |
| Card type | Big combo discovery card |
| Frequency territory | Missing foundation, scooped center, and exposed top. Ingredient centers: `600 Hz` from `Hollow`, `10000 Hz` from `Bright`, and `100 Hz` from `Thin`. |
| EQ move | Discovery label only. It expands to `Hollow` cut `-5.0 dB` at `600 Hz`, `Q 0.85`, plus `Bright` boost `+3.5 dB` at `10000 Hz`, `Q 0.65`, plus `Thin` cut `-5.0 dB` at `100 Hz`, `Q 0.7`. |
| Boost/cut meaning | This is a mixed recipe: cuts remove body and foundation while the bright boost leaves the top exposed. |
| Recipes and evolutions | `Hollow + Bright + Thin -> Cold`. `Cold` is a direct discovery with no lower recipe bridge, and it does not currently evolve from `Distant`. Discovery cards do not add new filters; they expand to ingredient descriptors. |
| Conflicts | `Rumble`, `Thump`, `Boomy`, `Punchy`, `Muddy`, and `Warm`, because they oppose the body-loss ingredients; `Dull`, because it opposes `Bright`. |
| What it is not | Not `Distant`, which uses `Dull` and loses top detail; not `V-shaped`, which has bass boost around the recessed center; not just `Bright`, because the body and foundation are also missing. |
| Difficulty notes | This may feel surprising because it has no lower recipe bridge. Teach it as a direct three-card discovery and ask the player to listen for exposed top end over a missing body. |
| Visual identity | A frosted hollow body, thin low foundation, empty center, and pale treble glint in a sparse cold space. Individual icon file: `icon/cold.png`; region context: `icon/region/region-g-frosthollow-expanse.png`. |
