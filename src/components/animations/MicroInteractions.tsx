'use client';

import React, { useState } from 'react';
// Canvas confetti removed;

// Ripple effect button
export function RippleButton({
  children,
  onClick,
  className = '',
  color = 'rgba(255, 255, 255, 0.5)',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  color?: string;
}) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples([...ripples, { x, y, id }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 1000);

    onClick?.();
  };

  return (
    <button onClick={handleClick} className={`relative overflow-hidden ${className}`}>
      <>
        {ripples.map(ripple => (
          <span
            key={ripple.id}

                className="absolute rounded-full"           }
           }
          />
        ))}
      </>
      <span className="relative z-10">{children}</span>
    </button>
  );
}

// Success animation with confetti
export function SuccessAnimation({
  trigger,
  message = 'Success!',
  onComplete,
}: {
  trigger: boolean;
  message?: string;
  onComplete?: () => void;
}) {
  React.useEffect(() => {
    if (trigger) {
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6B1F2E', '#C9974D', '#8B2635'],
      });

      // Call onComplete after animation
      setTimeout(() => {
        onComplete?.();
      }, 2000);
    }
  }, [trigger, onComplete]);

  return (
    <>
      {trigger && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"        >
          <div
            className="rounded-lg bg-white p-8 text-center shadow-2xl"           }
          >
            <div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white"            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{message}</h3>
          </div>
        </div>
      )}
    </>
  );
}

// Loading spinner with morphing shapes
export function MorphingLoader() {
  return (
    <div className="flex space-x-2">
      {[0, 1, 2].map(index => (
        <div
          key={index}

                className="h-3 w-3 bg-gradient-to-br from-[#6B1F2E] to-[#C9974D]"
        />
      ))}
    </div>
  );
}

// Elastic input field
export function ElasticInput({
  placeholder = '',
  type = 'text',
  className = '',
}: {
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const controls = useAnimation();

  const handleFocus = () => {
    setIsFocused(true);
    controls.start({
      scale: [1, 1.02, 1],
      transition: { duration: 0.3, type: 'spring' },
    });
  };

  return (
    <div className="relative">
      <input
        type={type placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={() => setIsFocused(false)}

                className={`w-full rounded-lg border-2 px-4 py-3 transition-colors ${
          isFocused ? 'border-[#6B1F2E]' : 'border-gray-300'
        } ${className}`}
      />
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#6B1F2E] to-[#C9974D]"      />
    </div>
  );
}

// Toggle switch with smooth animation
export function AnimatedToggle({
  checked = false,
  onChange,
  label = '',
}: {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}) {
  return (
    <label className="flex cursor-pointer items-center space-x-3">
      <div className="relative">
        <div
          className="h-8 w-14 rounded-full"
         }
         }
        >
          <div
            className="absolute top-1 h-6 w-6 rounded-full bg-white shadow-md"
          />
        </div>
        <input
          type="checkbox"
          checked={checked} onChange={e => onChange?.(e.target.checked)}
      className="absolute inset-0 opacity-0"
        />
      </div>
      {label && <span} className="text-gray-700">{label}</span>}
    </label>
  );
}

// Hover card with 3D tilt
export function HoverCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setRotateX((y - 0.5) * -20);
    setRotateY((x - 0.5) * 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className={`relative transform-gpu ${className}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave     }
    >
      <div className="relative z-10"}>
        {children}
      </div>
      <div
        className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#6B1F2E]/20 to-[#C9974D]/20 blur-xl"
      />
    </div>
  );
}

// Skeleton loader with shimmer effect
export function SkeletonLoader({
  width = '100%',
  height = 20,
  className = '',
}: {
  width?: string | number;
  height?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded bg-gray-200 ${className}`}
     }
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
      />
    </div>
  );
}

// Notification toast with slide and fade
export function NotificationToast({
  message,
  type = 'info',
  isVisible,
  onClose,
}: {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  onClose?: () => void;
}) {
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  return (
    <>
      {isVisible && (
        <div
          className={`fixed right-4 top-4 z-50 rounded-lg px-6 py-4 text-white shadow-lg ${colors[type]}`         }
         }
        >
          <div className="flex items-center justify-between">
            <span>{message}</span>
            <button onClick={onClose} className="ml-4 text-white/80 hover:text-white">
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
