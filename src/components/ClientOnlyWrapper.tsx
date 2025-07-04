'use client';

import dynamic from 'next/dynamic';

// Dynamic imports for client-only components with SSR disabled
export const ChatWidget = dynamic(
  () => import('./ChatWidget').then(mod => mod.ChatWidget),
  { 
    ssr: false,
    loading: () => null // Don't show loading state for chat widget
  }
);

export const VirtualAssistant = dynamic(
  () => import('./VirtualAssistant'),
  { 
    ssr: false,
    loading: () => null
  }
);

export const VirtualAssistantWrapper = dynamic(
  () => import('./VirtualAssistant/VirtualAssistantWrapper').then(mod => mod.VirtualAssistantWrapper),
  { 
    ssr: false,
    loading: () => null
  }
);

export const HeroScene = dynamic(
  () => import('./hero/HeroScene'),
  { 
    ssr: false,
    loading: () => <div style={{ height: '100vh' }} /> // Placeholder to prevent layout shift
  }
);

export const SmoothScroll = dynamic(
  () => import('./SmoothScroll'),
  { 
    ssr: false,
    loading: () => null // Don't show loading state
  }
);