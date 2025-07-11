'use client';

interface ResourceHintsLiteProps {
  criticalImages?: string[];
  preconnectDomains?: string[];
  prefetchResources?: string[];
}

// This component is a placeholder for compatibility
// In Next.js 13+ app directory, resource hints should be added via metadata
export default function ResourceHintsLite({
  criticalImages = [],
  preconnectDomains = [],
  prefetchResources = [],
}: ResourceHintsLiteProps) {
  // Resource hints are now handled in metadata
  // This component returns null to avoid hydration issues
  return null;
}
