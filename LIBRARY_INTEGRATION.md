# Library Integration Architecture

## Dependency Hierarchy

```
Your React App (Next.js)
    ↓
Canvas (React Three Fiber)
    ↓
Three.js Scene
    ├── Geometry (BoxGeometry, SphereGeometry, etc.)
    ├── Materials (MeshStandardMaterial, PhongMaterial, etc.)
    ├── Lights (AmbientLight, DirectionalLight, PointLight)
    ├── Camera (PerspectiveCamera, OrthographicCamera)
    └── Renderer (WebGL)

Drei Components (Helper Layer)
    ├── Wrap Three.js objects
    ├── Provide pre-made components
    └── Add event handling & interactions
```

## Installation Order (What npm install does)

When you run `npm install`, npm reads package.json and installs in order:

```
1. Three.js (^r128)
   └── Installs: Three.js library with all 3D utilities

2. @react-three/fiber (^8.15.0)
   └── Depends on: React, Three.js
   └── Provides: Canvas, useFrame, useThree hooks

3. @react-three/drei (^9.89.0)
   └── Depends on: React Three Fiber, Three.js
   └── Provides: OrbitControls, Box, Sphere, useGLTF, etc.

4. Other dependencies (React, Next.js, Tailwind, TypeScript)
```

## File-by-File: How Libraries Are Used

### 1. app/(scenes)/gallery/page.tsx
```typescript
// Imports React Three Fiber
import { Canvas } from '@react-three/fiber';  // Main 3D canvas
import { OrbitControls } from '@react-three/drei';  // Camera control helper
import Scene3D from '@/app/components/Scene3D';  // Your 3D content

// Creates full-screen 3D canvas with React Three Fiber
<Canvas camera={{...}} gl={{...}}>
  <Scene3D />  {/* Your Three.js content */}
  <OrbitControls />  {/* Drei's orbit control helper */}
</Canvas>
```

### 2. app/components/Scene3D.tsx
```typescript
// Uses React Three Fiber hooks
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';  // Three.js type

// Creates 3D objects with Three.js
<mesh ref={meshRef}>
  <icosahedronGeometry args={[1.5, 4]} />  {/* Three.js geometry */}
  <meshPhongMaterial color="#00ff88" />  {/* Three.js material */}
</mesh>

// Uses React Three Fiber hook for animation
useFrame((state) => {
  // Called 60fps - update geometry each frame
});

// Uses Three.js for lighting
<ambientLight intensity={0.5} />
<pointLight color="#00ff88" />
```

### 3. app/components/UIOverlay.tsx
```typescript
// Standard React - no 3D libraries needed
// Just React hooks and Tailwind CSS
import { useState, useEffect } from 'react';
```

## How They Work Together - Complete Example

```jsx
'use client';
import { Canvas } from '@react-three/fiber';         // Layer 1: React integration
import { OrbitControls } from '@react-three/drei';   // Layer 3: Helpers
import Scene3D from '@/app/components/Scene3D';      // Your component

export default function Gallery() {
  return (
    // Canvas = Entry point from React Three Fiber
    // Converts your JSX into Three.js scene
    <Canvas 
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: true }}
    >
      {/* Background color - Three.js property exposed to React */}
      <color attach="background" args={['#0a0a0a']} />
      
      {/* Lights - Three.js light objects as React components */}
      <ambientLight intensity={0.5} />
      
      {/* Scene3D component renders Three.js meshes */}
      <Scene3D />
      
      {/* OrbitControls from Drei - handles mouse input automatically */}
      <OrbitControls autoRotate />
    </Canvas>
  );
}
```

## Three.js Concepts Mapped to React Three Fiber

| Three.js | React Three Fiber | Purpose |
|----------|-------------------|---------|
| `new THREE.Scene()` | `<Canvas>` children | Container for all 3D objects |
| `new THREE.Mesh()` | `<mesh>` | 3D object in scene |
| `new THREE.BoxGeometry()` | `<boxGeometry>` | Shape of the object |
| `new THREE.MeshStandardMaterial()` | `<meshStandardMaterial>` | How object looks (color, texture) |
| `scene.add(mesh)` | JSX return | Automatically added by React Three Fiber |
| `renderer.render(scene, camera)` | `<Canvas>` | Renders automatically each frame |
| `requestAnimationFrame()` | `useFrame()` | Animation loop hook |

## Full-Screen Canvas Setup (Already in Your Project)

Your gallery page creates a full-screen 3D experience:

```jsx
<div className="relative w-full h-screen bg-dark">
  <Canvas
    camera={{ position: [0, 0, 5], fov: 75 }}
    gl={{ antialias: true, alpha: true }}
    className="w-full h-full"  // Full viewport
  >
    <Scene3D />
  </Canvas>
  <UIOverlay />  {/* Overlaid React UI, not 3D */}
</div>
```

**Why this works:**
- Canvas takes up 100% of viewport via Tailwind's `w-full h-full`
- WebGL rendering happens on canvas element
- UIOverlay sits on top with `absolute` positioning
- No scrolling - immersive experience

## Key Configuration Files

### next.config.js
```javascript
// Next.js specific settings
// Doesn't directly affect Three.js, but optimizes build
module.exports = {
  reactStrictMode: true,  // Better error detection
  swcMinify: true,        // Faster builds
  compiler: {
    removeConsole: true   // Smaller production bundle
  }
};
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]      // Allows: import X from '@/app/...'
    }
  }
}
```

### tailwind.config.js
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        dark: '#0a0a0a',   // Dark background for immersive feel
        accent: '#00ff88'  // Accent color for UI
      }
    }
  }
};
```

## Memory Management

React Three Fiber + Drei handle cleanup automatically:

```jsx
// When component unmounts, React Three Fiber:
// - Removes mesh from scene
// - Disposes geometry
// - Disposes material
// - Cleans up event listeners

// This prevents memory leaks in SPAs
```

## Performance Considerations

1. **Automatic scaling**: Canvas adjusts DPI for performance
2. **Lazy loading**: Use `<Suspense>` for models
3. **LOD (Level of Detail)**: Use Drei's LOD component for complex models
4. **Batching**: Multiple small objects = performance hit

```jsx
<Canvas performance={{ min: 0.5, max: 1 }}>
  {/* Automatically scales rendering quality based on FPS */}
</Canvas>
```

## What Happens When You Run npm install

```bash
npm install
```

**Downloads:**
- three@3.128.0 (3D library) ~500KB
- @react-three/fiber@8.15.0 (React integration) ~100KB
- @react-three/drei@9.89.0 (Helpers) ~200KB
- All dependencies (~500-700 MB total)

**Creates:**
- node_modules/ folder (all code)
- package-lock.json (exact versions for reproducibility)

**Time:** 2-5 minutes depending on internet

## Verification After Installation

Check that everything installed correctly:

```bash
# In project directory, run:
npm list three
npm list @react-three/fiber
npm list @react-three/drei

# Should output versions without errors
```

Then start development:

```bash
npm run dev
# Opens http://localhost:3000
```

## Next Steps

1. Install Node.js from https://nodejs.org/
2. Navigate to project: `cd "C:\...\experiential-art"`
3. Install dependencies: `npm install`
4. Run dev server: `npm run dev`
5. Open http://localhost:3000 in browser
6. Click "Enter Gallery" to see your 3D scene
7. Experiment with modifying Scene3D.tsx

