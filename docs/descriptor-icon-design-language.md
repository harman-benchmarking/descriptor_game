# Descriptor Icon Design Language

Date: 2026-04-24  
Source samples: `warm.png`, `thin.png`

Note: the user referred to the second sample as `cold`; the file currently present in this directory is `thin.png`, which carries the same cold/sparse visual language.

## 0. Full Icon Target List
The current Descriptor Playground spectral roadmap has `59` primary spectral icon targets, including promoted `Bassy`, `Vivid`, and the Frosthollow `Empty` and `Faded` discovery cards, plus `12` spectral alias icon targets for post-game rewards:
- `18` selectable basic descriptors
- `41` unlockable discovery descriptors
- `12` spectral alias descriptors

Current basics:
`Rumble`, `Thump`, `Boomy`, `Punchy`, `Thin`, `Muddy`, `Warm`, `Boxy`, `Hollow`, `Honky`, `Nasal`, `Shouty`, `Harsh`, `Dull`, `Glassy`, `Sibilant`, `Bright`, `Airy`.

Current discoveries:
`Tinny`, `Spitty`, `Metallic`, `Full`, `Thick`, `Bassy`, `Vivid`, `Bloated`, `Muffled`, `Mellow`, `Chesty`, `Cupped`, `Pinched`, `Tubular`, `Brassy`, `Cloudy`, `Aggressive`, `Shimmering`, `Scooped`, `Lean`, `Sharp`, `Crisp`, `Distant`, `Empty`, `Faded`, `Powerful`, `Impactful`, `Canned`, `Reedy`, `Brittle`, `Woolly`, `Fatiguing`, `Cold`, `Veiled`, `Energetic`, `Vintage`, `Congested`, `Plasticky`, `Exciting`, `Buried`, `Piercing`.

Current bonus aliases:
`Droning`, `Lacking`, `Weak`, `Colored`, `Presence`, `Dark`, `Lightweight`, `Edgy`, `Shrill`, `Shiny`, `Extended`, `Squawky`.

Generation priority:
- Start with the `18` basics because they are visible buttons.
- Then create the `41` discoveries for the collection board.
- Then create the `12` bonus aliases as post-game reward icons after the player clears the main game.
- Keep filenames lowercase kebab-case or snake-case, such as `rumble.png`, `set-back.png`, or `flat-dynamics.png`.
- Keep every final asset as a fully filled square PNG with no baked rounded corners.

Four-module MVP extension:
- Spatial MVP card prompts: `Left`, `Right`, `Centered`, `Focused`, `Blurred`, `Wide`, `Narrow`, `Precise`, `Diffuse`, `Near`, `Far`, `Dry`, `Reverberant`, `Intimate`, `Set Back`, `Spacious`.
- Dynamic MVP card prompts: `Snappy`, `Softened`, `Tight`, `Loose`, `Compressed`, `Pumping`, `Flat`, `Clipped`, `Distorted`, `Sluggish`, `Surging`, `Overdriven`.
- Integrity MVP card prompts: `Hiss`, `Static`, `Hum`, `Buzz`, `Whine`, `Dirty`, `Click`, `Pop`, `Crackle`, `Dropout`, `Squeak`.
- Region prompts live together in Section `15`, grouped by `Spectral`, `Spatial`, `Dynamic`, and `Integrity`.
- Utility prompts, such as `Review Lab`, live after the region prompt groups so they do not look like extra map regions.

Region and utility icon targets are tracked separately from descriptor-card targets:
- Spectral region icons: `7`
- Spatial region icons: `2` online plus `1` future/off-atlas
- Dynamic region icons: `3`
- Integrity region icons: `1` online, with the former split prompts retained only as historical reference if needed
- Utility icons: `Review Lab`

## 1. Purpose
This document is the source-of-truth for Descriptor Playground icon visual language, descriptor-card prompts, atlas-region prompts, and utility icon prompts.

The module descriptor documents own vocabulary, recipes, conflicts, region membership, and implementation notes. This document owns prompt wording, canvas rules, palette/shape locks, generation handoff rules, and visual consistency checks.

The original visual language was extracted from the current descriptor icon samples so future Descriptor Playground icons feel like one coherent collection.

The goal is not to copy each sample literally. The goal is to preserve the shared language:
- a strong sound-quality metaphor as the main read
- waveform, vibration, or audio cues as supporting language
- emotional shape language
- soft hand-painted lighting
- simple, readable symbolic props
- strong mood palettes per descriptor
- fully filled square icon composition

## 2. Shared Concept
Each descriptor icon should be a tiny emotional scene about sound.

The core metaphor:
- The descriptor metaphor leads the image.
- Audio cues make the metaphor feel like sound, not just a generic object.
- The waveform can be a character, but it does not have to be the main character.
- Supporting objects, environments, vibration lines, tremor rings, particles, and lighting explain the descriptor without using text.
- The image should feel musical and emotional, not technical or diagram-like.

The icon should answer:
- What does this descriptor feel like?
- What shape would this sound make?
- What environment would that sound live in?
- What physical metaphor makes this sound quality immediately understandable?

## 3. Canvas And Format
Recommended output:
- `1254 x 1254 px`
- square composition
- no text
- no labels
- centered subject
- safe margins around important details
- readable at small UI sizes
- full-canvas painted image with no transparent corners
- no baked-in rounded-corner mask

Composition rules:
- Keep the main subject inside the central `65%` of the canvas.
- Avoid important details touching the edge.
- Use the outer area for mood, glow, atmosphere, negative space, or secondary motion cues.
- Fill the full square canvas with illustration, atmosphere, or background color.
- Let the app UI apply rounded clipping; do not round the actual PNG corners.
- Audio cues should remain recognizable when scaled down to `48 x 48 px`.

Border/frame:
- A subtle internal frame is allowed only when it helps the metaphor.
- The frame can be hand-drawn, imperfect, or softly textured.
- The border should support the mood, not dominate the image.
- Warm sample uses a full illustrative environment without a visible card border.
- Thin sample uses a strong rounded-square border with large empty space.
- Future production PNGs should still be fully filled square images, even if an internal border is drawn.

Guideline:
- Use a border when the descriptor benefits from restraint, emptiness, coldness, thinness, dullness, or clinical focus.
- Use an immersive environment when the descriptor benefits from warmth, density, power, air, bloom, or fantasy.

## 4. Waveform And Audio Cues
The waveform is a recurring identity cue, but the sound-quality metaphor should be more prominent than the waveform itself.

Audio cue traits:
- rounded continuous line
- thick enough to read at small size
- centered or nearly centered
- expressive silhouette
- can become a character, object, creature, flame, ribbon, crack, cloud, beam, tremor ring, pressure line, or vibration mark
- should still imply audio or vibration
- can be the hero only when that is the clearest metaphor
- can be subtle support when a physical metaphor is clearer

Line behavior:
- low-frequency descriptors should use wide, slow, heavy curves
- mid descriptors should use body-like curves, bends, resonance chambers, or enclosed shapes
- treble descriptors should use sharper, narrower, more jagged or sparkling shapes
- cut descriptors can look smaller, thinner, colder, emptier, droopier, or faded
- boost descriptors can look fuller, glowing, swollen, radiant, energetic, or forceful

Face language:
- A simple face can be used when it clarifies the emotion.
- Use tiny eyes and mouth only; avoid complex facial detail.
- The face should be secondary to the descriptor metaphor.
- Facial expression should map to the descriptor:
  - `Warm`: relaxed, closed eyes, gentle smile
  - `Thin`: worried, small, tense
  - `Rumble`: calm, massive, grounded, subterranean
  - `Harsh`: strained, tense, angular
  - `Airy`: open, calm, floating

## 5. Shape Language
The samples use shape as emotional coding.

Warm sample:
- full, rounded, enveloping forms
- large glowing waveform
- blanket/scarf wraps around the waveform
- soft clouds and small star-like lights
- everything feels protected and cozy

Thin sample:
- tall, narrow waveform
- much smaller subject
- lots of empty space
- thin line work
- cool palette
- expression feels fragile or uncomfortable

General shape guide:

| Descriptor feeling | Shape language |
|---|---|
| warm, full, thick | rounded, large, enveloped, softly inflated |
| thin, cold, distant | narrow, small, isolated, lots of negative space |
| boomy, rumble, powerful | wide, low, heavy, circular, ground-connected |
| muddy, veiled, congested | overlapping, cloudy, softened edges, obscured subject |
| boxy, canned | enclosed, rectangular, container-like |
| honky, nasal, pinched | squeezed, funnel-like, tube-like, puckered |
| shouty, aggressive | forward thrust, tall projection, pressure lines |
| harsh, glassy, piercing | sharp points, jagged edges, bright cuts and reflective edges |
| bright, airy, crisp | light, sparkle, open space, high-positioned accents |
| dull, muffled, dark | dim, covered, softened, low contrast |

## 6. Color System
Color should be descriptor-driven, but the collection still needs harmony.

Shared principles:
- use strong mood palettes
- avoid flat fills
- use gradients and glow
- keep one dominant color family per icon
- use small contrasting highlights for focus
- choose color for the descriptor, not for the global app theme
- red, pink, orange, blue, gray, or any other hue is allowed when the sound metaphor needs it

Warm sample palette:
- deep plum / dark maroon background
- glowing orange and golden yellow core
- red-orange scarf/blanket
- tiny warm light particles
- overall mood: cozy heat, fullness, comfort

Thin sample palette:
- pale blue-white background
- icy blue waveform fill
- dark navy outline
- very low saturation
- overall mood: cold, sparse, fragile

Recommended descriptor palette families:

| Descriptor family | Palette direction |
|---|---|
| bass power | deep navy, cobalt, low amber glow, earth shadow |
| warmth/body | orange, gold, ember, dark plum |
| thin/cold/hollow | pale blue, icy cyan, navy outline, lots of white |
| muddy/veiled | olive-gray, brown, muted teal, low contrast |
| boxy/canned | cardboard tan, muted orange, shadowed edges |
| honky/nasal | yellow-green, brass, compressed mid colors |
| shouty/harsh | bright yellow, acid orange, hard white highlights |
| dull/dark | charcoal blue, muted gray, soft desaturated highlights |
| glassy/sibilant | icy white, electric blue, sharp bright highlights |
| bright/airy | sky blue, white, pale gold, sparkling highlights |

### 6.1 Character And Palette Uniqueness Locks
Each descriptor needs a locked character silhouette and a locked color lane. If two descriptors start to look similar, change the main character or prop first, then adjust the palette. Do not rely on labels, tiny details, or small waveform differences to separate icons.

The generated icon should pass this quick test at thumbnail size: if the face is hidden, the silhouette and color should still identify the descriptor family.

| Descriptor | Unique character / silhouette lock | Unique palette lane | Must not look like |
|---|---|---|---|
| `Rumble` | low ground-spirit landscape, face carved into earth | dark red earth, burnt orange, brown, muted purple | `Thump`, `Powerful` |
| `Thump` | squat padded drum-stone landing into the ground | deep umber, muted orange, dusty violet, golden impact | `Boxy`, `Punchy` |
| `Boomy` | swollen hollow cave-bell creature with dark open mouth | midnight teal, deep indigo, smoky violet, copper glow | `Thump`, `Hollow`, `Airy` |
| `Punchy` | forward red boxing-glove creature, jab silhouette | red-orange glove, amber attack flash, deep plum | `Thump`, `Impactful` |
| `Thin` | tall translucent icy reed or folded ribbon | icy cyan, pale blue, frost white, navy accents | `Airy`, `Brittle`, `Cold` |
| `Muddy` | sound creature partly swallowed by mud/fog | olive-brown, muted teal, dark umber, gray-green haze | `Muffled`, `Buried` |
| `Warm` | golden ember creature wrapped in knitted scarf | maroon fabric, honey gold, orange glow, plum shadows | `Thick`, `Mellow`, `Full` |
| `Boxy` | living cardboard box or wooden cabinet itself, square open mouth | cardboard tan, honey oak, muted orange, dusty violet | `Thump`, `Canned`, `Hollow` |
| `Hollow` | empty sweater or collapsed soft coat with no body inside | pale blue-gray cloth, muted lavender, cool cyan mist, soft navy shadow | `Boomy`, `Boxy`, `Thin`, `Airy` |
| `Honky` | vintage squeeze-horn creature: rubber bulb plus flared brass bell | brass yellow, muted gold, olive brown, orange glints | `Nasal`, `Cupped` |
| `Nasal` | stylized rounded nose-shaped sound character with pinched bridge | muted yellow-green, brass beige, olive shadow, small cyan buzz accents | `Honky`, `Pinched`, `Spitty` |
| `Shouty` | small open-mouth character projecting an oversized vocal cone | bright yellow, amber, orange, red-brown shadow | `Aggressive`, `Harsh` |
| `Harsh` | jagged sandpaper scrape shard with rough torn edge | acid yellow, rusty orange, hard white, dark plum | `Glassy`, `Piercing`, `Shouty` |
| `Dull` | sleepy frosted lantern with weak blunted glow | charcoal blue, muted gray, dusty navy, soft brown | `Muffled`, `Veiled` |
| `Glassy` | clear reflective pane-sprite with hard cyan-white edge glints | icy cyan, glass blue, white, pale violet, navy shadow | `Harsh`, `Sibilant`, `Crisp`, `Metallic` |
| `Sibilant` | icy slit-mouth hiss sprite with thin silver ribbon trails | icy white, electric blue, pale cyan, silver | `Shrill`, `Spitty` |
| `Bright` | cheerful sun-prism orb opening upward with broad top-end glow | sky blue, pale gold, warm white, soft cyan | `Airy`, `Crisp`, `Glassy` |
| `Airy` | translucent feather-cloud breeze spirit with open negative space | pale sky blue, white, soft cyan, faint gold | `Thin`, `Bright`, `Hollow` |
| `Tinny` | tiny fragile spirit rattling inside a thin dented metal cup | pale silver, icy blue, muted gray, navy | `Canned`, `Metallic`, `Boxy` |
| `Spitty` | puckered consonant-pop sprite with short dry particle bursts | icy blue, pale white, cool gray, navy, tiny cyan sparks | `Sibilant`, `Thin`, `Tinny` |
| `Metallic` | polished chrome tuning-fork spirit with ringing halo | silver, blue-gray, dark navy, cyan glints, tiny amber reflections | `Tinny`, `Canned`, `Glassy` |
| `Full` | complete-spectrum round character with warm base and clear sky-lit crown | warm orange, gold, sky-blue highlight, cream, soft plum shadow | `Warm`, `Thick`, `Bloated` |
| `Thick` | flattened stack of dense padded cushion-slabs with visible weight | deep amber, caramel brown, maroon, muted gold, dark plum | `Warm`, `Full`, `Bloated`, `Mellow` |
| `Bassy` | rounded bass cushion swelling inside a loose box/cabinet frame | deep teal, warm bass orange, muted cardboard tan, plum shadow | `Boomy`, `Boxy`, `Muddy`, `Bloated` |
| `Vivid` | colorful low-end creature with a bright treble crown | deep teal, warm orange-brown, pale gold, sky-blue highlights, muted plum | `Boomy`, `Bright`, `Bassy`, `Full` |
| `Bloated` | over-inflated bass balloon with stretched seams and uneasy puffed face | muddy orange, brown, muted purple, amber pressure glow, gray haze | `Boomy`, `Thick`, `Full`, `Powerful` |
| `Muffled` | tiny sound creature under a thick padded blanket with absorbed wave lines | dusty blue-gray, muted brown, charcoal, beige, dim amber underglow | `Dull`, `Muddy`, `Veiled`, `Buried` |
| `Mellow` | relaxed sunset-cloud character reclining on one soft cushion | honey orange, warm beige, dusty rose-brown, dim gold, muted plum | `Warm`, `Dull`, `Muffled`, `Thick` |
| `Chesty` | rounded wooden chest-resonator with warm low-mid glow | cedar brown, honey amber, muted rose, plum shadow | `Warm`, `Boxy`, `Cupped` |
| `Cupped` | tiny sound spirit enclosed by two mitten-like cupped hands forming an acoustic bowl | warm tan, olive-gold, soft brown, muted orange, purple shadow | `Honky`, `Boxy`, `Nasal`, `Canned` |
| `Pinched` | single side-view wooden clothespin, two wooden halves total, pinching a tiny sound sprite at its front jaws | yellow-green sprite, warm wood tan, brass spring, olive shadow, pale blue buzz accents | `Nasal`, `Honky`, `Cupped`, `Harsh` |
| `Tubular` | curved hollow tube creature with a nasal opening and boxed base | muted brass, cardboard tan, olive shadow, pale cyan buzz accents | `Canned`, `Cupped`, `Honky`, `Nasal` |
| `Brassy` | rounded nasal mask-sprite with a tarnished brass rim and one hard edge-glint | tarnished brass, nasal yellow-green, acid amber, olive shadow, pale cyan buzz | `Nasal`, `Honky`, `Metallic`, `Sharp` |
| `Squawky` | alias icon for Brassy language: rough brassy bite without becoming a separate recipe | brass yellow, burnt orange, rubber umber, acid yellow, dark plum | `Brassy` |
| `Cloudy` | low-mid cloud creature boxed inside a foggy frame | olive-brown, gray-green fog, muted tan, dim amber | `Muddy`, `Muffled`, `Veiled` |
| `Aggressive` | forward-leaning wedge-shaped pressure creature pushing a hot wave-front | hot yellow, burnt orange, red-brown, dark plum, white glare | `Shouty`, `Fatiguing`, `Harsh`, `Punchy` |
| `Shimmering` | airy treble veil with bright glints floating above a breeze spirit | pale sky blue, white, pale gold, tiny cyan glints | `Bright`, `Airy`, `Crisp`, `Exciting` |
| `Scooped` | hollow bowl-valley with an airy open rim and quiet recessed center | blue-gray, icy cyan, pale gold air glints, navy shadow | `Hollow`, `Airy`, `Cold` |
| `Lean` | slim exposed sound sprite with a missing low shadow and clean top glint | icy cyan, pale blue, white glint, cool navy | `Thin`, `Brittle`, `Cold`, `Sharp` |
| `Sharp` | precise folded cyan-white edge sprite with one bright clean corner | icy white, electric cyan, pale yellow glint, navy | `Glassy`, `Piercing`, `Harsh`, `Crisp` |
| `Crisp` | fresh mint-cyan leaf-sprite with one clean snapped edge and tiny crackle glints | mint-cyan, pale blue, white, soft gold glints, navy outline | `Bright`, `Glassy`, `Harsh`, `Brittle` |
| `Distant` | tiny sound sprite at the far end of a misty blue hallway or valley | pale blue-gray, muted lavender, fog white, soft navy, dim cool highlights | `Hollow`, `Cold`, `Veiled`, `Buried` |
| `Empty` | centerless pale reed-shell with no low shadow and a visible quiet middle chamber | pale blue-gray, icy cyan, frost white, soft navy, sparse lavender | `Thin`, `Hollow`, `Distant`, `Cold` |
| `Faded` | washed-out thread creature with erased edges, missing low shadow, and dimming treble specks | desaturated blue-gray, faded cyan, soft slate, weak silver, muted lavender | `Dull`, `Distant`, `Veiled`, `Empty` |
| `Powerful` | broad mountain-monolith creature with a steady glowing core | dark navy, deep brown, burnt orange, muted purple, amber core glow | `Rumble`, `Exciting`, `Impactful`, `Aggressive` |
| `Impactful` | friendly rounded mallet striking a soft glowing contact pad at one clear point | chestnut, orange, warm gold, dark plum, dusty shadow | `Thump`, `Punchy`, `Powerful`, `Aggressive` |
| `Canned` | sealed generic tin can with a trapped sound sprite and tight internal echo marks | muted silver, brass, cool blue shadows, tin highlights, small warm glints | `Boxy`, `Tinny`, `Metallic`, `Cupped` |
| `Reedy` | dry reed-pipe spirit with a squared base, nasal tube, and one scratchy mouth edge | dry straw, cardboard tan, muted brass, olive shadow, acid amber, pale cyan | `Tubular`, `Canned`, `Thin`, `Brassy` |
| `Brittle` | delicate cracked icy shell creature with hairline stress marks | icy blue, pale white, cool gray, faint violet, navy outline | `Thin`, `Sibilant`, `Cold`, `Crisp` |
| `Woolly` | fuzzy wool-covered heavy creature | warm gray, muted brown, dusty orange, plum | `Muffled`, `Thick` |
| `Fatiguing` | tired character under too many pressure rays | hot yellow, orange, icy blue streaks, white glare | `Aggressive`, `Harsh` |
| `Cold` | tiny hollow sound sprite half-sunk in a soft snowdrift with exposed cold air above | pale blue, icy cyan, white snow, muted lavender, cool gray, navy accents | `Thin`, `Hollow`, `Airy`, `Scooped`, `Empty` |
| `Veiled` | clear character behind translucent curtain | dusty blue-gray, muted beige, olive-brown, navy | `Dull`, `Muffled` |
| `Energetic` | bouncing bass creature with treble sparks | cobalt shadow, burnt orange, bright gold, purple | `Exciting`, `Punchy` |
| `Vintage` | old-radio cushion or sepia speaker spirit | sepia, warm brown, muted orange, cream | `Warm`, `Mellow` |
| `Congested` | traffic-jam cluster of overlapping sound blobs | muddy brown, olive-gray, muted orange, dark purple | `Muddy`, `Buried` |
| `Plasticky` | hollow toy-like synthetic shell | toy blue, pale cyan, cool gray, muted pink-orange | `Tinny`, `Cold` |
| `Exciting` | grounded force with airy sparks lifting upward | deep navy, burnt orange, bright gold, pale cyan | `Energetic`, `Powerful` |
| `Buried` | tiny character mostly hidden under heavy layers | dark brown, muddy orange, muted olive, faint amber | `Muddy`, `Muffled` |
| `Piercing` | thin hollow shell crossed by bright sound beam | electric blue, icy white, pale yellow glare, navy | `Sibilant`, `Harsh` |

