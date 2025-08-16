'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { ConsistentHeader } from '../components/ConsistentHeader';
import { ConsistentFooter } from '../components/ConsistentFooter';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { NewsTicker } from '@/components/ui/news-ticker';
import { ClientOnlyWrapper } from '@/components/ClientOnlyWrapper';
import { componentLogger } from '@/lib/safe-logger';

interface MasterLayoutProps {
  children: React.ReactNode;
  variant?: 'default' | 'hero' | 'minimal';
  showBreadcrumbs?: boolean;
}

export const MasterLayout: React.FC<MasterLayoutProps> = ({
  children,
  variant = 'default',
  showBreadcrumbs = true,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const safePathname = pathname || '/';

  // Determine current language from pathname
  const currentLanguage: 'en' | 'es' = safePathname.startsWith('/es') ? 'es' : 'en';

  // Language toggle handler
  const handleLanguageChange = useCallback((lang: 'en' | 'es') => {
    let newPath = '';
    
    if (lang === 'es') {
      // If already on Spanish site, do nothing
      if (safePathname.startsWith('/es')) return;
      
      // If on English homepage, go to Spanish homepage
      if (safePathname === '/') {
        newPath = '/es';
      } else {
        // For other pages, prepend /es to the path
        newPath = `/es${safePathname}`;
      }
    } else {
      // If already on English site (not starting with /es), do nothing
      if (!safePathname.startsWith('/es')) return;
      
      // If on Spanish homepage, go to English homepage
      if (safePathname === '/es') {
        newPath = '/';
      } else {
        // For other pages, remove /es from the path
        newPath = safePathname.replace('/es', '') || '/';
      }
    }
    
    router.push(newPath);
  }, [router, safePathname]);

  // Debug: Log when MasterLayout renders (only in development)
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      componentLogger.mount('MasterLayout', {
        variant,
        currentLanguage,
        pathname: safePathname,
      });
    }
  }, [variant, currentLanguage, safePathname]);

  // Generate breadcrumbs
  const getBreadcrumbs = () => {
    const paths = safePathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: currentLanguage === 'es' ? 'Inicio' : 'Home', href: '/' }];

    let currentPath = '';
    paths.forEach((path, _index) => {
      currentPath += `/${path}`;
      const name = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      breadcrumbs.push({ name, href: currentPath });
    });

    return breadcrumbs;
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* News Ticker - Fixed at the very top */}
      <div
        className="fixed top-0 left-0 right-0 z-[9999] block"
        style={{
          height: '20px',
          backgroundColor: '#6B1F2E', // Ensure visible background
          minHeight: '20px',
          display: 'block',
          visibility: 'visible',
          opacity: 1,
          transform: 'none',
        }}
      >
        <ClientOnlyWrapper>
          <NewsTicker locale={currentLanguage} />
        </ClientOnlyWrapper>
      </div>

      {/* Header - Adjusted to account for ticker height */}
      <div className="fixed top-[20px] left-0 right-0 z-[200]">
        <ConsistentHeader
          language={currentLanguage}
          variant={variant === 'hero' ? 'transparent' : 'solid'}
          showLanguageToggle={true}
          onLanguageChange={handleLanguageChange}
        />
      </div>

      {/* Main content area with padding to account for fixed header + ticker */}
      <div className={variant === 'hero' ? 'pt-0' : 'pt-[180px]'}>
        {/* Hero variant starts from top, normal needs ticker + header space */}
        
        {/* Breadcrumbs - Only show on non-homepage pages */}
        {showBreadcrumbs && safePathname !== '/' && variant !== 'hero' && (
          <div className="bg-black/50 border-b border-primary/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm">
                  {getBreadcrumbs().map((crumb, index, array) => (
                    <li key={crumb.href} className="flex items-center">
                      {index > 0 && (
                        <svg
                          className="flex-shrink-0 h-4 w-4 text-gray-400 mx-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {index === array.length - 1 ? (
                        <span className="text-gray-300 font-medium">{crumb.name}</span>
                      ) : (
                        <Link
                          href={crumb.href}
                          className="text-gray-400 hover:text-primary transition-colors"
                        >
                          {crumb.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>
        )}

        <main className="flex-grow relative">
          <div className="animate-fadeIn">
            {children}
          </div>
        </main>
        <ConsistentFooter language={currentLanguage} />
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>
    </div>
  );
};

export default MasterLayout;
