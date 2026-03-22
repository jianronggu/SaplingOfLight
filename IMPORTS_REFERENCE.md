# Library Imports Reference

This document shows exactly which imports use which libraries in your project.

## File: app/(scenes)/gallery/page.tsx

```typescript
import { Canvas } from '@react-three/fiber';
// ↑ React Three Fiber library
// ↓ Creates the 3D canvas element that renders Three.js scenes

import { OrbitControls } from '@react-three/drei';
// ↑ @react-three/drei library
// ↓ Pre-built component for interactive camera controls
// Handles: mouse drag to rotate, scroll to zoom, right-click to pan

import { Suspense } from 'react';
// ↑ React built-in
// ↓ Used for loading states while 3D models are being fetched

import Scene3D from '@/app/components/Scene3D';
// ↑ Your custom component
// ↓ Contains all 3D geometry, materials, and lights

import UIOverlay from '@/app/components/UIOverlay';
// ↑ Your custom component
// ↓ React-only UI that sits on top of the canvas
```

### What happens in this file:

```jsx
<Canvas
  camera={{ position: [0, 0, 5], fov: 75 }}
  gl={{ antialias: true, alpha: true }}
>
  {/* ↑ Canvas from @react-three/fiber creates WebGL context */}
  
  <color attach="background" args={['#0a0a0a']} />
  {/* ↑ Three.js color property exposed through React Three Fiber */}
  
  <Suspense fallback={null}>
    <Scene3D />
    {/* ↑ Your 3D content component */}
  </Suspense>
  
  <OrbitControls ... />
  {/* ↑ Drei component for camera control */}
</Canvas>

<UIOverlay />
{/* ↑ Overlaid React UI on top of canvas */}
```

---

## File: app/components/Scene3D.tsx

```typescript
import { useRef } from 'react';
// ↑ React built-in
// ↓ Creates a reference to the mesh for updates

import { useFrame } from '@react-three/fiber';
// ↑ React Three Fiber library
// ↓ Hook that runs a function every frame (60fps)
// Replaces: requestAnimationFrame() in vanilla Three.js

import { Mesh } from 'three';
// ↑ Three.js library - type definition
// ↓ TypeScript type for the mesh reference
```

### What happens in this file:

```jsx
const meshRef = useRef<Mesh>(null);
// ↑ Create a reference to a Three.js Mesh object

useFrame((state) => {
  if (meshRef.current) {
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.002;
  }
});
// ↑ React Three Fiber hook
// ↓ Called every frame - updates rotation property from Three.js

return (
  <group>
    {/* ↑ Three.js Group object exposed as React component */}
    
    <ambientLight intensity={0.5} />
    {/* ↑ Three.js AmbientLight exposed as React component */}
    
    <directionalLight position={[10, 10, 10]} intensity={1.5} />
    {/* ↑ Three.js DirectionalLight - sun-like lighting */}
    
    <pointLight position={[-10, 10, 5]} intensity={1} color="#00ff88" />
    {/* ↑ Three.js PointLight - bulb-like lighting */}
    
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* ↑ Three.js Mesh object with React ref */}
      
      <icosahedronGeometry args={[1.5, 4]} />
      {/* ↑ Three.js IcosahedronGeometry - shape of the object */}
      
      <meshPhongMaterial
        color="#00ff88"
        wireframe={false}
        emissive="#00ff88"
        emissiveIntensity={0.2}
      />
      {/* ↑ Three.js MeshPhongMaterial - how it looks */}
    </mesh>
    
    <mesh position={[0, 0, -10]}>
      <sphereGeometry args={[20, 32, 32]} />
      {/* ↑ Three.js SphereGeometry - background sphere */}
      
      <meshBasicMaterial
        color="#1a1a1a"
        side={1}
        wireframe={true}
      />
      {/* ↑ Three.js MeshBasicMaterial - no lighting, wireframe */}
    </mesh>
  </group>
);
```

---

## File: app/components/Example3DScene.tsx

```typescript
import { Canvas } from '@react-three/fiber';
// Example of Canvas

import { OrbitControls, Box, Sphere } from '@react-three/drei';
// ↑ Drei pre-built components
// Box = THREE.BoxGeometry + THREE.MeshStandardMaterial
// Sphere = THREE.SphereGeometry + material
// OrbitControls = interactive camera control system

import { useState } from 'react';
// React hook for state management
```

### What happens:

```jsx
<Box position={[0, 0, 0]} args={[1, 1, 1]}>
  <meshStandardMaterial color="#00ff88" />
</Box>
// ↑ Drei component wrapping:
//   - THREE.BoxGeometry([1, 1, 1])
//   - THREE.Mesh
//   - Material attachment
// Saves ~20 lines of Three.js code!
```