### 6.2 Bonus Alias Descriptor Locks
These icons are bonus post-game rewards for absorbed source labels and pure aliases. They should feel related to the mapped basic descriptor, but they still need their own readable silhouette so the reward set does not look like simple duplicates.

| Alias descriptor | Maps back to | Unique character / silhouette lock | Unique palette lane | Must not look like |
|---|---|---|---|---|
| `Droning` | `Rumble` | long horizontal low hum-bar spirit with slow continuous rings | deep oxblood, muted purple, low ember, dark brown | `Rumble`, `Thump`, `Boomy` |
| `Lacking` | `Thin` | pale sound silhouette with a missing lower-body cutout | icy blue, pale gray, soft navy, empty white | `Thin`, `Weak`, `Hollow` |
| `Weak` | `Thin` | tiny underpowered sound ember with drooping wave tail | washed-out cyan, weak cream glow, cool gray, navy outline | `Thin`, `Lacking`, `Dull` |
| `Colored` | `Honky` | small sound sprite seen through a stained midrange lens | olive gold, muted magenta, brass beige, teal shadow | `Honky`, `Nasal`, `Bright` |
| `Presence` | `Shouty` | small sound figure stepping forward into a focused spotlight halo | amber yellow, warm white, orange, red-brown shadow | `Shouty`, `Aggressive`, `Bright` |
| `Dark` | `Dull` | charcoal eclipse orb swallowing tiny top-light sparkles | charcoal blue, muted violet, dusty navy, dim cream | `Dull`, `Muffled`, `Veiled` |

## 7. Lighting And Texture
The sample icons are not flat vector icons. They have a storybook / painterly finish.

Lighting traits:
- soft glow around the main metaphor or audio cue
- local light source tied to the sound
- subtle vignette or edge darkening
- gentle bloom on bright areas
- highlights along the most important sound-shaped edge

Texture traits:
- hand-painted grain
- brushy edges
- slightly imperfect outlines
- soft paper/canvas feel
- no sterile geometric precision

Do:
- use painterly gradients
- use soft shadows
- use subtle grain
- let edges breathe

Avoid:
- hard glossy 3D plastic
- pure flat vector icons
- photorealistic objects
- cluttered texture that hides the main metaphor or audio cue
- tiny details that disappear in the UI

## 8. Detail Density
The warm sample is rich, but still readable because the main idea is simple: glowing waveform wrapped in warmth.

The thin sample is sparse, and that sparseness is the point.

Rule:
- Match detail density to descriptor meaning.
- More body/energy can support more visual material.
- Less body/detail should use more empty space.

Examples:
- `Warm`: rich background, blanket, glow, particles
- `Thin`: empty field, small narrow character
- `Rumble`: heavy ground, low waves, warm underground shadow, large slow shapes
- `Airy`: open sky, floating particles, high negative space
- `Congested`: more overlapping forms, but keep the main metaphor readable

## 9. Emotional Translation Rules
Every icon should carry an emotional verb.

Examples:

| Descriptor | Emotional verb |
|---|---|
| `Rumble` | trembles, rolls, awakens underground |
| `Thump` | hits, bounces, lands |
| `Boomy` | blooms, swells, overflows |
| `Punchy` | snaps, kicks, pops forward |
| `Thin` | shivers, stretches, weakens |
| `Muddy` | smears, clouds, sinks |
| `Warm` | hugs, glows, comforts |
| `Boxy` | traps, encloses, boxes in |
| `Hollow` | echoes, collapses inward, leaves clothing without body |
| `Honky` | funnels, honks, projects |
| `Nasal` | pinches, squeezes, buzzes |
| `Shouty` | pushes, yells, leans forward |
| `Harsh` | scrapes, strains, cuts |
| `Dull` | covers, dims, blunts |
| `Glassy` | reflects, glints, hardens |
| `Sibilant` | hisses, sparkles, slices |
| `Bright` | shines, flashes, opens |
| `Airy` | floats, breathes, lifts |

## 10. Prompt Template
Use this template when generating a new descriptor icon.

```text
Create a 1254 x 1254 square descriptor icon for "[DESCRIPTOR]".
No text or letters.
Use a strong visual metaphor for the sound quality: [SIMPLE PHYSICAL METAPHOR].
Unique silhouette: [LOCKED CHARACTER / PROP SHAPE FROM SECTION 6.1].
Unique palette lane: [LOCKED COLOR FAMILY FROM SECTION 6.1].
Use waveform lines, vibration marks, tremor rings, particles, or glow as supporting audio cues.
The image should visually feel like [EMOTIONAL VERB / AUDIO MEANING].
Style: hand-painted storybook icon, soft glowing light, rounded expressive shapes,
subtle brush texture, readable at small size, centered composition, full square canvas.
Palette: [DESCRIPTOR PALETTE].
Environment/metaphor: [SIMPLE PROP OR SCENE].
Keep the sound-quality metaphor prominent and immediately readable.
Avoid looking like: [NEAREST NEIGHBOR DESCRIPTORS FROM SECTION 6.1].
Avoid photorealism, hard vector flatness, clutter, text, labels, transparent corners,
and tiny unreadable detail.
```

## 11. Example: Rumble Icon Direction
`Rumble` should not look sharp or high-frequency. It should feel low, wide, and heavy.

Recommended visual metaphor:
- a rounded chunk of ground or dark landscape gently shaking from below
- wide slow vibration waves passing under the surface
- soft horizontal tremor lines around the base
- faint glowing low-end energy below the ground
- heavy soft ground shadow
- dust particles used lightly as supporting motion cues
- character: a sleepy, heavy ground-spirit face subtly embedded in the landscape, not a separate mascot

Character rule for `Rumble`:
- A character is the current preferred direction because it helps the collection feel like a family.
- The character should be the ground itself, or a low rounded ground-spirit sitting inside the ground.
- The character should feel massive, calm, and slow rather than cute in a bouncy way.
- The expression should be sleepy, grounded, relaxed, or quietly powerful.
- Avoid a tall waveform character; that reads too high-frequency and too similar to `Thin`.
- Avoid arms/legs unless they are extremely subtle, because they can make `Rumble` feel active instead of heavy.

Current recommended prompt:

```text
Create a 1254 x 1254 square descriptor icon for "Rumble".
No text or letters.
Show deep low-frequency vibration as a physical underground force, but include
a subtle character so it belongs to a family of expressive descriptor icons.
The character should be a sleepy, massive ground-spirit embedded in a broad
rounded chunk of dark earth or low landscape. Its face should be simple and
calm, almost carved into the ground surface, with tiny relaxed eyes and a slow
heavy expression. The character is the landscape, not a separate mascot.

Use wide slow vibration waves passing underneath the ground, soft horizontal
tremor lines around the base, subtle tremor rings, faint glowing low-end energy
below the surface, and a few dust particles as supporting audio cues. Do not
make a tall waveform character the main subject. Keep all forms low, wide,
rounded, heavy, continuous, and subterranean, like distant thunder, an engine
idling, or bass moving through the floor.

Style: soft hand-painted digital illustration, charming storybook icon style,
tactile shading, subtle brush grain, soft glowing light, readable silhouette at
small size, centered composition, full square canvas.
Palette: dark red, burnt orange, brown, muted purple, warm shadow tones, faint
ember glow.
The icon should feel massive and calm, not explosive.
Avoid photorealism, hard vector flatness, clutter, text, labels, numbers,
technical audio charts, transparent corners, and baked rounded-corner frames.
```

## 12. Do And Do Not
Do:
- make every icon feel like an emotional sound-quality metaphor
- keep audio cues visible enough to connect the image back to sound
- use color to communicate frequency and mood
- use soft painterly texture
- preserve readability at small size
- give each descriptor one strong metaphor
- fill the full square PNG without baking in rounded corners

Do not:
- add text labels inside icons
- make icons look like technical EQ diagrams
- overuse generic speaker symbols
- force every icon into the app's blue theme
- use the same background for every descriptor
- hide the sound metaphor in too much environment detail
- rely on tiny facial expressions as the only descriptor cue
- export transparent or pre-rounded PNG corners

## 13. Collection Consistency Checklist
Before accepting a new icon, check:
- Is it square and usable at `1254 x 1254`?
- Does it have no text?
- Is there a visible audio cue, such as waveform lines, vibration marks, rings, particles, or glow?
- Is the sound-quality metaphor prominent enough to read before the decorative details?
- Does the emotional metaphor match the descriptor?
- Does the palette fit the descriptor family?
- Does it still read at `48 x 48`?
- Does it feel like the same family as `warm.png` and `thin.png`?
- Does the palette serve the descriptor rather than obeying a global color ban?
- Does it leave enough safe margin for rounded UI cards?
- Is the PNG fully filled as a square image, with no transparent or baked rounded corners?

## 14. Icon Prompt Catalog
These prompts are intended to be copy-pasteable starting points for descriptor card icons: the `59` Spectral primary icon targets, the `6` bonus alias targets, and the current Spatial, Dynamic, and Integrity MVP card extensions.

Global requirements for every prompt:
- output should be `1254 x 1254`
- no text, labels, numbers, letters, or UI glyphs
- full square canvas, no transparent corners
- no baked rounded-corner mask
- soft hand-painted digital illustration
- charming storybook icon style
- tactile shading and subtle brush grain
- readable at small size
- sound-quality metaphor first, audio cue second
- preserve the descriptor's unique silhouette and palette lock from Section 6.1
- avoid reusing the squat rounded `Thump` body unless the descriptor is `Thump`
- when two icons look close, change the primary prop or body shape before changing small details

### 14.1 Spectral Basic Descriptor Card Prompts

#### Rumble
```text
Create a 1254 x 1254 square descriptor icon for "Rumble". No text or letters. Show deep low-frequency vibration as a physical underground force, but include a subtle character so it belongs to a family of expressive descriptor icons. The character should be a sleepy, massive ground-spirit embedded in a broad rounded chunk of dark earth or low landscape. Its face should be simple and calm, almost carved into the ground surface, with tiny relaxed eyes and a slow heavy expression. The character is the landscape, not a separate mascot. Use wide slow vibration waves passing underneath the ground, soft horizontal tremor lines around the base, subtle tremor rings, faint glowing low-end energy below the surface, and a few dust particles as supporting audio cues. Keep all forms low, wide, rounded, heavy, continuous, and subterranean, like distant thunder, an engine idling, or bass moving through the floor. Style: soft hand-painted digital illustration, charming storybook icon style, tactile shading, subtle brush grain, soft glowing light, readable silhouette at small size, centered composition, full square canvas. Palette: dark red, burnt orange, brown, muted purple, warm shadow tones, faint ember glow. The icon should feel massive and calm, not explosive. Avoid photorealism, hard vector flatness, clutter, text, labels, numbers, technical audio charts, transparent corners, and baked rounded-corner frames.
```

#### Thump
```text
Create a 1254 x 1254 square descriptor icon for "Thump". No text or letters. Show a short low-bass impact as a soft heavy landing. The main metaphor should be a rounded padded drum-stone or squat sound creature gently bouncing into the ground, with one clear compression moment rather than an explosion. Add low circular impact ripples, a soft ground dent, tiny dust puffs, and one or two thick downward motion curves as supporting audio cues. The character should feel sturdy, friendly, compact, and physical. Style: soft hand-painted storybook icon, tactile shading, subtle brush grain, readable at small size, centered full square canvas. Palette: deep umber, muted orange, warm brown, dusty violet shadows, small golden impact glow. Avoid sharp spikes, aggressive blast effects, photorealism, technical charts, text, transparent corners, and baked rounded-corner frames.
```

#### Boomy
```text
Create a 1254 x 1254 square descriptor icon for "Boomy". No text or letters. Show excessive low-mid resonance as a hollow swollen cave-bell creature: a big rounded blue-plum cavern body with a soft sleepy face inside the dark mouth, gently bulging outward as if sound is lingering too long in an empty room. Use broad internal echo arcs, slow oval pressure halos, and a faint copper glow deep inside the cavity as supporting audio cues. The icon should feel large, round, hollow, lingering, and over-resonant, not like a physical hit and not like open airy wind. Style: soft hand-painted storybook icon, rounded forms, tactile shading, subtle brush grain, centered full square canvas, readable at small size. Palette: midnight teal, deep indigo, smoky violet, desaturated slate blue, small muted copper/amber interior glow only. Avoid ground impact dents, dust-puff explosions, punchy downward arrows, bright sky-blue air trails, feathers, sharp peaks, hard vector geometry, text, labels, transparent corners, and baked rounded-corner frames.
```

