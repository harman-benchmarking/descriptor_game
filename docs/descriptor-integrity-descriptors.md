# Integrity Descriptors

This document is the source-of-truth for the Integrity descriptor module: unwanted added defects, interruptions, short playback faults, candidate vocabulary, regions, and implementation notes.

The companion module files are `descriptor-spectral-descriptors.md`, `descriptor-spatial-descriptors.md`, and `descriptor-dynamic-descriptors.md`.

In car audio evaluation, this category is better called `Integrity` than `Artifacts`. The listener is not judging tone balance, spatial image, or musical dynamics. The listener is judging whether the playback path adds unwanted defects: noise, interference, intermittent faults, brief chirps, or digital transport problems. Mechanical speaker/cabin faults are valuable, but they are postponed until the app has more convincing samples or models.

This atlas intentionally stays simple:

```text
Integrity = unwanted added defect or interruption.
No combo cards are needed for the first version.
```

`Dirty` should be preserved as a basic descriptor. It is a useful broad word for contaminated or unclean playback, especially when the listener can hear that something is wrong but cannot yet name the exact defect.

## MVP Region Art Direction

Keep the aspect name as `Integrity`. The MVP atlas uses one game-world place for all integrity issues, because these cards are diagnostic faults rather than blend chemistry.

| Region | Theme | Image prompt |
|---|---|---|
| `Faultveil Rift` | all integrity faults | Show a dark signal landscape where misty noise contamination and broken playback faults exist in one place: pale hiss/static veil, low electrical hum glow, jagged buzz/whine filaments, sharp click fractures, larger pop bursts, crackle sparks, short squeak chirps, and a clean dark dropout gap where sound disappears before reappearing. The image should feel like unwanted playback defects, not spectral EQ, compression, clipping overload, spatial depth, or musical impact. |

Current app descriptor image prompts cover the implemented MVP basics: `Hiss`, `Static`, `Hum`, `Buzz`, `Whine`, `Dirty`, `Click`, `Pop`, `Crackle`, `Dropout`, and `Squeak`. Dedicated art for the newly added descriptors can follow later; the app may use `0000.png` placeholders during DSP validation. The current app can temporarily reuse the old `Glitchgap Rift` art under the new `Faultveil Rift` asset name, but a new combined region picture should be generated before this is treated as final art. Full region prompt text lives in `descriptor-icon-design-language.md`, section `15.5 Integrity Region Icon Prompts`. Full descriptor card prompt text lives in section `14.7 Integrity MVP Descriptor Card Prompts`.

## Boundary With Other Descriptor Families

Integrity descriptors should not absorb spectral, spatial, or dynamic descriptors.

| Family | What it describes | Keep separate from integrity |
|---|---|---|
| Spectral | Frequency balance and tonal color. | `Bright`, `Dull`, `Boomy`, `Harsh`, `Thin`, `Muffled`. |
| Dynamic | Time behavior, compression, headroom, overload. | `Compressed`, `Squashed`, `Clipped`, `Distorted`, `Overdriven`. |
| Spatial | Stereo image, width, placement, depth. | `Left`, `Right`, `Wide`, `Narrow`, `Focused`, `Blurred`, `Far`. |
| Integrity | Added defects, interruptions, contamination, and short playback faults. | `Hum`, `Buzz`, `Whine`, `Hiss`, `Static`, `Crackle`, `Squeak`, `Dirty`. |

Rule of thumb:

```text
If the issue sounds like the playback system added something unwanted, use Integrity.
If the issue sounds like the music is being pushed past clean headroom, use Dynamic.
```

Important boundary:
- `Clipped`, `Distorted`, and `Overdriven` belong in the dynamic atlas.
- `Buzz`, `Static`, `Whine`, `Crackle`, `Squeak`, and `Dirty` belong in the integrity atlas.
- A listener may say "distorted" casually when they hear a speaker fault, but the training system should guide them toward the more specific integrity word when possible.

## Current App Anchors

The current app already has several pieces that can support integrity training.

| Module | Current task | Integrity vocabulary it can support |
|---|---|---|
| `Noise Detection` | Identify added noise. | hiss, static, dirty |
| `Hum Detection` | Identify low-frequency electrical hum. | hum, buzz |
| `Codec Detection` | Identify codec degradation. | dirty, crackle-like edge, digital contamination |

The native or documented audio system already contains useful anchors:

