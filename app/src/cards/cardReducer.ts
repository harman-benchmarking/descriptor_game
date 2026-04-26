import { descriptorById, descriptorCatalog } from "./descriptorCatalog";

const catalogOrder = new Map(descriptorCatalog.map((descriptor, index) => [descriptor.id, index]));

export function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}

export function sortByCatalogOrder(ids: string[]): string[] {
  return [...ids].sort((a, b) => (catalogOrder.get(a) ?? 999) - (catalogOrder.get(b) ?? 999));
}

export function toggleBasicCard(activeIds: string[], descriptorId: string): string[] {
  const descriptor = descriptorById.get(descriptorId);
  if (!descriptor) return activeIds;

  if (activeIds.includes(descriptorId)) {
    return activeIds.filter((id) => id !== descriptorId);
  }

  const conflictingIds = activeIds.filter((activeId) => {
    const active = descriptorById.get(activeId);
    return descriptor.conflictsWith.includes(activeId) || (active?.conflictsWith.includes(descriptorId) ?? false);
  });

  const nextIds = activeIds.filter((id) => !conflictingIds.includes(id)).concat(descriptorId);

  return sortByCatalogOrder(unique(nextIds));
}

export function describeRemovedCards(previousIds: string[], nextIds: string[]): string[] {
  const next = new Set(nextIds);
  return previousIds.filter((id) => !next.has(id));
}