#### Punchy
```text
Create a 1254 x 1254 square descriptor icon for "Punchy". No text or letters. Show tight bass attack as a friendly oversized boxing-glove sound creature snapping forward in a quick controlled jab. The glove should be the main character: rounded, padded, compact, with a tiny confident face or bright focused eyes worked into the glove surface. Use short forward motion streaks, compressed pressure arcs, a small golden transient flash near the glove front, and a tight shadow behind it as supporting audio cues. The icon should feel fast, clean, percussive, and controlled, like a snappy kick-drum punch, not a heavy landing. Style: soft hand-painted storybook icon, tactile padded leather shading, subtle brush grain, centered full square canvas, readable at small size. Palette: bold red-orange glove, warm amber highlights, chestnut brown, deep plum shadows, small golden attack flash. Avoid realistic fighting scenes, injured targets, weapons, gore, ground impact dents, dust-puff explosions, slow bouncing springs, text, labels, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Thin
```text
Create a 1254 x 1254 square descriptor icon for "Thin". No text or letters. Show reduced body and missing low-end weight as a fragile paper-thin icy sound sprite: a narrow translucent blue character made from a folded ribbon, reed, or glassy sliver, shivering inside a roomy cold space. The character should have a tiny worried face and a very slim silhouette, but it should still feel like a charming storybook creature rather than a technical waveform. Use faint cold breath wisps, tiny brittle wave threads, a weak narrow shadow, and pale empty space around the body as supporting audio cues. The icon should feel body-light, delicate, underfilled, and slightly cold, not airy, bright, or sharp. Style: soft hand-painted storybook icon, tactile translucent shading, subtle brush grain, centered full square canvas, readable at small size. Palette: icy cyan, pale blue, blue-white frost, soft gray-blue shadows, small dark navy facial accents. Avoid making the waveform the main character, decorative white script lines, rounded border frames, heavy bass shapes, warm orange glow, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Muddy
```text
Create a 1254 x 1254 square descriptor icon for "Muddy". No text or letters. Show upper-bass cloud and masked clarity as a soft sound creature sinking into thick mud or cloudy brown fog. The main shape should be rounded and partly obscured, with sleepy eyes barely visible through the murk. Use slow blurred wave rings, soft splashes, smudged edges, and muted particles as supporting audio cues. The image should feel heavy, cloudy, and unclear, not dirty in a gross way. Style: soft hand-painted storybook icon, tactile shading, brush grain, centered full square canvas, readable at small size. Palette: olive-brown, muted teal, dark umber, gray-green haze, small dull amber highlights. Avoid sharp details, bright clean sparkles, text, labels, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Warm
```text
Create a 1254 x 1254 square descriptor icon for "Warm". No text or letters. Show pleasant low-mid body as a cozy rounded hearth-sound creature wrapped in a thick knitted scarf or blanket. The main character should feel soft, full, and gently glowing, like a small golden ember tucked safely inside warm fabric, with closed relaxed eyes and a calm smile. Use broad rounded body shapes, soft amber bloom, tiny ember particles, gentle low-mid wave arcs, and plush fabric folds as supporting audio cues. The icon should feel comfortable, full-bodied, protected, intimate, and golden, not hot, fiery, aggressive, or boomy. Style: soft hand-painted storybook icon, tactile knitted fabric shading, rich painterly glow, subtle brush grain, centered full square canvas, readable at small size. Palette: deep plum shadows, maroon fabric, glowing orange, honey gold, soft brown, warm amber highlights. Avoid making the waveform the main character, sharp peaks, flames as the main metaphor, excessive red heat, technical charts, text, labels, numbers, transparent corners, and baked rounded-corner frames.
```

#### Boxy
```text
Create a 1254 x 1254 square descriptor icon for "Boxy". No text or letters. Show low-mid enclosure as a living cardboard box or small wooden cabinet, not as a round creature sitting inside a box. The box itself should be the character: a softly squared open cube with rounded flaps, a simple face formed from fold lines or inner shadow, and a compressed rectangular silhouette that reads immediately as a box at thumbnail size. Use square-ish echo loops bouncing between the walls, soft internal shadows, short trapped vibration marks, and muted cardboard/wood texture as supporting audio cues. The icon should feel enclosed, colored, low-mid resonant, and slightly cardboard, not like a padded drum-stone, not hollow-empty, and not metallic-canned. Style: soft hand-painted digital illustration, tactile cardboard/wood shading, rounded storybook charm, subtle brush grain, centered full square canvas, readable at small size. Palette: cardboard tan, honey oak, muted orange, dusty purple interior shadows, small dull golden highlights. Avoid a squat round blob body, drum-pad cap, thump landing pose, metal cans, open cave mouths, sharp industrial boxes, realistic shipping labels, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Hollow
```text
Create a 1254 x 1254 square descriptor icon for "Hollow". No text or letters. Show missing body and scooped-out tone as an empty sweater or collapsed soft coat with no person inside. The garment itself should be the character: a pale blue-gray sweater-shaped sound outline slumping gently, sleeves loose, center visibly vacant, with a tiny quiet face suggested by folds in the cloth. Use faint echo arcs passing through the empty torso, cool mist, thin blue wave threads, and a weak inner glow that fades before filling the center as supporting audio cues. The icon should feel underfilled, body-scooped, distant, and missing warmth, like the sound has outer shape but no inner body. Style: soft hand-painted storybook icon, tactile soft-cloth shading, subtle brush grain, centered full square canvas, readable at small size. Palette: pale blue-gray cloth, muted lavender, cool cyan mist, soft navy shadows, faint white highlights. Avoid moon or crescent shapes, large circular open mouths, dark swollen cave-bell bodies, shell/ceramic bowl silhouettes, concentric tunnel interiors, cardboard boxes, metallic cans, warm bass glow, ground impact marks, thump-like squat bodies, airy feathers, clutter, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Honky
```text
Create a 1254 x 1254 square descriptor icon for "Honky". No text or letters. Show cupped midrange projection as a friendly vintage squeeze-horn creature: a rounded olive rubber bulb attached to a flared brass bell, angled slightly forward as if it is making a comic midrange "honk". The horn itself should be the character, with a tiny amused face on the bulb or bell rim, and a clear bulb-plus-bell silhouette readable at thumbnail size. Use curved mid-frequency wave arcs coming out of the bell, compressed projection lines, brass glow, and a few warm pulsing particles as supporting audio cues. The icon should feel colored, nasal-adjacent, tube-like, and funny, but not harsh and not anatomical. Style: soft hand-painted storybook icon, tactile rubber-and-brass shading, subtle brush grain, centered full square canvas, readable at small size. Palette: brass yellow, muted gold, olive rubber, warm brown shadows, soft orange highlights. Avoid realistic trumpets, realistic noses, cupped hands, bowl shapes, megaphones, sharp harsh rays, technical charts, text, labels, numbers, transparent corners, and baked rounded-corner frames.
```

#### Nasal
```text
Create a 1254 x 1254 square descriptor icon for "Nasal". No text or letters. Show nasal coloration as a stylized rounded nose-shaped sound character, charming and symbolic rather than realistic anatomy. The main character should be a soft yellow-green nose form with a pinched bridge, two simple dark nostril dots, and a tiny puckered expression worked into the shape. The silhouette should be immediately readable as a nose at thumbnail size, while still feeling like a playful audio descriptor icon. Use narrow buzzing lines around the bridge, tiny pressure ticks, small cyan resonance speckles, and cramped wave threads passing through the nostril area as supporting audio cues. The icon should feel funny, colored, pinched, and nasal-adjacent, but not gross, medical, or horn-like. Style: soft hand-painted storybook icon, tactile rounded shading, subtle brush grain, centered full square canvas, readable at small size. Palette: muted yellow-green, brass beige, olive shadows, warm tan haze, small cyan buzz accents. Avoid photorealistic noses, detailed nostril anatomy, medical imagery, mucus, horn bells, squeeze horns, cupped hands, long ribbons, pure TV static, glitch UI, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Shouty
```text
Create a 1254 x 1254 square descriptor icon for "Shouty". No text or letters. Show forward vocal presence as a small open-mouth sound character leaning into an oversized cone of warm sound pressure. The character should be compact but visibly projecting: tiny body behind the cone, round open mouth, raised brows, and a bright amber vocal beam widening toward the viewer. Use forward pressure arcs, short breath marks, warm spotlight glow, and stacked midrange wave bands as supporting audio cues. The icon should feel too forward, vocal, pushy, and loud, but still charming and non-violent. Style: soft hand-painted storybook icon, tactile shading, subtle brush grain, centered full square canvas, readable at small size. Palette: bright yellow, amber, warm orange, dark red-brown shadows, small white-hot highlights. Avoid charging action poses, boxing gloves, weapons, angry attack imagery, scratchy harsh shards, megaphones with text, labels, numbers, technical charts, photorealism, transparent corners, and baked rounded-corner frames.
```

#### Harsh
```text
Create a 1254 x 1254 square descriptor icon for "Harsh". No text or letters. Show upper-mid edge and listening discomfort as a jagged sandpaper scrape-shard creature: a rough torn strip of glowing yellow-orange texture being dragged across a dark surface, with a tiny strained face embedded in the scrape mark. The silhouette should feel abrasive, scratchy, and uneven, with rough edges and tense angular posture, but still charming and storybook rather than scary. Use angular scratch trails, tight pressure lines, hard white-yellow highlights, small rusty sparks, and rough grain texture as supporting audio cues. The icon should feel scratchy, strained, edgy, and fatiguing, not vocal like "Shouty", not reflective like "Glassy", and not needle-like like "Piercing". Style: soft hand-painted storybook icon with gritty tactile texture, subtle brush grain, centered full square canvas, readable at small size. Palette: acid yellow, burnt orange, rusty brown, dark plum shadows, bright white highlights. Avoid vocal cones, open shouting mouths, icy needle beams, clean sparkles, glass pane reflections, gore, violence, weapons, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Dull
```text
Create a 1254 x 1254 square descriptor icon for "Dull". No text or letters. Show broad loss of brightness and detail as a sleepy frosted lantern or dim matte lamp character with a weak blunted glow. The lantern should be the main metaphor: rounded, low-contrast, heavy-lidded, with a tiny tired face on the frosted glass and a soft shade that prevents any sharp sparkle from escaping. Use weak fading wave lines, low-contrast dust, softened edges, and a tiny desaturated inner glow as supporting audio cues. The icon should feel subdued, darkened, softened, and detail-poor, like the treble has been rounded off, not blocked by fabric and not hidden behind a veil. Style: soft hand-painted storybook icon, matte frosted-glass shading, subtle brush grain, centered full square canvas, readable at small size. Palette: charcoal blue, muted gray, dusty navy, soft brown shadows, tiny desaturated cream highlight. Avoid blankets, cotton covers, translucent curtains, bright sparkles, sharp lines, open flames, shiny glass, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Sibilant
```text
Create a 1254 x 1254 square descriptor icon for "Sibilant". No text or letters. Show sharp consonant hiss as a tiny icy whisper-sprite with a narrow slit-like mouth releasing thin silver-blue ribbon trails. The main metaphor should be high-frequency hissing air: precise, narrow, bright, and consonant-focused, like cold air escaping through a tiny gap. Use fine pale-cyan hiss ribbons, bright pinpoints, narrow high-treble streaks, and tiny frost sparkles as supporting audio cues. The icon should feel crisp and hissy, but not painful, not wet, and not explosive. Style: soft hand-painted storybook icon, tactile icy shading, subtle brush grain, centered full square canvas, readable at small size. Palette: icy white, electric blue, pale cyan, dark navy outline, silver highlights. Avoid actual letter shapes, saliva droplets, spray particles, needle beams, harsh scrape shards, large open shouting mouths, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Glassy
```text
Create a 1254 x 1254 square descriptor icon for "Glassy". No text, labels, letters, numbers, EQ curves, meters, or technical charts. Show hard reflective upper-treble sheen as a small living glass-pane sound creature: a smooth rounded diamond/vertical pane sprite, mostly transparent, with a tiny calm face visible as a faint reflection inside the pane rather than painted on the surface. The silhouette should read as one intact polished pane or lens, not a broken shard and not a metal object. Give the pane crisp cyan-white rim highlights, mirror-like glints on two corners, faint internal refraction bands, and a few tiny pale-blue prism flecks that feel like upper-treble reflections. The sound feeling should be hard, smooth, artificial, reflective, and slightly cold: a glazed surface added to the music.

