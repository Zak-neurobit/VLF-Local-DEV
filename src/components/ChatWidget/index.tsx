'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Socket } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import { componentLogger, userFlowLogger } from '@/lib/logger';
import { useErrorHandler } from '@/components/ErrorBoundary';
import { formatTime, generateId } from '@/lib/utils/date-utils';
import { useHydrationSafe } from '@/hooks/useHydrationSafe';

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
  userId?: string;
  language?: string;
  onEscalation?: (type: string, data: Record<string, unknown>) => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  userId,
  language = 'en',
  onEscalation,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(language);

  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef<string | null>(null);
  const handleError = useErrorHandler();
  const isHydrated = useHydrationSafe();

  // Initialize session ID after hydration
  useEffect(() => {
    if (!sessionId.current && isHydrated) {
      sessionId.current = generateId('session');
    }
  }, [isHydrated]);

  // Initialize socket connection
  useEffect(() => {
    componentLogger.mount('ChatWidget', { userId, language });

    const initSocket = async () => {
      try {
        // Dynamically import socket.io-client to prevent SSR issues
        const { io } = await import('socket.io-client');
        
        // Use the same origin for WebSocket connection
        const socketUrl = window.location.origin;
        const socket = io(socketUrl, {
          auth: {
            sessionId: sessionId.current,
            language: currentLanguage,
          },
          transports: ['websocket', 'polling'],
        });

        socket.on('connect', () => {
          setIsConnected(true);
          socket.emit('chat:init', { userId, language: currentLanguage });
        });

        socket.on('disconnect', () => {
          setIsConnected(false);
        });

        socket.on('message', (message: Omit<Message, 'id'>) => {
          const newMessage: Message = {
            ...message,
            id: generateId('msg'),
          };
          setMessages(prev => [...prev, newMessage]);
          componentLogger.stateChange(
            'ChatWidget',
            messages.length,
            messages.length + 1,
            'new_message'
          );
        });

        socket.on('typing', ({ isTyping: typing }) => {
          setIsTyping(typing);
        });

        socket.on('escalation', data => {
          if (onEscalation) {
            onEscalation(data.type, data);
          }

          const escalationMessage: Message = {
            id: generateId('msg'),
            role: 'system',
            content: data.message,
            timestamp: new Date().toISOString(),
          };
          setMessages(prev => [...prev, escalationMessage]);
        });

        socket.on('error', error => {
          handleError(new Error(error.message), { context: 'socket_error' });
        });

        socketRef.current = socket;
      } catch (error) {
        handleError(error as Error, { context: 'socket_init' });
      }
    };

    if (isOpen) {
      initSocket();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        componentLogger.unmount('ChatWidget');
      }
    };
  }, [isOpen, userId, currentLanguage, handleError]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
    userFlowLogger.flowStep('chat_interaction', 'toggle_widget', sessionId.current);
  }, []);

  const sendMessage = useCallback(() => {
    if (!inputValue.trim() || !socketRef.current || !isConnected) return;

    const userMessage: Message = {
      id: generateId('msg'),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    socketRef.current.emit('message', {
      content: inputValue,
      language: currentLanguage,
    });

    userFlowLogger.flowStep('chat_interaction', 'message_sent', sessionId.current);

    setInputValue('');
  }, [inputValue, isConnected, currentLanguage]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const changeLanguage = useCallback(
    (lang: string) => {
      setCurrentLanguage(lang);
      if (socketRef.current) {
        socketRef.current.emit('language:change', lang);
      }
      componentLogger.stateChange('ChatWidget', currentLanguage, lang, 'language_change');
    },
    [currentLanguage]
  );

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-[#6B1F2E] text-white rounded-full p-4 shadow-lg hover:scale-105 transition-transform focus-visible-ring hover:bg-[#8B2635]"
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
        data-testid="chat-widget"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col"
            data-testid="chat-interface"
          >
            {/* Header */}
            <div className="bg-[#6B1F2E] text-white p-4 rounded-t-lg flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Vasquez Law Firm</h3>
                <p className="text-sm opacity-90">{isConnected ? 'Online' : 'Connecting...'}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => changeLanguage('en')}
                  className={`px-2 py-1 text-xs rounded ${currentLanguage === 'en' ? 'bg-[#C9974D]' : 'hover:bg-white/10'}`}
                  aria-label="English"
                >
                  EN
                </button>
                <button
                  onClick={() => changeLanguage('es')}
                  className={`px-2 py-1 text-xs rounded ${currentLanguage === 'es' ? 'bg-[#C9974D]' : 'hover:bg-white/10'}`}
                  aria-label="Español"
                >
                  ES
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-[#6B1F2E] text-white'
                        : message.role === 'system'
                          ? 'bg-muted text-muted-foreground italic'
                          : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {isHydrated ? formatTime(message.timestamp) : ''}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
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
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    currentLanguage === 'es' ? 'Escribe tu mensaje...' : 'Type your message...'
                  }
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9974D]"
                  disabled={!isConnected}
                  data-testid="chat-input"
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || !isConnected}
                  className="px-4 py-2 bg-[#6B1F2E] text-white rounded-lg hover:bg-[#8B2635] disabled:opacity-50 disabled:cursor-not-allowed focus-visible-ring"
                  aria-label="Send message"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
