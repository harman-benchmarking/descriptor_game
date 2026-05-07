# Descriptor Game Image Style Analysis

Use this reference when generating, revising, or evaluating project images.

## Existing Image DNA

The project style is a hand-painted fantasy audio language. The images are not technical icons. They are tiny emotional scenes where a listening descriptor becomes a creature, object, landscape, or physical event.

Core traits:

- Storybook digital painting, not flat vector art.
- Soft bloom and local glow tied to the sound source.
- Full-square atmospheric backgrounds with safe central composition.
- One clear metaphor per image.
- Simple creature faces are common, but the face is not the whole concept.
- Audio cues are integrated into the scene as rings, waves, airflow ribbons, cracks, sparks, static, or pulses.
- Edges are painterly and slightly imperfect.
- Color lanes carry meaning: warm body, cold thinness, electric artifacts, low bass pressure, airy treble openness.

Useful visual anchors in `assets-source/descriptors/`:

- `rumble.png`: low, wide, grounded body; earth-spirit creature; slow tremor rings; burnt orange/brown low-end glow.
- `thump.png`: squat percussion body; dust, bounce, impact; still warm but more active than Rumble.
- `warm.png`: wrapped glowing creature; soft orange comfort; dense but readable.
- `thin.png`: tall fragile sliver; pale negative space; sparse icy palette.
- `hollow.png`: empty cloak/tube body; inner absence; blue-gray echo rings.
- `airy.png`: floating wind creature; open sky; high negative space; white-blue glow.
- `glassy.png`: sharp reflective gem; icy highlights; hard triangular silhouette.
- `sibilant.png`: small bright wind creature with slicing airflow; fast treble motion.
- `snappy.png`: sudden burst and tight recoil; high-contrast dynamic action.
- `compressed.png`: subject held between pressure plates; visible squeeze and contained energy.
- `pumping.png`: creature surrounded by rhythmic pressure rings; cyclic motion.
- `clipped.png`: hard top/bottom cutoff; glowing body trapped by a ceiling/floor.
- `hiss.png`: ghostly static texture; noisy spectral veil.
- `dropout.png`: interrupted line/path; visible missing signal gap.
- `burst.png`: sudden rupture creature; brief high-energy event, not a long glow.

## Descriptor Cards

Descriptor cards should be intimate and characterful. The preferred subject is one creature, prop, or small scene with a readable silhouette. The image should feel like an encounter with a sound.

Composition:

- Center the main metaphor in the central 60-70 percent of the canvas.
- Leave enough margin for app-side rounded card clipping.
- Use background atmosphere to explain scale and frequency, not to add unrelated scenery.
- Keep the silhouette recognizable even if the face is hidden.

Creature rule:

- Include a creature element when it helps the descriptor feel alive.
- Let the creature be made from the acoustic metaphor: earth for Rumble, airflow for Airy, static for Hiss, pressure for Compressed.
- Avoid adding a generic mascot beside the metaphor. The metaphor should be the creature.

Audio cue rule:

- Bass: wide rings, ground tremors, pressure waves, heavy shadows.
- Mid/body: chambers, boxes, tubes, warmth wraps, resonance shapes.
- Treble: sparks, glints, sharp rays, thin airflow, crystalline edges.
- Spatial: position beams, left/right bias, near/far scale, depth haze, room reflections.
- Dynamic: impact trails, rebound, pressure plates, motion arcs, ceilings, release tails.
- Integrity: cracks, missing gaps, static grains, electrical veins, pops, scratches, signal fractures.

## Discovery And Alias Cards

Discovery cards use the same visual language as basics, but the metaphor can show a blend or higher-order state.

Rules:

- Do not show the recipe as two separate icons pasted together.
- Fuse the recipe into one new visual body.
- A discovery should look claimable and special, but still belong in the same card family.
- Alias cards should look like real descriptor cards, not glossary decorations.

Examples:

- `scooped.png`: a curved basin/body that naturally implies hollowed middle plus high openness.
- `cold.png`: pale hollow body, thinness, and airy emptiness fused into one scene.
- `empty.png` and `faded.png`: very low substance with careful negative space; avoid blank or broken-file-looking images.

## Atlas Regions

Region images are map entrances, not card portraits. They should feel like a place the player enters.

Traits:

- Wider environmental scale inside the same square format.
- No single mascot requirement.
- Strong terrain or architectural identity.
- Frequency or descriptor chemistry appears as rivers, canyons, towers, rifts, fog, stages, halls, springs, basins, or fields.
- More detail is allowed than card icons, but the major structure must still read as a thumbnail.

Useful anchors in `assets-source/region/`:

- `spectrial-region-a-thunderstep-highlands.png`: bass impact as a glowing central vertical axis and circular tremor field.
- `spectrial-region-b-emberbody-valley.png`: warm/body descriptors as a glowing valley and rounded terrain.
- `spectrial-region-g-frosthollow-expanse.png`: hollow/cold/empty descriptors as a pale cavern expanse.
- `spatial-region-1-anchorpoint-stage.png`: position descriptors as an anchored stage with direction and depth.
- `dynamic-region-1-snapback-springs-v3.png`: dynamic recoil as spring platforms and energy arcs.
- `integrity-region-1-faultveil-rift-v2.png`: artifacts as fractured terrain, static, and unstable signal color.

## Buildings

Buildings represent tools or learning places. They should feel like campus destinations with a function.

Rules:

- Use stronger architecture than descriptor cards.
- Keep the function visible through props, rooms, devices, gates, or instruments.
- Do not make buildings look like atlas regions unless the user explicitly wants a map-zone feeling.

## Color And Shape Lanes

Use these lanes to avoid visual collisions:

| Meaning | Palette | Shape |
|---|---|---|
| low bass pressure | dark earth, ember, brown, muted purple | low, wide, heavy, circular |
| impact | amber dust, warm shadow, focused glow | squat, bouncing, contact marks |
| warmth/body | orange, gold, red-plum | rounded, wrapped, full, soft |
| thin/cold/empty | pale blue, white, gray-blue | narrow, small, sparse, isolated |
| hollow/scooped | blue-gray, deep navy, cool white | cavity, cloak, tunnel, concave basin |
| treble shine | white, sky blue, pale gold | sparks, high particles, open space |
| glass/sibilance | icy blue, hard white, electric highlight | shards, blades, thin airflow |
| dynamic motion | orange, magenta, electric blue on dark | arcs, recoil, squeeze, impact traces |
| integrity artifacts | cyan, magenta, acid green, black | cracks, static, missing chunks, signal scars |
| spatial stage | blue/cyan depth, amber anchor lights | beams, stages, plus-axis, room cues |

## Prompt Design Rules

Good prompts in this project usually specify:

1. The listening meaning in plain language.
2. A physical metaphor.
3. A locked silhouette.
4. Audio cues.
5. Palette.
6. Nearby descriptors it must not resemble.
7. Format constraints.

Keep prompts concrete. Prefer "a sleepy earth-spirit embedded in a low rounded ground slab with slow tremor rings" over "a bass-themed creature".

## Common Failure Modes

Avoid:

- Generic cute characters with no acoustic metaphor.
- Pretty fantasy scenes without visible audio cues.
- Technical EQ graphs, meters, or UI panels inside card art.
- Overly similar backgrounds across descriptors.
- Tiny facial expressions carrying the whole meaning.
- Photorealistic instruments, speakers, headphones, or studio gear unless explicitly requested.
- Transparent corners or pre-rounded PNG masks.
- Discovery recipes shown as two unrelated icons side by side.
- Region icons that look like descriptor portraits.

## Thumbnail QA Routine

When reviewing a candidate image:

1. View it at full size and at roughly card-thumbnail size.
2. Ask whether the metaphor is readable without a label.
3. Compare it against the two nearest descriptors by meaning and color.
4. Check whether the app's rounded card clipping would cut off meaningful details.
5. If it fails, revise the silhouette first, then the palette, then small details.
