'use client';

import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Send, Loader2, Globe } from 'lucide-react';
import { logger } from '@/lib/safe-logger';
import { useRouter } from 'next/navigation';
import { isBrowser } from '@/lib/utils/browser';
import { toast } from 'react-hot-toast';
import type { Socket } from 'socket.io-client';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  metadata?: {
    quickResponse?: boolean;
    intent?: string;
    sentiment?: 'positive' | 'negative' | 'neutral';
    extractedInfo?: Record<string, string | number | boolean>;
    timestamp?: string;
  } | null;
}

interface ChatWidgetProps {
  // Core props
  language?: 'en' | 'es';
  userId?: string;
  
  // Feature flags
  enableSocket?: boolean;
  enableVoice?: boolean;
  enableQuickResponses?: boolean;
  enableSSR?: boolean;
  
  // Styling
  position?: 'bottom-right' | 'bottom-left';
  theme?: 'default' | 'burgundy';
  
  // Callbacks
  onMessage?: (message: string) => void;
  onScheduleAppointment?: () => void;
  onCallRequest?: () => void;
  onEscalation?: (type: string, data: Record<string, unknown>) => void;
  
  // Advanced
  customStyles?: {
    button?: string;
    window?: string;
    header?: string;
  };
}

// Pre-defined questions for quick access
const PREDEFINED_QUESTIONS = {
  en: [
    'What types of cases do you handle?',
    'How much do you charge for a consultation?',
    'Do you speak Spanish?',
    'I need help with immigration',
    'Where are your offices located?',
  ],
  es: [
    '¿Qué tipos de casos manejan?',
    '¿Cuánto cobran por una consulta?',
    '¿Hablan español?',
    'Necesito ayuda con inmigración',
    '¿Dónde están sus oficinas?',
  ],
};

