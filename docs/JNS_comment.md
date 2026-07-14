# JNS Comment — Spectral Gate Descriptor Difficulty

Feedback source: colleague (experienced listener) reports that the spectral descriptors are too difficult to differentiate in all three gates (Bass, Mid, Treble). If an experienced listener struggles, newcomers — the target audience for this educational game — will find it even harder.

## The Problem, Diagnosed

### Bass gate

The Bass gate presents six basic descriptors across a narrow frequency range with overlapping perceptual qualities:

| Descriptor | Center | Gain | Q | Character |
|---|---:|---:|---:|---|
| `Rumble` | 35 Hz | +4.0 dB | 0.7 | sub-bass, felt not heard |
| `Thump` | 55 Hz | +3.0 dB | 0.9 | low-bass impact |
| `Boomy` | 70 Hz | +4.5 dB | 0.65 | low-bass bloom |
| `Punchy` | 95 Hz | +3.5 dB | 1.2 | upper-bass attack |
| `Thin` | 100 Hz | −5.0 dB | 0.7 | bass/body loss (cut) |
| `Muddy` | 125 Hz | +4.5 dB | 0.8 | upper-bass cloud |

### Why differentiation is hard

1. **Compressed frequency span.** All six boost descriptors sit within a two-octave range (35–125 Hz). By contrast, the Treble gate spans roughly three octaves (4–14 kHz), and the Mid gate spans roughly three-and-a-half octaves (250–2600 Hz). Human frequency resolution is *worse* in the low end (critical bandwidth is broader below 200 Hz), so packing more descriptors into fewer resolvable bands makes them harder to tell apart.

2. **Adjacent center frequencies.** `Thump` (55 Hz) and `Boomy` (70 Hz) are only about a third of an octave apart. `Punchy` (95 Hz) and `Thin` (100 Hz) are barely a semitone apart in center frequency, though the EQ direction is opposite. `Punchy` (95 Hz) and `Muddy` (125 Hz) are less than half an octave apart. These are within the same auditory critical band for many listeners.

3. **Broad Q values cause overlap.** Most bass descriptors use broad Q values (0.65–0.9), meaning their filter skirts overlap significantly. A listener hearing `Boomy` at 70 Hz with Q 0.65 is also hearing energy at 55 Hz and 95 Hz, blurring the distinction from `Thump` and `Punchy`.

4. **Similar perceptual character.** `Thump`, `Boomy`, and `Punchy` are all low-frequency boosts that make things "bassier." Their textual descriptions differ (impact vs bloom vs attack), but without training, listeners perceive all three as "more bass." `Rumble` may be felt more than heard on typical playback equipment, making it hard to distinguish from general bass increase.

5. **Playback equipment dependency.** Many headphones and speakers have their own bass resonances, roll-offs, or room modes that mask or distort fine sub-bass differences. `Rumble` at 35 Hz is inaudible on most laptop speakers and many earbuds.

6. **The blind trial confuser design is narrow.** In the current listening challenges, the confusers within the Bass gate are almost always other bass-boost descriptors or `Thin`. For example, `Thump` vs `Boomy` vs `Thin` — two of those three are perceptually very close boosts, and the only clearly different one is the cut direction (`Thin`). This makes the task "pick which boost" rather than "identify the character," which is genuinely hard.

### Mid and Treble gates — same structural problem

The Mid gate has six descriptors across a wider range (250–2600 Hz), but the same confuser pattern makes several trials collapse to a hard 2AFC. `Warm` (250 Hz) vs `Boxy` (350 Hz) is especially close — less than half an octave. `Honky` (900 Hz) vs `Nasal` (1800 Hz) is easier because it's a full octave apart.

The Treble gate has six descriptors (4–14 kHz). `Glassy` (6.3 kHz) vs `Sibilant` (8 kHz) and `Sibilant` (8 kHz) vs `Bright` (10 kHz) are both tight pairings — about a third of an octave each.

### The "Cut Anchor as Freebie" problem — all three gates

