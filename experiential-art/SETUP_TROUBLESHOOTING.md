# Advanced Setup & Troubleshooting

## Pre-Installation Checklist

Before running `npm install`, ensure:

- [ ] Node.js LTS installed (check: `node --version` returns v18+)
- [ ] npm installed (check: `npm --version` returns v9+)
- [ ] Internet connection available
- [ ] ~700 MB free disk space
- [ ] No antivirus blocking npm operations
- [ ] You're in the correct directory: `C:\Users\New User\Desktop\Saplings\experiential-art`

## Installation Steps (Detailed)

### Step 1: Open PowerShell
1. Open Start menu
2. Search for "PowerShell"
3. Right-click → "Run as Administrator" (optional but recommended)

### Step 2: Navigate to Project
```powershell
cd "C:\Users\New User\Desktop\Saplings\experiential-art"

# Verify you're in the right place:
ls  # Should show: package.json, app/, public/, etc.
```

### Step 3: Install Dependencies
```powershell
npm install

# This runs:
# - Reads package.json
# - Downloads all packages
# - Creates node_modules/ folder
# - Creates package-lock.json
```

### Step 4: Verify Installation
```powershell
# Check that main packages installed:
npm list --depth=0

# Should show:
# ├── @react-three/drei@9.89.0
# ├── @react-three/fiber@8.15.0
# ├── next@14.0.0
# ├── react@18.2.0
# ├── react-dom@18.2.0
# └── three@3.128.0
```

### Step 5: Start Development Server
```powershell
npm run dev

# Output should show:
# ▲ Next.js 14.x.x
# - Local: http://localhost:3000
```

### Step 6: View in Browser
1. Open browser (Chrome, Firefox, Edge, Safari)
2. Go to: http://localhost:3000
3. Click "Enter Gallery"
4. You should see a rotating 3D shape

---

## Common Installation Issues & Solutions

### Issue 1: "node: command not found"
**Problem**: Node.js not installed or PATH not updated

