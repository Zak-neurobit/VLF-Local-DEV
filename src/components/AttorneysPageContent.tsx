'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Script from 'next/script';
// Dynamic import for client-side only rendering
const ChatWidget = dynamic(() => import('@/components/ChatWidget').then(mod => mod.ChatWidget), {
  ssr: false,
});
import { Globe, Scale } from 'lucide-react';
import { generateAttorneySchema } from '@/components/SEO/schemas';
import AttorneyPhoto from '@/components/AttorneyPhoto';

interface AttorneysPageContentProps {
  language: 'en' | 'es';
}

export default function AttorneysPageContent({ language }: AttorneysPageContentProps) {
  const attorneys = [
    {
      id: 'william-vasquez',
      name: 'William J. Vasquez',
      title: {
        en: 'Founding Partner',
        es: 'Socio Fundador',
      },
      image: '/images/attorneys/william-vasquez.HEIC',
      bio: {
        en: 'William J. Vasquez is the founding partner of Vasquez Law Firm, PLLC. Licensed since 2011, he has dedicated his career to fighting for the rights of immigrants, injured workers, and those facing criminal charges throughout North Carolina and Florida.',
        es: 'William J. Vasquez es el socio fundador de Vasquez Law Firm, PLLC. Licenciado desde 2011, ha dedicado su carrera a luchar por los derechos de inmigrantes, trabajadores lesionados y aquellos que enfrentan cargos criminales en Carolina del Norte y Florida.',
      },
      specialties: {
        en: ['Immigration Law', 'Personal Injury', "Workers' Compensation", 'Criminal Defense'],
        es: [
          'Ley de Inmigración',
          'Lesiones Personales',
          'Compensación Laboral',
          'Defensa Criminal',
        ],
      },
      languages: ['English', 'Spanish'],
      barAdmissions: ['North Carolina', 'Florida'],
      education: [
        {
          degree: 'J.D.',
          school: 'North Carolina Central University School of Law',
          year: '2011',
        },
        {
          degree: 'B.A.',
          school: 'University of North Carolina at Chapel Hill',
          year: '2000',
        },
      ],
      featured: true,
    },
    {
      id: 'adrianna-ingram',
      name: 'Adrianna Ingram',
      title: {
        en: 'Family Law Attorney',
        es: 'Abogada de Derecho Familiar',
      },
      image: '/images/attorneys/adriana-ingram.webp',
      bio: {
        en: 'Adrianna Ingram is an experienced family and criminal attorney who provides dedicated legal representation to protect your rights and family in every case.',
        es: 'Adrianna Ingram es una abogada experimentada en derecho familiar y criminal que brinda representación legal dedicada para proteger sus derechos y familia en cada caso.',
      },
      specialties: {
        en: ['Family Law', 'Criminal Defense', 'Divorce', 'Child Custody'],
        es: ['Derecho Familiar', 'Defensa Criminal', 'Divorcio', 'Custodia de Menores'],
      },
      languages: ['English'],
      barAdmissions: ['North Carolina'],
      education: [
        {
          degree: 'J.D.',
          school: 'Elon University School of Law',
          year: '2015',
        },
        {
          degree: 'B.A.',
          school: 'North Carolina State University',
          year: '2012',
        },
      ],
    },
    {
      id: 'christopher-afanador',
      name: 'Christopher Afanador',
      title: {
        en: 'Immigration Attorney',
        es: 'Abogado de Inmigración',
      },
      image: '/images/attorneys/christopher-afanador.jpg',
      bio: {
        en: 'Christopher Afanador is a dedicated immigration attorney who helps clients navigate the complex USCIS immigration process with expertise and compassion.',
        es: 'Christopher Afanador es un dedicado abogado de inmigración que ayuda a los clientes a navegar el complejo proceso de inmigración de USCIS con experiencia y compasión.',
      },
      specialties: {
        en: ['Immigration Law', 'USCIS Applications', 'Green Cards', 'Citizenship'],
        es: ['Ley de Inmigración', 'Aplicaciones USCIS', 'Tarjetas Verdes', 'Ciudadanía'],
      },
      languages: ['English', 'Spanish'],
      barAdmissions: ['North Carolina'],
      education: [
        {
          degree: 'J.D.',
          school: 'Charlotte School of Law',
          year: '2013',
        },
        {
          degree: 'B.S.',
          school: 'University of Central Florida',
          year: '2010',
        },
      ],
    },
    {
      id: 'jillian-baucom',
      name: 'Jillian Baucom',
      title: {
        en: 'Immigration Attorney',
        es: 'Abogada de Inmigración',
      },
      image: '/images/attorneys/jillian-baucom.jpg',
      bio: {
        en: 'Jillian Baucom is an experienced immigration attorney specializing in removal defense, dedicated to helping clients navigate the immigration process smoothly.',
        es: 'Jillian Baucom es una abogada de inmigración experimentada especializada en defensa de deportación, dedicada a ayudar a los clientes a navegar el proceso de inmigración sin problemas.',
      },
      specialties: {
        en: ['Immigration Law', 'Removal Defense', 'Deportation Defense', 'Immigration Court'],
        es: ['Ley de Inmigración', 'Defensa de Deportación', 'Defensa de Remoción', 'Corte de Inmigración'],
      },
      languages: ['English', 'Spanish'],
      barAdmissions: ['North Carolina'],
      education: [
        {
          degree: 'J.D.',
          school: 'University of North Carolina School of Law',
          year: '2016',
        },
        {
          degree: 'B.A.',
          school: 'Duke University',
          year: '2013',
        },
      ],
    },
    {
      id: 'roselyn-torrellas',
      name: 'Roselyn V. Torrellas',
      title: {
        en: 'Immigration Attorney',
        es: 'Abogada de Inmigración',
      },
      image: '/images/attorneys/roselyn-torrellas.jpg',
      bio: {
        en: 'Roselyn V. Torrellas is an experienced immigration attorney who provides dedicated legal representation at various locations in NC and other states.',
        es: 'Roselyn V. Torrellas es una abogada de inmigración experimentada que brinda representación legal dedicada en varias ubicaciones en NC y otros estados.',
      },
      specialties: {
        en: ['Immigration Law', 'Family Immigration', 'Business Immigration', 'Deportation Defense'],
        es: ['Ley de Inmigración', 'Inmigración Familiar', 'Inmigración Empresarial', 'Defensa de Deportación'],
      },
      languages: ['English', 'Spanish'],
      barAdmissions: ['North Carolina'],
      education: [
        {
          degree: 'J.D.',
          school: 'North Carolina Central University School of Law',
          year: '2009',
        },
        {
          degree: 'B.A.',
          school: 'Universidad Central de Venezuela',
          year: '2005',
        },
      ],
    },
  ];

  const content = {
    en: {
      title: 'Our Attorneys',
      subtitle: 'Experienced Legal Team Fighting for Your Rights',
      description:
        'Meet our dedicated team of attorneys who combine decades of legal expertise with compassionate client service to deliver exceptional results.',
      viewProfile: 'View Full Profile',
      specialties: 'Practice Areas',
      languages: 'Languages',
      barAdmissions: 'Bar Admissions',
      education: 'Education',
      schedule: 'Schedule Consultation',
      teamApproach: 'Our Team Approach',
      teamDescription:
        "At Vasquez Law Firm, we believe in collaborative representation. Our attorneys work together, leveraging each other's strengths to provide comprehensive legal solutions for our clients throughout North Carolina and Florida.",
      whyChoose: 'Why Choose Our Attorneys?',
      experience: '100+ Years Combined Experience',
      technology: 'Cutting-Edge Legal Strategies',
      bilingual: 'Multilingual Team',
      results: 'Thousands of Successful Cases',
    },
    es: {
      title: 'Nuestros Abogados',
      subtitle: 'Equipo Legal Experimentado Luchando por Sus Derechos',
      description:
        'Conozca a nuestro dedicado equipo de abogados que combinan décadas de experiencia legal con servicio compasivo al cliente para ofrecer resultados excepcionales.',
      viewProfile: 'Ver Perfil Completo',
      specialties: 'Áreas de Práctica',
      languages: 'Idiomas',
      barAdmissions: 'Admisiones al Colegio de Abogados',
      education: 'Educación',
      schedule: 'Agendar Consulta',
      teamApproach: 'Nuestro Enfoque de Equipo',
      teamDescription:
        'En Vasquez Law Firm, creemos en la representación colaborativa. Nuestros abogados trabajan juntos, aprovechando las fortalezas de cada uno para brindar soluciones legales integrales a nuestros clientes en Carolina del Norte y Florida.',
      whyChoose: '¿Por Qué Elegir a Nuestros Abogados?',
      experience: 'Más de 100 Años de Experiencia Combinada',
      technology: 'Estrategias Legales de Vanguardia',
      bilingual: 'Equipo Multilingüe',
      results: 'Miles de Casos Exitosos',
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] text-white py-24">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
            <p className="text-xl text-[#C9974D] font-semibold mb-6">{t.subtitle}</p>
            <p className="max-w-3xl mx-auto text-lg">{t.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Attorneys Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attorneys.map((attorney, index) => (
              <motion.div
                key={attorney.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200"
              >
                <AttorneyPhoto
                  name={attorney.name}
                  title={attorney.title[language]}
                  imagePath={attorney.image}
                  className="h-80"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#6B1F2E] mb-2">{attorney.name}</h3>
                  <p className="text-[#C9974D] font-semibold mb-4">{attorney.title[language]}</p>
                  <p className="text-gray-600 mb-4 line-clamp-3">{attorney.bio[language]}</p>

                  {/* Practice Areas */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Scale className="w-4 h-4 mr-2 text-[#C9974D]" />
                      {t.specialties}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {attorney.specialties[language].slice(0, 3).map(specialty => (
                        <span
                          key={specialty}
                          className="px-3 py-1 bg-gray-100 text-sm text-gray-700 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  {attorney.languages.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-1 flex items-center">
                        <Globe className="w-4 h-4 mr-2 text-[#C9974D]" />
                        {t.languages}
                      </h4>
                      <p className="text-sm text-gray-600">{attorney.languages.join(', ')}</p>
                    </div>
                  )}

                  <Link
                    href={language === 'es' ? `/es/abogados/${attorney.id}` : `/attorneys/${attorney.id}`}
                    className="inline-block mt-4 px-6 py-2 bg-[#6B1F2E] text-white rounded-md hover:bg-[#8B2635] transition-colors font-medium"
                  >
                    {t.viewProfile}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Approach Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#6B1F2E] mb-4">{t.teamApproach}</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">{t.teamDescription}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="font-bold text-[#6B1F2E] mb-2">{t.experience}</h3>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="font-bold text-[#6B1F2E] mb-2">{t.technology}</h3>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🌎</div>
              <h3 className="font-bold text-[#6B1F2E] mb-2">{t.bilingual}</h3>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="font-bold text-[#6B1F2E] mb-2">{t.results}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#6B1F2E] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t.whyChoose}</h2>
          <p className="text-lg mb-8">
            {language === 'en'
              ? 'Contact us today to schedule your free consultation and learn how we can help with your legal needs.'
              : 'Contáctenos hoy para programar su consulta gratuita y aprender cómo podemos ayudar con sus necesidades legales.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={language === 'es' ? '/es/consulta-gratuita' : '/free-consultation'}
              className="px-8 py-3 bg-[#C9974D] text-white rounded-md font-bold hover:bg-[#D4A574] transition-colors"
            >
              {t.schedule}
            </Link>
            <a
              href="tel:18449673536"
              className="px-8 py-3 bg-white text-[#6B1F2E] rounded-md font-bold hover:bg-gray-100 transition-colors"
            >
              📞 1-844-YO-PELEO
            </a>
          </div>
        </div>
      </section>

      <ChatWidget language={language} />

      {/* Structured Data for Attorneys */}
      {attorneys.map(attorney => (
        <Script
          key={attorney.id}
          id={`attorney-${attorney.id}-structured-data`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generateAttorneySchema({
                name: attorney.name,
                jobTitle: attorney.title[language],
                image: attorney.image,
                telephone: '1-844-967-3536',
                email: 'info@vasquezlawnc.com',
                education: attorney.education.map(edu => ({
                  name: edu.school,
                  degree: edu.degree,
                })),
                knowsAbout: attorney.specialties[language],
                memberOf: [
                  'American Immigration Lawyers Association',
                  'North Carolina Bar Association',
                  'Florida Bar Association',
                ],
                award: ['Top Immigration Law Firm 2023', 'Client Choice Award'],
              })
            ),
          }}
        />
      ))}
    </div>
  );
}