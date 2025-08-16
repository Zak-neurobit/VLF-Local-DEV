'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BRAND } from '../constants';
import { SimpleLanguageSwitcher } from '@/components/Navigation/SimpleLanguageSwitcher';
import navigationData from '@/data/navigation.json';

interface ConsistentHeaderProps {
  language: 'en' | 'es';
  variant?: 'solid' | 'transparent';
  showLanguageToggle?: boolean;
  onLanguageChange?: (lang: 'en' | 'es') => void;
}

interface NavigationItem {
  name: string;
  href: string;
  submenu?: NavigationItem[];
}

export const ConsistentHeader: React.FC<ConsistentHeaderProps> = ({
  language,
  variant = 'solid',
  showLanguageToggle = false,
  onLanguageChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  
  // Use navigation data directly from import
  const navigation = navigationData as { en: NavigationItem[]; es: NavigationItem[] };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = variant === 'transparent' && !scrolled;

  return (
    <header
      className={`transition-all duration-300 ${
        isTransparent 
          ? 'bg-transparent' 
          : 'bg-white border-b border-gray-200 shadow-lg'
      }`}
    >
      {/* Top Contact Bar */}
      <div
        className={`transition-all duration-300 ${
          isTransparent ? 'bg-black/80' : 'bg-secondary'
        } text-white py-0.5`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center text-xs">
            <div className="flex items-center space-x-4">
              <a
                href={`tel:${BRAND.phoneNumeric}`}

                className="hover:text-primary transition-colors"
              >
                <span className="mr-1">📞</span>
                {BRAND.phone} ({BRAND.phoneNumeric.slice(-8)})
              </a>
              <span className="hidden sm:inline text-primary">•</span>
              <a
                href={`mailto:${BRAND.email}`}

                className="hidden sm:inline hover:text-primary transition-colors"
              >
                <span className="mr-1">✉️</span>
                {BRAND.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`transition-all duration-300 relative ${
          isTransparent 
            ? 'bg-transparent' 
            : 'bg-white border-b border-gray-200 shadow-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row - Logo and CTA Button */}
          <div className="flex justify-between items-center h-20 border-b border-gray-100">
            {/* Logo - Bigger */}
            <Link 
              href={language === 'es' ? '/es' : '/'} className="flex items-center cursor-pointer"
            >
              <Image
                src="/images/BANNER_TRANS.PNG"
                alt="Vasquez Law Firm - YO PELEO POR TI™"
                width={400}
                height={120}

                className="h-16 w-auto cursor-pointer"
                priority
              />
            </Link>

            {/* Right side - CTA Button and Language Toggle */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Language Toggle - show on all pages */}
              {showLanguageToggle && onLanguageChange && (
                <div className="flex gap-1 rounded-full bg-black/70 p-1 backdrop-blur-md border border-gold-400/20">
                  <button
                    onClick={() => onLanguageChange('en')}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                      language === 'en' ? 'bg-primary text-black' : 'text-white hover:text-primary'
                    }`}
                    aria-pressed={language === 'en'}
                    aria-label="Switch to English"
                  >
                    EN
                  </button>
                  <button
                    onClick={() => onLanguageChange('es')}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                      language === 'es' ? 'bg-primary text-black' : 'text-white hover:text-primary'
                    }`}
                    aria-pressed={language === 'es'}
                    aria-label="Cambiar a Español"
                  >
                    ES
                  </button>
                </div>
              )}

              {/* CTA Button */}
              <Link
                href={language === 'es' ? '/es/contacto' : '/contact'}
                className="px-8 py-3 bg-gradient-to-r from-[#C9974D] to-[#B08740] text-white text-base font-bold rounded-full hover:from-[#B08740] hover:to-[#906431] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                {language === 'es' ? 'Consulta Gratis' : 'Free Consultation'}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
        }}
 className={`lg:hidden p-2 rounded-md transition-colors text-[#C9974D] ${
                isTransparent
                  ? 'hover:bg-white/20'
                  : 'hover:bg-[#C9974D]/10'
              }`}
                aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Bottom Row - Navigation Menu */}
          <div className="hidden lg:flex justify-center items-center h-14">
            <div className="flex space-x-8">
              {navigation[language].map(item => (
                <div
                  key={item.name}

              className="relative group"
                >
                  {item.href.startsWith('http') ? (
                    <a
              href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative text-sm font-semibold transition-all duration-200 py-2 flex items-center gap-1 ${
                        isTransparent
                          ? 'text-[#C9974D] hover:text-white hover:scale-105'
                          : 'text-gray-700 hover:text-[#6B1F2E] hover:scale-105'
                      }`}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      href={item.href}

              className={`relative text-sm font-semibold transition-all duration-200 py-2 flex items-center gap-1 cursor-pointer ${
                        pathname === item.href || (item.submenu && pathname?.startsWith(item.href))
                          ? 'text-[#6B1F2E] scale-105'
                          : isTransparent
                            ? 'text-[#C9974D] hover:text-white hover:scale-105'
                            : 'text-gray-700 hover:text-[#6B1F2E] hover:scale-105'
                      }`}
                    >
                      {item.name}
                      {item.submenu && (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                      {(pathname === item.href ||
                        (item.submenu && pathname?.startsWith(item.href))) && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9974D]" />
                      )}
                    </Link>
                  )}

                  {/* Dropdown Menu - CSS Hover */}
                  {item.submenu && (
                    <div className="absolute top-full left-0 -mt-1 pt-1 w-[600px] bg-transparent pointer-events-none group-hover:pointer-events-auto opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[500]">
                        <div className="bg-white rounded-xl shadow-2xl border border-gold-200 overflow-hidden relative z-[510]"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(249,250,251,0.98) 100%)',
                          backdropFilter: 'blur(20px)',
                          boxShadow: '0 20px 40px rgba(107, 31, 46, 0.1), 0 10px 20px rgba(201, 151, 77, 0.08)',
                          pointerEvents: 'auto'
                        }}
                      >
                        <div className="max-h-[70vh] overflow-y-auto">
                          {/* Practice Areas Special Layout */}
                          {item.name === 'Practice Areas' || item.name === 'Áreas de Práctica' ? (
                            <div className="grid grid-cols-2 gap-0">
                              {item.submenu.map(practice => (
                                <div key={practice.name}

              className="border-b border-neutral-100 border-r last:border-r-0 even:border-r-0">
                                  <Link
                                    href={practice.href}

              className="block px-6 py-4 text-base font-bold text-burgundy-800 hover:bg-gold-50 hover:text-gold-700 transition-all duration-200"
                                  >
                                    {practice.name}
                                  </Link>
                                  {practice.submenu && (
                                    <div className="bg-gradient-to-r from-gray-50 to-white px-6 pb-3">
                                      <div className="grid grid-cols-1 gap-2">
                                        {practice.submenu.map(subCategory => (
                                          <div 
                                            key={subCategory.name}

              className="pl-4 relative group/sub"
                                          >
                                            <Link href={subCategory.href}
            className="block py-2 text-sm font-medium text-gray-600 hover:text-burgundy-700 hover:translate-x-1 transition-all duration-200 flex items-center justify-between"
                                            >
                                              <span className="flex items-center">
                                                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full mr-2 opacity-0 group-hover/sub:opacity-100 transition-opacity"></span>
                                                {subCategory.name}
                                              </span>
                                              {subCategory.submenu && (
                                                <span className="text-xs text-gold-500">▶</span>
                                              )}
                                            </Link>
                                            {subCategory.submenu && (
                                              <div className="absolute left-full top-0 ml-2 w-64 bg-white shadow-lg rounded-md border border-gray-200 z-[160] opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200">
                                                <div className="py-2">
                                                  {subCategory.submenu.map(specificCase => (
                                                    <Link
                                                      key={specificCase.name}

              href={specificCase.href}

              className="block px-4 py-1.5 text-xs text-neutral-600 hover:bg-primary/10 hover:text-primary transition-colors"
                                                    >
                                                      {specificCase.name}
                                                    </Link>
                                                  ))}
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            /* Regular dropdown layout for other menus */
                            <div className="py-4">
                              {item.submenu.map(subItem => (
                                <Link
                                  key={subItem.name}

              href={subItem.href}
              className="block px-6 py-3 text-base font-medium text-gray-700 hover:bg-gold-50 hover:text-burgundy-700 hover:translate-x-2 transition-all duration-200 group"
                                >
                                  <span className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-gold-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    {subItem.name}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg transition-all duration-200">
              <div className="px-4 py-6 space-y-1">
                {navigation[language].map(item => (
                  <div key={item.name}>
                    {item.href.startsWith('http') ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileMenuOpen(false)}

                className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors text-[#906431] hover:bg-[#C9974D]/5 hover:text-[#C9974D]`}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        href={item.href}

                onClick={() => {
                          // Only close menu if no submenu
                          if (!item.submenu) {
                            setMobileMenuOpen(false);
                          }
                        }}
                        className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                          pathname === item.href || (item.submenu && pathname?.startsWith(item.href))
                            ? 'bg-[#C9974D]/10 text-[#C9974D]'
                            : 'text-[#906431] hover:bg-[#C9974D]/5 hover:text-[#C9974D]'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                    {item.submenu && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.submenu.map(subItem => (
                          <div key={subItem.name}>
                            <Link
                              href={subItem.href}

                onClick={() => {
                                if (!subItem.submenu) {
                                  setMobileMenuOpen(false);
                                }
                              }}
                              className={`block px-4 py-2 text-sm transition-colors ${
                                subItem.submenu
                                  ? 'font-medium text-neutral-700 border-b border-neutral-200'
                                  : 'text-neutral-600 hover:text-primary pl-6'
                              }`}
                            >
                              {subItem.name}
                              {subItem.submenu && (
                                <span className="text-xs text-primary ml-1">→</span>
                              )}
                            </Link>
                            {subItem.submenu && (
                              <div className="ml-4 mt-1 space-y-1 bg-neutral-50/50 rounded">
                                {subItem.submenu.map(nestedItem => (
                                  <Link
                                    key={nestedItem.name}

                href={nestedItem.href}

                onClick={() => {
                                      setMobileMenuOpen(false);
                                    }}
                                    className="block px-4 py-1.5 text-xs text-neutral-600 hover:text-primary transition-colors border-l-2 border-transparent hover:border-primary"
                                  >
                                    {nestedItem.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 mt-4 border-t border-neutral-200 space-y-3">
                  {/* Language Toggle for Mobile - show on all pages */}
                  {showLanguageToggle && onLanguageChange && (
                    <div className="flex justify-center">
                      <div className="flex gap-1 rounded-full bg-black/70 p-1 backdrop-blur-md border border-gold-400/20">
                        <button
                          onClick={() => onLanguageChange('en')}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                            language === 'en' ? 'bg-primary text-black' : 'text-white hover:text-primary'
                          }`}
                          aria-pressed={language === 'en'}
                          aria-label="Switch to English"
                        >
                          EN
                        </button>
                        <button
                          onClick={() => onLanguageChange('es')}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                            language === 'es' ? 'bg-primary text-black' : 'text-white hover:text-primary'
                          }`}
                          aria-pressed={language === 'es'}
                          aria-label="Cambiar a Español"
                        >
                          ES
                        </button>
                      </div>
                    </div>
                  )}

                  <Link
                    href={language === 'es' ? '/es/contacto' : '/contact'}
                    onClick={() => {
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full px-4 py-3 bg-gradient-to-r from-[#C9974D] to-[#B08740] text-white text-center font-bold rounded-full hover:from-[#B08740] hover:to-[#906431] transition-all shadow-md"
                  >
                    {language === 'es' ? 'Consulta Gratis' : 'Free Consultation'}
                  </Link>
                </div>
              </div>
            </div>
          )}
      </nav>
    </header>
  );
};
