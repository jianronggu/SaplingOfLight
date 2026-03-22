# 3D Library Ecosystem - Visual Guide

## The Complete Tech Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                    YOUR REACT APP                                │
│           (Next.js 14 + TypeScript + React 18)                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│           REACT THREE FIBER (Renderer)                           │
│   - Converts 3D JSX to Three.js objects                          │
│   - Manages render loop (60fps)                                  │
│   - Provides hooks: useFrame, useThree, useLoader               │
│   - Automatic cleanup & garbage collection                       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  THREE.JS (Core 3D Engine)                                       │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Geometries: BoxGeometry, SphereGeometry, etc.           │    │
│  │ Materials: MeshStandardMaterial, MeshPhongMaterial      │    │
│  │ Lights: AmbientLight, DirectionalLight, PointLight      │    │
│  │ Camera: PerspectiveCamera, OrthographicCamera          │    │
│  │ Renderer: WebGL context, rendering pipeline             │    │
│  │ Math: Vector3, Quaternion, Matrix4                      │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                 WebGL (GPU Rendering)                            │
│              Renders to <canvas> element                         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Browser Window                                │
│                   3D Scene Displayed                             │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│         @REACT-THREE/DREI (Utility Layer)                       │
│   Sits on top and provides pre-built components:                │
│                                                                  │
│   Camera Controls:        Scene Helpers:                        │
│   ├─ OrbitControls      ├─ Environment                         │
│   ├─ FirstPersonControls├─ Stars                               │
│   └─ FlyControls        └─ Grid                                │
│                                                                  │
│   Loaders:              Components:                            │
│   ├─ useGLTF()         ├─ Box, Sphere, Cylinder               │
│   ├─ useTexture()      ├─ Text (3D text)                      │
│   └─ useEnvironment()  └─ Bounds (auto-fit camera)            │
└─────────────────────────────────────────────────────────────────┘
```

---

## Dependency Tree

```
experiential-art (your app)
│
├─ next (v14)
│  └─ react (v18)
│  └─ react-dom (v18)
│
├─ @react-three/fiber (v8.15)
│  └─ three (r128) ◄─────────┐
│                              │
├─ @react-three/drei (v9.89)  │
│  ├─ @react-three/fiber      │
│  │  └─ three (r128)          │
│  └─ three (r128) ◄───────────┘
│
├─ three (r128)
│  └─ (no dependencies - core library)
│
├─ tailwindcss (v3.4)
├─ typescript (v5.3)
└─ ... other dependencies
```

**Key Point**: Three.js is the foundation. Both Fiber and Drei depend on it.

---

## What Each Library Provides

### Three.js: The Foundation

```
THREE.js
├── Geometries (Shapes)
│   ├── THREE.BoxGeometry
│   ├── THREE.SphereGeometry
│   ├── THREE.CylinderGeometry
│   ├── THREE.IcosahedronGeometry
│   └── ... 20+ more geometries
│
├── Materials (Surface properties)
│   ├── THREE.MeshStandardMaterial
│   ├── THREE.MeshPhongMaterial
│   ├── THREE.MeshBasicMaterial
│   └── ... 10+ more materials
│
├── Lights (Illumination)
│   ├── THREE.AmbientLight (general light)
│   ├── THREE.DirectionalLight (sun-like)
│   ├── THREE.PointLight (bulb-like)
│   ├── THREE.SpotLight
│   └── ... more lights
│
├── Camera (View point)
│   ├── THREE.PerspectiveCamera
│   ├── THREE.OrthographicCamera
│   └── THREE.CubeCamera
│
├── Renderer (Drawing)
│   ├── THREE.WebGLRenderer
│   └── THREE.CanvasRenderer
│
├── Textures (Images)
│   ├── THREE.TextureLoader
│   ├── THREE.Texture
│   └── THREE.CubeTextureLoader
│
└── Math (3D calculations)
    ├── THREE.Vector3
    ├── THREE.Quaternion
    ├── THREE.Matrix4
    ├── THREE.Euler
    └── ... more math
