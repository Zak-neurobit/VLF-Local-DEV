'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { logger } from '@/lib/pino-logger';
import { motion, AnimatePresence } from 'framer-motion';
import { useCrewAI } from '@/hooks/useCrewAI';
import { toast } from 'react-hot-toast';
import { ChatInterface } from './ChatInterface';
import { io, Socket } from 'socket.io-client';
import {
  Mic,
  MicOff,
  MessageCircle,
  X,
  Volume2,
  VolumeX,
  Loader2,
  Phone,
  FileText,
  Calendar,
  Globe,
} from 'lucide-react';

declare global {
  interface Window {
    webkitSpeechRecognition: typeof SpeechRecognition;
    webkitAudioContext: typeof AudioContext;
  }
  interface SpeechRecognitionEvent extends Event {
    resultIndex: number;
    results: SpeechRecognitionResultList;
  }
}

interface VirtualAssistantProps {
  onMessage?: (message: string) => void;
  language: 'en' | 'es';
  userId?: string;
}

interface ConversationState {
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
}

export const VirtualAssistant: React.FC<VirtualAssistantProps> = ({
  onMessage,
  language = 'en',
  userId,
}) => {
  // Chat state
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'chat' | 'voice' | 'consultation' | 'document' | 'appointment'>(
    'chat'
  );
  const [isMinimized, setIsMinimized] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    'connecting' | 'connected' | 'disconnected'
  >('disconnected');

  // Voice & Audio state
  const [conversationState, setConversationState] = useState<ConversationState>({
    isListening: false,
    isSpeaking: false,
    isProcessing: false,
    transcript: '',
    interimTranscript: '',
    error: null,
  });

  const [isMuted] = useState(false);
  const [volume] = useState(0.8);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  // Refs
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const socketRef = useRef<Socket | null>(null);
  // const audioContextRef = useRef<AudioContext | null>(null); // Currently unused
  const streamRef = useRef<MediaStream | null>(null);

  // Message state
  // Message type matching what we use internally
  type InternalMessage = {
    id: string;
    text: string;
    sender: 'user' | 'assistant';
    timestamp: Date;
  };
  const [messages, setMessages] = useState<InternalMessage[]>([]);
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // CrewAI Integration
  const {
    isLoading,
    createLegalConsultationTask,
    createAppointmentSchedulingTask,
    createDocumentAnalysisTask,
    createClientIntakeWorkflow,
    getTaskStatus,
    bookAppointment,
  } = useCrewAI();

  // Message handling
  const sendMessage = useCallback(
    async (text: string) => {
      const newMessage = {
        id: Date.now().toString(),
        text,
        sender: 'user' as const,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, newMessage]);

      // Process message with AI
      if (onMessage) {
        onMessage(text);
      }
    },
    [onMessage]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Task execution wrapper
  const executeTask = useCallback(
    async (task: {
      type: 'consultation' | 'appointment' | 'document' | 'intake';
      data: Record<string, unknown> | FormData;
    }) => {
      try {
        if (task.type === 'consultation') {
          const consultationData = task.data as Record<string, unknown>;
          return await createLegalConsultationTask({
            userId: String(consultationData.userId || ''),
            caseType: String(consultationData.caseType || ''),
            description: String(consultationData.description || ''),
            urgency: (consultationData.urgency as 'low' | 'medium' | 'high') || 'medium',
            language: (consultationData.language as 'en' | 'es') || 'en',
            location: String(consultationData.location || ''),
          });
        } else if (task.type === 'appointment') {
          const appointmentData = task.data as Record<string, unknown>;
          return await createAppointmentSchedulingTask({
            userId: String(appointmentData.userId || ''),
            practiceArea: String(appointmentData.practiceArea || ''),
            duration: Number(appointmentData.duration) || 60,
            language: (appointmentData.language as 'en' | 'es') || 'en',
            appointmentType: 'consultation',
            isUrgent: appointmentData.urgency === 'high',
            clientInfo: {
              firstName: String(appointmentData.firstName || ''),
              lastName: String(appointmentData.lastName || ''),
              email: String(appointmentData.email || ''),
              phone: String(appointmentData.phone || ''),
            },
          });
        } else if (task.type === 'document') {
          // Document analysis requires a file parameter
          // Since we don't have a file in task.data, we need to handle this differently
          // For now, we'll throw an error indicating a file is required
          throw new Error('Document analysis requires a file to be uploaded');
        } else if (task.type === 'intake') {
          const intakeData = task.data as Record<string, unknown>;
          return await createClientIntakeWorkflow({
            userId: String(intakeData.userId || ''),
            caseType: String(intakeData.caseType || ''),
            description: String(intakeData.description || ''),
            urgency: (intakeData.urgency as 'low' | 'medium' | 'high') || 'medium',
            language: (intakeData.language as 'en' | 'es') || 'en',
            location: String(intakeData.location || ''),
          });
        }
        throw new Error('Unknown task type');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        throw err;
      }
    },
    [
      createLegalConsultationTask,
      createAppointmentSchedulingTask,
      createDocumentAnalysisTask,
      createClientIntakeWorkflow,
    ]
  );

  // Voice message handler
  const handleVoiceMessage = useCallback(
    async (transcript: string) => {
      if (!transcript.trim()) return;

      setConversationState(prev => ({ ...prev, isProcessing: true }));

      try {
        await sendMessage(transcript);
        onMessage?.(transcript);
      } catch (error) {
        logger.error('Error processing voice message:', error);
        toast.error('Failed to process voice message');
      } finally {
        setConversationState(prev => ({ ...prev, isProcessing: false }));
      }
    },
    [sendMessage, onMessage]
  );

  // Initialize Speech Recognition
  const initializeSpeechRecognition = useCallback(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setConversationState(prev => ({
        ...prev,
        error: 'Speech recognition not supported in this browser',
      }));
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language === 'es' ? 'es-US' : 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setConversationState(prev => ({ ...prev, isListening: true, error: null }));
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setConversationState(prev => ({
        ...prev,
        transcript: prev.transcript + finalTranscript,
        interimTranscript,
      }));

      if (finalTranscript) {
        handleVoiceMessage(finalTranscript);
      }
    };

    recognition.onerror = event => {
      setConversationState(prev => ({
        ...prev,
        isListening: false,
        error: `Recognition error: ${event.error}`,
      }));
    };

    recognition.onend = () => {
      setConversationState(prev => ({ ...prev, isListening: false }));
    };

    recognitionRef.current = recognition;
  }, [language, handleVoiceMessage]);

  // Initialize Speech Synthesis
  const initializeSpeechSynthesis = useCallback(() => {
    if (typeof window === 'undefined') return;

    synthRef.current = window.speechSynthesis;
  }, []);

  // Text-to-Speech
  const speak = useCallback(
    (text: string) => {
      if (!synthRef.current || isMuted) return;

      // Cancel any ongoing speech
      synthRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'es' ? 'es-US' : 'en-US';
      utterance.volume = volume;
      utterance.rate = 1;
      utterance.pitch = 1;

      utterance.onstart = () => {
        setConversationState(prev => ({ ...prev, isSpeaking: true }));
      };

      utterance.onend = () => {
        setConversationState(prev => ({ ...prev, isSpeaking: false }));
      };

      utterance.onerror = () => {
        setConversationState(prev => ({ ...prev, isSpeaking: false }));
      };

      synthRef.current.speak(utterance);
    },
    [language, volume, isMuted]
  );

  // Voice controls
  const startListening = useCallback(() => {
    if (recognitionRef.current && !conversationState.isListening) {
      recognitionRef.current.start();
    }
  }, [conversationState.isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && conversationState.isListening) {
      recognitionRef.current.stop();
    }
  }, [conversationState.isListening]);

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setConversationState(prev => ({ ...prev, isSpeaking: false }));
    }
  }, []);

  // Socket connection
  const initializeSocket = useCallback(() => {
    if (socketRef.current) return;

    setConnectionStatus('connecting');
    const socket = io('/virtual-assistant', {
      transports: ['websocket'],
      upgrade: true,
      query: { userId, language },
    });

    socket.on('connect', () => {
      setConnectionStatus('connected');
      toast.success('Virtual Assistant connected');
    });

    socket.on('disconnect', () => {
      setConnectionStatus('disconnected');
      toast.error('Virtual Assistant disconnected');
    });

    socket.on('agent_response', data => {
      if (voiceEnabled && data.response) {
        speak(data.response);
      }
    });

    socket.on('task_update', data => {
      toast.success(`Task ${data.task} updated: ${data.status}`);
    });

    socket.on('error', error => {
      toast.error(`Assistant error: ${error.message}`);
    });

    socketRef.current = socket;
  }, [userId, language, voiceEnabled, speak]);

  // Effect to auto-respond to new messages with voice
  useEffect(() => {
    if (voiceEnabled && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === 'assistant' && lastMessage.text) {
        speak(lastMessage.text);
      }
    }
  }, [messages, voiceEnabled, speak]);

  // Initialize everything on mount
  useEffect(() => {
    initializeSpeechRecognition();
    initializeSpeechSynthesis();

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      const stream = streamRef.current;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [initializeSpeechRecognition, initializeSpeechSynthesis]);

  // Handle mode changes
  const handleModeChange = useCallback(
    (newMode: typeof mode) => {
      setMode(newMode);

      if (newMode === 'voice') {
        setVoiceEnabled(true);
        initializeSocket();
      } else {
        setVoiceEnabled(false);
        if (socketRef.current) {
          socketRef.current.disconnect();
          socketRef.current = null;
        }
      }
    },
    [initializeSocket]
  );

  // Execute specialized tasks
  const executeConsultation = useCallback(
    async (type: string, data: Record<string, unknown>) => {
      try {
        setConversationState(prev => ({ ...prev, isProcessing: true }));

        const result = await executeTask({
          type: 'consultation',
          data: {
            ...data,
            language,
            userId,
          },
        });

        toast.success('Consultation completed');
        return result;
      } catch (error) {
        toast.error('Consultation failed');
        throw error;
      } finally {
        setConversationState(prev => ({ ...prev, isProcessing: false }));
      }
    },
    [executeTask, language, userId]
  );

  const analyzeDocument = useCallback(
    async (file: File, analysisType: string) => {
      try {
        setConversationState(prev => ({ ...prev, isProcessing: true }));

        const formData = new FormData();
        formData.append('file', file);
        formData.append('analysisType', analysisType);
        formData.append('language', language);

        const result = await executeTask({
          type: 'document',
          data: formData,
        });

        toast.success('Document analysis completed');
        return result;
      } catch (error) {
        toast.error('Document analysis failed');
        throw error;
      } finally {
        setConversationState(prev => ({ ...prev, isProcessing: false }));
      }
    },
    [executeTask, language]
  );

  const scheduleAppointment = useCallback(
    async (appointmentData: Record<string, unknown>) => {
      try {
        setConversationState(prev => ({ ...prev, isProcessing: true }));

        const result = await executeTask({
          type: 'appointment',
          data: {
            ...appointmentData,
            language,
            userId,
          },
        });

        toast.success('Appointment scheduled');
        return result;
      } catch (error) {
        toast.error('Appointment scheduling failed');
        throw error;
      } finally {
        setConversationState(prev => ({ ...prev, isProcessing: false }));
      }
    },
    [executeTask, language, userId]
  );

  if (!isOpen) {
    return (
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <MessageCircle size={24} />
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed z-50 bg-white rounded-lg shadow-2xl border border-gray-200 ${
          isMinimized ? 'bottom-6 right-6 w-80 h-16' : 'bottom-6 right-6 w-96 h-[600px]'
        }`}
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 100 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <MessageCircle size={16} className="text-white" />
              </div>
              <div
                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${
                  connectionStatus === 'connected'
                    ? 'bg-green-400'
                    : connectionStatus === 'connecting'
                      ? 'bg-yellow-400'
                      : 'bg-red-400'
                }`}
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Vasquez Law Assistant</h3>
              <p className="text-xs text-gray-500">
                {connectionStatus === 'connected'
                  ? 'Online'
                  : connectionStatus === 'connecting'
                    ? 'Connecting...'
                    : 'Offline'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Voice toggle */}
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`p-2 rounded-full transition-colors ${
                voiceEnabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
              }`}
              title="Toggle voice mode"
            >
              {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Minimize/Maximize */}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              {isMinimized ? <Globe size={16} /> : <Calendar size={16} />}
            </button>

            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Mode Selector */}
            <div className="flex border-b border-gray-200">
              {[
                { id: 'chat', icon: MessageCircle, label: 'Chat' },
                { id: 'voice', icon: Mic, label: 'Voice' },
                { id: 'consultation', icon: Phone, label: 'Consult' },
                { id: 'document', icon: FileText, label: 'Document' },
                { id: 'appointment', icon: Calendar, label: 'Schedule' },
              ].map(modeOption => (
                <button
                  key={modeOption.id}
                  onClick={() => handleModeChange(modeOption.id as typeof mode)}
                  className={`flex-1 p-3 text-xs font-medium transition-colors ${
                    mode === modeOption.id
                      ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <modeOption.icon size={14} className="mx-auto mb-1" />
                  {modeOption.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden">
              {mode === 'chat' && (
                <ChatInterface
                  language={language}
                  userId={userId}
                  onScheduleAppointment={() => setMode('appointment')}
                  onCallRequest={() => (window.location.href = 'tel:+1234567890')}
                />
              )}

              {mode === 'voice' && (
                <div className="p-6 h-full flex flex-col items-center justify-center space-y-4">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors ${
                      conversationState.isListening
                        ? 'bg-red-100 text-red-600'
                        : conversationState.isSpeaking
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {conversationState.isProcessing ? (
                      <Loader2 size={32} className="animate-spin" />
                    ) : conversationState.isListening ? (
                      <Mic size={32} />
                    ) : (
                      <MicOff size={32} />
                    )}
                  </div>

                  <div className="text-center">
                    <p className="font-medium text-gray-800">
                      {conversationState.isListening
                        ? 'Listening...'
                        : conversationState.isSpeaking
                          ? 'Speaking...'
                          : conversationState.isProcessing
                            ? 'Processing...'
                            : 'Click to start voice conversation'}
                    </p>
                    {conversationState.transcript && (
                      <p className="text-sm text-gray-600 mt-2">
                        &ldquo;{conversationState.transcript}&rdquo;
                      </p>
                    )}
                    {conversationState.interimTranscript && (
                      <p className="text-sm text-gray-400 mt-1 italic">
                        {conversationState.interimTranscript}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={conversationState.isListening ? stopListening : startListening}
                      disabled={conversationState.isProcessing}
                      className={`px-4 py-2 rounded-full font-medium transition-colors ${
                        conversationState.isListening
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {conversationState.isListening ? 'Stop' : 'Start'}
                    </button>

                    {conversationState.isSpeaking && (
                      <button
                        onClick={stopSpeaking}
                        className="px-4 py-2 rounded-full bg-gray-600 text-white hover:bg-gray-700"
                      >
                        Stop Speaking
                      </button>
                    )}
                  </div>
                </div>
              )}

              {mode === 'consultation' && (
                <div className="p-4 space-y-4">
                  <h4 className="font-semibold text-gray-800">Legal Consultation</h4>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'Immigration Case Review',
                      'Criminal Defense Analysis',
                      'Personal Injury Assessment',
                      'Family Law Consultation',
                    ].map(consultationType => (
                      <button
                        key={consultationType}
                        onClick={() =>
                          executeConsultation('quick-consultation', { type: consultationType })
                        }
                        disabled={conversationState.isProcessing}
                        className="p-3 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
                      >
                        {consultationType}
                      </button>
                    ))}
                  </div>

                  {activeAgent === 'legal-consultation' && (
                    <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
                      Consultation in progress...
                    </div>
                  )}
                </div>
              )}

              {mode === 'document' && (
                <div className="p-4 space-y-4">
                  <h4 className="font-semibold text-gray-800">Document Analysis</h4>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="document-upload"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          analyzeDocument(file, 'legal-review');
                        }
                      }}
                    />
                    <label
                      htmlFor="document-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <FileText size={32} className="text-gray-400" />
                      <span className="text-sm text-gray-600">Upload document for analysis</span>
                    </label>
                  </div>

                  {activeAgent === 'document-analysis' && (
                    <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
                      Analyzing document...
                    </div>
                  )}
                </div>
              )}

              {mode === 'appointment' && (
                <div className="p-4 space-y-4">
                  <h4 className="font-semibold text-gray-800">Schedule Appointment</h4>

                  <div className="space-y-3">
                    <select className="w-full p-2 border border-gray-300 rounded-lg text-sm">
                      <option>Select consultation type</option>
                      <option>Immigration Consultation</option>
                      <option>Criminal Defense Consultation</option>
                      <option>Personal Injury Consultation</option>
                      <option>Family Law Consultation</option>
                    </select>

                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                      min={new Date().toISOString().split('T')[0]}
                    />

                    <select className="w-full p-2 border border-gray-300 rounded-lg text-sm">
                      <option>Preferred time</option>
                      <option>9:00 AM</option>
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>2:00 PM</option>
                      <option>3:00 PM</option>
                      <option>4:00 PM</option>
                    </select>

                    <button
                      onClick={() =>
                        scheduleAppointment({
                          type: 'consultation',
                          date: new Date(),
                          time: '10:00 AM',
                        })
                      }
                      disabled={conversationState.isProcessing}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      Schedule Appointment
                    </button>
                  </div>

                  {activeAgent === 'appointment-scheduling' && (
                    <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
                      Scheduling appointment...
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Status bar */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
              <div className="flex items-center justify-between">
                <span>{activeAgent ? `Active: ${activeAgent}` : 'Ready'}</span>
                <span className="flex items-center space-x-2">
                  {conversationState.error && <span className="text-red-500">Error</span>}
                  {error && (
                    <button onClick={clearError} className="text-red-500 hover:text-red-700">
                      Clear Error
                    </button>
                  )}
                </span>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default VirtualAssistant;
