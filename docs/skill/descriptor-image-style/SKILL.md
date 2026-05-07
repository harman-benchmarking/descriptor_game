---
name: descriptor-image-style
description: Generate, revise, or evaluate Descriptor Game images and prompts in the established hand-painted storybook audio-metaphor style. Use when creating descriptor, discovery, alias, atlas-region, building, or placeholder-replacement images; when checking whether a new asset matches the project style; or when writing prompt text for assets-source image generation.
---

# Descriptor Image Style

## Core Workflow

1. Identify the target type:
   - Descriptor, discovery, or alias card: one readable creature, prop, or tiny scene that embodies one listening word.
   - Atlas region: a larger map-like place that contains the chemistry of several descriptors.
   - Building: a campus/lab place for a function, not a descriptor.
2. Read [style-analysis.md](references/style-analysis.md) before writing prompts or judging images. Use `docs/descriptor-icon-design-language.md` only when exact legacy prompt wording or per-descriptor locks are needed.
3. Pick one primary metaphor before adding decoration. The image should answer: "What physical thing does this sound become?"
4. Add audio evidence second: waveform ribbons, vibration rings, tremor lines, spark trails, gaps, static, pressure halos, or glowing frequency traces.
5. Preserve the collection format: `1254 x 1254`, fully filled square PNG, no text, no labels, no transparent corners, no baked rounded mask.
6. Keep the image readable as a small card thumbnail. Large silhouette, clear value contrast, and one dominant action matter more than detail.

## Prompt Skeleton

```text
Create a 1254 x 1254 square Descriptor Game image for "[NAME]".
No text, no letters, no numbers, no UI symbols.
Target type: [descriptor card | discovery card | alias card | atlas region | building].

Primary metaphor: [one simple physical/creature/place metaphor].
Acoustic meaning: [what the listener should hear].
Main silhouette: [locked creature, prop, object, terrain, or room shape].
Audio cues: [waves, rings, glow, particles, rupture marks, stereo position cues, etc.].
Emotion/action: [trembles, hugs, slices, floats, collapses, glitches, snaps, etc.].

Style: hand-painted storybook digital illustration, soft bloom, tactile brush grain,
rounded expressive forms unless the descriptor is intentionally sharp or broken,
cinematic local lighting, readable at thumbnail size, centered composition,
full square canvas with safe margins.
Palette: [descriptor-appropriate color lane].

Avoid: text, technical charts, generic speaker icons, flat vector art, photorealism,
clutter, transparent corners, baked rounded corners, and looking too similar to [nearest neighbors].
```

## Asset Placement

Use existing project folders when turning a prompt into a real asset:

- Descriptor, discovery, and alias card source images: `assets-source/descriptors/`
- Atlas region source images: `assets-source/region/`
- Building source images: `assets-source/buildings/`

After adding source images, sync the web app with:

```powershell
npm.cmd run sync:assets
```

Run it from `web/app` unless the package script is invoked another way in the active task.

## Acceptance Check

Before accepting a generated image:

- It still reads at `48 x 48`.
- The metaphor is understandable without the filename.
- The visual has at least one audio cue.
- The subject sits safely inside the square and will survive app-side rounded clipping.
- The palette and silhouette separate it from nearby descriptors.
- It feels like the same family as `rumble.png`, `warm.png`, `thin.png`, `airy.png`, `snappy.png`, and `hiss.png`.
