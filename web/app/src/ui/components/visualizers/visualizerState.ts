import { descriptorById } from "../../../cards/descriptorCatalog";
import type { DescriptorModuleId } from "../../../cards/cardTypes";

export type SpatialVisualizerState = {
  x: -1 | 0 | 1;
  y: -1 | 0 | 1;
  reflection: "dry" | "neutral" | "reverberant";
  image: "focused" | "blurred" | "neutral";
  width: "wide" | "narrow" | "separated" | "crowded" | "neutral";
};

export type DynamicVisualizerState = {
  attack: "neutral" | "snappy" | "softened";
  recovery: "neutral" | "tight" | "loose";
  compression: "none" | "compressed";
  motion: "neutral" | "pumping";
  contrast: "normal" | "flat";
  overload: "none" | "clipped" | "distorted" | "overdriven";
};

export type IntegrityVisualizerState = {
  noise: "none" | "hiss" | "static" | "dirty";
  tone: "none" | "hum" | "buzz" | "whine";
  events: Array<"click" | "pop" | "crackle" | "dropout" | "squeak">;
};

export function moduleForActiveDescriptors(activeDescriptorIds: string[], fallbackModuleId: DescriptorModuleId): DescriptorModuleId {
  const moduleIds = activeDescriptorIds
    .map((id) => descriptorById.get(id)?.moduleId)
    .filter((moduleId): moduleId is DescriptorModuleId => Boolean(moduleId));

  return moduleIds[0] ?? fallbackModuleId;
}

export function spatialStateFromIds(activeDescriptorIds: string[]): SpatialVisualizerState {
  const active = new Set(activeDescriptorIds);
  const x: -1 | 0 | 1 = active.has("left") ? -1 : active.has("right") ? 1 : 0;
  const y: -1 | 0 | 1 = active.has("near") ? 1 : active.has("far") ? -1 : 0;
  const reflection = active.has("dry") ? "dry" : active.has("reverberant") ? "reverberant" : "neutral";
  const image = active.has("focused") ? "focused" : active.has("blurred") ? "blurred" : "neutral";
  const width = active.has("wide")
    ? "wide"
    : active.has("narrow")
      ? "narrow"
      : active.has("separated")
        ? "separated"
        : active.has("crowded")
          ? "crowded"
          : "neutral";

  return { x, y, reflection, image, width };
}

export function dynamicStateFromIds(activeDescriptorIds: string[]): DynamicVisualizerState {
  const active = new Set(activeDescriptorIds);
  const attack = active.has("softened") ? "softened" : active.has("snappy") ? "snappy" : "neutral";
  const recovery = active.has("loose") ? "loose" : active.has("tight") ? "tight" : "neutral";
  const compression = active.has("compressed") ? "compressed" : "none";
  const motion = active.has("pumping") ? "pumping" : "neutral";
  const contrast = active.has("flat-dynamics") ? "flat" : "normal";
  const overload = active.has("clipped") && active.has("distorted")
    ? "overdriven"
    : active.has("clipped")
      ? "clipped"
      : active.has("distorted")
        ? "distorted"
        : "none";

  return { attack, recovery, compression, motion, contrast, overload };
}

export function integrityStateFromIds(activeDescriptorIds: string[]): IntegrityVisualizerState {
  const active = new Set(activeDescriptorIds);
  const events: IntegrityVisualizerState["events"] = [];
  if (active.has("click")) events.push("click");
  if (active.has("pop")) events.push("pop");
  if (active.has("crackle")) events.push("crackle");
  if (active.has("dropout")) events.push("dropout");
  if (active.has("squeak")) events.push("squeak");

  return {
    noise: active.has("dirty") ? "dirty" : active.has("static") ? "static" : active.has("hiss") ? "hiss" : "none",
    tone: active.has("whine") ? "whine" : active.has("buzz") ? "buzz" : active.has("hum") ? "hum" : "none",
    events
  };
}
