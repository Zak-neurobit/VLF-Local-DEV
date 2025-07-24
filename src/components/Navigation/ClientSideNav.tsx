'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientSideNav() {
  const router = useRouter();

  useEffect(() => {
    // Ensure client-side navigation is working
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href && link.href.startsWith(window.location.origin)) {
        const url = new URL(link.href);
        // Only handle internal links
        if (url.hostname === window.location.hostname && !link.getAttribute('target')) {
          e.preventDefault();
          router.push(url.pathname + url.search + url.hash);
        }
      }
    };

    // Add event listener for all clicks
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [router]);

  return null;
}