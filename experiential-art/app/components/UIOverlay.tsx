'use client';

import { useState, useEffect, useRef } from 'react';

interface UIOverlayProps {
  title?: string;
  description?: string;
}

export default function UIOverlay({ title, description }: UIOverlayProps) {
  const [visible, setVisible] = useState(true);
  const hideTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleMouseMove = () => {
      setVisible(true);
      clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setVisible(false), 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <>
      {/* Top bar */}
      <div
        className={`absolute top-0 left-0 right-0 z-10 px-8 py-6 transition-opacity duration-500 ${
          visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-light tracking-widest">EXPERIENTIAL ART</h1>
          <div className="text-sm font-light opacity-70">Gallery</div>
        </div>
      </div>

      {/* Center artwork info */}
      {(title || description) && (
        <div
          className={`absolute top-1/2 left-8 right-8 z-10 transform -translate-y-1/2 transition-opacity duration-500 pointer-events-none ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-md">
            {title && (
              <h2 className="text-3xl font-light tracking-wider mb-4">{title}</h2>
            )}
            {description && (
              <p className="text-sm font-light opacity-70 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Bottom info */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-10 px-8 py-6 transition-opacity duration-500 ${
          visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex justify-between items-end">
          <div className="text-sm font-light opacity-70">
            <p>Drag to rotate • Scroll to zoom</p>
          </div>
          <div className="text-right text-sm font-light opacity-70">
            <p>© 2024 Experiential Art</p>
          </div>
        </div>
      </div>

      {/* Center info - always visible */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5 pointer-events-none">
        <div className="text-center">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-accent to-transparent mx-auto mb-4" />
          <p className="text-sm font-light tracking-wider opacity-50">Scroll to explore</p>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-accent to-transparent mx-auto mt-4" />
        </div>
      </div>
    </>
  );
}



