import type { CurvePoint } from "../../../audio/dsp/curveResponse";
import type { DescriptorModuleId } from "../../../cards/cardTypes";
import { EqCurveView } from "../EqCurveView";
import { DynamicMotionVisualizer } from "./DynamicMotionVisualizer";
import { IntegrityArtifactVisualizer } from "./IntegrityArtifactVisualizer";
import { SpatialStageVisualizer } from "./SpatialStageVisualizer";
import { moduleForActiveDescriptors } from "./visualizerState";

type Props = {
  activeDescriptorIds: string[];
  fallbackModuleId: DescriptorModuleId;
  curvePoints: CurvePoint[];
};

export function moduleVisualizerLabelKey(moduleId: DescriptorModuleId) {
  return `visualizer.${moduleId}.label`;
}

export function activeVisualizerModule(activeDescriptorIds: string[], fallbackModuleId: DescriptorModuleId): DescriptorModuleId {
  return moduleForActiveDescriptors(activeDescriptorIds, fallbackModuleId);
}

export function ModuleVisualizer({ activeDescriptorIds, fallbackModuleId, curvePoints }: Props) {
  const moduleId = activeVisualizerModule(activeDescriptorIds, fallbackModuleId);

  if (moduleId === "spatial") {
    return <SpatialStageVisualizer activeDescriptorIds={activeDescriptorIds} />;
  }

  if (moduleId === "dynamic") {
    return <DynamicMotionVisualizer activeDescriptorIds={activeDescriptorIds} />;
  }

  if (moduleId === "integrity") {
    return <IntegrityArtifactVisualizer activeDescriptorIds={activeDescriptorIds} />;
  }

  return <EqCurveView points={curvePoints} />;
}
