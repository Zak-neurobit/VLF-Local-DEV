'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Minimize2,
  Maximize2,
  Mic,
  MicOff,
  Phone,
  Calendar,
  FileText,
  Sparkles,
  Send,
  ChevronDown,
  Globe,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { ModernChatInterface } from './ModernChatInterface';
// import VoiceMode from './components/VoiceMode';
// import AppointmentMode from './components/AppointmentMode';
// import DocumentMode from './components/DocumentMode';
// import ConsultationMode from './components/ConsultationMode';
import { toast } from 'react-hot-toast';
import { logger } from '@/lib/safe-logger';

interface ModernVirtualAssistantProps {
  language?: 'en' | 'es';
  onMessage?: (message: string) => void;
  userId?: string;
}

type AssistantMode = 'chat' | 'voice' | 'consultation' | 'document' | 'appointment';

export const ModernVirtualAssistant: React.FC<ModernVirtualAssistantProps> = ({
  language: propLanguage,
  onMessage,
  userId = 'anonymous',
}) => {
  const { language: detectedLanguage } = useLanguage();
  const language = propLanguage || detectedLanguage;
  
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [mode, setMode] = useState<AssistantMode>('chat');
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Mode configurations
  const modeConfig = {
    chat: {
      title: language === 'es' ? 'Chat con IA' : 'AI Chat',
      icon: MessageCircle,
      color: 'from-burgundy-700 to-burgundy-800',
    },
    voice: {
      title: language === 'es' ? 'Asistente de Voz' : 'Voice Assistant',
      icon: Mic,
      color: 'from-blue-500 to-blue-600',
    },
    consultation: {
      title: language === 'es' ? 'Consulta Legal' : 'Legal Consultation',
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
    },
    document: {
      title: language === 'es' ? 'Análisis de Documentos' : 'Document Analysis',
      icon: FileText,
      color: 'from-green-500 to-green-600',
    },
    appointment: {
      title: language === 'es' ? 'Agendar Cita' : 'Schedule Appointment',
      icon: Calendar,
      color: 'from-orange-500 to-orange-600',
    },
  };

  const currentModeConfig = modeConfig[mode];
  const ModeIcon = currentModeConfig.icon;

  // Auto-show after delay
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const timer = setTimeout(() => {
      if (!localStorage.getItem('assistant-shown')) {
        setHasNewMessage(true);
        localStorage.setItem('assistant-shown', 'true');
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setHasNewMessage(false);
    logger.info('Virtual Assistant opened', { mode, language });
  }, [mode, language]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
    logger.info('Virtual Assistant closed');
  }, []);

  const handleModeChange = useCallback((newMode: AssistantMode) => {
    setMode(newMode);
    logger.info('Virtual Assistant mode changed', { from: mode, to: newMode });
  }, [mode]);

  // Floating Action Button
  const FloatingButton = () => (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleOpen}
      className="relative group"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-burgundy-600 via-burgundy-700 to-burgundy-800 animate-pulse opacity-75 blur-xl" />
      
      {/* Main button */}
      <div className={`relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${currentModeConfig.color} shadow-2xl`}>
        <ModeIcon className="w-7 h-7 text-white" />
        
        {/* Sparkle effect */}
        <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
        
        {/* New message indicator */}
        {hasNewMessage && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"
          >
            <span className="absolute inset-0 rounded-full bg-red-400 animate-ping" />
          </motion.div>
        )}
      </div>
      
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap"
      >
        <div className="bg-gray-900 text-white text-sm py-2 px-3 rounded-lg shadow-lg">
          {language === 'es' ? '¿Necesitas ayuda?' : 'Need help?'}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </div>
      </motion.div>
    </motion.button>
  );

  // Main Assistant Window
  const AssistantWindow = () => (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed z-[9999] ${
        isMinimized 
          ? 'bottom-6 right-6 w-80 h-16' 
          : 'bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-[440px] h-full sm:h-[600px] sm:max-h-[85vh]'
      }`}
    >
      <div className={`
        relative w-full h-full bg-white dark:bg-gray-900 
        ${isMinimized ? 'rounded-full' : 'rounded-none sm:rounded-2xl'} 
        shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700
      `}>
        {/* Glass effect background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-xl" />
        
        {/* Header */}
        <div className={`
          relative flex items-center justify-between 
          ${isMinimized ? 'h-full px-6' : 'h-16 px-4 sm:px-6'} 
          bg-gradient-to-r ${currentModeConfig.color} text-white
        `}>
          <div className="flex items-center space-x-3">
            {/* Bot Avatar */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <ModeIcon className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
            </div>
            
            {!isMinimized && (
              <div>
                <h3 className="font-semibold text-lg">{currentModeConfig.title}</h3>
                <p className="text-xs text-white/80">
                  {isTyping 
                    ? (language === 'es' ? 'Escribiendo...' : 'Typing...') 
                    : (language === 'es' ? 'En línea' : 'Online')
                  }
                </p>
              </div>
            )}
          </div>
          
          {/* Header Actions */}
          <div className="flex items-center space-x-2">
            {!isMinimized && (
              <>
                {/* Language Toggle */}
                <button
                  onClick={() => {
                    const newLang = language === 'es' ? 'en' : 'es';
                    if (typeof window !== 'undefined') {
                      window.location.href = newLang === 'es' ? '/es' : '/';
                    }
                  }}
                  className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                  title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                >
                  <Globe className="w-5 h-5" />
                </button>
                
                {/* Minimize */}
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Minimize2 className="w-5 h-5" />
                </button>
              </>
            )}
            
            {isMinimized && (
              <button
                onClick={() => setIsMinimized(false)}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            )}
            
            {/* Close */}
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {!isMinimized && (
          <>
            {/* Mode Tabs */}
            <div className="relative bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <div className="flex overflow-x-auto scrollbar-hide">
                {(Object.keys(modeConfig) as AssistantMode[]).map((modeKey) => {
                  const config = modeConfig[modeKey];
                  const Icon = config.icon;
                  const isActive = mode === modeKey;
                  
                  return (
                    <button
                      key={modeKey}
                      onClick={() => handleModeChange(modeKey)}
                      className={`
                        flex items-center space-x-2 px-4 py-3 text-sm font-medium 
                        whitespace-nowrap transition-all relative
                        ${isActive 
                          ? 'text-burgundy-700 dark:text-burgundy-600' 
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{config.title}</span>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-burgundy-700"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Content Area */}
            <div className="relative flex-1 h-[calc(100%-8rem)]">
              <AnimatePresence mode="wait">
                {mode === 'chat' && (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full"
                  >
                    <ModernChatInterface
                      language={language}
                      userId={userId}
                      onMessage={onMessage}
                      onTypingChange={setIsTyping}
                    />
                  </motion.div>
                )}
                
                {mode === 'voice' && (
                  <motion.div
                    key="voice"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full flex items-center justify-center"
                  >
                    <div className="text-center">
                      <Mic className="w-16 h-16 mx-auto mb-4 text-burgundy-700" />
                      <p className="text-lg font-medium">
                        {language === 'es' ? 'Modo de voz próximamente' : 'Voice mode coming soon'}
                      </p>
                    </div>
                  </motion.div>
                )}
                
                {mode === 'consultation' && (
                  <motion.div
                    key="consultation"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full flex items-center justify-center"
                  >
                    <div className="text-center">
                      <FileText className="w-16 h-16 mx-auto mb-4 text-burgundy-700" />
                      <p className="text-lg font-medium">
                        {language === 'es' ? 'Consulta legal próximamente' : 'Legal consultation coming soon'}
                      </p>
                    </div>
                  </motion.div>
                )}
                
                {mode === 'document' && (
                  <motion.div
                    key="document"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full flex items-center justify-center"
                  >
                    <div className="text-center">
                      <FileText className="w-16 h-16 mx-auto mb-4 text-burgundy-700" />
                      <p className="text-lg font-medium">
                        {language === 'es' ? 'Análisis de documentos próximamente' : 'Document analysis coming soon'}
                      </p>
                    </div>
                  </motion.div>
                )}
                
                {mode === 'appointment' && (
                  <motion.div
                    key="appointment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full flex items-center justify-center"
                  >
                    <div className="text-center">
                      <Calendar className="w-16 h-16 mx-auto mb-4 text-burgundy-700" />
                      <p className="text-lg font-medium">
                        {language === 'es' ? 'Programar cita próximamente' : 'Schedule appointment coming soon'}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {!isOpen && <FloatingButton />}
      </AnimatePresence>
      
      <AnimatePresence>
        {isOpen && <AssistantWindow />}
      </AnimatePresence>
    </div>
  );
};