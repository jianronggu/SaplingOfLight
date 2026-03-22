# Experiential Art Website

A full-screen immersive experiential art website built with Next.js, React, and Three.js.

## Project Structure

```
experiential-art/
├── app/
│   ├── (scenes)/              # Route groups for different art scenes
│   │   └── gallery/           # Main gallery scene
│   │       └── page.tsx       # Gallery page component
│   ├── components/            # Reusable React components
│   │   ├── Scene3D.tsx        # 3D scene component using Three.js
│   │   └── UIOverlay.tsx      # Minimal overlay UI
│   ├── lib/                   # Utility functions and helpers
│   ├── globals.css            # Global styles and resets
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── public/
│   └── models/                # 3D model files (GLTF, OBJ, etc.)
├── styles/                    # Additional style files (if needed)
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── postcss.config.js          # PostCSS configuration
└── package.json               # Dependencies and scripts
```

## Setup Instructions

### 1. Install Node.js
Download and install [Node.js LTS](https://nodejs.org/) for your system.

### 2. Install Dependencies
```bash
cd experiential-art
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Full-Screen Immersive Canvas**: Central 3D artwork with WebGL rendering
- **Minimal Overlay UI**: Auto-hiding controls and information
- **Interactive Controls**: Orbit controls for 3D interaction
- **Responsive Design**: Works on desktop and mobile
- **Scalable Architecture**: Easy to add more scenes and artworks
- **Dark Theme**: Modern minimal aesthetic with custom color palette

## Key Technologies

- **Next.js 14+**: React framework with app router
- **React Three Fiber**: React renderer for Three.js
- **Drei**: Useful helpers for React Three Fiber
- **Three.js**: 3D graphics library
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe development

## Customization

### Adding New Scenes
1. Create a new folder in `app/(scenes)/`
2. Add a `page.tsx` file with your scene layout
3. Create custom 3D components in `app/components/`

### Modifying the 3D Scene
Edit `app/components/Scene3D.tsx` to:
- Change geometry and materials
- Add animations
- Load 3D models from `/public/models/`
- Implement interaction logic

### Styling
- Update `tailwind.config.js` for color schemes
- Modify `app/globals.css` for global styles
- Component-level styles use Tailwind classes

## Adding 3D Models

Place your 3D model files in `public/models/` and load them in Scene3D.tsx:

```typescript
import { useGLTF } from '@react-three/drei';

const model = useGLTF('/models/your-model.gltf');
```

## Performance Tips

- Use `Suspense` for loading states
- Compress 3D models
- Optimize camera settings
- Consider LOD (Level of Detail) for complex models
- Test on target devices

## License

MIT

