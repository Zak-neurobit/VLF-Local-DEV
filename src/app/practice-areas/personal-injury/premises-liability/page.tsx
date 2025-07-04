import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import {
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Home,
  Building,
  ShoppingCart,
  Store,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Premises Liability & Slip and Fall Lawyers NC & FL | Vasquez Law Firm',
  description:
    'Expert premises liability attorneys in Raleigh, Charlotte, Smithfield & Orlando. Slip and fall accidents, unsafe property conditions, negligent security. Free consultation.',
  keywords: [
    'slip and fall lawyer',
    'premises liability attorney',
    'trip and fall',
    'unsafe property',
    'negligent security',
    'store accident',
    'apartment injury',
    'Raleigh NC',
    'Charlotte NC',
    'Orlando FL',
  ],
  openGraph: {
    title: 'Premises Liability & Slip and Fall Lawyers | Vasquez Law Firm',
    description:
      'Expert premises liability attorneys fighting for victims injured on unsafe properties.',
    type: 'website',
    images: [
      {
        url: '/images/premises-liability-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Premises Liability and Slip and Fall Lawyers',
      },
    ],
  },
};

export default function PremisesLiabilityPage() {
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
            <span className="text-gray-600">Premises Liability</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-700 to-burgundy-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Premises Liability & Slip and Fall Lawyers
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gold-400 font-semibold">
              YO PELEO POR TI™ - I FIGHT FOR YOU
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              When property owners fail to maintain safe conditions, innocent people get hurt. Our
              experienced premises liability attorneys fight to hold negligent property owners
              accountable and secure maximum compensation for your injuries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                Free Case Evaluation
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

      {/* Warning Section */}
      <section className="py-16 bg-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 mb-8">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-8 h-8 text-yellow-600 mr-3" />
                <h2 className="text-2xl font-bold text-yellow-800">Time is Critical - Act Now!</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-yellow-800 mb-2">
                    Why You Need to Act Fast:
                  </h3>
                  <ul className="text-yellow-700 space-y-1">
                    <li>✓ Evidence can be destroyed or altered</li>
                    <li>✓ Security footage may be erased</li>
                    <li>✓ Witnesses' memories fade</li>
                    <li>✓ Property conditions may change</li>
                    <li>✓ Statute of limitations deadlines</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-yellow-800 mb-2">
                    What to Do After Your Accident:
                  </h3>
                  <ul className="text-yellow-700 space-y-1">
                    <li>• Report the incident to management</li>
                    <li>• Take photos of the hazard</li>
                    <li>• Get witness contact information</li>
                    <li>• Seek immediate medical attention</li>
                    <li>• Contact our attorneys today</li>
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
                  Understanding Premises Liability Law
                </h2>
                <p className="text-gray-700 mb-6">
                  Property owners and managers have a legal duty to maintain safe conditions for
                  visitors. When they fail in this duty and someone is injured as a result, they can
                  be held liable for damages. This applies to both residential and commercial
                  properties.
                </p>

                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                  Common Types of Premises Liability Cases:
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Store className="w-6 h-6 text-burgundy-700 mt-1" />
                      <div>
                        <h4 className="text-lg font-bold text-burgundy-900 mb-3">
                          Retail Store Accidents
                        </h4>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Wet floors without warning signs</li>
                          <li>• Spills left unattended</li>
                          <li>• Merchandise in walkways</li>
                          <li>• Poor lighting in aisles</li>
                          <li>• Defective shopping carts</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Building className="w-6 h-6 text-burgundy-700 mt-1" />
                      <div>
                        <h4 className="text-lg font-bold text-burgundy-900 mb-3">
                          Property Defects
                        </h4>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Broken stairs or handrails</li>
                          <li>• Uneven sidewalks or parking lots</li>
                          <li>• Inadequate lighting</li>
                          <li>• Elevator/escalator malfunctions</li>
                          <li>• Balcony or deck collapses</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Home className="w-6 h-6 text-burgundy-700 mt-1" />
                      <div>
                        <h4 className="text-lg font-bold text-burgundy-900 mb-3">
                          Residential Properties
                        </h4>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Apartment complex hazards</li>
                          <li>• Swimming pool accidents</li>
                          <li>• Dog bites and animal attacks</li>
                          <li>• Negligent security</li>
                          <li>• Playground injuries</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <ShoppingCart className="w-6 h-6 text-burgundy-700 mt-1" />
                      <div>
                        <h4 className="text-lg font-bold text-burgundy-900 mb-3">Public Spaces</h4>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Restaurant and bar accidents</li>
                          <li>• Hotel and resort injuries</li>
                          <li>• Gym and fitness center hazards</li>
                          <li>• Concert and event venue accidents</li>
                          <li>• Government building hazards</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Legal Standards for Different Visitors
                </h2>
                <p className="text-gray-700 mb-6">
                  North Carolina and Florida law classify visitors differently, and property owners
                  owe different levels of care to each type:
                </p>

                <div className="space-y-6">
                  <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                    <h3 className="text-xl font-bold text-green-800 mb-2">
                      Invitees (Business Visitors)
                    </h3>
                    <p className="text-green-700 mb-2">
                      Customers, patrons, and others invited for business purposes receive the
                      highest protection.
                    </p>
                    <ul className="text-green-700 space-y-1">
                      <li>• Property owner must regularly inspect for hazards</li>
                      <li>• Must warn of or fix dangerous conditions</li>
                      <li>• Must maintain property in reasonably safe condition</li>
                      <li>• Examples: Store customers, restaurant patrons, hotel guests</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-xl font-bold text-blue-800 mb-2">
                      Licensees (Social Guests)
                    </h3>
                    <p className="text-blue-700 mb-2">
                      Social visitors and guests receive intermediate protection.
                    </p>
                    <ul className="text-blue-700 space-y-1">
                      <li>• Must warn of known dangerous conditions</li>
                      <li>• No duty to inspect for unknown hazards</li>
                      <li>• Must not willfully injure the visitor</li>
                      <li>• Examples: Party guests, social visitors, salespersons</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                    <h3 className="text-xl font-bold text-orange-800 mb-2">Trespassers</h3>
                    <p className="text-orange-700 mb-2">
                      Limited duty owed, but children may receive special protection.
                    </p>
                    <ul className="text-orange-700 space-y-1">
                      <li>• Generally no duty except to avoid willful harm</li>
                      <li>• Attractive nuisance doctrine protects children</li>
                      <li>• Must warn of hidden dangers if trespassing is common</li>
                      <li>• Property owner cannot set traps</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Proving Your Premises Liability Case
                </h2>
                <p className="text-gray-700 mb-6">
                  To win your case, we must prove several key elements:
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Dangerous Condition Existed
                      </h3>
                      <p className="text-gray-700">
                        We must show that a hazardous condition existed on the property that posed
                        an unreasonable risk of harm.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Owner Knew or Should Have Known
                      </h3>
                      <p className="text-gray-700">
                        The property owner either created the hazard, knew about it, or should have
                        discovered it through reasonable inspection.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Failed to Address the Hazard
                      </h3>
                      <p className="text-gray-700">
                        The owner failed to repair, remove, or adequately warn visitors about the
                        dangerous condition.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Caused Your Injuries
                      </h3>
                      <p className="text-gray-700">
                        The dangerous condition directly caused your accident and resulting
                        injuries.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Compensation for Premises Liability Injuries
                </h2>
                <p className="text-gray-700 mb-6">
                  Slip and fall accidents can cause serious, life-changing injuries. We fight to
                  recover full compensation for all your damages:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border-2 border-burgundy-200 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-burgundy-900 mb-3">Economic Damages</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Medical bills (past and future)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Lost wages and earning capacity</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Physical therapy and rehabilitation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Home modifications</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Medical equipment and devices</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white border-2 border-burgundy-200 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-burgundy-900 mb-3">
                      Non-Economic Damages
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Pain and suffering</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Emotional distress</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Loss of enjoyment of life</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Permanent disability/disfigurement</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Loss of consortium</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Common Defenses We Fight Against
                </h2>
                <p className="text-gray-700 mb-6">
                  Property owners and their insurance companies often try to avoid responsibility.
                  We know their tactics and how to overcome them:
                </p>

                <div className="space-y-6">
                  <div className="bg-red-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-red-800 mb-2">
                      "Open and Obvious" Defense
                    </h3>
                    <p className="text-red-700">
                      They claim the hazard was so obvious you should have avoided it. We prove that
                      even obvious hazards can be unreasonably dangerous and should be fixed.
                    </p>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-red-800 mb-2">Comparative Negligence</h3>
                    <p className="text-red-700">
                      They try to blame you for the accident. We show that property owners cannot
                      escape liability by blaming injured visitors for their negligence.
                    </p>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-red-800 mb-2">Lack of Notice</h3>
                    <p className="text-red-700">
                      They claim they didn&apos;t know about the hazard. We prove they should have
                      known through reasonable inspection and maintenance procedures.
                    </p>
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
                      Aggressive Investigation
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Immediate evidence preservation</li>
                      <li>• Security footage acquisition</li>
                      <li>• Witness interviews</li>
                      <li>• Expert analysis of conditions</li>
                      <li>• Property inspection records review</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">Proven Results</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Millions recovered for slip and fall victims</li>
                      <li>• Successful cases against major retailers</li>
                      <li>• Experience with complex liability issues</li>
                      <li>• No fee unless we win your case</li>
                      <li>• Personal attention to every client</li>
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
                      How long do I have to file a premises liability claim?
                    </h3>
                    <p className="text-gray-700">
                      In North Carolina and Florida, you generally have 3 years from the date of
                      your accident to file a lawsuit. However, some cases have shorter deadlines,
                      so contact us immediately.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      What if I didn&apos;t report the accident right away?
                    </h3>
                    <p className="text-gray-700">
                      While immediate reporting is best, delayed reporting doesn&apos;t necessarily
                      ruin your case. We can still help prove your claim through medical records,
                      witness testimony, and other evidence.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Can I still recover if I was partially at fault?
                    </h3>
                    <p className="text-gray-700">
                      North Carolina's contributory negligence law is strict, but Florida uses
                      comparative fault. We'll evaluate your case and fight to minimize any fault
                      assigned to you.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      What if the property owner claims they didn&apos;t know about the hazard?
                    </h3>
                    <p className="text-gray-700">
                      We investigate to show they should have known through reasonable inspection.
                      We often uncover evidence of prior incidents, complaints, or obvious
                      conditions they ignored.
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
              Injured on Someone Else's Property? We Can Help
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Don't let property owners and their insurance companies deny you the compensation you
              deserve. Our experienced premises liability attorneys know how to prove negligence and
              maximize your recovery.
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
            serviceType: 'Personal Injury Premises Liability Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/personal-injury/premises-liability/page',
            description:
              'Personal Injury Premises Liability legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
