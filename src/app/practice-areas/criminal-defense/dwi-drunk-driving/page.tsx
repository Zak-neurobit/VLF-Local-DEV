import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Phone, AlertTriangle, Shield, Scale, Clock, Car } from 'lucide-react';
// Dynamic import for client-side only rendering
const ChatWidget = dynamic(() => import('@/components/ChatWidget').then(mod => mod.ChatWidget), {
  ssr: false,
});
// Dynamic import for client-side only rendering
const VoiceAssistant = dynamic(() => import('@/components/VirtualAssistant/VirtualAssistantWrapper').then(mod => mod.VirtualAssistantWrapper), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'DWI/DUI Defense Attorney - YO PELEO POR TI™ | Vasquez Law Firm',
  description:
    'Aggressive DWI/DUI defense lawyers. Protect your license & freedom. 24/7 emergency response. License restoration help. Call 1-844-YO-PELEO now!',
  keywords: [
    'DWI attorney',
    'DUI lawyer',
    'drunk driving defense',
    'license restoration',
    'breathalyzer test',
    'field sobriety test',
    'North Carolina DWI defense',
  ],
  openGraph: {
    title: 'DWI/DUI Defense - I FIGHT FOR YOUR FREEDOM | Vasquez Law Firm',
    description:
      'Aggressive DWI/DUI defense attorneys. Protect your driving privileges and freedom. Emergency legal response available 24/7.',
    images: [
      {
        url: '/images/dwi-defense.jpg',
      },
    ],
  },
};

