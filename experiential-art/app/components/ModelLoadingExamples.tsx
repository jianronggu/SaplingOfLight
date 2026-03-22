'use client';

/**
 * Model Loading Examples
 *
 * This file shows various ways to use the new ArtworkModel component
 * and how to load different 3D models in your scenes.
 */

import ArtGalleryScene from '@/app/components/ArtGalleryScene';
import ArtworkModel from '@/app/components/ArtworkModel';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

// ============================================================================
// EXAMPLE 1: Using ArtGalleryScene with a Custom Model (RECOMMENDED)
// ============================================================================
export function CustomModelExample() {
  return (
    <ArtGalleryScene
      title="My Custom 3D Model"
      description="A beautiful sculpture loaded from a .glb file"
      modelPath="/models/my-model.glb"    // ← Your model file path
      modelScale={1.5}                     // ← Adjust size as needed
      modelPosition={[0, 0, 0]}            // ← Adjust position
      accentColor="#ffd700"
      interactive={true}
    />
  );
}

// ============================================================================
// EXAMPLE 2: Using ArtworkModel Component Directly
// ============================================================================
export function DirectArtworkModelExample() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
      <color attach="background" args={['#0a0a0a']} />

      {/* Your custom model */}
      <Suspense fallback={null}>
        <ArtworkModel
          modelPath="/models/my-model.glb"
          scale={1.5}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          castShadow={true}
          receiveShadow={true}
          onLoad={() => console.log('Model loaded!')}
          onError={(err) => console.error('Failed to load model:', err)}
        />
      </Suspense>

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} />
    </Canvas>
  );
}

// ============================================================================
// EXAMPLE 3: Scaling Your Model
// ============================================================================
export function ModelScalingExamples() {
  return (
    <>
      {/* Small model (0.5x size) */}
      <ArtGalleryScene
        title="Small Model"
        modelPath="/models/my-model.glb"
        modelScale={0.5}
        accentColor="#00ff88"
      />

      {/* Medium model (1.5x size - common default) */}
      <ArtGalleryScene
        title="Medium Model"
        modelPath="/models/my-model.glb"
        modelScale={1.5}
        accentColor="#ff1493"
      />

      {/* Large model (3x size) */}
      <ArtGalleryScene
        title="Large Model"
        modelPath="/models/my-model.glb"
        modelScale={3}
        accentColor="#a855f7"
      />

      {/* Non-uniform scaling (stretched) */}
      <ArtGalleryScene
        title="Stretched Model"
        modelPath="/models/my-model.glb"
        modelScale={[1.5, 2.5, 1.5]}  // Taller
        accentColor="#ffd700"
      />
    </>
  );
}

// ============================================================================
// EXAMPLE 4: Positioning Your Model
// ============================================================================
export function ModelPositioningExamples() {
  return (
    <>
      {/* Centered (default) */}
      <ArtGalleryScene
        title="Centered Model"
        modelPath="/models/my-model.glb"
        modelPosition={[0, 0, 0]}
        accentColor="#00ff88"
      />

      {/* Raised up */}
      <ArtGalleryScene
        title="Elevated Model"
        modelPath="/models/my-model.glb"
        modelPosition={[0, 1, 0]}  // Move up 1 unit
        accentColor="#ff0088"
      />

      {/* Shifted to the side */}
      <ArtGalleryScene
        title="Offset Model"
        modelPath="/models/my-model.glb"
        modelPosition={[1.5, 0, 0]}  // Move right
        accentColor="#4d9de0"
      />

      {/* Moved back in depth */}
      <ArtGalleryScene
        title="Depth Model"
        modelPath="/models/my-model.glb"
        modelPosition={[0, 0, -2]}  // Move back
        accentColor="#a855f7"
      />
    </>
  );
}

// ============================================================================
// EXAMPLE 5: Different Model Files
// ============================================================================
export function MultipleModelsExample() {
  return (
    <>
      {/* Model 1: Crystal */}
      <ArtGalleryScene
        title="Crystal Formation"
        description="A geometric crystal structure"
        modelPath="/models/crystal.glb"
        modelScale={2}
        accentColor="#00ffff"
        interactive={true}
      />

      {/* Model 2: Sculpture */}
      <ArtGalleryScene
        title="Abstract Sculpture"
        description="A flowing abstract form"
        modelPath="/models/sculpture.glb"
        modelScale={1.8}
        modelPosition={[0, 0.5, 0]}
        accentColor="#ff1493"
        interactive={true}
      />

      {/* Model 3: Organic */}
      <ArtGalleryScene
        title="Organic Forms"
        description="Nature-inspired geometry"
        modelPath="/models/organic.glb"
        modelScale={1.5}
        accentColor="#20b2aa"
        interactive={true}
      />
    </>
  );
}

