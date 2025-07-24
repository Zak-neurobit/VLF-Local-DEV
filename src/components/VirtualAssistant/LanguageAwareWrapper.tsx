'use client';

import React from 'react';
import { ModernVirtualAssistant } from './ModernVirtualAssistant';
import { useLanguage } from '@/hooks/useLanguage';
import { ClientOnlyWrapper } from '@/components/ClientOnlyWrapper';

export function VirtualAssistantWrapper() {
  const { language } = useLanguage();
  
  return (
    <ClientOnlyWrapper>
      <ModernVirtualAssistant language={language} />
    </ClientOnlyWrapper>
  );
}