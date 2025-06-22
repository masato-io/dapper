declare module "threejs-meshline" {
  import { BufferGeometry, Material } from "three";

  export class MeshLine extends BufferGeometry {
    setVertices(vertices: number[] | Float32Array): void;
    vertices: number[] | Float32Array;
  }

  export class MeshLineMaterial extends Material {
    constructor(parameters?: {
      color?: string | number;
      lineWidth?: number;
      dashArray?: number;
      dashRatio?: number;
      transparent?: boolean;
      depthTest?: boolean;
      uniforms?: Record<string, unknown>;
    });
    uniforms: {
      dashOffset: { value: number };
      [key: string]: { value: unknown };
    };
  }
}
