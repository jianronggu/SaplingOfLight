'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="w-full h-screen bg-black flex items-center justify-center overflow-hidden relative">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950"></div>

      {/* Animated gradient orbs - more refined */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-purple-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid pattern overlay for sophistication */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Content */}
      <div className={`relative z-10 text-center px-8 max-w-3xl transform transition-all duration-1500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}>

        {/* Top accent line - refined */}
        <div className="mb-12 flex justify-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
        </div>

        {/* Eyebrow text */}
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/70 mb-6 font-light">
          Digital Artwork Collection
        </p>

        {/* Main Title - more elegant */}
        <h1 className="text-7xl md:text-8xl font-light mb-4 tracking-tight leading-tight pb-8">
          <span className="block text-white">Sapling of Light</span>
        </h1>

        {/* Subtle divider */}
        <div className="h-px w-16 bg-gradient-to-r from-cyan-400/30 to-transparent mx-auto my-8"></div>

        {/* Refined subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light tracking-wide">
          A Meditative Journey
        </p>

        {/* Elegant description */}
        <p className="text-gray-400 text-lg mb-16 leading-relaxed max-w-2xl mx-auto font-light">
          Step into a digital realm where light and memory converge.
          Experience an ever-evolving artwork that responds to your presence,
          crafted to inspire contemplation and wonder.
        </p>

        {/* Features Grid - more elegant */}
        <div className="grid grid-cols-3 gap-8 mb-16 px-4">
          <div className="flex flex-col items-center gap-3 group">
            <div className="text-4xl transition-transform duration-500 group-hover:scale-110">🎮</div>
            <span className="text-sm text-gray-400 font-light tracking-wide">Interactive</span>
            <div className="h-px w-8 bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <div className="flex flex-col items-center gap-3 group">
            <div className="text-4xl transition-transform duration-500 group-hover:scale-110">✨</div>
            <span className="text-sm text-gray-400 font-light tracking-wide">Immersive</span>
            <div className="h-px w-8 bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <div className="flex flex-col items-center gap-3 group">
            <div className="text-4xl transition-transform duration-500 group-hover:scale-110">🎨</div>
            <span className="text-sm text-gray-400 font-light tracking-wide">Dynamic</span>
            <div className="h-px w-8 bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>

        {/* Premium Enter Gallery Button */}
        <div className="relative inline-block group">
          {/* Button glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>

          <Link
            href="/gallery"
            className="relative inline-block px-12 py-5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 text-white font-light text-lg rounded-lg border border-cyan-500/30 hover:border-cyan-400/60 shadow-lg backdrop-blur-sm transition-all duration-500 transform hover:scale-105 active:scale-95 tracking-wide"
          >
            <span className="flex items-center gap-3 justify-center">
              <span className="text-xl">→</span>
              Enter Gallery
              <span className="text-xl">←</span>
            </span>
          </Link>
        </div>

        {/* Elegant divider */}
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-gray-600/30 to-transparent mx-auto my-12"></div>

        {/* Refined instructions */}
        <p className="text-gray-500 text-xs font-light tracking-widest uppercase">
          Keyboard: R to reset • Space to pause • W/S to zoom
        </p>
      </div>

      {/* Refined floating particles - more sophisticated */}
      <div className="absolute top-20 left-20 w-1 h-1 bg-cyan-300 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute top-1/3 right-32 w-0.5 h-0.5 bg-blue-300 rounded-full opacity-40" style={{ animation: 'pulse 3s infinite' }}></div>
      <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-cyan-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-2/3 right-1/4 w-0.5 h-0.5 bg-purple-300 rounded-full opacity-30" style={{ animation: 'pulse 4s infinite' }}></div>

      {/* Bottom accent line */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-gray-600/20 to-transparent"></div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </main>
  );
}

