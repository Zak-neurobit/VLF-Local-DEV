'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Mic,
  MicOff,
  Paperclip,
  Phone,
  Calendar,
  FileText,
  Globe,
  Bot,
  User,
  Loader2,
  CheckCircle,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';
import { useChat, useVoiceRecognition } from '../../hooks';
import { cn } from '@/lib/utils';
import { logger } from '@/lib/safe-logger';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  metadata?: {
    intent?: string;
    confidence?: number;
    agent?: string;
    language?: string;
  };
}

interface QuickAction {
  id: string;
  label: string;
  labelEs: string;
  icon: React.ReactNode;
  action: string;
  intent: string;
}

const quickActions: QuickAction[] = [
  {
    id: 'appointment',
    label: 'Schedule Consultation',
    labelEs: 'Agendar Consulta',
    icon: <Calendar className="w-4 h-4" />,
    action: 'I need to schedule a consultation',
    intent: 'appointment_scheduling',
  },
  {
    id: 'immigration',
    label: 'Immigration Help',
    labelEs: 'Ayuda Migratoria',
    icon: <Globe className="w-4 h-4" />,
    action: 'I need help with immigration',
    intent: 'immigration_inquiry',
  },
  {
    id: 'documents',
    label: 'Document Review',
    labelEs: 'Revisar Documentos',
    icon: <FileText className="w-4 h-4" />,
    action: 'I need documents reviewed',
    intent: 'document_analysis',
  },
  {
    id: 'call',
    label: 'Request Call Back',
    labelEs: 'Solicitar Llamada',
    icon: <Phone className="w-4 h-4" />,
    action: 'I need someone to call me',
    intent: 'callback_request',
  },
];

export function EnhancedChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [locale, setLocale] = useState<'en' | 'es'>('en');
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<string>('general');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { sendMessage, isConnected } = useChat();
  const { isListening, startListening, stopListening, transcript } = useVoiceRecognition();

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Voice transcript handling
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        content:
          locale === 'es'
            ? '¡Hola! Soy el asistente legal de Vasquez Law Firm. ¿En qué puedo ayudarte hoy?'
            : "Hello! I'm the Vasquez Law Firm legal assistant. How can I help you today?",
        role: 'assistant',
        timestamp: new Date(),
        metadata: {
          agent: 'intake',
          language: locale,
        },
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, locale, messages.length]);

  const handleSendMessage = async () => {
    if (!input.trim() && !uploadedFile) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setShowQuickActions(false);
    setIsProcessing(true);

    try {
      // Prepare request with file if uploaded
      const formData = new FormData();
      formData.append('message', input);
      formData.append('locale', locale);
      formData.append('sessionId', localStorage.getItem('chatSessionId') || '');

      if (uploadedFile) {
        formData.append('file', uploadedFile);
        formData.append('intent', 'document_analysis');
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to send message');

      const data = await response.json();

      // Store session ID
      if (data.sessionId) {
        localStorage.setItem('chatSessionId', data.sessionId);
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date(),
        metadata: {
          intent: data.intent,
          confidence: data.confidence,
          agent: data.agent || currentAgent,
          language: locale,
        },
      };

      setMessages(prev => [...prev, assistantMessage]);
      setCurrentAgent(data.agent || currentAgent);

      // Handle special intents
      if (data.intent === 'appointment_scheduling' && data.appointmentUrl) {
        window.open(data.appointmentUrl, '_blank');
      } else if (data.intent === 'callback_request' && data.callbackScheduled) {
        // Show success notification
      }
    } catch (error) {
      logger.error('Chat error:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content:
          locale === 'es'
            ? 'Lo siento, hubo un error. Por favor intenta de nuevo.'
            : 'Sorry, there was an error. Please try again.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsProcessing(false);
      setUploadedFile(null);
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    setInput(action.action);
    handleSendMessage();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(
          locale === 'es'
            ? 'El archivo es demasiado grande (máx 10MB)'
            : 'File too large (max 10MB)'
        );
        return;
      }
      setUploadedFile(file);
    }
  };

  const toggleVoiceRecognition = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening(locale);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 group"
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatContainerRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: 'calc(100vh - 100px)', maxWidth: 'calc(100vw - 48px)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bot className="w-8 h-8" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Vasquez Law Assistant</h3>
                  <p className="text-xs opacity-80 flex items-center gap-1">
                    {isConnected ? (
                      <>
                        <CheckCircle className="w-3 h-3" />
                        {currentAgent === 'intake' && 'Legal Intake Specialist'}
                        {currentAgent === 'immigration' && 'Immigration Expert'}
                        {currentAgent === 'document' && 'Document Analyst'}
                        {currentAgent === 'general' && 'Available to help'}
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3" />
                        Connecting...
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}
                  className="text-sm px-2 py-1 bg-white/20 rounded hover:bg-white/30 transition"
                >
                  {locale === 'en' ? 'ES' : 'EN'}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 p-1 rounded transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    'flex gap-3',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                      <Bot className="w-5 h-5 text-primary-600" />
                    </div>
                  )}
                  <div
                    className={cn(
                      'max-w-[80%] rounded-2xl px-4 py-2',
                      message.role === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white shadow-sm border border-gray-100'
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    {message.metadata?.intent && (
                      <p className="text-xs mt-1 opacity-70">
                        {message.metadata.intent.replace(/_/g, ' ')}
                      </p>
                    )}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="bg-white shadow-sm border border-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {showQuickActions && messages.length === 1 && (
              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">
                  {locale === 'es' ? 'Acciones rápidas:' : 'Quick actions:'}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map(action => (
                    <button
                      key={action.id}
                      onClick={() => handleQuickAction(action)}
                      className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition text-sm"
                    >
                      {action.icon}
                      <span>{locale === 'es' ? action.labelEs : action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* File Upload Preview */}
            {uploadedFile && (
              <div className="px-4 py-2 bg-blue-50 border-t border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <Paperclip className="w-4 h-4" />
                  <span className="truncate max-w-[200px]">{uploadedFile.name}</span>
                  <span className="text-xs opacity-70">
                    ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="text-blue-700 hover:text-blue-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                    placeholder={locale === 'es' ? 'Escribe tu mensaje...' : 'Type your message...'}
                    disabled={isProcessing}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessing}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
                    title={locale === 'es' ? 'Adjuntar archivo' : 'Attach file'}
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>

                  <button
                    onClick={toggleVoiceRecognition}
                    disabled={isProcessing}
                    className={cn(
                      'p-2 rounded-lg transition disabled:opacity-50',
                      isListening
                        ? 'text-red-500 hover:text-red-700 hover:bg-red-50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    )}
                    title={locale === 'es' ? 'Grabación de voz' : 'Voice recording'}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={handleSendMessage}
                    disabled={(!input.trim() && !uploadedFile) || isProcessing}
                    className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Legal Disclaimer */}
              <p className="text-xs text-gray-400 mt-2 text-center">
                {locale === 'es'
                  ? 'Esta conversación no crea una relación abogado-cliente.'
                  : 'This conversation does not create an attorney-client relationship.'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
