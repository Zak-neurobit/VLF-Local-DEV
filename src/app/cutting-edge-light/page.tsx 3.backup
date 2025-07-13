'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useSpring as useReactSpring, animated } from '@react-spring/web';
import Link from 'next/link';
import {
  ArrowRight,
  Phone,
  Sparkles,
  Zap,
  Brain,
  Globe,
  ChevronDown,
  Sun,
  Moon,
  Scale,
  Shield,
  Users,
  FileText,
} from 'lucide-react';

// Dynamic imports for Three.js components (no SSR)
const Canvas = dynamic(() => import('@react-three/fiber').then(mod => mod.Canvas), { ssr: false });
const OrbitControls = dynamic(() => import('@react-three/drei').then(mod => mod.OrbitControls), {
  ssr: false,
});

// 3D Floating Sphere Component for Light Theme
const AnimatedSphereLightWrapper = dynamic(() => import('@/components/Three/AnimatedSphereLight'), {
  ssr: false,
});

// Bento Box Component - Light Theme
function BentoBox({
  children,
  className = '',
  delay = 0,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  [key: string]: unknown;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100 p-8 ${className}`}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold-50/30 to-transparent opacity-50" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export default function CuttingEdgeLightPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // React Spring animations
  const numberSpring = useReactSpring({
    from: { number: 0 },
    to: { number: 98 },
    config: { duration: 3000 },
  });

  // Custom cursor - lighter version
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Parallax transforms
  const y1 = useTransform(smoothProgress, [0, 1], [0, -300]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, -200]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.1, 0.9]);

  return (
    <div
      className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-black'} text-gray-900 overflow-hidden transition-colors duration-500`}
      ref={containerRef}
    >
      {/* Theme Toggle */}
      <motion.button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className={`fixed top-24 right-8 z-50 p-3 rounded-full ${
          theme === 'light'
            ? 'bg-white shadow-lg hover:shadow-xl'
            : 'bg-gray-900 border border-gray-800 hover:border-gray-700'
        } transition-all`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {theme === 'light' ? (
          <Moon className="w-6 h-6 text-burgundy-700" />
        ) : (
          <Sun className="w-6 h-6 text-gold-400" />
        )}
      </motion.button>

      {/* Custom Cursor */}
      <motion.div
        className={`fixed w-8 h-8 pointer-events-none z-50 ${
          theme === 'light' ? 'mix-blend-darken' : 'mix-blend-difference'
        }`}
        animate={{
          x: cursorPosition.x - 16,
          y: cursorPosition.y - 16,
          scale: isHovering ? 2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        <div
          className={`w-full h-full rounded-full ${
            theme === 'light' ? 'bg-burgundy-600' : 'bg-white'
          }`}
        />
      </motion.div>

      {/* Hero Section with 3D */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Suspense
            fallback={<div className="w-full h-full bg-gradient-to-br from-gold-100 to-gray-50" />}
          >
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[10, 10, 5]} intensity={0.5} />
              <AnimatedSphereLightWrapper />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </Suspense>
        </div>

        {/* Animated gradient background - Light version */}
        <div className="absolute inset-0 z-1">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-100/50 via-burgundy-100/30 to-white animate-gradient-shift" />
        </div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center px-4 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-100 border border-gold-200 text-sm mb-8 text-burgundy-800">
              <Sparkles className="w-4 h-4" />
              Excellence in Legal Services
            </span>
          </motion.div>

          <motion.h1 className="text-6xl md:text-8xl font-bold mb-8" style={{ y: y1 }}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-burgundy-600 via-burgundy-800 to-burgundy-600 animate-gradient-x">
              Vasquez Law
            </span>
            <br />
            <span className="text-gray-800">Firm Excellence</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Where tradition meets innovation. Experience unparalleled legal expertise with a modern
            approach to client service.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <motion.button
              className="px-8 py-4 rounded-full bg-gradient-to-r from-burgundy-600 to-burgundy-700 text-white font-semibold flex items-center gap-2 shadow-lg hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              className="px-8 py-4 rounded-full bg-white border-2 border-gold-400 text-burgundy-700 font-semibold hover:bg-gold-50 transition-all shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5 inline mr-2" />
              Free Consultation
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-8 h-8 text-burgundy-400" />
        </motion.div>
      </section>

      {/* Bento Grid Section */}
      <motion.section className="py-32 px-4" style={{ y: y2 }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-burgundy-600 to-gold-600">
                Why Choose Us
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the perfect blend of tradition and innovation
            </p>
          </motion.div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]">
            {/* Large feature box */}
            <BentoBox
              className="md:col-span-2 lg:col-span-2 md:row-span-2 bg-gradient-to-br from-burgundy-50 to-white"
              delay={0}
            >
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mb-6 shadow-lg">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-burgundy-900">
                    Strategic Legal Excellence
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Our experienced attorneys combine decades of expertise with innovative
                    strategies to deliver exceptional results for every client.
                  </p>
                </div>
                <div className="mt-6">
                  <animated.div className="text-5xl font-bold text-gold-600">
                    {numberSpring.number.to(n => `${Math.floor(n)}%`)}
                  </animated.div>
                  <p className="text-gray-500">Success Rate</p>
                </div>
              </div>
            </BentoBox>

            {/* Stats box */}
            <BentoBox className="bg-gradient-to-br from-gold-50 to-white" delay={0.1}>
              <div className="h-full flex flex-col justify-center items-center text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-24 h-24 rounded-full border-4 border-gold-300 border-t-gold-500 mb-4"
                />
                <div className="text-4xl font-bold mb-2 text-burgundy-800">10K+</div>
                <p className="text-gray-600">Cases Won</p>
              </div>
            </BentoBox>

            {/* Response time */}
            <BentoBox className="bg-white" delay={0.2}>
              <div className="h-full flex flex-col justify-between">
                <Zap className="w-12 h-12 text-gold-500 mb-4" />
                <div>
                  <h4 className="text-2xl font-bold mb-2 text-burgundy-900">Rapid Response</h4>
                  <p className="text-gray-600">Average response time under 2 hours</p>
                </div>
              </div>
            </BentoBox>

            {/* Practice areas */}
            <BentoBox
              className="md:col-span-2 bg-gradient-to-br from-white to-burgundy-50"
              delay={0.3}
            >
              <h4 className="text-2xl font-bold mb-6 text-burgundy-900">Practice Areas</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Scale, name: 'Immigration', color: 'from-burgundy-500 to-burgundy-600' },
                  { icon: Shield, name: 'Criminal Defense', color: 'from-gold-500 to-gold-600' },
                  { icon: Users, name: 'Family Law', color: 'from-burgundy-500 to-burgundy-600' },
                  { icon: FileText, name: 'Personal Injury', color: 'from-gold-500 to-gold-600' },
                ].map((area, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-100"
                    whileHover={{ x: 5 }}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${area.color} flex items-center justify-center`}
                    >
                      <area.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-800 font-medium">{area.name}</span>
                  </motion.div>
                ))}
              </div>
            </BentoBox>

            {/* Global reach */}
            <BentoBox className="md:col-span-2 bg-gradient-to-br from-gold-50 to-white" delay={0.4}>
              <div className="h-full flex items-center justify-between">
                <div>
                  <Globe className="w-12 h-12 text-burgundy-600 mb-4" />
                  <h4 className="text-2xl font-bold mb-2 text-burgundy-900">Nationwide Reach</h4>
                  <p className="text-gray-600">Serving clients across all 50 states</p>
                </div>
                <div className="relative w-32 h-32">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-200 to-burgundy-200"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-4 rounded-full bg-gradient-to-r from-gold-300 to-burgundy-300"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />
                  <div className="absolute inset-8 rounded-full bg-gradient-to-r from-gold-400 to-burgundy-500" />
                </div>
              </div>
            </BentoBox>
          </div>
        </div>
      </motion.section>

      {/* Interactive CTA Section */}
      <section className="py-32 px-4">
        <motion.div className="max-w-7xl mx-auto" style={{ scale }}>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-burgundy-600 to-burgundy-800 p-12 md:p-20 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-gold-400/20 via-transparent to-burgundy-900/20" />

            <div className="relative z-10 text-center text-white">
              <motion.h2
                className="text-5xl md:text-7xl font-bold mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                Ready to Experience
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-300 to-gold-500">
                  Excellence?
                </span>
              </motion.h2>

              <motion.p
                className="text-xl text-white/80 mb-12 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Join thousands who have already transformed their legal journey with our
                client-focused approach.
              </motion.p>

              <motion.button
                className="px-12 py-6 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 text-burgundy-900 font-bold text-lg shadow-2xl hover:shadow-gold-400/50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Today
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Link to dark version */}
      {theme === 'dark' && (
        <Link
          href="/cutting-edge"
          className="fixed bottom-8 left-8 text-white/60 hover:text-white transition-colors text-sm"
        >
          ← Back to original dark version
        </Link>
      )}

      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

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

        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 4s ease infinite;
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }
      `}</style>
    </div>
  );
}
