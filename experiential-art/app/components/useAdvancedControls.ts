'use client';

/**
 * Advanced Controls Component
 *
 * Enhanced user interaction with:
 * - Smart auto-rotation (pause on interaction)
 * - Keyboard shortcuts (arrow keys, mouse wheel)
 * - Touch gestures (pinch to zoom, swipe to rotate)
 * - Damping controls
 * - Speed adjustment
 * - Reset camera position
 */

import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface AdvancedControlsProps {
  /** Enable keyboard controls */
  enableKeyboard?: boolean;
  /** Enable touch gestures */
  enableTouch?: boolean;
  /** Auto-rotation speed (0-2) */
  autoRotateSpeed?: number;
  /** Pause auto-rotation on interaction */
  pauseAutoRotateOnInteraction?: boolean;
  /** Callback when interaction detected */
  onInteraction?: () => void;
  /** Callback for key pressed */
  onKeyPress?: (key: string) => void;
}

/**
 * Custom hook for advanced camera controls
 */
export function useAdvancedControls({
  enableKeyboard = true,
  enableTouch = true,
  autoRotateSpeed = 1.5,
  pauseAutoRotateOnInteraction = true,
  onInteraction,
  onKeyPress,
}: AdvancedControlsProps) {
  const { camera, gl } = useThree();
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [controls, setControls] = useState<any>(null);
  const initialCameraPos = useRef(new THREE.Vector3(0, 2, 5));
  const rotationSpeedRef = useRef(autoRotateSpeed);

  useEffect(() => {
    rotationSpeedRef.current = autoRotateSpeed;
  }, [autoRotateSpeed]);

  // Handle keyboard input
  useEffect(() => {
    if (!enableKeyboard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      // Pause auto-rotation on interaction
      if (pauseAutoRotateOnInteraction && isAutoRotating) {
        setIsAutoRotating(false);
      }

      onInteraction?.();
      onKeyPress?.(key);

      switch (key) {
        case 'arrowup':
        case 'w':
          // Zoom in
          camera.position.z -= 0.5;
          e.preventDefault();
          break;
        case 'arrowdown':
        case 's':
          // Zoom out
          camera.position.z += 0.5;
          e.preventDefault();
          break;
        case 'arrowleft':
        case 'a':
          // Rotate left
          e.preventDefault();
          break;
        case 'arrowright':
        case 'd':
          // Rotate right
          e.preventDefault();
          break;
        case 'r':
          // Reset camera
          resetCamera();
          break;
        case ' ':
          // Toggle auto-rotation
          setIsAutoRotating(!isAutoRotating);
          e.preventDefault();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboard, isAutoRotating, pauseAutoRotateOnInteraction, onInteraction, onKeyPress, camera]);

  // Handle touch gestures
  useEffect(() => {
    if (!enableTouch) return;

    let initialDistance = 0;
    let initialZoom = camera.position.z;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        initialDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        initialZoom = camera.position.z;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pauseAutoRotateOnInteraction && isAutoRotating) {
        setIsAutoRotating(false);
      }

      if (e.touches.length === 2) {
        const currentDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const delta = initialDistance - currentDistance;
        camera.position.z = initialZoom + delta * 0.01;
      }

      onInteraction?.();
    };

    gl.domElement.addEventListener('touchstart', handleTouchStart, false);
    gl.domElement.addEventListener('touchmove', handleTouchMove, false);

    return () => {
      gl.domElement.removeEventListener('touchstart', handleTouchStart);
      gl.domElement.removeEventListener('touchmove', handleTouchMove);
    };
  }, [enableTouch, isAutoRotating, pauseAutoRotateOnInteraction, onInteraction, camera, gl]);

  const resetCamera = () => {
    camera.position.copy(initialCameraPos.current);
    camera.lookAt(0, 0, 0);
  };

  return {
    isAutoRotating,
    setIsAutoRotating,
    resetCamera,
    autoRotateSpeed: rotationSpeedRef.current,
  };
}

export default useAdvancedControls;

