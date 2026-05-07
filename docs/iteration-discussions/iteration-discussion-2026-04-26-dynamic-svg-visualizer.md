# Dynamic SVG Visualizer Discussion

This document captures the design discussion for revising the `Dynamic Motion` SVG visualizer before implementation.

The current Dynamic SVG is useful as a prototype, but it is not yet conceptually accurate enough for teaching. The main problem is that several descriptors are shown by simply shrinking or roughening the whole envelope. That makes `Compressed`, `Flat`, and future compound words like `Squashed` look too similar.

The visualizer should teach this core idea:

```text
Dynamic descriptors describe how sound level changes over time.
Different descriptors should change different parts of the envelope.
```

## Current Issue

The current `Compressed` visual reduces the whole envelope. That is misleading.

Better definition:

```text
Compressed = peaks above a threshold are pushed down; material below the threshold is mostly preserved.
```

This is different from:

```text
Flat = the whole performance has reduced expressive level contrast.
```

And different from:

```text
Clipped = peaks hit a hard ceiling and are cut flat.
```

The current `Clipped` visual also has a serious flaw: if each peak is only clamped to one ceiling point, the result still looks like a reduced triangular peak. That reads more like limiting or compression. A clipped peak should have a visibly flat top.

Correct visual rule:

```text
Clipped = a peak crosses the ceiling, then its top becomes a horizontal plateau at the ceiling.
```

## Research Notes

This section summarizes the technical definitions that should guide the SVG.

Sources:

- W3C Web Audio API 1.1, `DynamicsCompressorNode`: <https://www.w3.org/TR/webaudio-1.1/#DynamicsCompressorNode>
- W3C Web Audio API 1.1, `WaveShaperNode`: <https://www.w3.org/TR/webaudio-1.1/#WaveShaperNode>
- EAW, `Why Should I Care About Clipping?`: <https://design.eaw.com/en/knowledge/why-should-i-care-about-clipping>
- EAW, gain structure / dynamic range discussion: <https://eaw.com/wp-content/uploads/2020/12/Setting_System_Gain.pdf>

Important findings:

| Concept | Research-grounded meaning | Visual consequence |
|---|---|---|
| Dynamics | Level behavior over time, bounded by usable range between noise and clipping. | The SVG should focus on amplitude envelope, recovery, range, and headroom. |
| Compression threshold | Compression starts above a threshold. Below-threshold signal should pass mostly unchanged. | `Compressed` must not shrink the whole line. It should bend only the above-threshold parts. |
| Ratio | Above threshold, larger input changes become smaller output changes. | Compressed peaks can still rise, but less steeply than the input. |
| Knee | Transition region around threshold; soft knee is gradual, hard knee is sharper. | Compressed peaks should be rounded/bent, not cut flat. |
| Attack | Time needed for gain reduction to engage. | `Softened` and fast compression can reduce initial transient edge. |
| Release | Time needed for gain to recover. | `Pumping`, `Tight`, and `Loose` should be drawn as recovery timing, not EQ or loudness. |
| Gain reduction | The compressor applies time-varying attenuation. | Compression can be shown with gain-reduction markers above the threshold. |
| Clipping | Signal exceeds the maximum capability; tops become flat-topped. | `Clipped` needs a literal flat ceiling plateau, not a single reduced peak vertex. |
| Waveshaping distortion | Nonlinear shaping maps input samples to changed output samples. | `Distorted` should show nonlinear roughness tied to loud regions, not independent random artifacts. |

Key distinction:

```text
Compression changes gain over time.
Clipping changes the waveform shape by truncating samples beyond a maximum.
```

This distinction should be visible. Compression may reduce a peak smoothly. Clipping should remove the peak top.

## Visualizer Goal

The SVG should be a teaching diagram, not a real waveform analyzer yet.

Near-term target:

- show an input or reference envelope,
- show a processed/result envelope,
- show threshold or ceiling only when relevant,
- make each descriptor visually distinct,
- avoid implying that every dynamic effect is just "smaller waveform",
- stay simple enough to read inside the right-side control panel.

Later target:

- optionally add a real-time waveform/envelope meter behind the symbolic diagram,
- use measured audio only after the symbolic logic is pedagogically clear.

