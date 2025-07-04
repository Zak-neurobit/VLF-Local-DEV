'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, X, Users, Car, Shield, Heart } from 'lucide-react';
import Link from 'next/link';

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  image: string;
  color: string;
}

const services: Service[] = [
  {
    id: 'immigration',
    icon: Users,
    title: 'Inmigración',
    description: 'Navegamos el complejo sistema de inmigración con experiencia y dedicación.',
    features: ['Green Cards', 'Ciudadanía', 'Visas de Trabajo', 'Asilo Político', 'DACA'],
    image: '/images/immigration-service.jpg',
    color: 'from-[#6B1F2E] to-[#8B2635]',
  },
  {
    id: 'personal-injury',
    icon: Car,
    title: 'Lesiones Personales',
    description: 'Luchamos por la compensación que mereces después de un accidente.',
    features: [
      'Accidentes de Auto',
      'Resbalones y Caídas',
      'Negligencia Médica',
      'Accidentes de Trabajo',
    ],
    image: '/images/personal-injury-service.jpg',
    color: 'from-[#C9974D] to-[#D4A574]',
  },
  {
    id: 'criminal-defense',
    icon: Shield,
    title: 'Defensa Criminal',
    description: 'Protegemos tus derechos con una defensa agresiva y estratégica.',
    features: ['DUI/DWI', 'Drogas', 'Asalto', 'Robo', 'Violencia Doméstica'],
    image: '/images/criminal-defense-service.jpg',
    color: 'from-[#6B1F2E] to-[#8B2635]',
  },
  {
    id: 'family-law',
    icon: Heart,
    title: 'Derecho Familiar',
    description: 'Te apoyamos en los momentos más difíciles con sensibilidad y experiencia.',
    features: ['Divorcio', 'Custodia', 'Manutención', 'Adopción', 'Violencia Doméstica'],
    image: '/images/family-law-service.jpg',
    color: 'from-[#C9974D] to-[#D4A574]',
  },
];

export function InteractiveServices() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Áreas de Práctica</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experiencia legal integral con tecnología de vanguardia para servirte mejor
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              onClick={() => setSelectedService(service)}
              className="relative cursor-pointer"
            >
              <div className="glass-card p-6 rounded-2xl h-full modern-card group">
                {/* Icon Container */}
                <div className={`relative mb-4`}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color}`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Floating Badge */}
                  <AnimatePresence>
                    {hoveredService === service.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg"
                      >
                        <Check className="w-4 h-4 text-[#22C55E]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#6B1F2E] mb-2 group-hover:gradient-text transition-all">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                {/* Features Preview */}
                <div className="space-y-1">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: hoveredService === service.id ? 1 : 0.6, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center text-xs text-gray-500"
                    >
                      <ChevronRight className="w-3 h-3 mr-1 text-[#C9974D]" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Hover Effect Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/practice-areas">
            <button className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] text-white font-semibold rounded-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
              <span>Ver Todas las Áreas</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className={`relative h-48 bg-gradient-to-br ${selectedService.color} p-8`}>
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                    <selectedService.icon className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{selectedService.title}</h3>
                    <p className="text-white/80">{selectedService.description}</p>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <h4 className="text-xl font-bold text-[#6B1F2E] mb-4">Servicios Incluidos:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {selectedService.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center gap-2"
                    >
                      <div className="p-1 bg-[#C9974D]/10 rounded-full">
                        <Check className="w-4 h-4 text-[#C9974D]" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Link href={`/practice-areas/${selectedService.id}`} className="flex-1">
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] text-white font-semibold rounded-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                      Más Información
                    </button>
                  </Link>
                  <Link href="/contact" className="flex-1">
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-[#C9974D] to-[#D4A574] text-white font-semibold rounded-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                      Consulta Gratis
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
