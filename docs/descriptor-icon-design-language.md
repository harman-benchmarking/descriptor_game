# Descriptor Icon Design Language

Date: 2026-04-24  
Source samples: `warm.png`, `thin.png`

Note: the user referred to the second sample as `cold`; the file currently present in this directory is `thin.png`, which carries the same cold/sparse visual language.

## 0. Full Icon Target List
The current Descriptor Playground has `48` primary icon targets, plus `9` bonus alias icon targets for post-game rewards:
- `18` selectable basic descriptors
- `30` unlockable discovery descriptors
- `9` bonus alias descriptors

Current basics:
`Rumble`, `Thump`, `Boomy`, `Punchy`, `Thin`, `Muddy`, `Warm`, `Boxy`, `Hollow`, `Honky`, `Nasal`, `Shouty`, `Harsh`, `Dull`, `Sibilant`, `Shrill`, `Bright`, `Airy`.

Current discoveries:
`Tinny`, `Spitty`, `Metallic`, `Full`, `Thick`, `Bloated`, `Muffled`, `Mellow`, `Cupped`, `Pinched`, `Aggressive`, `Crisp`, `Distant`, `Powerful`, `Impactful`, `Canned`, `V-shaped`, `Brittle`, `Woolly`, `Fatiguing`, `Cold`, `Veiled`, `Energetic`, `Vintage`, `Congested`, `Plasticky`, `Exciting`, `Hyped`, `Buried`, `Piercing`.

Current bonus aliases:
`Droning`, `Bassy`, `Lacking`, `Weak`, `Chesty`, `Colored`, `Presence`, `Dark`, `Sharp`.

Generation priority:
- Start with the `18` basics because they are visible buttons.
- Then create the `30` discoveries for the collection board.
- Then create the `9` bonus aliases as post-game reward icons after the player clears the main game.
- Keep filenames lowercase kebab-case or snake-case, such as `rumble.png`, `v-shaped.png`, or `v_shaped.png`.
- Keep every final asset as a fully filled square PNG with no baked rounded corners.

