# Descriptor Alias Vocabulary

Date: 2026-04-27

Status: active MVP reference

Related app file:
- `web/app/src/cards/aliasVocabulary.ts`

## 1. Purpose

Alias cards teach flexible listening language.

The main descriptor cards are stable anchors. They represent the game's trained listening targets and can apply DSP. Alias cards are different: they are vocabulary cards that show how real listeners may use softer, broader, or context-dependent words around those anchors.

Aliases should help the learner translate human language into the game's descriptor system without pretending that every word has one fixed technical meaning.

## 2. Card Layer Rule

| Layer | Meaning | DSP behavior |
|---|---|---|
| Basic descriptor | Stable trained listening anchor | Applies DSP |
| Discovery | Named blend or recipe of basic descriptors | Expands to ingredient basics |
| Alias | Flexible vocabulary around one or more anchors | No DSP |

Alias cards should not be available in the Laboratory as active sound cards.

## 3. Hard Rules

1. An alias label must not collide with a discovery label.
2. If a word clearly describes a combination, it should be a discovery, not an alias.
3. If a word can point to more than one basic descriptor, it can become an ambiguous alias.
4. One alias label should have one Lexicon Hall test.
5. A test can have more than one correct answer.
6. MVP tests use four answer choices.
7. Alias cards unlock into Collection, but they do not count as basic or discovery progress.
8. Avoid near-duplicate labels that only rephrase, pluralize, or lightly modify the card name, such as `Bloomy` for `Boomy` or `Tick` for `Click`.

## 4. Current Live Alias Cards

There are currently 15 unique alias labels in the app.

There are 16 alias-to-anchor assignments because `Electrical` maps to two anchors.

`Bassy` has been promoted out of the alias hall and is now a discovery card: `Boomy + Boxy -> Bassy`.

The app now uses real alias icons instead of `0000` placeholders for these live vocabulary cards.

| Alias | Kind | Anchor card(s) | Icon file | Summary |
|---|---|---|---|---|
| `Droning` | single anchor | `Rumble` | `droning.png` | Sustained low movement pointing toward Rumble. |
| `Lacking` | single anchor | `Hollow` | `lacking.png` | A casual way to describe a missing center or empty body. |
| `Weak` | single anchor | `Thin` | `weak.png` | An emotional word for missing weight or foundation. |
| `Colored` | single anchor | `Honky` | `colored.png` | Midrange tone that sounds tinted or shaped. |
| `Presence` | single anchor | `Shouty` | `presence.png` | Forward upper-mid energy that brings sound closer. |
| `Dark` | single anchor | `Dull` | `dark.png` | Reduced top-end light and detail. |
| `Lightweight` | single anchor | `Thin` | `lightweight.png` | A papery word for sound that cannot carry much body or weight. |
| `Edgy` | single anchor | `Harsh` | `edgy.png` | A casual word for upper sound that feels hard, abrasive, or tiring. |
| `Shiny` | single anchor | `Bright` | `shiny.png` | A broad word for extra top-end light and polished glint. |
| `Extended` | single anchor | `Airy` | `extended.png` | A word for treble that reaches upward and keeps open space above the tone. |
| `Shrill` | single anchor | `Sibilant` | `shrill.png` | A strong human-language word for painful sibilance or over-forward high consonants. |
| `Anechoic` | single anchor | `Dry` | `anechoic.png` | A technical word for sound with almost no room reflection around it. |
| `Echoey` | single anchor | `Reverberant` | `echoey.png` | A casual word for sound whose room reflections keep returning after the source. |
| `Electrical` | ambiguous | `Hum`, `Buzz` | `electrical.png` | A broad fault word for powered interference that may be smooth like Hum or rough like Buzz. |
| `Burst` | single anchor | `Pop` | `burst.png` | A larger single playback fault that jumps out once and vanishes. |

## 5. Current Live Tests

### Droning

Prompt:

```text
The low end keeps rolling underneath the music.
```

Correct answer:
- `Rumble`

Choices:
- `Thump`
- `Rumble`
- `Punchy`
- `Boomy`

Feedback:

```text
That sustained sub movement is closest to Rumble.
```

### Lacking

Prompt:

```text
The sound feels empty in the middle, like the body has been scooped out.
```

Correct answer:
- `Hollow`

Choices:
- `Thin`
- `Dull`
- `Hollow`
- `Softened`

Feedback:

```text
That missing center points toward the Hollow anchor.
```

### Weak

Prompt:

```text
The sound lacks weight and cannot push forward.
```

Correct answer:
- `Thin`

Choices:
- `Softened`
- `Flat`
- `Thin`
- `Hollow`

Feedback:

```text
Weak can mean reduced body, so Thin is the closest anchor here.
```

### Colored

Prompt:

```text
Voices sound tinted by a cup-like midrange color.
```

Correct answer:
- `Honky`

Choices:
- `Boxy`
- `Nasal`
- `Warm`
- `Honky`

Feedback:

```text
That projected mid color points toward Honky.
```

### Presence

Prompt:

```text
The vocal steps forward and becomes more immediate.
```

Correct answer:
- `Shouty`

Choices:
- `Bright`
- `Sibilant`
- `Shouty`
- `Harsh`

Feedback:

```text
Forward upper-mid push is the Shouty anchor.
```

### Dark

Prompt:

```text
Cymbals and small details lose light at the top.
```

Correct answer:
- `Dull`

Choices:
- `Hollow`
- `Dull`
- `Muddy`
- `Warm`

Feedback:

```text
Reduced top detail is the Dull anchor.
```

### Lightweight

Prompt:

```text
The sound feels papery and underfilled, like it cannot hold much weight.
```

Correct answer:
- `Thin`

Choices:
- `Hollow`
- `Thin`
- `Softened`
- `Dull`

Feedback:

```text
That missing weight and body points toward the Thin anchor.
```

### Edgy

Prompt:

```text
Guitars and vocals have a rough upper edge that starts to feel uncomfortable.
```

Correct answer:
- `Harsh`

Choices:
- `Sibilant`
- `Harsh`
- `Shouty`
- `Bright`

Feedback:

```text
That abrasive upper edge points toward Harsh.
```

### Shiny

Prompt:

```text
Cymbals and vocal details catch extra glossy light at the top.
```

Correct answer:
- `Bright`

Choices:
- `Airy`
- `Bright`
- `Sibilant`
- `Harsh`

Feedback:

```text
General top-end shine is closest to Bright before it becomes bite or hiss.
```

### Extended

Prompt:

```text
The very top seems to reach upward, with breath and cymbal tails floating above the mix.
```

Correct answer:
- `Airy`

Choices:
- `Bright`
- `Glassy`
- `Airy`
- `Sibilant`

Feedback:

```text
That high reach and open air points toward Airy more than ordinary Bright.
```

### Shrill

Prompt:

```text
The S sounds and cymbal edges feel painfully sharp and too forward.
```

Correct answer:
- `Sibilant`

Choices:
- `Sibilant`
- `Glassy`
- `Harsh`
- `Bright`

Feedback:

```text
Shrill is strong listener language for painful sibilance here, so the closest anchor is Sibilant.
```

### Anechoic

Prompt:

```text
A voice sounds close and reflection-free, with notes stopping almost immediately.
```

Correct answer:
- `Dry`

Choices:
- `Near`
- `Dry`
- `Centered`
- `Reverberant`

Feedback:

```text
Reflection-free space points toward Dry.
```

### Echoey

Prompt:

```text
A clap keeps coming back from the room after the source has stopped.
```

Correct answer:
- `Reverberant`

Choices:
- `Wide`
- `Far`
- `Dry`
- `Reverberant`

Feedback:

```text
Obvious returning room reflections point toward Reverberant.
```

### Electrical

Prompt:

```text
A powered-on tone or vibration sits under the music and feels separate from the song.
```

Correct answers:
- `Hum`
- `Buzz`

Choices:
- `Hiss`
- `Hum`
- `Buzz`
- `Static`

Feedback:

```text
Electrical is broad enough that Hum and Buzz can both be valid fault anchors.
```

### Burst

Prompt:

```text
One rounded fault jumps out during a quiet gap, bigger than a tiny click but still just one moment.
```

Correct answer:
- `Pop`

Choices:
- `Click`
- `Pop`
- `Crackle`
- `Dropout`

Feedback:

```text
That single larger fault event points toward Pop.
```

## 6. Discovery Boundary Words

These words may look like aliases, but in this game they should remain discoveries because they describe recipes.

