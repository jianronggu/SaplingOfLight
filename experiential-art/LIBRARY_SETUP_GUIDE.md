# 3D Art Website - Library Setup Guide

## Prerequisites: Install Node.js

You need Node.js installed before you can install packages. Follow these steps:

### Windows Installation:

1. **Download Node.js LTS**
   - Go to https://nodejs.org/
   - Click on the LTS (Long Term Support) version
   - Download the Windows Installer (.msi)

2. **Run the Installer**
   - Double-click the downloaded .msi file
   - Follow the setup wizard (accept defaults)
   - Make sure "npm package manager" is checked
   - Click Install

3. **Verify Installation**
   - Open PowerShell or Command Prompt
   - Run: `node --version`
   - Run: `npm --version`
   - Both should display version numbers

---

## Core 3D Libraries Explained

### 1. **Three.js** (v128+)
- **Purpose**: Core 3D graphics library using WebGL
- **What it does**: 
  - Manages 3D geometries, materials, lighting, and rendering
  - Provides camera controls, textures, and effects
  - Handles all low-level WebGL operations
- **When you use it**: Creating meshes, managing scenes, setting up lights
- **Example**: Creating a cube or loading 3D models

### 2. **React Three Fiber** (v8.15+)
- **Purpose**: React renderer for Three.js
- **What it does**:
  - Makes Three.js declarative and React-friendly
  - Lets you write 3D scenes as JSX components
  - Manages the render loop automatically
  - Integrates with React hooks and state
- **When you use it**: Building 3D scenes in your React components
- **Advantage**: Instead of imperative Three.js code, you write React code

```jsx
// React Three Fiber approach (easier!)
<Canvas>
  <mesh position={[0, 0, 0]}>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="blue" />
  </mesh>
</Canvas>
```

### 3. **@react-three/drei** (v9.89+)
- **Purpose**: Utility library with pre-made components and helpers
- **What it provides**:
  - **Camera controls**: `OrbitControls`, `PerspectiveCamera`, `FirstPersonControls`
  - **Loaders**: `useGLTF()` for loading 3D models, `useTexture()` for images
  - **Components**: `Text`, `Sphere`, `Box`, `Environment`, `Stars`
  - **Effects**: Post-processing, environment maps, performance monitoring
  - **Helpers**: `Bounds`, `BakeShadows`, `ContactShadows`
- **When you use it**: Saves time by providing battle-tested solutions
- **Example**: Instead of coding orbit controls from scratch, use: `<OrbitControls />`

---

## Installation Steps

Once Node.js is installed, run these commands:

```bash
# Navigate to the project directory
cd "C:\Users\New User\Desktop\Saplings\experiential-art"

# Install all dependencies from package.json
npm install

# This installs:
# - next (framework)
# - react & react-dom
# - three
# - @react-three/fiber
# - @react-three/drei
# - tailwindcss (styling)
# - typescript
```

**Installation time**: 2-5 minutes depending on internet speed

---

## Package.json - What's Included

Your `package.json` already contains:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next": "^14.0.0",
    "three": "^r128",              // ← Core 3D library
    "@react-three/fiber": "^8.15", // ← React renderer for Three.js
    "@react-three/drei": "^9.89"   // ← Pre-built 3D components
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0"
  }
}
```

---

## What Gets Installed

```
node_modules/
├── three/                    (Core 3D library)
├── @react-three/
│   ├── fiber/               (React renderer)
│   └── drei/                (Utility components)
├── react/
├── react-dom/
├── next/
├── tailwindcss/
└── ... (many other dependencies)
```

Total size: ~500-700 MB

---

## Verify Installation

After running `npm install`, verify with:

```bash
# Check if packages are installed
npm list three
npm list @react-three/fiber
npm list @react-three/drei

# Should show version numbers like:
# three@3.128.0
# @react-three/fiber@8.15.0
# @react-three/drei@9.89.0
```

---

## Next: Start Development Server

Once installation completes:

```bash
npm run dev
```

This starts the development server at http://localhost:3000

---

## Troubleshooting

**If npm install fails:**
- Clear cache: `npm cache clean --force`
- Delete node_modules folder: `rmdir /s node_modules`
- Try again: `npm install`

**If you get "command not found":**
- Restart PowerShell/Terminal after installing Node.js
- Verify Node.js installation: `node --version`

**If build errors occur:**
- Check Node.js version: `node --version` (should be v18+)
- Check npm version: `npm --version` (should be v9+)

