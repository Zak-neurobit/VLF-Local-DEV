'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';

const EMERGENCY_PHONE = '+1-844-967-3536';

export function UnifiedHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const isSpanish = pathname?.startsWith('/es');
  const { t } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = isSpanish
    ? [
        { name: 'Inicio', href: '/es' },
        {
          name: 'Áreas de Práctica',
          href: '/es/areas-de-practica',
          dropdown: [
            { name: 'Inmigración', href: '/es/areas-de-practica/inmigracion' },
            { name: 'Lesiones Personales', href: '/es/areas-de-practica/lesiones-personales' },
            { name: 'Defensa Criminal', href: '/es/areas-de-practica/defensa-criminal' },
            { name: 'Compensación Laboral', href: '/es/areas-de-practica/compensacion-laboral' },
            { name: 'Derecho Familiar', href: '/es/areas-de-practica/derecho-familiar' },
          ],
        },
        { name: 'Abogados', href: '/es/abogados' },
        { name: 'Resultados', href: '/es/resultados-de-casos' },
        { name: 'Blog', href: '/es/blog' },
        { name: 'Contacto', href: '/es/contacto' },
      ]
    : [
        { name: 'Home', href: '/' },
        {
          name: 'Practice Areas',
          href: '/practice-areas',
          dropdown: [
            { name: 'Immigration', href: '/practice-areas/immigration' },
            { name: 'Personal Injury', href: '/practice-areas/personal-injury' },
            { name: 'Criminal Defense', href: '/practice-areas/criminal-defense' },
            { name: 'Workers Compensation', href: '/practice-areas/workers-compensation' },
            { name: 'Family Law', href: '/practice-areas/family-law' },
          ],
        },
        { name: 'Attorneys', href: '/attorneys' },
        { name: 'Results', href: '/case-results' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
      ];

  const toggleLanguage = () => {
    if (isSpanish) {
      window.location.href = pathname ? pathname.replace('/es', '') || '/' : '/';
    } else {
      window.location.href = pathname ? `/es${pathname}` : '/es';
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#1a1a1a] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <a href={`tel:${EMERGENCY_PHONE}`} className="flex items-center hover:text-[#188bf6]">
                <Phone className="w-4 h-4 mr-1" />
                <span className="font-semibold">1-844-YO-PELEO</span>
              </a>
              <span className="hidden sm:inline text-gray-300">
                {isSpanish ? 'Consulta Gratis 24/7' : 'Free Consultation 24/7'}
              </span>
            </div>
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 hover:text-[#188bf6] transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span>{isSpanish ? 'EN' : 'ES'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-white'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href={isSpanish ? '/es' : '/'} className="flex-shrink-0">
              <Image
                src="/images/vasquez-law-firm-logo.png"
                alt="Vasquez Law Firm"
                width={200}
                height={50}
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map(item => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-1 text-gray-700 hover:text-[#188bf6] font-medium transition-colors ${
                      pathname === item.href ? 'text-[#188bf6]' : ''
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.dropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50"
                        >
                          {item.dropdown.map(subItem => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#188bf6] transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}

              {/* CTA Button */}
              <Link
                href={isSpanish ? '/es/consulta-gratis' : '/free-consultation'}
                className="bg-[#188bf6] text-white px-4 py-2 rounded-md font-medium hover:bg-[#0e5ca8] transition-colors"
              >
                {isSpanish ? 'Consulta Gratis' : 'Free Consultation'}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t"
            >
              <div className="px-4 py-4 space-y-3">
                {navigation.map(item => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-2 text-gray-700 hover:text-[#188bf6] font-medium ${
                        pathname === item.href ? 'text-[#188bf6]' : ''
                      }`}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.dropdown.map(subItem => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-1 text-sm text-gray-600 hover:text-[#188bf6]"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link
                  href={isSpanish ? '/es/consulta-gratis' : '/free-consultation'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full bg-[#188bf6] text-white text-center px-4 py-2 rounded-md font-medium hover:bg-[#0e5ca8] transition-colors mt-4"
                >
                  {isSpanish ? 'Consulta Gratis' : 'Free Consultation'}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
