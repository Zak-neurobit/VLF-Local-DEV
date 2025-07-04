import { Metadata } from 'next';
import PageLayout from '@/components/Layout/PageLayout';
import Section from '@/components/ui/Section';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Shield, Lock, ArrowRight, CheckCircle, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Make a Payment | Vasquez Law Firm, PLLC',
  description:
    'Make a secure online payment to Vasquez Law Firm through our trusted payment partner LawPay. Fast, secure, and convenient payment processing.',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/make-payment',
  },
};

export default function MakePaymentPage() {
  return (
    <PageLayout>
      <Section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-brand-skyblue/10 rounded-full flex items-center justify-center">
                  <CreditCard className="w-10 h-10 text-brand-skyblue" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-brand-charcoal mb-4">Make a Payment</h1>
              <p className="text-xl text-gray-600">
                Secure online payment processing through LawPay
              </p>
            </div>

            {/* Payment Information */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
                    Secure Payment Portal
                  </h2>
                  <p className="text-gray-700 mb-6">
                    Vasquez Law Firm uses LawPay, a secure payment solution designed specifically
                    for law firms. Your payment information is protected with bank-level security
                    and encryption.
                  </p>

                  {/* Security Features */}
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="flex items-start">
                      <Lock className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">SSL Encrypted</h3>
                        <p className="text-sm text-gray-600">
                          Your data is protected with 256-bit SSL encryption
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Shield className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">PCI Compliant</h3>
                        <p className="text-sm text-gray-600">
                          Meets all payment card industry security standards
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">Trust Account Safe</h3>
                        <p className="text-sm text-gray-600">
                          Compliant with attorney trust accounting rules
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Button */}
                  <div className="text-center">
                    <a
                      href="https://secure.lawpay.com/pages/vasquezlawfirm/operating1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-brand-crimson text-white px-8 py-4 rounded-lg font-semibold hover:bg-brand-crimson/90 transition-colors text-lg"
                    >
                      Make Secure Payment
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                    <p className="text-sm text-gray-600 mt-4">
                      You will be redirected to our secure payment partner, LawPay
                    </p>
                  </div>
                </div>

                {/* Payment Instructions */}
                <div className="border-t pt-8">
                  <h3 className="text-xl font-bold text-brand-charcoal mb-4">
                    Payment Instructions
                  </h3>
                  <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                    <li>
                      Click the "Make Secure Payment" button above to access our secure payment
                      portal
                    </li>
                    <li>
                      Enter your payment amount and select your payment method (credit card, debit
                      card, or eCheck)
                    </li>
                    <li>Fill in your payment information and billing details</li>
                    <li>
                      Include your case or invoice number in the description field for proper credit
                    </li>
                    <li>
                      Review and submit your payment. You'll receive an email confirmation
                      immediately
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            {/* Accepted Payment Methods */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-brand-charcoal mb-4">
                  Accepted Payment Methods
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Credit & Debit Cards</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Visa</li>
                      <li>• Mastercard</li>
                      <li>• American Express</li>
                      <li>• Discover</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Electronic Payments</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• eCheck/ACH bank transfers</li>
                      <li>• Processed within 3-5 business days</li>
                      <li>• Lower processing fees</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alternative Payment Options */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-brand-charcoal mb-4">
                  Alternative Payment Options
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Pay by Phone</h4>
                    <p className="text-gray-700 mb-2">
                      Call our office during business hours to make a payment over the phone:
                    </p>
                    <a
                      href="tel:7043580470"
                      className="flex items-center text-brand-skyblue hover:text-brand-crimson transition-colors"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      <span className="font-semibold">(704) 358-0470</span>
                    </a>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Pay by Mail</h4>
                    <p className="text-gray-700">
                      Send checks or money orders payable to "Vasquez Law Firm, PLLC" to:
                    </p>
                    <address className="text-gray-700 not-italic mt-2">
                      Vasquez Law Firm, PLLC
                      <br />
                      4801 E Independence Blvd, Suite 818
                      <br />
                      Charlotte, NC 28212
                    </address>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Pay in Person</h4>
                    <p className="text-gray-700">
                      Visit any of our office locations during business hours. We accept cash,
                      check, money order, and card payments in person.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Information */}
            <Card className="bg-yellow-50 border-2 border-yellow-400">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-yellow-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-yellow-800">
                      Important Payment Information
                    </h3>
                    <ul className="mt-2 text-yellow-700 space-y-1">
                      <li>• Always include your case or invoice number with your payment</li>
                      <li>• Payments are typically processed within 1-2 business days</li>
                      <li>• For payment plans or arrangements, please contact our office</li>
                      <li>• Keep your payment confirmation for your records</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="text-center mt-12">
              <h3 className="text-xl font-bold text-brand-charcoal mb-4">
                Questions About Your Payment?
              </h3>
              <p className="text-gray-700 mb-6">
                Our billing department is here to help with any payment questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:7043580470"
                  className="flex items-center justify-center text-brand-skyblue hover:text-brand-crimson transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  <span className="font-semibold">(704) 358-0470</span>
                </a>
                <a
                  href="mailto:billing@vasquezlawnc.com"
                  className="flex items-center justify-center text-brand-skyblue hover:text-brand-crimson transition-colors"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  <span className="font-semibold">billing@vasquezlawnc.com</span>
                </a>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Office Hours: Monday - Friday, 8:30 AM - 5:30 PM EST
              </p>
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
