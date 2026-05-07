# Shrill To Glassy Treble Revision Plan

Date: 2026-04-28

Status: Planned; not implemented yet

Related files:
- `docs/descriptor-spectral-descriptors.md`
- `docs/descriptor-detail-pages.md`
- `docs/descriptor-alias-vocabulary.md`
- `docs/descriptor-icon-design-language.md`
- `web/app/src/cards/descriptorCatalog.ts`
- `web/app/src/cards/discoveryRecipes.ts`
- `web/app/src/cards/aliasVocabulary.ts`
- `web/app/src/learn/listeningChallenges.ts`
- `web/app/src/data/regions.ts`
- `web/app/src/app/App.tsx`
- `web/app/src/i18n/en.json`
- `web/app/src/tests/recipeMatcher.test.ts`
- `web/app/src/tests/blendCrafting.test.ts`

## 1. Problem

`Shrill` is currently a basic spectral card, but it is too close to `Sibilant`.

Current DSP:

| Card | Current EQ | Current role |
|---|---|---|
| `Sibilant` | `8000 Hz, +5.0 dB, Q 1.5` | consonant/cymbal bite |
| `Shrill` | `8500 Hz, +6.0 dB, Q 1.9` | more severe narrow high-treble pain |

The overlap creates three issues:

1. The listening difference is difficult to hear reliably.
2. `Shrill` has no current discovery recipes, so it feels unused.
3. The game already has better words for severe treble outcomes, such as `Piercing`, `Fatiguing`, `Spitty`, and `Metallic`.

## 2. Core Decision

Retire `Shrill` as a basic DSP card and keep it as an alias/vocabulary card for `Sibilant`.

Add a new basic card: `Glassy`.

The resulting treble ladder should become:

| Card | Meaning |
|---|---|
| `Harsh` | rough lower-treble edge and fatigue |
| `Glassy` | hard reflective sheen / artificial upper-treble resonance |
| `Sibilant` | vocal S/T hiss and cymbal bite |
| `Bright` | broad top-end shine |
| `Airy` | very high extension and open air |

This keeps the useful word `Shrill` in the game without forcing it to occupy a DSP slot.

## 3. Proposed Glassy DSP

Recommended starting point:

```text
Glassy = 6300 Hz, +4.5 dB, Q 1.15
```

Reasoning:

- It sits above `Harsh` but below `Sibilant`.
- It should sound like reflective hardness, not consonant spit.
- It gives Region E a clearer ingredient for artificial shine and hard surface.
- It should remain separate from `Bright`, which is broader and more pleasant.

Initial conflict rule:

| Card | Conflict |
|---|---|
| `Glassy` | `Dull` |

Do not make `Glassy` conflict with `Sibilant`. They should be allowed to combine later if we want a more severe top-edge recipe.

## 4. Recipe Changes

Recommended recipe updates:

| Discovery | Current recipe | New recipe | Reason |
|---|---|---|---|
| `Crisp` | `Bright + Sibilant` | `Bright + Glassy` | Crisp should mean clean shine plus hard definition, not necessarily vocal hiss. |
| `Spitty` | `Thin + Sibilant` | keep | Spitty should remain consonant/saliva/fizz language. |
| `Metallic` | `Harsh + Sibilant` | `Harsh + Glassy` | Metallic should be rough edge plus reflective hard sheen. |
| `Plasticky` | `Thin + Hollow + Harsh + Sibilant` | likely `Thin + Hollow + Harsh + Glassy` | Keeps Plasticky tied to artificial surface rather than vocal hiss. |
| `Brittle` | `Thin + Bright + Sibilant` | review | It may stay as thin body plus exposed top/consonant bite, but it no longer naturally evolves from `Crisp + Thin`. |
| `Hyped` | `Boomy + Hollow + Bright + Sibilant` | review | It may stay with `Sibilant` if hyped means smile curve plus extra bite, but it no longer naturally evolves from `Crisp + Boomy + Hollow`. |
| `Fatiguing` | `Shouty + Harsh + Sibilant` | keep | Fatigue should preserve presence pressure plus rough edge plus sibilant bite. |
| `Piercing` | `Thin + Hollow + Shouty + Harsh + Sibilant` | keep for now | Piercing can still be the severe multi-ingredient top pain outcome. |

Reserved combination:

| Reserved combo | Possible future meaning |
|---|---|
| `Harsh + Sibilant` | a more painful bite word, but not needed immediately |

## 5. App Implementation Checklist

### Descriptor Catalog

File: `web/app/src/cards/descriptorCatalog.ts`

- Remove `shrill` from `spectralDescriptors`.
- Add `glassy` as a spectral treble basic card.
- Add alias `Shrill` to `Sibilant`.
- Update `Dull` conflicts from `shrill` to `glassy`.
- Keep `Sibilant` active and recipe-relevant.

### Discovery Recipes

File: `web/app/src/cards/discoveryRecipes.ts`

- Update `crisp` to `["bright", "glassy"]`.
- Update `metallic` to `["harsh", "glassy"]`.
- Keep `spitty` as `["thin", "sibilant"]`.
- Update `plasticky` if we accept the artificial-surface reading: `["thin", "hollow", "harsh", "glassy"]`.
- Review `brittle`, `hyped`, `fatiguing`, and `piercing` for evolution text and test expectations.

### Learn Gates

Files:
- `web/app/src/learn/listeningChallenges.ts`
- `web/app/src/data/regions.ts`

Changes:

