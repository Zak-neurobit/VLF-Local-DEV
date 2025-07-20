'use client';

import Script from 'next/script';
import Image from 'next/image';
import { Phone, ArrowRight, Users, Award, Heart, Star } from 'lucide-react';
import { MasterLayout } from '@/design-system/templates/MasterLayout';
import { motion } from 'framer-motion';
import { TRADEMARK } from '@/lib/constants/trademark';

const staffMembers = [
  {
    name: 'Carmen Vitela',
    role: 'Chief Office Manager',
    image: '/images/staff/carmen-vitela.png',
    quote:
      'Trabajar en Vasquez Law Firm significa ser parte de un equipo que brinda apoyo. Disfruto mucho de la cultura de la firma y la oportunidad de crecer profesionalmente mientras ayudo a nuestros clientes.',
  },
  {
    name: 'Daniela Patiño',
    role: 'Legal Assistant',
    image: '/images/staff/daniela-patino.png',
    quote:
      'Me encanta trabajar aquí porque todos trabajamos juntos. Todos tienen la misma meta de brindar un excelente servicio al cliente.',
  },
  {
    name: 'Diana Saavedra',
    role: 'Intake Coordinator',
    image: '/images/staff/diana-saavedra.png',
    quote:
      'Me encanta trabajar en Vasquez Law Firm porque me dan la oportunidad de desafiar mis habilidades de liderazgo todos los días y poder crecer en mi carrera mientras ayudo a otros a alcanzar sus metas.',
  },
  {
    name: 'Julio Arguello',
    role: 'Marketing Assistant',
    image: '/images/staff/julio-arguello.png',
    quote:
      'Estoy feliz de trabajar aquí porque me da la oportunidad de crecer profesionalmente en la industria legal. Todos se sienten cómodos trabajando aquí, es un excelente entorno de trabajo.',
  },
  {
    name: 'Brittany Vasquez',
    role: 'Legal Assistant & Marketing',
    image: '/images/staff/brittany-vasquez.png',
    quote:
      "I enjoy working at Vasquez Law Firm because there's always something new to learn every day.",
  },
];

const teamValues = [
  {
    icon: Heart,
    title: 'Client-Focused',
    description: 'Every team member is dedicated to providing compassionate, personalized service.',
  },
  {
    icon: Users,
    title: 'Collaborative',
    description: 'We work together seamlessly to ensure the best outcomes for our clients.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Our team pursues excellence in every aspect of legal service and client care.',
  },
];

export default function OurTeamPageClient() {
  return (
    <MasterLayout>
      <Script
        id="structured-data-team"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Vasquez Law Firm',
            employee: staffMembers.map(member => ({
              '@type': 'Person',
              name: member.name,
              jobTitle: member.role,
              worksFor: {
                '@type': 'LegalService',
                name: 'Vasquez Law Firm',
              },
            })),
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-600 to-secondary py-24 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                <Users className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Meet Our Dedicated Team
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Behind every successful case is a team of passionate professionals committed to fighting
              for your rights. Get to know the people who make {TRADEMARK.YO_PELEO} more than just a
              motto.
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex gap-4"
            >
              <a
                href="/attorneys"
                className="bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                Meet Our Attorneys <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/contact"
                className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-primary transition-all"
              >
                Contact Us
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
      </section>

      {/* Team Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Team Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and how we serve our clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Support Staff
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated professionals who ensure every client receives the highest level of
              service and support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="relative h-64 w-full bg-gradient-to-br from-primary to-secondary">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Users className="w-24 h-24 text-white/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <div className="relative">
                    <div className="absolute -top-2 -left-2 text-4xl text-primary/20">"</div>
                    <p className="text-gray-600 italic pl-4">{member.quote}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Culture Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                A Culture of Excellence and Support
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At Vasquez Law Firm, we believe that our team is our greatest asset. We foster an
                environment where every team member can grow professionally while making a meaningful
                impact on our clients' lives.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700">Continuous professional development</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700">Collaborative work environment</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700">Commitment to work-life balance</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700">Recognition and rewards for excellence</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-primary rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
                <p className="mb-6">
                  We're always looking for talented individuals who share our passion for justice and
                  client service. If you're interested in joining our team, we'd love to hear from
                  you.
                </p>
                <a
                  href="/careers"
                  className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
                >
                  View Open Positions <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Work with Our Team?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Experience the difference of working with a team that truly cares about your success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1-844-967-3536"
                className="bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call 1-844-YO-PELEO
              </a>
              <a
                href="/contact"
                className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-primary transition-all"
              >
                Schedule Consultation
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </MasterLayout>
  );
}