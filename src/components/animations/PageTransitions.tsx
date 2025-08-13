'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

// Page transition wrapper
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <div
        key={pathname}
       , animate: { opacity: 1 }, exit: { opacity: 0 } }}
       }
      >
        {children}
      </div>
    </>
  );
}

// Curtain transition
export function CurtainTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <div key={pathname}

                className="relative">
        {/* Curtain overlay */}
        <div
          className="pointer-events-none fixed inset-0 z-50 bg-gradient-to-br from-[#6B1F2E] to-[#8B2635]"
         }
         }
         }
         }
         }
        />

        {/* Content */}
        <div
         }
         }
         }
         }
        >
          {children}
        </div>
      </div>
    </>
  );
}

// Slide transition
export function SlideTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <div
        key={pathname}
       }
       }
       }
       }
      >
        {children}
      </div>
    </>
  );
}

// Zoom transition
export function ZoomTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <div
        key={pathname}
       }
       }
       }
       }
      >
        {children}
      </div>
    </>
  );
}

// Morph transition with SVG masks
export function MorphTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <div key={pathname}

                className="relative">
        {/* SVG Mask */}
        <svg className="pointer-events-none fixed inset-0 z-50 h-full w-full">
          <defs>
            <mask id="morph-mask">
              <circle
                cx="50%"
                cy="50%"
                fill="white"
               }
               }
               }
               }
              />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#gradient)" mask="url(#morph-mask)" />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6B1F2E" />
              <stop offset="100%" stopColor="#C9974D" />
            </linearGradient>
          </defs>
        </svg>

        {/* Content */}
        <div
         }
         }
         }
         }
        >
          {children}
        </div>
      </div>
    </>
  );
}

// Perspective page flip
export function FlipTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <div key={pathname}

                className="relative"}>
        <div
         }
         }
         }
         }
         }
        >
          {children}
        </div>
      </div>
    </>
  );
}

// Liquid page transition
export function LiquidTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <div key={pathname}

                className="relative">
        {/* Liquid overlay */}
        <svg className="pointer-events-none fixed inset-0 z-50 h-full w-full">
          <defs>
            <filter id="liquid-transition">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" seed="2" />
              <feColorMatrix values="0 0 0 0 0.42 0 0 0 0 0.12 0 0 0 0 0.18 0 0 0 1 0" />
              <feComponentTransfer>
                <feFuncA
                  type="discrete"
                  tableValues="0 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 1"
                />
              </feComponentTransfer>
              <feGaussianBlur stdDeviation="1" />
            </filter>
          </defs>
          <rect
            width="100%"
            height="100%"
            filter="url(#liquid-transition)"
           }
           }
           }
           }
          />
        </svg>

        {/* Content */}
        <div
         }
         }
         }
         }
        >
          {children}
        </div>
      </div>
    </>
  );
}

// Multi-layer transition
export function MultiLayerTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const layers = [
    { color: '#6B1F2E', delay: 0 },
    { color: '#8B2635', delay: 0.1 },
    { color: '#C9974D', delay: 0.2 },
  ];

  return (
    <>
      <div key={pathname}

                className="relative">
        {/* Multiple sliding layers */}
        {layers.map((layer, index) => (
          <div
            key={index}

                className="pointer-events-none fixed inset-0 z-50"
           }
           }
           }
           }
           }
          />
        ))}

        {/* Content */}
        <div
         }
         }
         }
         }
        >
          {children}
        </div>
      </div>
    </>
  );
}