## 1. Purpose
This document extracts the visual language from the current descriptor icon samples so future Descriptor Playground icons feel like one coherent collection.

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
| harsh, shrill, piercing | sharp points, jagged edges, bright cuts |
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
| sibilant/shrill | icy white, electric blue, sharp bright highlights |
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
| `Harsh` | jagged sandpaper scrape shard with rough torn edge | acid yellow, rusty orange, hard white, dark plum | `Shrill`, `Piercing`, `Shouty` |
| `Dull` | sleepy frosted lantern with weak blunted glow | charcoal blue, muted gray, dusty navy, soft brown | `Muffled`, `Veiled` |
| `Sibilant` | icy slit-mouth hiss sprite with thin silver ribbon trails | icy white, electric blue, pale cyan, silver | `Shrill`, `Spitty`, `Crisp` |
| `Shrill` | tiny whistle/needle-beam treble creature with ringing halo | icy blue, white, pale violet, electric highlights | `Sibilant`, `Piercing` |
| `Bright` | cheerful sun-prism orb opening upward with broad top-end glow | sky blue, pale gold, warm white, soft cyan | `Airy`, `Crisp`, `Shrill` |
| `Airy` | translucent feather-cloud breeze spirit with open negative space | pale sky blue, white, soft cyan, faint gold | `Thin`, `Bright`, `Hollow` |
| `Tinny` | tiny fragile spirit rattling inside a thin dented metal cup | pale silver, icy blue, muted gray, navy | `Canned`, `Metallic`, `Boxy` |
| `Spitty` | puckered consonant-pop sprite with short dry particle bursts | icy blue, pale white, cool gray, navy, tiny cyan sparks | `Sibilant`, `Thin`, `Tinny` |
| `Metallic` | polished chrome tuning-fork spirit with ringing halo | silver, blue-gray, dark navy, cyan glints, tiny amber reflections | `Tinny`, `Canned`, `Shrill` |
| `Full` | complete-spectrum round character with warm base and clear sky-lit crown | warm orange, gold, sky-blue highlight, cream, soft plum shadow | `Warm`, `Thick`, `Bloated` |
| `Thick` | flattened stack of dense padded cushion-slabs with visible weight | deep amber, caramel brown, maroon, muted gold, dark plum | `Warm`, `Full`, `Bloated`, `Mellow` |
| `Bloated` | over-inflated bass balloon with stretched seams and uneasy puffed face | muddy orange, brown, muted purple, amber pressure glow, gray haze | `Boomy`, `Thick`, `Full`, `Powerful` |
| `Muffled` | tiny sound creature under a thick padded blanket with absorbed wave lines | dusty blue-gray, muted brown, charcoal, beige, dim amber underglow | `Dull`, `Muddy`, `Veiled`, `Buried` |
| `Mellow` | relaxed sunset-cloud character reclining on one soft cushion | honey orange, warm beige, dusty rose-brown, dim gold, muted plum | `Warm`, `Dull`, `Muffled`, `Thick` |
| `Cupped` | tiny sound spirit enclosed by two mitten-like cupped hands forming an acoustic bowl | warm tan, olive-gold, soft brown, muted orange, purple shadow | `Honky`, `Boxy`, `Nasal`, `Canned` |
| `Pinched` | single side-view wooden clothespin, two wooden halves total, pinching a tiny sound sprite at its front jaws | yellow-green sprite, warm wood tan, brass spring, olive shadow, pale blue buzz accents | `Nasal`, `Honky`, `Cupped`, `Harsh` |
| `Aggressive` | forward-leaning wedge-shaped pressure creature pushing a hot wave-front | hot yellow, burnt orange, red-brown, dark plum, white glare | `Shouty`, `Fatiguing`, `Harsh`, `Punchy` |
| `Crisp` | fresh mint-cyan leaf-sprite with one clean snapped edge and tiny crackle glints | mint-cyan, pale blue, white, soft gold glints, navy outline | `Bright`, `Sibilant`, `Harsh`, `Brittle` |
| `Distant` | tiny sound sprite at the far end of a misty blue hallway or valley | pale blue-gray, muted lavender, fog white, soft navy, dim cool highlights | `Hollow`, `Cold`, `Veiled`, `Buried` |
| `Powerful` | broad mountain-monolith creature with a steady glowing core | dark navy, deep brown, burnt orange, muted purple, amber core glow | `Rumble`, `Exciting`, `Impactful`, `Aggressive` |
| `Impactful` | friendly rounded mallet striking a soft glowing contact pad at one clear point | chestnut, orange, warm gold, dark plum, dusty shadow | `Thump`, `Punchy`, `Powerful`, `Aggressive` |
| `Canned` | sealed generic tin can with a trapped sound sprite and tight internal echo marks | muted silver, brass, cool blue shadows, tin highlights, small warm glints | `Boxy`, `Tinny`, `Metallic`, `Cupped` |
| `V-shaped` | balanced two-hill sound valley with warm bass mound, cool treble mound, and quiet recessed middle | orange-brown bass side, cool blue treble side, gold, purple shadows | `Hyped`, `Full`, `Exciting` |
| `Brittle` | delicate cracked icy shell creature with hairline stress marks | icy blue, pale white, cool gray, faint violet, navy outline | `Thin`, `Shrill`, `Cold`, `Crisp` |
| `Woolly` | fuzzy wool-covered heavy creature | warm gray, muted brown, dusty orange, plum | `Muffled`, `Thick` |
| `Fatiguing` | tired character under too many pressure rays | hot yellow, orange, icy blue streaks, white glare | `Aggressive`, `Harsh` |
| `Cold` | tiny sound sprite half-sunk in a soft snowdrift | pale blue, icy cyan, white snow, muted lavender, cool gray, navy accents | `Thin`, `Distant`, `Brittle`, `Hollow`, `Airy` |
| `Veiled` | clear character behind translucent curtain | dusty blue-gray, muted beige, olive-brown, navy | `Dull`, `Muffled` |
| `Energetic` | bouncing bass creature with treble sparks | cobalt shadow, burnt orange, bright gold, purple | `Exciting`, `Punchy` |
| `Vintage` | old-radio cushion or sepia speaker spirit | sepia, warm brown, muted orange, cream | `Warm`, `Mellow` |
| `Congested` | traffic-jam cluster of overlapping sound blobs | muddy brown, olive-gray, muted orange, dark purple | `Muddy`, `Buried` |
| `Plasticky` | hollow toy-like synthetic shell | toy blue, pale cyan, cool gray, muted pink-orange | `Tinny`, `Cold` |
| `Exciting` | grounded force with airy sparks lifting upward | deep navy, burnt orange, bright gold, pale cyan | `Energetic`, `Powerful` |
| `Hyped` | overinflated smile-booster creature with swollen bass and treble ends around a recessed middle | deep orange-brown, electric blue, gold sparkles | `V-shaped`, `Exciting`, `Full` |
| `Buried` | tiny character mostly hidden under heavy layers | dark brown, muddy orange, muted olive, faint amber | `Muddy`, `Muffled` |
| `Piercing` | thin hollow shell crossed by bright sound beam | electric blue, icy white, pale yellow glare, navy | `Shrill`, `Harsh` |

### 6.2 Bonus Alias Descriptor Locks
These icons are bonus post-game rewards for absorbed source labels and pure aliases. They should feel related to the mapped basic descriptor, but they still need their own readable silhouette so the reward set does not look like simple duplicates.

