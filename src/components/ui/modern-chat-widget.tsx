'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Mic, MicOff, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ModernChatWidgetProps {
  language?: 'en' | 'es';
  embedded?: boolean;
  initialMessage?: string;
}

export function ModernChatWidget({
  language: _language = 'en',
  embedded: _embedded = false,
  initialMessage: _initialMessage,
}: ModernChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy tu asistente legal de IA. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const messageText = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // Detect language from current page or message
      const isSpanish =
        window.location.pathname.startsWith('/es') || /[ñáéíóúü]/i.test(messageText);
      const language = isSpanish ? 'es' : 'en';

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          language,
          sessionId: localStorage.getItem('chatSessionId') || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      // Store session ID for conversation continuity
      if (data.sessionId) {
        localStorage.setItem('chatSessionId', data.sessionId);
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text:
          data.response ||
          (language === 'es'
            ? 'Lo siento, no pude procesar tu mensaje. Por favor, intenta de nuevo.'
            : "Sorry, I couldn't process your message. Please try again."),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Chat API error:', error);

      // Fallback response
      const isSpanish =
        window.location.pathname.startsWith('/es') || /[ñáéíóúü]/i.test(messageText);

      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: isSpanish
          ? 'Disculpa, tuve un problema al procesar tu mensaje. Por favor, intenta de nuevo o llámanos al 1-844-967-3536.'
          : 'I apologize, I had trouble processing your message. Please try again or call us at 1-844-967-3536.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  }, [inputValue]);

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ scale: 0 }}
            // TODO: Convert whileHover={{ scale: 1.1 }} to react-spring
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="floating-button group"
          >
            <MessageCircle className="w-7 h-7 text-white" />

            {/* Pulse Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] animate-ping opacity-20" />

            {/* Sparkle Effect */}
            <motion.div
              animate={{ opacity: 1 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="w-4 h-4 text-[#C9974D]" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-8 right-8 w-96 h-[600px] z-50"
          >
            <div className="glass-card rounded-3xl shadow-2xl h-full flex flex-col overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#22C55E] rounded-full border-2 border-[#6B1F2E]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Asistente Legal VLF</h3>
                    <p className="text-white/80 text-xs">Siempre disponible para ti</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-[#C9974D] to-[#D4A574] text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 p-3 rounded-2xl">
                        <div className="flex gap-1">
                          {[0, 1, 2].map(i => (
                            <motion.div
                              key={i}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                delay: i * 0.1,
                              }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              <div className="px-4 py-2 border-t border-gray-200">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {['Consulta Gratis', 'Inmigración', 'Accidente', 'Horarios'].map(action => (
                    <button
                      key={action}
                      onClick={() => setInputValue(action)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 whitespace-nowrap transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsListening(!isListening)}
                    className={`p-2 rounded-lg transition-colors ${
                      isListening
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>

                  <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9974D] modern-input"
                  />

                  <motion.button
                    // TODO: Convert whileHover={{ scale: 1.05 }} to react-spring
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="p-2 bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-2">
                  Respuestas instantáneas con IA • Disponible 24/7
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
