'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

  // Auto-close dropdown after 30 seconds to prevent stuck states
  useEffect(() => {
    if (activeDropdown) {
      const autoCloseTimeout = setTimeout(() => {
        setActiveDropdown(null);
        setActiveSubmenu(null);
      }, 30000); // Auto close after 30 seconds

      return () => clearTimeout(autoCloseTimeout);
    }
  }, [activeDropdown]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if click is outside the navigation area
      if (!target.closest('.desktop-navigation') && !target.closest('.mobile-navigation')) {
        setActiveDropdown(null);
        setActiveSubmenu(null);
        if (dropdownTimeout) {
          clearTimeout(dropdownTimeout);
          setDropdownTimeout(null);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [dropdownTimeout]);

  const handleDropdownToggle = (itemName: string) => {
    if (activeDropdown === itemName) {
      setActiveDropdown(null);
      setActiveSubmenu(null);
    } else {
      setActiveDropdown(itemName);
      setActiveSubmenu(null);
    }
    // Clear any existing timeout
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
  };

  const handleDropdownMouseEnter = (itemName: string) => {
    // Clear any pending close timeout
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setActiveDropdown(itemName);
    setActiveSubmenu(null);
  };

  const handleDropdownMouseLeave = () => {
    // Delay before closing to allow movement between elements
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
      setActiveSubmenu(null);
    }, 150); // Small delay to allow moving between menu and dropdown
    setDropdownTimeout(timeout);
  };

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
              {
                name: 'Family-Based Immigration',
                href: '/practice-areas/immigration/family-based',
                submenu: [
                  {
                    name: 'Family Petitions (I-130)',
                    href: '/practice-areas/immigration/family-based/petitions',
                  },
                  {
                    name: 'K-1 Fiancé(e) Visa',
                    href: '/practice-areas/immigration/family-based/k1-visa',
                  },
                  {
                    name: 'Waivers (I-601/I-601A)',
                    href: '/practice-areas/immigration/family-based/waivers',
                  },
                  {
                    name: 'Naturalization/Citizenship',
                    href: '/practice-areas/immigration/family-based/naturalization',
                  },
                  {
                    name: 'Removal of Conditions (I-751)',
                    href: '/practice-areas/immigration/family-based/removal-conditions',
                  },
                  {
                    name: 'Green Card Renewal',
                    href: '/practice-areas/immigration/family-based/green-card-renewal',
                  },
                  {
                    name: 'Adjustment of Status',
                    href: '/practice-areas/immigration/family-based/adjustment-status',
                  },
                  {
                    name: 'Consular Processing',
                    href: '/practice-areas/immigration/family-based/consular-processing',
                  },
                ],
              },
              {
                name: 'Humanitarian Immigration',
                href: '/practice-areas/immigration/humanitarian',
                submenu: [
                  { name: 'Asylum', href: '/practice-areas/immigration/humanitarian/asylum' },
                  {
                    name: 'DACA (Deferred Action)',
                    href: '/practice-areas/immigration/humanitarian/daca',
                  },
                  {
                    name: 'TPS (Temporary Protected Status)',
                    href: '/practice-areas/immigration/humanitarian/tps',
                  },
                  {
                    name: 'U Visa (Crime Victims)',
                    href: '/practice-areas/immigration/humanitarian/u-visa',
                  },
                  {
                    name: 'T Visa (Trafficking Victims)',
                    href: '/practice-areas/immigration/humanitarian/t-visa',
                  },
                  {
                    name: 'VAWA (Violence Against Women Act)',
                    href: '/practice-areas/immigration/humanitarian/vawa',
                  },
                  {
                    name: 'Special Immigrant Juvenile Status',
                    href: '/practice-areas/immigration/humanitarian/sijs',
                  },
                  {
                    name: 'Parole & Humanitarian Parole',
                    href: '/practice-areas/immigration/humanitarian/parole',
                  },
                ],
              },
              {
                name: 'Removal Defense',
                href: '/practice-areas/immigration/removal-defense',
                submenu: [
                  {
                    name: '42A Cancellation (Non-LPR)',
                    href: '/practice-areas/immigration/removal-defense/42a-cancellation',
                  },
                  {
                    name: '42B Cancellation (LPR)',
                    href: '/practice-areas/immigration/removal-defense/42b-cancellation',
                  },
                  {
                    name: 'Asylum Defense',
                    href: '/practice-areas/immigration/removal-defense/asylum-defense',
                  },
                  {
                    name: 'Withholding of Removal',
                    href: '/practice-areas/immigration/removal-defense/withholding',
                  },
                  {
                    name: 'CAT Protection',
                    href: '/practice-areas/immigration/removal-defense/cat-protection',
                  },
                  {
                    name: 'Bond Hearings',
                    href: '/practice-areas/immigration/removal-defense/bond-hearings',
                  },
                  {
                    name: 'Appeals (BIA/Circuit Court)',
                    href: '/practice-areas/immigration/removal-defense/appeals',
                  },
                  {
                    name: 'Motions to Reopen',
                    href: '/practice-areas/immigration/removal-defense/motions-reopen',
                  },
                  {
                    name: 'Prosecutorial Discretion',
                    href: '/practice-areas/immigration/removal-defense/prosecutorial-discretion',
                  },
                  {
                    name: 'Voluntary Departure',
                    href: '/practice-areas/immigration/removal-defense/voluntary-departure',
                  },
                ],
              },
              {
                name: 'Business Immigration',
                href: '/practice-areas/immigration/business',
                submenu: [
                  {
                    name: 'H-1B Specialty Occupation',
                    href: '/practice-areas/immigration/business/h1b-visa',
                  },
                  {
                    name: 'L-1 Intracompany Transfer',
                    href: '/practice-areas/immigration/business/l1-visa',
                  },
                  {
                    name: 'E-2 Treaty Investor',
                    href: '/practice-areas/immigration/business/e2-visa',
                  },
                  {
                    name: 'EB-1 Extraordinary Ability',
                    href: '/practice-areas/immigration/business/eb1-visa',
                  },
                  {
                    name: 'EB-2 Advanced Degree/NIW',
                    href: '/practice-areas/immigration/business/eb2-visa',
                  },
                  {
                    name: 'EB-3 Skilled Workers',
                    href: '/practice-areas/immigration/business/eb3-visa',
                  },
                  {
                    name: 'EB-5 Investment',
                    href: '/practice-areas/immigration/business/eb5-investment',
                  },
                  {
                    name: 'PERM Labor Certification',
                    href: '/practice-areas/immigration/business/perm',
                  },
                  {
                    name: 'O-1 Extraordinary Ability',
                    href: '/practice-areas/immigration/business/o1-visa',
                  },
                  {
                    name: 'TN NAFTA Professional',
                    href: '/practice-areas/immigration/business/tn-visa',
                  },
                ],
              },
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
      { name: 'Payment', href: 'https://secure.lawpay.com/pages/vasquezlawfirm/operating1' },
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
                name: 'Inmigración Familiar',
                href: '/es/areas-de-practica/inmigracion/familiar',
                submenu: [
                  {
                    name: 'Peticiones Familiares (I-130)',
                    href: '/es/areas-de-practica/inmigracion/familiar/peticiones',
                  },
                  {
                    name: 'Visa K-1 de Prometido(a)',
                    href: '/es/areas-de-practica/inmigracion/familiar/visa-k1',
                  },
                  {
                    name: 'Perdones (I-601/I-601A)',
                    href: '/es/areas-de-practica/inmigracion/familiar/perdones',
                  },
                  {
                    name: 'Naturalización/Ciudadanía',
                    href: '/es/areas-de-practica/inmigracion/familiar/naturalizacion',
                  },
                  {
                    name: 'Remover Condiciones (I-751)',
                    href: '/es/areas-de-practica/inmigracion/familiar/remover-condiciones',
                  },
                  {
                    name: 'Renovación de Green Card',
                    href: '/es/areas-de-practica/inmigracion/familiar/renovacion-green-card',
                  },
                  {
                    name: 'Ajuste de Estatus',
                    href: '/es/areas-de-practica/inmigracion/familiar/ajuste-estatus',
                  },
                  {
                    name: 'Proceso Consular',
                    href: '/es/areas-de-practica/inmigracion/familiar/proceso-consular',
                  },
                ],
              },
              {
                name: 'Inmigración Humanitaria',
                href: '/es/areas-de-practica/inmigracion/humanitaria',
                submenu: [
                  { name: 'Asilo', href: '/es/areas-de-practica/inmigracion/humanitaria/asilo' },
                  {
                    name: 'DACA (Acción Diferida)',
                    href: '/es/areas-de-practica/inmigracion/humanitaria/daca',
                  },
                  {
                    name: 'TPS (Estatus de Protección Temporal)',
                    href: '/es/areas-de-practica/inmigracion/humanitaria/tps',
                  },
                  {
                    name: 'Visa U (Víctimas de Crimen)',
                    href: '/es/areas-de-practica/inmigracion/humanitaria/visa-u',
                  },
                  {
                    name: 'Visa T (Víctimas de Tráfico)',
                    href: '/es/areas-de-practica/inmigracion/humanitaria/visa-t',
                  },
                  {
                    name: 'VAWA (Ley de Violencia Contra la Mujer)',
                    href: '/es/areas-de-practica/inmigracion/humanitaria/vawa',
                  },
                  {
                    name: 'Estatus Especial de Inmigrante Juvenil',
                    href: '/es/areas-de-practica/inmigracion/humanitaria/sijs',
                  },
                  {
                    name: 'Parole Humanitario',
                    href: '/es/areas-de-practica/inmigracion/humanitaria/parole',
                  },
                ],
              },
              {
                name: 'Defensa de Deportación',
                href: '/es/areas-de-practica/inmigracion/defensa-deportacion',
                submenu: [
                  {
                    name: 'Cancelación 42A (No-LPR)',
                    href: '/es/areas-de-practica/inmigracion/defensa-deportacion/cancelacion-42a',
                  },
                  {
                    name: 'Cancelación 42B (LPR)',
                    href: '/es/areas-de-practica/inmigracion/defensa-deportacion/cancelacion-42b',
                  },
                  {
                    name: 'Defensa de Asilo',
                    href: '/es/areas-de-practica/inmigracion/defensa-deportacion/defensa-asilo',
                  },
                  {
                    name: 'Suspensión de Deportación',
                    href: '/es/areas-de-practica/inmigracion/defensa-deportacion/suspension',
                  },
                  {
                    name: 'Protección CAT',
                    href: '/es/areas-de-practica/inmigracion/defensa-deportacion/proteccion-cat',
                  },
                  {
                    name: 'Audiencias de Fianza',
                    href: '/es/areas-de-practica/inmigracion/defensa-deportacion/audiencias-fianza',
                  },
                  {
                    name: 'Apelaciones (BIA/Corte de Circuito)',
                    href: '/es/areas-de-practica/inmigracion/defensa-deportacion/apelaciones',
                  },
                  {
                    name: 'Mociones de Reapertura',
                    href: '/es/areas-de-practica/inmigracion/defensa-deportacion/mociones-reapertura',
                  },
                  {
                    name: 'Discreción Fiscal',
                    href: '/es/areas-de-practica/inmigracion/defensa-deportacion/discrecion-fiscal',
                  },
                  {
                    name: 'Salida Voluntaria',
                    href: '/es/areas-de-practica/inmigracion/defensa-deportacion/salida-voluntaria',
                  },
                ],
              },
              {
                name: 'Inmigración de Negocios',
                href: '/es/areas-de-practica/inmigracion/negocios',
                submenu: [
                  {
                    name: 'H-1B Ocupación Especializada',
                    href: '/es/areas-de-practica/inmigracion/negocios/visa-h1b',
                  },
                  {
                    name: 'L-1 Transferencia Intracompañía',
                    href: '/es/areas-de-practica/inmigracion/negocios/visa-l1',
                  },
                  {
                    name: 'E-2 Inversionista por Tratado',
                    href: '/es/areas-de-practica/inmigracion/negocios/visa-e2',
                  },
                  {
                    name: 'EB-1 Habilidad Extraordinaria',
                    href: '/es/areas-de-practica/inmigracion/negocios/visa-eb1',
                  },
                  {
                    name: 'EB-2 Grado Avanzado/NIW',
                    href: '/es/areas-de-practica/inmigracion/negocios/visa-eb2',
                  },
                  {
                    name: 'EB-3 Trabajadores Calificados',
                    href: '/es/areas-de-practica/inmigracion/negocios/visa-eb3',
                  },
                  {
                    name: 'EB-5 Inversión',
                    href: '/es/areas-de-practica/inmigracion/negocios/inversion-eb5',
                  },
                  {
                    name: 'Certificación Laboral PERM',
                    href: '/es/areas-de-practica/inmigracion/negocios/perm',
                  },
                  {
                    name: 'O-1 Habilidad Extraordinaria',
                    href: '/es/areas-de-practica/inmigracion/negocios/visa-o1',
                  },
                  {
                    name: 'TN Profesional NAFTA',
                    href: '/es/areas-de-practica/inmigracion/negocios/visa-tn',
                  },
                ],
              },
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
      { name: 'Pago', href: 'https://secure.lawpay.com/pages/vasquezlawfirm/operating1' },
    ],
  };

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
              <span className="hidden sm:inline text-primary mx-4">•</span>
              <SimpleLanguageSwitcher
                variant="minimal"
                showFlags={false}
                showLabels={true}
                className="text-xs"
              />
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
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              href={language === 'es' ? '/es' : '/'} 
              className="flex items-center cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = language === 'es' ? '/es' : '/';
              }}
            >
              <Image
                src="/images/vasquez-logo.png"
                alt="Vasquez Law Firm"
                width={200}
                height={70}
                className="h-12 w-auto cursor-pointer"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center desktop-navigation">
              <div className="flex space-x-6">
                {navigation[language].map(item => (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => {
                      if (item.submenu) {
                        handleDropdownMouseEnter(item.name);
                      }
                    }}
                    onMouseLeave={() => {
                      if (item.submenu) {
                        handleDropdownMouseLeave();
                      }
                    }}
                    onClick={(e) => {
                      if (item.submenu) {
                        e.stopPropagation();
                        handleDropdownToggle(item.name);
                      }
                    }}
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
                        onClick={(e) => {
                          if (item.name === 'Home' || item.name === 'Inicio') {
                            e.preventDefault();
                            window.location.href = item.href;
                          }
                        }}
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
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9974D]"
                            transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                          />
                        )}
                      </Link>
                    )}

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {item.submenu && activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 -mt-1 pt-1 w-[600px] bg-transparent pointer-events-auto z-[500]"
                          onMouseEnter={() => {
                            handleDropdownMouseEnter(item.name);
                          }}
                          onMouseLeave={() => {
                            handleDropdownMouseLeave();
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
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
                                  <div key={practice.name} className="border-b border-neutral-100 border-r last:border-r-0 even:border-r-0">
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
                                              className="pl-4 relative"
                                              onMouseEnter={() => setActiveSubmenu(subCategory.name)}
                                              onMouseLeave={() => setActiveSubmenu(null)}
                                            >
                                              <Link
                                                href={subCategory.href}
                                                className="block py-2 text-sm font-medium text-gray-600 hover:text-burgundy-700 hover:translate-x-1 transition-all duration-200 flex items-center justify-between group"
                                                onClick={() => setActiveDropdown(null)}
                                              >
                                                <span className="flex items-center">
                                                  <span className="w-1.5 h-1.5 bg-gold-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                                  {subCategory.name}
                                                </span>
                                                {subCategory.submenu && (
                                                  <span className="text-xs text-gold-500">▶</span>
                                                )}
                                              </Link>
                                              {subCategory.submenu && activeSubmenu === subCategory.name && (
                                                <div className="absolute left-full top-0 ml-2 w-64 bg-white shadow-lg rounded-md border border-gray-200 z-[160]">
                                                  <div className="py-2">
                                                    {subCategory.submenu.map(specificCase => (
                                                      <Link
                                                        key={specificCase.name}
                                                        href={specificCase.href}
                                                        className="block px-4 py-1.5 text-xs text-neutral-600 hover:bg-primary/10 hover:text-primary transition-colors"
                                                        onClick={() => {
                                                          setActiveDropdown(null);
                                                          setActiveSubmenu(null);
                                                        }}
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
                                    onClick={() => setActiveDropdown(null)}
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
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                href={language === 'es' ? '/es/contacto' : '/contact'}
                className="ml-8 px-6 py-2.5 bg-gradient-to-r from-[#C9974D] to-[#B08740] text-white text-sm font-bold rounded-full hover:from-[#B08740] hover:to-[#906431] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
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
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
            >
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
                <div className="pt-4 mt-4 border-t border-neutral-200">
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
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
