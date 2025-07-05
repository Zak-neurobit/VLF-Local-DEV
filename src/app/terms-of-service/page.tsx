import { Metadata } from 'next';
import PageLayout from '@/components/Layout/PageLayout';
import Section from '@/components/ui/Section';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Terms of Service | Vasquez Law Firm, PLLC',
  description: 'Terms of Service for Vasquez Law Firm website and legal services.',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/terms-of-service',
  },
};

export default function TermsOfServicePage() {
  return (
    <PageLayout>
      <Section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-brand-charcoal mb-8">Terms of Service</h1>

            <Card className="mb-8">
              <CardContent className="p-8">
                <p className="text-gray-600 mb-6">
                  <strong>Effective Date:</strong> January 1, 2024
                </p>

                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    1. Acceptance of Terms
                  </h2>
                  <p className="mb-6 text-gray-700">
                    By accessing and using the website of Vasquez Law Firm, PLLC ("we," "our," or
                    "us"), you accept and agree to be bound by these Terms of Service. If you do not
                    agree to these terms, please do not use our website.
                  </p>

                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    2. Legal Services
                  </h2>

                  <h3 className="text-xl font-semibold text-brand-charcoal mt-6 mb-3">
                    2.1 No Attorney-Client Relationship
                  </h3>
                  <p className="mb-6 text-gray-700">
                    The use of this website or communication through this website does not create an
                    attorney-client relationship. An attorney-client relationship is established
                    only through a written engagement agreement signed by both you and our firm.
                  </p>

                  <h3 className="text-xl font-semibold text-brand-charcoal mt-6 mb-3">
                    2.2 No Legal Advice
                  </h3>
                  <p className="mb-6 text-gray-700">
                    The information provided on this website is for general informational purposes
                    only and does not constitute legal advice. Legal advice can only be provided
                    after we have entered into an attorney-client relationship and have fully
                    understood the specific facts of your situation.
                  </p>

                  <h3 className="text-xl font-semibold text-brand-charcoal mt-6 mb-3">
                    2.3 Jurisdiction
                  </h3>
                  <p className="mb-6 text-gray-700">
                    We are licensed to practice law in North Carolina and Florida. We do not provide
                    legal services in jurisdictions where we are not licensed unless we associate
                    with local counsel or obtain special admission.
                  </p>

                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    3. Website Use
                  </h2>

                  <h3 className="text-xl font-semibold text-brand-charcoal mt-6 mb-3">
                    3.1 Permitted Use
                  </h3>
                  <p className="mb-4 text-gray-700">
                    You may use this website only for lawful purposes and in accordance with these
                    Terms. You agree not to:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    <li>Use the website in any way that violates federal, state, or local law</li>
                    <li>
                      Transmit any material that is defamatory, offensive, or otherwise
                      objectionable
                    </li>
                    <li>Attempt to gain unauthorized access to any portion of the website</li>
                    <li>Interfere with or disrupt the website or servers</li>
                    <li>Use automated systems or software to extract data from the website</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-brand-charcoal mt-6 mb-3">
                    3.2 Intellectual Property
                  </h3>
                  <p className="mb-6 text-gray-700">
                    All content on this website, including text, graphics, logos, images, and
                    software, is the property of Vasquez Law Firm, PLLC or its content suppliers and
                    is protected by United States and international copyright laws. You may not
                    reproduce, distribute, modify, or create derivative works without our express
                    written permission.
                  </p>

                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    4. Communications
                  </h2>

                  <h3 className="text-xl font-semibold text-brand-charcoal mt-6 mb-3">
                    4.1 Electronic Communications
                  </h3>
                  <p className="mb-6 text-gray-700">
                    By providing us with your email address, you consent to receive electronic
                    communications from us. These communications may include notices about your case
                    (if you are a client), legal updates, and firm news.
                  </p>

                  <h3 className="text-xl font-semibold text-brand-charcoal mt-6 mb-3">
                    4.2 Confidentiality Warning
                  </h3>
                  <p className="mb-6 text-gray-700">
                    Email and other electronic communications are not necessarily secure. You should
                    not send confidential or sensitive information through this website or by email
                    unless we have established an attorney-client relationship and have agreed on
                    secure communication methods.
                  </p>

                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    5. Disclaimers
                  </h2>

                  <h3 className="text-xl font-semibold text-brand-charcoal mt-6 mb-3">
                    5.1 No Warranties
                  </h3>
                  <p className="mb-6 text-gray-700">
                    This website is provided "as is" and "as available" without any warranties of
                    any kind, either express or implied. We do not warrant that the website will be
                    uninterrupted, error-free, or free of viruses or other harmful components.
                  </p>

                  <h3 className="text-xl font-semibold text-brand-charcoal mt-6 mb-3">
                    5.2 No Guarantee of Results
                  </h3>
                  <p className="mb-6 text-gray-700">
                    Past results do not guarantee future outcomes. Every case is different, and
                    results depend on the unique facts and legal issues of each case. Any
                    testimonials or case results on this website do not constitute a guarantee,
                    warranty, or prediction regarding the outcome of your legal matter.
                  </p>

                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    6. Limitation of Liability
                  </h2>
                  <p className="mb-6 text-gray-700">
                    To the fullest extent permitted by law, Vasquez Law Firm, PLLC and its
                    attorneys, employees, and agents shall not be liable for any direct, indirect,
                    incidental, special, consequential, or punitive damages arising out of or
                    relating to your use of this website.
                  </p>

                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    7. Third-Party Links
                  </h2>
                  <p className="mb-6 text-gray-700">
                    This website may contain links to third-party websites. These links are provided
                    for your convenience only. We do not endorse or assume any responsibility for
                    the content, privacy policies, or practices of any third-party websites.
                  </p>

                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    8. Privacy
                  </h2>
                  <p className="mb-6 text-gray-700">
                    Your use of this website is also governed by our Privacy Policy. Please review
                    our Privacy Policy to understand our practices regarding the collection and use
                    of your personal information.
                  </p>

                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    9. Indemnification
                  </h2>
                  <p className="mb-6 text-gray-700">
                    You agree to indemnify, defend, and hold harmless Vasquez Law Firm, PLLC and its
                    attorneys, employees, and agents from any claims, losses, damages, liabilities,
                    and expenses (including attorney's fees) arising out of your use of this website
                    or violation of these Terms.
                  </p>

                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    10. Governing Law
                  </h2>
                  <p className="mb-6 text-gray-700">
                    These Terms of Service are governed by the laws of the State of North Carolina,
                    without regard to its conflict of law provisions. Any legal action or proceeding
                    relating to your use of this website shall be brought exclusively in the courts
                    of North Carolina.
                  </p>

                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    11. Changes to Terms
                  </h2>
                  <p className="mb-6 text-gray-700">
                    We reserve the right to modify these Terms of Service at any time. Any changes
                    will be effective immediately upon posting on this website. Your continued use
                    of the website after any changes constitutes your acceptance of the new Terms.
                  </p>

                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    12. Severability
                  </h2>
                  <p className="mb-6 text-gray-700">
                    If any provision of these Terms is held to be invalid or unenforceable, the
                    remaining provisions shall continue in full force and effect.
                  </p>

                  <h2 className="text-2xl font-semibold text-brand-charcoal mt-8 mb-4">
                    13. Contact Information
                  </h2>
                  <p className="mb-4 text-gray-700">
                    If you have any questions about these Terms of Service, please contact us at:
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="font-semibold text-brand-charcoal">Vasquez Law Firm, PLLC</p>
                    <p className="text-gray-700">3741 Superior Dr</p>
                    <p className="text-gray-700">Charlotte, NC 28211</p>
                    <p className="text-gray-700">Phone: (704) 358-0470</p>
                    <p className="text-gray-700">Email: leads@vasquezlawfirm.com</p>
                  </div>

                  <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Attorney Advertising:</strong> This website is intended for
                      informational purposes and constitutes attorney advertising. The hiring of a
                      lawyer is an important decision that should not be based solely upon
                      advertisements.
                    </p>
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
