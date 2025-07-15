'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { logger } from '@/lib/logger';

interface ABTestContextType {
  getVariant: (testId: string) => string | null;
  trackConversion: (testId: string, event: string, value?: number, metadata?: Record<string, any>) => void;
  isLoading: boolean;
  userId: string | null;
  sessionId: string;
}

const ABTestContext = createContext<ABTestContextType | undefined>(undefined);

interface ABTestProviderProps {
  children: React.ReactNode;
  userId?: string;
}

export function ABTestProvider({ children, userId }: ABTestProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [sessionId] = useState(() => generateSessionId());
  const [userIdState, setUserIdState] = useState<string | null>(userId || null);
  const [variants, setVariants] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    if (userId) {
      setUserIdState(userId);
    } else {
      // Generate anonymous user ID
      const anonymousId = getOrCreateAnonymousId();
      setUserIdState(anonymousId);
    }
    setIsLoading(false);
  }, [userId]);

  const getVariant = async (testId: string): Promise<string | null> => {
    if (!userIdState) return null;

    // Check if we already have a variant for this test
    if (variants.has(testId)) {
      return variants.get(testId)!;
    }

    try {
      const response = await fetch('/api/ab-testing/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testId,
          userId: userIdState,
          sessionId,
          userContext: {
            userAgent: navigator.userAgent,
            deviceType: getDeviceType(),
            timestamp: new Date().toISOString(),
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.variantId) {
          setVariants(prev => new Map(prev).set(testId, data.variantId));
          return data.variantId;
        }
      }
    } catch (error) {
      logger.error('Failed to get A/B test variant', { error, testId });
    }

    return null;
  };

  const trackConversion = async (
    testId: string, 
    event: string, 
    value?: number, 
    metadata?: Record<string, any>
  ) => {
    if (!userIdState) return;

    const variantId = variants.get(testId);
    if (!variantId) return;

    try {
      await fetch('/api/ab-testing/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testId,
          variantId,
          userId: userIdState,
          sessionId,
          event,
          value,
          metadata,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      logger.error('Failed to track A/B test conversion', { error, testId, event });
    }
  };

  const contextValue: ABTestContextType = {
    getVariant: (testId: string) => variants.get(testId) || null,
    trackConversion,
    isLoading,
    userId: userIdState,
    sessionId,
  };

  // Pre-fetch variants for active tests on mount
  useEffect(() => {
    if (!userIdState || isLoading) return;

    const fetchActiveVariants = async () => {
      try {
        const response = await fetch('/api/ab-testing/active');
        if (response.ok) {
          const data = await response.json();
          const activeTests = data.tests || [];

          // Get variants for all active tests
          for (const test of activeTests) {
            await getVariant(test.id);
          }
        }
      } catch (error) {
        logger.error('Failed to fetch active A/B tests', { error });
      }
    };

    fetchActiveVariants();
  }, [userIdState, isLoading]);

  return (
    <ABTestContext.Provider value={contextValue}>
      {children}
    </ABTestContext.Provider>
  );
}

export function useABTest(testId: string) {
  const context = useContext(ABTestContext);
  if (!context) {
    throw new Error('useABTest must be used within ABTestProvider');
  }

  const [variant, setVariant] = useState<string | null>(null);
  const [content, setContent] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getVariantAndContent = async () => {
      setIsLoading(true);
      
      const variantId = await context.getVariant(testId);
      setVariant(variantId);

      if (variantId) {
        try {
          const response = await fetch(`/api/ab-testing/content?testId=${testId}&variantId=${variantId}`);
          if (response.ok) {
            const data = await response.json();
            setContent(data.content);
          }
        } catch (error) {
          logger.error('Failed to fetch variant content', { error, testId, variantId });
        }
      }
      
      setIsLoading(false);
    };

    getVariantAndContent();
  }, [testId, context]);

  const trackEvent = (event: string, value?: number, metadata?: Record<string, any>) => {
    context.trackConversion(testId, event, value, metadata);
  };

  return {
    variant,
    content,
    isLoading,
    trackEvent,
    isVariant: (variantId: string) => variant === variantId,
  };
}

export function useABTestContent<T = Record<string, any>>(
  testId: string, 
  defaultContent: T
): { content: T; variant: string | null; trackEvent: (event: string, value?: number, metadata?: Record<string, any>) => void } {
  const { variant, content, trackEvent } = useABTest(testId);

  const finalContent = content ? { ...defaultContent, ...content } : defaultContent;

  return {
    content: finalContent as T,
    variant,
    trackEvent,
  };
}

// Utility functions
function generateSessionId(): string {
  return 'sess_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

function getOrCreateAnonymousId(): string {
  const key = 'vlf_anonymous_id';
  let anonymousId = localStorage.getItem(key);
  
  if (!anonymousId) {
    anonymousId = 'anon_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    localStorage.setItem(key, anonymousId);
  }
  
  return anonymousId;
}

function getDeviceType(): string {
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (/tablet|ipad|playbook|silk|(android(?!.*mobile))/.test(userAgent)) {
    return 'tablet';
  }
  
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/.test(userAgent)) {
    return 'mobile';
  }
  
  return 'desktop';
}

// HOC for A/B testing components
export function withABTest<P extends object>(
  testId: string,
  defaultContent: Record<string, any> = {}
) {
  return function ABTestHOC(WrappedComponent: React.ComponentType<P>) {
    const ABTestComponent = (props: P) => {
      const { content, variant, trackEvent } = useABTestContent(testId, defaultContent);

      return (
        <WrappedComponent
          {...props}
          abTestContent={content}
          abTestVariant={variant}
          abTrackEvent={trackEvent}
        />
      );
    };

    ABTestComponent.displayName = `withABTest(${WrappedComponent.displayName || WrappedComponent.name})`;
    return ABTestComponent;
  };
}