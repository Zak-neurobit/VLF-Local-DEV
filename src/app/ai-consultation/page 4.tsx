import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'AI Consultation - Vasquez Law Firm',
  description: 'Get instant legal consultation with our AI-powered assistant',
};

export default function AIConsultationPage() {
  // Redirect to contact page with chat widget
  redirect('/contact?chat=open');
}
