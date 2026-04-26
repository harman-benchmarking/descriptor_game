# Dynamic Descriptor Raw Materials

This document defines a draft vocabulary for dynamic aspects in audio system evaluation.

It is separate from the existing spectral descriptor system. Spectral descriptors describe frequency-balance changes such as bass, mids, treble, masking, brightness, and body. Dynamic descriptors describe how the sound moves over time: attack, release, level contrast, compression behavior, transient shape, recovery, density, headroom, clipping, and overload distortion.

## Boundary With Spectral Descriptors

Keep these existing cards in the spectral system:

| Existing spectral card | Why it can feel dynamic | Why it should remain spectral |
|---|---|---|
| `Thump` | Gives low hits more physical arrival. | It is a `55 Hz` EQ boost. |
| `Punchy` | Makes bass hits feel firmer and faster. | It is a `95 Hz` EQ boost, not an envelope processor. |
| `Impactful` | Combines low hit and focused punch. | It expands to `Thump + Punchy`. |
| `Powerful` | Adds sub weight and low impact. | It expands to `Rumble + Thump`. |
| `Energetic` | Feels lively because low force and bright top are both present. | It is a combined low/treble EQ recipe. |
| `Exciting` | Feels bigger, brighter, wider, and more intense. | It is a full-range EQ recipe, not a dynamic-range change. |

Rule of thumb:

```text
Spectral punch = frequency balance makes hits feel stronger.
Dynamic punch = envelope/headroom behavior preserves or reduces hit shape.
```

Avoid reusing `Punchy`, `Impactful`, and `Powerful` as core dynamic card names. They are already meaningful in the spectral atlas.

## Current App Anchors

The current app already has two dynamic training families:

| Module | Current task | Dynamic vocabulary it can support |
|---|---|---|
| `Compression Detection` | Identify which A/B sample is compressed. | compressed, squashed, dense, flat, pumping, breathing, constrained |
| `Attack/Release Matching` | Match compressor attack and release timing. | snappy, softened, blunted, tight, loose, pumping, breathing |

The native audio engine supports:

| Control | Perceptual role |
|---|---|
| `thresholdDb` | Sets when gain reduction starts. Lower threshold usually makes compression more audible. |
| `ratio` | Controls how strongly peaks are reduced above threshold. |
| `attackMs` | Controls how quickly transients are caught. Faster attack can soften or blunt hits. |
| `releaseMs` | Controls recovery time. Short release can pump; long release can feel lively or unstable, while long release can feel smoother or sluggish. |
| `makeupGainDb` | Restores loudness after compression and can create loudness-density bias. |

`Clipped` and `Distorted` belong in the dynamic vocabulary because they are overload/headroom outcomes. They are not first-class DSP controls in the current compressor-only engine yet; a limiter, clipper, soft clipper, or saturation stage would make them much clearer and safer to train.

## Vocabulary Shape

Recommended current shape:

| Type | Count | Purpose |
|---|---:|---|
| Basic cards | `16` | Playable dynamic ingredients with one primary region each. |
| Discovery cards | `9` | Recipe outcomes that combine basics. |
| Alias / outcome icons | open | Extra vocabulary can have icons without becoming separate playable basics. |

Reduced basic vocabulary:

```text
Snappy, Softened, Blunted, Tight, Loose,
Compressed, Squashed, Dense, Pumping, Breathing, Flat,
Lively, Constrained, Strained, Clipped, Distorted
```

Demoted from basic cards:

| Word | Use it as | Reason |
|---|---|---|
| `Explosive` | alias/outcome icon for strong macro contrast | Useful review word, but difficult to implement as a direct processor with the current compressor-only path. |
| `Effortless` | alias/outcome icon for clean headroom or `Alive` | Valuable evaluation word, but it mostly means absence of strain rather than an effect to apply. |
| `Over-compressed` | old name for `Surging` or severe compression states | Too technical and too close to the underlying process. |
| `Over-leveled` | old name for `Pinned` | Too technical; `Pinned` is more card-like and distinct from `Flat`. |

## Dynamic Axes

Dynamic descriptors should be grouped by listening axis rather than by frequency range.

| Axis | Listener question | Positive/neutral vocabulary | Negative/excess vocabulary |
|---|---|---|---|
| Transient attack | Does the first edge of a hit arrive clearly? | snappy, responsive | softened, blunted |
| Release/recovery | Does the level recover naturally after hits? | tight, controlled | loose, pumping, breathing |
| Compression density | Is the signal being level-controlled? | controlled, dense | compressed, squashed, flat |
| Contrast and headroom | Does music keep motion, scale, ease, and clean peaks? | lively, alive | constrained, strained, clipped, distorted |

## Dynamic Regions And Roadmap

The atlas uses three regions to avoid repeated basic cards. Every basic descriptor has one primary home. Recipes are allowed to bridge regions because real dynamic perception often crosses attack, compression, and headroom.

### Region 1: Attack And Recovery

Theme: how hits start, stop, and reset.

