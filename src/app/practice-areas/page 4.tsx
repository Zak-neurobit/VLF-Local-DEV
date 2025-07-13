import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { MasterLayout } from '@/design-system/templates/MasterLayout';

export const metadata: Metadata = {
  title: 'Practice Areas | Immigration, Personal Injury & More | Vasquez Law Firm',
  description:
    'Comprehensive legal services including immigration, personal injury, workers compensation, criminal defense, family law, and traffic violations. Free consultation. Se habla español.',
  keywords:
    'practice areas, legal services, immigration lawyer, personal injury attorney, workers compensation, criminal defense, family law, traffic violations',
  openGraph: {
    title: 'Practice Areas | Vasquez Law Firm',
    description:
      'Full-service law firm offering immigration, personal injury, workers comp, criminal defense, family law, and traffic violation services.',
    url: 'https://www.vasquezlawfirm.com/practice-areas',
  },
};

const PracticeAreasContent = dynamic(() => import('./PracticeAreasContent'), {
  loading: () => <div className="min-h-screen bg-black" />,
});

export default function PracticeAreasPage() {
  return (
    <>
      <MasterLayout variant="default" showBreadcrumbs={true}>
        <PracticeAreasContent />
      </MasterLayout>
      <Script
        id="practice-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Legal Services',
            provider: {
              '@type': 'LegalService',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
              telephone: '+1-919-537-8722',
              priceRange: '$$',
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina',
            },
            url: 'https://www.vasquezlawfirm.com/practice-areas',
            description: 'Legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </>
  );
}
