'use client';

import Head from 'next/head';

interface ResourceHintsLiteProps {
  criticalImages?: string[];
  preconnectDomains?: string[];
  prefetchResources?: string[];
}

export default function ResourceHintsLite({
  criticalImages = [],
  preconnectDomains = [],
  prefetchResources = [],
}: ResourceHintsLiteProps) {
  return (
    <Head>
      {/* Preconnect to external domains */}
      {preconnectDomains.map(domain => (
        <link key={domain} rel="preconnect" href={domain} crossOrigin="anonymous" />
      ))}

      {/* DNS prefetch for common domains */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* Preload critical images */}
      {criticalImages.slice(0, 3).map(image => (
        <link
          key={image}
          rel="preload"
          as="image"
          href={image}
          type={image.includes('.webp') ? 'image/webp' : undefined}
        />
      ))}

      {/* Prefetch important resources */}
      {prefetchResources.slice(0, 3).map(resource => (
        <link key={resource} rel="prefetch" href={resource} />
      ))}
    </Head>
  );
}
