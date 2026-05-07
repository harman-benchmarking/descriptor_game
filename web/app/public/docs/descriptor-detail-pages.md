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
| `Difficulty notes` | whether it needs exaggerated intensity or hidden/hinted play |
| `Visual identity` | icon idea and region visual connection |

## Rumble

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Rumble` |
| Creature identity | **The Floor-Shaker**: a slow sub-bass creature that sleeps under the music and wakes the ground when the low notes arrive. |
| Feeling | The sound gains weight, pressure, and a deep moving floor. You feel it more than you clearly hear it. |
| Listen for | Sub synths, cinematic drones, the lowest part of a kick drum, and bass notes that make the room feel larger. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `rumble` |
| Aliases | `Droning` |
| Card type | Basic element card |
| Frequency territory | Sub-bass. Practical listening zone: about `20-60 Hz`; catalog center: `35 Hz`. It sits near the `31 Hz` ladder point and can spill toward the `63 Hz` bass area because the Q is broad. |
| EQ move | Boost: `+4.0 dB` at `35 Hz`, `Q 0.7`. |
| Boost/cut meaning | This is a low-frequency boost. It adds sub foundation and physical pressure rather than removing energy. |
| Recipes and evolutions | `Rumble + Thump -> Powerful`; `Powerful + Bright -> Energetic`; `Energetic + Airy -> Exciting`. Equivalent full paths: `Rumble + Thump + Bright` and `Rumble + Thump + Bright + Airy`. |
| Conflicts | `Thin`, because `Thin` removes bass/body foundation while `Rumble` adds sub foundation. |
| What it is not | Not `Thump`, which is a shorter low-bass hit around `55 Hz`; not `Boomy`, which is broader lingering bass around `70 Hz`; not `Muddy`, which clouds the upper-bass/low-mid area around `125 Hz`. |
| Difficulty notes | Easier than many narrow treble descriptors when exaggerated, because sub-bass changes feel physical. On small speakers or quiet playback it may be hard to hear; use headphones/sub-capable playback or higher intensity. |
| Visual identity | Heavy ground waves, a sub-bass core, slow wide waveform arcs, and controlled sparks when shown inside Region A's energy path. Individual icon file: `icon/rumble.png`; region context: `icon/region/region-a-thunderstep-highlands.png`. |

## Thump

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Thump` |
| Creature identity | **The Ground-Knocker**: a compact low-bass creature that lands one solid hit and leaves a clear footprint in the music. |
| Feeling | The sound gets a quick physical bump: tighter and more immediate than deep rumble, like a low note tapping your chest. |
| Listen for | Kick-drum hits, low toms, bass plucks, and any beat where the first impact matters more than the long tail. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `thump` |
| Aliases | none |
| Card type | Basic element card |
| Frequency territory | Low bass. Practical listening zone: about `45-80 Hz`; catalog center: `55 Hz`. It sits above `Rumble` and below the broader `Boomy` region. |
| EQ move | Boost: `+3.0 dB` at `55 Hz`, `Q 0.9`. |
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

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `bright` |
| Aliases | none |
| Card type | Basic element card |
| Frequency territory | High treble / presence sparkle. Practical listening zone: about `8-12 kHz`; catalog center: `10000 Hz`. It sits below the very high air extension of `Airy`. |
| EQ move | Boost: `+3.5 dB` at `10000 Hz`, `Q 0.65`. |
| Boost/cut meaning | This is a high-frequency boost. It adds clarity, edge, and treble sparkle rather than reducing darkness or adding low-end power. |
| Recipes and evolutions | Region A path support: `Bright + Airy -> Shimmering`; `Powerful + Bright -> Energetic`; `Energetic + Airy -> Exciting`; `Powerful + Shimmering -> Exciting`. Region B bridge: `Boomy + Bright -> Vivid`. Region E bridges: `Thin + Bright -> Lean` and `Bright + Harsh -> Sharp`. Also appears in Region `B` and `E` contexts, while Frosthollow uses `Airy` instead. |
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

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `airy` |
| Aliases | none |
| Card type | Basic element card |
| Frequency territory | Very high treble / air band. Practical listening zone: about `12-16 kHz`; catalog center: `14000 Hz`. It sits above `Bright` as the final open-air extension. |
| EQ move | Boost: `+4.0 dB` at `14000 Hz`, `Q 0.7`. |
| Boost/cut meaning | This is a very high-frequency boost. It adds air, openness, and extended sparkle rather than core brightness or midrange clarity. |
| Recipes and evolutions | Region A path support: `Bright + Airy -> Shimmering`; `Energetic + Airy -> Exciting`; `Powerful + Shimmering -> Exciting`. Equivalent full path: `Rumble + Thump + Bright + Airy`. Frosthollow chain: `Hollow + Airy -> Scooped`; `Thin + Hollow + Airy -> Cold`. |
| Conflicts | `Dull`, because `Dull` removes high-frequency openness while `Airy` adds upper-treble extension. |
| What it is not | Not `Bright`, which is lower and more crisp around `10000 Hz`; not hiss, which is unwanted noise; not `Harsh`, which is sharper and more biting lower down. |
| Difficulty notes | One of the more playback-dependent descriptors. It works best on full-range headphones or speakers and with material that already has cymbal trails, breath, or room detail. |
| Visual identity | High floating arcs, soft sky sparks, pale shimmer trails, and a lightweight creature hovering at the top of Region A's energy path. Individual icon file: `icon/airy.png`; region context: `icon/region/region-a-thunderstep-highlands.png`. |

## Shimmering

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Shimmering` |
| Creature identity | **The Sky-Spark Veil**: a bright airy creature that scatters tiny glints across the very top of the music. |
| Feeling | The sound feels shiny, floating, and open, with a soft sparkle that lifts the mix without turning hard. |
| Listen for | Cymbal trails, breath, room sparkle, delicate high shimmer, and treble detail that feels suspended above the main notes. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `shimmering` |
| Aliases | shimmer, sparkle |
| Card type | Combo discovery card |
| Frequency territory | Broad top shine plus very high air. Ingredient centers: `10000 Hz` from `Bright` and `14000 Hz` from `Airy`. |
| EQ move | Discovery label only. It expands to `Bright` boost `+3.5 dB` at `10000 Hz`, `Q 0.65`, plus `Airy` boost `+4.0 dB` at `14000 Hz`, `Q 0.7`. |
| Boost/cut meaning | This is a treble-positive boost recipe. It adds shine and upper-air extension through its ingredient descriptors. |
| Recipes and evolutions | `Bright + Airy -> Shimmering`; `Powerful + Shimmering -> Exciting`. Discovery cards do not add new filters; they expand to ingredient descriptors. |
| Conflicts | `Dull`, because both ingredients oppose broad top-end reduction. |
| What it is not | Not just `Bright`, which is lower and more direct; not just `Airy`, which is more open and less sparkly; not `Crisp`, which has harder definition from `Glassy`. |
| Difficulty notes | Playback-dependent but useful as a positive treble bridge. Teach it on cymbals, breath, reverb tails, and acoustic detail. |
| Visual identity | A translucent breeze creature with pale gold glints and high sky-blue shimmer trails. Individual icon file: `icon/shimmering.png`; region context: `icon/region/region-a-thunderstep-highlands.png`. |

## Powerful

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Powerful` |
| Creature identity | **The Bass Titan**: a heavy low-end creature with deep roots and a striking footfall. |
| Feeling | The sound feels bigger, stronger, and more physical, with both deep pressure and a clear low hit. |
| Listen for | Big kicks, bass drops, heavy synth bass, cinematic hits, and grooves that feel anchored to the floor. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `powerful` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Low-end force made from sub-bass extension and low-bass impact. Ingredient centers: `35 Hz` from `Rumble` and `55 Hz` from `Thump`. |
| EQ move | Discovery label only. It expands to `Rumble` boost `+4.0 dB` at `35 Hz`, `Q 0.7`, plus `Thump` boost `+3.0 dB` at `55 Hz`, `Q 0.9`. |
| Boost/cut meaning | This is a combined low-frequency boost recipe. It adds deep foundation and physical impact rather than removing energy. |
| Recipes and evolutions | `Rumble + Thump -> Powerful`; `Powerful + Bright -> Energetic`; `Energetic + Airy -> Exciting`. |
| Conflicts | `Thin`, because `Thin` removes bass/body foundation while `Powerful` adds low-end weight and impact. |
| What it is not | Not just `Rumble`, which is deeper and slower; not just `Thump`, which is shorter and more compact; not `Boomy`, which is a broader lingering bass color. |
| Difficulty notes | Easier to hear on bass-capable playback. On small speakers it may collapse into a general loudness change, so use headphones or stronger intensity. |
| Visual identity | A massive low-bass creature with ground rings, heavy steps, and controlled Region A sparks. Individual icon file: `icon/powerful.png`; region context: `icon/region/region-a-thunderstep-highlands.png`. |

## Impactful

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Impactful` |
| Creature identity | **The Hit-Maker**: a compact impact creature that snaps the beat forward with a solid low strike. |
| Feeling | The sound feels more direct, punchy, and forceful, like each hit has a clearer landing point. |
| Listen for | Kick attacks, bass plucks, tom hits, tight drops, and beats that suddenly feel more decisive. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `impactful` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Low hit plus focused punch. Ingredient centers: `55 Hz` from `Thump` and `95 Hz` from `Punchy`. |
| EQ move | Discovery label only. It expands to `Thump` boost `+3.0 dB` at `55 Hz`, `Q 0.9`, plus `Punchy` boost `+3.5 dB` at `95 Hz`, `Q 1.2`. |
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

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `energetic` |
| Aliases | none |
| Card type | Big combo discovery card |
| Frequency territory | Bass force with shine. Ingredient centers: `35 Hz` from `Rumble`, `55 Hz` from `Thump`, and `10000 Hz` from `Bright`. |
| EQ move | Discovery label only. It expands to `Rumble` boost `+4.0 dB` at `35 Hz`, `Q 0.7`, plus `Thump` boost `+3.0 dB` at `55 Hz`, `Q 0.9`, plus `Bright` boost `+3.5 dB` at `10000 Hz`, `Q 0.65`. |
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

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `exciting` |
| Aliases | none |
| Card type | Mega combo discovery card |
| Frequency territory | Full low-end force plus extended top. Ingredient centers: `35 Hz` from `Rumble`, `55 Hz` from `Thump`, `10000 Hz` from `Bright`, and `14000 Hz` from `Airy`. |
| EQ move | Discovery label only. It expands to `Rumble` boost `+4.0 dB` at `35 Hz`, `Q 0.7`, plus `Thump` boost `+3.0 dB` at `55 Hz`, `Q 0.9`, plus `Bright` boost `+3.5 dB` at `10000 Hz`, `Q 0.65`, plus `Airy` boost `+4.0 dB` at `14000 Hz`, `Q 0.7`. |
| Boost/cut meaning | This is a combined boost recipe. It adds bass power, treble shine, and top-end openness through its ingredient descriptors. |
| Recipes and evolutions | `Rumble + Thump + Bright + Airy -> Exciting`; equivalent shortcuts: `Energetic + Airy -> Exciting` and `Powerful + Shimmering -> Exciting`. Discovery labels do not add new filters; they expand to ingredients. |
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

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `warm` |
| Aliases | none |
| Card type | Basic element card |
| Frequency territory | Low mids / body zone. Practical listening zone: about `200-350 Hz`; catalog center: `250 Hz`. It sits above upper-bass weight and below the boxier lower-mid area. |
| EQ move | Boost: `+3.0 dB` at `250 Hz`, `Q 0.7`. |
| Boost/cut meaning | This is a low-mid boost. It adds body and warmth rather than removing treble or adding bass bloom. |
| Recipes and evolutions | `Warm + Bright -> Full`; `Warm + Boomy -> Thick`; `Warm + Dull -> Mellow`; `Warm + Boxy -> Chesty`; `Mellow + Boxy -> Vintage`; `Chesty + Dull -> Vintage`. |
| Conflicts | `Thin`, because `Thin` removes bass/body foundation; `Hollow`, because `Hollow` scoops the center while `Warm` fills it in. |
| What it is not | Not `Boomy`, which is lower and more bass-heavy around `70 Hz`; not `Muddy`, which clouds around `125 Hz`; not `Boxy`, which is narrower and more enclosed around `350 Hz`. |
| Difficulty notes | Best learned on vocals, acoustic instruments, piano, and full-band mixes. It can be subtle at lower intensity, so start exaggerated and compare against `Thin` or `Hollow`. |
| Visual identity | A rounded amber body glow, soft low-mid waves, and a calm creature nested inside Region B's warm chamber. Individual icon file: `icon/warm.png`; region context: `icon/region/region-b-emberbody-valley.png`. |

## Boomy

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Boomy` |
| Creature identity | **The Bass-Bloomer**: a broad low-end creature that swells outward after each hit and leaves big round ripples behind. |
| Feeling | The sound gets bigger and bassier, but the low end hangs around longer than a clean hit. |
| Listen for | Kick drums that bloom after impact, bass notes that spread wide, and mixes where the bottom feels large but less controlled. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `boomy` |
| Aliases | none |
| Card type | Basic element card |
| Frequency territory | Low bass bloom. Practical listening zone: about `60-90 Hz`; catalog center: `70 Hz`. It sits near the `63 Hz` ladder point, above `Thump` and below the upper-bass cloud of `Muddy`. |
| EQ move | Boost: `+4.5 dB` at `70 Hz`, `Q 0.65`. |
| Boost/cut meaning | This is a broad bass boost. It adds low-end size and lingering bloom rather than tight impact or low-mid body. |
| Recipes and evolutions | `Warm + Boomy -> Thick`; `Boomy + Boxy -> Bassy`; `Boomy + Bright -> Vivid`; `Boomy + Muddy -> Bloated`; `Congested + Boomy -> Buried`. |
| Conflicts | `Thin`, because `Thin` removes bass/body foundation while `Boomy` adds low-end bloom. |
| What it is not | Not `Rumble`, which is deeper sub movement around `35 Hz`; not `Thump`, which is a shorter hit around `55 Hz`; not `Punchy`, which is tighter around `95 Hz`; not `Muddy`, which clouds higher around `125 Hz`. |
| Difficulty notes | Easier to notice on bass-capable headphones or speakers. On loose playback it can blur into ordinary bass loudness, so use kick-and-bass material with clean gaps between hits. |
| Visual identity | A wide bass swell, rounded low waves, and a heavy amber pulse rolling through Region B's chamber. Individual icon file: `icon/boomy.png`; region context: `icon/region/region-b-emberbody-valley.png`. |