| Capability | Integrity role |
|---|---|
| Additive noise | Can create `Hiss`, `Static`, and simple `Dirty` presets. |
| 50/60 Hz hum generator | Can create `Hum` and harmonic-rich `Buzz` variants. |
| Codec/proxy processing | Can create lossy or contaminated digital quality for `Dirty`. |
| Impulse generator | Can create clear `Click`, `Pop`, and `Crackle` examples. |
| Dropout gate | Can create `Dropout`. |
| Short chirp generator | Can create MVP `Squeak` as a brief friction-like event. |
| Future defect samples or synthetic resonators | Best if postponed mechanical cards such as `Rattle` or `Rub Buzz` return later. |

## Vocabulary Shape

Recommended current shape:

| Type | Count | Purpose |
|---|---:|---|
| Basic cards | `11` | Simple integrity defects with one primary region each. |
| Combo cards | `0` | Not needed for this category. |
| Alias / icon variants | open | Useful for extra icon generation without adding training cards. |

Reduced basic vocabulary:

```text
Hiss, Static, Hum, Buzz, Whine, Dirty,
Click, Pop, Crackle, Dropout, Squeak
```

No-combo rule:
- Do not expose `Dirty = Hiss + Buzz + Crackle` as a recipe.
- `Dirty` can still be implemented by one internal profile.
- Keep each integrity card directly learnable and searchable.
- Extra icon labels can exist as aliases, but they should point back to one of the basics.

Postponed mechanical cards:
- `Rattle` and `Rub Buzz` are removed from the MVP basics.
- They remain valid future diagnostic words, but they need recorded car/speaker fault material or a more convincing physical model.
- Removing them keeps the MVP learn path focused on defects that can be generated reliably in the current TypeScript/WebAudio engine.

## Integrity Axes

Integrity descriptors can be grouped by the kind of defect the listener notices.

| Axis | Listener question | Typical descriptors |
|---|---|---|
| Noise floor | Is there unwanted broadband background contamination? | hiss, static, dirty |
| Electrical interference | Is there a tonal or buzzing interference added by the system? | hum, buzz, whine |
| Intermittent faults | Does the sound break, tick, pop, chirp, or disappear? | click, pop, crackle, dropout, squeak |

## Integrity Regions

The MVP atlas uses one active region. The two Learn gates still exist, but the Atlas presents Integrity as one fault territory.

### Region 1: Faultveil Rift

Theme: unwanted added defects, contamination, short events, and missing playback.

Elements involved:
- `Hiss`
- `Static`
- `Hum`
- `Buzz`
- `Whine`
- `Dirty`
- `Click`
- `Pop`
- `Crackle`
- `Dropout`
- `Squeak`

Table:

| Stage | Card | Role |
|---|---|---|
| Element | `Hiss` | steady high-frequency noise floor |
| Element | `Static` | rough broadband noise or radio-like contamination |
| Element | `Hum` | smooth low-frequency electrical tone |
| Element | `Buzz` | rough harmonic-rich hum or electrical vibration |
| Element | `Whine` | higher pitched tonal interference |
| Element | `Dirty` | broad contaminated or unclean playback |
| Element | `Click` | small sharp tick or edge |
| Element | `Pop` | larger impulse or pressure-like burst |
| Element | `Crackle` | cluster of small irregular ticks |
| Element | `Dropout` | brief loss or gap in the audio |
| Element | `Squeak` | short high-friction chirp or squeal event |

Design notes:
- Atlas grouping is intentionally broad: the user enters one Integrity fault territory, then learns the differences through gates and card details.
- `Hum`, `Buzz`, and `Whine` should be taught with pitch and texture contrast.
- `Dirty` should be introduced after a few specific examples, so it does not become a catch-all too early.
- These are highly recognizable but can become annoying quickly.
- Use short examples and avoid excessive volume.
- `Crackle` should feel intermittent, not like continuous hiss.
- `Squeak` is kept only as a short chirp event in the MVP. Full mechanical `Rattle` and `Rub Buzz` cards are postponed.

## Core Descriptor Catalog

These are candidate integrity cards. They should not be treated as final implementation data yet.

