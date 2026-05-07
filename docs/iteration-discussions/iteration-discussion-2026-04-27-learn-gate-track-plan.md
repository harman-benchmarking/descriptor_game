# Learn Gate Daily Track Plan Discussion

This note captures a brainstorm for replacing the current `J-pop reference loop` and `Thunderstep demo loop` as Learn/testing material.

The goal is not to make the training tracks exciting. The goal is to make them normal, repeatable, and close to the kind of audio people hear every day: speech, light music, simple rhythm, room, and ordinary stereo playback.

## Current Problem

The current two-track setup creates the wrong learning bias.

| Current track | Problem in Learn |
|---|---|
| `jpop-reference-loop.wav` | Too genre-specific, often dense, bright, highly produced, and already mastered. It can hide mid, dynamic, and artifact cues. |
| `region-a-loop.wav` / Thunderstep-style loop | Too game-region-coded. It is useful for Region A fantasy and impact, but it over-teaches bass force, spark, and energy. |

These tracks can still be useful as region flavor or stress-test material, but they should not be the default Learn tracks.

## Direction

Use a small shared set of ordinary reference loops instead of one heroic demo track.

Principles:
- Learn tracks should sound like daily listening samples, not game soundtrack pieces.
- Each gate should have one primary track and one fallback track.
- Tracks should be clean enough that the app's DSP creates the audible descriptor, not the source file.
- Keep loops short, roughly `12` to `18` seconds.
- Level-match sources before using them in blind A/B/C tests.
- Avoid extreme mastering, heavy sidechain pumping, aggressive brightness, intentional distortion, and stylized sub-bass.
- Prefer dry or moderately dry sources for training; use roomy material only when the gate is explicitly about space.

## Proposed Daily Reference Track Set

This set is intentionally small. It gives the game enough source variety without making the curriculum hard to reason about.

| Track id | Working label | Source brief | Best for |
|---|---|---|---|
| `daily-spoken-center-loop` | Spoken voice, centered | Natural podcast/tutorial voice, full bandwidth, centered, dry-to-light room, no music. Include consonants, vowels, and short pauses. | Mid, treble sibilance, spatial position/depth, integrity defects |
| `daily-acoustic-pop-loop` | Everyday acoustic pop | Light vocal, acoustic guitar or keys, bass, simple drums, modest cymbal/hat. Mainstream and plain, not J-pop-coded or club-coded. | Spectral gates, pressure/compression, sandbox default |
| `daily-drum-bass-groove-loop` | Simple rhythm groove | Kick, snare, hi-hat, and electric bass at moderate tempo. Acoustic/electric band feel, not EDM or thunderstep. | Bass, snapback, punch, compression motion |
| `daily-piano-guitar-loop` | Piano and guitar detail | Piano chords or picked guitar with clear transients and natural decay. No heavy effects. | Treble, snapback, softened attack, harsh/dull comparisons |
| `daily-stereo-room-loop` | Small stereo room | Small acoustic ensemble, cafe-like performance, or simple stereo music bed with clear left/right width and natural room. | Spatial width, far/near, dry/reverberant |
| `daily-quiet-voice-roomtone-loop` | Quiet voice and room tone | Clean voice with short quiet gaps and low background floor. The clean source should be nearly artifact-free. | Hiss, hum, buzz, click, crackle, dropout |

Suggested file paths:

```text
/audio/demo/learn/daily-spoken-center-loop.wav
/audio/demo/learn/daily-acoustic-pop-loop.wav
/audio/demo/learn/daily-drum-bass-groove-loop.wav
/audio/demo/learn/daily-piano-guitar-loop.wav
/audio/demo/learn/daily-stereo-room-loop.wav
/audio/demo/learn/daily-quiet-voice-roomtone-loop.wav
```

## Gate-To-Track Plan

### Spectral Learn Gates