## Bassy

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Bassy` |
| Creature identity | **The Bass-Cabinet**: a rounded low-end creature swelling inside a small boxy chamber. |
| Feeling | The sound feels obviously bass-heavy and enclosed, with extra low bloom plus a low-mid box shape. |
| Listen for | Bass notes that feel larger than clean `Boomy`, plus a cabinet-like thickness around kicks, bass guitar, and low vocal body. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `bassy` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Low-end bloom plus low-mid enclosure. Ingredient centers: `70 Hz` from `Boomy` and `350 Hz` from `Boxy`. |
| EQ move | Discovery label only. It expands to `Boomy` boost `+4.5 dB` at `70 Hz`, `Q 0.65`, plus `Boxy` boost `+4.0 dB` at `350 Hz`, `Q 1.1`. |
| Boost/cut meaning | This is a boost-plus-boost recipe. It makes the low end feel abundant and boxed-in without using `Muddy`'s upper-bass cloud. |
| Recipes and evolutions | `Boomy + Boxy -> Bassy`. Discovery labels do not add new filters; this card expands to its ingredient descriptors. |
| Conflicts | `Thin`, because of `Boomy`. |
| What it is not | Not just `Boomy`, which is lower and more open; not `Muddy`, which clouds around `125 Hz`; not `Bloated`, which combines `Boomy + Muddy`; not `Cloudy`, which combines `Muddy + Boxy`. |
| Difficulty notes | Useful for teaching daily language without leaving the recipe system. The player should hear both the low swell and the small-box support. |
| Visual identity | A rounded bass cushion inside a loose cabinet frame, with broad low wave arcs and a boxed low-mid shadow. Individual icon file: `icon/bassy.png`; region context: `icon/region/region-b-emberbody-valley.png`. |

## Vivid

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Vivid` |
| Creature identity | **The Color-Lantern**: a lively bass creature with a bright treble crown glowing above it. |
| Feeling | The sound feels more colorful, awake, and saturated: bigger low bloom underneath with clearer top detail above. |
| Listen for | Bass and kick weight stepping forward while cymbals, vocal consonants, or acoustic detail also become clearer. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `vivid` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Low-end bloom plus bright top clarity. Ingredient centers: `70 Hz` from `Boomy` and `10000 Hz` from `Bright`. |
| EQ move | Discovery label only. It expands to `Boomy` boost `+4.5 dB` at `70 Hz`, `Q 0.65`, plus `Bright` boost `+3.5 dB` at `10000 Hz`, `Q 0.65`. |
| Boost/cut meaning | This is a two-ended boost recipe. It adds bass bloom and bright top clarity without cutting the center. |
| Recipes and evolutions | `Boomy + Bright -> Vivid`. Discovery labels do not add new filters; this card expands to its ingredient descriptors. |
| Conflicts | `Thin`, because of `Boomy`; `Dull`, because of `Bright`. |
| What it is not | Not `Bassy`, which adds `Boxy` enclosure; not `Full`, which uses `Warm` body instead of bass bloom; not `Exciting`, which adds low impact and air; not retired smile-curve vocabulary, which used a recessed center. |
| Difficulty notes | Useful as the Floor 1 two-ended boost target. The player should hear both the low bloom and the bright top without assuming every low-plus-high shape is scooped. |
| Visual identity | A rounded low-end body with a clean glowing treble crown and a continuous color glow between them. Individual icon file: `icon/vivid.png`; region context: `icon/region/region-b-emberbody-valley.png`. |

## Full

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Full` |
| Creature identity | **The Lantern-Bodied One**: a warm round creature with a clear light shining from the top of its shell. |
| Feeling | The sound feels complete and satisfying: body in the middle, openness at the top, and no obvious thinness. |
| Listen for | Vocals that feel filled out but still clear, instruments with body and shine, and mixes that feel balanced rather than hollow or dark. |

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

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `mellow` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Low-mid body with softened upper detail. Ingredient centers: `250 Hz` from `Warm` and `6500 Hz` from `Dull`. |
| EQ move | Discovery label only. It expands to `Warm` boost `+3.0 dB` at `250 Hz`, `Q 0.7`, plus `Dull` cut `-5.0 dB` at `6500 Hz`, `Q 0.55`. |
| Boost/cut meaning | This is a boost-plus-cut recipe. It adds body while reducing upper detail through its ingredient descriptors. |
| Recipes and evolutions | `Warm + Dull -> Mellow`; `Mellow + Boxy -> Vintage`; equivalent path: `Chesty + Dull -> Vintage`. Discovery labels do not add new filters. |
| Conflicts | Through ingredients: `Thin` and `Hollow` oppose `Warm`; `Bright`, `Airy`, `Harsh`, `Glassy`, and `Sibilant` oppose `Dull`. |
| What it is not | Not `Warm` alone, because the top is softened; not `Dull` alone, because it still has body; not `Full`, which keeps an open top; not `Vintage`, which adds enclosed `Boxy` color. |
| Difficulty notes | Listen for relaxation rather than loss alone. It can sound like a volume or brightness change unless the player notices the added body at the same time. |
| Visual identity | A soft amber ember with dim upper sparks, rounded body waves, and a shaded top inside Region B's warm space. Individual icon file: `icon/mellow.png`; region context: `icon/region/region-b-emberbody-valley.png`. |

## Chesty

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Chesty` |
| Creature identity | **The Cedar Resonator**: a warm wooden chest creature that hums from its low-mid body. |
| Feeling | The sound feels warm, woody, and chest-filled, with body plus a small enclosed resonance. |
| Listen for | Voices gaining chest tone, acoustic instruments feeling woody, and low mids filling in without turning muddy. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `chesty` |
| Aliases | chesty warmth |
| Card type | Combo discovery card |
| Frequency territory | Warm low-mid body plus box resonance. Ingredient centers: `250 Hz` from `Warm` and `350 Hz` from `Boxy`. |
| EQ move | Discovery label only. It expands to `Warm` boost `+3.0 dB` at `250 Hz`, `Q 0.7`, plus `Boxy` boost `+4.0 dB` at `350 Hz`, `Q 1.1`. |
| Boost/cut meaning | This is a low-mid boost recipe. It adds body and enclosed resonance through its ingredient descriptors. |
| Recipes and evolutions | `Warm + Boxy -> Chesty`; `Chesty + Dull -> Vintage`. Discovery cards do not add new filters; they expand to ingredient descriptors. |
| Conflicts | `Thin`, because `Warm` opposes missing foundation; `Hollow`, because `Warm` fills the body area. |
| What it is not | Not just `Warm`, which is smoother and broader; not just `Boxy`, which is more cardboard/cabinet-like; not `Cupped`, which is more hand-shaped and honky. |
| Difficulty notes | Useful on vocals and acoustic instruments. It may be pleasant, so teach the player to notice whether the body becomes natural or enclosed. |
| Visual identity | A rounded wooden chest-resonator with a warm glow and low-mid wave arcs. Individual icon file: `icon/chesty.png`; region context: `icon/region/region-b-emberbody-valley.png`. |

## Vintage

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Vintage` |
| Creature identity | **The Old Cabinet Spirit**: a warm, shaded creature living inside a resonant wooden chamber. |
| Feeling | The sound feels nostalgic, softened, thick, and enclosed, like the music has passed through an old speaker cabinet. |
| Listen for | Rounded vocals, softened cymbals, boxier drums, warm guitars, and mixes that feel colored, intimate, or old-fashioned. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `vintage` |
| Aliases | none |
| Card type | Big combo discovery card |
| Frequency territory | Warm body, lower-mid enclosure, and softened upper detail. Ingredient centers: `250 Hz` from `Warm`, `350 Hz` from `Boxy`, and `6500 Hz` from `Dull`. |
| EQ move | Discovery label only. It expands to `Warm` boost `+3.0 dB` at `250 Hz`, `Q 0.7`, plus `Boxy` boost `+4.0 dB` at `350 Hz`, `Q 1.1`, plus `Dull` cut `-5.0 dB` at `6500 Hz`, `Q 0.55`. |
| Boost/cut meaning | This is a combined color recipe. It adds warm low mids and boxy enclosure while reducing upper detail through its ingredient descriptors. |
| Recipes and evolutions | `Warm + Boxy + Dull -> Vintage`; equivalent shortcuts: `Mellow + Boxy -> Vintage` and `Chesty + Dull -> Vintage`. Discovery labels do not add new filters; this card expands to its ingredient descriptors. |
| Conflicts | Through ingredients: `Thin` and `Hollow` oppose `Warm`; `Bright`, `Airy`, `Harsh`, `Glassy`, and `Sibilant` oppose `Dull`; `Boxy` has no listed conflicts. |
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

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `boxy` |
| Aliases | none |
| Card type | Basic element card |
| Frequency territory | Low-mid enclosure. Practical listening zone: about `250-500 Hz`; catalog center: `350 Hz`. It sits above warm body and below honky mid projection. |
| EQ move | Boost: `+4.0 dB` at `350 Hz`, `Q 1.1`. |
| Boost/cut meaning | This is a low-mid boost. It adds cabinet, cardboard, or room-like resonance rather than reducing clarity directly. |
| Recipes and evolutions | `Warm + Boxy -> Chesty`; `Boxy + Honky -> Cupped`; `Boxy + Nasal -> Tubular`; `Cupped + Nasal -> Canned`; equivalent shortcuts: `Pinched + Boxy -> Canned` and `Tubular + Honky -> Canned`; `Boxy + Nasal + Harsh -> Reedy`. Also appears in Region `B` as `Boomy + Boxy -> Bassy`, and in `Vintage`, `Cloudy`, `Veiled`, `Congested`, and `Buried` outside Region C. |
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

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `nasal` |
| Aliases | none |
| Card type | Basic element card |
| Frequency territory | Upper-mid nasal resonance. Practical listening zone: about `1.5-2.2 kHz`; catalog center: `1800 Hz`. It sits near the `2 kHz` ladder point and below `Shouty`. |
| EQ move | Boost: `+4.0 dB` at `1800 Hz`, `Q 1.2`. |
| Boost/cut meaning | This is an upper-mid boost. It pushes voice and lead-instrument resonance forward with a narrow nose-like color. |
| Recipes and evolutions | `Honky + Nasal -> Pinched`; `Boxy + Nasal -> Tubular`; `Nasal + Harsh -> Brassy`; `Boxy + Honky + Nasal -> Canned`; equivalent shortcuts: `Cupped + Nasal -> Canned` and `Tubular + Honky -> Canned`; `Boxy + Nasal + Harsh -> Reedy`. |
| Conflicts | none |
| What it is not | Not `Honky`, which is lower and cup-like around `900 Hz`; not `Shouty`, which is more aggressive and higher around `2600 Hz`; not `Harsh`, which is a sharper upper edge around `4000 Hz`. |
| Difficulty notes | Strongest on voice-heavy material. It may be subtle on dense mixes, so start with exaggerated intensity and listen for the squeezed center of the vocal. |
| Visual identity | A narrow resonant pocket, compressed upper-mid waves, and a small nasal tunnel inside Region C. Individual icon file: `icon/nasal.png`; region context: `icon/region/region-c-resonance-canyons.png`. |

## Cupped

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Cupped` |
| Creature identity | **The Hollow-Hand Herald**: a little enclosure creature that shapes the music like two hands cupped around a sound. |
| Feeling | The sound feels enclosed and projected, with a small hollow chamber around the midrange. |
| Listen for | Vocals, guitars, drums, brass, and anything that starts sounding like it is coming through a cup, tube, or small speaker shell. |

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