---

## File: app/components/UIOverlay.tsx

```typescript
import { useState, useEffect, useRef } from 'react';
// ↑ React only - NO 3D libraries used here
// This is pure React UI that sits on top of the canvas
```

**Note**: No Three.js, React Three Fiber, or Drei imports here.
This is intentional - the UI is separate from 3D rendering.

---

## File: app/lib/math.ts

```typescript
// No external library imports - just pure TypeScript utilities
// These are helper functions for math operations:
// - clamp() - limit value between min and max
// - lerp() - smooth transitions between values
// - easing() - animation easing functions
// - mapRange() - convert value from one range to another
```

---

## File: app/page.tsx

```typescript
// React only - no 3D libraries
// This is the landing page component
// Imports: React and React hooks only
```

---

## Import Map

| Import Source | Library | Used For | Files |
|---------------|---------|----------|-------|
| `react-three/fiber` | React Three Fiber | Canvas, useFrame hook | gallery/page.tsx, Scene3D.tsx, Example3DScene.tsx |
| `react-three/drei` | @react-three/drei | OrbitControls, Box, Sphere | gallery/page.tsx, Example3DScene.tsx |
| `three` | Three.js | Type definitions, constants | Scene3D.tsx |
| `react` | React | Hooks, components | All .tsx files |
| `next` | Next.js | Routing, components | layout.tsx, page.tsx |

---

## Three.js Objects Exposed as React Components

In React Three Fiber, these Three.js objects become React components:

| Three.js | React Three Fiber |
|----------|-------------------|
| `new THREE.Mesh()` | `<mesh>` |
| `new THREE.BoxGeometry()` | `<boxGeometry>` |
| `new THREE.SphereGeometry()` | `<sphereGeometry>` |
| `new THREE.MeshPhongMaterial()` | `<meshPhongMaterial>` |
| `new THREE.MeshStandardMaterial()` | `<meshStandardMaterial>` |
| `new THREE.AmbientLight()` | `<ambientLight>` |
| `new THREE.DirectionalLight()` | `<directionalLight>` |
| `new THREE.PointLight()` | `<pointLight>` |
| `new THREE.Group()` | `<group>` |
| `new THREE.PerspectiveCamera()` | `<perspectiveCamera>` |

---

## Full Library Flow Example

When you write:

```jsx
<Canvas>
  <Scene3D />
  <OrbitControls />
</Canvas>
```

Here's what happens:

1. **React Three Fiber** (`Canvas`)
   - Creates a WebGL context
   - Sets up a render loop

2. **Your Component** (`Scene3D`)
   - Returns Three.js objects as JSX

3. **React Three Fiber** (reconciliation)
   - Converts JSX to Three.js API calls
   - Creates actual mesh, geometry, material objects

4. **Three.js** (rendering)
   - Uses WebGL to render to canvas
   - Manages 3D math, lighting, transformations

5. **@react-three/drei** (`OrbitControls`)
   - Listens to mouse events
   - Updates camera position/rotation
   - Runs through React Three Fiber's render loop

6. **Result**
   - Interactive 3D scene in browser
   - Responsive to user input
   - Runs at 60fps

---

## Library Dependencies

```
Your React App
    ↓
@react-three/fiber (depends on ↓)
    ↓
three (Three.js) ← Core library
    
@react-three/drei (depends on ↓)
    ↓
@react-three/fiber + three
```

All three libraries must be installed for the project to work:
- ✓ Three.js (core 3D engine)
- ✓ React Three Fiber (React integration)
- ✓ @react-three/drei (helpful utilities)

---

## Version Numbers Matter

Your package.json specifies:

```json
{
  "three": "^r128",                    // Latest release
  "@react-three/fiber": "^8.15.0",     // v8.x.x
  "@react-three/drei": "^9.89.0"       // v9.x.x
}
```

**The `^` symbol means:**
- `^r128` = r128 to r200 (latest)
- `^8.15.0` = 8.15.0 to 8.999.999
- `^9.89.0` = 9.89.0 to 9.999.999

These versions are compatible with each other.

---

## Testing Imports

After `npm install`, you can test imports in browser console:

```javascript
// Check React Three Fiber
console.log(typeof THREE)  // Should be 'object'

// Check Canvas loaded
console.log(document.querySelector('canvas'))  // Should show canvas element

// Check WebGL context
const canvas = document.querySelector('canvas');
console.log(canvas.getContext('webgl2'))  // Should show WebGL context
```

If any of these fail, the libraries didn't install correctly.

