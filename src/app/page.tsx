import { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import { MasterLayout } from '@/design-system/templates/MasterLayout';
import ResourceHints from '@/components/ResourceHints';

export const metadata: Metadata = {
  title: 'Immigration Lawyer & Personal Injury Attorney | Vasquez Law Firm - YO PELEO POR TI™',
  description:
    'Top-rated immigration lawyers and personal injury attorneys serving NC & FL. 60+ years experience, 30,000+ cases won. Free consultation. Se habla español. Call 1-844-YO-PELEO.',
  keywords:
    'immigration lawyer, personal injury attorney, immigration attorney near me, car accident lawyer, workers compensation attorney, criminal defense lawyer, North Carolina immigration lawyer, Florida personal injury attorney, Charlotte immigration attorney, Raleigh personal injury lawyer, Orlando immigration lawyer, abogado de inmigracion, abogado de lesiones personales, YO PELEO POR TI™',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_ES',
    siteName: 'Vasquez Law Firm',
    title: 'Immigration Lawyer & Personal Injury Attorney | Vasquez Law Firm - YO PELEO POR TI™',
    description:
      'Experienced immigration lawyers and personal injury attorneys. U.S. Air Force veteran-owned. 30,000+ clients helped. Free consultation in English & Spanish.',
    images: [
      {
        url: '/images/BANNER_TRANS.PNG',
        width: 1200,
        height: 630,
        alt: 'Vasquez Law Firm - Immigration and Personal Injury Attorneys',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Immigration Lawyer & Personal Injury Attorney | Vasquez Law Firm',
    description: '60+ years experience. 30,000+ cases won. Free consultation. Call 1-844-YO-PELEO',
    images: ['/images/BANNER_TRANS.PNG'],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com',
      'es-ES': 'https://www.vasquezlawnc.com/es',
    },
  },
  authors: [
    { name: 'William Vasquez', url: 'https://www.vasquezlawnc.com/attorneys/william-vasquez' },
  ],
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function Page() {
  return (
    <>
      <ResourceHints
        criticalImages={[
          '/images/BANNER_TRANS.PNG',
          '/william-vasquez-cutout.png',
          '/images/LOGO_TRANS.PNG',
        ]}
        preconnectDomains={['https://fonts.gstatic.com']}
      />
      <MasterLayout variant="hero" showBreadcrumbs={false}>
        <HomePage />
      </MasterLayout>
    </>
  );
}
