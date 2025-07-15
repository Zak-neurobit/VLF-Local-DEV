'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text as Text3D, Box, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import Link from 'next/link';

// 3D Icon Components for each practice area
function ImmigrationIcon3D({ active }: { active: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(state => {
    if (meshRef.current && active) {
      meshRef.current.rotation.y = state.clock.elapsedTime;
    }
  });

  return (
    <Float speed={active ? 2 : 1} rotationIntensity={active ? 1 : 0.5}>
      <mesh ref={meshRef} scale={active ? 1.2 : 1}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color={active ? '#C9974D' : '#6B1F2E'}
          attach="material"
          distort={active ? 0.5 : 0.2}
          speed={2}
          metalness={0.8}
        />
      </mesh>
      <Text3D position={[0, 0, 1.2]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
        🌍
      </Text3D>
    </Float>
  );
}

function PersonalInjuryIcon3D({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(state => {
    if (groupRef.current && active) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Box args={[1.5, 0.5, 0.5]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color={active ? '#C9974D' : '#6B1F2E'} metalness={0.8} />
      </Box>
      <Box args={[0.5, 1.5, 0.5]} position={[0, 0, 0]}>
        <meshStandardMaterial color={active ? '#C9974D' : '#6B1F2E'} metalness={0.8} />
      </Box>
    </group>
  );
}

interface PracticeAreasShowcaseProps {
  language: 'en' | 'es';
}

export default function PracticeAreasShowcase({ language }: PracticeAreasShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeArea, setActiveArea] = useState<number>(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const practiceAreas = {
    en: [
      {
        id: 'immigration',
        title: 'Immigration Law',
        subtitle: 'Your American Dream, Our Mission',
        description:
          'From visas to citizenship, we navigate the complex immigration system with military precision.',
        features: ['Green Cards', 'Citizenship', 'Deportation Defense', 'DACA/TPS'],
        stat: '5,000+ families reunited',
        color: '#C9974D',
        Icon3D: ImmigrationIcon3D,
      },
      {
        id: 'personal-injury',
        title: 'Personal Injury',
        subtitle: 'Maximum Compensation, Guaranteed',
        description:
          'When accidents happen, we fight relentlessly to secure the compensation you deserve.',
        features: ['Car Accidents', 'Truck Accidents', 'Medical Malpractice', 'Wrongful Death'],
        stat: '$50M+ recovered for clients',
        color: '#E5B568',
        Icon3D: PersonalInjuryIcon3D,
      },
      {
        id: 'criminal-defense',
        title: 'Criminal Defense',
        subtitle: 'Your Freedom is Our Priority',
        description: 'Aggressive defense strategies backed by 60+ years of courtroom victories.',
        features: ['DUI/DWI', 'Drug Crimes', 'Assault', 'Federal Cases'],
        stat: '98% success rate',
        color: '#8B3A42',
        Icon3D: PersonalInjuryIcon3D,
      },
      {
        id: 'workers-compensation',
        title: "Workers' Compensation",
        subtitle: 'Protecting Those Who Build America',
        description: 'We ensure injured workers receive every benefit they deserve under the law.',
        features: ['Workplace Injuries', 'Disability Benefits', 'Appeals', 'Third-Party Claims'],
        stat: '3,000+ workers helped',
        color: '#D4A574',
        Icon3D: ImmigrationIcon3D,
      },
    ],
    es: [
      {
        id: 'immigration',
        title: 'Ley de Inmigración',
        subtitle: 'Su Sueño Americano, Nuestra Misión',
        description:
          'Desde visas hasta ciudadanía, navegamos el complejo sistema de inmigración con precisión militar.',
        features: ['Tarjetas Verdes', 'Ciudadanía', 'Defensa contra Deportación', 'DACA/TPS'],
        stat: '5,000+ familias reunidas',
        color: '#C9974D',
        Icon3D: ImmigrationIcon3D,
      },
      {
        id: 'personal-injury',
        title: 'Lesiones Personales',
        subtitle: 'Compensación Máxima, Garantizada',
        description:
          'Cuando ocurren accidentes, luchamos incansablemente para asegurar la compensación que merece.',
        features: [
          'Accidentes de Auto',
          'Accidentes de Camión',
          'Negligencia Médica',
          'Muerte Injusta',
        ],
        stat: '$50M+ recuperados',
        color: '#E5B568',
        Icon3D: PersonalInjuryIcon3D,
      },
      {
        id: 'criminal-defense',
        title: 'Defensa Criminal',
        subtitle: 'Su Libertad es Nuestra Prioridad',
        description:
          'Estrategias de defensa agresivas respaldadas por 60+ años de victorias en la corte.',
        features: ['DUI/DWI', 'Delitos de Drogas', 'Asalto', 'Casos Federales'],
        stat: '98% tasa de éxito',
        color: '#8B3A42',
        Icon3D: PersonalInjuryIcon3D,
      },
      {
        id: 'workers-compensation',
        title: 'Compensación Laboral',
        subtitle: 'Protegiendo a Quienes Construyen América',
        description:
          'Aseguramos que los trabajadores lesionados reciban todos los beneficios que merecen bajo la ley.',
        features: [
          'Lesiones Laborales',
          'Beneficios por Discapacidad',
          'Apelaciones',
          'Reclamos de Terceros',
        ],
        stat: '3,000+ trabajadores ayudados',
        color: '#D4A574',
        Icon3D: ImmigrationIcon3D,
      },
    ],
  };

  const areas = practiceAreas[language];

  return (
    <section ref={containerRef} className="relative bg-black py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6B1F2E]/10 to-transparent" />
        <motion.div style={{ y }} className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[url('/images/grid.svg')] bg-center" />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-5xl font-black text-white md:text-6xl font-serif">
            {language === 'en' ? 'Practice Areas' : 'Áreas de Práctica'}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-300">
            {language === 'en'
              ? 'Four pillars of legal excellence, powered by 60+ years of experience and cutting-edge AI technology'
              : 'Cuatro pilares de excelencia legal, impulsados por 60+ años de experiencia y tecnología IA de vanguardia'}
          </p>
        </motion.div>

        {/* 3D Scene and Content */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* 3D Visualization */}
          <div className="relative h-[600px] rounded-2xl bg-gradient-to-br from-gray-900 to-black p-8">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              {areas.map((area, index) => {
                const Icon3D = area.Icon3D;
                const angle = (index / areas.length) * Math.PI * 2;
                const x = Math.cos(angle) * 2;
                const y = Math.sin(angle) * 2;

                return (
                  <group key={area.id} position={[x, y, 0]} onClick={() => setActiveArea(index)}>
                    <Icon3D active={activeArea === index} />
                  </group>
                );
              })}
            </Canvas>

            {/* Active Area Indicator */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex justify-center gap-2">
                {areas.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveArea(index)}
                    className={`h-2 w-8 rounded-full transition-all ${
                      activeArea === index ? 'bg-[#C9974D]' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content Cards */}
          <div className="space-y-4">
            {areas.map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setActiveArea(index)}
                className={`group relative overflow-hidden rounded-2xl border transition-all ${
                  activeArea === index
                    ? 'border-[#C9974D] bg-gradient-to-br from-[#6B1F2E]/20 to-transparent'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="mb-2 text-2xl font-bold text-white">{area.title}</h3>
                      <p className="text-[#C9974D]">{area.subtitle}</p>
                    </div>
                    <div
                      className="rounded-full p-3"
                      style={{ backgroundColor: area.color + '20' }}
                    >
                      <span className="text-2xl">
                        {area.id === 'immigration'
                          ? '🌍'
                          : area.id === 'personal-injury'
                            ? '🏥'
                            : area.id === 'criminal-defense'
                              ? '⚖️'
                              : '👷'}
                      </span>
                    </div>
                  </div>

                  <p className="mb-4 text-gray-300">{area.description}</p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {area.features.map(feature => (
                      <span
                        key={feature}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#C9974D]">{area.stat}</span>
                    <Link
                      href={`/practice-areas/${area.id}`}
                      className="group inline-flex items-center gap-2 text-white transition-colors hover:text-[#C9974D]"
                    >
                      {language === 'en' ? 'Learn More' : 'Saber Más'}
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Hover Effect */}
                <div
                  className="absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${area.color}20 0%, transparent 70%)`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
