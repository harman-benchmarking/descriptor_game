# Dynamic Descriptors

This document is the source-of-truth for the Dynamic descriptor module: attack, release, compression behavior, level motion, density, headroom, clipping, overload, candidate recipes, and implementation notes.

The companion module files are `descriptor-spectral-descriptors.md`, `descriptor-spatial-descriptors.md`, and `descriptor-integrity-descriptors.md`.

Dynamic descriptors describe how the sound moves over time: attack, release, level contrast, compression behavior, transient shape, recovery, density, headroom, clipping, and overload distortion.

The key listening question is:

```text
Does the time shape of the sound change?
```

This doc starts by defining the dynamic vocabulary itself. Boundaries with Spectral and Integrity descriptors are kept later in the document, after the dynamic meanings are established.

## Current And Prototype App Anchors

The dynamic MVP should anchor itself in two training families. The current prototype already exercises part of the compression/motion family; the attack/release family is the next natural expansion.

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
| `releaseMs` | Controls recovery time after gain reduction. Very short release can chatter or pump; medium release can recover musically; too-long release can smear, lag, or stay clamped across the next event. |
| `makeupGainDb` | Restores loudness after compression and can create loudness-density bias. |

`Clipped` and `Distorted` belong in the dynamic vocabulary because they are overload/headroom outcomes. The MVP app now includes a simple waveshaper overload stage for them; a later limiter, ceiling control, and calibrated saturation stage would make them clearer and safer to train.

## MVP Region Art Direction

Keep the aspect name as `Dynamic`. The atlas regions inside Dynamic should use game-world place names, with the perceptual axis preserved as the region theme:

| Region | Theme | Image prompt |
|---|---|
| `Snapback Springs` | attack and recovery | Show an elastic landscape of spring towers, snap-bright impact stones, and trails that return cleanly to rest after each hit. Include one sharp kinetic burst and one softened cushioned landing so the region clearly suggests how hits start, stop, and reset. |
| `Pressurebreak Basin` | compression, motion, and overload | Retain the current `Pressureflow Basin` icon for MVP. Show translucent pressure chambers, glowing layers squeezed closer together, rhythmic light paths swelling and dipping, and broad plains where energy is held at a steadier level. The region now also owns headroom failure, so future icon revisions may add a few clean ceiling-strike fragments without turning the image into a separate overload land. |

Future off-atlas region prompt:
- `Ceilingbreak Spires`: show bright energy rising toward a glowing ceiling, with some peaks staying clean under an open sky while other peaks strike the ceiling and break into squared-off fragments and rough sparks. The image should communicate headroom, clipping, and overload roughness as dynamic peak behavior, not independent noise artifacts.

Use full region prompt text from `descriptor-icon-design-language.md`, section `15.4 Dynamic Region Icon Prompts`. Use Dynamic descriptor card prompts from section `14.6 Dynamic MVP Descriptor Card Prompts`.

## Vocabulary Shape

Recommended current shape:

| Type | Count | Purpose |
|---|---:|---|
| MVP basic cards | `9` | First playable dynamic ingredients that are comparatively distinguishable and technically meaningful. |
| Phase-2 / advanced cards | `6` | Useful vocabulary that needs stronger DSP, clearer teaching, or recipe context. |
| MVP discovery cards | `3` | One strong Snapback discovery plus two Pressurebreak discoveries. |
| Later discovery cards | open | Recipe outcomes that need stronger DSP, better loudness matching, or clearer source material. |
| Alias / outcome icons | open | Extra vocabulary can have icons without becoming separate playable basics. |

Recommended MVP basic vocabulary:

```text
Snappy, Softened, Tight, Loose,
Compressed, Pumping, Flat,
Clipped, Distorted
```

Recommended MVP discovery vocabulary:

```text
Sluggish, Surging, Overdriven
```

Why this smaller set:
- It covers attack, recovery, compression motion, expressive flattening, and overload/headroom failure.
- It avoids too many overlapping compression words at the beginning.
- It keeps the first Dynamic module closer to what listeners can realistically hear.
- It keeps `Clipped` and `Distorted` in Dynamic because their cause is headroom/peak overload, even though their heard result can resemble an artifact.

Current MVP Learn gate split:

| Gate | Gift pair | First catch | Later unlocks | Listening focus |
|---|---|---|---|---|
| `Snapback Gate` | `Tight`, `Loose` | `Softened` | `Snappy` | attack edge, recovery, groove reset |
| `Pressureflow Gate` | `Compressed`, `Pumping` | `Flat` | `Clipped`, `Distorted` | compression, motion, flatness, headroom failure |

