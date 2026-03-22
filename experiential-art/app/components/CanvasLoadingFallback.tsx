'use client';

/**
 * Canvas Loading Fallback
 *
 * Displays while the 3D scene is loading.
 * Works within Canvas via Suspense.
 */

export default function CanvasLoadingFallback() {
  return (
    <mesh position={[0, 0, 0]}>
      {/* Simple geometric placeholder while loading */}
      <boxGeometry args={[1, 1, 1]} />
      <meshPhongMaterial
        color="#222222"
        wireframe={true}
        opacity={0.3}
        transparent={true}
      />
    </mesh>
  );
}

