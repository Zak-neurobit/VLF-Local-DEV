'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { BRAND } from '../constants';
import { SimpleLanguageSwitcher } from '@/components/Navigation/SimpleLanguageSwitcher';

interface ConsistentHeaderProps {
  language: 'en' | 'es';
  variant?: 'solid' | 'transparent';
}

interface NavigationItem {
  name: string;
  href: string;
  submenu?: NavigationItem[];
}

export const ConsistentHeader: React.FC<ConsistentHeaderProps> = ({
  language,
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
          {
            name: 'Immigration Law',
            href: '/practice-areas/immigration',
            submenu: [
              { name: 'Affirmative Immigration', href: '/practice-areas/immigration/affirmative' },
              {
                name: 'Family-Based Petitions',
                href: '/practice-areas/immigration/affirmative/family-based-petitions',
              },
              { name: 'DACA', href: '/practice-areas/immigration/affirmative/daca' },
              { name: 'TPS', href: '/practice-areas/immigration/affirmative/tps' },
              { name: 'Green Cards', href: '/practice-areas/immigration/affirmative/green-cards' },
              { name: 'Citizenship', href: '/practice-areas/immigration/affirmative/citizenship' },
              { name: 'Removal Defense', href: '/practice-areas/immigration/removal-defense' },
              {
                name: 'Deportation Defense',
                href: '/practice-areas/immigration/removal-defense/deportation-defense',
              },
              { name: 'Asylum', href: '/practice-areas/immigration/removal-defense/asylum' },
              {
                name: 'Cancellation of Removal',
                href: '/practice-areas/immigration/removal-defense/cancellation-of-removal',
              },
              {
                name: 'Bond Hearings',
                href: '/practice-areas/immigration/removal-defense/bond-hearings',
              },
              { name: 'Business Immigration', href: '/practice-areas/immigration/business' },
              {
                name: 'PERM Labor Certification',
                href: '/practice-areas/immigration/business/perm-labor-certification',
              },
              { name: 'H-1B Visas', href: '/practice-areas/immigration/business/h1b-visas' },
              { name: 'L-1 Visas', href: '/practice-areas/immigration/business/l1-visas' },
              {
                name: 'E-2 Investor Visas',
                href: '/practice-areas/immigration/business/e2-investor-visas',
              },
              {
                name: 'EB-5 Investment',
                href: '/practice-areas/immigration/business/eb5-investment',
              },
              { name: 'Waivers', href: '/practice-areas/immigration/inadmissibility-waivers' },
              {
                name: 'U Visa / VAWA',
                href: '/practice-areas/immigration/vawa-u-visa-crime-victims',
              },
              { name: 'T Visa', href: '/practice-areas/immigration/t-visa' },
            ],
          },
          {
            name: 'Personal Injury',
            href: '/practice-areas/personal-injury',
            submenu: [
              { name: 'Car Accidents', href: '/practice-areas/personal-injury/car-accidents' },
              {
                name: 'Motorcycle Accidents',
                href: '/practice-areas/personal-injury/motorcycle-accidents',
              },
              { name: 'Truck Accidents', href: '/practice-areas/personal-injury/truck-accidents' },
              {
                name: 'Pedestrian Accidents',
                href: '/practice-areas/personal-injury/pedestrian-accidents',
              },
              {
                name: 'Bicycle Accidents',
                href: '/practice-areas/personal-injury/bicycle-accidents',
              },
              { name: 'Slip and Fall', href: '/practice-areas/personal-injury/slip-and-fall' },
              {
                name: 'Medical Malpractice',
                href: '/practice-areas/personal-injury/medical-malpractice',
              },
              { name: 'Wrongful Death', href: '/practice-areas/personal-injury/wrongful-death' },
              {
                name: 'Premises Liability',
                href: '/practice-areas/personal-injury/premises-liability',
              },
              {
                name: 'Product Liability',
                href: '/practice-areas/personal-injury/product-liability',
              },
            ],
          },
          {
            name: "Workers' Compensation",
            href: '/practice-areas/workers-compensation',
            submenu: [
              {
                name: 'Construction Injuries',
                href: '/practice-areas/workers-compensation/construction-injuries',
              },
              {
                name: 'Workplace Accidents',
                href: '/practice-areas/workers-compensation/workplace-accidents',
              },
              {
                name: 'Repetitive Stress Injuries',
                href: '/practice-areas/workers-compensation/repetitive-stress-injuries',
              },
              {
                name: 'Occupational Illness',
                href: '/practice-areas/workers-compensation/occupational-illness',
              },
              {
                name: 'Third-Party Claims',
                href: '/practice-areas/workers-compensation/third-party-claims',
              },
              { name: 'Denied Claims', href: '/practice-areas/workers-compensation/denied-claims' },
              {
                name: 'Return to Work',
                href: '/practice-areas/workers-compensation/return-to-work',
              },
              {
                name: 'Disability Benefits',
                href: '/practice-areas/workers-compensation/disability-benefits',
              },
            ],
          },
          {
            name: 'Criminal Defense',
            href: '/practice-areas/criminal-defense',
            submenu: [
              { name: 'DUI/DWI', href: '/practice-areas/criminal-defense/dui-dwi' },
              { name: 'Drug Crimes', href: '/practice-areas/criminal-defense/drug-crimes' },
              {
                name: 'Assault & Battery',
                href: '/practice-areas/criminal-defense/assault-battery',
              },
              {
                name: 'Domestic Violence',
                href: '/practice-areas/criminal-defense/domestic-violence',
              },
              {
                name: 'Theft & Property Crimes',
                href: '/practice-areas/criminal-defense/theft-property-crimes',
              },
              {
                name: 'White Collar Crimes',
                href: '/practice-areas/criminal-defense/white-collar-crimes',
              },
              { name: 'Federal Crimes', href: '/practice-areas/criminal-defense/federal-crimes' },
              { name: 'Expungement', href: '/practice-areas/criminal-defense/expungement' },
              {
                name: 'Probation Violation',
                href: '/practice-areas/criminal-defense/probation-violation',
              },
              {
                name: 'Juvenile Defense',
                href: '/practice-areas/criminal-defense/juvenile-defense',
              },
            ],
          },
          {
            name: 'Family Law',
            href: '/practice-areas/family-law',
            submenu: [
              { name: 'Divorce', href: '/practice-areas/family-law/divorce' },
              { name: 'Child Custody', href: '/practice-areas/family-law/child-custody' },
              { name: 'Child Support', href: '/practice-areas/family-law/child-support' },
              {
                name: 'Alimony/Spousal Support',
                href: '/practice-areas/family-law/alimony-spousal-support',
              },
              { name: 'Property Division', href: '/practice-areas/family-law/property-division' },
              {
                name: 'Prenuptial Agreements',
                href: '/practice-areas/family-law/prenuptial-agreements',
              },
              { name: 'Adoption', href: '/practice-areas/family-law/adoption' },
              {
                name: 'Domestic Violence Protection',
                href: '/practice-areas/family-law/domestic-violence-protection',
              },
              { name: 'Guardianship', href: '/practice-areas/family-law/guardianship' },
            ],
          },
          {
            name: 'Traffic Violations',
            href: '/practice-areas/traffic-violations',
            submenu: [
              {
                name: 'Speeding Tickets',
                href: '/practice-areas/traffic-violations/speeding-tickets',
              },
              {
                name: 'Reckless Driving',
                href: '/practice-areas/traffic-violations/reckless-driving',
              },
              {
                name: 'License Suspension',
                href: '/practice-areas/traffic-violations/license-suspension',
              },
              { name: 'CDL Violations', href: '/practice-areas/traffic-violations/cdl-violations' },
              { name: 'Hit and Run', href: '/practice-areas/traffic-violations/hit-and-run' },
              {
                name: 'Driving Without License',
                href: '/practice-areas/traffic-violations/driving-without-license',
              },
              {
                name: 'Traffic Court Representation',
                href: '/practice-areas/traffic-violations/traffic-court-representation',
              },
            ],
          },
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
          {
            name: 'Ley de Inmigración',
            href: '/es/areas-de-practica/inmigracion',
            submenu: [
              {
                name: 'Inmigración Afirmativa',
                href: '/es/areas-de-practica/inmigracion/afirmativa',
              },
              {
                name: 'Peticiones Familiares',
                href: '/es/areas-de-practica/inmigracion/afirmativa/peticiones-familiares',
              },
              { name: 'DACA', href: '/es/areas-de-practica/inmigracion/afirmativa/daca' },
              { name: 'TPS', href: '/es/areas-de-practica/inmigracion/afirmativa/tps' },
              {
                name: 'Tarjetas de Residencia',
                href: '/es/areas-de-practica/inmigracion/afirmativa/tarjetas-residencia',
              },
              {
                name: 'Ciudadanía',
                href: '/es/areas-de-practica/inmigracion/afirmativa/ciudadania',
              },
              {
                name: 'Defensa contra Deportación',
                href: '/es/areas-de-practica/inmigracion/defensa-deportacion',
              },
              {
                name: 'Asilo',
                href: '/es/areas-de-practica/inmigracion/defensa-deportacion/asilo',
              },
              {
                name: 'Cancelación de Deportación',
                href: '/es/areas-de-practica/inmigracion/defensa-deportacion/cancelacion-deportacion',
              },
              {
                name: 'Audiencias de Fianza',
                href: '/es/areas-de-practica/inmigracion/defensa-deportacion/audiencias-fianza',
              },
              {
                name: 'Inmigración de Negocios',
                href: '/es/areas-de-practica/inmigracion/negocios',
              },
              { name: 'Visas H-1B', href: '/es/areas-de-practica/inmigracion/negocios/visas-h1b' },
              { name: 'Visas L-1', href: '/es/areas-de-practica/inmigracion/negocios/visas-l1' },
              {
                name: 'Visas E-2 de Inversionista',
                href: '/es/areas-de-practica/inmigracion/negocios/visas-e2-inversionista',
              },
              {
                name: 'Exenciones de Inadmisibilidad',
                href: '/es/areas-de-practica/inmigracion/exenciones-inadmisibilidad',
              },
              { name: 'Visa U / VAWA', href: '/es/areas-de-practica/inmigracion/visa-u-vawa' },
              { name: 'Visa T', href: '/es/areas-de-practica/inmigracion/visa-t' },
            ],
          },
          {
            name: 'Lesiones Personales',
            href: '/es/areas-de-practica/lesiones-personales',
            submenu: [
              {
                name: 'Accidentes de Auto',
                href: '/es/areas-de-practica/lesiones-personales/accidentes-auto',
              },
              {
                name: 'Accidentes de Motocicleta',
                href: '/es/areas-de-practica/lesiones-personales/accidentes-motocicleta',
              },
              {
                name: 'Accidentes de Camión',
                href: '/es/areas-de-practica/lesiones-personales/accidentes-camion',
              },
              {
                name: 'Accidentes de Peatones',
                href: '/es/areas-de-practica/lesiones-personales/accidentes-peatones',
              },
              {
                name: 'Accidentes de Bicicleta',
                href: '/es/areas-de-practica/lesiones-personales/accidentes-bicicleta',
              },
              {
                name: 'Resbalones y Caídas',
                href: '/es/areas-de-practica/lesiones-personales/resbalones-caidas',
              },
              {
                name: 'Negligencia Médica',
                href: '/es/areas-de-practica/lesiones-personales/negligencia-medica',
              },
              {
                name: 'Muerte Injusta',
                href: '/es/areas-de-practica/lesiones-personales/muerte-injusta',
              },
              {
                name: 'Responsabilidad de Locales',
                href: '/es/areas-de-practica/lesiones-personales/responsabilidad-locales',
              },
              {
                name: 'Responsabilidad de Producto',
                href: '/es/areas-de-practica/lesiones-personales/responsabilidad-producto',
              },
            ],
          },
          {
            name: 'Compensación Laboral',
            href: '/es/areas-de-practica/compensacion-laboral',
            submenu: [
              {
                name: 'Lesiones de Construcción',
                href: '/es/areas-de-practica/compensacion-laboral/lesiones-construccion',
              },
              {
                name: 'Accidentes Laborales',
                href: '/es/areas-de-practica/compensacion-laboral/accidentes-laborales',
              },
              {
                name: 'Lesiones por Estrés Repetitivo',
                href: '/es/areas-de-practica/compensacion-laboral/lesiones-estres-repetitivo',
              },
              {
                name: 'Enfermedades Ocupacionales',
                href: '/es/areas-de-practica/compensacion-laboral/enfermedades-ocupacionales',
              },
              {
                name: 'Reclamos de Terceros',
                href: '/es/areas-de-practica/compensacion-laboral/reclamos-terceros',
              },
              {
                name: 'Reclamos Negados',
                href: '/es/areas-de-practica/compensacion-laboral/reclamos-negados',
              },
              {
                name: 'Regreso al Trabajo',
                href: '/es/areas-de-practica/compensacion-laboral/regreso-trabajo',
              },
              {
                name: 'Beneficios por Discapacidad',
                href: '/es/areas-de-practica/compensacion-laboral/beneficios-discapacidad',
              },
            ],
          },
          {
            name: 'Defensa Criminal',
            href: '/es/areas-de-practica/defensa-criminal',
            submenu: [
              { name: 'DUI/DWI', href: '/es/areas-de-practica/defensa-criminal/dui-dwi' },
              {
                name: 'Delitos de Drogas',
                href: '/es/areas-de-practica/defensa-criminal/delitos-drogas',
              },
              {
                name: 'Asalto y Agresión',
                href: '/es/areas-de-practica/defensa-criminal/asalto-agresion',
              },
              {
                name: 'Violencia Doméstica',
                href: '/es/areas-de-practica/defensa-criminal/violencia-domestica',
              },
              {
                name: 'Robo y Delitos de Propiedad',
                href: '/es/areas-de-practica/defensa-criminal/robo-delitos-propiedad',
              },
              {
                name: 'Delitos de Cuello Blanco',
                href: '/es/areas-de-practica/defensa-criminal/delitos-cuello-blanco',
              },
              {
                name: 'Delitos Federales',
                href: '/es/areas-de-practica/defensa-criminal/delitos-federales',
              },
              {
                name: 'Expunción de Antecedentes',
                href: '/es/areas-de-practica/defensa-criminal/expuncion-antecedentes',
              },
              {
                name: 'Violación de Libertad Condicional',
                href: '/es/areas-de-practica/defensa-criminal/violacion-libertad-condicional',
              },
              {
                name: 'Defensa de Menores',
                href: '/es/areas-de-practica/defensa-criminal/defensa-menores',
              },
            ],
          },
          {
            name: 'Derecho Familiar',
            href: '/es/areas-de-practica/derecho-familia',
            submenu: [
              { name: 'Divorcio', href: '/es/areas-de-practica/derecho-familia/divorcio' },
              {
                name: 'Custodia de Hijos',
                href: '/es/areas-de-practica/derecho-familia/custodia-hijos',
              },
              {
                name: 'Manutención de Hijos',
                href: '/es/areas-de-practica/derecho-familia/manutencion-hijos',
              },
              {
                name: 'Pensión Alimenticia',
                href: '/es/areas-de-practica/derecho-familia/pension-alimenticia',
              },
              {
                name: 'División de Propiedad',
                href: '/es/areas-de-practica/derecho-familia/division-propiedad',
              },
              {
                name: 'Acuerdos Prenupciales',
                href: '/es/areas-de-practica/derecho-familia/acuerdos-prenupciales',
              },
              { name: 'Adopción', href: '/es/areas-de-practica/derecho-familia/adopcion' },
              {
                name: 'Protección contra Violencia Doméstica',
                href: '/es/areas-de-practica/derecho-familia/proteccion-violencia-domestica',
              },
              { name: 'Tutela Legal', href: '/es/areas-de-practica/derecho-familia/tutela-legal' },
            ],
          },
          {
            name: 'Infracciones de Tráfico',
            href: '/es/areas-de-practica/infracciones-transito',
            submenu: [
              {
                name: 'Multas por Exceso de Velocidad',
                href: '/es/areas-de-practica/infracciones-transito/multas-exceso-velocidad',
              },
              {
                name: 'Conducción Imprudente',
                href: '/es/areas-de-practica/infracciones-transito/conduccion-imprudente',
              },
              {
                name: 'Suspensión de Licencia',
                href: '/es/areas-de-practica/infracciones-transito/suspension-licencia',
              },
              {
                name: 'Violaciones CDL',
                href: '/es/areas-de-practica/infracciones-transito/violaciones-cdl',
              },
              {
                name: 'Atropello y Fuga',
                href: '/es/areas-de-practica/infracciones-transito/atropello-fuga',
              },
              {
                name: 'Conducir sin Licencia',
                href: '/es/areas-de-practica/infracciones-transito/conducir-sin-licencia',
              },
              {
                name: 'Representación en Corte de Tráfico',
                href: '/es/areas-de-practica/infracciones-transito/representacion-corte-trafico',
              },
            ],
          },
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
            <SimpleLanguageSwitcher
              variant="minimal"
              showFlags={false}
              showLabels={true}
              className="text-xs"
            />
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
                          className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-xl border border-neutral-200 overflow-hidden z-50 max-h-96 overflow-y-auto"
                        >
                          <div className="py-2">
                            {item.submenu.map(subItem => (
                              <div key={subItem.name}>
                                <Link
                                  href={subItem.href}
                                  className={`block px-4 py-2.5 text-sm transition-colors ${
                                    subItem.submenu
                                      ? 'font-medium text-neutral-800 hover:bg-primary/5 border-b border-neutral-100'
                                      : 'text-neutral-700 hover:bg-primary/10 hover:text-primary pl-6'
                                  }`}
                                  onClick={() => {
                                    if (!subItem.submenu) {
                                      setActiveDropdown(null);
                                    }
                                  }}
                                >
                                  {subItem.name}
                                  {subItem.submenu && (
                                    <span className="text-xs text-primary ml-1">→</span>
                                  )}
                                </Link>
                                {subItem.submenu && (
                                  <div className="bg-neutral-50/50">
                                    {subItem.submenu.map(nestedItem => (
                                      <Link
                                        key={nestedItem.name}
                                        href={nestedItem.href}
                                        className="block px-8 py-1.5 text-xs text-neutral-600 hover:bg-primary/10 hover:text-primary transition-colors border-l-2 border-transparent hover:border-primary"
                                        onClick={() => {
                                          setActiveDropdown(null);
                                        }}
                                      >
                                        {nestedItem.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
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
