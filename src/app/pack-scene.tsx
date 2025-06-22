"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import dynamic from "next/dynamic";
import { SCENE_CONFIG } from "./pack-scene/constants";
import { BlendFunction } from "postprocessing";

const Sun = dynamic(
  () =>
    import("./pack-scene/components/sun").then((mod) => ({ default: mod.Sun })),
  {
    ssr: false,
  }
);

const Pack = dynamic(
  () =>
    import("./pack-scene/components/pack").then((mod) => ({
      default: mod.Pack,
    })),
  {
    ssr: false,
  }
);

const LoadingScene = dynamic(
  () =>
    import("./pack-scene/components/loading-scene").then((mod) => ({
      default: mod.LoadingScene,
    })),
  {
    ssr: false,
  }
);

interface PackSceneProps {
  onSunPositionUpdate?: (position: { x: number; y: number }) => void;
  isAnimating?: boolean;
  onAnimationComplete?: () => void;
}

export const PackScene = ({
  onSunPositionUpdate,
  isAnimating = false,
  onAnimationComplete,
}: PackSceneProps = {}) => {
  const [isReady, setIsReady] = useState(false);
  const [sunScreenPosition, setSunScreenPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const loadDependencies = async () => {
      try {
        const { Line2, LineGeometry, LineMaterial } = await import(
          "three-fatline"
        );
        extend({ Line2, LineGeometry, LineMaterial });

        const { MeshLine, MeshLineMaterial } = await import("threejs-meshline");
        extend({ MeshLine, MeshLineMaterial });

        setIsReady(true);
      } catch (error) {
        console.error("Failed to load 3D dependencies:", error);
      }
    };

    loadDependencies();
  }, []);

  useEffect(() => {
    if (onSunPositionUpdate) {
      onSunPositionUpdate(sunScreenPosition);
    }
  }, [sunScreenPosition, onSunPositionUpdate]);

  if (!isReady) {
    return <LoadingScene />;
  }

  return (
    <>
      <div
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "90vh",
            height: "90vh",
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.1) 80%, transparent 100%)`,
            position: "absolute",
            left: `${sunScreenPosition.x}%`,
            top: `${sunScreenPosition.y}%`,
            transform: "translate(-50%, -50%)",
            transition: "none",
          }}
        />
      </div>

      <div className="fixed inset-0 w-full h-full" style={{ zIndex: 10 }}>
        <Canvas
          camera={{
            position: SCENE_CONFIG.camera.position,
            fov: SCENE_CONFIG.camera.fov,
          }}
          gl={{
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: SCENE_CONFIG.toneMapping.exposure,
            alpha: true,
            antialias: true,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
          style={{ position: "absolute", inset: 0 }}
        >
          <fog
            attach="fog"
            args={[
              SCENE_CONFIG.fog.color,
              SCENE_CONFIG.fog.near,
              SCENE_CONFIG.fog.far,
            ]}
          />

          <ambientLight intensity={0.5} />
          <pointLight distance={100} intensity={4} color="white" />
          <pointLight
            distance={40}
            intensity={8}
            color="lightblue"
            position={[0, 0, 0]}
          />

          <SunWithTracking
            onPositionUpdate={setSunScreenPosition}
            isAnimating={isAnimating}
            onAnimationComplete={onAnimationComplete}
          />

          <Pack />

          <EffectComposer>
            <Bloom
              intensity={1.5}
              luminanceThreshold={0}
              luminanceSmoothing={1}
              mipmapBlur
              blendFunction={BlendFunction.SCREEN}
            />
          </EffectComposer>
        </Canvas>
      </div>
    </>
  );
};

interface SunWithTrackingProps {
  onPositionUpdate: (position: { x: number; y: number }) => void;
  isAnimating?: boolean;
  onAnimationComplete?: () => void;
}

const SunWithTracking = ({
  onPositionUpdate,
  isAnimating = false,
  onAnimationComplete,
}: SunWithTrackingProps) => {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;

    const worldPos = new THREE.Vector3();
    groupRef.current.getWorldPosition(worldPos);

    const screenPos = worldPos.clone();
    screenPos.project(camera);

    const x = (screenPos.x * 0.5 + 0.5) * 100;
    const y = (1 - (screenPos.y * 0.5 + 0.5)) * 100;

    onPositionUpdate({ x, y });
  });

  return (
    <Sun
      ref={groupRef}
      isAnimating={isAnimating}
      onAnimationComplete={onAnimationComplete}
    />
  );
};
