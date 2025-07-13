'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ConsultationModeProps {
  consultationData: {
    caseType: string;
    description: string;
    urgency: 'low' | 'medium' | 'high';
  };
  language: 'en' | 'es';
  onDataChange: (data: Partial<ConsultationModeProps['consultationData']>) => void;
  onSubmit: () => void;
}

export default function ConsultationMode({
  consultationData,
  language,
  onDataChange,
  onSubmit,
}: ConsultationModeProps) {
  const caseTypes =
    language === 'es'
      ? [
          { value: 'immigration', label: 'Inmigración' },
          { value: 'personal-injury', label: 'Lesiones Personales' },
          { value: 'workers-comp', label: 'Compensación Laboral' },
          { value: 'criminal-defense', label: 'Defensa Criminal' },
          { value: 'family-law', label: 'Derecho Familiar' },
          { value: 'other', label: 'Otro' },
        ]
      : [
          { value: 'immigration', label: 'Immigration' },
          { value: 'personal-injury', label: 'Personal Injury' },
          { value: 'workers-comp', label: "Workers' Compensation" },
          { value: 'criminal-defense', label: 'Criminal Defense' },
          { value: 'family-law', label: 'Family Law' },
          { value: 'other', label: 'Other' },
        ];

  return (
    <div className="p-6 overflow-y-auto h-full">
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {language === 'es' ? 'Tipo de Caso' : 'Case Type'}
          </label>
          <select
            value={consultationData.caseType}
            onChange={e => onDataChange({ ...consultationData, caseType: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-500 focus:border-burgundy-500"
            required
          >
            <option value="">{language === 'es' ? 'Seleccione un tipo' : 'Select a type'}</option>
            {caseTypes.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {language === 'es' ? 'Descripción del Caso' : 'Case Description'}
          </label>
          <textarea
            value={consultationData.description}
            onChange={e => onDataChange({ ...consultationData, description: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-500 focus:border-burgundy-500"
            placeholder={
              language === 'es'
                ? 'Describa brevemente su situación legal...'
                : 'Briefly describe your legal situation...'
            }
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {language === 'es' ? 'Urgencia' : 'Urgency'}
          </label>
          <div className="flex gap-2">
            {[
              { value: 'low', label: language === 'es' ? 'Baja' : 'Low', color: 'green' },
              { value: 'medium', label: language === 'es' ? 'Media' : 'Medium', color: 'yellow' },
              { value: 'high', label: language === 'es' ? 'Alta' : 'High', color: 'red' },
            ].map(({ value, label, color }) => (
              <button
                key={value}
                type="button"
                onClick={() => onDataChange({ ...consultationData, urgency: value as 'low' | 'medium' | 'high' })}
                className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors ${
                  consultationData.urgency === value
                    ? `bg-${color}-500 text-white`
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-3 bg-burgundy-600 hover:bg-burgundy-700 text-white rounded-lg font-medium transition-colors"
        >
          {language === 'es' ? 'Iniciar Consulta' : 'Start Consultation'}
        </motion.button>
      </form>
    </div>
  );
}
