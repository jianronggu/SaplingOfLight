# 🎨 Model Loading Setup - Complete Walkthrough

## What You Got

A **refactored ArtScene system** that makes it trivial to load your own 3D models:

### **New Component: `ArtworkModel.tsx`**
Reusable component for loading .glb/.gltf files with:
- ✅ Automatic caching for performance
- ✅ Suspense support with loading placeholder
- ✅ Error handling with callbacks
- ✅ Shadow support (castShadow/receiveShadow)
- ✅ Full control over scale and position

### **Updated: `ArtScene.tsx`**
Now supports both:
- ✅ Your own 3D models (via `modelPath`)
- ✅ Default placeholder (icosahedron) if no model
- ✅ Maintains all animations and lighting

### **Updated: `ArtGalleryScene.tsx`**
New props for easy model loading:
- `modelPath` - Path to your .glb file
- `modelScale` - Size adjustment
- `modelPosition` - Position in 3D space

---

## Exact Setup Steps

### **Step 1: Create Models Folder**

Open PowerShell in your project root:

```powershell
# Navigate to project (if not already there)
cd C:\Users\New User\Desktop\Saplings\experiential-art

# Create the models directory
mkdir public\models

# Verify it was created
dir public
```

You should see:
```
Directory: C:\Users\New User\Desktop\Saplings\experiential-art\public

    Directory: models/
    ...other files...
```

### **Step 2: Prepare Your Model File**

**From Blender:**
1. File → Export As → glTF Binary (.glb)
2. Choose location: `C:\Users\New User\Desktop\Saplings\experiential-art\public\models\`
3. Name it something clear: `my-sculpture.glb`
4. Export

**From Other Software:**
- Ensure you export as `.glb` format (GLB binary, not GLTF text)
- Save to `public/models/` folder in your project

**File Size Check:**
```powershell
# Check file size (should be < 5 MB)
cd public\models
Get-ChildItem my-sculpture.glb | ForEach-Object {
    Write-Host "$($_.Name): $([math]::Round($_.Length/1MB, 2)) MB"
}
```

### **Step 3: Update Gallery Page**

Edit: `app/(scenes)/gallery/page.tsx`

**Current code (placeholder):**
```tsx
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

**Updated code (with your model):**
```tsx
export default function GalleryPage() {
  return (
    <ArtGalleryScene
      title="My Digital Sculpture"
      description="A beautiful 3D artwork created in Blender"
      modelPath="/models/my-sculpture.glb"    // ← Add this
      modelScale={1.8}                         // ← Add this
      modelPosition={[0, 0, 0]}                // ← Add this (optional)
      interactive={true}
      accentColor="#ffd700"
    />
  );
}
```

### **Step 4: Save and View**

1. Save the file (Ctrl+S)
2. Go to http://localhost:3000/gallery
3. See your model! 🎨

---

## File Structure After Setup

```
experiential-art/
├── public/
│   └── models/
│       ├── my-sculpture.glb        ← Your model here!
│       ├── crystal.glb
│       └── statue.gltf
│
├── app/
│   ├── components/
│   │   ├── ArtworkModel.tsx         ← NEW! Loads models
│   │   ├── ArtScene.tsx             ← UPDATED! Supports models
│   │   ├── ArtGalleryScene.tsx      ← UPDATED! Passes props
│   │   └── ModelLoadingExamples.tsx ← Examples
│   │
│   └── (scenes)/
│       └── gallery/
│           └── page.tsx             ← UPDATE THIS!
│
└── MODEL_LOADING_GUIDE.md           ← Full docs
```

---

## Troubleshooting Your Setup

### **File Not Found Error**
```
Problem: "Could not find /models/my-model.glb"
Solution: 
  1. Check path in code is exactly: /models/my-model.glb
  2. Verify file exists in: public/models/my-model.glb
  3. Make sure folder is named "models" (lowercase)
  4. Restart dev server: Ctrl+C then npm run dev
```

### **Model Not Visible**
```
Problem: Page loads but no model appears
Solution:
  1. Try increasing scale: modelScale={5}
  2. Check file loaded (look at Network tab in DevTools)
  3. Try default placeholder (remove modelPath prop)
  4. Check console for errors: F12 → Console
```

### **Model Too Small/Large**
```
Problem: Model barely visible or fills entire screen
Solution:
  Adjust modelScale:
  - Too small? Try: modelScale={3} or modelScale={5}
  - Too large? Try: modelScale={0.3} or modelScale={0.5}
```

### **Model Looks Wrong**
```
Problem: Model appears upside-down, inside-out, etc.
Solution:
  Try different scale/position combinations:
  - modelScale={1.5}
  - modelPosition={[0, 0, 0]}
  - modelPosition={[0, 1, 0]}  // Move up
  - modelPosition={[0, 0, -1]}  // Move back
```

### **Slow Loading**
```
Problem: Model takes forever to appear
Solution:
  1. Check file size: should be < 5 MB
  2. Optimize in Blender (Decimate modifier)
  3. Use .glb format (not .gltf)
  4. Check your internet speed
```

---

## Common Props & Values

