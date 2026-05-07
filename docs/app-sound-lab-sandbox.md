# Sound Lab And Sandbox

This document owns the Sound Lab free experiment surface.

## Purpose

Sound Lab lets the player freely apply learned basic descriptor cards to the current track. It is the low-pressure place for exploration after Training Grounds.

## Current Rules

- Only learned basic cards appear.
- Multiple active cards are allowed.
- Discovery identity is cleared when the player manually changes basics.
- Sound Lab toggling appends/removes ids directly, so conflicting descriptors can coexist here for experimentation.
- The side rail shows the active experiment plus all four sandbox visualizer tiles.
- The intensity slider is scoped to Sound Lab. Changing it affects Sound Lab playback and visual readouts, but not Training Grounds, Calibration Tower, or Atlas.
- Spectral intensity protection is per bucket, not per total card count. Stacking two bass boosts or two treble boosts caps only that boost bucket from `200%` to `175%`; a bass boost plus a treble boost remains `200%` in both buckets. Bass and treble boosts use the stricter table: `1 -> 200%`, `2 -> 175%`, `3 -> 150%`, `4 -> 125%`, and `5+ -> 100%`.

## Difference From Training Grounds

| Area | Training Grounds | Sound Lab |
|---|---|---|
| Goal | Learn and unlock basics. | Experiment freely. |
| Active basics | Usually one preview target. | Multiple learned basics. |
| Conflicting basics | Avoided or hidden by challenge flow. | Allowed to coexist. |
| Hidden trials | Yes. | No. |
| Progress write | Unlocks basics. | No direct unlock progress. |

## Visualizers

Sound Lab can show all sandbox visualizer tiles:

- EQ Curve
- Spatial Stage
- Dynamic Lab
- Artifact Timeline

Unlike the general side rail module visualizer, Sound Lab always renders all four sandbox visualizer tiles.

## Descriptors Included

Sound Lab includes every learned basic descriptor and excludes locked basics, Discovery cards, and alias cards.

| Module | Possible Sound Lab basics |
|---|---|
| Spectral | `Rumble`, `Thump`, `Boomy`, `Punchy`, `Thin`, `Muddy`, `Warm`, `Boxy`, `Hollow`, `Honky`, `Nasal`, `Shouty`, `Harsh`, `Dull`, `Sibilant`, `Glassy`, `Bright`, `Airy` |
| Spatial | `Left`, `Right`, `Centered`, `Near`, `Far`, `Focused`, `Blurred`, `Wide`, `Narrow`, `Dry`, `Reverberant` |
| Dynamic | `Snappy`, `Softened`, `Tight`, `Loose`, `Compressed`, `Pumping`, `Flat` (`flat-dynamics`), `Clipped`, `Distorted` |
| Integrity | `Hiss`, `Static`, `Hum`, `Buzz`, `Whine`, `Dirty`, `Click`, `Pop`, `Crackle`, `Dropout`, `Squeak` |

## Details Included

Sound Lab card tiles let the player toggle a learned basic or inspect its detail modal. The active experiment readout reports the number of active cards. The Audio Controls slider writes the saved Lab intensity. The intensity readout can show a range such as `200% -> 180-200%` when one spectral bucket is capped but another remains at full strength. No card unlocks, Discovery recipe unlocks, alias unlocks, or score writes happen from this screen.

## Implementation References

- UI: `web/app/src/app/App.tsx` `SandboxScreen`
- Active experiment: `SandboxActiveExperiment`
- Visualizer tiles: `SandboxVisualizerTiles`
- Conflict logic: `web/app/src/cards/cardReducer.ts`
- Module visualizers: `web/app/src/ui/components/visualizers/`
