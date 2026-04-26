import { descriptorCatalog } from "../cards/descriptorCatalog";
import { discoveryCards } from "../cards/discoveryRecipes";
import { regionDefinitions } from "./regions";

export const runtimeAssetPaths = [
  ...descriptorCatalog.map((card) => card.icon.src),
  ...discoveryCards.map((card) => card.icon.src),
  ...regionDefinitions.map((region) => region.imageSrc)
];
