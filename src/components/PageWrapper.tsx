'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import MainNav from '@/components/Navigation/MainNav';
import { Footer } from '@/components/Footer';
import { usePathname } from 'next/navigation';

interface PageWrapperProps {
  children: React.ReactNode;
  showNavigation?: boolean;
}

export default function PageWrapper({ children, showNavigation = true }: PageWrapperProps) {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const pathname = usePathname();

  // Don't show navigation on homepage
  const isHomePage = pathname === '/';

  if (isHomePage || !showNavigation) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Header with contact info */}
      <Header language={language} setLanguage={setLanguage} />

      {/* Main navigation */}
      <MainNav language={language} setLanguage={setLanguage} />

      {/* Page content */}
      {children}

      {/* Footer */}
      <Footer language={language} />
    </>
  );
}
