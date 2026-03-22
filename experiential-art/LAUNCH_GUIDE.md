# 🚀 How to Launch Your Experiential Art Website

## ✅ Your App is NOW RUNNING!

Your development server is **live and ready**.

---

## 🌐 Access Your Website

### **Main Gallery (The Experience)**
👉 **http://localhost:3000/gallery**

This is where your 3D artwork viewer displays with:
- ✨ Full-screen 3D canvas
- 🎨 Constrained orbit controls
- 📱 Responsive design (works on all devices)
- 🎭 Elegant gallery overlay
- ⚡ Smooth animations

### **Home Page**
👉 **http://localhost:3000**

Landing page for your site.

---

## 📋 Quick Reference

| What | Where |
|------|-------|
| **Your App** | http://localhost:3000 |
| **Gallery View** | http://localhost:3000/gallery |
| **Terminal** | Keep running in PowerShell |
| **Stop Server** | Press `Ctrl + C` in terminal |
| **Edit Code** | Files auto-reload (hot reload) |

---

## 🛑 How to Stop the Server

When done, press **Ctrl + C** in the PowerShell terminal.

You'll see:
```
^C
Ctrl-C pressed. Terminating...
```

---

## 🔄 How to Restart the Server

```powershell
cd "C:\Users\New User\Desktop\Saplings\experiential-art"
npm run dev
```

Then go to http://localhost:3000/gallery

---

## 📁 Your Project Structure

```
experiential-art/
├── app/
│   ├── layout.tsx              (Main layout)
│   ├── page.tsx                (Home page)
│   ├── globals.css             (Global styles)
│   ├── (scenes)/
│   │   └── gallery/
│   │       └── page.tsx        (Gallery page - YOUR MAIN EXPERIENCE)
│   └── components/
│       ├── ArtGalleryScene.tsx (3D viewer with controls)
│       ├── GalleryOverlay.tsx  (Title/subtitle overlay)
│       ├── CanvasLoadingFallback.tsx (Loading spinner)
│       ├── ArtworkModel.tsx    (Model loader)
│       └── (other components)
├── public/
│   └── models/                 (Where to put your .glb files)
├── package.json                (Dependencies)
└── tsconfig.json               (TypeScript config)
```

---

## 🎨 Features Available Right Now