| Gate | Primary track | Fallback track | Why |
|---|---|---|---|
| `Bass Gate` | `daily-drum-bass-groove-loop` | `daily-acoustic-pop-loop` | Bass words need real low-end events, but the sound should stay like normal music: kick, bass guitar, and body rather than a cinematic sub-bass demo. |
| `Mid Gate` | `daily-spoken-center-loop` | `daily-acoustic-pop-loop` | Voice is the most normal and revealing source for `Warm`, `Hollow`, `Boxy`, `Honky`, `Nasal`, and `Shouty`. |
| `Treble Gate` | `daily-acoustic-pop-loop` | `daily-piano-guitar-loop` | Treble words need consonants, cymbal/hat detail, guitar/piano attack, and air without making the whole source bright by default. |

Spectral note:
- The old J-pop loop can be a later "busy music check", but the first Learn pass should use plainer audio.
- Region A can keep a high-energy track for crafting, but Learn should not inherit the Thunderstep personality.

### Spatial Learn Gate

Current code has one `Spatial Prototype Gate`:

| Gate | Primary track | Fallback track | Why |
|---|---|---|---|
| `Spatial Prototype Gate` | `daily-spoken-center-loop` | `daily-stereo-room-loop` | Position and centeredness are clearest on a simple voice. Width and room are clearer on a small stereo scene. |

If Spatial later splits into three gates:

| Future gate | Primary track | Fallback track | Why |
|---|---|---|---|
| `Position And Image Gate` | `daily-spoken-center-loop` | `daily-piano-guitar-loop` | A centered mono-ish source makes `Left`, `Right`, and `Centered` obvious without arrangement confusion. |
| `Width And Separation Gate` | `daily-stereo-room-loop` | `daily-acoustic-pop-loop` | Width and separation need multiple sources or a real stereo image. |
| `Depth And Space Gate` | `daily-spoken-center-loop` | `daily-stereo-room-loop` | Dry voice is best for `Near` and `Far`; the room loop helps demonstrate `Reverberant` without faking a huge hall. |

Spatial note:
- Headphones should remain recommended.
- Avoid using a full, dense, already-wide mix for early left/right/center tests.

### Dynamic Learn Gates

| Gate | Primary track | Fallback track | Why |
|---|---|---|---|
| `Snapback Gate` | `daily-drum-bass-groove-loop` | `daily-piano-guitar-loop` | `Snappy`, `Softened`, `Tight`, and `Loose` need audible transients and recovery. A normal rhythm groove is better than aggressive electronic impact. |
| `Pressureflow Gate` | `daily-acoustic-pop-loop` | `daily-drum-bass-groove-loop` | `Compressed`, `Pumping`, `Flat`, `Clipped`, and `Distorted` need level movement, peaks, and a mix that can audibly lose breathing room. |

Dynamic note:
- Loudness matching matters more here than track taste.
- Avoid tracks that already sound heavily compressed, clipped, or intentionally distorted.
- For `Pumping`, the source needs steady beat energy, but not obvious EDM sidechain behavior before processing.

### Integrity Learn Gate

Current code has one `Integrity Prototype Gate`:

| Gate | Primary track | Fallback track | Why |
|---|---|---|---|
| `Integrity Prototype Gate` | `daily-quiet-voice-roomtone-loop` | `daily-spoken-center-loop` | Artifacts are easiest to learn when the clean baseline has quiet gaps and a familiar voice. Music can be added later to teach harder detection. |

If Integrity later splits into three gates:

| Future gate | Primary track | Fallback track | Why |
|---|---|---|---|
| `Noise And Interference Gate` | `daily-quiet-voice-roomtone-loop` | `daily-spoken-center-loop` | Hiss, hum, buzz, and whine need a quiet baseline so learners can hear continuous contamination. |
| `Intermittent Defects Gate` | `daily-spoken-center-loop` | `daily-acoustic-pop-loop` | Click, pop, crackle, and dropout are clear on speech first, then more realistic over music. |
| `Mechanical Faults Gate` | `daily-drum-bass-groove-loop` | `daily-acoustic-pop-loop` | Rattle and rub-buzz are often excited by bass hits or louder music, but the carrier should still sound like a normal speaker test. |

Integrity note:
- Keep artifact examples short and gain-limited.
- Do not make the reference carrier annoying before the defect is added.

## Recommended MVP Track Priority