```

### React Three Fiber: React Integration

```
React Three Fiber
├── Canvas Component
│   └── Creates WebGL context & render loop
│
├── Hooks
│   ├── useFrame()        ◄──── Animation per frame
│   ├── useThree()        ◄──── Access scene/camera/renderer
│   ├── useLoader()       ◄──── Load assets
│   ├── useInstanceHandle()
│   └── useLoader...
│
├── JSX Elements
│   ├── <mesh>
│   ├── <geometry>
│   ├── <material>
│   ├── <light>
│   ├── <camera>
│   └── ... all Three.js objects as JSX
│
└── Event Handling
    ├── onClick
    ├── onPointerOver
    ├── onWheel
    └── ... pointer events
```

### @react-three/drei: The Convenience Layer

```
Drei - "Three" Components in German
├── Camera Controls
│   ├── <OrbitControls>      ◄──── Rotate/zoom/pan
│   ├── <PerspectiveCamera>
│   ├── <FirstPersonControls>
│   └── ... more controls
│
├── Geometry Components
│   ├── <Box>          {wraps THREE.BoxGeometry}
│   ├── <Sphere>       {wraps THREE.SphereGeometry}
│   ├── <Cylinder>
│   ├── <Cone>
│   ├── <Plane>
│   ├── <Torus>
│   ├── <Text>
│   └── ... more
│
├── Loaders (Asset loading)
│   ├── useGLTF()      ◄──── Load .glb / .gltf files
│   ├── useTexture()   ◄──── Load images as textures
│   ├── useFBX()
│   └── useEnvironment()
│
├── Scene Helpers
│   ├── <Environment>  ◄──── HDRI backgrounds
│   ├── <Stars>        ◄──── Starfield
│   ├── <Grid>         ◄──── Ground grid
│   ├── <Bounds>       ◄──── Auto-fit camera
│   ├── <Center>       ◄──── Center geometry
│   └── <Gizmo>        ◄──── 3D gizmo control
│
├── Effects & Post-Processing
│   ├── <EffectComposer>
│   ├── <Bloom>
│   ├── <SSAO>
│   ├── <DepthOfField>
│   └── ... more effects
│
└── Debugging
    ├── <Stats>        ◄──── FPS monitor
    └── <BakeShadows>
```

---

## How Data Flows

### From Code to Screen

```
1. You write JSX:
   <mesh>
     <boxGeometry />
     <meshStandardMaterial color="blue" />
   </mesh>

                    ↓

2. React Three Fiber processes it:
   - Recognizes <mesh>, <boxGeometry>, <material>
   - Maps to THREE.Mesh, THREE.BoxGeometry, etc.
   - Creates actual Three.js objects
   - Adds to the scene

                    ↓

3. useFrame hook called each frame (60fps):
   const meshRef = useRef()
   useFrame(() => {
     meshRef.current.rotation.x += 0.01
   })

                    ↓

4. Three.js renders:
   - Applies lighting calculations
   - Applies materials
   - Calculates camera projection
   - Sends to WebGL

                    ↓

5. WebGL renders to canvas:
   - GPU draws pixels
   - Displays on screen

                    ↓

6. 60 frames per second → Animation!
```

---

## Component Hierarchy in Your Project

```
App (Next.js App Router)
│
└── Gallery Page
    │
    ├── Canvas (React Three Fiber)
    │   │
    │   ├── Scene3D Component (Your 3D content)
    │   │   ├── Lights (ambientLight, directionalLight, pointLight)
    │   │   ├── Main Mesh (icosahedron)
    │   │   │   ├── icosahedronGeometry
    │   │   │   └── meshPhongMaterial
    │   │   └── Background Sphere
    │   │       ├── sphereGeometry
    │   │       └── meshBasicMaterial
    │   │
    │   └── OrbitControls (Drei)
    │       └─ Handles mouse/touch input
    │
    └── UIOverlay (React only)
        ├── Header
        ├── Footer
        └── Center Info
```

---

## Typical Workflow

```
1. Project Setup (✅ DONE)
   ├─ Configure package.json
   ├─ Set up TypeScript
   ├─ Configure Tailwind CSS
   └─ Create component structure

2. Install Dependencies (⏳ YOUR NEXT STEP)
   └─ npm install
      ├─ Downloads Three.js
      ├─ Downloads React Three Fiber
      ├─ Downloads Drei
      └─ Installs all dependencies

3. Development (✍️ AFTER npm install)
   ├─ npm run dev
   ├─ Edit Scene3D.tsx
   ├─ Browser auto-refreshes
   └─ See 3D changes in real-time

