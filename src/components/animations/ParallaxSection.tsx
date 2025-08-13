'use client';

import React from 'react';

import { useMultiLayerParallax } from '@/hooks/useParallax';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  layers?: number;
}

export function ParallaxSection({ children, className = '', layers = 3 }: ParallaxSectionProps) {
  const { containerRef, layerEffects, scrollYProgress } = useMultiLayerParallax(layers);

  // Background gradient animation
  const gradientY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]);

  return (
    <section ref={containerRef as React.RefObject<HTMLElement>}

                className={`relative overflow-hidden ${className}`}>
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#6B1F2E] via-[#8B2635] to-[#C9974D]"
       }
      />

      {/* Parallax layers */}
      {React.Children.map(children, (child, index) => {
        if (index >= layers) return null;
        const effect = layerEffects[index];
        if (!effect) return null;

        return (
          <div
            className="relative"
           px)`,
            }}
          >
            {child}
          </div>
        );
      })}
    </section>
  );
}

// Advanced hero parallax component
export function ParallaxHero({
  title,
  subtitle,
  backgroundImage,
  overlayOpacity = 0.5,
}: {
  title: string;
  subtitle: string;
  backgroundImage: string;
  overlayOpacity?: number;
}) {
  const { scrollYProgress } = useScroll();

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background image with parallax */}
      <div
        className="absolute inset-0"

      >
        <div
          className="absolute inset-0 bg-cover bg-center"
         )` }}
        />
        <div className="absolute inset-0 bg-black"} />
      </div>

      {/* Content */}
      <div
        className="relative z-10 flex h-full items-center justify-center text-center"

      >
        <div className="max-w-4xl px-4">
          <h1
className="mb-6 text-5xl font-bold text-white md:text-7xl"
          >
            {title}
          </h1>
          <p
className="text-xl text-white/90 md:text-2xl"
          >
            {subtitle}
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
       }
       }
      >
        <div className="h-16 w-8 rounded-full border-2 border-white/50">
          <div
            className="mx-auto mt-2 h-3 w-3 rounded-full bg-white"
           }
           }
          />
        </div>
      </div>
    </div>
  );
}
