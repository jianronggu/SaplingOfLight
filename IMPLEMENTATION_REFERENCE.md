# 💻 Implementation Reference

## Gallery Page Changes

### Location
`app/(scenes)/gallery/page.tsx`

### Before
```tsx
'use client';

import ArtGalleryScene from '@/app/components/ArtGalleryScene';

export default function GalleryPage() {
  return (
    <ArtGalleryScene
      title="Floating Crystal"
      description="A meditative piece exploring light and form through an animated icosahedron suspended in space."
      interactive={true}
      accentColor="#00ff88"
    />
  );
}
```

### After
```tsx
'use client';

import EnhancedArtGallery from '@/app/components/EnhancedArtGallery';

export default function GalleryPage() {
  return (
    <EnhancedArtGallery
      title="Floating Crystal"
      description="A meditative piece exploring light and form through an animated icosahedron suspended in space."
      interactive={true}
      accentColor="#00ff88"
      enableParticles={true}
      enableBloom={true}
      enableDynamicLighting={true}
      enableControlsPanel={true}
      enableKeyboardShortcuts={true}
    />
  );
}
```

---

## Component Architecture

### Enhanced Viewer Structure

```
EnhancedArtGallery (Main Component)
├── Canvas (Three.js)
│   ├── EnhancedGalleryScene (Content)
│   │   ├── AdvancedLighting (6 lights)
│   │   ├── EnhancedGalleryScene (Objects)
│   │   │   ├── ArtworkModel or Placeholder
│   │   │   ├── ParticleSystem
│   │   │   └── BloomLayer
│   │   ├── BackgroundSphere
│   │   └── Ground plane
│   └── OrbitControls
├── GalleryOverlay (Title/Subtitle)
└── ViewerControlsPanel (UI Controls)
```

---

## New Component Exports

### AdvancedLighting.tsx
```tsx
export function AdvancedLighting({
  accentColor: string;
  intensity?: number;
  dynamicLighting?: boolean;
}: AdvancedLightingProps)
```

### ViewerControlsPanel.tsx
```tsx
export default function ViewerControlsPanel({
  initialLightingIntensity?: number;
  initialRotationSpeed?: number;
  onLightingIntensityChange?: (intensity: number) => void;
  onRotationSpeedChange?: (speed: number) => void;
  onAutoRotateToggle?: (enabled: boolean) => void;
  onResetCamera?: () => void;
  showKeyboardShortcuts?: boolean;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}: ViewerControlsPanelProps)
```

### InteractiveEffects.tsx
```tsx
export function ParticleSystem({
  particleCount?: number;
  accentColor?: string;
})

export function BloomLayer({
  accentColor?: string;
})
```

### useAdvancedControls.ts
```tsx
export function useAdvancedControls({
  enableKeyboard?: boolean;
  enableTouch?: boolean;
  autoRotateSpeed?: number;
  pauseAutoRotateOnInteraction?: boolean;
  onInteraction?: () => void;
  onKeyPress?: (key: string) => void;
}): {
  isAutoRotating: boolean;
  setIsAutoRotating: (enabled: boolean) => void;
  resetCamera: () => void;
  autoRotateSpeed: number;
}
```

### EnhancedGalleryScene.tsx
```tsx
export default function EnhancedGalleryScene({
  title?: string;
  description?: string;
  rotationSpeed?: number;
  floatSpeed?: number;
  accentColor?: string;
  modelPath?: string;
  modelScale?: number | [number, number, number];
  modelPosition?: [number, number, number];
  enableParticles?: boolean;
  enableBloom?: boolean;
  enableDynamicLighting?: boolean;
  lightingIntensity?: number;
  particleCount?: number;
}: EnhancedGallerySceneProps)
```