**Solutions**:
1. Check installation: `node --version`
2. If not recognized:
   - Restart PowerShell/Terminal
   - Restart computer
   - Reinstall Node.js (https://nodejs.org/)
   - Add to PATH manually (advanced)

```powershell
# Verify installation:
$env:Path -split ';' | Select-String node
```

### Issue 2: npm install hangs or is very slow
**Problem**: Network issue or npm registry issue

**Solutions**:
```powershell
# Check npm status
npm config get registry
# Should show: https://registry.npmjs.org/

# Clear npm cache
npm cache clean --force

# Try installing again
npm install

# If still slow, try alternate registry:
npm config set registry https://registry.npmmirror.com
npm install
npm config set registry https://registry.npmjs.org/
```

### Issue 3: npm ERR! code ERESOLVE
**Problem**: Dependency version conflict

**Solutions**:
```powershell
# Use legacy peer deps (safe for this project)
npm install --legacy-peer-deps

# Or upgrade npm
npm install -g npm@latest
npm install
```

### Issue 4: "Module not found" errors after npm install
**Problem**: package.json not properly configured or partial install

**Solutions**:
```powershell
# Delete and reinstall
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json
npm install

# If that fails:
npm cache clean --force
npm install
```

### Issue 5: npm run dev shows error "next: command not found"
**Problem**: Next.js not installed

**Solutions**:
```powershell
# Verify installation
npm list next

# If missing, reinstall
npm install next@14.0.0

# Then try:
npm run dev
```

### Issue 6: Canvas shows white/blank
**Problem**: After npm install, dev server runs but 3D scene doesn't appear

**Solutions**:
1. Check browser console (F12 → Console tab)
2. Check terminal output for errors
3. Verify Three.js loaded:
   ```javascript
   // In browser console:
   console.log(typeof THREE)  // Should be 'object'
   ```
4. Check if all imports resolved:
   ```powershell
   npm list three @react-three/fiber @react-three/drei
   ```

---

## Development Workflow

### Running the Development Server

```powershell
cd "C:\Users\New User\Desktop\Saplings\experiential-art"
npm run dev
```

**Features of dev mode:**
- Hot reload (changes auto-update)
- Source maps (easier debugging)
- Unminified code (easier to read)
- Development warnings (catches issues)

### Building for Production

```powershell
npm run build    # Creates .next/ folder
npm run start    # Runs production server
```

### Stopping the Server

Press `Ctrl + C` in PowerShell

---

## Modifying the 3D Scene

Once npm install completes and server is running:

### To change the 3D geometry:
Edit: `app/components/Scene3D.tsx`

**Example**: Replace icosahedron with cube
```jsx
// Change from:
<icosahedronGeometry args={[1.5, 4]} />

// To:
<boxGeometry args={[1, 1, 1]} />
```
The canvas auto-refreshes with your changes!

### To change the 3D color:
```jsx
// Change from:
<meshPhongMaterial color="#00ff88" />

// To:
<meshPhongMaterial color="#ff0000" />  // Red
```

### To add a new 3D object:
Add inside the `<group>` in Scene3D.tsx:
```jsx
<mesh position={[3, 0, 0]}>
  <sphereGeometry args={[1, 32, 32]} />
  <meshStandardMaterial color="#ff00ff" />
</mesh>
```

### To disable auto-rotation:
In `app/(scenes)/gallery/page.tsx`:
```jsx
// Change from:
<OrbitControls autoRotate={true} />

// To:
<OrbitControls autoRotate={false} />
```

---

## After First Installation Success

### Recommended Next Steps:

1. **Explore Drei components**
   - Replace icosahedron with pre-built shapes
   - Try `<Box>`, `<Sphere>`, `<Cylinder>`

2. **Load a 3D model**
   - Place .glb file in `public/models/`
   - Use `useGLTF()` hook to load

3. **Add animations**
   - Use `useFrame()` hook for per-frame updates
   - Use `useSpring()` from drei for smooth animations

4. **Customize lighting**
   - Adjust `intensity` values
   - Change light positions
   - Add colored lights

5. **Create more scenes**
   - Add folder: `app/(scenes)/sculpture/`
   - Create custom 3D experiences
   - Link from navigation

---

## Git Setup (Optional)

If you want version control:

```powershell
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: 3D art website with Three.js"

# Show status
git status
```

The `.gitignore` file already excludes `node_modules/`.

---

## Troubleshooting Checklist

| Symptom | Check | Fix |
|---------|-------|-----|
| npm command not found | `node --version` | Restart shell or reinstall Node.js |
| npm install takes forever | Internet connection | Use alternate registry or try again later |
| Dependency conflicts | npm install output | Add `--legacy-peer-deps` flag |
| Module not found errors | `npm list` | Run `npm install` again |
| Canvas is blank | Browser console (F12) | Check for JavaScript errors |
| Changes don't appear | Terminal running? | Restart `npm run dev` |
| Port 3000 in use | `netstat -ano \| grep 3000` | Change port: `npm run dev -- -p 3001` |

---

## Environment Details

Your project is configured for:

| Setting | Value |
|---------|-------|
| Node.js Version | v18+ (LTS) |
| npm Version | v9+ |
| Next.js | 14.0.0 |
| React | 18.2.0 |
| Three.js | r128 |
| React Three Fiber | 8.15.0 |
| @react-three/drei | 9.89.0 |
| TypeScript | 5.3.0 |
| Tailwind CSS | 3.4.0 |

---

## Performance Optimization (After Getting Started)

Once everything works, optimize for performance:

1. **Code splitting** - Next.js does this automatically
2. **Image optimization** - Use Next.js `<Image>` component
3. **3D model compression** - Use tools like Blender to reduce polygon count
4. **LOD (Level of Detail)** - Load different model versions based on distance
5. **Lazy loading** - Use `<Suspense>` for models

---

## Security Notes

The `.env.example` file shows you where to put sensitive data:

1. Never commit `.env.local` to git
2. Never put API keys in client-side code
3. Use `NEXT_PUBLIC_` prefix only for public data
4. Server-side secrets go in `.env.local` (not `.env.local.example`)

---

## Support Resources

- **Three.js docs**: https://threejs.org/docs/
- **React Three Fiber docs**: https://docs.pmnd.rs/react-three-fiber/
- **Drei components**: https://drei.pmnd.rs/
- **Next.js docs**: https://nextjs.org/docs
- **TypeScript docs**: https://www.typescriptlang.org/docs/