| Alias descriptor | Maps back to | Unique character / silhouette lock | Unique palette lane | Must not look like |
|---|---|---|---|---|
| `Droning` | `Rumble` | long horizontal low hum-bar spirit with slow continuous rings | deep oxblood, muted purple, low ember, dark brown | `Rumble`, `Thump`, `Boomy` |
| `Bassy` | `Boomy` or `Muddy` | oversized rounded bass cushion with a soft blooming underside | deep teal, warm bass orange, muted brown, plum shadow | `Boomy`, `Muddy`, `Bloated` |
| `Lacking` | `Thin` | pale sound silhouette with a missing lower-body cutout | icy blue, pale gray, soft navy, empty white | `Thin`, `Weak`, `Hollow` |
| `Weak` | `Thin` | tiny underpowered sound ember with drooping wave tail | washed-out cyan, weak cream glow, cool gray, navy outline | `Thin`, `Lacking`, `Dull` |
| `Chesty` | `Warm` or `Boxy` | rounded wooden chest-resonator with warm low-mid glow | cedar brown, honey amber, muted rose, plum shadow | `Warm`, `Boxy`, `Cupped` |
| `Colored` | `Honky` | small sound sprite seen through a stained midrange lens | olive gold, muted magenta, brass beige, teal shadow | `Honky`, `Nasal`, `Bright` |
| `Presence` | `Shouty` | small sound figure stepping forward into a focused spotlight halo | amber yellow, warm white, orange, red-brown shadow | `Shouty`, `Aggressive`, `Bright` |
| `Dark` | `Dull` | charcoal eclipse orb swallowing tiny top-light sparkles | charcoal blue, muted violet, dusty navy, dim cream | `Dull`, `Muffled`, `Veiled` |
| `Sharp` | source-only high-frequency edge | precise folded cyan-white edge sprite with one bright clean corner | icy white, electric cyan, pale yellow glint, navy | `Shrill`, `Piercing`, `Harsh`, `Crisp` |

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
| `Sibilant` | hisses, sparkles, slices |
| `Shrill` | pierces, screams, needles |
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
These prompts are intended to be copy-pasteable starting points for all `48` descriptor icons.

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

