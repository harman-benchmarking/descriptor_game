# Descriptor Playground Documentation Hub

This file is the documentation map. It should stay short and point to the document that owns each decision.

## Active Source Of Truth

| Document | Owns |
|---|---|
| `descriptor-gameplay-rules-and-concept.md` | Player-facing product rules, current app flow, progression model, and absorbed design decisions. |
| `descriptor-technical-design.md` | Implementation architecture, data contracts, audio/DSP rules, persistence, tests, and build expectations. |

## App Function Docs

Each major in-app function has its own focused document.

| Document | Function |
|---|---|
| `app-campus-orientation.md` | Campus, top-level navigation, and Orientation Center. |
| `app-training-grounds.md` | Training Grounds, gates, gift pairs, blind listening trials, and basic-card unlocking. |
| `app-atlas-region-crafting.md` | Atlas regions, ingredient trays, Discovery shelves, and blend crafting. |
| `app-calibration-tower.md` | Calibration Tower floors, scoring, floor locks, and blind challenge flow. |
| `app-lexicon-hall.md` | Lexicon Hall alias challenges and alias-card unlocking. |
| `app-sound-lab-sandbox.md` | Sound Lab free mixing, active-card behavior, and sandbox visualizers. |
| `app-collection.md` | Collection browsing, locked/unlocked display, and dev unlock buttons. |
| `app-settings-save-dev-tools.md` | Settings, save data, persistence, migrations, and reset/dev tooling. |
| `app-audio-engine-visualizers.md` | Playback controls, Web Audio engine, DSP profiles, and module-specific visualizers. |

## Descriptor Module Docs

| Document | Owns |
|---|---|
| `descriptor-spectral-descriptors.md` | Spectral basics, EQ moves, conflicts, Discovery recipes, regions, and spectral vocabulary. |
| `descriptor-spatial-descriptors.md` | Spatial basics, axes, recipes, regions, boundaries, and spatial visual language. |
| `descriptor-dynamic-descriptors.md` | Dynamic basics, compressor/overload behavior, recipes, regions, and dynamic visual language. |
| `descriptor-integrity-descriptors.md` | Integrity basics, defect generators, recipes, regions, and artifact vocabulary. |

## Content And Asset Docs

| Document | Owns |
|---|---|
| `descriptor-detail-pages.md` | Player-facing detail-page copy loaded by the app. |
| `descriptor-alias-vocabulary.md` | Alias vocabulary design, live alias cards, and alias challenge rules. |
| `descriptor-icon-design-language.md` | Icon visual language and prompt catalog. |
| `descriptor-golden-ear-absolute-scale-research.md` | Research and product rationale for Calibration Tower and later expert training. |
| `descriptor-raw-materials.md` | Legacy pointer to the current spectral descriptor source. |
| `region-a-descriptor-filter-tour-notes.md` | Historical Region A filter-tour notes. |

## Iteration Discussions

The files in `iteration-discussions/` are historical notes. Their active decisions have been absorbed into the main docs above. Do not treat an iteration discussion as current truth when it conflicts with implemented data, feature docs, or the two active source-of-truth documents.

## Editing Rule

When changing app behavior, update the matching `app-*.md` file and any affected source-of-truth doc in the same patch. When changing card data, also update the owning descriptor module doc and any guard tests that describe the data invariant.
