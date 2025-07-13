'use client';

import React, { useState, useEffect, useCallback, memo } from 'react';
import { logger } from '@/lib/pino-logger';
import { useRouter } from 'next/navigation';
import { MessageCircle, X, Phone } from 'lucide-react';
import { ChatInterface } from './VirtualAssistant/ChatInterface';
import { isBrowser } from '@/lib/utils/browser';

interface ChatWidgetProps {
  language?: 'en' | 'es';
  userId?: string;
}

const ChatWidgetComponent: React.FC<ChatWidgetProps> = ({
  language = 'en',
  userId = 'anonymous',
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
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

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setHasNewMessage(false);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleScheduleAppointment = useCallback(() => {
    try {
      // Navigate to appointment page using Next.js router
      router.push('/contact#appointment');
    } catch (error) {
      logger.error('Error navigating to appointment page:', error);
      // Fallback: open in new window
      if (isBrowser) {
        window.open('/contact#appointment', '_blank');
      }
    }
  }, [router]);

  const handleCallRequest = useCallback(() => {
    try {
      if (isBrowser) {
        window.location.href = 'tel:18449673536';
      }
    } catch (error) {
      logger.error('Error initiating phone call:', error);
      // Fallback: show phone number for manual dialing
      alert('Please call us at 1-844-967-3536');
    }
  }, []);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-secondary text-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          aria-label={
            displayLanguage === 'es' ? 'Abrir chat de asistencia' : 'Open assistance chat'
          }
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        >
          <MessageCircle className="w-6 h-6" />
          {hasNewMessage && (
            <span
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"
              aria-label={displayLanguage === 'es' ? 'Nuevo mensaje' : 'New message'}
            />
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:max-w-[380px] sm:w-[380px] bg-white dark:bg-gray-900 sm:rounded-lg shadow-2xl overflow-hidden max-h-[100vh] sm:max-h-[600px]"
          role="dialog"
          aria-label={
            displayLanguage === 'es' ? 'Ventana de chat de asistencia' : 'Assistance chat window'
          }
          aria-modal="true"
        >
          {/* Header */}
          <div className="bg-secondary text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">
                  {displayLanguage === 'es' ? 'Asistente Legal Virtual' : 'Virtual Legal Assistant'}
                </h3>
                <p className="text-xs opacity-90">
                  {displayLanguage === 'es' ? 'En línea' : 'Online'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleCallRequest}
                className="p-2 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                title={displayLanguage === 'es' ? 'Llamar ahora' : 'Call now'}
                aria-label={displayLanguage === 'es' ? 'Llamar ahora' : 'Call now'}
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                title={displayLanguage === 'es' ? 'Cerrar' : 'Close'}
                aria-label={
                  displayLanguage === 'es' ? 'Cerrar ventana de chat' : 'Close chat window'
                }
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="h-[calc(100%-64px)]">
            <ChatInterface
              language={displayLanguage}
              userId={userId}
              onScheduleAppointment={handleScheduleAppointment}
              onCallRequest={handleCallRequest}
            />
          </div>
        </div>
      )}
    </>
  );
};

export const ChatWidget = memo(ChatWidgetComponent);