### 14.1 Basic Descriptor Prompts

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
Create a 1254 x 1254 square descriptor icon for "Harsh". No text or letters. Show upper-mid edge and listening discomfort as a jagged sandpaper scrape-shard creature: a rough torn strip of glowing yellow-orange texture being dragged across a dark surface, with a tiny strained face embedded in the scrape mark. The silhouette should feel abrasive, scratchy, and uneven, with rough edges and tense angular posture, but still charming and storybook rather than scary. Use angular scratch trails, tight pressure lines, hard white-yellow highlights, small rusty sparks, and rough grain texture as supporting audio cues. The icon should feel scratchy, strained, edgy, and fatiguing, not vocal like "Shouty" and not needle-like like "Shrill" or "Piercing". Style: soft hand-painted storybook icon with gritty tactile texture, subtle brush grain, centered full square canvas, readable at small size. Palette: acid yellow, burnt orange, rusty brown, dark plum shadows, bright white highlights. Avoid vocal cones, open shouting mouths, icy needle beams, clean sparkles, gore, violence, weapons, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Dull
```text
Create a 1254 x 1254 square descriptor icon for "Dull". No text or letters. Show broad loss of brightness and detail as a sleepy frosted lantern or dim matte lamp character with a weak blunted glow. The lantern should be the main metaphor: rounded, low-contrast, heavy-lidded, with a tiny tired face on the frosted glass and a soft shade that prevents any sharp sparkle from escaping. Use weak fading wave lines, low-contrast dust, softened edges, and a tiny desaturated inner glow as supporting audio cues. The icon should feel subdued, darkened, softened, and detail-poor, like the treble has been rounded off, not blocked by fabric and not hidden behind a veil. Style: soft hand-painted storybook icon, matte frosted-glass shading, subtle brush grain, centered full square canvas, readable at small size. Palette: charcoal blue, muted gray, dusty navy, soft brown shadows, tiny desaturated cream highlight. Avoid blankets, cotton covers, translucent curtains, bright sparkles, sharp lines, open flames, shiny glass, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Sibilant
```text
Create a 1254 x 1254 square descriptor icon for "Sibilant". No text or letters. Show sharp consonant hiss as a tiny icy whisper-sprite with a narrow slit-like mouth releasing thin silver-blue ribbon trails. The main metaphor should be high-frequency hissing air: precise, narrow, bright, and consonant-focused, like cold air escaping through a tiny gap. Use fine pale-cyan hiss ribbons, bright pinpoints, narrow high-treble streaks, and tiny frost sparkles as supporting audio cues. The icon should feel crisp and hissy, but not painful, not wet, and not explosive. Style: soft hand-painted storybook icon, tactile icy shading, subtle brush grain, centered full square canvas, readable at small size. Palette: icy white, electric blue, pale cyan, dark navy outline, silver highlights. Avoid actual letter shapes, saliva droplets, spray particles, needle beams, harsh scrape shards, large open shouting mouths, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Shrill
```text
Create a 1254 x 1254 square descriptor icon for "Shrill". No text or letters. Show piercing upper-treble intensity as a tiny icy whistle/needle-beam creature squeezed into a thin vertical beam of sound, with a small tense face near the base and a bright ringing halo above. The main silhouette should feel extremely narrow, high, brittle, and over-intense, like a painfully high whistle tone, while staying charming and non-scary. Use thin radiating streaks, glassy highlights, tight tremor marks, tiny ringing arcs, and electric frost particles as supporting audio cues. The icon should feel sharper and more painful than "Sibilant", but less physically penetrating than "Piercing". Style: soft hand-painted storybook icon with crisp icy accents, tactile shading, subtle brush grain, centered full square canvas, readable at small size. Palette: icy blue, white, pale violet, dark navy shadows, electric highlights. Avoid flowing hiss ribbons, slit-mouth whisper sprites, saliva droplets, physical weapons, gore, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Bright
```text
Create a 1254 x 1254 square descriptor icon for "Bright". No text or letters. Show broad pleasant top-end shine as a cheerful sun-prism sound orb opening upward. The orb should be the main character: rounded, clear-eyed, glowing with a wide soft crown of pale gold and cyan light, like detail and shine becoming more visible. Use broad soft rays, clean sparkles, high-positioned light particles, gentle upward wave arcs, and a few prism-like cyan-gold highlights as supporting audio cues. The icon should feel open, clear, lively, and polished, not painful, not sharp, and not weightless. Style: soft hand-painted storybook icon, luminous tactile shading, subtle brush grain, centered full square canvas, readable at small size. Palette: sky blue, pale gold, warm white, soft cyan, gentle navy shadows. Avoid feathers, breeze ribbons, airy floating clouds, crackle marks, needle beams, aggressive spikes, harsh glare, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Airy
```text
Create a 1254 x 1254 square descriptor icon for "Airy". No text or letters. Show high-treble openness as a translucent feather-cloud breeze spirit floating in a wide open sky. The spirit should be the main character: soft, weightless, gently smiling, made from pale feather tufts and transparent breeze ribbons, with lots of calm negative space around it. Use delicate high wave wisps, tiny star dust, faint upward motion trails, and barely visible cyan-gold shimmer as supporting audio cues. The icon should feel spacious, extended, breathing, and light, but not weak, lonely, hollow, or thin. Style: soft hand-painted storybook icon, airy translucent shading, subtle brush grain, centered full square canvas, readable at small size. Palette: pale sky blue, white, soft cyan, faint gold, gentle lavender shadows. Avoid bright sun-orb centers, strong prism beams, heavy ground, crescent/moon shapes, empty sweaters, skinny reed characters, sharp needles, clutter, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

### 14.2 Discovery Descriptor Prompts

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
Create a 1254 x 1254 square descriptor icon for "Metallic". No text or letters. Show upper-edge resonance as a small polished chrome tuning-fork spirit with a simple face and two rounded prongs vibrating in the air. The main metaphor should be clean, shiny, ringing metal: cool, reflective, slightly artificial, and more resonant than "Tinny". Use circular ringing halos, sharp cyan glints, tiny reflected amber flecks, and small vibration ticks around the prongs as supporting audio cues. Keep the silhouette elegant and fork-like, not cup-shaped or can-shaped. The icon should feel steely, glassy, and ringing, but not painfully sharp like "Shrill" and not industrial or photorealistic. Style: soft hand-painted storybook icon, tactile reflective-metal shading, subtle brush grain, centered full square canvas, readable at small size. Palette: silver, blue-gray, dark navy, pale cyan highlights, tiny amber reflections. Avoid dented tin cups like "Tinny", sealed food cans like "Canned", brass horns like "Honky", needle beams like "Shrill", realistic machinery, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Full
```text
Create a 1254 x 1254 square descriptor icon for "Full". No text or letters. Show balanced full-spectrum sound as a round complete character with a warm golden lower body, comfortable middle, and clear sky-blue glow at the crown. The main metaphor should be fullness without excess: everything present, centered, supported, and open. Use broad soft wave arcs around the lower half, gentle mid-body warmth, a few small top-light sparkles, and a calm satisfied face as supporting audio cues. Keep the silhouette round and stable but not swollen; it should feel complete rather than heavy. The icon should feel balanced, rich, open, and reassuring, not merely cozy like "Warm", not dense like "Thick", and not inflated like "Bloated". Style: soft hand-painted storybook icon, tactile warm-to-clear shading, subtle brush grain, centered full square canvas, readable at small size. Palette: warm orange, golden yellow, cream, soft sky-blue highlights, plum shadows. Avoid scarves or ember props like "Warm", plush folds or syrup like "Thick", balloon/cloud swelling like "Bloated", harsh shine, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Thick
```text
Create a 1254 x 1254 square descriptor icon for "Thick". No text or letters. Show dense low-mid body as a squat stack of flattened padded cushion-slabs, like heavy folded velvet blankets compressed by their own weight. The main metaphor should be thickness as tactile density: padded, slow-moving, full-bodied, and slightly compressed. Use broad horizontal layer bands, soft fabric folds, slow rounded wave arcs hugging the stack, and deep warm shadow pockets as supporting audio cues. The character can have calm heavy-lidded eyes tucked into the upper cushion, but the silhouette should be wide, low, layered, and stable rather than round and complete. The icon should feel rich, heavy, and substantial, not merely cozy like "Warm", not balanced and open like "Full", not over-inflated like "Bloated", and not sleepy-soft like "Mellow". Style: soft hand-painted storybook icon, tactile dense-fabric shading, subtle brush grain, centered full square canvas, readable at small size. Palette: deep amber, caramel brown, maroon, muted gold, dark plum shadows. Avoid spiral piles, cone shapes, curled peaks, soft-serve shapes, poop-like silhouettes, glossy food syrup, scarves or ember props like "Warm", round full-spectrum orb shapes like "Full", balloon swelling or cloudy bloat like "Bloated", relaxed sunset cloud shapes like "Mellow", sharp attack marks, thin shapes, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
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

#### Cupped
```text
Create a 1254 x 1254 square descriptor icon for "Cupped". No text or letters. Show enclosed midrange resonance as a tiny sound spirit sitting inside two oversized mitten-like cupped hands that form a warm acoustic bowl. The main metaphor should be sound shaped by cupped hands around it: focused inward, rounded, hollowed slightly, and colored in the mids. Use curved echo lines bouncing between the palms, small concentrated mid-wave arcs, warm internal shadows, and a cozy but slightly nasal chamber glow as supporting audio cues. Keep the hands stylized, simple, and rounded, not realistic. The icon should feel chambered and hand-held, not box-shaped like "Boxy", not brass-horn-like like "Honky", not nose-shaped like "Nasal", and not metal-container-like like "Canned". Style: soft hand-painted storybook icon, tactile palm-and-chamber shading, subtle brush grain, centered full square canvas, readable at small size. Palette: warm tan, muted orange, soft brown, olive-gold highlights, purple shadows. Avoid realistic fingers, anatomical hand detail, bowls without hands, shells, boxes, horns, noses, tin cans, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Pinched
```text
Create a 1254 x 1254 square descriptor icon for "Pinched". No text or letters. Show tight forward midrange as a tiny yellow-green sound sprite correctly pinched in the front jaws of one single side-view wooden clothespin. The clothespin must be one classic spring clothespin only: exactly two wooden pieces total, one top wooden half and one bottom wooden half, joined by one small brass spring/coil near the middle. The front jaw tips of those two wooden halves should press together around the sprite; the rear ends of the same two wooden halves extend backward as handles. Do not add any extra wooden rail, second peg, duplicate lower stick, stacked parallel clothespin, or third/fourth wooden piece. The sprite should not pass through the spring, hinge, or middle of the clothespin. Place the squeezed sprite at the front mouth of the clothespin, with wide soft ends bulging outside the jaws, a tiny puckered face at the compressed point, and a slightly worried but charming expression. Use small pressure ticks at the jaw tips, narrow pale-blue buzzing lines escaping from the squeeze, and tight midrange wave arcs as supporting audio cues. The icon should feel constricted, squeezed, and slightly nasal-colored without showing a nose. Keep the clothespin friendly, toy-like, mechanically believable, and readable from a clear side view. The icon should read as physically pinched, not abstract, not chambered like "Cupped", not nose-shaped like "Nasal", not brass-horn-like like "Honky", and not abrasive like "Harsh". Style: soft hand-painted storybook icon, tactile wood-and-rubbery-sprite shading, subtle brush grain, centered full square canvas, readable at small size. Palette: yellow-green sprite, warm wood tan, muted beige, brass spring, olive shadows, small pale-blue buzz highlights. Avoid symmetrical butterfly shapes, four-pad clamp layouts, duplicate clothespins, stacked parallel pegs, extra wooden slats, objects threaded through the center, objects pinched at the hinge, medical imagery, realistic noses, nostrils, fingers pinching skin, metal pliers, sharp clamps, horns, cupped hands, scrape shards, pain/gore, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Aggressive
```text
Create a 1254 x 1254 square descriptor icon for "Aggressive". No text or letters. Show forceful forward presence as a compact wedge-shaped sound creature leaning hard into a hot curved wave-front, like it is pushing the sound toward the listener. The main metaphor should be pressure and assertiveness: forward, tense, insistent, and energized without becoming violent. Give the creature a low braced stance, angled eyebrows, a bright hot core, and a rounded triangular body pointing forward. Use stacked forward pressure arcs, short angular motion ticks, hard amber-white edge glow, and compressed heat haze as supporting audio cues. The icon should feel pushy and intense, not vocal like "Shouty", not scratchy like "Harsh", not exhausted like "Fatiguing", and not punch/fist-based like "Punchy". Style: soft hand-painted storybook icon, tactile hot-pressure shading, subtle brush grain, centered full square canvas, readable at small size. Palette: hot yellow, burnt orange, red-brown, dark plum shadows, bright white highlights. Avoid open shouting mouths, vocal cones, boxing gloves, fists, weapons, explosions, jagged scrape shards, tired/drooping fatigue faces, gore, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```


#### Crisp - Wafer Snap
```text
Create a 1254 x 1254 square descriptor icon for "Crisp". No text or letters. Show clean treble detail and transient snap as a thin golden wafer-tile sound sprite with one cleanly snapped corner. The main metaphor should be crisp articulation: dry, light, quick, delicately crunchy, and sharply defined without becoming harsh or brittle. Give the wafer-sprite a small alert face, a simple thin square-or-diamond wafer silhouette, subtle baked texture, one tidy break line at the corner, and tiny bright crumb-like crackle glints that behave like audio particles rather than messy food crumbs. Use fine high-frequency tick marks, pale-blue sparkle particles, soft gold pinpoints, and short clean snap arcs as supporting audio cues. The icon should feel precise and snappy, not natural/leafy, not paper-like, not broad and glowing like "Bright", not hissy like "Sibilant", not abrasive like "Harsh", and not shattered like "Brittle". Style: soft hand-painted storybook icon with crisp highlights, tactile wafer texture, subtle brush grain, centered full square canvas, readable at small size. Palette: pale golden wafer, cream, toasted beige, pale blue shadows, mint-cyan edge glow, navy outline. Avoid leaf silhouettes, folded paper, cookies, chocolate, crumbs as mess, plates, bite marks, sun-prism orbs, long hiss ribbons, jagged scrape shards, shattered glass, many cracks, needle beams, aggressive spikes, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Distant
```text
Create a 1254 x 1254 square descriptor icon for "Distant". No text or letters. Show reduced presence as a tiny sound sprite standing far away at the end of a misty blue hallway or soft foggy valley. The main metaphor should be distance: small scale, lots of quiet foreground space, softened detail, and echoes fading before they reach the listener. Place the character clearly far from the viewer, with a tiny readable face, long soft floor shadow, pale atmospheric perspective, and receding curved walls or valley sides that guide the eye inward. Use faint echo rings around the tiny sprite, small fading wave marks, low-contrast dust motes, and cool mist as supporting audio cues. The icon should feel far-away and recessed, not empty like "Hollow", not icy like "Cold", not hidden behind fabric like "Veiled", and not covered or trapped like "Buried". Style: soft hand-painted storybook icon, tactile misty shading, subtle brush grain, centered full square canvas, readable at small size. Palette: pale blue-gray, muted lavender, fog white, soft navy, dim cool highlights. Avoid empty clothing, frozen ice forms, curtains or gauze screens, dirt piles, buried layers, strong foreground detail, clutter, bright warm glow, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
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


#### V-shaped Candidate - Prominent Chevron
```text
Create a 1254 x 1254 square descriptor icon for "V-shaped". No text or letters. Show bass and treble emphasis with a recessed middle as a prominent soft chevron sound creature: two thick diagonal arms rise upward from a low central vertex, forming an unmistakable capital V shape. The left arm should be warm orange-brown for boosted bass, the right arm should be cool blue with treble sparkles, and the low center point should be dimmer and quieter to show recessed mids. The main metaphor should be a V-shaped tonal contour without drawing a technical graph: raised low end on the left, raised high end on the right, and a clearly lowered middle point. Give the creature a tiny friendly face near the low vertex, but keep the V silhouette dominant at thumbnail size. Use low warm bass ripples around the left raised arm, fine cool sparkle marks around the right raised arm, a thin soft gold highlight tracing the inner V, and muted shadow pooled at the center vertex as supporting audio cues. The icon should feel iconic, geometric, and readable, not rounded into a U-shape, not a smooth smile curve, not a landscape valley, not complete/full like "Full", not exaggerated/glossy like "Hyped", and not thrill-sparked like "Exciting". Style: soft hand-painted storybook icon, tactile glowing-chevron shading, rounded edges but clear angular V geometry, subtle brush grain, centered full square canvas, readable at small size. Palette: deep orange-brown bass side, cool blue treble side, soft gold inner highlight, dark purple shadows. Avoid literal graph axes, equalizer lines, measurement ticks, text, labels, numbers, U-shapes, horseshoe shapes, smooth smile arcs, landscape hills, overdone grin faces, giant mouth imagery, explosive sparkles, transparent corners, and baked rounded-corner frames.
```

#### Brittle
```text
Create a 1254 x 1254 square descriptor icon for "Brittle". No text or letters. Show light body plus exposed high-frequency fragility as a delicate cracked icy shell creature, intact but visibly close to breaking. The main metaphor should feel fragile, dry, rigid, and breakable: a thin pale shell with hairline stress cracks, tiny chipped edges, and a small anxious face peeking from the shell surface. Use fine crackle lines, small glassy shimmer particles, tiny cold snap marks, and pale high-frequency glints as supporting audio cues. Keep the silhouette compact and shell-like, not a tall reed, not a needle beam, and not a fresh crisp leaf or paper snap. The icon should feel fragile and dry, not merely body-light like "Thin", not painful like "Shrill", not frozen-hollow like "Cold", and not clean/snappy like "Crisp". Style: soft hand-painted storybook icon with crisp detail, tactile translucent-shell shading, subtle brush grain, centered full square canvas, readable at small size. Palette: icy blue, pale white, cool gray, faint violet, navy outline. Avoid dangerous broken glass realism, shattered shards everywhere, gore, tall reed silhouettes like "Thin", vertical whistle beams like "Shrill", frozen cave hollows like "Cold", leaf/paper/wafer snap shapes like "Crisp", text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
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

