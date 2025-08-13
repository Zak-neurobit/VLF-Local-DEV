'use client';

import React, { useRef, useState } from 'react';

import { usePerspectiveParallax } from '@/hooks/useParallax';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  perspective?: number;
  scale?: number;
}

export function Card3D({
  children,
  className = '',
  depth = 20,
  perspective = 1000,
  scale = 1.05,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [depth, -depth]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-depth, depth]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}

                className={`relative ${className}`}
     }
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
      }}
    >
      <div
        className="relative h-full w-full"

      >
        {/* Card content */}
        <div className="relative h-full w-full rounded-xl bg-white shadow-2xl">{children}</div>

        {/* Glow effect */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[#6B1F2E]/20 to-[#C9974D]/20"
         }
         }
         }
        />

        {/* Shine effect */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
         % ${mouseY.get() * 100 + 50}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
          }}
         }
        />
      </div>
    </div>
  );
}

// Flip card component
export function FlipCard({
  front,
  back,
  className = '',
  flipDuration = 0.6,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  flipDuration?: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className={`relative h-full w-full ${className}`}}>
      <div
        className="relative h-full w-full cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
       }
       }
       }
      >
        {/* Front face */}
        <div className="absolute inset-0 rounded-xl"}>
          {front}
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 rounded-xl"

        >
          {back}
        </div>
      </div>
    </div>
  );
}

// 3D carousel card
export function CarouselCard3D({
  children,
  index,
  currentIndex,
  total,
}: {
  children: React.ReactNode;
  index: number;
  currentIndex: number;
  total: number;
}) {
  const offset = index - currentIndex;
  const angle = (offset * 360) / total;
  const z = -200;

  return (
    <div
      className="absolute h-full w-full"
     }
     }
     }
    >
      <div className="h-full w-full rounded-xl bg-white p-8 shadow-2xl">{children}</div>
    </div>
  );
}

// Parallax tilt card
export function ParallaxTiltCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { cardRef, rotateX, rotateY, z, scale } = usePerspectiveParallax();

  return (
    <div
      ref={cardRef as React.RefObject<HTMLDivElement>}

                className={`relative ${className}`}
     }
    >
      <div className="relative rounded-xl bg-gradient-to-br from-white to-gray-50 p-8 shadow-2xl">
        {children}
      </div>

      {/* Floating elements */}
      <div
        className="absolute -right-4 -top-4 h-8 w-8 rounded-full bg-gradient-to-br from-[#6B1F2E] to-[#C9974D]"
       }
      />
      <div
        className="absolute -bottom-4 -left-4 h-6 w-6 rounded-full bg-gradient-to-br from-[#C9974D] to-[#D4A574]"
       }
      />
    </div>
  );
}