## Tubular

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Tubular` |
| Creature identity | **The Hollow Pipe-Sprite**: a boxed little tube creature that pushes the music through a nasal tunnel. |
| Feeling | The sound feels tube-like, enclosed, and narrow, with box color plus a nose-like upper-mid path. |
| Listen for | Vocals or instruments that sound like they are traveling through a short tube, small shell, or resonant pipe. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `tubular` |
| Aliases | tube-like |
| Card type | Combo discovery card |
| Frequency territory | Box enclosure plus nasal upper mids. Ingredient centers: `350 Hz` from `Boxy` and `1800 Hz` from `Nasal`. |
| EQ move | Discovery label only. It expands to `Boxy` boost `+4.0 dB` at `350 Hz`, `Q 1.1`, plus `Nasal` boost `+4.0 dB` at `1800 Hz`, `Q 1.2`. |
| Boost/cut meaning | This is a combined midrange boost recipe. It creates a tube-like color through enclosure and nasal resonance. |
| Recipes and evolutions | `Boxy + Nasal -> Tubular`; `Tubular + Honky -> Canned`. Discovery cards do not add new filters; they expand to ingredient descriptors. |
| Conflicts | none |
| What it is not | Not `Canned`, which includes the full `Honky` layer; not `Cupped`, which is more hand-shaped and honky; not `Pinched`, which lacks the box enclosure. |
| Difficulty notes | Needs playtest validation because it can overlap with `Canned`. Use it as the missing C-region bridge if the tube metaphor reads clearly. |
| Visual identity | A curved hollow tube creature with a softly squared base and pale nasal buzz marks. Individual icon file: `icon/tubular.png`; region context: `icon/region/region-c-resonance-canyons.png`. |

## Brassy

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Brassy` |
| Creature identity | **The Brass-Nose Caller**: a compact Canyons creature whose forward call turns into a tarnished brass bite. |
| Feeling | The sound feels squawky, brassy, and tight-edged, like a voice, horn, or lead tone has gained a hard brass-like bite without becoming fully metallic. |
| Listen for | Vocals, horns, sax, guitars, synth leads, and small speakers that move from plain nasal color into a rough brassy edge. |
| Where to find it | `Resonance Canyons`; craft it from `Nasal + Harsh`. `Squawky` is its alias-language card in the Collection and Language Hall. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `brassy` |
| Aliases | `Squawky` |
| Card type | Combo discovery card |
| Frequency territory | Forward upper-mid color plus lower-treble bite. The useful listening image is a compact brass-like edge riding on top of a focused tone; ingredient centers are `1800 Hz` from `Nasal` and `4000 Hz` from `Harsh`. |
| EQ move | Discovery label only. It expands to `Nasal` boost `+4.0 dB` at `1800 Hz`, `Q 1.2`, plus `Harsh` boost `+4.5 dB` at `4000 Hz`, `Q 1.0`. |
| Boost/cut meaning | This is a mid-to-edge boost recipe. It pushes the tone forward and adds a harder bite above it, but the result should be heard as one brassy/squawky identity rather than two separate labels. |
| Recipes and evolutions | `Nasal + Harsh -> Brassy`; `Brassy + Boxy -> Reedy`. Discovery labels do not add new filters; they expand to ingredient descriptors. |
| Conflicts | `Dull`, because of `Harsh`. |
| What it is not | Not `Metallic`, which is colder and more reflective through `Glassy`; not `Sharp`, which is cleaner and brighter through `Bright`; not `Pinched`, which is squeezed but lacks the hard brassy edge; not `Nasal` alone. |
| Difficulty notes | Good first audition for adding edge inside Region C. Use voice, horn, or sax-like material and listen for the moment the color becomes squawky or brassy rather than merely nose-forward. |
| Visual identity | A compact brassy-nasal creature with tarnished brass color, nasal mid glow, and a hard edge glint. Individual icon file: `icon/brassy.png`; region context: `icon/region/region-c-resonance-canyons.png`. |

## Reedy

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Reedy` |
| Creature identity | **The Dry Reed Pipe**: a boxed Canyons creature that pushes a narrow brassy-nasal tone through a small reed mouth. |
| Feeling | The sound feels pipe-like, dry, boxed, and brassy-edged, like a reed instrument, small speaker, or narrow vocal tone becoming harder and less natural. |
| Listen for | Sax, clarinet-like synths, nasal vocals, guitars, and small speakers that sound like they are traveling through a short boxy reed tube with a dry bite at the exit. |
| Where to find it | `Resonance Canyons`; craft it from `Boxy + Nasal + Harsh`, or think of it as `Brassy + Boxy`. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `reedy` |
| Aliases | none |
| Card type | Big combo discovery card |
| Frequency territory | Box enclosure, forward upper-mid color, and dry lower-treble bite. Ingredient centers are `350 Hz` from `Boxy`, `1800 Hz` from `Nasal`, and `4000 Hz` from `Harsh`; the perceptual target is a small reed-pipe color, not three disconnected boosts. |
| EQ move | Discovery label only. It expands to `Boxy` boost `+4.0 dB` at `350 Hz`, `Q 1.1`, plus `Nasal` boost `+4.0 dB` at `1800 Hz`, `Q 1.2`, plus `Harsh` boost `+4.5 dB` at `4000 Hz`, `Q 1.0`. |
| Boost/cut meaning | This is a stacked mid-to-edge boost recipe. It keeps the Canyons enclosure while adding reed-like forward color and a dry exit edge. |
| Recipes and evolutions | `Boxy + Nasal + Harsh -> Reedy`; equivalent shortcuts: `Tubular + Harsh -> Reedy` or `Brassy + Boxy -> Reedy`. Discovery labels do not add new filters; they expand to ingredient descriptors. |
| Conflicts | `Dull`, because of `Harsh`. |
| What it is not | Not `Tubular`, which has the tube color without the dry edge; not `Canned`, which is more sealed and stacked with `Honky`; not `Brassy`, which lacks the lower box enclosure; not `Tinny`, which loses body through `Thin`. |
| Difficulty notes | Stronger and more specific than `Brassy`. It should be tested on reed-like instruments and small-speaker playback; if the box component disappears, it may collapse back into Brassy or Harsh. |
| Visual identity | A compact dry reed/tube body with nasal airflow and a hard edge glint. Individual icon file: `icon/reedy.png`; region context: `icon/region/region-c-resonance-canyons.png`. |

## Canned

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Canned` |
| Creature identity | **The Tin-Chamber Keeper**: a stacked enclosure creature living inside a small resonant can. |
| Feeling | The sound feels boxed, cupped, and nasal all at once, like the music has been folded into a tiny speaker. |
| Listen for | Phone-speaker color, cheap portable speakers, old-radio mids, and voices that sound trapped inside a small container. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `canned` |
| Aliases | none |
| Card type | Big combo discovery card |
| Frequency territory | Stacked enclosure and mid resonances. Ingredient centers: `350 Hz` from `Boxy`, `900 Hz` from `Honky`, and `1800 Hz` from `Nasal`. |
| EQ move | Discovery label only. It expands to `Boxy` boost `+4.0 dB` at `350 Hz`, `Q 1.1`, plus `Honky` boost `+4.2 dB` at `900 Hz`, `Q 1.15`, plus `Nasal` boost `+4.0 dB` at `1800 Hz`, `Q 1.2`. |
| Boost/cut meaning | This is a combined midrange boost recipe. It stacks enclosure, cup-like projection, and nasal color without adding a separate canned filter. |
| Recipes and evolutions | `Boxy + Honky + Nasal -> Canned`; equivalent shortcuts: `Cupped + Nasal -> Canned`, `Pinched + Boxy -> Canned`, and `Tubular + Honky -> Canned`. No current higher evolution in the catalog. Discovery labels do not add new filters; they expand to ingredients. |
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

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `muddy` |
| Aliases | none |
| Card type | Basic element card |
| Frequency territory | Upper bass / low-mid edge. Practical listening zone: about `100-180 Hz`; catalog center: `125 Hz`. It sits above `Boomy` bloom and below `Warm` body. |
| EQ move | Boost: `+4.5 dB` at `125 Hz`, `Q 0.8`. |
| Boost/cut meaning | This is an upper-bass boost. It adds low-mid cloud and masking rather than clean bass impact. |
| Recipes and evolutions | `Boomy + Muddy -> Bloated`; `Muddy + Dull -> Muffled`; `Muddy + Boxy -> Cloudy`; `Boomy + Muddy + Dull -> Woolly`; `Muddy + Boxy + Dull -> Veiled`; `Muddy + Boxy + Honky + Dull -> Congested`; `Boomy + Muddy + Boxy + Honky + Dull -> Buried`. |
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

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `dull` |
| Aliases | `Dark` |
| Card type | Basic element card |
| Frequency territory | Broad detail and openness band. Practical listening zone: about `4-10 kHz`; catalog center: `6500 Hz`. It darkens the detail band below `Bright` and `Airy`. |
| EQ move | Cut: `-5.0 dB` at `6500 Hz`, `Q 0.55`. |
| Boost/cut meaning | This is a high-frequency cut. It reduces clarity and openness rather than adding low-end mud directly. |
| Recipes and evolutions | `Muddy + Dull -> Muffled`; `Boomy + Muddy + Dull -> Woolly`; `Muddy + Boxy + Dull -> Veiled`; equivalent shortcut: `Cloudy + Dull -> Veiled`; `Muddy + Boxy + Honky + Dull -> Congested`; `Boomy + Muddy + Boxy + Honky + Dull -> Buried`. Also supports `Mellow`, `Vintage`, `Distant`, and `Faded` outside Region D. |
| Conflicts | `Bright`, `Airy`, `Harsh`, `Glassy`, and `Sibilant`, because those add upper-frequency energy while `Dull` removes broad detail. |
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
| Conflicts | `Thin`, because of `Muddy`; `Bright`, `Airy`, `Harsh`, `Glassy`, and `Sibilant`, because of `Dull`. |
| What it is not | Not just `Dull`, which removes top detail without adding mud; not just `Muddy`, which clouds the low area without cutting the top; not `Veiled`, which adds `Boxy`. |
| Difficulty notes | A strong early discovery because the combined effect is easier to hear than either ingredient alone. Listen for both cover and cloud. |
| Visual identity | A covered waveform, dimmed treble sparks, and a muddy blanket shape in Region D. Individual icon file: `icon/muffled.png`; region context: `icon/region/region-d-masking-mire.png`. |

