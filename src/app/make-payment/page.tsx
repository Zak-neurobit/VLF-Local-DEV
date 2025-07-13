import { Metadata } from 'next';
import { MasterLayout } from '@/design-system/templates/MasterLayout';
import { PaymentForm } from '@/components/PaymentForm';
import { CreditCard, Shield, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Make a Payment | Secure Client Portal | Vasquez Law Firm',
  description:
    'Make secure payments to Vasquez Law Firm through our trusted payment partner, LawPay. Secure processing for legal fees and retainers.',
  keywords: 'make payment, pay attorney, LawPay, secure payment, legal fees, Vasquez Law Firm',
  openGraph: {
    title: 'Make a Payment | Vasquez Law Firm, PLLC',
    description: 'Secure payment portal for Vasquez Law Firm clients',
    images: ['/images/og-payment.jpg'],
  },
};

export const runtime = 'nodejs';

export default function MakePaymentPage() {
  return (
    <MasterLayout
      seo={{
        title: 'Make a Payment | Vasquez Law Firm',
        description: 'Secure online payment portal for Vasquez Law Firm clients',
        canonical: 'https://www.vasquezlawnc.com/make-payment',
      }}
    >
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full">
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Make a Payment</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Securely pay your legal fees through our trusted payment portal powered by LawPay
            </p>
          </div>

          {/* Security Notice */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-2 rounded-full">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Secure Payment Processing
                </h3>
                <p className="text-gray-600 mb-4">
                  Your payment information is processed securely through LawPay, a payment processor
                  designed specifically for law firms and approved by all 50 state bar associations.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Lock className="w-4 h-4" />
                    <span>256-bit SSL Encryption</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span>PCI DSS Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <PaymentForm
              onSuccess={paymentId => {
                // Handle successful payment
                console.log('Payment successful:', paymentId);
              }}
              onError={error => {
                // Handle payment error
                console.error('Payment error:', error);
              }}
            />
          </div>

          {/* Trust Account Notice */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Trust Account Information</h3>
            <p className="text-blue-800">
              Payments for future legal services will be deposited into our trust account and
              applied to your case as services are rendered. Operating account payments are for
              completed services and costs.
            </p>
          </div>

          {/* Contact Information */}
          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Need Help with Your Payment?
            </h3>
            <p className="text-gray-600 mb-4">
              Contact our billing department if you have any questions about your payment.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <a href="tel:+18449673536" className="text-blue-600 hover:text-blue-800 font-medium">
                Call: 1-844-YO-PELEO
              </a>
              <a
                href="mailto:billing@vasquezlawnc.com"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Email: billing@vasquezlawnc.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
}
