import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: '42A Cancellation (Non-LPR) | Vasquez Law Firm',
  description: 'Cancellation of removal for non-permanent residents',
  keywords: '42a cancellation (non-lpr), immigration, removal defense, legal services, attorney, lawyer',
};

export default function FortyTwoACancellationNonLPRPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="immigration"
      subArea="removal-defense"
      language="en"
    />
  );
}
