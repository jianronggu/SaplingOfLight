# 🎨 Loading Your Own 3D Models - Complete Guide

## Quick Start (2 Minutes)

### **1. Prepare Your Model**
- Export as `.glb` (binary GLB format) or `.gltf` (text format)
- GLB is recommended (smaller file size, faster loading)
- Common tools: Blender, Autodesk Maya, Cinema 4D, etc.

### **2. Place Your File**
```
public/
└── models/
    └── my-model.glb    ← Put your file here!
```

### **3. Load It**
Edit `app/(scenes)/gallery/page.tsx`:

```tsx
<ArtGalleryScene
  title="My Artwork"
  description="My custom 3D model"
  modelPath="/models/my-model.glb"
  accentColor="#ffd700"
/>
```

### **4. Done!** ✨
Your model is now displayed instead of the placeholder!

---

## File Structure Setup

### **Create the Models Directory**

```powershell
# From project root
mkdir public\models
```

### **Your Project Structure**

```
experiential-art/
├── public/
│   ├── models/              ← Create this folder
│   │   ├── my-model.glb     ← Put .glb files here
│   │   ├── crystal.glb
│   │   └── sculpture.gltf
│   └── (other public files)
│
├── app/
│   └── (app files)
│
└── (config files)
```

---

## Using ArtworkModel Component

### **The ArtworkModel Component**
Located at: `app/components/ArtworkModel.tsx`

This is a reusable component for loading any 3D model:

```tsx
<ArtworkModel
  modelPath="/models/my-model.glb"
  scale={1.5}
  position={[0, 0, 0]}
  rotation={[0, 0, 0]}
  onLoad={() => console.log('Model loaded!')}
  onError={(err) => console.error('Failed:', err)}
/>
```

### **Props Reference**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelPath` | string | required | Path to .glb/.gltf file |
| `scale` | number \| array | 1 | Size multiplier |
| `position` | [x, y, z] | [0, 0, 0] | Model position in space |
| `rotation` | [x, y, z] | [0, 0, 0] | Model rotation (in radians) |
| `castShadow` | boolean | true | Model casts shadows |
| `receiveShadow` | boolean | true | Model receives shadows |
| `onLoad` | function | - | Called when model loads |
| `onError` | function | - | Called on load error |

---

## Using ArtScene Component

### **Via ArtGalleryScene (Recommended)**

```tsx
<ArtGalleryScene
  title="My Model"
  description="Custom 3D artwork"
  modelPath="/models/my-model.glb"        // ← Add this
  modelScale={2}                           // ← Add this
  modelPosition={[0, 0.5, 0]}             // ← Add this (optional)
  accentColor="#ffd700"
  interactive={true}
/>
```

### **Direct ArtScene Usage**

```tsx
<Canvas>
  <ArtScene
    modelPath="/models/my-model.glb"
    modelScale={1.5}
    modelPosition={[0, 0, 0]}
  />
</Canvas>
```

### **Without a Model (Uses Placeholder)**

```tsx
<ArtGalleryScene
  title="Placeholder View"
  // No modelPath = uses default icosahedron
  accentColor="#00ff88"
/>
```

---

## Model Preparation Guide

### **Exporting from Blender**

1. **File → Export As → glTF Binary (.glb)**
2. Check these settings:
   - ✅ Animation (if you have animations)
   - ✅ Geometry
   - ✅ Materials
   - ✅ Cameras (usually uncheck)
   - ✅ Lights (usually uncheck)
3. Click "Export glTF 2.0"

### **Model Optimization Tips**

```
Good model sizes:
├── Simple geometry:   < 1 MB
├── Medium detail:     1-5 MB
├── Complex detail:    5-20 MB
└── Don't exceed:      > 50 MB

Target: < 5 MB for fast loading
```

### **Optimization Techniques**

1. **Reduce Polygon Count**
   - Blender: Modifiers > Decimate
   - Target: 50k-100k triangles

2. **Bake Textures**
   - Reduces number of textures
   - Combines materials

3. **Remove Unnecessary Objects**
   - Delete cameras, lights
   - Remove background meshes

4. **Compress Textures**
   - Use JPG instead of PNG
   - Scale down to 2048x2048 or smaller

---

## Scaling & Positioning Your Model

### **Scaling Examples**

```tsx
{/* Make it 2x bigger */}
<ArtGalleryScene modelScale={2} />

{/* Non-uniform scaling (stretch) */}
<ArtGalleryScene modelScale={[1.5, 2, 1]} />

{/* Make it smaller */}
<ArtGalleryScene modelScale={0.5} />
```

### **Positioning Examples**

```tsx
{/* Move up in Y */}
<ArtGalleryScene modelPosition={[0, 1, 0]} />

{/* Move to the right */}
<ArtGalleryScene modelPosition={[2, 0, 0]} />

{/* Move back in depth */}
<ArtGalleryScene modelPosition={[0, 0, -1]} />
```

### **Rotation Examples**

```tsx
{/* Rotate 45 degrees around Y axis */}
const rotation = [0, Math.PI / 4, 0];

{/* Rotate 90 degrees around X axis */}
const rotation = [Math.PI / 2, 0, 0];

{/* Rotate 30 degrees around Z axis */}
const rotation = [0, 0, Math.PI / 6];
```

---

## Working with Multiple Models

### **Multiple Scene Variations**

```tsx
// app/(scenes)/gallery/page.tsx
export default function GalleryPage() {
  return (
    <ArtGalleryScene
      modelPath="/models/crystal.glb"
      title="Crystal Formation"
      modelScale={1.8}
      accentColor="#a855f7"
    />
  );
}

// app/(scenes)/sculpture/page.tsx
export default function SculpturePage() {
  return (
    <ArtGalleryScene
      modelPath="/models/sculpture.glb"
      title="Digital Sculpture"
      modelScale={2.2}
      modelPosition={[0, 0.5, 0]}
      accentColor="#ffd700"
    />
  );
}
```

