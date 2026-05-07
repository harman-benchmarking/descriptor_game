# Golden Ear And Absolute Scale Training Research

Date: 2026-04-28

Purpose: decide whether a Golden Ear-style or absolute scale training module belongs in Descriptor Playground, and if so, what shape it should take.

## Short Answer

Yes, include it, but not as part of the first learning flow.

The best fit is an optional, difficult `Review Lab` or endgame module that trains the player to identify absolute frequency areas, EQ direction, intensity, and descriptor meaning without relying on card labels or visible curves.

Do not frame the feature as "learn perfect pitch" or "become a Golden Ear" in the product copy. "Golden Ears" is already an established course/brand language in audio education, and perfect pitch is a different musical ability with a much higher evidence burden. For this game, the cleaner product idea is:

- Internal name: `Absolute Scale Training`
- Player-facing names to consider: `Calibration Tower`, `Frequency Trial`, `Expert Listening Lab`, `Scale Lab`, `Reference Ear`
- Player promise: "hear where the change lives on the spectrum", not "gain perfect pitch"

## Terms

| Term | Meaning | Fit for this app |
|---|---|---|
| Golden ear training | Audio-engineering critical listening: identify EQ bands, boosts/cuts, loudness, distortion, compression, spatial changes, and artifacts. | Strong fit. This app already trains perceptual audio descriptors. |
| Absolute pitch / perfect pitch | Musical note naming without a reference note, for example hearing a tone and naming C# instantly. | Weak fit unless the app expands into music education. |
| Relative pitch / interval training | Hearing distances between notes, scales, chords, and melodies. | Useful in music apps, but not central to audio-system descriptor training. |
| Absolute scale training | For this app: identifying an absolute frequency region, change direction, and magnitude without seeing a curve. | Strong fit if treated as expert descriptor calibration. |

## Current Landscape

### Golden Ear And Technical Listening