#### Hyped
```text
Create a 1254 x 1254 square descriptor icon for "Hyped". No text or letters. Show smile-shaped tone with extra consonant bite as a dramatic curved sound landscape with a big rounded bass side, sparkling bright side, and a recessed hollow middle. The main metaphor should feel exaggerated, glossy, and exciting but slightly overdone. Use low bass waves, high spark lines, and a wide sweeping smile-shaped motion path as supporting audio cues, without drawing graph axes. Style: soft hand-painted storybook icon, tactile shading, subtle brush grain, centered full square canvas, readable at small size. Palette: deep orange-brown, electric blue highlights, gold sparkles, dark purple shadows. Avoid literal EQ graphs, text, labels, numbers, transparent corners, and baked rounded-corner frames.
```

#### Hyped V2 Candidate - Overinflated Smile-Booster Creature
```text
Create a 1254 x 1254 square descriptor icon for "Hyped" as a v2 candidate. No text or letters. Show overdone boosted lows and highs with a scooped middle as an overinflated smile-booster sound creature shaped like a wide U/smile curve. Give it two swollen boosted ends: a huge warm orange-brown bass cheek on the left, a bright electric-blue treble cheek on the right, and a small recessed quiet middle squeezed low between them. The main silhouette should be concrete and character-like, not abstract: a rounded inflated booster body that clearly shows exaggerated low-end and high-end lift around a scooped center. The face should be tiny and tucked into the recessed middle, matching the existing collection language from "Warm", "Cupped", and "Brittle": simple dark marks only, small smug closed-eye arcs, and a tiny pleased mouth. Use thick low bass ripples around the warm swollen cheek, sharp high spark lines around the bright blue cheek, a wide sweeping smile-shaped motion path, glitter particles, and small quiet muted wave marks trapped in the low recessed middle. Keep the icon distinct from "V-shaped", "Exciting", and "Full": more inflated and exaggerated than "V-shaped", more tonal and booster-shaped than "Exciting", and not complete-spectrum balanced like "Full". Style: soft hand-painted storybook icon, tactile inflated-body shading, subtle brush grain, rounded expressive shapes, painterly glow, centered full square canvas, readable at small size. Palette: deep orange-brown bass side, electric blue treble side, gold sparkles, dark purple shadows, warm amber glow, small pale cyan glints. Avoid abstract elemental wave only, literal EQ graph axes, measurement ticks, labels, text, letters, numbers, technical charts, giant mouth imagery, teeth, chaotic explosions, mountain monoliths, complete-spectrum orbs, large glossy eyes, detailed irises, anime face, watermark, transparent corners, and baked rounded-corner frames.
```