### **Model Gallery Array**

```tsx
const artworks = [
  {
    path: "/models/model1.glb",
    title: "First Piece",
    scale: 1.5,
  },
  {
    path: "/models/model2.glb",
    title: "Second Piece",
    scale: 2,
  },
  {
    path: "/models/model3.glb",
    title: "Third Piece",
    scale: 1.8,
  },
];

export default function Gallery() {
  const [current, setCurrent] = useState(0);
  const artwork = artworks[current];

  return (
    <ArtGalleryScene
      modelPath={artwork.path}
      title={artwork.title}
      modelScale={artwork.scale}
    />
  );
}
```

---

## Troubleshooting

### **Model Not Showing**

```
❌ Problem: Model doesn't appear
✅ Solution: 
  1. Check path is correct: /models/file.glb
  2. File exists in public/models/ folder
  3. Try different scale: modelScale={2}
  4. Try positioning: modelPosition={[0, 0, 0]}
```

### **Model is Too Small**

```
❌ Problem: Model is tiny
✅ Solution:
  Increase scale: modelScale={5}
  Or: modelScale={[3, 3, 3]}
```

### **Model is Too Big**

```
❌ Problem: Model fills entire screen
✅ Solution:
  Decrease scale: modelScale={0.5}
  Or move back: modelPosition={[0, 0, -2]}
```

### **Model Loads Slowly**

```
❌ Problem: Takes long to load
✅ Solution:
  1. Reduce model file size (< 5 MB)
  2. Optimize in Blender (decimate)
  3. Check internet speed
  4. Use .glb instead of .gltf
```

### **Model Looks Weird**

```
❌ Problem: Colors wrong, flipped, etc.
✅ Solution:
  1. Try different rotation:
     modelPosition props in ArtGalleryScene
  2. Check material colors in Blender
  3. Make sure textures exported correctly
  4. Try scale={1} first, then adjust
```

### **Lighting Issues**

```
❌ Problem: Model too dark or washed out
✅ Solution:
  The scene has 5-layer professional lighting.
  Try different accent colors:
  accentColor="#ffd700"  // Gold
  accentColor="#ff0088"  // Pink
  accentColor="#a855f7"  // Purple
```

---

## File Format Comparison

| Format | Size | Load Speed | Support | Best For |
|--------|------|-----------|---------|----------|
| **.glb** | Small | Fast ⚡ | Excellent | **Recommended** |
| **.gltf** | Large | Slower | Excellent | Standalone |
| **.obj** | Medium | Medium | Good | Legacy |
| **.fbx** | Medium | Slow | Limited | Don't use |

**Recommendation: Always use .glb format**

---

## Example: Full Setup

### **Step 1: Export Your Model**
- From Blender: File → Export → glTF Binary (.glb)
- Save as `my-sculpture.glb`

### **Step 2: Place File**
- Create: `public/models/`
- Move file: `public/models/my-sculpture.glb`

### **Step 3: Update Gallery**
Edit `app/(scenes)/gallery/page.tsx`:

```tsx
'use client';

import ArtGalleryScene from '@/app/components/ArtGalleryScene';

export default function GalleryPage() {
  return (
    <ArtGalleryScene
      title="My Digital Sculpture"
      description="A beautiful 3D artwork created in Blender"
      modelPath="/models/my-sculpture.glb"
      modelScale={1.8}
      modelPosition={[0, 0.5, 0]}
      accentColor="#ffd700"
      interactive={true}
    />
  );
}
```

### **Step 4: View It**
1. Save the file
2. Go to http://localhost:3000/gallery
3. See your model!

---

## Pro Tips

1. **Always use .glb** - Smaller, faster
2. **Keep models < 5 MB** - Better performance
3. **Test scale before deploying** - Adjust modelScale prop
4. **Use meaningful paths** - `/models/sculpture.glb` is clearer than `/models/m.glb`
5. **Optimize in Blender first** - Don't rely on web optimization
6. **Test on mobile** - Some phones struggle with large models
7. **Name files clearly** - Makes it easy to swap later

---

## Advanced: Loading Models Dynamically

```tsx
'use client';

import { useState } from 'react';
import ArtGalleryScene from '@/app/components/ArtGalleryScene';

export default function DynamicGallery() {
  const [modelPath, setModelPath] = useState('/models/default.glb');

  return (
    <div>
      {/* Model Viewer */}
      <ArtGalleryScene
        modelPath={modelPath}
        title="Gallery Viewer"
      />

      {/* Model Selector */}
      <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
        <button onClick={() => setModelPath('/models/model1.glb')}>
          Model 1
        </button>
        <button onClick={() => setModelPath('/models/model2.glb')}>
          Model 2
        </button>
        <button onClick={() => setModelPath('/models/model3.glb')}>
          Model 3
        </button>
      </div>
    </div>
  );
}
```

---

## Resources

- **Blender Export Guide**: https://docs.blender.org/manual/en/latest/addons/io_scene_gltf2/index.html
- **Three.js Model Loading**: https://threejs.org/docs/#examples/loaders/GLTFLoader
- **GLB Optimization**: https://www.khronos.org/gltf/
- **Free Models**: https://sketchfab.com (export as GLB)

---

## Summary

✅ Create `public/models/` folder
✅ Place your `.glb` file there
✅ Add `modelPath="/models/your-file.glb"` prop
✅ Adjust `modelScale` and `modelPosition` as needed
✅ Enjoy your custom 3D art!

**That's it! Your custom model is now live.** 🎨✨

