'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Mic, MicOff, X, Volume2 } from 'lucide-react';

interface VoiceCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEndCall: () => void;
  language: 'en' | 'es';
  isMuted: boolean;
  onToggleMute: () => void;
  isConnecting: boolean;
  isConnected: boolean;
  audioLevel?: number;
}

export const VoiceCallModal: React.FC<VoiceCallModalProps> = ({
  isOpen,
  onClose,
  onEndCall,
  language,
  isMuted,
  onToggleMute,
  isConnecting,
  isConnected,
  audioLevel = 0,
}) => {
  const [bars] = useState(Array(40).fill(0));
  const [animatedBars, setAnimatedBars] = useState(bars);

  // Animate sound bars based on actual audio level
  useEffect(() => {
    if (!isConnected || !isOpen) return;

    const interval = setInterval(() => {
      // Animate bars based on audio level (more sensitive)
      if (audioLevel > 0.01) { // Lower threshold for detection
        setAnimatedBars(bars.map((_, index) => {
          // Create wave effect based on actual audio level
          const baseHeight = audioLevel * 100; // Convert to percentage
          const waveOffset = Math.sin((index / bars.length) * Math.PI * 2 + Date.now() / 200) * 10;
          const variation = Math.random() * 20; // Add some variation
          return Math.min(100, Math.max(10, baseHeight + waveOffset + variation));
        }));
      } else {
        // No audio - show minimal bars
        setAnimatedBars(bars.map(() => 5));
      }
    }, 50); // Faster update rate for smoother animation

    return () => clearInterval(interval);
  }, [isConnected, isOpen, bars, audioLevel]);

  const t = {
    en: {
      connecting: 'Connecting...',
      initiating: 'Initiating call. Please wait...',
      connected: 'Connected',
      callInProgress: 'Voice Call in Progress',
      endCall: 'End Call',
      mute: 'Mute',
      unmute: 'Unmute',
      aiAssistant: 'AI Legal Assistant',
      speaking: 'Listening...',
    },
    es: {
      connecting: 'Conectando...',
      initiating: 'Iniciando llamada. Por favor espere...',
      connected: 'Conectado',
      callInProgress: 'Llamada de Voz en Progreso',
      endCall: 'Finalizar',
      mute: 'Silenciar',
      unmute: 'Activar',
      aiAssistant: 'Asistente Legal IA',
      speaking: 'Escuchando...',
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Glassmorphic Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '24px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Liquid glass effect - animated gradient */}
            <div
              className="absolute inset-0 rounded-3xl opacity-50"
              style={{
                background: 'linear-gradient(45deg, #FFD700, #FFA500, #FF6347, #FFD700)',
                backgroundSize: '300% 300%',
                animation: 'liquidGlass 8s ease infinite',
                filter: 'blur(40px)',
                zIndex: -1,
              }}
            />

            {/* Content */}
            <div className="relative p-8">
              {/* Close button - only closes modal, doesn't end call */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                title="Close window (call continues)"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 165, 0, 0.3))',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255, 215, 0, 0.5)',
                  }}
                >
                  <Phone className={`w-10 h-10 text-white ${isConnected ? 'animate-pulse' : ''}`} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t[language].aiAssistant}
                </h3>
                <p className="text-white/70 text-sm">
                  {isConnecting ? t[language].initiating : 
                   isConnected ? t[language].connected : 
                   t[language].callInProgress}
                </p>
              </div>

              {/* Sound Wave Visualization */}
              <div className="relative h-32 mb-6 flex items-center justify-center">
                <div className="flex items-end justify-center gap-1 h-full">
                  {animatedBars.map((height, index) => (
                    <motion.div
                      key={index}
                      className="w-1 bg-gradient-to-t from-gold-500 to-gold-300 rounded-full"
                      animate={{
                        height: isConnected ? `${height}%` : '10%',
                      }}
                      transition={{
                        duration: 0.3,
                        ease: 'easeInOut',
                      }}
                      style={{
                        opacity: isConnected ? 0.8 : 0.3,
                        boxShadow: isConnected ? '0 0 10px rgba(255, 215, 0, 0.5)' : 'none',
                      }}
                    />
                  ))}
                </div>
                
                {/* Center status */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white/70 text-sm font-medium">
                    {isConnected && !isConnecting && (
                      <motion.span
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {t[language].speaking}
                      </motion.span>
                    )}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-4">
                {/* Mute Button */}
                <motion.button
                  // TODO: Convert whileHover={{ scale: 1.05 }} to react-spring
                  whileTap={{ scale: 0.95 }}
                  onClick={onToggleMute}
                  className="p-4 rounded-full transition-all"
                  style={{
                    background: isMuted 
                      ? 'rgba(239, 68, 68, 0.3)' 
                      : 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  {isMuted ? (
                    <MicOff className="w-6 h-6 text-white" />
                  ) : (
                    <Mic className="w-6 h-6 text-white" />
                  )}
                </motion.button>

                {/* End Call Button */}
                <motion.button
                  // TODO: Convert whileHover={{ scale: 1.05 }} to react-spring
                  whileTap={{ scale: 0.95 }}
                  onClick={onEndCall}
                  disabled={isConnecting}
                  className="px-8 py-4 rounded-full transition-all flex items-center gap-3"
                  style={{
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.8), rgba(220, 38, 38, 0.8))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    opacity: isConnecting ? 0.5 : 1,
                  }}
                >
                  <PhoneOff className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">{t[language].endCall}</span>
                </motion.button>

                {/* Volume Indicator */}
                <motion.button
                  className="p-4 rounded-full transition-all"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <Volume2 className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              {/* Animated border glow */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.4), transparent)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 3s infinite',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      <style jsx>{`
        @keyframes liquidGlass {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </AnimatePresence>
  );
};