'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Volume2, Phone } from 'lucide-react';

interface VoiceModeProps {
  conversationState: {
    isListening: boolean;
    isSpeaking: boolean;
    isProcessing: boolean;
    transcript: string;
    interimTranscript: string;
    error: string | null;
  };
  language: 'en' | 'es';
  onToggleListening: () => void;
}

export default function VoiceMode({
  conversationState,
  language,
  onToggleListening,
}: VoiceModeProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      {/* Voice visualization */}
      <div className="relative mb-8">
        <motion.div
          className="w-32 h-32 rounded-full bg-gradient-to-br from-burgundy-500 to-burgundy-700 flex items-center justify-center"
          animate={
            conversationState.isListening
              ? {
                  scale: [1, 1.1, 1],
                }
              : {}
          }
          transition={{
            duration: 1.5,
            repeat: conversationState.isListening ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          {conversationState.isSpeaking ? (
            <Volume2 className="w-12 h-12 text-white" />
          ) : conversationState.isListening ? (
            <Mic className="w-12 h-12 text-white" />
          ) : (
            <MicOff className="w-12 h-12 text-white/60" />
          )}
        </motion.div>

        {/* Speaking animation */}
        {conversationState.isSpeaking && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex gap-1">
              {[0, 1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  className="w-1 h-8 bg-burgundy-600 rounded-full"
                  animate={{
                    scaleY: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Transcript display */}
      {(conversationState.transcript || conversationState.interimTranscript) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
        >
          <p className="text-sm text-gray-900 dark:text-gray-100">
            {conversationState.transcript}
            <span className="text-gray-500">{conversationState.interimTranscript}</span>
          </p>
        </motion.div>
      )}

      {/* Error display */}
      {conversationState.error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg"
        >
          <p className="text-sm text-red-600 dark:text-red-400">{conversationState.error}</p>
        </motion.div>
      )}

      {/* Control buttons */}
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleListening}
          className={`px-6 py-3 rounded-full font-medium transition-colors ${
            conversationState.isListening
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-burgundy-600 hover:bg-burgundy-700 text-white'
          }`}
          disabled={conversationState.isProcessing || conversationState.isSpeaking}
        >
          {conversationState.isListening
            ? language === 'es'
              ? 'Detener'
              : 'Stop'
            : language === 'es'
              ? 'Hablar'
              : 'Speak'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => (window.location.href = 'tel:18449673536')}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium transition-colors flex items-center gap-2"
        >
          <Phone className="w-4 h-4" />
          {language === 'es' ? 'Llamar' : 'Call'}
        </motion.button>
      </div>

      {/* Instructions */}
      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
        {language === 'es'
          ? 'Presiona "Hablar" y di tu consulta legal'
          : 'Press "Speak" and state your legal question'}
      </p>
    </div>
  );
}