Keep Glassy distinct from nearby treble cards. It is not Harsh: no sandpaper scrape texture, rusty orange grit, or jagged torn edge. It is not Sibilant: no slit-mouth hiss ribbons, air leaks, or consonant spray. It is not Bright: no broad sun orb, open golden crown, or warm cheerful bloom. It is not Crisp: no snapped leaf, paper edge, or fresh crunchy shape. It is not Metallic: no chrome tuning fork, steel hardware, or ringing metal halo. Style: soft hand-painted storybook collectible-card icon with translucent glass shading, subtle brush grain, centered full square canvas, readable at small size. Palette: icy cyan, glass blue, cool white, pale violet, deep navy shadow, tiny electric-cyan edge accents. Avoid dangerous broken glass realism, shattered fragments everywhere, needle beams, fire, weapons, gore, text, labels, numbers, technical UI, transparent corners, and baked rounded-corner frames.
```

#### Bright
```text
Create a 1254 x 1254 square descriptor icon for "Bright". No text or letters. Show broad pleasant top-end shine as a cheerful sun-prism sound orb opening upward. The orb should be the main character: rounded, clear-eyed, glowing with a wide soft crown of pale gold and cyan light, like detail and shine becoming more visible. Use broad soft rays, clean sparkles, high-positioned light particles, gentle upward wave arcs, and a few prism-like cyan-gold highlights as supporting audio cues. The icon should feel open, clear, lively, and polished, not painful, not sharp, and not weightless. Style: soft hand-painted storybook icon, luminous tactile shading, subtle brush grain, centered full square canvas, readable at small size. Palette: sky blue, pale gold, warm white, soft cyan, gentle navy shadows. Avoid feathers, breeze ribbons, airy floating clouds, crackle marks, needle beams, aggressive spikes, harsh glare, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Airy
```text
Create a 1254 x 1254 square descriptor icon for "Airy". No text or letters. Show high-treble openness as a translucent feather-cloud breeze spirit floating in a wide open sky. The spirit should be the main character: soft, weightless, gently smiling, made from pale feather tufts and transparent breeze ribbons, with lots of calm negative space around it. Use delicate high wave wisps, tiny star dust, faint upward motion trails, and barely visible cyan-gold shimmer as supporting audio cues. The icon should feel spacious, extended, breathing, and light, but not weak, lonely, hollow, or thin. Style: soft hand-painted storybook icon, airy translucent shading, subtle brush grain, centered full square canvas, readable at small size. Palette: pale sky blue, white, soft cyan, faint gold, gentle lavender shadows. Avoid bright sun-orb centers, strong prism beams, heavy ground, crescent/moon shapes, empty sweaters, skinny reed characters, sharp needles, clutter, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

### 14.2 Spectral Discovery Descriptor Card Prompts

#### Tinny
```text
Create a 1254 x 1254 square descriptor icon for "Tinny". No text or letters. Show weak body plus upper edge as a tiny fragile sound spirit rattling inside a thin dented metal cup or small shallow tin shell. The cup should be the main metaphor: light, cheap, hollow, slightly wobbly, with thin walls and a small anxious face or tiny spirit visible inside. Use thin rattling lines, pale echo arcs, small cool metallic highlights, and narrow high-frequency glints as supporting audio cues. The icon should feel light-bodied, hollow, cheap-metal resonant, and slightly fragile, not fully enclosed like "Canned" and not polished/ringing like "Metallic". Style: soft hand-painted storybook icon, tactile thin-metal shading, subtle brush grain, centered full square canvas, readable at small size. Palette: pale silver, icy blue, muted gray, navy shadows, small cool white glints. Avoid full tin cans, brand labels, sealed containers, shiny chrome bells, heavy metal machinery, cardboard boxes, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Spitty
```text
Create a 1254 x 1254 square descriptor icon for "Spitty". No text or letters. Show exposed consonants without body as a tiny puckered speech-sprite popping short dry particles from a small pointed mouth. The main metaphor should be quick, dry, consonant-forward speech energy: tiny separated "puh/tss" bursts with missing warmth and little body underneath. Use small bright cyan-white particles, tiny dotted spray arcs, clipped high-frequency tick marks, and a lean underfilled body as supporting audio cues. Keep the bursts short, staccato, and granular, not flowing. The icon should feel crisp, dry, and slightly over-articulated, but not disgusting, wet, angry, or painful. Style: soft hand-painted storybook icon, tactile icy shading, subtle brush grain, centered full square canvas, readable at small size. Palette: icy blue, pale white, cool gray, navy outline, tiny cyan sparks. Avoid gross saliva realism, wet splashes, long flowing hiss ribbons like "Sibilant", tall reed silhouettes like "Thin", metal cups like "Tinny", actual letters, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Metallic
```text
Create a 1254 x 1254 square descriptor icon for "Metallic". No text or letters. Show upper-edge resonance as a small polished chrome tuning-fork spirit with a simple face and two rounded prongs vibrating in the air. The main metaphor should be clean, shiny, ringing metal: cool, reflective, slightly artificial, and more resonant than "Tinny". Use circular ringing halos, sharp cyan glints, tiny reflected amber flecks, and small vibration ticks around the prongs as supporting audio cues. Keep the silhouette elegant and fork-like, not cup-shaped or can-shaped. The icon should feel steely, glassy, and ringing, but not painfully sharp like "Piercing" and not industrial or photorealistic. Style: soft hand-painted storybook icon, tactile reflective-metal shading, subtle brush grain, centered full square canvas, readable at small size. Palette: silver, blue-gray, dark navy, pale cyan highlights, tiny amber reflections. Avoid dented tin cups like "Tinny", sealed food cans like "Canned", brass horns like "Honky", needle beams, realistic machinery, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Full
```text
Create a 1254 x 1254 square descriptor icon for "Full". No text or letters. Show balanced full-spectrum sound as a round complete character with a warm golden lower body, comfortable middle, and clear sky-blue glow at the crown. The main metaphor should be fullness without excess: everything present, centered, supported, and open. Use broad soft wave arcs around the lower half, gentle mid-body warmth, a few small top-light sparkles, and a calm satisfied face as supporting audio cues. Keep the silhouette round and stable but not swollen; it should feel complete rather than heavy. The icon should feel balanced, rich, open, and reassuring, not merely cozy like "Warm", not dense like "Thick", and not inflated like "Bloated". Style: soft hand-painted storybook icon, tactile warm-to-clear shading, subtle brush grain, centered full square canvas, readable at small size. Palette: warm orange, golden yellow, cream, soft sky-blue highlights, plum shadows. Avoid scarves or ember props like "Warm", plush folds or syrup like "Thick", balloon/cloud swelling like "Bloated", harsh shine, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Thick
```text
Create a 1254 x 1254 square descriptor icon for "Thick". No text or letters. Show dense low-mid body as a squat stack of flattened padded cushion-slabs, like heavy folded velvet blankets compressed by their own weight. The main metaphor should be thickness as tactile density: padded, slow-moving, full-bodied, and slightly compressed. Use broad horizontal layer bands, soft fabric folds, slow rounded wave arcs hugging the stack, and deep warm shadow pockets as supporting audio cues. The character can have calm heavy-lidded eyes tucked into the upper cushion, but the silhouette should be wide, low, layered, and stable rather than round and complete. The icon should feel rich, heavy, and substantial, not merely cozy like "Warm", not balanced and open like "Full", not over-inflated like "Bloated", and not sleepy-soft like "Mellow". Style: soft hand-painted storybook icon, tactile dense-fabric shading, subtle brush grain, centered full square canvas, readable at small size. Palette: deep amber, caramel brown, maroon, muted gold, dark plum shadows. Avoid spiral piles, cone shapes, curled peaks, soft-serve shapes, poop-like silhouettes, glossy food syrup, scarves or ember props like "Warm", round full-spectrum orb shapes like "Full", balloon swelling or cloudy bloat like "Bloated", relaxed sunset cloud shapes like "Mellow", sharp attack marks, thin shapes, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Bassy
```text
Create a 1254 x 1254 square descriptor icon for "Bassy". No text or letters. Show low-end bloom plus boxy low-mid enclosure as a rounded bass cushion swelling inside a loose cabinet or box frame. The main metaphor should clearly combine `Boomy + Boxy`: abundant bass weight, broad low waves, and a small-room/cabinet shape around the low mids. Give it a tiny relaxed face tucked into the upper curve, but keep the bass cushion and box frame as the main read. Use wide low wave arcs around the bottom, soft orange bass glow, deep teal shadow, cardboard-tan enclosure edges, and gentle pressure rings as supporting audio cues. The icon should feel bass-heavy and enclosed, not muddy, not cloudy, and not simply Boomy by itself. Style: soft hand-painted storybook icon, tactile cushion-and-cabinet shading, subtle brush grain, centered full square canvas, readable at small size. Palette: deep teal, warm bass orange, muted cardboard tan, plum shadow, low amber glow. Avoid muddy fog, cave-bell bodies, over-inflated balloon seams, upper-bass cloud as the main metaphor, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Vivid
```text
Create a 1254 x 1254 square descriptor icon for "Vivid". No text or letters. Show boosted bass plus bright top clarity as a colorful sound creature with a rounded low-end body and a clean glowing treble crown. The main metaphor should feel lively, saturated, and awake: bigger low color underneath, bright detail above, but no scooped-out middle. Use warm bass ripples around the lower body, small clear top glints above the head, and a confident colorful glow connecting the low and high areas. The icon should feel more colorful than "Bassy", clearer than "Thick", less full-spectrum than "Full", less explosive than "Exciting", and not recessed like retired smile-curve vocabulary. Style: soft hand-painted storybook icon, tactile glowing shading, subtle brush grain, centered full square canvas, readable at small size. Palette: deep teal shadow, warm orange-brown bass glow, pale gold top light, sky-blue highlights, muted plum shadows. Avoid literal EQ graphs, smile curves, hollow valleys, sibilant hiss ribbons, fireworks, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Bloated
```text
Create a 1254 x 1254 square descriptor icon for "Bloated". No text or letters. Show excessive upper-bass bloom as an over-inflated bass-balloon creature with stretched rounded sides, tiny tense seams, and an uneasy puffed face. The main metaphor should be sound with too much swollen body: puffy, pressurized, slow, and slightly uncomfortable, but still charming. Use oversized bulging curves, cloudy lower shadows, amber pressure glow under the surface, slow wobble marks, and wide pressure rings squeezing outward as supporting audio cues. Keep the body balloon-like and taut, not layered or folded. The icon should feel too full and swollen, not powerful, not balanced, and not cozy. Style: soft hand-painted storybook icon, tactile stretched-surface shading, subtle brush grain, centered full square canvas, readable at small size. Palette: burnt orange, muddy brown, muted purple, amber pressure glow, soft gray haze, dark plum outline. Avoid plush cushion stacks like "Thick", balanced round orb shapes like "Full", hollow cave-bell bodies like "Boomy", mountain/heavy-core shapes like "Powerful", explosions, sharp spikes, gross body imagery, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Muffled
```text
Create a 1254 x 1254 square descriptor icon for "Muffled". No text or letters. Show missing detail as a tiny sound creature mostly hidden under a thick padded blanket, with only sleepy eyes or a small dim glow peeking from the folds. The main metaphor should be sound absorbed by soft material: covered, rounded-off, low-contrast, and unable to project. Use weak rounded wave lines that start under the blanket and fade into the fabric, cottony edge texture, muted dust motes, and a dim amber underglow as supporting audio cues. Keep the cover clearly opaque and padded, not transparent. The icon should feel softened and blocked, not just dark like "Dull", not dirty like "Muddy", not behind a thin curtain like "Veiled", and not deeply buried underground like "Buried". Style: soft hand-painted storybook icon, tactile quilted-fabric shading, subtle brush grain, centered full square canvas, readable at small size. Palette: dusty blue-gray, muted brown, charcoal, soft beige, dim amber underglow, soft navy shadow. Avoid clear sparkles, sharp edges, muddy puddles, lanterns, transparent veils, dirt piles, horror imagery, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Mellow
```text
Create a 1254 x 1254 square descriptor icon for "Mellow". No text or letters. Show softened top-end energy as a relaxed sunset-cloud sound character reclining on one soft cushion, with a calm half-smile and sleepy eyes. The main metaphor should be gentle ease: rounded, pleasant, unforced, warm but not hot, soft but not covered. Use slow loose wave arcs, warm haze, muted tiny sparkles, and a soft golden edge glow as supporting audio cues. Keep the character visible and lightly supported by the cushion; do not bury it under fabric. The icon should feel smooth, relaxed, and comfortable, less bright than "Full", less cozy/ember-like than "Warm", less covered than "Muffled", less dark than "Dull", and less dense than "Thick". Style: soft hand-painted storybook icon, tactile cloud-and-cushion shading, subtle brush grain, centered full square canvas, readable at small size. Palette: honey orange, warm beige, dusty rose-brown, dim gold, muted plum shadows. Avoid scarves or ember props like "Warm", padded blankets like "Muffled", frosted lanterns like "Dull", stacked cushion slabs like "Thick", harsh highlights, sharp edges, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Chesty
```text
Create a 1254 x 1254 square descriptor icon for "Chesty". No text or letters. Show warm body plus box resonance as a rounded wooden chest-resonator with a warm glow inside, like a small cedar storage chest humming gently. The main metaphor should feel warm, woody, resonant, and low-mid filled, without becoming merely cozy or muffled. Give the chest soft rounded edges, a tiny calm face suggested by the front grain, and low rounded wave arcs coming from inside. Use honey glow, cedar texture, muted rose shadows, and small warm dust motes as supporting audio cues. The icon should feel like "Warm" meeting "Boxy", but more chest-resonant and less scarf-like, cardboard-like, or hand-cupped. Style: soft hand-painted storybook icon, tactile wood-and-glow shading, subtle brush grain, centered full square canvas, readable at small size. Palette: cedar brown, honey amber, muted rose, plum shadow, warm cream highlights. Avoid anatomical chests, lungs, ribs, scarves like "Warm", cardboard boxes like "Boxy", cupped hands, blankets, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Cupped
```text
Create a 1254 x 1254 square descriptor icon for "Cupped". No text or letters. Show enclosed midrange resonance as a tiny sound spirit sitting inside two oversized mitten-like cupped hands that form a warm acoustic bowl. The main metaphor should be sound shaped by cupped hands around it: focused inward, rounded, hollowed slightly, and colored in the mids. Use curved echo lines bouncing between the palms, small concentrated mid-wave arcs, warm internal shadows, and a cozy but slightly nasal chamber glow as supporting audio cues. Keep the hands stylized, simple, and rounded, not realistic. The icon should feel chambered and hand-held, not box-shaped like "Boxy", not brass-horn-like like "Honky", not nose-shaped like "Nasal", and not metal-container-like like "Canned". Style: soft hand-painted storybook icon, tactile palm-and-chamber shading, subtle brush grain, centered full square canvas, readable at small size. Palette: warm tan, muted orange, soft brown, olive-gold highlights, purple shadows. Avoid realistic fingers, anatomical hand detail, bowls without hands, shells, boxes, horns, noses, tin cans, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Pinched
```text
Create a 1254 x 1254 square descriptor icon for "Pinched". No text or letters. Show tight forward midrange as a tiny yellow-green sound sprite correctly pinched in the front jaws of one single side-view wooden clothespin. The clothespin must be one classic spring clothespin only: exactly two wooden pieces total, one top wooden half and one bottom wooden half, joined by one small brass spring/coil near the middle. The front jaw tips of those two wooden halves should press together around the sprite; the rear ends of the same two wooden halves extend backward as handles. Do not add any extra wooden rail, second peg, duplicate lower stick, stacked parallel clothespin, or third/fourth wooden piece. The sprite should not pass through the spring, hinge, or middle of the clothespin. Place the squeezed sprite at the front mouth of the clothespin, with wide soft ends bulging outside the jaws, a tiny puckered face at the compressed point, and a slightly worried but charming expression. Use small pressure ticks at the jaw tips, narrow pale-blue buzzing lines escaping from the squeeze, and tight midrange wave arcs as supporting audio cues. The icon should feel constricted, squeezed, and slightly nasal-colored without showing a nose. Keep the clothespin friendly, toy-like, mechanically believable, and readable from a clear side view. The icon should read as physically pinched, not abstract, not chambered like "Cupped", not nose-shaped like "Nasal", not brass-horn-like like "Honky", and not abrasive like "Harsh". Style: soft hand-painted storybook icon, tactile wood-and-rubbery-sprite shading, subtle brush grain, centered full square canvas, readable at small size. Palette: yellow-green sprite, warm wood tan, muted beige, brass spring, olive shadows, small pale-blue buzz highlights. Avoid symmetrical butterfly shapes, four-pad clamp layouts, duplicate clothespins, stacked parallel pegs, extra wooden slats, objects threaded through the center, objects pinched at the hinge, medical imagery, realistic noses, nostrils, fingers pinching skin, metal pliers, sharp clamps, horns, cupped hands, scrape shards, pain/gore, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Tubular
```text
Create a 1254 x 1254 square descriptor icon for "Tubular". No text or letters. Show box enclosure plus nasal tube color as a curved hollow tube creature with a softly squared base and a small nasal opening at the front. The main metaphor should feel like sound traveling through a short resonant tube: enclosed, rounded, narrow, and colored, but not fully sealed. Give the tube a tiny face near the opening, compressed midrange wave arcs inside the tube, and pale cyan buzz marks at the mouth. Palette: muted brass, cardboard tan, olive shadow, pale cyan buzz accents, soft brown edges. The icon should feel related to "Boxy" and "Nasal" without becoming "Canned", "Cupped", or "Honky". Style: soft hand-painted storybook icon, tactile tube-and-cardboard shading, subtle brush grain, centered full square canvas, readable at small size. Avoid sealed tin cans, cupped hands, full horn bells, realistic noses, medical tubes, labels, text, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Brassy
```text
Create a 1254 x 1254 square descriptor icon for "Brassy". No text or letters. Show nasal resonance plus hard upper edge as a rounded nasal mask-sprite with a tarnished brass rim and one bright hard edge-glint. The main metaphor should be "Nasal + Harsh": a nose-like compressed mid tone gaining a brassy bite, not broad treble brightness and not shiny chrome metal. Give the sprite a tiny tense face set into the nasal bridge, a small puckered sound opening, tight yellow-green midrange wave arcs, and a few acid-amber edge ticks near the upper rim. Keep the silhouette compact and mask-like rather than horn-like; the brass should be a color and edge feel, not a full instrument. The icon should feel more biting than "Nasal", less cup-shaped than "Honky", less reflective than "Metallic", and less clean-bright than "Sharp". Style: soft hand-painted storybook icon, tactile brass-and-nasal shading, subtle brush grain, centered full square canvas, readable at small size. Palette: tarnished brass, nasal yellow-green, olive shadow, acid amber hard-edge glints, small pale-cyan buzz accents, muted plum shadows. Avoid full trumpet/horn silhouettes, sealed cans, chrome tuning forks, glass shards, sun-prism brightness, realistic noses or nostrils, medical imagery, text, labels, numbers, EQ curves, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Squawky
```text
Create a 1254 x 1254 square descriptor icon for "Squawky". No text or letters. This is an alias icon for "Brassy", so show the everyday-language version of Brassy as a rough brassy bite, not a separate recipe. The main metaphor should feel like a compact vocal sound that has turned brassy and awkward, with a tarnished brass edge and a slightly strained call. Use a small brassy call sprite, squeezed warm mid waves, short acid-amber edge ticks, and a rough little sound opening. The icon should feel more casual and speech-like than "Brassy", less reflective than "Metallic", and less broad than "Sharp". Style: soft hand-painted storybook icon, tactile brass shading, subtle brush grain, centered full square canvas, readable at small size. Palette: brass yellow, burnt orange, olive shadow, acid amber edge light, dark plum shadow, small pale-cyan buzz accents. Avoid full trumpet silhouettes, literal animal mascots, big screaming mouths, weapons, pure jagged shards, polished chrome, sealed cans, realistic instruments, text, labels, numbers, EQ curves, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Cloudy
```text
Create a 1254 x 1254 square descriptor icon for "Cloudy". No text or letters. Show muddy low-mid cloud plus box enclosure as a soft foggy sound creature partly contained inside a simple square-ish mist frame. The main metaphor should feel cloudy and unclear: a rounded creature blurred by olive-brown fog, with compressed box-like echo marks keeping the cloud trapped near the middle. Use slow blurred wave rings, soft gray-green vapor, muted tan wall hints, and dim amber glints as supporting audio cues. The icon should feel like "Muddy" meeting "Boxy", but not as covered as "Muffled" and not as hidden behind a curtain as "Veiled". Style: soft hand-painted storybook icon, tactile fog-and-cardboard shading, subtle brush grain, centered full square canvas, readable at small size. Palette: olive-brown, gray-green fog, muted tan, dark umber, dim amber. Avoid clean sparkles, blankets, transparent veils, sealed cans, sharp edges, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Aggressive
```text
Create a 1254 x 1254 square descriptor icon for "Aggressive". No text or letters. Show forceful forward presence as a compact wedge-shaped sound creature leaning hard into a hot curved wave-front, like it is pushing the sound toward the listener. The main metaphor should be pressure and assertiveness: forward, tense, insistent, and energized without becoming violent. Give the creature a low braced stance, angled eyebrows, a bright hot core, and a rounded triangular body pointing forward. Use stacked forward pressure arcs, short angular motion ticks, hard amber-white edge glow, and compressed heat haze as supporting audio cues. The icon should feel pushy and intense, not vocal like "Shouty", not scratchy like "Harsh", not exhausted like "Fatiguing", and not punch/fist-based like "Punchy". Style: soft hand-painted storybook icon, tactile hot-pressure shading, subtle brush grain, centered full square canvas, readable at small size. Palette: hot yellow, burnt orange, red-brown, dark plum shadows, bright white highlights. Avoid open shouting mouths, vocal cones, boxing gloves, fists, weapons, explosions, jagged scrape shards, tired/drooping fatigue faces, gore, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Shimmering
```text
Create a 1254 x 1254 square descriptor icon for "Shimmering". No text or letters. Show bright treble plus airy extension as a translucent breeze spirit carrying many tiny high glints above the music. The main metaphor should feel sparkly, floating, and treble-positive: clear top shine with open air around it, not harshness or hiss. Use a pale sky-blue feather-cloud body, small gold-white shimmer points, delicate upward wave wisps, and wide calm negative space. The icon should feel like "Bright" meeting "Airy", but not as grounded or forceful as "Exciting" and not as consonant-specific as "Crisp". Style: soft hand-painted storybook icon, tactile translucent shading, subtle brush grain, centered full square canvas, readable at small size. Palette: pale sky blue, white, pale gold, tiny cyan glints, gentle lavender shadow. Avoid harsh shards, sibilant ribbons, sun-orb dominance, cluttered sparkle fields, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Scooped
```text
Create a 1254 x 1254 square descriptor icon for "Scooped". No text or letters. Show a recessed center with open air above it as a hollow bowl-valley sound creature with an airy rim and a quiet empty middle. The main silhouette should clearly read as scooped out: a smooth blue-gray basin or shell with a small pale face near the lower center, a dim center cavity, and a thin gold-cyan air highlight along the upper rim. Use inward echo arcs, missing mid-body space, and a few high airy glints floating above the rim as supporting audio cues. The icon should feel more tonal and mid-scooped than "Hollow", less bass-heavy than old smile-curve vocabulary, less distant than "Distant", and less body-starved than "Cold". Style: soft hand-painted storybook icon, tactile hollow-basin shading, subtle brush grain, centered full square canvas, readable at small size. Palette: blue-gray, icy cyan, pale gold air glints, navy shadow, soft white highlights. Avoid literal EQ graphs, deep bass cliffs, far hallways, snowdrifts, empty clothing, broad bright sun-prism imagery, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Lean
```text
Create a 1254 x 1254 square descriptor icon for "Lean". No text or letters. Show missing body plus exposed clear top as a slim sound sprite with a narrow underfed body, a missing low shadow, and one clean top glint. The main metaphor should feel light, exposed, and analytical: less body than normal, but still clear and awake. Use a tall but not fragile silhouette, faint low-end cutout space under the body, pale blue wave wisps, and a small white-cyan treble highlight above the head. The icon should feel like "Thin" meeting "Bright", but less cracked than "Brittle", less empty than "Cold", and less hard-edged than "Sharp". Style: soft hand-painted storybook icon, tactile translucent shading, subtle brush grain, centered full square canvas, readable at small size. Palette: icy cyan, pale blue, white glint, cool navy, faint silver. Avoid brittle cracks, snowdrifts, sharp folded edges, harsh scrape marks, heavy bass shapes, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Sharp
```text
Create a 1254 x 1254 square descriptor icon for "Sharp". No text or letters. Show clean high-frequency edge as a precise folded cyan-white edge sprite with one bright clean corner and a tiny focused face made from simple dark marks. The main metaphor should feel exact, edged, and high-definition, but not painful, violent, or abrasive. Use a single crisp corner highlight, tight cyan glints, short high-frequency tick marks, and clean narrow wave arcs as supporting audio cues. The icon should feel like a clear edge, not a weapon, needle, scrape, glass pane, or piercing beam. Style: soft hand-painted storybook icon with crisp accents, tactile folded-edge shading, subtle brush grain, centered full square canvas, readable at small size. Palette: icy white, electric cyan, pale yellow glint, dark navy, faint violet shadow. Avoid knives, blades, needles, weapons, needle beams, sound beams like "Piercing", reflective panes like "Glassy", sandpaper shards like "Harsh", wafer snaps like "Crisp", text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Crisp - Wafer Snap
```text
Create a 1254 x 1254 square descriptor icon for "Crisp". No text or letters. Show clean treble detail and transient snap as a thin golden wafer-tile sound sprite with one cleanly snapped corner. The main metaphor should be crisp articulation: dry, light, quick, delicately crunchy, and sharply defined without becoming harsh or brittle. Give the wafer-sprite a small alert face, a simple thin square-or-diamond wafer silhouette, subtle baked texture, one tidy break line at the corner, and tiny bright crumb-like crackle glints that behave like audio particles rather than messy food crumbs. Use fine high-frequency tick marks, pale-blue sparkle particles, soft gold pinpoints, and short clean snap arcs as supporting audio cues. The icon should feel precise and snappy, not natural/leafy, not paper-like, not broad and glowing like "Bright", not hissy like "Sibilant", not abrasive like "Harsh", and not shattered like "Brittle". Style: soft hand-painted storybook icon with crisp highlights, tactile wafer texture, subtle brush grain, centered full square canvas, readable at small size. Palette: pale golden wafer, cream, toasted beige, pale blue shadows, mint-cyan edge glow, navy outline. Avoid leaf silhouettes, folded paper, cookies, chocolate, crumbs as mess, plates, bite marks, sun-prism orbs, long hiss ribbons, jagged scrape shards, shattered glass, many cracks, needle beams, aggressive spikes, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Distant
```text
Create a 1254 x 1254 square descriptor icon for "Distant". No text or letters. Show reduced presence as a tiny sound sprite standing far away at the end of a misty blue hallway or soft foggy valley. The main metaphor should be distance: small scale, lots of quiet foreground space, softened detail, and echoes fading before they reach the listener. Place the character clearly far from the viewer, with a tiny readable face, long soft floor shadow, pale atmospheric perspective, and receding curved walls or valley sides that guide the eye inward. Use faint echo rings around the tiny sprite, small fading wave marks, low-contrast dust motes, and cool mist as supporting audio cues. The icon should feel far-away and recessed, not empty like "Hollow", not icy like "Cold", not hidden behind fabric like "Veiled", and not covered or trapped like "Buried". Style: soft hand-painted storybook icon, tactile misty shading, subtle brush grain, centered full square canvas, readable at small size. Palette: pale blue-gray, muted lavender, fog white, soft navy, dim cool highlights. Avoid empty clothing, frozen ice forms, curtains or gauze screens, dirt piles, buried layers, strong foreground detail, clutter, bright warm glow, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Empty
```text
Create a 1254 x 1254 square descriptor icon for "Empty". No text or letters. Show missing foundation plus missing center body as a pale centerless reed-shell sound creature in a sparse Frosthollow space. The main silhouette should combine `Thin + Hollow`: a narrow underfilled body with no low shadow, plus a visible quiet chamber where the middle should be. Give it a tiny calm, slightly lost face suggested by simple dark marks on the rim of the hollow center. Use lots of negative space, faint inward echo arcs through the open middle, a weak low waveform that fades before reaching the body, and thin icy breath wisps as supporting audio cues. The icon should feel underfilled, unsupported, quiet, and emotionally empty, not far away like "Distant", not top-lit like "Cold", not just a skinny reed like "Thin", and not only an empty sweater like "Hollow". Style: soft hand-painted storybook icon, tactile frost and pale shell shading, subtle brush grain, centered full square canvas, readable at small size. Palette: pale blue-gray, icy cyan, frost white, soft navy shadows, sparse muted lavender. Avoid cracked glass, bright treble glints, snowdrift burial, far hallway perspective, fabric-only sweater imagery, dark covered dullness, literal holes with black voids, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Faded
```text
Create a 1254 x 1254 square descriptor icon for "Faded". No text or letters. Show reduced body plus reduced detail as a washed-out thread-like sound creature whose low shadow and high sparkle are both worn away. The main silhouette should combine `Thin + Dull`: a slim pale body with weak support underneath, softened edges, and tiny treble specks dissolving before they can shine. Give it a small gentle tired face, but make the fading body and vanishing detail the main read. Use erased wave trails, dimmed high-frequency particles, low-contrast mist, and a faint body shadow that tapers off into the Frosthollow background as supporting audio cues. The icon should feel pale, weak, worn down, and washed out, not distant through a hallway like "Distant", not center-scooped like "Empty", not simply dark like "Dull", and not dynamic lifelessness like "Flat". Style: soft hand-painted storybook icon, tactile faded pigment, subtle brush grain, centered full square canvas, readable at small size. Palette: desaturated blue-gray, faded cyan, soft slate, weak silver highlights, muted lavender shadow. Avoid strong sparkle, bright frost shine, curtains or veils, thick blankets, far-door imagery, muddy cover, technical EQ graphs, text, labels, numbers, transparent corners, and baked rounded-corner frames.
```

