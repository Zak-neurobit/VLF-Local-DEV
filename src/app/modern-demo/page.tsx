'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  ArrowRight,
  Play,
  Download,
  Check,
  Star,
  X,
  ChevronRight,
  Users,
  Award,
  MessageCircle,
  Calculator,
  Scale,
  Shield,
  FileText,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CaseEvaluator from '@/components/LeadMagnets/CaseEvaluator';
import ExitIntentPopup from '@/components/LeadMagnets/ExitIntentPopup';
import GHLContactForm from '@/components/forms/GHLContactForm';

export default function ModernDemoPage() {
  const [activeVersion, setActiveVersion] = useState(1);
  const [showCaseEvaluator, setShowCaseEvaluator] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const versions = [
    { id: 1, name: 'Premium Dark', theme: 'dark' },
    { id: 2, name: 'Classic Light', theme: 'light' },
    { id: 3, name: 'Modern Gradient', theme: 'gradient' },
  ];

  return (
    <div className="min-h-screen">
      {/* Version Selector */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Design Version Selector</h2>
            <div className="flex gap-2">
              {versions.map(version => (
                <Button
                  key={version.id}
                  variant={activeVersion === version.id ? 'primary' : 'outline'}
                  onClick={() => setActiveVersion(version.id)}
                  className="transition-all"
                >
                  {version.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Version 1: Premium Dark */}
      {activeVersion === 1 && (
        <div className="pt-20 bg-black text-white">
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
              <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                <source src="/videos/law-office-bg.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl"
              >
                <h1 className="text-6xl md:text-8xl font-bold mb-6">
                  <span className="text-gradient">Justice</span> for Every
                  <br />
                  Client We Serve
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
                  60+ years of excellence in Immigration, Personal Injury, Criminal Defense, and
                  Family Law. Available 24/7 for emergencies.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-gold-500 text-black hover:bg-gold-600 text-lg px-8 py-6"
                  >
                    Get Free Case Review
                    <ArrowRight className="ml-2" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6"
                  >
                    <Phone className="mr-2" />
                    Call Now: 844-VASQUEZ
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="mt-12 flex flex-wrap gap-8">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-gold-500 fill-current" />
                    <span className="text-lg">4.9/5 Google Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gold-500" />
                    <span className="text-lg">10,000+ Cases Won</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-gold-500" />
                    <span className="text-lg">Top 1% Law Firm</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating Contact Widget */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="fixed right-8 bottom-8 z-30"
            >
              <div className="bg-gold-500 p-4 rounded-full shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-black" />
              </div>
            </motion.div>
          </section>

          {/* Lead Magnet Bar */}
          <section className="bg-gradient-to-r from-gold-600 to-gold-400 py-6">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Download className="w-8 h-8 text-black" />
                  <div>
                    <h3 className="font-bold text-black text-xl">Free Immigration Guide 2025</h3>
                    <p className="text-black/80">
                      Download our comprehensive guide to US immigration
                    </p>
                  </div>
                </div>
                <Button className="bg-black text-white hover:bg-gray-900">Download Now Free</Button>
              </div>
            </div>
          </section>

          {/* Practice Areas with Hover Effects */}
          <section className="py-24 bg-gray-950">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-5xl md:text-6xl font-bold mb-6">
                  Practice <span className="text-gradient">Areas</span>
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Comprehensive legal services with a personalized approach
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Scale,
                    title: 'Immigration Law',
                    desc: 'Visas, Green Cards, Citizenship',
                    color: 'from-blue-600 to-blue-800',
                  },
                  {
                    icon: Shield,
                    title: 'Criminal Defense',
                    desc: 'DUI, Drug Charges, Assault',
                    color: 'from-red-600 to-red-800',
                  },
                  {
                    icon: Users,
                    title: 'Family Law',
                    desc: 'Divorce, Custody, Support',
                    color: 'from-purple-600 to-purple-800',
                  },
                  {
                    icon: FileText,
                    title: 'Personal Injury',
                    desc: 'Accidents, Medical Malpractice',
                    color: 'from-green-600 to-green-800',
                  },
                ].map((area, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="group"
                  >
                    <Card className="bg-gray-900 border-gray-800 h-full hover:border-gold-500 transition-all duration-300 overflow-hidden">
                      <div
                        className={`h-2 bg-gradient-to-r ${area.color} group-hover:h-3 transition-all`}
                      />
                      <CardHeader>
                        <area.icon className="w-12 h-12 text-gold-500 mb-4" />
                        <CardTitle className="text-white text-2xl">{area.title}</CardTitle>
                        <CardDescription className="text-gray-400 text-lg">
                          {area.desc}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full bg-transparent border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black">
                          Learn More
                          <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Interactive Case Evaluation */}
          <section className="py-24 bg-black">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                  <CardHeader className="text-center">
                    <CardTitle className="text-4xl text-white mb-4">
                      Free Case Evaluation Calculator
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-lg">
                      Get an instant estimate of your case value and success probability
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-white mb-2 block">Case Type</label>
                        <select className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700">
                          <option>Personal Injury</option>
                          <option>Immigration</option>
                          <option>Criminal Defense</option>
                          <option>Family Law</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-white mb-2 block">Case Severity</label>
                        <select className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700">
                          <option>Minor</option>
                          <option>Moderate</option>
                          <option>Severe</option>
                          <option>Critical</option>
                        </select>
                      </div>
                    </div>
                    <Button className="w-full bg-gold-500 text-black hover:bg-gold-600 text-lg py-6">
                      Calculate Now
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Client Success Stories */}
          <section className="py-24 bg-gray-950">
            <div className="container mx-auto px-4">
              <h2 className="text-5xl font-bold text-center mb-16 text-white">
                Client <span className="text-gradient">Success Stories</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { amount: '$2.5M', case: 'Car Accident Settlement', time: '6 months' },
                  { amount: 'Green Card', case: 'Family Immigration', time: '3 months' },
                  { amount: 'Case Dismissed', case: 'DUI Defense', time: '2 months' },
                ].map((story, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="bg-gradient-to-br from-gold-500 to-gold-600 p-8 rounded-2xl mb-6">
                      <h3 className="text-5xl font-bold text-black mb-2">{story.amount}</h3>
                      <p className="text-black/80 text-lg">{story.case}</p>
                    </div>
                    <p className="text-gray-400">Resolved in {story.time}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Version 2: Classic Light */}
      {activeVersion === 2 && (
        <div className="pt-20 bg-gray-50">
          {/* Professional Header */}
          <header className="bg-white shadow-sm py-4 sticky top-20 z-40">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <h1 className="text-2xl font-bold text-burgundy-900">Vasquez Law Firm</h1>
                  <nav className="hidden md:flex gap-6">
                    <Link href="#" className="text-gray-700 hover:text-burgundy-700">
                      Practice Areas
                    </Link>
                    <Link href="#" className="text-gray-700 hover:text-burgundy-700">
                      Attorneys
                    </Link>
                    <Link href="#" className="text-gray-700 hover:text-burgundy-700">
                      Results
                    </Link>
                    <Link href="#" className="text-gray-700 hover:text-burgundy-700">
                      Resources
                    </Link>
                  </nav>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="hidden md:flex">
                    <Phone className="w-4 h-4 mr-2" />
                    844-967-3536
                  </Button>
                  <Button className="bg-burgundy-700 hover:bg-burgundy-800">
                    Free Consultation
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="py-24 bg-gradient-to-br from-burgundy-50 to-white">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-5xl md:text-6xl font-bold text-burgundy-900 mb-6">
                    Trusted Legal Excellence Since 1987
                  </h1>
                  <p className="text-xl text-gray-700 mb-8">
                    With over 35 years of experience, Vasquez Law Firm has been the trusted choice
                    for thousands of clients across North Carolina and Florida.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-8">
                    <Button size="lg" className="bg-burgundy-700 hover:bg-burgundy-800">
                      Schedule Free Consultation
                    </Button>
                    <Button size="lg" variant="outline">
                      View Case Results
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-3xl font-bold text-burgundy-900">10,000+</h3>
                      <p className="text-gray-600">Cases Won</p>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-burgundy-900">$100M+</h3>
                      <p className="text-gray-600">Recovered</p>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-burgundy-900">60+</h3>
                      <p className="text-gray-600">Years Experience</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <Image
                    src="/images/team-photo.jpg"
                    alt="Vasquez Law Firm Team"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-gold-500 p-6 rounded-lg shadow-xl">
                    <p className="text-2xl font-bold text-black">AV Rated</p>
                    <p className="text-black/80">Martindale-Hubbell</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Practice Areas Grid */}
          <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-burgundy-900 mb-4">
                  Our Practice Areas
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Comprehensive legal services delivered with compassion and expertise
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Immigration Law',
                    icon: Scale,
                    features: ['Green Cards', 'Citizenship', 'Deportation Defense', 'Work Visas'],
                  },
                  {
                    title: 'Personal Injury',
                    icon: Shield,
                    features: [
                      'Car Accidents',
                      'Slip & Fall',
                      'Medical Malpractice',
                      'Wrongful Death',
                    ],
                  },
                  {
                    title: 'Criminal Defense',
                    icon: FileText,
                    features: ['DUI/DWI', 'Drug Crimes', 'Assault', 'White Collar'],
                  },
                  {
                    title: 'Family Law',
                    icon: Users,
                    features: ['Divorce', 'Child Custody', 'Alimony', 'Property Division'],
                  },
                  {
                    title: "Workers' Comp",
                    icon: Award,
                    features: [
                      'Workplace Injuries',
                      'Disability Claims',
                      'Third Party Claims',
                      'Appeals',
                    ],
                  },
                  {
                    title: 'Business Law',
                    icon: Clock,
                    features: ['Formation', 'Contracts', 'Litigation', 'Compliance'],
                  },
                ].map((area, index) => (
                  <Card key={index} className="hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <area.icon className="w-12 h-12 text-burgundy-700 mb-4" />
                      <CardTitle className="text-2xl text-burgundy-900">{area.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {area.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-gray-600">
                            <Check className="w-4 h-4 text-green-600 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full" variant="outline">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Attorney Spotlight */}
          <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center text-burgundy-900 mb-16">
                Meet Our Attorneys
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: 'William Vasquez',
                    title: 'Founding Partner',
                    image: '/images/WV-Headshot.JPEG',
                  },
                  {
                    name: 'Mark Kelsey',
                    title: 'Senior Attorney',
                    image: '/images/attorney-2.jpg',
                  },
                  {
                    name: 'Adrianna Ingram',
                    title: 'Immigration Specialist',
                    image: '/images/attorney-3.jpg',
                  },
                ].map((attorney, index) => (
                  <motion.div key={index} whileHover={{ y: -5 }} className="text-center">
                    <div className="mb-6 relative overflow-hidden rounded-lg">
                      <Image
                        src={attorney.image}
                        alt={attorney.name}
                        width={300}
                        height={400}
                        className="w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-6">
                        <Button className="w-full bg-gold-500 text-black hover:bg-gold-600">
                          View Profile
                        </Button>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-burgundy-900">{attorney.name}</h3>
                    <p className="text-gray-600">{attorney.title}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Version 3: Modern Gradient */}
      {activeVersion === 3 && (
        <div className="pt-20">
          {/* Animated Gradient Background */}
          <section className="relative min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-burgundy-800 to-gold-600 animate-gradient-shift" />
            <div className="absolute inset-0 bg-black/30" />

            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500/20 rounded-full blur-3xl animate-float" />
              <div
                className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float"
                style={{ animationDelay: '2s' }}
              />
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="text-center text-white"
              >
                <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-text-shimmer">
                  Next-Gen Legal Services
                </h1>
                <p className="text-2xl md:text-3xl mb-12 max-w-3xl mx-auto text-white/90">
                  Where Technology Meets Legal Excellence
                </p>

                {/* Interactive CTA */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="bg-white text-black hover:bg-gray-100 text-lg px-10 py-6 rounded-full shadow-2xl"
                    >
                      Start Your Journey
                      <ArrowRight className="ml-2" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white hover:text-black text-lg px-10 py-6 rounded-full"
                    >
                      Watch Video
                      <Play className="ml-2" />
                    </Button>
                  </motion.div>
                </div>

                {/* Live Stats */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { label: 'Active Cases', value: '247' },
                    { label: 'Success Rate', value: '98%' },
                    { label: 'Client Satisfaction', value: '4.9/5' },
                    { label: 'Response Time', value: '<2h' },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="glass-dark p-6 rounded-2xl"
                    >
                      <h3 className="text-3xl font-bold text-gold-400">{stat.value}</h3>
                      <p className="text-white/80">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* AI-Powered Features */}
          <section className="py-24 bg-black text-white">
            <div className="container mx-auto px-4">
              <h2 className="text-5xl font-bold text-center mb-16">AI-Powered Legal Solutions</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Smart Case Analysis',
                    desc: 'AI analyzes your case details for optimal strategy',
                    icon: '🤖',
                  },
                  {
                    title: '24/7 Virtual Assistant',
                    desc: 'Get instant answers to legal questions anytime',
                    icon: '💬',
                  },
                  {
                    title: 'Predictive Outcomes',
                    desc: 'Machine learning predicts case success probability',
                    icon: '📊',
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-purple-900/50 to-burgundy-900/50 p-8 rounded-2xl border border-purple-700/50"
                  >
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Interactive Timeline */}
          <section className="py-24 bg-gradient-to-b from-black to-purple-950">
            <div className="container mx-auto px-4">
              <h2 className="text-5xl font-bold text-center text-white mb-16">
                Your Legal Journey
              </h2>
              <div className="max-w-4xl mx-auto">
                {[
                  { step: 1, title: 'Initial Consultation', time: 'Day 1' },
                  { step: 2, title: 'Case Strategy Development', time: 'Week 1' },
                  { step: 3, title: 'Documentation & Filing', time: 'Week 2-4' },
                  { step: 4, title: 'Negotiation & Resolution', time: 'Month 2-6' },
                  { step: 5, title: 'Success & Celebration', time: 'Completion' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center mb-8"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-black font-bold text-xl">
                      {item.step}
                    </div>
                    <div className="ml-6 flex-1 glass-dark p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <p className="text-gold-400">{item.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Lead Magnet Components */}
      <AnimatePresence>
        {showCaseEvaluator && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="relative">
              <button
                onClick={() => setShowCaseEvaluator(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300"
              >
                <X className="w-8 h-8" />
              </button>
              <CaseEvaluator
                onComplete={data => {
                  console.log('Case evaluation completed:', data);
                  setShowCaseEvaluator(false);
                  setShowContactForm(true);
                }}
              />
            </div>
          </div>
        )}

        {showContactForm && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowContactForm(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300"
              >
                <X className="w-8 h-8" />
              </button>
              <GHLContactForm
                formType="consultation"
                tags={['modern-demo', 'high-intent']}
                campaignId="demo-campaign"
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Exit Intent Popup */}
      <ExitIntentPopup
        onAction={action => {
          if (action === 'consultation') {
            setShowContactForm(true);
          } else if (action === 'download') {
            window.open('/resources/immigration-guide-2025.pdf', '_blank');
          }
        }}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-40 space-y-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowCaseEvaluator(true)}
          className="bg-gold-500 text-black p-4 rounded-full shadow-2xl hover:bg-gold-600 transition-colors"
        >
          <Calculator className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowContactForm(true)}
          className="bg-burgundy-700 text-white p-4 rounded-full shadow-2xl hover:bg-burgundy-800 transition-colors"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }

        @keyframes text-shimmer {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }

        .animate-text-shimmer {
          background: linear-gradient(90deg, #fff 0%, #d4af37 50%, #fff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: text-shimmer 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
