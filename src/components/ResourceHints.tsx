import Head from 'next/head';

interface ResourceHintsProps {
  criticalImages?: string[];
  criticalFonts?: string[];
  preconnectDomains?: string[];
}

export default function ResourceHints({
  criticalImages = [],
  criticalFonts = [],
  preconnectDomains = [],
}: ResourceHintsProps) {
  return (
    <Head>
      {/* Preconnect to external domains */}
      {preconnectDomains.map(domain => (
        <link key={domain} rel="preconnect" href={domain} crossOrigin="anonymous" />
      ))}

      {/* DNS prefetch for additional domains */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* Preload critical images */}
      {criticalImages.map(image => (
        <link
          key={image}
          rel="preload"
          as="image"
          href={image}
          type={image.endsWith('.webp') ? 'image/webp' : 'image/png'}
        />
      ))}

      {/* Preload critical fonts */}
      {criticalFonts.map(font => (
        <link
          key={font}
          rel="preload"
          as="font"
          type="font/woff2"
          href={font}
          crossOrigin="anonymous"
        />
      ))}

      {/* Prefetch next likely pages */}
      <link rel="prefetch" href="/contact" />
      <link rel="prefetch" href="/practice-areas" />
      <link rel="prefetch" href="/attorneys/william-vasquez" />
    </Head>
  );
}
