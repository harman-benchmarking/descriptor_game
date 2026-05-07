# Campus And Orientation Center

This document owns the top-level app navigation and the Campus/Orientation experience.

## Purpose

Campus is the app's first-place directory for the main buildings. It gives the player fast access to the main training places and always-available utility functions. Atlas, Collection, and Settings are also reachable through top navigation, and Atlas is surfaced from Orientation Center.

Orientation Center is the curriculum lobby inside Campus. It presents the training path as `Training Grounds -> Atlas -> Lexicon Hall -> Calibration Tower`. Lexicon Hall is locked until every live Atlas Discovery is collected, and the Tower is locked until the first three places are complete.

## Current Screens

| Screen | Route id | Role |
|---|---|---|
| Campus | `building` | Main hub with building tiles. |
| Orientation Center | `orientation` | Curriculum path, Tower prerequisite checklist, and utility links. |
| Training Grounds | `learn` | Learn basic descriptor cards. |
| Calibration Tower | `tower` | Blind expert calibration challenge, locked until the curriculum path is complete. |
| Atlas | `region` | Region map and Discovery crafting. |
| Lexicon Hall | `languageHall` | Alias vocabulary challenges, locked until Atlas is complete. |
| Collection | `collection` | Card collection and dev unlock tools. |
| Sound Lab | `sandbox` | Free mixing with unlocked basics. |
| Settings | `settings` | Language, intensity, and reset. |

## Campus Tiles

Campus currently exposes:

| Building | Function | Progress chip |
|---|---|---|
| Orientation Center | Shows the app map and recommended flow. | `Start` |
| Training Grounds | Unlocks basic descriptor cards. | Learned basics count. |
| Calibration Tower | Blind descriptor calibration. | `Path locked` until curriculum completion; then Floor 1 score progress. |
| Lexicon Hall | Alias vocabulary practice. | `Atlas first` until every Discovery is collected; then alias unlock count. |
| Sound Lab | Free experiment surface. | Tool label. |

Campus does not own descriptor card content directly. It surfaces progress summaries from the card systems:

- Training Grounds chip: learned basics out of all basics.
- Calibration Tower chip: `Path locked` until all live basics, Discoveries, and alias cards are collected; after unlock, Floor 1 score progress.
- Lexicon Hall chip: `Atlas first` until every live Discovery is collected; after unlock, aliases out of all alias cards.
- Sound Lab chip: navigation affordance, not a progress counter.

## Orientation Path

Orientation Center separates the main curriculum from supporting tools.

Main path:

| Step | Destination | Completion source |
|---|---|---|
| 1. Training Grounds | `learn` | Every basic descriptor in `learnedBasicIds`. |
| 2. Atlas | `region` | Every Discovery card in `unlockedDiscoveryIds`. |
| 3. Lexicon Hall | `languageHall` | Unlocked after every Discovery card is in `unlockedDiscoveryIds`; complete when every alias card is in `unlockedAliasIds`. |
| 4. Calibration Tower | `tower` | Unlocked only when the first three steps are complete. |

Tools:

| Tool | Destination | Role |
|---|---|---|
| Sound Lab | `sandbox` | Free mixing with learned basics. |
| Collection | `collection` | All card families and dev unlock tools. |

No Orientation award is shown in this pass. The eventual reward should be considered separately and should trigger after passing Floor 6 in Calibration Tower.

Descriptor-level lists live in the function docs for Training Grounds, Atlas, Tower, Lexicon Hall, Sound Lab, and Collection. Campus should link to functions without duplicating every card table.

## Details Included

Campus and Orientation include navigation details, not descriptor content:

- screen ids and destinations;
- building tile functions;
- progress chip meanings;
- Orientation path destinations;
- Lexicon and Tower lock status and prerequisite progress;
- utility function destinations;
- where descriptor-level card details are owned.

## Navigation Rule

Navigation should feel like a campus with a clear curriculum path:

- Keep the main functions visible early.
- Lock Lexicon Hall until every Atlas Discovery is collected.
- Lock Tower until Training Grounds, Atlas, and Lexicon Hall are complete.
- Make the Atlas visible even before every region is enterable.
- Keep Sound Lab, Collection, Settings, and top navigation reachable as utility access.

## Implementation References

- Screen ids: `web/app/src/app/routes.ts`
- Campus screen: `web/app/src/app/App.tsx` `BuildingScreen`
- Orientation screen: `web/app/src/app/App.tsx` `OrientationCenterScreen`
- Building copy: `web/app/src/i18n/en.json`
