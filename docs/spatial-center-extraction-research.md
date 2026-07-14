# Spatial Center Extraction Research

Last updated: 2026-06-01

Implementation status: Option 2 is implemented as a live mid/side center-weighted lane in `web/app/src/audio/engine/WebAudioEngine.ts`, with shared width math in `web/app/src/audio/dsp/spatialCenterLane.ts`.

Current tuning notes:

- `Near` is intentionally exaggerated: the center lane is lifted by `1.22x`, with almost no reflection.
- `Far` is mainly a center-lane level reduction to `0.58x`; reflection is only a small hint (`0.045`) rather than a strong room effect.
- `Wide` expands the side lane to `1.85x`, and the side-width clamp now allows up to `2.0x`.
- `Left` / `Right` pan the center lane by `-0.74` / `+0.74`, not the whole stereo stage.

## Context

Jan-Niclas suggested improving the Spatial descriptor examples by extracting the phantom-center image from stereo material instead of only fading or skewing the whole stereo file. In the current app, spatial processing is live Web Audio processing. The engine already supports pan, width matrixing, direct gain, lowpass distance cues, and a simple reflection delay. It does not yet have custom `AudioWorklet` DSP beyond native Web Audio nodes.

The key idea is to stop treating the whole stereo track as one object. If a vocal, snare, bass, or lead sound is mostly centered, we can estimate a center stream, process that stream for `Near`, `Far`, `Left`, `Right`, `Focused`, or `Blurred`, then recombine it with the remaining stereo sides. This would create stronger educational examples:

- `Near` / `Far`: move the lead image without making the entire backing track quieter, darker, or more reverberant.
- `Left` / `Right`: bias the vocal or lead image left/right, not only the whole stage.
- `Focused` / `Blurred`: sharpen or smear the center image while preserving side material.
- `Wide` / `Spacious`: expand off-center content while leaving the center anchored.

## Conversation Digest

Main proposal:

- Bertom Audio's Phantom Center was suggested as a reference because it extracts the phantom center from a stereo signal and can expose separated LCR channels.
- Jan-Niclas warned that the theory is simple but production-quality extraction is hard.
- The simplest version is mid/side: `M = (L + R) / 2`.
- Mid/side has bleed. Hard-panned or off-center signals still appear in the mid channel, so it is not clean center extraction.
- Cleaner center extraction is a core feature in surround upmixers, including commercial/internal systems.
- For this game, imperfect extraction may still be enough if the goal is to move or shade the center image a little, not to make a solo-quality vocal stem.

## What The Sources Say

### Bertom Phantom Center

