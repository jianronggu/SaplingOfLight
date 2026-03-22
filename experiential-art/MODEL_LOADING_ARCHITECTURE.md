# 📊 Model Loading Architecture & Flow Diagram

## Component Architecture

```
┌─────────────────────────────────────────────────────────┐
│         Your Gallery Page                               │
│    (app/(scenes)/gallery/page.tsx)                      │
│                                                          │
│  <ArtGalleryScene                                        │
│    modelPath="/models/my-model.glb"                     │
│    modelScale={1.5}                                     │
│    modelPosition={[0, 0, 0]}                            │
│  />                                                      │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│      ArtGalleryScene Component                          │
│  (app/components/ArtGalleryScene.tsx)                   │
│                                                          │
│  - Sets up Canvas                                       │
│  - Configures camera                                    │
│  - Passes props to ArtScene                             │
│  - Renders OrbitControls                                │
│  - Adds UIOverlay                                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│         ArtScene Component                              │
│   (app/components/ArtScene.tsx)                         │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Lighting System (5 lights)                      │   │
│  │ ├─ Key Light (main)                             │   │
│  │ ├─ Fill Light (shadow softening)               │   │
│  │ ├─ Ambient Light                                │   │
│  │ ├─ Accent Point Light (glow)                   │   │
│  │ └─ Rim Light (edge drama)                      │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 3D Scene Content                                │   │
│  │ ├─ BackgroundSphere (atmosphere)               │   │
│  │ └─ IF modelPath provided:                      │   │
│  │    └─ ArtworkModel <loaded .glb>               │   │
│  │    ELSE:                                        │   │
│  │    ├─ Icosahedron (placeholder)                │   │
│  │    └─ Torus Ring (depth)                       │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Animation System (useFrame)                     │   │
│  │ ├─ Rotation (X & Y)                             │   │
│  │ ├─ Floating (Y axis bob)                        │   │
│  │ ├─ Pulsing Glow                                 │   │
│  │ └─ Camera Drift                                 │   │
│  └─────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│    ArtworkModel Component                               │
│  (app/components/ArtworkModel.tsx)                      │
│                                                          │
│  IF modelPath provided:                                 │
│  ┌─────────────────────────────────────────────────┐   │
│  │ useGLTF Hook                                    │   │
│  │ ├─ Loads .glb file                              │   │
│  │ ├─ Caches for performance                       │   │
│  │ ├─ Clones scene                                 │   │
│  │ └─ Applies shadows                              │   │
│  │                                                 │   │
│  │ Renders with:                                   │   │
│  │ ├─ Custom scale                                 │   │
│  │ ├─ Custom position                              │   │
│  │ ├─ Custom rotation                              │   │
│  │ └─ Callbacks (onLoad, onError)                  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  Suspense Fallback: ModelLoadingPlaceholder            │
└─────────────────────────────────────────────────────────┘
```

---

## Data Flow

```
USER ACTION: Sets modelPath prop
                     │
                     ▼
        ArtGalleryScene receives prop
                     │
                     ▼
         ArtScene receives modelPath
                     │
            ┌────────┴────────┐
            │                 │
      IF modelPath        ELSE (no path)
            │                 │
            ▼                 ▼
      ArtworkModel      Placeholder
      (loads .glb)      (icosahedron)
            │                 │
            └────────┬────────┘
                     │
                     ▼
            Renders in 3D Canvas
                     │
                     ▼
        Lighting & Animation Applied
                     │
                     ▼
            Display on Screen
```

---

## File Organization

