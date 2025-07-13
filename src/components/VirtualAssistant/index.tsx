'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCrewAI } from '@/hooks/useCrewAI';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { toast } from 'react-hot-toast';
import { ChatInterface } from './ChatInterface';
import type { Socket } from 'socket.io-client';
import { isBrowser } from '@/lib/utils/browser';

// Import all the new components
import FloatingAssistantButton from './components/FloatingAssistantButton';
import AssistantHeader from './components/AssistantHeader';
import ConnectionStatus from './components/ConnectionStatus';
import LoadingOverlay from './components/LoadingOverlay';
import ActiveTasksIndicator from './components/ActiveTasksIndicator';
import VoiceMode from './components/VoiceMode';
import ConsultationMode from './components/ConsultationMode';
import DocumentMode from './components/DocumentMode';
import AppointmentMode from './components/AppointmentMode';

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
  language,
  userId = 'anonymous',
}) => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'chat' | 'voice' | 'consultation' | 'appointment' | 'document'>(
    'chat'
  );
  const [conversationState, setConversationState] = useState<ConversationState>({
    isListening: false,
    isSpeaking: false,
    isProcessing: false,
    transcript: '',
    interimTranscript: '',
    error: null,
  });
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [consultationData, setConsultationData] = useState({
    caseType: '',
    description: '',
    urgency: 'medium' as 'low' | 'medium' | 'high',
  });

  const {
    isLoading,
    activeTasks,
    createDocumentAnalysisTask,
    createClientIntakeWorkflow,
  } = useCrewAI();

  // Initialize WebSocket connection
  useEffect(() => {
    const initSocket = async () => {
      if (!isOpen || socket) return;

      try {
        // Dynamically import socket.io-client to prevent SSR issues
        const { io } = await import('socket.io-client');

        const socketUrl =
          process.env.NEXT_PUBLIC_WEBSOCKET_URL ||
          (isBrowser
            ? `${window.location.protocol}//${window.location.host}`
            : 'http://localhost:3000');

        const newSocket = io(socketUrl, {
          transports: ['websocket', 'polling'],
          auth: {
            sessionId: `session_${Date.now()}`,
            language,
            userId,
          },
        });

        newSocket.on('connect', () => {
          // Virtual Assistant connected
          setIsConnected(true);
        });

        newSocket.on('disconnect', () => {
          // Virtual Assistant disconnected
          setIsConnected(false);
        });

        newSocket.on('assistant:response', data => {
          if (data.text && isVoiceEnabled && mode === 'voice') {
            handleSpeakText(data.text);
          }
        });

        newSocket.on('error', error => {
          console.error('Socket error:', error);
          toast.error(language === 'es' ? 'Error de conexión' : 'Connection error');
        });

        setSocket(newSocket);
      } catch (error) {
        console.error('Failed to initialize socket:', error);
        setIsConnected(false);
      }
    };

    initSocket();

    return () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    };
  }, [isOpen, language, userId, mode, isVoiceEnabled, handleSpeakText, socket]);

  // State for managing voice message sending
  const [pendingVoiceMessage, setPendingVoiceMessage] = useState<string | null>(null);

  // Voice recognition hooks
  const {
    start: startListening,
    stop: stopListening,
    isSupported: isVoiceSupported,
  } = useVoiceRecognition({
    language,
    onResult: (transcript, isFinal) => {
      if (isFinal) {
        setConversationState(prev => ({
          ...prev,
          transcript: prev.transcript + transcript + ' ',
          interimTranscript: '',
        }));
        // Auto-send on sentence completion
        if (transcript.includes('.') || transcript.includes('?') || transcript.includes('!')) {
          setPendingVoiceMessage(conversationState.transcript + transcript);
        }
      } else {
        setConversationState(prev => ({
          ...prev,
          interimTranscript: transcript,
        }));
      }
    },
    onError: error => {
      console.error('Speech recognition error:', error);
      setConversationState(prev => ({
        ...prev,
        isListening: false,
        error: getErrorMessage(error, language),
      }));
    },
    onEnd: () => {
      setConversationState(prev => ({ ...prev, isListening: false }));
    },
  });

  // Handle voice message
  const handleVoiceMessage = useCallback(
    (transcript: string) => {
      if (!transcript.trim() || !socket) return;

      setConversationState(prev => ({
        ...prev,
        isProcessing: true,
        transcript: '',
        interimTranscript: '',
      }));

      // Send via WebSocket
      socket.emit('user:message', {
        text: transcript,
        language,
        timestamp: new Date().toISOString(),
      });

      // Stop listening while processing
      stopListening();

      onMessage?.(transcript);

      setTimeout(() => {
        setConversationState(prev => ({ ...prev, isProcessing: false }));
      }, 500);
    },
    [socket, language, onMessage, stopListening]
  );

  // Handle pending voice messages
  useEffect(() => {
    if (pendingVoiceMessage) {
      handleVoiceMessage(pendingVoiceMessage);
      setPendingVoiceMessage(null);
    }
  }, [pendingVoiceMessage, handleVoiceMessage]);

  // Speech synthesis hooks
  const { speak: speakText, cancel: cancelSpeech } = useSpeechSynthesis({
    language,
    onStart: () => {
      setConversationState(prev => ({ ...prev, isSpeaking: true }));
    },
    onEnd: () => {
      setConversationState(prev => ({ ...prev, isSpeaking: false }));
      // Resume listening if it was active
      if (mode === 'voice' && conversationState.isListening) {
        setTimeout(() => {
          startListening();
        }, 500);
      }
    },
    onError: error => {
      console.error('Speech synthesis error:', error);
      setConversationState(prev => ({ ...prev, isSpeaking: false }));
    },
  });

  // Voice control functions
  const toggleListening = useCallback(() => {
    if (!isVoiceSupported) {
      toast.error(
        language === 'es'
          ? 'Tu navegador no soporta reconocimiento de voz'
          : 'Your browser does not support speech recognition'
      );
      return;
    }

    if (conversationState.isListening) {
      stopListening();
    } else {
      // Stop any ongoing speech
      cancelSpeech();
      startListening();
      setConversationState(prev => ({ ...prev, isListening: true, error: null }));
    }
  }, [
    conversationState.isListening,
    language,
    isVoiceSupported,
    startListening,
    stopListening,
    cancelSpeech,
  ]);

  const handleSpeakText = useCallback(
    (text: string) => {
      if (!isVoiceEnabled) return;
      speakText(text);
    },
    [isVoiceEnabled, speakText]
  );

  // Consultation submission
  const handleConsultationSubmit = async () => {
    if (!consultationData.caseType || !consultationData.description) {
      toast.error(
        language === 'es'
          ? 'Por favor completa todos los campos requeridos'
          : 'Please fill in all required fields'
      );
      return;
    }

    try {
      await createClientIntakeWorkflow({
        userId,
        caseType: consultationData.caseType,
        description: consultationData.description,
        urgency: consultationData.urgency,
        language,
      });

      toast.success(
        language === 'es' ? 'Consulta iniciada exitosamente' : 'Consultation started successfully'
      );
      setMode('voice');
      setConsultationData({ caseType: '', description: '', urgency: 'medium' });
    } catch (error) {
      console.error('Failed to start consultation:', error);
      toast.error(
        language === 'es' ? 'Error al iniciar la consulta' : 'Failed to start consultation'
      );
    }
  };

  // Document upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await createDocumentAnalysisTask(file, {
        userId,
        documentType: 'other',
        analysisType: 'full-analysis',
        language,
        urgency: 'medium',
      });

      toast.success(
        language === 'es' ? 'Documento cargado exitosamente' : 'Document uploaded successfully'
      );
      setMode('voice');
    } catch (error) {
      console.error('Failed to start document analysis:', error);
      toast.error(language === 'es' ? 'Error al cargar el documento' : 'Failed to upload document');
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopListening();
      cancelSpeech();
    };
  }, [stopListening, cancelSpeech]);

  return (
    <>
      {/* Floating Assistant Button */}
      <FloatingAssistantButton
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        language={language}
      />

      {/* Assistant Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-44 right-8 w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <AssistantHeader
              language={language}
              mode={mode}
              onModeChange={setMode}
              onClose={() => setIsOpen(false)}
            />

            {/* Connection status */}
            <ConnectionStatus
              isConnected={isConnected}
              isVoiceEnabled={isVoiceEnabled}
              mode={mode}
              language={language}
              onToggleVoice={() => setIsVoiceEnabled(!isVoiceEnabled)}
            />

            {/* Content area */}
            <div className="h-[400px] overflow-hidden relative">
              {/* Loading overlay */}
              <LoadingOverlay isLoading={isLoading} language={language} />

              {/* Active tasks indicator */}
              <ActiveTasksIndicator activeTasks={activeTasks} language={language} />

              {/* Mode-specific content */}
              {mode === 'chat' && (
                <ChatInterface
                  language={language}
                  userId={userId}
                  onScheduleAppointment={() => setMode('appointment')}
                  onCallRequest={() => (window.location.href = 'tel:18449673536')}
                />
              )}

              {mode === 'voice' && (
                <VoiceMode
                  conversationState={conversationState}
                  language={language}
                  onToggleListening={toggleListening}
                />
              )}

              {mode === 'consultation' && (
                <ConsultationMode
                  consultationData={consultationData}
                  language={language}
                  onDataChange={setConsultationData}
                  onSubmit={handleConsultationSubmit}
                />
              )}

              {mode === 'appointment' && <AppointmentMode language={language} />}

              {mode === 'document' && (
                <DocumentMode language={language} onFileUpload={handleFileUpload} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

function getErrorMessage(error: string, language: 'en' | 'es'): string {
  const errorMessages: Record<string, { en: string; es: string }> = {
    network: {
      en: 'Network error. Please check your connection.',
      es: 'Error de red. Por favor verifica tu conexión.',
    },
    'not-allowed': {
      en: 'Microphone access denied. Please allow microphone access.',
      es: 'Acceso al micrófono denegado. Por favor permite el acceso al micrófono.',
    },
    'no-speech': {
      en: 'No speech detected. Please try again.',
      es: 'No se detectó voz. Por favor intenta de nuevo.',
    },
    aborted: {
      en: 'Speech recognition aborted.',
      es: 'Reconocimiento de voz cancelado.',
    },
  };

  return (
    errorMessages[error]?.[language] || (language === 'es' ? 'Error desconocido' : 'Unknown error')
  );
}

// Default export for dynamic import
export default VirtualAssistant;
