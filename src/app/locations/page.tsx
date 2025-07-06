'use client';

import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Clock, Mail, ArrowRight, Building2, Car, Accessibility } from 'lucide-react';
import { MasterLayout } from '@/design-system/templates/MasterLayout';
import { motion } from 'framer-motion';
import { TRADEMARK } from '@/lib/constants/trademark';

export default function Page() {
  const locations = [
    {
      id: 'raleigh',
      name: 'Raleigh Office',
      address: '7031 Brier Creek Parkway, Suite 107, Raleigh, NC 27617',
      phone: '(919) 537-8722',
      hours: 'Monday - Friday: 8:30 AM - 5:30 PM',
      email: 'leads@vasquezlawfirm.com',
      mapUrl: 'https://maps.google.com/?q=7031+Brier+Creek+Parkway+Suite+107+Raleigh+NC+27617',
      image: '/images/offices/raleigh-office.jpg',
      features: ['Free Parking', 'Wheelchair Accessible', 'Spanish Speaking Staff'],
      description: 'Our flagship office serving the Triangle area with comprehensive immigration and legal services.',
    },
    {
      id: 'charlotte',
      name: 'Charlotte Office',
      address: '4801 E Independence Blvd, Suite 200, Charlotte, NC 28212',
      phone: '(704) 817-4689',
      hours: 'Monday - Friday: 8:00 AM - 5:00 PM',
      email: 'leads@vasquezlawfirm.com',
      mapUrl: 'https://maps.google.com/?q=4801+E+Independence+Blvd+Suite+200+Charlotte+NC+28212',
      image: '/images/offices/charlotte-office.jpg',
      features: ['Free Parking', 'Wheelchair Accessible', 'Spanish Speaking Staff'],
      description: 'Serving the Queen City and surrounding areas with dedicated legal representation.',
    },
    {
      id: 'orlando',
      name: 'Orlando Office',
      address: '1060 Woodcock Road, Suite 240, Orlando, FL 32803',
      phone: '(407) 255-2288',
      hours: 'Monday - Friday: 8:30 AM - 5:30 PM',
      email: 'leads@vasquezlawfirm.com',
      mapUrl: 'https://maps.google.com/?q=1060+Woodcock+Road+Suite+240+Orlando+FL+32803',
      image: '/images/offices/orlando-office.jpg',
      features: ['Free Parking', 'Wheelchair Accessible', 'Spanish Speaking Staff'],
      description: 'Extending our services to Central Florida with the same commitment to excellence.',
    },
    {
      id: 'smithfield',
      name: 'Smithfield Office',
      address: '319 E Market St, Smithfield, NC 27577',
      phone: '(919) 626-8450',
      hours: 'Monday - Friday: 8:30 AM - 5:30 PM',
      email: 'leads@vasquezlawfirm.com',
      mapUrl: 'https://maps.google.com/?q=319+E+Market+St+Smithfield+NC+27577',
      image: '/images/offices/smithfield-office.jpg',
      features: ['Free Parking', 'Wheelchair Accessible', 'Spanish Speaking Staff'],
      description: 'Proudly serving Johnston County and Eastern North Carolina communities.',
    },
    {
      id: 'winston-salem',
      name: 'Winston-Salem Office',
      address: '301 N Main St, Suite 2303, Winston-Salem, NC 27101',
      phone: '(336) 893-8100',
      hours: 'Monday - Friday: 8:30 AM - 5:30 PM',
      email: 'leads@vasquezlawfirm.com',
      mapUrl: 'https://maps.google.com/?q=301+N+Main+St+Suite+2303+Winston-Salem+NC+27101',
      image: '/images/offices/winston-salem-office.jpg',
      features: ['Free Parking', 'Wheelchair Accessible', 'Spanish Speaking Staff'],
      description: 'Serving the Triad region with comprehensive immigration and legal services.',
    },
    {
      id: 'durham',
      name: 'Durham Office',
      address: '3710 University Dr, Suite 205, Durham, NC 27707',
      phone: '(919) 251-8521',
      hours: 'Monday - Friday: 8:30 AM - 5:30 PM',
      email: 'leads@vasquezlawfirm.com',
      mapUrl: 'https://maps.google.com/?q=3710+University+Dr+Suite+205+Durham+NC+27707',
      image: '/images/offices/durham-office.jpg',
      features: ['Free Parking', 'Wheelchair Accessible', 'Spanish Speaking Staff'],
      description: 'Conveniently located to serve Durham and the greater Triangle area.',
    },
  ];

  return (
    <MasterLayout variant="hero" showBreadcrumbs={false}>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-black py-24">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black to-secondary/10" />
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(201, 151, 77, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(107, 31, 46, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(201, 151, 77, 0.15) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center px-6 py-3 bg-primary/20 backdrop-blur-sm rounded-full mb-6">
                  <Building2 className="w-5 h-5 text-primary mr-2" />
                  <span className="text-primary font-semibold">6 Convenient Locations</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
                  Our Office <span className="text-primary">Locations</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 font-semibold text-primary">
                  Serving North Carolina and Florida - {TRADEMARK.YO_PELEO_POR_TI}
                </p>
                <p className="text-lg mb-8 max-w-3xl mx-auto text-gray-300">
                  With six strategically located offices across North Carolina and Florida, 
                  Vasquez Law Firm is always within reach. Each office provides the same 
                  exceptional legal services with bilingual staff ready to assist you.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section className="py-20 bg-gradient-to-b from-black to-neutral-950">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                Find the Office <span className="text-primary">Nearest You</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Click on any location card below to view details and get directions
              </p>
            </motion.div>

            {/* Locations Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {locations.map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/40 transition-all h-full">
                    {/* Office Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={location.image}
                        alt={`${location.name} exterior`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{location.name}</h3>
                      <p className="text-gray-400 mb-6">{location.description}</p>

                      <div className="space-y-3">
                        <div className="flex items-start">
                          <MapPin className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="text-gray-300 text-sm">{location.address}</p>
                            <a
                              href={location.mapUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary-300 text-sm inline-flex items-center mt-1"
                            >
                              Get Directions
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </a>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <Phone className="w-5 h-5 text-primary mr-3" />
                          <a
                            href={`tel:${location.phone.replace(/[^0-9]/g, '')}`}
                            className="text-gray-300 hover:text-primary transition-colors"
                          >
                            {location.phone}
                          </a>
                        </div>

                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-primary mr-3" />
                          <p className="text-gray-300 text-sm">{location.hours}</p>
                        </div>

                        <div className="flex items-center">
                          <Mail className="w-5 h-5 text-primary mr-3" />
                          <a
                            href={`mailto:${location.email}`}
                            className="text-gray-300 hover:text-primary transition-colors text-sm"
                          >
                            {location.email}
                          </a>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mt-6 pt-6 border-t border-primary/10">
                        <div className="flex flex-wrap gap-2">
                          {location.features.map((feature, idx) => {
                            const icon = feature.includes('Parking') ? <Car className="w-4 h-4" /> 
                              : feature.includes('Wheelchair') ? <Accessibility className="w-4 h-4" />
                              : <Building2 className="w-4 h-4" />;
                            
                            return (
                              <div key={idx} className="flex items-center text-xs text-gray-400 bg-primary/10 px-3 py-1 rounded-full">
                                <span className="mr-1">{icon}</span>
                                {feature}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-6 flex gap-3">
                        <Link
                          href={`/locations/${location.id}`}
                          className="flex-1 text-center bg-primary text-black py-3 px-4 rounded-full font-bold hover:bg-primary-300 transition-all"
                        >
                          View Details
                        </Link>
                        <Link
                          href="/contact"
                          className="flex-1 text-center border-2 border-white text-white py-3 px-4 rounded-full font-bold hover:bg-white hover:text-black transition-all"
                        >
                          Contact
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                Why Choose <span className="text-primary">Our Offices</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Every location is designed with your comfort and convenience in mind
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: <Building2 className="w-12 h-12" />,
                  title: 'Modern Facilities',
                  description: 'State-of-the-art offices designed for client comfort and privacy'
                },
                {
                  icon: <Car className="w-12 h-12" />,
                  title: 'Easy Access',
                  description: 'Free parking and convenient locations with wheelchair accessibility'
                },
                {
                  icon: <Phone className="w-12 h-12" />,
                  title: 'Bilingual Staff',
                  description: 'Spanish and English speaking professionals at every location'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-gradient-to-b from-primary/20 to-transparent p-6 rounded-2xl mb-4 inline-block">
                    <div className="text-primary">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-neutral-950 to-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                Ready to <span className="text-primary">Get Started?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Visit any of our offices or schedule a virtual consultation today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="tel:1-844-967-3536"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-primary text-black font-bold rounded-full transition-all hover:bg-primary-300"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Call 1-844-YO-PELEO
                </motion.a>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white hover:bg-white hover:text-black transition-all"
                >
                  Schedule Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Structured Data for SEO */}
        <Script
          id="locations-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LegalService',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
              hasMap: locations.map(loc => loc.mapUrl),
              location: locations.map(location => ({
                '@type': 'Place',
                name: location.name,
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: location.address.split(',')[0],
                  addressLocality: location.address.split(',')[1]?.trim(),
                  addressRegion: location.address.includes('NC') ? 'NC' : 'FL',
                  postalCode: location.address.match(/\d{5}/)?.[0],
                },
                telephone: location.phone,
                openingHours: location.hours,
              })),
            }),
          }}
        />
      </div>
    </MasterLayout>
  );
}
