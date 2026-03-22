# 🎯 SIMPLEST POSSIBLE GUIDE

## YOU ASKED: "How to launch the app?"

---

## ✅ THE GOOD NEWS

**Your app is ALREADY running!** 🎉

---

## 🌐 OPEN YOUR BROWSER

Copy and paste this into your address bar:
```
http://localhost:3000/gallery
```

Press Enter.

**That's it!** You'll see your 3D experience. ✨

---

## 🎮 WHAT YOU'LL SEE

- A glowing cyan object in the center
- Title: "Floating Crystal"
- Description text
- Can drag to rotate
- Can scroll to zoom
- Title hides after 4 seconds

---

## 🖱️ HOW TO INTERACT

| Action | Result |
|--------|--------|
| **Click & drag** | Rotate the object |
| **Scroll** | Zoom in/out |
| **Wait** | UI overlay hides |
| **Move mouse** | UI comes back |

---

## ✏️ HOW TO CUSTOMIZE

### **Change the Title**

1. Find this file:
   ```
   app/(scenes)/gallery/page.tsx
   ```

2. Find this line (around line 7):
   ```
   title="Floating Crystal"
   ```

3. Change it to:
   ```
   title="My Custom Title"
   ```

4. Save the file (Ctrl+S)

5. Go back to browser

6. **Poof!** It changed automatically! ✨

---

## 🎨 HOW TO ADD YOUR OWN MODEL

### **Step 1: Get a .glb file**
- Download from Sketchfab.com, or
- Export from Blender, or
- Get from an artist

### **Step 2: Copy it**
Copy your `model.glb` file to:
```
C:\Users\New User\Desktop\Saplings\experiential-art\public\models\
```

So the full path looks like:
```
C:\Users\New User\Desktop\Saplings\experiential-art\public\models\model.glb
```

### **Step 3: Tell the app**
Open: `app/(scenes)/gallery/page.tsx`

Find this line (around line 11):
```
modelPath="/models/Floating_Crystal.glb"
```

Change it to your filename:
```
modelPath="/models/model.glb"
```

### **Step 4: Save & Done!**
Save the file → Browser updates → Your model appears!

---

## 🛑 HOW TO STOP

When you're done, go to PowerShell and press:
```
Ctrl + C
```

---

## ▶️ HOW TO START AGAIN

Open PowerShell in your project folder and type:
```
npm run dev
```

Then go to: http://localhost:3000/gallery

---

## 💡 THAT'S REALLY IT

Your app is:
- ✅ Running
- ✅ Customizable
- ✅ Ready for your content

---

## 📚 NEED MORE HELP?

Read one of these files (all in your project folder):
- **START_HERE.md** - More detailed
- **QUICKSTART.md** - Quick reference
- **LAUNCH_GUIDE.md** - Full instructions with troubleshooting
- **FILE_REFERENCE.md** - Where to find things

---

## 🎉 YOU'RE DONE

You now know:
1. ✅ How to view your site
2. ✅ How to interact with it
3. ✅ How to change the title
4. ✅ How to add your model
5. ✅ How to stop/start it

**Go create something amazing!** 🎨

