export const ANIMATION_CONFIG = {
  verticalFloat: { frequency: 1.2, amplitude: 0.05 },
  verticalFloatSecondary: { frequency: 2.5, amplitude: 0.02 },
  horizontalDrift: [
    { frequency: 0.8, amplitude: 0.03 },
    { frequency: 1.7, amplitude: 0.02 },
    { frequency: 3.2, amplitude: 0.01 },
  ],
  depthMovement: { frequency: 1.5, amplitude: 0.02 },
  rotationWobble: { frequency: 1.0, amplitude: 0.01 },
} as const;

export const DEFAULT_COLORS = [
  "#A2CCB6",
  "#FCEEB5",
  "#EE786E",
  "#e0feff",
  "lightpink",
  "lightblue",
] as const;

export const SCENE_CONFIG = {
  camera: {
    position: [0, 0, 30] as [number, number, number],
    fov: 10,
  },
  fog: {
    color: "white",
    near: 50,
    far: 190,
  },
  background: "#020207",
  toneMapping: {
    exposure: 1.5,
  },
} as const;

export const PACK_DIMENSIONS = {
  width: 3,
  height: 3,
} as const;

export const SPARK_CONFIG = {
  defaultCount: 20,
  defaultRadius: 10,
  curvePoints: 1000,
  pointCount: 30,
} as const;
