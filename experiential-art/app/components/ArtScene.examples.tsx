'use client';

/**
 * ArtScene Component Examples
 *
 * This file demonstrates various ways to use and customize the ArtScene component.
 * Copy and adapt these examples for your own projects.
 */

import ArtGalleryScene from '@/app/components/ArtGalleryScene';

// ============================================================================
// EXAMPLE 1: Minimal Setup (Default Behavior)
// ============================================================================
export function MinimalExample() {
  return <ArtGalleryScene />;
}

// ============================================================================
// EXAMPLE 2: Geometric Art (Fast Rotation, Gold Accent)
// ============================================================================
export function GeometricArtExample() {
  return (
    <ArtGalleryScene
      title="Geometric Exploration"
      description="An investigation into form, symmetry, and mathematical beauty through rotating geometry."
      accentColor="#ffd700"
      interactive={true}
    />
  );
}

// ============================================================================
// EXAMPLE 3: Organic Art (Slow, Meditative, Teal)
// ============================================================================
export function OrganicArtExample() {
  return (
    <ArtGalleryScene
      title="Flowing Forms"
      description="A contemplative piece exploring the intersection of nature and abstraction, inviting peaceful reflection."
      accentColor="#20b2aa"
      interactive={true}
    />
  );
}

// ============================================================================
// EXAMPLE 4: Bold & Energetic (Hot Pink, Fast Motion)
// ============================================================================
export function BoldArtExample() {
  return (
    <ArtGalleryScene
      title="Kinetic Energy"
      description="An explosive composition of light and motion, pushing the boundaries of digital form."
      accentColor="#ff1493"
      interactive={true}
    />
  );
}

// ============================================================================
// EXAMPLE 5: Mystical (Purple, Slow Floating)
// ============================================================================
export function MysticalArtExample() {
  return (
    <ArtGalleryScene
      title="Ethereal Presence"
      description="A meditation on the unseen forces that shape our perception and consciousness."
      accentColor="#a855f7"
      interactive={true}
    />
  );
}

// ============================================================================
// EXAMPLE 6: Dark & Moody (Magenta Rim Light)
// ============================================================================
export function DarkMoodyExample() {
  return (
    <ArtGalleryScene
      title="Shadows & Light"
      description="Exploring the drama between darkness and illumination, isolation and connection."
      accentColor="#ff0088"
      interactive={true}
    />
  );
}

// ============================================================================
// EXAMPLE 7: Tech/Modern (Original Cyan, Interactive)
// ============================================================================
export function TechArtExample() {
  return (
    <ArtGalleryScene
      title="Digital Consciousness"
      description="A visualization of data, networks, and the emergence of artificial awareness."
      accentColor="#00ff88"
      interactive={true}
    />
  );
}

// ============================================================================
// EXAMPLE 8: Static Gallery View (No Interaction)
// ============================================================================
export function StaticViewExample() {
  return (
    <ArtGalleryScene
      title="Untouchable Beauty"
      description="A controlled presentation designed for focused contemplation without user interaction."
      accentColor="#4d9de0"
      interactive={false}
    />
  );
}

// ============================================================================
// EXAMPLE 9: Multi-Piece Gallery (Gallery List Component)
// ============================================================================
const artworks = [
  {
    id: 1,
    title: 'Recursive Dreams',
    description: 'Fractals spiraling infinitely inward.',
    color: '#00ff88',
  },
  {
    id: 2,
    title: 'Crystalline Lattice',
    description: 'Exploring molecular structures and bonds.',
    color: '#ffd700',
  },
  {
    id: 3,
    title: 'Void Echo',
    description: 'Sound waves visualized in space.',
    color: '#ff0088',
  },
];

export function ArtworkGalleryList() {
  return (
    <div className="w-full h-screen overflow-hidden">
      {artworks.map((artwork) => (
        <div key={artwork.id} className="w-full h-screen relative">
          <ArtGalleryScene
            title={artwork.title}
            description={artwork.description}
            accentColor={artwork.color}
            interactive={true}
          />
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// EXAMPLE 10: Template for Your Own Artwork
// ============================================================================
/**
 * HOW TO CREATE YOUR OWN:
 *
 * 1. Choose a title and description
 * 2. Pick an accent color that matches your art's mood
 * 3. Paste this template and fill it in
 */
export function MyCustomArtExample() {
  return (
    <ArtGalleryScene
      // TODO: Set your artwork title
      title="[Your Artwork Title]"

      // TODO: Describe your piece
      description="[Your artwork description - 2-3 sentences about the piece, its inspiration, and what it means]"

      // TODO: Choose your color
      // Popular options:
      // - Cyan: "#00ff88" (tech, modern)
      // - Gold: "#ffd700" (luxury, warm)
      // - Purple: "#a855f7" (mystical, premium)
      // - Pink: "#ff1493" (bold, energetic)
      // - Teal: "#20b2aa" (calm, balanced)
      // - Magenta: "#ff0088" (dramatic, moody)
      accentColor="#00ff88"

      // TODO: Set interactivity
      // true = user can rotate, zoom, pan (with orbit controls)
      // false = static, contemplative view
      interactive={true}
    />
  );
}

// ============================================================================
// COLOR REFERENCE & MOOD GUIDE
// ============================================================================
/**
 * COLOR PALETTE SUGGESTIONS
 *
 * COOL TONES (Calm, Tech, Modern):
 * - Cyan:       "#00ff88" → Modern, tech, energetic
 * - Teal:       "#20b2aa" → Balanced, calming, nature
 * - Blue:       "#4d9de0" → Serene, trust, depth
 * - Purple:     "#a855f7" → Mystical, spiritual, premium
 *
 * WARM TONES (Energetic, Luxurious, Natural):
 * - Gold:       "#ffd700" → Luxurious, warm, valuable
 * - Orange:     "#ff6b35" → Energetic, creative, fun
 * - Red:        "#ff3333" → Powerful, dramatic, intense
 *
 * BOLD TONES (Expressive, Contemporary):
 * - Magenta:    "#ff0088" → Bold, dramatic, moody
 * - Pink:       "#ff1493" → Contemporary, vibrant, bold
 * - Lime:       "#00ff00" → Striking, artificial, energetic
 *
 * RECOMMENDATION:
 * Match accent color to your artwork's emotional intent.
 * Test a few options to see what resonates!
 */

// ============================================================================
// ANIMATION BEHAVIOR GUIDE
// ============================================================================
/**
 * MOTION CHARACTERISTICS (Using ArtScene defaults):
 *
 * Rotation Speed: 0.5 (medium)
 * - Effect: Gentle continuous spin on both axes
 * - Period: ~78 seconds for full Y-axis rotation
 *
 * Float Speed: 0.8 (medium)
 * - Effect: Subtle bobbing up and down
 * - Period: ~12.5 seconds for full float cycle
 *
 * Pulsing Glow: Built-in
 * - Effect: Emissive intensity pulses with scene rhythm
 * - Period: ~7.85 seconds
 *
 * Camera Drift: Built-in
 * - Effect: Subtle camera movement for depth perception
 * - X-axis Period: ~42 seconds
 * - Z-axis Period: ~63 seconds
 *
 * TOTAL SCENE PERIOD: ~126 seconds (2 minutes)
 * After ~2 minutes, animations loop and feel "fresh" again
 */

export default function ExamplesShowcase() {
  return (
    <div>
      {/* Use individual examples or the custom template above */}
      {/* <GeometricArtExample /> */}
      {/* <MyCustomArtExample /> */}
      <MinimalExample />
    </div>
  );
}

