'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Phone, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MainNavProps {
  language: 'en' | 'es';
  setLanguage: (lang: 'en' | 'es') => void;
}

export default function MainNav({ language, setLanguage }: MainNavProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navigation = {
    en: {
      practiceAreas: {
        title: 'Practice Areas',
        items: [
          {
            title: 'Immigration Law',
            href: '/practice-areas/immigration',
            subitems: [
              { title: 'Green Cards', href: '/practice-areas/immigration/green-cards' },
              {
                title: 'Family Petitions',
                href: '/practice-areas/immigration/family-based-relative',
              },
              {
                title: 'Work Visas',
                href: '/practice-areas/immigration/employment-based-immigration',
              },
              {
                title: 'Citizenship',
                href: '/practice-areas/immigration/citizenship-naturalization',
              },
              {
                title: 'DACA',
                href: '/practice-areas/immigration/daca-deferred-action-childhood-arrivals',
              },
              {
                title: 'Deportation Defense',
                href: '/practice-areas/immigration/deportation-removal-defense',
              },
              { title: 'Asylum', href: '/practice-areas/immigration/asylum-refugee-legal-help' },
              {
                title: 'U-Visa/VAWA',
                href: '/practice-areas/immigration/vawa-u-visa-crime-victims',
              },
            ],
          },
          {
            title: 'Personal Injury',
            href: '/practice-areas/personal-injury',
            subitems: [
              {
                title: 'Car Accidents',
                href: '/practice-areas/personal-injury/car-auto-accidents',
              },
              { title: 'Truck Accidents', href: '/practice-areas/personal-injury/truck-accidents' },
              {
                title: 'Motorcycle Accidents',
                href: '/practice-areas/personal-injury/motorcycle-accidents',
              },
              {
                title: 'Pedestrian Accidents',
                href: '/practice-areas/personal-injury/pedestrian-hit-by-car',
              },
              {
                title: 'Premises Liability',
                href: '/practice-areas/personal-injury/premises-liability',
              },
              {
                title: 'Drunk Driver Accidents',
                href: '/practice-areas/personal-injury/drunk-driver-liability',
              },
            ],
          },
          {
            title: "Workers' Compensation",
            href: '/practice-areas/workers-compensation',
            subitems: [
              {
                title: 'Construction Injuries',
                href: '/practice-areas/workers-compensation/construction-site-injuries',
              },
              {
                title: 'Repetitive Stress',
                href: '/practice-areas/workers-compensation/repetitive-stress-carpal-tunnel',
              },
              {
                title: 'Third Party Claims',
                href: '/practice-areas/workers-compensation/third-party-injury-claims',
              },
            ],
          },
          {
            title: 'Criminal Defense',
            href: '/practice-areas/criminal-defense',
            subitems: [
              { title: 'DUI/DWI', href: '/practice-areas/criminal-defense/dwi-drunk-driving' },
              { title: 'Drug Crimes', href: '/practice-areas/criminal-defense/drug-crime-cases' },
              {
                title: 'Domestic Violence',
                href: '/practice-areas/criminal-defense/domestic-violence-abuse',
              },
              {
                title: 'Traffic Violations',
                href: '/practice-areas/criminal-defense/traffic-offenses-tickets',
              },
              {
                title: 'Expungement',
                href: '/practice-areas/criminal-defense/expungement-expunction',
              },
            ],
          },
          {
            title: 'Family Law',
            href: '/practice-areas/family-law',
            subitems: [
              { title: 'Divorce', href: '/practice-areas/family-law/divorce' },
              { title: 'Child Custody', href: '/practice-areas/family-law/child-custody' },
              { title: 'Alimony', href: '/practice-areas/family-law/alimony-spousal-support' },
              {
                title: 'Property Division',
                href: '/practice-areas/family-law/equitable-distribution-property-debt-division',
              },
            ],
          },
        ],
      },
      attorneys: 'Attorneys',
      locations: 'Locations',
      blog: 'Blog',
      contact: 'Contact',
      makePayment: 'Make a Payment',
      freeConsultation: 'Free Consultation',
    },
    es: {
      practiceAreas: {
        title: 'Áreas de Práctica',
        items: [
          {
            title: 'Ley de Inmigración',
            href: '/es/areas-de-practica/inmigracion',
            subitems: [
              {
                title: 'Tarjetas Verdes',
                href: '/es/areas-de-practica/inmigracion/tarjetas-verdes',
              },
              {
                title: 'Peticiones Familiares',
                href: '/es/areas-de-practica/inmigracion/peticiones-familiares',
              },
              {
                title: 'Visas de Trabajo',
                href: '/es/areas-de-practica/inmigracion/visas-trabajo',
              },
              { title: 'Ciudadanía', href: '/es/areas-de-practica/inmigracion/ciudadania' },
              { title: 'DACA', href: '/es/areas-de-practica/inmigracion/daca' },
              {
                title: 'Defensa contra Deportación',
                href: '/es/areas-de-practica/inmigracion/defensa-deportacion',
              },
              { title: 'Asilo', href: '/es/areas-de-practica/inmigracion/asilo' },
              { title: 'Visa-U/VAWA', href: '/es/areas-de-practica/inmigracion/visa-u-vawa' },
            ],
          },
          {
            title: 'Lesiones Personales',
            href: '/es/areas-de-practica/lesiones-personales',
            subitems: [
              {
                title: 'Accidentes de Auto',
                href: '/es/areas-de-practica/lesiones-personales/accidentes-auto',
              },
              {
                title: 'Accidentes de Camión',
                href: '/es/areas-de-practica/lesiones-personales/accidentes-camion',
              },
              {
                title: 'Accidentes de Motocicleta',
                href: '/es/areas-de-practica/lesiones-personales/accidentes-motocicleta',
              },
              {
                title: 'Accidentes de Peatones',
                href: '/es/areas-de-practica/lesiones-personales/accidentes-peatones',
              },
              {
                title: 'Responsabilidad de Locales',
                href: '/es/areas-de-practica/lesiones-personales/responsabilidad-locales',
              },
              {
                title: 'Conductor Ebrio',
                href: '/es/areas-de-practica/lesiones-personales/conductor-ebrio',
              },
            ],
          },
          {
            title: 'Compensación Laboral',
            href: '/es/areas-de-practica/compensacion-laboral',
            subitems: [
              {
                title: 'Lesiones de Construcción',
                href: '/es/areas-de-practica/compensacion-laboral/lesiones-construccion',
              },
              {
                title: 'Estrés Repetitivo',
                href: '/es/areas-de-practica/compensacion-laboral/estres-repetitivo',
              },
              {
                title: 'Reclamos de Terceros',
                href: '/es/areas-de-practica/compensacion-laboral/reclamos-terceros',
              },
            ],
          },
          {
            title: 'Defensa Criminal',
            href: '/es/areas-de-practica/defensa-criminal',
            subitems: [
              { title: 'DUI/DWI', href: '/es/areas-de-practica/defensa-criminal/dui-dwi' },
              {
                title: 'Delitos de Drogas',
                href: '/es/areas-de-practica/defensa-criminal/delitos-drogas',
              },
              {
                title: 'Violencia Doméstica',
                href: '/es/areas-de-practica/defensa-criminal/violencia-domestica',
              },
              {
                title: 'Infracciones de Tráfico',
                href: '/es/areas-de-practica/defensa-criminal/infracciones-trafico',
              },
              {
                title: 'Eliminación de Antecedentes',
                href: '/es/areas-de-practica/defensa-criminal/eliminacion-antecedentes',
              },
            ],
          },
          {
            title: 'Derecho Familiar',
            href: '/es/areas-de-practica/derecho-familia',
            subitems: [
              { title: 'Divorcio', href: '/es/areas-de-practica/derecho-familia/divorcio' },
              {
                title: 'Custodia de Menores',
                href: '/es/areas-de-practica/derecho-familia/custodia-menores',
              },
              {
                title: 'Pensión Alimenticia',
                href: '/es/areas-de-practica/derecho-familia/pension-alimenticia',
              },
              {
                title: 'División de Propiedad',
                href: '/es/areas-de-practica/derecho-familia/division-propiedad',
              },
            ],
          },
        ],
      },
      attorneys: 'Abogados',
      locations: 'Ubicaciones',
      blog: 'Blog',
      contact: 'Contacto',
      makePayment: 'Hacer un Pago',
      freeConsultation: 'Consulta Gratis',
    },
  };

  const t = navigation[language];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="text-3xl font-bold">
              <span className="text-burgundy-700">VLF</span>
              <span className="text-gold-500 text-xl ml-2">YO PELEO™</span>
            </div>
          </Link>

          {/* Main Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Practice Areas Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('practice')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-burgundy-700 font-medium">
                <span>{t.practiceAreas.title}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {activeDropdown === 'practice' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 w-[800px] bg-white shadow-xl rounded-lg mt-2 p-6"
                  >
                    <div className="grid grid-cols-2 gap-8">
                      {t.practiceAreas.items.map((area, index) => (
                        <div key={index}>
                          <Link
                            href={area.href}
                            className="text-lg font-bold text-burgundy-700 hover:text-burgundy-900 mb-3 block"
                          >
                            {area.title}
                          </Link>
                          <ul className="space-y-2">
                            {area.subitems.map((subitem, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  href={subitem.href}
                                  className="text-sm text-gray-600 hover:text-burgundy-700 hover:underline"
                                >
                                  {subitem.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other Nav Items */}
            <Link href="/attorneys" className="text-gray-700 hover:text-burgundy-700 font-medium">
              {t.attorneys}
            </Link>
            <Link href="/locations" className="text-gray-700 hover:text-burgundy-700 font-medium">
              {t.locations}
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-burgundy-700 font-medium">
              {t.blog}
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-burgundy-700 font-medium">
              {t.contact}
            </Link>
            <Link
              href="/make-payment"
              className="text-gray-700 hover:text-burgundy-700 font-medium"
            >
              {t.makePayment}
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="flex items-center space-x-2 text-gray-700 hover:text-burgundy-700"
            >
              <Globe className="w-5 h-5" />
              <span>{language === 'en' ? 'ES' : 'EN'}</span>
            </button>

            {/* Phone */}
            <a
              href="tel:1-844-967-3536"
              className="flex items-center space-x-2 text-burgundy-700 hover:text-burgundy-900 font-bold"
            >
              <Phone className="w-5 h-5" />
              <span className="hidden md:block">1-844-YO-PELEO</span>
            </a>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="bg-gold-500 text-burgundy-900 px-6 py-3 rounded-full font-bold hover:bg-gold-400 transition-colors"
            >
              {t.freeConsultation}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
