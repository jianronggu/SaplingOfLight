'use client';

/**
 * ArtScene Component
 *
 * A fully immersive 3D canvas component for showcasing art pieces.
 * Features:
 * - Full-screen responsive canvas
 * - Sophisticated multi-light setup (ambient, directional, accent lights)
 * - Central art object with subtle floating/rotation motion
 * - Atmospheric dark background with subtle grid
 * - Smooth camera positioning
 * - Built for extensibility (easy to swap objects)
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import * as THREE from 'three';
import ArtworkModel from './ArtworkModel';

interface ArtSceneProps {
  /** Title of the artwork to display in overlay */
  title?: string;
  /** Description of the artwork */
  description?: string;
  /** Rotation speed multiplier (0-1) */
  rotationSpeed?: number;
  /** Float (bob up/down) speed multiplier (0-1) */
  floatSpeed?: number;
  /** Accent light color (default: cyan-ish) */
  accentColor?: string;
  /** Path to .glb/.gltf model file (optional - uses placeholder if not provided) */
  modelPath?: string;
  /** Scale of the model (default: 1) */
  modelScale?: number | [number, number, number];
  /** Position of the model [x, y, z] */
  modelPosition?: [number, number, number];
}

export default function ArtScene({
  title = 'Untitled Artwork',
  description = 'An immersive 3D experience',
  rotationSpeed = 0.5,
  floatSpeed = 0.8,
  accentColor = '#00ff88',
  modelPath,
  modelScale = 1.5,
  modelPosition = [0, 0, 0],
}: ArtSceneProps) {
  const groupRef = useRef<Group>(null);
  const objectRef = useRef<Mesh>(null);
  const initialY = useRef(0);

  // Track time for smooth animations
  const timeRef = useRef(0);

  useFrame((state) => {
    timeRef.current += 0.016; // ~60fps

    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y += 0.0008 * rotationSpeed;
      groupRef.current.rotation.x += 0.0003 * rotationSpeed;

      // Subtle floating motion (bobbing)
      const float = Math.sin(timeRef.current * 0.5 * floatSpeed) * 0.3;
      groupRef.current.position.y = initialY.current + float;
    }

    if (objectRef.current) {
      // Subtle pulsing glow intensity
      const pulse = Math.sin(timeRef.current * 0.8) * 0.15 + 0.3;
      const material = objectRef.current.material as THREE.MeshPhongMaterial;
      if (material.emissiveIntensity !== undefined) {
        material.emissiveIntensity = pulse;
      }
    }

    // Very subtle camera movement for depth perception
    state.camera.position.x = Math.sin(timeRef.current * 0.15) * 0.5;
    state.camera.position.z = 5 + Math.cos(timeRef.current * 0.1) * 0.2;
  });

  return (
    <>
      {/* Lighting Setup */}
      {/* Key light - soft and warm from above-right */}
      <directionalLight
        position={[8, 12, 8]}
        intensity={1.2}
        color="#ffffff"
        castShadow
      />

      {/* Fill light - gentle blue accent from opposite */}
      <directionalLight
        position={[-8, 8, -8]}
        intensity={0.6}
        color="#4488ff"
        castShadow
      />

      {/* Ambient light - soft overall illumination */}
      <ambientLight intensity={0.4} color="#ffffff" />

      {/* Accent point light - creates focal point glow */}
      <pointLight
        position={[10, 15, 10]}
        intensity={1}
        color={accentColor}
        distance={50}
      />

      {/* Back rim light - adds depth and separation */}
      <pointLight
        position={[-15, 5, -15]}
        intensity={0.8}
        color="#ff0088"
        distance={40}
      />

      {/* Dark atmospheric background */}
      <BackgroundSphere accentColor={accentColor} />

      {/* Central Art Object Container */}
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Main artwork object - either loaded model or placeholder */}
        {modelPath ? (
          // Load custom .glb/.gltf model
          <ArtworkModel
            modelPath={modelPath}
            scale={modelScale}
            position={modelPosition}
            castShadow={true}
            receiveShadow={true}
          />
        ) : (
          // Fallback placeholder object (icosahedron)
          <>
            <mesh ref={objectRef} position={[0, 0, 0]} castShadow receiveShadow>
              {/* Using icosahedron as elegant placeholder */}
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

            {/* Rotating ring around object for depth */}
            <mesh position={[0, 0, 0]} rotation={[Math.PI * 0.25, 0, 0]}>
              <torusGeometry args={[2.5, 0.08, 16, 128]} />
              <meshPhongMaterial
                color="#00ff88"
                wireframe={true}
                emissive="#00ff88"
                emissiveIntensity={0.2}
                transparent={true}
                opacity={0.4}
              />
            </mesh>
          </>
        )}
      </group>

      {/* Subtle ground plane reflection effect */}
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
 * BackgroundSphere Component
 * Creates atmospheric dark background with subtle wireframe grid
 */
function BackgroundSphere({ accentColor }: { accentColor: string }) {
  // Create gradient canvas texture
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

