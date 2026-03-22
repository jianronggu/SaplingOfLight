# ArtScene Component - Technical Overview

## Component Dependency Tree

```
┌─ page.tsx (app/(scenes)/gallery/)
│  └─ imports: ArtGalleryScene
│
├─ ArtGalleryScene.tsx
│  ├─ imports: Canvas (from @react-three/fiber)
│  ├─ imports: OrbitControls (from @react-three/drei)
│  ├─ imports: Suspense (from react)
│  ├─ renders: Canvas (full-screen 3D context)
│  ├─ renders: ArtScene
│  ├─ renders: UIOverlay
│  └─ returns: Full immersive experience
│
├─ ArtScene.tsx
│  ├─ imports: useFrame, useRef (from @react-three/fiber)
│  ├─ imports: Mesh, Group (from three)
│  ├─ imports: THREE (full module)
│  ├─ uses: useRef for animation tracking
│  ├─ uses: useFrame for frame-based animation loop
│  ├─ renders: Lighting system (5 lights)
│  ├─ renders: BackgroundSphere component
│  ├─ renders: Central object group
│  │  ├─ Icosahedron (main art)
│  │  └─ Torus ring (depth effect)
│  ├─ renders: Ground plane
│  └─ provides: All 3D scene content
│
├─ BackgroundSphere.tsx (internal to ArtScene)
│  ├─ uses: useMemo for texture generation
│  ├─ uses: THREE.CanvasTexture for procedural texture
│  ├─ creates: Radial gradient background
│  ├─ creates: Procedural starfield
│  ├─ renders: Large background sphere
│  └─ provides: Atmospheric environment
│
└─ UIOverlay.tsx
   ├─ imports: useState, useEffect, useRef (from react)
   ├─ uses: mousemove events for interaction
   ├─ renders: Top bar with title
   ├─ renders: Center info (title + description)
   ├─ renders: Bottom bar with instructions
   └─ provides: Minimal UI context
```

## Data Flow Diagram

```
User Interaction (mouse/touch)
    │
    ├─ OrbitControls (rotate, zoom, pan)
    │
    └─ UIOverlay (mouse move → visibility toggle)
    
                │
                ▼
    
    Canvas (React Three Fiber)
    │
    ├─ useFrame loop (~60fps)
    │  │
    │  ├─ Read timeRef
    │  ├─ Calculate animation values
    │  ├─ Update object transforms
    │  ├─ Update material properties
    │  └─ Update camera position
    │
    └─ Render 3D scene to WebGL
    
                │
                ▼
    
    Screen Display
    │
    ├─ 3D Canvas (main view)
    └─ UI Overlay (text & info)
```

## State Management

### ArtScene Component State

```typescript
interface ArtSceneState {
  // Refs for animation
  groupRef: React.RefObject<Group>        // Main object group
  objectRef: React.RefObject<Mesh>        // Icosahedron mesh
  initialY: React.MutableRefObject<number> // Starting Y position
  timeRef: React.MutableRefObject<number> // Global animation time
  
  // Props (external state)
  title: string
  description: string
  rotationSpeed: number (0-1)
  floatSpeed: number (0-1)
  accentColor: string (hex)
}
```

### UIOverlay State

```typescript
interface UIOverlayState {
  visible: boolean                        // Show/hide UI
  hideTimer: NodeJS.Timeout | undefined  // Hide countdown
}
```

### ArtGalleryScene State

```typescript
interface ArtGallerySceneState {
  // Props control all behavior - no internal state
  title: string
  description: string
  interactive: boolean
  accentColor: string
}
```

## Animation Loop Flow

```
useFrame callback (fired 60x per second)
│
├─ timeRef += 0.016 (delta time)
│
├─ UPDATE OBJECT ROTATION
│  ├─ rotation.x += 0.0003 * rotationSpeed
│  ├─ rotation.y += 0.0008 * rotationSpeed
│  └─ Result: Smooth continuous spin
│
├─ UPDATE FLOATING MOTION
│  ├─ float = sin(time * 0.5 * floatSpeed) * 0.3
│  ├─ position.y = initialY + float
│  └─ Result: Vertical bobbing
│
├─ UPDATE PULSING GLOW
│  ├─ pulse = sin(time * 0.8) * 0.15 + 0.3
│  ├─ material.emissiveIntensity = pulse
│  └─ Result: Rhythmic brightness variation
│
└─ UPDATE CAMERA POSITION
   ├─ camera.position.x = sin(time * 0.15) * 0.5
   ├─ camera.position.z = 5 + cos(time * 0.1) * 0.2
   └─ Result: Subtle depth-enhancing movement
```

## Lighting System Architecture

```
Lighting Layer    | Position | Color | Type | Intensity | Purpose
─────────────────┼──────────┼──────┼──────┼───────────┼─────────────
Key Light        | [8,12,8] | White| Dir  | 1.2       | Main shadow
Fill Light       | [-8,8,-8]| Blue | Dir  | 0.6       | Soften shade
Ambient          | Global   | White| Amb  | 0.4       | Fill blacks
Accent Point     | [10,15,10]| Var  | Pnt  | 1.0       | Focal glow
Rim Light        | [-15,5-15]| Pink| Pnt  | 0.8       | Edge drama
```

## Memory Management

