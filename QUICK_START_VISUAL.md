# ⚡ LAUNCH YOUR APP - QUICK VISUAL GUIDE

## 🚀 Right Now - Open This

```
http://localhost:3000/gallery
```

You should see a glowing cyan object you can rotate. ✨

---

## 🎮 Try These Interactions

| Action | Result |
|--------|--------|
| **Click & Drag** | Rotate the artwork |
| **Scroll** | Zoom in/out |
| **Wait 4 seconds** | Overlay hides |
| **Move mouse** | Overlay reappears |

---

## 📝 Edit & See Changes Instantly

### Change the Title
```
File: app/(scenes)/gallery/page.tsx
Line: 7

title="Floating Crystal"  ← Change this
```

### Change the Description
```
File: app/(scenes)/gallery/page.tsx
Line: 8

description="A meditative piece..."  ← Change this
```

### Change the Color
```
File: app/(scenes)/gallery/page.tsx
Line: 10

accentColor="#00ff88"  ← Change to any color
```

**Just save** → Browser auto-reloads! ✅

---

## 📦 Add Your Own 3D Model

### Step 1: Get a .glb File
- Download from Sketchfab.com
- Export from Blender
- From an artist

### Step 2: Copy to Project
```
Copy file to:
C:\Users\New User\Desktop\Saplings\experiential-art\public\models\

Example:
public/models/my-sculpture.glb
public/models/digital-art.glb
```

### Step 3: Update Gallery
```
File: app/(scenes)/gallery/page.tsx

Change:
modelPath="/models/my-sculpture.glb"

Save → Done! Your model loads.
```

---

## 🛑 Stop the Server

In PowerShell terminal:
```
Press Ctrl + C
```

---

## ▶️ Restart the Server

```powershell
npm run dev
```

Then: http://localhost:3000/gallery

---

## 📂 Important Folders

| Folder | What Goes Here |
|--------|---|
| `app/components/` | React components (don't change) |
| `app/(scenes)/gallery/` | Gallery page (edit to customize) |
| `public/models/` | Your .glb 3D model files |
| `app/globals.css` | Global styles (optional) |

---

## 🔗 Quick Links

| File | Purpose | Action |
|------|---------|--------|
| `START_HERE.md` | Overview | Read first |
| `QUICKSTART.md` | 30-second guide | Quick reference |
| `LAUNCH_GUIDE.md` | Full instructions | Detailed help |
| `FILE_REFERENCE.md` | Find what to edit | Navigation |

---

## 💡 Most Common Edits

### **What You'll Edit 90% of the Time**
```
📄 app/(scenes)/gallery/page.tsx

This file has 3 things to change:
1. title="Your Title"
2. description="Your Description"  
3. modelPath="/models/your-model.glb"
4. accentColor="#color"
```

That's it! Everything else is automated.

---

## ✅ Checklist

- ✅ Server running? (Port 3000 active)
- ✅ Browser shows your site? (http://localhost:3000/gallery)
- ✅ Can rotate the object? (Drag works)
- ✅ Can zoom? (Scroll works)
- ✅ Title visible? ("Floating Crystal")

If all ✅ → **You're good!**

---

## 🎨 Next: Add Your Model

1. Get a .glb file
2. Copy to `public/models/myfile.glb`
3. Edit gallery/page.tsx: `modelPath="/models/myfile.glb"`
4. Save
5. See your model! ✨

---

## 📞 If Stuck

1. Open browser DevTools: **F12**
2. Go to **Console** tab
3. Look for red error text
4. Check **LAUNCH_GUIDE.md** troubleshooting section

---

## 🎉 You Got This!

Your experiential art website is **LIVE** and **READY**.

**Go create something amazing!** 🎨✨