## Cloudy

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Cloudy` |
| Creature identity | **The Boxed Fog**: a low-mid cloud creature trapped inside a small resonant frame. |
| Feeling | The sound feels cloudy, boxed, and hard to see through, but not fully darkened yet. |
| Listen for | Low-mid fog around vocals and instruments, with an enclosed cabinet feel that makes the mix less clear. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `cloudy` |
| Aliases | clouded |
| Card type | Combo discovery card |
| Frequency territory | Upper-bass cloud plus low-mid enclosure. Ingredient centers: `125 Hz` from `Muddy` and `350 Hz` from `Boxy`. |
| EQ move | Discovery label only. It expands to `Muddy` boost `+4.5 dB` at `125 Hz`, `Q 0.8`, plus `Boxy` boost `+4.0 dB` at `350 Hz`, `Q 1.1`. |
| Boost/cut meaning | This is a low/low-mid boost recipe. It clouds separation through mud and enclosure without directly cutting the top. |
| Recipes and evolutions | `Muddy + Boxy -> Cloudy`; `Cloudy + Dull -> Veiled`; `Cloudy + Honky + Dull -> Congested`. Discovery cards do not add new filters; they expand to ingredient descriptors. |
| Conflicts | `Thin`, because `Muddy` opposes bass/body reduction. |
| What it is not | Not `Muffled`, which is muddy plus dull; not `Veiled`, which adds top-detail loss; not just `Muddy`, because it also has box enclosure. |
| Difficulty notes | This bridge helps teach that cloudiness can come from low-mid buildup before the top is actually darkened. |
| Visual identity | Olive-brown fog boxed inside a soft frame, with dim amber glints and trapped low-mid waves. Individual icon file: `icon/cloudy.png`; region context: `icon/region/region-d-masking-mire.png`. |

## Woolly

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Woolly` |
| Creature identity | **The Heavy Fleece**: a thick low-end creature covered in soft mud and darkened fur. |
| Feeling | The sound feels thick, fuzzy, and overcovered, with heavy lows and weak detail on top. |
| Listen for | Bass that feels soft around the edges, drums losing snap, and a mix that feels padded instead of clear. |

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
| Conflicts | `Thin`, because of `Boomy` and `Muddy`; `Bright`, `Airy`, `Harsh`, `Glassy`, and `Sibilant`, because of `Dull`. |
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

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `veiled` |
| Aliases | none |
| Card type | Big combo discovery card |
| Frequency territory | Low-mid clutter plus reduced clarity. Ingredient centers: `125 Hz` from `Muddy`, `350 Hz` from `Boxy`, and `6500 Hz` from `Dull`. |
| EQ move | Discovery label only. It expands to `Muddy` boost `+4.5 dB` at `125 Hz`, `Q 0.8`, plus `Boxy` boost `+4.0 dB` at `350 Hz`, `Q 1.1`, plus `Dull` cut `-5.0 dB` at `6500 Hz`, `Q 0.55`. |
| Boost/cut meaning | This is a masking recipe with low/low-mid boosts and a top-detail cut. It covers clarity through its ingredient descriptors. |
| Recipes and evolutions | `Muddy + Boxy + Dull -> Veiled`; equivalent shortcuts: `Muffled + Boxy -> Veiled` and `Cloudy + Dull -> Veiled`; `Veiled + Honky -> Congested`; `Veiled + Boomy + Honky -> Buried`. Discovery labels do not add new filters; this card expands to its ingredient descriptors. |
| Conflicts | `Thin`, because of `Muddy`; `Bright`, `Airy`, `Harsh`, `Glassy`, and `Sibilant`, because of `Dull`. |
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

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `congested` |
| Aliases | none |
| Card type | Mega combo discovery card |
| Frequency territory | Multiple masking regions with reduced top clarity. Ingredient centers: `125 Hz` from `Muddy`, `350 Hz` from `Boxy`, `900 Hz` from `Honky`, and `6500 Hz` from `Dull`. |
| EQ move | Discovery label only. It expands to `Muddy` boost `+4.5 dB` at `125 Hz`, `Q 0.8`, plus `Boxy` boost `+4.0 dB` at `350 Hz`, `Q 1.1`, plus `Honky` boost `+4.2 dB` at `900 Hz`, `Q 1.15`, plus `Dull` cut `-5.0 dB` at `6500 Hz`, `Q 0.55`. |
| Boost/cut meaning | This is a multi-band masking recipe. It stacks low-mid and mid boosts while cutting detail through its ingredient descriptors. |
| Recipes and evolutions | `Muddy + Boxy + Honky + Dull -> Congested`; equivalent shortcuts: `Veiled + Honky -> Congested`, `Muffled + Cupped -> Congested`, or `Cloudy + Honky + Dull -> Congested`; `Congested + Boomy -> Buried`. Discovery labels do not add new filters; this card expands to its ingredient descriptors. |
| Conflicts | `Thin`, because of `Muddy`; `Bright`, `Airy`, `Harsh`, `Glassy`, and `Sibilant`, because of `Dull`. |
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
| Conflicts | `Thin`, because of `Boomy` and `Muddy`; `Bright`, `Airy`, `Harsh`, `Glassy`, and `Sibilant`, because of `Dull`. |
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

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `thin` |
| Aliases | `Lacking`, `Weak` |
| Card type | Basic element card |
| Frequency territory | Bass/body foundation loss. Practical listening zone: about `80-140 Hz`; catalog center: `100 Hz`. It cuts the low support that makes sounds feel filled in. |
| EQ move | Cut: `-5.0 dB` at `100 Hz`, `Q 0.7`. |
| Boost/cut meaning | This is a low-frequency cut. It removes body and foundation rather than adding treble edge directly. |
| Recipes and evolutions | `Thin + Harsh -> Tinny`; `Thin + Sibilant -> Spitty`; `Thin + Bright -> Lean`; `Thin + Hollow -> Empty`; `Thin + Dull -> Faded`; `Thin + Bright + Sibilant -> Brittle`; `Thin + Hollow + Airy -> Cold`; `Thin + Hollow + Harsh + Glassy -> Plasticky`; `Thin + Hollow + Shouty + Harsh + Sibilant -> Piercing`. |
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

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `harsh` |
| Aliases | none |
| Card type | Basic element card |
| Frequency territory | Upper mids / lower treble edge. Practical listening zone: about `3-5 kHz`; catalog center: `4000 Hz`. |
| EQ move | Boost: `+4.5 dB` at `4000 Hz`, `Q 1.0`. |
| Boost/cut meaning | This is an upper-mid and lower-treble boost. It adds edge, bite, and fatigue rather than adding open top-end air. |
| Recipes and evolutions | `Thin + Harsh -> Tinny`; `Bright + Harsh -> Sharp`; `Nasal + Harsh -> Brassy`; `Harsh + Glassy -> Metallic`; `Shouty + Harsh -> Aggressive`; `Boxy + Nasal + Harsh -> Reedy`; `Shouty + Harsh + Sibilant -> Fatiguing`; `Thin + Hollow + Harsh + Glassy -> Plasticky`; `Thin + Hollow + Shouty + Harsh + Sibilant -> Piercing`. |
| Conflicts | `Dull`, because `Dull` removes high-frequency detail while `Harsh` adds painful edge. |
| What it is not | Not `Glassy`, which is higher and more reflective around `6300 Hz`; not `Sibilant`, which is narrower and hissier around `8000 Hz`; not `Bright`, which is broader and shinier around `10000 Hz`. |
| Difficulty notes | Can become tiring quickly at high intensity, so short A/B rounds are better than long listening. It is easier on vocals, guitars, snares, and brass. |
| Visual identity | Jagged silver edges, tight pressure beams, and scratch-like waveform marks inside Region E's crystalline treble gate. Individual icon file: `icon/harsh.png`; region context: `icon/region/region-e-glassedge-spires.png`. |

## Sibilant

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Sibilant` |
| Creature identity | **The Hiss-Snapper**: a quick treble creature that leaps out whenever speech or cymbals make a sharp hiss. |
| Feeling | The sound gets spitty and biting at the edges, especially on little high-frequency details. |
| Listen for | Vocal S and T sounds, cymbal ticks, hi-hats, snare fizz, and bright consonants that jump forward. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `sibilant` |
| Aliases | `Shrill` |
| Card type | Basic element card |
| Frequency territory | Sibilance / narrow treble bite. Practical listening zone: about `7-9 kHz`; catalog center: `8000 Hz`. |
| EQ move | Boost: `+5.0 dB` at `8000 Hz`, `Q 1.5`. |
| Boost/cut meaning | This is a narrow high-frequency boost. It makes consonants and cymbal edges jump forward rather than adding broad shine. |
| Recipes and evolutions | `Thin + Sibilant -> Spitty`; `Thin + Bright + Sibilant -> Brittle`; `Shouty + Harsh + Sibilant -> Fatiguing`; `Thin + Hollow + Shouty + Harsh + Sibilant -> Piercing`. |
| Conflicts | `Dull`, because `Dull` reduces treble detail. |
| What it is not | Not `Harsh`, which is lower and rougher around `4000 Hz`; not `Glassy`, which is a hard reflective sheen around `6300 Hz`; not `Bright`, which is broader and more open. `Shrill` is alias vocabulary for this same painful sibilance lane, not a separate basic card. |
| Difficulty notes | Best learned with vocal material and cymbals. It can be confused with normal clarity, so listen for the hiss and consonant bite becoming too forward. |
| Visual identity | Thin hiss trails, quick white-blue sparks, and needle-like cymbal flashes. Individual icon file: `icon/sibilant.png`; region context: `icon/region/region-e-glassedge-spires.png`. |

## Glassy

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Glassy` |
| Creature identity | **The Reflective Pane**: a smooth glass-like treble creature that adds a cold hard reflection to the music. |
| Feeling | The sound feels polished, hard, glazed, and a little artificial, like a reflective surface has been placed over the upper edge. |
| Listen for | Cymbals, vocals, guitars, piano attacks, and synthetic tones taking on a smooth hard sheen. The cue is not hiss or air; it is a reflective edge that makes details feel glass-coated. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `glassy` |
| Aliases | none |
| Card type | Basic element card |
| Frequency territory | Hard reflective upper treble. Practical listening zone: about `5.5-7 kHz`; catalog center: `6300 Hz`. |
| EQ move | Boost: `+4.5 dB` at `6300 Hz`, `Q 1.15`. |
| Boost/cut meaning | This is a focused upper-treble boost. It emphasizes the hard reflective part of attacks and upper harmonics rather than broad brightness, consonant hiss, or scratchy lower-treble edge. |
| Recipes and evolutions | `Harsh + Glassy -> Metallic`; `Bright + Glassy -> Crisp`; `Thin + Hollow + Harsh + Glassy -> Plasticky`. |
| Conflicts | `Dull`, because `Dull` removes the detail band where `Glassy` adds reflective sheen. |
| What it is not | Not `Harsh`, which is lower and scratchier around `4000 Hz`; not `Sibilant`, which is narrower and more consonant-focused around `8000 Hz`; not `Bright`, which is broader and more open around `10000 Hz`; not `Metallic`, which needs `Harsh + Glassy` together. |
| Difficulty notes | Compare against `Harsh`, `Sibilant`, and `Bright`. `Glassy` should feel like a hard reflective coating: cleaner than scrape, less speech-specific than hiss, and colder than ordinary shine. |
| Visual identity | An intact transparent pane/lens sprite with cold cyan-white rim glints, faint internal refraction bands, tiny mirror flashes, and no shattered glass danger. Individual icon file: `icon/glassy.png`; region context: `icon/region/region-e-glassedge-spires.png`. |

## Shouty

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Shouty` |
| Creature identity | **The Forward-Pusher**: a loud presence creature that leans into the music and shoves voices toward your face. |
| Feeling | The sound feels pushy, loud, and insistent, even when the volume has not changed. |
| Listen for | Vocals stepping too far forward, guitars barking, snares getting hard, and midrange sounds feeling like they are shouting. |

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

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `tinny` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Missing body plus upper edge. Ingredient centers: `100 Hz` from `Thin` and `4000 Hz` from `Harsh`. |
| EQ move | Discovery label only. It expands to `Thin` cut `-5.0 dB` at `100 Hz`, `Q 0.7`, plus `Harsh` boost `+4.5 dB` at `4000 Hz`, `Q 1.0`. |
| Boost/cut meaning | This is a cut-plus-boost recipe. It removes body while adding hard upper edge; the discovery card adds no new filter. |
| Recipes and evolutions | `Thin + Harsh -> Tinny`; `Tinny + Hollow + Glassy -> Plasticky`. |
| Conflicts | Inherits ingredient conflicts: `Dull` opposes `Harsh`; `Rumble`, `Thump`, `Boomy`, `Punchy`, `Muddy`, and `Warm` oppose `Thin`. |
| What it is not | Not just `Harsh`, which can still have body; not `Spitty`, which centers on consonant bite; not `Metallic`, which needs both `Harsh` and `Glassy`. |
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

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `spitty` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Missing body plus narrow sibilance. Ingredient centers: `100 Hz` from `Thin` and `8000 Hz` from `Sibilant`. |
| EQ move | Discovery label only. It expands to `Thin` cut `-5.0 dB` at `100 Hz`, `Q 0.7`, plus `Sibilant` boost `+5.0 dB` at `8000 Hz`, `Q 1.5`. |
| Boost/cut meaning | This is a cut-plus-boost recipe. It removes foundation while exposing consonants and cymbal bite; the discovery card adds no new filter. |
| Recipes and evolutions | `Thin + Sibilant -> Spitty`; `Spitty + Bright -> Brittle`; `Aggressive + Spitty + Hollow -> Piercing`. |
| Conflicts | Inherits ingredient conflicts: `Dull` opposes `Sibilant`; `Rumble`, `Thump`, `Boomy`, `Punchy`, `Muddy`, and `Warm` oppose `Thin`. |
| What it is not | Not just `Sibilant`, which may still have body; not `Crisp`, which pairs shine with glassy definition; not `Tinny`, which uses lower harsh edge instead of narrow consonant bite. |
| Difficulty notes | Best learned with vocal clips. It can sound like bad recording quality, so compare against `Sibilant` alone to hear the missing body. |
| Visual identity | A thin creature flicking bright hiss droplets from a small empty body. Individual icon file: `icon/spitty.png`; region context: `icon/region/region-e-glassedge-spires.png`. |

## Lean

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Lean` |
| Creature identity | **The Exposed Reed**: a slim clear creature with its lower shadow shaved away and a bright glint on top. |
| Feeling | The sound feels light, exposed, and analytical: clear at the top, but missing body underneath. |
| Listen for | Vocals or guitars that stay clear but lose warmth, bass support that thins out, and bright details that feel more exposed. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `lean` |
| Aliases | lean tone |
| Card type | Combo discovery card |
| Frequency territory | Missing low foundation plus exposed top. Ingredient centers: `100 Hz` from `Thin` and `10000 Hz` from `Bright`. |
| EQ move | Discovery label only. It expands to `Thin` cut `-5.0 dB` at `100 Hz`, `Q 0.7`, plus `Bright` boost `+3.5 dB` at `10000 Hz`, `Q 0.65`. |
| Boost/cut meaning | This is a cut-plus-boost recipe. It removes foundation while exposing top-end clarity through its ingredient descriptors. |
| Recipes and evolutions | `Thin + Bright -> Lean`; `Lean + Sibilant -> Brittle`. `Lean` no longer evolves into `Cold`, because `Cold` now uses `Airy` instead of `Bright`. Discovery cards do not add new filters; they expand to ingredient descriptors. |
| Conflicts | `Rumble`, `Thump`, `Boomy`, `Punchy`, `Muddy`, and `Warm`, because of `Thin`; `Dull`, because it opposes `Bright`. |
| What it is not | Not just `Thin`, which lacks top shine; not `Brittle`, which adds `Sibilant`; not `Cold`, which uses `Hollow + Airy`; not `Sharp`, which uses hard `Harsh` edge. |
| Difficulty notes | A common audio-rating word. Teach it with vocals and acoustic instruments where missing body plus exposed top is easy to separate from simple brightness. |
| Visual identity | A slim pale-blue sound sprite with a missing low shadow and one clean treble glint. Individual icon file: `icon/lean.png`; region context: `icon/region/region-e-glassedge-spires.png`. |

