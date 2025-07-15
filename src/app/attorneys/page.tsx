import { Metadata } from 'next';
import AttorneysPageContent from '@/components/AttorneysPageContent';
import { MasterLayout } from '@/design-system/templates/MasterLayout';

export const metadata: Metadata = {
  title: 'Our Attorneys | Immigration & Personal Injury Lawyers | Vasquez Law Firm',
  description:
    'Meet our experienced team of attorneys specializing in immigration law, personal injury, workers compensation, and criminal defense. Serving NC & FL.',
  keywords:
    'immigration attorney, personal injury lawyer, workers compensation attorney, criminal defense lawyer, North Carolina attorneys, Florida lawyers',
};

export default function AttorneysPage() {
  return (
    <MasterLayout variant="default" showBreadcrumbs={true}>
      <AttorneysPageContent language="en" />
    </MasterLayout>
  );
}