| Word | Discovery recipe | Reason |
|---|---|---|
| `Tinny` | `Thin + Harsh` | Needs body loss plus hard upper edge. |
| `Chesty` | `Warm + Boxy` | Needs body plus enclosed low-mid resonance. |
| `Metallic` | `Harsh + Glassy` | Needs hard edge plus reflective upper-treble sheen. |
| `Muffled` | `Muddy + Dull` | Needs cloud plus missing detail. |
| `Crisp` | `Bright + Glassy` | Needs shine plus hard polished definition. |
| `Cold` | `Thin + Hollow + Airy` | Needs missing body plus exposed air. |
| `Sharp` | `Bright + Harsh` | Needs shine plus hard upper edge. |
| `Empty` | `Thin + Hollow` | Needs missing foundation plus missing center body. |
| `Faded` | `Thin + Dull` | Needs body loss plus reduced detail. |

## 7. Activated Alias Batch

Aliases should be added in very small batches instead of dumping every synonym into the game.

This active batch stays small, favors clear non-dynamic words, and avoids adding a word if it only creates a second casual label for an anchor that already has one.

| Alias | Anchor(s) | Kind | Note |
|---|---|---|---|
| `Lightweight` | `Thin` | single anchor | More concrete than Weak. |
| `Edgy` | `Harsh` | single anchor | Common upper-edge vocabulary. |
| `Shiny` | `Bright` | single anchor | Clear broad top-end shine word. |
| `Extended` | `Airy` | single anchor | Useful for high-treble reach and air. |
| `Anechoic` | `Dry` | single anchor | Technical but distinct: little to no room reflection. |
| `Echoey` | `Reverberant` | single anchor | Clear room-reflection language. |
| `Electrical` | `Hum`, `Buzz` | ambiguous | Broad fault-language word for tonal electrical interference. |
| `Burst` | `Pop` | single anchor | Sudden larger fault event. |

### Icon Prompts And Player-Facing Details

These prompts are for future alias vocabulary icons. Alias cards remain reference/language cards and should not become active DSP cards.

#### Lightweight

Anchor: `Thin`

Icon prompt:

```text
Create a 1254 x 1254 square descriptor alias icon for "Lightweight". No text, labels, letters, numbers, EQ curves, meters, or technical charts. Show a tiny folded-paper sound sprite or paper-glider character floating in pale blue space, with a narrow weak low waveform underneath and very little body shadow. The image should feel light, papery, underfilled, and unable to hold much weight. Palette: pale blue, icy cyan, soft white, faint navy outline, tiny warm highlight. Style: painterly storybook game-card art, readable at thumbnail size, full square canvas, no rounded corners. Avoid hollow empty-center imagery, dark dull blankets, bass rumble ground waves, and duplicate Thin icon composition.
```

| Row | Detail |
|---|---|
| Identity line | **The Paperweight Sound**: a word for sound that does not carry much body or weight. |
| Feeling | The sound feels papery, small, or unable to hold itself up. It may still be clear, but it does not feel filled in. |
| Listen for | Thin vocals, light guitars, drums without body, and bass notes that outline pitch without feeling grounded. |
| Where to find it | Lexicon Hall vocabulary card. It points toward `Thin`, not `Hollow`, `Dull`, or `Distant`. |

#### Edgy

Anchor: `Harsh`

Icon prompt:

```text
Create a 1254 x 1254 square descriptor alias icon for "Edgy". No text, labels, letters, numbers, EQ curves, meters, or technical charts. Show a jagged orange glass-shard sound sprite balanced on a rough glowing line, with tense angular wave strokes, tiny scrape marks, and a strained but not scary expression. The image should feel hard, abrasive, and uncomfortable at the upper edge. Palette: acid yellow, rusty orange, hard white highlights, dark plum shadow, small hot-coral scratch marks. Style: painterly storybook game-card art, readable at thumbnail size, full square canvas, no rounded corners. Avoid lightning-only imagery, sibilant hiss ribbons, needle-beam basic-card imagery, and duplicate Harsh icon composition.
```

| Row | Detail |
|---|---|
| Identity line | **The Rough Edge**: a casual word for upper sound that feels hard or uncomfortable. |
| Feeling | The sound feels tense, scratchy, or tiring, as if it is pressing with a rough corner. |
| Listen for | Guitars that scrape, vocals with hard bite, cymbals that feel abrasive, and synths that jab instead of glow. |
| Where to find it | Lexicon Hall vocabulary card. It points toward `Harsh`, not specifically `Sibilant` or `Glassy`. |

#### Shiny

Anchor: `Bright`

