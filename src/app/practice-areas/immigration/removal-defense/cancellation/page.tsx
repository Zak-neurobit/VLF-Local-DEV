import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cancellation of Removal Lawyers | Stop Deportation',
  description: 'Experienced attorneys helping long-term residents qualify for cancellation of removal. Stop deportation and get your green card. Free consultation.',
  keywords: 'cancellation of removal, 42A, 42B, stop deportation, immigration court relief, green card through cancellation',
};

export default function CancellationOfRemovalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-900 to-red-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-6">Cancellation of Removal</h1>
            <p className="text-xl mb-8">
              Turn Your Deportation Case into a Path to Legal Status
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-red-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
              >
                Check Eligibility
              </Link>
              <a
                href="tel:1-800-555-0199"
                className="bg-red-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
              >
                Call: 1-800-555-0199
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Cancellation */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Types of Cancellation of Removal</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-red-800">For LPRs (42A)</h3>
                <p className="text-gray-600 mb-4">
                  Lawful Permanent Residents facing removal may qualify if they meet:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    5 years as an LPR
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    7 years continuous residence
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    No aggravated felony conviction
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Merit a favorable discretion
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-red-800">For Non-LPRs (42B)</h3>
                <p className="text-gray-600 mb-4">
                  Non-permanent residents may qualify if they can show:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    10 years continuous physical presence
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Good moral character
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    USC/LPR spouse, parent, or child
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Exceptional hardship to qualifying relative
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hardship Factors */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Proving Exceptional Hardship</h2>
            <p className="text-lg text-gray-600 text-center mb-8">
              We help you document and present compelling evidence of hardship:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-red-800">Medical Hardship</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Serious medical conditions</li>
                  <li>• Need for specialized care</li>
                  <li>• Mental health impact</li>
                  <li>• Lack of care in home country</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-red-800">Financial Hardship</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Loss of income</li>
                  <li>• Educational disruption</li>
                  <li>• Property ownership</li>
                  <li>• Economic conditions abroad</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-red-800">Family Hardship</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Family separation</li>
                  <li>• Children's education</li>
                  <li>• Elderly parent care</li>
                  <li>• Community ties</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Rate */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Our Track Record</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-red-50 p-8 rounded-lg">
                <div className="text-5xl font-bold text-red-700 mb-2">500+</div>
                <p className="text-gray-600">Cancellation Cases Won</p>
              </div>
              <div className="bg-red-50 p-8 rounded-lg">
                <div className="text-5xl font-bold text-red-700 mb-2">92%</div>
                <p className="text-gray-600">Success Rate</p>
              </div>
              <div className="bg-red-50 p-8 rounded-lg">
                <div className="text-5xl font-bold text-red-700 mb-2">15+</div>
                <p className="text-gray-600">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">The Cancellation Process</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-red-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold mb-1">Eligibility Assessment</h3>
                  <p className="text-gray-600 text-sm">
                    We analyze your case to determine if you meet the strict requirements.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-red-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold mb-1">Document Collection</h3>
                  <p className="text-gray-600 text-sm">
                    Gather evidence of continuous presence, hardship, and positive factors.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-red-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold mb-1">Application Preparation</h3>
                  <p className="text-gray-600 text-sm">
                    File Form EOIR-42A or 42B with comprehensive supporting documentation.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-red-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold mb-1">Court Preparation</h3>
                  <p className="text-gray-600 text-sm">
                    Prepare testimony, witnesses, and evidence presentation strategy.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-red-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  5
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold mb-1">Merits Hearing</h3>
                  <p className="text-gray-600 text-sm">
                    Present your case before the immigration judge with compelling advocacy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">You May Qualify for a Green Card</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't let deportation end your American dream. Cancellation of removal could be your path to permanent residence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-red-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Free Case Evaluation
            </Link>
            <a
              href="tel:1-800-555-0199"
              className="bg-red-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
            >
              Call Now: 1-800-555-0199
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}