Elements involved:
- `Snappy`
- `Softened`
- `Blunted`
- `Tight`
- `Loose`

Roadmap:

```text
Snappy + Tight
      |
  Responsive

Softened + Loose
      |
   Sluggish
```

Bridge recipes:
- `Crushed` uses `Blunted` plus compression-region ingredients.
- `Alive` uses `Snappy + Tight` plus contrast-region `Lively`.

Table:

| Stage | Card | Recipe | Role |
|---|---|---|---|
| Element | `Snappy` | basic | clear transient front edge |
| Element | `Softened` | basic | rounded front edge |
| Element | `Blunted` | basic | heavily pressed attack |
| Element | `Tight` | basic | controlled start/stop behavior |
| Element | `Loose` | basic | slow or smeared recovery |
| Combo | `Responsive` | `Snappy + Tight` | clean attack plus controlled recovery |
| Combo | `Sluggish` | `Softened + Loose` | rounded attack plus slow recovery |

Design notes:
- This is the most concrete dynamic region and should be taught first.
- Dry drums, percussion, plucked bass, piano, and acoustic guitar make it easier.
- `Snappy` must be taught against spectral `Bright`, because high-frequency emphasis can fake attack clarity.

### Region 2: Compression And Motion

Theme: gain reduction, loudness density, and audible level movement.

Elements involved:
- `Compressed`
- `Squashed`
- `Dense`
- `Pumping`
- `Breathing`
- `Flat`

Roadmap:

```text
Compressed + Pumping
      |
   Surging

Compressed + Flat
      |
   Pinned

Squashed + Blunted + Flat
      |
   Crushed

Dense + Squashed + Constrained
      |
  Breathless
```

Table:

| Stage | Card | Recipe | Role |
|---|---|---|---|
| Element | `Compressed` | basic | audible gain reduction |
| Element | `Squashed` | basic | heavy compression or limiting |
| Element | `Dense` | basic | high average level and filled-in sound |
| Element | `Pumping` | basic | rhythmic level ducking and return |
| Element | `Breathing` | basic | slower or gentler program-level swelling |
| Element | `Flat` | basic | reduced expressive level motion |
| Combo | `Surging` | `Compressed + Pumping` | compressor-driven waves of level motion |
| Combo | `Pinned` | `Compressed + Flat` | sound held at one intensity |
| Big combo | `Crushed` | `Squashed + Blunted + Flat` | severe compression removes attack and life |
| Big combo | `Breathless` | `Dense + Squashed + Constrained` | constant pressure with little room to expand |

Design notes:
- This region maps most directly to the current `Compression Detection` module.
- Loudness matching is mandatory because denser samples can sound better just because they are louder.
- `Dense` should be treated carefully: it can be a positive production quality or a warning sign.

### Region 3: Headroom And Strain

Theme: whether music keeps motion, scale, clean peaks, and ease when intensity changes.

Elements involved:
- `Lively`
- `Constrained`
- `Strained`
- `Clipped`
- `Distorted`

Roadmap:

```text
Constrained + Strained
      |
   Limited

Clipped + Distorted + Strained
      |
  Overdriven

Lively + Snappy + Tight
      |
    Alive

Dense + Squashed + Constrained
      |
  Breathless
```

Table:

| Stage | Card | Recipe | Role |
|---|---|---|---|
| Element | `Lively` | basic | small expressive motion survives |
| Element | `Constrained` | basic | macro contrast is held back |
| Element | `Strained` | basic | loud moments feel forced or choked |
| Element | `Clipped` | basic | peaks hit a hard ceiling and lose shape |
| Element | `Distorted` | basic | nonlinear roughness appears under overload |
| Combo | `Limited` | `Constrained + Strained` | loud moments hit a ceiling |
| Combo | `Overdriven` | `Clipped + Distorted + Strained` | overload becomes audibly hard or rough |
| Big combo | `Alive` | `Lively + Snappy + Tight` | small motion, clean starts, and recovery all survive |
| Big combo | `Breathless` | `Dense + Squashed + Constrained` | pressure and compression remove room to expand |

Design notes:
- This region is smaller, but it is important for audio-system evaluation language.
- Its best cards are recipe outcomes, because contrast and headroom are often relationships between several cues.
- `Clipped` should be taught as peak-shape damage, not generic harshness.
- `Distorted` should be taught as overload roughness, not hum, buzz, rattle, or other integrity issues.
- `Strained`, `Clipped`, and `Distorted` need future limiter/saturation/clipper DSP to become strong direct training examples.

## Core Descriptor Catalog

These are candidate dynamic cards. They should not be treated as final implementation data yet.