Reason:
- `Snapback Gate` teaches time-shape first: the groove is either held tight, loosened, softened, or given a snappy reset.
- `Pressureflow Gate` then moves into level behavior: pressure, duck-and-return motion, expressive flattening, and overload.
- `Ceilingbreak Spires` is absorbed into `Pressurebreak Basin` for MVP because `Clipped` and `Distorted` are pressure/headroom failures and are too small as a standalone region.

Extended vocabulary:

```text
Blunted, Squashed, Dense, Breathing,
Lively, Constrained, Strained
```

Demoted or delayed from MVP basic cards:

| Word | Use it as | Reason |
|---|---|---|
| `Blunted` | stronger `Softened` state or ingredient in `Crushed` | Too close to `Softened` for the first pass; useful later when attack training is more granular. |
| `Squashed` | discovery/evolved card from `Compressed + Flat` or `Compressed + Softened` | It is a compound pressure state, not a clean first descriptor. |
| `Dense` | alias/outcome icon or later card | Too vulnerable to loudness, arrangement density, warmth, and mastering bias. |
| `Breathing` | phase-2 motion card or slow variant of `Pumping` | Useful, but subtle; teach `Pumping` first. |
| `Lively` | reference/reward descriptor or part of `Alive` | Mostly a preserved quality, not an effect the current compressor can add. |
| `Constrained` | later macro-dynamic card or ingredient for `Limited` | Useful, but subtle and source-dependent; `Flat` and overload basics are clearer first. |
| `Strained` | ingredient for `Limited` later | Needs limiter/headroom DSP to be distinct from constrained, harsh, clipped, or distorted. |
| `Explosive` | alias/outcome icon for strong macro contrast | Useful review word, but difficult to implement as a direct processor with the current compressor-only path. |
| `Effortless` | alias/outcome icon for clean headroom or `Alive` | Valuable evaluation word, but it mostly means absence of strain rather than an effect to apply. |
| `Over-compressed` | old name for `Surging` or severe compression states | Too technical and too close to the underlying process. |
| `Over-leveled` | old name for `Pinned` | Too technical; `Pinned` is more card-like and distinct from `Flat`. |

Vocabulary status:

| Status | Meaning | Current examples |
|---|---|---|
| Direct MVP effect | The app can create or prototype this as an audible processing change. | `Softened`, `Loose`, `Compressed`, `Pumping`, `Flat`, `Clipped`, `Distorted` |
| Reference or preserved quality | The app mostly teaches this by comparing clean/preserved audio against damaged versions. | `Snappy`, `Tight`, later `Lively`, `Responsive`, `Alive` |
| MVP discovery / compound state | The word contains two simpler MVP cues and should unlock as a recipe card. | `Sluggish`, `Surging`, `Overdriven` |
| Compound pressure state | The word contains more than one simpler cue and may become a discovery later. | `Squashed`, `Crushed`, `Breathless`, `Pinned` |
| Boundary or future headroom effect | Useful but needs careful distinction from Integrity artifacts. | `Strained`, later `Constrained` |

This matters because dynamic words are easy to hear as "better", "louder", "brighter", or "more exciting" unless the cue is tightly defined.

## Definition Discipline

Dynamic descriptors should be defined by the audible cue, not by the tool name alone.

Rules:
- One descriptor should answer one listening question whenever possible.
- If a word requires several cues, mark it as a compound state or recipe candidate.
- Positive descriptors such as `Snappy`, `Tight`, and `Lively` are usually preserved qualities, not effects the current compressor can add from nothing.
- Negative descriptors such as `Blunted`, `Pumping`, and `Flat` are easier to synthesize because they remove or reshape motion.
- Loudness must be matched before judging any dynamic descriptor.
- Do not use a dynamic label if the same impression is mostly caused by EQ, stereo width, noise, or speaker defects.

Practical teaching rule:

```text
First teach the loss or change.
Then teach the positive word as the preserved alternative.
```

Example:
- Teach `Blunted` as the front edge being pressed down.
- Then teach `Snappy` as the version where that front edge survives.

## Ambiguous Descriptor Decisions

These words need extra care.

