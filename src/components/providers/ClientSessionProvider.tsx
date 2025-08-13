'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

// Create a loading component that properly passes through children
const LoadingWrapper: React.FC<Props> = ({ children }) => <>{children}</>;

// Dynamically import the actual SessionProvider with no SSR
// This ensures it's never executed during static generation
const DynamicSessionProvider = dynamic(() => import('./SessionProvider'), {
  ssr: false,
  loading: ({ children }: any) => <>{children}</>,
});

/**
 * Client-only SessionProvider wrapper that prevents auth context
 * from being accessed during static generation (SSG).
 * This fixes build errors for statically generated pages.
 */
export default function ClientSessionProvider({ children }: Props) {
  // Use dynamic import to ensure SessionProvider is never loaded during SSG
  return <DynamicSessionProvider>{children}</DynamicSessionProvider>;
}
