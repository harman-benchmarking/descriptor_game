import { discoveryCards } from "./discoveryRecipes";
import type { DiscoveryCard } from "./cardTypes";

export function matchedDiscoveries(activeIds: string[]): DiscoveryCard[] {
  const active = new Set(activeIds);

  return discoveryCards
    .map((recipe, index) => ({ recipe, index }))
    .filter(({ recipe }) => recipe.ingredientIds.every((id) => active.has(id)))
    .sort((a, b) => {
      const ingredientDelta = b.recipe.ingredientIds.length - a.recipe.ingredientIds.length;
      if (ingredientDelta !== 0) return ingredientDelta;

      const priorityDelta = b.recipe.priority - a.recipe.priority;
      if (priorityDelta !== 0) return priorityDelta;

      return a.index - b.index;
    })
    .map(({ recipe }) => recipe);
}

export function exactMatchedDiscovery(activeIds: string[]): DiscoveryCard | undefined {
  const active = new Set(activeIds);
  return matchedDiscoveries(activeIds).find(
    (recipe) => recipe.ingredientIds.length === active.size && recipe.ingredientIds.every((id) => active.has(id))
  );
}

export function hasExtraIngredientsForMatch(activeIds: string[], recipe: DiscoveryCard): boolean {
  return activeIds.some((id) => !recipe.ingredientIds.includes(id));
}
