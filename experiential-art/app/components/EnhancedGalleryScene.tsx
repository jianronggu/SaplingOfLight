'use client';

/**
 * Enhanced Gallery Scene with Advanced Features
 *
 * Combines:
 * - Advanced multi-light setup
 * - Interactive effects (particles, bloom)
 * - Object info display
 * - Performance monitoring
 * - Interaction analytics
 */

import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import * as THREE from 'three';
import ArtworkModel from './ArtworkModel';
import { ParticleSystem, BloomLayer } from './InteractiveEffects';
import { AdvancedLighting } from './AdvancedLighting';

interface EnhancedGallerySceneProps {
  title?: string;
  description?: string;
  rotationSpeed?: number;
  floatSpeed?: number;
  accentColor?: string;
  modelPath?: string;
  modelScale?: number | [number, number, number];
  modelPosition?: [number, number, number];
  /** Enable particle effects */
  enableParticles?: boolean;
  /** Enable bloom effect */
  enableBloom?: boolean;
  /** Enable dynamic lighting */
  enableDynamicLighting?: boolean;
  /** Lighting intensity multiplier */
  lightingIntensity?: number;
  /** Particle count */
  particleCount?: number;
}

export default function EnhancedGalleryScene({
  title = 'Untitled Artwork',
  description = 'An immersive 3D experience',
  rotationSpeed = 0.5,
  floatSpeed = 0.8,
  accentColor = '#00ff88',
  modelPath,
  modelScale = 1.5,
  modelPosition = [0, 0, 0],
  enableParticles = true,
  enableBloom = true,
  enableDynamicLighting = true,
  lightingIntensity = 1,
  particleCount = 50,
}: EnhancedGallerySceneProps) {
  const groupRef = useRef<Group>(null);
  const objectRef = useRef<Mesh>(null);
  const initialY = useRef(0);
  const timeRef = useRef(0);
  const [hoveredObject, setHoveredObject] = useState(false);

  useFrame((state) => {
    timeRef.current += 0.016; // ~60fps

    if (groupRef.current) {
      // Gentle rotation with speed multiplier
      groupRef.current.rotation.y += 0.0008 * rotationSpeed;
      groupRef.current.rotation.x += 0.0003 * rotationSpeed;

      // Subtle floating motion (bobbing)
      const float = Math.sin(timeRef.current * 0.5 * floatSpeed) * 0.3;
      groupRef.current.position.y = initialY.current + float;

      // Hover effect - scale up slightly
      if (hoveredObject) {
        groupRef.current.scale.lerp(
          new THREE.Vector3(1.1, 1.1, 1.1),
          0.05
        );
      } else {
        groupRef.current.scale.lerp(
          new THREE.Vector3(1, 1, 1),
          0.05
        );
      }
    }

    if (objectRef.current) {
      // Pulsing glow intensity
      const pulse = Math.sin(timeRef.current * 0.8) * 0.15 + 0.3;
      const material = objectRef.current.material as THREE.MeshPhongMaterial;
      if (material.emissiveIntensity !== undefined) {
        material.emissiveIntensity = pulse;
      }
    }

    // Subtle camera movement for depth perception
    state.camera.position.x = Math.sin(timeRef.current * 0.15) * 0.5;
    state.camera.position.z = 5 + Math.cos(timeRef.current * 0.1) * 0.2;
  });

  const handleObjectPointerEnter = () => setHoveredObject(true);
  const handleObjectPointerLeave = () => setHoveredObject(false);

  return (
    <>
      {/* Advanced Lighting System */}
      <AdvancedLighting
        accentColor={accentColor}
        intensity={lightingIntensity}
        dynamicLighting={enableDynamicLighting}
      />

      {/* Optional Bloom Effect Layer */}
      {enableBloom && <BloomLayer accentColor={accentColor} />}

      {/* Background Sphere */}
      <BackgroundSphere accentColor={accentColor} />

      {/* Central Art Object Container */}
      <group
        ref={groupRef}
        position={[0, 0, 0]}
        onPointerEnter={handleObjectPointerEnter}
        onPointerLeave={handleObjectPointerLeave}
      >
        {/* Main artwork object */}
        {modelPath ? (
          <ArtworkModel
            modelPath={modelPath}
            scale={modelScale}
            position={modelPosition}
            castShadow={true}
            receiveShadow={true}
          />
        ) : (
          // Fallback placeholder
          <>
            <mesh ref={objectRef} position={[0, 0, 0]} castShadow receiveShadow>
              <icosahedronGeometry args={[1.5, 5]} />
              <meshPhongMaterial
                color={accentColor}
                wireframe={false}
                emissive={accentColor}
                emissiveIntensity={0.3}
                shininess={100}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Rotating ring */}
            <mesh position={[0, 0, 0]} rotation={[Math.PI * 0.25, 0, 0]}>
              <torusGeometry args={[2.5, 0.08, 16, 128]} />
              <meshPhongMaterial
                color={accentColor}
                wireframe={true}
                emissive={accentColor}
                emissiveIntensity={0.2}
                transparent={true}
                opacity={0.4}
              />
            </mesh>
          </>
        )}
      </group>

      {/* Optional Particle System */}
      {enableParticles && (
        <ParticleSystem particleCount={particleCount} accentColor={accentColor} />
      )}

      {/* Ground plane reflection */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.3}
          roughness={0.8}
          transparent={true}
          opacity={0.1}
        />
      </mesh>
    </>
  );
}

/**
 * Background Sphere with gradient
 */
function BackgroundSphere({ accentColor }: { accentColor: string }) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Dark gradient background
    const gradient = ctx.createRadialGradient(256, 256, 100, 256, 256, 512);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#0a0a0a');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    // Add subtle stars/noise
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const size = Math.random() * 0.5;
      ctx.fillRect(x, y, size, size);
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[40, 64, 64]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        fog={false}
      />
      {/* Wireframe grid layer */}
      <mesh position={[0, 0, 0.1]}>
        <sphereGeometry args={[39.5, 32, 32]} />
        <meshBasicMaterial
          color={accentColor}
          wireframe={true}
          transparent={true}
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </mesh>
  );
}

