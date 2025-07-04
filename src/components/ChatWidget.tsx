'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Minimize2, Phone } from 'lucide-react';
import { ChatInterface } from './VirtualAssistant/ChatInterface';
import { isBrowser, safeWindow } from '@/lib/utils/browser';

interface ChatWidgetProps {
  language?: 'en' | 'es';
  userId?: string;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  language = 'en',
  userId = 'anonymous',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [displayLanguage, setDisplayLanguage] = useState(language);

  // Check URL params for language preference
  useEffect(() => {
    if (isBrowser) {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang');
      if (lang === 'es' || lang === 'en') {
        setDisplayLanguage(lang);
      }
    }
  }, []);

  // Show welcome message after a delay on first visit
  useEffect(() => {
    if (isBrowser) {
      const hasVisited = localStorage.getItem('chatWidgetVisited');
      if (!hasVisited) {
        const timer = setTimeout(() => {
          setHasNewMessage(true);
          localStorage.setItem('chatWidgetVisited', 'true');
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setHasNewMessage(false);
    setIsMinimized(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleScheduleAppointment = () => {
    // Navigate to appointment page or open appointment modal
    if (isBrowser) {
      window.location.href = '/contact#appointment';
    }
  };

  const handleCallRequest = () => {
    if (isBrowser) {
      window.location.href = 'tel:18449673536';
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-secondary text-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-shadow"
          >
            <MessageCircle className="w-6 h-6" />

            {/* New Message Indicator */}
            {hasNewMessage && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
              >
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-red-500 rounded-full opacity-50"
                />
              </motion.div>
            )}

            {/* Tooltip */}
            {hasNewMessage && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-full mr-3 bottom-1/2 transform translate-y-1/2 bg-gray-800 text-white text-sm py-1 px-3 rounded-lg whitespace-nowrap"
              >
                {displayLanguage === 'es'
                  ? '¡Hola! ¿Necesitas ayuda legal?'
                  : 'Hi! Need legal help?'}
                <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2">
                  <div className="w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-800" />
                </div>
              </motion.div>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: isMinimized ? 0.7 : 1,
              y: isMinimized ? 10 : 0,
              scale: isMinimized ? 0.98 : 1,
              height: isMinimized ? '60px' : '600px',
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:max-w-[380px] sm:w-[380px] bg-white dark:bg-gray-900 sm:rounded-lg shadow-2xl overflow-hidden max-h-[100vh] sm:max-h-[600px]"
          >
            {/* Header */}
            <div className="bg-secondary text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">
                    {displayLanguage === 'es'
                      ? 'Asistente Legal Virtual'
                      : 'Virtual Legal Assistant'}
                  </h3>
                  <p className="text-xs opacity-90">
                    {displayLanguage === 'es' ? 'En línea' : 'Online'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleCallRequest}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  title={displayLanguage === 'es' ? 'Llamar ahora' : 'Call now'}
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  onClick={handleMinimize}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  title={displayLanguage === 'es' ? 'Minimizar' : 'Minimize'}
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  title={displayLanguage === 'es' ? 'Cerrar' : 'Close'}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Interface */}
            {!isMinimized && (
              <div className="h-[calc(100%-64px)]">
                <ChatInterface
                  language={displayLanguage}
                  userId={userId}
                  onScheduleAppointment={handleScheduleAppointment}
                  onCallRequest={handleCallRequest}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};