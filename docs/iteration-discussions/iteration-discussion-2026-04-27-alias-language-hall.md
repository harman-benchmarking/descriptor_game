# Alias Language Hall Implementation Plan

Date: 2026-04-27

Status: MVP implemented; individual alias tests are now the target flow

Related files:
- `docs/descriptor-spectral-descriptors.md`
- `docs/descriptor-detail-pages.md`
- `docs/descriptor-icon-design-language.md`
- `web/app/src/cards/descriptorCatalog.ts`
- `web/app/src/cards/discoveryRecipes.ts`
- `web/app/src/tests/recipeMatcher.test.ts`

## 1. Core Idea

The game currently treats descriptors as stable training anchors:

- `Rumble` means a specific low-frequency movement.
- `Thin` means reduced body/foundation.
- `Dull` means reduced top detail.
- `Bright + Glassy` unlocks `Crisp`.

That stability is useful for training, but real listening language is more flexible than the game rules. Different listeners may use loose words, partial words, or context-dependent words.

The Alias Language Hall should teach this idea directly:

> Descriptors are not fixed laws. They are listening language.
> The game gives stable anchor cards, but real people often use flexible words around those anchors.

This should not be a plain paragraph-only page. The concept is too important. It should be an interactive learning feature that gives the player vocabulary cards after they understand how aliases relate to anchors.

## 2. Design Rule

The current rule should remain:

> A live basic alias must not share a label with an unlockable discovery.

Reason:

- If a word names one basic descriptor, it can be an alias.
- If a word names a combination, it should be a discovery.
- If a word is ambiguous across multiple basics, it should become a language lesson rather than a normal alias.

This keeps three card layers clean:

| Card type | Meaning | DSP behavior |
|---|---|---|
| Basic | stable listening anchor | directly applies DSP |
| Discovery | named combination of basics | expands to ingredient basics |
| Alias / vocabulary | flexible human language around anchors | no direct DSP |

## 3. Current Alias Inventory

Current live basic aliases after collision cleanup:

| Alias | Anchor card(s) | Type | Note |
|---|---|---|---|
| `Droning` | `Rumble` | exact-ish | Points to deep sustained low movement. |
| `Bassy` | `Boomy`, `Muddy` | ambiguous | Can mean bass bloom or muddy upper-bass cloud depending on context. |
| `Lacking` | `Thin` | exact-ish | Casual way to describe missing foundation. |
| `Weak` | `Thin` | exact-ish | Emotional/source-language version of missing foundation. |
| `Colored` | `Honky` | broad | Points toward midrange coloration, but may be broader than honk. |
| `Presence` | `Shouty` | broad | Points toward upper-mid forwardness, but not always aggressive. |
| `Dark` | `Dull` | exact-ish | Common word for reduced top-end light/detail. |

There are `8` alias assignments because `Bassy` maps to two anchors, but only `7` unique alias labels.

## 4. Words That Must Stay Discovery-Only

These words are currently unlockable discoveries and should not be used as basic aliases:

| Word | Discovery recipe | Why not an alias |
|---|---|---|
| `Tinny` | `Thin + Harsh` | Needs body loss plus hard upper edge. |
| `Chesty` | `Warm + Boxy` | Needs body plus enclosed low-mid resonance. |
| `Metallic` | `Harsh + Glassy` | Needs hard edge plus reflective treble sheen. |
| `Muffled` | `Muddy + Dull` | Needs low-mid cloud plus missing detail. |
| `Crisp` | `Bright + Glassy` | Needs broad shine plus hard reflective definition. |
| `Cold` | `Hollow + Bright + Thin` | Needs missing body plus exposed top. |
| `Sharp` | `Bright + Harsh` | Needs shine plus hard upper edge. |

These can still be discussed inside the Language Hall as examples of "not aliases anymore; now they are recipe identities."

## 5. Recommended Feature Name

Recommended name: `Language Hall`

Alternatives:

