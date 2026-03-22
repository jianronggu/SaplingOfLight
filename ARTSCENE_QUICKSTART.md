# ArtScene - Quick Start Guide

> Get up and running with your immersive 3D art experience in minutes.

## 🚀 5-Minute Quick Start

### 1. Start Development Server (Already Running!)
```powershell
cd C:\Users\New User\Desktop\Saplings\experiential-art
npm run dev
```

Open browser: **http://localhost:3000/gallery**

### 2. You Should See
- ✨ Full-screen dark 3D canvas
- 🎭 Glowing rotating icosahedron in center
- 💫 Subtle floating and pulsing animation
- 📝 Title and description overlay
- 🎮 Drag to rotate, scroll to zoom

### 3. Customize in 30 Seconds

Edit: `app/(scenes)/gallery/page.tsx`

```tsx
export default function GalleryPage() {
  return (
    <ArtGalleryScene
      title="Your Artwork Title Here"          // ← Change this
      description="Your description here"      // ← Change this
      accentColor="#ff1493"                    // ← Change color to #ffd700, #a855f7, etc.
      interactive={true}
    />
  );
}
```

Save and see changes instantly (hot reload)!

## 🎨 Common Customizations

### Change the Artwork Title & Description
```tsx
<ArtGalleryScene
  title="Quantum Entanglement"
  description="A visualization of particle physics and interconnectedness."
/>
```

### Change the Accent Color
```tsx
// Pick from these:
accentColor="#00ff88"   // Cyan (default - tech, modern)
accentColor="#ffd700"   // Gold (luxury, warm)
accentColor="#a855f7"   // Purple (mystical, premium)
accentColor="#ff1493"   // Hot pink (bold, energetic)
accentColor="#20b2aa"   // Teal (calm, balanced)
accentColor="#ff0088"   // Magenta (dramatic, moody)
```

### Disable Interactive Controls
```tsx
<ArtGalleryScene
  // ... props ...
  interactive={false}   // Becomes static, no orbit controls
/>
```

## 🔄 Replace the Placeholder Object

The default 3D object is a glowing icosahedron. To use your own model:

### Step 1: Add Your Model
1. Place your `.glb` or `.gltf` file in: `public/models/mymodel.glb`

### Step 2: Update ArtScene.tsx
Open `app/components/ArtScene.tsx` and find this section:

```tsx
// Around line 80, replace the mesh:
<mesh ref={objectRef} position={[0, 0, 0]}>
  <icosahedronGeometry args={[1.5, 5]} />
  {/* ... */}
</mesh>
```

With:

```tsx
// Import useGLTF at the top
import { useGLTF } from '@react-three/drei';

// Then replace mesh with:
<Suspense fallback={null}>
  <YourModel />
</Suspense>

// Add this function before component export:
function YourModel() {
  const { scene } = useGLTF('/models/mymodel.glb');
  return <primitive object={scene} scale={1.5} />;
}
```

### Step 3: Adjust Scale if Needed
In the `scale={}` or add `position={}` to position your model.

## 📚 Documentation Quick Links

| Guide | Purpose |
|-------|---------|
| **ARTSCENE_IMPLEMENTATION.md** | What was created, how to use it |
| **ARTSCENE_GUIDE.md** | Complete feature guide & customization |
| **ARTSCENE_VISUAL_GUIDE.md** | Diagrams, architecture, motion equations |
| **ARTSCENE_TECHNICAL.md** | Component structure, types, performance |
| **ARTSCENE_OVERVIEW.md** | Visual overview and file organization |
| **ArtScene.examples.tsx** | 10+ code examples & templates |

## 🎨 Animation Customization

The object has three main animations:

### Rotation Speed
Make it spin faster or slower:

```tsx
// In ArtScene props (change 0.5):
<ArtScene rotationSpeed={1.0} />  // 2x faster
<ArtScene rotationSpeed={0.2} />  // 5x slower
<ArtScene rotationSpeed={0} />    // Completely static
```

### Float Speed (Bobbing)
Make it bob up and down faster/slower:

```tsx
// In ArtScene props (change 0.8):
<ArtScene floatSpeed={1.5} />     // Faster bounce
<ArtScene floatSpeed={0.3} />     // Slower drift
<ArtScene floatSpeed={0} />       // No bobbing
```