4. Build (🚀 LATER)
   ├─ npm run build
   ├─ Creates optimized bundle
   └─ Ready to deploy

5. Deploy (📦 PRODUCTION)
   ├─ Upload to hosting
   ├─ Share with users
   └─ Monitor performance
```

---

## The "Why" of Each Library

### Why Three.js?
- Industry standard for 3D graphics
- 15+ years of development
- Massive community
- Cross-browser compatible
- Handles complex 3D math

### Why React Three Fiber?
- React developers feel at home
- Declarative syntax (JSX)
- Automatic cleanup
- Hot module reloading
- Easier to learn than raw Three.js

### Why Drei?
- Don't reinvent the wheel
- Battle-tested components
- Save 1000+ lines of code
- Professional quality utilities
- Active maintenance

---

## Minimal vs Full Example

### With Just Three.js (Verbose)

```javascript
// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w/h);
const renderer = new THREE.WebGLRenderer();

// Create object
const geom = new THREE.BoxGeometry(1, 1, 1);
const mat = new THREE.MeshStandardMaterial({ color: '#00ff88' });
const mesh = new THREE.Mesh(geom, mat);
scene.add(mesh);

// Lights
const ambLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambLight);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  renderer.render(scene, camera);
}
animate();

// Camera controls (need extra library!)
// Cleanup (need to manage manually!)
```

### With React Three Fiber (Clean)

```jsx
<Canvas>
  <ambientLight intensity={0.5} />
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#00ff88" />
  </mesh>
  <Animator />
</Canvas>

function Animator() {
  const ref = useRef();
  useFrame(() => ref.current.rotation.x += 0.01);
  return <mesh ref={ref} />;
}
```

### With React Three Fiber + Drei (Simplest)

```jsx
<Canvas>
  <ambientLight intensity={0.5} />
  <RotatingBox />
  <OrbitControls autoRotate />
</Canvas>
```

---

## Your Project's Library Usage

| Feature | Library | File |
|---------|---------|------|
| Main canvas | React Three Fiber | gallery/page.tsx |
| 3D geometry | Three.js | Scene3D.tsx |
| Animations | React Three Fiber hook | Scene3D.tsx |
| Camera control | Drei | gallery/page.tsx |
| Lighting | Three.js | Scene3D.tsx |
| Materials | Three.js | Scene3D.tsx |
| UI overlay | React only | UIOverlay.tsx |
| Styling | Tailwind CSS | globals.css |
| Math helpers | Pure TypeScript | lib/math.ts |

---

## After npm install

Your node_modules will contain:

```
node_modules/
├── three/                    (Core library)
│   ├── build/                (Browser-ready code)
│   ├── src/                  (Source code)
│   └── examples/             (Official examples)
│
├── @react-three/
│   ├── fiber/                (React integration)
│   └── drei/                 (Utilities)
│
├── react/                    (React library)
├── react-dom/
├── next/                     (Next.js framework)
├── tailwindcss/              (CSS framework)
│
└── ... (400+ other packages)

Total: ~500-700 MB (but most gets tree-shaken in production)
```

---

## Quick Library Reference

| Need | Use | Example |
|------|-----|---------|
| 3D shape | Three.js geometry | `<boxGeometry>` |
| Shape color | Three.js material | `<meshStandardMaterial color="blue">` |
| Lighting | Three.js light | `<ambientLight intensity={0.5}>` |
| Animation | React Three Fiber | `useFrame(() => { ... })` |
| Camera control | Drei | `<OrbitControls autoRotate>` |
| Load model | Drei | `useGLTF('/model.glb')` |
| Load texture | Drei | `useTexture('/image.jpg')` |
| 3D text | Drei | `<Text text="Hello">` |
| Background | Drei | `<Environment preset="sunset">` |
| Performance | React Three Fiber | `useFrame` with optimized updates |

---

## Ready for Installation

Everything is configured correctly. The libraries will work together seamlessly because:

✅ Three.js is the foundation (both Fiber and Drei depend on it)
✅ React Three Fiber provides the React interface
✅ Drei adds convenience on top
✅ All versions are compatible (no conflicts)
✅ TypeScript types are included
✅ Configuration files are set up

**Next action:** Install Node.js, then run `npm install`

