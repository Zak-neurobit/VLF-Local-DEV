'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ParallaxSection,
  MorphingText,
  FloatingParticles,
  LiquidReveal,
  MagneticButton,
  Card3D,
  ScrollProgressBar,
  AnimatedCounter,
  StaggeredList,
  BlobAnimation,
  GradientText,
  SplitText,
} from '@/components/animations';
import { useScrollReveal, useCascadeReveal } from '@/hooks/useScrollReveal';
import { useAnimationPerformance } from '@/hooks/useAnimationPerformance';
import { Users, Trophy, Clock, Star, Shield, Scale, Heart, Brain, Activity } from 'lucide-react';

interface LiveMetrics {
  visitorCount: number;
  conversationsActive: number;
  reviewsToday: number;
  contentCreated: number;
}

export function EpicHomePage() {
  const { shouldAnimate, getAnimationProps } = useAnimationPerformance();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveMetrics, setLiveMetrics] = useState<LiveMetrics>({
    visitorCount: 0,
    conversationsActive: 0,
    reviewsToday: 0,
    contentCreated: 0,
  });
  const [recentActivity, setRecentActivity] = useState<string>('');

  useEffect(() => {
    // Update time every minute
    const timeTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Fetch live metrics
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        setLiveMetrics(data.metrics);
        if (data.recentActivity.length > 0) {
          setRecentActivity(data.recentActivity[0].message);
        }
      } catch (error) {
        console.error('Error fetching live metrics:', error);
      }
    };

    fetchMetrics();
    const metricsTimer = setInterval(fetchMetrics, 30000); // Update every 30 seconds

    return () => {
      clearInterval(timeTimer);
      clearInterval(metricsTimer);
    };
  }, []);

  const getTimeBasedGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const stats = [
    { icon: Users, value: 50000, label: 'Clients Served', color: 'from-[#6B1F2E] to-[#8B2635]' },
    {
      icon: Trophy,
      value: 95,
      label: 'Success Rate',
      suffix: '%',
      color: 'from-[#C9974D] to-[#D4A574]',
    },
    {
      icon: Clock,
      value: 30,
      label: 'Years Experience',
      suffix: '+',
      color: 'from-[#6B1F2E] to-[#8B2635]',
    },
    { icon: Star, value: 4.9, label: 'Average Rating', color: 'from-[#C9974D] to-[#D4A574]' },
  ];

  const practiceAreas = [
    { icon: Shield, title: 'Personal Injury', description: 'Fighting for maximum compensation' },
    { icon: Scale, title: 'Immigration Law', description: 'Your path to citizenship' },
    { icon: Heart, title: 'Family Law', description: 'Protecting what matters most' },
    { icon: Brain, title: 'Criminal Defense', description: 'Defending your rights' },
  ];

  const testimonials = [
    { text: "They saved my family's future. Forever grateful!", author: 'Maria G.' },
    { text: 'Professional, caring, and truly exceptional service.', author: 'John D.' },
    { text: 'Won my case against all odds. Highly recommend!', author: 'Sarah L.' },
    { text: 'The best legal team in North Carolina, hands down.', author: 'Robert M.' },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Background Effects */}
      <FloatingParticles density={15} />
      <ScrollProgressBar />

      {/* Live Status Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 right-4 z-50 bg-black/80 backdrop-blur-sm rounded-lg px-4 py-2 text-white"
      >
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium">LIVE</span>
          <span className="text-xs text-gray-300">{currentTime.toLocaleTimeString()}</span>
        </div>
      </motion.div>

      {/* Real-time Activity Banner */}
      {recentActivity && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-16 left-1/2 transform -translate-x-1/2 z-40 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm"
        >
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>{recentActivity}</span>
          </div>
        </motion.div>
      )}

      {/* Epic Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <BlobAnimation />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            {/* Dynamic Greeting */}
            <motion.p
              key={getTimeBasedGreeting()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl text-[#C9974D] mb-4"
            >
              {getTimeBasedGreeting()}, we&apos;re actively working on your legal needs
            </motion.p>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <SplitText text="Fighting For " />
              <div className="text-6xl md:text-8xl mt-4">
                <MorphingText
                  texts={['Justice', 'Your Rights', 'Your Future', 'Excellence']}
                  type="scramble"
                />
              </div>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              <GradientText text="North Carolina's Premier Law Firm - Where Experience Meets Innovation" />
            </p>

            {/* Live Metrics Display */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-[#C9974D]">{liveMetrics.visitorCount}</div>
                <div className="text-sm text-gray-600">Active Visitors</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {liveMetrics.conversationsActive}
                </div>
                <div className="text-sm text-gray-600">Live Chats</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-yellow-600">{liveMetrics.reviewsToday}</div>
                <div className="text-sm text-gray-600">Reviews Today</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {liveMetrics.contentCreated}
                </div>
                <div className="text-sm text-gray-600">Content Created</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton className="text-lg">Get Free Consultation</MagneticButton>
              <motion.button
                {...getAnimationProps()}
                className="px-8 py-4 border-2 border-[#6B1F2E] text-[#6B1F2E] rounded-lg font-semibold hover:bg-[#6B1F2E] hover:text-white transition-colors"
              >
                View Our Results
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-[#6B1F2E] rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-[#6B1F2E] rounded-full mt-2"
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Animated Stats Section */}
      <LiquidReveal className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <GradientText text="Results That Speak Volumes" />
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex p-4 rounded-full bg-gradient-to-br ${stat.color} mb-4`}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>

                <div className="text-4xl md:text-5xl font-bold text-[#6B1F2E] mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix || ''} />
                </div>

                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </LiquidReveal>

      {/* Practice Areas with 3D Cards */}
      <ParallaxSection className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <SplitText text="Areas of Practice" delay={0.5} />
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {practiceAreas.map((area, index) => (
              <Card3D key={index} className="h-full">
                <div className="p-8 text-center h-full flex flex-col justify-between">
                  <div>
                    <area.icon className="w-16 h-16 mx-auto mb-4 text-[#6B1F2E]" />
                    <h3 className="text-xl font-bold mb-2">{area.title}</h3>
                    <p className="text-gray-600">{area.description}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 text-[#C9974D] font-semibold"
                  >
                    Learn More →
                  </motion.button>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Testimonials with Staggered Animation */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <GradientText text="Client Success Stories" />
          </h2>

          <StaggeredList
            items={testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-start mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#C9974D] text-[#C9974D]" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-[#6B1F2E]">- {testimonial.author}</p>
              </motion.div>
            ))}
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6B1F2E] to-[#8B2635]" />
        <FloatingParticles density={10} />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Win Your Case?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get a free consultation with our award-winning legal team today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-[#6B1F2E] rounded-lg font-semibold text-lg"
              >
                Schedule Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg"
              >
                Call (555) 123-4567
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
