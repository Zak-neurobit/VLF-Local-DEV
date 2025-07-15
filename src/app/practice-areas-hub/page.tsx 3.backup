'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Scale, Shield, Users, Heart, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function PracticeAreasHub() {
  const practiceAreas = [
    {
      title: 'Immigration Law',
      icon: <Users className="w-8 h-8" />,
      description:
        'Comprehensive immigration services including family petitions, deportation defense, asylum, and citizenship.',
      link: '/practice-areas/immigration',
      subAreas: [
        'Family-Based Immigration',
        'Deportation Defense',
        'Asylum & Refugee',
        'DACA',
        'Green Cards',
        'Citizenship',
        'Employment Visas',
        'U-Visa & VAWA',
      ],
    },
    {
      title: 'Personal Injury',
      icon: <Shield className="w-8 h-8" />,
      description:
        'Fighting for maximum compensation after accidents including car crashes, workplace injuries, and more.',
      link: '/practice-areas/personal-injury',
      subAreas: [
        'Car Accidents',
        'Truck Accidents',
        'Motorcycle Accidents',
        'Pedestrian Accidents',
        'Drunk Driver Cases',
        'Premises Liability',
        'Wrongful Death',
      ],
    },
    {
      title: 'Criminal Defense',
      icon: <Scale className="w-8 h-8" />,
      description:
        'Aggressive defense for all criminal charges from DWI to serious felonies. Protecting your freedom.',
      link: '/practice-areas/criminal-defense',
      subAreas: [
        'DWI/DUI Defense',
        'Drug Crimes',
        'Assault & Battery',
        'Domestic Violence',
        'Traffic Violations',
        'Expungement',
      ],
    },
    {
      title: 'Workers Compensation',
      icon: <Briefcase className="w-8 h-8" />,
      description:
        'Securing benefits for workplace injuries including construction accidents and occupational diseases.',
      link: '/practice-areas/workers-compensation',
      subAreas: [
        'Construction Injuries',
        'Equipment Accidents',
        'Repetitive Stress',
        'Mental Health Claims',
      ],
    },
    {
      title: 'Family Law',
      icon: <Heart className="w-8 h-8" />,
      description:
        'Compassionate representation for divorce, custody, support, and all family legal matters.',
      link: '/practice-areas/family-law',
      subAreas: ['Divorce', 'Child Custody', 'Child Support', 'Alimony', 'Property Division'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Practice Areas</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive legal services with a personal touch. We fight for your rights in multiple
            areas of law.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all p-6">
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-burgundy-100 text-burgundy-700 rounded-lg">
                    {area.icon}
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-3">{area.title}</h2>
                <p className="text-gray-600 mb-4">{area.description}</p>
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Services Include:</h3>
                  <ul className="grid grid-cols-1 gap-1">
                    {area.subAreas.slice(0, 4).map(subArea => (
                      <li key={subArea} className="text-sm text-gray-600 flex items-center">
                        <span className="w-1.5 h-1.5 bg-burgundy-500 rounded-full mr-2" />
                        {subArea}
                      </li>
                    ))}
                    {area.subAreas.length > 4 && (
                      <li className="text-sm text-burgundy-600 font-medium">
                        +{area.subAreas.length - 4} more services
                      </li>
                    )}
                  </ul>
                </div>
                <Link href={area.link}>
                  <Button className="w-full bg-burgundy-700 hover:bg-burgundy-800">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
