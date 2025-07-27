import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'Voluntary Departure | Vasquez Law Firm',
  description: 'Leaving the US voluntarily to avoid deportation consequences',
  keywords: 'voluntary departure, immigration, removal defense, legal services, attorney, lawyer',
};

export default function VoluntaryDeparturePage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="immigration"
      subArea="removal-defense"
      language="en"
    />
  );
}
