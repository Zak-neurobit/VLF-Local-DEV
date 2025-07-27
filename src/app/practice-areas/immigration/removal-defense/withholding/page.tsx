import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'Withholding of Removal | Vasquez Law Firm',
  description: 'Protection from removal to countries where you face persecution',
  keywords: 'withholding of removal, immigration, removal defense, legal services, attorney, lawyer',
};

export default function WithholdingofRemovalPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="immigration"
      subArea="removal-defense"
      language="en"
    />
  );
}
