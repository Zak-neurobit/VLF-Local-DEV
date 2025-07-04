'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export function useLanguage() {
  const pathname = usePathname();
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  useEffect(() => {
    // Determine language from URL
    const isSpanishPath = pathname.startsWith('/es');
    const detectedLanguage = isSpanishPath ? 'es' : 'en';
    
    setLanguage(detectedLanguage);
    
    // Update i18n language
    if (i18n.language !== detectedLanguage) {
      i18n.changeLanguage(detectedLanguage);
    }
  }, [pathname, i18n]);

  return {
    language,
    isSpanish: language === 'es',
    isEnglish: language === 'en',
  };
}

// Server-side language detection
export function getLanguageFromPath(pathname: string): 'en' | 'es' {
  return pathname.startsWith('/es') ? 'es' : 'en';
}