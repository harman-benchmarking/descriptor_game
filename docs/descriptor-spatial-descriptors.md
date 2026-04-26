# Spatial Descriptor Raw Materials

This document defines a draft vocabulary for spatial aspects in audio system evaluation.

It assumes training through stereo earbuds or headphones. That assumption matters: headphone playback makes left/right localization, image focus, stereo width, and depth cues more controllable than phone speakers or uncontrolled room playback.

Spatial descriptors are separate from spectral descriptors and dynamic descriptors:

```text
Spectral = frequency balance and tone color.
Dynamic = time behavior, compression, attack, release, and headroom.
Spatial = position, image shape, width, separation, distance, and room impression.
```

## Boundary With Existing Spectral Descriptors

Some current spectral cards already use spatial-feeling language. Keep them in the spectral atlas because their current implementation is EQ-based.

| Existing spectral card | Why it can feel spatial | Why it should remain spectral |
|---|---|---|
| `Airy` | Feels open and spacious. | It is a high-treble boost around `14000 Hz`. |
| `Distant` | Music moves away and detail fades. | It expands to `Hollow + Dull`, an EQ cut recipe. |
| `Hollow` | Center feels empty. | It is a `600 Hz` cut. |
| `Cupped` | Sounds like a small chamber. | It expands to midrange EQ boosts. |
| `Canned` | Sounds trapped in a small container. | It expands to stacked midrange EQ boosts. |
| `Congested` | Sounds crowded and hard to separate. | It expands to masking EQ bands plus dullness. |

Avoid these names as spatial basics:

| Avoid | Use instead | Reason |
|---|---|---|
| `Distant` | `Far` or `Set Back` | `Distant` already exists as a spectral combo. |
| `Congested` | `Crowded` | `Congested` already exists as a spectral masking mega combo. |
| `Airy` | `Spacious` or `Open` | `Airy` already means high-treble extension. |

## Current App Anchors

The current app already has spatial training and a spatial playground.

Current spatial scope:
- Training focuses on `azimuth` and `depth`.
- Front/back and height are intentionally out of scope for the current app.
- Headphones are preferred or required for depth-focused levels.

Current engine cues:

| Cue | Current implementation role |
|---|---|
| `azimuthDeg` | Left/right position, clamped to `-90..+90 deg`. |
| `depthNorm` | Near/far distance, clamped to `0..1`. |
| `ITD` | Interaural time difference for left/right position. |
| `ILD` | Interaural level difference for left/right position. |
| direct level | Farther sounds are reduced in level. |
| high-frequency rolloff | Farther sounds lose more top-end detail. |
| reflection mix and delay | Farther sounds have more delayed reflected energy. |
| mono pre-blend | Current engine collapses toward mono before spatialization for clearer training cues. |

## Vocabulary Shape

Recommended current shape:

| Type | Count | Purpose |
|---|---:|---|
| Basic cards | `13` | Playable spatial ingredients with one primary region each. |
| Discovery cards | `8` | Recipe outcomes that combine basics. |
| Alias / outcome icons | open | Extra vocabulary can have icons without becoming separate playable basics. |

Basic spatial vocabulary:

```text
Left, Right, Centered, Focused, Blurred,
Wide, Narrow, Separated, Crowded,
Near, Far, Dry, Reverberant
```

## Spatial Axes

Spatial descriptors should be grouped by perceptual axis, not frequency range.

| Axis | Listener question | Vocabulary |
|---|---|---|
| Position | Where does the source sit left-to-right? | left, right, centered |
| Image focus | Is the source sharply placed or smeared? | focused, blurred, precise, diffuse |
| Width | How wide is the sound field? | wide, narrow, panoramic, boxed in |
| Separation | Can individual parts be distinguished in space? | separated, crowded |
| Depth | Is the source close or set back? | near, far, intimate, set back |
| Room impression | How much room or reflection surrounds the sound? | dry, reverberant, spacious |

## Spatial Regions And Roadmap

The atlas uses three regions. Every basic descriptor has one primary home. Recipes can bridge regions because spatial perception often combines position, width, focus, depth, and room cues.

### Region 1: Position And Image

Theme: where the sound is placed and how clearly it is imaged.

