"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { ANIMATION_CONFIG, PACK_DIMENSIONS } from "../constants";

export const Pack = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  const texture = useTexture("/1.png");
  const animationStartTime = useRef<number | null>(null);

  useEffect(() => {
    animationStartTime.current = Date.now();
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const mesh = meshRef.current;

    let entranceProgress = 1;
    if (animationStartTime.current) {
      const elapsed = (Date.now() - animationStartTime.current) / 1000;
      entranceProgress = Math.min(elapsed / 0.8, 1);
    }

    const easedProgress = 1 - Math.pow(1 - entranceProgress, 3);

    if (mesh.material) {
      (mesh.material as THREE.MeshStandardMaterial).opacity = easedProgress;
    }

    mesh.rotation.y = pointer.x * 0.3 * easedProgress;
    mesh.rotation.x = -pointer.y * 0.2 * easedProgress;

    const {
      verticalFloat,
      verticalFloatSecondary,
      horizontalDrift,
      depthMovement,
      rotationWobble,
    } = ANIMATION_CONFIG;

    const floatY =
      Math.sin(time * verticalFloat.frequency) * verticalFloat.amplitude +
      Math.sin(time * verticalFloatSecondary.frequency) *
        verticalFloatSecondary.amplitude;

    const floatX = horizontalDrift.reduce(
      (acc, { frequency, amplitude }) =>
        acc + Math.sin(time * frequency) * amplitude,
      0
    );

    const floatZ =
      Math.sin(time * depthMovement.frequency) * depthMovement.amplitude;

    const wobbleZ =
      Math.sin(time * rotationWobble.frequency) * rotationWobble.amplitude;

    if (entranceProgress < 1) {
      mesh.position.y = floatY * easedProgress;
      mesh.position.x = floatX * easedProgress;
      mesh.position.z = floatZ * easedProgress;

      mesh.rotation.z = wobbleZ * easedProgress;

      const scale = 0.8 + 0.2 * easedProgress;
      mesh.scale.set(scale, scale, scale);
    } else {
      mesh.position.y = floatY;
      mesh.position.x = floatX;
      mesh.position.z = floatZ;
      mesh.rotation.z = wobbleZ;
      mesh.scale.set(1, 1, 1);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[PACK_DIMENSIONS.width, PACK_DIMENSIONS.height]} />
      <meshStandardMaterial
        map={texture}
        side={THREE.DoubleSide}
        transparent
        opacity={0}
        metalness={0.1}
        roughness={0.4}
        emissive={new THREE.Color(0xffffff)}
        emissiveIntensity={2}
        emissiveMap={texture}
        toneMapped={false}
      />
    </mesh>
  );
};
