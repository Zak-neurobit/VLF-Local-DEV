'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTextScramble, useGlitchText, useTypewriter } from '@/hooks/useTextScramble';

interface MorphingTextProps {
  texts: string[];
  interval?: number;
  className?: string;
  type?: 'morph' | 'scramble' | 'glitch' | 'typewriter';
}

export function MorphingText({ 
  texts, 
  interval = 3000, 
  className = '',
  type = 'morph'
}: MorphingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentText = texts[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  if (type === 'scramble') {
    const { ref, displayText } = useTextScramble(currentText);
    return (
      <span ref={ref as any} className={className}>
        {displayText}
      </span>
    );
  }

  if (type === 'glitch') {
    const { ref, glitchedText } = useGlitchText(currentText);
    return (
      <span ref={ref as any} className={className}>
        {glitchedText}
      </span>
    );
  }

  if (type === 'typewriter') {
    const { ref, displayText } = useTypewriter(currentText);
    return (
      <span ref={ref as any} className={className}>
        {displayText}
      </span>
    );
  }

  // Default morph animation
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentIndex}
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
        transition={{ duration: 0.5 }}
        className={className}
      >
        {currentText}
      </motion.span>
    </AnimatePresence>
  );
}

// Advanced split text animation component
interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function SplitText({ text, className = '', delay = 0, stagger = 0.03 }: SplitTextProps) {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              className="inline-block"
              initial={{ opacity: 0, y: 50, rotateZ: -10 }}
              animate={{ opacity: 1, y: 0, rotateZ: 0 }}
              transition={{
                duration: 0.5,
                delay: delay + (wordIndex * word.length + charIndex) * stagger,
                type: 'spring',
                damping: 12,
              }}
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

// Gradient animated text
export function GradientText({ 
  text, 
  gradient = 'from-[#6B1F2E] via-[#C9974D] to-[#8B2635]',
  className = '' 
}: {
  text: string;
  gradient?: string;
  className?: string;
}) {
  return (
    <motion.span
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        backgroundSize: '200% 200%',
      }}
    >
      {text}
    </motion.span>
  );
}