[Bertom Phantom Center](https://bertomaudio.com/phantom-center.html) describes the plugin as an upmixing stereo imager that extracts the phantom center from a stereo signal and explicitly says it is not ordinary mid/side. The useful claim for us is that hard-panned signals do not leak into the center or the opposite side in the same way they do with mid/side. Its tuning controls include HPF, LPF, Smooth, and Width, and it can expose separated LCR channels.

Takeaway for this app: use it as a design target. The important behavior is not "make a vocal stem"; it is "separate the stable center image from side-biased material well enough that small spatial edits feel local."

### Leapwing StageOne 2

[Leapwing StageOne 2](https://www.leapwingaudio.com/product/stageone2/) and its [manual](https://s3-eu-west-1.amazonaws.com/leapwing-files/manuals/Manual-StageOne2.pdf) show a different but related design target:

- `Width` stretches off-center content while leaving the phantom center untouched.
- `Depth` adds directionally optimized reflections.
- `Mono Spread` can widen mono or phantom-center content while preserving mono compatibility.
- `Center Gravity` steers the overall processed weight left or right.
- Controls are multiband: low, mid, and high can be treated differently.

Takeaway for this app: the best spatial descriptors probably need two separable actions: center-image handling and side-field handling. `Wide` should not always destabilize `Centered`.

### Mid/Side Processing

[iZotope's mid/side explainer](https://www.izotope.com/community/blog/what-is-midside-processing) and [JustMastering's mid/side article](https://www.justmastering.com/article-mid-side-stereo-explained-part1.php) are useful cautionary sources. Mid/side is sum/difference processing:

```text
M = (L + R) / 2
S = (L - R) / 2

L = M + S
R = M - S
```

This is lossless if encoded and decoded without extra processing. It is also cheap enough for the current engine. But `M` is not the same as "only the center source." A hard-left instrument contributes to both `M` and `S`; only a perfectly centered signal disappears from `S`.

Takeaway for this app: mid/side is the right first spike because it is fast, explainable, and easy to validate. It should be described internally as "center-weighted processing," not "clean center extraction."

### iZotope RX Center Extract

[iZotope RX Center Extract](https://s3.amazonaws.com/izotopedownloads/docs/rx6/19-center-extract/index.html) preserves or removes the center channel from a stereo file. Its docs note that center extraction can preserve stereo image better than plain mid/side in some cases, and that FFT-based processing can create artifacts when the removed or isolated material is pushed too far.

Takeaway for this app: strong extraction should be adjustable and conservative. For gameplay, center extraction is best used as a blendable processing lane, not as an exposed "solo center" effect.

### Published Two-To-Three Upmix Research

Earl Vickers' [Frequency-Domain Two- to Three-Channel Upmix](https://audioroundtable.com/misc/CenterChannelFrequencyDomainUpmix.pdf) proposes a frequency-domain center-channel derivation method using vector-based signal decomposition. The framing matches our problem well: derive a center channel so dialogue or center material can be boosted or filtered, even when final playback remains stereo.

Useful points:

- Simple matrix methods are cheap but have poor channel separation.
- Steering or frequency-domain methods improve separation by estimating what is centered per time-frequency region.
- Frequency-domain processing can cause "musical noise" or watery artifacts, especially when a single extracted channel is heard in isolation or boosted too far.
- The final processed result can still work well when all channels are recombined and the center boost is moderate.

Takeaway for this app: if mid/side is not convincing enough, a frequency-domain LCR prototype is the next serious research path, but it belongs in an `AudioWorklet` or offline asset pipeline.

[Paulus and Virtanen's primary-ambient decomposition with center-channel extraction](https://arxiv.org/abs/2206.02125) is another useful reference. It uses adaptive rotations to move primary sources toward the center before center extraction. That is more ambitious than this app currently needs, but it supports the same general principle: spatial decomposition is often per-frame/per-band, not a static fader.

### Web Audio Runtime Constraints

[MDN's AudioWorklet guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_AudioWorklet) recommends AudioWorklet for custom real-time audio processing because it runs off the main thread. It also notes that heavy audio processing may benefit from WebAssembly.

Takeaway for this app: native Web Audio nodes are fine for a mid/side lane. Any FFT, adaptive detector, or AI-like processing should be isolated behind an AudioWorklet-compatible design.

## Method Options

### Option 1: Current Whole-Track Spatial Processing

Current behavior is simple and stable:

```text
source -> EQ -> spatial gain -> width matrix -> stereo pan -> lowpass
       -> compressor/dynamics/integrity -> wet output
       -> reflection delay/tone/gain
```

Strengths:

- Low latency.
- Easy to reason about.
- Works with the current TypeScript/Web Audio architecture.
- Good for simple `Left`, `Right`, `Wide`, `Narrow`, `Near`, `Far`.

Weaknesses:

- Moving `Near` / `Far` changes the whole track.
- Panning moves the whole stereo scene instead of the lead image.
- `Focused` and `Blurred` are approximations.
- Dense tracks react inconsistently.

Verdict: keep as fallback and for simple training, but it will not fully solve Jan-Niclas' point.

### Option 2: Mid/Side Center-Weighted Lane

Add an internal live lane:

```text
L/R input
  -> M/S encode
  -> process M lane as "center-weighted"
  -> process S lane as "side field"
  -> M/S decode
```

Possible descriptor mappings:

| Descriptor | M lane | S lane | Expected effect |
|---|---|---|---|
| `Centered` | stabilize / keep | neutral | stronger center anchor |
| `Left` / `Right` | pan processed M slightly | neutral or slight compensation | centered lead shifts without fully dragging the sides |
| `Near` | +direct level, less reflection, less HF loss | neutral | lead feels closer than backing |
| `Far` | -direct level, mild lowpass, small reflection only | neutral | lead recedes while backing stays present |
| `Focused` | keep M mono/correlated, reduce reflections | reduce smear | tighter center image |
| `Blurred` | add short decorrelation/reflection to M | optional side lift | center loses sharp outline |
| `Wide` | preserve M | lift S or current width matrix | stage widens while center survives |
| `Narrow` | reduce S | preserve M | field narrows without losing lead |

Strengths:

- Smallest useful implementation.
- Can be built with `ChannelSplitterNode`, `ChannelMergerNode`, and `GainNode`.
- No FFT, no worklet required.
- Very suitable for a quick A/B prototype in Sound Lab.

Weaknesses:

- It is not clean LCR extraction.
- Hard-panned/off-center content appears in `M`.
- Processing `M` can still affect side instruments.
- If `M` is panned, residual `S` can create phase or image shifts.

Verdict: recommended first prototype. Name the internal abstraction carefully: `centerWeightedLane`, not `extractedCenter`.

### Option 3: Correlation-Gated Center Lane

Improve Option 2 by making the center lane stronger only when left and right are similar.

Concept:

```text
For each short block:
  energyL = RMS(L)
  energyR = RMS(R)
  cross = average(L * R)
  corr = cross / sqrt(energyL * energyR + epsilon)
  balance = 1 - abs(db(energyL / energyR)) / maxBalanceDb
  centerWeight = smooth(clamp(corr * balance, 0..1))
```

Then blend:

```text
center = M * centerWeight
residualL = L - center * centerSend
residualR = R - center * centerSend
```

Controls similar to Phantom Center:

- HPF/LPF: restrict extraction to likely vocal/lead bands, for example 120 Hz to 8 kHz.
- Smooth: prevent centerWeight from fluttering.
- Width/selectivity: widen or narrow what counts as center.
- Max extraction: avoid over-subtracting from the original.

Strengths:

- More selective than static mid/side.
- Can remain live if implemented with simple block processing.
- Gives the app a tunable "center confidence" signal for visualizers or debug meters.

Weaknesses:

- Native Web Audio nodes cannot compute the dynamic correlation gate directly.
- Requires `AudioWorklet` or an offline analysis/control sidechain.
- Block transitions can pump or chatter unless smoothed.
- Per-band behavior is much better than full-band behavior, but that adds complexity.

Verdict: good second prototype after M/S. Implement as `AudioWorklet` if we decide spatial descriptors deserve custom DSP.

### Option 4: Frequency-Domain LCR Upmix

Use STFT/FFT frames and derive center/left/right residuals per time-frequency bin.

Conceptual flow:

```text
stereo input
  -> windowed STFT frames
  -> for each bin, estimate center likelihood from L/R phase, magnitude, correlation, and balance
  -> allocate energy between C, L-residual, and R-residual
  -> smooth masks across time/frequency
  -> inverse STFT and overlap-add
```

Strengths:

- Best match for published center-extraction/upmix approaches.
- Can separate centered vocals/dialogue better than full-band M/S.
- Enables multiband center processing: move vocal band, leave low bass or high ambience alone.

Weaknesses:

- Latency from frame size and overlap.
- More CPU.
- More artifacts if masks are too aggressive.
- Needs careful testing across tracks.
- Not a natural fit for the current native-node-only MVP engine.

Verdict: research-grade path. Consider for post-MVP or offline preprocessing, not first implementation.

### Option 5: AI Stem Separation

AI models such as Demucs/Open-Unmix-style systems can separate vocals, drums, bass, and accompaniment. This is a different problem from phantom-center extraction:

- AI tries to separate sources by learned timbre and musical structure.
- LCR extraction tries to separate spatial position from a stereo image.

Strengths:

- Can produce a very strong vocal lane when it works.
- Useful for preparing curated training assets.

Weaknesses:

- Not reliable on every track.
- Can create stem artifacts and bleed.
- Usually too heavy for low-latency in-browser live gameplay.
- Harder to explain as a perceptual spatial cue, because it may change source identity as well as position.

Verdict: useful for offline asset preparation or experiments, but not the best live path for the current game.

## Recommended Direction

Build this in stages:

1. **Add a mid/side center-weighted lane behind Spatial profiles.**
   - Preserve the current graph as the fallback.
   - Add a new internal processing mode for stereo tracks with enough side content.
   - Use it first for Sound Lab, not blind training.

2. **Use descriptor-specific routing.**
   - `Wide`: mostly side-field processing; protect center.
   - `Near` / `Far`: mostly center-weighted processing; keep sides less affected.
   - `Focused` / `Blurred`: center stability/reflection/decorrelation changes.
   - `Left` / `Right`: small center lane bias, not whole-track pan, when the track has a strong center image.

3. **Add offline/debug analysis before shipping it into tests.**
   - Center-to-side energy ratio.
   - Stereo correlation.
   - Mono compatibility after processing.
   - Loudness-matched A/B clips.

4. **Only then consider an AudioWorklet correlation-gated extractor.**
   - Start full-band.
   - Add HPF/LPF around the extraction range.
   - Add smoothing.
   - Avoid aggressive subtraction.

5. **Leave FFT LCR and AI separation as post-MVP research.**
   - They are credible, but they can become a project of their own.

## Practical Web Audio Sketch

The current width matrix already does a related operation:

```text
outL = L * same + R * cross
outR = R * same + L * cross
```

A mid/side lane can reuse similar primitives:

```text
M = 0.5L + 0.5R
S = 0.5L - 0.5R

M' = center processing(M)
S' = side processing(S)

outL = M' + S'
outR = M' - S'
```

For a first prototype, avoid subtractive residual extraction. Do not try to remove the center from the sides yet. Instead, use parallel blend amounts:

```text
processed = decode(processedM, processedS)
output = dryOriginal * dryKeep + processed * wetAmount
```

This is safer than:

```text
residual = original - extractedCenter
```

because bad extraction artifacts are less exposed.

## Suggested Descriptor Profiles

These are now implemented starting points for listening tests, not final calibration.

| Profile | Center lane | Side lane | Notes |
|---|---|---|---|
| `centered` | dry, mono, stable | neutral | strengthens center image when source has center energy |
| `focused` | dry, low reflection, mono-compatible | mild side reduction | avoid making it dull |
| `blurred` | short decorrelated reflection, tiny delay modulation if available | mild side lift | should smear image without sounding like reverb only |
| `wide` | protected / unchanged | side width `1.85`, clamped at `2.0` | center must not collapse |
| `narrow` | protected / unchanged | -side gain | avoid over-monoing ambience |
| `near` | center gain `1.22`, dry, full bandwidth | neutral | deliberately stronger than the first prototype because the earlier `1.06` lift was too subtle |
| `far` | center gain `0.58`, mild lowpass, reflection `0.045` | neutral | primarily lower main-image volume, not added ambience |
| `left` / `right` | center pan `-0.74` / `+0.74` | neutral | more interesting than whole-track skew |

## Validation Plan

Use these local tracks first:

- `daily-spoken-center-loop.wav`: best for center lane, near/far, left/right bias.
- `daily-acoustic-pop-loop.wav`: good sanity check for music bleed.
- `daily-piano-guitar-loop.wav`: useful for artifact detection.
- `jpop-reference-loop.wav` and the licensed demo tracks: stress tests only, because dense mixes will expose extraction weaknesses quickly.

Listening checks:

- Does the lead image move while side material remains believable?
- Does `Wide` leave centered voice/bass/snare anchored?
- Does `Far` sound farther rather than merely quieter/darker?
- Does mono playback avoid hollowing or phase cancellation?
- Does A/B loudness stay close enough that louder is not always perceived as better?
- Do dense tracks fail gracefully by blending back toward whole-track processing?

Technical checks:

- No clipping after decode/recombine.
- Output RMS and LUFS-like proxy remain near current safety targets.
- Correlation does not swing strongly negative unless intentionally widening.
- Parameter ramps do not click.
- CPU stays stable on desktop browser and packaged Electron.

## Open Questions For Jan-Niclas / Harman Alignment

- Is the game allowed to ship a custom LCR extractor, or should this stay as a prototype/educational effect?
- Is it acceptable to use a commercial plugin like Phantom Center or StageOne only as a reference/oracle for offline comparisons?
- Which tracks should define "good enough" center movement?
- Is the target a clean center stem, or a perceptual center-image control that survives recombination?
- How aggressive can center manipulation be before it teaches the wrong cue?

## Recommendation Summary

The proposal is strong, but the implementation should start modestly. For this game, the most valuable next step is not a full surround upmixer. It is a center-weighted spatial lane that can process the stable middle of a stereo file differently from its sides.

Implemented first build:

```text
Mid/side lane + center-protected width + center-biased near/far/pan profiles
```

Recommended second build:

```text
AudioWorklet correlation-gated center lane with HPF/LPF, smoothing, and conservative blend
```

Recommended deferral:

```text
FFT LCR extraction, primary/ambient decomposition, and AI stem separation
```

This keeps the feature aligned with the current live-processing game architecture while opening a real path toward the richer spatial examples Jan-Niclas is pointing at.

## References

- Bertom Audio, Phantom Center: https://bertomaudio.com/phantom-center.html
- Leapwing Audio, StageOne 2: https://www.leapwingaudio.com/product/stageone2/
- Leapwing Audio, StageOne 2 Manual: https://s3-eu-west-1.amazonaws.com/leapwing-files/manuals/Manual-StageOne2.pdf
- iZotope, What is Mid/Side Processing: https://www.izotope.com/community/blog/what-is-midside-processing
- JustMastering, Mid/Side Stereo Explained: https://www.justmastering.com/article-mid-side-stereo-explained-part1.php
- iZotope RX, Center Extract documentation: https://s3.amazonaws.com/izotopedownloads/docs/rx6/19-center-extract/index.html
- Earl Vickers, Frequency-Domain Two- to Three-Channel Upmix: https://audioroundtable.com/misc/CenterChannelFrequencyDomainUpmix.pdf
- Jouni Paulus and Tuomas Virtanen, Geometrically-Motivated Primary-Ambient Decomposition With Center-Channel Extraction: https://arxiv.org/abs/2206.02125
- MDN, Background audio processing using AudioWorklet: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_AudioWorklet
