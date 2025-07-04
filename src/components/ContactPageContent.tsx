'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, Globe, Building } from 'lucide-react';
// Dynamic import for client-side only rendering
const ChatWidget = dynamic(() => import('@/components/ChatWidget').then(mod => mod.ChatWidget), {
  ssr: false,
});
import AllOfficesMap from '@/components/AllOfficesMap';
import { officeLocations } from '@/data/locations';
import { ContactForm } from '@/components/forms/ContactForm';

interface ContactPageContentProps {
  language: 'en' | 'es';
}

export default function ContactPageContent({ language }: ContactPageContentProps) {
  const [showVirtualParalegal, setShowVirtualParalegal] = useState(false);

  const content = {
    en: {
      title: 'Contact Us',
      subtitle: 'Get Your Free Consultation Today',
      description:
        'Available 24/7 through our AI assistant or schedule a consultation with our experienced attorneys',
      formTitle: 'Send Us a Message',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      caseType: 'Case Type',
      selectCase: 'Select your case type',
      message: 'Tell us about your case',
      preferredContact: 'Preferred Contact Method',
      location: 'Nearest Office',
      selectLocation: 'Select preferred location',
      submit: 'Send Message',
      or: 'OR',
      callUs: 'Call Us Now',
      mainNumber: '1-844-YO-PELEO',
      mainNumberDesc: '(967-3536)',
      emailUs: 'Email Us',
      emailAddress: 'info@vasquezlawnc.com',
      instantHelp: 'Need Instant Help?',
      chatNow: 'Chat with AI Assistant',
      officeHours: 'Office Hours',
      monday: 'Monday - Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
      hours1: '9:00 AM - 6:00 PM',
      hours2: '10:00 AM - 2:00 PM',
      hours3: 'AI Available 24/7',
      locations: 'Our Offices',
      getDirections: 'Get Directions',
      emergency: 'Emergency Legal Help',
      emergencyText:
        'If you need immediate legal assistance outside of business hours, our AI assistant is available 24/7 to help you understand your rights and next steps.',
      startChat: 'Start Emergency Chat',
      languages: 'We Speak Your Language',
      languagesText:
        'Our team provides services in English, Spanish, and Portuguese. All our AI assistants are fully bilingual.',
      consultation: 'Free Consultation Includes:',
      benefit1: 'Case evaluation by experienced attorney',
      benefit2: 'AI-powered case outcome prediction',
      benefit3: 'Clear explanation of your legal options',
      benefit4: 'Transparent fee structure discussion',
      benefit5: 'No obligation to hire us',
    },
    es: {
      title: 'Contáctanos',
      subtitle: 'Obtenga Su Consulta Gratuita Hoy',
      description:
        'Disponible 24/7 a través de nuestro asistente de IA o programe una consulta con nuestros abogados experimentados',
      formTitle: 'Envíanos un Mensaje',
      name: 'Nombre Completo',
      email: 'Correo Electrónico',
      phone: 'Número de Teléfono',
      caseType: 'Tipo de Caso',
      selectCase: 'Seleccione su tipo de caso',
      message: 'Cuéntenos sobre su caso',
      preferredContact: 'Método de Contacto Preferido',
      location: 'Oficina Más Cercana',
      selectLocation: 'Seleccione ubicación preferida',
      submit: 'Enviar Mensaje',
      or: 'O',
      callUs: 'Llámanos Ahora',
      mainNumber: '1-844-YO-PELEO',
      mainNumberDesc: '(967-3536)',
      emailUs: 'Envíanos un Email',
      emailAddress: 'info@vasquezlawnc.com',
      instantHelp: '¿Necesita Ayuda Instantánea?',
      chatNow: 'Chatear con Asistente IA',
      officeHours: 'Horario de Oficina',
      monday: 'Lunes - Viernes',
      saturday: 'Sábado',
      sunday: 'Domingo',
      hours1: '9:00 AM - 6:00 PM',
      hours2: '10:00 AM - 2:00 PM',
      hours3: 'IA Disponible 24/7',
      locations: 'Nuestras Oficinas',
      getDirections: 'Obtener Direcciones',
      emergency: 'Ayuda Legal de Emergencia',
      emergencyText:
        'Si necesita asistencia legal inmediata fuera del horario comercial, nuestro asistente de IA está disponible 24/7 para ayudarle a entender sus derechos y próximos pasos.',
      startChat: 'Iniciar Chat de Emergencia',
      languages: 'Hablamos Tu Idioma',
      languagesText:
        'Nuestro equipo brinda servicios en inglés, español y portugués. Todos nuestros asistentes de IA son completamente bilingües.',
      consultation: 'La Consulta Gratuita Incluye:',
      benefit1: 'Evaluación del caso por abogado experimentado',
      benefit2: 'Predicción del resultado del caso con IA',
      benefit3: 'Explicación clara de sus opciones legales',
      benefit4: 'Discusión transparente de la estructura de tarifas',
      benefit5: 'Sin obligación de contratarnos',
    },
  };

  const t = content[language];

  const locations = [
    {
      city: language === 'es' ? 'Raleigh, NC' : 'Raleigh, NC',
      address: '4426 Louisburg Road, Raleigh, NC 27616',
      phone: '(919) 246-8831',
      hours: language === 'es' ? 'Lun-Vie: 9:00 AM - 6:00 PM, Sáb: 10:00 AM - 2:00 PM' : 'Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 2:00 PM',
      mapUrl: 'https://maps.google.com/maps?q=4426+Louisburg+Road,+Raleigh,+NC+27616',
    },
    {
      city: language === 'es' ? 'Charlotte, NC' : 'Charlotte, NC',
      address: '5701 Executive Center Dr, Ste 103, Charlotte, NC 28212',
      phone: '(704) 266-2998',
      hours: language === 'es' ? 'Lun-Vie: 9:00 AM - 6:00 PM' : 'Mon-Fri: 9:00 AM - 6:00 PM',
      mapUrl: 'https://maps.google.com/maps?q=5701+Executive+Center+Dr,+Charlotte,+NC+28212',
    },
    {
      city: language === 'es' ? 'Durham, NC' : 'Durham, NC',
      address: '2530 Meridian Pkwy, Ste 200, Durham, NC 27713',
      phone: '(919) 246-8831',
      hours: language === 'es' ? 'Lun-Vie: 9:00 AM - 6:00 PM' : 'Mon-Fri: 9:00 AM - 6:00 PM',
      mapUrl: 'https://maps.google.com/maps?q=2530+Meridian+Pkwy,+Durham,+NC+27713',
    },
    {
      city: language === 'es' ? 'Winston-Salem, NC' : 'Winston-Salem, NC',
      address: '380 Knollwood St, Ste 310, Winston-Salem, NC 27103',
      phone: '(336) 777-8822',
      hours: language === 'es' ? 'Lun-Vie: 9:00 AM - 6:00 PM' : 'Mon-Fri: 9:00 AM - 6:00 PM',
      mapUrl: 'https://maps.google.com/maps?q=380+Knollwood+St,+Winston-Salem,+NC+27103',
    },
    {
      city: language === 'es' ? 'Smithfield, NC' : 'Smithfield, NC',
      address: '612 S Brightleaf Blvd, Smithfield, NC 27577',
      phone: '(919) 209-8788',
      hours: language === 'es' ? 'Lun-Vie: 9:00 AM - 6:00 PM' : 'Mon-Fri: 9:00 AM - 6:00 PM',
      mapUrl: 'https://maps.google.com/maps?q=612+S+Brightleaf+Blvd,+Smithfield,+NC+27577',
    },
    {
      city: language === 'es' ? 'Orlando, FL' : 'Orlando, FL',
      address: '1111 E Amelia Street, Orlando, FL 32803',
      phone: '(407) 647-1900',
      hours: language === 'es' ? 'Lun-Vie: 9:00 AM - 6:00 PM' : 'Mon-Fri: 9:00 AM - 6:00 PM',
      mapUrl: 'https://maps.google.com/maps?q=1111+E+Amelia+Street,+Orlando,+FL+32803',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#6B1F2E] to-[#8B2635] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
            <p className="text-xl text-[#C9974D] font-semibold mb-6">{t.subtitle}</p>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">{t.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section id="appointment" className="py-16" style={{scrollMarginTop: '120px'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ContactForm language={language} />
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Quick Contact Options */}
              <div className="bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] rounded-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <MessageCircle className="mr-2" />
                  {t.instantHelp}
                </h3>
                <button 
                  onClick={() => setShowVirtualParalegal(true)}
                  className="w-full px-6 py-3 bg-white text-[#6B1F2E] rounded-md font-semibold hover:shadow-lg transition-all mb-4"
                >
                  🤖 {t.chatNow}
                </button>
                <div className="text-center mb-4">
                  <p className="text-white/80">{t.or}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Phone className="mr-2" />
                    <p className="text-3xl font-bold">{t.mainNumber}</p>
                  </div>
                  <p className="text-lg">{t.mainNumberDesc}</p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Clock className="mr-2 text-[#6B1F2E]" />
                  {t.officeHours}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.monday}</span>
                    <span className="font-medium">{t.hours1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.saturday}</span>
                    <span className="font-medium">{t.hours2}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.sunday}</span>
                    <span className="font-medium text-[#C9974D]">{t.hours3}</span>
                  </div>
                </div>
              </div>

              {/* Emergency Help */}
              <div className="bg-[#C9974D]/10 rounded-lg p-6 border border-[#C9974D]/20">
                <h3 className="text-xl font-bold text-[#C9974D] mb-3">🚨 {t.emergency}</h3>
                <p className="text-gray-700 mb-4">{t.emergencyText}</p>
                <button 
                  onClick={() => setShowVirtualParalegal(true)}
                  className="px-6 py-2 bg-[#C9974D] text-white rounded-md font-medium hover:bg-[#B88740] transition-colors"
                >
                  {t.startChat}
                </button>
              </div>

              {/* Languages */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <Globe className="mr-2 text-[#6B1F2E]" />
                  {t.languages}
                </h3>
                <p className="text-gray-600 mb-4">{t.languagesText}</p>
                <div className="flex gap-3">
                  <span className="px-3 py-1 bg-[#6B1F2E]/10 text-[#6B1F2E] rounded-full text-sm font-medium">
                    English
                  </span>
                  <span className="px-3 py-1 bg-[#6B1F2E]/10 text-[#6B1F2E] rounded-full text-sm font-medium">
                    Español
                  </span>
                  <span className="px-3 py-1 bg-[#6B1F2E]/10 text-[#6B1F2E] rounded-full text-sm font-medium">
                    Português
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 flex items-center justify-center">
            <MapPin className="mr-2 text-[#6B1F2E]" />
            {t.locations}
          </h2>

          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <AllOfficesMap
              offices={officeLocations.map(office => ({
                name: office.name,
                address: office.fullAddress,
                lat: office.lat,
                lng: office.lng,
                phone: office.phone,
                hours: office.hours,
              }))}
              height="500px"
              className="rounded-lg shadow-lg"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location, index) => {
              const officeImages: { [key: string]: string } = {
                'Smithfield, NC': '/images/offices/smithfield-office.jpg',
                'Raleigh, NC': '/images/offices/raleigh-office.jpg',
                'Charlotte, NC': '/images/offices/charlotte-office.jpg',
                'Orlando, FL': '/images/offices/orlando-office.jpg',
                'Durham, NC': '/images/offices/durham-office.jpg',
                'Winston-Salem, NC': '/images/offices/winston-salem-office.jpg',
              };

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200"
                >
                  {/* Office Image */}
                  <div className="h-48 w-full overflow-hidden bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] flex items-center justify-center">
                    {officeImages[location.city.split(',')[0] + ', ' + location.city.split(',')[1]] ? (
                      <img
                        src={officeImages[location.city.split(',')[0] + ', ' + location.city.split(',')[1]]}
                        alt={`${location.city} office exterior`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="text-white text-center">
                        <Building className="w-16 h-16 mx-auto mb-2" />
                        <p className="text-sm font-medium">{location.city}</p>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{location.city}</h3>
                    <p className="text-sm text-gray-600 mb-2 flex items-start">
                      <MapPin className="w-4 h-4 mr-1 mt-0.5 text-[#6B1F2E]" />
                      {location.address}
                    </p>
                    <p className="text-sm text-[#6B1F2E] font-medium mb-2 flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      {location.phone}
                    </p>
                    <p className="text-xs text-gray-500 mb-4 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {location.hours}
                    </p>
                    <a
                      href={location.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#C9974D] font-medium hover:underline flex items-center"
                    >
                      <MapPin className="w-4 h-4 mr-1" />
                      {t.getDirections} →
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consultation Benefits */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">{t.consultation}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[t.benefit1, t.benefit2, t.benefit3, t.benefit4, t.benefit5].map(
                (benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <span className="text-2xl mr-3 text-[#C9974D]">✓</span>
                    <p className="text-lg">{benefit}</p>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <ChatWidget language={language} />
    </div>
  );
}