Elements involved:
- `Left`
- `Right`
- `Centered`
- `Focused`
- `Blurred`

Roadmap:

```text
Centered + Focused
      |
   Precise

Wide + Blurred
      |
   Diffuse
```

Bridge recipes:
- `Holographic` uses `Focused` plus width/separation and space cues.
- `Diffuse` uses `Blurred` plus width.

Table:

| Stage | Card | Recipe | Role |
|---|---|---|---|
| Element | `Left` | basic | source sits left of center |
| Element | `Right` | basic | source sits right of center |
| Element | `Centered` | basic | source sits in the middle |
| Element | `Focused` | basic | source has a clear, stable image |
| Element | `Blurred` | basic | source image is smeared or unstable |
| Combo | `Precise` | `Centered + Focused` | stable, clear center image |
| Combo | `Diffuse` | `Wide + Blurred` | spread out but less focused |

Design notes:
- This should be the first spatial region because left/right/center is easiest to train.
- `Focused` and `Blurred` should be taught after position basics, not before.
- Use mono or near-mono source material for early position training.

### Region 2: Width And Separation

Theme: how broad the sound field is and how much space exists between parts.

Elements involved:
- `Wide`
- `Narrow`
- `Separated`
- `Crowded`

Roadmap:

```text
Wide + Separated
      |
  Panoramic

Narrow + Crowded
      |
  Boxed In
```

Bridge recipes:
- `Spacious` uses `Wide` plus room impression.
- `Diffuse` uses `Wide` plus `Blurred`.
- `Holographic` uses `Separated` plus focus and space cues.

Table:

| Stage | Card | Recipe | Role |
|---|---|---|---|
| Element | `Wide` | basic | sound field extends outward |
| Element | `Narrow` | basic | sound field collapses inward |
| Element | `Separated` | basic | parts are easier to distinguish spatially |
| Element | `Crowded` | basic | parts overlap spatially or feel bunched together |
| Combo | `Panoramic` | `Wide + Separated` | broad field with clear spacing |
| Combo | `Boxed In` | `Narrow + Crowded` | cramped, small spatial field |

Design notes:
- This region is more reliable with stereo material than mono material.
- It likely needs stereo width, correlation, crossfeed, or decorrelation DSP for strong implementation.
- Avoid the word `Congested` here because it already belongs to the spectral atlas.

### Region 3: Depth And Space

Theme: how close/far the sound feels and how much room surrounds it.

Elements involved:
- `Near`
- `Far`
- `Dry`
- `Reverberant`

Roadmap:

```text
Near + Dry
      |
  Intimate

Far + Reverberant
      |
  Set Back

Wide + Reverberant
      |
  Spacious
```

Bridge recipes:
- `Spacious` bridges width and room impression.
- `Holographic` uses focus, separation, and spaciousness.

Table:

| Stage | Card | Recipe | Role |
|---|---|---|---|
| Element | `Near` | basic | source feels close and direct |
| Element | `Far` | basic | source feels set back |
| Element | `Dry` | basic | little room or reflection |
| Element | `Reverberant` | basic | more room/reflection around the sound |
| Combo | `Intimate` | `Near + Dry` | close, direct presentation |
| Combo | `Set Back` | `Far + Reverberant` | farther away with room around it |
| Combo | `Spacious` | `Wide + Reverberant` | large open scene impression |

Design notes:
- This region maps well to the current `depthNorm` implementation.
- `Dry` and `Reverberant` are partly available through current reflection mix, but a future reverb module would make them stronger.
- `Far` must be taught against spectral `Distant`, because both can make the listener say "far away."

## Core Descriptor Catalog

These are candidate spatial cards. They should not be treated as final implementation data yet.