## 🔧 Making Your First Customization

### Example: Create a Warm, Luxurious Feel

Edit `app/(scenes)/gallery/page.tsx`:

```tsx
export default function GalleryPage() {
  return (
    <ArtGalleryScene
      title="Golden Contemplation"
      description="A meditation on value, warmth, and timeless beauty."
      accentColor="#ffd700"    // Gold
      interactive={true}
    />
  );
}
```

That's it! The scene instantly becomes warm and luxurious.

## 🎯 Mood Selection Quick Reference

Pick a mood, get a color and props:

### 💻 Modern/Tech
```tsx
<ArtGalleryScene
  title="Digital Dreams"
  accentColor="#00ff88"
  interactive={true}
/>
```

### 🌿 Calm/Nature
```tsx
<ArtGalleryScene
  title="Organic Flow"
  accentColor="#20b2aa"
  interactive={true}
/>
```

### ✨ Mystical
```tsx
<ArtGalleryScene
  title="Ethereal Visions"
  accentColor="#a855f7"
  interactive={true}
/>
```

### 🔥 Bold/Energetic
```tsx
<ArtGalleryScene
  title="Explosive Energy"
  accentColor="#ff1493"
  interactive={true}
/>
```

### 👑 Luxury/Premium
```tsx
<ArtGalleryScene
  title="Golden Essence"
  accentColor="#ffd700"
  interactive={true}
/>
```

### 🌙 Dark/Moody
```tsx
<ArtGalleryScene
  title="Shadows of Consciousness"
  accentColor="#ff0088"
  interactive={true}
/>
```

## ❓ Troubleshooting

### Object not visible?
- Check if your model is positioned at [0, 0, 0]
- Try increasing scale: `scale={3}`
- Check browser console for errors

### Colors look wrong?
- Ensure hex color is valid: `#RRGGBB`
- Try default: `accentColor="#00ff88"`
- Check case sensitivity

### Too much motion/dizziness?
- Reduce speeds: `rotationSpeed={0.2}` and `floatSpeed={0.3}`
- Or disable: `rotationSpeed={0}` `floatSpeed={0}`

### Performance issues?
- Simplify your 3D model (reduce polygon count)
- Disable interactive controls
- Close other browser tabs
- See ARTSCENE_GUIDE.md for optimization tips

## 📦 File Structure Overview

```
app/
├── components/
│   ├── ArtScene.tsx              ← Main 3D component
│   ├── ArtGalleryScene.tsx       ← Canvas wrapper
│   ├── UIOverlay.tsx             ← Info display
│   └── ArtScene.examples.tsx     ← 10+ examples
│
└── (scenes)/
    └── gallery/
        └── page.tsx              ← Your entry point - EDIT HERE!

Documentation/
├── ARTSCENE_GUIDE.md
├── ARTSCENE_VISUAL_GUIDE.md
├── ARTSCENE_TECHNICAL.md
├── ARTSCENE_OVERVIEW.md
└── ARTSCENE_IMPLEMENTATION.md
```

## 🚀 Next Steps

1. **Customize the current scene**
   - Change title/description
   - Pick your favorite color
   - Adjust animation speeds

2. **Add your own model**
   - Place .glb file in public/models/
   - Update ArtScene.tsx geometry
   - Test and adjust scale

3. **Fine-tune lighting & mood**
   - See ARTSCENE_GUIDE.md for light details
   - Adjust intensity and position
   - Get the exact look you want

4. **Create more scenes**
   - Add folder in `(scenes)/`
   - Copy `gallery/page.tsx`
   - Create variations for different artworks

5. **Deploy & share**
   - `npm run build`
   - Deploy to Vercel, Netlify, etc.
   - Share your immersive art!

## 💡 Pro Tips

- **Test colors by hovering** - Use browser DevTools color picker
- **Animate carefully** - Very fast rotation can be nauseating
- **Lighting matters** - Good lighting makes mediocre models look great
- **Title is important** - Set context for the viewer
- **Mobile users** - Test on phones, disable heavy features if needed

## 🎬 You're Ready!

Everything is set up and ready to go. Your immersive art experience is live at:

```
http://localhost:3000/gallery
```

Customize, experiment, and create something beautiful! ✨

---

**For more details, see the comprehensive guides in the documentation files above.**

