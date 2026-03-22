# 📍 File Reference Guide

## Where Everything Is Located

```
C:\Users\New User\Desktop\Saplings\experiential-art/
│
├── 📄 QUICKSTART.md                    ← START HERE (30 seconds)
├── 📄 LAUNCH_GUIDE.md                  ← Complete instructions
├── 📄 PROJECT_STATUS.md                ← Current status & what's done
├── 📄 PACKAGES_EXPLAINED.md            ← What each dependency does
├── 📄 VIEWER_IMPROVEMENTS_GUIDE.md     ← Advanced customization
├── 📄 VIEWER_IMPROVEMENTS_INTEGRATION.md
├── 📄 VIEWER_IMPROVEMENTS_QUICKREF.md
│
├── 📁 app/
│   ├── layout.tsx                      ← Main layout wrapper
│   ├── page.tsx                        ← Home page (/)
│   ├── globals.css                     ← Global styles
│   │
│   ├── 📁 components/
│   │   ├── ArtGalleryScene.tsx         ← 3D VIEWER COMPONENT
│   │   ├── ArtworkModel.tsx            ← Model loader
│   │   ├── GalleryOverlay.tsx          ← Title/subtitle overlay
│   │   ├── CanvasLoadingFallback.tsx   ← Loading spinner
│   │   └── (other components)
│   │
│   ├── 📁 (scenes)/
│   │   └── gallery/
│   │       └── page.tsx                ← GALLERY PAGE (YOUR MAIN PAGE)
│   │
│   └── 📁 lib/
│       └── math.ts
│
├── 📁 public/
│   ├── 📁 models/                      ← PUT YOUR .GLB FILES HERE
│   └── (favicon, etc)
│
├── 📁 styles/                          ← Additional styles
│
├── 📄 package.json                     ← Dependencies list
├── 📄 tsconfig.json                    ← TypeScript config
├── 📄 next.config.js                   ← Next.js config
├── 📄 tailwind.config.js               ← Tailwind config
├── 📄 postcss.config.js                ← PostCSS config
│
└── 📁 node_modules/                    ← Installed packages (auto-generated)
```

---

## 🎯 Files You'll Edit Most Often

### **1. Gallery Title & Description**
📄 `app/(scenes)/gallery/page.tsx`

```tsx
<ArtGalleryScene
  title="Change this"           ← Your artwork title
  description="Change this"     ← Your artwork description
  accentColor="#00ff88"         ← Color for UI accents
  modelPath="/models/name.glb"  ← Your model file
/>
```

### **2. Gallery Controls & Constraints**
📄 `app/components/ArtGalleryScene.tsx`

```tsx
// Search for <OrbitControls and adjust:
minPolarAngle={Math.PI * 0.35}  ← How much vertical rotation
maxPolarAngle={Math.PI * 0.65}
minDistance={3}                  ← How close you can zoom
maxDistance={15}                 ← How far you can zoom
```

### **3. Overlay Timing**
📄 `app/components/GalleryOverlay.tsx`

```tsx
setTimeout(() => setIsVisible(false), 4000);  ← How long to show (ms)
```

### **4. Global Styles**
📄 `app/globals.css`

Add custom CSS here for your gallery

### **5. Your 3D Models**
📁 `public/models/`

```
public/models/
├── my-sculpture.glb
├── digital-art.glb
└── my-model.glb
```

Then reference in gallery/page.tsx:
```tsx
modelPath="/models/my-model.glb"
```

---

## 🔍 Quick Find Guide

| What You Want | File Location |
|---------------|---------------|
| Change title text | `app/(scenes)/gallery/page.tsx` (line 7-8) |
| Change overlay colors | `app/components/GalleryOverlay.tsx` |
| Adjust zoom limits | `app/components/ArtGalleryScene.tsx` |
| Add global CSS | `app/globals.css` |
| Change fonts | `app/layout.tsx` or `app/globals.css` |
| Add new page | Create `app/your-page/page.tsx` |
| Add new scene | Create `app/(scenes)/your-scene/page.tsx` |

---

## 📦 Component Architecture