#### Powerful
```text
Create a 1254 x 1254 square descriptor icon for "Powerful". No text or letters. Show deep low extension plus controlled impact as a broad mountain-monolith sound creature with a steady amber core glowing inside its chest. The main metaphor should be stored strength: large, grounded, confident, composed, and weighty, like a sound with authority and reserve power. Give the creature a wide stable base, rounded rocky shoulders, calm focused eyes, and a vertical monolith silhouette that rises from the ground without looking sharp or aggressive. Use broad low pressure rings at the base, slow ground ripples, a firm dark shadow, subtle amber light leaking from the core, and tiny dust motes as supporting audio cues. The icon should feel powerful but controlled, not explosive, not fast, and not loud for its own sake. It should not feel like "Rumble" underground tremor, not sparkly/upward like "Exciting", not a single hit like "Impactful", and not pushy like "Aggressive". Style: soft hand-painted storybook icon, tactile stone-and-glow shading, subtle brush grain, centered full square canvas, readable at small size. Palette: dark navy, deep brown, burnt orange, muted purple shadows, amber core glow. Avoid low flat ground-spirit chunks like "Rumble", bright airy sparks like "Exciting", mallet/contact-pad hits like "Impactful", forward wedge pressure like "Aggressive", explosions, volcano eruptions, weapons, sharp spikes, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Impactful
```text
Create a 1254 x 1254 square descriptor icon for "Impactful". No text or letters. Show a focused decisive transient as a friendly rounded toy mallet striking a soft glowing contact pad at one clear point. The mallet should be the main character, with a small determined face on the rounded mallet head, angled downward into the pad. The main metaphor should be concentrated impact: clean contact, compact force, fast attack, and controlled weight. Use one bright warm contact flash, tight circular pressure rings around the pad, short downward motion arcs behind the mallet, a small soft ground dent, and a compact shadow as supporting audio cues. Keep the impact precise and contained, not explosive. The icon should feel more decisive than "Thump", more contact-based than "Punchy", less massive than "Powerful", and less pushy than "Aggressive". Style: soft hand-painted storybook icon, tactile padded-wood-and-glow shading, subtle brush grain, centered full square canvas, readable at small size. Palette: chestnut, orange, warm gold, dark plum shadows, dusty brown, small amber-white contact flash. Avoid bouncing squat bodies like "Thump", boxing gloves or fists like "Punchy", mountain-monolith bodies like "Powerful", forward wedge pressure like "Aggressive", weapons, violence, explosions, blast clouds, gore, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Canned
```text
Create a 1254 x 1254 square descriptor icon for "Canned". No text or letters. Show enclosed midrange coloration as one sealed generic tin can with a tiny sound sprite trapped inside, visible through a small dark rim opening or narrow side slit. The can should be the main character: rounded cylindrical body, visible top lid, soft crimped rim, slightly dented sides, and a simple worried face suggested by reflections or by the trapped sprite inside. The main metaphor should be sound sealed in a container: enclosed, artificial, resonant, nasal-mid colored, and slightly boxy-metallic. Use tight internal echo marks bouncing around the can walls, small trapped mid-wave arcs, cool metallic shadows, muted tin highlights, and a few warm glints as supporting audio cues. Keep the can generic and label-free. The icon should feel fully contained, not open and fragile like "Tinny", not polished/ringing like "Metallic", not cardboard/wooden like "Boxy", and not hand-shaped like "Cupped". Style: soft hand-painted storybook icon, tactile tin-can shading, subtle brush grain, centered full square canvas, readable at small size. Palette: muted silver, brass, cool blue shadows, soft gray, small warm highlights. Avoid brand labels, writing, logos, food pictures, open metal cups like "Tinny", tuning forks or chrome bells like "Metallic", cardboard boxes or wooden cabinets like "Boxy", cupped hands, realistic trash cans, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Reedy
```text
Create a 1254 x 1254 square descriptor icon for "Reedy". No text or letters. Show box enclosure plus nasal resonance plus hard edge as a dry reed-pipe spirit with a softly squared base, a narrow nasal tube, and one scratchy mouth edge. The main metaphor should be "Boxy + Nasal + Harsh": a small enclosed pipe tone that feels dry, woody, nasal, and edged, like a reed-like color without requiring a literal instrument. Give the body a compact cardboard-tan base, a straw-brass curved pipe rising from it, a tiny concentrated face near the mouth, pale cyan nasal buzz marks inside the tube, and a few short acid-amber scratch ticks at the opening. Keep the silhouette taller and reed-pipe-like than "Tubular", but still compact and readable as a Canyons discovery. The icon should feel drier and sharper than "Tubular", less sealed than "Canned", less thin/cold than "Thin", and less simple than "Brassy". Style: soft hand-painted storybook icon, tactile dry-reed and boxed-resonator shading, subtle brush grain, centered full square canvas, readable at small size. Palette: dry straw, cardboard tan, muted brass, olive shadow, acid amber edge light, pale cyan buzz accents, muted plum depth. Avoid full clarinets/saxophones, realistic instrument hardware, sealed tin cans, medical tubes, icy thin reed silhouettes, chrome metal, broad bright sparkle, text, labels, numbers, EQ curves, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Brittle
```text
Create a 1254 x 1254 square descriptor icon for "Brittle". No text or letters. Show light body plus exposed high-frequency fragility as a delicate cracked icy shell creature, intact but visibly close to breaking. The main metaphor should feel fragile, dry, rigid, and breakable: a thin pale shell with hairline stress cracks, tiny chipped edges, and a small anxious face peeking from the shell surface. Use fine crackle lines, small glassy shimmer particles, tiny cold snap marks, and pale high-frequency glints as supporting audio cues. Keep the silhouette compact and shell-like, not a tall reed, not a needle beam, and not a fresh crisp leaf or paper snap. The icon should feel fragile and dry, not merely body-light like "Thin", not painful like "Piercing", not frozen-hollow like "Cold", and not clean/snappy like "Crisp". Style: soft hand-painted storybook icon with crisp detail, tactile translucent-shell shading, subtle brush grain, centered full square canvas, readable at small size. Palette: icy blue, pale white, cool gray, faint violet, navy outline. Avoid dangerous broken glass realism, shattered shards everywhere, gore, tall reed silhouettes like "Thin", vertical whistle beams, frozen cave hollows like "Cold", leaf/paper/wafer snap shapes like "Crisp", text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Woolly
```text
Create a 1254 x 1254 square descriptor icon for "Woolly". No text or letters. Show heavy low end plus weak detail as a fuzzy rounded sound creature covered in thick wool fibers. The main metaphor should be soft, heavy, and indistinct. Use broad low waves partly hidden by fuzz, muted dust, and dim warm shadows as supporting audio cues. The icon should feel cozy but over-covered, not clean. Style: soft hand-painted storybook icon, tactile shading, visible brushy fiber texture, centered full square canvas, readable at small size. Palette: muted brown, warm gray, dusty orange, dark plum shadows, low amber glow. Avoid sharp clean lines, text, labels, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Fatiguing
```text
Create a 1254 x 1254 square descriptor icon for "Fatiguing". No text or letters. Show forward presence plus sharp high-frequency pain as a tired sound character under too many bright pressure rays. The character should look worn out with small drooping eyes, surrounded by shouty waves and sibilant spark lines. The metaphor should be listening fatigue, not physical injury. Style: soft hand-painted storybook icon, tactile shading, subtle brush grain, centered full square canvas, readable at small size. Palette: hot yellow, orange, icy blue streaks, dark red-brown shadows, white glare. Avoid horror, gore, text, labels, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Cold
```text
Create a 1254 x 1254 square descriptor icon for "Cold". No text or letters. Show missing body and warmth as a tiny sound sprite half-sunk in a soft snowdrift, with only a small rounded icy face and faint inner glow showing above the snow. The snowdrift is the main metaphor: it absorbs body and warmth, making the sound feel cold, quiet, sparse, and body-light. Keep the sprite isolated but gentle, not scared. The face should match the existing collection language from "Warm", "Cupped", and "Brittle": very small simple dark marks only, tiny sleepy closed-eye arcs, and a tiny restrained mouth. Use thin blue waveform wisps partly buried in the snow, muted vibration arcs absorbed by the drift, tiny falling frost particles, pale high-frequency glints softened by cold air, and open cold negative space above the snowdrift. Keep the icon distinct from "Brittle", "Thin", "Distant", "Hollow", and "Airy": not a cracked shell, not a tall reed, not a far hallway or valley, not empty clothing, and not a feather-cloud breeze spirit. Style: soft hand-painted storybook icon, tactile snow and frost texture, subtle brush grain, centered full square canvas, readable at small size. Palette: pale blue, icy cyan, white snow, muted lavender, cool gray, navy outline accents. Avoid warm blankets, heavy bass shapes, icicle spears, sharp painful beams, large glossy eyes, detailed irises, anime face, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Veiled
```text
Create a 1254 x 1254 square descriptor icon for "Veiled". No text or letters. Show low-mid clutter plus missing clarity as a sound character behind a translucent curtain, gauze, or foggy screen. The main metaphor should be a clear thing obscured by a soft layer. Use muted waves visible through the veil, low contrast particles, and dim glow as supporting audio cues. Style: soft hand-painted storybook icon, tactile shading, subtle brush grain, centered full square canvas, readable at small size. Palette: dusty blue-gray, muted beige, olive-brown, soft navy shadows, faint amber underglow. Avoid crisp sparkles, text, labels, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Energetic
```text
Create a 1254 x 1254 square descriptor icon for "Energetic". No text or letters. Show big low-end impact plus shine as a lively rounded bass creature bouncing forward with bright sparks above it. The main metaphor should be momentum and excitement, but still friendly and musical. Use low impact rings, upward motion arcs, small star-like treble highlights, and warm glow as supporting audio cues. Style: soft hand-painted storybook icon, tactile shading, subtle brush grain, centered full square canvas, readable at small size. Palette: cobalt blue shadow, burnt orange bass glow, bright gold sparkles, warm brown, muted purple. Avoid chaos, explosions, text, labels, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Vintage
```text
Create a 1254 x 1254 square descriptor icon for "Vintage". No text or letters. Show thick low mids plus softened top as a cozy old-radio-like sound spirit or sepia speaker cushion, with no brand or text. The main metaphor should feel warm, aged, rounded, and slightly softened. Use gentle analog glow, rounded wave arcs, paper grain, and subdued highlights as supporting audio cues. Style: soft hand-painted storybook icon, tactile shading, subtle brush grain, centered full square canvas, readable at small size. Palette: sepia, warm brown, muted orange, cream, dark plum shadows. Avoid literal labels, numbers, logos, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Congested
```text
Create a 1254 x 1254 square descriptor icon for "Congested". No text or letters. Show many masking regions plus reduced top clarity as a crowded cluster of rounded sound blobs stuck together in a small space. The main metaphor should be audio traffic jam: overlapping forms, little blocked wave paths, and dimmed top light. Keep the central silhouette readable even with layered details. Style: soft hand-painted storybook icon, tactile shading, subtle brush grain, centered full square canvas, readable at small size. Palette: muddy brown, muted orange, olive-gray, dark purple shadows, dull amber glow. Avoid making it gross or medical, text, labels, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Plasticky
```text
Create a 1254 x 1254 square descriptor icon for "Plasticky". No text or letters. Show low body, scooped center, and artificial upper bite as a hollow toy-like sound shell with shiny synthetic highlights. The main metaphor should feel light, artificial, and slightly fake. Use a smooth plastic surface, hollow center shadow, thin high-frequency glints, and small synthetic wave marks as supporting audio cues. Style: soft hand-painted storybook icon, tactile shading, subtle brush grain, centered full square canvas, readable at small size. Palette: pale cyan, toy blue, muted pink-orange highlights if useful, cool gray, dark navy outline. Avoid brand logos, text, labels, technical charts, photorealistic plastic, transparent corners, and baked rounded-corner frames.
```

#### Exciting
```text
Create a 1254 x 1254 square descriptor icon for "Exciting". No text or letters. Show low-end force plus extended top as a powerful grounded sound creature with bright airy sparks lifting from it. The main metaphor should feel thrilling, open, and big. Use broad low ripples at the base, upward motion, high glitter particles, and a confident glow as supporting audio cues. Style: soft hand-painted storybook icon, tactile shading, subtle brush grain, centered full square canvas, readable at small size. Palette: deep navy, burnt orange, bright gold, pale cyan, muted purple shadows. Avoid explosions, clutter, text, labels, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Buried
```text
Create a 1254 x 1254 square descriptor icon for "Buried". No text or letters. Show too much low/mid masking with reduced clarity as a tiny sound character almost completely covered under layers of earth, fabric, or heavy clouds. Only small eyes or a faint glow should peek through. Use muffled low wave lines trapped below the layers, dust, and dim top light as supporting audio cues. The icon should feel hidden and overloaded, not scary. Style: soft hand-painted storybook icon, tactile shading, subtle brush grain, centered full square canvas, readable at small size. Palette: dark brown, muddy orange, muted olive, deep purple shadows, faint amber glow. Avoid horror, text, labels, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Piercing
```text
Create a 1254 x 1254 square descriptor icon for "Piercing". No text or letters. Show body loss plus stacked upper-mid and treble emphasis as a thin hollow sound shell struck through by a narrow bright beam of sound. The main metaphor should feel sharply penetrating and high, while staying storybook and non-violent. Use tight high-frequency streaks, tiny sparkle shards, a lean body shape, and tense pressure rings as supporting audio cues. Style: soft hand-painted storybook icon with crisp bright accents, tactile shading, subtle brush grain, centered full square canvas, readable at small size. Palette: icy white, electric blue, pale yellow glare, dark navy, muted violet shadows. Avoid weapons, gore, text, labels, technical charts, transparent corners, and baked rounded-corner frames.
```

### 14.3 Spectral Bonus Alias Descriptor Card Prompts

These are post-game reward icons for absorbed alias/source labels. They should be generated only after the main `18` basics and `41` discoveries. Each alias icon should feel connected to its mapped basic family while still reading as a distinct collectible.

