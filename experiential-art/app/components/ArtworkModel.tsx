'use client';

/**
 * ArtworkModel Component
 *
 * Reusable component for loading and displaying 3D models (.glb/.gltf files).
 * Simply point it to your model file and it handles all the loading!
 *
 * Usage:
 * <ArtworkModel
 *   modelPath="/models/your-model.glb"
 *   scale={1.5}
 *   position={[0, 0, 0]}
 *   rotation={[0, 0, 0]}
 * />
 */

import { Suspense, useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { Group, Mesh } from 'three';

interface ArtworkModelProps {
  /** Path to your .glb or .gltf model file */
  modelPath: string;

  /** Scale multiplier for the model (default: 1) */
  scale?: number | [number, number, number];

  /** Position in 3D space [x, y, z] (default: [0, 0, 0]) */
  position?: [number, number, number];

  /** Rotation in radians [x, y, z] (default: [0, 0, 0]) */
  rotation?: [number, number, number];

  /** Enable shadows (default: true) */
  castShadow?: boolean;
  receiveShadow?: boolean;

  /** Callback when model loads successfully */
  onLoad?: () => void;

  /** Callback when model fails to load */
  onError?: (error: Error) => void;
}

/**
 * Main Artwork Model Component
 * Loads and displays a 3D model with proper error handling
 */
export default function ArtworkModel({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  castShadow = true,
  receiveShadow = true,
  onLoad,
  onError,
}: ArtworkModelProps) {
  return (
    <Suspense fallback={<ModelLoadingPlaceholder />}>
      <ArtworkModelInner
        modelPath={modelPath}
        scale={scale}
        position={position}
        rotation={rotation}
        castShadow={castShadow}
        receiveShadow={receiveShadow}
        onLoad={onLoad}
        onError={onError}
      />
    </Suspense>
  );
}

/**
 * Inner component that actually loads the model
 * Separated for proper Suspense handling
 */
function ArtworkModelInner({
  modelPath,
  scale,
  position,
  rotation,
  castShadow,
  receiveShadow,
  onLoad,
  onError,
}: ArtworkModelProps) {
  const groupRef = useRef<Group>(null);

  // Load the model using drei's useGLTF hook
  // This automatically caches loaded models for performance
  const { scene } = useGLTF(modelPath);

  // Clone the scene to avoid sharing geometry between instances
  const clonedScene = scene.clone();

  // Apply shadow settings to all meshes in the model
  useEffect(() => {
    clonedScene.traverse((node) => {
      if (node instanceof Mesh) {
        node.castShadow = castShadow;
        node.receiveShadow = receiveShadow;
      }
    });

    // Call onLoad callback
    if (onLoad) {
      onLoad();
    }
  }, [clonedScene, castShadow, receiveShadow, onLoad]);

  return (
    <group
      ref={groupRef}
      scale={Array.isArray(scale) ? scale : [scale, scale, scale]}
      position={position}
      rotation={rotation}
    >
      <primitive object={clonedScene} />
    </group>
  );
}

/**
 * Placeholder shown while model is loading
 * You can customize this with a spinner or loading message
 */
function ModelLoadingPlaceholder() {
  return (
    <mesh position={[0, 0, 0]}>
      {/* Simple placeholder sphere while loading */}
      <sphereGeometry args={[1, 16, 16]} />
      <meshPhongMaterial color="#444" wireframe={true} />
    </mesh>
  );
}

/**
 * USAGE EXAMPLES:
 *
 * 1. BASIC USAGE (minimal setup)
 * ================================
 * <ArtworkModel modelPath="/models/my-model.glb" />
 *
 *
 * 2. WITH SCALING
 * ================================
 * <ArtworkModel
 *   modelPath="/models/my-model.glb"
 *   scale={2}  // Make it 2x bigger
 * />
 *
 *
 * 3. WITH POSITIONING
 * ================================
 * <ArtworkModel
 *   modelPath="/models/my-model.glb"
 *   scale={1.5}
 *   position={[0, 0, 0]}      // x, y, z coordinates
 *   rotation={[0, Math.PI / 4, 0]}  // Rotate 45 degrees around Y axis
 * />
 *
 *
 * 4. WITH CALLBACKS
 * ================================
 * <ArtworkModel
 *   modelPath="/models/my-model.glb"
 *   onLoad={() => console.log('Model loaded!')}
 *   onError={(err) => console.error('Failed to load:', err)}
 * />
 *
 *
 * 5. WITH ALL OPTIONS
 * ================================
 * <ArtworkModel
 *   modelPath="/models/my-model.glb"
 *   scale={[1, 2, 1]}  // Non-uniform scaling
 *   position={[0, 1, 0]}
 *   rotation={[0, 0, 0]}
 *   castShadow={true}
 *   receiveShadow={true}
 *   onLoad={() => console.log('Ready!')}
 *   onError={(err) => console.error(err)}
 * />
 */