| ID | Label | Primary region | Summary | Listen for | Aliases / icon variants |
|---|---|---|---|---|---|
| `snappy` | `Snappy` | Attack And Recovery | Fast, clear front edges. | Snare cracks, plucked bass starts, kick click, piano hammer definition. | crisp attack, sharp attack |
| `softened` | `Softened` | Attack And Recovery | Rounded attack without severe damage. | Hits feel gentler; percussion fronts are less decisive. | rounded, gentle, cushioned |
| `blunted` | `Blunted` | Attack And Recovery | Front edge is flattened or dulled by fast gain control. | Drums hit but do not bite; attacks feel pressed down. | dulled attack, flattened attack |
| `tight` | `Tight` | Attack And Recovery | Starts and recoveries feel controlled. | Drums stop cleanly, bass notes do not drag, groove feels locked. | controlled recovery, locked |
| `loose` | `Loose` | Attack And Recovery | Recovery feels slow, lagging, or poorly controlled. | Bass/drums smear into following notes; groove feels slow to reset. | dragging, slow, lagging |
| `compressed` | `Compressed` | Compression And Motion | Gain control is audible but not necessarily ruined. | Peaks sit closer to average level; mix feels controlled and constant. | controlled, squeezed |
| `squashed` | `Squashed` | Compression And Motion | Heavy compression or limiting collapses contrast. | Drums lose height, vocals stay pinned, choruses stop expanding. | crushed, over-limited |
| `dense` | `Dense` | Compression And Motion | Sound is filled-in and continuously present. | Few gaps between events; average loudness feels high. | packed, filled-in |
| `pumping` | `Pumping` | Compression And Motion | Level moves audibly after hits. | Mix ducks after kick/snare, then swells back with the beat. | ducking, pulsing |
| `breathing` | `Breathing` | Compression And Motion | Program level gently rises and falls with gain control. | Backgrounds or ambience swell between phrases. | swelling, inhaling/exhaling |
| `flat` | `Flat` | Compression And Motion | Level motion feels evened out and emotionally still. | Everything sits at one intensity; expressive changes disappear. | over-leveled, monotone |
| `lively` | `Lively` | Headroom And Strain | Small performance gestures remain animated. | Vocal inflection, ghost notes, pick pressure, subtle groove movement. | expressive, animated |
| `constrained` | `Constrained` | Headroom And Strain | Loud/quiet range feels held back. | Choruses do not open up; accents feel smaller than expected. | restricted, held back |
| `strained` | `Strained` | Headroom And Strain | Loud moments sound forced, choked, or near a ceiling. | Choruses harden, peaks squeeze, system sounds stressed. | choked, stressed, limited |
| `clipped` | `Clipped` | Headroom And Strain | Peaks hit a hard ceiling and lose their natural shape. | Loud hits crack, flatten, or splash; snare, kick, and vocal peaks have hard edges. | clipping, clipped peaks, hard ceiling |
| `distorted` | `Distorted` | Headroom And Strain | Nonlinear roughness appears when the signal or system is pushed. | Loud moments become gritty, fuzzy, raspy, or broken up. | overdriven, saturated, gritty |

## Descriptor Detail Notes

### Snappy

Player-facing meaning:
- The sound has quick, clean starts.
- Hits arrive with a visible edge.
- Rhythmic material feels alert.

Technical meaning:
- Usually points to preserved transient attack.
- In compressor terms, slower attack can preserve snap; very fast attack can remove it.
- Can also be affected by spectral brightness, so it needs careful separation from `Bright` or `Crisp`.

Best material:
- Snare, kick, rimshot, slap bass, picked guitar, piano, percussion loops.

Implementation note:
- Current compressor can reduce snap, but it cannot truly add new transient snap.
- Treat `Snappy` as a preserved/reference state or a contrast against `Softened`/`Blunted`.

### Softened

Player-facing meaning:
- Hits feel rounded rather than crisp.
- The music may feel smoother, gentler, or less urgent.

Technical meaning:
- Mild loss of transient attack.
- Often caused by faster attack compression, limiter behavior, or source material that has been smoothed.

Best material:
- Percussion loops, vocal consonants, piano, acoustic guitar.

Implementation note:
- Feasible with current compressor using moderate threshold/ratio and faster attack.

### Blunted

Player-facing meaning:
- The hit is still there, but the front of it has been pushed flat.
- Drums feel like they land against a cushion.

Technical meaning:
- Stronger transient attack loss than `Softened`.
- Often caused by fast attack compression or limiting.

Best material:
- Snare, kick, tom fills, claps, plucked bass.

Implementation note:
- Feasible with current compressor using low threshold, higher ratio, and very fast attack.

### Tight

Player-facing meaning:
- Starts and stops feel controlled.
- The groove is firm and tidy.

Technical meaning:
- Good timing relationship between transient attack, sustain, and release.
- Can be partly spectral in bass systems, so dynamic `Tight` should focus on recovery behavior.

Best material:
- Kick/bass interplay, funk drums, short bass notes, rhythmic acoustic guitar.

Implementation note:
- Current compressor can approximate this with moderate attack and release matched to the groove.
- A future transient shaper would make it more precise.

### Loose

Player-facing meaning:
- The groove feels late, smeared, or slow to recover.
- Notes hang around longer than they should.

Technical meaning:
- Slow or poorly matched recovery.
- Can be confused with spectral `Boomy` or room resonance, so use level-matched transient material.

