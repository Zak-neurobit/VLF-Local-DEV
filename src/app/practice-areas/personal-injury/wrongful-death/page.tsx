import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Phone, MapPin, ArrowRight, CheckCircle, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Wrongful Death Lawyers NC & FL | Compassionate Legal Help | Vasquez Law Firm',
  description:
    'Expert wrongful death attorneys in Raleigh, Charlotte, Smithfield & Orlando. Compassionate representation for families who have lost loved ones. Free consultation.',
  keywords: [
    'wrongful death lawyer',
    'fatal accident attorney',
    'death claim',
    'loss of loved one',
    'fatal car accident',
    'medical malpractice death',
    'Raleigh NC',
    'Charlotte NC',
    'Orlando FL',
  ],
  openGraph: {
    title: 'Wrongful Death Lawyers | Compassionate Legal Help | Vasquez Law Firm',
    description:
      'Expert wrongful death attorneys providing compassionate representation for families seeking justice.',
    type: 'website',
    images: [
      {
        url: '/images/wrongful-death-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Wrongful Death Lawyers',
      },
    ],
  },
};

export default function WrongfulDeathPage() {
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
            <span className="text-gray-600">Wrongful Death</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-700 to-burgundy-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Wrongful Death Lawyers</h1>
            <p className="text-xl md:text-2xl mb-8 text-gold-400 font-semibold">
              YO PELEO POR TI™ - I FIGHT FOR YOU
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              When you&apos;ve lost a loved one due to someone else&apos;s negligence, we provide
              compassionate legal representation to help your family seek justice and fair
              compensation during this difficult time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                Free Compassionate Consultation
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

      {/* Compassionate Support Section */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-purple-100 border-l-4 border-purple-500 p-6 mb-8">
              <div className="flex items-center mb-4">
                <Heart className="w-8 h-8 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-purple-800">We Understand Your Loss</h2>
              </div>
              <p className="text-purple-700 mb-4">
                Losing a loved one is one of life&apos;s most difficult experiences. When that loss is
                caused by someone else&apos;s negligence or wrongful actions, the pain is compounded by
                feelings of injustice. At Vasquez Law Firm, we handle your case with the utmost
                compassion and respect while fighting aggressively for your family&apos;s rights.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-purple-800 mb-2">
                    Our Compassionate Approach:
                  </h3>
                  <ul className="text-purple-700 space-y-1">
                    <li>✓ Respectful handling of your loved one&apos;s memory</li>
                    <li>✓ Minimal burden on grieving families</li>
                    <li>✓ Clear communication at every step</li>
                    <li>✓ Flexible meeting arrangements</li>
                    <li>✓ Emotional support resources</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-purple-800 mb-2">
                    Fighting for Your Family:
                  </h3>
                  <ul className="text-purple-700 space-y-1">
                    <li>• Maximum compensation for your loss</li>
                    <li>• Holding negligent parties accountable</li>
                    <li>• Preventing similar tragedies</li>
                    <li>• Honoring your loved one&apos;s legacy</li>
                    <li>• Securing your family&apos;s future</li>
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
                  Understanding Wrongful Death Claims
                </h2>
                <p className="text-gray-700 mb-6">
                  A wrongful death claim arises when someone dies due to the legal fault of another
                  person or entity. These claims allow surviving family members to seek compensation
                  for their losses, including the loss of love, companionship, income, and support.
                </p>

                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                  Common Causes of Wrongful Death:
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-burgundy-900 mb-3">
                      Accident-Related Deaths
                    </h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Motor vehicle accidents</li>
                      <li>• Truck and commercial vehicle crashes</li>
                      <li>• Motorcycle accidents</li>
                      <li>• Pedestrian accidents</li>
                      <li>• Workplace accidents</li>
                      <li>• Construction site fatalities</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-burgundy-900 mb-3">
                      Negligence-Related Deaths
                    </h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Medical malpractice</li>
                      <li>• Nursing home neglect</li>
                      <li>• Defective products</li>
                      <li>• Dangerous premises</li>
                      <li>• Criminal acts</li>
                      <li>• Drowning accidents</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Who Can File a Wrongful Death Claim?
                </h2>
                <p className="text-gray-700 mb-6">
                  North Carolina and Florida laws specify who can file a wrongful death claim.
                  Understanding these requirements is crucial for protecting your family&apos;s
                  rights.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-blue-800 mb-3">North Carolina Law</h3>
                    <p className="text-blue-700 mb-3">
                      The personal representative of the deceased&apos;s estate must file the claim on
                      behalf of:
                    </p>
                    <ul className="text-blue-700 space-y-1">
                      <li>• Surviving spouse</li>
                      <li>• Children (including adopted)</li>
                      <li>• Parents (if no spouse/children)</li>
                      <li>• Next of kin (if no immediate family)</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-green-800 mb-3">Florida Law</h3>
                    <p className="text-green-700 mb-3">
                      The personal representative files for the estate and survivors:
                    </p>
                    <ul className="text-green-700 space-y-1">
                      <li>• Surviving spouse</li>
                      <li>• Minor children</li>
                      <li>• Adult children (in some cases)</li>
                      <li>• Parents</li>
                      <li>• Blood relatives or adoptive siblings</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mt-6">
                  <h3 className="text-xl font-bold text-yellow-800 mb-2">
                    Time Limits Are Critical
                  </h3>
                  <p className="text-yellow-700">
                    <strong>North Carolina:</strong> 2 years from the date of death
                    <br />
                    <strong>Florida:</strong> 2 years from the date of death
                    <br />
                    <strong>Important:</strong> Some exceptions may apply, but it&apos;s crucial to
                    act quickly to preserve your rights.
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Types of Compensation Available
                </h2>
                <p className="text-gray-700 mb-6">
                  While no amount of money can replace your loved one, compensation can help ease
                  the financial burden and provide justice for your loss.
                </p>

                <div className="grid gap-6">
                  <div className="bg-white border-2 border-burgundy-200 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-burgundy-900 mb-3">Economic Damages</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="text-gray-700 space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                          <span>Medical expenses before death</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                          <span>Funeral and burial costs</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                          <span>Lost wages and benefits</span>
                        </li>
                      </ul>
                      <ul className="text-gray-700 space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                          <span>Loss of future earnings</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                          <span>Loss of inheritance</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                          <span>Value of lost services</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white border-2 border-burgundy-200 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-burgundy-900 mb-3">
                      Non-Economic Damages
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="text-gray-700 space-y-2">
                        <li className="flex items-start">
                          <Heart className="w-5 h-5 text-red-600 mr-2 mt-1" />
                          <span>Loss of companionship</span>
                        </li>
                        <li className="flex items-start">
                          <Heart className="w-5 h-5 text-red-600 mr-2 mt-1" />
                          <span>Loss of guidance and care</span>
                        </li>
                        <li className="flex items-start">
                          <Heart className="w-5 h-5 text-red-600 mr-2 mt-1" />
                          <span>Mental anguish</span>
                        </li>
                      </ul>
                      <ul className="text-gray-700 space-y-2">
                        <li className="flex items-start">
                          <Heart className="w-5 h-5 text-red-600 mr-2 mt-1" />
                          <span>Loss of protection</span>
                        </li>
                        <li className="flex items-start">
                          <Heart className="w-5 h-5 text-red-600 mr-2 mt-1" />
                          <span>Loss of consortium</span>
                        </li>
                        <li className="flex items-start">
                          <Heart className="w-5 h-5 text-red-600 mr-2 mt-1" />
                          <span>Punitive damages (if applicable)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Proving a Wrongful Death Claim
                </h2>
                <p className="text-gray-700 mb-6">
                  To succeed in a wrongful death claim, we must prove several key elements:
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">Duty of Care</h3>
                      <p className="text-gray-700">
                        The defendant owed a legal duty of care to the deceased person.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">Breach of Duty</h3>
                      <p className="text-gray-700">
                        The defendant breached that duty through negligence or intentional acts.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">Causation</h3>
                      <p className="text-gray-700">
                        The breach directly caused or contributed to the death.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">Damages</h3>
                      <p className="text-gray-700">
                        The death resulted in quantifiable damages to surviving family members.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  How We Help Your Family
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">
                      Investigation & Evidence
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Thorough accident investigation</li>
                      <li>• Expert witness consultation</li>
                      <li>• Medical record review</li>
                      <li>• Evidence preservation</li>
                      <li>• Witness interviews</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">
                      Legal Representation
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Insurance company negotiations</li>
                      <li>• Court representation</li>
                      <li>• Settlement evaluation</li>
                      <li>• Trial preparation if needed</li>
                      <li>• Appeals if necessary</li>
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
                      How much does it cost to hire a wrongful death attorney?
                    </h3>
                    <p className="text-gray-700">
                      We work on a contingency fee basis, meaning you pay nothing unless we win your
                      case. Our fee comes from the settlement or judgment, not your pocket. Initial
                      consultations are always free.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      How long do wrongful death cases take?
                    </h3>
                    <p className="text-gray-700">
                      Each case is unique, but most wrongful death cases take 12-24 months to
                      resolve. Complex cases may take longer. We work efficiently while ensuring we
                      build the strongest possible case for your family.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Can we file a claim if there&apos;s a criminal case?
                    </h3>
                    <p className="text-gray-700">
                      Yes. Criminal and civil cases are separate. You can pursue a wrongful death
                      claim regardless of whether criminal charges are filed or the outcome of any
                      criminal case.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      What if my loved one was partially at fault?
                    </h3>
                    <p className="text-gray-700">
                      North Carolina and Florida have different laws regarding comparative fault.
                      We&apos;ll evaluate your case and explain how these laws may affect your claim and
                      potential recovery.
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
              Let Us Help You Seek Justice
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              While no legal action can bring back your loved one, holding responsible parties
              accountable can provide closure and financial security for your family. Let our
              compassionate attorneys guide you through this difficult time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-burgundy-700 text-white font-bold rounded-full hover:bg-burgundy-800 transition-colors"
              >
                Free Compassionate Consultation
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
            serviceType: 'Personal Injury Wrongful Death Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/personal-injury/wrongful-death/page',
            description:
              'Personal Injury Wrongful Death legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
