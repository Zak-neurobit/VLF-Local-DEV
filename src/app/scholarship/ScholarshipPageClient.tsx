'use client';

import React, { useState } from 'react';
import Script from 'next/script';
import { GraduationCap, Calendar, Award, Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ScholarshipPageClient() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email subscription logic
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <>
      <Script
        async
        src="https://www.scholarshipowl.com/static/widget/dist/widget.bundle.js"
        strategy="lazyOnload"
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
                <GraduationCap className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Vasquez Law Firm Scholarship
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Supporting the next generation of leaders in our community
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex gap-4"
            >
              <a
                href="#apply"
                className="bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                Apply Now <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#requirements"
                className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-primary transition-all"
              >
                Learn More
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
      </section>

      {/* Scholarship Details */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              About Our Scholarship Program
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vasquez Law Firm is committed to supporting students who demonstrate academic
              excellence, leadership, and a commitment to serving their communities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Award Amount</h3>
              <p className="text-3xl font-bold text-primary mb-2">$1,000</p>
              <p className="text-gray-600">
                Annual scholarship awarded to deserving students pursuing higher education.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Application Deadline</h3>
              <p className="text-3xl font-bold text-secondary mb-2">May 31st</p>
              <p className="text-gray-600">
                Applications must be submitted by 11:59 PM EST on the deadline date.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Winners Announced</h3>
              <p className="text-3xl font-bold text-green-600 mb-2">June 30th</p>
              <p className="text-gray-600">
                Selected recipients will be notified via email and announced on our website.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section id="requirements" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Eligibility Requirements
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Academic Requirements</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Minimum 3.0 GPA on a 4.0 scale</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    Currently enrolled or accepted at an accredited college or university
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Pursuing undergraduate or graduate degree</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Requirements</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">U.S. citizen or permanent resident</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Demonstrated community service involvement</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Submit 500-word essay on specified topic</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Widget */}
      <section id="apply" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Apply for the Scholarship
            </h2>
            <p className="text-xl text-gray-600">
              Complete your application through our secure portal below.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div
              className="scholarshipowl-widget"
              data-widget-id="BXjJ7dxqQWK3v2YMfQN1xQ"
              data-widget-type="embedded"
            />
          </motion.div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex justify-center mb-4">
              <Mail className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated on Future Scholarships
            </h3>
            <p className="text-white/90 mb-8">
              Subscribe to receive notifications about scholarship opportunities and deadlines.
            </p>

            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30"
                  required
                />
                <button
                  type="submit"
                  className="bg-secondary text-white px-8 py-3 rounded-full font-bold hover:bg-secondary-600 transition-colors"
                >
                  Subscribe
                </button>
              </div>
              {isSubscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white mt-4"
                >
                  ✓ Thank you for subscribing!
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
