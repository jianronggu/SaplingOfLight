'use client';

import EnhancedArtGallery from '@/app/components/EnhancedArtGallery';

export default function GalleryPage() {
  return (
    <EnhancedArtGallery
      title="Sapling of Light"
      description="A meditative piece exploring light and memories suspended in a digital realm."
      modelPath="/models/v1.glb"
      modelScale={0.15}
      interactive={true}
      accentColor="#00ff88"
      enableParticles={true}
      enableBloom={false}
      enableDynamicLighting={true}
      enableControlsPanel={true}
      enableKeyboardShortcuts={true}
    />
  );
}