Icon prompt:

```text
Create a 1254 x 1254 square descriptor alias icon for "Shiny". No text, labels, letters, numbers, EQ curves, meters, or technical charts. Show a polished tiny mirror-stone sound sprite catching broad clean top-end light, with soft gold glints along the upper edge and faint luminous waveform arcs reflected around it. The image should feel glossy, clear, and lit at the top without becoming sharp. Palette: sky blue, pale gold, warm white, soft cyan, deep navy shadow. Style: painterly storybook game-card art, readable at thumbnail size, full square canvas, no rounded corners. Avoid Airy feather-cloud imagery, sibilant slit-hiss shapes, harsh jagged shards, and duplicate Bright icon composition.
```

| Row | Detail |
|---|---|
| Identity line | **The Polished Glint**: a word for sound with extra top-end light. |
| Feeling | The sound feels polished, sparkling, or more illuminated than neutral. Details may step forward pleasantly or obviously. |
| Listen for | Glossy vocals, bright acoustic strings, cymbal shine, and percussion with extra shimmer. |
| Where to find it | Lexicon Hall vocabulary card. It points toward `Bright`, without necessarily becoming `Harsh` or `Sibilant`. |

#### Extended

Anchor: `Airy`

Icon prompt:

```text
Create a 1254 x 1254 square descriptor alias icon for "Extended". No text, labels, letters, numbers, EQ curves, meters, or technical charts. Show a long translucent ribbon of sound rising upward through open sky-blue space into tiny distant glints, with lots of quiet negative space above and delicate high wisps trailing from the ribbon. The image should feel like the top end reaches high and keeps going. Palette: pale sky blue, white, soft cyan, faint gold, gentle navy shadow. Style: painterly storybook game-card art, readable at thumbnail size, full square canvas, no rounded corners. Avoid simple brightness sparkles, hiss/noise imagery, thin fragile reed shapes, and duplicate Airy icon composition.
```

| Row | Detail |
|---|---|
| Identity line | **The High Reach**: a word for sound whose top end extends upward. |
| Feeling | The sound feels open at the very top, with height, reach, and air above the main tone. |
| Listen for | Cymbal tails that float, breath around vocals, room air, and high harmonics that seem to extend upward. |
| Where to find it | Lexicon Hall vocabulary card. It points toward `Airy`, more than ordinary `Bright`. |

#### Shrill

Anchor: `Sibilant`

Icon prompt:

```text
Create a 1254 x 1254 square descriptor alias icon for "Shrill". No text, labels, letters, numbers, EQ curves, meters, or technical charts. Show painful sibilant emphasis as a tiny tense hiss-sprite squeezed by sharp icy consonant streaks, with thin silver-blue ribbons becoming brighter and more urgent than the normal Sibilant icon. The image should feel over-forward, piercing in language, and uncomfortable, but still vocabulary-adjacent rather than a separate DSP creature. Palette: icy blue, white, pale violet, electric cyan, dark navy shadow. Style: painterly storybook game-card art, readable at thumbnail size, full square canvas, no rounded corners. Avoid separate needle-beam basic-card composition, physical weapons, broad glass reflections like Glassy, harsh sandpaper shards, and duplicate Sibilant icon composition.
```

| Row | Detail |
|---|---|
| Identity line | **The Painful Hiss**: a strong word for sibilance that has become too sharp or too forward. |
| Feeling | The sound feels biting, thin, and uncomfortable around S sounds, cymbals, or small high edges. |
| Listen for | Vocal consonants that sting, cymbal ticks that feel too hot, and treble edges that read as painful hiss rather than reflective sheen. |
| Where to find it | Lexicon Hall vocabulary card. It points toward `Sibilant`; it is no longer a basic DSP card. |

#### Anechoic

Anchor: `Dry`

Icon prompt:

```text
Create a 1254 x 1254 square descriptor alias icon for "Anechoic". No text, labels, letters, numbers, EQ curves, meters, or technical charts. Show a small warm listening orb centered in a dark treated room with soft wedge-like wall panels, very short sound marks close to the orb, and no long reflection trails. The image should feel close, controlled, and reflection-free. Palette: deep blue-black, muted teal, warm amber sound core, soft gray-blue wall texture, tiny pale cyan highlights. Style: painterly storybook game-card art, readable at thumbnail size, full square canvas, no rounded corners. Avoid large hall imagery, echo rings, sci-fi lab UI, and duplicate Dry icon composition.
```

