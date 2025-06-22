"use client";

import { forwardRef, useRef, useImperativeHandle, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ANIMATION_CONFIG } from "../constants";

interface SunProps {
  isAnimating?: boolean;
  onAnimationComplete?: () => void;
}

export const Sun = forwardRef<THREE.Group, SunProps>(
  ({ isAnimating = false, onAnimationComplete }, ref) => {
    const groupRef = useRef<THREE.Group>(null);
    const sunMeshRef = useRef<THREE.Mesh>(null);
    const innerGlowRef = useRef<THREE.Mesh>(null);
    const outerGlowRef = useRef<THREE.Mesh>(null);

    const animationProgress = useRef(0);
    const animationStarted = useRef(false);

    useImperativeHandle(ref, () => groupRef.current!, []);

    useEffect(() => {
      if (isAnimating && !animationStarted.current) {
        animationStarted.current = true;
        animationProgress.current = 0;
      }
    }, [isAnimating]);

    useFrame(({ clock }, delta) => {
      if (!groupRef.current || !sunMeshRef.current) return;

      const time = clock.getElapsedTime();

      if (isAnimating && animationProgress.current < 1) {
        animationProgress.current = Math.min(
          animationProgress.current + delta * 1.0,
          1
        );

        const progress = animationProgress.current;
        const easeInOutCubic =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        if (sunMeshRef.current) {
          const scale = 1 + easeInOutCubic * 2;
          sunMeshRef.current.scale.setScalar(scale);
          (sunMeshRef.current.material as THREE.MeshBasicMaterial).opacity =
            0.01 + easeInOutCubic * 0.99;
        }

        if (innerGlowRef.current) {
          const scale = 1 + easeInOutCubic * 2.5;
          innerGlowRef.current.scale.setScalar(scale);
          (innerGlowRef.current.material as THREE.MeshBasicMaterial).opacity =
            0.005 + easeInOutCubic * 0.5;
        }

        if (outerGlowRef.current) {
          const scale = 1 + easeInOutCubic * 3;
          outerGlowRef.current.scale.setScalar(scale);
          (outerGlowRef.current.material as THREE.MeshBasicMaterial).opacity =
            0.001 + easeInOutCubic * 0.3;
        }

        if (animationProgress.current >= 1 && onAnimationComplete) {
          onAnimationComplete();
        }

        return;
      }

      if (!isAnimating) {
        const verticalFloat =
          Math.sin(time * ANIMATION_CONFIG.verticalFloat.frequency) *
          ANIMATION_CONFIG.verticalFloat.amplitude;

        const secondaryFloat =
          Math.sin(time * ANIMATION_CONFIG.verticalFloatSecondary.frequency) *
          ANIMATION_CONFIG.verticalFloatSecondary.amplitude;

        groupRef.current.position.y = verticalFloat + secondaryFloat;

        sunMeshRef.current.position.x = Math.sin(time * 1.2) * 0.04;
        sunMeshRef.current.position.y = Math.cos(time * 1.2) * 0.04;
        sunMeshRef.current.position.z = Math.sin(time * 0.8) * 0.02;
        sunMeshRef.current.rotation.y = time * 0.15;
        sunMeshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;

        if (innerGlowRef.current) {
          innerGlowRef.current.position.x = Math.sin(time * 0.7) * 0.06;
          innerGlowRef.current.position.y = Math.sin(time * 1.4) * 0.03;
          innerGlowRef.current.position.z = Math.cos(time * 0.9) * 0.04;
          innerGlowRef.current.rotation.z = time * -0.08;
          innerGlowRef.current.rotation.y = Math.cos(time * 0.6) * 0.15;
        }

        if (outerGlowRef.current) {
          outerGlowRef.current.position.x =
            Math.sin(time * 0.4 + Math.PI / 2) * 0.08;
          outerGlowRef.current.position.y = Math.cos(time * 0.3) * 0.05;
          outerGlowRef.current.position.z =
            Math.sin(time * 0.5 + Math.PI) * 0.06;
          outerGlowRef.current.rotation.x = Math.sin(time * 0.2) * 0.2;
          outerGlowRef.current.rotation.z = Math.cos(time * 0.3) * 0.1;
        }
      }
    });

    return (
      <group ref={groupRef} position={[0, 0, -5]}>
        <mesh ref={sunMeshRef}>
          <sphereGeometry args={[1.0, 64, 64]} />
          <meshBasicMaterial
            color="#fff"
            transparent
            opacity={0.01}
            depthWrite={false}
          />
        </mesh>

        <mesh ref={innerGlowRef}>
          <sphereGeometry args={[1.4, 32, 32]} />
          <meshBasicMaterial
            color="#ccc"
            transparent
            opacity={0.005}
            side={THREE.BackSide}
          />
        </mesh>

        <mesh ref={outerGlowRef}>
          <sphereGeometry args={[1.8, 32, 32]} />
          <meshBasicMaterial
            color="#fff"
            transparent
            opacity={0.001}
            side={THREE.BackSide}
            depthWrite={false}
          />
        </mesh>

        <pointLight color="#ffcc00" intensity={0.1} distance={15} decay={2} />
      </group>
    );
  }
);

Sun.displayName = "Sun";
