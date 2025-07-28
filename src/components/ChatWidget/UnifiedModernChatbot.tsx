'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Mic,
  MicOff,
  Paperclip,
  Calendar,
  Bot,
  User,
  Loader2,
  FileText,
} from 'lucide-react';
import { useSocket } from '@/hooks/useSocket';
import { sendChatMessage } from '@/services/chat-service';
import { scheduleGHLAppointment } from '@/services/gohighlevel/appointments';
import { createGHLContact, addGHLNote } from '@/services/gohighlevel/contacts';
import { uploadToGHL } from '@/services/gohighlevel/documents';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'document' | 'voice' | 'appointment';
  metadata?: any;
}

interface ChatbotProps {
  language?: 'en' | 'es';
}

export const UnifiedModernChatbot: React.FC<ChatbotProps> = ({ language: initialLang = 'en' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState(initialLang);
  const [isRecording, setIsRecording] = useState(false);
  const [contactInfo, setContactInfo] = useState<{ name?: string; email?: string; phone?: string }>(
    {}
  );
  const [ghlContactId, setGhlContactId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const { socket } = useSocket();

  // Translations
  const t = {
    en: {
      title: 'How can we help you today?',
      placeholder: 'Type your message...',
      upload: 'Upload document',
      appointment: 'Schedule appointment',
      listening: 'Listening...',
      processing: 'Processing...',
      welcome:
        "Hi! I'm your legal assistant. I can help you with legal questions, document analysis, and scheduling appointments. How may I assist you today?",
      error: 'Something went wrong. Please try again.',
      documentUploaded: 'Document uploaded successfully',
      appointmentScheduled: 'Appointment scheduled successfully',
    },
    es: {
      title: '¿Cómo podemos ayudarte hoy?',
      placeholder: 'Escribe tu mensaje...',
      upload: 'Subir documento',
      appointment: 'Agendar cita',
      listening: 'Escuchando...',
      processing: 'Procesando...',
      welcome:
        '¡Hola! Soy tu asistente legal. Puedo ayudarte con preguntas legales, análisis de documentos y agendar citas. ¿En qué puedo asistirte hoy?',
      error: 'Algo salió mal. Por favor intenta de nuevo.',
      documentUploaded: 'Documento subido exitosamente',
      appointmentScheduled: 'Cita agendada exitosamente',
    },
  };

  // Initialize welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: '1',
          content: t[language].welcome,
          sender: 'bot',
          timestamp: new Date(),
          type: 'text',
        },
      ]);
    }
  }, [isOpen, language, messages.length, t]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Socket listeners
  useEffect(() => {
    if (!socket) return;

    const handleMessage = (data: any) => {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: data.content,
        sender: 'bot',
        timestamp: new Date(),
        type: data.type || 'text',
        metadata: data.metadata,
      };
      setMessages(prev => [...prev, newMessage]);
      setIsLoading(false);

      // Send conversation to GHL
      if (ghlContactId) {
        addGHLNote(ghlContactId, {
          note: `Bot: ${data.content}`,
        });
      }
    };

    socket.on('message', handleMessage);

    return () => {
      socket.off('message', handleMessage);
    };
  }, [socket, ghlContactId]);

  // Create or update GHL contact
  const ensureGHLContact = async () => {
    if (!ghlContactId && (contactInfo.email || contactInfo.phone)) {
      try {
        const contact = await createGHLContact({
          firstName: contactInfo.name?.split(' ')[0] || 'Website',
          lastName: contactInfo.name?.split(' ').slice(1).join(' ') || 'Visitor',
          email: contactInfo.email,
          phone: contactInfo.phone,
          source: 'Website Chat',
          tags: ['chat-lead', language],
        });
        setGhlContactId(contact.id);
        return contact.id;
      } catch (error) {
        console.error('Failed to create GHL contact:', error);
      }
    }
    return ghlContactId;
  };

  // Send message
  const handleSendMessage = async (content: string, type: 'text' | 'voice' = 'text') => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Extract contact info from message
    const emailMatch = content.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
    const phoneMatch = content.match(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/);

    if (emailMatch) setContactInfo(prev => ({ ...prev, email: emailMatch[0] }));
    if (phoneMatch) setContactInfo(prev => ({ ...prev, phone: phoneMatch[0] }));

    try {
      // Ensure GHL contact exists
      const contactId = await ensureGHLContact();

      // Send to chat service
      const response = await sendChatMessage({
        message: content,
        language,
        sessionId: socket?.id || 'anonymous',
        contactId,
      });

      // Send conversation history to GHL
      if (contactId) {
        await addGHLNote(contactId, {
          note: `User: ${content}`,
        });
      }

      // If socket is not connected, show response directly
      if (!socket?.connected) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response.message,
          sender: 'bot',
          timestamp: new Date(),
          type: 'text',
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setIsLoading(false);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: t[language].error,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', language);

    try {
      // Upload to GHL if contact exists
      const contactId = await ensureGHLContact();
      if (contactId) {
        await uploadToGHL(contactId, file);
      }

      // Process document
      const response = await fetch('/api/chat/document', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      const documentMessage: Message = {
        id: Date.now().toString(),
        content: `📄 ${file.name}`,
        sender: 'user',
        timestamp: new Date(),
        type: 'document',
        metadata: { fileName: file.name, fileSize: file.size },
      };

      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.analysis || t[language].documentUploaded,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
      };

      setMessages(prev => [...prev, documentMessage, responseMessage]);
    } catch (error) {
      console.error('Failed to upload document:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: t[language].error,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = event => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await processAudioBlob(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const processAudioBlob = async (blob: Blob) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('audio', blob);
    formData.append('language', language);

    try {
      const response = await fetch('/api/chat/voice', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.transcript) {
        handleSendMessage(data.transcript, 'voice');
      }
    } catch (error) {
      console.error('Failed to process audio:', error);
      setIsLoading(false);
    }
  };

  // Schedule appointment
  const handleScheduleAppointment = async () => {
    setIsLoading(true);
    try {
      const contactId = await ensureGHLContact();
      if (!contactId) {
        throw new Error('Contact information required');
      }

      const appointment = await scheduleGHLAppointment({
        contactId,
        title: 'Legal Consultation',
        startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        duration: 30,
        appointmentStatus: 'pending',
      });

      const appointmentMessage: Message = {
        id: Date.now().toString(),
        content: t[language].appointmentScheduled,
        sender: 'bot',
        timestamp: new Date(),
        type: 'appointment',
        metadata: appointment,
      };

      setMessages(prev => [...prev, appointmentMessage]);
    } catch (error) {
      console.error('Failed to schedule appointment:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: t[language].error,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-primary text-black p-4 rounded-full shadow-2xl hover:bg-primary-300 transition-all duration-300"
          >
            <MessageCircle className="w-6 h-6" />
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
            className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary text-black p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">{t[language].title}</h3>
                  <p className="text-xs opacity-80">Vasquez Law Firm</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                  className="text-xs px-2 py-1 bg-black/20 rounded-full hover:bg-black/30 transition-colors"
                >
                  {language === 'en' ? 'ES' : 'EN'}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-black/20 p-1 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user' ? 'bg-primary text-black' : 'bg-gray-800 text-white'
                    }`}
                  >
                    {message.type === 'document' && (
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm font-medium">Document</span>
                      </div>
                    )}
                    {message.type === 'voice' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Mic className="w-4 h-4" />
                        <span className="text-sm font-medium">Voice Message</span>
                      </div>
                    )}
                    {message.type === 'appointment' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">Appointment</span>
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-white p-3 rounded-2xl">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-800 p-4">
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`p-2 transition-colors ${
                    isRecording ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-white'
                  }`}
                  disabled={isLoading}
                >
                  {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <button
                  onClick={handleScheduleAppointment}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  disabled={isLoading || !contactInfo.email}
                >
                  <Calendar className="w-5 h-5" />
                </button>
              </div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder={t[language].placeholder}
                  className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading || isRecording}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-primary text-black p-2 rounded-full hover:bg-primary-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                className="hidden"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
