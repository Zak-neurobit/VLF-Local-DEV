'use client';

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface ConnectionStatusProps {
  isConnected: boolean;
  isVoiceEnabled: boolean;
  mode: string;
  language: 'en' | 'es';
  onToggleVoice: () => void;
}

export default function ConnectionStatus({
  isConnected,
  isVoiceEnabled,
  mode,
  language,
  onToggleVoice,
}: ConnectionStatusProps) {
  if (mode === 'chat') return null;

  return (
    <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-gray-600 dark:text-gray-400">
            {isConnected
              ? language === 'es'
                ? 'Conectado'
                : 'Connected'
              : language === 'es'
                ? 'Desconectado'
                : 'Disconnected'}
          </span>
        </div>
        {mode === 'voice' && (
          <button
            onClick={onToggleVoice}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
}