## Metallic

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Metallic` |
| Creature identity | **The Chrome Stinger**: a shiny hard-edged creature whose treble rings like struck metal. |
| Feeling | The sound feels hard, cold, and artificial, with both scrape and sharp high bite. |
| Listen for | Ringy cymbals, hard guitar edge, cold vocal bite, metallic percussion, and treble that feels shiny but uncomfortable. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `metallic` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Upper edge plus reflective hard sheen. Ingredient centers: `4000 Hz` from `Harsh` and `6300 Hz` from `Glassy`. |
| EQ move | Discovery label only. It expands to `Harsh` boost `+4.5 dB` at `4000 Hz`, `Q 1.0`, plus `Glassy` boost `+4.5 dB` at `6300 Hz`, `Q 1.15`. |
| Boost/cut meaning | This is a combined treble boost recipe. It adds edge and reflective hard sheen through ingredients; the discovery card adds no new filter. |
| Recipes and evolutions | `Harsh + Glassy -> Metallic`; `Metallic + Thin + Hollow -> Plasticky`. |
| Conflicts | `Dull`, because it opposes both treble ingredients. |
| What it is not | Not `Harsh` alone, which lacks reflective sheen; not `Glassy` alone, which lacks lower scrape; not `Tinny`, which needs missing body from `Thin`. |
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

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `brittle` |
| Aliases | none |
| Card type | Big combo discovery card |
| Frequency territory | Missing body plus exposed high frequencies. Ingredient centers: `100 Hz` from `Thin`, `10000 Hz` from `Bright`, and `8000 Hz` from `Sibilant`. |
| EQ move | Discovery label only. It expands to `Thin` cut `-5.0 dB` at `100 Hz`, `Q 0.7`, plus `Bright` boost `+3.5 dB` at `10000 Hz`, `Q 0.65`, plus `Sibilant` boost `+5.0 dB` at `8000 Hz`, `Q 1.5`. |
| Boost/cut meaning | This is a cut-plus-boost recipe. It removes body while exposing treble shine and bite; the discovery card adds no new filter. |
| Recipes and evolutions | `Thin + Bright + Sibilant -> Brittle`; equivalent shortcuts: `Spitty + Bright -> Brittle` and `Lean + Sibilant -> Brittle`. |
| Conflicts | Inherits ingredient conflicts: `Dull` opposes `Bright` and `Sibilant`; `Rumble`, `Thump`, `Boomy`, `Punchy`, `Muddy`, and `Warm` oppose `Thin`. |
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

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `fatiguing` |
| Aliases | none |
| Card type | Big combo discovery card |
| Frequency territory | Forward presence plus harsh and sibilant highs. Ingredient centers: `2600 Hz` from `Shouty`, `4000 Hz` from `Harsh`, and `8000 Hz` from `Sibilant`. |
| EQ move | Discovery label only. It expands to `Shouty` boost `+4.8 dB` at `2600 Hz`, `Q 1.05`, plus `Harsh` boost `+4.5 dB` at `4000 Hz`, `Q 1.0`, plus `Sibilant` boost `+5.0 dB` at `8000 Hz`, `Q 1.5`. |
| Boost/cut meaning | This is a stacked upper-mid and treble boost recipe. It adds pressure, edge, and bite through ingredients; the discovery card adds no new filter. |
| Recipes and evolutions | `Shouty + Harsh + Sibilant -> Fatiguing`; equivalent shortcut: `Aggressive + Sibilant -> Fatiguing`; `Fatiguing + Thin + Hollow -> Piercing`. |
| Conflicts | `Dull`, because it opposes `Harsh` and `Sibilant`. |
| What it is not | Not `Aggressive`, which lacks sibilant bite; not `Metallic`, which uses reflective `Glassy` instead of `Sibilant`; not `Piercing`, which adds missing body and hollow center. |
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

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `plasticky` |
| Aliases | none |
| Card type | Mega combo discovery card |
| Frequency territory | Low body loss, scooped center, harsh edge, and sibilant bite. Ingredient centers: `100 Hz` from `Thin`, `600 Hz` from `Hollow`, `4000 Hz` from `Harsh`, and `8000 Hz` from `Sibilant`. |
| EQ move | Discovery label only. It expands to `Thin` cut `-5.0 dB` at `100 Hz`, `Q 0.7`, plus `Hollow` cut `-5.0 dB` at `600 Hz`, `Q 0.85`, plus `Harsh` boost `+4.5 dB` at `4000 Hz`, `Q 1.0`, plus `Sibilant` boost `+5.0 dB` at `8000 Hz`, `Q 1.5`. |
| Boost/cut meaning | This is a cut-plus-boost recipe. It removes body and center while adding artificial upper bite; the discovery card adds no new filter. |
| Recipes and evolutions | `Thin + Hollow + Harsh + Glassy -> Plasticky`; equivalent shortcuts: `Tinny + Hollow + Glassy` or `Metallic + Thin + Hollow`. |
| Conflicts | Inherits ingredient conflicts: `Dull` opposes `Harsh` and `Glassy`; `Warm` opposes `Hollow`; `Rumble`, `Thump`, `Boomy`, `Punchy`, `Muddy`, and `Warm` oppose `Thin`. |
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

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `piercing` |
| Aliases | none |
| Card type | Mega combo discovery card |
| Frequency territory | Body loss plus stacked upper-mid and treble emphasis. Ingredient centers: `100 Hz` from `Thin`, `600 Hz` from `Hollow`, `2600 Hz` from `Shouty`, `4000 Hz` from `Harsh`, and `8000 Hz` from `Sibilant`. |
| EQ move | Discovery label only. It expands to `Thin` cut `-5.0 dB` at `100 Hz`, `Q 0.7`, plus `Hollow` cut `-5.0 dB` at `600 Hz`, `Q 0.85`, plus `Shouty` boost `+4.8 dB` at `2600 Hz`, `Q 1.05`, plus `Harsh` boost `+4.5 dB` at `4000 Hz`, `Q 1.0`, plus `Sibilant` boost `+5.0 dB` at `8000 Hz`, `Q 1.5`. |
| Boost/cut meaning | This is a five-ingredient cut-plus-boost recipe. It removes body and center while stacking forward presence, harsh edge, and sibilant bite; the discovery card adds no new filter. |
| Recipes and evolutions | `Thin + Hollow + Shouty + Harsh + Sibilant -> Piercing`; equivalent shortcuts: `Fatiguing + Thin + Hollow` or `Aggressive + Spitty + Hollow`. |
| Conflicts | Inherits ingredient conflicts: `Dull` opposes `Harsh` and `Sibilant`; `Warm` opposes `Hollow` and `Thin`; `Rumble`, `Thump`, `Boomy`, `Punchy`, and `Muddy` oppose `Thin`. |
| What it is not | Not `Shrill`, which is alias vocabulary for severe sibilance; not `Fatiguing`, which still has more body; not `Plasticky`, which uses `Glassy` artificial sheen instead of the `Sibilant` bite required here. |
| Difficulty notes | This is a late Region E apex card. It should be obvious at high intensity, but uncomfortable, so use short comparisons and clear warnings in lesson pacing. |
| Visual identity | A narrow treble lance, jagged pressure rays, hollow center shadow, and sharp white-blue warning glow. Individual icon file: `icon/piercing.png`; region context: `icon/region/region-e-glassedge-spires.png`. |

## Sharp

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Sharp` |
| Creature identity | **The Clean Edge**: a precise treble creature with a bright polished corner and a harder line than ordinary shine. |
| Feeling | The sound feels clearer and more edged, like details have a clean hard outline that can start to feel tense. |
| Listen for | Vocal bite with extra shine, snare crack, picked guitar edges, cymbal highlights, and details that feel defined but not hissy. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `sharp` |
| Aliases | glary |
| Card type | Combo discovery card |
| Frequency territory | Broad top shine plus hard upper-mid / lower-treble edge. Ingredient centers: `10000 Hz` from `Bright` and `4000 Hz` from `Harsh`. |
| EQ move | Discovery label only. It expands to `Bright` boost `+3.5 dB` at `10000 Hz`, `Q 0.65`, plus `Harsh` boost `+4.5 dB` at `4000 Hz`, `Q 1.0`. |
| Boost/cut meaning | This is a combined treble boost recipe. It adds clear top-end shine and a harder edge through its ingredient descriptors; the discovery card adds no hidden extra filter. |
| Recipes and evolutions | `Bright + Harsh -> Sharp`. Discovery labels do not add new filters; they expand to ingredient descriptors. |
| Conflicts | `Dull`, because it opposes both high-frequency clarity and hard treble edge. |
| What it is not | Not `Bright`, which is shinier and less tense; not `Harsh`, which lacks the open top shine; not `Crisp`, which uses reflective `Glassy`; not `Piercing`, which is more severe. |
| Difficulty notes | Teach after `Bright` and `Harsh` are familiar. It should be compared against `Crisp` so players hear clean hard edge versus narrow consonant bite. |
| Visual identity | A precise folded cyan-white edge sprite with one bright clean corner, tight cyan glints, and short high-frequency tick marks inside Region E's crystalline treble gate. Individual icon file: `icon/sharp.png`; region context: `icon/region/region-e-glassedge-spires.png`. |

## Crisp

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Crisp` |
| Creature identity | **The Glass-Spark**: a shiny treble creature that clicks, flashes, and makes tiny details feel freshly polished. |
| Feeling | The sound feels cleaner, sharper, and more detailed, with sparkle plus hard polished definition at the edge. |
| Listen for | Cymbal shimmer, acoustic pick noise, snare snap, small percussion, and details that become easier to spot without turning into vocal hiss. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `crisp` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Broad top shine plus reflective hard definition. Ingredient centers: `10000 Hz` from `Bright` and `6300 Hz` from `Glassy`. |
| EQ move | Discovery label only. It expands to `Bright` boost `+3.5 dB` at `10000 Hz`, `Q 0.65`, plus `Glassy` boost `+4.5 dB` at `6300 Hz`, `Q 1.15`. |
| Boost/cut meaning | This is a combined treble boost recipe. It adds broad shine and hard polished definition through its ingredient descriptors. |
| Recipes and evolutions | `Bright + Glassy -> Crisp`. Discovery cards do not add new filters; they expand to ingredient descriptors. |
| Conflicts | `Dull`, because it opposes both top-end ingredients. |
| What it is not | Not just `Bright`, which lacks the hard reflective edge; not just `Glassy`, which lacks broad top shine; not `Sharp`, which uses rougher `Harsh` edge. |
| Difficulty notes | Easier than many single treble cards once unlocked, because the combined top-end change is broader. It still depends on material with cymbals, vocals, or bright percussion. |
| Visual identity | Polished glass sparks, small bright clicks, and crystalline treble flashes in Glassedge Spires. Individual icon file: `icon/crisp.png`; region context: `icon/region/region-e-glassedge-spires.png`. |

## Scooped

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Scooped` |
| Creature identity | **The Air-Hollow Bowl**: a center-scooped creature with a quiet middle and a pale open-air rim. |
| Feeling | The sound feels hollowed in the middle but open above, like the body has been carved out while air remains around the top. |
| Listen for | Vocals losing center body while cymbal trails or room air remain lifted, and mids stepping back without the whole sound becoming dull. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `scooped` |
| Aliases | scooped mids |
| Card type | Combo discovery card |
| Frequency territory | Recessed center with exposed air. Ingredient centers: `600 Hz` from `Hollow` and `14000 Hz` from `Airy`. |
| EQ move | Discovery label only. It expands to `Hollow` cut `-5.0 dB` at `600 Hz`, `Q 0.85`, plus `Airy` boost `+4.0 dB` at `14000 Hz`, `Q 0.7`. |
| Boost/cut meaning | This is a cut-plus-boost recipe. It removes mid body while exposing high-air extension through its ingredient descriptors. |
| Recipes and evolutions | `Hollow + Airy -> Scooped`; `Scooped + Thin -> Cold`. Discovery cards do not add new filters; they expand to ingredient descriptors. |
| Conflicts | `Warm`, because it opposes `Hollow`; `Dull`, because it opposes `Airy`. |
| What it is not | Not just `Hollow`, which lacks the airy rim; not `Distant`, which uses `Dull`; not `Cold`, which also loses low foundation. |
| Difficulty notes | A useful bridge for rating headphones. Teach it by asking whether the middle stepped back while the top stayed open and airy. |
| Visual identity | A blue-gray bowl-valley with a quiet center and pale cyan air-rim light. Individual icon file: `icon/scooped.png`; region context: `icon/region/region-g-frosthollow-expanse.png`. |