Best material:
- Drum and bass loops, short kick patterns, staccato bass.

Implementation note:
- Feasible with current compressor using slower release and material with frequent transients.

### Compressed

Player-facing meaning:
- Peaks and average level sit closer together.
- The sound may feel louder, denser, or more controlled.

Technical meaning:
- Audible gain reduction.
- Not inherently bad; compression can be musically useful.
- In training, this maps directly to the current compression detection module.

Best material:
- Drums, vocals, bass, full mixes with strong peaks.

Implementation note:
- Fully feasible with the current compressor.

### Squashed

Player-facing meaning:
- The music has been pressed down too hard.
- It feels loud but less alive.

Technical meaning:
- Severe compression or limiting.
- Usually combines reduced macro contrast, reduced transient attack, and high average density.

Best material:
- Full mixes, loud choruses, drum buses, aggressive pop/rock/electronic material.

Implementation note:
- Feasible with current compressor, but a true limiter model would make it more realistic.

### Dense

Player-facing meaning:
- The sound is packed and continuously filled.
- It may feel strong and polished, or tiring if overdone.

Technical meaning:
- High average level relative to peaks.
- Can be created by compression, saturation, arrangement density, or mastering.

Best material:
- Modern pop, electronic drops, heavily produced rock, dense vocal stacks.

Implementation note:
- Feasible with current compressor plus makeup gain.
- Needs loudness matching so the player does not simply prefer the louder sample.

### Pumping

Player-facing meaning:
- The whole sound ducks and returns after hits.
- Level movement feels tied to the beat.

Technical meaning:
- Release time and threshold/ratio make gain recovery audible.
- Often caused by sidechain compression or aggressive bus compression.

Best material:
- Kick-heavy electronic music, bass-heavy loops, full mixes with strong low-frequency hits.

Implementation note:
- Feasible with current compressor using low threshold, high ratio, and release timed to the groove.
- Sidechain-specific pumping would need future DSP, but full-mix pumping is possible now.

### Breathing

Player-facing meaning:
- The level gently swells and relaxes.
- Backgrounds and room tails seem to inhale/exhale.

Technical meaning:
- Subtler program-level gain movement than `Pumping`.
- Can be musical or distracting depending on context.

Best material:
- Vocals with room tone, sustained pads, acoustic recordings, bus-compressed mixes.

Implementation note:
- Feasible with current compressor using slower release and less extreme ratio/threshold.

### Flat

Player-facing meaning:
- Everything feels like it sits at one intensity.
- The music moves, but the level emotion does not.

Technical meaning:
- Reduced micro-dynamic variation.
- Can come from compression, limiting, poor source material, or over-normalized examples.

Best material:
- Expressive performances where small level variation should be obvious.

Implementation note:
- Feasible with current compressor, but source choice matters.
- It should be separated from `Pinned`, which is the recipe where compression causes the flatness.

### Lively

Player-facing meaning:
- The sound has small motions and expressive life.
- Performers feel animated.

Technical meaning:
- Good micro-dynamic preservation.
- Small level differences remain audible.
- Can be mistaken for spectral brightness or excitement.

Best material:
- Vocals, jazz drums, fingerstyle guitar, piano, expressive acoustic performances.

Implementation note:
- Like `Snappy`, this is mostly a preserved/reference state with the current engine.
- Future expansion, upward compression, or transient shaping could make `Lively` more directly controllable.

### Constrained

Player-facing meaning:
- The music feels held in place.
- Big moments arrive, but they do not fully open.

Technical meaning:
- Reduced macro-dynamic contrast.
- Often related to compression, limiting, or conservative playback headroom.

Best material:
- Songs with obvious verse/chorus contrast, orchestral crescendos, acoustic drums.

Implementation note:
- Feasible with current compressor when source material has clear loud/soft contrast.

### Strained

Player-facing meaning:
- Loud passages sound forced.
- The sound hardens, chokes, or feels near a ceiling.

Technical meaning:
- Headroom or limiter stress.
- Can include compression, distortion, clipped peaks, or amplifier/speaker limits.

Best material:
- Loud dense choruses, bass-heavy peaks, bright vocals, complex full-band passages.

Implementation note:
- Partly feasible with current compressor, but a limiter/saturation/clipping model would make it much stronger.
- Avoid simulating dangerous loudness; make strain an artifact, not a playback-level problem.

### Clipped

Player-facing meaning:
- Loud peaks hit a hard top.
- The sound can crack, flatten, spit, or feel chopped at the instant of impact.

Technical meaning:
- Peak waveform shape is cut by a ceiling.
- Hard clipping creates more obvious roughness and high-frequency byproducts; soft clipping rounds the ceiling and can sound less abrupt.
- It is more specific than `Distorted`: all obvious clipping is distortion, but not all distortion is clipping.

Best material:
- Snare hits, kick hits, vocal peaks, bass drops, bright synth stabs, loud full-mix accents.