| Word | Ambiguity | Decision |
|---|---|---|
| `Compressed` | Can sound good, controlled, louder, or denser. | Use for audible gain control where peaks and average level move closer, but some motion remains. It is not automatically bad. |
| `Flat` | Can mean tonal flatness, boring performance, or reduced level motion. | In this module it means reduced expressive level motion. It should not imply flat frequency response. |
| `Squashed` | Feels like `Compressed + Flat`, often with softened/blunted attack. | Treat as a severe compound compression state. It should not be an MVP basic; use it as a discovery/evolved card after `Compressed`, `Flat`, and `Softened` are understood. |
| `Dense` | Can come from arrangement, EQ warmth, saturation, or compression. | Use only when high average presence is the audible cue after loudness matching. Do not use it as a synonym for bassy, warm, or busy. |
| `Tight` | Can mean spectral bass control or dynamic recovery. | In Dynamic, it means recovery timing feels controlled. Avoid using it for less bass bloom. |
| `Loose` | Can mean boomy bass, room resonance, or slow recovery. | In Dynamic, it means the level/recovery lags after hits. Use transient material, not resonant bass, for training. |
| `Lively` | Can mean bright, exciting, wide, or simply preferred. | Use as a preserved micro-dynamic quality: small expressive changes remain audible. |
| `Constrained` | Can overlap with `Flat`, `Limited`, and `Strained`. | Delay from MVP basics. Use later for reduced macro expansion: big sections do not open enough, but hard overload is not necessarily audible. |
| `Strained` | Can overlap with harshness, clipping, distortion, or system stress. | Use for forced loud moments near a ceiling. If hard peak damage is audible, use `Clipped`; if rough nonlinear texture is audible, use `Distorted`. |
| `Clipped` | Could be treated as an Integrity defect because it sounds damaged. | Keep it in Dynamic because the cause is peak/headroom failure. Integrity should own independent clicks, crackle, hum/buzz tones, rattles, dropouts, and contamination. |
| `Distorted` | Can mean any unwanted roughness. | Keep the overload version in Dynamic only when roughness follows signal intensity. Independent buzz, rattle, crackle, or dropout belongs to Integrity. |

## Dynamic Axes

Dynamic descriptors should be grouped by listening axis rather than by frequency range.

| Axis | Listener question | Positive/neutral vocabulary | Negative/excess vocabulary |
|---|---|---|---|
| Transient attack | Does the first edge of a hit survive? | snappy, responsive | softened |
| Release/recovery | Does the level reset before the next event? | tight, controlled | loose |
| Compression and motion | Is gain control changing peak/average relationships or creating level movement? | controlled | compressed, pumping, flat |
| Overload and headroom | Do peaks stay clean when pushed? | alive | clipped, distorted, overdriven |

The MVP Learn flow uses two gates across these axes:
- `Snapback Gate` covers transient attack plus release/recovery.
- `Pressureflow Gate` covers compression/motion plus the first overload/headroom warnings.

## Dynamic Regions And Roadmap

The MVP atlas uses two Dynamic regions. `Ceilingbreak Spires` is absorbed into `Pressurebreak Basin` for now because `Clipped` and `Distorted` are pressure/headroom failures and do not yet have enough surrounding vocabulary to justify a standalone region.

### Region 1: Snapback Springs

Theme: how hits start, stop, and reset.

Elements involved:
- `Snappy`
- `Softened`
- `Tight`
- `Loose`

Roadmap:

```text
Softened + Loose
      |
   Sluggish
```

Bridge recipes:
- `Responsive` can later use `Snappy + Tight`, but it is a preserved/reference quality more than an effect the current engine creates.
- `Crushed` can later use a stronger attack-loss state such as `Blunted`, but `Blunted` does not need to be an MVP basic.
- `Alive` uses `Snappy + Tight` plus preserved contrast.

Table:

| Stage | Card | Recipe | Role |
|---|---|---|---|
| Element | `Snappy` | basic | clear transient front edge |
| Element | `Softened` | basic | rounded front edge |
| Element | `Tight` | basic | controlled start/stop behavior |
| Element | `Loose` | basic | slow or smeared recovery |
| MVP combo | `Sluggish` | `Softened + Loose` | rounded attack plus slow recovery |
| Later combo | `Responsive` | `Snappy + Tight` | clean attack plus controlled recovery, best as a reference/reward state |
| Later card | `Blunted` | stronger `Softened` | heavily pressed attack, reserved for phase 2 |