| Row | Detail |
|---|---|
| Identity line | **The Reflection-Free Room**: a technical word for sound with almost no room around it. |
| Feeling | The sound feels close, plain, and reflection-free. Notes stop quickly instead of blooming into the space. |
| Listen for | Voice with no room tail, handclaps that end immediately, and instruments that feel isolated rather than surrounded. |
| Where to find it | Lexicon Hall vocabulary card. It points toward `Dry`, especially in treated rooms, booths, close-mic recordings, and test spaces. |

#### Echoey

Anchor: `Reverberant`

Icon prompt:

```text
Create a 1254 x 1254 square descriptor alias icon for "Echoey". No text, labels, letters, numbers, EQ curves, meters, or technical charts. Show a small warm listening orb inside a large arched room, with visible blue-orange reflection rings bouncing from the walls and ceiling and repeated wave trails fading into depth. The image should feel roomy, reflective, and returning after the source. Palette: deep indigo, warm amber orb, pale cyan echo rings, soft violet reflections, dim gold highlights. Style: painterly storybook game-card art, readable at thumbnail size, full square canvas, no rounded corners. Avoid dry close-mic imagery, simple width imagery, dark dullness, and duplicate Reverberant icon composition.
```

| Row | Detail |
|---|---|
| Identity line | **The Returning Room**: a casual word for sound with obvious room reflections. |
| Feeling | The sound keeps coming back from the space. The source may feel farther away because the room speaks after it. |
| Listen for | Claps with a tail, vocals that linger after words, drums that splash around the room, and hits that bounce back. |
| Where to find it | Lexicon Hall vocabulary card. It points toward `Reverberant`, especially in halls, churches, stairwells, tunnels, live rooms, or distant-mic recordings. |

#### Electrical

Anchors: `Hum`, `Buzz`

Icon prompt:

```text
Create a 1254 x 1254 square descriptor alias icon for "Electrical". No text, labels, letters, numbers, EQ curves, meters, or technical charts. Show a dark signal path touched by unwanted power interference: one low amber transformer-like glow for smooth hum, crossed by jagged cyan-magenta vibrating filaments for rough buzz. The image should read as tonal electrical contamination, not musical brightness or overload distortion. Palette: near-black violet, low amber glow, electric cyan, hot magenta, warm-white interference edges. Style: painterly storybook game-card art, readable at thumbnail size, full square canvas, no rounded corners. Avoid lightning-only imagery, bass impact, clipping blocks, crackle clusters, and technical UI.
```

| Row | Detail |
|---|---|
| Identity line | **The Power Leak**: a broad word for electrical interference sneaking into playback. |
| Feeling | The music has an added powered-on tone or vibration that feels separate from the song. It may be smooth and low like `Hum`, or rougher and grainier like `Buzz`. |
| Listen for | Quiet vocals, pauses, fades, sparse acoustic music, sustained notes, and bass-light passages where a steady tone or buzzy edge stays present. |
| Where to find it | Lexicon Hall vocabulary card in `Faultveil Rift`. It points toward `Hum` or `Buzz`, not a separate DSP card. |

#### Burst

Anchor: `Pop`

Icon prompt:

```text
Create a 1254 x 1254 square descriptor alias icon for "Burst". No text, labels, letters, numbers, EQ curves, meters, charts, or technical UI. Match the existing Integrity descriptor icon language: dark textured violet-black background, painterly storybook game-card rendering, readable at thumbnail size, full square canvas, no rounded corners. Show Burst as a small sound-fault creature caught inside a single contained rupture in a dark audio signal ribbon floating in empty space. The creature should be subtle and integrated into the fault: a tiny dark-violet rounded sprite with small startled eyes and a tiny open mouth, half-emerging from the rounded tear, not standing on anything. Around it, show one coral-orange pressure rim, a small warm-white flash only along the torn edge, tiny icy-cyan fracture lines close to the rupture, and faint dark-violet particles fading away. The creature should feel like the momentary fault itself, not a magical fireball. The event should feel like a brief playback fault: bigger and rounder than Click, more singular than Crackle, and close to Pop. Keep the composition compact and low-glow. Use generous dark negative space. No platform, no slate tile, no pedestal, no large halo, no explosion, no fireball, no flying rocks, no meteor debris, no lightning storm, no bass impact imagery, no clipping blocks, no repeated crackle clusters, and no overly bright full-frame fire.
```

