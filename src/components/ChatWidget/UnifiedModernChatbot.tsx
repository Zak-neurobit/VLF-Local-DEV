'use client';

import React, { useState, useRef, useEffect } from 'react';
// Removed framer-motion for performance
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
  Phone,
} from 'lucide-react';
import { useSocket } from '@/hooks/useSocket';
import { sendChatMessage } from '@/services/chat-service';
import { scheduleGHLAppointment } from '@/services/gohighlevel/appointments';
import { createGHLContact, addGHLNote } from '@/services/gohighlevel/contacts';
import { uploadToGHL } from '@/services/gohighlevel/documents';
// Lazy load voice component for better performance
import dynamic from 'next/dynamic';
const MinimalRetellClient = dynamic(
  () => import('@/components/Voice/MinimalRetellClient').then(mod => mod.MinimalRetellClient),
  { 
    loading: () => <div className="flex items-center justify-center p-4"><Loader2 className="animate-spin" /></div>,
    ssr: false 
  }
);

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
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
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
  const handleSendMessage = async (content: string | any, type: 'text' | 'voice' = 'text') => {
    // Handle both string and object inputs from voice assistant
    const messageText = typeof content === 'string' 
      ? content 
      : (content?.content || content?.text || '');
    
    // Safety check - ensure we have a string
    if (!messageText || typeof messageText !== 'string' || !messageText.trim()) {
      console.warn('Invalid message content:', content);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText, // Use the extracted text, not the original content
      sender: 'user',
      timestamp: new Date(),
      type,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Extract contact info from message
    const emailMatch = messageText.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
    const phoneMatch = messageText.match(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/);

    if (emailMatch) setContactInfo(prev => ({ ...prev, email: emailMatch[0] }));
    if (phoneMatch) setContactInfo(prev => ({ ...prev, phone: phoneMatch[0] }));

    try {
      // Ensure GHL contact exists
      const contactId = await ensureGHLContact();

      // Send to chat service
      const response = await sendChatMessage({
        message: messageText,
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
      // Check if we're on the client and mediaDevices is available
      if (typeof window === 'undefined' || !navigator?.mediaDevices?.getUserMedia) {
        throw new Error('Voice recording not supported');
      }
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
      {/* Chat Button - Always visible for toggle */}
      <button
        onClick={() => {
          console.log('Chat button clicked, toggling chat...');
          setIsOpen(!isOpen);
        }}
        className="fixed bottom-6 right-6 z-[10000] bg-[#C9974D] text-white p-4 rounded-full shadow-2xl hover:bg-[#E5B568] transition-all duration-300 cursor-pointer animate-fadeInScale"
        style={{ zIndex: 10000, pointerEvents: 'auto' }}
        aria-label="Open chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window - Reduced size by 20% (from 400x600 to 320x480) */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-[9999] w-[320px] h-[480px] bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slideUp"
          style={{ zIndex: 9999 }}
        >
            {/* Header */}
            <div className="bg-[#C9974D] text-black p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <div>
                  <h3 className="font-semibold text-sm">{t[language].title}</h3>
                  <p className="text-xs opacity-80">Vasquez Law Firm</p>
                </div>
              </div>
              <button
                onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                className="text-xs px-2 py-1 bg-black/20 rounded-full hover:bg-black/30 transition-colors"
              >
                {language === 'en' ? 'ES' : 'EN'}
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user' ? 'bg-[#C9974D] text-black' : 'bg-gray-800 text-white'
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
                </div>
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

            {/* Input Area - Scaled down for smaller widget */}
            <div className="border-t border-gray-800 p-3">
              <div className="flex items-center gap-1 mb-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1.5 text-gray-400 hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowVoiceAssistant(true)}
                  className="p-1.5 text-gray-400 hover:text-white transition-colors"
                  disabled={isLoading}
                  title={language === 'es' ? 'Asistente de voz' : 'Voice assistant'}
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  onClick={handleScheduleAppointment}
                  className="p-1.5 text-gray-400 hover:text-white transition-colors"
                  disabled={isLoading || !contactInfo.email}
                >
                  <Calendar className="w-4 h-4" />
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
                  className="flex-1 bg-gray-800 text-white px-3 py-1.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading || isRecording}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-primary text-black p-1.5 rounded-full hover:bg-primary-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
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
          </div>
        )}
      
      {/* Voice Assistant Modal - Minimal stable version */}
      <MinimalRetellClient
        isActive={showVoiceAssistant}
        onClose={() => setShowVoiceAssistant(false)}
        language={language}
        onTranscript={(transcript) => {
          // Don't add the message here - handleSendMessage will add it with type 'voice'
          // Just send to chat service
          handleSendMessage(transcript, 'voice');
        }}
        onResponse={(response) => {
          // Add AI response as a message (this one we DO want to add since it's from Retell)
          const aiMessage: Message = {
            id: Date.now().toString(),
            content: response,
            sender: 'bot',
            timestamp: new Date(),
            type: 'voice',
          };
          setMessages(prev => [...prev, aiMessage]);
        }}
      />
    </>
  );
};
