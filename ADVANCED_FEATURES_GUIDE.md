# 🎨 Advanced Viewer Features Guide

## Overview

Your experiential art website now includes professional-grade viewer enhancements:

- 🎬 **Advanced Lighting System** - 3-point lighting + dynamic effects
- 🎮 **Interactive Controls Panel** - Adjust lights, rotation, and effects
- ⌨️ **Keyboard Shortcuts** - Full keyboard control support
- ✨ **Visual Effects** - Particles, bloom, and atmospheric elements
- 📱 **Touch Gestures** - Pinch to zoom, swipe to rotate (mobile)
- 🎯 **Smart Interactions** - Hover effects, auto-rotation pause

---

## New Components

### 1. **AdvancedLighting.tsx**

Professional 3-point lighting setup (like photography studios):

```tsx
<AdvancedLighting
  accentColor="#00ff88"
  intensity={1.5}
  dynamicLighting={true}
/>
```

**Features:**
- Key Light (main illumination)
- Fill Light (shadow reduction)
- Ambient Light (overall brightness)
- Accent Light (focal point glow)
- Rim Light (depth separation)
- Hemisphere Light (sky-like realism)
- Dynamic pulsing effects

**Parameters:**
- `accentColor`: Color of accent lights (hex string)
- `intensity`: Light intensity multiplier (0-2)
- `dynamicLighting`: Enable pulsing/movement (boolean)

### 2. **ViewerControlsPanel.tsx**

Interactive control panel for viewers:

```tsx
<ViewerControlsPanel
  initialLightingIntensity={1}
  initialRotationSpeed={0.5}
  onLightingIntensityChange={(intensity) => {...}}
  onRotationSpeedChange={(speed) => {...}}
  onAutoRotateToggle={(enabled) => {...}}
  onResetCamera={() => {...}}
  showKeyboardShortcuts={true}
  position="bottom-right"
/>
```

**Features:**
- 💡 Lighting intensity slider (0-2)
- 🔄 Rotation speed slider (0-2x)
- 📌 Auto-rotate toggle
- 🎯 Reset camera button
- ⌨️ Keyboard shortcuts display
- Collapsible design

**Positions:**
- `bottom-right` (default)
- `bottom-left`
- `top-right`
- `top-left`

### 3. **InteractiveEffects.tsx**

Visual effects components:

```tsx
<ParticleSystem particleCount={50} accentColor="#00ff88" />
<BloomLayer accentColor="#00ff88" />
```

**Effects:**
- Particle system (rotating particles around object)
- Bloom halo (soft glow effect)
- Customizable with accent colors

### 4. **useAdvancedControls.ts**

Custom React hook for enhanced user interactions:

```tsx
const { isAutoRotating, setIsAutoRotating, resetCamera } = useAdvancedControls({
  enableKeyboard: true,
  enableTouch: true,
  autoRotateSpeed: 1.5,
  pauseAutoRotateOnInteraction: true,
});
```

**Features:**
- Keyboard navigation
- Touch gesture support
- Auto-rotation pause on interaction
- Camera reset function

### 5. **EnhancedGalleryScene.tsx**

Full-featured scene component combining all effects:

```tsx
<EnhancedGalleryScene
  title="My Artwork"
  description="Description"
  accentColor="#00ff88"
  modelPath="/models/my-model.glb"
  enableParticles={true}
  enableBloom={true}
  enableDynamicLighting={true}
  lightingIntensity={1}
  particleCount={50}
/>
```

### 6. **EnhancedArtGallery.tsx**

Complete gallery viewer with all features integrated:

```tsx
<EnhancedArtGallery
  title="My Gallery"
  description="Experience description"
  accentColor="#00ff88"
  enableParticles={true}
  enableBloom={true}
  enableDynamicLighting={true}
  enableControlsPanel={true}
  enableKeyboardShortcuts={true}
/>
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **↑ / W** | Zoom in |
| **↓ / S** | Zoom out |
| **← / A** | Rotate left |
| **→ / D** | Rotate right |
| **R** | Reset camera |
| **Space** | Toggle auto-rotation |

---

## Mouse & Touch Controls

### Desktop
- **Drag** - Rotate view
- **Scroll** - Zoom in/out
- **Click** - Pause auto-rotation
- **Hover** - Highlight object

### Mobile
- **Drag** - Rotate view
- **Pinch** - Zoom in/out
- **Tap** - Interact with UI

---

## Lighting Explained

### Three-Point Lighting (Professional Standard)

1. **Key Light** (Main)
   - Position: Upper right at angle
   - Color: White (neutral)
   - Intensity: 1.5x
   - Creates primary shadows

2. **Fill Light** (Secondary)
   - Position: Opposite side
   - Color: Blue (cool)
   - Intensity: 0.7x
   - Reduces harsh shadows

3. **Accent Light** (Focal Point)
   - Position: Front-top
   - Color: Custom (your accentColor)
   - Intensity: Pulsing (1.0x)
   - Creates highlights and glow

4. **Rim Light** (Depth)
   - Position: Back
   - Color: Magenta
   - Intensity: Pulsing (0.8x)
   - Separates object from background

5. **Ambient Light**
   - Overall scene illumination
   - Color: White
   - Intensity: 0.5x
   - Fills shadows

6. **Hemisphere Light**
   - Sky-to-ground gradient
   - Adds natural feel
   - Intensity: 0.4x

---

## Control Panel Features

### Lighting Intensity
- **Range:** 0 to 2
- **Default:** 1
- **Effect:** Multiplies all light intensities
- **Use:** Adjust brightness for different environments

### Rotation Speed
- **Range:** 0 to 2x
- **Default:** 1
- **Effect:** Multiplies auto-rotation speed
- **Use:** Make object spin faster or slower

### Auto-Rotate Toggle
- **Default:** Enabled
- **Effect:** Object automatically rotates
- **Pause on:** User interaction (drag, zoom)
- **Use:** Enable for passive viewing, toggle off for manual control

### Reset Camera
- **Action:** Resets to original view
- **Keyboard:** Press R
- **Use:** Return to starting position anytime

---

## Customization Guide

### Change Accent Color

In `app/(scenes)/gallery/page.tsx`:

```tsx
<EnhancedArtGallery
  accentColor="#ff1493"  // Change this hex color
