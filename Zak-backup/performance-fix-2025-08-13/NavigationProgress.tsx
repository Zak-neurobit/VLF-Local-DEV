'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function NavigationProgress() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPath = useRef(pathname);
  const progressInterval = useRef<NodeJS.Timeout>();
  const isNavigating = useRef(false);

  useEffect(() => {
    // Listen for any link clicks to start loading immediately
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (!link || !link.href) return;
      
      try {
        const url = new URL(link.href);
        const currentUrl = new URL(window.location.href);
        
        // Check if it's an internal navigation
        const isInternal = url.hostname === currentUrl.hostname;
        const isNewTab = link.target === '_blank';
        const isSamePage = url.pathname === currentUrl.pathname && url.hash === currentUrl.hash;
        const isHashOnly = url.pathname === currentUrl.pathname && url.hash;
        
        if (isInternal && !isNewTab && !isSamePage && !isHashOnly) {
          // Prevent multiple simultaneous navigations
          if (isNavigating.current) return;
          isNavigating.current = true;
          
          // Clear any existing interval
          if (progressInterval.current) {
            clearInterval(progressInterval.current);
          }
          
          // Start loading immediately on click
          setIsLoading(true);
          setProgress(10);
          
          // Progressive loading animation
          let currentProgress = 10;
          progressInterval.current = setInterval(() => {
            currentProgress += Math.random() * 10;
            if (currentProgress > 85) currentProgress = 85;
            setProgress(currentProgress);
          }, 200);
        }
      } catch (error) {
        // Ignore invalid URLs
      }
    };

    // Add click listener
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    // Complete loading when route changes
    if (pathname !== currentPath.current) {
      currentPath.current = pathname;
      
      // Clear the interval
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      
      // Complete the progress bar
      setProgress(100);
      isNavigating.current = false;
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 200);
    }
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[10000] h-1 bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#C9974D] to-[#F4B643] transition-all duration-300 ease-out shadow-[0_0_10px_rgba(201,151,77,0.5)]"
        style={{
          width: `${progress}%`,
          transition: progress === 100 ? 'width 200ms ease-out' : 'width 400ms ease-out',
        }}
      />
    </div>
  );
}