import { MasterLayout } from '@/design-system/templates/MasterLayout';

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <MasterLayout variant="default" showBreadcrumbs={true}>
      {children}
    </MasterLayout>
  );
}
