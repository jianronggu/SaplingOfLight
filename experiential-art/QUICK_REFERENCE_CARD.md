# 🎯 QUICK REFERENCE CARD

## 🌐 VIEW YOUR SITE

```
http://localhost:3000/gallery
```

---

## 🚀 COMMANDS

```powershell
# Start server
npm run dev

# Stop server
Ctrl + C

# Restart server
npm run dev (after stopping)

# Navigate to project
cd "C:\Users\New User\Desktop\Saplings\experiential-art"
```

---

## ✏️ EDIT THESE FILES

### **Change Title/Description/Model**
```
File: app/(scenes)/gallery/page.tsx

Line 7:  title="Your Title"
Line 8:  description="Your Description"
Line 10: accentColor="#00ff88"
Line 11: modelPath="/models/your-model.glb"
```

### **Adjust Controls**
```
File: app/components/ArtGalleryScene.tsx

Search for <OrbitControls
Edit: minPolarAngle, maxPolarAngle
Edit: minDistance, maxDistance
```

### **UI Overlay Timing**
```
File: app/components/GalleryOverlay.tsx

Search for: setTimeout
Edit: 4000 (milliseconds)
```

---

## 📁 YOUR MODEL LOCATION

```
C:\Users\New User\Desktop\Saplings\experiential-art\public\models\

Put your .glb files here:
- my-sculpture.glb
- digital-art.glb
- etc.
```

---

## 🎮 INTERACT

| Action | What Happens |
|--------|---|
| Drag | Rotate |
| Scroll | Zoom |
| Wait 4 sec | UI hides |
| Move mouse | UI shows |

---

## 📚 DOCUMENTATION

### **Start Here**
- SIMPLEST_GUIDE.md (absolute basics)
- QUICKSTART.md (30 seconds)
- START_HERE.md (5 minutes)

### **Detailed Help**
- LAUNCH_GUIDE.md (everything)
- FILE_REFERENCE.md (file locations)

### **Customization**
- VIEWER_IMPROVEMENTS_GUIDE.md
- VIEWER_IMPROVEMENTS_QUICKREF.md

---

## 🔧 PROJECT LOCATION

```
C:\Users\New User\Desktop\Saplings\experiential-art\
```

---

## ✅ STATUS

```
✅ Server: RUNNING (Port 3000)
✅ Gallery: LIVE
✅ Hot Reload: ACTIVE
✅ Documentation: COMPLETE
✅ Ready: YES!
```

---

## 💡 MOST COMMON TASKS

### **See It Working (1 min)**
→ Open http://localhost:3000/gallery

### **Change Title (2 min)**
→ Edit gallery/page.tsx line 7
→ Save (Ctrl+S)
→ Done!

### **Add Your Model (5 min)**
→ Copy .glb to public/models/
→ Edit gallery/page.tsx line 11: modelPath="/models/file.glb"
→ Save → Done!

### **Fix Something (5 min)**
→ Press F12 in browser
→ Check Console for errors
→ Read LAUNCH_GUIDE.md Troubleshooting

---

## 📞 HELP

| Problem | Solution |
|---------|----------|
| Blank page | F12 → Console → Check errors |
| Won't start | npm install --legacy-peer-deps |
| Port in use | taskkill /PID <id> /F |
| Model missing | Check filename spelling |
| Changes not showing | Save file, browser auto-reloads |

---

## 🎉 QUICK WINS

✅ View site: 1 minute
✅ Change title: 2 minutes
✅ Add model: 5 minutes
✅ Customize colors: 3 minutes
✅ Adjust controls: 5 minutes

---

## 📖 KEEP HANDY

- **SIMPLEST_GUIDE.md** - Beginners
- **QUICKSTART.md** - Quick reference
- **LAUNCH_GUIDE.md** - Full help
- **FILE_REFERENCE.md** - Finding things

---

This card has everything you need to work with your project!

