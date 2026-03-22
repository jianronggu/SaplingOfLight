# ⚡ Quick Start - 30 Seconds

## Your Site is Running RIGHT NOW! 

### 🎨 View Your Gallery
**Open your browser and go to:**
```
http://localhost:3000/gallery
```

You should see:
- ✨ A full-screen 3D canvas
- 🎨 A glowing crystalline object rotating
- 📝 "Floating Crystal" title at the top
- 🎮 Interactive controls (drag to rotate, scroll to zoom)

---

## 🎮 Try These Interactions

| Action | Result |
|--------|--------|
| **Click & drag** | Rotate the artwork |
| **Scroll wheel** | Zoom in/out |
| **Wait 4 seconds** | Overlay auto-hides |
| **Move mouse** | Overlay reappears |

---

## 🛑 Stop the Server

Press **Ctrl + C** in the PowerShell terminal.

---

## ✏️ Edit & See Changes Instantly

Any file you edit in `app/` reloads automatically in your browser!

### Example: Change the Title
Edit this file:
```
app/(scenes)/gallery/page.tsx
```

Change:
```tsx
title="Floating Crystal"
```

To:
```tsx
title="My Amazing Artwork"
```

**Save** → Browser auto-reloads → Title changes! ✨

---

## 📦 Add Your Own Model Later

1. Get a `.glb` file
2. Copy to `public/models/my-model.glb`
3. Edit gallery/page.tsx:
```tsx
modelPath="/models/my-model.glb"
```

---

## 📖 Full Documentation

See `LAUNCH_GUIDE.md` for complete instructions and troubleshooting.

---

**That's it! You're ready!** 🚀

