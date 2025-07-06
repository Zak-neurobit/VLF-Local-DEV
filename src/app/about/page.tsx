'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Script from 'next/script';
import { MasterLayout } from '@/design-system/templates/MasterLayout';
import { Phone, ArrowRight, MapPin, Users, Award, Scale, Shield, Heart, Target, Briefcase } from 'lucide-react';
import { generateOrganizationSchema } from '@/components/SEO/schemas';
import { TRADEMARK } from '@/lib/constants/trademark';

export default function AboutPage() {

  const coreValues = [
    {
      title: 'MY FAMILY, YOUR FAMILY',
      description: 'We value our team and clients as family, fostering relationships built on mutual investment and care',
      icon: <Heart className="h-8 w-8" />,
    },
    {
      title: 'HONESTY',
      description: 'We are straightforward and honest from the very first consultation, ensuring trust and transparency in every interaction',
      icon: <Shield className="h-8 w-8" />,
    },
    {
      title: 'DEDICATION',
      description: 'We are committed to the growth of everyone in our firm, helping our employees move into their strengths',
      icon: <Target className="h-8 w-8" />,
    },
    {
      title: 'QUALITY EXPERIENCE',
      description: 'We strive to create a fun and productive workspace that enhances the overall quality of life for our team',
      icon: <Award className="h-8 w-8" />,
    },
    {
      title: 'I FIGHT (YO PELEO)',
      description: '&ldquo;YO PELEO&rdquo; – We are dedicated to fighting for our clients and our team with passion and commitment',
      icon: <Scale className="h-8 w-8" />,
    },
  ];

  const offices = [
    {
      city: 'Charlotte',
      state: 'NC',
      address: '5701 Executive Center Dr, Ste 103',
      phone: '(704) 533-7000',
      isMainOffice: true,
    },
    {
      city: 'Raleigh',
      state: 'NC',
      address: '4426 Louisburg Road',
      phone: '(919) 533-7000',
    },
    {
      city: 'Smithfield',
      state: 'NC',
      address: '612 S Brightleaf Blvd',
      phone: '(919) 989-3000',
    },
    {
      city: 'Orlando',
      state: 'FL',
      address: '1111 E Amelia Street',
      phone: '(407) 955-5000',
    },
  ];

  const stats = [
    { number: '60+', label: 'Years Combined Experience', icon: <Briefcase className="h-6 w-6" /> },
    { number: '5,000+', label: 'Satisfied Clients', icon: <Users className="h-6 w-6" /> },
    { number: '4', label: 'Office Locations', icon: <MapPin className="h-6 w-6" /> },
    { number: '98%', label: 'Success Rate', icon: <Award className="h-6 w-6" /> },
  ];

  const milestones = [
    { year: '2011', event: 'Vasquez Law Firm Founded', description: 'Started with a vision to provide accessible legal services' },
    { year: '2015', event: 'Charlotte Office Opened', description: 'Expanded to serve the Queen City community' },
    { year: '2018', event: 'Smithfield Location Added', description: 'Growing to better serve rural communities' },
    { year: '2020', event: 'Orlando Office Launch', description: 'First expansion outside North Carolina' },
    { year: '2023', event: 'AI Integration', description: 'Pioneering technology-enhanced legal services' },
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">About Vasquez Law Firm</h1>
              <p className="text-xl md:text-2xl mb-4 font-semibold text-primary">
                Fighting for You Since 2011
              </p>
              <p className="text-lg mb-12 text-gray-300 max-w-3xl mx-auto">
                {TRADEMARK.YO_PELEO_POR_TI} - From humble beginnings to becoming North Carolina&apos;s trusted voice for justice,
                we&apos;ve built our reputation on dedication, integrity, and results.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-primary/30 transition-all"
                  >
                    <div className="text-primary mb-3 flex justify-center">{stat.icon}</div>
                    <p className="text-4xl font-bold text-white mb-2">{stat.number}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-neutral-950">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Our <span className="text-primary">Story</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  From a single attorney with a vision to a full-service law firm serving thousands across the Southeast
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed mb-6">
                      Founded in 2011 by William J. Vásquez, our firm began with a simple yet powerful mission: 
                      to provide accessible, high-quality legal representation to all members of our community, 
                      regardless of their background or circumstances.
                    </p>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      What started as a solo practice in Raleigh has grown into one of North Carolina&apos;s most 
                      innovative law firms, with four offices across NC and Florida. Our growth has been driven 
                      by our unwavering commitment to our clients and our core values.
                    </p>
                    <p className="text-gray-300 leading-relaxed mb-8">
                      Today, we&apos;re proud to be pioneers in combining traditional legal expertise with cutting-edge 
                      technology, including AI-powered assistants that help us provide faster, more efficient 
                      service while maintaining the personal touch our clients deserve.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
                    <h3 className="text-2xl font-bold text-primary mb-4">{TRADEMARK.YO_PELEO_POR_TI}</h3>
                    <p className="text-gray-300">
                      Our motto &ldquo;I Fight For You&rdquo; isn&apos;t just words - it&apos;s our promise to every client who walks 
                      through our doors. From the courtroom to the conference room, we fight tirelessly for justice.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                  <Image
                    src="/images/about/team-photo.jpg"
                    alt="Vasquez Law Firm Team"
                    width={600}
                    height={400}
                    className="rounded-2xl shadow-2xl w-full object-cover"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-primary rounded-2xl p-6 shadow-xl">
                    <p className="text-black font-bold text-xl">Since 2011</p>
                    <p className="text-black/80">Serving Our Community</p>
                  </div>
                </motion.div>
              </div>

              {/* Timeline */}
              <div className="relative">
                <h3 className="text-3xl font-bold text-center mb-12 text-white">
                  Our <span className="text-primary">Journey</span>
                </h3>
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  >
                    <div className="flex-1" />
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-black z-10" />
                    <div className={`flex-1 ${index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'}`}>
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                        <p className="text-primary font-bold text-lg mb-2">{milestone.year}</p>
                        <h4 className="text-white font-semibold text-xl mb-2">{milestone.event}</h4>
                        <p className="text-gray-400">{milestone.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-20"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Our <span className="text-primary">Mission</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  To provide accessible, high-quality legal representation to all members of our community, 
                  regardless of their background or circumstances. We leverage technology to break down barriers 
                  and ensure justice is available to everyone.
                </p>
              </motion.div>

              {/* Core Values */}
              <div className="mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
                  Our Core <span className="text-primary">Values</span>
                </h2>
                <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
                  These five principles guide everything we do at Vasquez Law Firm
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {coreValues.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className={`bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary/30 transition-all ${
                        index === 4 ? 'lg:col-span-3 lg:max-w-2xl lg:mx-auto' : ''
                      }`}
                    >
                      <div className="text-primary mb-4">{value.icon}</div>
                      <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{value.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Commitment to Excellence */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm rounded-2xl p-12 border border-primary/20"
              >
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                  Our Commitment to <span className="text-primary">Innovation</span>
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
                  As pioneers in AI-enhanced legal services, we&apos;re committed to using technology responsibly 
                  to improve access to justice. Our AI assistants work alongside our attorneys to provide 
                  faster responses, more accurate case analysis, and better outcomes for our clients.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-neutral-950">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Meet Our <span className="text-primary">Team</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Experienced attorneys and dedicated staff committed to fighting for your rights
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {[
                  { name: 'William J. Vásquez', title: 'Founding Attorney', image: '/images/attorneys/william-vasquez.jpg' },
                  { name: 'Jillian Baucom', title: 'Managing Attorney', image: '/images/attorneys/jillian-baucom.jpg' },
                  { name: 'Christopher Afanador', title: 'Immigration Attorney', image: '/images/attorneys/christopher-afanador.jpg' },
                  { name: 'Adrianna Ingram', title: 'Immigration Attorney', image: '/images/attorneys/adriana-ingram.webp' },
                  { name: 'Roselyn V. Torrellas', title: 'Attorney', image: '/images/attorneys/roselyn-torrellas.jpg' },
                  { name: 'Mark Kelsey', title: 'Attorney', image: '/images/attorneys/mark-kelsey.jpg' },
                ].map((attorney, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all group"
                  >
                    <div className="aspect-[4/5] relative overflow-hidden">
                      <Image
                        src={attorney.image}
                        alt={attorney.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-1">{attorney.name}</h3>
                      <p className="text-primary">{attorney.title}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Locations */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  Our <span className="text-primary">Locations</span>
                </h2>
                <p className="text-xl text-gray-300">
                  Proudly serving <span className="font-semibold text-primary">50+</span> communities across North Carolina and Florida
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {offices.map((office, index) => (
                  <motion.a
                    key={index}
                    href={`/locations/${office.city.toLowerCase()}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary/30 transition-all cursor-pointer group"
                  >
                    {office.isMainOffice && (
                      <div className="bg-primary text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                        MAIN OFFICE
                      </div>
                    )}
                    <MapPin className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold text-white mb-2">
                      {office.city}, {office.state}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">{office.address}</p>
                    <p className="text-primary font-semibold">{office.phone}</p>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Awards & Recognition Section */}
        <section className="py-20 bg-neutral-950">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Recognition & <span className="text-primary">Awards</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Our dedication to excellence has been recognized by clients and peers alike
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {[
                  { title: 'Top Immigration Law Firm', icon: '🏆', year: '2023' },
                  { title: 'Innovation in Legal Tech', icon: '🚀', year: '2023' },
                  { title: 'Community Service Excellence', icon: '❤️', year: '2022-2023' },
                  { title: 'Client Choice Award', icon: '⭐', year: '5 Years Running' },
                ].map((award, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center bg-gradient-to-b from-primary/10 to-transparent backdrop-blur-sm rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all"
                  >
                    <div className="text-5xl mb-4">{award.icon}</div>
                    <p className="text-lg font-bold text-white mb-2">{award.title}</p>
                    <p className="text-sm text-primary">{award.year}</p>
                  </motion.div>
                ))}
              </div>

              {/* Professional Associations */}
              <div>
                <h3 className="text-3xl font-bold text-center text-white mb-8">
                  Professional <span className="text-primary">Associations</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    'American Immigration Lawyers Association (AILA)',
                    'North Carolina State Bar',
                    'Florida Bar',
                    'National Association of Criminal Defense Lawyers',
                  ].map((association, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10 hover:border-primary/30 transition-all"
                    >
                      <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
                      <p className="text-white font-medium">{association}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-300">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6 text-black">
                Ready to Join the Vasquez Family?
              </h2>
              <p className="text-xl mb-8 text-black/80">
                Experience the difference of a law firm that truly fights for you
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-black text-primary font-bold rounded-lg shadow-lg hover:bg-gray-900 transition-all inline-flex items-center justify-center"
                >
                  Schedule Your Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.a>
                <motion.a
                  href="tel:1-844-967-3536"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-black font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-all inline-flex items-center justify-center"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now: 1-844-YO-PELEO
                </motion.a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Structured Data for SEO */}
      <Script
        id="about-page-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "mainEntity": {
              "@type": "LegalService",
              "name": "Vasquez Law Firm, PLLC",
              "description": "Founded in 2011, Vasquez Law Firm provides accessible, high-quality legal representation across North Carolina and Florida.",
              "foundingDate": "2011",
              "founder": {
                "@type": "Person",
                "name": "William J. Vásquez"
              },
              "slogan": "YO PELEO POR TI - I Fight For You",
              "numberOfEmployees": "10+",
              "areaServed": ["North Carolina", "Florida"],
              "award": [
                "Top Immigration Law Firm 2023",
                "Innovation in Legal Technology Award 2023",
                "Community Service Excellence 2022-2023",
                "Client Choice Award 2019-2023"
              ]
            }
          }),
        }}
      />
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateOrganizationSchema()),
        }}
      />
    </MasterLayout>
  );
}
