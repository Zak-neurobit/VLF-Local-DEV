import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import {
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  HardHat,
  Shield,
  Hammer,
  AlertCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Construction Site Injury Lawyers NC & FL | Workers Comp | Vasquez Law Firm',
  description:
    'Expert construction accident attorneys in Raleigh, Charlotte, Smithfield & Orlando. Falls, equipment injuries, electrocutions. Get workers comp benefits.',
  keywords: [
    'construction accident lawyer',
    'construction site injury',
    'workers compensation',
    'scaffold falls',
    'equipment accidents',
    'OSHA violations',
    'Raleigh NC',
    'Charlotte NC',
    'Orlando FL',
  ],
  openGraph: {
    title: 'Construction Site Injury Lawyers | Workers Comp | Vasquez Law Firm',
    description:
      'Expert construction accident attorneys fighting for injured construction workers rights and benefits.',
    type: 'website',
    images: [
      {
        url: '/images/construction-site-injury-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Construction Site Injury Lawyers',
      },
    ],
  },
};

export default function ConstructionSiteInjuriesPage() {
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
              href="/practice-areas/workers-compensation"
              className="text-burgundy-700 hover:underline"
            >
              Workers Compensation
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">Construction Site Injuries</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-700 to-burgundy-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Construction Site Injury Lawyers
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gold-400 font-semibold">
              YO PELEO POR TI™ - I FIGHT FOR YOU
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Construction workers face dangerous conditions daily. When safety failures lead to
              serious injuries, our experienced attorneys fight for your workers&apos; compensation
              benefits and explore third-party claims for maximum compensation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                Free Construction Injury Consultation
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
      <section className="py-16 bg-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 mb-8">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-8 h-8 text-yellow-600 mr-3" />
                <h2 className="text-2xl font-bold text-yellow-800">
                  Critical Steps After Construction Accidents
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-yellow-800 mb-2">Immediate Actions:</h3>
                  <ul className="text-yellow-700 space-y-1">
                    <li>✓ Report injury to supervisor immediately</li>
                    <li>✓ Get emergency medical treatment</li>
                    <li>✓ Document the accident scene</li>
                    <li>✓ Get witness contact information</li>
                    <li>✓ File workers&apos; comp claim within 30 days</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-yellow-800 mb-2">Protect Your Rights:</h3>
                  <ul className="text-yellow-700 space-y-1">
                    <li>• Don&apos;t sign insurance papers</li>
                    <li>• Don&apos;t give recorded statements</li>
                    <li>• Keep all medical records</li>
                    <li>• Don&apos;t return to work too soon</li>
                    <li>• Contact an attorney immediately</li>
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
                  Common Construction Site Injuries
                </h2>
                <p className="text-gray-700 mb-6">
                  Construction is one of the most dangerous industries, with workers facing
                  life-threatening hazards daily. The Occupational Safety and Health Administration
                  (OSHA) reports that 1 in 5 workplace deaths occur in construction.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
                      <div>
                        <h4 className="text-lg font-bold text-burgundy-900 mb-3">
                          Fatal Four Accidents
                        </h4>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Falls (36.4% of deaths)</li>
                          <li>• Struck by objects (10.4%)</li>
                          <li>• Electrocutions (8.6%)</li>
                          <li>• Caught-in/between (5.1%)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Hammer className="w-6 h-6 text-orange-600 mt-1" />
                      <div>
                        <h4 className="text-lg font-bold text-burgundy-900 mb-3">
                          Common Injuries
                        </h4>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Traumatic brain injuries</li>
                          <li>• Spinal cord injuries</li>
                          <li>• Broken bones & fractures</li>
                          <li>• Amputations</li>
                          <li>• Burns & electrical injuries</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-burgundy-500">
                    <h3 className="text-xl font-bold text-burgundy-900 mb-3">
                      Scaffold & Fall Accidents
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Falls are the leading cause of construction deaths and serious injuries.
                    </p>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Scaffold collapses</li>
                      <li>• Ladder accidents</li>
                      <li>• Roof and elevation falls</li>
                      <li>• Unguarded openings</li>
                      <li>• Slippery surfaces</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-xl font-bold text-blue-900 mb-3">
                      Equipment & Machinery Accidents
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Heavy equipment poses serious risks when not properly maintained or operated.
                    </p>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Crane accidents</li>
                      <li>• Forklift injuries</li>
                      <li>• Power tool accidents</li>
                      <li>• Excavator incidents</li>
                      <li>• Nail gun injuries</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-green-500">
                    <h3 className="text-xl font-bold text-green-900 mb-3">Exposure Injuries</h3>
                    <p className="text-gray-700 mb-3">
                      Long-term health problems from workplace exposures.
                    </p>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Asbestos exposure (mesothelioma)</li>
                      <li>• Silica dust (lung disease)</li>
                      <li>• Chemical burns</li>
                      <li>• Lead poisoning</li>
                      <li>• Hearing loss from noise</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Your Rights After a Construction Accident
                </h2>
                <p className="text-gray-700 mb-6">
                  Construction workers have multiple avenues for compensation after workplace
                  injuries:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border-2 border-burgundy-200 p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-6 h-6 text-burgundy-700 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-burgundy-900 mb-3">
                          Workers&apos; Compensation Benefits
                        </h3>
                        <ul className="text-gray-700 space-y-1">
                          <li>• All medical expenses</li>
                          <li>• Lost wage benefits (66.67%)</li>
                          <li>• Permanent disability rating</li>
                          <li>• Vocational rehabilitation</li>
                          <li>• Death benefits for families</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border-2 border-burgundy-200 p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <HardHat className="w-6 h-6 text-burgundy-700 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-burgundy-900 mb-3">
                          Third-Party Claims
                        </h3>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Equipment manufacturers</li>
                          <li>• Subcontractors</li>
                          <li>• Property owners</li>
                          <li>• General contractors</li>
                          <li>• Architects/engineers</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Third-Party Liability in Construction Accidents
                </h2>
                <p className="text-gray-700 mb-6">
                  While workers&apos; compensation provides benefits regardless of fault, it limits
                  recovery. Third-party claims allow full compensation for all damages when others
                  contributed to your injury:
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Defective Equipment
                      </h3>
                      <p className="text-gray-700">
                        Manufacturers of faulty scaffolding, power tools, safety equipment, or
                        machinery can be held liable for injuries caused by product defects.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Negligent Subcontractors
                      </h3>
                      <p className="text-gray-700">
                        When another company&apos;s workers create hazardous conditions that cause
                        your injury, they can be held responsible outside workers&apos; comp.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Property Owner Negligence
                      </h3>
                      <p className="text-gray-700">
                        Property owners who fail to address known hazards or maintain safe
                        conditions can face premises liability claims.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Vehicle Accidents
                      </h3>
                      <p className="text-gray-700">
                        Injuries from delivery trucks, equipment transport, or other vehicles on
                        construction sites may allow personal injury claims.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  OSHA Violations and Your Rights
                </h2>
                <p className="text-gray-700 mb-6">
                  OSHA safety violations often contribute to construction accidents. While OSHA
                  violations don&apos;t create a private right to sue, they provide powerful evidence in
                  workers&apos; comp and third-party claims:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-red-800 mb-3">Common OSHA Violations</h3>
                    <ul className="text-red-700 space-y-2">
                      <li>• Fall protection failures</li>
                      <li>• Scaffolding violations</li>
                      <li>• Ladder safety breaches</li>
                      <li>• Electrical hazards</li>
                      <li>• Trenching violations</li>
                      <li>• PPE requirements</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-green-800 mb-3">
                      How We Use OSHA Violations
                    </h3>
                    <ul className="text-green-700 space-y-2">
                      <li>• Prove employer negligence</li>
                      <li>• Support disability claims</li>
                      <li>• Strengthen third-party cases</li>
                      <li>• Negotiate higher settlements</li>
                      <li>• Show pattern of violations</li>
                      <li>• Document unsafe conditions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Compensation Available
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">
                      Workers&apos; Comp Benefits
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Medical treatment (100% covered)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Temporary disability (66.67% wages)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Permanent disability rating</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Job retraining programs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Death benefits for families</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">
                      Third-Party Damages
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Full lost wages (past & future)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Pain and suffering</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Loss of quality of life</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Spouse&apos;s loss of consortium</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Punitive damages (if applicable)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Why Choose Vasquez Law Firm?
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">
                      Construction Site Expertise
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Deep understanding of construction industry</li>
                      <li>• OSHA regulation knowledge</li>
                      <li>• Equipment defect experience</li>
                      <li>• Multi-party claim coordination</li>
                      <li>• Maximum compensation strategies</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">
                      Dedicated Representation
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• No upfront costs ever</li>
                      <li>• Bilingual attorneys and staff</li>
                      <li>• Direct attorney access</li>
                      <li>• Aggressive insurance negotiation</li>
                      <li>• Trial-ready representation</li>
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
                      Can I sue my employer for a construction accident?
                    </h3>
                    <p className="text-gray-700">
                      Generally no - workers&apos; comp is your exclusive remedy against your employer.
                      However, you may have claims against equipment manufacturers, subcontractors,
                      property owners, or others who contributed to your injury.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      What if I was partially at fault for my construction accident?
                    </h3>
                    <p className="text-gray-700">
                      Workers&apos; compensation covers you regardless of fault. For third-party claims,
                      North Carolina&apos;s contributory negligence law is strict, but many construction
                      accidents involve clear violations by others that overcome this defense.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      How long do I have to file a construction injury claim?
                    </h3>
                    <p className="text-gray-700">
                      Report to your employer within 30 days and file workers&apos; comp within 2 years.
                      Third-party personal injury claims have a 3-year statute of limitations.
                      Acting quickly preserves evidence and protects your rights.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      What if I&apos;m an undocumented construction worker?
                    </h3>
                    <p className="text-gray-700">
                      You have the same rights to workers&apos; compensation as any other injured worker.
                      Immigration status does not affect your right to benefits for workplace
                      injuries. We protect all workers.
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
              Injured on a Construction Site? We&apos;re Here to Help
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Construction accidents can be catastrophic. Don&apos;t let insurance companies minimize
              your injuries or deny your claim. Our experienced attorneys know how to maximize both
              workers&apos; comp benefits and third-party recovery. Call now for a free consultation.
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
            serviceType: 'Workers Compensation Construction Site Injuries Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/workers-compensation/construction-site-injuries/page',
            description:
              'Workers Compensation Construction Site Injuries legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
