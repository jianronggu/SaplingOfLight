'use client';

/**
 * Art Gallery Scene Component
 *
 * Displays a full-screen immersive 3D art experience with professional controls.
 * Features:
 * - Full-screen responsive canvas (desktop & mobile)
 * - Constrained orbit controls (limited rotation angles)
 * - Loading fallback with spinner
 * - Elegant gallery-style overlay
 * - Auto-hiding UI on interaction
 * - Responsive sizing and touch support
 */

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useState } from 'react';
import ArtScene from '@/app/components/ArtScene';
import GalleryOverlay from '@/app/components/GalleryOverlay';
import CanvasLoadingFallback from '@/app/components/CanvasLoadingFallback';

interface ArtGalleryProps {
  /** Title of the artwork */
  title?: string;
  /** Description of the artwork */
  description?: string;
  /** Enable user interaction with orbit controls */
  interactive?: boolean;
  /** Accent color for the scene */
  accentColor?: string;
  /** Path to .glb/.gltf model file */
  modelPath?: string;
  /** Scale of the model */
  modelScale?: number | [number, number, number];
  /** Position of the model [x, y, z] */
  modelPosition?: [number, number, number];
}

export default function ArtGalleryScene({
  title = 'Experiential Artwork',
  description = 'An immersive 3D art piece',
  interactive = true,
  accentColor = '#00ff88',
  modelPath,
  modelScale,
  modelPosition,
}: ArtGalleryProps) {
  const [isLoading, setIsLoading] = useState(!!modelPath);
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Full-Screen 3D Canvas - Responsive */}
      <Canvas
        camera={{
          position: [0, 2, 5],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: false,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full"
        dpr={typeof window !== 'undefined' ? window.devicePixelRatio : 1}
      >
        {/* Dark atmospheric background */}
        <color attach="background" args={['#0a0a0a']} />

        {/* Subtle fog for depth perception */}
        <fog attach="fog" args={['#0a0a0a', 10, 100]} />

        {/* Main Art Scene with all 3D elements */}
        <Suspense fallback={<CanvasLoadingFallback />}>
          <ArtScene
            title={title}
            description={description}
            accentColor={accentColor}
            rotationSpeed={0.5}
            floatSpeed={0.8}
            modelPath={modelPath}
            modelScale={modelScale}
            modelPosition={modelPosition}
          />
        </Suspense>

        {/* Constrained Orbit Controls - Limited rotation angles */}
        {interactive && (
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={1.2}

            {/* Constrain vertical rotation - don't flip upside down */}
            minPolarAngle={Math.PI * 0.35}  // ~63° from bottom
            maxPolarAngle={Math.PI * 0.65}  // ~117° from bottom

            {/* Constrain zoom distance for optimal viewing */}
            minDistance={3}
            maxDistance={15}

            {/* Smooth damping for natural feel */}
            dampingFactor={0.08}
            autoRotateDampingFactor={0.08}

            {/* Responsive rotation speed */}
            rotateSpeed={0.8}
            zoomSpeed={1.2}

            {/* No horizontal pan - keep focus on object */}
            enableDamping={true}
            enableAutoRotate={true}
          />
        )}
      </Canvas>

      {/* Elegant Gallery Overlay - Responsive & Auto-hide */}
      <GalleryOverlay
        title={title}
        subtitle={description}
        accentColor={accentColor}
        isLoading={isLoading}
      />
    </div>
  );
}