#### Droning
```text
Create a 1254 x 1254 square bonus alias descriptor icon for "Droning". No text or letters. Show a continuous low monotone as a long horizontal low hum-bar spirit resting close to the ground, with a tiny sleepy face embedded in the bar and slow rings spreading outward. The main metaphor should feel sustained, deep, repetitive, and unmoving: a drone that does not hit, bounce, or bloom. Use broad low vibration bands, dark ground shadow, faint ember glow inside the hum-bar, and a few slow dust motes as supporting audio cues. The icon should feel related to "Rumble" but more continuous and less subterranean. Style: soft hand-painted storybook icon, tactile low-frequency shading, subtle brush grain, centered full square canvas, readable at small size. Palette: deep oxblood, muted purple, dark brown, low ember orange, soft smoke. Avoid impact marks like "Thump", swollen cave shapes like "Boomy", underground landscape faces like "Rumble", text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Lacking
```text
Create a 1254 x 1254 square bonus alias descriptor icon for "Lacking". No text or letters. Show missing body and foundation as a pale sound silhouette with a clean empty lower-body cutout, like the warmth and weight have been removed. The main metaphor should feel absent, underfilled, and incomplete rather than merely tiny. Use thin blue wave wisps that fade before reaching the bottom, open white negative space inside the missing section, cool shadow, and small weak glints as supporting audio cues. The icon should feel related to "Thin" but more about absence than narrowness. Style: soft hand-painted storybook icon, tactile translucent shading, subtle brush grain, centered full square canvas, readable at small size. Palette: icy blue, pale gray, soft navy, empty white, faint cyan. Avoid tall reed silhouettes like "Thin", empty clothing like "Hollow", drooping weak embers like "Weak", text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Weak
```text
Create a 1254 x 1254 square bonus alias descriptor icon for "Weak". No text or letters. Show low energy and reduced foundation as a tiny underpowered sound ember with a drooping wave tail and a small tired face made from simple dark marks. The main metaphor should feel faint, low-output, and unable to push forward, but still gentle and musical. Use weak fading wave arcs, a small cream glow nearly going out, cool gray haze, and lots of quiet space as supporting audio cues. The icon should feel related to "Thin" and "Lacking" but more emotionally underpowered than physically empty. Style: soft hand-painted storybook icon, tactile dim-glow shading, subtle brush grain, centered full square canvas, readable at small size. Palette: washed-out cyan, weak cream glow, cool gray, navy outline, pale blue shadow. Avoid tall icy reeds, missing cutout silhouettes, dark lanterns like "Dull", text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Colored
```text
Create a 1254 x 1254 square bonus alias descriptor icon for "Colored". No text or letters. Show midrange coloration as a small sound sprite seen through one translucent stained midrange lens. The main metaphor should feel like the sound is tinted: not brighter, not darker, but shifted in color by a resonant mid filter. Use a simple rounded lens shape, subtle olive-gold and muted-magenta color bands, a tiny face softened behind the lens, and curved midrange wave arcs bending as they pass through. The icon should feel related to "Honky" without using a horn, and related to mid color without becoming nasal. Style: soft hand-painted storybook icon, tactile glassy-lens shading, subtle brush grain, centered full square canvas, readable at small size. Palette: olive gold, muted magenta, brass beige, teal shadow, soft amber glints. Avoid rainbow spectacle, bright prism orb like "Bright", squeeze horns like "Honky", nose shapes like "Nasal", text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Presence
```text
Create a 1254 x 1254 square bonus alias descriptor icon for "Presence". No text or letters. Show forward upper-mid presence as a small sound figure stepping forward into a focused warm spotlight halo. The main metaphor should feel close, immediate, and in front of the listener, but not yelling or aggressive. Give the figure a tiny confident face made from simple dark marks, a clear forward posture, and a soft projection halo around the upper body. Use focused amber rays, short forward wave arcs, warm-white edge light, and red-brown shadow behind it as supporting audio cues. The icon should feel related to "Shouty" but less loud and less cone-shaped. Style: soft hand-painted storybook icon, tactile spotlight-and-glow shading, subtle brush grain, centered full square canvas, readable at small size. Palette: amber yellow, warm white, orange, red-brown shadow, dark plum. Avoid oversized vocal cones like "Shouty", pressure wedges like "Aggressive", harsh scrape shards, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Dark
```text
Create a 1254 x 1254 square bonus alias descriptor icon for "Dark". No text or letters. Show reduced treble and missing light as a charcoal eclipse sound orb swallowing tiny top-light sparkles. The main metaphor should feel darkened, shaded, and low-detail, with the high end covered by shadow. Give the orb a tiny sleepy face barely visible in the dim center, a soft rim of muted violet, and a few fading sparkles being absorbed at the edge. Use weak wave arcs, dusty navy atmosphere, and dim cream glints as supporting audio cues. The icon should feel related to "Dull" but more like light being eclipsed than a lantern with weak glow. Style: soft hand-painted storybook icon, matte shadow shading, subtle brush grain, centered full square canvas, readable at small size. Palette: charcoal blue, muted violet, dusty navy, dim cream, soft brown shadow. Avoid frosted lanterns like "Dull", blankets like "Muffled", curtains like "Veiled", horror darkness, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

### 14.4 Shared Spatial, Dynamic, And Integrity MVP Card Rules

These rules extend the same icon language into the first Spatial, Dynamic, and Integrity MVP descriptor cards. They are intentionally not technical diagrams. The generated images should feel like collectible sound-creature cards.

Region-level prompts for all four modules live in Section `15`.

- No text, labels, letters, numbers, UI, meters, EQ curves, graph axes, spectrograms, or technical charts.
- Use square, full-canvas images that the app can crop to cards.
- Keep one strong metaphor per card so the image reads at thumbnail size.
- Keep Spatial focused on position/depth/room, Dynamic on time motion/headroom, and Integrity on independent defects or interruptions.
- Give each aspect a locked color lane like the Spectral region set. Spatial can stay deep teal/indigo with amber/cyan focus glows; Dynamic should use vivid kinetic palettes with hot impact colors and saturated secondary accents; Integrity should feel like contaminated signal ecology: black/charcoal substrate, toxic mint or acid-lime noise glow, ultraviolet/magenta interference, rust/copper hardware faults, black voids, and sharp transient highlights.
- Vivid should come from large readable color shapes, clean beams, broad glows, and strong silhouettes, not from dense pinprick sparkles. Avoid noisy fields of tiny yellow, blue, pink, or white dots unless the descriptor is explicitly a noise artifact.
- For Dynamic and Integrity descriptor cards, keep the image creature-first. The main read should be a living sound creature or fault sprite with a simple face and emotional posture. Springs, pressure plates, ceilings, glass shards, voids, mist, and signal plates are supporting props or body features, not standalone technical objects.
- Match expression to meaning. `Snappy` can look alert, `Softened` calm, `Tight` determined, `Loose` relaxed, `Compressed` patient, `Pumping` concentrated, `Flat` neutral and under-expressive, `Clipped` startled by a hard limit, `Distorted` strained, `Hiss` diffuse and whispery, `Hum` heavy and steady, `Buzz` nervous, `Click` sudden, `Crackle` brittle and twitchy, and `Dropout` interrupted or missing.
- Agent handoff rule: when generating one card, copy that descriptor prompt verbatim and treat `Unique silhouette lock`, `Palette lock`, and `Avoid` as hard constraints. Do not remix the descriptor into another aspect's color lane or turn the creature into a standalone technical object.

### 14.5 Spatial MVP Descriptor Card Prompts

#### Left
```text
Create a 1254 x 1254 square descriptor card image for "Left". No text, labels, letters, numbers, axes, or technical charts. Show a small glowing sound sprite or rounded waveform character clearly pulled toward the left side of a calm stereo stage, with the center line implied only by composition, not a diagram. The right side should feel quieter and more open. Use gentle leftward motion wisps, soft vibration rings, and a subtle amber glow against deep teal-violet space. Style: soft hand-painted storybook game-card art, centered-safe composition, readable at thumbnail size.
```

#### Right
```text
Create a 1254 x 1254 square descriptor card image for "Right". No text, labels, letters, numbers, axes, or technical charts. Show a small glowing sound sprite or rounded waveform character clearly pulled toward the right side of a calm stereo stage, with the left side quieter and more open. Use gentle rightward motion wisps, soft vibration rings, and a subtle amber glow against deep teal-violet space. Style: soft hand-painted storybook game-card art, centered-safe composition, readable at thumbnail size.
```

#### Centered
```text
Create a 1254 x 1254 square descriptor card image for "Centered". No text, labels, letters, numbers, axes, or technical charts. Show a stable glowing sound sprite resting exactly in the middle of a symmetrical listening space, balanced between two softly lit side forms. The sprite should feel anchored and calm, with even circular vibration rings and a clear vertical glow. Style: soft hand-painted storybook game-card art, deep teal and indigo background with warm amber center light, full square canvas, readable at thumbnail size.
```

#### Focused
```text
Create a 1254 x 1254 square descriptor card image for "Focused". No text, labels, letters, numbers, axes, EQ curves, meters, or technical charts. Match the existing Spatial descriptor card style: a small rounded amber sound sprite with a simple calm face, soft painterly brush grain, deep teal-indigo-violet listening-stage space, purple cloud forms near the edges, subtle ground glow, and gentle vibration arcs. Show one centered sprite whose position feels easy to locate because the surrounding amber and pale-cyan arcs are tight, symmetrical, and cleanly converging toward it. The image should communicate stable image focus and clear localization through composition, not through a literal target symbol. Use the same camera distance and calm negative space as `Left`, `Right`, and `Centered`: small-to-medium sprite, centered-safe composition, full square canvas, readable at thumbnail size. Avoid hands, palms, flames, candle shapes, camera lenses, crosshairs, target reticles, weapon sights, oversized cyan circles, magic sigils, harsh sharpness, broad width scenes, blurry haze, text, labels, axes, and technical charts.
```

#### Blurred
```text
Create a 1254 x 1254 square descriptor card image for "Blurred". No text, labels, letters, numbers, axes, EQ curves, meters, or technical charts. Match the existing Spatial descriptor card style: a small rounded amber sound sprite with a simple calm face, soft painterly brush grain, deep teal-indigo-violet listening-stage space, purple cloud forms near the edges, subtle ground glow, and gentle vibration arcs. Show the sprite slightly softened and hard to localize, with two or three translucent amber echo silhouettes offset very close around it and fuzzy pale-cyan arc trails that no longer converge to one exact point. The image should communicate unstable image focus: smeared, wobbly localization without becoming simply far away, reverberant, or spectrally dull. Use the same camera distance and calm negative space as `Left`, `Right`, `Centered`, and `Focused`: small-to-medium sprite, centered-safe composition, full square canvas, readable at thumbnail size. Avoid fog-only scenes, far hallways, room arches, wide open landscapes, multiple separate characters, harsh glitch distortion, heavy smoke, text, labels, axes, and technical charts.
```

#### Wide
```text
Create a 1254 x 1254 square descriptor card image for "Wide". No text, labels, letters, numbers, axes, EQ curves, meters, or technical charts. Match the existing Spatial descriptor card style: a small rounded amber sound sprite with a simple calm face, soft painterly brush grain, deep teal-indigo-violet listening-stage space, purple cloud forms near the edges, subtle ground glow, and gentle vibration arcs. Show the sound field opening left and right from the centered sprite, with broad amber side-stage arcs and pale-cyan lateral trails reaching toward both edges while the middle remains calm and organized. The image should communicate lateral width: the scene feels wider than `Centered`, but not blurry, reverberant, or crowded. Use the same camera distance and calm negative space as `Left`, `Right`, `Centered`, `Focused`, and `Blurred`: small-to-medium sprite, centered-safe composition, full square canvas, readable at thumbnail size. Avoid arrows, measurement lines, graph diagrams, multiple separate characters, crowded islands, room reverb arches, oversized target circles, text, labels, axes, and technical charts.
```

#### Narrow
```text
Create a 1254 x 1254 square descriptor card image for "Narrow". No text, labels, letters, numbers, axes, EQ curves, meters, or technical charts. Match the existing Spatial descriptor card style: a small rounded amber sound sprite with a simple calm face, soft painterly brush grain, deep teal-indigo-violet listening-stage space, purple cloud forms near the edges, subtle ground glow, and gentle vibration arcs. Show the stereo field pulled into a slim central lane, with the amber sprite centered between close inward-curving teal side walls or soft folded curtains and only short tight pulse rings near the middle. The image should communicate reduced lateral width and a smaller image, not weakness, distance, or spectral thinness. Use the same camera distance as `Centered` and make it feel like the opposite of `Wide`: calm, organized, and centered, but with side space collapsed inward. Avoid thin icy reed shapes like spectral `Thin`, tiny distant figures, boxes, cans, hard clamps, measurement lines, graph diagrams, text, labels, axes, and technical charts.
```

#### Precise
```text
Create a 1254 x 1254 square discovery descriptor card image for "Precise". No text, labels, letters, numbers, axes, EQ curves, meters, or technical charts. Match the existing Spatial descriptor card family, but make it feel like a slightly evolved discovery card rather than a basic ingredient card. Show one centered rounded amber sound sprite with a calm simple face in deep teal-indigo-violet listening-stage space, purple cloud forms near the edges, subtle ground glow, and painterly brush grain. Combine `Centered + Focused`: the sprite sits exactly on the center line inside a polished pale-cyan crystalline focus shell or refined faceted halo, with tight symmetrical amber rings snapping cleanly into one exact outline. Add a few small gold-white discovery glints and a crisp rim light so it feels more special than `Centered` or `Focused`, while keeping the same calm camera distance and negative space. The main read should be stable, exact, and easy to point at. Avoid crosshairs, target reticles, camera lenses, weapons, huge magic sigils, oversized cyan circles, jagged shard explosions, wide lateral wings, blur ghosts, multiple characters, text, labels, axes, and technical charts.
```

#### Diffuse
```text
Create a 1254 x 1254 square discovery descriptor card image for "Diffuse". No text, labels, letters, numbers, axes, EQ curves, meters, or technical charts. Match the existing Spatial descriptor card family, but make it feel like an evolved discovery card rather than a basic ingredient card. Show one warm amber sound sprite in deep teal-indigo-violet listening-stage space, with purple cloud forms near the edges, subtle ground glow, and soft painterly brush grain. Combine `Wide + Blurred`: the sprite should dissolve into a broad soft lateral glow, with translucent offset amber echoes and pale-cyan side arcs spreading left and right, but no single crisp center outline. Add a few faint discovery glints inside the haze so it feels unlocked, while keeping the whole image gentle and unfocused. The main read should be a wide, smeared image that is harder to point at than `Precise`, not far away, not reverberant, and not muddy. Avoid storm clouds, generic fog-only scenes, far-distance hallways, room reverb arches, precise focus shells, hard crystal edges, multiple separate characters, text, labels, axes, and charts.
```

#### Near
```text
Create a 1254 x 1254 square descriptor card image for "Near". No text, labels, letters, numbers, axes, or technical charts. Show a friendly glowing sound sprite very close to the viewer, larger in the foreground, crisp and direct, with short bright wave arcs and minimal surrounding haze. The background should recede softly but not dominate. The feeling is close, present, and immediate, not loud or aggressive. Style: soft hand-painted storybook game-card art, warm amber foreground glow with teal-violet shadows, full square canvas.
```

#### Far
```text
Create a 1254 x 1254 square descriptor card image for "Far". No text, labels, letters, numbers, axes, or technical charts. Show a small glowing sound sprite set far back along a misty listening path, with foreground space and soft depth layers leading toward it. Add faint delayed vibration rings and gently softened edges, but keep it spatial rather than simply dark or dull. Style: soft hand-painted storybook game-card art, pale cyan mist, deep indigo distance, small amber sound glow, full square canvas.
```

#### Dry
```text
Create a 1254 x 1254 square descriptor card image for "Dry". No text, labels, letters, numbers, axes, or technical charts. Show a crisp direct sound sprite in a clean, close, almost roomless space, with only very short wave marks that stop quickly. The environment should feel exposed and controlled: matte surfaces, little haze, no long trails, no echo clouds. Style: soft hand-painted storybook game-card art, restrained teal-gray background, clear amber sprite, subtle brush grain, full square canvas.
```

#### Reverberant
```text
Create a 1254 x 1254 square descriptor card image for "Reverberant". No text, labels, letters, numbers, axes, or technical charts. Show a glowing sound sprite surrounded by layered echo arcs and soft room reflections that trail outward into a large space. The main sprite should remain readable, while translucent rings, mist, and distant reflective forms suggest ambience and decay. Style: soft hand-painted storybook game-card art, deep indigo and violet room glow, pale cyan echo trails, warm amber core, full square canvas.
```

#### Intimate
```text
Create a 1254 x 1254 square discovery descriptor card image for "Intimate". No text, labels, letters, numbers, axes, EQ curves, meters, or technical charts. Match the existing Spatial descriptor card family, but make it feel like an evolved discovery card rather than a basic ingredient card. Show one warm rounded amber sound sprite with a simple calm face very close to the listener, slightly larger and more foreground than `Near`, in deep teal-indigo-violet listening-stage space with purple cloud forms pushed back to the edges, subtle ground glow, and soft painterly brush grain. Combine `Near + Dry`: the presentation should feel close, direct, exposed, and roomless, with very short clean amber wave arcs hugging the sprite and almost no echo haze or trailing room reflections. Add a few small gold-white discovery glints close to the body so it feels special without becoming loud or romantic. The main read should be close and personal in a spatial/audio sense, not warm EQ, not reverb, and not aggressive. Avoid romantic imagery, hearts, cuddling, crowded rooms, reverb arches, far tiny figures, broad spacious landscapes, spectral warmth props, large room glow, text, labels, axes, and technical charts.
```

#### Set Back
```text
Create a 1254 x 1254 square discovery descriptor card image for "Set Back". No text, labels, letters, numbers, axes, EQ curves, meters, or technical charts. Match the existing Spatial descriptor card family, but make it feel like an evolved discovery card rather than a basic ingredient card. Show one small warm amber sound sprite with a simple calm face sitting behind the close plane, farther down a layered teal-indigo-violet listening hall with purple cloud forms framing the edges, soft painterly brush grain, and a dim foreground path leading toward it. Combine `Far + Reverberant`: the sprite should be set back in depth and surrounded by graceful pale-cyan room arcs, delayed amber echo rings, and soft violet reflections, while still remaining readable and warm. Add a few subtle gold-white discovery glints along the echo path so it feels unlocked. The main read should be farther away with room around it, not cold, hidden, buried, or merely dark EQ. Avoid spectral `Distant` cold emptiness, heavy darkness, hidden subjects, fog-only scenes, precise focus shells, wide lateral side wings, romantic room lighting, text, labels, axes, and technical charts.
```

#### Spacious
```text
Create a 1254 x 1254 square discovery descriptor card image for "Spacious". No text, labels, letters, numbers, axes, EQ curves, meters, or technical charts. Match the existing Spatial descriptor card family, but make it feel like an evolved discovery card rather than a basic ingredient card. Show one warm amber sound sprite with a simple calm face inside a broad open teal-indigo-violet listening room, with purple cloud forms framing the edges, soft painterly brush grain, and a large calm stage around the source. Combine `Wide + Reverberant`: the room should open both left and right with broad lateral amber side trails, graceful pale-cyan reverberant arches, soft violet reflections, and gentle delayed echo rings that make the space feel larger than the sprite. Add a few small gold-white discovery glints along the wide room arcs so it feels unlocked. The main read should be open, roomy, and spatially large, not merely far away, not blurry, and not spectral `Airy` brightness. Avoid feather-cloud cues, pure brightness, crowded islands, multiple separate characters, precise focus shells, dark distant hallways, technical graphs, measurement lines, text, labels, axes, and charts.
```

### 14.6 Dynamic MVP Descriptor Card Prompts