### EnhancedArtGallery.tsx
```tsx
export default function EnhancedArtGallery({
  title?: string;
  description?: string;
  interactive?: boolean;
  accentColor?: string;
  modelPath?: string;
  modelScale?: number | [number, number, number];
  modelPosition?: [number, number, number];
  enableParticles?: boolean;
  enableBloom?: boolean;
  enableDynamicLighting?: boolean;
  enableControlsPanel?: boolean;
  enableKeyboardShortcuts?: boolean;
}: EnhancedArtGalleryProps)
```

---

## Usage Patterns

### Pattern 1: Default Everything
```tsx
<EnhancedArtGallery
  title="My Art"
  description="Description"
/>
// All features enabled by default
```

### Pattern 2: Customize All
```tsx
<EnhancedArtGallery
  title="My Art"
  description="Description"
  accentColor="#ff1493"
  enableParticles={true}
  enableBloom={true}
  enableDynamicLighting={true}
  enableControlsPanel={true}
  enableKeyboardShortcuts={true}
/>
```

### Pattern 3: Minimal
```tsx
<EnhancedArtGallery
  title="My Art"
  enableParticles={false}
  enableBloom={false}
  enableControlsPanel={false}
/>
```

### Pattern 4: Mobile
```tsx
<EnhancedArtGallery
  title="My Art"
  enableDynamicLighting={false}
  particleCount={25}
/>
```

---

## State Management

### EnhancedArtGallery State
```tsx
const [isLoading, setIsLoading] = useState(!!modelPath);
const [lightingIntensity, setLightingIntensity] = useState(1);
const [rotationSpeed, setRotationSpeed] = useState(0.5);
const [autoRotateEnabled, setAutoRotateEnabled] = useState(true);
```

### Callbacks
```tsx
const handleResetCamera = () => { /* ... */ }
const handleLightingChange = (intensity: number) => { /* ... */ }
const handleRotationSpeedChange = (speed: number) => { /* ... */ }
```

---

## Animation Details

### Lighting Pulses
```tsx
// In useFrame:
const pulse = Math.sin(timeRef.current * 0.8) * 0.3 + 0.7;
accentLightRef.current.intensity = pulse * intensity;
```

### Particle Rotation
```tsx
// In useFrame:
particlesRef.current.rotation.x += 0.0001;
particlesRef.current.rotation.y += 0.0002;
```

### Hover Scaling
```tsx
groupRef.current.scale.lerp(
  new THREE.Vector3(1.1, 1.1, 1.1),
  0.05
);
```

---

## Lighting Setup Code

### Key Light
```tsx
<directionalLight
  position={[8, 12, 8]}
  intensity={1.5 * intensity}
  color="#ffffff"
  castShadow
/>
```

### Accent Light (Pulsing)
```tsx
<pointLight
  ref={accentLightRef}
  position={[10, 15, 10]}
  intensity={1 * intensity}  // Updated in useFrame
  color={accentColor}
  distance={50}
  decay={2}
/>
```

### Rim Light (Pulsing)
```tsx
<pointLight
  ref={rimLightRef}
  position={[-15, 5, -15]}
  intensity={0.8 * intensity}  // Updated in useFrame
  color="#ff0088"
  distance={40}
  decay={2}
/>
```

---

## Keyboard Event Handling

```tsx
const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key.toLowerCase()) {
    case 'arrowup':
    case 'w':
      camera.position.z -= 0.5;
      break;
    case 'arrowdown':
    case 's':
      camera.position.z += 0.5;
      break;
    case 'r':
      resetCamera();
      break;
    case ' ':
      setIsAutoRotating(!isAutoRotating);
      break;
  }
}
```

---

## Touch Gesture Handling

```tsx
const handleTouchStart = (e: TouchEvent) => {
  if (e.touches.length === 2) {
    initialDistance = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
  }
}

const handleTouchMove = (e: TouchEvent) => {
  if (e.touches.length === 2) {
    const currentDistance = Math.hypot(...);
    const delta = initialDistance - currentDistance;
    camera.position.z = initialZoom + delta * 0.01;
  }
}
```

---

## Control Panel Styling

