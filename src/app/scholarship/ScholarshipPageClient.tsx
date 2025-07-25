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
    <main>
      <Script
        async
        src="https://www.scholarshipowl.com/static/widget/dist/widget.bundle.js"
        strategy="lazyOnload"
      />

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
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#apply"
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#details"
                className="bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-800 transition-colors duration-200"
              >
                Learn More
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section id="details" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Scholarship</h2>
              <p className="text-lg text-gray-700 mb-4">
                The Vasquez Law Firm Scholarship was established to support students who demonstrate
                academic excellence, leadership potential, and a commitment to serving their
                communities.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We believe in investing in the future by helping deserving students achieve their
                educational goals without the burden of excessive financial stress.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Award Amount</h3>
                    <p className="text-gray-700">$2,500 per recipient</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Application Period</h3>
                    <p className="text-gray-700">Open year-round with quarterly reviews</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Eligibility</h3>
                    <p className="text-gray-700">
                      U.S. students pursuing undergraduate or graduate degrees
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Eligibility Requirements</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Award className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Minimum 3.0 GPA on a 4.0 scale</span>
                </li>
                <li className="flex items-start">
                  <Award className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    Currently enrolled or accepted at an accredited institution
                  </span>
                </li>
                <li className="flex items-start">
                  <Award className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    Demonstrated community service or leadership
                  </span>
                </li>
                <li className="flex items-start">
                  <Award className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    Submit a 500-1000 word essay on the provided topic
                  </span>
                </li>
                <li className="flex items-start">
                  <Award className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Two letters of recommendation</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="apply" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Apply</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Follow these steps to submit your scholarship application
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Prepare Documents</h3>
              <p className="text-gray-700">
                Gather your transcripts, essay, and recommendation letters
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Complete Application</h3>
              <p className="text-gray-700">
                Fill out the online application form with your information
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Submit & Wait</h3>
              <p className="text-gray-700">
                Submit your application and wait for our review committee's decision
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="bg-gray-50 p-8 rounded-lg max-w-2xl mx-auto">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Application Deadlines</h3>
              <div className="grid grid-cols-2 gap-4 text-left max-w-sm mx-auto">
                <div>
                  <p className="font-semibold text-gray-900">Spring:</p>
                  <p className="text-gray-700">March 31st</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Summer:</p>
                  <p className="text-gray-700">June 30th</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Fall:</p>
                  <p className="text-gray-700">September 30th</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Winter:</p>
                  <p className="text-gray-700">December 31st</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Mail className="h-12 w-12 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Subscribe to receive notifications about scholarship opportunities and application
              tips
            </p>
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
            {isSubscribed && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-white flex items-center justify-center"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Successfully subscribed!
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