const ChatWidgetComponent: React.FC<ChatWidgetProps> = ({
  language = 'en',
  userId = 'anonymous',
  enableSocket = false,
  enableVoice = false,
  enableQuickResponses = true,
  enableSSR = true,
  position = 'bottom-right',
  theme = 'burgundy',
  onMessage,
  onScheduleAppointment,
  onCallRequest,
  onEscalation,
  customStyles = {},
}) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [displayLanguage, setDisplayLanguage] = useState(language);
  const [showPredefinedQuestions, setShowPredefinedQuestions] = useState(true);
  
  // Socket-related state
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionId = useRef<string | null>(null);

  // Theme configuration
  const themeColors = {
    default: {
      primary: 'bg-secondary',
      hover: 'hover:bg-secondary-dark',
      text: 'text-white',
    },
    burgundy: {
      primary: 'bg-burgundy-700',
      hover: 'hover:bg-burgundy-800',
      text: 'text-white',
    },
  };

  const currentTheme = themeColors[theme] || themeColors.default;

  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4 sm:bottom-6 sm:right-6',
    'bottom-left': 'bottom-4 left-4 sm:bottom-6 sm:left-6',
  };

  // Handle SSR
  useEffect(() => {
    setMounted(true);
    
    // Generate session ID
    if (isBrowser && !sessionId.current) {
      sessionId.current = `session-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    }
  }, []);

  // Check URL params for language preference
  useEffect(() => {
    if (isBrowser && mounted) {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang');
      if (lang === 'es' || lang === 'en') {
        setDisplayLanguage(lang);
      }
    }
  }, [mounted]);

  // Show welcome message after a delay on first visit
  useEffect(() => {
    if (isBrowser && mounted) {
      const hasVisited = localStorage.getItem('chatWidgetVisited');
      if (!hasVisited) {
        const timer = setTimeout(() => {
          setHasNewMessage(true);
          localStorage.setItem('chatWidgetVisited', 'true');
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [mounted]);

  // Welcome message
  useEffect(() => {
    if (mounted && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content:
          displayLanguage === 'es'
            ? '¡Hola! Soy el asistente virtual de Vasquez Law Firm. ¿En qué puedo ayudarte hoy?'
            : "Hello! I'm the Vasquez Law Firm virtual assistant. How can I help you today?",
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    }
  }, [mounted, displayLanguage, messages.length]);

  // Initialize socket connection if enabled
  useEffect(() => {
    if (!isOpen || !enableSocket || !mounted) return;

    let isMounted = true;
    let socket: Socket | null = null;

    const initializeSocket = async () => {
      setConnectionError(null);

      try {
        const { io } = await import('socket.io-client');
        if (!isMounted) return;

        const socketUrl = window.location.origin;
        socket = io(socketUrl, {
          auth: {
            sessionId: sessionId.current,
            language: displayLanguage,
          },
          transports: ['websocket', 'polling'],
        });

        socket.on('connect', () => {
          if (isMounted) {
            setIsConnected(true);
            setConnectionError(null);
            socket?.emit('chat:init', { userId, language: displayLanguage });
          }
        });

        socket.on('disconnect', () => {
          if (isMounted) {
            setIsConnected(false);
          }
        });

        socket.on('message', (message: Omit<Message, 'id'>) => {
          if (isMounted) {
            const newMessage: Message = {
              ...message,
              id: `msg-${Date.now()}-${Math.random().toString(36).substring(7)}`,
            };
            setMessages(prev => [...prev, newMessage]);
            setIsTyping(false);
          }
        });

        socket.on('typing', ({ isTyping: typing }: { isTyping: boolean }) => {
          if (isMounted) {
            setIsTyping(typing);
          }
        });

        socket.on('escalation', (data: { type: string; message: string }) => {
          if (isMounted && onEscalation) {
            onEscalation(data.type, data);
          }
        });

        socket.on('error', (error: { message: string }) => {
          if (isMounted) {
            setConnectionError(error.message);
            logger.error('Socket error:', error);
          }
        });

        if (isMounted) {
          socketRef.current = socket;
        }
      } catch (error) {
        if (isMounted) {
          setConnectionError('Failed to connect to chat service');
          logger.error('Socket initialization error:', error);
        }
      }
    };

    initializeSocket();

    return () => {
      isMounted = false;
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [isOpen, enableSocket, mounted, userId, displayLanguage, onEscalation]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setHasNewMessage(false);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleScheduleAppointment = useCallback(() => {
    try {
      if (onScheduleAppointment) {
        onScheduleAppointment();
      } else {
        router.push('/contact#appointment');
      }
    } catch (error) {
      logger.error('Error navigating to appointment page:', error);
      if (isBrowser) {
        window.open('/contact#appointment', '_blank');
      }
    }
  }, [router, onScheduleAppointment]);

  const handleCallRequest = useCallback(() => {
    try {
      if (onCallRequest) {
        onCallRequest();
      } else if (isBrowser) {
        window.location.href = 'tel:18449673536';
      }
    } catch (error) {
      logger.error('Error initiating phone call:', error);
      toast.error('Please call us at 1-844-967-3536');
    }
  }, [onCallRequest]);

  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setShowPredefinedQuestions(false);
    setIsLoading(true);
    setIsTyping(true);

    if (onMessage) {
      onMessage(message);
    }

    try {
      if (enableSocket && socketRef.current && isConnected) {
        // Send via socket
        socketRef.current.emit('message', {
          content: message,
          language: displayLanguage,
        });
      } else {
        // Send via API
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
            language: displayLanguage,
            sessionId: sessionId.current,
            userId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        const data = await response.json();
        
        const assistantMessage: Message = {
          id: `msg-${Date.now()}-assistant`,
          role: 'assistant',
          content: data.response,
          timestamp: new Date().toISOString(),
          metadata: data.metadata,
        };

        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      logger.error('Error sending message:', error);
      toast.error(displayLanguage === 'es' ? 'Error al enviar mensaje' : 'Failed to send message');
      
      const errorMessage: Message = {
        id: `msg-${Date.now()}-error`,
        role: 'system',
        content: displayLanguage === 'es' 
          ? 'Lo siento, hubo un error. Por favor intenta de nuevo.' 
          : 'Sorry, there was an error. Please try again.',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const handlePredefinedQuestion = (question: string) => {
    sendMessage(question);
  };

  // Don't render during SSR unless explicitly enabled
  if (!mounted && !enableSSR) {
    return null;
  }

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={handleOpen}
            className={`fixed ${positionClasses[position]} z-50 ${currentTheme.primary} ${currentTheme.text} rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 ${currentTheme.hover} ${customStyles.button || ''}`}
            aria-label={displayLanguage === 'es' ? 'Abrir chat de asistencia' : 'Open assistance chat'}
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
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed ${position === 'bottom-right' ? 'bottom-0 right-0 sm:bottom-6 sm:right-6' : 'bottom-0 left-0 sm:bottom-6 sm:left-6'} z-50 w-full sm:max-w-[380px] sm:w-[380px] bg-white dark:bg-gray-900 sm:rounded-lg shadow-2xl overflow-hidden max-h-[100vh] sm:max-h-[600px] ${customStyles.window || ''}`}
            role="dialog"
            aria-label={displayLanguage === 'es' ? 'Ventana de chat de asistencia' : 'Assistance chat window'}
            aria-modal="true"
          >
            {/* Header */}
            <div className={`${currentTheme.primary} ${currentTheme.text} p-4 flex justify-between items-center ${customStyles.header || ''}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">
                    {displayLanguage === 'es' ? 'Asistente Legal Virtual' : 'Virtual Legal Assistant'}
                  </h3>
                  <p className="text-xs opacity-90">
                    {enableSocket && !isConnected 
                      ? (displayLanguage === 'es' ? 'Conectando...' : 'Connecting...') 
                      : (displayLanguage === 'es' ? 'En línea' : 'Online')}
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
                  aria-label={displayLanguage === 'es' ? 'Cerrar ventana de chat' : 'Close chat window'}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100%-140px)]">
              {connectionError && (
                <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
                  {connectionError}
                </div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? `${currentTheme.primary} ${currentTheme.text}`
                        : message.role === 'system'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Predefined Questions */}
              {enableQuickResponses && showPredefinedQuestions && messages.length <= 1 && (
                <div className="space-y-2 mt-4">
                  <p className="text-xs text-gray-500">
                    {displayLanguage === 'es' ? 'Preguntas frecuentes:' : 'Common questions:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PREDEFINED_QUESTIONS[displayLanguage].slice(0, 3).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handlePredefinedQuestion(question)}
                        className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t bg-white dark:bg-gray-900">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    displayLanguage === 'es' ? 'Escribe tu mensaje...' : 'Type your message...'
                  }
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy-700 text-sm"
                  disabled={isLoading || (enableSocket && !isConnected)}
                />
                <button
                  onClick={() => sendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading || (enableSocket && !isConnected)}
                  className={`px-4 py-2 ${currentTheme.primary} ${currentTheme.text} rounded-lg ${currentTheme.hover} disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2`}
                  aria-label={displayLanguage === 'es' ? 'Enviar mensaje' : 'Send message'}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
              {/* Action Buttons */}
              <div className="flex gap-2 mt-3 text-xs">
                <button
                  onClick={handleScheduleAppointment}
                  className="flex-1 py-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  {displayLanguage === 'es' ? '📅 Agendar Cita' : '📅 Schedule Appointment'}
                </button>
                <button
                  onClick={() => setDisplayLanguage(displayLanguage === 'es' ? 'en' : 'es')}
                  className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 inline mr-1" />
                  {displayLanguage === 'es' ? 'EN' : 'ES'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const ConsolidatedChatWidget = memo(ChatWidgetComponent);

// Export a default configuration for backwards compatibility
export const ChatWidget = ConsolidatedChatWidget;

// Export specific configurations for common use cases
export const SimpleChatWidget = (props: Omit<ChatWidgetProps, 'enableSocket' | 'enableVoice'>) => (
  <ConsolidatedChatWidget {...props} enableSocket={false} enableVoice={false} />
);

export const SocketChatWidget = (props: Omit<ChatWidgetProps, 'enableSocket'>) => (
  <ConsolidatedChatWidget {...props} enableSocket={true} />
);

export const ClientOnlyChatWidget = (props: ChatWidgetProps) => (
  <ConsolidatedChatWidget {...props} enableSSR={false} />
);