Implementation note:
- Current compressor can only approximate the feeling through aggressive gain control.
- A future clipper/limiter ceiling is recommended so `Clipped` can be trained as peak damage rather than generic harshness.
- Keep playback level safe; the cue should come from the processed signal, not from turning the device up.

### Distorted

Player-facing meaning:
- The sound becomes rough, gritty, fuzzy, raspy, or broken up.
- Loud passages feel less clean because the system or signal is being pushed.

Technical meaning:
- Nonlinear behavior adds new harmonic and intermodulation content.
- It may come from clipping, saturation, amplifier stress, speaker stress, or codec/proxy behavior, but in this atlas it should represent overload roughness.
- It is broader than `Clipped` and should not replace more specific defect words such as `Buzz`, `Rattle`, or `Crackle`.

Best material:
- Bass-heavy peaks, vocal belts, electric guitar-like harmonic material, full choruses, dense electronic drops.

Implementation note:
- Partial with heavy compression as a proxy, but a waveshaper or saturation stage is the proper training path.
- For car-audio-style integrity work, reserve `Buzz`, `Rattle`, `Rub Buzz`, and `Crackle` for separate defect families.

## Candidate Dynamic Recipes

Recipe labels should name a recognizable listening outcome. Ingredient descriptors should remain inspectable after unlock, because dynamic words are easy to confuse with spectral words.

### Recipe Catalog

| ID | Discovery | Ingredients | Tier | Primary region | Meaning | Technical feasibility |
|---|---|---|---|---|---|---|
| `responsive` | `Responsive` | `Snappy + Tight` | Combo | Attack And Recovery | Clean attack with controlled recovery. | Possible as a preserved/less-processed state; stronger with future transient shaper. |
| `sluggish` | `Sluggish` | `Softened + Loose` | Combo | Attack And Recovery | Rounded attack with slow recovery. | Feasible with current compressor. |
| `surging` | `Surging` | `Compressed + Pumping` | Combo | Compression And Motion | Compressor-driven waves of level motion. | Feasible with current compressor. |
| `pinned` | `Pinned` | `Compressed + Flat` | Combo | Compression And Motion | Sound held at one intensity. | Feasible with current compressor and good source material. |
| `limited` | `Limited` | `Constrained + Strained` | Combo | Headroom And Strain | Loud moments hit a ceiling. | Partly feasible now; stronger with limiter/headroom DSP. |
| `overdriven` | `Overdriven` | `Clipped + Distorted + Strained` | Combo | Headroom And Strain | Overload becomes audibly hard or rough. | Needs limiter/clipper/saturation DSP for a convincing version. |
| `crushed` | `Crushed` | `Squashed + Blunted + Flat` | Big combo | Compression And Motion | Severe compression removes attack and life. | Feasible now; stronger with limiter model. |
| `breathless` | `Breathless` | `Dense + Squashed + Constrained` | Big combo | Compression And Motion | Constant pressure with little room to expand. | Feasible now with loudness matching. |
| `alive` | `Alive` | `Lively + Snappy + Tight` | Big combo | Headroom And Strain | Small motion, clean starts, and recovery all survive. | Best as a reference/reward state until future enhancement DSP exists. |

### Region Recipe Map

| Region | Internal recipes | Bridge recipes |
|---|---|---|
| Attack And Recovery | `Responsive`, `Sluggish` | `Crushed`, `Alive` |
| Compression And Motion | `Surging`, `Pinned`, `Crushed`, `Breathless` | `Limited` if limiter-style behavior is added |
| Headroom And Strain | `Limited`, `Overdriven`, `Alive` | `Breathless` |

### Combo Recipe Details

#### Responsive

Player-facing identity:
- The sound reacts quickly.
- Hits start cleanly and the groove resets before the next event.
- It feels agile rather than merely bright or loud.

Technical reading:
- `Snappy` gives the clear transient start.
- `Tight` gives controlled recovery.
- In compressor terms, this often means attack is not too fast and release is not lagging behind the groove.

Implementation:
- Current engine can demonstrate `Responsive` by comparing a clean or lightly processed sample against `Sluggish`, `Blunted`, or `Loose`.
- A future transient shaper would allow a more direct `Responsive` processing profile.

Good A/B prompt:
- Which sample reacts faster to the rhythm without sounding artificially sharp?

#### Sluggish

Player-facing identity:
- The rhythm feels cushioned and slow to recover.
- Hits do not quite spring back before the next event.

Technical reading:
- `Softened` rounds the attack.
- `Loose` makes recovery feel late or smeared.

Implementation:
- Feasible now with faster attack and slow release.
- Best with drum/bass loops where recovery timing is obvious.

Good A/B prompt:
- Which sample feels slower to reset after each hit?

#### Surging

Player-facing identity:
- The whole mix swells and pulls in waves.
- It feels compressor-driven rather than naturally performed.

Technical reading:
- `Compressed` supplies gain reduction.
- `Pumping` makes release behavior audible.
- This replaces the old `Over-compressed` label.

Implementation:
- Feasible now with lower threshold, higher ratio, and release timed so recovery is audible.
- Avoid naming the basic `Pumped`; keep `Pumping` as the raw motion and `Surging` as the recipe outcome.