#### Buried
```text
Create a 1254 x 1254 square descriptor icon for "Buried". No text or letters. Show too much low/mid masking with reduced clarity as a tiny sound character almost completely covered under layers of earth, fabric, or heavy clouds. Only small eyes or a faint glow should peek through. Use muffled low wave lines trapped below the layers, dust, and dim top light as supporting audio cues. The icon should feel hidden and overloaded, not scary. Style: soft hand-painted storybook icon, tactile shading, subtle brush grain, centered full square canvas, readable at small size. Palette: dark brown, muddy orange, muted olive, deep purple shadows, faint amber glow. Avoid horror, text, labels, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Piercing
```text
Create a 1254 x 1254 square descriptor icon for "Piercing". No text or letters. Show body loss plus stacked upper-mid and treble emphasis as a thin hollow sound shell struck through by a narrow bright beam of sound. The main metaphor should feel sharply penetrating and high, while staying storybook and non-violent. Use tight high-frequency streaks, tiny sparkle shards, a lean body shape, and tense pressure rings as supporting audio cues. Style: soft hand-painted storybook icon with crisp bright accents, tactile shading, subtle brush grain, centered full square canvas, readable at small size. Palette: icy white, electric blue, pale yellow glare, dark navy, muted violet shadows. Avoid weapons, gore, text, labels, technical charts, transparent corners, and baked rounded-corner frames.
```

### 14.3 Bonus Alias Descriptor Prompts

These are post-game reward icons for absorbed alias/source labels. They should be generated only after the main `18` basics and `30` discoveries. Each alias icon should feel connected to its mapped basic family while still reading as a distinct collectible.

#### Droning
```text
Create a 1254 x 1254 square bonus alias descriptor icon for "Droning". No text or letters. Show a continuous low monotone as a long horizontal low hum-bar spirit resting close to the ground, with a tiny sleepy face embedded in the bar and slow rings spreading outward. The main metaphor should feel sustained, deep, repetitive, and unmoving: a drone that does not hit, bounce, or bloom. Use broad low vibration bands, dark ground shadow, faint ember glow inside the hum-bar, and a few slow dust motes as supporting audio cues. The icon should feel related to "Rumble" but more continuous and less subterranean. Style: soft hand-painted storybook icon, tactile low-frequency shading, subtle brush grain, centered full square canvas, readable at small size. Palette: deep oxblood, muted purple, dark brown, low ember orange, soft smoke. Avoid impact marks like "Thump", swollen cave shapes like "Boomy", underground landscape faces like "Rumble", text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Bassy
```text
Create a 1254 x 1254 square bonus alias descriptor icon for "Bassy". No text or letters. Show abundant bass as an oversized rounded bass cushion with a soft blooming underside and a tiny relaxed face tucked into the upper curve. The main metaphor should feel bass-heavy, rounded, warm-low, and broad, but not muddy or bloated. Use wide low wave arcs around the bottom, soft orange bass glow, a deep teal shadow, and gentle pressure rings as supporting audio cues. The icon should feel related to "Boomy" and "Muddy" without becoming a cave, mud cloud, or over-inflated balloon. Style: soft hand-painted storybook icon, tactile cushion-like shading, subtle brush grain, centered full square canvas, readable at small size. Palette: deep teal, warm bass orange, muted brown, plum shadow, low amber glow. Avoid muddy fog, cave-bell bodies, balloon seams, explosive bass, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Lacking
```text
Create a 1254 x 1254 square bonus alias descriptor icon for "Lacking". No text or letters. Show missing body and foundation as a pale sound silhouette with a clean empty lower-body cutout, like the warmth and weight have been removed. The main metaphor should feel absent, underfilled, and incomplete rather than merely tiny. Use thin blue wave wisps that fade before reaching the bottom, open white negative space inside the missing section, cool shadow, and small weak glints as supporting audio cues. The icon should feel related to "Thin" but more about absence than narrowness. Style: soft hand-painted storybook icon, tactile translucent shading, subtle brush grain, centered full square canvas, readable at small size. Palette: icy blue, pale gray, soft navy, empty white, faint cyan. Avoid tall reed silhouettes like "Thin", empty clothing like "Hollow", drooping weak embers like "Weak", text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Weak
```text
Create a 1254 x 1254 square bonus alias descriptor icon for "Weak". No text or letters. Show low energy and reduced foundation as a tiny underpowered sound ember with a drooping wave tail and a small tired face made from simple dark marks. The main metaphor should feel faint, low-output, and unable to push forward, but still gentle and musical. Use weak fading wave arcs, a small cream glow nearly going out, cool gray haze, and lots of quiet space as supporting audio cues. The icon should feel related to "Thin" and "Lacking" but more emotionally underpowered than physically empty. Style: soft hand-painted storybook icon, tactile dim-glow shading, subtle brush grain, centered full square canvas, readable at small size. Palette: washed-out cyan, weak cream glow, cool gray, navy outline, pale blue shadow. Avoid tall icy reeds, missing cutout silhouettes, dark lanterns like "Dull", text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```