#### Snappy
```text
Create a 1254 x 1254 square descriptor card image for "Snappy". No text, labels, letters, numbers, meters, EQ curves, or technical charts. Unique silhouette lock: an alert snap-spark creature springing forward from a taut coiled tail, with a tiny eager face, compact glowing body, and one clean star-shaped transient point at its leading edge. The coiled spring is part of the creature's body language, not a standalone prop. The image should feel fast, immediate, and transient-heavy, like a sound with quick attack and lively punch. Palette lock: vivid spring green coil accents, hot tangerine creature core, electric aqua motion streaks, saturated cobalt shadow, and small warm-white impact highlights. Style: painterly fantasy game-card art, creature-first clean focal point, readable at thumbnail size. Avoid faceless spring mechanisms, boxing gloves like "Punchy", cushioned shells like "Softened", pressure plates like "Compressed", clipped ceiling fragments, text, labels, meters, EQ curves, and technical charts.
```

#### Softened
```text
Create a 1254 x 1254 square descriptor card image for "Softened". No text, labels, letters, numbers, meters, EQ curves, or technical charts. Unique silhouette lock: a calm rounded impact creature cushioned inside a plush velvet-like shell, with a tiny relaxed face and a softened dent where a once-sharp strike has been absorbed. The cushion-cloud is a body wrap around the creature, not a separate pillow scene. The image should suggest gentler transients, smoother attack, and reduced bite while still feeling musical. Palette lock: dusty rose cushion body, peach-gold softened creature core, muted lavender shadow, soft aqua rim light, and warm cream bloom. Style: painterly fantasy game-card art, calm creature-first composition, full square canvas. Avoid faceless cushion props, springs like "Snappy", firm rings like "Tight", blankets like "Muffled", dark dullness, jagged shards, text, labels, meters, EQ curves, and technical charts.
```

#### Tight
```text
Create a 1254 x 1254 square descriptor card image for "Tight". No text, labels, letters, numbers, meters, EQ curves, or technical charts. Unique silhouette lock: a compact focused pulse creature tucked snugly inside a precise ring-lock harness, with a tiny determined face, small tucked limbs, and glowing pulse beads held close to its body. The creature should feel disciplined and contained, like rhythmic energy held firmly in a small circular chamber. Use short, clean bursts with little spillover, firm boundaries, and tiny timing sparks close to the creature. The image should suggest controlled decay, focused envelope, and no excess bloom. Palette lock: graphite and cold steel harness, electric lime pulse core, crisp white tick highlights, saturated cobalt shadow, and tiny amber timing sparks. Style: painterly fantasy game-card art, bold creature-first silhouette, readable at thumbnail size. Avoid standalone machinery, faceless devices, loose ribbons, spring launch shapes, pressure plates, long trails, soft cushions, text, labels, meters, EQ curves, and technical charts.
```

#### Loose
```text
Create a 1254 x 1254 square descriptor card image for "Loose". No text, labels, letters, numbers, meters, EQ curves, or technical charts. Unique silhouette lock: a relaxed floppy pulse creature slipping out of an open slack loop, with a soft easy face, loose ribbon-like limbs, and drifting pulse blobs trailing past its body. The creature should feel friendly, relaxed, and slightly uncontrolled, like rhythmic energy spilling beyond its intended boundary. The image should suggest longer decay, relaxed timing, and less controlled dynamic movement. Palette lock: soft lavender body and ribbons, coral-orange drifting pulses, turquoise late trails, butter-yellow glints, and smoky plum background. Style: painterly fantasy game-card art, expressive creature-first silhouette, full square canvas. Avoid precise rings like "Tight", spring launch shapes like "Snappy", standalone ribbons without a creature, reverberant room arches, mushy mud, text, labels, meters, EQ curves, and technical charts.
```

#### Compressed
```text
Create a 1254 x 1254 square descriptor card image for "Compressed". No text, labels, letters, numbers, meters, EQ curves, or technical charts. Unique silhouette lock: a squashed but calm sound creature squeezed between two translucent pressure plates, with its rounded body flattened into dense glowing layers and a tiny patient face pressed gently forward. The pressure plates are supporting props; the compressed creature is the hero. The image should suggest reduced dynamic range, leveled peaks, and controlled loudness without showing meters or waveforms. Palette lock: saturated magenta pressure glass, crimson squeezed edges, molten gold creature layers, deep burgundy shadow, and tiny electric-cyan stress glints. Style: painterly fantasy game-card art, strong creature-first central metaphor, readable at thumbnail size. Avoid rhythmic bellows like "Pumping", clipped ceiling impacts, flat empty plains, standalone machinery, spring bursts, text, labels, meters, EQ curves, and technical charts.
```

#### Pumping
```text
Create a 1254 x 1254 square descriptor card image for "Pumping". No text, labels, letters, numbers, meters, EQ curves, or technical charts. Unique silhouette lock: a rhythmic pressure creature with bellows-like side chambers built into its body, visibly swelling on one side and dipping on the other as if pushed by a beat. Give the creature a tiny concentrated face and rounded musical body so it reads as alive, not as a standalone machine. Surrounding lights should rise and duck like the whole scene is being pushed by cyclical compression movement. The image should suggest audible compression movement, volume ducking, and rhythmic dynamic motion. Palette lock: hot pink pressure glow, molten orange surge light, acid cyan dip trails, deep purple creature body, and warm-white beat flashes. Style: painterly fantasy game-card art, energetic creature-first silhouette, full square canvas. Avoid static pressure plates like "Compressed", flat plains, clipped ceilings, standalone engines, independent fault sparks, text, labels, meters, EQ curves, and technical charts.
```

#### Flat
```text
Create a 1254 x 1254 square descriptor card image for "Flat". No text, labels, letters, numbers, meters, EQ curves, or technical charts. Unique silhouette lock: a small low-profile sound creature lying level on a calm matte energy plateau, with a tiny neutral straight-mouth face, half-lidded eyes, and almost no expressive movement. The creature should feel emotionally leveled and restrained, not happy, not sad, and not sleepy-cute. Surround it with tiny equal-height pulse nubs barely rising from one steady horizon. The image should suggest little dynamic movement, low contrast between loud and soft, and a restrained envelope while still feeling intentionally designed, not empty. Palette lock: desaturated sage-gray creature and plateau, cool blue-gray sky, dusty cream low glow, muted amber pulse dots, and soft slate-violet shadow. Style: painterly fantasy game-card art, minimal creature-first silhouette, readable at thumbnail size. Avoid smiling or cheerful expressions, pressure plates, pumping engines, clipped ceilings, large glowing characters, muddy fog, text, labels, meters, EQ curves, and technical charts.
```

#### Clipped
```text
Create a 1254 x 1254 square descriptor card image for "Clipped". No text, labels, letters, numbers, meters, EQ curves, or technical charts. Unique silhouette lock: a limbless bright vertical peak creature surging upward and hitting a hard glowing ceiling slab, with its top flattened into a square cap, a restrained startled face below the impact, and blocky fragments breaking off at the limit. The creature should have no visible hands, arms, fingers, legs, feet, paws, or toes; the glowing vertical body itself is the creature. Use two small dark oval eyes with tiny highlights and a small worried mouth, not huge glossy emoji eyes or a giant screaming mouth. The ceiling is a clear boundary prop; the clipped creature remains the hero. The image should suggest overload, cut-off headroom, and abrupt peak truncation without showing a waveform. Palette lock: white-hot gold creature column, acid orange ceiling strike, saturated cobalt ceiling glow, scarlet block fragments, and near-black violet pressure clouds. Style: painterly fantasy game-card art, dramatic creature-first focal impact, full square canvas. Avoid visible hands, arms, legs, feet, faceless energy columns, warped melting shapes like "Distorted", buzz filaments, crackle micro-sparks, pressure plates, text, labels, meters, EQ curves, and technical charts.
```

#### Distorted
```text
Create a 1254 x 1254 square descriptor card image for "Distorted". No text, labels, letters, numbers, meters, EQ curves, or technical charts. Unique silhouette lock: an overdriven sound creature whose compact limbless body has twisted into one continuous warped prism-like knot, with a strained tiny face embedded in the warped body, small pinched eyes, a small dark W-shaped grimace mouth, bent pressure rings, torn glowing edges, and fractured harmonic sparks. The body itself is the whole creature: no hands, arms, fingers, legs, feet, paws, toes, separated lower ovals, side curls that read like hands, foot-like nubs, or humanoid pose. The mouth should feel tense and worried like the small W mouth on "Buzz", not like a large open shout. The deformation should look like the creature's own body is being saturated and bent, not like abstract damage alone. The image should suggest nonlinear saturation, damaged peaks, and aggressive dynamic deformation without relying on EQ imagery. Palette lock: toxic magenta and electric green warp glows, burnt orange hot edges, black-violet shadows, cyan harmonic sparks, and white stress highlights. Style: painterly fantasy game-card art, intense creature-first silhouette, readable at thumbnail size. Avoid large mouths, open screaming mouths, any limb-like appendages, faceless molten ribbons, hard ceiling slabs like "Clipped", buzz interference filaments, crackle lacquer, spring bursts, text, labels, meters, EQ curves, and technical charts.
```

#### Sluggish
```text
Create a 1254 x 1254 square discovery descriptor card image for "Sluggish". No text, labels, letters, numbers, meters, EQ curves, or technical charts. Unique silhouette lock: a cushioned floppy pulse creature whose softened front edge is wrapped in a plush rose-gold pad while its loose ribbon tail drags behind in a delayed sagging loop. The creature should feel alive but slow to reset, with a small drowsy determined face, rounded impact marks, and trailing pulse blobs that arrive late. Make it feel like `Softened + Loose`: attack is gently rounded and recovery lags into the next beat. Give it a slightly evolved discovery-card polish with a few warm-white timing glints caught in the delayed tail, but keep the body readable and creature-first. Background lock: use the Dynamic Snapback visual language, not the Spatial one; replace smoky violet cloud framing with an elastic kinetic backdrop of soft cobalt/graphite depth, faint spring arcs, slack timing loops, coral-orange late pulse trails, and a few small rebound sparks. Palette lock: dusty rose cushion, peach-gold creature core, soft lavender body shadows, coral-orange late pulses, turquoise delayed trails, saturated cobalt/graphite dynamic background, and warm cream glints. Style: painterly fantasy game-card art, full square canvas, readable at thumbnail size. Avoid purple smoky border frames, spatial listening-stage clouds, reverb arches, teal-violet room depth, mud, spectral dullness, sleepy blanket scenes, boomy bass clouds, standalone ribbons without a creature, pressure plates, clipped ceilings, text, labels, meters, EQ curves, and technical charts.
```

#### Surging
```text
Create a 1254 x 1254 square discovery descriptor card image for "Surging". No text, labels, letters, numbers, meters, EQ curves, or technical charts. Unique silhouette lock: a rhythmic pressure creature inside a translucent magenta compression chamber, its rounded body squeezed into glowing layers while bellows-like side chambers swell and dip in a broad wave around it. The creature should have a tiny concentrated face and remain the hero, not a standalone machine. Make it feel like `Compressed + Pumping`: gain control is visibly pressing the sound while the whole scene rises, ducks, and returns in compressor-driven waves. Add a few discovery-card glints riding the pressure wave, but avoid making it look like natural ocean water or reverb. Palette lock: saturated magenta chamber glass, hot pink and crimson pressure glow, molten orange surge light, acid cyan dip trails, deep burgundy/plum shadows, and warm-white beat glints. Style: painterly fantasy game-card art, vivid pressure glow, creature-first central metaphor, full square canvas. Avoid ocean waves, tidal water, faceless compressors, standalone engines, flat empty plains, clipped ceiling impacts, buzz/crackle fault sparks, text, labels, meters, EQ curves, and technical charts.
```

#### Overdriven
```text
Create a 1254 x 1254 square discovery descriptor card image for "Overdriven". No text, labels, letters, numbers, meters, EQ curves, or technical charts. Unique silhouette lock: one limbless overloaded peak creature pushed past clean headroom, with a bright vertical body whose top is slightly squared by a glowing ceiling while the lower body twists into saturated prism-like roughness. Combine `Clipped + Distorted`: the peak has hard ceiling damage and the body has nonlinear gritty deformation, but it should read as one creature and one overload event. Give the creature a small strained face embedded in the glowing body, a tight worried mouth, torn hot edges, bent pressure rings, and sparse harmonic sparks. Make it feel like a discovery evolution beyond the basic `Clipped` and `Distorted` cards, with extra intensity and polish but safe, readable composition. Background lock: use Dynamic Pressurebreak/Ceilingbreak visual language, with glowing ceiling pressure, angular overload fragments, bent pressure rings, and dark cobalt-violet headroom space; avoid the Spatial smoky border frame or room-depth arches. Palette lock: white-hot gold peak core, acid orange ceiling strike, scarlet block fragments, toxic magenta and electric green saturation edges, saturated cobalt ceiling glow, cyan harmonic sparks, and near-black violet pressure clouds. Style: painterly fantasy game-card art, dramatic creature-first focal point, full square canvas. Avoid gore, flames as the main subject, multiple characters, big screaming mouths, visible arms/legs/hands, independent buzz/crackle defects, broken-speaker imagery, faceless molten ribbons, pure spectral harshness, spatial smoky edge frames, reverb arches, text, labels, meters, EQ curves, and technical charts.
```

### 14.7 Integrity MVP Descriptor Card Prompts

#### Hiss
```text
Create a 1254 x 1254 square descriptor card image for "Hiss". No text, labels, letters, numbers, EQ curves, meters, or technical charts. Unique silhouette lock: a whispery veil-shaped static creature made from thousands of fine grains, with a barely visible soft face emerging from the mist and edges dissolving into noise. The creature should feel diffuse, airy, continuous, and independent of the musical signal. Palette lock: black-charcoal background, pale static-white grain body, toxic mint and acid-lime mist, muted cyan shimmer, and tiny cool silver flecks. Style: painterly storybook game-card art, full square canvas, clear central mist-creature silhouette. Avoid faceless fog only, low hum cores, jagged buzz filaments, crackle pops, dropout gaps, text, labels, meters, EQ curves, and technical charts.
```

#### Static
```text
Create a 1254 x 1254 square descriptor card image for "Static". No text, labels, letters, numbers, EQ curves, meters, or technical charts. Unique silhouette lock: a jittery rough-noise creature made from broken salt-and-pepper grains and torn signal flecks, with tiny flickering eyes, an uneven fuzzy outline, and a few ragged horizontal interference bands passing through its body. The creature should feel rougher and more radio-like than "Hiss": broadband contamination that crackles in texture, but remains a noisy field rather than separate pop events. Palette lock: black-charcoal void, static-white grains, toxic mint noise speckles, electric cyan torn bands, hot-magenta interference flecks, and faint violet shadow. Style: painterly storybook game-card art with granular texture, full square canvas, readable central fault-creature silhouette. Avoid smooth hiss mist, low hum cores, continuous whine lines, many distinct crackle pops, dropout gaps, text, labels, meters, EQ curves, and technical charts.
```

#### Hum
```text
Create a 1254 x 1254 square descriptor card image for "Hum". No text, labels, letters, numbers, EQ curves, meters, or technical charts. Unique silhouette lock: a heavy low drone creature shaped like a dark transformer-core orb sitting near the bottom of the frame, with sleepy steady eyes, a tiny flat mouth, and slow thick concentric tremor bands radiating from its body. The image should feel stable, sustained, ominous, and low-frequency, like an added electrical defect under the music. Palette lock: midnight blue creature core, deep charcoal ground, low muted amber electrical glow, murky olive halo, and faint violet shadow. Style: painterly storybook game-card art, full square canvas. Avoid faceless cores, airy hiss clouds, jagged buzz filaments, bright click fractures, dynamic pumping engines, text, labels, meters, EQ curves, and technical charts.
```

#### Buzz
```text
Create a 1254 x 1254 square descriptor card image for "Buzz". No text, labels, letters, numbers, EQ curves, meters, or technical charts. Unique silhouette lock: a nervous electric fault creature crawling across a suspended signal plate, with a jagged comb-like back, tiny anxious eyes, vibrating teeth-like filaments, and granular roughness around its body. The signal plate is a perch, not the hero. The image should feel intrusive and buzzy, but not like Dynamic overload or clipping. Palette lock: electric cyan creature filaments, ultraviolet plate shadows, hot magenta interference edges, acid yellow-green sparks, and black-charcoal base. Style: painterly storybook game-card art, full square canvas. Avoid faceless lightning only, hiss mist, hum cores, clipped ceiling blocks, distorted molten knots, text, labels, meters, EQ curves, and technical charts.
```

#### Whine
```text
Create a 1254 x 1254 square descriptor card image for "Whine". No text, labels, letters, numbers, EQ curves, meters, or technical charts. Unique silhouette lock: a thin high-pitched interference creature stretched into one narrow glowing tone-thread, with a tiny sympathetic strained face embedded in the line, soft worried eyes, no screaming mouth, small trembling pitch ticks, and a single wavering filament rising above a dark signal plate. The image should feel like added tonal interference: a sustained, narrow whine higher than hum or buzz, not broad treble brightness. Palette lock: black-charcoal background, icy cyan tone-thread, acid yellow-green pitch glints, ultraviolet shadow, hot-magenta edge shimmer, and a faint electric-blue aura. Style: painterly storybook game-card art, precise narrow silhouette, full square canvas. Avoid horror-mask faces, skull-like faces, menacing eyes, broad spectral "Bright" glow, sharp tonal-balance blade imagery, low hum cores, jagged buzz combs, crackle pops, many noise grains, text, labels, meters, EQ curves, and technical charts.
```

#### Dirty
```text
Create a 1254 x 1254 square descriptor card image for "Dirty". No text, labels, letters, numbers, EQ curves, meters, or technical charts. Unique silhouette lock: one compact contaminated signal-creature sitting on a dark signal tile, coated in grimy noise residue, with a smudged amber core, stained dark shell, tiny uneasy but sympathetic eyes, and mixed grit clinging to its edges like playback junk. The card should communicate broad unclean playback: low-level contamination, codec-like roughness, and defect residue as one simple integrity word, not a visible recipe made from separate Hiss, Buzz, and Crackle characters. Style alignment lock: match the Integrity descriptor cards with near-black violet space, a readable centered creature/event silhouette, small non-scary face, high-contrast luminous rim accents, and tactile painterly texture. Palette lock: black-charcoal and dark aubergine base, dirty amber core, olive-gray grime, muted cyan codec flecks, rusty orange scratches, toxic mint specks, and deep violet shadow. Style: painterly storybook game-card art, tactile dirty surface texture, full square canvas, readable at thumbnail size. Avoid muddy spectral EQ clouds, dynamic distortion/overload flames, separate defect characters, clean hiss mist, obvious electrical buzz filaments, many bright crackle pops, horror faces, text, labels, meters, EQ curves, and technical charts.
```