| ID | Label | Primary region | Summary | Listen for | Aliases / icon variants |
|---|---|---|---|---|---|
| `left` | `Left` | Position And Image | Source sits left of center. | Vocal, click, snare, or lead line pulling to the left. | left-shifted |
| `right` | `Right` | Position And Image | Source sits right of center. | Vocal, click, snare, or lead line pulling to the right. | right-shifted |
| `centered` | `Centered` | Position And Image | Source locks into the middle. | Lead vocal, mono snare, bass, or kick anchored in the center. | center, anchored |
| `focused` | `Focused` | Position And Image | Source has a clear and stable image. | Vocal or instrument is easy to point at. | sharp image, stable |
| `blurred` | `Blurred` | Position And Image | Source image is smeared or unstable. | Vocal/instrument spreads without a clear location. | fuzzy, smeared |
| `wide` | `Wide` | Width And Separation | Sound field extends outward. | Sides feel open; stereo elements reach farther left/right. | broad, expanded |
| `narrow` | `Narrow` | Width And Separation | Sound field collapses inward. | Stereo picture feels small or close to mono. | collapsed, small |
| `separated` | `Separated` | Width And Separation | Parts are easier to distinguish spatially. | Instruments occupy distinct places. | spaced, sorted |
| `crowded` | `Crowded` | Width And Separation | Parts overlap spatially or feel bunched together. | Instruments bunch up and are harder to locate separately. | clustered, overlapped |
| `near` | `Near` | Depth And Space | Source feels close and direct. | Vocal or instrument feels close to the head/face. | close, upfront |
| `far` | `Far` | Depth And Space | Source feels set back. | Vocal/instrument recedes; directness decreases. | recessed, remote |
| `dry` | `Dry` | Depth And Space | Little room or reflection surrounds the sound. | Direct sound with minimal tail or ambience. | direct, roomless |
| `reverberant` | `Reverberant` | Depth And Space | More room/reflection surrounds the sound. | Room tails, ambience, and reflected energy. | roomy, echoing |

## Descriptor Detail Notes

### Left

Player-facing meaning:
- The source moves to the left side of the stereo image.
- The listener can point left of center.

Technical meaning:
- Primarily driven by ILD and ITD in headphone playback.
- Current engine supports this through `azimuthDeg < 0`.

Best material:
- Mono vocal, click, snare, percussion, lead instrument, short broadband sounds.

Implementation note:
- Fully feasible with the current spatial engine.

### Right

Player-facing meaning:
- The source moves to the right side of the stereo image.
- The listener can point right of center.

Technical meaning:
- Primarily driven by ILD and ITD in headphone playback.
- Current engine supports this through `azimuthDeg > 0`.

Best material:
- Mono vocal, click, snare, percussion, lead instrument, short broadband sounds.

Implementation note:
- Fully feasible with the current spatial engine.

### Centered

Player-facing meaning:
- The sound locks into the middle.
- It feels balanced between the ears.

Technical meaning:
- Equal or near-equal left/right cues.
- Current engine supports this through `azimuthDeg = 0`.

Best material:
- Lead vocal, mono snare, bass, kick, spoken voice.

Implementation note:
- Fully feasible with the current spatial engine.
- With headphones, center image may feel "inside the head"; that is acceptable for current scope.

### Focused

Player-facing meaning:
- The source has a clear outline.
- It is easy to locate and does not smear across the image.

Technical meaning:
- High inter-channel correlation for the source.
- Limited reflection/decorrelation smear.
- Stable ILD/ITD cues.

Best material:
- Lead vocal, solo instrument, click, centered percussion.

Implementation note:
- Partly feasible now by keeping reflections low and position stable.
- Stronger implementation would use correlation/crossfeed controls and multi-source scenes.

### Blurred

Player-facing meaning:
- The source loses a clear outline.
- It spreads or wobbles instead of staying point-like.

Technical meaning:
- Reflection smear, decorrelation, unstable image cues, or excessive crossfeed/delay interactions.

Best material:
- Lead vocal, mono instrument, short percussive sources.

Implementation note:
- Partly feasible now through increased reflection mix and small decorrelation/delay behavior.
- Better with future stereo decorrelation controls.

### Wide

Player-facing meaning:
- The sound field stretches outward.
- The sides feel broader and more open.

Technical meaning:
- Increased side energy, reduced crossfeed, or decorrelated side information.
- In mid-side terms, this often means more side relative to mid.

Best material:
- Stereo music with side content, backing vocals, guitars, synths, room mics.

Implementation note:
- Current engine is not a full stereo-width tool because it pre-blends toward mono for spatialization.
- Future mid-side width or crossfeed controls would make this strong.