#### Chesty
```text
Create a 1254 x 1254 square bonus alias descriptor icon for "Chesty". No text or letters. Show broad low-mid resonance as a rounded wooden chest-resonator with a warm glow inside, like a small cedar storage chest humming gently. The main metaphor should feel warm, woody, resonant, and low-mid filled, without becoming boxy or muffled. Give the chest soft rounded edges, a tiny calm face suggested by the front grain, and low rounded wave arcs coming from inside. Use honey glow, cedar texture, muted rose shadows, and small warm dust motes as supporting audio cues. The icon should feel related to "Warm" and "Boxy" but more chest-resonant and less scarf-like or cardboard-like. Style: soft hand-painted storybook icon, tactile wood-and-glow shading, subtle brush grain, centered full square canvas, readable at small size. Palette: cedar brown, honey amber, muted rose, plum shadow, warm cream highlights. Avoid anatomical chests, lungs, ribs, scarves like "Warm", cardboard boxes like "Boxy", cupped hands, text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
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

#### Sharp
```text
Create a 1254 x 1254 square bonus alias descriptor icon for "Sharp". No text or letters. Show clean high-frequency edge as a precise folded cyan-white edge sprite with one bright clean corner and a tiny focused face made from simple dark marks. The main metaphor should feel exact, edged, and high-definition, but not painful, violent, or abrasive. Use a single crisp corner highlight, tight cyan glints, short high-frequency tick marks, and clean narrow wave arcs as supporting audio cues. The icon should feel like a clear edge, not a weapon, needle, scrape, or piercing beam. Style: soft hand-painted storybook icon with crisp accents, tactile folded-edge shading, subtle brush grain, centered full square canvas, readable at small size. Palette: icy white, electric cyan, pale yellow glint, dark navy, faint violet shadow. Avoid knives, blades, needles, weapons, needle beams like "Shrill", sound beams like "Piercing", sandpaper shards like "Harsh", wafer snaps like "Crisp", text, labels, numbers, technical charts, transparent corners, and baked rounded-corner frames.
```