Design notes:
- This is the most concrete dynamic region and should be taught first.
- Dry drums, percussion, plucked bass, piano, and acoustic guitar make it easier.
- `Snappy` must be taught against spectral `Bright`, because high-frequency emphasis can fake attack clarity.

### Region 2: Pressurebreak Basin

Theme: gain reduction, audible level movement, expressive flattening, and overload/headroom failure.

This region needs the strictest wording because several cards are related:

```text
Compressed = audible level control, motion still remains.
Flat = expressive level motion is reduced, whether or not compression is obvious.
Clipped = peaks hit a hard ceiling and lose shape.
Distorted = overload roughness follows signal intensity.
Squashed = severe compressed + flat behavior, often with blunted peaks.
Dense = high average presence after loudness matching; not automatically bad.
```

Elements involved:
- `Compressed`
- `Pumping`
- `Flat`
- `Clipped`
- `Distorted`

Roadmap:

```text
Compressed + Pumping
      |
   Surging

Clipped + Distorted
      |
   Overdriven
```

Table:

| Stage | Card | Recipe | Role |
|---|---|---|---|
| Element | `Compressed` | basic | audible gain reduction while some motion remains |
| Element | `Pumping` | basic | rhythmic level ducking and return |
| Element | `Flat` | basic | reduced expressive level motion without necessarily sounding overloaded |
| Element | `Clipped` | basic | peaks hit a hard ceiling and lose shape |
| Element | `Distorted` | basic | nonlinear roughness follows overload |
| MVP combo | `Surging` | `Compressed + Pumping` | compressor-driven waves of level motion |
| MVP combo | `Overdriven` | `Clipped + Distorted` | overload becomes audibly hard and rough |
| Later combo | `Pinned` | `Compressed + Flat` | sound held at one intensity |
| Later combo / evolved | `Squashed` | `Compressed + Flat + Softened` | severe pressure state: compressed, flattened, and softened |
| Later big combo | `Crushed` | `Compressed + Pumping + Flat` | severe compression removes motion and natural recovery |
| Later card | `Breathing` | slow `Pumping` variant | slower program-level swelling, reserved for phase 2 |
| Later card | `Dense` | density outcome | high average presence, reserved until loudness matching is stronger |
| Later card | `Constrained` | macro-dynamic restriction | loud sections fail to open before obvious damage |
| Later card | `Strained` | limiter/headroom stress | loud moments feel forced near a ceiling |

Design notes:
- This region maps directly to compression detection plus the first headroom/overload warnings.
- Loudness matching is mandatory because denser samples can sound better just because they are louder.
- `Dense` should be treated carefully: it can be a positive production quality or a warning sign.
- `Squashed` should not be taught before `Compressed` and `Flat`; otherwise the player hears it as an undefined "bad compression" bucket.
- `Clipped` and `Distorted` are included in Dynamic because their cause is headroom/overload behavior.
- Integrity should still own independent defects: hum, buzz, crackle, rattle, dropout, rub buzz, and contamination.
- `Clipped` should be taught as peak-shape damage, not generic harshness.
- `Distorted` should be taught as overload roughness, not hum, buzz, rattle, or other integrity issues.
- `Clipped` and `Distorted` now use a simple overload DSP layer in the MVP, but they still need later calibration against source material and loudness bias.

### Future Off-Atlas Region: Ceilingbreak Spires

Status: future/off-atlas until there is enough headroom vocabulary to support it.

Potential future elements:
- `Constrained`
- `Strained`
- `Lively`
- `Limited`
- `Alive`
- `Breathless`

Design note:
- Bring this region back only if the app gets a stronger limiter/headroom model and enough non-overlapping descriptors to keep it from being a two-card region.

## Core Descriptor Catalog

These are the active MVP dynamic cards plus deferred candidates.