```
Component Lifecycle
│
├─ Mount
│  ├─ Create refs (groupRef, objectRef, timeRef, initialY)
│  ├─ Register useFrame callback
│  ├─ Instantiate 3D objects
│  ├─ Compile shaders
│  └─ Load textures
│
├─ Update
│  └─ Re-render on prop changes
│     ├─ recalculate colors
│     ├─ update light colors
│     └─ update animation speeds
│
└─ Unmount
   ├─ Remove useFrame callback
   ├─ Clean up Three.js resources
   ├─ Release GPU memory
   └─ Clear refs
```

## TypeScript Type Definitions

```typescript
// ArtScene Props
interface ArtSceneProps {
  title?: string;                    // Display name
  description?: string;              // Art description
  rotationSpeed?: number;            // Animation speed 0-1
  floatSpeed?: number;               // Animation speed 0-1
  accentColor?: string;              // Hex color value
}

// ArtGalleryScene Props
interface ArtGalleryProps {
  title?: string;
  description?: string;
  interactive?: boolean;
  accentColor?: string;
}

// UIOverlay Props
interface UIOverlayProps {
  title?: string;
  description?: string;
}

// Three.js Types Used
- Mesh: 3D object with geometry + material
- Group: Container for multiple objects
- Geometry: Shape definition (vertices, faces)
- Material: Surface appearance (color, texture, properties)
- Light: Illumination sources
- Texture: Image/canvas mapped to surface
- Camera: Viewpoint into scene
```

## Performance Optimization Strategies

```
RENDERING OPTIMIZATION
├─ Canvas DPI Scaling
│  └─ Adjust to device pixel ratio
├─ Antialias: true
│  └─ Smooth edges (minor performance cost)
├─ Alpha Transparency
│  └─ Background blends with page
└─ PowerPreference: 'high-performance'
   └─ Use dedicated GPU when available

GEOMETRIC OPTIMIZATION
├─ Background Sphere: 64x64 segments
│  └─ Balanced detail vs performance
├─ Object Geometry: Icosahedron 5 detail
│  └─ Smooth rounded look
└─ Avoid excessive mesh count
   └─ Use instancing or LOD for many objects

ANIMATION OPTIMIZATION
├─ useFrame callback: Lightweight calculations
├─ useRef: Avoid re-renders on animation
├─ useMemo: Cache procedural textures
└─ Math: Use native sin/cos (optimized in engines)

LIGHTING OPTIMIZATION
├─ 5 lights: Balance quality vs performance
├─ No shadows: Keep calculations light
├─ PointLight with distance: Limit influence
└─ Directional lights: No falloff calculation
```

## Browser API Dependencies

```
WebGL 2.0 Features Required:
├─ Fragment Shaders
├─ Vertex Shaders
├─ Texture Mapping
├─ Lighting Calculations
└─ Render to Framebuffer

Event Listeners:
├─ mousemove (UIOverlay)
└─ wheel (OrbitControls)

Canvas API:
├─ getContext('2d') for texture generation
└─ CanvasTexture for texture conversion
```

## Shader Pipeline

```
Vertex Shader
├─ Input: Mesh geometry (positions, normals)
├─ Processing: Transform to world space
│  ├─ Position * ModelMatrix
│  ├─ Position * ViewMatrix
│  └─ Position * ProjectionMatrix
└─ Output: Screen-space vertex positions

Fragment Shader
├─ Input: Interpolated vertex data
├─ Processing: Per-pixel lighting calculation
│  ├─ Sample texture colors
│  ├─ Calculate light contribution (5 lights)
│  ├─ Apply emissive glow
│  └─ Apply normal mapping
└─ Output: Final pixel color (RGB + Alpha)
```

## Critical Sections

```
HIGH PRIORITY (affects visual quality)
├─ Lighting calculations (most impact on appearance)
├─ Texture generation (procedural background)
├─ Material properties (colors, emissive)
└─ Camera positioning (composition)

MEDIUM PRIORITY (affects performance)
├─ Geometry detail level
├─ Animation complexity
├─ Number of objects
└─ Texture resolution

LOW PRIORITY (less visual impact)
├─ Minor animation tweaks
├─ Ground plane opacity
├─ Fog parameters
└─ Ring wireframe thickness
```

## Extensibility Hooks

```
Easy to Add:
├─ New light sources
│  └─ Copy existing light JSX
├─ Additional animations
│  └─ Add calculations in useFrame
├─ Custom geometry
│  └─ Replace icosahedronGeometry
├─ Particle effects
│  └─ New group in render
├─ Interactive controls
│  └─ Add event listeners to Canvas
└─ Sound/music sync
   └─ Add analyser to useFrame

Requires Planning:
├─ Model loading/swapping
│  └─ Use useGLTF with Suspense
├─ Multiple objects/scenes
│  └─ Extend state management
├─ Post-processing effects
│  └─ Add EffectComposer
└─ Physics simulation
   └─ Integrate Cannon or Rapier
```

## Testing Considerations

```
Unit Tests:
├─ Props validation
├─ Color format validation
├─ Speed parameter ranges
└─ Ref initialization

Integration Tests:
├─ Component mounting
├─ Canvas rendering
├─ Animation frame updates
└─ User interaction

Visual Regression:
├─ Screenshot comparisons
├─ Different color schemes
├─ Various animation speeds
└─ Mobile viewport sizes

Performance Tests:
├─ FPS measurement
├─ Memory profiling
├─ GPU load monitoring
└─ Startup time benchmarks
```

---

**This document provides technical insight into the ArtScene component architecture.**

