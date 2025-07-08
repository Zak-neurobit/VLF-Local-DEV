import { StructuredData } from '@/components/SEO/StructuredData';
import { generateEnhancedOrganizationSchema } from '@/components/SEO/enhanced-schemas';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { performanceMonitor } from '@/lib/monitoring/performance';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { organizationSchema } from '@/lib/schema';
import SessionProvider from '@/components/providers/SessionProvider';
import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';
import { DynamicHreflang } from '@/components/SEO/DynamicHreflang';
// Removed SiteLayout import - will handle navigation directly

// Dynamically import Chat Widget to avoid SSR issues
const ChatWidget = dynamic(() => import('@/components/ChatWidget').then(mod => mod.ChatWidget), {
  ssr: false,
});

// Dynamically import Performance Monitor
const PerformanceMonitor = dynamic(() => import('@/components/PerformanceMonitor'), { ssr: false });

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'Vasquez Law Firm - YO PELEO POR TI™ | Immigration & Personal Injury Attorneys',
    template: '%s | Vasquez Law Firm - YO PELEO POR TI™',
  },
  description:
    'Honest, reliable legal representation at an affordable price. Over 35 years of experience. Immigration, personal injury, workers compensation, and criminal defense. Available 24/7 with AI assistance.',
  keywords:
    'immigration lawyer, personal injury attorney, criminal defense, workers compensation, Raleigh NC, Charlotte NC, Orlando FL, yo peleo por ti, abogado de inmigracion, lesiones personales',
  authors: [{ name: 'Vasquez Law Firm' }],
  creator: 'Vasquez Law Firm',
  publisher: 'Vasquez Law Firm',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.vasquezlawnc.com'),
  openGraph: {
    title: 'Vasquez Law Firm - YO PELEO POR TI™ | Immigration & Personal Injury Attorneys',
    description:
      'Honest, reliable legal representation. Over 30,000 cases won. U.S. Air Force veteran attorney. Available 24/7 with AI assistance in English & Spanish.',
    url: 'https://www.vasquezlawnc.com',
    siteName: 'Vasquez Law Firm',
    images: [
      {
        url: '/images/BANNER_TRANS.PNG',
        width: 1200,
        height: 630,
        alt: 'Vasquez Law Firm - YO PELEO POR TI™',
      },
    ],
    locale: 'en_US',
    alternateLocale: ['es_ES', 'es_MX', 'es_US'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vasquez Law Firm - YO PELEO POR TI™',
    description:
      'Honest, reliable legal representation. Over 30,000 cases won. Call 1-844-YO-PELEO',
    images: ['/images/BANNER_TRANS.PNG'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#6B1F2E',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Initialize performance monitoring
  if (typeof window !== 'undefined') {
    performanceMonitor.observeWebVitals();
    performanceMonitor.monitorMemory();
  }

  return (
    <html lang="en" className={`${inter.className} ${playfairDisplay.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Vasquez Law Firm Blog RSS"
          href="/blog/rss.xml"
        />
        {/* Basic hreflang tags - enhanced dynamically by DynamicHreflang component */}
        <link rel="alternate" hrefLang="en" href="https://www.vasquezlawnc.com" />
        <link rel="alternate" hrefLang="en-US" href="https://www.vasquezlawnc.com" />
        <link rel="alternate" hrefLang="es" href="https://www.vasquezlawnc.com/es" />
        <link rel="alternate" hrefLang="es-US" href="https://www.vasquezlawnc.com/es" />
        <link rel="alternate" hrefLang="es-MX" href="https://www.vasquezlawnc.com/es" />
        <link rel="alternate" hrefLang="x-default" href="https://www.vasquezlawnc.com" />
        
        {/* Add hreflang sitemap for search engines */}
        <link rel="sitemap" type="application/xml" title="Hreflang Sitemap" href="/hreflang-sitemap.xml" />
        <meta name="geo.region" content="US-NC" />
        <meta name="geo.placename" content="Smithfield, Charlotte, Raleigh, Orlando" />
        <meta name="geo.position" content="35.5085;-78.3394" />
        <meta name="ICBM" content="35.5085, -78.3394" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen bg-white">
        <StructuredData data={generateEnhancedOrganizationSchema()} />
        <SessionProvider>
          <ErrorBoundary>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#333',
                  color: '#fff',
                },
              }}
            />
            <DynamicHreflang />
            {children}
            <ChatWidget />
            <PerformanceMonitor />
          </ErrorBoundary>
        </SessionProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