```
App
└── layout.tsx (wraps all pages)
    └── RootLayout
        ├── page.tsx (home)
        └── gallery/page.tsx
            └── ArtGalleryScene
                ├── Canvas (from react-three-fiber)
                │   ├── mesh (3D object)
                │   ├── lights
                │   └── OrbitControls
                ├── GalleryOverlay
                │   ├── Title
                │   ├── Subtitle
                │   └── Instructions
                └── CanvasLoadingFallback (suspense)
                    └── Loading spinner
```

---

## 🎨 How Components Connect

### **Page Flow**
```
gallery/page.tsx (entry point)
    ↓
    Calls: <ArtGalleryScene />
    ↓
    Renders:
      ├── <Canvas> (3D content)
      ├── <Suspense> → <CanvasLoadingFallback> (loading spinner)
      ├── <ArtworkModel> (loads .glb file)
      └── <GalleryOverlay> (title/subtitle/instructions)
```

### **Data Flow**
```
gallery/page.tsx:
  title: "Floating Crystal"
  description: "A meditative piece..."
  modelPath: "/models/name.glb"
  accentColor: "#00ff88"
    ↓
    Passed to: ArtGalleryScene component
    ↓
    Used in:
      - GalleryOverlay (displays title/description)
      - ArtworkModel (loads modelPath)
      - CSS (uses accentColor)
```

---

## 🚀 File Usage Example

### **Scenario: Add Your Own Model**

1. **Get a .glb file**
   - Download from Sketchfab
   - Export from Blender
   - Ask an artist

2. **Copy to public folder**
   ```
   Copy: MyArtwork.glb
   Paste to: C:\Users\New User\Desktop\Saplings\experiential-art\public\models\
   ```

3. **Edit gallery page**
   Open: `app/(scenes)/gallery/page.tsx`
   ```tsx
   <ArtGalleryScene
     title="My Artwork"
     description="My description"
     modelPath="/models/MyArtwork.glb"  ← Change this
   />
   ```

4. **Save**
   Browser reloads automatically → Your model appears!

---

## 📝 File Type Legend

| Icon | Type | Examples |
|------|------|----------|
| 📄 | TypeScript React | `.tsx` files (components) |
| 📄 | TypeScript | `.ts` files (utilities) |
| 📄 | Config | `package.json`, `tsconfig.json` |
| 📄 | Markdown | `.md` files (docs) |
| 📁 | Directory | Folders containing files |

---

## 🔗 Key Relationships

```
gallery/page.tsx (YOUR MAIN PAGE)
    ├── imports ArtGalleryScene
    │   ├── imports Canvas from @react-three/fiber
    │   ├── imports OrbitControls from @react-three/drei
    │   ├── imports ArtworkModel (model loader)
    │   └── imports GalleryOverlay (UI overlay)
    │
    └── passes props:
        ├── title → GalleryOverlay
        ├── description → GalleryOverlay
        ├── modelPath → ArtworkModel
        └── accentColor → GalleryOverlay & CSS
```

---

## 💡 Pro Tips

### **Finding Things**
Use Ctrl+P in VS Code → type filename:
```
Ctrl+P → type "ArtGallery" → opens ArtGalleryScene.tsx
Ctrl+P → type "gallery" → opens gallery/page.tsx
```

### **Finding Text**
Use Ctrl+Shift+F → search across all files:
```
Ctrl+Shift+F → search "modelPath"
Shows all places where modelPath is used
```

### **Quick Navigation**
Ctrl+Shift+O in file → shows all functions/classes in file

---

## 📖 Documentation Map

| Want to learn... | Read this file |
|-----------------|-----------------|
| How to run the app | **LAUNCH_GUIDE.md** |
| Quick 30-second overview | **QUICKSTART.md** |
| What each package does | **PACKAGES_EXPLAINED.md** |
| Project current status | **PROJECT_STATUS.md** |
| 3D controls customization | **VIEWER_IMPROVEMENTS_GUIDE.md** |
| UI overlay customization | **VIEWER_IMPROVEMENTS_GUIDE.md** |
| Quick tips & recipes | **VIEWER_IMPROVEMENTS_QUICKREF.md** |

---

## ✅ Your Current Setup

```
✓ All files in place
✓ Dependencies installed
✓ Server running (npm run dev)
✓ Hot reload working
✓ Gallery page active
✓ Ready for customization
```

**Next:** Edit `app/(scenes)/gallery/page.tsx` and customize! 🎨

