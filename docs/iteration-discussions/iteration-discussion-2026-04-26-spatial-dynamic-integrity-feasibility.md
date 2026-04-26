# Spatial, Dynamic, Integrity Technical Feasibility Review

This document records the feasibility checkpoint before creating card or region images for the non-Spectral modules.

Three sub-agents reviewed the current codebase and design docs:

- `Spatial` feasibility
- `Dynamic` feasibility
- `Integrity` feasibility

The review focused on whether these descriptors can be implemented in the current TypeScript/Web Audio browser app, and whether any module is ready for final visual asset work.

## Executive Verdict

All three modules are technically possible in TypeScript/Web Audio, but none of them should be treated as a data-only extension of the current app.

The current engine is still Spectral/EQ-focused:

- `WebAudioEngine` currently builds a dry/wet EQ graph with `BiquadFilterNode`.
- `compressorProfiles.ts` is still an empty placeholder.
- `offlineRender.ts` is not started.
- `app/src/audio/worklets/README.md` reserves AudioWorklets for post-MVP.

Therefore:

- Do not create final images for Spatial, Dynamic, or Integrity yet.
- First create audio-only prototypes.
- Run blind listening tests.
- Only create final art for descriptors that listeners can reliably identify.

## Overall Feasibility Matrix

| Module | Browser TypeScript feasible? | Current engine supports it? | Art-ready now? | Best prototype priority |
|---|---:|---:|---:|---|
| `Spatial` | Yes | No | No | Medium |
| `Dynamic` | Yes | No | No | Low-medium |
| `Integrity` | Yes | No | No | High |

Recommendation:

1. Keep Spectral as the polished first module.
2. Build a generic audio-profile layer beyond EQ.
3. Prototype Integrity first.
4. Prototype a narrow Spatial gate second.
5. Prototype Dynamic after loudness matching/offline checks are stronger.

## Shared Technical Requirement

The app needs a broader audio profile system.

Current Spectral cards can continue using EQ filter specs.

Future modules should not be forced through `EqFilterSpec`.

Recommended direction:

```ts
type AudioProfile =
  | { kind: "spectralEq"; filters: EqFilterSpec[] }
  | { kind: "spatial"; profileId: string }
  | { kind: "dynamic"; profileId: string }
  | { kind: "integrity"; profileId: string };
```

Then the audio engine can route active cards into different processing layers:

```text
Media source
  -> dry path
  -> processed path
       -> spectral EQ layer
       -> spatial layer
       -> dynamic layer
       -> integrity defect layer
  -> master safety/output
```

For MVP, only one non-Spectral layer needs to be active at a time.

## Spatial Feasibility

### Bottom Line

Spatial is feasible, but playback conditions and source material matter heavily.

A narrow Spatial MVP can work. The full Spatial catalog is not ready for final art.

### Feasible With Built-In Web Audio Nodes

| Descriptor / recipe | Feasibility |
|---|---|
| `Left` | Strong; use `StereoPannerNode` or channel gain. |
| `Right` | Strong; use `StereoPannerNode` or channel gain. |
| `Centered` | Strong; pan center or matched left/right. |
| `Focused` | Feasible as stable, dry, centered/positioned source. |
| `Narrow` | Strong; mono blend or side reduction. |
| `Near` | Feasible; direct gain up, minimal reflections. |
| `Dry` | Feasible if source material is dry. |
| `Precise` | Feasible as `Centered + Focused`. |
| `Intimate` | Feasible as `Near + Dry`. |

### Feasible With Assets Or More DSP

| Descriptor / recipe | Requirement |
|---|---|
| `Wide` | Mid/side width or decorrelation, plus real stereo material. |
| `Blurred` | Short delays, reflections, decorrelation, maybe allpass/worklet later. |
| `Separated` | Curated stereo tracks or stems. Hard from finished mixes. |
| `Crowded` | Dense source material, narrowing, blur, or multi-source scenes. |
| `Far` | Direct level down, high-frequency rolloff, reflections. Needs calibration. |
| `Reverberant` | `ConvolverNode` and curated impulse responses. |
| `Diffuse` | Width plus blur/decorrelation. |
| `Panoramic` | Width plus source separation, ideally stems. |
| `Boxed In` | Narrow plus crowded material. |
| `Set Back` | Far plus reverb. |
| `Spacious` | Wide plus reverb. |

### Risky