| Name | Opinion |
|---|---|
| `Language Hall` | Best. Clear, flexible, and distinct from the Laboratory. |
| `Lexicon` | Good as a collection section, but less active as a learning mode. |
| `Listening Language` | Good for a page title or subtitle. |
| `Alias Lab` | Accurate, but too narrow if later we include cultural/context vocabulary. |
| `Vocabulary Forge` | Too close to Blend Forge. |

Recommended structure:

- Header entry: `Building`
- Building hub tile: `Language Hall`
- Collection section: `Vocabulary`
- Card type label: `Alias`

## 5.1 App Navigation Placement

The alias feature should not be placed inside the Atlas grid. It also should not replace Collection.

Recommended top navigation:

```text
Learn | Atlas | Building | Collection | Setting
```

The `Building` page is a hub for functional places, laid out similarly to the Atlas page. Instead of sound regions, it shows tool/building tiles.

MVP Building tiles:

| Building tile | Function |
|---|---|
| `Language Hall` | alias and vocabulary flexibility training |
| `Laboratory` | current Sandbox/free DSP experiment mode |

Future Building tiles:

| Building tile | Possible function |
|---|---|
| `Review Desk` | translate listening notes into possible descriptors |
| `Track Studio` | manage or audition training tracks |
| `Calibration Room` | headphone, volume, and setup checks |

Collection should remain in the header for convenience. The user will want quick access to owned cards and reference material, so it should not be hidden inside `Building`.

The conceptual split becomes:

| Header item | Role |
|---|---|
| `Learn` | guided gates and listening tests |
| `Atlas` | sound regions and descriptor chemistry |
| `Building` | tools, labs, and learning institutions |
| `Collection` | owned cards and reference archive |
| `Setting` | app configuration |

The metaphor:

> The Atlas shows where sounds live.  
> The Building hub contains places where the learner studies, tests, and interprets sound.  
> The Collection stores what the learner has earned.

## 6. MVP User Flow

### 6.1 Entry Point

Add a `Building` item to the main header.

Inside the `Building` page, add a `Language Hall` tile and a `Laboratory` tile.

MVP unlock timing:

- `Building` is available from the start.
- `Laboratory` is available from the start.
- `Language Hall` is available from the start, but can visually recommend completing at least one Spectral gate first.
- Do not gate core progression behind it.
- Each correct answer unlocks that alias card in Collection.

Reason:

- The player should first experience stable basic cards.
- Then the lab explains why real-world words can be flexible.
- It should feel like an optional literacy layer, not a blocker.

### 6.2 Intro Step

Show a compact explanation, not a long article.

Suggested copy:

```text
The cards are anchors. Real listening words are softer.
An alias is a word people may use when they are pointing toward a card, but it may not be perfectly exact.
```

Avoid:

- long textbook paragraphs
- telling users that their words are wrong
- making aliases feel like lesser cards

Tone:

- "Words need context"
- "The card is the anchor"
- "The alias is how people may describe it"

### 6.3 Individual Alias Challenge Rooms

The Language Hall should not behave like one long forced quiz. It should show a grid of individual alias words first. The player chooses one word, enters that word's challenge, answers from four anchor cards, and unlocks only that vocabulary card when the answer is correct.

This keeps the feature scalable when more aliases are added:

- each alias is one room/challenge tile
- the visible word list can become richer over time
- the learner can revisit one confusing word without replaying the whole sequence
- `Bassy` remains one test even though it has two correct anchors

Examples:

| Prompt | Correct anchor | Distractors |
|---|---|---|
| `Droning` | `Rumble` | `Thump`, `Punchy` |
| `Lacking` | `Thin` | `Dull`, `Hollow` |
| `Weak` | `Thin` | `Softened`, `Flat` |
| `Dark` | `Dull` | `Hollow`, `Muddy` |
| `Presence` | `Shouty` | `Bright`, `Sibilant` |
| `Colored` | `Honky` | `Boxy`, `Nasal` |

Feedback should explain the relation briefly:

