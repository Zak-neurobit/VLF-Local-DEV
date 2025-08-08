'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  isLoading: boolean;
  language: 'en' | 'es';
}

export default function LoadingOverlay({ isLoading, language }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center z-10">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-burgundy-600 mx-auto mb-2" />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {language === 'es' ? 'Procesando...' : 'Processing...'}
        </p>
      </div>
    </div>
  );
}
