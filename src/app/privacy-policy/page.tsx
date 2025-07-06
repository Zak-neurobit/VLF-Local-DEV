import { Metadata } from 'next';
import PageLayout from '@/components/Layout/PageLayout';
import Section from '@/components/ui/Section';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Privacy Policy | Vasquez Law Firm, PLLC',
  description:
    'Privacy Policy for Vasquez Law Firm. Learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <PageLayout>
      <Section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-brand-charcoal mb-8">Privacy Policy</h1>

            <Card className="mb-8">
              <CardContent className="p-8">
                <p className="text-gray-600 mb-6">
                  <strong>Effective Date:</strong> January 1, 2024
                </p>

                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    Introduction
                  </h2>
                  <p className="mb-6 text-gray-700">
                    Vasquez Law Firm, PLLC (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is
                    committed to protecting your personal information. This Privacy Policy explains
                    how we collect, use, disclose, and safeguard your information when you visit our
                    website or use our services.
                  </p>

                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    Information We Collect
                  </h2>

                  <h3 className="text-xl font-semibold text-brand-charcoal mt-6 mb-3">
                    Personal Information
                  </h3>
                  <p className="mb-4 text-gray-700">
                    We may collect personal information that you provide to us, including but not
                    limited to:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    <li>Name and contact information (email, phone number, address)</li>
                    <li>Immigration status and related documentation</li>
                    <li>Employment information</li>
                    <li>Family information relevant to your case</li>
                    <li>Financial information for billing purposes</li>
                    <li>Any other information you choose to provide</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-brand-charcoal mt-6 mb-3">
                    Automatically Collected Information
                  </h3>
                  <p className="mb-4 text-gray-700">
                    When you visit our website, we may automatically collect:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    <li>IP address and browser information</li>
                    <li>Device information</li>
                    <li>Pages visited and time spent on our site</li>
                    <li>Referring website information</li>
                    <li>Cookie and tracking technology data</li>
                  </ul>

                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    How We Use Your Information
                  </h2>
                  <p className="mb-4 text-gray-700">We use the information we collect to:</p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    <li>Provide legal services and communicate about your case</li>
                    <li>Process payments and maintain billing records</li>
                    <li>Send administrative information and updates</li>
                    <li>Respond to your inquiries and requests</li>
                    <li>Comply with legal obligations and court orders</li>
                    <li>Improve our website and services</li>
                    <li>Protect against fraudulent or illegal activity</li>
                  </ul>

                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    Attorney-Client Privilege
                  </h2>
                  <p className="mb-6 text-gray-700">
                    Communications between you and our attorneys are protected by attorney-client
                    privilege. We maintain the confidentiality of your information in accordance
                    with applicable laws and professional ethical standards.
                  </p>

                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    Information Sharing
                  </h2>
                  <p className="mb-4 text-gray-700">
                    We do not sell, trade, or rent your personal information. We may share your
                    information only in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    <li>With your consent or at your direction</li>
                    <li>
                      With courts, government agencies, or opposing counsel as required by law or
                      legal proceedings
                    </li>
                    <li>
                      With service providers who assist us in operating our business (under
                      confidentiality agreements)
                    </li>
                    <li>To protect our rights, property, or safety, or that of others</li>
                    <li>In connection with a business transfer or merger</li>
                  </ul>

                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    Data Security
                  </h2>
                  <p className="mb-6 text-gray-700">
                    We implement appropriate technical and organizational measures to protect your
                    personal information against unauthorized access, alteration, disclosure, or
                    destruction. However, no method of transmission over the internet or electronic
                    storage is 100% secure.
                  </p>

                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    Your Rights
                  </h2>
                  <p className="mb-4 text-gray-700">You have the right to:</p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>
                      Request deletion of your information (subject to legal retention requirements)
                    </li>
                    <li>Opt-out of marketing communications</li>
                    <li>Request a copy of your information</li>
                  </ul>

                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    Cookies and Tracking
                  </h2>
                  <p className="mb-6 text-gray-700">
                    We use cookies and similar tracking technologies to enhance your experience on
                    our website. You can control cookies through your browser settings, but
                    disabling cookies may affect website functionality.
                  </p>

                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    Children&apos;s Privacy
                  </h2>
                  <p className="mb-6 text-gray-700">
                    Our services are not directed to children under 13. We do not knowingly collect
                    personal information from children under 13. If we learn we have collected such
                    information, we will promptly delete it.
                  </p>

                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    International Users
                  </h2>
                  <p className="mb-6 text-gray-700">
                    If you are accessing our website from outside the United States, please be aware
                    that your information may be transferred to, stored, and processed in the United
                    States where our servers are located.
                  </p>

                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    Changes to This Policy
                  </h2>
                  <p className="mb-6 text-gray-700">
                    We may update this Privacy Policy from time to time. We will notify you of any
                    changes by posting the new Privacy Policy on this page and updating the
                    &quot;Effective Date&quot; above.
                  </p>

                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    Contact Us
                  </h2>
                  <p className="mb-4 text-gray-700">
                    If you have questions about this Privacy Policy or our privacy practices, please
                    contact us at:
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="font-semibold text-brand-charcoal">Vasquez Law Firm, PLLC</p>
                    <p className="text-gray-700">3741 Superior Dr</p>
                    <p className="text-gray-700">Charlotte, NC 28211</p>
                    <p className="text-gray-700">Phone: (704) 358-0470</p>
                    <p className="text-gray-700">Email: leads@vasquezlawfirm.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