Every spectral blind trial must include the gate's cut anchor (`Thin`, `Hollow`, or `Dull`). This is documented as testing "both frequency area and direction." In practice, the cut is so perceptually different from the boosts that any listener — even a newcomer — can eliminate it immediately. This reduces every 3AFC trial to a 2AFC between two similar-sounding boosts:

**Bass gate — real task after eliminating `Thin`:**

| Target | Confusers | Effective 2AFC |
|---|---|---|
| `Thump` | `Boomy`, `Thin` | Thump vs Boomy (55 Hz vs 70 Hz — very hard) |
| `Rumble` | `Boomy`, `Thin` | Rumble vs Boomy (35 Hz vs 70 Hz) |
| `Punchy` | `Thin`, `Thump` | Punchy vs Thump (95 Hz vs 55 Hz) |
| `Muddy` | `Boomy`, `Thin` | Muddy vs Boomy (125 Hz vs 70 Hz) |

**Mid gate — real task after eliminating `Hollow`:**

| Target | Confusers | Effective 2AFC |
|---|---|---|
| `Honky` | `Hollow`, `Boxy` | Honky vs Boxy (900 Hz vs 350 Hz) |
| `Warm` | `Hollow`, `Boxy` | Warm vs Boxy (250 Hz vs 350 Hz — hard) |
| `Nasal` | `Hollow`, `Honky` | Nasal vs Honky (1800 Hz vs 900 Hz) |
| `Shouty` | `Hollow`, `Honky` | Shouty vs Honky (2600 Hz vs 900 Hz) |

**Treble gate — real task after eliminating `Dull`:**

| Target | Confusers | Effective 2AFC |
|---|---|---|
| `Harsh` | `Bright`, `Dull` | Harsh vs Bright (4 kHz vs 10 kHz) |
| `Sibilant` | `Dull`, `Bright` | Sibilant vs Bright (8 kHz vs 10 kHz — hard) |
| `Glassy` | `Dull`, `Sibilant` | Glassy vs Sibilant (6.3 kHz vs 8 kHz — hard) |
| `Airy` | `Bright`, `Dull` | Airy vs Bright (14 kHz vs 10 kHz) |

The cut anchor is intended to teach boost/cut discrimination, but that lesson is learned after one or two trials. After that, it just inflates the apparent option count without adding useful difficulty. The player is effectively always solving a two-way problem dressed up as a three-way problem.

### Cross-gate confuser proposal

Instead of pairing same-gate-cut + same-gate-boost as confusers, use the **same-gate-cut + a cross-gate-boost** from a different frequency region:

**Proposed Bass gate confuser structure:**

| Target | Option A | Option B | Option C |
|---|---|---|---|
| bass boost target | bass boost (target) | `Thin` (bass cut) | mid boost (e.g. `Warm` or `Boxy`) |

**Proposed Mid gate confuser structure:**

| Target | Option A | Option B | Option C |
|---|---|---|---|
| mid boost target | mid boost (target) | `Hollow` (mid cut) | treble boost (e.g. `Bright`) or bass boost (e.g. `Boomy`) |

**Proposed Treble gate confuser structure:**

| Target | Option A | Option B | Option C |
|---|---|---|---|
| treble boost target | treble boost (target) | `Dull` (treble cut) | mid boost (e.g. `Honky` or `Shouty`) |

### Finalized cross-gate confuser assignments

Design principle: for each trial, offer **target (same-gate boost) + same-gate cut anchor + cross-gate boost**. The cross-gate boost should be clearly in a different frequency region — far enough that the three-way choice is genuinely three-way, and varied across exercises to expose the player to different frequency regions.

#### Bass gate confusers

All use `Thin` (100 Hz, −5 dB) as the cut anchor. Cross-gate confuser from the **mid** region.

