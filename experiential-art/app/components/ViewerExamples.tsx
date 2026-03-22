'use client';

/**
 * Gallery Viewer Customization Examples
 *
 * Shows different ways to customize the improved viewer experience.
 */

import ArtGalleryScene from '@/app/components/ArtGalleryScene';

// ============================================================================
// EXAMPLE 1: Default - Professional Gallery Feel
// ============================================================================
export function DefaultGalleryExample() {
  return (
    <ArtGalleryScene
      title="Crystalline Forms"
      description="A meditation on geometric perfection and light"
      modelPath="/models/crystal.glb"
      modelScale={1.8}
      accentColor="#00ffff"
      interactive={true}
    />
  );
}

// ============================================================================
// EXAMPLE 2: Luxury Gold Theme
// ============================================================================
export function LuxuryThemeExample() {
  return (
    <ArtGalleryScene
      title="Golden Abstraction"
      description="Exploring the intersection of value and form"
      modelPath="/models/gold-sculpture.glb"
      modelScale={2}
      accentColor="#ffd700"
      interactive={true}
    />
  );
}

// ============================================================================
// EXAMPLE 3: Minimal - No Description
// ============================================================================
export function MinimalExample() {
  return (
    <ArtGalleryScene
      title="Untitled #7"
      description=""  // Empty description hides subtitle
      modelPath="/models/minimal.glb"
      modelScale={1.5}
      accentColor="#ffffff"
      interactive={true}
    />
  );
}

// ============================================================================
// EXAMPLE 4: Bold Contemporary
// ============================================================================
export function BoldContemporaryExample() {
  return (
    <ArtGalleryScene
      title="KINETIC ENERGY"
      description="Vibrant, dynamic, full of motion"
      modelPath="/models/kinetic.glb"
      modelScale={1.6}
      accentColor="#ff1493"
      interactive={true}
    />
  );
}

// ============================================================================
// EXAMPLE 5: Subtle - Soft Purple
// ============================================================================
export function SubtleExample() {
  return (
    <ArtGalleryScene
      title="Ethereal Presence"
      description="A gentle exploration of light and shadow"
      modelPath="/models/ethereal.glb"
      modelScale={1.4}
      accentColor="#a855f7"
      interactive={true}
    />
  );
}

// ============================================================================
// EXAMPLE 6: Static View - No Interaction
// ============================================================================
export function StaticViewExample() {
  return (
    <ArtGalleryScene
      title="Suspended Moment"
      description="A carefully composed still moment in time"
      modelPath="/models/still.glb"
      modelScale={1.7}
      accentColor="#4d9de0"
      interactive={false}  // No rotation/zoom
    />
  );
}

// ============================================================================
// EXAMPLE 7: Large Scale Artwork
// ============================================================================
export function LargeScaleExample() {
  return (
    <ArtGalleryScene
      title="Monumental Form"
      description="Architectural, imposing, awe-inspiring"
      modelPath="/models/monument.glb"
      modelScale={3}  // Large
      modelPosition={[0, -0.5, 0]}  // Lower on screen
      accentColor="#ff9900"
      interactive={true}
    />
  );
}

// ============================================================================
// EXAMPLE 8: Intimate Small Scale
// ============================================================================
export function SmallScaleExample() {
  return (
    <ArtGalleryScene
      title="Delicate Fragment"
      description="Intricate, precious, demands close attention"
      modelPath="/models/delicate.glb"
      modelScale={0.8}  // Small
      accentColor="#20b2aa"
      interactive={true}
    />
  );
}

// ============================================================================
// EXAMPLE 9: Museum Quality - Professional
// ============================================================================
export function MuseumQualityExample() {
  return (
    <ArtGalleryScene
      title="UNTITLED (2024)"
      description="Digital sculpture • Mixed media • Variable dimensions"
      modelPath="/models/museum-piece.glb"
      modelScale={2}
      accentColor="#e8e8e8"  // Neutral
      interactive={true}
    />
  );
}

// ============================================================================
// EXAMPLE 10: Responsive - Works on All Devices
// ============================================================================
export function ResponsiveExample() {
  return (
    <ArtGalleryScene
      title="Responsive Design"
      description="Looks perfect on mobile, tablet, and desktop"
      modelPath="/models/responsive.glb"
      modelScale={1.5}
      accentColor="#6366f1"
      interactive={true}
    />
  );
}

// ============================================================================
// TEMPLATE: Create Your Own
// ============================================================================
export function YourOwnExample() {
  return (
    <ArtGalleryScene
      title="[Your Title]"
      description="[Your Description]"
      modelPath="/models/[your-file].glb"
      modelScale={1.5}  // Adjust size
      modelPosition={[0, 0, 0]}  // Adjust position
      accentColor="#00ff88"  // Pick color
      interactive={true}
    />
  );
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================
export default function ViewerExamples() {
  return <DefaultGalleryExample />;
}