```tsx
// Main button
className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"

// Panel container
className="w-72 bg-black/80 backdrop-blur-md rounded-lg"

// Input sliders
className="w-full h-2 bg-gray-700 accent-cyan-500"

// Buttons
className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20"
```

---

## Performance Optimizations

### Shadow Map Size
```tsx
shadow-mapSize-width={2048}
shadow-mapSize-height={2048}
```

### Camera Frustum
```tsx
shadow-camera-far={50}
shadow-camera-left={-20}
shadow-camera-right={20}
shadow-camera-top={20}
shadow-camera-bottom={-20}
```

### Particle Geometry
```tsx
const array = new Float32Array(particleCount * 3);
// Using BufferGeometry for efficiency
```

---

## File Statistics

| File | Lines | Components | Exports |
|------|-------|-----------|---------|
| AdvancedLighting.tsx | ~150 | 1 | 1 function |
| ViewerControlsPanel.tsx | ~188 | 1 | 1 component |
| InteractiveEffects.tsx | ~110 | 2 | 2 functions |
| useAdvancedControls.ts | ~160 | 0 | 1 hook |
| EnhancedGalleryScene.tsx | ~220 | 2 | 1 main + helper |
| EnhancedArtGallery.tsx | ~180 | 1 | 1 component |
| **TOTAL** | **~1000** | **7** | **9** |

---

## Import Paths

```tsx
// In your gallery page:
import EnhancedArtGallery from '@/app/components/EnhancedArtGallery';

// EnhancedArtGallery imports:
import EnhancedGalleryScene from '@/app/components/EnhancedGalleryScene';
import GalleryOverlay from '@/app/components/GalleryOverlay';
import ViewerControlsPanel from '@/app/components/ViewerControlsPanel';

// EnhancedGalleryScene imports:
import { ParticleSystem, BloomLayer } from '@/app/components/InteractiveEffects';
import { AdvancedLighting } from '@/app/components/AdvancedLighting';

// ViewerControlsPanel imports:
// (No dependencies - pure React component)

// InteractiveEffects imports:
// (Pure Three.js components)

// AdvancedLighting imports:
// (Pure Three.js components)
```

---

## TypeScript Interfaces

All props are fully typed with JSDoc comments:

```tsx
interface EnhancedArtGalleryProps {
  /** Title of the artwork */
  title?: string;
  /** Description of the artwork */
  description?: string;
  // ... (all props documented)
}

interface ViewerControlsPanelProps {
  /** Initial lighting intensity (0-2) */
  initialLightingIntensity?: number;
  // ... (all props documented)
}
```

---

## Default Values

| Prop | Default | Range |
|------|---------|-------|
| title | 'Experiential Artwork' | string |
| description | 'An immersive 3D art piece' | string |
| accentColor | '#00ff88' | hex color |
| enableParticles | true | boolean |
| enableBloom | true | boolean |
| enableDynamicLighting | true | boolean |
| enableControlsPanel | true | boolean |
| enableKeyboardShortcuts | true | boolean |
| particleCount | 50 | 0-1000 |
| lightingIntensity | 1 | 0-2 |
| rotationSpeed | 0.5 | 0-2 |

---

## Three.js Details

### Canvas Settings
```tsx
gl={{
  antialias: true,
  alpha: true,
  preserveDrawingBuffer: false,
  powerPreference: 'high-performance',
}}
```

### Camera Configuration
```tsx
camera={{
  position: [0, 2, 5],
  fov: 75,
  near: 0.1,
  far: 1000,
}}
```

### Orbit Controls
```tsx
<OrbitControls
  enableZoom={true}
  enableRotate={true}
  autoRotate={autoRotateEnabled}
  autoRotateSpeed={rotationSpeed}
  minPolarAngle={Math.PI * 0.35}
  maxPolarAngle={Math.PI * 0.65}
  minDistance={3}
  maxDistance={15}
  dampingFactor={0.08}
/>
```

---

**This is your complete implementation reference!** 📖