| Target | Cross-gate confuser | Gap | Why this confuser |
|---|---|---:|---|
| `Thump` (55 Hz) | `Warm` (250 Hz) | ~2.2 oct | Low-mid body is the nearest clearly-distinct mid sound. Tests "bass impact" vs "mid warmth" — a common beginner confusion |
| `Rumble` (35 Hz) | `Boxy` (350 Hz) | ~3.3 oct | Cabinet enclosure vs sub-bass floor pressure — very different character. Rumble is felt, Boxy is heard as a small-speaker shape |
| `Punchy` (95 Hz) | `Warm` (250 Hz) | ~1.4 oct | Focused bass attack vs broad mid-body. Both can make things sound "fuller" but in clearly different bands |
| `Muddy` (125 Hz) | `Honky` (900 Hz) | ~2.8 oct | Bass cloud vs cup-like mid projection. Both are "coloration" but in opposite regions — good ear-training contrast |

#### Mid gate confusers

All use `Hollow` (600 Hz, −5 dB) as the cut anchor. Cross-gate confuser from **bass** or **treble**, chosen to maximise separation from the target's position within the mid range.

| Target | Cross-gate confuser | Gap | Why this confuser |
|---|---|---:|---|
| `Honky` (900 Hz) | `Boomy` (70 Hz, bass) | ~3.7 oct | Bass bloom vs mid projection — very different feeling. Uses a bass gift descriptor |
| `Warm` (250 Hz) | `Bright` (10 kHz, treble) | ~5.3 oct | Warm sits at the bottom of mid, so a treble confuser provides maximum contrast. Uses a treble gift descriptor |
| `Nasal` (1800 Hz) | `Boomy` (70 Hz, bass) | ~4.7 oct | Bass bloom vs nasal resonance — maximally distant, no chance of confusion |
| `Shouty` (2600 Hz) | `Bright` (10 kHz, treble) | ~1.9 oct | Shouty sits near the top of mid. Bright is a broader, open shimmer vs Shouty's aggressive forward push — clearly different character |

Pattern: centre-mid targets (`Honky`, `Nasal`) use **bass** confusers, while edge-mid targets (`Warm`, `Shouty`) use **treble** confusers. This alternation also exposes the player to both bass and treble sounds during mid-gate training.

#### Treble gate confusers

All use `Dull` (6.5 kHz, −5 dB) as the cut anchor. Cross-gate confuser from the **mid** region.

| Target | Cross-gate confuser | Gap | Why this confuser |
|---|---|---:|---|
| `Harsh` (4 kHz) | `Honky` (900 Hz) | ~2.1 oct | Cup-like mid projection vs treble edge. Harsh is the lowest treble descriptor, so a nearby mid confuser tests whether the player hears the treble bite or the mid colour |
| `Sibilant` (8 kHz) | `Nasal` (1800 Hz) | ~2.1 oct | Nose-like resonance vs consonant sizzle. Narrow upper-mid vs narrow upper-treble — clearly different bands |
| `Glassy` (6.3 kHz) | `Boxy` (350 Hz) | ~4.2 oct | Cabinet enclosure vs reflective treble sheen — maximally distinct. Also helps the player hear how far apart low-mid and upper-treble really are |
| `Airy` (14 kHz) | `Shouty` (2600 Hz) | ~2.4 oct | Aggressive presence vs floating high air — both are "forward" but in completely different bands |

Pattern: each treble exercise uses a **different** mid confuser (`Honky`, `Nasal`, `Boxy`, `Shouty`), giving the player exposure to four different mid-range characters during treble-gate training.

#### Quick-reference table

| Gate | Target | Cut anchor | Cross-gate confuser |
|---|---|---|---|
| Bass | `Thump` | `Thin` | `Warm` |
| Bass | `Rumble` | `Thin` | `Boxy` |
| Bass | `Punchy` | `Thin` | `Warm` |
| Bass | `Muddy` | `Thin` | `Honky` |
| Mid | `Honky` | `Hollow` | `Boomy` |
| Mid | `Warm` | `Hollow` | `Bright` |
| Mid | `Nasal` | `Hollow` | `Boomy` |
| Mid | `Shouty` | `Hollow` | `Bright` |
| Treble | `Harsh` | `Dull` | `Honky` |
| Treble | `Sibilant` | `Dull` | `Nasal` |
| Treble | `Glassy` | `Dull` | `Boxy` |
| Treble | `Airy` | `Dull` | `Shouty` |

