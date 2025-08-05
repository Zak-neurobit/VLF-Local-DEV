import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Deportation Defense Lawyers | Fight Removal Proceedings',
  description:
    'Experienced deportation defense attorneys fighting removal proceedings. We protect your rights and explore all legal options to keep you in the United States.',
  keywords:
    'deportation defense, removal proceedings, immigration court, deportation lawyer, ICE detention',
};

export default function DeportationDefensePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-900 to-red-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-6">Deportation Defense</h1>
            <p className="text-xl mb-8">Fighting to Keep You and Your Family Together</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-red-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
              >
                Emergency Help
              </Link>
              <a
                href="tel:1-800-555-0199"
                className="bg-red-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
              >
                24/7 Hotline: 1-800-555-0199
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Deportation */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Understanding Deportation Proceedings</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Deportation (removal) proceedings are initiated when the government believes you can
                be removed from the United States. These proceedings are serious and require
                immediate legal attention to protect your rights and explore all available defenses.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-8">
                Common Reasons for Deportation Proceedings
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-red-700 mr-2">•</span>
                  Unlawful presence or entry without inspection
                </li>
                <li className="flex items-start">
                  <span className="text-red-700 mr-2">•</span>
                  Visa overstay or violation of visa terms
                </li>
                <li className="flex items-start">
                  <span className="text-red-700 mr-2">•</span>
                  Criminal convictions
                </li>
                <li className="flex items-start">
                  <span className="text-red-700 mr-2">•</span>
                  Immigration fraud or misrepresentation
                </li>
                <li className="flex items-start">
                  <span className="text-red-700 mr-2">•</span>
                  Failure to maintain status
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Defense Strategies */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Defense Strategies We Employ</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3 text-red-800">Legal Relief Options</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Cancellation of Removal</li>
                  <li>• Adjustment of Status</li>
                  <li>• Asylum & Withholding</li>
                  <li>• Convention Against Torture</li>
                  <li>• Prosecutorial Discretion</li>
                  <li>• Voluntary Departure</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3 text-red-800">Procedural Defenses</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Challenging Notice to Appear</li>
                  <li>• Termination of Proceedings</li>
                  <li>• Administrative Closure</li>
                  <li>• Change of Venue</li>
                  <li>• Continuances for Relief</li>
                  <li>• Appeals to BIA/Circuit Court</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              The Deportation Defense Process
            </h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-700 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Initial Assessment</h3>
                  <p className="text-gray-600">
                    We review your Notice to Appear, analyze charges, and identify all possible
                    defenses.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-700 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Master Calendar Hearing</h3>
                  <p className="text-gray-600">
                    We appear with you in court, plead to charges, and request relief from removal.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-700 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Evidence Preparation</h3>
                  <p className="text-gray-600">
                    We gather supporting documents, witness statements, and expert testimony.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-700 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Individual Hearing</h3>
                  <p className="text-gray-600">
                    We present your case, examine witnesses, and argue for relief before the judge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Action */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-red-900">Time is Critical</h2>
            <p className="text-xl text-gray-700 mb-8">
              The sooner you contact us, the more options we have to defend your case. Don't wait -
              every day matters in deportation proceedings.
            </p>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">What to Do If You're Facing Deportation</h3>
              <ol className="text-left space-y-3 max-w-2xl mx-auto">
                <li className="flex items-start">
                  <span className="font-bold text-red-700 mr-2">1.</span>
                  Do not sign any documents without speaking to an attorney
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-red-700 mr-2">2.</span>
                  Keep all immigration documents and notices safe
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-red-700 mr-2">3.</span>
                  Document your time in the U.S. and community ties
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-red-700 mr-2">4.</span>
                  Contact our office immediately for a consultation
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't Face This Alone</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our experienced deportation defense attorneys are ready to fight for you and your
            family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-red-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Get Help Now
            </Link>
            <a
              href="tel:1-800-555-0199"
              className="bg-red-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
            >
              Call 24/7: 1-800-555-0199
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