```text
Droning usually points toward sustained low movement, so Rumble is the closest anchor.
```

### 6.4 Ambiguous Alias Lesson

`Bassy` should be the centerpiece because it demonstrates that language is flexible.

The player should not be asked to pick one fixed answer. `Boomy` and `Muddy` should both count as correct when the prompt is about the loose word `Bassy`. This still counts as one alias challenge, because the number of tests follows the number of alias labels, not the number of valid answers.

Example:

| Context | Valid anchors |
|---|---|
| "The bass blooms and hangs around." | `Boomy`, `Muddy` |
| "The low end clouds the mix and hides detail." | `Boomy`, `Muddy` |

Suggested explanation:

```text
Bassy can point in more than one direction.
Boomy and Muddy are both acceptable anchors for the loose word.
The follow-up question is not "which one is correct?", but "which one is more precise for this situation?"
```

This is the main teaching moment. It shows that descriptor language is not rigid, but the game still gives stable anchors for training.

### 6.5 Discovery Boundary Lesson

After the alias matching, show a short "not every common word is an alias" section.

Use two examples:

| Word | Why it is not a basic alias |
|---|---|
| `Chesty` | It is `Warm + Boxy`, not just Warm or Boxy. |
| `Crisp` | It is `Bright + Glassy`, not just Bright or Glassy. |

Optional examples:

- `Muffled = Muddy + Dull`
- `Tinny = Thin + Harsh`
- `Metallic = Harsh + Glassy`

Suggested copy:

```text
Some words feel like aliases at first, but they actually describe a blend.
Those words become discoveries, because they teach a recipe.
```

## 7. Unlock Reward

Each correct answer unlocks one vocabulary card:

- `Droning`
- `Bassy`
- `Lacking`
- `Weak`
- `Colored`
- `Presence`
- `Dark`

These should not count as:

- basic cards
- discovery cards
- atlas region progress
- DSP effects

They should count as:

- vocabulary progress
- collection literacy
- optional learner support

Recommended per-answer reward:

```text
Vocabulary card unlocked.
```

## 8. Collection Behavior

Blend alias cards into the `Spectral` Collection section instead of giving them a separate `Vocabulary` shelf.

Reason:

- The current aliases are all Spectral vocabulary.
- Keeping them beside Spectral basics makes the anchor relationship clearer.
- A separate shelf makes aliases feel like a fifth card family, which is not the goal.

Alias cards should show:

- alias label
- related anchor card(s)
- ambiguity marker if needed
- short "how people use this word" line

Example card:

```text
Bassy
Points toward: Boomy / Muddy
Needs context: bloom or cloud?
```

Clicking an alias card should open a detail modal with:

- alias meaning
- anchor relation
- examples
- "not the same as" notes

No EQ curve should appear for alias cards. They are vocabulary/reference cards, not playable DSP cards.

## 9. Laboratory Behavior

Do not allow alias cards to become active DSP cards.

Alias cards must not become active Laboratory cards.

Recommended MVP:

- Do not show aliases in the Laboratory basic card grid.
- Do not provide a "use in Laboratory" action from alias detail pages.
- Show anchor cards as reference only.

## 10. UI Layout Proposal

### Building Hub Page

The Building hub should feel structurally similar to the Atlas:

- full-page hub
- large square or near-square tiles
- strong icon or image per building
- short functional subtitle
- progress badge when relevant

MVP tiles:

| Tile | Subtitle | Progress |
|---|---|---|
| `Language Hall` | flexible listening vocabulary | `0/7 vocabulary` before completion, `7/7 vocabulary` after completion |
| `Laboratory` | free descriptor experiments | no progress required |

The `Laboratory` tile should route to the current Sandbox experience.

The `Language Hall` tile should route to the alias learning flow described below.

### Language Hall Page

Recommended layout:

1. Header:
   - Title: `Language Hall`
   - Subtitle: `Words are flexible. Cards are anchors.`

2. Anchor explanation row:
   - compact principle copy
   - progress such as `3/7 vocabulary`

