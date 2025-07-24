'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SimpleHomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80 z-10" />
          <Image
            src="/images/BANNER_TRANS.PNG"
            alt="Vasquez Law Firm"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="relative z-20 max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary">
            YO PELEO POR TI™
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            We Fight For You
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
            Elite Immigration & Personal Injury Attorneys<br />
            30,000+ Clients Won • U.S. Air Force Veteran-Owned
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-primary text-black font-bold rounded-full text-lg hover:bg-primary-600 transition-all transform hover:scale-105"
            >
              Get FREE Consultation Now
            </Link>
            <a
              href="tel:1-844-967-3536"
              className="px-8 py-4 bg-white text-black font-bold rounded-full text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              📞 1-844-YO-PELEO
            </a>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">
            Our Practice Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Immigration Law', icon: '🌎', link: '/practice-areas/immigration' },
              { title: 'Personal Injury', icon: '⚕️', link: '/practice-areas/personal-injury' },
              { title: 'Criminal Defense', icon: '⚖️', link: '/practice-areas/criminal-defense' },
              { title: 'Workers Compensation', icon: '👷', link: '/practice-areas/workers-compensation' },
              { title: 'Family Law', icon: '👨‍👩‍👧‍👦', link: '/practice-areas/family-law' },
              { title: 'Traffic Violations', icon: '🚗', link: '/practice-areas/traffic-violations' },
            ].map((area, index) => (
              <Link
                key={index}
                href={area.link}
                className="bg-black/50 backdrop-blur-sm p-6 rounded-lg hover:bg-black/70 transition-all transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{area.icon}</div>
                <h3 className="text-xl font-bold text-primary">{area.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-primary">
            Proven Results That Matter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-5xl font-bold text-primary mb-2">30,000+</div>
              <p className="text-xl">Clients Won</p>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-primary mb-2">60+</div>
              <p className="text-xl">Years Combined Experience</p>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-primary mb-2">4.9★</div>
              <p className="text-xl">Google Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">
            Serving North Carolina & Florida
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { city: 'Raleigh', state: 'NC' },
              { city: 'Charlotte', state: 'NC' },
              { city: 'Smithfield', state: 'NC' },
              { city: 'Orlando', state: 'FL' },
            ].map((location, index) => (
              <div key={index} className="bg-black/50 p-6 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-primary">{location.city}</h3>
                <p className="text-lg">{location.state}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-4xl mx-auto text-center text-black">
          <h2 className="text-4xl font-bold mb-6">
            Don't Wait - Your Rights Matter!
          </h2>
          <p className="text-xl mb-8">
            Free consultation available 24/7. We speak English & Spanish.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-black text-white font-bold rounded-full text-lg hover:bg-gray-800 transition-all"
            >
              Start Your Free Consultation
            </Link>
            <a
              href="tel:1-844-967-3536"
              className="px-8 py-4 bg-white text-black font-bold rounded-full text-lg hover:bg-gray-100 transition-all"
            >
              Call Now: 1-844-YO-PELEO
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}