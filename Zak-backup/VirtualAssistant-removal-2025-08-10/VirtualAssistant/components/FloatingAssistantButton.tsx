'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

interface FloatingAssistantButtonProps {
  isOpen: boolean;
  onClick: () => void;
  language: 'en' | 'es';
}

export default function FloatingAssistantButton({
  isOpen,
  onClick,
  language,
}: FloatingAssistantButtonProps) {
  return (
    <motion.button
      className="fixed bottom-24 right-8 w-16 h-16 bg-gradient-to-r from-burgundy-600 to-burgundy-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all z-40 flex items-center justify-center group"
      // TODO: Convert whileHover={{ scale: 1.05 }} to react-spring
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      aria-label={language === 'es' ? 'Abrir asistente virtual' : 'Open virtual assistant'}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X className="w-8 h-8" />
          </motion.div>
        ) : (
          <motion.div
            key="open"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <MessageCircle className="w-8 h-8" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse animation when closed */}
      {!isOpen && (
        <motion.div
          className="absolute inset-0 bg-burgundy-600 rounded-full"
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </motion.button>
  );
}