### Narrow

Player-facing meaning:
- The sound field shrinks inward.
- Stereo presentation feels smaller or closer to mono.

Technical meaning:
- Reduced side energy, increased mono compatibility, or stronger crossfeed/mono blend.

Best material:
- Stereo music with obvious width.

Implementation note:
- Feasible now through mono blend behavior if exposed as a control.
- Stronger with dedicated stereo-width control.

### Separated

Player-facing meaning:
- Instruments have room between them.
- It is easier to follow individual parts spatially.

Technical meaning:
- Clear spatial distribution, stable image cues, enough width, and low masking between sources.
- Can be partly spectral too, so use careful examples.

Best material:
- Stereo mixes with several instruments, sparse arrangements, acoustic ensembles.

Implementation note:
- Partly feasible now with stereo material and width/focus controls.
- Stronger with multi-source test scenes or stem-based examples.

### Crowded

Player-facing meaning:
- Parts feel bunched together.
- The image feels busy or overlapped.

Technical meaning:
- Reduced spatial separation, narrowed field, blurred image cues, or source overlap.
- Avoid calling this `Congested` because that is already a spectral masking card.

Best material:
- Dense mixes, layered vocals/guitars, ensemble passages.

Implementation note:
- Partly feasible with narrow/blurred settings and dense stereo material.
- Stronger with multi-source scenes.

### Near

Player-facing meaning:
- The source feels close and direct.
- It may feel inside or just in front of the head in headphones.

Technical meaning:
- Higher direct level, less high-frequency loss, lower reflection mix, shorter reflection delay.
- Current engine supports this with low `depthNorm`.

Best material:
- Voice, solo instrument, percussion, dry recordings.

Implementation note:
- Feasible with current engine.

### Far

Player-facing meaning:
- The source feels set back.
- It has less directness and less close presence.

Technical meaning:
- Lower direct level, more high-frequency rolloff, more reflection mix, longer reflection delay.
- Current engine supports this with high `depthNorm`.

Best material:
- Voice, solo instrument, percussion, sparse mixes.

Implementation note:
- Feasible with current engine.
- Teach against spectral `Distant`, which is an EQ recipe rather than true distance rendering.

### Dry

Player-facing meaning:
- The source has little room around it.
- It feels direct and exposed.

Technical meaning:
- Low reflection/reverb energy.
- High direct-to-reverberant ratio.

Best material:
- Voice, close-mic instruments, drums, dry loops.

Implementation note:
- Partly feasible now by minimizing reflection mix.
- Stronger with future reverb controls.

### Reverberant

Player-facing meaning:
- The sound has room around it.
- Tails and ambience extend after the direct sound.

Technical meaning:
- Higher reflection/reverb energy and longer decay.
- Current engine has reflection mix/delay but not a full reverb model.

Best material:
- Vocals, snare, piano, acoustic instruments, sparse arrangements.

Implementation note:
- Partly feasible now.
- Future reverb DSP should add room size, decay, damping, and wet/dry controls.

## Candidate Spatial Recipes

Recipe labels should name a recognizable spatial state. Ingredient descriptors should remain inspectable after unlock.

### Recipe Catalog

| ID | Discovery | Ingredients | Tier | Primary region | Meaning | Technical feasibility |
|---|---|---|---|---|---|---|
| `precise` | `Precise` | `Centered + Focused` | Combo | Position And Image | Stable, clear center image. | Feasible now for centered source; stronger with image-focus controls. |
| `diffuse` | `Diffuse` | `Wide + Blurred` | Combo | Position And Image | Spread out but unfocused. | Partial now; stronger with decorrelation/width DSP. |
| `panoramic` | `Panoramic` | `Wide + Separated` | Combo | Width And Separation | Broad scene with clear spacing. | Partial now; stronger with stereo width and multi-source scenes. |
| `boxed_in` | `Boxed In` | `Narrow + Crowded` | Combo | Width And Separation | Cramped, small spatial field. | Partial now; feasible with mono blend/narrowing. |
| `intimate` | `Intimate` | `Near + Dry` | Combo | Depth And Space | Close, direct presentation. | Feasible now. |
| `set_back` | `Set Back` | `Far + Reverberant` | Combo | Depth And Space | Farther away with room around it. | Feasible now as approximation. |
| `spacious` | `Spacious` | `Wide + Reverberant` | Combo | Depth And Space | Large open scene impression. | Partial now; stronger with reverb/width DSP. |
| `holographic` | `Holographic` | `Focused + Separated + Spacious` | Big combo | Width And Separation | Focused, separated, and spacious image. | Future-facing; requires stronger spatial DSP. |