## Hollow

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Hollow` |
| Creature identity | **The Empty-Shell**: a scooped-out midrange creature with a quiet space where the music's body should be. |
| Feeling | The sound feels empty in the middle, like voices and instruments have lost their chest and center. |
| Listen for | Vocals that feel less solid, guitars with a missing body, snare tone that loses its middle, and mixes that seem to echo around a hole. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `hollow` |
| Aliases | none |
| Card type | Basic element card |
| Frequency territory | Low-mid / center-body scoop. Practical listening zone: about `400-800 Hz`; catalog center: `600 Hz`. It sits near the `500 Hz` ladder point where cuts can read as cold, hollow, or muffled. |
| EQ move | Cut: `-5.0 dB` at `600 Hz`, `Q 0.85`. |
| Boost/cut meaning | This is a midrange cut. It removes body from the center of the sound rather than adding brightness or bass. |
| Recipes and evolutions | `Hollow + Dull -> Distant`; `Thin + Hollow -> Empty`; `Hollow + Airy -> Scooped`; `Thin + Hollow + Airy -> Cold`; equivalent shortcuts: `Scooped + Thin -> Cold` and `Empty + Airy -> Cold`; `Thin + Hollow + Harsh + Glassy -> Plasticky`; `Thin + Hollow + Shouty + Harsh + Sibilant -> Piercing`. |
| Conflicts | `Warm`, because `Warm` adds low-mid body while `Hollow` removes the center/body area. |
| What it is not | Not `Thin`, which removes bass foundation around `100 Hz`; not `Dull`, which removes high detail around `6500 Hz`; not `Boxy`, which adds enclosed midrange instead of scooping it out. |
| Difficulty notes | Best learned on vocals, guitars, piano, and snare body. It can be mistaken for lower volume, so listen for the missing center rather than overall loudness. |
| Visual identity | A scooped middle chamber, empty shell, or centerless creature with inward pale waveform lines. Individual icon file: `icon/hollow.png`; region context: `icon/region/region-g-frosthollow-expanse.png`. |

## Empty

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Empty` |
| Creature identity | **The Hollow Reed**: a light frost creature with its low shadow gone and a quiet chamber where its middle should be. |
| Feeling | The sound feels underfilled and weightless, like both the floor and the center have been scooped away. |
| Listen for | Voices losing chest and support, guitars feeling papery, snares losing body, and the whole mix sounding present but strangely unoccupied. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `empty` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Missing low foundation plus scooped center. Ingredient centers: `100 Hz` from `Thin` and `600 Hz` from `Hollow`. |
| EQ move | Discovery label only. It expands to `Thin` cut `-5.0 dB` at `100 Hz`, `Q 0.7`, plus `Hollow` cut `-5.0 dB` at `600 Hz`, `Q 0.85`. |
| Boost/cut meaning | This is a combined cut recipe. It removes low support and center body, leaving the sound light, unsupported, and unfilled. |
| Recipes and evolutions | `Thin + Hollow -> Empty`; `Empty + Airy -> Cold`. Discovery cards do not add new filters; they expand to ingredient descriptors. |
| Conflicts | `Rumble`, `Thump`, `Boomy`, `Punchy`, `Muddy`, and `Warm`, because they oppose the missing foundation from `Thin`; `Warm`, because it also opposes the center scoop from `Hollow`. |
| What it is not | Not just `Thin`, which keeps more middle body; not just `Hollow`, which keeps more low foundation; not `Cold`, which adds exposed `Airy` top; not `Distant`, which uses `Dull` instead of bass/body loss. |
| Difficulty notes | Easier on vocals, acoustic instruments, and drums with clear body. It can be mistaken for quietness or small-speaker playback, so compare against `Thin` and `Hollow` separately. |
| Visual identity | A pale centerless reed or shell with no low shadow, an open middle chamber, and sparse Frosthollow negative space. Icon prompt guidance: keep it quiet and airy rather than cracked or shiny; emphasize absence, thin low support, and hollow center. Individual icon file: `icon/empty.png`; region context: `icon/region/region-g-frosthollow-expanse.png`. |

## Distant

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Distant` |
| Creature identity | **The Far-Door Echo**: a small pale sound creature heard from the end of a cold hallway. |
| Feeling | The music moves away from you. The center feels scooped out and the fine detail fades into the background. |
| Listen for | Vocals that step back, instruments that lose closeness, cymbals with less detail, and the whole mix feeling farther away. |

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
| Conflicts | `Warm`, because it opposes `Hollow`; `Bright`, `Airy`, `Harsh`, `Glassy`, and `Sibilant`, because they oppose `Dull`. |
| What it is not | Not just `Hollow`, because it also loses top detail; not just `Dull`, because it also loses center body; not `Cold`, which keeps exposed air. |
| Difficulty notes | Easier after the player has learned `Hollow` and `Dull` separately. Listen for distance and reduced closeness, not just darkness. |
| Visual identity | A small waveform doorway far away inside a wide empty blue-gray basin. Individual icon file: `icon/distant.png`; region context: `icon/region/region-g-frosthollow-expanse.png`. |

## Faded

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Faded` |
| Creature identity | **The Washed Thread**: a thin dim creature whose body and sparkle have both been worn down by the cold. |
| Feeling | The sound feels pale, weak, and worn away. It has less body underneath and less detail on top. |
| Listen for | Vocals that sound smaller and less clear, cymbals losing shimmer, guitars losing both weight and pick detail, and mixes that feel washed out rather than simply dark. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `faded` |
| Aliases | none |
| Card type | Combo discovery card |
| Frequency territory | Missing low foundation plus reduced top detail. Ingredient centers: `100 Hz` from `Thin` and `6500 Hz` from `Dull`. |
| EQ move | Discovery label only. It expands to `Thin` cut `-5.0 dB` at `100 Hz`, `Q 0.7`, plus `Dull` cut `-5.0 dB` at `6500 Hz`, `Q 0.55`. |
| Boost/cut meaning | This is a combined cut recipe. It removes body and high-frequency detail, making the sound feel pale and worn down rather than distant through a hollow center. |
| Recipes and evolutions | `Thin + Dull -> Faded`. It is emotionally related to `Distant` and `Empty` in Region G, but it does not currently evolve into another named discovery. Discovery cards do not add new filters; they expand to ingredient descriptors. |
| Conflicts | `Rumble`, `Thump`, `Boomy`, `Punchy`, `Muddy`, and `Warm`, because they oppose `Thin`; `Bright`, `Airy`, `Harsh`, `Glassy`, and `Sibilant`, because they oppose `Dull`. |
| What it is not | Not just `Thin`, which can still have top detail; not just `Dull`, which can still have body; not `Distant`, which adds `Hollow` center loss; not `Cold`, which keeps exposed air. |
| Difficulty notes | Best taught on full-range material with both bass/body and cymbal or vocal detail. It can sound like lower fidelity, so ask players to notice the paired loss of support and sparkle. |
| Visual identity | A washed-out pale waveform thread with a missing low shadow and dimmed high sparks dissolving into Frosthollow haze. Icon prompt guidance: use soft desaturated blue-gray values, erased edges, and fading treble specks; avoid shiny frost or strong distance-door imagery. Individual icon file: `icon/faded.png`; region context: `icon/region/region-g-frosthollow-expanse.png`. |

## Cold

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Cold` |
| Creature identity | **The Frost-Shell**: a lean hollow creature with no warm body, only pale air over an empty middle. |
| Feeling | The sound feels cool, detached, and underfed. The body is missing, but the top still feels open and exposed. |
| Listen for | Vocals that feel pale, bass that lacks support, warmth that disappears, and airy details that remain exposed instead of cozy. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `cold` |
| Aliases | none |
| Card type | Big combo discovery card |
| Frequency territory | Missing foundation, scooped center, and exposed air. Ingredient centers: `100 Hz` from `Thin`, `600 Hz` from `Hollow`, and `14000 Hz` from `Airy`. |
| EQ move | Discovery label only. It expands to `Thin` cut `-5.0 dB` at `100 Hz`, `Q 0.7`, plus `Hollow` cut `-5.0 dB` at `600 Hz`, `Q 0.85`, plus `Airy` boost `+4.0 dB` at `14000 Hz`, `Q 0.7`. |
| Boost/cut meaning | This is a mixed recipe: cuts remove body and foundation while the air boost leaves the top exposed. |
| Recipes and evolutions | `Thin + Hollow + Airy -> Cold`; equivalent shortcuts: `Scooped + Thin -> Cold` and `Empty + Airy -> Cold`. `Cold` does not currently evolve from `Distant` or `Lean`. Discovery cards do not add new filters; they expand to ingredient descriptors. |
| Conflicts | `Rumble`, `Thump`, `Boomy`, `Punchy`, `Muddy`, and `Warm`, because they oppose the body-loss ingredients; `Dull`, because it opposes `Airy`. |
| What it is not | Not `Distant`, which uses `Dull` and loses top detail; not `Scooped`, which keeps more low foundation; not just `Airy`, because the body and foundation are also missing. |
| Difficulty notes | Easier to teach now that `Scooped` and `Empty` provide lower bridges. Ask the player to listen for exposed air over both a missing center and missing foundation. |
| Visual identity | A frosted hollow body, thin low foundation, empty center, and pale air glint in a sparse cold space. Individual icon file: `icon/cold.png`; region context: `icon/region/region-g-frosthollow-expanse.png`. |

## Left

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Left` |
| Creature identity | **The Left Lantern**: a side-stage creature that pulls a sound toward the listener's left. |
| Feeling | The source leans left of center, as if its anchor point has moved to that side of the stage. |
| Listen for | Lead vocal doubles, snare, hi-hat, guitar, piano, or a short click that clearly appears left of the middle. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `left` |
| Aliases | left-shifted, pulled left |
| Card type | Basic spatial descriptor |
| Spatial territory | Lateral image position left of center. |
| DSP move | Uses a spatial profile that pans or places the test source toward the left side. |
| What it is not | Not `Wide`, which expands the whole field; not `Near` or `Far`, which describe distance. |

## Right

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Right` |
| Creature identity | **The Right Lantern**: a side-stage creature that pulls a sound toward the listener's right. |
| Feeling | The source leans right of center, with its anchor point clearly off to that side. |
| Listen for | Lead vocal doubles, snare, hi-hat, guitar, piano, or a short click that clearly appears right of the middle. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `right` |
| Aliases | right-shifted, pulled right |
| Card type | Basic spatial descriptor |
| Spatial territory | Lateral image position right of center. |
| DSP move | Uses a spatial profile that pans or places the test source toward the right side. |
| What it is not | Not `Wide`, which expands the whole field; not `Near` or `Far`, which describe distance. |

## Centered

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Centered` |
| Creature identity | **The Center Beacon**: a calm anchor creature that holds a source in the middle of the stage. |
| Feeling | The sound sits evenly between left and right instead of leaning to either side. |
| Listen for | Lead vocal, kick, snare, bass, mono synth, or spoken voice that locks into the middle. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `centered` |
| Aliases | center, anchored, middle |
| Card type | Basic spatial descriptor |
| Spatial territory | Center image position between left and right. |
| DSP move | Uses a centered spatial profile with balanced left and right presentation. |
| What it is not | Not `Narrow`, which shrinks field width; a sound can be centered while the surrounding mix remains wide. |

## Near

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Near` |
| Creature identity | **The Close Sprite**: a direct source creature that steps toward the listener. |
| Feeling | The sound feels closer, more present, and less set back from the listener. |
| Listen for | Voice, acoustic guitar, piano, snare, or percussion that seems closer to the face or headphones. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `near` |
| Aliases | close, upfront |
| Card type | Basic spatial descriptor |
| Spatial territory | Front distance and directness. |
| DSP move | Uses a spatial profile with stronger direct presence and reduced distance cues. |
| What it is not | Not spectral `Bright`; closeness is a placement cue, not simply more treble. |

## Far

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Far` |
| Creature identity | **The Far Sprite**: a source creature that recedes deeper into the stage. |
| Feeling | The sound moves away from the listener and feels less direct. |
| Listen for | Voice, piano, snare, or lead parts that step backward instead of sitting close. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `far` |
| Aliases | recessed, remote, set back |
| Card type | Basic spatial descriptor |
| Spatial territory | Backward depth and reduced directness. |
| DSP move | Uses a spatial profile with distance cues, softer direct presence, and room/depth impression. |
| What it is not | Not spectral `Distant`, which is an EQ recipe using `Hollow` and `Dull`. |