Good A/B prompt:
- Which sample has level movement caused by the compressor rather than the performance?

#### Pinned

Player-facing identity:
- The sound is held at one intensity.
- It feels like the performance cannot rise or fall freely.

Technical reading:
- `Compressed` supplies gain reduction.
- `Flat` supplies reduced expressive motion.
- This replaces the old `Over-leveled` label.

Implementation:
- Feasible now with compression that reduces expressive variation without obvious pumping.
- Needs source material with clear micro-dynamic expression.

Good A/B prompt:
- Which sample makes the performer sound less varied or less free?

#### Limited

Player-facing identity:
- Loud moments run into a ceiling.
- The music wants to expand, but the top of the motion feels blocked.

Technical reading:
- `Constrained` removes macro-dynamic expansion.
- `Strained` adds stress or hardening near loud peaks.

Implementation:
- Partly feasible with the current compressor.
- Better with a future limiter model, ceiling control, and optional saturation/clipping character.

Good A/B prompt:
- Which sample sounds like the loud part is being held back?

#### Overdriven

Player-facing identity:
- The sound has been pushed past clean headroom.
- Peaks feel hard, rough, gritty, or broken rather than simply loud.

Technical reading:
- `Clipped` supplies hard peak-ceiling damage.
- `Distorted` supplies nonlinear roughness.
- `Strained` supplies the sense that loud moments are forced.

Implementation:
- Weakly approximated by aggressive compression today.
- Best implemented later with a clipper or waveshaper after compression, with output trim for safe loudness matching.

Good A/B prompt:
- Which sample sounds pushed past clean headroom?

### Big Combo Recipe Details

#### Crushed

Player-facing identity:
- The sound feels pressed down hard.
- Hits lose their first edge, and the whole performance loses motion.

Technical reading:
- `Squashed` supplies heavy compression or limiting.
- `Blunted` removes transient attack.
- `Flat` removes micro-dynamic life.

Implementation:
- Feasible now with high ratio, low threshold, fast attack, and enough makeup gain to expose density.
- A true limiter would make it more authentic.

Good A/B prompt:
- Which sample sounds like the music has been pressed until the hits and expression collapse?

#### Breathless

Player-facing identity:
- The sound is constantly full and has no air to expand into.
- It may feel impressive for a moment, then tiring.

Technical reading:
- `Dense` supplies high average level.
- `Squashed` supplies severe level control.
- `Constrained` removes large-scale expansion.

Implementation:
- Feasible now with heavy compression and careful output trim.
- This recipe is highly vulnerable to loudness bias.

Good A/B prompt:
- Which sample feels most constantly pressured, with the least room between events?

#### Alive

Player-facing identity:
- The sound feels animated, quick, and unforced.
- Small expression, clean starts, and recovery all survive together.

Technical reading:
- `Lively` preserves micro-dynamics.
- `Snappy` preserves attack shape.
- `Tight` preserves recovery timing.

Implementation:
- Best as a reference/reward descriptor in the current app.
- A future transient shaper or expansion module could make it a more active processing recipe.

Good A/B prompt:
- Which sample feels most like the performance is still moving naturally?

### Evolution Relationships

Some dynamic recipes can become useful teaching bridges even when they do not share literal ingredient sets.

| Higher card | Contains lower card(s) | Evolution reading |
|---|---|---|
| `Crushed` | conceptual bridge from `Pinned` | `Crushed` is what happens when flattened leveling becomes severe and attack is also blunted. |
| `Breathless` | conceptual bridge from `Surging` | `Breathless` is what happens when obvious compression becomes dense and macro-constrained. |
| `Alive` | conceptual bridge from `Responsive` | Clean starts and recovery help the positive apex feel believable. |
| `Limited` | can lead toward `Breathless` | Add density and squash to a ceiling-limited sound and it can become breathless. |
| `Overdriven` | conceptual bridge from `Limited` | If the ceiling becomes audible as peak damage and roughness, limited headroom turns into overload. |

Recipe guardrails:
- Do not let discovery cards add hidden DSP unless the player can inspect the underlying recipe.
- Prefer one derived compressor profile for a dynamic recipe rather than stacking multiple compressors.
- Recipes should expand to readable ingredient meanings, but the audio engine can use a single profile that represents the combined behavior.
- Positive recipes need careful level matching because louder samples can fake `Alive`, `Responsive`, and `Effortless`-style impressions.
- Negative recipes should be taught with short listening rounds to avoid fatigue.

## Technical Feasibility

### Basic Descriptor Feasibility