### Region Recipe Map

| Region | Internal recipes | Bridge recipes |
|---|---|---|
| Position And Image | `Precise` | `Diffuse`, `Holographic` |
| Width And Separation | `Panoramic`, `Boxed In` | `Diffuse`, `Spacious`, `Holographic` |
| Depth And Space | `Intimate`, `Set Back` | `Spacious`, `Holographic` |

### Combo Recipe Details

#### Precise

Player-facing identity:
- The center image is stable and easy to point at.
- The source has a clear outline.

Technical reading:
- `Centered` supplies balanced left/right position.
- `Focused` supplies stable image definition.

Implementation:
- Feasible now for mono/centered material with low reflection and stable azimuth.
- Stronger with future focus/correlation controls.

Good A/B prompt:
- Which sample has the clearest, most stable center image?

#### Diffuse

Player-facing identity:
- The sound spreads outward, but the source outline gets vague.
- It feels less point-like.

Technical reading:
- `Wide` supplies spread.
- `Blurred` supplies reduced focus.

Implementation:
- Partly feasible now with reflection and decorrelation-like behavior.
- Stronger with side decorrelation and stereo width controls.

Good A/B prompt:
- Which sample spreads out but becomes harder to locate precisely?

#### Panoramic

Player-facing identity:
- The scene feels broad and well laid out.
- Parts have room across the stereo field.

Technical reading:
- `Wide` supplies field size.
- `Separated` supplies distinguishable positions.

Implementation:
- Partly feasible with stereo material.
- Stronger with mid-side width controls and multi-source/stem examples.

Good A/B prompt:
- Which sample feels broader while still keeping parts apart?

#### Boxed In

Player-facing identity:
- The image feels small, cramped, and bunched up.
- There is little room between parts.

Technical reading:
- `Narrow` supplies reduced field width.
- `Crowded` supplies source overlap.

Implementation:
- Partly feasible by increasing mono blend and reducing spatial spread.
- Stronger with multi-source examples.

Good A/B prompt:
- Which sample feels most cramped or spatially small?

#### Intimate

Player-facing identity:
- The source feels close and direct.
- There is little room between the listener and the performance.

Technical reading:
- `Near` supplies close distance.
- `Dry` supplies low room/reflection.

Implementation:
- Feasible now with low `depthNorm` and low reflection mix.

Good A/B prompt:
- Which sample feels closest and most direct?

#### Set Back

Player-facing identity:
- The source moves away and gains more room around it.
- It feels behind the close plane.

Technical reading:
- `Far` supplies depth.
- `Reverberant` supplies reflected room energy.

Implementation:
- Feasible now as an approximation with higher `depthNorm`, high-frequency rolloff, and more reflection.

Good A/B prompt:
- Which sample feels farther away rather than simply darker?

#### Spacious

Player-facing identity:
- The scene feels open and roomy.
- There is a larger sense of space around the music.

Technical reading:
- `Wide` supplies lateral size.
- `Reverberant` supplies room impression.

Implementation:
- Partly feasible now.
- Stronger with stereo width plus real reverb controls.

Good A/B prompt:
- Which sample feels like it occupies the larger space?

### Big Combo Recipe Details

#### Holographic

Player-facing identity:
- The image feels dimensional, separated, and easy to inspect.
- Sources feel placed in a convincing space rather than merely wide.

Technical reading:
- `Focused` supplies image clarity.
- `Separated` supplies distinguishable source positions.
- `Spacious` supplies width plus room impression.

Implementation:
- Future-facing.
- Needs stronger spatial DSP than the current single-source azimuth/depth path: stereo width, focus/correlation, reverb, and ideally multi-source scenes.

Good A/B prompt:
- Which sample feels most three-dimensional and easiest to map in space?