| ID | Label | Primary region | Summary | Listen for | Aliases / icon variants |
|---|---|---|---|---|---|
| `snappy` | `Snappy` | Snapback Springs | MVP basic: preserved fast transient starts. | The first edge of snare, kick, pluck, or piano arrives clearly without needing extra treble. | crisp attack, sharp attack |
| `softened` | `Softened` | Snapback Springs | MVP basic: mildly rounded transient starts. | Hits still arrive, but their first edge is gentler and less decisive. | rounded, gentle, cushioned |
| `tight` | `Tight` | Snapback Springs | MVP basic/reference: controlled recovery between events. | Drums and bass reset cleanly before the next hit; groove feels locked. | controlled recovery, locked |
| `loose` | `Loose` | Snapback Springs | MVP basic: slow or smeared recovery between events. | Bass/drums drag into following notes; groove feels slow to reset. | dragging, slow, lagging |
| `compressed` | `Compressed` | Pressurebreak Basin | MVP basic: audible gain control, not necessarily damaged. | Peaks sit closer to average level, but the sound can still breathe and move. | controlled, squeezed |
| `pumping` | `Pumping` | Pressurebreak Basin | MVP basic: fast, audible duck-and-return level motion. | Mix ducks after kick/snare, then swells back with the beat. | ducking, pulsing |
| `flat` | `Flat` | Pressurebreak Basin | MVP basic: reduced expressive level variation. | Everything sits at similar intensity; small performance changes disappear. | over-leveled, monotone |
| `clipped` | `Clipped` | Pressurebreak Basin | MVP basic: peaks hit a hard ceiling and lose shape. | Loud hits crack, flatten, spit, or splash at the instant of impact. | clipping, clipped peaks, hard ceiling |
| `distorted` | `Distorted` | Pressurebreak Basin | MVP basic: overload adds nonlinear roughness. | Loud moments become gritty, fuzzy, raspy, or broken up in a way that follows signal intensity. | saturated, gritty, warped |
| `sluggish` | `Sluggish` | Snapback Springs | MVP discovery: `Softened + Loose`, rounded attack plus slow recovery. | Hits feel cushioned and slow to spring back before the next event. | dragging, laggy, slow reset |
| `surging` | `Surging` | Pressurebreak Basin | MVP discovery: `Compressed + Pumping`, compressor-driven waves of level motion. | The whole mix ducks, swells, or pulls in waves caused by gain control. | swelling, ducking, over-compressed |
| `overdriven` | `Overdriven` | Pressurebreak Basin | MVP discovery: `Clipped + Distorted`, overload becomes audibly hard and rough. | Loud peaks flatten and grow gritty or rough in a way tied to being pushed past clean headroom. | driven, overloaded, hard saturation |
| `blunted` | `Blunted` | Snapback Springs | Phase 2: strongly flattened transient starts. | Drums hit but do not bite; attack energy feels pressed down. | dulled attack, flattened attack |
| `breathing` | `Breathing` | Pressurebreak Basin | Phase 2: slower program-level gain swell. | Backgrounds, room tone, or sustained parts gently rise and fall. | swelling, inhaling/exhaling |
| `squashed` | `Squashed` | Pressurebreak Basin | Discovery/evolved: severe compression/limiting pressure. | Hits lose height, sections stop expanding, and the sound feels pressed or over-held. | crushed, over-limited |
| `dense` | `Dense` | Pressurebreak Basin | Later/alias: high average presence after loudness matching. | The sound feels continuously filled-in with fewer gaps between events. | packed, filled-in |
| `lively` | `Lively` | future Ceilingbreak Spires | Reference/reward: preserved small dynamic gestures. | Vocal inflection, ghost notes, pick pressure, and subtle groove motion remain audible. | expressive, animated |
| `constrained` | `Constrained` | future Ceilingbreak Spires | Later card: macro contrast is held back. | Choruses or loud sections do not open up as much as expected. | restricted, held back |
| `strained` | `Strained` | future Ceilingbreak Spires | Future DSP: loud moments feel forced near a ceiling. | Choruses harden, peaks squeeze, and the system seems to be running out of ease. | choked, stressed, limited |

## Descriptor Detail Notes

### Snappy

Player-facing meaning:
- The sound has quick, clean starts.
- Hits arrive with a visible edge.
- Rhythmic material feels alert.
- The edge should come from timing/envelope behavior, not just extra treble.

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
- The next hit arrives cleanly because the previous one has recovered.

Technical meaning:
- Good timing relationship between transient attack, sustain, and release.
- Can be partly spectral in bass systems, so dynamic `Tight` should focus on recovery behavior.
- It is not the same as less bass bloom; that belongs to Spectral or room behavior.

Best material:
- Kick/bass interplay, funk drums, short bass notes, rhythmic acoustic guitar.

Implementation note:
- Current compressor can approximate this with moderate attack and release matched to the groove.
- A future transient shaper would make it more precise.

### Loose

Player-facing meaning:
- The groove feels late, smeared, or slow to recover.
- Notes hang around longer than they should.
- The sound seems to reset too slowly after hits.

