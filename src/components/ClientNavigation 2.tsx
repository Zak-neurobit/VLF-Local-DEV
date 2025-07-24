'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function ClientNavigation() {
  const router = useRouter();

  useEffect(() => {
    console.log('[ClientNavigation] Initializing client-side navigation handler');
    
    // Intercept all link clicks to use client-side navigation
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (!link || !link.href) return;
      
      try {
        // Parse the URL
        const url = new URL(link.href);
        const currentUrl = new URL(window.location.href);
        
        // Check if it's an internal link
        const isInternal = url.hostname === currentUrl.hostname;
        const isNewTab = link.target === '_blank';
        const isDownload = link.hasAttribute('download');
        const isMailto = link.href.startsWith('mailto:');
        const isTel = link.href.startsWith('tel:');
        const isHash = link.href === '#' || (url.pathname === currentUrl.pathname && url.hash);
        const hasModifierKey = e.ctrlKey || e.metaKey || e.shiftKey || e.altKey;
        
        // Skip non-navigable links
        if (!isInternal || isNewTab || isDownload || isMailto || isTel || hasModifierKey) {
          console.log('[ClientNavigation] Skipping external/special link:', link.href);
          return;
        }
        
        // Handle hash-only links
        if (isHash && url.hash) {
          console.log('[ClientNavigation] Hash navigation:', url.hash);
          return; // Let browser handle hash navigation
        }
        
        // Prevent default and use Next.js router
        e.preventDefault();
        console.log('[ClientNavigation] Navigating to:', url.pathname + url.search + url.hash);
        router.push(url.pathname + url.search + url.hash);
      } catch (error) {
        console.error('[ClientNavigation] Error handling click:', error);
      }
    };

    // Add event listener to document with capture phase
    document.addEventListener('click', handleClick, true);
    
    // Log current router state
    console.log('[ClientNavigation] Client-side navigation active');

    return () => {
      document.removeEventListener('click', handleClick, true);
      console.log('[ClientNavigation] Cleanup client-side navigation handler');
    };
  }, [router]);

  return null;
}