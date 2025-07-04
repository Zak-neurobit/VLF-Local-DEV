'use client';

import React from 'react';
import { X, MessageCircle, Mic, FileText, Calendar } from 'lucide-react';

interface AssistantHeaderProps {
  language: 'en' | 'es';
  mode: 'chat' | 'voice' | 'consultation' | 'appointment' | 'document';
  onModeChange: (mode: 'chat' | 'voice' | 'consultation' | 'appointment' | 'document') => void;
  onClose: () => void;
}

export default function AssistantHeader({
  language,
  mode,
  onModeChange,
  onClose,
}: AssistantHeaderProps) {
  const modes = [
    { id: 'chat', icon: MessageCircle, label: language === 'es' ? 'Chat' : 'Chat' },
    { id: 'voice', icon: Mic, label: language === 'es' ? 'Voz' : 'Voice' },
    { id: 'consultation', icon: FileText, label: language === 'es' ? 'Consulta' : 'Consult' },
    { id: 'appointment', icon: Calendar, label: language === 'es' ? 'Cita' : 'Appt' },
    { id: 'document', icon: FileText, label: language === 'es' ? 'Doc' : 'Doc' },
  ];

  return (
    <div className="bg-gradient-to-r from-burgundy-600 to-burgundy-700 text-white p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">
          {language === 'es' ? 'Asistente Legal Virtual' : 'Virtual Legal Assistant'}
        </h3>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors"
          aria-label={language === 'es' ? 'Cerrar' : 'Close'}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-1">
        {modes.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onModeChange(id as any)}
            className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
              mode === id
                ? 'bg-white text-burgundy-600'
                : 'bg-burgundy-500/20 hover:bg-burgundy-500/30'
            }`}
          >
            <Icon className="w-3 h-3" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