| ID | Label | Primary region | Summary | Listen for | Aliases / icon variants |
|---|---|---|---|---|---|
| `hiss` | `Hiss` | Faultveil Rift | Steady high-frequency noise floor. | Tape-like or air-like noise behind the music. | noise floor, shhh, white noise |
| `static` | `Static` | Faultveil Rift | Rough broadband contamination. | Radio-like fuzz, unstable noise, scratchy background texture. | fuzz, scratch, radio static |
| `hum` | `Hum` | Faultveil Rift | Smooth low-frequency electrical tone. | 50/60 Hz tone under the music, sometimes with low harmonics. | mains hum, ground hum |
| `buzz` | `Buzz` | Faultveil Rift | Rough harmonic-rich tone or vibration-like interference. | Buzzy electrical texture, sharper than hum, often grainier. | electrical buzz, buzzy |
| `whine` | `Whine` | Faultveil Rift | Higher pitched tonal interference. | Thin tonal whine, sometimes pitch-linked to engine or power behavior. | alternator whine, tone whine |
| `dirty` | `Dirty` | Faultveil Rift | Playback feels contaminated or unclean. | Low-level junk, mixed roughness, grunge, or unclear defect residue. | contaminated, unclean, polluted |
| `click` | `Click` | Faultveil Rift | Small sharp impulse. | Tick-like edge, small digital click, tiny contact noise. | tick, ticked |
| `pop` | `Pop` | Faultveil Rift | Larger impulse or burst. | Sudden pop, thump-like impulse, plug/contact style burst. | thump pop, impulse |
| `crackle` | `Crackle` | Faultveil Rift | Irregular cluster of small clicks. | Broken contact, dirty connector, vinyl-like crackle. | crackling, crackly |
| `dropout` | `Dropout` | Faultveil Rift | Brief missing audio. | Momentary gap, mute, skip, or broken stream. | gap, cutout, mute |
| `squeak` | `Squeak` | Faultveil Rift | Short high-friction chirp or squeal event. | Sharp squeaky chirp that appears briefly as a fault. | chirp, squeal |

## Descriptor Detail Notes

### Hiss

Player-facing meaning:
- A steady shhh-like noise sits behind the music.
- It is usually most obvious during quiet passages or fades.

Technical meaning:
- Broadband high-frequency or white/pink-ish noise floor.
- Often associated with analog noise, gain staging, or recording/playback path noise.

Best material:
- Quiet vocal intros, acoustic music, fades, pauses, sparse piano, low-level ambience.

Implementation note:
- Feasible now with the existing noise module.
- Use level control carefully; too much hiss becomes obvious but unrealistic.

### Static

Player-facing meaning:
- The sound has rough fuzzy contamination.
- It feels less smooth than hiss and more broken or radio-like.

Technical meaning:
- Broadband noise with irregular texture, possibly modulated or bursty.
- Can overlap with crackle if it becomes intermittent.

Best material:
- Radio-like examples, quiet passages, sustained pads, speech, acoustic recordings.

Implementation note:
- Feasible partly with current noise if texture is allowed.
- Stronger with future noise-color and modulation controls.

### Hum

Player-facing meaning:
- A low steady tone is added under the music.
- It sounds electrical and continuous.

Technical meaning:
- Usually 50 Hz or 60 Hz mains-related tone, often with low harmonics.
- In car evaluation, it may also represent low tonal interference from grounding or power issues.

Best material:
- Quiet passages, voice, sparse acoustic music, test tones, pauses.

Implementation note:
- Feasible now with the existing hum module.
- Offer 50 Hz and 60 Hz variants if regional/system realism matters.

### Buzz

Player-facing meaning:
- The added sound is rougher than hum.
- It has a vibrating, buzzy, electrical edge.

Technical meaning:
- Harmonic-rich low or mid-frequency interference.
- Can be electrical or vibration-like, but this MVP card should focus on added interference.

Best material:
- Quiet music, speech, sustained notes, bass passages where harmonic roughness is easy to hear.

Implementation note:
- Feasible now by adding harmonic-rich interference.
- Keep it separate from future mechanical fault words if those return later.

### Whine

Player-facing meaning:
- A thin high-pitched tone appears over or under the music.
- It can feel like a power or engine-related tone.

Technical meaning:
- Narrowband tonal interference above hum range.
- In car audio, alternator whine is a familiar example, often changing with engine speed.

Best material:
- Quiet cabin-like material, speech, sparse music, held chords.

Implementation note:
- Needs a future sine-tone interference generator with optional pitch drift or RPM-like modulation.
- Keep it separate from spectral `Bright`: `Whine` is an added tone, not tonal balance.

### Dirty

Player-facing meaning:
- The playback feels contaminated, grimy, or unclean.
- The listener can tell something is wrong, even if they cannot name the exact defect yet.

Technical meaning:
- A broad integrity descriptor for mixed low-level contamination.
- It may include faint noise, irregular interference, codec-like roughness, or minor unstable residue, but it should be implemented as one card rather than shown as a recipe.

Best material:
- Any clean reference where subtle contamination is easy to notice: vocals, piano, acoustic guitar, sparse mixes, quiet intros.

Implementation note:
- Feasible now as a curated single preset using light noise or codec/proxy degradation.
- Later, `Dirty` can use a more realistic internal blend, but the player-facing card should stay simple.

