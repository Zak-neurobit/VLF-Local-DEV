import { Metadata } from 'next';
import { AttorneyPageTemplate } from '@/components/attorneys/AttorneyPageTemplate';
import { getAttorneyBySlug } from '@/data/attorneys';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'William J. Vásquez - Founding Partner | Immigration & Criminal Defense Attorney',
  description: 'William J. Vásquez is the founding partner of Vasquez Law Firm. U.S. Air Force veteran with 35+ years of experience in immigration law and criminal defense. YO PELEO POR TI™',
  keywords: 'William Vasquez attorney, immigration lawyer Charlotte NC, criminal defense attorney, veteran attorney, Spanish speaking lawyer',
};

export default function Page() {
  const attorney = getAttorneyBySlug('william-vasquez');
  
  if (!attorney) {
    notFound();
  }

  return <AttorneyPageTemplate attorney={attorney} language="en" />;
}