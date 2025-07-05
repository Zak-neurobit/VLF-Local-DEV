'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
export default function LocationsPage() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const locations = [
    {
      id: 'raleigh',
      name: 'Raleigh Office',
      address: '7031 Brier Creek Parkway, Suite 107, Raleigh, NC 27617',
      phone: '(919) 537-8722',
      hours: 'Monday - Friday: 9:00 AM - 5:00 PM',
      email: 'raleigh@vasquezlawnc.com',
      mapUrl: 'https://maps.google.com/?q=7031+Brier+Creek+Parkway+Suite+107+Raleigh+NC+27617',
      image: '/images/offices/raleigh-office.jpg',
      features: ['Free Parking', 'Wheelchair Accessible', 'Spanish Speaking Staff'],
    },
    {
      id: 'charlotte',
      name: 'Charlotte Office',
      address: '4801 E Independence Blvd, Suite 200, Charlotte, NC 28212',
      phone: '(704) 817-4689',
      hours: 'Monday - Friday: 9:00 AM - 5:00 PM',
      email: 'charlotte@vasquezlawnc.com',
      mapUrl: 'https://maps.google.com/?q=4801+E+Independence+Blvd+Suite+200+Charlotte+NC+28212',
      image: '/images/offices/charlotte-office.jpg',
      features: ['Free Parking', 'Wheelchair Accessible', 'Spanish Speaking Staff'],
    },
    {
      id: 'orlando',
      name: 'Orlando Office',
      address: '1060 Woodcock Road, Suite 240, Orlando, FL 32803',
      phone: '(407) 255-2288',
      hours: 'Monday - Friday: 9:00 AM - 5:00 PM',
      email: 'orlando@vasquezlawnc.com',
      mapUrl: 'https://maps.google.com/?q=1060+Woodcock+Road+Suite+240+Orlando+FL+32803',
      image: '/images/offices/orlando-office.jpg',
      features: ['Free Parking', 'Wheelchair Accessible', 'Spanish Speaking Staff'],
    },
    {
      id: 'smithfield',
      name: 'Smithfield Office',
      address: '319 E Market St, Smithfield, NC 27577',
      phone: '(919) 626-8450',
      hours: 'Monday - Friday: 9:00 AM - 5:00 PM',
      email: 'smithfield@vasquezlawnc.com',
      mapUrl: 'https://maps.google.com/?q=319+E+Market+St+Smithfield+NC+27577',
      image: '/images/offices/smithfield-office.jpg',
      features: ['Free Parking', 'Wheelchair Accessible', 'Spanish Speaking Staff'],
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#001845] to-[#003875] text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Our Office Locations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-200"
          >
            Serving North Carolina and Florida with 4 Convenient Locations
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-[#FF6B6B] mt-4"
          >
            YO PELEO POR TI™
          </motion.p>
        </div>
      </section>
      {/* Locations Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Office Image */}
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={location.image}
                    alt={`${location.name} exterior`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-[#001845] mb-4">{location.name}</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-[#FF6B6B] mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-gray-700">{location.address}</p>
                        <a
                          href={location.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FF6B6B] hover:underline text-sm"
                        >
                          Get Directions →
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-[#FF6B6B] mr-3" />
                      <a
                        href={`tel:${location.phone.replace(/[^0-9]/g, '')}`}
                        className="text-gray-700 hover:text-[#FF6B6B]"
                      >
                        {location.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-[#FF6B6B] mr-3" />
                      <p className="text-gray-700">{location.hours}</p>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-[#FF6B6B] mr-3" />
                      <a
                        href={`mailto:${location.email}`}
                        className="text-gray-700 hover:text-[#FF6B6B]"
                      >
                        {location.email}
                      </a>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Office Features:</h3>
                    <ul className="space-y-1">
                      {location.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <span className="text-[#FF6B6B] mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 flex space-x-4">
                    <Link
                      href={`/locations/${location.id}`}
                      className="flex-1 text-center bg-[#001845] text-white py-2 px-4 rounded hover:bg-[#002855] transition-colors"
                    >
                      Office Details
                    </Link>
                    <Link
                      href="/contact"
                      className="flex-1 text-center border-2 border-[#FF6B6B] text-[#FF6B6B] py-2 px-4 rounded hover:bg-[#FF6B6B] hover:text-white transition-colors"
                    >
                      Schedule Visit
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#001845] to-[#003875] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Discuss Your Case?</h2>
          <p className="text-xl mb-8">
            Visit any of our offices or schedule a virtual consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1-844-967-3536"
              className="bg-[#FF6B6B] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#FF5252] transition-colors"
            >
              Call 1-844-YO-PELEO
            </a>
            <Link
              href="/contact"
              className="bg-white text-[#001845] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
