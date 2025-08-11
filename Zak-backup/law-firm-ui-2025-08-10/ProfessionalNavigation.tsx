'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Globe, ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navigationStructure } from '@/config/navigation-structure';
import type { NavItem, NavPracticeArea, NavCategory } from '@/config/navigation-structure';

interface MegaMenuProps {
  item: NavItem;
  isActive: boolean;
  language: 'en' | 'es';
  onClose: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ item, isActive, language, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive, onClose]);

  if (!item.practiceAreas || !isActive) return null;

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 mt-2 w-full bg-white shadow-2xl rounded-lg overflow-hidden z-50"
      style={{ minWidth: '900px' }}
    >
      <div className="grid grid-cols-5 gap-0">
        {/* Main Practice Areas Column */}
        <div className="col-span-1 bg-gray-50 p-6">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
            {language === 'en' ? 'Practice Areas' : 'Áreas de Práctica'}
          </h3>
          {item.practiceAreas.map(area => (
            <div
              key={area.label[language]}
              className={`relative`}
              onMouseEnter={() => setActiveCategory(area.label[language])}
            >
              <Link
                href={area.href[language]}
                className={`flex items-center justify-between py-3 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeCategory === area.label[language]
                    ? 'bg-[#6B1F2E] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={onClose}
              >
                <span>{area.label[language]}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Sub-categories and Services Columns */}
        <div className="col-span-4 p-6">
          <AnimatePresence mode="wait">
            {item.practiceAreas.map(area => {
              if (activeCategory !== area.label[language]) return null;

              return (
                <motion.div
                  key={area.label[language]}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-4 gap-6"
                >
                  {area.categories.map(category => (
                    <div key={category.label[language]} className="space-y-3">
                      <Link
                        href={category.href[language]}
                        className="block text-sm font-semibold text-gray-900 hover:text-[#6B1F2E] transition-colors"
                        onClick={onClose}
                      >
                        {category.label[language]}
                      </Link>
                      {category.subItems && (
                        <ul className="space-y-2">
                          {category.subItems.map(subItem => (
                            <li key={subItem.label[language]}>
                              <Link
                                href={subItem.href[language]}
                                className="block text-sm text-gray-600 hover:text-[#6B1F2E] transition-colors"
                                onClick={onClose}
                              >
                                {subItem.label[language]}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export function ProfessionalNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileItems, setExpandedMobileItems] = useState<string[]>([]);
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

  const toggleLanguage = () => {
    if (isSpanish) {
      window.location.href = pathname ? pathname.replace('/es', '') || '/' : '/';
    } else {
      window.location.href = pathname ? `/es${pathname}` : '/es';
    }
  };

  const toggleMobileExpanded = (label: string) => {
    setExpandedMobileItems(prev =>
      prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
    );
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#1a1a1a] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <a href="tel:1-844-967-3536" className="flex items-center hover:text-[#188bf6]">
                <Phone className="w-4 h-4 mr-1" />
                <span className="font-semibold">1-844-YO-PELEO</span>
              </a>
              <span className="hidden sm:inline text-gray-300">
                {language === 'es' ? 'Consulta Gratis 24/7' : 'Free Consultation 24/7'}
              </span>
            </div>
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 hover:text-[#188bf6] transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'es' ? 'EN' : 'ES'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white shadow-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href={language === 'es' ? '/es' : '/'} className="flex items-center gap-3">
              <motion.div
                // TODO: Convert whileHover={{ scale: 1.02 }} to react-spring
                whileTap={{ scale: 0.98 }}
                className="flex items-center"
              >
                <Image
                  src="/images/vasquez-law-firm-logo.png"
                  alt="Vasquez Law Firm"
                  width={220}
                  height={60}
                  className="h-12 w-auto"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navigationStructure.map(item => (
                <div
                  key={item.label[language]}
                  className="relative"
                  onMouseEnter={() => item.practiceAreas && setActiveDropdown(item.label[language])}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href[language]}
                    className={`flex items-center gap-1 text-gray-700 hover:text-[#6B1F2E] font-medium transition-colors py-2 ${
                      pathname === item.href[language] ? 'text-[#6B1F2E]' : ''
                    }`}
                  >
                    {item.label[language]}
                    {item.practiceAreas && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {/* Mega Menu for Practice Areas */}
                  {item.practiceAreas && (
                    <AnimatePresence>
                      <MegaMenu
                        item={item}
                        isActive={activeDropdown === item.label[language]}
                        language={language}
                        onClose={() => setActiveDropdown(null)}
                      />
                    </AnimatePresence>
                  )}
                </div>
              ))}

              {/* CTA Button */}
              <Link href="tel:1-844-967-3536">
                <motion.button
                  // TODO: Convert whileHover={{ scale: 1.05 }} to react-spring
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  <span>{language === 'es' ? 'Consulta Gratis' : 'Free Consultation'}</span>
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2"
              aria-label="Toggle menu"
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
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl overflow-y-auto"
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
                {navigationStructure.map(item => (
                  <div key={item.label[language]}>
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href[language]}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-3 text-lg font-medium text-gray-700 hover:text-[#6B1F2E] transition-colors flex-1"
                      >
                        {item.label[language]}
                      </Link>
                      {item.practiceAreas && (
                        <button
                          onClick={() => toggleMobileExpanded(item.label[language])}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <ChevronDown
                            className={`w-5 h-5 text-gray-500 transition-transform ${
                              expandedMobileItems.includes(item.label[language]) ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Mobile Submenu */}
                    {item.practiceAreas && expandedMobileItems.includes(item.label[language]) && (
                      <div className="ml-4 mt-2 space-y-3">
                        {item.practiceAreas.map(area => (
                          <div key={area.label[language]}>
                            <Link
                              href={area.href[language]}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block py-2 text-base font-medium text-gray-600 hover:text-[#6B1F2E]"
                            >
                              {area.label[language]}
                            </Link>
                            <div className="ml-4 mt-1 space-y-2">
                              {area.categories.map(category => (
                                <Link
                                  key={category.label[language]}
                                  href={category.href[language]}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block py-1 text-sm text-gray-500 hover:text-[#6B1F2E]"
                                >
                                  {category.label[language]}
                                </Link>
                              ))}
                            </div>
                          </div>
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
