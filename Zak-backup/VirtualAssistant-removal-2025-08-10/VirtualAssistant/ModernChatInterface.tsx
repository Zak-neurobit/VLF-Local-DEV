'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Phone,
  Calendar,
  Sparkles,
  User,
  Bot,
  Loader2,
  Paperclip,
  Smile,
} from 'lucide-react';
// import { useCrewAI } from '@/hooks/useCrewAI';
import { toast } from 'react-hot-toast';
import { logger } from '@/lib/safe-logger';
import { format } from 'date-fns';
// Contact form will be inline

interface ModernChatInterfaceProps {
  language: 'en' | 'es';
  userId: string;
  onMessage?: (message: string) => void;
  onTypingChange?: (isTyping: boolean) => void;
}

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

const predefinedQuestions = {
  en: [
    { id: '1', text: 'I need help with a personal injury case', icon: '🤕' },
    { id: '2', text: 'I want to schedule a consultation', icon: '📅' },
    { id: '3', text: 'What are your fees?', icon: '💰' },
    { id: '4', text: 'I need immigration assistance', icon: '🌎' },
  ],
  es: [
    { id: '1', text: 'Necesito ayuda con un caso de lesiones personales', icon: '🤕' },
    { id: '2', text: 'Quiero programar una consulta', icon: '📅' },
    { id: '3', text: '¿Cuáles son sus tarifas?', icon: '💰' },
    { id: '4', text: 'Necesito asistencia de inmigración', icon: '🌎' },
  ],
};