```tsx
// MINIMAL
<ArtGalleryScene modelPath="/models/art.glb" />

// WITH SCALING
<ArtGalleryScene 
  modelPath="/models/art.glb"
  modelScale={2}  // 2x bigger
/>

// WITH POSITIONING
<ArtGalleryScene 
  modelPath="/models/art.glb"
  modelPosition={[0, 1, 0]}  // Move up 1 unit
/>

// WITH EVERYTHING
<ArtGalleryScene
  title="My Model"
  description="Description"
  modelPath="/models/art.glb"
  modelScale={1.8}
  modelPosition={[0, 0.5, 0]}
  accentColor="#ffd700"
  interactive={true}
/>
```

---

## Available Props

### **Basic Props**
- `title` - Artwork title (displays at top)
- `description` - Artwork description (displays below title)
- `accentColor` - Light/glow color (hex: `#ffd700`)
- `interactive` - Allow user rotation (true/false)

### **Model Props**
- `modelPath` - Path to .glb file (`"/models/art.glb"`)
- `modelScale` - Size (number like `2` or array like `[1.5, 2, 1]`)
- `modelPosition` - Position [x, y, z] (use y for up/down)

---

## Real-World Examples

### **Small Delicate Sculpture**
```tsx
<ArtGalleryScene
  title="Delicate Crystal"
  modelPath="/models/crystal.glb"
  modelScale={0.8}  // Smaller
  modelPosition={[0, 0, 0]}
  accentColor="#00ffff"
/>
```

### **Large Architectural Model**
```tsx
<ArtGalleryScene
  title="Building Form"
  modelPath="/models/building.glb"
  modelScale={3}  // Larger
  modelPosition={[0, -0.5, 0]}  // Shift down
  accentColor="#ffd700"
/>
```

### **Tall Statue**
```tsx
<ArtGalleryScene
  title="Monument"
  modelPath="/models/statue.glb"
  modelScale={[1, 2, 1]}  // Stretch vertically
  modelPosition={[0, 1, 0]}  // Raise up
  accentColor="#ff1493"
/>
```

---

## Model Optimization Tips

Before loading, optimize in Blender:

### **1. Reduce Polygon Count**
- Select mesh
- Add Modifier → Decimate
- Set Ratio to ~0.5 (cuts polygons in half)
- Apply modifier

### **2. Remove Unnecessary Objects**
- Delete cameras, lights, empty objects
- Keep only the art model

### **3. Bake Textures** (if complex materials)
- Material Properties → Bake
- Reduces texture overhead

### **4. Export Settings**
- File → Export → glTF Binary (.glb)
- ✅ Animations (if you have them)
- ✅ Geometry
- ✅ Materials
- ❌ Cameras
- ❌ Lights

---

## Component Reference

### **Where Things Are**

| Component | Location | Purpose |
|-----------|----------|---------|
| ArtworkModel | `app/components/ArtworkModel.tsx` | Loads .glb files |
| ArtScene | `app/components/ArtScene.tsx` | Main scene setup |
| ArtGalleryScene | `app/components/ArtGalleryScene.tsx` | Canvas wrapper |
| Gallery Page | `app/(scenes)/gallery/page.tsx` | Your customization point |

### **How They Connect**

```
Gallery Page (you edit this)
    ↓
ArtGalleryScene (wrapper with Canvas)
    ↓
ArtScene (lighting, animations, background)
    ↓
ArtworkModel (loads your .glb file)
```

---

## Quick Commands Reference

```powershell
# Navigate to project
cd C:\Users\New User\Desktop\Saplings\experiential-art

# Create models folder
mkdir public\models

# Check what's in models
dir public\models

# Check file size
Get-ChildItem public\models | ForEach-Object { "$($_.Name): $([math]::Round($_.Length/1MB, 2)) MB" }

# Start dev server
npm run dev

# Restart dev server (if needed)
# Ctrl+C to stop
# npm run dev to restart
```

---

## Testing Checklist

- [ ] Created `public/models/` folder
- [ ] Placed .glb file in the folder
- [ ] Updated `gallery/page.tsx` with modelPath
- [ ] Dev server running (npm run dev)
- [ ] Visited http://localhost:3000/gallery
- [ ] Model appears on screen
- [ ] Model is correct size (adjust modelScale if needed)
- [ ] Colors look good
- [ ] Can interact with model (drag to rotate)

---

## Next Steps

1. **If model works:**
   - Fine-tune scale and position
   - Try different accent colors
   - Create more pages for different models

2. **If model doesn't work:**
   - Check console (F12 → Console) for errors
   - Verify file path is correct
   - Try larger scale value
   - See Troubleshooting section above

3. **When ready to deploy:**
   - File should be in `public/models/` (files in public/ are included in build)
   - Push to GitHub
   - Deploy to Vercel (it's automatic!)

---

## Documentation Files

- **MODEL_LOADING_GUIDE.md** - Comprehensive guide
- **MODEL_LOADING_QUICKREF.md** - Quick reference card
- **ModelLoadingExamples.tsx** - 9 code examples

---

## You're All Set! 🎉

Your model loading system is complete. Just:

1. ✅ Create `public/models/` folder
2. ✅ Add your `.glb` file
3. ✅ Update `gallery/page.tsx` with path
4. ✅ Adjust scale/position as needed
5. ✅ Enjoy your custom 3D art!

---

**Questions?** See MODEL_LOADING_GUIDE.md

**Ready to load?** Follow the 3 steps above! 🚀

