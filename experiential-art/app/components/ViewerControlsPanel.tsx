'use client';

/**
 * Viewer Controls Panel
 *
 * Interactive UI for controlling:
 * - Lighting intensity
 * - Rotation speed
 * - Auto-rotation toggle
 * - Camera reset
 * - Zoom controls
 * - Keyboard shortcut hints
 */

import { useState, useEffect } from 'react';
import styles from './ViewerControlsPanel.module.css';

interface ViewerControlsPanelProps {
  /** Initial lighting intensity (0-2) */
  initialLightingIntensity?: number;
  /** Initial rotation speed (0-2) */
  initialRotationSpeed?: number;
  /** Callback when lighting intensity changes */
  onLightingIntensityChange?: (intensity: number) => void;
  /** Callback when rotation speed changes */
  onRotationSpeedChange?: (speed: number) => void;
  /** Callback when auto-rotation toggled */
  onAutoRotateToggle?: (enabled: boolean) => void;
  /** Callback to reset camera */
  onResetCamera?: () => void;
  /** Show keyboard shortcuts */
  showKeyboardShortcuts?: boolean;
  /** Position: bottom-right, bottom-left, top-right, top-left */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export default function ViewerControlsPanel({
  initialLightingIntensity = 1,
  initialRotationSpeed = 1,
  onLightingIntensityChange,
  onRotationSpeedChange,
  onAutoRotateToggle,
  onResetCamera,
  showKeyboardShortcuts = true,
  position = 'bottom-right',
}: ViewerControlsPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lightingIntensity, setLightingIntensity] = useState(initialLightingIntensity);
  const [rotationSpeed, setRotationSpeed] = useState(initialRotationSpeed);
  const [autoRotateEnabled, setAutoRotateEnabled] = useState(true);
  const [showShortcuts, setShowShortcuts] = useState(showKeyboardShortcuts);

  useEffect(() => {
    onLightingIntensityChange?.(lightingIntensity);
  }, [lightingIntensity, onLightingIntensityChange]);

  useEffect(() => {
    onRotationSpeedChange?.(rotationSpeed);
  }, [rotationSpeed, onRotationSpeedChange]);

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 font-sans`}>
      {/* Compact Control Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center text-white font-bold shadow-lg backdrop-blur-sm"
        title="Toggle controls"
      >
        ⚙️
      </button>

      {/* Expanded Control Panel */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 w-72 bg-black/80 backdrop-blur-md rounded-lg p-6 shadow-2xl border border-cyan-500/30 space-y-6 animate-in fade-in duration-300">

          {/* Header */}
          <div className="flex justify-between items-center border-b border-cyan-500/20 pb-4">
            <h3 className="text-lg font-bold text-cyan-400">Viewer Controls</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>
          </div>

          {/* Lighting Intensity Control */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-200 flex justify-between">
              <span>Lighting Intensity</span>
              <span className="text-cyan-400">{lightingIntensity.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={lightingIntensity}
              onChange={(e) => setLightingIntensity(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="text-xs text-gray-500">Adjust scene brightness</div>
          </div>

          {/* Rotation Speed Control */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-200 flex justify-between">
              <span>Rotation Speed</span>
              <span className="text-cyan-400">{rotationSpeed.toFixed(1)}x</span>
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={rotationSpeed}
              onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="text-xs text-gray-500">Control auto-rotation speed</div>
          </div>

          {/* Auto-Rotate Toggle */}
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={autoRotateEnabled}
                onChange={(e) => {
                  setAutoRotateEnabled(e.target.checked);
                  onAutoRotateToggle?.(e.target.checked);
                }}
                className="w-4 h-4 rounded accent-cyan-500 cursor-pointer"
              />
              <span className="ml-3 text-sm font-semibold text-gray-200 group-hover:text-cyan-400 transition">
                Auto-Rotate
              </span>
            </label>
            <div className="text-xs text-gray-500">Toggle automatic rotation</div>
          </div>

          {/* Reset Camera Button */}
          <button
            onClick={() => onResetCamera?.()}
            className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/40 hover:to-blue-500/40 border border-cyan-500/50 rounded-lg text-cyan-400 font-semibold transition-all duration-200 text-sm"
          >
            Reset Camera
          </button>

          {/* Keyboard Shortcuts */}
          {showShortcuts && (
            <div className="border-t border-cyan-500/20 pt-4 space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-semibold text-gray-200">Keyboard Shortcuts</h4>
                <button
                  onClick={() => setShowShortcuts(!showShortcuts)}
                  className="text-xs text-gray-500 hover:text-cyan-400"
                >
                  {showShortcuts ? '−' : '+'}
                </button>
              </div>
              <div className="text-xs text-gray-400 space-y-1">
                <div><kbd className="bg-gray-800 px-2 py-1 rounded">↑/W</kbd> Zoom in</div>
                <div><kbd className="bg-gray-800 px-2 py-1 rounded">↓/S</kbd> Zoom out</div>
                <div><kbd className="bg-gray-800 px-2 py-1 rounded">R</kbd> Reset camera</div>
                <div><kbd className="bg-gray-800 px-2 py-1 rounded">Space</kbd> Toggle rotation</div>
              </div>
            </div>
          )}

          {/* Info Footer */}
          <div className="text-xs text-gray-500 border-t border-cyan-500/20 pt-4">
            💡 Drag to rotate • Scroll to zoom • Press R to reset
          </div>
        </div>
      )}
    </div>
  );
}

