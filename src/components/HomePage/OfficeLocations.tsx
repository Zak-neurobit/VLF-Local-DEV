'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';
import Image from 'next/image';
import MiniMap from '@/components/MiniMap';

interface OfficeLocationsProps {
  language: 'en' | 'es';
}

interface Office {
  city: string;
  state: string;
  address: string;
  zip: string;
  phone: string;
  fax?: string;
  hours: string;
  mapUrl: string;
}

export default function OfficeLocations({ language }: OfficeLocationsProps) {
  const content = {
    en: {
      title: 'Our Office Locations',
      subtitle: '4 Convenient Locations to Serve You Better',
      cta: 'Get Directions',
      hours: 'Office Hours',
      offices: [
        {
          city: 'Charlotte',
          state: 'NC',
          address: '5701 Executive Center Drive, Ste 103',
          zip: 'Charlotte, NC 28212',
          phone: '(704) 533-7000',
          fax: '(704) 800-6779',
          hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
          mapUrl: 'https://maps.google.com/?q=5701+Executive+Center+Drive+Charlotte+NC+28212',
        },
        {
          city: 'Raleigh',
          state: 'NC',
          address: '4426 Louisburg Road',
          zip: 'Raleigh, NC 27616',
          phone: '(919) 533-7000',
          fax: '(919) 261-1707',
          hours: 'Mon-Fri: 8:30 AM - 5:30 PM',
          mapUrl: 'https://maps.google.com/?q=4426+Louisburg+Road+Raleigh+NC+27616',
        },
        {
          city: 'Smithfield',
          state: 'NC',
          address: '612 S. Bright Leaf Blvd',
          zip: 'Smithfield, NC 27577',
          phone: '(919) 989-3000',
          fax: '(919) 261-1707',
          hours: 'Mon-Fri: 8:30 AM - 5:30 PM',
          mapUrl: 'https://maps.google.com/?q=612+S+Bright+Leaf+Blvd+Smithfield+NC+27577',
        },
        {
          city: 'Orlando',
          state: 'FL',
          address: '1111 E Amelia Street',
          zip: 'Orlando, FL 32803',
          phone: '(407) 955-5000',
          hours: 'Mon-Fri: 8:30 AM - 5:30 PM',
          mapUrl: 'https://maps.google.com/?q=1111+E+Amelia+Street+Orlando+FL+32803',
        },
      ],
    },
    es: {
      title: 'Nuestras Ubicaciones',
      subtitle: '4 Ubicaciones Convenientes para Servirle Mejor',
      cta: 'Obtener Direcciones',
      hours: 'Horario de Oficina',
      offices: [
        {
          city: 'Charlotte',
          state: 'NC',
          address: '5701 Executive Center Drive, Ste 103',
          zip: 'Charlotte, NC 28212',
          phone: '(704) 533-7000',
          fax: '(704) 800-6779',
          hours: 'Lun-Vie: 9:00 AM - 5:00 PM',
          mapUrl: 'https://maps.google.com/?q=5701+Executive+Center+Drive+Charlotte+NC+28212',
        },
        {
          city: 'Raleigh',
          state: 'NC',
          address: '4426 Louisburg Road',
          zip: 'Raleigh, NC 27616',
          phone: '(919) 533-7000',
          fax: '(919) 261-1707',
          hours: 'Lun-Vie: 9:00 AM - 5:00 PM',
          mapUrl: 'https://maps.google.com/?q=4426+Louisburg+Road+Raleigh+NC+27616',
        },
        {
          city: 'Smithfield',
          state: 'NC',
          address: '612 S. Bright Leaf Blvd',
          zip: 'Smithfield, NC 27577',
          phone: '(919) 989-3000',
          fax: '(919) 261-1707',
          hours: 'Lun-Vie: 9:00 AM - 5:00 PM',
          mapUrl: 'https://maps.google.com/?q=612+S+Bright+Leaf+Blvd+Smithfield+NC+27577',
        },
        {
          city: 'Orlando',
          state: 'FL',
          address: '1111 E Amelia Street',
          zip: 'Orlando, FL 32803',
          phone: '(407) 955-5000',
          hours: 'Lun-Vie: 9:00 AM - 5:00 PM',
          mapUrl: 'https://maps.google.com/?q=1111+E+Amelia+Street+Orlando+FL+32803',
        },
      ],
    },
  };

  const t = content[language];

  return (
    <section className="relative py-24 bg-gradient-to-b from-black to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header with Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-8">
            <Image
              src="/images/LOGO_TRANS.PNG"
              alt="Vasquez Law Firm"
              width={150}
              height={150}
              className="opacity-80"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.title}</h2>
          <p className="text-xl text-[#C9974D]">{t.subtitle}</p>
        </motion.div>

        {/* Mini Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <MiniMap height="300px" className="rounded-xl shadow-2xl border border-[#C9974D]/30" />
        </motion.div>

        {/* Office Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {t.offices.map((office, index) => {
            const officeImages: { [key: string]: string } = {
              Charlotte: '/images/offices/charlotte-office.jpg',
              Raleigh: '/images/offices/raleigh-office.jpg',
              Smithfield: '/images/offices/smithfield-office.jpg',
              Orlando: '/images/offices/orlando-office.jpg',
            };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#6B1F2E]/20 to-[#C9974D]/10 border border-[#C9974D]/30 hover:border-[#C9974D] transition-all duration-300"
              >
                {/* Office Photo */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={officeImages[office.city]}
                    alt={`${office.city} office exterior`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* City Header Overlay */}
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                      {office.city}, {office.state}
                    </h3>
                  </div>
                </div>

                {/* Office Details */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#C9974D] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold">{office.address}</p>
                      <p className="text-gray-300">{office.zip}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[#C9974D]" />
                    <a
                      href={`tel:${office.phone.replace(/[^0-9]/g, '')}`}
                      className="text-white font-semibold hover:text-[#C9974D] transition-colors"
                    >
                      {office.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-[#C9974D]" />
                    <p className="text-gray-300">{office.hours}</p>
                  </div>

                  {office.fax && (
                    <div className="flex items-center gap-3">
                      <p className="text-gray-300 text-sm">Fax: {office.fax}</p>
                    </div>
                  )}

                  {/* Get Directions Button */}
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-[#C9974D] text-black font-semibold rounded-lg hover:bg-[#E5B568] transition-colors"
                  >
                    <MapPin className="h-4 w-4" />
                    {t.cta}
                  </a>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#C9974D]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="mb-8">
            <p className="text-lg text-gray-300 italic mb-2">
              "Open your mouth for the mute, for the rights of all who are destitute. Open your
              mouth, judge righteously, defend the rights of the poor and needy."
            </p>
            <p className="text-[#C9974D] font-semibold">— Proverbs 31:8-9</p>
          </div>

          <p className="text-xl text-[#C9974D] font-bold mb-2">El Abogado Que Habla Su Idioma</p>

          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mb-6">
            <a
              href="https://www.vasquezlawnc.com"
              className="text-white hover:text-[#C9974D] transition-colors"
            >
              www.vasquezlawnc.com
            </a>
            <span className="text-gray-500 hidden sm:inline">|</span>
            <a
              href="https://www.yopeleo.com"
              className="text-white hover:text-[#C9974D] transition-colors"
            >
              www.yopeleo.com
            </a>
          </div>

          <p className="text-xl text-white mb-4">
            {language === 'en'
              ? 'Available 24/7 for emergencies'
              : 'Disponible 24/7 para emergencias'}
          </p>
          <a
            href="tel:18449673536"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#C9974D] to-[#E5B568] text-black text-lg font-bold rounded-full hover:scale-105 transition-transform"
          >
            <Phone className="h-6 w-6" />
            1-844-YO-PELEO
          </a>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#6B1F2E]/10 blur-3xl" />
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-[#C9974D]/10 blur-3xl" />
      </div>
    </section>
  );
}
