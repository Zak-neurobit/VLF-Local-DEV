'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { BRAND, SEMANTIC_COLORS } from '../constants';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

interface ConsistentHeaderProps {
  language: 'en' | 'es';
  setLanguage: (lang: 'en' | 'es') => void;
  variant?: 'solid' | 'transparent';
}

export const ConsistentHeader: React.FC<ConsistentHeaderProps> = ({ 
  language, 
  setLanguage,
  variant = 'solid' 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = {
    en: [
      { name: 'Home', href: '/' },
      { name: 'Practice Areas', href: '/practice-areas' },
      { name: 'Attorneys', href: '/attorneys' },
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
    es: [
      { name: 'Inicio', href: '/es' },
      { name: 'Áreas de Práctica', href: '/es/areas-de-practica' },
      { name: 'Abogados', href: '/es/abogados' },
      { name: 'Sobre Nosotros', href: '/es/acerca-de' },
      { name: 'Blog', href: '/es/blog' },
      { name: 'Contacto', href: '/es/contacto' },
    ],
  };

  const isTransparent = variant === 'transparent' && !scrolled;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isTransparent ? 'bg-transparent' : 'bg-white shadow-md'
    }`}>
      {/* Top Contact Bar */}
      <div className={`transition-all duration-300 ${
        isTransparent ? 'bg-black/20 backdrop-blur-sm' : 'bg-secondary'
      } text-white py-2`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <a href={`tel:${BRAND.phoneNumeric}`} className="hover:text-primary transition-colors">
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
            <LanguageSwitcher currentLanguage={language} variant="header" />
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`transition-all duration-300 ${
        isTransparent ? 'bg-transparent' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="flex flex-col">
                <h1 className={`text-2xl font-bold transition-colors ${
                  isTransparent ? 'text-white' : 'text-secondary'
                }`}>
                  {BRAND.name}
                </h1>
                <p className="text-xs text-primary font-bold tracking-wider">
                  {BRAND.tagline}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <div className="flex space-x-8">
                {navigation[language].map(item => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative text-sm font-medium transition-colors duration-200 py-2 ${
                      pathname === item.href
                        ? isTransparent ? 'text-primary' : 'text-secondary'
                        : isTransparent 
                          ? 'text-white hover:text-primary' 
                          : 'text-neutral-700 hover:text-primary'
                    }`}
                  >
                    {item.name}
                    {pathname === item.href && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                  </Link>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                href="/contact"
                className="ml-8 px-6 py-2.5 bg-gradient-to-r from-primary to-primary-600 text-secondary text-sm font-bold rounded-full hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                {language === 'es' ? 'Consulta Gratis' : 'Free Consultation'}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-md transition-colors ${
                isTransparent 
                  ? 'text-white hover:bg-white/20' 
                  : 'text-neutral-700 hover:bg-neutral-100'
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
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white border-t border-neutral-200 shadow-lg"
            >
              <div className="px-4 py-6 space-y-1">
                {navigation[language].map(item => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                      pathname === item.href
                        ? 'bg-primary/10 text-secondary'
                        : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t border-neutral-200">
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 bg-gradient-to-r from-primary to-primary-600 text-secondary text-center font-bold rounded-full hover:from-primary-600 hover:to-primary-700 transition-all shadow-md"
                  >
                    {language === 'es' ? 'Consulta Gratis' : 'Free Consultation'}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};