**What this changes about the task:**

The current task is: "which of these two same-band boosts is the right one?" (hard within-band discrimination).

The proposed task becomes: "is this a bass-region boost, a mid-region boost, or a bass cut?" — which is really **frequency region identification** plus **direction identification**.

**Pros:**

- All three options are genuinely perceptually distinct. No more freebie elimination.
- The task now teaches the most important first skill: *where on the spectrum* is the change happening? This is the foundation for everything that follows.
- Newcomers can succeed and build confidence before being asked to make harder within-band distinctions.
- The cut anchor is still present, so boost/cut direction learning is preserved.
- Cross-gate confusers implicitly teach the player what *other* frequency regions sound like — even before they reach those gates. The confusers are hidden (A/B/C), so the player does not need to know the confuser's name.

**Cons and considerations:**

- It does **not** teach fine within-band discrimination (e.g. Thump vs Boomy). That skill needs to be taught somewhere else — either a second stage within the gate, in Atlas region crafting, or in Calibration Tower.
- The player might pass the gate thinking they can distinguish `Thump` from `Boomy` when they actually only learned "this is somewhere in the bass, not the mids." The gate would need to be honest about what it teaches.
- Cross-gate confusers use descriptors the player may not have learned yet. This is acceptable because confusers are hidden (A/B/C) — the player does not need to identify them by name, only hear that they are in a different frequency region.
- The current cut-anchor rule in the docs explicitly states the purpose is to teach "both frequency area and direction." Cross-gate confusers actually serve that purpose *better* than same-gate confusers, because they test region discrimination directly.

**Recommendation: two-layer approach**

Use cross-gate confusers as **Layer 1** (gate entry, first-time learning), then add same-gate confusers as **Layer 2** (mastery, re-challenge, or Calibration Tower):

| Layer | Task | When |
|---|---|---|
| Layer 1 | same-gate-cut + cross-gate-boost + target boost | First catch and initial unlocks (learn *where*) |
| Layer 2 | same-gate-cut + same-gate-boost + target boost | Advanced re-challenge or Calibration Tower (learn *which*) |

This way the gate teaches region identification first, and the finer within-band discrimination is either a second pass through the gate or a Calibration Tower challenge.

> [!IMPORTANT]
> This is a structural redesign of the spectral confuser system. It would require changes to `listeningChallenges.ts`, the Training Grounds documentation, and possibly the gate data model if layered challenges are introduced. However, the code change itself is small — each challenge definition just needs different `confuserIds`.


## Additional Suggestions (Bass-Specific)

The suggestions below were initially written for the Bass gate but many apply to all three spectral gates.

### Suggestion 1: Widen the EQ separation between bass descriptors

Spread the center frequencies further apart and/or use narrower Q for some descriptors to reduce filter overlap.

Possible revised values:

| Descriptor | Current | Suggested | Rationale |
|---|---|---|---|
| `Rumble` | 35 Hz, Q 0.7 | 30 Hz, Q 0.5 | Push deeper, tighten — makes it more "felt" and less audibly bass |
| `Thump` | 55 Hz, Q 0.9 | 55 Hz, Q 1.2 | Tighter Q so it doesn't bleed into Boomy territory |
| `Boomy` | 70 Hz, Q 0.65 | 80 Hz, Q 0.6 | Move up slightly to open the gap from Thump |
| `Punchy` | 95 Hz, Q 1.2 | 100 Hz, Q 1.5 | Already the tightest; push a bit narrower to sound more "attack" |
| `Muddy` | 125 Hz, Q 0.8 | 150 Hz, Q 0.7 | Move up to better separate from Punchy |

