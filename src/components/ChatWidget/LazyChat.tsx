'use client';

import React, { useState, Suspense, lazy } from 'react';
import { ChatButton } from './ChatButton';
import { Loader2 } from 'lucide-react';

// Lazy load the heavy chat component
const UnifiedModernChatbot = lazy(() => 
  import('./UnifiedModernChatbot').then(mod => ({ 
    default: mod.UnifiedModernChatbot 
  }))
);

interface LazyChatProps {
  language?: 'en' | 'es';
}

export const LazyChat: React.FC<LazyChatProps> = ({ language = 'en' }) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChatClick = () => {
    if (!shouldLoad) {
      setIsLoading(true);
      setShouldLoad(true);
      // Preload voice and other heavy dependencies
      setTimeout(() => setIsLoading(false), 100);
    }
  };

  // If chat hasn't been clicked yet, show lightweight button
  if (!shouldLoad) {
    return <ChatButton onClick={handleChatClick} language={language} />;
  }

  // Loading state while chat component loads
  if (isLoading) {
    return (
      <div className="fixed bottom-6 right-6 bg-white rounded-full p-4 shadow-2xl z-50">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  // Render the full chat widget
  return (
    <Suspense fallback={
      <div className="fixed bottom-6 right-6 bg-white rounded-full p-4 shadow-2xl z-50">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    }>
      <UnifiedModernChatbot language={language} />
    </Suspense>
  );
};