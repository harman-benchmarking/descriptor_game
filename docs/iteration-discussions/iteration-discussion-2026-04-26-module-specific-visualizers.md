# Module-Specific Visualizers Discussion

This document captures the design decision that the EQ curve should not be reused for all descriptor modules.

Spectral descriptors can use an EQ curve because their meaning is frequency balance.

Spatial, Dynamic, and Integrity descriptors need their own visual feedback. Otherwise the visualizer becomes misleading: the player may think every descriptor is a frequency curve, even when the real cue is position, motion, or artifact behavior.

## Immediate Gate Correction

Spatial Prototype Gate should start with:

- Gift pair: `Left`, `Right`
- First catch: `Centered`
- Later unlocks: `Near`, `Far`, `Dry`, `Reverberant`

Reason:

- `Left` and `Right` are the clearest spatial contrast.
- They teach the user that this module is about placement, not tone.
- `Centered` works better as the first catch because the user learns it by contrast after hearing left and right.

Current placeholder gate should be changed from:

```text
Gift pair: Left + Centered
First catch: Right
```

to:

```text
Gift pair: Left + Right
First catch: Centered
```

## Core Rule

Each module should have a visualizer that represents the listening question of that module.

| Module | Listening question | Visualizer type |
|---|---|---|
| `Spectral` | What frequency energy changed? | EQ curve |
| `Spatial` | Where is the sound and how large/far is the space? | Position/depth stage |
| `Dynamic` | How does level and motion change over time? | Waveform/envelope/compression motion |
| `Integrity` | What unwanted event or artifact appears? | Artifact timeline/waveform markers |

## Visualizer Selection Logic

The app should choose the visualizer from the active module, not from the current screen alone.

Near-term rule:

- If active cards are all Spectral, show `SpectralCurveVisualizer`.
- If active cards are Spatial, show `SpatialStageVisualizer`.
- If active cards are Dynamic, show `DynamicMotionVisualizer`.
- If active cards are Integrity, show `IntegrityArtifactVisualizer`.
- If no cards are active, show a neutral visualizer for the selected Learn module.
- If mixed-module cards are active later, show a stacked or tabbed visualizer.

For the MVP, mixed-module active cards can be avoided or cleared when changing modules.

## Spectral Visualizer

Keep the current EQ curve.

It is useful because Spectral cards directly map to EQ filters:

- frequency,
- gain,
- Q,
- combined curve.

Good for:

- `Rumble`
- `Thump`
- `Warm`
- `Boxy`
- `Bright`
- `Airy`
- Spectral discovery recipes

Do not use the Spectral curve as the default visualizer for non-Spectral modules.

## Spatial Visualizer

Recommended name:

```text
Spatial Stage
```

The visualizer should feel like a simple sound stage, but the clearest teaching shape is a `+` map rather than a single horizontal line.

MVP visual elements:

- horizontal left-center-right axis,
- vertical near-center-far axis,
- source marker that can move in four directions from center,
- optional listener/headphone icon at the bottom,
- optional room glow/reflection rings for reverberant sounds.

Example layout:

```text
              Near
               |
               |
Left ----------+---------- Right
               |
               |
              Far
```

Descriptor mappings:

| Descriptor | Visual behavior |
|---|---|
| `Left` | Source marker moves left. |
| `Right` | Source marker moves right. |
| `Centered` | Source marker sits at center. |
| `Near` | Source marker moves upward from center. |
| `Far` | Source marker moves downward/behind center. |
| `Dry` | Little or no reflection glow. |
| `Reverberant` | Reflection rings or room glow around the marker. |

The combined spatial position should support 8 directional placements around center:

| Combination | Visual position | Listening idea |
|---|---|---|
| `Left` | west | source is left |
| `Right` | east | source is right |
| `Near` | north | source is close/front |
| `Far` | south | source is behind/set back |
| `Left + Near` | northwest | close-left |
| `Right + Near` | northeast | close-right |
| `Left + Far` | southwest | far-left |
| `Right + Far` | southeast | far-right |

`Centered` returns the source to the middle.

Important design note:

- `Near` being "above" is a teaching map, not a literal screen-space claim that the sound is higher in pitch or elevation.
- `Far` should feel behind/set back, so drawing it below/behind center is acceptable for the MVP.
- Later, this can become a perspective stage where far positions shrink or fade instead of only moving downward.

My input:

- Keep this visualizer abstract and functional, not decorative.
- It should help confirm what the DSP is doing.
- For Spatial testing, the visualizer can become an answer key, so during blind tests it should be hidden or blurred until after the user answers.
- The `+` model is better than a single left-to-right stage because it can teach pan and depth as independent axes.
- It also prepares the UI for combined cards such as `Left + Near`, `Right + Far`, and later spatial recipes.