## Proposed Visual Grammar

Use a consistent diagram language:

| Visual element | Meaning |
|---|---|
| Faint dashed envelope | Reference/clean input shape |
| Bright solid envelope | Active descriptor result |
| Red dashed threshold | Compressor starts acting above this line |
| Red hard ceiling | Absolute peak limit for clipping; clipped peaks must form a flat plateau on this line |
| Blue motion band | Level motion or gain movement over time |
| Jagged red marks | Nonlinear roughness caused by overload |
| Center line | Resting or average level reference |

Important rule:

```text
Threshold is not the same as ceiling.
```

- A threshold means "processing begins here."
- A ceiling means "the waveform cannot go beyond here."

Second important rule:

```text
One clipped vertex is not enough.
```

If the input envelope crosses the ceiling at one peak, the output SVG should insert at least two points around that peak:

```text
before peak -> ceiling-entry -> ceiling-exit -> after peak
```

This creates a visible horizontal line segment. Without that plateau, the clipped peak still looks merely lowered.

## Descriptor-By-Descriptor Discussion

### Snappy

Listening meaning:

```text
The front edge of hits survives clearly.
```

SVG behavior:

- transient peaks should rise quickly,
- first edges should look sharp and clean,
- recovery can remain normal,
- no threshold or ceiling is needed.

Design risk:

- `Snappy` can be confused with Spectral `Bright` because brighter sound can fake attack clarity.

Recommendation:

- Draw `Snappy` as sharper time edges, not as a brighter color or taller whole waveform.
- Use the clean reference line to show that the hit front is preserved.

### Softened

Listening meaning:

```text
The first edge of the hit is rounded or pressed down.
```

SVG behavior:

- reduce only the early attack edge,
- round the first peak,
- do not flatten the entire performance.

Difference from `Compressed`:

- `Softened` is about the attack shape.
- `Compressed` is about level control above threshold.

Recommendation:

- Show the beginning of each hit as curved/rounded, while later body motion remains readable.

### Tight

Listening meaning:

```text
The sound recovers cleanly before the next event.
```

SVG behavior:

- after each hit, the envelope returns to the baseline quickly,
- gaps between hits are clean,
- the next hit starts without smear from the previous one.

Design risk:

- `Tight` can be confused with spectral bass control.

Recommendation:

- Do not draw `Tight` as less bass or thinner sound.
- Draw it as clean spacing and reset timing between envelope peaks.

### Loose

Listening meaning:

```text
The level or energy drags after hits and does not reset cleanly.
```

SVG behavior:

- tails remain elevated after peaks,
- valleys are partially filled in,
- the next hit begins before the previous motion settles.

Difference from `Flat`:

- `Loose` still has motion, but it smears over time.
- `Flat` has reduced motion overall.

Recommendation:

- Draw `Loose` as delayed recovery, not as simply smaller peaks.

### Compressed

Listening meaning:

```text
Peaks above a threshold are controlled; some natural motion still remains.
```

SVG behavior:

- add a threshold line,
- only portions above the threshold are bent downward,
- below-threshold material should remain close to the reference envelope,
- peaks should become rounded or gently reduced, not hard squared.

SVG construction rule:

```text
if y is above threshold:
  output = threshold + (input - threshold) / ratio
else:
  output = input
```

In the SVG coordinate system, "above threshold" means the point is visually higher than the threshold line. The rendered curve may use a soft knee around the threshold so it does not look like clipping.

Difference from `Flat`:

- `Compressed` changes the peak-to-average relationship.
- `Flat` reduces expressive level contrast more globally.

Difference from `Clipped`:

- `Compressed` has a soft or controlled knee.
- `Clipped` has a hard ceiling.

Recommendation:

- This is the most important correction. The SVG should visually show "only above threshold is affected."

### Pumping

Listening meaning:

```text
Gain reduction creates audible ducking and rebound over time.
```

SVG behavior:

- after loud peaks, the whole following envelope dips and returns,
- the blue motion band can pulse,
- an animated sag/recovery motion is appropriate.

SVG construction rule:

```text
loud peak crosses threshold -> following section ducks downward -> release returns toward normal
```

