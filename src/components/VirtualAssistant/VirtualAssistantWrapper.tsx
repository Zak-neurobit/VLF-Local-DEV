'use client';

import React from 'react';
import { VirtualAssistant } from './index';

interface VirtualAssistantWrapperProps {
  language: 'en' | 'es';
  userId?: string;
}

export const VirtualAssistantWrapper: React.FC<VirtualAssistantWrapperProps> = ({
  language,
  userId,
}) => {
  const handleMessage = (message: string) => {
    // Handle voice message
  };

  return <VirtualAssistant language={language} userId={userId} onMessage={handleMessage} />;
};
