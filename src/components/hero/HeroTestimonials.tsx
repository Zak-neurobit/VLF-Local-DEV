'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  text: string;
  author: string;
}

interface HeroTestimonialsProps {
  testimonials: Testimonial[];
}

export default function HeroTestimonials({ testimonials }: HeroTestimonialsProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    // Testimonial rotation
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [testimonials.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="absolute bottom-8 left-0 right-0"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTestimonial}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl px-4 text-center"
        >
          <p className="italic text-gray-300">
            &quot;{testimonials[currentTestimonial].text}&quot;
          </p>
          <p className="mt-2 text-sm text-[#C9974D]">- {testimonials[currentTestimonial].author}</p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
