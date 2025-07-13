import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Make a Payment | Vasquez Law Firm, PLLC',
  description:
    'Make secure payments to Vasquez Law Firm through our trusted payment partner, LawPay. Secure processing for legal fees and retainers.',
  keywords: 'make payment, pay attorney, LawPay, secure payment, legal fees, Vasquez Law Firm',
  openGraph: {
    title: 'Make a Payment | Vasquez Law Firm, PLLC',
    description: 'Secure payment portal for Vasquez Law Firm clients',
    images: ['/images/og-payment.jpg'],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/make-payment',
  },
};

export default function MakePaymentPage() {
  // Redirect to the main payment page
  redirect('/payment');
}
