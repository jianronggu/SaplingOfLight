# ArtScene Component Guide

## Overview

The **ArtScene** component is a sophisticated 3D art display system built with React Three Fiber and Three.js. It provides a full-screen, immersive canvas with professional lighting, atmospheric effects, and subtle animations designed to showcase artwork beautifully.

## Features

### Core Features
- ✨ **Full-Screen Responsive Canvas** - Automatically scales to viewport
- 🎨 **Professional Multi-Light Setup** - 5-layer lighting system for depth and mood
- 🎭 **Atmospheric Background** - Gradient-textured sphere with subtle wireframe grid
- ✨ **Subtle Motion** - Floating, rotating, and pulsing animations
- 🎯 **Central Object Placeholder** - Elegant icosahedron placeholder for your artwork
- 🔄 **Smooth Animations** - Frame-based motion for 60fps performance
- 📱 **Device Optimized** - Responsive DPI handling and performance settings

### Lighting System (5-Layer)

```
1. Key Light (Directional)
   - Position: [8, 12, 8]
   - Color: White (#ffffff)
   - Intensity: 1.2
   - Purpose: Main illumination, creates primary shadows

2. Fill Light (Directional)
   - Position: [-8, 8, -8]
   - Color: Blue (#4488ff)
   - Intensity: 0.6
   - Purpose: Softens shadows, adds color accent

3. Ambient Light
   - Intensity: 0.4
   - Purpose: Overall scene illumination, prevents pure blacks

4. Accent Point Light
   - Position: [10, 15, 10]
   - Color: Customizable (default: #00ff88 cyan)
   - Intensity: 1.0
   - Distance: 50
   - Purpose: Focal point glow, highlights central object

5. Rim Light (Point)
   - Position: [-15, 5, -15]
   - Color: Magenta (#ff0088)
   - Intensity: 0.8
   - Distance: 40
   - Purpose: Edge lighting, depth separation, atmospheric feel
```

### Animation System

#### Rotation
- **X-axis**: Slow gentle tilt (0.0003 * rotationSpeed)
- **Y-axis**: Primary rotation (0.0008 * rotationSpeed)
- **Control**: `rotationSpeed` prop (0-1)

#### Floating (Bobbing)
- **Height**: Oscillates ±0.3 units
- **Timing**: Smooth sine wave motion
- **Control**: `floatSpeed` prop (0-1)

#### Pulsing Glow
- **Parameter**: Emissive intensity
- **Range**: 0.15 to 0.45
- **Timing**: Synchronized with overall scene rhythm

#### Camera Motion
- **X-axis**: Subtle side-to-side (±0.5 units)
- **Z-axis**: Gentle forward/back breathing (±0.2 units)
- **Purpose**: Creates depth perception and life to the scene

### Background Atmosphere

The **BackgroundSphere** component creates an atmospheric environment:

```
Features:
- Radial gradient (dark inner to darker outer)
- Procedural starfield (100 random points with low opacity)
- Wireframe grid overlay (very subtle, ~5% opacity)
- Customizable accent color in grid
- Subtle ground plane reflection
```

## Component Usage

### Basic Usage

```tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ArtScene from '@/app/components/ArtScene';

export default function MyGallery() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
        <color attach="background" args={['#0a0a0a']} />
        <ArtScene />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
```

### Advanced Usage with Props

```tsx
<ArtScene
  title="Quantum Entanglement"
  description="A visual exploration of particle physics and interconnectedness"
  rotationSpeed={0.7}
  floatSpeed={1.2}
  accentColor="#ff00ff"
/>
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | "Untitled Artwork" | Display title for the artwork |
| `description` | `string` | "An immersive 3D experience" | Descriptive text about the piece |
| `rotationSpeed` | `number` | 0.5 | Multiplier for rotation speed (0-1) |
| `floatSpeed` | `number` | 0.8 | Multiplier for floating motion (0-1) |
| `accentColor` | `string` | "#00ff88" | Hex color for accent lights and elements |

## Customization Guide

### Changing the Central Object

Replace the icosahedron in the `ArtScene` component with your own geometry:

```tsx
// Current (in ArtScene component):
<mesh ref={objectRef} position={[0, 0, 0]}>
  <icosahedronGeometry args={[1.5, 5]} />
  {/* ... material ... */}
</mesh>

// Example: Using a loaded model
import { useGLTF } from '@react-three/drei';

