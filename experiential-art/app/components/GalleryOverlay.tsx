'use client';

/**
 * Gallery Overlay Component
 *
 * Elegant, minimal overlay for gallery-like presentation.
 * Features:
 * - Responsive design (desktop & mobile)
 * - Elegant fade animations
 * - Gallery-like title/subtitle layout
 * - Auto-hide on interaction
 * - Touch-friendly on mobile
 */

import { useState, useEffect, useRef } from 'react';

interface GalleryOverlayProps {
  /** Artwork title */
  title?: string;
  /** Artwork subtitle/description */
  subtitle?: string;
  /** Accent color for underline/accents */
  accentColor?: string;
  /** Show loading indicator */
  isLoading?: boolean;
}

export default function GalleryOverlay({
  title = 'Untitled',
  subtitle = 'An immersive experience',
  accentColor = '#00ff88',
  isLoading = false,
}: GalleryOverlayProps) {
  const [isVisible, setIsVisible] = useState(true);
  const hideTimer = useRef<NodeJS.Timeout>();
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      // Show briefly, then hide
      setIsVisible(true);
      setHasInteracted(true);
      clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setIsVisible(false), 2000);
    };

    // Listen for mouse movement and touch
    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    // Show initially for 4 seconds
    hideTimer.current = setTimeout(() => {
      if (!hasInteracted) setIsVisible(false);
    }, 4000);

    return () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      clearTimeout(hideTimer.current);
    };
  }, [hasInteracted]);

//   if (isLoading) {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
//         <div className="text-center">
//           {/* Animated loading spinner */}
//           <div className="mb-6 flex justify-center">
//             <div
//               className="w-12 h-12 rounded-full border-2 border-transparent animate-spin"
//               style={{
//                 borderTopColor: accentColor,
//                 borderRightColor: accentColor,
//               }}
//             />
//           </div>
//           <p className="text-sm font-light tracking-widest text-white opacity-70">
//             LOADING ARTWORK...
//           </p>
//         </div>
//       </div>
//     );
//   }

  return (
    <>
      {/* Title/Subtitle Overlay - Top Left */}
      <div
        className={`fixed top-0 left-0 z-40 pointer-events-none transition-all duration-500 ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2'
        }`}
      >
        <div className="p-6 sm:p-8 md:p-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wider text-white mb-2">
            {title}
          </h1>
          <div
            className="h-px mb-4"
            style={{ background: accentColor, width: '60px' }}
          />
          <p className="text-xs sm:text-sm md:text-base font-light tracking-wide text-white opacity-60 max-w-xs">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Instructions Overlay - Bottom Right */}
      <div
        className={`fixed bottom-0 right-0 z-40 pointer-events-none transition-all duration-500 ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="p-6 sm:p-8 md:p-12 text-right">
          <p className="text-xs sm:text-sm font-light tracking-widest text-white opacity-50">
            DRAG TO ROTATE • SCROLL TO ZOOM
          </p>
          <p className="text-xs sm:text-xs font-light tracking-widest text-white opacity-30 mt-3">
            MOVE TO REVEAL
          </p>
        </div>
      </div>

      {/* Mobile-only hint */}
      <div className="md:hidden fixed bottom-0 left-0 z-40 pointer-events-none p-6">
        <p className="text-xs font-light tracking-widest text-white opacity-40">
          TOUCH TO INTERACT
        </p>
      </div>
    </>
  );
}