Technical meaning:
- Slow or poorly matched recovery.
- Can be confused with spectral `Boomy` or room resonance, so use level-matched transient material.
- It should be heard as time smear, not simply extra low-frequency sustain.

Best material:
- Drum and bass loops, short kick patterns, staccato bass.

Implementation note:
- Feasible with current compressor using slower release and material with frequent transients.

### Compressed

Player-facing meaning:
- Peaks and average level sit closer together.
- The sound may feel more controlled or more constant.
- It is not automatically bad; the key cue is audible level control.

Technical meaning:
- Audible gain reduction.
- Peaks are reduced relative to average level.
- Motion remains more intact than in `Flat`, `Pinned`, or `Squashed`.
- Compression can be musically useful, so avoid treating every compressed sound as damaged.
- In training, this maps directly to the current compression detection module.

Best material:
- Drums, vocals, bass, full mixes with strong peaks.

Implementation note:
- Fully feasible with the current compressor.
- Must be loudness-matched against the uncompressed version.
- If the result simply sounds louder or fuller, the player may be hearing `Dense` bias rather than compression behavior.

### Squashed

Player-facing meaning:
- The music has been pressed down too hard.
- It feels loud or dense, but less alive.
- It often sounds like `Compressed` pushed past usefulness.

Technical meaning:
- Severe compression or limiting.
- Usually combines three cues:
  - audible compression,
  - reduced expressive contrast,
  - softened or blunted peaks.
- This is why `Squashed` overlaps with `Compressed` and `Flat`.

Best material:
- Full mixes, loud choruses, drum buses, aggressive pop/rock/electronic material.

Implementation note:
- Feasible with current compressor as a prototype state.
- A true limiter model would make it more realistic.
- Product decision: keep `Squashed` out of the MVP basics. Use it as a discovery/evolved card from `Compressed + Flat + Softened`, or later from `Compressed + Flat + Blunted` when `Blunted` exists.

### Dense

Player-facing meaning:
- The sound is packed and continuously filled.
- It may feel strong and polished, or tiring if overdone.
- It is about average presence, not necessarily bad compression.

Technical meaning:
- High average level relative to peaks.
- Can be created by compression, saturation, arrangement density, or mastering.
- It should not be used when the only cue is warmth, bass thickness, or a busy arrangement.

Best material:
- Modern pop, electronic drops, heavily produced rock, dense vocal stacks.

Implementation note:
- Feasible with current compressor plus makeup gain.
- Needs loudness matching so the player does not simply prefer the louder sample.
- For early training, avoid using `Dense` as a first-pass basic unless the app can level-match well.

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
- It feels less expressive, not necessarily louder or more distorted.

Technical meaning:
- Reduced micro-dynamic variation and expressive level motion.
- Can come from compression, limiting, poor source material, or over-normalized examples.
- It is different from `Compressed`: compression is the process/cue of gain control; flatness is the resulting loss of expressive variation.

Best material:
- Expressive performances where small level variation should be obvious.

Implementation note:
- Feasible with current compressor, but source choice matters.
- It should be separated from `Pinned`, which is the recipe where compression causes the flatness.
- It should also be separated from `Squashed`, which is a more severe pressure state that often includes flatness plus attack loss.

### Lively

Player-facing meaning:
- The sound has small motions and expressive life.
- Performers feel animated.
- It should feel naturally moving, not merely brighter, wider, or louder.

Technical meaning:
- Good micro-dynamic preservation.
- Small level differences remain audible.
- Can be mistaken for spectral brightness or excitement.
- In the current app, this is mostly a reference-state descriptor: the processing should preserve it, not manufacture it.

Best material:
- Vocals, jazz drums, fingerstyle guitar, piano, expressive acoustic performances.

Implementation note:
- Like `Snappy`, this is mostly a preserved/reference state with the current engine.
- Future expansion, upward compression, or transient shaping could make `Lively` more directly controllable.

### Constrained

Player-facing meaning:
- The music feels held in place.
- Big moments arrive, but they do not fully open.
- It is a lack of expansion, before clear overload damage appears.

Technical meaning:
- Reduced macro-dynamic contrast.
- Often related to compression, limiting, or conservative playback headroom.
- It is broader and less damaged than `Strained`.

Best material:
- Songs with obvious verse/chorus contrast, orchestral crescendos, acoustic drums.

Implementation note:
- Feasible with current compressor when source material has clear loud/soft contrast.

### Strained

