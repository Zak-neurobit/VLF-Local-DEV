'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface TextScrambleOptions {
  duration?: number;
  characters?: string;
  revealDelay?: number;
  loop?: boolean;
}

export function useTextScramble(
  text: string,
  {
    duration = 2000,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*',
    revealDelay = 50,
    loop = false,
  }: TextScrambleOptions = {}
) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: !loop });
  const frameRef = useRef<number>(0);
  const iterationRef = useRef(0);

  useEffect(() => {
    if (!isInView) return;

    const scramble = () => {
      const progress = iterationRef.current / (duration / 16);
      const revealedLength = Math.floor(progress * text.length);

      const scrambled = text
        .split('')
        .map((char, index) => {
          if (index < revealedLength) {
            return text[index];
          }
          if (char === ' ') return ' ';
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join('');

      setDisplayText(scrambled);

      if (progress < 1) {
        iterationRef.current += 16;
        frameRef.current = requestAnimationFrame(scramble);
      } else if (loop) {
        setTimeout(() => {
          iterationRef.current = 0;
          scramble();
        }, revealDelay + 1000);
      }
    };

    const timer = setTimeout(() => {
      scramble();
    }, revealDelay);

    return () => {
      clearTimeout(timer);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [text, duration, characters, revealDelay, isInView, loop]);

  return {
    ref,
    displayText,
  };
}

// Glitch text effect
export function useGlitchText(text: string, intensity: number = 0.1) {
  const [glitchedText, setGlitchedText] = useState(text);
  const ref = useRef<HTMLElement>(null);
  const isHovered = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
    let intervalId: NodeJS.Timeout;

    const startGlitch = () => {
      isHovered.current = true;
      intervalId = setInterval(() => {
        if (!isHovered.current) {
          setGlitchedText(text);
          clearInterval(intervalId);
          return;
        }

        const glitched = text
          .split('')
          .map(char => {
            if (Math.random() < intensity) {
              return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }
            return char;
          })
          .join('');

        setGlitchedText(glitched);
      }, 50);
    };

    const stopGlitch = () => {
      isHovered.current = false;
    };

    element.addEventListener('mouseenter', startGlitch);
    element.addEventListener('mouseleave', stopGlitch);

    return () => {
      element.removeEventListener('mouseenter', startGlitch);
      element.removeEventListener('mouseleave', stopGlitch);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, intensity]);

  return {
    ref,
    glitchedText,
  };
}

// Typewriter effect
export function useTypewriter(
  text: string,
  {
    speed = 50,
    delay = 0,
    loop = false,
    cursor = true,
  }: {
    speed?: number;
    delay?: number;
    loop?: boolean;
    cursor?: boolean;
  } = {}
) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(cursor);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: !loop });

  useEffect(() => {
    if (!isInView) return;

    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
        timeoutId = setTimeout(type, speed);
      } else if (loop) {
        setTimeout(() => {
          currentIndex = 0;
          type();
        }, 1000);
      }
    };

    const startTimeout = setTimeout(() => {
      type();
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay, isInView, loop]);

  useEffect(() => {
    if (!cursor) return;

    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, [cursor]);

  return {
    ref,
    displayText: displayText + (showCursor ? '|' : ''),
  };
}
