'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function NotFound() {
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  const content = {
    en: {
      title: '404 - Page Not Found',
      subtitle: 'Oops! The page you&apos;re looking for doesn&apos;t exist.',
      description:
        "It seems you've taken a wrong turn. Don't worry, our AI assistant can help you find what you need.",
      homeButton: 'Go Home',
      contactButton: 'Contact Us',
      searchPlaceholder: 'Search for legal services...',
      aiHelp: 'Get AI Help',
      suggestions: 'Popular Pages:',
      pages: [
        { name: 'Immigration Law', href: '/practice-areas/immigration' },
        { name: 'Personal Injury', href: '/practice-areas/personal-injury' },
        { name: 'Free Consultation', href: '/contact' },
        { name: 'Our Attorneys', href: '/attorneys' },
      ],
    },
    es: {
      title: '404 - Página No Encontrada',
      subtitle: '¡Ups! La página que buscas no existe.',
      description:
        'Parece que has tomado un camino equivocado. No te preocupes, nuestro asistente de IA puede ayudarte a encontrar lo que necesitas.',
      homeButton: 'Ir al Inicio',
      contactButton: 'Contáctanos',
      searchPlaceholder: 'Buscar servicios legales...',
      aiHelp: 'Obtener Ayuda IA',
      suggestions: 'Páginas Populares:',
      pages: [
        { name: 'Ley de Inmigración', href: '/practice-areas/immigration' },
        { name: 'Lesiones Personales', href: '/practice-areas/personal-injury' },
        { name: 'Consulta Gratis', href: '/contact' },
        { name: 'Nuestros Abogados', href: '/attorneys' },
      ],
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Language Toggle */}
          <div className="flex justify-center gap-2 mb-8">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-sm rounded ${
                language === 'en'
                  ? 'bg-[#C9974D] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('es')}
              className={`px-3 py-1 text-sm rounded ${
                language === 'es'
                  ? 'bg-[#C9974D] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ES
            </button>
          </div>

          {/* 404 Animation */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-9xl font-bold text-[#6B1F2E] mb-4">404</h1>
            <div className="text-6xl mb-4">⚖️</div>
          </motion.div>

          {/* Content */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 mb-2">{t.subtitle}</p>
          <p className="text-gray-600 mb-8">{t.description}</p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="w-full px-6 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9974D] focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-[#C9974D] hover:text-[#B08740]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="px-8 py-3 bg-[#6B1F2E] text-white rounded-md font-semibold hover:bg-[#8B2635] transition-colors"
            >
              {t.homeButton}
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border-2 border-[#C9974D] text-[#C9974D] rounded-md font-semibold hover:bg-[#C9974D] hover:text-white transition-colors"
            >
              {t.contactButton}
            </Link>
            <button className="px-8 py-3 bg-gradient-to-r from-[#C9974D] to-[#D4A574] text-white rounded-md font-semibold hover:shadow-lg transition-all">
              🤖 {t.aiHelp}
            </button>
          </div>

          {/* Suggestions */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.suggestions}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.pages.map((page, index) => (
                <Link
                  key={index}
                  href={page.href}
                  className="text-[#6B1F2E] hover:text-[#C9974D] hover:underline"
                >
                  {page.name} →
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-gray-600">
            <p className="text-sm">📞 1-844-YO-PELEO (967-3536) | 📧 info@vasquezlawnc.com</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