Build or source these in phases.

| Priority | Track | Reason |
|---|---|---|
| `P0` | `daily-spoken-center-loop` | Covers Mid, Spatial position, Treble sibilance, and Integrity basics. Highest leverage. |
| `P0` | `daily-acoustic-pop-loop` | Replaces the J-pop reference with a more neutral everyday music default. |
| `P0` | `daily-drum-bass-groove-loop` | Replaces Thunderstep for Bass and Dynamic without losing low-end and transient cues. |
| `P1` | `daily-quiet-voice-roomtone-loop` | Makes Integrity training much cleaner and less frustrating. |
| `P1` | `daily-stereo-room-loop` | Makes Spatial training feel like real listening rather than only panning a voice. |
| `P2` | `daily-piano-guitar-loop` | Useful second source for treble and transient detail after the core tracks work. |

Minimum viable replacement:

```text
daily-spoken-center-loop
daily-acoustic-pop-loop
daily-drum-bass-groove-loop
```

With those three tracks, every current Learn gate has at least one normal source.

## Track Creation Briefs

Use these as prompts for composition, recording, or asset search.

### `daily-spoken-center-loop`

- `12` to `14` seconds.
- One natural speaking voice, centered.
- Full-bandwidth, clean, podcast-like recording.
- Light room is okay; heavy reverb is not.
- Include "s", "t", "k", "m", "n", and open vowels for treble and nasal tests.
- Include one or two short pauses so noise and defects can be heard.

### `daily-acoustic-pop-loop`

- `16` seconds.
- Moderate tempo, roughly `85` to `105` BPM.
- Vocal or hummed lead, acoustic guitar or keys, bass, light drums.
- Plain mainstream arrangement.
- No aggressive synths, hype mastering, obvious sidechain, or genre signature.
- Should survive looping without a dramatic fill or drop.

### `daily-drum-bass-groove-loop`

- `12` to `16` seconds.
- Kick, snare, hi-hat, and bass guitar or simple clean bass synth.
- Enough low end for `Rumble`, `Thump`, `Boomy`, `Punchy`, and `Muddy`.
- Should feel like a normal band or practice groove, not a club test track.
- Preserve natural attack so `Snappy` and `Softened` are meaningful.

### `daily-piano-guitar-loop`

- `12` to `16` seconds.
- Picked guitar, piano, or both.
- Clear but not piercing attacks.
- Natural decay.
- Useful for `Bright`, `Dull`, `Harsh`, `Airy`, `Softened`, and `Snappy`.

### `daily-stereo-room-loop`

- `16` to `18` seconds.
- Small ensemble or stereo acoustic scene.
- Clear left/right placement and moderate natural room.
- Not too dense.
- Useful for `Wide`, `Narrow`, `Far`, `Dry`, `Reverberant`, and future separation words.

### `daily-quiet-voice-roomtone-loop`

- `12` to `14` seconds.
- Quiet spoken phrase with clean gaps.
- Minimal noise floor.
- No background music.
- Useful for adding controlled `Hiss`, `Hum`, `Buzz`, `Click`, `Crackle`, and `Dropout`.

## Data Model Suggestion

Tracks should carry module/gate suitability metadata instead of being a flat selector list.

Possible shape:

```ts
type TrackDefinition = {
  id: string;
  labelKey: string;
  src: string;
  role: "learn-primary" | "learn-fallback" | "region" | "sandbox";
  suitableGateIds: GateId[];
  caution?: "headphones" | "level-match-required" | "artifact-fatigue";
};
```

This lets the Learn screen default to the right source without removing the user's ability to switch tracks in Sandbox.

## Product Decision

Recommended decision:

- Retire `jpop-reference-loop` from default Learn use.
- Retire `region-a-loop` / Thunderstep from default Learn use.
- Keep Thunderstep-style audio only for Region A flavor or later stress testing.
- Use the three `P0` daily tracks as the new Learn baseline.
- Add the `P1` tracks before treating Spatial and Integrity as serious tests.

This should make Learn feel less like "guess the game soundtrack effect" and more like practical listening training for ordinary audio.