> [!NOTE]
> Any frequency changes would affect Discovery recipes and the HARMAN chart ladder. All downstream references in `descriptor-spectral-descriptors.md`, `descriptor-detail-pages.md`, and the Calibration Tower answer sets should be checked for consistency.

### Suggestion 2: Increase gain exaggeration for training mode

The current `recommendedStartIntensity` is `2.0` for all cards. Consider a bass-gate-specific training intensity of `2.5–3.0` so the differences are louder and more obvious during early learning. The player can later reduce intensity in Sound Lab once they can hear the differences.

This could be a Training Grounds–specific override rather than a global change, preserving the current Sound Lab and Calibration Tower intensity behavior.

### Suggestion 3: Staged gate progression — introduce fewer bass descriptors at once

Instead of exposing all six bass descriptors in one gate, split the learning into sub-stages:

**Stage 1 — "Big vs Missing":**
- Gift pair: `Boomy` + `Thin` (current design, keep this)
- This teaches boost vs cut, which is the easiest bass distinction.

**Stage 2 — "Shape of the Bass":**
- Teach `Thump` vs `Boomy` (short impact vs lingering bloom)
- Confusers: `Thump`, `Boomy`, `Thin`
- Use rhythmic material where `Thump` snaps the kick and `Boomy` makes the tail swell.

**Stage 3 — "The Edges":**
- Teach `Rumble` (sub-bass pressure) and `Punchy` (upper-bass attack) after the player has learned to separate `Thump` from `Boomy`.
- Confusers for `Rumble`: `Thump`, `Thin` (far-apart comparison)
- Confusers for `Punchy`: `Boomy`, `Thin` (current design works well here)

**Stage 4 — "The Cloud":**
- Teach `Muddy` last, as the upper-bass cloud that masks clarity.
- Confusers: `Boomy`, `Thin` (current design)

> [!TIP]
> This staged approach matches how audio training programs (like Harman How to Listen) introduce frequency bands — broad categories first, then finer distinctions.

### Suggestion 4: Add "A/B compare" mode to the trial

Instead of pure blind three-way identification, offer an intermediate training step:

- Show two options side by side: the target and one confuser.
- The player toggles between them and identifies which one matches the target label.
- Graduate to three-way blind after the player has succeeded at pairwise comparison.

This is a standard psychoacoustic training scaffold: pairwise discrimination is easier than three-alternative forced choice (3AFC), and it builds the listener's internal reference before the harder test.

### Suggestion 5: Use different source material per descriptor

Currently, the training uses the same music track for all descriptors in a gate. If certain source tracks better expose certain bass characters, consider assigning recommended or default tracks per descriptor:

| Descriptor | Ideal source material |
|---|---|
| `Rumble` | Sub-heavy electronic, cinematic drones, sustained bass synths |
| `Thump` | Tight kick-drum loops, plucked upright bass |
| `Boomy` | Loose kick recordings, bass guitar in a live room |
| `Punchy` | Drum machines, snappy bass plucks, tight pop kicks |
| `Muddy` | Dense full-band mixes where clarity is already borderline |
| `Thin` | Already-bright or thin acoustic recordings |

> [!IMPORTANT]
> If per-descriptor track assignment is too much work, at minimum consider adding a "recommended track" hint on the trial screen: "Try this with a drum-heavy track."

### Suggestion 6: Add visual/textual hints during early trials

For the first few trials per descriptor, show a brief one-sentence listening cue before the player starts previewing:

- `Rumble`: "Feel for deep floor pressure — you may feel it before you hear it."
- `Thump`: "Listen for a quick low knock, like a kick drum landing."
- `Boomy`: "Listen for bass that swells and lingers after each hit."
- `Punchy`: "Listen for a focused snap in the low end — short and firm."
- `Muddy`: "Listen for a cloudy heaviness that hides detail."
- `Thin`: "Listen for the bass disappearing — the sound gets lighter."

