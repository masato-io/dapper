import * as THREE from "three";

const randomInRange = (min = 0.2, max = 1): number =>
  Math.max(min, Math.random() * max);

export const generateRandomPosition = (radius: number): THREE.Vector3 =>
  new THREE.Vector3(
    Math.sin(0) * radius * randomInRange(),
    Math.cos(0) * radius * randomInRange(),
    0
  );

export const generateCircularPoints = (
  center: THREE.Vector3,
  radius: number,
  pointCount = 30
): THREE.Vector3[] =>
  Array.from({ length: pointCount }, (_, index) => {
    const angle = (index / 20) * Math.PI * 2;
    return center
      .clone()
      .add(
        new THREE.Vector3(
          Math.sin(angle) * radius * randomInRange(),
          Math.cos(angle) * radius * randomInRange(),
          0
        )
      );
  });

export const vectorsToFlatArray = (vectors: THREE.Vector3[]): number[] =>
  vectors.flatMap((point) => [point.x, point.y, point.z]);
