import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Immigration Bond Lawyers | ICE Detention Release',
  description: 'Get out of immigration detention. Expert bond hearing attorneys fighting for your release. We handle bond motions, appeals, and emergency hearings.',
  keywords: 'immigration bond, ICE detention, bond hearing, detention release, immigration bond lawyer, bond redetermination',
};

export default function BondHearingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-900 to-red-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-6">Immigration Bond Hearings</h1>
            <p className="text-xl mb-8">
              Fighting for Your Freedom While Your Case Proceeds
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-red-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
              >
                Emergency Bond Help
              </Link>
              <a
                href="tel:1-800-555-0199"
                className="bg-red-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
              >
                24/7: 1-800-555-0199
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Detention */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Understanding Immigration Detention</h2>
            <p className="text-lg text-gray-600 mb-6">
              When ICE detains someone, they may be eligible for release on bond while their immigration case continues. 
              Our attorneys fight to secure your release at the lowest possible bond amount.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-800">Who Can Get Bond?</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Non-citizens in removal proceedings
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Those without certain criminal convictions
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Not arriving aliens or terrorism-related
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Not subject to mandatory detention
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-800">Bond Amounts</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Minimum bond: $1,500
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Average bonds: $5,000 - $15,000
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    High bonds: $25,000+
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Factors: flight risk, danger, ties
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bond Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">The Bond Hearing Process</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-700 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Initial Assessment</h3>
                  <p className="text-gray-600">
                    We review detention status, criminal history, and bond eligibility within hours.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-700 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Request Hearing</h3>
                  <p className="text-gray-600">
                    File motion for bond redetermination hearing before immigration judge.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-700 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Gather Evidence</h3>
                  <p className="text-gray-600">
                    Collect support letters, employment verification, and community ties documentation.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-700 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Present Case</h3>
                  <p className="text-gray-600">
                    Argue for release or bond reduction, presenting evidence and witnesses.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-700 text-white rounded-full flex items-center justify-center font-bold">
                  5
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Secure Release</h3>
                  <p className="text-gray-600">
                    Post bond and coordinate release from detention facility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Factors */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Factors We Present for Lower Bonds</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl mb-3">🏠</div>
                <h3 className="text-lg font-bold mb-3 text-red-800">Community Ties</h3>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• U.S. citizen family members</li>
                  <li>• Home ownership/rental</li>
                  <li>• Length of residence</li>
                  <li>• Community involvement</li>
                  <li>• Religious affiliations</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl mb-3">💼</div>
                <h3 className="text-lg font-bold mb-3 text-red-800">Employment History</h3>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Current employment</li>
                  <li>• Employment letters</li>
                  <li>• Tax payment history</li>
                  <li>• Business ownership</li>
                  <li>• Financial stability</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl mb-3">⚖️</div>
                <h3 className="text-lg font-bold mb-3 text-red-800">Legal Factors</h3>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Relief eligibility</li>
                  <li>• No flight risk</li>
                  <li>• Court appearance history</li>
                  <li>• Rehabilitation evidence</li>
                  <li>• Minimal criminal history</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detention Centers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">We Serve All Detention Centers</h2>
            <p className="text-lg text-gray-600 text-center mb-8">
              Our attorneys regularly appear at immigration courts and detention facilities nationwide:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow text-center">
                <p className="font-semibold">Stewart Detention Center</p>
                <p className="text-sm text-gray-600">Georgia</p>
              </div>
              <div className="bg-white p-4 rounded shadow text-center">
                <p className="font-semibold">Adelanto ICE Facility</p>
                <p className="text-sm text-gray-600">California</p>
              </div>
              <div className="bg-white p-4 rounded shadow text-center">
                <p className="font-semibold">South Texas Detention</p>
                <p className="text-sm text-gray-600">Texas</p>
              </div>
              <div className="bg-white p-4 rounded shadow text-center">
                <p className="font-semibold">Northwest Detention</p>
                <p className="text-sm text-gray-600">Washington</p>
              </div>
              <div className="bg-white p-4 rounded shadow text-center">
                <p className="font-semibold">Elizabeth Contract</p>
                <p className="text-sm text-gray-600">New Jersey</p>
              </div>
              <div className="bg-white p-4 rounded shadow text-center">
                <p className="font-semibold">Aurora Contract</p>
                <p className="text-sm text-gray-600">Colorado</p>
              </div>
            </div>
            <p className="text-center mt-6 text-gray-600">
              And many more facilities across the United States
            </p>
          </div>
        </div>
      </section>

      {/* Urgent Action */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-red-900">Act Fast - Every Day Matters</h2>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-center">What You Need to Know</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-3 text-red-800">For Detained Individuals:</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• You have the right to a bond hearing</li>
                    <li>• Do not sign any documents</li>
                    <li>• Request to speak with an attorney</li>
                    <li>• Know your alien registration number</li>
                    <li>• Keep all paperwork safe</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-3 text-red-800">For Family Members:</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Locate your loved one in detention</li>
                    <li>• Gather important documents</li>
                    <li>• Find character references</li>
                    <li>• Prepare bond payment options</li>
                    <li>• Contact us immediately</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Rate */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Our Bond Hearing Success</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-red-50 p-6 rounded-lg">
                <div className="text-4xl font-bold text-red-700 mb-2">2,500+</div>
                <p className="text-gray-600">Clients Released</p>
              </div>
              <div className="bg-red-50 p-6 rounded-lg">
                <div className="text-4xl font-bold text-red-700 mb-2">85%</div>
                <p className="text-gray-600">Bond Granted</p>
              </div>
              <div className="bg-red-50 p-6 rounded-lg">
                <div className="text-4xl font-bold text-red-700 mb-2">24/7</div>
                <p className="text-gray-600">Emergency Response</p>
              </div>
              <div className="bg-red-50 p-6 rounded-lg">
                <div className="text-4xl font-bold text-red-700 mb-2">$7,500</div>
                <p className="text-gray-600">Average Bond Reduction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't Wait in Detention</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Every day in detention is a day away from your family. Our attorneys are ready to fight for your release now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-red-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Get Emergency Help
            </Link>
            <a
              href="tel:1-800-555-0199"
              className="bg-red-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
            >
              Call 24/7: 1-800-555-0199
            </a>
          </div>
          <p className="mt-6 text-sm">
            We accept calls from detention facilities and provide immediate assistance
          </p>
        </div>
      </section>
    </div>
  );
}