### Evolution Relationships

| Higher card | Contains lower card(s) | Evolution reading |
|---|---|---|
| `Holographic` | `Spacious`, conceptual bridge from `Precise` and `Panoramic` | A convincing image needs space, separation, and focus. |
| `Spacious` | none directly, but bridges `Wide` and `Reverberant` | Space is not just width or reverb; it is both. |
| `Diffuse` | conceptual opposite of `Precise` | Width without focus becomes diffuse. |
| `Boxed In` | conceptual opposite of `Panoramic` | Narrowing plus crowding removes the open scene. |

Recipe guardrails:
- Do not let discovery cards add hidden DSP unless the player can inspect the underlying recipe.
- Prefer one derived spatial profile for a recipe rather than stacking unrelated spatial effects blindly.
- Keep front/back and height language out of version 1 unless HRTF/front-back DSP is actually added.

## Technical Feasibility

### Basic Descriptor Feasibility

| Descriptor | Current implementation status | Suggested current DSP approach |
|---|---|---|
| `Left` | feasible | Negative azimuth using ITD/ILD. |
| `Right` | feasible | Positive azimuth using ITD/ILD. |
| `Centered` | feasible | Zero azimuth with stable level balance. |
| `Focused` | partial | Low reflection, stable cues, future correlation control. |
| `Blurred` | partial | Reflection/decorrelation smear, future stereo decorrelation. |
| `Wide` | partial | Needs stereo width or side-energy control. |
| `Narrow` | partial/feasible | Mono blend or width reduction. |
| `Separated` | partial | Needs stereo material or multi-source scenes. |
| `Crowded` | partial | Narrowing plus blurred/multi-source overlap. |
| `Near` | feasible | Low depth, high direct level, little HF loss, low reflection. |
| `Far` | feasible | High depth, lower level, HF rolloff, more reflection. |
| `Dry` | partial/feasible | Minimize reflection/reverb energy. |
| `Reverberant` | partial | Reflection mix now; future reverb for stronger examples. |

### Recipe Feasibility

| Recipe | Technically possible now? | Notes |
|---|---|---|
| `Precise` | yes/partial | Works for center source; focus controls would improve it. |
| `Diffuse` | partial | Needs width/decorrelation for clear examples. |
| `Panoramic` | partial | Needs stereo width and source separation cues. |
| `Boxed In` | partial | Can approximate with mono blend/narrowing. |
| `Intimate` | yes | Current depth/reflection model can support it. |
| `Set Back` | yes/partial | Current depth model can approximate; real reverb improves it. |
| `Spacious` | partial | Needs width plus room/reverb. |
| `Holographic` | future | Needs stronger spatial rendering and likely multi-source material. |

### Recommended Profile Strategy

Do not treat spatial recipes as extra hidden effects. Treat them as named profiles built from readable cues.

Use this pattern:

1. Player selects basics or unlocks recipe.
2. UI shows the ingredient recipe.
3. Audio engine receives one derived spatial profile.
4. If a cue is not technically available yet, mark the descriptor as future-facing or use it only as an alias/outcome icon.

Example profiles for exploration, not final calibration:

| Card | Azimuth | Depth | Width/mono | Reflection | Expected cue |
|---|---:|---:|---:|---:|---|
| `Left` | `-60 deg` | `0.0` | default | low | left position |
| `Right` | `+60 deg` | `0.0` | default | low | right position |
| `Centered` | `0 deg` | `0.0` | default | low | center image |
| `Near` | `0 deg` | `0.0` | default | low | close/direct |
| `Far` | `0 deg` | `1.0` | default | high | set back |
| `Intimate` | `0 deg` | `0.0` | narrow/center | very low | close and dry |
| `Set Back` | `0 deg` | `1.0` | default | high | far and roomy |
| `Boxed In` | `0 deg` | `0.3` | narrow | low/medium | cramped image |
| `Spacious` | `0 deg` | `0.6` | wide | medium/high | open space |

Calibration notes:
- The current engine exposes azimuth and depth, but not all width/reflection parameters as independent user-facing controls.
- Training profiles should be calibrated on headphones with actual app tracks.
- Mono source material is best for position; stereo source material is best for width and separation.

