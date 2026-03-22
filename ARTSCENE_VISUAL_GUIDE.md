# ArtScene Component - Quick Visual Summary

## Component Architecture

```
┌─ ArtGalleryScene (Full Page Wrapper)
│  │
│  └─ Canvas (React Three Fiber)
│     │
│     ├─ Fog
│     ├─ Color (Background)
│     │
│     ├─ ArtScene (Main 3D Content)
│     │  │
│     │  ├─ Lighting System (5 lights)
│     │  ├─ BackgroundSphere
│     │  ├─ Central Object Group
│     │  │  ├─ Icosahedron (main art placeholder)
│     │  │  └─ Torus Ring (depth effect)
│     │  └─ Ground Plane (reflection)
│     │
│     └─ OrbitControls (Interaction)
│
└─ UIOverlay (Text Information)
   ├─ Top bar
   ├─ Center info (title + description)
   └─ Bottom instructions
```

## Visual Hierarchy

```
SCENE DEPTH (Z-axis)
│
│  Far: Background Sphere (wireframe grid)
│       ↓
│       Fog
│       ↓
│  Center: Art Object (icosahedron + torus)
│       ↓
│  Near: Camera
│
└─ Lights: Positioned around scene
```

## Animation Timeline

```
Time Flow (useFrame loop):
│
├─ Object Rotation (every frame)
│  └─ Continuous smooth spin on X & Y
│
├─ Floating Motion (sine wave ~0.5-1.6s period)
│  └─ Vertical bobbing ±0.3 units
│
├─ Pulsing Glow (sine wave ~1.25s period)
│  └─ Emissive intensity 0.15→0.45
│
├─ Camera Motion (slow drift)
│  ├─ X-axis swing (~6.7s period)
│  └─ Z-axis breathing (~10s period)
│
└─ All synchronized to single timeRef
```

## Lighting Setup Diagram

```
                    Key Light
                    (White #ffffff)
                         |
        [8, 12, 8]       [8, 8, -8]
           /              \
    Directional          Directional
    Intensity: 1.2       Intensity: 0.6
                         (Blue Fill)
    
                    OBJECT
                 (Icosahedron)
    
        [10, 15, 10]    [-15, 5, -15]
           /              \
      Point Light      Point Light
   (Accent Color)     (Magenta Rim)
   Intensity: 1.0     Intensity: 0.8
   
              Ambient Light
              Intensity: 0.4
```

## Color Flow

```
Input: accentColor prop (default: #00ff88 cyan)
│
├─ Main Object: Uses accent color
│  └─ meshPhongMaterial color + emissive
│
├─ Accent Light: Uses accent color
│  └─ pointLight color
│
├─ Torus Ring: Uses accent color
│  └─ wireframe material color
│
└─ Background Grid: Uses accent color
   └─ wireframe overlay opacity
```

## Motion Equations

### Rotation
```
object.rotation.x += 0.0003 * rotationSpeed
object.rotation.y += 0.0008 * rotationSpeed
```

### Float (Bobbing)
```
float = sin(time * 0.5 * floatSpeed) * 0.3
object.position.y = initialY + float
Range: [initialY - 0.3, initialY + 0.3]
```

### Pulsing Glow
```
pulse = sin(time * 0.8) * 0.15 + 0.3
material.emissiveIntensity = pulse
Range: [0.15, 0.45]
```

### Camera Movement
```
camera.position.x = sin(time * 0.15) * 0.5      // ±0.5 units, ~42s period
camera.position.z = 5 + cos(time * 0.1) * 0.2   // 4.8-5.2, ~63s period
```

## Customization Quick Tweaks

### Make it More Dynamic
```tsx
<ArtScene
  rotationSpeed={1.0}      // 2x faster
  floatSpeed={1.5}         // 1.9x faster bob
  accentColor="#ff00ff"    // Magenta instead of cyan
/>
```

### Make it Calmer/Slower
```tsx
<ArtScene
  rotationSpeed={0.2}      // Very slow
  floatSpeed={0.3}         // Subtle bob
  accentColor="#a855f7"    // Soft purple
/>
```

### Change for Different Art Types

**For Geometric Art:**
```tsx
rotationSpeed={0.8}
accentColor="#ffd700"    // Gold
```

**For Organic Art:**
```tsx
rotationSpeed={0.3}
floatSpeed={1.2}
accentColor="#20b2aa"    // Teal
```

**For Bold/Dramatic:**
```tsx
rotationSpeed={0.9}
floatSpeed={0.9}
accentColor="#ff1493"    // Hot pink
```

## File Structure

```
app/
├── components/
│   ├── ArtScene.tsx           ← Main 3D component
│   ├── ArtGalleryScene.tsx    ← Canvas wrapper
│   ├── UIOverlay.tsx          ← Info overlay
│   └── (other components...)
│
└── (scenes)/
    └── gallery/
        └── page.tsx           ← Uses ArtGalleryScene
```

## Key Imports Used

```typescript
// React Three Fiber
import { Canvas } from '@react-three/fiber';
import { useFrame, useRef } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Three.js
import * as THREE from 'three';
import { Mesh, Group } from 'three';

// React
import { useState, useRef, useMemo, Suspense } from 'react';
```

## Performance Characteristics

- **60 FPS Target**: Frame-based animations
- **Draw Calls**: ~8-10 (background sphere, object, lights)
- **Triangles**: ~8000+ (background sphere detail)
- **Memory**: ~50-100MB (loaded models may add more)
- **Canvas DPI**: Scales to device pixel ratio

## Browser Compatibility

- ✅ Chrome/Edge (WebGL 2)
- ✅ Firefox (WebGL 2)
- ✅ Safari (WebGL 2)
- ✅ Mobile browsers (with performance scaling)

## Common Adjustments

| Goal | Adjustment |
|------|------------|
| Slower spin | Lower `rotationSpeed` |
| Faster animation | Increase `floatSpeed` |
| Brighter lights | Increase `intensity` values |
| Different mood | Change `accentColor` |
| More interaction | Set `interactive={true}` |
| Static view | Set `interactive={false}`, speeds to 0 |
| Hide UI | Remove `UIOverlay` component |
| Custom object | Replace icosahedronGeometry |

