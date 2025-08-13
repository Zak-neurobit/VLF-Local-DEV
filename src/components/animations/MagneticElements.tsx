'use client';

import React from 'react';

import { useMagneticHover, useMagneticCursor } from '@/hooks/useMagneticHover';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  onClick,
  className = '',
  strength = 0.5,
}: MagneticButtonProps) {
  const { ref, x, y, scale, isHovered } = useMagneticHover({ strength });

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}

                onClick={onClick}

                className={`relative overflow-hidden rounded-lg bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] px-8 py-4 font-semibold text-white ${className}`}
     }
     }
    >
      {/* Ripple effect on hover */}
      <div
        className="absolute inset-0 bg-white"
       }
       }
       }
       }
      />

      <span className="relative z-10">{children}</span>
    </button>
  );
}

// Magnetic icon with rotation
export function MagneticIcon({
  icon: Icon,
  size = 24,
  className = '',
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  size?: number;
  className?: string;
}) {
  const { ref, x, y, scale, isHovered } = useMagneticHover({ strength: 0.3 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}

                className={`inline-flex items-center justify-center rounded-full p-3 ${className}`}
     }
      }}
    >
      <Icon size={size className={isHovered ? 'text-[#C9974D]' : 'text-[#6B1F2E]'} />
    </div>
  );
}

// Magnetic card with depth effect
export function MagneticCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, x, y, scale, isHovered } = useMagneticHover({ strength: 0.2, radius: 300 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}

                className={`relative overflow-hidden rounded-xl bg-white shadow-lg ${className}`}
     }
    >
      {/* Background gradient that follows mouse */}
      <div
        className="absolute inset-0 bg-gradient-radial from-[#6B1F2E]/10 to-transparent"
       }
       % ${y.get() + 50}%, rgba(107, 31, 46, 0.1) 0%, transparent 70%)`
            : undefined,
        }}
      />

      {children}

      {/* Border glow effect */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl"
       }
       }
       }
      />
    </div>
  );
}

// Custom magnetic cursor
export function MagneticCursor() {
  const { cursorRef, x, y, isVisible } = useMagneticCursor();

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}

                className="pointer-events-none fixed z-50 h-4 w-4 rounded-full bg-[#6B1F2E] mix-blend-difference"
       }
       }
      />

      {/* Cursor trail */}
      <div
        className="pointer-events-none fixed z-40 h-8 w-8 rounded-full border-2 border-[#6B1F2E]/30"
       }
       }
       }
      />
    </>
  );
}

// Magnetic navigation menu
function MagneticNavItem({
  item,
}: {
  item: { label: string; href: string; icon?: React.ComponentType<{ className?: string }> };
}) {
  const { ref, x, y, isHovered } = useMagneticHover({ strength: 0.3 });

  return (
    <a
      ref={ref as React.RefObject<HTMLAnchorElement>}

                href={item.href}

                className="group relative flex items-center space-x-2 text-gray-700 transition-colors hover:text-[#6B1F2E]"

    >
      {item.icon && (
        <span}>
          <item.icon className="h-5 w-5" />
        </span>
      )}
      <span className="font-medium">{item.label}</span>

      {/* Underline effect */}
      <div
        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#6B1F2E] to-[#C9974D]"
       }
       }
       }
      />
    </a>
  );
}

export function MagneticNav({
  items,
}: {
  items: { label: string; href: string; icon?: React.ComponentType<{ className?: string }> }[];
}) {
  return (
    <nav className="flex space-x-8">
      {items.map((item, index) => (
        <MagneticNavItem key={index} item={item} />
      ))}
    </nav>
  );
}