## Focused

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Focused` |
| Creature identity | **The Image Lens**: a clear outline creature that makes a sound easy to point at. |
| Feeling | The source has a stable, well-defined shape instead of drifting or smearing. |
| Listen for | Lead vocal, snare, piano, guitar, or a short click whose location becomes easier to identify. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `focused` |
| Aliases | sharp image, stable, pinpoint |
| Card type | Basic spatial descriptor |
| Spatial territory | Image focus, outline stability, and localizability. |
| DSP move | Uses a spatial profile that keeps placement cues stable and avoids smear. Future versions can strengthen this with correlation/focus controls. |
| What it is not | Not spectral clarity or `Bright`; `Focused` is about where the source appears, not how much top-end detail it has. |

## Blurred

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Blurred` |
| Creature identity | **The Soft Outline**: a smeared image creature whose edges stop holding still. |
| Feeling | The source becomes harder to point at. Its position feels fuzzy, softened, or unstable. |
| Listen for | Vocals, pads, guitars, room sound, or centered parts that spread without a clear anchor point. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `blurred` |
| Aliases | fuzzy, smeared, unfocused |
| Card type | Basic spatial descriptor |
| Spatial territory | Reduced image focus and softened localization. |
| DSP move | Uses a spatial profile that makes source placement less stable. Future versions can strengthen this with decorrelation or reflection smear. |
| What it is not | Not `Reverberant` by itself; room reflections can blur an image, but `Blurred` names the loss of outline. |

## Wide

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Wide` |
| Creature identity | **The Wing Span**: a field-size creature that stretches the scene outward to the sides. |
| Feeling | The stereo picture feels broader, with more left-right reach and more space at the edges. |
| Listen for | Stereo guitars, pads, backing vocals, percussion, reverb returns, or mixes where the sides open outward. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `wide` |
| Aliases | broad, expanded, open sides |
| Card type | Basic spatial descriptor |
| Spatial territory | Lateral field width and side reach. |
| DSP move | Uses a width-style spatial profile. The current prototype approximates width and should be taught on headphones or stereo playback. |
| What it is not | Not spectral `Airy`; `Wide` is left-right size, while `Airy` is high-frequency extension. |

## Narrow

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Narrow` |
| Creature identity | **The Folded Stage**: a field-size creature that tucks the stereo picture inward. |
| Feeling | The scene feels smaller, less spread out, or closer to a center line. |
| Listen for | Stereo guitars, pads, ambience, backing vocals, or percussion that collapse inward and lose side reach. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `narrow` |
| Aliases | collapsed, small, close to mono |
| Card type | Basic spatial descriptor |
| Spatial territory | Reduced lateral field width. |
| DSP move | Uses a narrowed spatial profile, approximating width reduction or mono blend. |
| What it is not | Not spectral `Thin`; `Narrow` reduces left-right size, not bass/body weight. |

## Dry

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Dry` |
| Creature identity | **The Bare Signal**: a direct sound creature with almost no room tail around it. |
| Feeling | The source feels close to the microphone or listener, with little surrounding space. |
| Listen for | Voice, guitar, piano, percussion, or drums where the note stops cleanly without a roomy tail. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `dry` |
| Aliases | direct, roomless |
| Card type | Basic spatial descriptor |
| Spatial territory | Low room/reflection energy and direct presentation. |
| DSP move | Uses a spatial profile with minimal reflection or ambience cues. |
| What it is not | Not `Dull`; dry sound can still be bright, detailed, or harsh. |

## Reverberant

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Reverberant` |
| Creature identity | **The Echo Halo**: a room creature that leaves reflected sound around the source. |
| Feeling | The source carries more room, tail, or reflected space after the direct sound. |
| Listen for | Vocal tails, snare rooms, piano ambience, guitar space, and any sound that lingers into the room. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `reverberant` |
| Aliases | roomy, echoing, wet |
| Card type | Basic spatial descriptor |
| Spatial territory | Reflected room energy, ambience, and tail. |
| DSP move | Uses a spatial profile with stronger reflection or room impression. |
| What it is not | Not spectral `Airy`; reverb can create a sense of space, but the cue is room energy rather than top-octave shine. |

## Snappy

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Snappy` |
| Creature identity | **The Quick-Spark**: a fast little motion creature that lets hits start with a clean edge. |
| Feeling | The sound reacts quickly and decisively. Hits feel alert without needing extra brightness. |
| Listen for | Snare hits, kick attacks, plucked bass, picked guitar, piano, and percussion where the first edge matters. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `snappy` |
| Aliases | crisp attack, sharp attack |
| Card type | Basic dynamic descriptor |
| Frequency territory | Not a frequency descriptor. It describes transient attack shape over time. |
| EQ move | None. The app uses dynamic profile behavior rather than EQ. |
| What it is not | Not `Bright`; brightness can fake attack, but `Snappy` should survive loudness and tonal matching. |

## Softened

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Softened` |
| Creature identity | **The Edge-Rounder**: a gentle motion creature that cushions the front of each hit. |
| Feeling | Hits still arrive, but their first edge feels rounded and less decisive. |
| Listen for | Drums, plucks, piano notes, and rhythmic accents that lose their initial bite. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `softened` |
| Aliases | rounded, gentle, cushioned |
| Card type | Basic dynamic descriptor |
| Frequency territory | Not a frequency descriptor. It describes attack softening over time. |
| EQ move | None. Prototype uses fast-attack compression. |
| What it is not | Not `Dull`; `Dull` removes upper detail, while `Softened` rounds the time edge. |

## Tight

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Tight` |
| Creature identity | **The Reset-Snapper**: a disciplined motion creature that returns to ready position before the next hit. |
| Feeling | The groove feels controlled and cleanly reset, not smeared into the next beat. |
| Listen for | Kick-and-bass patterns, tom fills, rhythmic guitar, and percussion loops with clear gaps. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `tight` |
| Aliases | controlled recovery, locked |
| Card type | Basic dynamic descriptor |
| Frequency territory | Not a frequency descriptor. It describes recovery timing. |
| EQ move | None. Prototype uses release timing and level-control behavior. |
| What it is not | Not spectral `Punchy`; `Tight` is about reset timing, not low-frequency impact. |

## Loose

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Loose` |
| Creature identity | **The Slow-Tailer**: a lazy motion creature that drags the level into the next beat. |
| Feeling | The sound feels slow to recover. Hits or bass notes smear together more than they should. |
| Listen for | Bass and drum parts where one hit seems to lean into the next instead of resetting cleanly. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `loose` |
| Aliases | dragging, slow, lagging |
| Card type | Basic dynamic descriptor |
| Frequency territory | Not a frequency descriptor. It describes slow recovery over time. |
| EQ move | None. Prototype uses slower release behavior. |
| What it is not | Not `Boomy`; `Boomy` is bass bloom, while `Loose` is recovery lag after hits. |

## Compressed

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Compressed` |
| Creature identity | **The Level-Press**: a pressure creature that pulls peaks and quieter parts closer together. |
| Feeling | The sound feels controlled and less free-moving, but not necessarily broken or bad. |
| Listen for | Peaks that shrink, quiet details that come forward, and performances that feel more level-matched. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `compressed` |
| Aliases | controlled, squeezed |
| Card type | Basic dynamic descriptor |
| Frequency territory | Not a frequency descriptor. It describes peak-to-average level behavior. |
| EQ move | None. Prototype uses compressor threshold, ratio, attack, and release. |
| What it is not | Not automatically `Flat`, `Squashed`, or bad. Some compression can be controlled and musical. |

## Pumping

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Pumping` |
| Creature identity | **The Level-Bouncer**: a motion creature that ducks and springs back with the beat. |
| Feeling | The sound moves in obvious waves, as if the whole level is being pushed down and released. |
| Listen for | Kicks or snares that make the rest of the mix dip and then swell back. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `pumping` |
| Aliases | ducking, pulsing |
| Card type | Basic dynamic descriptor |
| Frequency territory | Not a frequency descriptor. It describes gain movement over time. |
| EQ move | None. Prototype uses stronger compression with a release time that makes movement audible. |
| What it is not | Not `Breathing`; breathing is the slower phase-2 cousin. |

## Flat Dynamics

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Flat` |
| Creature identity | **The Motion-Flattener**: a still creature that irons expression into one level. |
| Feeling | The performance loses small rises and falls. Everything sits at a similar intensity. |
| Listen for | Vocals, piano, drums, or acoustic parts where expressive level changes disappear. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `flat-dynamics` |
| Aliases | over-leveled, monotone |
| Card type | Basic dynamic descriptor |
| Frequency territory | Not a frequency descriptor. It describes reduced expressive level contrast. |
| EQ move | None. Prototype uses stronger leveling behavior. |
| What it is not | Not flat frequency response. It means the time motion is flattened. |

## Clipped

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Clipped` |
| Creature identity | **The Ceiling-Biter**: an overload creature that chops off loud peaks when they jump too high. |
| Feeling | Loud hits feel cut, cracked, or splashed at the instant of impact. |
| Listen for | Drum hits, bass peaks, loud vocal consonants, or mix peaks that seem to hit a hard ceiling. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `clipped` |
| Aliases | clipping, clipped peaks, hard ceiling |
| Card type | Basic dynamic descriptor |
| Frequency territory | Not a frequency descriptor. It describes peak/headroom damage. |
| EQ move | None. Prototype uses a clip-shaped waveshaper after compression. |
| What it is not | Not generic `Harsh`; if the problem is just a bright tonal edge, use Spectral instead. |

## Distorted

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Distorted` |
| Creature identity | **The Rough-Drive**: an overload creature that adds grit when the signal is pushed too hard. |
| Feeling | Loud moments become gritty, fuzzy, raspy, or broken up in a way that follows the music. |
| Listen for | Peaks that grow rougher as they get louder, especially drums, bass, vocals, and dense choruses. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `distorted` |
| Aliases | overdriven, saturated, gritty |
| Card type | Basic dynamic descriptor |
| Frequency territory | Not a frequency descriptor. It describes nonlinear overload roughness. |
| EQ move | None. Prototype uses a tanh-style waveshaper after compression. |
| What it is not | Not independent `Buzz`, `Crackle`, or `Dropout`; those belong to Integrity when they occur as separate defects. |

## Hiss

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Hiss` |
| Creature identity | **The Static Veil**: a whispery noise creature that hangs behind the music as a fine grainy mist. |
| Feeling | The playback feels dusty, airy, or contaminated even when the music itself is quiet. |
| Listen for | Quiet intros, fades, pauses, sparse vocals, acoustic music, piano tails, and ambience where a steady shhh-like layer becomes obvious. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `hiss` |
| Aliases | noise floor, shhh, white noise |
| Card type | Basic integrity descriptor |
| Frequency territory | Not a tonal-balance descriptor. It is an unwanted broadband high-frequency noise floor added behind the music. |
| EQ move | None. Prototype uses an additive noise profile rather than EQ. |
| What it is not | Not `Bright`, because the music is not simply tilted upward; not `Buzz` or `Hum`, because it has no clear tone; not `Crackle`, because it is continuous rather than made of separate ticks. |

## Static

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Static` |
| Creature identity | **The Fuzz Veil**: a rough noise creature that jitters behind the music instead of sitting smoothly. |
| Feeling | The playback feels fuzzy, radio-like, or unstable, as if the background noise has a broken texture. |
| Listen for | Quiet passages, speech, sustained pads, acoustic recordings, and fades where rough background fuzz becomes easier to notice than smooth hiss. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `static` |
| Aliases | fuzz, scratch, radio static |
| Card type | Basic integrity descriptor |
| Frequency territory | Not a tonal-balance descriptor. It is rough broadband noise or radio-like contamination added to playback. |
| EQ move | None. Prototype uses modulated noise and light tick residue rather than EQ. |
| What it is not | Not `Hiss`, which is smoother and steadier; not `Crackle`, which is made of separate distinct ticks; not `Harsh`, because the music tone itself is not simply sharper. |

## Hum

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Hum` |
| Creature identity | **The Low Drone**: a heavy electrical creature that sits under the music with a steady, sleepy vibration. |
| Feeling | The playback feels grounded by an unwanted low tone, like power noise has slipped underneath the track. |
| Listen for | Quiet passages, voice, sparse acoustic music, test tones, pauses, and fades where a low continuous tone does not belong. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `hum` |
| Aliases | mains hum, ground hum |
| Card type | Basic integrity descriptor |
| Frequency territory | Low-frequency tonal interference, often around mains-hum territory such as `50 Hz` or `60 Hz`, sometimes with low harmonics. |
| EQ move | None. Prototype uses an added hum/interference profile rather than EQ. |
| What it is not | Not `Rumble`, because it is an unwanted steady tone rather than musical sub-bass; not `Buzz`, which is rougher and more harmonic; not `Boomy`, which is bass balance in the music itself. |