Player-facing meaning:
- Loud passages sound forced.
- The sound hardens, chokes, or feels near a ceiling.
- The cue is stress at loud moments, not constant flatness.

Technical meaning:
- Headroom or limiter stress.
- Can include compression, distortion, clipped peaks, or amplifier/speaker limits.
- It sits between `Constrained` and explicit damage words:
  - use `Constrained` if loud sections merely fail to open,
  - use `Strained` if loud sections feel forced or stressed,
  - use `Clipped` if peaks hit a hard ceiling,
  - use `Distorted` if rough nonlinear texture appears.

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
- The MVP uses a waveshaper clip curve after the compressor so `Clipped` can sound like peak-shape damage rather than generic compression.
- A future limiter ceiling and loudness-matched output trim should replace the rough prototype once training material is finalized.
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
| `sluggish` | `Sluggish` | `Softened + Loose` | MVP combo | Snapback Springs | Rounded attack with slow recovery. | Feasible with current compressor and distinguishable. |
| `surging` | `Surging` | `Compressed + Pumping` | MVP combo | Pressurebreak Basin | Compressor-driven waves of level motion. | Feasible with current compressor; should use a dedicated recipe profile for clarity. |
| `overdriven` | `Overdriven` | `Clipped + Distorted` | MVP combo | Pressurebreak Basin | Overload becomes audibly hard and rough. | Feasible with the MVP waveshaper; later limiter/clipper calibration recommended. |

Later/deferred recipes:

| ID | Discovery | Ingredients | Tier | Region | Reason deferred |
|---|---|---|---|---|---|
| `responsive` | `Responsive` | `Snappy + Tight` | Later combo / reward | Snapback Springs | More like preserved clean behavior than a direct effect. |
| `pinned` | `Pinned` | `Compressed + Flat` | Later combo | Pressurebreak Basin | Too close to `Flat` with current stacking; needs dedicated calibration. |
| `squashed` | `Squashed` | `Compressed + Flat + Softened` | Later evolved combo | Pressurebreak Basin | Useful word, but overlaps too much with `Flat` and generic bad compression in MVP. |
| `crushed` | `Crushed` | `Compressed + Pumping + Flat` | Later big combo | Pressurebreak Basin | Current stacking collapses toward `Pumping`; needs custom recipe profile. |
| `breathless` | `Breathless` | `Squashed + overload` | Later big combo | Pressurebreak Basin / future Ceilingbreak | Highly loudness-biased; needs better loudness matching and overload calibration. |
| `alive` | `Alive` | `Snappy + Tight` plus preserved contrast | Later reward | future Ceilingbreak Spires | Best as a reference/reward state until future enhancement DSP exists. |
| `limited` | `Limited` | `Constrained + Flat` | Later combo | future Ceilingbreak Spires | `Constrained` is not an MVP basic and a limiter/headroom model would help. |

### Region Recipe Map

| Region | Internal recipes | Bridge recipes |
|---|---|---|
| Snapback Springs | `Sluggish` | later `Responsive`, `Alive` |
| Pressurebreak Basin | `Surging`, `Overdriven` | later `Pinned`, `Squashed`, `Crushed`, `Breathless`, `Limited` |
| future Ceilingbreak Spires | later `Alive`, `Limited` | later `Breathless` |

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
- Later `Strained` can shade the feeling, but the MVP recipe is `Clipped + Distorted`.

Implementation:
- Feasible now with the MVP waveshaper after compression, with safe output trim for loudness matching.
- A later limiter, ceiling control, or calibrated saturation stage would make the teaching example cleaner.

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
| `Blunted` | phase 2 | Stronger compression with very fast attack; use only after `Softened` is reliable. |
| `Tight` | partial | Moderate compression with release matched to rhythmic material. |
| `Loose` | feasible | Slow release or poorly matched release on rhythmic material. |
| `Compressed` | feasible | Existing compressor detection profile. |
| `Squashed` | recipe/evolved preferred | Low threshold, high ratio, fast attack, makeup gain; do not teach before `Compressed` and `Flat`. |
| `Dense` | delayed | Compression plus makeup gain, with output trim and level matching; too loudness-sensitive for MVP basic. |
| `Pumping` | feasible | Compression with audible release movement. |
| `Breathing` | phase 2 | Gentler compression with slower program-level recovery; teach after `Pumping`. |
| `Flat` | feasible | Compression that reduces expressive variation without obvious pumping. |
| `Lively` | reference/reward | Use clean/reference or future expansion/transient tools. |
| `Constrained` | delayed | Compression that reduces macro contrast; subtle and source-dependent, so not MVP basic. |
| `Strained` | delayed/future | Approximate with heavy gain control; future limiter/saturation recommended. |
| `Clipped` | MVP basic with new DSP | Needs a simple clipper/limiter ceiling, not just aggressive compression. |
| `Distorted` | MVP basic with new DSP | Needs waveshaper/saturation; must be separated from Integrity defects. |