export default function DWIDefensePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Emergency Alert Banner */}
      <div className="bg-red-600 text-white py-2 text-center animate-pulse">
        <p className="font-semibold">
          🚨 DWI ARREST? Call IMMEDIATELY: 1-844-YO-PELEO - Your License is at Risk! 🚨
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Car className="w-16 h-16 text-[#C9974D]" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-[#C9974D]">YO PELEO POR TI™</span>
              <br />
              DWI/DUI Defense
            </h1>
            <p className="text-xl md:text-2xl mb-6 font-semibold">
              Protecting Your License • Defending Your Freedom
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Time is critical in DWI cases. You have only 30 days to request a hearing to save your
              license. Our aggressive defense team is ready to fight for you now.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 p-4 rounded-lg">
                <AlertTriangle className="w-8 h-8 text-[#C9974D] mx-auto mb-2" />
                <p className="font-semibold">30-Day Deadline</p>
                <p className="text-sm">Act fast to save your license</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <Shield className="w-8 h-8 text-[#C9974D] mx-auto mb-2" />
                <p className="font-semibold">Aggressive Defense</p>
                <p className="text-sm">Challenge every aspect</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <Scale className="w-8 h-8 text-[#C9974D] mx-auto mb-2" />
                <p className="font-semibold">License Restoration</p>
                <p className="text-sm">Get back on the road</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="tel:+18449673536"
                className="bg-[#C9974D] text-[#6B1F2E] px-8 py-4 rounded-md font-bold text-lg hover:bg-[#D4A366] transition-colors shadow-lg"
              >
                EMERGENCY DWI HELP
              </Link>
              <Link
                href="/contact"
                className="border-2 border-[#C9974D] text-[#C9974D] px-8 py-4 rounded-md font-bold text-lg hover:bg-[#C9974D] hover:text-[#6B1F2E] transition-colors shadow-lg"
              >
                Free DWI Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Notice */}
      <section className="py-12 bg-red-50 border-l-8 border-red-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start">
            <AlertTriangle className="w-12 h-12 text-red-500 mr-4 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-red-800 mb-2">
                CRITICAL: 30-Day Deadline to Save Your License
              </h2>
              <p className="text-red-700 text-lg mb-4">
                If you\&apos;ve been arrested for DWI in North Carolina, you have only 30 days from your
                arrest date to request a hearing with the DMV to contest your license suspension.
                Missing this deadline means automatic license suspension.
              </p>
              <div className="bg-red-100 p-4 rounded-lg">
                <p className="text-red-800 font-semibold">
                  Don&apos;t wait - call us immediately at 1-844-YO-PELEO to protect your driving
                  privileges!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-[#6B1F2E] mb-6">
                Aggressive DWI/DUI Defense in North Carolina
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="text-xl mb-6">
                  A DWI arrest can destroy your life - your job, your family, your future. But an
                  arrest is not a conviction. With aggressive legal representation, you can fight
                  DWI charges and protect your freedom.
                </p>

                <p className="mb-6">
                  At Vasquez Law Firm, we understand that good people make mistakes, and we&apos;re here
                  to fight for you when the stakes are highest. Our experienced DWI defense
                  attorneys have successfully defended hundreds of clients against drunk driving
                  charges throughout North Carolina.
                </p>

                <h3 className="text-2xl font-bold text-[#6B1F2E] mb-4">
                  Why DWI Cases Require Immediate Action
                </h3>
                <div className="bg-yellow-50 p-6 rounded-lg mb-6 border-l-4 border-yellow-400">
                  <h4 className="text-lg font-bold text-yellow-800 mb-2">
                    Two Separate Proceedings:
                  </h4>
                  <ul className="list-disc pl-6 text-yellow-700">
                    <li>
                      <strong>Criminal Case:</strong> DWI charges in criminal court
                    </li>
                    <li>
                      <strong>Civil Case:</strong> DMV license suspension (30-day deadline)
                    </li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-[#6B1F2E] mb-4">
                  Our Aggressive DWI Defense Strategies
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-[#6B1F2E] mb-3">
                      Challenge the Traffic Stop
                    </h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Lack of reasonable suspicion</li>
                      <li>• Invalid checkpoint procedures</li>
                      <li>• Constitutional violations</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-[#6B1F2E] mb-3">
                      Attack Field Sobriety Tests
                    </h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Improper administration</li>
                      <li>• Medical conditions affecting performance</li>
                      <li>• Environmental factors</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-[#6B1F2E] mb-3">
                      Challenge Breathalyzer Results
                    </h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Machine calibration issues</li>
                      <li>• Operator certification problems</li>
                      <li>• Medical conditions affecting results</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-[#6B1F2E] mb-3">Blood Test Challenges</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Chain of custody issues</li>
                      <li>• Lab procedures and contamination</li>
                      <li>• Warrant requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#6B1F2E] text-white p-6 rounded-lg sticky top-4 mb-6">
                <h3 className="text-xl font-bold mb-4 text-center">🚨 DWI EMERGENCY 🚨</h3>
                <div className="text-center mb-4">
                  <Clock className="w-8 h-8 text-[#C9974D] mx-auto mb-2" />
                  <p className="text-lg font-semibold">30-Day Deadline!</p>
                  <p className="text-sm">Don&apos;t lose your license</p>
                </div>

                <div className="space-y-4 mb-6">
                  <Link
                    href="tel:+18449673536"
                    className="flex items-center justify-center bg-[#C9974D] text-[#6B1F2E] p-3 rounded-md font-bold hover:bg-[#D4A366] transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    1-844-YO-PELEO
                  </Link>
                </div>

                <div className="border-t border-white/20 pt-4">
                  <h4 className="font-bold mb-2">Immediate DWI Services:</h4>
                  <ul className="text-sm space-y-1">
                    <li>✓ DMV hearing request</li>
                    <li>✓ License protection</li>
                    <li>✓ Breathalyzer challenge</li>
                    <li>✓ Field sobriety test defense</li>
                    <li>✓ License restoration help</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="text-lg font-bold text-[#6B1F2E] mb-4">NC DWI Penalties</h4>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold text-red-600">First Offense DWI:</p>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Up to 2 years jail</li>
                      <li>• $4,000+ in fines</li>
                      <li>• 1-year license suspension</li>
                      <li>• Ignition interlock device</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-red-600">Multiple Offenses:</p>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Felony charges possible</li>
                      <li>• Permanent license revocation</li>
                      <li>• Mandatory jail time</li>
                      <li>• Vehicle forfeiture</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DWI Process Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            What Happens After a DWI Arrest
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-lg font-bold text-[#6B1F2E] mb-2">Arrest</h3>
              <p className="text-gray-600 text-sm">
                Police arrest and process you. License confiscated if you refuse or fail breath
                test.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-lg font-bold text-[#6B1F2E] mb-2">30 Days</h3>
              <p className="text-gray-600 text-sm">
                You have exactly 30 days to request DMV hearing or lose license automatically.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-lg font-bold text-[#6B1F2E] mb-2">Court Date</h3>
              <p className="text-gray-600 text-sm">
                Criminal court proceedings begin. This is separate from DMV proceedings.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="text-lg font-bold text-[#6B1F2E] mb-2">Resolution</h3>
              <p className="text-gray-600 text-sm">
                With aggressive defense, charges may be dismissed, reduced, or penalties minimized.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">DWI Defense FAQs</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-[#C9974D]">
              <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">
                Should I have refused the breathalyzer?
              </h3>
              <p className="text-gray-700">
                North Carolina has &quot;implied consent&quot; laws - refusing can result in automatic license
                suspension. However, this doesn\&apos;t mean you can&apos;t fight the charges. We can
                challenge both the refusal and any underlying DWI charges.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-[#C9974D]">
              <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">Can I get a DWI dismissed?</h3>
              <p className="text-gray-700">
                Yes! Many DWI cases can be dismissed or significantly reduced through aggressive
                defense strategies. We challenge everything - the traffic stop, field sobriety
                tests, breathalyzer accuracy, and police procedures.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-[#C9974D]">
              <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">
                How can I get my license back?
              </h3>
              <p className="text-gray-700">
                We help with both DMV hearings and license restoration processes. This includes
                challenging suspensions, obtaining limited driving privileges, and navigating
                ignition interlock requirements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-[#C9974D]">
              <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">
                What if this is my second or third DWI?
              </h3>
              <p className="text-gray-700">
                Multiple DWI offenses carry severe penalties including felony charges. However,
                aggressive defense is even more critical. We fight to prevent enhanced penalties and
                protect you from the harshest consequences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#6B1F2E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Don&apos;t Let a DWI Destroy Your Life</h2>
          <p className="text-xl mb-6">
            Every day you wait makes your case harder to defend. The 30-day deadline to save your
            license is approaching fast.
          </p>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Our aggressive DWI defense team has successfully defended hundreds of clients. We know
            how to challenge breathalyzer tests, field sobriety tests, and police procedures. Let us
            fight for your freedom.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="tel:+18449673536"
              className="bg-[#C9974D] text-[#6B1F2E] px-8 py-4 rounded-md font-bold text-lg hover:bg-[#D4A366] transition-colors"
            >
              Call 1-844-YO-PELEO NOW
            </Link>
            <Link
              href="/contact"
              className="border-2 border-[#C9974D] text-[#C9974D] px-8 py-4 rounded-md font-bold text-lg hover:bg-[#C9974D] hover:text-[#6B1F2E] transition-colors"
            >
              Free DWI Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* AI-Enhanced Features */}
      <ChatWidget userId="dwi-defense-page" language="en" />
      <VoiceAssistant language="en" />

      {/* Structured Data for SEO */}
      <Script
        id="practice-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Criminal Defense Dwi Drunk Driving Legal Services',
            provider: {
              '@type': 'LegalService',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
              telephone: '+1-919-537-8722',
              priceRange: '$$',
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina',
            },
            url: 'https://www.vasquezlawfirm.com/practice-areas/criminal-defense/dwi-drunk-driving/page',
            description:
              'Criminal Defense Dwi Drunk Driving legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
