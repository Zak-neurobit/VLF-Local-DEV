import { Metadata } from 'next';
import AttorneysPageContent from '@/components/AttorneysPageContent';

export const metadata: Metadata = {
  title: 'Our Attorneys | Vasquez Law Firm, PLLC',
  description: 'Meet our experienced legal team at Vasquez Law Firm. Our attorneys specialize in immigration law, personal injury, workers compensation, and criminal defense.',
  keywords: 'attorneys, lawyers, immigration attorney, personal injury lawyer, workers compensation attorney, criminal defense lawyer, Raleigh NC, North Carolina',
  openGraph: {
    title: 'Our Attorneys | Vasquez Law Firm, PLLC',
    description: 'Meet our experienced legal team specializing in immigration, personal injury, and criminal defense.',
    images: ['/images/og-attorneys.jpg'],
  },
  alternates: {
    canonical: 'https://vasquezlawnc.com/attorneys',
    languages: {
      'en-US': 'https://vasquezlawnc.com/attorneys',
      'es-ES': 'https://vasquezlawnc.com/es/abogados',
    },
  },
};

export default function AttorneysPage() {
  return <AttorneysPageContent language="en" />;
}