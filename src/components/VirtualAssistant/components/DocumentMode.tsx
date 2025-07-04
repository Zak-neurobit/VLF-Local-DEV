'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload } from 'lucide-react';

interface DocumentModeProps {
  language: 'en' | 'es';
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DocumentMode({ language, onFileUpload }: DocumentModeProps) {
  return (
    <div className="p-6 h-full flex flex-col items-center justify-center">
      <div className="text-center mb-6">
        <FileText className="w-16 h-16 text-burgundy-600 mx-auto mb-4" />
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {language === 'es' ? 'Análisis de Documentos' : 'Document Analysis'}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {language === 'es'
            ? 'Sube un documento legal para análisis'
            : 'Upload a legal document for analysis'}
        </p>
      </div>

      <label className="cursor-pointer">
        <input
          type="file"
          onChange={onFileUpload}
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
          className="hidden"
        />
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-burgundy-600 hover:bg-burgundy-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Upload className="w-5 h-5" />
          {language === 'es' ? 'Seleccionar Archivo' : 'Select File'}
        </motion.div>
      </label>

      <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
        <p className="mb-1">{language === 'es' ? 'Formatos aceptados:' : 'Accepted formats:'}</p>
        <p>PDF, DOC, DOCX, TXT, JPG, PNG</p>
        <p className="mt-2">{language === 'es' ? 'Tamaño máximo: 10MB' : 'Max size: 10MB'}</p>
      </div>
    </div>
  );
}
