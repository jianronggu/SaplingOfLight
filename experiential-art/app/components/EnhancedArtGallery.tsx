'use client';

/**
 * Enhanced Art Gallery Scene - Full Featured Version
 *
 * Complete immersive experience with:
 * - Advanced 3-point lighting system
 * - Interactive controls panel
 * - Keyboard shortcuts
 * - Particle effects
 * - Bloom effects
 * - Dynamic lighting
 * - Performance optimized
 */

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useState, useRef } from 'react';
import EnhancedGalleryScene from '@/app/components/EnhancedGalleryScene';
import GalleryOverlay from '@/app/components/GalleryOverlay';
import CanvasLoadingFallback from '@/app/components/CanvasLoadingFallback';
import ViewerControlsPanel from '@/app/components/ViewerControlsPanel';

interface EnhancedArtGalleryProps {
  /** Title of the artwork */
  title?: string;
  /** Description of the artwork */
  description?: string;
  /** Enable user interaction */
  interactive?: boolean;
  /** Accent color */
  accentColor?: string;
  /** Path to 3D model */
  modelPath?: string;
  /** Model scale */
  modelScale?: number | [number, number, number];
  /** Model position */
  modelPosition?: [number, number, number];
  /** Enable particle effects */
  enableParticles?: boolean;
  /** Enable bloom effect */
  enableBloom?: boolean;
  /** Enable dynamic lighting */
  enableDynamicLighting?: boolean;
  /** Enable controls panel */
  enableControlsPanel?: boolean;
  /** Enable keyboard shortcuts */
  enableKeyboardShortcuts?: boolean;
}

export default function EnhancedArtGallery({
  title = 'Experiential Artwork',
  description = 'An immersive 3D art piece',
  interactive = true,
  accentColor = '#00ff88',
  modelPath,
  modelScale,
  modelPosition,
  enableParticles = true,
  enableBloom = true,
  enableDynamicLighting = true,
  enableControlsPanel = true,
  enableKeyboardShortcuts = true,
}: EnhancedArtGalleryProps) {
  const [isLoading, setIsLoading] = useState(!!modelPath);
  const [lightingIntensity, setLightingIntensity] = useState(1);
  const [rotationSpeed, setRotationSpeed] = useState(0.5);
  const [autoRotateEnabled, setAutoRotateEnabled] = useState(true);
  const orbitControlsRef = useRef<any>(null);

  const handleResetCamera = () => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.reset();
    }
  };

  const handleLightingChange = (intensity: number) => {
    setLightingIntensity(intensity);
  };

  const handleRotationSpeedChange = (speed: number) => {
    setRotationSpeed(speed);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Full-Screen 3D Canvas */}
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
        {/* Background */}
        <color attach="background" args={['#0a0a0a']} />

        {/* Fog for depth */}
        <fog attach="fog" args={['#0a0a0a', 10, 100]} />

        {/* Enhanced Scene with all features */}
        <Suspense fallback={<CanvasLoadingFallback />}>
          <EnhancedGalleryScene
            title={title}
            description={description}
            accentColor={accentColor}
            rotationSpeed={rotationSpeed}
            floatSpeed={0.8}
            modelPath={modelPath}
            modelScale={modelScale}
            modelPosition={modelPosition}
            enableParticles={enableParticles}
            enableBloom={enableBloom}
            enableDynamicLighting={enableDynamicLighting}
            lightingIntensity={lightingIntensity}
            particleCount={50}
          />
        </Suspense>

        {/* Enhanced Orbit Controls */}
        {interactive && (
          <OrbitControls
            ref={orbitControlsRef}
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            autoRotate={autoRotateEnabled}
            autoRotateSpeed={rotationSpeed}
            minPolarAngle={Math.PI * 0.35}
            maxPolarAngle={Math.PI * 0.65}
            minDistance={3}
            maxDistance={15}
            dampingFactor={0.08}
            autoRotateDampingFactor={0.08}
            rotateSpeed={0.8}
            zoomSpeed={1.2}
            enableDamping={true}
            enableAutoRotate={autoRotateEnabled}
          />
        )}
      </Canvas>

      {/* Gallery Overlay */}
      <GalleryOverlay
        title={title}
        subtitle={description}
        accentColor={accentColor}
        isLoading={isLoading}
      />

      {/* Viewer Controls Panel */}
      {enableControlsPanel && (
        <ViewerControlsPanel
          initialLightingIntensity={lightingIntensity}
          initialRotationSpeed={rotationSpeed}
          onLightingIntensityChange={handleLightingChange}
          onRotationSpeedChange={handleRotationSpeedChange}
          onAutoRotateToggle={setAutoRotateEnabled}
          onResetCamera={handleResetCamera}
          showKeyboardShortcuts={enableKeyboardShortcuts}
          position="bottom-right"
        />
      )}

      {/* Keyboard Shortcuts Info (Hidden by default, togglable in controls panel) */}
      {enableKeyboardShortcuts && (
        <div className="absolute bottom-4 left-4 text-xs text-gray-500 pointer-events-none hidden md:block">
          <div>↑/W: Zoom In | ↓/S: Zoom Out | R: Reset | Space: Toggle Rotation</div>
        </div>
      )}
    </div>
  );
}

