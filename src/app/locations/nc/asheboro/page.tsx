import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Asheboro NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Asheboro attorneys serving Randolph County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Asheboro immigration lawyer, Asheboro criminal defense attorney, Asheboro personal injury lawyer, Asheboro abogado, Asheboro DWI lawyer, Randolph County attorney`,
  openGraph: {
    title: `Asheboro Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Asheboro, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-asheboro.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function AsheboroPage() {
  const locationData = {
    city: 'Asheboro',
    state: 'NC',
    heroTitle: 'Legal Services in Asheboro',
    heroSubtitle: 'Trusted attorneys serving the local community',
    practiceAreas: [], // TODO: Add practice areas
    attorneys: [], // TODO: Add attorneys
    officeInfo: {
      address: '',
      phone: '1-844-YO-PELEO',
      hours: 'Monday-Friday 9AM-5PM',
    },
    language: 'en' as const,
  };

  return <LocationPageTemplate {...locationData} />;
}
