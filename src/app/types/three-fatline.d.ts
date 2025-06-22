import type { Object3DNode } from "@react-three/fiber";
import type { Line2 } from "three-fatline";
import type { BufferGeometry, Material } from "three";

declare module "@react-three/fiber" {
  interface ThreeElements {
    line2: Object3DNode<Line2, typeof Line2>;
    lineGeometry: Object3DNode<BufferGeometry, typeof BufferGeometry>;
    lineMaterial: Object3DNode<Material, typeof Material>;
  }
}