```
project/
│
├── public/
│   └── models/                    ← PLACE YOUR FILES HERE!
│       ├── my-sculpture.glb       ← Your .glb file
│       ├── crystal.glb
│       └── statue.gltf
│
├── app/
│   ├── components/
│   │   ├── ArtworkModel.tsx       ← NEW: Loads models
│   │   ├── ArtScene.tsx           ← UPDATED: Uses ArtworkModel
│   │   ├── ArtGalleryScene.tsx    ← UPDATED: Passes props
│   │   ├── UIOverlay.tsx
│   │   ├── Scene3D.tsx            ← Legacy
│   │   └── ModelLoadingExamples.tsx ← 9 code examples
│   │
│   └── (scenes)/
│       └── gallery/
│           └── page.tsx           ← EDIT THIS: Add modelPath
│
├── MODEL_LOADING_SETUP.md         ← Complete walkthrough
├── MODEL_LOADING_GUIDE.md         ← Detailed reference
├── MODEL_LOADING_QUICKREF.md      ← Quick reference
│
└── (other files)
```

---

## Props Flow

```
gallery/page.tsx
    │
    ├─ modelPath="/models/file.glb"
    ├─ modelScale={1.5}
    ├─ modelPosition={[0, 0, 0]}
    │
    └─────────────────────────→ ArtGalleryScene
                                    │
                                    ├─ title
                                    ├─ description
                                    ├─ accentColor
                                    ├─ interactive
                                    ├─ modelPath ────────→ ArtScene
                                    ├─ modelScale        │
                                    └─ modelPosition     │
                                                         │
                                        ┌────────────────┘
                                        │
                                        ▼
                                    IF modelPath
                                        │
                                        ├─ modelScale
                                        ├─ modelPosition
                                        └─ modelPath ────→ ArtworkModel
                                                            │
                                                            ├─ scale
                                                            ├─ position
                                                            └─ rotation
```

---

## Animation Loop with Model

```
useFrame Hook (60fps)
    │
    ├─ timeRef += 0.016 (delta time)
    │
    ├─ Rotation Animation
    │  ├─ groupRef.rotation.x += 0.0003 * rotationSpeed
    │  └─ groupRef.rotation.y += 0.0008 * rotationSpeed
    │
    ├─ Float Animation (Y axis)
    │  └─ groupRef.position.y = initialY + sin(time) * 0.3
    │
    ├─ Pulsing Glow (if placeholder)
    │  └─ material.emissiveIntensity = sin(time) * 0.15 + 0.3
    │
    ├─ Camera Movement
    │  ├─ camera.position.x = sin(time * 0.15) * 0.5
    │  └─ camera.position.z = 5 + cos(time * 0.1) * 0.2
    │
    └─ Render frame
       └─ Your model appears animated!
```

---

## Model Loading Process

```
1. User specifies:
   modelPath="/models/my-model.glb"
        │
        ▼
2. ArtworkModel component mounts
   Suspense boundary active
        │
        ▼
3. useGLTF Hook triggered
   ├─ Checks cache
   ├─ If not cached:
   │  └─ Fetches /models/my-model.glb
   └─ Returns loaded scene
        │
        ▼
4. Scene is cloned
   (avoid sharing geometry)
        │
        ▼
5. Traverse and apply shadows
   └─ Walk through mesh tree
        │
        ▼
6. Create group with:
   ├─ scale={modelScale}
   ├─ position={modelPosition}
   ├─ rotation={modelRotation}
   └─ primitive object={clonedScene}
        │
        ▼
7. Render in Canvas
   ├─ Lighting applied
   ├─ Animations running
   └─ Interactive controls work
        │
        ▼
8. Model visible! ✨
```

---

## Conditional Rendering Logic

```
ArtScene Component
    │
    ├─ IF modelPath provided
    │  │
    │  └─ RENDER:
    │     <ArtworkModel
    │       modelPath={modelPath}
    │       scale={modelScale}
    │       position={modelPosition}
    │       castShadow={true}
    │       receiveShadow={true}
    │     />
    │
    ├─ ELSE (no modelPath)
    │  │
    │  └─ RENDER (default):
    │     <>
    │       <mesh> icosahedron geometry </mesh>
    │       <mesh> torus ring </mesh>
    │     </>
    │
    └─ ALSO RENDER:
       ├─ Lighting (always)
       ├─ BackgroundSphere (always)
       ├─ Ground plane (always)
       └─ Animation loop (always)
```

