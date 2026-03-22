'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export default function Scene3D() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      {/* Ambient lighting */}
      <ambientLight intensity={0.5} />

      {/* Directional light */}
      <directionalLight position={[10, 10, 10]} intensity={1.5} />

      {/* Point light for accent */}
      <pointLight position={[-10, 10, 5]} intensity={1} color="#00ff88" />

      {/* Central artwork - placeholder cube */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.5, 4]} />
        <meshPhongMaterial
          color="#00ff88"
          wireframe={false}
          emissive="#00ff88"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Background sphere */}
      <mesh position={[0, 0, -10]}>
        <sphereGeometry args={[20, 32, 32]} />
        <meshBasicMaterial
          color="#1a1a1a"
          side={1} /* BackSide */
          wireframe={true}
          wireframeLinewidth={1}
        />
      </mesh>
    </group>
  );
}

