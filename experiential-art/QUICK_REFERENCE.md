# Quick Reference: Three.js + React Three Fiber + Drei

## Common Patterns in Your Project

### 1. Basic 3D Object (Geometry + Material)

```jsx
// Using Drei's Box component
<Box position={[0, 0, 0]} scale={[1, 1, 1]}>
  <meshStandardMaterial color="blue" />
</Box>

// Equivalent in raw Three.js:
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshStandardMaterial({ color: 'blue' });
// const mesh = new THREE.Mesh(geometry, material);
// mesh.position.set(0, 0, 0);
// scene.add(mesh);
```

### 2. Lighting

```jsx
// Ambient light (general illumination)
<ambientLight intensity={0.5} color="white" />

// Directional light (sun-like)
<directionalLight position={[10, 10, 10]} intensity={1.5} />

// Point light (bulb-like, with color)
<pointLight position={[-10, 10, 5]} intensity={1} color="#00ff88" />
```

### 3. Camera Controls

```jsx
// Orbit Controls (rotate, zoom, pan with mouse)
<OrbitControls
  enableZoom={true}
  enablePan={true}
  autoRotate={true}
  autoRotateSpeed={2}
/>

// First-Person Controls (WASD movement)
<FirstPersonControls movementSpeed={5} lookSpeed={0.05} />

// Perspective Camera (if you need custom settings)
<PerspectiveCamera position={[0, 0, 5]} fov={75} near={0.1} far={1000} />
```

### 4. Loading 3D Models

```jsx
import { useGLTF } from '@react-three/drei';

export function MyModel() {
  // Load a .glb or .gltf file
  const { scene } = useGLTF('/models/my-model.glb');
  
  return <primitive object={scene} scale={2} />;
}

// Use in Canvas:
<Canvas>
  <MyModel />
  <OrbitControls />
</Canvas>
```

### 5. Animations with useFrame

```jsx
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export function RotatingBox() {
  const meshRef = useRef(null);

  // Called every frame (60fps by default)
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}
```

### 6. Textures and Images

```jsx
import { useTexture } from '@react-three/drei';

export function TexturedBox() {
  const texture = useTexture('/textures/wood.jpg');
  
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
```

### 7. Loading Multiple Models

```jsx
import { useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

export function Scene() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <ModelA />
        <ModelB />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

function ModelA() {
  const { scene } = useGLTF('/models/model-a.glb');
  return <primitive object={scene} position={[-2, 0, 0]} />;
}

function ModelB() {
  const { scene } = useGLTF('/models/model-b.glb');
  return <primitive object={scene} position={[2, 0, 0]} />;
}
```

## Library Reference

### Canvas Props

```jsx
<Canvas
  camera={{ position: [0, 0, 5], fov: 75 }}    // Camera setup
  gl={{ antialias: true, alpha: true }}        // Renderer options
  className="w-full h-screen"                   // CSS classes
  dpr={[1, 2]}                                  // Device pixel ratio
  performance={{ min: 0.5, max: 1 }}           // Auto-scaling
>
  {/* Your scene here */}
</Canvas>
```

### Common Materials

```jsx
// Standard material (realistic, metal/plastic look)
<meshStandardMaterial color="blue" metalness={0.8} roughness={0.2} />

// Phong material (shinier, older style)
<meshPhongMaterial color="blue" shininess={100} />

// Basic material (no lighting, flat color)
<meshBasicMaterial color="blue" />

// Wireframe
<meshStandardMaterial color="blue" wireframe={true} />
```

### Drei Components (Pre-built)

```jsx
// Geometry
<Box />           // Cube
<Sphere />        // Sphere
<Plane />         // 2D plane
<Cylinder />      // Cylinder
<Cone />          // Cone
<Circle />        // Circle
<Triangle />      // Triangle

// Helpers
<OrbitControls /> // Orbit around object
<Grid />          // Ground grid
<Bounds />        // Auto-fit camera to objects
<Environment />   // HDRI background lighting
<Stars />         // Starfield background
<Text />          // 3D text
<Center />        // Center geometry
```

### Hooks

```jsx
// useFrame - Called every frame for animations
useFrame(({ delta, clock }) => {
  // delta = time since last frame
  // clock.getElapsedTime() = total elapsed time
});

// useThree - Access Three.js scene, camera, renderer
const { scene, camera, gl } = useThree();

// useGLTF - Load 3D models
const { scene, animations } = useGLTF('/path/to/model.glb');

// useTexture - Load images as textures
const texture = useTexture('/path/to/image.jpg');

// useLoader - Load any custom format
const data = useLoader(JSONLoader, '/path/to/data.json');
```

## Files in Your Project Using These Libraries

| File | Purpose | Libraries Used |
|------|---------|-----------------|
| `app/(scenes)/gallery/page.tsx` | Main gallery page | React Three Fiber Canvas |
| `app/components/Scene3D.tsx` | 3D content and geometry | Three.js + useFrame hook |
| `app/components/UIOverlay.tsx` | Minimal UI overlay | React only |
| `app/components/Example3DScene.tsx` | Reference examples | All three libraries |

## Next Steps

1. **Install Node.js** (if not done)
2. **Run `npm install`** in project directory
3. **Run `npm run dev`** to start dev server
4. **Visit http://localhost:3000**
5. **Click "Enter Gallery"** to see the 3D scene
6. **Modify `Scene3D.tsx`** to experiment with different geometries and effects

---

## Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `Canvas is not exported from @react-three/fiber` | Package not installed | Run `npm install` |
| `Module not found: THREE` | Three.js dependency missing | Run `npm install three` |
| `useFrame is not defined` | Import missing | Add `import { useFrame } from '@react-three/fiber'` |
| `OrbitControls is not exported` | Drei not installed | Run `npm install @react-three/drei` |
| White screen in Canvas | Camera/lighting issue | Check camera position and light intensity |

