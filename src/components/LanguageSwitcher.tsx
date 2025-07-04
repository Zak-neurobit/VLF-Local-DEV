'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLanguage: 'en' | 'es';
  variant?: 'header' | 'floating' | 'mobile';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  variant = 'header',
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (lang: 'en' | 'es') => {
    // Set cookie
    document.cookie = `preferred-language=${lang};path=/;max-age=31536000;samesite=lax`;

    // Determine new path
    let newPath = pathname;

    // Remove existing language prefix if present
    if (pathname.startsWith('/es/')) {
      newPath = pathname.slice(3) || '/';
    } else if (pathname.startsWith('/en/')) {
      newPath = pathname.slice(3) || '/';
    }

    // Add new language prefix for Spanish only (keep English URLs clean)
    if (lang === 'es') {
      newPath = `/es${newPath === '/' ? '' : newPath}`;
    }

    // Navigate to new path
    router.push(newPath);
  };

  if (variant === 'floating') {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed right-2 sm:right-4 top-16 sm:top-20 z-40 flex gap-1 sm:gap-2 rounded-full bg-black/50 p-1 backdrop-blur-sm"
      >
        <button
          onClick={() => handleLanguageChange('en')}
          className={`rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all ${
            currentLanguage === 'en'
              ? 'bg-primary text-black'
              : 'text-white hover:text-primary'
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>
        <button
          onClick={() => handleLanguageChange('es')}
          className={`rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all ${
            currentLanguage === 'es'
              ? 'bg-primary text-black'
              : 'text-white hover:text-primary'
          }`}
          aria-label="Cambiar a Español"
        >
          ES
        </button>
      </motion.div>
    );
  }

  if (variant === 'mobile') {
    return (
      <div className="flex items-center justify-center space-x-2 py-2">
        <Globe className="h-4 w-4 text-gray-600" />
        <button
          onClick={() => handleLanguageChange('en')}
          className={`px-3 py-1 text-sm rounded transition-all ${
            currentLanguage === 'en'
              ? 'bg-primary text-white font-semibold'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          English
        </button>
        <span className="text-gray-400">|</span>
        <button
          onClick={() => handleLanguageChange('es')}
          className={`px-3 py-1 text-sm rounded transition-all ${
            currentLanguage === 'es'
              ? 'bg-primary text-white font-semibold'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Español
        </button>
      </div>
    );
  }

  // Header variant (default)
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-2 py-1 text-xs rounded transition-all ${
          currentLanguage === 'en'
            ? 'bg-primary text-white font-semibold'
            : 'hover:bg-white/20'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-primary-400">|</span>
      <button
        onClick={() => handleLanguageChange('es')}
        className={`px-2 py-1 text-xs rounded transition-all ${
          currentLanguage === 'es'
            ? 'bg-primary text-white font-semibold'
            : 'hover:bg-white/20'
        }`}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
    </div>
  );
};

export default LanguageSwitcher;