'use client';

import React, { useState, useEffect, useRef } from 'react';
import { logger } from '@/lib/safe-logger';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Bot, User, Phone, Calendar, Globe } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  quickResponse?: string;
}

interface ChatInterfaceProps {
  language: 'en' | 'es';
  userId?: string;
  onScheduleAppointment?: () => void;
  onCallRequest?: () => void;
}

// Pre-defined questions for quick access
const PREDEFINED_QUESTIONS = {
  en: [
    'What types of cases do you handle?',
    'How much do you charge for a consultation?',
    'Do you speak Spanish?',
    'I need help with immigration',
    'I was injured in an accident',
    'I need a criminal defense lawyer',
    'Where are your offices located?',
    'Do you offer payment plans?',
  ],
  es: [
    '¿Qué tipos de casos manejan?',
    '¿Cuánto cobran por una consulta?',
    '¿Hablan español?',
    'Necesito ayuda con inmigración',
    'Me lesioné en un accidente',
    'Necesito un abogado de defensa criminal',
    '¿Dónde están sus oficinas?',
    '¿Ofrecen planes de pago?',
  ],
};

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  language,
  userId = 'anonymous',
  onScheduleAppointment,
  onCallRequest,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showPredefinedQuestions, setShowPredefinedQuestions] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [hasProvidedContact, setHasProvidedContact] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      role: 'assistant',
      content:
        language === 'es'
          ? '¡Hola! Soy el asistente virtual de Vasquez Law Firm. Estoy aquí para ayudarte con información legal general y responder tus preguntas. ¿En qué puedo ayudarte hoy?'
          : "Hello! I\'m the Vasquez Law Firm virtual assistant. I'm here to help you with general legal information and answer your questions. How can I help you today?",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, [language]);

  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    // Check if we should collect contact info
    if (!hasProvidedContact && messages.length > 2) {
      setShowContactForm(true);
      return;
    }

    // Hide predefined questions after first message
    setShowPredefinedQuestions(false);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          userId,
          language,
          sessionId,
          contactInfo: hasProvidedContact ? contactInfo : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      // Update session ID if provided
      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId);
      }

      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        quickResponse: data.quickResponse,
      };
      setMessages(prev => [...prev, assistantMessage]);

      // Check if response suggests scheduling appointment or calling
      const lowerResponse = data.response.toLowerCase();
      if (
        lowerResponse.includes('schedule') ||
        lowerResponse.includes('consultation') ||
        lowerResponse.includes('programar') ||
        lowerResponse.includes('consulta')
      ) {
        // Show appointment scheduling suggestion
        setTimeout(() => {
          if (onScheduleAppointment) {
            toast.custom(
              t => (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                  <p className="text-sm mb-2">
                    {language === 'es'
                      ? '¿Te gustaría programar una consulta ahora?'
                      : 'Would you like to schedule a consultation now?'}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        onScheduleAppointment();
                        toast.dismiss(t.id);
                      }}
                      className="px-3 py-1 bg-[#6B1F2E] text-white rounded text-sm"
                    >
                      {language === 'es' ? 'Sí' : 'Yes'}
                    </button>
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm"
                    >
                      {language === 'es' ? 'Más tarde' : 'Later'}
                    </button>
                  </div>
                </div>
              ),
              { duration: 10000 }
            );
          }
        }, 1000);
      }
    } catch (error) {
      logger.error('Error sending message', { error });

      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          language === 'es'
            ? 'Lo siento, tuve un problema al procesar tu mensaje. Por favor, intenta de nuevo o llámanos al 1-844-967-3536.'
            : "I\'m sorry, I had trouble processing your message. Please try again or call us at 1-844-967-3536.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  };

  const handlePredefinedQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map(message => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-[#6B1F2E] text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0">
                    {message.role === 'user' ? (
                      <User className="w-5 h-5" />
                    ) : (
                      <Bot className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString(language === 'es' ? 'es-ES' : 'en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          </motion.div>
        )}

        {/* Predefined questions */}
        {showPredefinedQuestions && messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {language === 'es' ? 'Preguntas frecuentes:' : 'Common questions:'}
            </p>
            <div className="grid grid-cols-1 gap-2">
              {PREDEFINED_QUESTIONS[language].slice(0, 4).map((question, index) => (
                <button
                  key={index}
                  onClick={() => handlePredefinedQuestion(question)}
                  className="text-left text-sm p-2 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="border-t dark:border-gray-700 p-3">
        <div className="flex justify-center gap-4 mb-3">
          <button
            onClick={onCallRequest}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#6B1F2E] transition-colors"
          >
            <Phone className="w-4 h-4" />
            {language === 'es' ? 'Llamar ahora' : 'Call now'}
          </button>
          <button
            onClick={onScheduleAppointment}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#6B1F2E] transition-colors"
          >
            <Calendar className="w-4 h-4" />
            {language === 'es' ? 'Programar cita' : 'Schedule appointment'}
          </button>
          <button
            onClick={() => {
              const newLang = language === 'en' ? 'es' : 'en';
              const params = new URLSearchParams(searchParams?.toString() || '');
              params.set('lang', newLang);
              router.push(`?${params.toString()}`);
            }}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#6B1F2E] transition-colors"
          >
            <Globe className="w-4 h-4" />
            {language === 'es' ? 'English' : 'Español'}
          </button>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
          >
            <h3 className="text-lg font-semibold mb-4">
              {language === 'es'
                ? 'Para brindarte mejor asistencia, necesitamos tu información de contacto'
                : 'To better assist you, we need your contact information'}
            </h3>

            <form
              onSubmit={e => {
                e.preventDefault();
                if (contactInfo.phone || contactInfo.email) {
                  setHasProvidedContact(true);
                  setShowContactForm(false);
                  // Create GHL lead
                  fetch('/api/leads/capture', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      firstName: contactInfo.firstName || 'Chat',
                      lastName: contactInfo.lastName || 'User',
                      email: contactInfo.email || `chat-${Date.now()}@vasquezlaw.com`,
                      phone: contactInfo.phone,
                      practiceArea: 'immigration', // Default, can be updated based on chat content
                      message: `Chat session ID: ${sessionId}`,
                      urgency: 'soon',
                      language: language as 'en' | 'es',
                      source: 'website-chat',
                      formId: 'chat-widget',
                      pageUrl: window.location.href,
                    }),
                  }).catch(error => {
                    logger.error('Failed to play AI response audio', { error });
                  });

                  // Send the pending message
                  sendMessage(inputMessage);
                }
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={language === 'es' ? 'Nombre' : 'First Name'}
                  value={contactInfo.firstName}
                  onChange={e => setContactInfo({ ...contactInfo, firstName: e.target.value })}
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E]"
                />
                <input
                  type="text"
                  placeholder={language === 'es' ? 'Apellido' : 'Last Name'}
                  value={contactInfo.lastName}
                  onChange={e => setContactInfo({ ...contactInfo, lastName: e.target.value })}
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E]"
                />
              </div>

              <input
                type="email"
                placeholder={language === 'es' ? 'Correo electrónico' : 'Email'}
                value={contactInfo.email}
                onChange={e => setContactInfo({ ...contactInfo, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E]"
              />

              <input
                type="tel"
                placeholder={language === 'es' ? 'Teléfono (requerido)' : 'Phone (required)'}
                value={contactInfo.phone}
                onChange={e => setContactInfo({ ...contactInfo, phone: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E]"
                required
              />

              <button
                type="submit"
                className="w-full py-2 bg-[#6B1F2E] text-white rounded-lg hover:bg-[#8B2635] transition-colors"
              >
                {language === 'es' ? 'Continuar' : 'Continue'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowContactForm(false);
                  setInputMessage('');
                }}
                className="w-full py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
              >
                {language === 'es' ? 'Omitir por ahora' : 'Skip for now'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Input Area */}
      <div className="border-t dark:border-gray-700 p-4">
        <form
          onSubmit={e => {
            e.preventDefault();
            sendMessage(inputMessage);
          }}
          className="flex gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              language === 'es' ? 'Escribe tu pregunta aquí...' : 'Type your question here...'
            }
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-2 bg-[#6B1F2E] text-white rounded-lg hover:bg-[#8B2635] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>
        <p className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">
          {language === 'es'
            ? 'Respuestas generadas por IA. No es asesoramiento legal.'
            : 'AI-generated responses. Not legal advice.'}
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