// ============================================================================
// EXAMPLE 6: Gallery with Model Selector
// ============================================================================
import { useState } from 'react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  modelPath: string;
  modelScale: number;
  accentColor: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 'crystal',
    title: 'Crystalline Beauty',
    description: 'A meditation on geometric perfection',
    modelPath: '/models/crystal.glb',
    modelScale: 2,
    accentColor: '#00ffff',
  },
  {
    id: 'sculpture',
    title: 'Flowing Forms',
    description: 'Movement captured in stone',
    modelPath: '/models/sculpture.glb',
    modelScale: 1.8,
    accentColor: '#ff1493',
  },
  {
    id: 'organic',
    title: 'Life Essence',
    description: 'The patterns of nature',
    modelPath: '/models/organic.glb',
    modelScale: 1.5,
    accentColor: '#20b2aa',
  },
];

export function ModelGalleryWithSelector() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = galleryItems[currentIndex];

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ArtGalleryScene
        title={current.title}
        description={current.description}
        modelPath={current.modelPath}
        modelScale={current.modelScale}
        accentColor={current.accentColor}
        interactive={true}
      />

      {/* Navigation buttons (overlay) */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '20px',
          zIndex: 100,
        }}
      >
        <button
          onClick={() =>
            setCurrentIndex((i) => (i - 1 + galleryItems.length) % galleryItems.length)
          }
          style={{
            padding: '10px 20px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '1px solid white',
            cursor: 'pointer',
          }}
        >
          ← Previous
        </button>

        <span style={{ color: 'white', alignSelf: 'center' }}>
          {currentIndex + 1} / {galleryItems.length}
        </span>

        <button
          onClick={() => setCurrentIndex((i) => (i + 1) % galleryItems.length)}
          style={{
            padding: '10px 20px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '1px solid white',
            cursor: 'pointer',
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// EXAMPLE 7: With Loading Callbacks
// ============================================================================
export function ModelWithCallbacksExample() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <ArtGalleryScene
        title="Model with Feedback"
        description="Watch the loading feedback below"
        modelPath="/models/my-model.glb"
        accentColor="#ffd700"
        interactive={true}
      />

      {/* Loading indicator */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '20px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          borderRadius: '8px',
          fontFamily: 'monospace',
        }}
      >
        {isLoading && <p>Loading model...</p>}
        {error && <p style={{ color: '#ff0000' }}>Error: {error}</p>}
        {!isLoading && !error && <p style={{ color: '#00ff88' }}>✓ Model loaded!</p>}
      </div>
    </>
  );
}

// ============================================================================
// EXAMPLE 8: Template - Customize This
// ============================================================================
export function YourCustomModelTemplate() {
  return (
    <ArtGalleryScene
      // TODO: Set your artwork title
      title="[Your Artwork Title]"

      // TODO: Describe your artwork
      description="[Your artwork description - 2-3 sentences]"

      // TODO: Set path to your model
      // Place .glb file in: public/models/your-model.glb
      modelPath="/models/[your-file-name].glb"

      // TODO: Adjust scale to match your model
      // Start with 1.5, then adjust up (bigger) or down (smaller)
      modelScale={1.5}

      // TODO: Adjust position if needed
      // Format: [x, y, z] where y is up
      modelPosition={[0, 0, 0]}

      // TODO: Pick an accent color
      // Try: #ffd700 (gold), #a855f7 (purple), #20b2aa (teal)
      accentColor="#00ff88"

      // Keep interactive mode enabled for best experience
      interactive={true}
    />
  );
}

// ============================================================================
// EXAMPLE 9: Side by Side Comparison
// ============================================================================
export function PlaceholderVsCustomModelExample() {
  return (
    <>
      {/* Using placeholder (default) */}
      <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
        <div style={{ flex: 1 }}>
          <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
            <color attach="background" args={['#0a0a0a']} />
            <ambientLight intensity={0.5} />
            {/* No modelPath = uses default icosahedron */}
          </Canvas>
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              color: 'white',
            }}
          >
            Placeholder
          </div>
        </div>

        {/* Using custom model */}
        <div style={{ flex: 1 }}>
          <ArtGalleryScene
            title="Custom Model"
            modelPath="/models/my-model.glb"
          />
        </div>
      </div>
    </>
  );
}

// ============================================================================
// DEFAULT EXPORT - Shows the basic setup
// ============================================================================
export default function ModelLoadingExamples() {
  return (
    <ArtGalleryScene
      title="Example: Custom Model"
      description="Replace the .glb path with your own model file"
      modelPath="/models/example.glb"
      modelScale={1.5}
      accentColor="#00ff88"
      interactive={true}
    />
  );
}