### Recipe Feasibility

| Recipe | Technically possible now? | Notes |
|---|---|---|
| `Responsive` | partial | Better as a clean/reference target now; direct enhancement needs transient shaping. |
| `Sluggish` | yes | Fast-ish attack plus slow release. |
| `Surging` | yes | Existing compressor can create this clearly. |
| `Pinned` | yes | Needs expressive source and loudness matching. |
| `Squashed` | yes as recipe | Use as `Compressed + Flat + Softened`; avoid as first-pass basic. |
| `Overdriven` | yes with MVP overload DSP | Use as `Clipped + Distorted`, with safe output trim. |
| `Limited` | partial/later | Use as `Constrained + Flat`; needs limiter/headroom model for strongest result. |
| `Crushed` | yes | Compressor can approximate; limiter would improve authenticity. Keep distinct from `Squashed` by requiring attack loss plus flatness. |
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
| `Clipped` | `-20 dB` | `3.5:1` | `2 ms` | `80 ms` | light trim/makeup | hard clip curve after compression |
| `Distorted` | `-22 dB` | `2.5:1` | `6 ms` | `160 ms` | light trim/makeup | tanh-style waveshaper after compression |
| `Overdriven` | `-24 dB` | `5:1` | `2 ms` | `90 ms` | light trim/makeup | combined saturation plus clipped ceiling |

Calibration notes:
- These profiles need listening tests on the app's actual tracks.
- Output trim or loudness matching should be added for fair A/B comparisons.
- Material choice matters as much as parameter choice.
- The `Clipped`, `Distorted`, and `Overdriven` rows describe prototype values; they still need listening calibration on the final training loops.

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

## Boundary With Spectral Descriptors

Spectral descriptors describe frequency-balance changes such as bass, mids, treble, masking, brightness, and body. Dynamic descriptors describe time behavior: attack, recovery, level movement, contrast, headroom, and overload.

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

Practical decision rule:

| If the player hears... | Prefer... |
|---|---|
| more low hit, more upper-bass firmness, or more top-edge bite | Spectral descriptor |
| a faster or slower attack with level matched | Dynamic descriptor |
| recovery that drags after hits | Dynamic descriptor |
| a chorus that cannot expand even at the same tonal balance | Dynamic descriptor |
| roughness that follows overload peaks | Dynamic `Distorted` or `Overdriven` |
| buzz, rattle, crackle, dropout, or steady added noise | Integrity descriptor |

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
| exciting | Spectral `Exciting` | Dynamic `Lively`, `Alive`, or future `Explosive` icon if contrast and motion are the real cue |
| dull attack | Dynamic `Softened` / `Blunted` | Spectral `Dull` if high-frequency detail is missing overall |
| boomy or slow | Spectral `Boomy` | Dynamic `Loose` or `Sluggish` if the level/recovery drags after hits |
| fatiguing loudness | Spectral `Fatiguing` / `Harsh` | Dynamic `Squashed`, `Breathless`, `Strained`, or `Overdriven` if the issue is constant pressure, limiting, or overload |
| clipping | Dynamic `Clipped` | Spectral `Harsh` only if the cue is mostly tonal brightness rather than peak-shape damage |
| distorted | Dynamic `Distorted` / `Overdriven` | Integrity `Buzz`, `Rattle`, `Rub Buzz`, or `Crackle` if the roughness is an added defect rather than overload |
| buzzing or rattling | Integrity issue | Dynamic `Distorted` only if the roughness follows loud peaks and sounds like overload |
| compressed but good | Dynamic `Compressed` / `Dense` / `Controlled` icon | Avoid negative labels unless contrast, attack, or recovery is clearly harmed |
| wider or bigger | Spatial/spectral `Airy`, `Exciting`, or future spatial width | Dynamic contrast only if the bigger feeling comes from level movement |
| cleaner | Spectral `Bright` / `Clear` style descriptors | Dynamic `Snappy`, `Alive`, or `Responsive` if time behavior and headroom are the reason |