export const ModernChatInterface: React.FC<ModernChatInterfaceProps> = ({
  language,
  userId,
  onMessage,
  onTypingChange,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [hasCollectedContact, setHasCollectedContact] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // const { sendMessage } = useCrewAI();

  // Load chat history
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const savedMessages = localStorage.getItem(`chat-history-${userId}`);
    const savedContact = localStorage.getItem(`chat-contact-${userId}`);
    
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })));
      } catch (error) {
        logger.error('Failed to parse chat history', { error });
      }
    } else {
      // Welcome message
      setMessages([{
        id: '1',
        type: 'assistant',
        content: language === 'es' 
          ? '¡Hola! Soy tu asistente legal virtual. ¿En qué puedo ayudarte hoy?' 
          : 'Hello! I\'m your virtual legal assistant. How can I help you today?',
        timestamp: new Date(),
      }]);
    }
    
    setHasCollectedContact(!!savedContact);
  }, [userId, language]);

  // Save chat history
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (messages.length > 0) {
      localStorage.setItem(`chat-history-${userId}`, JSON.stringify(messages));
    }
  }, [messages, userId]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle send message
  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    onMessage?.(text);

    // Check if we need to collect contact info
    if (!hasCollectedContact && messages.length >= 2) {
      setShowContactForm(true);
      setIsLoading(false);
      return;
    }

    // Add typing indicator
    const typingMessage: Message = {
      id: 'typing',
      type: 'assistant',
      content: '',
      timestamp: new Date(),
      isTyping: true,
    };
    
    setMessages(prev => [...prev, typingMessage]);
    onTypingChange?.(true);

    try {
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response based on language
      const response = language === 'es' 
        ? 'Gracias por tu mensaje. Un abogado se pondrá en contacto contigo pronto.'
        : 'Thank you for your message. An attorney will contact you soon.';
      
      // Remove typing indicator and add response
      setMessages(prev => prev.filter(m => m.id !== 'typing').concat({
        id: Date.now().toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date(),
      }));
    } catch (error) {
      logger.error('Failed to send message', { error });
      
      setMessages(prev => prev.filter(m => m.id !== 'typing').concat({
        id: Date.now().toString(),
        type: 'assistant',
        content: language === 'es' 
          ? 'Lo siento, hubo un error. Por favor, intenta de nuevo.' 
          : 'Sorry, there was an error. Please try again.',
        timestamp: new Date(),
      }));
    } finally {
      setIsLoading(false);
      onTypingChange?.(false);
    }
  }, [messages, hasCollectedContact, isLoading, language, userId, onMessage, onTypingChange]);

  // Handle quick actions
  const handleQuickAction = useCallback((action: string) => {
    if (typeof window === 'undefined') return;
    
    switch (action) {
      case 'call':
        window.location.href = 'tel:+18555055555';
        break;
      case 'schedule':
        toast.success(
          language === 'es' 
            ? 'Abriendo el calendario...' 
            : 'Opening calendar...'
        );
        window.open('https://calendly.com/vasquezlaw', '_blank');
        break;
    }
  }, [language]);

  // Message bubble component
  const MessageBubble = ({ message }: { message: Message }) => {
    const isUser = message.type === 'user';
    
    if (message.isTyping) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="flex items-start space-x-2 mb-4"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-burgundy-700 to-burgundy-800 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3">
            <div className="flex space-x-1">
              <motion.div
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 bg-gray-400 rounded-full"
              />
              <motion.div
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                className="w-2 h-2 bg-gray-400 rounded-full"
              />
              <motion.div
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                className="w-2 h-2 bg-gray-400 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      );
    }
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={`flex items-end space-x-2 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
      >
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-burgundy-700 to-burgundy-800 flex items-center justify-center flex-shrink-0">
            <Bot className="w-5 h-5 text-white" />
          </div>
        )}
        
        <div className={`max-w-[75%] ${isUser ? 'order-first' : ''}`}>
          <div className={`
            rounded-2xl px-4 py-3 
            ${isUser 
              ? 'bg-gradient-to-br from-burgundy-700 to-burgundy-800 text-white' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
            }
          `}>
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          </div>
          <p className={`
            text-xs text-gray-500 mt-1 
            ${isUser ? 'text-right' : 'text-left'}
          `}>
            {format(message.timestamp, 'h:mm a')}
          </p>
        </div>
        
        {isUser && (
          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        <AnimatePresence>
          {messages.map(message => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      
      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            {language === 'es' ? 'Preguntas frecuentes:' : 'Common questions:'}
          </p>
          <div className="grid grid-cols-1 gap-2">
            {predefinedQuestions[language].map(question => (
              <motion.button
                key={question.id}
                // TODO: Convert whileHover={{ scale: 1.02 }} to react-spring
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSendMessage(question.text)}
                className="flex items-center space-x-2 text-left p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-xl">{question.icon}</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">{question.text}</span>
              </motion.button>
            ))}
          </div>
        </div>
      )}
      
      {/* Quick Actions */}
      <div className="px-4 pb-2">
        <div className="flex space-x-2">
          <motion.button
            // TODO: Convert whileHover={{ scale: 1.05 }} to react-spring
            whileTap={{ scale: 0.95 }}
            onClick={() => handleQuickAction('call')}
            className="flex items-center space-x-1 px-3 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>{language === 'es' ? 'Llamar ahora' : 'Call now'}</span>
          </motion.button>
          
          <motion.button
            // TODO: Convert whileHover={{ scale: 1.05 }} to react-spring
            whileTap={{ scale: 0.95 }}
            onClick={() => handleQuickAction('schedule')}
            className="flex items-center space-x-1 px-3 py-2 bg-burgundy-700 text-white rounded-lg text-sm hover:bg-burgundy-800 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>{language === 'es' ? 'Agendar cita' : 'Schedule'}</span>
          </motion.button>
        </div>
      </div>
      
      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputValue);
        }}>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={language === 'es' ? 'Escribe tu mensaje...' : 'Type your message...'}
              className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-700"
              disabled={isLoading}
            />
            
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <Smile className="w-5 h-5" />
            </button>
            
            <motion.button
              type="submit"
              // TODO: Convert whileHover={{ scale: 1.05 }} to react-spring
              whileTap={{ scale: 0.95 }}
              disabled={!inputValue.trim() || isLoading}
              className={`
                p-3 rounded-full transition-all
                ${inputValue.trim() && !isLoading
                  ? 'bg-gradient-to-r from-burgundy-700 to-burgundy-800 text-white shadow-lg' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                }
              `}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </form>
      </div>
      
      {/* Contact Form Inline */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white dark:bg-gray-900 z-50 p-4 flex flex-col"
          >
            <h3 className="text-lg font-semibold mb-4">
              {language === 'es' ? 'Antes de continuar' : 'Before we continue'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {language === 'es' 
                ? 'Por favor, comparte tu información de contacto para poder ayudarte mejor.'
                : 'Please share your contact information so we can better assist you.'}
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = {
                  name: formData.get('name'),
                  email: formData.get('email'),
                  phone: formData.get('phone'),
                };
                if (typeof window !== 'undefined') {
                  localStorage.setItem(`chat-contact-${userId}`, JSON.stringify(data));
                }
                setHasCollectedContact(true);
                setShowContactForm(false);
                toast.success(
                  language === 'es' 
                    ? '¡Gracias! Continuemos con tu consulta.' 
                    : 'Thank you! Let\'s continue with your consultation.'
                );
              }}
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                placeholder={language === 'es' ? 'Tu nombre' : 'Your name'}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy-700"
              />
              <input
                type="email"
                name="email"
                placeholder={language === 'es' ? 'Tu correo electrónico' : 'Your email'}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy-700"
              />
              <input
                type="tel"
                name="phone"
                placeholder={language === 'es' ? 'Tu teléfono' : 'Your phone'}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy-700"
              />
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-burgundy-700 text-white rounded-lg hover:bg-burgundy-800 transition-colors"
                >
                  {language === 'es' ? 'Continuar' : 'Continue'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  {language === 'es' ? 'Omitir' : 'Skip'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};