MVP implementation idea:

Use CSS/SVG, no canvas needed.

State model:

```ts
type SpatialVisualizerState = {
  x: -1 | 0 | 1;
  y: -1 | 0 | 1;
  reflection: "dry" | "neutral" | "reverberant";
};
```

Coordinate convention:

```text
x = -1 left, 0 center, 1 right
y = -1 far/behind, 0 center, 1 near
```

## Dynamic Visualizer

Recommended name:

```text
Dynamic Motion
```

The visualizer should show level motion over time, not frequency. After the Dynamic vocabulary revision, it also needs to show transient attack, recovery timing, and overload/headroom damage.

Possible visual elements:

- waveform strip,
- envelope line,
- gain-reduction overlay,
- compressor threshold line,
- moving "squeeze" band for compression,
- pulse animation for pumping,
- clipping ceiling line,
- jagged overload/roughness marks.

Descriptor mappings:

| Descriptor | Visual behavior |
|---|---|
| `Snappy` | First edges stay sharp and tall compared with the processed alternatives. |
| `Softened` | First edges become rounded and less tall. |
| `Tight` | Recovery returns cleanly before the next hit. |
| `Loose` | Recovery lags or smears between hits. |
| `Compressed` | Envelope becomes more even; gain-reduction overlay appears. |
| `Pumping` | Envelope ducks and rebounds rhythmically. |
| `Flat` | Waveform/envelope becomes less varied. |
| `Clipped` | Peaks hit a visible ceiling and flatten. |
| `Distorted` | Overload roughness appears as jagged marks that follow loud parts. |

My input:

- A literal live waveform may be expensive or distracting for MVP.
- A stylized generated waveform is enough for checking the descriptor logic.
- The most useful visual might be an "input envelope vs processed envelope" comparison rather than a raw waveform.
- `Squashed` should stay out of the first Learn gate as a basic card. It is clearer as a later discovery/evolved state from `Compressed + Flat + Softened`.
- `Breathing` should stay phase-2 because it is a subtler slow-motion cousin of `Pumping`.
- `Clipped` and `Distorted` can be in Dynamic as long as the app teaches them as overload/headroom behavior, not independent noise or defect artifacts.

MVP implementation idea:

Use a deterministic SVG waveform generated from descriptor state, not live audio analysis yet.

State model:

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

Current Dynamic Learn gate alignment:

```text
Snapback Gate
Gift pair: Snappy + Softened
First catch: Loose
Later unlocks: Tight

Pressureflow Gate
Gift pair: Compressed + Pumping
First catch: Flat
Later unlocks: Clipped, Distorted
```

Reason:

- `Snappy + Softened` teaches the most basic time-shape contrast first: preserved edge versus rounded edge.
- `Loose` is the first catch because recovery drag is easier to hear as a loss/change before `Tight` names the clean reset.
- `Compressed + Pumping` starts the second gate with a direct pressure-versus-motion contrast.
- `Flat` teaches reduced expression without immediately implying pumping or overload.
- `Clipped` and `Distorted` stay late because they require overload listening discipline and a stronger warning that this is not Integrity noise.

Later upgrade:

- Use `AnalyserNode` or `OfflineAudioContext` to show real level envelopes.
- Add gain-reduction meter when compressor graph exposes enough information.
- Add a limiter ceiling and loudness-matched output trim for the overload descriptors.

## Integrity Visualizer

Recommended name:

```text
Artifact Timeline
```

The visualizer should show unwanted defects riding on playback.

Possible visual elements:

- waveform baseline,
- noise floor band,
- hum/buzz tone line,
- click/pop spikes,
- crackle clusters,
- dropout gaps.

Descriptor mappings:

| Descriptor | Visual behavior |
|---|---|
| `Hiss` | Thin steady noise band above the waveform. |
| `Hum` | Smooth low repeating wave under the baseline. |
| `Buzz` | Jagged harmonic tone line under the baseline. |
| `Click` | Single sharp vertical tick markers. |
| `Crackle` | Clusters of tiny random tick markers. |
| `Dropout` | Short missing segment or dimmed gap in the waveform. |

My input:

- This visualizer should be event-based and timeline-based.
- It does not need to look like a scientific oscilloscope.
- It should communicate "there is unwanted junk here" without becoming visually noisy.
- During blind tests, hide artifact markers until after the user chooses, because clicks/dropouts can become visually obvious.

MVP implementation idea:

Use SVG timeline markers generated from active Integrity descriptors.

State model:

```ts
type IntegrityVisualizerState = {
  noise: "none" | "hiss";
  tone: "none" | "hum" | "buzz";
  events: Array<"click" | "crackle" | "dropout">;
};
```

## Shared Visualizer Component Shape

Recommended component split:

```text
ui/components/visualizers/
  ModuleVisualizer.tsx
  SpectralCurveVisualizer.tsx
  SpatialStageVisualizer.tsx
  DynamicMotionVisualizer.tsx
  IntegrityArtifactVisualizer.tsx
```

`ModuleVisualizer` decides which module visualizer to render.

Possible props:

```ts
type ModuleVisualizerProps = {
  activeDescriptorIds: string[];
  selectedModuleId: DescriptorModuleId;
  curvePoints: CurvePoint[];
  revealAnswerVisuals?: boolean;
};
```

Behavior:

- Spectral receives `curvePoints`.
- Spatial/Dynamic/Integrity derive state from active descriptor IDs.
- `revealAnswerVisuals` can hide answer-revealing details during blind tests.

## Blind Test Fairness

The visualizer can accidentally make tests too easy.

Examples:

- Spatial marker on the left reveals `Left`.
- Dynamic flattened waveform reveals `Flat` or `Clipped`.
- Integrity spike markers reveal `Click`.
- Spectral EQ curve reveals `Bright`, `Rumble`, etc.

Therefore:

- During Teach mode, show the visualizer.
- During Practice mode, show a softened/neutral visualizer or hide answer-specific parts.
- After the user answers, reveal the visualizer as feedback.

Recommended MVP rule:

```text
Visualizer is educational before and after tests.
Visualizer is hidden or neutral during blind answer selection.
```

## Implementation Order

1. Change Spatial Prototype Gate gift pair to `Left + Right`.
2. Add a generic `ModuleVisualizer` wrapper.
3. Keep current EQ curve as `SpectralCurveVisualizer`.
4. Add `SpatialStageVisualizer`.
5. Add `DynamicMotionVisualizer`.
6. Add `IntegrityArtifactVisualizer`.
7. Update the side rail to render the correct visualizer instead of always showing the EQ curve.
8. Add tests for deriving visualizer state from descriptor IDs.
9. Later, connect Dynamic/Integrity visualizers to live or offline audio analysis if useful.

## MVP Acceptance Criteria

The MVP visualizer pass is acceptable when:

- Spectral still shows the EQ curve.
- Spatial shows source position/depth/reflection cues.
- Dynamic shows envelope/compression/motion cues.
- Integrity shows artifact/noise/timeline cues.
- The EQ curve is not shown for non-Spectral-only active cards.
- The visualizers are useful for DSP debugging.
- The visualizers can be hidden or neutralized for future blind tests.

## Prototype Check Results

Initial user confirmation:

| Check | Result |
|---|---|
| Does `Left` actually sound and look left? | Yes |
| Does `Pumping` produce obvious dynamic motion? | Yes |
| Does `Dropout` produce visible gaps and audible dropouts? | Yes |

This supports continuing with module-specific visualizers rather than returning to the universal EQ curve.

## Implementation Update: Dynamic MVP Gates

The Dynamic Learn flow has been split into two gates aligned with the revised dynamic vocabulary:

```text
Snapback Gate
Gift pair: Snappy + Softened
First catch: Loose
Later unlocks: Tight

Pressureflow Gate
Gift pair: Compressed + Pumping
First catch: Flat
Later unlocks: Clipped, Distorted
```

Implementation notes:

- The app catalog now treats these nine cards as the Dynamic MVP basics.
- `Squashed` and `Breathing` are deliberately not Learn basics in this pass. They remain better as later discovery/evolved language.
- `Ceilingbreak Spires` remains a later atlas region rather than a separate Learn gate in the MVP, because the current overload basics are only `Clipped` and `Distorted`.
- The Dynamic visualizer now models attack, recovery, compression, pumping, flatness, and overload state.
- `Clipped` and `Distorted` now have a prototype waveshaper stage in the audio engine, so they are not only visual labels.
- `Overdriven` is represented as the combined visual state when `Clipped + Distorted` are both active, but it is not yet a separate Learn card.

## My Preferred Direction

For this DSP-checking phase, I prefer clear, simple, module-specific diagrams over beautiful animations.

The purpose right now is verification:

- Does `Left` actually sound and look left?
- Does `Pumping` produce obvious dynamic motion?
- Does `Dropout` produce visible gaps and audible dropouts?

After the audio is confirmed, the visual style can become more game-like.
