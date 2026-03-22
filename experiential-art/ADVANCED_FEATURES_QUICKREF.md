# 🚀 Advanced Features Quick Reference

## What's New

Your gallery now has professional viewer enhancements! Here's a quick guide:

---

## 🎮 Control Panel (⚙️ Button)

Click the gear icon in the bottom-right to access:

| Control | Range | Use |
|---------|-------|-----|
| **Lighting Intensity** | 0 - 2 | Brighten/darken scene |
| **Rotation Speed** | 0 - 2x | Speed up/slow down spin |
| **Auto-Rotate** | On/Off | Toggle automatic rotation |
| **Reset Camera** | Button | Return to starting view |

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **W / ↑** | Zoom in |
| **S / ↓** | Zoom out |
| **R** | Reset camera |
| **Space** | Toggle rotation |

---

## 🖱️ Mouse Controls

- **Drag** = Rotate
- **Scroll** = Zoom
- **Click** = Pause auto-rotation
- **Hover** = Highlight object

---

## 📱 Touch Controls

- **Drag** = Rotate
- **Pinch** = Zoom
- **Tap** = Interact

---

## 💡 Lighting Features

**Professional 3-point lighting:**
- Key Light (main brightness)
- Fill Light (shadow reduction)
- Accent Light (focal glow - pulsing)
- Rim Light (depth - pulsing)
- Ambient Light (overall)

**Dynamic effects:**
- Lights subtly move and pulse
- Responds to scene interaction

---

## ✨ Visual Effects

| Effect | Default | Control |
|--------|---------|---------|
| **Particles** | On | Control panel → Visibility |
| **Bloom** | On | Control panel → Visibility |
| **Dynamic Lighting** | On | Control panel → Visibility |

---

## 📊 How to Use

### Basic Viewing
1. Open gallery
2. Watch auto-rotating object
3. Use mouse/keyboard to interact

### Adjust Lighting
1. Click ⚙️ button (bottom-right)
2. Slide "Lighting Intensity"
3. Drag to brighten/darken

### Change Rotation Speed
1. Click ⚙️ button
2. Slide "Rotation Speed"
3. 0 = stopped, 2 = 2x speed

### Reset View
1. Press **R** key, OR
2. Click ⚙️ button → "Reset Camera"

### Toggle Auto-Rotation
1. Press **Space**, OR
2. Click ⚙️ button → "Auto-Rotate"

---

## 🎨 Customization

### Change Accent Color

Edit `app/(scenes)/gallery/page.tsx`:

```tsx
accentColor="#ff1493"  // Change this hex code
```

Popular colors:
- `#00ff88` - Cyan ✨
- `#ff1493` - Hot pink 🔥
- `#00d4ff` - Bright blue 💙
- `#ffaa00` - Orange 🧡
- `#ff0080` - Magenta 💜

### Disable Effects

```tsx
enableParticles={false}        // Hide particles
enableBloom={false}            // Hide glow
enableDynamicLighting={false}  // Static lights
enableControlsPanel={false}    // Hide control panel
```

### Adjust Particles

```tsx
particleCount={100}  // More particles (default: 50)
```

---

## 📁 New Files Created

```
Components:
├── AdvancedLighting.tsx           (3-point lighting system)
├── ViewerControlsPanel.tsx        (Control panel UI)
├── InteractiveEffects.tsx         (Particles, bloom effects)
├── EnhancedGalleryScene.tsx       (Combined scene)
└── EnhancedArtGallery.tsx         (Full gallery viewer)

Hooks:
└── useAdvancedControls.ts         (Keyboard/touch handling)

Documentation:
└── ADVANCED_FEATURES_GUIDE.md     (Complete guide)
```

---

## 🎯 Quick Start

**Right now:**
1. Go to http://localhost:3000/gallery
2. See the new control panel (⚙️ button, bottom-right)
3. Try the lighting and rotation sliders
4. Test keyboard shortcuts (R, Space, W/S)

**Next:**
1. Read `ADVANCED_FEATURES_GUIDE.md` for details
2. Customize colors and effects
3. Add your own 3D model

---

## ⚡ Tips & Tricks

✨ **Auto-rotation pauses when you interact** (drag, zoom, key press)
💡 **Lighting has pulsing effects** for dynamic feel
🎯 **Accent light color matches your scene color**
📱 **Works great on mobile** with touch gestures
⌨️ **All controls have keyboard shortcuts** for accessibility

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| Control panel missing | Check `enableControlsPanel={true}` |
| Lights too bright | Lower "Lighting Intensity" slider |
| Object spinning too fast | Lower "Rotation Speed" slider |
| Performance slow | Reduce particles or disable bloom |
| Keyboard not working | Click canvas first, then press keys |

---

## 📖 Full Documentation

For detailed information, read:
→ `ADVANCED_FEATURES_GUIDE.md`

---

**Your viewer is now fully featured!** 🎨✨