- Replace the `Shrill` listening trial with `Glassy`.
- Treble gate later unlocks should become:

```text
Sibilant, Glassy, Airy
```

- Suggested Glassy confusers:

```text
Sibilant, Harsh, Bright
```

### Atlas Regions

File: `web/app/src/app/App.tsx`

Region E currently includes:

```text
Thin, Harsh, Sibilant, Shrill, Hollow, Bright, Shouty
```

Update to:

```text
Thin, Harsh, Sibilant, Glassy, Hollow, Bright, Shouty
```

Region F should be reviewed because `Crisp` is moving from `Bright + Sibilant` to `Bright + Glassy`.

### Alias Vocabulary

File: `web/app/src/cards/aliasVocabulary.ts`

Add `Shrill` as an alias card:

| Alias | Anchor | Type |
|---|---|---|
| `Shrill` | `Sibilant` | single anchor |

Suggested test:

```text
Prompt: The high edge of the sound feels painfully hissy and piercing on consonants.
Correct answer: Sibilant
Choices: Sibilant, Glassy, Harsh, Bright
```

Rule:

- Alias `Shrill` unlocks into Collection as vocabulary.
- Alias `Shrill` must not be usable in Laboratory/Sandbox as an active DSP card.

### Translation Text

File: `web/app/src/i18n/en.json`

- Add `card.glassy.label`.
- Add `card.glassy.summary`.
- Add `card.glassy.alt`.
- Stop using `card.shrill.*` as a basic card.
- Keep or add `alias.shrill.*` if alias cards use translation keys.
- Update recipe copy for `Crisp`, `Metallic`, and `Plasticky` if changed.
- Update Learn hints for the new Glassy trial.

## 6. Asset Checklist

Source folder:

```text
assets-source/descriptors/
```

Required:

- Add `glassy.png`.
- Keep `shrill.png` for alias/vocabulary use.
- Keep existing `sibilant.png`.
- Existing `crisp.png`, `spitty.png`, and `metallic.png` can remain initially, but their art should be reviewed after recipe changes.

Sync step when ready:

```text
cd web/app
npm run sync:assets
```

Do not sync until the new `glassy.png` is ready, unless we temporarily use `0000.png`.

## 7. Documentation Checklist

### Spectral Descriptor Doc

File: `docs/descriptor-spectral-descriptors.md`

- Replace `Shrill` as a selectable basic with `Glassy`.
- Update treble basic table.
- Update conflict table.
- Remove "Shrill standalone severe-treble lesson."
- Update Region E roadmap and table.
- Update Region F if `Crisp` now belongs to `Glassy`.
- Update vocabulary index.
- Update frequency guide:

```text
4 kHz: harsh
6-6.5 kHz: glassy
8 kHz: sibilant
10 kHz: bright
14 kHz: airy
```

### Detail Pages

File: `docs/descriptor-detail-pages.md`

- Replace the basic `Shrill` detail page with a basic `Glassy` detail page.
- Update `Sibilant`:
  - Add alias `Shrill`.
  - Remove conflict with `Shrill`.
  - Keep focus on consonants and cymbal bite.
- Update `Crisp`:
  - New ingredients: `Bright + Glassy`.
- Update `Metallic`:
  - New ingredients: `Harsh + Glassy`.
- Update `Plasticky` if accepted:
  - New ingredients: `Thin + Hollow + Harsh + Glassy`.
- Update evolution notes for `Brittle`, `Hyped`, `Fatiguing`, and `Piercing`.

### Alias Vocabulary Doc

File: `docs/descriptor-alias-vocabulary.md`

- Add `Shrill -> Sibilant` to live alias cards.
- Add individual MC test details.
- Clarify that `Shrill` is no longer a basic card.
- Keep `Shrill` as a strong human-language word for painful sibilance.

### Icon Design Language

File: `docs/descriptor-icon-design-language.md`

- Add `Glassy` icon direction.
- Move `Shrill` from basic descriptor direction to alias vocabulary direction if it appears there.

## 8. Test Checklist

Files:
- `web/app/src/tests/recipeMatcher.test.ts`
- `web/app/src/tests/blendCrafting.test.ts`

Update expectations for:

- `Crisp = Bright + Glassy`
- `Metallic = Harsh + Glassy`
- `Spitty = Thin + Sibilant`
- `Plasticky`, if changed
- Alias card coverage for `Shrill`

Then run:

```text
cd web/app
npm run test
npm run build
```

## 9. Open Questions Before Implementation

1. Should `Plasticky` definitely move to `Glassy`, or should it stay tied to `Sibilant`?
2. Should `Brittle` stay `Thin + Bright + Sibilant`, or become `Thin + Bright + Glassy`?
3. Should `Hyped` stay `V-shaped + Sibilant`, or should it use `Glassy` to emphasize shiny hard hype?
4. Should `Glassy` be taught before or after `Sibilant` in the Treble gate?
5. Should the old `shrill.png` be reused for the alias card, or should we generate a less "basic-card-like" alias icon later?

My current recommendation:

- Implement the minimal safe version first:
  - `Shrill -> Sibilant` alias.
  - `Glassy` basic.
  - `Crisp = Bright + Glassy`.
  - `Metallic = Harsh + Glassy`.
  - `Spitty` remains `Thin + Sibilant`.
- Defer changes to `Brittle`, `Hyped`, and `Piercing` until we listen to `Glassy` in the app.
- Change `Plasticky` only if `Harsh + Glassy` clearly sounds more artificial than `Harsh + Sibilant`.