### 1️⃣ **Constrained Orbit Controls**
- Drag to rotate the artwork
- Scroll to zoom in/out
- Rotation is intelligently limited (won't flip upside down)
- Smooth, gallery-quality motion

### 2️⃣ **Loading Fallback**
- Animated spinner while model loads
- "LOADING ARTWORK..." text
- Professional UX

### 3️⃣ **Responsive Design**
- Perfect on desktop (1920x1080)
- Perfect on tablet (768x1024)
- Perfect on mobile (375x667)
- Auto-scaling text and layouts

### 4️⃣ **Elegant Gallery Overlay**
- Beautiful title and subtitle display
- Auto-hides after 4 seconds
- Reappears on mouse movement
- Instructions for interaction

---

## 🔧 Edit & See Changes Instantly

When you edit files in the `app/` folder, your browser **automatically reloads** (hot reload).

Examples:
- Edit `app/layout.tsx` → changes appear instantly
- Edit `app/components/ArtGalleryScene.tsx` → 3D viewer updates
- Edit `app/globals.css` → styles refresh immediately

Just **save the file** and look at your browser!

---

## 📦 Adding Your Own 3D Model

### **Step 1: Prepare Your Model**
Get a `.glb` file (Three.js format)

Common sources:
- Sketchfab.com (download as .glb)
- Blender (export as .glb)
- Your own 3D artist

### **Step 2: Place the File**
Copy your `.glb` file to:
```
public/models/your-model-name.glb
```

Example:
```
public/models/my-sculpture.glb
public/models/digital-art.glb
```

### **Step 3: Use It in Gallery**
Edit `app/(scenes)/gallery/page.tsx`:

```tsx
<ArtGalleryScene
  title="My Artwork Title"
  description="Beautiful description here"
  modelPath="/models/your-model-name.glb"
/>
```

That's it! Your model will load and display.

---

## 🎯 Common Tasks

### **Change the Title/Subtitle**
Edit `app/(scenes)/gallery/page.tsx`:
```tsx
<ArtGalleryScene
  title="NEW TITLE HERE"
  description="New description here"
/>
```

### **Change Colors**
Edit `app/(scenes)/gallery/page.tsx`:
```tsx
<ArtGalleryScene
  accentColor="#ff1493"  // Bold pink
/>
```

### **Change Control Constraints**
Edit `app/components/ArtGalleryScene.tsx`:
```tsx
<OrbitControls
  minPolarAngle={Math.PI * 0.2}  // Allow more rotation
  maxPolarAngle={Math.PI * 0.8}
/>
```

### **Change Overlay Timing**
Edit `app/components/GalleryOverlay.tsx`:
```tsx
setTimeout(() => setIsVisible(false), 8000);  // Show longer (8 sec)
```

---

## 🐛 Troubleshooting

### **"Cannot find module" error**
→ The module wasn't installed. Run:
```powershell
npm install --legacy-peer-deps
```

### **Port 3000 already in use**
→ Another app is using it. Kill it:
```powershell
netstat -ano | Select-String "3000"
taskkill /PID <PID> /F
```
Then restart: `npm run dev`

### **Blank page or no 3D canvas**
→ Check browser console:
1. Open DevTools: **F12** or **Right-click → Inspect**
2. Go to **Console** tab
3. Look for red errors
4. Share errors with me and I'll help fix

### **Model won't load**
→ Check:
1. File exists at `public/models/your-file.glb` ✓
2. Filename matches exactly (case-sensitive) ✓
3. File is not corrupted (try opening in Babylon Sandbox) ✓
4. Console shows no errors (F12) ✓

---

## 📱 Test on Different Devices

### **Desktop**
Just use http://localhost:3000/gallery normally

### **Mobile (From Same Computer)**
1. Find your computer's IP: `ipconfig`
2. Look for "IPv4 Address" (e.g., `192.168.1.100`)
3. On phone, go to: `http://192.168.1.100:3000/gallery`

### **Mobile (Simulation)**
1. Open DevTools: **F12**
2. Click device icon (top-left)
3. Select device (iPhone, Samsung, etc.)
4. Refresh page

---

## 🎬 Next Steps

1. ✅ **Server Running** - You're here!
2. 📖 **Read Documentation** - See files in project root:
   - `VIEWER_IMPROVEMENTS_GUIDE.md` - Advanced customization
   - `VIEWER_IMPROVEMENTS_QUICKREF.md` - Quick tips
3. 📦 **Add Your Model** - Place `.glb` in `public/models/`
4. 🎨 **Customize** - Edit components and styles
5. 🚀 **Deploy** - When ready (we can help with that later)

---

## 💬 Quick Help Commands

```powershell
# Navigate to project
cd "C:\Users\New User\Desktop\Saplings\experiential-art"

# Start dev server
npm run dev

# Stop server
# (Press Ctrl + C in terminal)

# Install dependencies
npm install --legacy-peer-deps

# Clean install (if needed)
npm cache clean --force
rm -r node_modules -Force
npm install --legacy-peer-deps

# Check for issues
npm audit

# Build for production
npm run build
```

---

## 🎉 You're All Set!

### Your experiential art website is **LIVE**!

**Go to:** http://localhost:3000/gallery

**Try it out:**
- 🖱️ Drag to rotate
- 🔄 Scroll to zoom
- ⏱️ Wait 4 seconds to see overlay auto-hide
- ↕️ Move mouse to show overlay again

---

## 📞 Need Help?

If anything goes wrong:
1. Check the **Troubleshooting** section above
2. Open browser **DevTools** (F12) and check **Console** for errors
3. Share error messages and I'll help fix them

**You've got this!** 🚀🎨

