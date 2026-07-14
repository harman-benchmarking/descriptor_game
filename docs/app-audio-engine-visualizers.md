# Audio Engine And Visualizers

This document owns playback controls, audio processing, and module-specific visual feedback.

## Purpose

The audio engine makes descriptor cards audible. Visualizers teach what kind of change is active without replacing listening as the truth source.

## Playback Model

The app uses a Web Audio engine with:

- selectable bundled tracks
- start/resume audio gesture
- play/pause
- flat vs processed mode
- Sound Lab intensity slider
- active descriptor filters/profiles

Current tracks:

| Track id | Label | Source | Training suitability |
|---|---|---|---|
| `daily-drum-bass-groove-loop` | Daily drum and bass groove | `/audio/demo/daily-drum-bass-groove-loop.wav` | primary for Bass Gate |
| `daily-spoken-center-loop` | Daily spoken voice | `/audio/demo/daily-spoken-center-loop.wav` | primary for Mid, Position, Contamination, Glitch; fallback for Image |
| `daily-acoustic-pop-loop` | Daily acoustic pop | `/audio/demo/daily-acoustic-pop-loop.wav` | primary for Treble; fallback for Bass and Mid |
| `daily-piano-guitar-loop` | Daily piano and guitar | `/audio/demo/daily-piano-guitar-loop.wav` | primary for Image; fallback for Treble |
| `jpop-reference-loop` | J-pop reference loop | `/audio/demo/jpop-reference-loop.wav` | no Training Grounds gate suitability |
| `region-a-loop` | Thunderstep demo loop | `/audio/demo/region-a-loop.wav` | no Training Grounds gate suitability |
| `no-sanctuary-here` | No Sanctuary Here | `/audio/demo/02. No Sanctuary Here.wav` | no Training Grounds gate suitability |
| `shadow` | Shadow | `/audio/demo/04. Shadow.wav` | no Training Grounds gate suitability |
| `fragments-of-time` | Fragments of Time | `/audio/demo/06. Fragments of Time.wav` | no Training Grounds gate suitability |

## Spectral Audio

Spectral basics use EQ filter profiles. Effective filters are built from active basic ids and the current effective intensity. Discovery cards expand into their ingredient basics.

The visible intensity slider is Sound Lab-only. Sound Lab uses the saved slider value from `settings.intensity`; Training Grounds, Calibration Tower, and Atlas use the fixed default intensity so practice and score-bearing modes do not drift when the Lab slider changes.

Spectral stack protection is bucket-specific, not global card-count based. A bucket is the descriptor group plus EQ direction: `bass boost`, `bass cut`, `mid boost`, `mid cut`, `treble boost`, or `treble cut`. One card can use the default maximum `200%`. Bass and treble boosts share the stricter stack table because low-end energy and stacked top-end edge both consume headroom quickly: `1 -> 200%`, `2 -> 175%`, `3 -> 150%`, `4 -> 125%`, and `5+ -> 100%`. Mid boosts and the current fallback table use `1 -> 200%`, `2 -> 180%`, `3 -> 160%`, `4 -> 140%`, and `5+ -> 120%`. Cross-bucket combinations, such as a bass boost plus a treble boost, can still keep both filters at `200%`.

The EQ curve visualizer is spectral teaching feedback, not a universal app visual.

Current spectral basics and EQ centers:

| Group | Descriptor ids |
|---|---|
| Bass | `Rumble` 35 Hz, `Thump` 55 Hz, `Boomy` 70 Hz, `Punchy` 95 Hz, `Thin` 100 Hz cut, `Muddy` 125 Hz |
| Mid | `Warm` 250 Hz, `Boxy` 350 Hz, `Hollow` 600 Hz cut, `Honky` 900 Hz, `Nasal` 1800 Hz, `Shouty` 2600 Hz |
| Treble | `Harsh` 4000 Hz, `Glassy` 6300 Hz, `Dull` 6500 Hz cut, `Sibilant` 8000 Hz, `Bright` 10000 Hz, `Airy` 14000 Hz |