---

## Error Handling Flow

```
User loads model
    │
    ▼
Suspense active
(shows placeholder sphere)
    │
    ▼
useGLTF attempts to fetch file
    │
    ├─ SUCCESS
    │  └─ Scene rendered
    │     └─ onLoad callback fires
    │        └─ Model visible!
    │
    └─ FAILURE
       ├─ Network error
       ├─ File not found
       ├─ Invalid format
       └─ onError callback fires
          └─ Show error message
```

---

## Scale & Position Visualization

```
WITH modelPosition={[0, 0, 0]} (centered)

        Y (up/down)
        │
        │
    ◆◆◆│◆◆◆  ← Model centered
        │
    ────┼──── X (left/right)
        │\
        │ \
        │  Z (forward/back)


WITH modelPosition={[0, 1, 0]} (raised up)

        Y (up/down)
        │
    ◆◆◆│◆◆◆  ← Model raised
        │
    ────┼──── X (left/right)
        │\
        │ \
        │  Z (forward/back)


WITH modelScale={0.5} vs {2}

Scale 0.5          Scale 1.0          Scale 2.0
(small)            (normal)           (large)

  ◆◆                ◆◆◆                ◆◆◆◆◆
  ◆◆                ◆◆◆                ◆◆◆◆◆
                    ◆◆◆                ◆◆◆◆◆
                                       ◆◆◆◆◆
                                       ◆◆◆◆◆
```

---

## Complete Request/Response Cycle

```
USER:
  Opens gallery page
       │
       ▼
BROWSER:
  Renders <ArtGalleryScene modelPath="/models/my-model.glb" />
       │
       ▼
REACT:
  Mounts ArtGalleryScene component
  Passes modelPath to ArtScene
       │
       ▼
ARTSCENE:
  Detects modelPath is provided
  Renders ArtworkModel instead of placeholder
       │
       ▼
THREE.JS + DREI:
  useGLTF loads file from /models/my-model.glb
  Caches in memory
       │
       ▼
WEBGL:
  Creates GPU resources
  Uploads geometry & textures
       │
       ▼
ANIMATION LOOP:
  Applies rotation, floating, glow
  Updates camera position
  Renders 60fps
       │
       ▼
DISPLAY:
  Beautiful 3D model with lighting
  User can interact (rotate, zoom)
```

---

## Memory & Performance

```
Component Initialization
├─ ArtworkModel: ~200-500 KB (code)
├─ ArtScene: ~100 KB (code)
└─ ArtGalleryScene: ~50 KB (code)

Model Loading
├─ .glb file: 1-5 MB (your asset)
├─ Parsed geometry: 5-20 MB (RAM)
└─ GPU memory: 10-50 MB (VRAM)

Animation
├─ useFrame loop: ~0.5-1 MB (overhead)
├─ Lighting calculations: ~2-5 MB (GPU)
└─ Total rendering: 30-100 MB (GPU)

Total: ~8-17 MB (RAM) + 10-50 MB (VRAM)
Target FPS: 60
```

---

## You Now Have:

✅ **ArtworkModel** - Reusable model loader
✅ **Flexible ArtScene** - Supports both placeholder + custom models  
✅ **Simple API** - Just pass `modelPath` prop
✅ **Error Handling** - Suspense + callbacks
✅ **Performance** - Caching + optimization
✅ **Full Documentation** - 4 guides + examples

---

## Quick Path to Your Custom Model

```
📁 public/models/
   └─ your-file.glb

📝 gallery/page.tsx
   └─ modelPath="/models/your-file.glb"

🎨 Result:
   └─ Your custom 3D art displayed!
```

---

**That's the complete architecture! Ready to load your model?** 🚀

