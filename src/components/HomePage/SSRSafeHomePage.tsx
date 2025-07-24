'use client';

import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled to prevent framer-motion SSR issues
const HomePage = dynamic(() => import('./index'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading Vasquez Law Firm...</p>
      </div>
    </div>
  ),
});

export default function SSRSafeHomePage(props: any) {
  return <HomePage {...props} />;
}