'use client';

import React from 'react';
import { ConsistentHeader } from '../components/ConsistentHeader';
import { ConsistentFooter } from '../components/ConsistentFooter';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

interface MasterLayoutProps {
  children: React.ReactNode;
  variant?: 'default' | 'hero' | 'minimal';
  showBreadcrumbs?: boolean;
}

export const MasterLayout: React.FC<MasterLayoutProps> = ({ 
  children, 
  variant = 'default',
  showBreadcrumbs = true 
}) => {
  const pathname = usePathname();
  const router = useRouter();
  
  // Determine current language from pathname
  const currentLanguage: 'en' | 'es' = pathname.startsWith('/es') ? 'es' : 'en';

  const handleLanguageChange = (lang: 'en' | 'es') => {
    // Language change is handled by LanguageSwitcher component
    // which uses router to navigate to the appropriate path
  };

  // Generate breadcrumbs
  const getBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: currentLanguage === 'es' ? 'Inicio' : 'Home', href: '/' }];
    
    let currentPath = '';
    paths.forEach((path, index) => {
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
    <div className="min-h-screen flex flex-col bg-white">
      <ConsistentHeader 
        language={currentLanguage} 
        setLanguage={handleLanguageChange}
        variant={variant === 'hero' ? 'transparent' : 'solid'}
      />
      
      {/* Breadcrumbs */}
      {showBreadcrumbs && pathname !== '/' && variant !== 'hero' && (
        <div className="bg-neutral-50 border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm">
                {getBreadcrumbs().map((crumb, index, array) => (
                  <li key={crumb.href} className="flex items-center">
                    {index > 0 && (
                      <svg
                        className="flex-shrink-0 h-4 w-4 text-neutral-400 mx-2"
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
                      <span className="text-neutral-600 font-medium">{crumb.name}</span>
                    ) : (
                      <a
                        href={crumb.href}
                        className="text-neutral-500 hover:text-primary transition-colors"
                      >
                        {crumb.name}
                      </a>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      )}
      
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
      
      <ConsistentFooter language={currentLanguage} />
    </div>
  );
};

export default MasterLayout;