#### Click
```text
Create a 1254 x 1254 square descriptor card image for "Click". No text, labels, letters, numbers, EQ curves, meters, or technical charts. Unique silhouette lock: one tiny bright snap-bead creature striking a dark glass signal tile at a single point, with a small startled face, crisp radial splinters, and lots of surrounding silence. The image should feel minimal, sudden, precise, and transient. Palette lock: near-black glass shard, warm-white impulse creature, hot coral fracture point, icy cyan splinter edges, and deep violet shadow. Style: painterly storybook game-card art, high contrast, clear central impulse creature, full square canvas. Avoid faceless needle impulses, many scattered pops like "Crackle", buzz filaments, hiss clouds, clipped ceiling impacts, text, labels, meters, EQ curves, and technical charts.
```

#### Pop
```text
Create a 1254 x 1254 square descriptor card image for "Pop". No text, labels, letters, numbers, EQ curves, meters, or technical charts. Unique silhouette lock: a larger round impulse-bubble creature bursting outward from a thin dark signal membrane ripple, floating in near-black violet space with no slate, tile, platform, floor block, or stone slab, with a tiny startled but friendly face at the bright center, one thick pressure ring, and a few chunky warm fragments pushed away by the burst. The image should feel like a sudden larger playback pop: more forceful and rounded than "Click", but still one event, not many crackles and not musical bass impact. Style alignment lock: match the Integrity descriptor cards with near-black violet space, a readable centered creature/event silhouette, small non-scary face, high-contrast luminous rim accents, and tactile painterly texture. Palette lock: warm-white burst core, hot coral pressure ring, amber-orange bubble glow, near-black signal membrane ripple, icy cyan rim cracks, and deep violet shadow. Style: painterly storybook game-card art, bold single transient event, full square canvas, readable at thumbnail size. Avoid slate, tile, platform, floor block, stone slab, repeated ticks, crackle clusters, bass "Thump" or "Punchy" imagery, clipped ceiling impacts, explosive violence, horror faces, text, labels, meters, EQ curves, and technical charts.
```

#### Crackle
```text
Create a 1254 x 1254 square descriptor card image for "Crackle". No text, labels, letters, numbers, EQ curves, meters, or technical charts. Unique silhouette lock: a brittle dry lacquer fault creature whose shell is covered with many scattered micro-fractures, tiny twitchy eyes, and irregular sparks popping from several cracks. Use many small bursts rather than one impulse, but keep the central cracked creature silhouette readable. The image should feel intermittent, not continuous hiss and not overload distortion. Palette lock: dark aubergine and charcoal lacquer body, warm-white dry pops, rusty amber flecks, pale mint crack edges, and muted cyan underglow. Style: painterly storybook game-card art, full square canvas. Avoid faceless cracked surfaces, a single click fracture, smooth hiss mist, buzz combs, distorted molten knots, text, labels, meters, EQ curves, and technical charts.
```

#### Dropout
```text
Create a 1254 x 1254 square descriptor card image for "Dropout". No text, labels, letters, numbers, EQ curves, meters, or technical charts. Unique silhouette lock: a glowing signal-ribbon creature interrupted by a clean rectangular black void, with one half fading out before the gap and the other half reappearing after it; give the visible ends tiny interrupted or searching face marks so absence is the main emotion. Emphasize missing information, abrupt silence, and a broken stream. Palette lock: clean near-black void, electric cyan signal-creature fragments, dim coral fade tails, faint amber cut-edge glow, and dusty violet silence field. Style: painterly storybook game-card art, full square canvas. Avoid faceless broken lines, crackle spark fields, click fracture points, hiss clouds, hum cores, text, labels, meters, EQ curves, and technical charts.
```

#### Squeak
```text
Create a 1254 x 1254 square descriptor card image for "Squeak". No text, labels, letters, numbers, EQ curves, meters, or technical charts. Unique silhouette lock: a tiny rubbery high-friction chirp creature stretched sideways by a short sliding squeak, with a small wincing but non-scary face, an elongated compressed body, one curved acid-yellow/green squeal smear trailing behind it, and a few curled friction marks that stop quickly. The image should feel like a brief squeaky chirp or squeal event caused by friction over time: sharper and more rubbery than a click, shorter and more event-like than "Whine", and not a sustained mechanical rattle. Style alignment lock: match the Integrity descriptor cards with near-black violet space, a readable centered creature/event silhouette, small sympathetic face, high-contrast luminous rim accents, and tactile painterly texture. Palette lock: acid yellow-green chirp body, warm-white friction highlight, tiny hot-coral heat accents, electric cyan skid edge, black-charcoal negative space, and deep violet shadow. Style: painterly storybook game-card art, compact high-friction sliding event, full square canvas, readable at thumbnail size. Avoid hard point-impact sparks, dark signal tiles, slate platforms, floor blocks, click-like starbursts, continuous whine threads, low hum cores, buzz combs, rattle hardware, many crackle pops, spectral blade imagery, horror faces, text, labels, meters, EQ curves, and technical charts.
```

## 15. Atlas Region And Utility Icon Prompt Catalog

These prompts are for region-level icons and utility icons, not individual descriptor cards. Region icons should feel like gateways or map-region emblems for the Evolution Atlas. Utility icons should live in the menu/practice layer and should not look like extra map regions.

### 15.1 Shared Atlas Region Requirements

- square `1254 x 1254 px` fully filled PNG
- no text, labels, letters, numbers, UI glyphs, graph axes, EQ curves, meters, spectrograms, or technical charts
- no baked rounded corners
- readable at small size
- central emblem or gateway inside the middle `65%` of the canvas
- hand-painted, soft lighting, game-card quality
- sound, waveform, vibration, spatial, dynamic, or signal-fault cues included
- visually related to the descriptor icon design language
- more symbolic and map-like than a single descriptor character
- keep module identity clear: Spectral is tonal/EQ territory, Spatial is position/depth/room, Dynamic is time motion/headroom, and Integrity is independent defects or interruptions

### 15.2 Spectral Region Icon Prompts

#### Region A: Thunderstep Highlands
```text
Create a square game region icon for "Thunderstep Highlands" in a collectible sound-card game. Show a powerful physical-energy gateway: deep earth-like bass waves rising from the ground, a squat glowing sub-bass core, impact rings, and bright upper-air sparks suggesting shine, air, and excitement. The shape language should feel heavy, physical, rhythmic, and energized, with wide slow waveform curves, subtle shockwave arcs, and small sky-blue/gold treble glints above the bass core. Palette: deep navy, dark red earth, burnt orange, cobalt shadow, small gold and sky-blue highlights. Mood: forceful, grounded, exciting, but not aggressive. No text, no letters, no numbers. Full-canvas hand-painted square PNG, no rounded corners, readable at small icon size.
```

#### Region B: Emberbody Valley
```text
Create a square game region icon for "Emberbody Valley" in a collectible sound-card game. Show a simple environmental warm acoustic territory rather than a single object: a broad sheltered amber resonance chamber, low-mid grotto, or soft rounded valley with a calm glowing center. Prioritize large smooth shapes, fullness, warmth, and gentle body over decoration. Use one or two thick slow waveform rivers or arcs, gently wrapping through the space, with very few small details. The upper area should feel dim and relaxed to suggest softened treble and mellow detail. The region should feel full, rounded, cushioned, musical, and emotionally warm, while still reading as a map-region gateway for the Evolution Atlas. Palette: honey gold, ember orange, dark plum, maroon, caramel brown, subdued cobalt shadow, soft cream highlights. Avoid hanging lights, many beads, busy ridges, excessive tiny hills, close-up bowls, tabletop objects, literal blankets, characters, and text. No letters, no numbers. Full-canvas hand-painted square PNG, no rounded corners, readable at small icon size.
```

#### Region C: Resonance Canyons
```text
Create a square game region icon for "Resonance Canyons" in a collectible sound-card game. Show an environmental enclosed midrange territory rather than a small prop: a narrow acoustic canyon, boxed-in chamber landscape, or horn-shaped corridor made from warm wood, brass, and cardboard-like walls. Midrange waveform paths should bounce between close parallel surfaces, compress through a flared tunnel, and gather in a nasal resonant pocket at the center. The region should suggest boxy, cupped, canned, honky, and nasal coloration without using a face as the main subject. Palette: cardboard tan, brass yellow, muted gold, honey oak, olive shadow, dusty violet accents, soft dark brown edges. Shape language: rectangular wall planes, curved horn passages, compressed mid waves, enclosed map gateway. Mood: quirky, enclosed, resonant, slightly vintage, but still explorable as a region in the Evolution Atlas. Avoid close-up boxes, tabletop objects, characters, literal ears, and text. No letters, no numbers. Full-canvas hand-painted square PNG, no rounded corners, readable at small icon size.
```

#### Region D: Masking Mire
```text
Create a square game region icon for "Masking Mire" in a collectible sound-card game. Show a sound-wave relic half-buried in layered mud, fog, and low-mid clouds, with muffled waveform arcs struggling to pass through. Include overlapping cloudy forms, partially hidden resonance shapes, and a heavy low-end haze. Palette: olive brown, muted teal, dark umber, gray-green fog, smoky violet shadow, dim amber glints. Mood: obscured, congested, heavy, buried, low clarity. No text, no letters, no numbers. Full-canvas hand-painted square PNG, no rounded corners, readable at small icon size.
```

#### Region G: Frosthollow Expanse
```text
Create a square game region icon for "Frosthollow Expanse" in a collectible sound-card game. Show a very sparse environmental cold hollow territory: a wide blue-gray acoustic basin or empty frosted chamber with a large quiet center, thin body-light paths, and pale open air above the hollow. Prioritize hollowness, negative space, emotional emptiness, cold exposure, and long silent depth over surface detail. Use only a few thin icy highlights, light mist, very sparse distant waveform traces, and faint high air glints; avoid many lines, busy terrain, decorative particles, or complicated foreground structures. The region should feel like a lonely map destination for Hollow, Dull, Thin, and Airy combinations in the Evolution Atlas, not a single object. Palette: pale blue, icy cyan, blue-gray, muted lavender, white frost, navy shadow, tiny dim silver highlights. Shape language: small isolated sound form, hollow basin, open empty center, thin distant waves, exposed air, quiet depth. Mood: distant, cold, sparse, quiet, emotionally detached, empty. Avoid close-up objects, control panels, characters, literal ears, bright sun-prism imagery, and text. No letters, no numbers. Full-canvas hand-painted square PNG, no rounded corners, readable at small icon size.
```

#### Region E: Glassedge Spires
```text
Create a square game region icon for "Glassedge Spires" in a collectible sound-card game. Show a sharp crystalline treble gate made of thin metallic waveform shards, sibilant streaks, glassy reflective planes, and bright pressure lines. The center should feel tense and artificial, with jagged high-frequency energy and a warning-like glow, but avoid gore or horror. Palette: icy white, electric blue, silver, acid yellow, rusty orange accents, dark plum shadow. Shape language: narrow spikes, metallic edges, reflective glass planes, thin hiss trails, forward pressure beams, hard upper-treble glints. Mood: sharp, fatiguing, artificial, piercing, high-frequency pain. No text, no letters, no numbers. Full-canvas hand-painted square PNG, no rounded corners, readable at small icon size.
```

### 15.3 Spatial Region Icon Prompts

#### Spatial Region 1: Anchorpoint Stage
```text
Create a 1254 x 1254 square fantasy atlas-region illustration for Spatial Region 1, "Anchorpoint Stage". No text, labels, letters, numbers, axes, or technical charts. Show a listening stage with a clear left side, right side, and calm centered beacon, using softly glowing side cliffs, a balanced central path, and a few focused sound motes placed in space. The image should communicate position and image focus: left/right/center placement and stable localization without looking like a graph or diagram. Style: soft hand-painted storybook game art, tactile brush grain, deep teal and indigo space, warm amber sound cores, pale cyan focus glows, full square canvas, readable as a region tile.
```

#### Spatial Region 2: Echoreach Halls
```text
Create a 1254 x 1254 square fantasy atlas-region illustration for Spatial Region 2, "Echoreach Halls". No text, labels, letters, numbers, axes, or technical charts. Show a layered listening world with a close glowing sound sprite in the foreground, a smaller far sprite in the misty distance, and translucent room-like echo rings fading into arches behind them. The image should communicate depth and space: near/far distance, dry directness, and reverberant room without simply looking dark or dull. Style: soft hand-painted storybook game art, warm amber foreground, pale cyan mist, deep indigo distance, soft violet reflections, full square canvas, readable as a region tile.
```

#### Future Off-Atlas Spatial Region: Farspan Isles
```text
Create a 1254 x 1254 square fantasy atlas-region illustration for future off-atlas Spatial region "Farspan Isles". No text, labels, letters, numbers, axes, or technical charts. Show a broad open stereo landscape with several distinct glowing sound islands spread across the left and right sides, with visible air between them. Use wide horizon arcs, separated floating platforms, and clean gaps of negative space so the scene feels broad, sorted, and easy to inspect. The image should communicate future width and separation training without using EQ curves or measurement lines. Style: soft hand-painted storybook game art, teal-indigo-violet space, warm amber islands, pale cyan spacing trails, full square canvas, readable as a future region tile.
```

### 15.4 Dynamic Region Icon Prompts

#### Dynamic Region 1: Snapback Springs
```text
Create a 1254 x 1254 square fantasy atlas-region illustration for Dynamic Region 1, "Snapback Springs". No text, labels, letters, numbers, meters, waveform labels, EQ curves, or UI. Show an elastic landscape of spring towers, snap-bright impact stones, and trails that return cleanly to rest after each hit. Include one sharp kinetic burst and one softened cushioned landing so the region clearly suggests attack and recovery: how hits start, stop, and reset. Palette lock: vivid spring green, electric aqua, hot tangerine, coral-orange impact light, saturated cobalt shadow, and small warm-white snap highlights. Keep teal/indigo only as a minor shadow color so this does not look like the Spatial regions. Use large clean rebound arcs, broad impact glow, and strong silhouettes; avoid dense sparkle dust, star confetti, and noisy pinprick light fields. Style: rich painterly storybook game art, strong silhouettes, elastic glossy energy, full square canvas, readable as a vivid region tile.
```

#### Dynamic Region 2: Pressurebreak Basin
```text
Create a 1254 x 1254 square fantasy atlas-region illustration for Dynamic Region 2, "Pressurebreak Basin". No text, labels, letters, numbers, meters, waveform labels, EQ curves, or UI. Show translucent pressure chambers, glowing layers squeezed closer together, rhythmic light paths swelling and dipping, and broad plains where energy is held at a steadier level. The image should suggest compression, motion, and pressure pushed toward overload: gain reduction, pumping movement, flattened expressive variation, and a few clean ceiling-strike fragments where the pressure breaks. Palette lock: saturated magenta pressure chambers, crimson and hot pink swelling light, molten gold compressed layers, deep burgundy/plum shadows, and tiny electric-cyan edge glints only as contrast. Use broad luminous pressure masses, smooth chamber glows, clean rhythmic paths, and sparse overload accents; avoid dense sparkle dust, star confetti, and noisy pinprick light fields. Style: rich painterly storybook game art, dense but readable composition, vivid pressure glow, full square canvas, readable as a region tile.
```

#### Future Dynamic Region: Ceilingbreak Spires
```text
Create a 1254 x 1254 square fantasy atlas-region illustration for Dynamic Region 3, "Ceilingbreak Spires". No text, labels, letters, numbers, meters, waveform labels, EQ curves, or UI. Show bright energy rising toward a glowing ceiling between tall spires, with some peaks staying clean under an open sky while other peaks strike the ceiling and break into squared-off fragments and rough sparks. The image should communicate overload and headroom as dynamic peak behavior, not independent noise artifacts. Palette lock: white-hot gold peak light, acid orange ceiling strikes, saturated cobalt-blue ceiling glow, scarlet overload fragments, and near-black violet pressure clouds. Use clean peak beams, large squared-off fragments, and broad ceiling glow; avoid dense sparkle dust, star confetti, and noisy pinprick light fields. Style: rich painterly storybook game art, dramatic central ceiling, sharp high-energy contrast, full square canvas, readable as a vivid region tile.
```

### 15.5 Integrity Region Icon Prompts

#### Integrity Region 1: Faultveil Rift
```text
Create a 1254 x 1254 square fantasy atlas-region illustration for Integrity Region 1, "Faultveil Rift". No text, labels, letters, numbers, EQ curves, meters, waveform labels, or UI. Show one dark playback-fault landscape combining noise contamination and broken signal events: pale hiss/static mist drifting across a near-black rift, low amber hum glow under the ground, jagged violet-magenta buzz and whine filaments, electric cyan signal shards, sharp click fractures, larger pop bursts, crackle sparks, short yellow-green squeak chirp arcs, and a clean dark dropout gap where the signal disappears before reappearing. The image should communicate unwanted playback defects and interruptions, not spectral EQ, compression, clipping overload, spatial depth, or musical impact. Palette lock: black-charcoal void, toxic mint hiss mist, ultraviolet and hot-magenta interference filaments, electric cyan broken signal shards, low amber electrical glow, acid yellow-green chirp flashes, and warm-white transient cracks. Use broad readable mist veils, large dark negative space, bold signal fragments, and a few sharp fault highlights; avoid dense decorative sparkle fields and pinprick confetti. Style: moody but vivid painterly storybook game art, high-contrast fault colors, full square canvas, readable as a region tile.
```

Former split-region prompts, `Staticveil Fen`, `Glitchgap Rift`, and `Rattleforge Yards`, are not active MVP atlas targets. Do not generate them unless the Integrity atlas is split again later.

### 15.6 Review Lab UI Icon Direction

The `Review Lab` is not Region `H`, so its visual should not look like another world-map territory. Treat it as a utility or practice-space icon in the menu layer.

```text
Create a square UI icon for "Review Lab" in a collectible sound-card game. This is not a map region. Show a calm dark listening calibration room with a central circular meter or listening pool, a few small card silhouettes or sound tokens placed neatly around it, and restrained waveform arcs suggesting review practice. The icon should feel like a practice utility, not an eighth sound territory. Palette: dark neutral background with controlled accents of amber, cyan, pale gold, violet, and soft white. Shape language: organized lab space, calibration circle, subtle sound paths, quiet review mood. Avoid landscape scale, region gateway framing, constellation imagery, star maps, final-chapter framing, cluttered tools, many small objects, text, letters, and numbers. Full-canvas hand-painted square PNG, no rounded corners, readable at small icon size.
```
