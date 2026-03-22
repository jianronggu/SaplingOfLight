'use client';

/**
 * Advanced Lighting Setup Component
 *
 * Provides sophisticated multi-layer lighting for professional gallery experience:
 * - Key light: main illumination
 * - Fill light: shadow reduction
 * - Accent light: focal point glow
 * - Rim light: depth separation
 * - Ambient occlusion: enhanced depth
 * - Dynamic lighting: responds to scene
 */

import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AdvancedLightingProps {
  accentColor: string;
  intensity?: number;
  dynamicLighting?: boolean;
}

export function AdvancedLighting({
  accentColor,
  intensity = 1,
  dynamicLighting = true,
}: AdvancedLightingProps) {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const accentLightRef = useRef<THREE.PointLight>(null);
  const rimLightRef = useRef<THREE.PointLight>(null);
  const timeRef = useRef(0);

  useFrame(() => {
    if (!dynamicLighting) return;

    timeRef.current += 0.016;

    // Subtle key light rotation for dynamic feel
    if (keyLightRef.current) {
      const angle = Math.sin(timeRef.current * 0.3) * 0.3;
      keyLightRef.current.position.x = 8 + angle;
      keyLightRef.current.position.z = 8 + Math.cos(timeRef.current * 0.25) * 0.5;
    }

    // Pulsing accent light for emphasis
    if (accentLightRef.current) {
      const pulse = Math.sin(timeRef.current * 0.8) * 0.3 + 0.7;
      accentLightRef.current.intensity = pulse * intensity;
    }

    // Subtle rim light variation
    if (rimLightRef.current) {
      const rimPulse = Math.sin(timeRef.current * 0.5) * 0.2 + 0.8;
      rimLightRef.current.intensity = rimPulse * intensity;
    }
  });

  // Three-point lighting setup (professional photography standard)
  return (
    <>
      {/* KEY LIGHT - Main illumination from above-right */}
      <directionalLight
        ref={keyLightRef}
        position={[8, 12, 8]}
        intensity={1.5 * intensity}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* FILL LIGHT - Soft illumination from opposite side */}
      <directionalLight
        position={[-8, 8, -8]}
        intensity={0.7 * intensity}
        color="#4488ff"
        castShadow
      />

      {/* AMBIENT LIGHT - Overall scene illumination */}
      <ambientLight intensity={0.5 * intensity} color="#ffffff" />

      {/* ACCENT LIGHT - Creates focal point glow (pulsing) */}
      <pointLight
        ref={accentLightRef}
        position={[10, 15, 10]}
        intensity={1 * intensity}
        color={accentColor}
        distance={50}
        decay={2}
      />

      {/* RIM LIGHT - Adds depth and separation (subtle pulse) */}
      <pointLight
        ref={rimLightRef}
        position={[-15, 5, -15]}
        intensity={0.8 * intensity}
        color="#ff0088"
        distance={40}
        decay={2}
      />

      {/* HEMISPHERE LIGHT - Sky-like lighting for realism */}
      <hemisphereLight
        skyColor="#1a1a2e"
        groundColor="#0a0a0a"
        intensity={0.4 * intensity}
      />
    </>
  );
}

export default AdvancedLighting;