### Click

Player-facing meaning:
- A tiny sharp tick appears in the audio.
- It is brief and precise.

Technical meaning:
- Short impulse, sample discontinuity, edit click, clocking artifact, or contact tick.

Best material:
- Sparse music, speech, percussion gaps, sustained tones.

Implementation note:
- Needs a future impulse generator.
- Keep clicks low enough to be safe and not startling.

### Pop

Player-facing meaning:
- A larger sudden impulse appears.
- It feels more forceful than a click.

Technical meaning:
- Larger transient burst, contact pop, connection event, or DC-like discontinuity.

Best material:
- Speech, quiet music, pauses, bass-light passages where the pop is not masked.

Implementation note:
- Needs a future impulse/noise-burst generator.
- Avoid overly loud examples.

### Crackle

Player-facing meaning:
- Many small irregular ticks appear.
- It feels unstable, like a dirty contact or damaged playback path.

Technical meaning:
- Random impulse cluster or bursty discontinuities.
- Can resemble static if dense, but crackle is made of separate events.

Best material:
- Quiet passages, sustained vocals, piano tails, ambience, speech.

Implementation note:
- Needs a future random impulse cluster generator.
- Useful bridge word for real-world connector and transport faults.

### Dropout

Player-facing meaning:
- The sound briefly disappears or cuts out.
- The music skips, mutes, or loses continuity.

Technical meaning:
- Short mute, packet loss, buffer underrun, wireless interruption, or playback interruption.

Best material:
- Sustained tones, vocals, steady drums, continuous pads, music with clear continuity.

Implementation note:
- Needs a future gate/dropout processor.
- Very short dropouts can be confused with clicks; longer ones are easier to train.

### Squeak

Player-facing meaning:
- A sharp squeaky chirp or squeal appears.
- In the MVP it is treated as a short event fault, not a sustained mechanical problem.

Technical meaning:
- Short high-frequency chirp or sweep that behaves like a brief friction event.

Best material:
- Sparse music, pauses, bass pulses, short transitions, and quiet material where chirps are exposed.

Implementation note:
- Feasible as a short oscillator chirp in the current TypeScript/WebAudio prototype.
- If later expanded into a mechanical-fault region, recorded examples would be more convincing.

## Technical Feasibility

### Basic Descriptor Feasibility

| Descriptor | Current implementation status | Suggested current DSP approach |
|---|---|---|
| `Hiss` | feasible | Existing noise module with high-frequency or neutral noise. |
| `Static` | feasible | Rougher noise plus light irregular tick residue. |
| `Hum` | feasible | Existing hum module at 50/60 Hz. |
| `Buzz` | feasible | Hum-like interference with stronger harmonics and rougher texture. |
| `Whine` | feasible | Narrowband sine interference with optional pitch drift/modulation. |
| `Dirty` | feasible | Single curated preset using light noise or codec/proxy contamination. |
| `Click` | feasible | Short impulse generator. |
| `Pop` | feasible | Larger impulse or filtered noise-burst generator. |
| `Crackle` | feasible | Random impulse-cluster generator. |
| `Dropout` | feasible | Short mute/gate events. |
| `Squeak` | feasible | Short high-frequency chirp event. |

### Recommended Profile Strategy

Do not expose integrity combos.

Use this pattern instead:

1. Player selects one integrity descriptor.
2. UI teaches one plain listening cue.
3. Audio engine receives one integrity profile.
4. Some profiles may internally blend multiple technical cues, but the player-facing card remains one word.

Example profiles for exploration, not final calibration:

| Card | Internal idea | Expected cue |
|---|---|---|
| `Hiss` | steady broadband noise around quiet passages | high noise floor |
| `Static` | rougher noise with mild modulation | fuzzy contamination |
| `Hum` | 50/60 Hz tone plus low harmonics | low electrical tone |
| `Buzz` | hum with stronger harmonics and roughness | buzzy electrical texture |
| `Whine` | narrowband tone around upper-mid/high range | high pitched interference |
| `Dirty` | low-level noise plus subtle codec/proxy roughness | unclean playback |
| `Click` | sparse tiny impulses | small ticks |
| `Pop` | larger impulse or short burst | sudden pop |
| `Crackle` | random impulse clusters | broken contact texture |
| `Dropout` | short mute windows | missing audio |
| `Squeak` | short high-frequency chirps | friction chirp |

Calibration notes:
- Match loudness where possible so defects are not easier only because the example is louder.
- Use short examples for fatiguing or startling defects.
- Keep pop/click levels safe and controlled.
- Real car/speaker defect recordings may be useful later if mechanical cards return.