| Descriptor / recipe | Risk |
|---|---|
| `Holographic` | Too subjective for MVP; likely needs excellent scenes or binaural/HRTF-style work. |
| `Separated` | Cannot reliably separate instruments from arbitrary finished tracks. |
| `Wide` | Fake widening on mono can teach the wrong cue. |
| `Near` / `Far` | Can collapse into inside-the-head headphone perception. |
| `Reverberant` / `Far` | Can be confused with darker EQ or Spectral `Distant`. |

### Spatial MVP Recommendation

Prototype one small gate first:

- `Left`
- `Right`
- `Centered`
- `Near`
- `Far`
- `Dry`
- `Reverberant`
- recipes: `Precise`, `Intimate`, `Set Back`

Defer:

- `Wide`
- `Blurred`
- `Separated`
- `Crowded`
- `Diffuse`
- `Panoramic`
- `Spacious`
- `Holographic`

### Tests Before Art

- Build a `SpatialGraph` spike: pan, mono blend, mid/side width, depth gain, lowpass, early reflection delay, convolver send.
- Add a headphone/stereo self-check.
- Run blind A/B/C tests with 3 to 5 listeners.
- Test on headphones, laptop speakers, phone speakers, Chrome/Edge, Safari/iOS, Android Chrome.
- Check L/R balance, correlation, peak safety, loudness, and mono-collapse behavior.

## Dynamic Feasibility

### Bottom Line

Dynamic is feasible, but it is the most psychoacoustically risky module because loudness can fake the answer.

Dynamic should not get final art until loudness-matched prototypes pass blind tests.

### Feasible With Built-In Web Audio Nodes

| Descriptor / recipe | Feasibility |
|---|---|
| `Compressed` | Feasible with `DynamicsCompressorNode`. |
| `Squashed` | Feasible with stronger compression/limiting approximation. |
| `Dense` | Feasible as compression plus makeup/output trim, but risky. |
| `Pumping` | Feasible with compressor settings or gain automation. |
| `Breathing` | Feasible with slower gain/compressor movement. |
| `Flat` | Feasible as reduced dynamic contrast. |
| `Constrained` | Feasible as limited dynamic movement. |
| `Softened` | Feasible as attack/edge reduction approximation. |
| `Blunted` | Feasible with compression/transient reduction approximation. |
| `Loose` | Feasible as slower release/smeared recovery approximation. |
| `Clipped` | Feasible with `WaveShaperNode`, strict safety required. |
| `Distorted` | Feasible with `WaveShaperNode`, strict safety required. |
| `Surging` | Feasible as compression plus pumping. |
| `Pinned` | Feasible as compressed plus flat. |
| `Crushed` | Feasible as squashed plus blunted plus flat. |
| `Breathless` | Feasible as dense plus squashed plus constrained. |

### Feasible With Assets Or Worklets

| Descriptor / recipe | Requirement |
|---|---|
| `Snappy` | Better as clean reference or needs transient shaping. |
| `Tight` | Better as clean reference or needs transient/release shaping. |
| `Responsive` | Needs direct transient/recovery shaping or curated assets. |
| `Alive` | Better as a positive reference/reward descriptor. |
| `Limited` | Needs limiter/headroom model. |
| `Overdriven` | Needs safe waveshaper prototype or curated processed clips. |
| `Strained` | Source-dependent; may need curated examples. |

### Risky

| Descriptor | Risk |
|---|---|
| `Dense` | Louder can sound denser. |
| `Squashed` | Louder or brighter can fake intensity. |
| `Snappy` | Brightness can fake attack. |
| `Loose` | Bass resonance can fake slow recovery. |
| `Flat` | Source-dependent. |
| `Lively` | Source-dependent and often a reference-state quality. |
| `Clipped` / `Distorted` | Can be confused with `Harsh`, `Buzz`, `Crackle`, or speaker faults. |

### Dynamic MVP Recommendation

Do not create Dynamic art yet.

First build an audio-only compressor/waveshaper prototype around:

- `Compressed`
- `Squashed`
- `Pumping`
- `Breathing`
- `Flat`
- recipes: `Surging`, `Pinned`, `Crushed`

Keep these as later/reference descriptors:

- `Snappy`
- `Tight`
- `Lively`
- `Responsive`
- `Alive`

Only add `Clipped`, `Distorted`, and `Overdriven` after a safe `WaveShaperNode` prototype passes blind tests.

### Tests Before Art

- Build a dynamic graph spike: compressor, gain automation, output trim, optional waveshaper.
- Add offline loudness and peak checks with `OfflineAudioContext`.
- Test on drums, kick/bass, vocal/acoustic, verse/chorus, and peak-heavy clips.
- Run blind tests against confusers:
  - `Bright` vs `Snappy`
  - `Boomy` vs `Loose`
  - `Harsh` vs `Clipped`
  - `Buzz`/`Crackle` vs `Distorted`
