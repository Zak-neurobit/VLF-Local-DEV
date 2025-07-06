import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Phone, MapPin, ArrowRight, CheckCircle, AlertTriangle, Truck, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Truck Accident Lawyers NC | 18-Wheeler Injury Attorneys | Vasquez Law Firm',
  description:
    'Expert truck accident attorneys in Raleigh, Charlotte, Smithfield & Orlando. Serious injuries from 18-wheeler crashes. Maximum compensation. Free consultation.',
  keywords: [
    'truck accident lawyer',
    '18-wheeler attorney',
    'semi truck crash',
    'commercial vehicle accident',
    'trucking accident',
    'CDL violations',
    'Raleigh NC',
    'Charlotte NC',
    'Smithfield NC',
  ],
  openGraph: {
    title: 'Truck Accident Lawyers NC | 18-Wheeler Injury Attorneys | Vasquez Law Firm',
    description:
      'Expert truck accident attorneys fighting for victims of commercial truck crashes. Maximum compensation for serious injuries.',
    type: 'website',
    images: [
      {
        url: '/images/truck-accident-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Truck Accident Lawyers NC',
      },
    ],
  },
};

export default function TruckAccidentsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <Link href="/" className="text-burgundy-700 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/practice-areas" className="text-burgundy-700 hover:underline">
              Practice Areas
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/practice-areas/personal-injury"
              className="text-burgundy-700 hover:underline"
            >
              Personal Injury
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">Truck Accidents</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-700 to-burgundy-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              North Carolina Truck Accident Lawyers
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gold-400 font-semibold">
              YO PELEO POR TI™ - I FIGHT FOR YOU
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              When 80,000-pound trucks collide with passenger vehicles, the results are
              catastrophic. Our experienced truck accident attorneys fight trucking companies and
              their insurers to secure maximum compensation for your serious injuries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                Free Truck Accident Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:1-844-967-3536"
                className="inline-flex items-center px-8 py-4 bg-white text-burgundy-900 font-bold rounded-full hover:bg-gray-100 transition-colors"
              >
                <Phone className="mr-2 w-5 h-5" />
                1-844-YO-PELEO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Action Section */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-100 border-l-4 border-red-500 p-6 mb-8">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-red-800">
                  Critical: Trucking Companies Act Fast - So Should You
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-red-800 mb-2">
                    They&apos;re Already Working Against You:
                  </h3>
                  <ul className="text-red-700 space-y-1">
                    <li>✓ Investigators at the scene within hours</li>
                    <li>✓ Evidence being collected or destroyed</li>
                    <li>✓ Witness statements being taken</li>
                    <li>✓ Black box data being downloaded</li>
                    <li>✓ Defense strategies being planned</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-800 mb-2">Protect Your Rights NOW:</h3>
                  <ul className="text-red-700 space-y-1">
                    <li>• Don&apos;t give ANY statements</li>
                    <li>• Don&apos;t sign ANYTHING</li>
                    <li>• Document everything possible</li>
                    <li>• Get immediate medical care</li>
                    <li>• Call us before talking to anyone</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Why Truck Accidents Are Different
                </h2>
                <p className="text-gray-700 mb-6">
                  Truck accidents aren&apos;t just &quot;bigger car accidents.&quot; The physics, regulations,
                  and legal complexities make these cases fundamentally different - and far more
                  serious.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Truck className="w-6 h-6 text-burgundy-700 mt-1" />
                      <div>
                        <h4 className="text-lg font-bold text-burgundy-900 mb-3">
                          Devastating Physics
                        </h4>
                        <ul className="text-gray-700 space-y-1">
                          <li>• 80,000 lbs vs 4,000 lbs car</li>
                          <li>• 40% longer stopping distance</li>
                          <li>• Massive blind spots</li>
                          <li>• Jackknife and rollover risks</li>
                          <li>• Underride dangers</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Scale className="w-6 h-6 text-burgundy-700 mt-1" />
                      <div>
                        <h4 className="text-lg font-bold text-burgundy-900 mb-3">
                          Complex Liability
                        </h4>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Multiple defendants</li>
                          <li>• Federal regulations</li>
                          <li>• Insurance minimums $750K+</li>
                          <li>• Corporate structures</li>
                          <li>• Interstate commerce laws</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
                  <h3 className="text-xl font-bold text-yellow-800 mb-2">
                    North Carolina Truck Accident Statistics
                  </h3>
                  <ul className="text-yellow-700 space-y-2">
                    <li>• Over 11,000 truck crashes annually in NC</li>
                    <li>• 150+ fatalities per year from truck accidents</li>
                    <li>• 3,000+ serious injuries annually</li>
                    <li>• I-95, I-40, and I-85 are the deadliest corridors</li>
                    <li>• Wake, Mecklenburg, and Guilford counties lead in truck crashes</li>
                  </ul>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Common Causes of Truck Accidents in North Carolina
                </h2>
                <p className="text-gray-700 mb-6">
                  Our investigations often reveal multiple factors contributing to truck crashes:
                </p>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-500">
                    <h3 className="text-xl font-bold text-red-800 mb-3">Driver Violations</h3>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Hours of Service violations - driving beyond legal limits</li>
                      <li>• Distracted driving - phones, GPS, paperwork</li>
                      <li>• Substance abuse - drugs, alcohol, stimulants</li>
                      <li>• Speeding to meet deadlines</li>
                      <li>• Improper lane changes</li>
                      <li>• Following too closely</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
                    <h3 className="text-xl font-bold text-orange-800 mb-3">Company Negligence</h3>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Inadequate driver training</li>
                      <li>• Pushing unrealistic schedules</li>
                      <li>• Poor vehicle maintenance</li>
                      <li>• Negligent hiring practices</li>
                      <li>• Falsified logbooks</li>
                      <li>• Overloaded trucks</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-xl font-bold text-blue-800 mb-3">Equipment Failures</h3>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Brake system failures</li>
                      <li>• Tire blowouts</li>
                      <li>• Steering malfunctions</li>
                      <li>• Trailer coupling failures</li>
                      <li>• Defective parts</li>
                      <li>• Improper cargo securing</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Federal Trucking Regulations We Use to Build Your Case
                </h2>
                <p className="text-gray-700 mb-6">
                  The Federal Motor Carrier Safety Administration (FMCSA) sets strict rules.
                  Violations strengthen your case:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border-2 border-burgundy-200 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-burgundy-900 mb-3">
                      Hours of Service Rules
                    </h3>
                    <ul className="text-gray-700 space-y-1">
                      <li>• 11-hour driving limit</li>
                      <li>• 14-hour on-duty limit</li>
                      <li>• Required 30-minute breaks</li>
                      <li>• 60/70-hour weekly limits</li>
                      <li>• Electronic logging devices (ELD)</li>
                    </ul>
                  </div>

                  <div className="bg-white border-2 border-burgundy-200 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-burgundy-900 mb-3">
                      Safety Requirements
                    </h3>
                    <ul className="text-gray-700 space-y-1">
                      <li>• CDL qualifications</li>
                      <li>• Drug & alcohol testing</li>
                      <li>• Medical examinations</li>
                      <li>• Vehicle inspections</li>
                      <li>• Cargo securement rules</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Types of Truck Accident Cases We Handle
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">Vehicle Types</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>18-wheelers/Semi-trucks</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Tractor-trailers</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Delivery trucks (FedEx, UPS, Amazon)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Dump trucks</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Tanker trucks</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Garbage trucks</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">Accident Types</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Jackknife accidents</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Underride crashes</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Rollover accidents</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Wide turn collisions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Blind spot accidents</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Cargo spills</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Common Truck Accident Injuries
                </h2>
                <p className="text-gray-700 mb-6">
                  The massive force in truck collisions causes severe, life-altering injuries:
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-red-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-red-800 mb-3">Catastrophic Injuries</h3>
                    <ul className="text-red-700 space-y-1">
                      <li>• Traumatic brain injuries</li>
                      <li>• Spinal cord damage</li>
                      <li>• Paralysis</li>
                      <li>• Amputations</li>
                      <li>• Multiple fractures</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-orange-800 mb-3">Internal Injuries</h3>
                    <ul className="text-orange-700 space-y-1">
                      <li>• Organ damage</li>
                      <li>• Internal bleeding</li>
                      <li>• Punctured lungs</li>
                      <li>• Ruptured spleen</li>
                      <li>• Abdominal injuries</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-yellow-800 mb-3">Long-Term Impact</h3>
                    <ul className="text-yellow-700 space-y-1">
                      <li>• Chronic pain</li>
                      <li>• PTSD</li>
                      <li>• Permanent disability</li>
                      <li>• Disfigurement</li>
                      <li>• Wrongful death</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Who We Hold Accountable
                </h2>
                <p className="text-gray-700 mb-6">
                  Truck accident cases often involve multiple liable parties. We pursue all sources
                  of compensation:
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">Truck Driver</h3>
                      <p className="text-gray-700">
                        Direct liability for negligent driving, violations, or recklessness.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">Trucking Company</h3>
                      <p className="text-gray-700">
                        Vicarious liability, negligent hiring, training, supervision, or
                        maintenance.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">Cargo Companies</h3>
                      <p className="text-gray-700">
                        Improper loading, overloading, or unsecured cargo causing accidents.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Maintenance Companies
                      </h3>
                      <p className="text-gray-700">
                        Failed inspections, improper repairs, or negligent maintenance.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Parts Manufacturers
                      </h3>
                      <p className="text-gray-700">
                        Defective brakes, tires, or other components causing failures.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Our Truck Accident Investigation Process
                </h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Immediate Action (First 48 Hours)
                    </h3>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Send investigators to accident scene</li>
                      <li>• Preserve black box/ECM data</li>
                      <li>• Photograph vehicles and scene</li>
                      <li>• Interview witnesses</li>
                      <li>• Send spoliation letters</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">Deep Investigation</h3>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Obtain driver logs and records</li>
                      <li>• Review maintenance history</li>
                      <li>• Analyze company safety records</li>
                      <li>• Check prior violations</li>
                      <li>• Hire accident reconstruction experts</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">Building Your Case</h3>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Medical expert testimony</li>
                      <li>• Economic loss calculations</li>
                      <li>• Life care planning</li>
                      <li>• Trucking industry experts</li>
                      <li>• Aggressive negotiations or trial</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Compensation in North Carolina Truck Accident Cases
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">Economic Damages</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• All medical expenses</li>
                      <li>• Future medical care</li>
                      <li>• Lost wages</li>
                      <li>• Loss of earning capacity</li>
                      <li>• Property damage</li>
                      <li>• Home modifications</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">
                      Non-Economic Damages
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Pain and suffering</li>
                      <li>• Emotional distress</li>
                      <li>• Loss of enjoyment of life</li>
                      <li>• Permanent disability</li>
                      <li>• Disfigurement</li>
                      <li>• Loss of consortium</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-6 mt-6">
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    North Carolina&apos;s Contributory Negligence Rule
                  </h3>
                  <p className="text-green-700">
                    NC follows pure contributory negligence - if you&apos;re even 1% at fault, you
                    may be barred from recovery. This makes having an experienced truck accident
                    attorney critical. We fight these unfair blame tactics and prove the truck
                    driver/company was 100% responsible.
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Why Choose Vasquez Law Firm for Your Truck Accident Case?
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">
                      Resources & Experience
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Financial resources to fight big trucking companies</li>
                      <li>• Network of trucking experts</li>
                      <li>• Accident reconstruction specialists</li>
                      <li>• Understanding of federal regulations</li>
                      <li>• Proven trial experience</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">
                      Client-Focused Approach
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• No upfront costs - we advance all expenses</li>
                      <li>• Direct attorney communication</li>
                      <li>• Bilingual team (English/Spanish)</li>
                      <li>• 24/7 availability</li>
                      <li>• Maximum compensation focus</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      How much is my truck accident case worth?
                    </h3>
                    <p className="text-gray-700">
                      Case values depend on injury severity, medical costs, lost wages, and impact
                      on your life. Truck accidents often result in six or seven-figure settlements
                      due to severe injuries and high insurance limits. We evaluate each case
                      individually.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      How long do I have to file a truck accident lawsuit in NC?
                    </h3>
                    <p className="text-gray-700">
                      North Carolina has a 3-year statute of limitations for personal injury.
                      However, evidence disappears quickly in truck cases. Contact us immediately to
                      preserve crucial evidence and protect your rights.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      What if the truck driver wasn&apos;t ticketed?
                    </h3>
                    <p className="text-gray-700">
                      Police don&apos;t always identify all violations at the scene. Our investigation
                      often reveals Hours of Service violations, maintenance issues, or other
                      negligence not apparent to responding officers.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Can I still recover if I wasn&apos;t wearing a seatbelt?
                    </h3>
                    <p className="text-gray-700">
                      While this complicates the case in NC, we can often show your injuries would
                      have occurred regardless, or that the truck driver&apos;s extreme negligence
                      outweighs any contributory negligence arguments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-burgundy-900 mb-4">
              Don&apos;t Let Trucking Companies Bully You
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              You&apos;re up against billion-dollar trucking companies with teams of lawyers. Level the
              playing field with experienced truck accident attorneys who know how to fight back and
              win. Call now for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-burgundy-700 text-white font-bold rounded-full hover:bg-burgundy-800 transition-colors"
              >
                Get Your Free Case Review
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:1-844-967-3536"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call: 1-844-YO-PELEO
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <MapPin className="w-6 h-6 text-burgundy-700 mx-auto mb-2" />
                <p className="text-sm font-medium">Raleigh, NC</p>
                <p className="text-xs text-gray-600">(919) 246-8831</p>
              </div>
              <div>
                <MapPin className="w-6 h-6 text-burgundy-700 mx-auto mb-2" />
                <p className="text-sm font-medium">Charlotte, NC</p>
                <p className="text-xs text-gray-600">(704) 266-2998</p>
              </div>
              <div>
                <MapPin className="w-6 h-6 text-burgundy-700 mx-auto mb-2" />
                <p className="text-sm font-medium">Smithfield, NC</p>
                <p className="text-xs text-gray-600">(919) 209-8788</p>
              </div>
              <div>
                <MapPin className="w-6 h-6 text-burgundy-700 mx-auto mb-2" />
                <p className="text-sm font-medium">Orlando, FL</p>
                <p className="text-xs text-gray-600">(407) 647-1900</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data for SEO */}
      <Script
        id="practice-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Personal Injury Truck Accidents Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/personal-injury/truck-accidents/page',
            description:
              'Personal Injury Truck Accidents legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
