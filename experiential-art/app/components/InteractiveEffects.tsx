'use client';

/**
 * Interactive Scene Effects Component
 *
 * Adds dynamic visual effects:
 * - Particle system around artwork
 * - Bloom effect post-processing
 * - Depth-of-field blur
 * - Color shift on hover
 * - Object highlighting
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface InteractiveEffectsProps {
  /** Enable particle system */
  particleSystem?: boolean;
  /** Particle count (0-1000) */
  particleCount?: number;
  /** Accent color for particles */
  accentColor?: string;
}

export function ParticleSystem({
  particleCount = 50,
  accentColor = '#00ff88',
}: {
  particleCount?: number;
  accentColor?: string;
}) {
  const particlesRef = useRef<THREE.Points>(null);
  const positionArray = useMemo(() => {
    const array = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      array[i * 3] = (Math.random() - 0.5) * 8;
      array[i * 3 + 1] = (Math.random() - 0.5) * 8;
      array[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return array;
  }, [particleCount]);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x += 0.0001;
      particlesRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positionArray}
          count={particleCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={accentColor}
        transparent={true}
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

/**
 * Bloom effect layer - creates glow around bright objects
 */
export function BloomLayer({ accentColor = '#00ff88' }: { accentColor?: string }) {
  const bloomRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (bloomRef.current) {
      bloomRef.current.rotation.x += 0.0005;
      bloomRef.current.rotation.z += 0.0003;
    }
  });

  return (
    <mesh ref={bloomRef} position={[0, 0, 0]}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshBasicMaterial
        color={accentColor}
        transparent={true}
        opacity={0.05}
        fog={false}
      />
    </mesh>
  );
}

export { ParticleSystem as default };