Legacy Golden Ears training, associated with Dave Moulton, focuses heavily on learning octave and later finer spectral regions through pink noise and music examples with EQ boosts/cuts. The manual describes progression from one-octave identification to 1/3-octave resolution, multi-band changes, and full EQ-curve recognition. Source: [Golden Ears Manual PDF](https://ntweb.deltastate.edu/miacopelli/downloads/Golden%20Ears%20Manual.pdf).

Philips launched a public Golden Ears challenge in 2014 based on its internal sound-engineer training. Public reporting described levels from basic through gold and test areas including timbre, detail/distortion, spatial impression, bass, and loudness. Source: [Digital Spy coverage](https://www.digitalspy.com/tech/a546447/philips-launches-website-to-help-audio-fans-test-hearing/). I did not find a current active Philips public challenge; treat it as historical inspiration, not a live benchmark.

Harman's listener-training work is especially relevant because it is about product-evaluation listeners, not musicians. AES abstracts describe computer-based training that teaches listeners to detect, classify, and rate linear distortions in program material, adapts to ability, and stores performance data. Sources: [1994 AES paper abstract](https://secure.aes.org/forum/pubs/conventions/?elib=6339), [2001 AES paper abstract](https://secure.aes.org/forum/pubs/conventions/?elib=9960).

Jason Corey's technical ear-training book and web practice modules are another close reference point. The second edition explicitly connects objective audio measurements, signal processing, subjective impressions, and browser-based practice modules. Source: [Routledge page](https://www.routledge.com/Audio-Production-and-Critical-Listening-Technical-Ear-Training/Corey/p/book/9781138845947).

A 2023 Applied Sciences paper tested a gamified technical ear-training system with four modules: spectral identification, auditory localization, consistency judgment, and memory of mix balance. The design emphasis on gamification, adaptive sequencing, and closed-loop audiomotor training is very compatible with this app's card game structure. Source: [Kim and Cozzarin 2023](https://www.mdpi.com/2076-3417/13/9/5357).

### Current Software References

| Product | Current positioning | Useful lesson for us |
|---|---|---|
| Golden Ears Audio | Paid/member course for musicians, engineers, and producers. Source: [Golden Ears Audio](https://goldenearsaudio.com/pages/golden-ears). | The phrase has existing brand baggage. Avoid using it as the feature name. |
| EarQuiz Frequencies | Free/open-source EQ ear training for Windows, macOS, and Linux; supports pink noise, music, 1-octave and 1/3-octave EQ, boost/cut, single/dual band, and custom gain from +/-1 to +/-18 dB. Source: [EarQuiz Frequencies](https://earquiz.org/EQ_Frequencies/). | Strong model for a pure absolute-frequency challenge. |
| TrainYourEars | Sound-engineer training where users correct EQ while listening instead of only guessing. Source: [TrainYourEars](https://www.trainyourears.com/). | "Knob match" is better learning than multiple choice alone. |
| SoundGym EQ Playground | Online EQ ear-training, games, contests, daily workouts; trains frequency detection and compression. Source: [SoundGym EQ Playground](https://www.soundgym.co/playground/eq?code=bf2_17). | Daily workouts and public progress are proven engagement patterns. |
| EQTrainer.app | Browser EQ frequency trainer with pink noise/music modes, boost amount, Q, and tolerance-based difficulty. Source: [EQ Trainer](https://eqtrainer.app/). | Simple browser implementation is enough to make the core loop useful. |

### Music Ear Training And Absolute Pitch

Music ear-training apps are a parallel category. EarMaster trains intervals, scales, chords, sight-singing, rhythm, and functional ear training. Sources: [EarMaster](https://earmaster.com/), [EarMaster explainer](https://dev.earmaster.com/wiki/ear-training/what-is-ear-training.html). Complete Ear Trainer and Perfect Ear use game-like progression for intervals, chords, scales, dictation, rhythm, and singing. Sources: [Complete Ear Trainer](https://play.google.com/store/apps/details?hl=en_US&id=com.binaryguilt.completeeartrainer), [Perfect Ear](https://perfectear.app/).

This category proves that gamified ear training can work, but its curriculum is not the same as Descriptor Playground. Those apps teach musical syntax. Descriptor Playground teaches audio-system and production descriptors.

Recent absolute-pitch research is more open than older folklore suggested, but it remains specialized. A 2019 PLOS One study found that after an eight-week, 32-hour training regime, some adults reached absolute-pitch-like performance, while most improved only modestly. Source: [Van Hedger, Heald, and Nusbaum 2019](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0223047). A 2025 Psychonomic Bulletin & Review study used an eight-week online program; 12 musicians averaged 21.4 training hours and 15,327 trials, learned on average 7.08 pitches to at least 90% within a roughly 1.3 to 2.0 second response window, and improved trained-timbre accuracy substantially. Source: [Wong et al. 2025](https://link.springer.com/article/10.3758/s13423-024-02620-2).

Takeaway: adult absolute pitch judgment can improve, but it is not the right central promise for this app. The useful borrow is adaptive, high-repetition, feedback-heavy perceptual learning.

## What The Research Suggests

1. Software ear training is credible when it is interactive, adaptive, and feedback-rich.
2. Start with easy, exaggerated differences, then reduce intensity.
3. Use both pink/noise-like reference material and real music or speech.
4. Measure transfer across tracks, timbres, and playback contexts.
5. Multiple choice is useful early, but correction/matching tasks are deeper.
6. Consistency matters as much as raw accuracy for "trained listener" skill.
7. For subtle A/B work, loudness matching and output safety are not polish. They are fairness.
8. Absolute pitch research is interesting, but note naming should stay outside this app unless a music-theory branch is intentionally added.

## Fit With Descriptor Playground

This feature fits the existing app unusually well:

- The app already has descriptor cards mapped to EQ/DSP changes.
- The docs already propose `Teach`, `Practice`, and `Test` listening flows.
- The `Review Lab` is already planned as a non-region practice utility.
- The planned blind A/B/C challenge can be extended into generated frequency-band trials.
- The current Web Audio direction can synthesize most spectral challenges with `BiquadFilterNode`.
- Future Spatial, Dynamic, and Integrity modules map directly to technical listening categories.

It should not replace the friendly descriptor-card onboarding. The first-time player should still learn `Rumble`, `Warm`, `Bright`, `Hiss`, `Left`, `Compressed`, and similar words as perceptual cards before being asked to identify `250 Hz`, `2 kHz`, or `+3 dB`.

## Recommended Module

Build a post-MVP challenge mode called something like `Calibration Tower` or `Expert Listening Lab`.

Unlock condition:

- After the 18 spectral basics are learned, or
- after the `Review Lab` exists and the player has completed at least one region.

Main goal:

- Convert descriptor vocabulary into an internal frequency and processing reference.

Do:

- Ask "where is the change?"
- Ask "boost, cut, or flat?"
- Ask "how strong is it?"
- Ask "which descriptor word best names it?"
- Ask the player to adjust a hidden filter until two clips match.

Avoid:

- Making it mandatory for region progression.
- Showing the curve before the answer.
- Calling the player wrong for using plain-language descriptors.
- Selling it as perfect pitch.
- Requiring pristine studio gear for ordinary progress.

## Challenge Types

| Challenge | Player task | Why it belongs |
|---|---|---|
| Band Finder | Hear A/B and choose the frequency band, such as `125 Hz`, `500 Hz`, `2 kHz`, or `8 kHz`. | Direct Golden Ear-style skill. |
| Direction Call | Choose `boost`, `cut`, or `flat`. | Teaches absence and excess, important for `Thin`, `Dull`, `Hollow`, etc. |
| Descriptor Bridge | Choose both the descriptor and the approximate band. Example: `Boxy`, around the `350-500 Hz` low-mid area. | Links the app's card language to technical listening. |
| Knob Match | Move frequency/gain/Q controls until the processed reference is matched. | Strong closed-loop training; less guessy than quizzes. |
| Curve From Ear | After listening, sketch or select a coarse curve shape. | Endgame form of descriptor comprehension. |
| Consistency Trial | Repeat similar ratings across tracks and days; score stability. | Mirrors trained-listener selection logic. |
| Transfer Trial | Same hidden change across voice, acoustic music, rhythm loop, and player-imported audio. | Prevents overfitting to one demo loop. |
| Boss Trial | Multi-band hidden EQ, no labels, lower intensity, limited replays. | Good hard mode after the player has a real internal map. |

## Difficulty Ladder

| Level | Signal | Change | Band resolution | Task style |
|---|---|---:|---|---|
| 1 | Pink noise or simple voice | +/-12 dB | 1 octave | A/B, choose among 3 nearby bands |
| 2 | Daily reference loops | +/-9 dB | 1 octave | Choose band and direction |
| 3 | Daily reference loops | +/-6 dB | 1 octave | Choose from full low/mid/high set |
| 4 | Music and speech | +/-6 dB | 1/3 octave clusters | Choose approximate band family |
| 5 | Music and speech | +/-3 dB | 1/3 octave | Knob match or choose from close confusers |
| 6 | Mixed material | +/-1 to +/-3 dB | broad to 1/3 octave | Consistency, transfer, and rating mode |
| 7 | Imported/user audio | variable | hidden | Descriptor diagnosis and curve-from-ear |

Version 1 should probably stop at levels 1 to 3. The hard levels become meaningful only after loudness compensation, better track coverage, and good feedback copy exist.

## Scoring

Use several scores instead of one "golden ear" badge:

| Score | Meaning |
|---|---|
| Accuracy | Did the player identify the correct band, direction, or descriptor? |
| Nearness | If wrong, how close was the chosen frequency on the log scale? |
| Direction accuracy | Did the player at least detect boost versus cut? |
| Intensity threshold | Smallest repeatably detected change for a descriptor or band. |
| Consistency | How stable are answers across repeated trials and days? |
| Transfer | Does skill survive across different tracks and timbres? |
| Confidence calibration | Does self-rated confidence match actual performance? |

This is more useful and less brittle than a single pass/fail certification.

## Implementation Sketch

Add a generated challenge layer alongside the existing descriptor challenge definitions.

```ts
type AbsoluteScaleTask =
  | "identify_band"
  | "identify_direction"
  | "identify_descriptor"
  | "match_filter"
  | "diagnose_curve";

type AbsoluteScaleChallenge = {
  id: string;
  task: AbsoluteScaleTask;
  sourceTrackId: string;
  centerHz: number;
  gainDb: number;
  q: number;
  bandwidth: "octave" | "third_octave" | "custom";
  options?: Array<{
    label: string;
    centerHz?: number;
    descriptorId?: string;
    direction?: "boost" | "cut" | "flat";
  }>;
  visualizerPolicy: "hidden_until_answer" | "neutral_until_answer";
  loudnessPolicy: "learning_trim" | "matched";
};
```

Audio implementation:

- Spectral trials can use the current Web Audio EQ graph.
- Use `BiquadFilterNode` for simple peaking trials.
- Consider a graphic-EQ-style filter bank later for 1/3-octave drills.
- Hide the curve during the blind answer.
- Reveal the curve afterward as feedback.
- Add output trim and, later, loudness matching so "louder" does not become the answer.
- Track both selected intensity and effective applied gain.

Data generation:

- Use log-spaced frequency choices.
- Start from the app's descriptor centers, then expand to standard octave/1/3-octave anchors.
- Avoid repeating the same correct option position.
- Keep confusers nearby, not random.
- Persist generated trial seeds if a trial must survive reloads.

Feedback:

- Show the correct answer after submission.
- Show a short descriptor bridge: `Around 350-600 Hz, a boost often reads as boxy while a cut often reads as hollow.`
- Let the player replay the target and their wrong answer back to back.
- For knob-match trials, show the error after the attempt: frequency distance, gain distance, and Q/bandwidth distance.

## Product Placement

Recommended placement:

```text
Home
  Learn
  Region Map
  Collection
  Sandbox
  Review Lab
    Weak Cards
    Confuser Practice
    Calibration Tower
```

The module should feel like an advanced training room, not a required school exam.

The current game is strongest when descriptors are emotional, collectible, and practical. Absolute scale training should be the player's optional microscope.

## MVP Decision

Do not add this to the first product MVP before the blind descriptor tests and first region-crafting loop are stable. The first product MVP should still be about learning descriptor cards, crafting initial discoveries, and saving progress.

For this feature, treat `P0` as the existing `Training Grounds` foundation, not as a separate Golden Ear module. `P0` teaches named descriptors through friendly blind A/B/C practice. `Calibration Tower` begins only after that foundation exists.

Current implementation decision:

- Floor 1 is named-color Discovery recognition because these targets are easier to hear than raw anchors.
- Floor 2 is the hard six-anchor descriptor challenge.
- Floor 3 adds two-card recipe anatomy: hear a hidden spectral Discovery recipe and choose its two basic ingredients from a six-card pool.
- Later floors can add three-card combo recognition after the first three floors are reliable.
- `Knob Match` should move later because it adds continuous controls, target-matching scoring, and a much heavier UI.

Revised phased plan:

| Phase | Status | Scope | Effort | Decision |
|---|---|---|---:|---|
| P0 | Training Grounds prerequisite | Current descriptor learning, blind A/B/C practice, confusers, hidden visualizer during answer. | Existing direction | Keep it as the base, but do not count it as the new expert module. |
| P1 / Floor 1 | First expert slice | Named-color Discovery recognition: `Bassy`, `Vivid`, `Sharp`, `Empty`, `Faded`, `Distant`. | Small | Current first Tower floor; promote at `8` points. |
| P2 / Floor 2 | Second expert slice | Six-anchor hard mode: `Boomy`, `Honky`, `Bright`, `Thin`, `Hollow`, `Dull`. | Small | Current second Tower floor; unlock after Floor 1 and promote at `10` points. |
| P3 / Floor 3 | Third expert slice | Two-card spectral recipe anatomy: hear a hidden Discovery and select its two basic ingredients from six choices. | Medium | Current third Tower floor; unlock after Floor 2 and promote at `12` points. |
| P4 | Later expansion | Mega-combo recognition plus spatial/dynamic/integrity expert trials. | Medium/large | Add after spectral combo recognition is fun and stable. |
| P5 | Advanced lab | `Knob Match`, imported-audio transfer, and long-term consistency stats. | Large | Save for power-user/endgame version. |

Recommended first shipped slice:

- Name: `Calibration Tower: Spectral I`
- Unlock: after the player completes the spectral Training Grounds, or after all 18 spectral basic cards are learned.
- Tracks: `daily-spoken-center-loop`, `daily-acoustic-pop-loop`, `daily-drum-bass-groove-loop`, plus optional pink noise.
- First answer set: the named-color Discovery descriptors `Bassy`, `Vivid`, `Sharp`, `Empty`, `Faded`, and `Distant`.
- Second answer set: the six gate-anchor descriptors `Boomy`, `Honky`, `Bright`, `Thin`, `Hollow`, and `Dull`.
- Third floor target pool: all current spectral two-card Discovery recipes; each trial shows the two correct ingredients plus four spectral distractors.
- Technical feedback: after answering, reveal boost/cut direction and the rough frequency territory.
- Intensity: start with +/-12 dB, then +/-9 dB, then +/-6 dB.
- Visibility: hide EQ curves and descriptor labels until after the answer.
- Feedback: reveal the descriptor, gate family, direction, rough frequency area, and curve after the player answers.

### P1: Named-Color Discovery Recognition

P1 is now Floor 1. It asks the player to identify six named spectral colors. This is easier than raw six-anchor recognition because the targets are more characterful and some are multi-card shapes.

Current Floor 1 answer set:

| Answer | Recipe |
|---|---|
| `Bassy` | `Boomy + Boxy` |
| `Vivid` | `Boomy + Bright` |
| `Sharp` | `Bright + Harsh` |
| `Empty` | `Thin + Hollow` |
| `Faded` | `Thin + Dull` |
| `Distant` | `Hollow + Dull` |

Player flow:

1. The game plays a hidden processed target.
2. The player chooses from six named-color cards.
3. The game reveals the correct descriptor and recipe after the answer.
4. Floors 1 and 2 use `+2` for correct and `-1` for wrong; score cannot go below `0`.
5. Floor 2 unlocks when Floor 1 reaches `8` points.

Recommended first version:

| Setting | Value |
|---|---|
| Task | Choose the correct named Discovery color from six cards. |
| Answer set | `Bassy`, `Vivid`, `Sharp`, `Empty`, `Faded`, `Distant`. |
| Gain | +/-12 dB at first, then +/-9 dB, then +/-6 dB. |
| Q/bandwidth | Broad enough to sound like descriptor territory, not surgical EQ. |
| Visualizer | Hidden until answer. |
| Scoring | Tower points: `+2` for correct, `-1` for wrong, minimum `0`; promote to Floor 2 at `8` points. |

Why P1 belongs before six-anchor mode:

- The named colors are more obvious than raw anchors.
- The answer set is still compact.
- It reuses Discovery cards the player can already understand from Atlas crafting.
- It creates a fair promotion gate before raw anchor recognition.

### P2: Six-Anchor Hard Mode

P2 is now Floor 2. The player chooses from the six core anchor descriptors:

| Gate | Boost-ish anchor | Cut anchor |
|---|---|---|
| Bass | `Boomy` | `Thin` |
| Mid | `Honky` | `Hollow` |
| Treble | `Bright` | `Dull` |

Recommended Floor 2 settings:

| Setting | Value |
|---|---|
| Task | Choose the correct descriptor from six known anchor cards. |
| Direction balance | Always 3 boost-ish choices and 3 cut choices. |
| Answer set | `Boomy`, `Honky`, `Bright`, `Thin`, `Hollow`, `Dull`. |
| Scoring | Same `+2/-1`, minimum `0`; promote at `10` points. |

Technical feedback after a Floor 2 answer:

- `Boomy`: bass boost around the low-bass bloom area.
- `Thin`: low/body foundation cut.
- `Honky`: midrange boost around the cup-like projection area.
- `Hollow`: center-body cut.
- `Bright`: upper-treble boost.
- `Dull`: broad detail/opening cut.

This keeps the task descriptor-first while still building the player's internal frequency map.

### P3: Two-Card Recipe Anatomy

P3 is now Floor 3. It moves from naming to decomposition:

1. The player clears Floor 2.
2. The floor chooses one current spectral two-card Discovery recipe.
3. The game plays that hidden recipe sound, expanded internally to its two ingredient basics.
4. The UI shows six basic ingredient choices: the two correct basics plus four spectral distractors.
5. The player selects two ingredients; the answer is scored correct only when the selected set matches the recipe.
6. Feedback reveals the named Discovery target and its two ingredients.

This is better than fixed pair tiles because the floor can use the whole current spectral two-card recipe pool while each trial stays readable. The player never faces the full recipe universe at once; they only solve a six-choice ingredient puzzle.

Floor 3 acceptance criteria:

- The hidden target comes from current spectral two-card Discovery recipes.
- The challenge never exposes the correct ingredients before submission.
- Each trial shows six ingredient choices exactly.
- The answer is order-insensitive and requires exactly two selected ingredients.
- Floor 3 uses ingredient-aware scoring: both ingredients correct gives `+2`; one correct plus a same-family substitute for the missing ingredient gives `+1`; one correct plus an unrelated wrong ingredient gives `0`; no correct ingredients gives `-1`. Same-family means spectral group plus EQ direction, such as `bass:boost` or `treble:cut`. Score minimum remains `0`, and promotion is at `12` points.

### Future: Three-Card Big-Combo Recognition

The next expansion should use the same ingredient-recognition pattern, but with three-card `Big combo` discoveries.

This is a good next step because it raises listening complexity without changing the UI model. The player is still choosing cards, not moving EQ controls.

Player flow:

1. The player unlocks three-card `Big combo` discoveries through region crafting.
2. Calibration Tower offers a recognition set made only from unlocked three-card discoveries.
3. The game plays a hidden big-combo sound, expanded internally to its three ingredient basics.
4. The player chooses the big-combo card that matches the sound.
5. Feedback reveals the three ingredients, lower combo bridges when available, curve, and dominant clue.

Recommended first three-card discovery sets:

| Set | Candidate discoveries | Why |
|---|---|---|
| First unlocked big-combo set | Any two or more unlocked `Big combo` cards | Keeps the mode collection-driven instead of region-driven. |
| Broad contrast set | `Canned`, `Woolly`, `Cold`, `Vintage`, future replacement card | These have very different shapes and should be easier to distinguish than close treble pain cards. |
| Later difficulty set | `Brittle`, `Fatiguing`, `Veiled`, `Energetic` | More confusable and should wait until the player has stronger ingredient recognition. |

The three-card floor should start only when the player has enough unlocked big-combo cards to make fair choices. If only one three-card discovery is unlocked, the app should present it as review or replay, not a recognition quiz. The mode should not special-case one region; it should simply use the player's unlocked collection.

Future three-card acceptance criteria:

- The player can answer with unlocked three-card big-combo cards.
- The challenge avoids using locked or unseen discoveries as decoys.
- Feedback shows how the big combo decomposes into basics and any known lower combo bridges.
- The app tracks whether errors are caused by missing bass, mid, treble, boost/cut, or ingredient-count confusion.

### Boost And Cut Balance

There are two different balances to keep separate:

| Area | Should boost/cut be balanced? | Reason |
|---|---|---|
| Technical trials | Yes, or close to yes. | The player should learn both excess and absence, and should not infer that the answer is usually a boost. |
| Descriptor vocabulary | Not necessarily. | Natural audio-review language has more specific words for some boosted/excess regions than for the matching cut/absence regions. |
| First bridge map | Mostly balanced by direction, but not one-to-one by word count. | Some cut descriptors cover wide absence patterns, while boost descriptors often split into several named colors. |

Technical ear-training sources do not treat cuts as rare side cases. The Golden Ears manual describes EQ drills where octave bands are boosted or cut, and later drill sets mix boosting and cutting across the full spectrum. EarQuiz Frequencies also supports exercise patterns with boost and/or cut frequencies and adjustable +/- gain. Sources: [Golden Ears Manual PDF](https://ntweb.deltastate.edu/miacopelli/downloads/Golden%20Ears%20Manual.pdf), [EarQuiz Frequencies](https://earquiz.org/EQ_Frequencies/).

So the module should not copy the descriptor-word imbalance into the generated trials. P1 solves this cleanly by using three boost anchors and three cut anchors at all times.

For P2/P3 discovery cards, the app should track ingredient-direction weaknesses instead of forcing every answer set to contain the same number of boost-heavy and cut-heavy discoveries:

- A discovery set can be uneven if it reflects the player's unlocked collection.
- The generator should still avoid sessions where every target is bright/loud/boost-heavy.
- The score should track `boost-heavy discovery accuracy`, `cut-heavy discovery accuracy`, and `mixed-shape discovery accuracy`.
- Feedback should explain when a discovery is mostly excess, mostly absence, or a mixed contour.

This means the curriculum is balanced, while the language stays natural.

### Why Knob Match Should Wait

`Knob Match` is attractive, but it is a different product surface. It asks the player to control a mini EQ by ear, which is powerful but much more demanding than choosing from options.

Reasons to defer:

- It needs continuous frequency/gain/Q controls that work well on mobile.
- It needs tolerance scoring, not just correct/incorrect.
- It needs careful loudness matching, otherwise gain changes can cheat the task.
- It can overwhelm players who just finished learning descriptor cards.
- It risks feeling like audio-engineering homework instead of a challenge room.

Good later version:

- Put `Knob Match` behind a clear `Advanced` badge.
- Start with frequency-only matching while gain and Q are fixed.
- Then add gain matching.
- Add Q/bandwidth matching last, if at all.
- Treat it as a sandbox-lab exercise, not the first proof of the module.

The practical decision: ship named-color recognition first, then six-anchor hard mode, then two-card or three-card combo recognition. That gives the app a serious challenge ladder without turning the MVP into a DAW lesson.

## Risks

| Risk | Mitigation |
|---|---|
| It becomes too technical and breaks the card-game feel. | Make it optional, unlock later, and keep anchor-card or discovery-card feedback in the app's normal card language. |
| Users overfit to one loop. | Rotate speech, acoustic music, rhythm, and imported audio. |
| Loudness bias makes boosted answers too obvious. | Add conservative trim immediately and loudness matching before subtle levels. |
| Mobile speakers cannot reproduce bass/air clues. | Recommend headphones and avoid hard-blocking ordinary progress. |
| "Golden Ear" language feels elitist or legally muddy. | Use a different player-facing name. |
| Perfect-pitch claims invite skepticism. | Do not claim perfect pitch; cite it only as adjacent research. |
| Expert mode frustrates casual players. | Gate it behind Review Lab and allow practice-first mode. |

## Final Recommendation

Build it, but build the audio-engineering version, not the musical perfect-pitch version.

The strongest module for Descriptor Playground is an optional challenge that teaches:

- absolute frequency location,
- boost versus cut,
- subtle intensity detection,
- descriptor-to-frequency mapping,
- cross-track transfer,
- and answer consistency.

That gives the app a serious long-term training spine while keeping the main experience playful: collect cards first, learn the words by ear, then earn the microscope.

## Sources

- [Golden Ears Audio](https://goldenearsaudio.com/pages/golden-ears)
- [Golden Ears Manual PDF](https://ntweb.deltastate.edu/miacopelli/downloads/Golden%20Ears%20Manual.pdf)
- [Philips Golden Ears coverage, Digital Spy](https://www.digitalspy.com/tech/a546447/philips-launches-website-to-help-audio-fans-test-hearing/)
- [Harman listener training AES abstract, 1994](https://secure.aes.org/forum/pubs/conventions/?elib=6339)
- [Harman listener training software AES abstract, 2001](https://secure.aes.org/forum/pubs/conventions/?elib=9960)
- [Audio Production and Critical Listening: Technical Ear Training, Routledge](https://www.routledge.com/Audio-Production-and-Critical-Listening-Technical-Ear-Training/Corey/p/book/9781138845947)
- [A New Technical Ear Training Game and Its Effect on Critical Listening Skills, Applied Sciences 2023](https://www.mdpi.com/2076-3417/13/9/5357)
- [EarQuiz Frequencies](https://earquiz.org/EQ_Frequencies/)
- [TrainYourEars](https://www.trainyourears.com/)
- [SoundGym EQ Playground](https://www.soundgym.co/playground/eq?code=bf2_17)
- [EQ Trainer](https://eqtrainer.app/)
- [EarMaster](https://earmaster.com/)
- [EarMaster: What is ear training?](https://dev.earmaster.com/wiki/ear-training/what-is-ear-training.html)
- [Complete Ear Trainer](https://play.google.com/store/apps/details?hl=en_US&id=com.binaryguilt.completeeartrainer)
- [Perfect Ear](https://perfectear.app/)
- [Absolute pitch can be learned by some adults, PLOS One 2019](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0223047)
- [Learning fast and accurate absolute pitch judgment in adulthood, Psychonomic Bulletin & Review 2025](https://link.springer.com/article/10.3758/s13423-024-02620-2)