## Non-Spectral Audio

Spatial, Dynamic, and Integrity descriptors use module-specific profile logic and visualizers:

- Spatial Stage for pan, width, depth, focus, and room impression.
- Dynamic Lab for attack/release, compression, pumping, flatness, clipping, and distortion.
- Artifact Timeline for hiss, static, dirty noise, hum, buzz, whine tones, clicks, pops, crackle, dropouts, and squeaks.

Current non-spectral profiles:

| Module | Descriptor ids |
|---|---|
| Spatial | `Left`, `Right`, `Centered`, `Near`, `Far`, `Focused`, `Blurred`, `Wide`, `Narrow`, `Dry`, `Reverberant` |
| Dynamic | `Snappy`, `Softened`, `Tight`, `Loose`, `Compressed`, `Pumping`, `Flat` (`flat-dynamics`, audio profile id `flat`), `Clipped`, `Distorted` |
| Integrity | `Hiss`, `Static`, `Hum`, `Buzz`, `Whine`, `Dirty`, `Click`, `Pop`, `Crackle`, `Dropout`, `Squeak` |

## Final Output Safety

Flat and processed playback converge before the final output protection chain:

`dry/processed mix -> master trim -> safety limiter -> emergency ceiling -> destination`

The safety limiter uses a `-2 dB` threshold, hard knee, `20:1` ratio, `1 ms` attack, and `80 ms` release. The emergency WaveShaper is identity below `-1 dBFS`, clamps excursions beyond that sample ceiling, and uses `4x` oversampling. This post-master placement protects every playback mode without reducing descriptor parameters or the supported `200%` training intensity.

Deterministic tests cover the node order, limiter configuration, steady-state transfer estimate, finite ceiling curve, and sample bound. A browser-rendered matrix covering approved maximum stacks, reconstructed true peak, transient engagement, NaN, and DC remains a release-verification requirement because the unit-test runtime does not expose `OfflineAudioContext`.

## Visualizer Priority Rules

Sound Lab can intentionally stack conflicting basics, so the visualizer state has deterministic priority rules:

- Spatial: `Left` wins over `Right`; `Near` wins over `Far`; `Dry` wins over `Reverberant`; `Focused` wins over `Blurred`; width priority is `Wide`, then `Narrow`, then `Separated`, then `Crowded`, then neutral.
- Dynamic: `Softened` wins over `Snappy`; `Loose` wins over `Tight`; `Compressed`, `Pumping`, and `Flat` can coexist; `Clipped + Distorted` renders as `Overdriven`.
- Integrity: noise priority is `Dirty`, then `Static`, then `Hiss`; tone priority is `Whine`, then `Buzz`, then `Hum`; event descriptors can stack in the order `Click`, `Pop`, `Crackle`, `Dropout`, `Squeak`.

## Blind Trial Fairness

During hidden listening trials, the app should avoid showing the answer through visual feedback before submission. Visualizers can return after the answer is revealed.

## Details Included

The audio function docs cover implementation-facing details rather than card modal copy:

- track ids, labels, source files, and Training Grounds suitability;
- current descriptor ids that have spectral filters or non-spectral audio profiles;
- the `flat-dynamics` descriptor id versus the `flat` audio profile id;
- visualizer family by module;
- priority rules used when multiple active descriptors affect the same visual state;
- fairness constraints for hidden listening trials.

## Implementation References

- Engine: `web/app/src/audio/engine/WebAudioEngine.ts`
- Final output safety: `web/app/src/audio/engine/AudioSafety.ts`
- EQ filters: `web/app/src/audio/dsp/eqFilters.ts`
- Curve response: `web/app/src/audio/dsp/curveResponse.ts`
- Tracks: `web/app/src/data/tracks.ts`
- Playback controls: `web/app/src/ui/components/PlaybackControls.tsx`
- Visualizers: `web/app/src/ui/components/visualizers/`