3. Alias room grid:
   - all current alias labels visible
   - locked/unlocked status on each tile
   - each tile opens its own challenge

4. Individual challenge view:
   - selected alias prompt
   - 4 anchor-card choices packed into one row on desktop
   - feedback line
   - return to Language Hall after a correct answer

5. Discovery boundary panel:
   - `Chesty` and `Crisp`
   - show recipes, not aliases

6. Completion reward:
   - each correct word unlocks that one vocabulary card in Collection

### Visual Style

Alias cards should be visually distinct from discoveries:

- smaller badge-like frame
- neutral language color
- no star icon
- maybe a small quote mark or speech-bubble icon

Avoid making aliases look like weaker discoveries. They are a different learning layer.

## 11. Data Model

Add a new file:

```text
web/app/src/cards/aliasVocabulary.ts
```

Suggested type:

```ts
export type AliasVocabularyKind = "single_anchor" | "ambiguous";

export type AliasVocabularyCard = {
  id: string;
  label: string;
  kind: AliasVocabularyKind;
  anchorIds: string[];
  summary: string;
  contexts: Array<{
    text: string;
    answerIds: string[];
    explanation: string;
  }>;
  icon?: {
    src: string;
    alt: string;
  };
};
```

Suggested MVP data:

```ts
export const aliasVocabularyCards: AliasVocabularyCard[] = [
  {
    id: "droning",
    label: "Droning",
    kind: "single_anchor",
    anchorIds: ["rumble"],
    summary: "Sustained low movement pointing toward Rumble.",
    contexts: [
      {
        text: "The low end keeps rolling underneath the music.",
        answerIds: ["rumble"],
        explanation: "That sustained sub movement is closest to Rumble."
      }
    ]
  },
  {
    id: "bassy",
    label: "Bassy",
    kind: "ambiguous",
    anchorIds: ["boomy", "muddy"],
    summary: "A loose word for too much low end; Boomy and Muddy can both be valid anchors.",
    contexts: [
      {
        text: "Someone says the sound is bassy.",
        answerIds: ["boomy", "muddy"],
        explanation: "Bassy is loose enough that Boomy and Muddy can both be valid. Boomy is more bloom; Muddy is more cloud."
      }
    ]
  }
];
```

The remaining aliases follow the same pattern:

| Alias ID | Label | Kind | Anchor IDs |
|---|---|---|---|
| `lacking` | `Lacking` | `single_anchor` | `thin` |
| `weak` | `Weak` | `single_anchor` | `thin` |
| `colored` | `Colored` | `single_anchor` or `broad` later | `honky` |
| `presence` | `Presence` | `single_anchor` or `broad` later | `shouty` |
| `dark` | `Dark` | `single_anchor` | `dull` |

If we want extra precision later, add `broad_anchor` as a third kind for `Colored` and `Presence`.

## 12. Persistence

Add to save data:

```ts
unlockedAliasIds: string[];
languageHall: {
  completed: boolean;
  completedAt?: string;
  attemptsByAliasId: Record<string, number>;
};
```

MVP simplification:

- Only store `unlockedAliasIds`.
- Add one alias ID whenever that alias prompt is answered correctly.

Recommended MVP:

```ts
unlockedAliasIds: string[];
```

Migration:

- Existing saves default to `[]`.

## 13. i18n

Add labels to `web/app/src/i18n/en.json` and other language files later.

MVP can keep English only if this remains a prototype, but the strings should still be routed through i18n keys where practical.

Suggested key pattern:

```text
alias.droning.label
alias.droning.summary
alias.droning.context.0.text
alias.droning.context.0.explanation
languageHall.title
languageHall.subtitle
languageHall.reward
```

## 14. Tests

Add tests for:

1. Alias vocabulary IDs are unique.
2. Every alias anchor exists as a basic descriptor.
3. No alias vocabulary ID collides with a discovery ID unless explicitly marked as `discovery_boundary_example`.
4. Live basic aliases do not collide with discovery IDs. This already exists in `recipeMatcher.test.ts`.
5. The total exercise count equals the alias count.
6. Single-anchor aliases have exactly one anchor.

