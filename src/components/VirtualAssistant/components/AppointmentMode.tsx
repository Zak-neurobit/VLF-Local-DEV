'use client';

import React from 'react';
import { Calendar } from 'lucide-react';

interface AppointmentModeProps {
  language: 'en' | 'es';
}

export default function AppointmentMode({ language }: AppointmentModeProps) {
  return (
    <div className="p-6 h-full flex flex-col items-center justify-center">
      <Calendar className="w-16 h-16 text-burgundy-600 mb-4" />
      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {language === 'es' ? 'Programar Cita' : 'Schedule Appointment'}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
        {language === 'es'
          ? 'Próximamente: Sistema de citas integrado'
          : 'Coming Soon: Integrated appointment system'}
      </p>
      <button
        onClick={() => (window.location.href = 'tel:18449673536')}
        className="px-6 py-3 bg-burgundy-600 hover:bg-burgundy-700 text-white rounded-lg font-medium transition-colors"
      >
        {language === 'es' ? 'Llamar para Agendar' : 'Call to Schedule'}
      </button>
    </div>
  );
}