The important visible cue is the delayed movement after the peak, not just a decorative pulsing background.

Difference from `Compressed`:

- `Compressed` can be static peak control.
- `Pumping` is the audible movement caused by gain reduction and release timing.

Recommendation:

- Keep animation for `Pumping`, but make it tied to post-peak sag rather than a generic pulsing rectangle.
- The user should see the waveform "breathe back" after large events.

### Flat

Listening meaning:

```text
Expressive level motion is reduced across the whole sound.
```

SVG behavior:

- peaks and valleys both move closer to the center,
- the envelope becomes narrow,
- no threshold line is required unless combined with `Compressed`.

Difference from `Compressed`:

- `Flat` is global reduction of contrast.
- `Compressed` is threshold-dependent peak control.

Recommendation:

- Draw `Flat` as low envelope contrast across the entire timeline.
- This should look emotionally still, not mechanically peak-limited.

### Clipped

Listening meaning:

```text
Peaks exceed a hard ceiling and the top of the waveform is cut flat.
```

SVG behavior:

- add a hard ceiling line,
- any peak above the ceiling becomes a horizontal line segment at the ceiling,
- the sides can be steep or angled into the plateau,
- the top of the waveform should look cut, not rounded and not merely reduced.

SVG construction rule:

```text
if a peak crosses the ceiling:
  draw an entry point at ceiling
  draw a second point at ceiling after the peak
  connect them as a flat plateau
```

Example shape:

```text
Not enough:

     /\
----/  \----

Correct clipped top:

     __
----/  \----
```

In polyline terms, clamping only the peak's center point is wrong because it creates a sharp point at the ceiling. A clipped peak needs extra points before and after the peak so the cut head becomes a real horizontal line.

Difference from `Compressed`:

- `Compressed` bends peaks.
- `Clipped` cuts peaks and discards the peak top.

Difference from `Limited`:

- A limiter can prevent peaks from crossing a ceiling by reducing gain.
- `Clipped` means the signal has already exceeded capability and the peak top is truncated.

Recommendation:

- Use a red ceiling line and visibly squared peak tops.
- Do not animate it; clipping should feel like a hard boundary.
- Do not use a single ceiling point. Use a plateau.

### Distorted

Listening meaning:

```text
Nonlinear roughness appears when the signal is pushed.
```

SVG behavior:

- add jaggedness mainly around loud sections,
- roughness should follow the envelope intensity,
- quiet sections should remain less affected.

Boundary with Integrity:

- Dynamic `Distorted` follows signal intensity and overload.
- Integrity `Buzz`, `Crackle`, `Click`, and `Dropout` can occur as independent artifacts.

Recommendation:

- Draw roughness attached to peaks and loud regions.
- Avoid random noise across the entire graphic, because that would look like Integrity.

## Compound And Delayed Descriptor Discussion

These are not all MVP basic cards, but they matter because the SVG rules should leave room for them.

### Squashed

Likely meaning:

```text
Severe compressed + flat behavior, often with softened attack.
```

SVG behavior:

- threshold action is heavy,
- whole envelope contrast is reduced,
- peaks lose attack definition,
- may look like `Compressed + Flat + Softened`.

Recommendation:

- Do not make `Squashed` a primitive SVG state.
- Build it from existing visual rules when it becomes a discovery/evolved card.

### Dense

Likely meaning:

```text
Average presence is high after loudness matching.
```

SVG behavior:

- more filled-in body between peaks,
- higher average envelope density,
- not necessarily lower peaks.

Risk:

- It can be caused by arrangement, warmth, saturation, or loudness.

Recommendation:

- Delay this from MVP SVG basics.
- If added later, show it as higher average fill, not as compression alone.

### Breathing

Likely meaning:

```text
Slow program-level gain movement.
```

SVG behavior:

- slower version of pumping,
- broad envelope swell and release over a longer time span.

Recommendation:

- Treat as phase-2 motion.
- It can use the same system as `Pumping` but with a slower animation and broader sag.

### Constrained

Likely meaning:

```text
Big moments cannot expand fully, but obvious overload may not be present.
```

SVG behavior:

- loud sections approach a soft upper boundary,
- macro peaks fail to open,
- smaller internal motion can still exist.

Recommendation:

- Delay until the app has better macro-dynamic teaching.
- It should sit between `Compressed`, `Flat`, and `Clipped`, but not collapse into any one of them.

### Strained

Likely meaning:

```text
Loud moments feel forced near the limit.
```

SVG behavior:

- peaks push close to a ceiling,
- slight roughness or tension may appear,
- not necessarily fully clipped.

Recommendation:

- Delay until `Clipped` and `Distorted` are well understood.
- Use it as a warning state near overload, not as generic harshness.

### Overdriven

Likely meaning:

```text
Clipping and overload roughness happen together.
```

SVG behavior:

- hard ceiling,
- flattened peaks,
- jagged overload marks around loud areas.

Recommendation:

- Good as a discovery/evolved card from `Clipped + Distorted`.
- It should combine existing visual rules rather than become a separate primitive.

### Explosive

Likely meaning:

```text
Large clean macro/micro-dynamic contrast with strong impact.
```

SVG behavior:

- tall clean peaks,
- deep clear valleys,
- quick clean recovery,
- no clipping or overload.

Recommendation:

- Better as a positive reference/reward descriptor than as a direct processor.
- It should not be faked by simply increasing loudness.

## Proposed State Model

The current state model is close, but the rendering algorithm should become more specific.

```ts
type DynamicVisualizerState = {
  attack: "neutral" | "snappy" | "softened";
  recovery: "neutral" | "tight" | "loose";
  compression: "none" | "compressed";
  motion: "neutral" | "pumping";
  contrast: "normal" | "flat";
  overload: "none" | "clipped" | "distorted" | "overdriven";
};
```

Suggested rendering order:

1. Start from a neutral envelope.
2. Apply attack shaping.
3. Apply recovery shaping.
4. Apply threshold-based compression only above threshold.
5. Apply global contrast reduction only for `Flat`.
6. Apply pumping sag/rebound if active.
7. Apply clipping as plateau generation, not single-point clamping.
8. Apply distortion roughness around loud regions if active.

Reason for this order:

- It keeps `Compressed` from accidentally becoming `Flat`.
- It keeps `Clipped` visibly different from compression.
- It lets compound states combine naturally.

Implementation note for clipping:

```text
Do not only do: y = max(y, ceilingY)
```

That is the current conceptual problem. It turns a clipped peak into a reduced peak. The renderer should expand a clipped peak into multiple points:

```text
left shoulder -> plateau start -> plateau end -> right shoulder
```

This may require changing from a simple one-input-point-to-one-output-point mapper to a function that can return multiple SVG points per source peak.

## Open Questions Before Implementation

1. Should the visualizer show both input and output envelopes at all times, or only when a descriptor is active?
2. Should `Compressed` show a separate gain-reduction shadow under the peaks?
3. Should `Pumping` animate the envelope itself, or only the blue motion band?
4. Should `Flat` remove the threshold line unless it is combined with `Compressed`?
5. Should `Distorted` use jagged overlay marks, or should the main output line itself become jagged?
6. Should the Learn blind tests hide the dynamic visualizer before answer, the same way the current right panel hides active cards and curves?
7. Should the clipped plateau width scale with how far the input peak exceeds the ceiling?
8. Should `Clipped + Distorted` draw both plateau tops and jagged edges on/near the plateau?

## My Current Recommendation

For the next implementation, revise the symbolic SVG before adding real waveform analysis.

Priority:

1. Correct `Compressed` so only above-threshold peaks are reduced.
2. Make `Flat` a global low-contrast envelope.
3. Make `Clipped` a hard ceiling with true horizontal plateau tops.
4. Make `Pumping` show post-peak ducking/recovery.
5. Make `Distorted` rough only near loud sections.
6. Keep `Squashed`, `Dense`, `Breathing`, `Constrained`, and `Strained` out of the MVP primitive visualizer until the main nine descriptors are visually clean.

This gives the user a clearer mental model:

```text
Compressed = controlled peaks
Flat = reduced expression
Clipped = flat-topped peak truncation
Distorted = overload roughness
Pumping = moving gain recovery
```
