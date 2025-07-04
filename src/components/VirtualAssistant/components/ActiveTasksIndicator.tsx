'use client';

import React from 'react';

interface ActiveTasksIndicatorProps {
  activeTasks: any[];
  language: 'en' | 'es';
}

export default function ActiveTasksIndicator({ activeTasks, language }: ActiveTasksIndicatorProps) {
  if (activeTasks.length === 0) return null;

  return (
    <div className="px-4 py-2 bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800">
      <p className="text-xs text-amber-800 dark:text-amber-200">
        {language === 'es'
          ? `${activeTasks.length} tarea(s) activa(s)`
          : `${activeTasks.length} active task(s)`}
      </p>
    </div>
  );
}