These cues already exist in the detail pages, but they are buried in the card-back view. Surfacing them *before* the listening trial gives the newcomer a frame of reference.

### Suggestion 7: Reduce the Bass gate to four descriptors for beginners

A more radical option: remove `Rumble` and `Punchy` from the Bass gate entirely and make them post-gate unlocks or Atlas discoveries. This reduces the gate to four descriptors with better separation:

| Descriptor | Center | Direction | Perceptual |
|---|---:|---|---|
| `Boomy` | 70 Hz | boost | "more bass, swelling" |
| `Thump` | 55 Hz | boost | "quick bass hit" |
| `Muddy` | 125 Hz | boost | "cloudy, masked" |
| `Thin` | 100 Hz | cut | "bass gone, light" |

`Rumble` and `Punchy` could unlock through:
- Atlas Region A crafting (where `Rumble` already lives as a `Powerful` ingredient).
- A post-gate "advanced bass" challenge after the four core descriptors are confident.
- Sound Lab experimentation with guided comparison cards.

> [!WARNING]
> This changes the Training Grounds gate structure and would require updating `regions.ts`, `listeningChallenges.ts`, and the Training Grounds documentation. It also delays access to the full `Powerful → Energetic → Exciting` chain.

### Suggestion 8: Add an "EQ region preview" toggle in training

Let the player optionally see which part of the frequency spectrum lights up before committing to an answer. This is a learning wheel, not a crutch — it can be disabled after the first few successful trials.

For example: during preview, show a dim highlight on the frequency axis indicating "sub-bass," "low bass," "upper bass," or "body" without revealing the exact descriptor name. This teaches *where to listen* without giving away *what to listen for*.

## Recommended Priority

| Priority | Suggestion | Effort | Impact |
|---:|---|---|---|
| 1 | **Cross-gate confusers** — Replace same-gate-boost confusers with cross-gate-boost confusers | Low | **Very High** — fixes the structural "freebie elimination" problem across all three gates with a small data change |
| 2 | **Two-layer approach** — Add Layer 2 same-gate challenges for within-band mastery | Medium | High — preserves fine discrimination training after region identification is learned |
| 3 | **Suggestion 6** — Visual/textual hints during early trials | Low | High — reuses existing card-back copy to frame the listening task |
| 4 | **Suggestion 3** — Staged gate progression | Medium | High — reduces cognitive load by introducing descriptors in learnable pairs |
| 5 | **Suggestion 2** — Higher training intensity for bass | Low | Medium — makes differences more audible without structural changes |
| 6 | **Suggestion 4** — A/B compare mode | Medium | High — psychoacoustically proven scaffold for discrimination training |
| 7 | **Suggestion 1** — Widen EQ separation | Medium | Medium — helps but risks changing the tonal identity of descriptors |
| 8 | **Suggestion 5** — Per-descriptor source material hints | Low | Medium — practical improvement with minimal code change |
| 9 | **Suggestion 7** — Reduce gate to four descriptors | Medium-High | Medium — simplifies but delays vocabulary access |
| 10 | **Suggestion 8** — EQ region preview toggle | Medium | Medium — useful training wheel but needs careful UI design |

## Summary

The core structural issue affects all three spectral gates: the mandatory cut anchor (`Thin`, `Hollow`, `Dull`) is so perceptually different from the boost descriptors that every 3AFC trial collapses to a 2AFC between two similar-sounding boosts. The listener eliminates the cut immediately, then guesses between two close boosts — which is the hardest possible discrimination task, presented without scaffolding.

The most impactful fix is **replacing same-gate-boost confusers with cross-gate-boost confusers**. This turns the trial into a genuine three-way decision (bass-boost vs bass-cut vs mid-boost) where all three options are perceptually distinct. It teaches the foundational skill — *where on the spectrum is the change?* — before asking for finer within-band discrimination, which can be taught in a second layer or in Calibration Tower.

This is a small data change (`confuserIds` in `listeningChallenges.ts`) with a large pedagogical payoff across all three spectral gates.