/>
```

Common colors:
- `#00ff88` - Cyan (default)
- `#ff1493` - Hot pink
- `#00d4ff` - Bright blue
- `#ffaa00` - Orange
- `#ff0080` - Magenta

### Disable Specific Effects

```tsx
<EnhancedArtGallery
  enableParticles={false}        // No particle system
  enableBloom={false}            // No bloom glow
  enableDynamicLighting={false}  // Static lighting
  enableControlsPanel={false}    // Hide control panel
  enableKeyboardShortcuts={false} // Disable keyboard
/>
```

### Adjust Particle Count

```tsx
<EnhancedGalleryScene
  particleCount={100}  // More particles (default: 50)
/>
```

### Position Controls Panel

```tsx
<ViewerControlsPanel
  position="top-left"  // or bottom-left, top-right, bottom-right
/>
```

---

## Performance Tips

1. **Reduce Particles** if performance is slow:
   ```tsx
   <EnhancedArtGallery particleCount={25} />
   ```

2. **Disable Bloom** for lower-end devices:
   ```tsx
   <EnhancedArtGallery enableBloom={false} />
   ```

3. **Turn off Dynamic Lighting** on mobile:
   ```tsx
   <EnhancedArtGallery enableDynamicLighting={false} />
   ```

4. **Monitor Frame Rate:**
   - Open DevTools (F12)
   - Go to Performance/Rendering
   - Look for 60 FPS

---

## Usage Examples

### Minimal Setup (Just Enhanced Lights)

```tsx
<EnhancedArtGallery
  title="My Art"
  enableParticles={false}
  enableBloom={false}
  enableControlsPanel={false}
/>
```

### Full Professional Setup

```tsx
<EnhancedArtGallery
  title="Gallery Exhibition"
  description="Professional artwork display"
  accentColor="#00d4ff"
  enableParticles={true}
  enableBloom={true}
  enableDynamicLighting={true}
  enableControlsPanel={true}
  enableKeyboardShortcuts={true}
/>
```

### Mobile-Optimized

```tsx
<EnhancedArtGallery
  enableParticles={false}
  enableBloom={true}
  enableDynamicLighting={false}
  particleCount={25}
/>
```

---

## Interaction Flow

```
User Loads Page
    ↓
Auto-rotation starts
    ↓
UI overlay displays (4 sec)
UI hides
    ↓
User Interacts (drag, scroll, key press)
    ↓
Auto-rotation pauses
    ↓
User can:
├─ Adjust lighting (control panel)
├─ Change rotation speed (control panel)
├─ Reset camera (R key or button)
├─ Toggle auto-rotation (space key)
└─ Open control panel (⚙️ button)
```

---

## Troubleshooting

### Controls panel doesn't appear
- Check `enableControlsPanel={true}` is set
- Ensure component is `EnhancedArtGallery`, not `ArtGalleryScene`

### Particles not visible
- Check `enableParticles={true}`
- Try increasing `particleCount`
- Verify accent color is visible on dark background

### Lighting seems wrong
- Adjust `lightingIntensity` slider
- Check `enableDynamicLighting` is enabled
- Increase ambient light in AdvancedLighting component

### Performance issues
- Reduce `particleCount`
- Disable `enableBloom`
- Disable `enableDynamicLighting`
- Lower device resolution

### Keyboard shortcuts not working
- Check `enableKeyboardShortcuts={true}`
- Ensure focus is on canvas (click it first)
- Browser may block some keys (test in different browser)

---

## Advanced Customization

### Custom Lighting Setup

Edit `app/components/AdvancedLighting.tsx` to modify:
- Light positions
- Light colors
- Light intensities
- Pulsing speeds

Example:

```tsx
<directionalLight
  position={[10, 15, 10]}  // Change position
  intensity={2}             // Change intensity
  color="#ff0000"           // Change color
/>
```

### Custom Effects

Edit `app/components/InteractiveEffects.tsx` to add:
- Different particle behaviors
- Bloom intensity changes
- Custom geometric effects
- Post-processing effects

---

## Next Steps

1. ✅ View your gallery at http://localhost:3000/gallery
2. ✅ Try the control panel (⚙️ button)
3. ✅ Experiment with keyboard shortcuts
4. ✅ Test on mobile for touch gestures
5. ✅ Customize colors and effects
6. ✅ Add your own 3D models

---

**Your experiential art viewer is now fully enhanced!** 🎉

