'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Globe, Award, Clock, Building } from 'lucide-react';

interface FirmHighlightsProps {
  language: 'en' | 'es';
}

export default function FirmHighlights({ language }: FirmHighlightsProps) {
  const content = {
    en: {
      title: 'Why Choose Vasquez Law Firm',
      subtitle: 'A Legacy of Fighting for Justice',
      highlights: [
        {
          icon: Shield,
          title: 'Military Discipline',
          description: 'U.S. Air Force veteran bringing tactical precision to legal battles',
        },
        {
          icon: Users,
          title: 'Bilingual Excellence',
          description: 'Fluent legal services in English and Spanish - Se Habla Español',
        },
        {
          icon: Globe,
          title: 'Immigration Expertise',
          description:
            'Helping families navigate complex immigration laws for 60+ years collective experience',
        },
        {
          icon: Award,
          title: 'Proven Results',
          description:
            "Thousands of successful cases in personal injury, workers' comp, and criminal defense",
        },
        {
          icon: Clock,
          title: '24/7 Availability',
          description: "Round-the-clock support because legal emergencies don't wait",
        },
        {
          icon: Building,
          title: '4 Convenient Locations',
          description: 'Charlotte, Raleigh, Smithfield, and Orlando offices to serve you',
        },
      ],
    },
    es: {
      title: 'Por Qué Elegir Vasquez Law Firm',
      subtitle: 'Un Legado de Lucha por la Justicia',
      highlights: [
        {
          icon: Shield,
          title: 'Disciplina Militar',
          description:
            'Veterano de la Fuerza Aérea de EE.UU. trayendo precisión táctica a batallas legales',
        },
        {
          icon: Users,
          title: 'Excelencia Bilingüe',
          description: 'Servicios legales fluidos en inglés y español',
        },
        {
          icon: Globe,
          title: 'Expertos en Inmigración',
          description:
            'Ayudando a familias a navegar leyes de inmigración complejas por 60+ años de experiencia colectiva',
        },
        {
          icon: Award,
          title: 'Resultados Comprobados',
          description:
            'Miles de casos exitosos en lesiones personales, compensación laboral y defensa criminal',
        },
        {
          icon: Clock,
          title: 'Disponible 24/7',
          description: 'Apoyo las 24 horas porque las emergencias legales no esperan',
        },
        {
          icon: Building,
          title: '4 Ubicaciones Convenientes',
          description: 'Oficinas en Charlotte, Raleigh, Smithfield y Orlando para servirle',
        },
      ],
    },
  };

  const t = content[language];

  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-[#0a0a0a] to-black">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.title}</h2>
          <p className="text-xl text-[#C9974D]">{t.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#6B1F2E]/10 to-[#C9974D]/10 border border-[#C9974D]/20 p-8 hover:border-[#C9974D]/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#6B1F2E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-[#C9974D]/20">
                    <Icon className="h-8 w-8 text-[#C9974D]" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{highlight.title}</h3>
                  <p className="text-gray-300">{highlight.description}</p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6B1F2E] to-[#C9974D] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#C9974D]/5 blur-3xl" />
      </div>
    </section>
  );
}