## Alias And Icon Strategy

Alias descriptors can still have icons without becoming playable basic cards.

Recommended alias/outcome icon mapping:

| Icon label | Anchor card | Role |
|---|---|---|
| `Open` | `Spacious` or `Wide` | General spatial openness. |
| `Expansive` | `Wide` / `Panoramic` | Width variant. |
| `Pinpoint` | `Precise` | Focused localization variant. |
| `Stable` | `Focused` / `Precise` | Image stability variant. |
| `Fuzzy` | `Blurred` | Casual blur variant. |
| `Clustered` | `Crowded` | Crowding variant. |
| `Recessed` | `Far` / `Set Back` | Depth variant. |
| `Remote` | `Far` | More extreme distance variant. |
| `Roomy` | `Reverberant` / `Spacious` | Room impression variant. |
| `Holographic` | `Holographic` | Advanced outcome icon; not a basic. |

## Training Design Notes

Useful A/B questions:
- Which sample is farther left or right?
- Which sample has the clearer center image?
- Which sample feels wider?
- Which sample makes the parts easier to separate?
- Which sample feels closer?
- Which sample has more room around it?

Useful source material:
- Mono vocal or click for left/right/center.
- Dry voice for near/far and dry/reverberant.
- Stereo acoustic or pop mixes for width and separation.
- Sparse arrangements for focus and separation.
- Dense mixes for crowded/boxed-in comparisons.

Testing cautions:
- Headphones or earbuds should be required for spatial training.
- Stereo widening can alter tone, so watch for spectral confusion.
- Reverb can make sounds seem both farther and duller; teach `Far` against spectral `Distant`.
- Some spatial words depend on the source mix. A mono source cannot demonstrate separation well.
- Keep front/back and height out of the first playable vocabulary unless the DSP supports those cues.

## Future DSP

Future DSP that would make the spatial vocabulary stronger:
- Stereo width / mid-side gain control.
- Crossfeed control.
- Stereo decorrelation.
- Early reflection controls independent of depth.
- Real reverb with room size, decay, damping, and wet/dry.
- Multi-source or stem-based training scenes for separation/crowding.
- HRTF rendering for stronger externalization, front/back, and height cues.
- Optional head-tracking after the basic training path is stable.

## External Vocabulary Alignment

Formal listening-test language treats spatial attributes as part of audio quality, not merely tone color. Useful alignment points:

- ITU-R BS.1116 discusses localization, frontal image quality, surround/environment impression, envelopment, and spatial fidelity.
- ITU-R BS.1284 includes stereophonic image distortion, crosstalk, localization instability, and spatial impression among subjective audio impairment categories.
- AES subjective-evaluation vocabulary commonly separates timbre, spatial image, distortion, and dynamics.

References:
- https://www.itu.int/rec/R-REC-BS.1116/en
- https://www.itu.int/rec/R-REC-BS.1284/en
- https://aes2.org/community/technical-council/aes-technical-committee-perception-and-subjective-evaluation-of-audio-signals/

## Confusion Rules

Keep this section at the end so descriptor design can be read first, then checked against likely vocabulary collisions.

| Listener word | First check | Then check |
|---|---|---|
| distant | Spectral `Distant` if center body/detail is cut | Spatial `Far` or `Set Back` if distance cues are rendered |
| airy | Spectral `Airy` if the top octave is lifted | Spatial `Spacious` or `Wide` if the image/room is larger |
| congested | Spectral `Congested` if masking/EQ is the issue | Spatial `Crowded` or `Boxed In` if sources overlap spatially |
| hollow | Spectral `Hollow` if the center body is scooped | Spatial `Far`, `Reverberant`, or `Set Back` if depth/room creates distance |
| focused | Spatial `Focused` if the source is easier to locate | Spectral clarity if detail/treble makes it easier to hear |
| wide | Spatial `Wide` if the left/right image expands | Spectral `Exciting`/`Airy` if brightness creates perceived openness |
| separated | Spatial `Separated` if locations are clearer | Spectral reduced masking if frequency balance makes parts clearer |
| intimate | Spatial `Near + Dry` | Spectral `Warm`/`Full` if closeness comes from body rather than distance |
