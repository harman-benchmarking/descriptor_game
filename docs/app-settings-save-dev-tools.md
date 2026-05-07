# Settings, Save Data, And Dev Tools

This document owns persistent settings, save schema behavior, and dev progress tools.

## Settings Screen

Settings currently exposes:

- Language picker
- Reset progress

## Save Data

The current save schema stores:

- `schemaVersion: 1`
- `locale`
- `unlockedDiscoveryIds`
- `unlockedAliasIds`
- `learnedBasicIds`
- `completedChallenges`
- `settings.reducedMotion`
- `settings.intensity`
- `settings.preferHints`

Exact current type:

```ts
type SaveDataV1 = {
  schemaVersion: 1;
  locale: Locale;
  unlockedDiscoveryIds: string[];
  unlockedAliasIds: string[];
  learnedBasicIds: string[];
  completedChallenges: Record<string, number>;
  settings: {
    reducedMotion: boolean;
    intensity: number;
    preferHints: boolean;
  };
};
```

Default values:

| Field | Default |
|---|---|
| `locale` | `en` |
| `unlockedDiscoveryIds` | `[]` |
| `unlockedAliasIds` | `[]` |
| `learnedBasicIds` | `[]` |
| `completedChallenges` | `{}` |
| `settings.reducedMotion` | `false` |
| `settings.intensity` | `2.0`; saved Lab-only intensity |
| `settings.preferHints` | `true` |

Progress is local to the browser.

## Persistence

Save data is stored in `localStorage` under `descriptor-cards-save-v1`. Migration accepts only objects with `schemaVersion: 1`. Within that schema, it preserves valid progress arrays, normalizes missing settings, clamps intensity into the supported range, and can read old `practiceIntensity` as `settings.intensity` when `settings.intensity` is absent. Parse failures, missing schema versions, and non-`1` schema versions fall back to the default empty save.

`settings.intensity` is currently the Sound Lab slider value. Training Grounds, Calibration Tower, and Atlas use the fixed default intensity instead of reading this saved slider value.

## Progress Keys

Current progress writes include:

| System | Save fields or challenge keys |
|---|---|
| Training Grounds gift pair | `learnedBasicIds`, `completedChallenges["<gate>.gifts"]` |
| Training Grounds blind target | `learnedBasicIds`, `completedChallenges["<gate>.<target>"]` |
| Atlas crafting | `unlockedDiscoveryIds` |
| Calibration Tower | `completedChallenges["tower.<floor>.attempts"]`, `completedChallenges["tower.<floor>.correct"]`, `completedChallenges["tower.<floor>.score"]` |
| Lexicon Hall | `unlockedAliasIds`, `completedChallenges["languageHall.<aliasId>"]` |
| Collection dev buttons | `completedChallenges["dev.unlockAllBasics"]`, `completedChallenges["dev.unlockAllDiscoveries"]`, `completedChallenges["dev.unlockAllAliases"]` |

## Details Included

Settings and save docs include state details rather than descriptor lists:

- exposed settings controls;
- exact `SaveDataV1` fields and defaults;
- `localStorage` key and migration behavior;
- the Lab-only scope of `settings.intensity`;
- progress keys written by each function;
- dev-tool buttons and their save effects.

Descriptor-level card lists live in the function docs that show or mutate cards: Training Grounds, Atlas, Tower, Lexicon Hall, Sound Lab, and Collection.

## Dev Tools

Dev unlock buttons live in Collection:

- unlock all basics
- unlock all discoveries
- unlock all aliases
- wipe save

These are for internal iteration and QA.

## Implementation References

- Save schema: `web/app/src/persistence/saveData.ts`
- Storage: `web/app/src/persistence/storage.ts`
- Migrations: `web/app/src/persistence/migrations.ts`
- Settings UI: `web/app/src/app/App.tsx` `SettingsScreen`
- Collection dev tools: `web/app/src/app/App.tsx` `CollectionScreen`