## Buzz

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Buzz` |
| Creature identity | **The Fault Comb**: a nervous electrical creature with jagged vibrating teeth riding behind the sound. |
| Feeling | The playback feels electrically contaminated, rougher and more insistent than a smooth hum. |
| Listen for | Speech, quiet music, sustained notes, and bass passages where a grainy harmonic edge appears under or around the music. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `buzz` |
| Aliases | electrical buzz, buzzy |
| Card type | Basic integrity descriptor |
| Frequency territory | Harmonic-rich low or mid-frequency interference. It may sound electrical or vibration-like, but this MVP card focuses on added interference. |
| EQ move | None. Prototype uses a harmonic interference profile rather than EQ. |
| What it is not | Not `Hum`, which is smoother and more tone-like; not `Whine`, which is higher and thinner; not Dynamic `Distorted`, because `Buzz` is an added defect rather than overload roughness following loud peaks. |

## Whine

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Whine` |
| Creature identity | **The Needle Tone**: a thin electrical creature that traces a narrow line above the music. |
| Feeling | A high pitched tone intrudes into the playback and feels separate from the musical brightness. |
| Listen for | Quiet vocals, sparse music, held chords, pauses, and cabin-like material where a narrow tone stays present over the track. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `whine` |
| Aliases | alternator whine, tone whine |
| Card type | Basic integrity descriptor |
| Frequency territory | Narrowband tonal interference in the upper-mid or high range. It is added to playback rather than broad EQ brightness. |
| EQ move | None. Prototype uses a narrow oscillator with slight drift rather than EQ. |
| What it is not | Not `Bright`, because it is a single added tone; not `Buzz`, which is rougher and lower; not `Sibilant`, which follows consonants and cymbal edges. |

## Dirty

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Dirty` |
| Creature identity | **The Grime Cloud**: a mixed contamination creature made of faint noise, small residue, and rough edges. |
| Feeling | The playback feels polluted or unclean even when no single defect completely explains it. |
| Listen for | Vocals, piano, acoustic guitar, sparse mixes, quiet intros, and fades where the clean reference feels covered by low-level junk. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `dirty` |
| Aliases | contaminated, unclean, polluted |
| Card type | Basic integrity descriptor |
| Frequency territory | Not one frequency region. It is a broad playback-integrity descriptor for mixed low-level contamination. |
| EQ move | None. Prototype uses one internal contamination profile rather than exposing it as a recipe. |
| What it is not | Not a discovery combo and not a replacement for specific diagnosis; use `Hiss`, `Static`, `Hum`, `Buzz`, or `Whine` when one of those is clearly the main problem. |

## Click

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Click` |
| Creature identity | **The Snap Bead**: a tiny impulse creature that strikes once and vanishes into silence. |
| Feeling | The playback has a small, precise tick that interrupts the music for an instant. |
| Listen for | Sparse music, speech, percussion gaps, sustained tones, edits, and pauses where one sharp tick appears out of place. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `click` |
| Aliases | tick, ticked |
| Card type | Basic integrity descriptor |
| Frequency territory | Not a frequency descriptor. It is a short impulse, discontinuity, edit click, clocking artifact, or contact tick. |
| EQ move | None. Prototype uses a short event marker/impulse-style profile rather than EQ. |
| What it is not | Not `Crackle`, which is many irregular ticks; not `Dropout`, which removes audio; not `Clipped`, which damages loud peaks instead of adding a separate tick. |

## Pop

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Pop` |
| Creature identity | **The Burst Seed**: a larger impulse creature that snaps open with more force than a click. |
| Feeling | The playback is interrupted by a sudden pressure-like burst or contact pop. |
| Listen for | Speech, pauses, quiet music, bass-light passages, and edits where one larger event jumps out from the stream. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `pop` |
| Aliases | thump pop, impulse |
| Card type | Basic integrity descriptor |
| Frequency territory | Not a frequency descriptor. It is a larger impulse or filtered burst added to playback. |
| EQ move | None. Prototype uses a longer, lower impulse than `Click`. |
| What it is not | Not `Click`, which is smaller and sharper; not `Thump`, which is musical low-bass impact; not `Clipped`, which damages peaks rather than adding a separate event. |

## Crackle

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Crackle` |
| Creature identity | **The Dry Fracture**: a brittle fault creature covered in tiny popping cracks. |
| Feeling | The playback feels unstable, with many small ticks flickering through the sound. |
| Listen for | Quiet passages, sustained vocals, piano tails, ambience, speech, dirty-contact sounds, and transport faults where little events appear in clusters. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `crackle` |
| Aliases | crackling, crackly |
| Card type | Basic integrity descriptor |
| Frequency territory | Not a frequency descriptor. It is a random cluster of small impulses or bursty discontinuities. |
| EQ move | None. Prototype uses irregular event/tick behavior rather than EQ. |
| What it is not | Not `Hiss`, because it is intermittent rather than continuous; not `Click`, because it has many events; not Dynamic `Distorted`, because the roughness is added as a fault rather than following overload peaks. |

## Dropout

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Dropout` |
| Creature identity | **The Missing Ribbon**: a signal creature broken by a clean dark gap before it reappears. |
| Feeling | The music briefly disappears, skips, mutes, or loses continuity. |
| Listen for | Sustained tones, vocals, steady drums, pads, and continuous music where the stream suddenly cuts away and returns. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `dropout` |
| Aliases | gap, cutout, mute |
| Card type | Basic integrity descriptor |
| Frequency territory | Not a frequency descriptor. It is a short mute, packet loss, buffer underrun, wireless interruption, or playback interruption. |
| EQ move | None. Prototype uses dropout/gate behavior rather than EQ. |
| What it is not | Not `Click`, though very short dropouts can make a tick; not `Dull`, because the top end is not merely reduced; not `Flat`, because the issue is missing playback continuity, not reduced dynamic motion. |

## Squeak

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Squeak` |
| Creature identity | **The Friction Chirp**: a tiny fault creature that slips upward in a short high squeal. |
| Feeling | A brief high chirp appears as a fault event, like friction or a squeaky contact. |
| Listen for | Sparse music, pauses, bass pulses, short transitions, and quiet material where a quick high chirp appears and disappears. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `squeak` |
| Aliases | chirp, squeal |
| Card type | Basic integrity descriptor |
| Frequency territory | Short high-frequency chirp or friction-like sweep added as an event. |
| EQ move | None. Prototype uses a short chirp profile rather than EQ. |
| What it is not | Not `Whine`, which is a continuous tone; not `Crackle`, which is many ticks; not `Shrill`, which is alias vocabulary for severe sibilant edge in the music. |

## Precise

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Precise` |
| Creature identity | **The Center Pin**: a small steady image creature that holds its point in the middle of the stage. |
| Feeling | The source locks clearly in the center and has an outline the listener can point to. |
| Listen for | Spoken voice, lead vocal, snare, piano lead, or a centered part that stops wandering and becomes easier to locate. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `precise` |
| Aliases | pinpoint, locked center |
| Card type | Combo discovery card |
| Spatial territory | Center placement plus clear image focus. |
| DSP move | Discovery label only. It expands to `Centered` plus `Focused`; the app uses the underlying spatial profiles rather than hidden extra processing. |
| What it is not | Not merely `Centered`, because the outline must also be stable; not merely `Focused`, because the position must sit in the middle. |

## Diffuse

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Diffuse` |
| Creature identity | **The Mist Spread**: a wide soft image creature whose edges drift outward. |
| Feeling | The source spreads across more space but becomes harder to place as a single point. |
| Listen for | Stereo music, pads, guitars, room sound, or vocals where the image opens outward while the center outline gets softer. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `diffuse` |
| Aliases | spread out, smeared wide |
| Card type | Combo discovery card |
| Spatial territory | Width plus reduced image focus. |
| DSP move | Discovery label only. It expands to `Wide` plus `Blurred`; the current engine approximates this through the existing spatial profiles. |
| What it is not | Not merely `Wide`, because the image also loses focus; not merely `Blurred`, because the spread must feel wider. |

## Intimate

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Intimate` |
| Creature identity | **The Close Lantern**: a quiet near-field creature that sits close with almost no room around it. |
| Feeling | The source feels close, direct, and personal, without a long room tail. |
| Listen for | Spoken voice, lead vocal, dry guitar, piano, or percussion that feels nearer to the listener and less surrounded by reflections. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `intimate` |
| Aliases | close, close and dry |
| Card type | Combo discovery card |
| Spatial territory | Near distance plus low room/reflection energy. |
| DSP move | Discovery label only. It expands to `Near` plus `Dry`; the app uses the underlying spatial profiles rather than hidden extra processing. |
| What it is not | Not merely `Near`, because the room must also be reduced; not merely `Dry`, because the source should also feel close. |

## Set Back

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Set Back` |
| Creature identity | **The Rear Echo**: a distant source creature held behind a veil of room reflections. |
| Feeling | The source moves farther away and gains more space around it. |
| Listen for | Voice, piano, snare, or a lead part that recedes from the listener while the room impression becomes more audible. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `set_back` |
| Aliases | recessed, farther back |
| Card type | Combo discovery card |
| Spatial territory | Farther distance plus stronger reflected room energy. |
| DSP move | Discovery label only. It expands to `Far` plus `Reverberant`; the current engine approximates this with distance, high-frequency rolloff, and reflection cues. |
| What it is not | Not spectral `Distant`, which is an EQ recipe; not merely `Far`, because room reflections are part of the identity. |

## Spacious

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Spacious` |
| Creature identity | **The Open Hall**: a broad room creature that makes the scene feel larger. |
| Feeling | The sound field feels wider and roomier, with more air around the music. |
| Listen for | Stereo music, piano, acoustic guitar, vocal ambience, room tails, and mixes where the stage opens outward while the space around the sound grows. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `spacious` |
| Aliases | open space, roomy |
| Card type | Combo discovery card |
| Spatial territory | Stereo width plus room/reflection impression. |
| DSP move | Discovery label only. It expands to `Wide` plus `Reverberant`; the current engine approximates this through width and reflection profiles. |
| What it is not | Not spectral `Airy`, which is high-treble extension; not merely `Wide`, because room impression matters too. |

## Sluggish

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Sluggish` |
| Creature identity | **The Slow Cushion**: a heavy recovery creature that lands softly and returns late. |
| Feeling | Hits feel rounded and slow to reset, so the groove loses snap. |
| Listen for | Drums, plucked bass, piano, or rhythmic parts where the first edge is softened and the sound drags into the next event. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `sluggish` |
| Aliases | slow reset, draggy |
| Card type | Combo discovery card |
| Dynamic territory | Rounded attack plus slow release/recovery. |
| DSP move | Discovery label only. It expands to `Softened` plus `Loose`; the current engine uses compressor timing profiles to approximate the combined behavior. |
| What it is not | Not merely `Loose`, because the attack is also softened; not spectral `Boomy`, which is low-frequency bloom rather than recovery timing. |

## Surging

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Surging` |
| Creature identity | **The Pressure Wave**: a compressor-motion creature that pulls down and swells back with the beat. |
| Feeling | The whole mix moves in audible waves caused by level control. |
| Listen for | Kick/snare-driven loops, bass grooves, and dense mixes where the level ducks and returns in a compressor-like rhythm. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `surging` |
| Aliases | compressor waves, ducking motion |
| Card type | Combo discovery card |
| Dynamic territory | Gain reduction plus audible release movement. |
| DSP move | Discovery label only. It expands to `Compressed` plus `Pumping`; a future dedicated recipe profile should make it more distinct from `Pumping` alone. |
| What it is not | Not natural performance swell; not merely `Compressed`, because the moving duck-and-return behavior must be audible. |

## Overdriven

### Player-Facing Identity

| Row | Detail |
|---|---|
| Card name | `Overdriven` |
| Creature identity | **The Broken Ceiling**: a pressure creature whose peaks hit the ceiling and roughen at the same time. |
| Feeling | Loud moments feel pushed past clean headroom, becoming hard, rough, or gritty. |
| Listen for | Drum hits, vocal belts, loud synths, bass peaks, and choruses where the peaks flatten and roughness follows the signal. |

### Technical Details

| Row | Detail |
|---|---|
| Stable ID | `overdriven` |
| Aliases | overloaded, hard saturation |
| Card type | Combo discovery card |
| Dynamic territory | Hard clipping plus nonlinear overload roughness. |
| DSP move | Discovery label only. It expands to `Clipped` plus `Distorted`; the engine already has a combined overload curve for this pair. |
| What it is not | Not Integrity `Buzz`, `Crackle`, or `Dropout`, because the roughness follows loud signal peaks rather than appearing as an independent defect. |