| Row | Detail |
|---|---|
| Identity line | **The Sudden Bloom**: a larger fault event that jumps out once and vanishes. |
| Feeling | Playback is interrupted by a quick pressure-like event, bigger and rounder than a `Click`, but still one moment rather than a crackling cluster. |
| Listen for | Speech gaps, quiet music, edits, fades, pauses, and sparse passages where one larger pop-like event appears out of place. |
| Where to find it | Lexicon Hall vocabulary card in `Faultveil Rift`. It points toward `Pop`, with no DSP of its own. |

### Hold / Boundary Words

| Alias | Possible relation | Why hold it |
|---|---|---|
| `Subby` | `Rumble` | Too close to the current `Droning -> Rumble` teaching role. Add only if the game later needs a second sub-bass word with a distinct context. |
| `Murky` | `Muddy`, `Dull`, or discovery `Muffled` | Too likely to mean cloudy low-mid plus reduced clarity. This may be better taught as a boundary word around `Muffled` rather than a direct alias for `Muddy`. |

## 8. Larger Candidate Pool

### Spectral Candidates

| Alias | Possible anchor(s) | Risk |
|---|---|---|
| `Slam` | `Thump`, `Punchy` | Ambiguous, but useful. |
| `Weighty` | `Rumble`, `Warm` | Could become too broad. |
| `Lean-sounding` | `Thin` | Avoid direct collision with discovery `Lean`. |
| `Clouded` | `Muddy` | Safe. |
| `Smooth` | `Warm`, `Softened` | Cross-module ambiguity. |
| `Recessed` | `Hollow`, `Dull` | Ambiguous; needs careful prompt. |
| `Piercing` | discovery | Do not use as alias. |
| `Glare` | `Harsh`, `Shouty` | Ambiguous but useful. |

### Spatial Candidates

| Alias | Possible anchor(s) | Risk |
|---|---|---|
| `Upfront` | `Near` | Safe. |
| `Farther Back` | `Far` | Safer than `Set Back`, which is a discovery. |
| `Pinpoint` | `Focused` | Safe. |
| `Smeared` | `Blurred` | Safe. |
| `Expansive` | `Wide` | Safe. |
| `Closed-in` | `Narrow` | Safe. |

### Dynamic Candidates

Dynamic aliases need extra caution because many of these words have strict technical meanings in audio engineering.

| Alias | Possible anchor(s) | Risk |
|---|---|---|
| `Fast` | `Snappy`, `Tight` | Ambiguous. |
| `Rounded` | `Softened` | Safe. |
| `Controlled` | `Compressed` | Can sound positive; needs context. |
| `Lifeless` | `Flat` | Safe if prompt avoids Dull/Thin. |
| `Peaky` | `Clipped` | Could also mean uneven frequency response. |
| `Rough` | `Distorted`, `Dirty` | Cross-module ambiguity. |

### Integrity Candidates

| Alias | Possible anchor(s) | Risk |
|---|---|---|
| `Noise Floor` | `Hiss`, `Static` | Ambiguous but teachable. |
| `Fuzzy` | `Static`, `Dirty` | Ambiguous. |
| `Ringing Tone` | `Whine` | Safe. |
| `Scratchy` | `Crackle`, `Dirty` | Ambiguous. |
| `Skip` | `Dropout` | Safe. |

## 9. Implementation Notes

For each alias added to `aliasVocabulary.ts`:

1. Use a unique ID that does not collide with discovery IDs.
2. Set `moduleId` to the module that owns the alias anchor card(s), so Collection places it in the right section.
3. Add a real icon at `assets-source/descriptors/{alias-id}.png`.
4. Add exactly one context for MVP.
5. Give the context exactly four options.
6. Keep all correct answer IDs inside the option list.
7. If the alias is ambiguous, mark `kind: "ambiguous"` and allow multiple correct answers.
8. Add the alias to Collection only as vocabulary.
9. Do not add aliases to Sandbox or active DSP.

## 10. Recommended Expansion Order

1. Add more Spectral aliases first because the current Lexicon Hall lives beside Spectral Collection.
2. Add Spatial aliases next, starting with position/image words that are easy to demonstrate visually.
3. Add Integrity aliases because the faults are concrete and easy to identify.
4. Add Dynamic aliases last and slowly, because dynamic language is the hardest to hear and explain.