function ArtObject() {
  const { scene } = useGLTF('/models/your-model.glb');
  return <primitive object={scene} />;
}

// In ArtScene, replace mesh with:
<Suspense fallback={null}>
  <ArtObject />
</Suspense>
```

### Adjusting Lighting

Modify the light properties directly in the component:

```tsx
// Key light - make it more colorful
<directionalLight
  position={[8, 12, 8]}
  intensity={1.5}  // Increase intensity
  color="#ff6b35"  // Change color to warm orange
/>

// Accent point light
<pointLight
  position={[10, 15, 10]}
  intensity={1.5}  // Make glow more prominent
  color={accentColor}
  distance={100}   // Increase reach
/>
```

### Tweaking Animations

Control animation speed in the `useFrame` hook:

```tsx
// Faster rotation
groupRef.current.rotation.y += 0.002 * rotationSpeed; // was 0.0008

// More aggressive floating
const float = Math.sin(timeRef.current * 1.0 * floatSpeed) * 0.5; // was 0.5

// Camera movement intensity
state.camera.position.x = Math.sin(timeRef.current * 0.3) * 1; // was 0.15 & 0.5
```

### Changing Background Style

The `BackgroundSphere` component uses a procedurally generated texture. Customize it:

```tsx
// In BackgroundSphere function:
const gradient = ctx.createRadialGradient(256, 256, 100, 256, 256, 512);
gradient.addColorStop(0, '#2a2a3e');  // Lighter center
gradient.addColorStop(1, '#0a0a0f');  // Darker edges

// Adjust starfield density:
for (let i = 0; i < 500; i++) {  // More stars
  // ...
}
```

## ArtGalleryScene Wrapper Component

The **ArtGalleryScene** component wraps ArtScene in a Canvas and provides additional features:

### Features
- Full Canvas setup with optimal defaults
- Built-in OrbitControls for interactivity
- Fog for depth perception
- Integrated UIOverlay
- Performance optimization (DPI scaling)

### Usage

```tsx
import ArtGalleryScene from '@/app/components/ArtGalleryScene';

export default function Gallery() {
  return (
    <ArtGalleryScene
      title="My Artwork"
      description="Description here"
      interactive={true}
      accentColor="#00ff88"
    />
  );
}
```

## Performance Optimization Tips

1. **Reduce Light Count**: Remove accent lights if not needed
2. **Simplify Geometry**: Lower geometry args (icosahedronGeometry `[size, detail]`)
3. **Disable Animations**: Set `rotationSpeed={0}` and `floatSpeed={0}`
4. **Limit Wireframe**: Remove BackgroundSphere wireframe overlay
5. **Use LOD** (Level of Detail): For complex models, use drei's `useGLTF` with LOD
6. **Canvas Settings**: Disable antialias if needed: `gl={{ antialias: false }}`

## Color Palette Guide

Default accent color is `#00ff88` (cyan). Here are popular alternatives:

| Color | Hex | Feel |
|-------|-----|------|
| Cyan | `#00ff88` | Tech, cool, modern |
| Magenta | `#ff00ff` | Energetic, bold |
| Gold | `#ffd700` | Luxury, warm |
| Purple | `#a855f7` | Mystical, premium |
| Pink | `#ff1493` | Contemporary, vibrant |
| Teal | `#20b2aa` | Balanced, calm |

## Troubleshooting

### Object not visible
- Check camera position and distance
- Ensure lighting intensity > 0
- Verify material emissive is set

### Animations stuttering
- Reduce animation complexity
- Check device performance
- Lower canvas DPI

### Colors too dark
- Increase ambient light intensity
- Add more point lights
- Brighten directional lights

### Too much motion/dizziness
- Reduce `rotationSpeed` and `floatSpeed`
- Lower camera motion intensity
- Disable auto-rotate in OrbitControls

## Next Steps

1. **Import Your Model**: Replace placeholder icosahedron with your artwork
2. **Fine-tune Lighting**: Adjust colors and intensities for your specific art
3. **Customize Motion**: Set animation speeds to match your vision
4. **Add Interactivity**: Enhance with custom controls or information panels
5. **Performance Test**: Check rendering on different devices

## Related Components

- `ArtGalleryScene.tsx` - Canvas wrapper with OrbitControls
- `UIOverlay.tsx` - Minimal info display overlay
- `Scene3D.tsx` - Legacy scene component (reference)