- Require level-matched prototypes before approving art.

## Integrity Feasibility

### Bottom Line

Integrity is the strongest first non-Spectral prototype.

Browser TypeScript and Web Audio are enough for a useful MVP slice. The current engine still needs a new defect layer.

### Feasible With Built-In Web Audio Nodes

| Descriptor | Approach | Confidence |
|---|---|---|
| `Hiss` | Noise buffer, high-pass/filter, low gain | High |
| `Hum` | `OscillatorNode` at 50/60 Hz, optional harmonics | High |
| `Buzz` | Hum plus harmonics or `PeriodicWave` | Medium-high |
| `Whine` | Narrow tonal oscillator with slight drift | Medium |
| `Static` | Noise buffer plus rough modulation/gating | Medium |
| `Dirty` | Controlled blend of low-level noise, buzz, crackle, roughness | Medium |
| `Click` | Short shaped impulse buffer | Medium-high |
| `Pop` | Larger filtered impulse/noise burst with decay | Medium |
| `Crackle` | Random cluster of short clicks or precomputed buffer | Medium-high |
| `Dropout` | Gain automation with short ramps | High |

### Feasible With Assets Or More DSP

| Descriptor | Requirement |
|---|---|
| `Rattle` | Curated samples first; synthetic later. |
| `Squeak` | Curated samples or careful chirp synthesis. |
| `Rub Buzz` | Speaker-defect samples or nonlinear model. |
| Better `Static` | Precomputed texture or modulation worklet. |
| Better `Dirty` | Curated degraded examples or offline-rendered presets. |

### Risky

| Descriptor | Risk |
|---|---|
| `Rattle` | Synthetic versions may not sound like real cabin/speaker vibration. |
| `Squeak` | Synthetic chirps can sound cartoonish. |
| `Rub Buzz` | Can be confused with ordinary `Buzz`; needs strong validation. |
| `Dirty` | Can become a vague catch-all. |
| `Click`, `Pop`, `Crackle`, `Whine` | Safety and annoyance concerns if too loud or repeated. |

### Integrity MVP Recommendation

Prototype Integrity before Spatial and Dynamic.

Conservative first set:

- `Hiss`
- `Hum`
- `Buzz`
- `Click`
- `Crackle`
- `Dropout`

Second pass:

- `Static`
- `Whine`
- `Pop`
- `Dirty`

Hold as prototype-only until sample validation:

- `Rattle`
- `Squeak`
- `Rub Buzz`

### Tests Before Art

- Build an `IntegrityProfile` defect layer.
- Add peak/DC/finite-sample safety checks.
- Keep defect intensity short and gain-limited.
- Run blind tests:
  - `Hum` / `Buzz` / `Whine`
  - `Hiss` / `Static` / `Crackle`
  - `Click` / `Pop`
- Compare synthetic mechanical faults against real or curated samples.
- Do a fatigue check with repeated playback.

## Python Decision

No Python runtime is needed.

TypeScript/Web Audio is sufficient for the browser game runtime across all three modules.

Python can remain optional under `tools/python/` for offline preparation only:

- sample cleanup,
- impulse-response preparation,
- loudness batch checks,
- fixture generation,
- spectrogram/export review.

Any Python-generated output should become static assets or JSON consumed by the TypeScript app.

## Critical Go / No-Go Before Images

Do not make final images for the full Spatial, Dynamic, or Integrity modules yet.

Green-light only these narrow audio prototypes:

| Module | Green-lit prototype |
|---|---|
| `Integrity` | Hiss, Hum, Buzz, Click, Crackle, Dropout |
| `Spatial` | Left, Right, Centered, Near, Far, Dry, Reverberant |
| `Dynamic` | Compressed, Squashed, Pumping, Breathing, Flat |

Do not create final art yet for:

- `Holographic`
- `Separated`
- `Panoramic`
- `Alive`
- `Responsive`
- `Limited`
- `Overdriven`
- `Rattle`
- `Squeak`
- `Rub Buzz`

These need stronger audio validation first.

## Recommended Next Step

Build a non-visual technical prototype phase before any image generation:

1. Add a generic `AudioProfile` abstraction.
2. Add an audio-only prototype screen or developer sandbox.
3. Implement the Integrity defect layer first.
4. Add blind A/B/C tests for the first Integrity set.
5. If listeners can identify those descriptors, then create images for only those confirmed descriptors.
6. Repeat this validation pipeline for Spatial and Dynamic.

This protects the project from making beautiful cards for sounds that the app cannot yet teach reliably.
