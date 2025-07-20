'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { BRAND } from '../constants';
import { LanguageToggle } from '@/components/LanguageToggle';

interface ConsistentHeaderProps {
  language: 'en' | 'es';
  setLanguage: (lang: 'en' | 'es') => void;
  variant?: 'solid' | 'transparent';
}

interface NavigationItem {
  name: string;
  href: string;
  submenu?: { name: string; href: string }[];
}

export const ConsistentHeader: React.FC<ConsistentHeaderProps> = ({
  language,
  setLanguage,
  variant = 'solid',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation: { en: NavigationItem[]; es: NavigationItem[] } = {
    en: [
      { name: 'Home', href: '/' },
      {
        name: 'Practice Areas',
        href: '/practice-areas',
        submenu: [
          { name: 'Immigration Law', href: '/practice-areas/immigration' },
          { name: 'Personal Injury', href: '/practice-areas/personal-injury' },
          { name: "Workers' Compensation", href: '/practice-areas/workers-compensation' },
          { name: 'Criminal Defense', href: '/practice-areas/criminal-defense' },
          { name: 'Family Law', href: '/practice-areas/family-law' },
          { name: 'Traffic Violations', href: '/practice-areas/traffic-violations' },
        ],
      },
      {
        name: 'Attorneys',
        href: '/attorneys',
        submenu: [
          { name: 'Our Team', href: '/attorneys' },
          { name: 'William Vasquez', href: '/attorneys/william-vasquez' },
          { name: 'Kelly Vega', href: '/attorneys/kelly-vega' },
          { name: 'Rebecca Sommer', href: '/attorneys/rebecca-sommer' },
          { name: 'Christopher Afanador', href: '/attorneys/christopher-afanador' },
          { name: 'Jillian Baucom', href: '/attorneys/jillian-baucom' },
          { name: 'Roselyn V. Torrellas', href: '/attorneys/roselyn-v-torrellas' },
          { name: 'Adrianna Ingram', href: '/attorneys/adrianna-ingram' },
        ],
      },
      {
        name: 'Locations',
        href: '/locations',
        submenu: [
          { name: 'All Locations', href: '/locations' },
          { name: 'Charlotte', href: '/locations/charlotte' },
          { name: 'Raleigh', href: '/locations/raleigh' },
          { name: 'Smithfield', href: '/locations/smithfield' },
          { name: 'Orlando', href: '/locations/orlando' },
        ],
      },
      {
        name: 'About',
        href: '/about',
        submenu: [
          { name: 'About Us', href: '/about' },
          { name: 'Our Team', href: '/our-team' },
        ],
      },
      { name: 'Blog', href: '/blog' },
      { name: 'Scholarship', href: '/scholarship' },
      { name: 'Contact', href: '/contact' },
      { name: 'Payment', href: '/make-payment' },
    ],
    es: [
      { name: 'Inicio', href: '/es' },
      {
        name: 'Áreas de Práctica',
        href: '/es/areas-de-practica',
        submenu: [
          { name: 'Ley de Inmigración', href: '/es/areas-de-practica/inmigracion' },
          { name: 'Lesiones Personales', href: '/es/areas-de-practica/lesiones-personales' },
          { name: 'Compensación Laboral', href: '/es/areas-de-practica/compensacion-laboral' },
          { name: 'Defensa Criminal', href: '/es/areas-de-practica/defensa-criminal' },
          { name: 'Derecho Familiar', href: '/es/areas-de-practica/derecho-familia' },
          { name: 'Infracciones de Tráfico', href: '/es/areas-de-practica/infracciones-transito' },
        ],
      },
      {
        name: 'Abogados',
        href: '/es/abogados',
        submenu: [
          { name: 'Nuestro Equipo', href: '/es/abogados' },
          { name: 'William Vasquez', href: '/es/abogados/william-vasquez' },
          { name: 'Kelly Vega', href: '/es/abogados/kelly-vega' },
          { name: 'Rebecca Sommer', href: '/es/abogados/rebecca-sommer' },
          { name: 'Christopher Afanador', href: '/es/abogados/christopher-afanador' },
          { name: 'Jillian Baucom', href: '/es/abogados/jillian-baucom' },
          { name: 'Roselyn V. Torrellas', href: '/es/abogados/roselyn-v-torrellas' },
          { name: 'Adrianna Ingram', href: '/es/abogados/adrianna-ingram' },
        ],
      },
      {
        name: 'Ubicaciones',
        href: '/es/ubicaciones',
        submenu: [
          { name: 'Todas las Ubicaciones', href: '/es/ubicaciones' },
          { name: 'Charlotte', href: '/es/ubicaciones/charlotte' },
          { name: 'Raleigh', href: '/es/ubicaciones/raleigh' },
          { name: 'Smithfield', href: '/es/ubicaciones/smithfield' },
          { name: 'Orlando', href: '/es/ubicaciones/orlando' },
        ],
      },
      {
        name: 'Sobre Nosotros',
        href: '/es/acerca-de',
        submenu: [
          { name: 'Acerca de Nosotros', href: '/es/acerca-de' },
          { name: 'Nuestro Equipo', href: '/es/nuestro-equipo' },
        ],
      },
      { name: 'Blog', href: '/es/blog' },
      { name: 'Beca', href: '/es/becas' },
      { name: 'Contacto', href: '/es/contacto' },
      { name: 'Pago', href: '/es/pago' },
    ],
  };

  const isTransparent = variant === 'transparent' && !scrolled;

  return (
    <header
      className={`transition-all duration-300 ${
        isTransparent ? 'bg-transparent' : 'bg-white shadow-md'
      }`}
    >
      {/* Top Contact Bar */}
      <div
        className={`transition-all duration-300 ${
          isTransparent ? 'bg-black/20 backdrop-blur-sm' : 'bg-secondary'
        } text-white py-2`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
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
            <LanguageToggle />
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`transition-all duration-300 ${isTransparent ? 'bg-transparent' : 'bg-white'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href={language === 'es' ? '/es' : '/'} className="flex items-center">
              <div className="flex flex-col">
                <h1
                  className={`text-2xl font-bold transition-colors ${
                    isTransparent ? 'text-white' : 'text-secondary'
                  }`}
                >
                  {BRAND.name}
                </h1>
                <p className="text-xs text-primary font-bold tracking-wider">{BRAND.tagline}</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <div className="flex space-x-8">
                {navigation[language].map(item => (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => item.submenu && setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className={`relative text-sm font-medium transition-colors duration-200 py-2 flex items-center gap-1 ${
                        pathname === item.href || (item.submenu && pathname?.startsWith(item.href))
                          ? isTransparent
                            ? 'text-primary'
                            : 'text-secondary'
                          : isTransparent
                            ? 'text-white hover:text-primary'
                            : 'text-neutral-700 hover:text-primary'
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
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                        />
                      )}
                    </Link>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {item.submenu && activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-neutral-200 overflow-hidden z-50"
                        >
                          <div className="py-2">
                            {item.submenu.map(subItem => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-4 py-2.5 text-sm text-neutral-700 hover:bg-primary/10 hover:text-primary transition-colors"
                                onClick={() => {
                                  setActiveDropdown(null);
                                }}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                href={language === 'es' ? '/es/contacto' : '/contact'}
                className="ml-8 px-6 py-2.5 bg-gradient-to-r from-primary to-primary-600 text-secondary text-sm font-bold rounded-full hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                {language === 'es' ? 'Consulta Gratis' : 'Free Consultation'}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
              }}
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
                  <div key={item.name}>
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
                          ? 'bg-primary/10 text-secondary'
                          : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary'
                      }`}
                    >
                      {item.name}
                    </Link>
                    {item.submenu && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.submenu.map(subItem => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                            }}
                            className="block px-4 py-2 text-sm text-neutral-600 hover:text-primary transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 mt-4 border-t border-neutral-200">
                  <Link
                    href={language === 'es' ? '/es/contacto' : '/contact'}
                    onClick={() => {
                      setMobileMenuOpen(false);
                    }}
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