| Descriptor | Current implementation status | Suggested current DSP approach |
|---|---|---|
| `Snappy` | indirect | Use clean/lightly processed reference against softened alternatives. |
| `Softened` | feasible | Moderate compression with fast attack. |
| `Blunted` | feasible | Stronger compression with very fast attack. |
| `Tight` | partial | Moderate compression with release matched to rhythmic material. |
| `Loose` | feasible | Slow release or poorly matched release on rhythmic material. |
| `Compressed` | feasible | Existing compressor detection profile. |
| `Squashed` | feasible | Low threshold, high ratio, fast attack, makeup gain. |
| `Dense` | feasible | Compression plus makeup gain, with output trim. |
| `Pumping` | feasible | Compression with audible release movement. |
| `Breathing` | feasible | Gentler compression with slower program-level recovery. |
| `Flat` | feasible | Compression that reduces expressive variation without obvious pumping. |
| `Lively` | indirect | Use clean/reference or future expansion/transient tools. |
| `Constrained` | feasible | Compression that reduces macro contrast. |
| `Strained` | partial | Approximate with heavy gain control; future limiter/saturation recommended. |
| `Clipped` | future DSP recommended | Use aggressive compression only as a weak proxy; proper version needs a clipper or limiter ceiling. |
| `Distorted` | future DSP recommended | Use heavy gain control only as a weak proxy; proper version needs saturation or waveshaping. |

### Recipe Feasibility

| Recipe | Technically possible now? | Notes |
|---|---|---|
| `Responsive` | partial | Better as a clean/reference target now; direct enhancement needs transient shaping. |
| `Sluggish` | yes | Fast-ish attack plus slow release. |
| `Surging` | yes | Existing compressor can create this clearly. |
| `Pinned` | yes | Needs expressive source and loudness matching. |
| `Limited` | partial | Needs limiter/headroom model for strongest result. |
| `Overdriven` | no, except weak proxy | Needs clipper/saturation after gain control, with safe output trim. |
| `Crushed` | yes | Compressor can approximate; limiter would improve authenticity. |
| `Breathless` | yes | Feasible but must control loudness bias. |
| `Alive` | partial | Best as reward/reference until future transient/expansion DSP exists. |

### Recommended Profile Strategy

Do not stack dynamic basics as separate processors in the first version.

Use this pattern instead:

1. Player selects basics or unlocks recipe.
2. UI shows the readable ingredient recipe.
3. Audio engine receives one derived compressor profile for the selected dynamic state.
4. Later DSP can expand this into transient shaper + compressor + limiter + clipper/saturation if needed.

This mirrors the spectral system conceptually, but avoids unreliable multi-compressor stacking.

Example profiles for exploration, not final calibration:

| Card | Threshold | Ratio | Attack | Release | Makeup | Expected cue |
|---|---:|---:|---:|---:|---:|---|
| `Softened` | `-28 dB` | `4:1` | `4 ms` | `180 ms` | `+4 dB` | rounded attack |
| `Blunted` | `-30 dB` | `6:1` | `2 ms` | `180 ms` | `+5 dB` | flattened hit front |
| `Loose` | `-26 dB` | `3:1` | `10 ms` | `500 ms` | `+3 dB` | slow recovery |
| `Compressed` | `-26 dB` | `4:1` | `8 ms` | `160 ms` | `+4 dB` | general gain control |
| `Squashed` | `-32 dB` | `8:1` | `3 ms` | `140 ms` | `+7 dB` | severe compression |
| `Pumping` | `-30 dB` | `6:1` | `5 ms` | `90 ms` | `+5 dB` | duck/return motion |
| `Breathing` | `-28 dB` | `3:1` | `12 ms` | `600 ms` | `+3 dB` | slow level swell |
| `Pinned` | `-30 dB` | `5:1` | `6 ms` | `240 ms` | `+4 dB` | held intensity |
| `Surging` | `-30 dB` | `6:1` | `5 ms` | `100 ms` | `+5 dB` | compressor waves |
| `Crushed` | `-34 dB` | `10:1` | `2 ms` | `130 ms` | `+7 dB` | pressed and lifeless |
| `Clipped` | `-30 dB` | `10:1` | `1 ms` | `80 ms` | `+8 dB` | weak hard-ceiling proxy; use real clipper later |
| `Distorted` | `-30 dB` | `8:1` | `2 ms` | `120 ms` | `+7 dB` | weak overload proxy; use waveshaper later |
| `Overdriven` | `-32 dB` | `10:1` | `1 ms` | `90 ms` | `+8 dB` | weak pushed-past-headroom proxy |

Calibration notes:
- These profiles need listening tests on the app's actual tracks.
- Output trim or loudness matching should be added for fair A/B comparisons.
- Material choice matters as much as parameter choice.
- The `Clipped`, `Distorted`, and `Overdriven` rows are placeholders until a real overload stage exists.

## Alias And Icon Strategy

Alias descriptors can still have icons without becoming playable basic cards.

Recommended alias/outcome icon mapping:

| Icon label | Anchor card | Role |
|---|---|---|
| `Explosive` | `Alive` or future macro-contrast card | Positive contrast variant. |
| `Effortless` | `Alive` | Headroom/ease variant. |
| `Controlled` | `Compressed` or `Tight` | Positive compression/recovery variant. |
| `Clamped` | `Limited` | Limiter-like variant. |
| `Overdriven` | `Clipped` + `Distorted` | Overload recipe/icon variant. |
| `Saturated` | `Distorted` | Softer nonlinear roughness variant. |
| `Gritty` | `Distorted` | Player-facing roughness variant. |
| `Ironed` | `Pinned` | Playful alternate for leveled expression. |
| `Ducking` | `Pumping` or `Surging` | More technical motion variant. |
| `Over-compressed` | `Surging`, `Crushed`, or `Breathless` | Technical alias, not preferred card label. |
| `Over-leveled` | `Pinned` | Technical alias, not preferred card label. |

## Training Design Notes

Useful A/B questions:
- Which sample keeps the first hit clearer?
- Which sample sounds more compressed?
- Which sample recovers more naturally after hits?
- Which sample has bigger quiet/loud contrast?
- Which sample feels more strained at loud moments?
- Which sample clips at the loud peaks?
- Which sample adds roughness when the music gets loud?

Useful source material:
- Dry drum loops for attack and release.
- Kick/bass loops for pumping and loose recovery.
- Vocal phrases for compression, breathing, and micro-dynamics.
- Piano or acoustic guitar for small expressive level changes.
- Verse/chorus material for macro-dynamic contrast.
- Sparse-to-dense arrangements for constrained vs alive behavior.
- Loud but safe peak-heavy material for clipping and overload training.

Testing cautions:
- Loudness matching matters. Louder often sounds more exciting, punchy, or effortless.
- Spectral changes can masquerade as dynamic changes.
- Compression can be musically desirable, so negative labels should be reserved for clearly excessive behavior.
- Do not teach `Distorted` as a catch-all defect; hum, buzz, rattle, crackle, and dropouts belong in integrity.
- Short listening rounds are better for fatiguing dynamic artifacts.

## Future DSP

Future DSP that would make the dynamic vocabulary stronger:
- Transient shaper with attack and sustain controls.
- Limiter model with ceiling and release.
- Dedicated clipper, soft clipper, saturation, or waveshaper for `Clipped`, `Distorted`, and `Overdriven`.
- Upward/downward expansion for `Lively` and contrast training.
- Loudness matching/output trim for fair A/B comparisons.
- Metering display after unlock only, not during blind listening.

## External Vocabulary Alignment

Formal listening-test language treats dynamic and spatial attributes as part of audio quality, not merely tone color. Useful alignment points:

- ITU-R BS.1284 lists gain/dynamic range changes, pumping, transient deformation, temporal smearing, crosstalk, and spatial image distortion as categories of audio impairments.
- ITU-R BS.1116 includes dynamics among advanced-system timbral or sound-homogeneity properties, and separately discusses localization and environment quality.
- HARMAN-style evaluation practice often separates timbre balance, spatial fidelity, distortion, and dynamic response.

References:
- https://www.itu.int/rec/R-REC-BS.1284/en
- https://www.itu.int/rec/R-REC-BS.1116/en
- https://aes2.org/community/technical-council/aes-technical-committee-perception-and-subjective-evaluation-of-audio-signals/

## Confusion Rules

Keep this section at the end so descriptor design can be read first, then checked against likely vocabulary collisions.

| Listener word | First check | Then check |
|---|---|---|
| punchy | Spectral `Punchy` / `Impactful` | Dynamic `Snappy`, `Tight`, or `Responsive` if the attack/recovery is the real cue |
| powerful | Spectral `Powerful` | Dynamic `Alive`, `Limited`, or future `Explosive` icon if the cue is contrast/headroom |
| exciting | Spectral `Exciting` / `Hyped` | Dynamic `Lively`, `Alive`, or future `Explosive` icon if contrast and motion are the real cue |
| dull attack | Dynamic `Softened` / `Blunted` | Spectral `Dull` if high-frequency detail is missing overall |
| boomy or slow | Spectral `Boomy` | Dynamic `Loose` or `Sluggish` if the level/recovery drags after hits |
| fatiguing loudness | Spectral `Fatiguing` / `Harsh` | Dynamic `Squashed`, `Breathless`, `Strained`, or `Overdriven` if the issue is constant pressure, limiting, or overload |
| clipping | Dynamic `Clipped` | Spectral `Harsh` only if the cue is mostly tonal brightness rather than peak-shape damage |
| distorted | Dynamic `Distorted` / `Overdriven` | Integrity `Buzz`, `Rattle`, `Rub Buzz`, or `Crackle` if the roughness is an added defect rather than overload |
| buzzing or rattling | Integrity issue | Dynamic `Distorted` only if the roughness follows loud peaks and sounds like overload |
| compressed but good | Dynamic `Compressed` / `Dense` / `Controlled` icon | Avoid negative labels unless contrast, attack, or recovery is clearly harmed |
| wider or bigger | Spatial/spectral `Airy`, `Exciting`, or future spatial width | Dynamic contrast only if the bigger feeling comes from level movement |
| cleaner | Spectral `Bright` / `Clear` style descriptors | Dynamic `Snappy`, `Alive`, or `Responsive` if time behavior and headroom are the reason |
