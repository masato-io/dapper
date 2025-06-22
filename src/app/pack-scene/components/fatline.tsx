"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { FatlineProps, LineMaterialRef } from "../types";

export const Fatline = ({ curve, width, color, speed }: FatlineProps) => {
  const materialRef = useRef<LineMaterialRef>(null);

  useFrame(() => {
    if (materialRef.current?.dashOffset !== undefined) {
      materialRef.current.dashOffset -= speed;
    }
  });

  return (
    <line2>
      <lineGeometry attach="geometry" positions={curve} />
      <lineMaterial
        ref={materialRef}
        attach="material"
        color={color}
        linewidth={width}
        dashed
        dashScale={50}
        dashSize={0.1}
        gapSize={0.05}
        transparent
        depthTest={false}
      />
    </line2>
  );
};
