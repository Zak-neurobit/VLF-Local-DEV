'use client';

import { useRef, useEffect, useState } from 'react';
import { useMotionValue, useAnimation, PanInfo } from 'framer-motion';

interface SwipeOptions {
  threshold?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

export function useSwipeGesture({
  threshold = 50,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
}: SwipeOptions = {}) {
  const handleDragEnd = (event: any, info: PanInfo) => {
    const { offset, velocity } = info;

    if (Math.abs(offset.x) > Math.abs(offset.y)) {
      // Horizontal swipe
      if (offset.x > threshold && velocity.x > 0) {
        onSwipeRight?.();
      } else if (offset.x < -threshold && velocity.x < 0) {
        onSwipeLeft?.();
      }
    } else {
      // Vertical swipe
      if (offset.y > threshold && velocity.y > 0) {
        onSwipeDown?.();
      } else if (offset.y < -threshold && velocity.y < 0) {
        onSwipeUp?.();
      }
    }
  };

  return { onDragEnd: handleDragEnd };
}

// Main export for backward compatibility
export const useGestures = useSwipeGesture;

// Pinch to zoom hook
export function usePinchZoom() {
  const [scale, setScale] = useState(1);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let initialDistance = 0;
    let currentScale = 1;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        initialDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && initialDistance > 0) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );

        currentScale = Math.min(Math.max(currentDistance / initialDistance, 0.5), 3);
        setScale(currentScale);
      }
    };

    const handleTouchEnd = () => {
      initialDistance = 0;
      if (currentScale < 1) {
        setScale(1);
      }
    };

    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove);
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return {
    ref: elementRef,
    scale,
  };
}

// Shake detection
export function useShakeDetection(onShake: () => void, threshold = 15) {
  useEffect(() => {
    let lastX: number | null = null;
    let lastY: number | null = null;
    let lastZ: number | null = null;
    let lastTime = Date.now();

    const handleMotion = (event: DeviceMotionEvent) => {
      const current = event.accelerationIncludingGravity;
      if (!current) return;

      const currentTime = Date.now();
      const timeDiff = currentTime - lastTime;

      if (timeDiff > 100) {
        const diffX = Math.abs((lastX ?? 0) - (current.x ?? 0));
        const diffY = Math.abs((lastY ?? 0) - (current.y ?? 0));
        const diffZ = Math.abs((lastZ ?? 0) - (current.z ?? 0));

        if (diffX + diffY + diffZ > threshold) {
          onShake();
        }

        lastX = current.x;
        lastY = current.y;
        lastZ = current.z;
        lastTime = currentTime;
      }
    };

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion);
    }

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [onShake, threshold]);
}

// Long press detection
export function useLongPress(callback: () => void, delay = 500) {
  const [isPressed, setIsPressed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const start = () => {
    setIsPressed(true);
    timeoutRef.current = setTimeout(() => {
      callback();
    }, delay);
  };

  const stop = () => {
    setIsPressed(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
    isPressed,
  };
}

// Double tap detection
export function useDoubleTap(callback: () => void, delay = 300) {
  const [lastTap, setLastTap] = useState(0);

  const handleTap = () => {
    const now = Date.now();
    if (now - lastTap < delay) {
      callback();
    }
    setLastTap(now);
  };

  return {
    onClick: handleTap,
    onTouchEnd: handleTap,
  };
}

// Drag to reorder hook
export function useDragToReorder<T>(items: T[], onReorder: (newItems: T[]) => void) {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    onReorder(newItems);
  };

  return {
    onDragEnd: handleDragEnd,
  };
}
