'use client';

/**
 * Complete Example: How Three.js, React Three Fiber, and Drei Work Together
 *
 * This file demonstrates the library architecture used in your project.
 * You can reference this when adding new 3D features.
 */

import { Canvas } from '@react-three/fiber'; // React renderer
import { OrbitControls, PerspectiveCamera, Box, Sphere } from '@react-three/drei'; // Helpers
import { useState } from 'react';

/**
 * LAYER 1: Low-level Three.js (in Scene3D.tsx)
 * - Raw Three.js objects: Mesh, Geometry, Material
 * - You work with Vector3, Quaternion, etc.
 *
 * LAYER 2: React Three Fiber (Canvas component here)
 * - Converts Three.js to React components
 * - useFrame hook replaces the render loop
 * - Props bind to Three.js properties
 *
 * LAYER 3: Drei (OrbitControls, Box, Sphere below)
 * - Pre-built components wrapping common patterns
 * - Saves time, handles complexity
 */

export default function Example3DScene() {
  const [isRotating, setIsRotating] = useState(true);

  return (
    <Canvas
      // Canvas setup - React Three Fiber takes over WebGL rendering
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: true, alpha: true }}
      className="w-full h-screen"
    >
      {/* Background color - Three.js property via React */}
      <color attach="background" args={['#0a0a0a']} />

      {/* LIGHTING - Three.js lights exposed as React components */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, 10, 5]} intensity={1} color="#00ff88" />

      {/* GEOMETRY - Using Drei's pre-built Box component */}
      {/* This wraps Three.js BoxGeometry + MeshStandardMaterial */}
      <Box position={[0, 0, 0]} args={[1, 1, 1]}>
        <meshStandardMaterial color="#00ff88" wireframe={false} />
      </Box>

      {/* GEOMETRY - Using Drei's pre-built Sphere component */}
      <Sphere position={[3, 0, 0]} args={[0.8, 32, 32]}>
        <meshPhongMaterial color="#ff0088" emissive="#ff0088" emissiveIntensity={0.2} />
      </Sphere>

      {/* CAMERA CONTROLS - Using Drei's OrbitControls helper */}
      {/* This handles mouse/touch input automatically */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        autoRotate={isRotating}
        autoRotateSpeed={2}
      />
    </Canvas>
  );
}

/**
 * LIBRARY BREAKDOWN:
 *
 * Three.js:
 * ├── Provides: Scene, Camera, Renderer, Mesh, Geometry, Material
 * ├── You rarely touch this directly in React Three Fiber
 * └── Example: THREE.BoxGeometry, THREE.MeshStandardMaterial
 *
 * React Three Fiber:
 * ├── Converts Three.js objects to React components
 * ├── <Canvas /> replaces the Three.js renderer
 * ├── <mesh> <geometry> <material> replace THREE.Mesh, BoxGeometry, etc.
 * ├── Props bind to Three.js properties: position, rotation, scale
 * ├── Hooks: useFrame, useThree, useLoader
 * └── Automatic cleanup and garbage collection
 *
 * @react-three/drei:
 * ├── Pre-built components: <OrbitControls>, <Box>, <Sphere>, <Text>
 * ├── Hooks: useGLTF(), useTexture(), useBounds()
 * ├── Utilities: <Environment>, <Stars>, <Bounds>, <Center>
 * ├── Effects: <EffectComposer>, <Bloom>, <SSAO>
 * └── Saves hundreds of lines of code
 *
 * TYPICAL WORKFLOW:
 * 1. Use <Canvas> from React Three Fiber
 * 2. Add geometry (<Box>, <Sphere>) from Drei
 * 3. Add lighting (ambientLight, directionalLight) - Three.js exposed to React
 * 4. Add controls (<OrbitControls>) from Drei
 * 5. Add materials and colors via props
 * 6. Use useFrame hook for animations
 */