## Alias And Icon Strategy

Alias descriptors can still have icons without becoming playable basic cards.

Recommended alias/outcome icon mapping:

| Icon label | Anchor card | Role |
|---|---|---|
| `Noise` | `Hiss` or `Static` | Broad beginner-facing noise icon. |
| `Interference` | `Hum`, `Buzz`, or `Whine` | Broad electrical-problem icon. |
| `Ground Hum` | `Hum` | More specific hum variant. |
| `Alternator Whine` | `Whine` | Car-audio-specific whine variant. |
| `Tick` | `Click` | Small impulse variant. |
| `Scratch` | `Crackle` or `Static` | Rough contact/noise variant. |
| `Cutout` | `Dropout` | Player-friendly dropout variant. |
| `Contaminated` | `Dirty` | Formal dirty variant. |

## Training Design Notes

Useful A/B questions:
- Which sample has unwanted background noise?
- Which sample has a low electrical hum?
- Which sample has a rough buzzing interference?
- Which sample has a high pitched whine?
- Which sample has small clicks, pops, squeaks, or crackles?
- Which sample briefly cuts out?
- Which sample feels dirty or contaminated?

Useful source material:
- Quiet intros and fades for `Hiss`, `Static`, `Hum`, `Buzz`, `Whine`, and `Dirty`.
- Speech and sparse vocals for `Click`, `Pop`, `Crackle`, `Dropout`, and `Squeak`.
- Sustained tones and piano tails for intermittent defects.

Testing cautions:
- Do not overuse loud clicks or pops.
- Short rounds are better for unpleasant defects.
- Some integrity defects are easiest to hear in silence, but training should also use musical masking contexts.
- `Dirty` should be useful, but it should not replace specific diagnosis when a clearer word applies.
- Mechanical faults are postponed; if they return, use source behavior to separate them from electrical `Buzz`.

## Future DSP

Future DSP that would make the integrity vocabulary stronger:
- Noise color control for hiss/static variants.
- Interference oscillator with frequency, harmonic mix, drift, and modulation controls.
- Click/pop impulse generator with safe level limits.
- Crackle generator using random impulse clusters.
- Dropout/gate processor with duration and probability controls.
- Squeak/chirp model with clearer trigger timing.
- Postponed resonant rattle model or rub-buzz sample library if mechanical diagnostics become a larger feature.
- Loudness/output trim for fair A/B comparisons.

## External Vocabulary Alignment

Formal and industry audio QC language commonly separates integrity defects from tone, dynamics, and image. Useful alignment points:

- ITU-R BS.1284 groups impairments such as extra sounds, tonal components, nonlinear distortion, temporal distortion, missing sound, modulation effects, and stereophonic image issues.
- MovieLabs audio QC vocabulary includes practical defect names such as hum/buzz, crackle, pop/click/tick, dropouts, distortion, and phase issues.
- Automotive audio defect work often discusses buzz, squeak, and rattle as physical faults caused by speakers, trim, panels, wires, mounts, or cabin vibration.

References:
- https://www.itu.int/rec/R-REC-BS.1284/en
- https://movielabs.com/ngvideo/MDD/audioqc/
- https://www.listeninc.com/applications/automotive-audio/buzz-squeak-rattle-bsr/

## Confusion Rules

Keep this section at the end so descriptor design can be read first, then checked against likely vocabulary collisions.

| Listener word | First check | Then check |
|---|---|---|
| dirty | Integrity `Dirty` | Dynamic `Distorted` only if roughness clearly follows overload at peaks |
| noisy | Integrity `Hiss` / `Static` | Spectral `Bright` or `Harsh` only if no extra noise is added |
| hum | Integrity `Hum` | `Buzz` if harmonics make it rougher |
| buzz | Integrity `Buzz` | Future mechanical cards only if the defect is clearly tied to hardware motion |
| whine | Integrity `Whine` | Spectral `Bright` only if it is broad tonal balance, not an added tone |
| crackly | Integrity `Crackle` | `Static` if the texture is continuous rather than separate ticks |
| popping | Integrity `Pop` | `Click` if the event is small and sharp |
| cutting out | Integrity `Dropout` | Spatial/dynamic changes only if the sound stays continuous |
| squeaking | Integrity `Squeak` | `Whine` if it is continuous rather than a brief chirp |
| rattling | Postponed mechanical card | `Buzz` if it is electrical and continuous |
| distorted | Dynamic `Distorted` / `Overdriven` | Integrity `Buzz` or `Crackle` if it is an added defect |
| clipped | Dynamic `Clipped` | Integrity only if the listener is actually hearing clicks, pops, or dropouts |