Example test:

```ts
it("keeps alias vocabulary anchored to existing basic cards", () => {
  const basicIds = new Set(allBasicIds);

  for (const alias of aliasVocabularyCards) {
    expect(alias.anchorIds.every((id) => basicIds.has(id))).toBe(true);
  }
});
```

## 15. Implementation Steps

### Step 1: Create Alias Vocabulary Data

Add:

```text
web/app/src/cards/aliasVocabulary.ts
```

Include the 7 current alias labels and their anchor relationships.

### Step 2: Add Building Route / Hub

Add a new top-level page for `Building`.

Header order:

```text
Learn | Atlas | Building | Collection | Setting
```

Move the current Sandbox entry into the Building hub as `Laboratory`.

Do not remove Collection from the header.

### Step 3: Add Persistence Field

Update:

- `web/app/src/persistence/saveData.ts`
- `web/app/src/persistence/migrations.ts`

Add `unlockedAliasIds`.

### Step 4: Build Language Hall Screen

Possible new component:

```text
web/app/src/ui/screens/LanguageHallScreen.tsx
```

If the app currently keeps screens inside `App.tsx`, start there for MVP and extract later.

State needed:

- selected alias ID
- selected answer
- feedback

Completion:

- unlock the current alias ID as soon as its prompt is answered correctly
- return the learner to the hall grid so they can choose the next word

### Step 5: Add Alias Cards To The Spectral Collection Section

Add alias vocabulary cards inside the existing `Spectral` Collection section:

- show them alongside Spectral basics and discoveries
- keep them visually distinct as vocabulary cards
- locked aliases can appear as locked vocabulary cards
- unlocked aliases open the alias detail modal

### Step 6: Add Alias Detail Modal

Alias modal should show:

- label
- anchor card(s)
- context examples
- "not a DSP card" note

For `Bassy`, show both anchors side-by-side.

### Step 7: Keep Alias Cards Out Of The Laboratory

MVP rule:

- Alias cards are never active DSP cards.
- Alias detail pages do not include a Laboratory use action.
- The Laboratory continues to use basic and discovery-derived descriptor states only.

## 16. MVP Acceptance Criteria

The MVP is complete when:

1. The header order is `Learn | Atlas | Building | Collection | Setting`.
2. The Building hub shows at least `Language Hall` and `Laboratory`.
3. The `Laboratory` tile opens the current Sandbox experience.
4. The `Language Hall` tile opens the alias learning flow.
5. The lab explains anchor cards versus flexible language in under 80 visible words.
6. The player sees 7 individual alias rooms, one for each alias.
7. Each correct prompt unlocks that alias card.
8. Collection shows alias cards inside the `Spectral` section, not in a separate `Vocabulary` section.
9. Alias cards do not apply DSP and do not count as basics/discoveries.
10. Tests prevent alias/discovery collisions.
11. Build passes.

## 17. My Recommendation

Implement this as a small interactive module, not as a paragraph page.

The strongest value of aliases is not the words themselves. It is the lesson that audio language is contextual:

- `Droning` is close to `Rumble`.
- `Dark` is close to `Dull`.
- `Bassy` needs more context.
- `Crisp` is not just a synonym; in this game it is a recipe.

This teaches players how to translate real-world listening comments into stable game anchors without pretending that language is perfectly fixed.

## 18. Future Extensions

Later, the Language Hall can support:

- user-entered notes: "I call this ..."
- region-specific vocabulary packs
- review-language translation: map casual review words to game anchors
- multilingual alias sets
- source-dependent aliases, such as vocal words versus headphone-review words
- "overlap lessons" where multiple answers are acceptable but ranked by context

The long-term role could become a bridge between the game and real audio reviews:

> Hear the anchor. Learn the recipe. Understand the language.
