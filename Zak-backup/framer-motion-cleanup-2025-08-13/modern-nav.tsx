'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Globe, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: { en: string; es: string };
  href: { en: string; es: string };
  submenu?: { label: { en: string; es: string }; href: { en: string; es: string } }[];
}

const navItems: NavItem[] = [
  {
    label: { en: 'Home', es: 'Inicio' },
    href: { en: '/', es: '/es' },
  },
  {
    label: { en: 'Practice Areas', es: 'Áreas de Práctica' },
    href: { en: '/practice-areas', es: '/es/areas-de-practica' },
    submenu: [
      {
        label: { en: 'Immigration', es: 'Inmigración' },
        href: { en: '/practice-areas/immigration', es: '/es/areas-de-practica/inmigracion' },
      },
      {
        label: { en: 'Personal Injury', es: 'Lesiones Personales' },
        href: {
          en: '/practice-areas/personal-injury',
          es: '/es/areas-de-practica/lesiones-personales',
        },
      },
      {
        label: { en: 'Criminal Defense', es: 'Defensa Criminal' },
        href: {
          en: '/practice-areas/criminal-defense',
          es: '/es/areas-de-practica/defensa-criminal',
        },
      },
      {
        label: { en: 'Family Law', es: 'Derecho Familiar' },
        href: { en: '/practice-areas/family-law', es: '/es/areas-de-practica/derecho-familia' },
      },
    ],
  },
  {
    label: { en: 'About Us', es: 'Sobre Nosotros' },
    href: { en: '/about', es: '/es/acerca-de' },
  },
  {
    label: { en: 'Blog', es: 'Blog' },
    href: { en: '/blog', es: '/es/blog' },
  },
  {
    label: { en: 'Contact', es: 'Contacto' },
    href: { en: '/contact', es: '/es/contacto' },
  },
];

export function ModernNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const isSpanish = pathname?.startsWith('/es');
  const language: 'en' | 'es' = isSpanish ? 'es' : 'en';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href={language === 'es' ? '/es' : '/'} className="flex items-center gap-3">
              <motion.div
                // TODO: Convert whileHover={{ scale: 1.05 }} to react-spring
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">VLF</span>
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-[#6B1F2E]">Vasquez Law Firm</h1>
                  <p className="text-xs text-gray-600">YO PELEO POR TI™</p>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map(item => (
                <div
                  key={item.label[language]}
                  className="relative"
                  onMouseEnter={() => item.submenu && setActiveDropdown(item.label[language])}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href[language]}
                    className="flex items-center gap-1 text-gray-700 hover:text-[#6B1F2E] font-medium transition-colors animated-underline"
                  >
                    {item.label[language]}
                    {item.submenu && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.submenu && activeDropdown === item.label[language] && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 glass-card rounded-2xl shadow-xl overflow-hidden"
                      >
                        {item.submenu.map(subItem => (
                          <Link
                            key={subItem.label[language]}
                            href={subItem.href[language]}
                            className="block px-6 py-3 text-gray-700 hover:bg-[#6B1F2E]/5 hover:text-[#6B1F2E] transition-all duration-200"
                          >
                            {subItem.label[language]}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Language Switcher */}
              <button
                onClick={() => {
                  if (isSpanish) {
                    window.location.href = pathname ? pathname.replace('/es', '') || '/' : '/';
                  } else {
                    window.location.href = pathname ? `/es${pathname}` : '/es';
                  }
                }}
                className="flex items-center gap-2 text-gray-700 hover:text-[#6B1F2E] transition-colors"
              >
                <Globe className="w-5 h-5" />
                <span className="font-medium">{language === 'es' ? 'EN' : 'ES'}</span>
              </button>

              {/* CTA Button */}
              <Link href="tel:1-844-967-3536">
                <motion.button
                  // TODO: Convert whileHover={{ scale: 1.05 }} to react-spring
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  <span>1-844-YO-PELEO</span>
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#6B1F2E]" />
              ) : (
                <Menu className="w-6 h-6 text-[#6B1F2E]" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ opacity: 1 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold text-[#6B1F2E]">
                  {language === 'es' ? 'Menú' : 'Menu'}
                </h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-[#6B1F2E]" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="p-6 space-y-4">
                {navItems.map(item => (
                  <div key={item.label[language]}>
                    <Link
                      href={item.href[language]}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-lg font-medium text-gray-700 hover:text-[#6B1F2E] transition-colors"
                    >
                      {item.label[language]}
                    </Link>
                    {item.submenu && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.submenu.map(subItem => (
                          <Link
                            key={subItem.label[language]}
                            href={subItem.href[language]}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 text-gray-600 hover:text-[#6B1F2E] transition-colors"
                          >
                            {subItem.label[language]}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Mobile CTA */}
                <div className="pt-6 border-t">
                  <Link href="tel:1-844-967-3536">
                    <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] text-white font-semibold rounded-lg shadow-lg">
                      <Phone className="w-5 h-5" />
                      <span>{language === 'es' ? 'Llamar Ahora' : 'Call Now'}</span>
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
