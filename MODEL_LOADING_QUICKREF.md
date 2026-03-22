# 🎨 Model Loading - Quick Reference Card

## 3-Step Setup

### **Step 1: Create Folder**
```powershell
mkdir public\models
```

### **Step 2: Add Your Model**
```
Place your .glb file here:
public/models/my-model.glb
```

### **Step 3: Update Page**
Edit `app/(scenes)/gallery/page.tsx`:
```tsx
<ArtGalleryScene
  modelPath="/models/my-model.glb"
  modelScale={1.5}
/>
```

---

## Common Code Snippets

### **Basic Model**
```tsx
<ArtGalleryScene
  modelPath="/models/my-model.glb"
/>
```

### **With Sizing**
```tsx
<ArtGalleryScene
  modelPath="/models/my-model.glb"
  modelScale={2}  // 2x bigger
/>
```

### **With Positioning**
```tsx
<ArtGalleryScene
  modelPath="/models/my-model.glb"
  modelScale={1.5}
  modelPosition={[0, 1, 0]}  // Move up
/>
```

### **Full Example**
```tsx
<ArtGalleryScene
  title="My Artwork"
  description="Beautiful 3D model"
  modelPath="/models/sculpture.glb"
  modelScale={1.8}
  modelPosition={[0, 0.5, 0]}
  accentColor="#ffd700"
  interactive={true}
/>
```

---

## Props Cheat Sheet

| Prop | Type | Example | Notes |
|------|------|---------|-------|
| `modelPath` | string | `"/models/art.glb"` | Required |
| `modelScale` | number | `2` | Size multiplier |
| `modelScale` | array | `[1.5, 2, 1]` | Non-uniform |
| `modelPosition` | array | `[0, 1, 0]` | x, y, z coords |
| `accentColor` | string | `"#ffd700"` | Hex color |
| `title` | string | `"My Art"` | Display name |
| `interactive` | boolean | `true` | Allow rotation |

---

## Scaling Quick Reference

```
Too small?        → Increase modelScale
Too big?          → Decrease modelScale
Off-center?       → Use modelPosition
Want non-uniform? → Use array: [x, y, z]
```

---

## Color Palette Presets

```tsx
// Modern/Tech
accentColor="#00ff88"

// Gold/Luxury
accentColor="#ffd700"

// Purple/Mystical
accentColor="#a855f7"

// Pink/Bold
accentColor="#ff1493"

// Teal/Calm
accentColor="#20b2aa"

// Magenta/Moody
accentColor="#ff0088"
```

---

## Troubleshooting Quick Guide

| Problem | Solution |
|---------|----------|
| Model not showing | Check path: `/models/file.glb` |
| Too small | Try `modelScale={5}` |
| Too big | Try `modelScale={0.5}` |
| Wrong position | Adjust `modelPosition={[0, 1, 0]}` |
| Slow loading | Reduce file size (< 5 MB) |
| Dark model | Try different `accentColor` |

---

## File Structure

```
public/
└── models/
    ├── my-model.glb      ← Put files here!
    ├── crystal.glb
    └── sculpture.gltf
```

---

## Component Files Reference

| File | Purpose |
|------|---------|
| `ArtworkModel.tsx` | Model loading component |
| `ArtScene.tsx` | Main scene with lighting |
| `ArtGalleryScene.tsx` | Wrapper with canvas |
| `MODEL_LOADING_GUIDE.md` | Full detailed guide |
| `ModelLoadingExamples.tsx` | Code examples |

---

## One-Liner Examples

```tsx
// Minimal
<ArtGalleryScene modelPath="/models/art.glb" />

// Small
<ArtGalleryScene modelPath="/models/art.glb" modelScale={0.8} />

// Large
<ArtGalleryScene modelPath="/models/art.glb" modelScale={3} />

// Positioned
<ArtGalleryScene modelPath="/models/art.glb" modelPosition={[0, 1, 0]} />

// Styled
<ArtGalleryScene modelPath="/models/art.glb" accentColor="#ffd700" />
```

---

## Keyboard Shortcut for Setup

```
1. Ctrl+Shift+P → New Terminal
2. mkdir public\models
3. Place .glb file in public/models/
4. Edit app/(scenes)/gallery/page.tsx
5. Add modelPath="/models/filename.glb"
6. Save (Ctrl+S)
7. Done! Hot reload applies automatically
```

---

## Before You Load

✅ Export as `.glb` (not .gltf, .obj, etc.)
✅ File size < 5 MB
✅ Place in `public/models/`
✅ Use correct path in `modelPath` prop
✅ Start with `modelScale={1.5}` and adjust

---

## After You Load

✅ Check if model appears
✅ Adjust `modelScale` if needed
✅ Adjust `modelPosition` if off-center
✅ Try different `accentColor` for mood
✅ Test on mobile device

---

## Useful Commands

```powershell
# Create models folder
mkdir public\models

# Navigate to models folder
cd public\models

# See what files you have
dir

# File size check
Get-ChildItem | Select-Object Name, @{Name="Size(MB)";Expression={[math]::Round($_.Length/1MB,2)}}
```

---

## Example File Paths

```
✅ Correct:  /models/my-model.glb
✅ Correct:  /models/sculpture.glb
❌ Wrong:    models/my-model.glb       (missing /)
❌ Wrong:    /Models/my-model.glb      (case sensitive)
❌ Wrong:    public/models/my-model.glb (no public/)
```

---

## Performance Tips

- Use `.glb` format (smaller than `.gltf`)
- Keep files under 5 MB
- Use `modelScale` not oversized files
- Close other tabs when testing
- Mobile may need smaller files (< 2 MB)

---

## Next Steps

1. **Read**: MODEL_LOADING_GUIDE.md (detailed)
2. **Browse**: ModelLoadingExamples.tsx (code samples)
3. **Create**: `public/models/` folder
4. **Export**: Your .glb file
5. **Update**: `gallery/page.tsx` with `modelPath`
6. **Enjoy**: Your custom 3D art! 🎨

---

**Questions?** See MODEL_LOADING_GUIDE.md for detailed troubleshooting.

**Ready?** Just add `modelPath="/models/your-file.glb"` and go! 🚀

