import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import {
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Heart,
  Stethoscope,
  FileText,
  ShieldAlert,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Medical Malpractice Lawyers NC & FL | Hospital Negligence | Vasquez Law Firm',
  description:
    'Expert medical malpractice attorneys in Raleigh, Charlotte, Smithfield & Orlando. Surgical errors, misdiagnosis, birth injuries, hospital negligence. Free consultation.',
  keywords: [
    'medical malpractice lawyer',
    'hospital negligence',
    'surgical error',
    'misdiagnosis',
    'birth injury',
    'medication error',
    'medical mistake attorney',
    'Raleigh NC',
    'Charlotte NC',
    'Orlando FL',
  ],
  openGraph: {
    title: 'Medical Malpractice Lawyers | Hospital Negligence | Vasquez Law Firm',
    description:
      'Expert medical malpractice attorneys fighting for victims of medical negligence and hospital errors.',
    type: 'website',
    images: [
      {
        url: '/images/medical-malpractice-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Medical Malpractice Lawyers',
      },
    ],
  },
};

export default function MedicalMalpracticePage() {
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
            <span className="text-gray-600">Medical Malpractice</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-700 to-burgundy-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Medical Malpractice Lawyers</h1>
            <p className="text-xl md:text-2xl mb-8 text-gold-400 font-semibold">
              YO PELEO POR TI™ - I FIGHT FOR YOU
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              When healthcare providers fail to meet the standard of care, patients suffer. Our
              experienced medical malpractice attorneys fight for victims of medical negligence,
              holding doctors and hospitals accountable for their mistakes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                Free Medical Case Review
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
                <ShieldAlert className="w-8 h-8 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-red-800">
                  Medical Malpractice Cases Have Strict Deadlines
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-red-800 mb-2">Statute of Limitations:</h3>
                  <ul className="text-red-700 space-y-1">
                    <li>✓ North Carolina: 3 years from injury</li>
                    <li>✓ Florida: 2 years from discovery</li>
                    <li>✓ Minor children have extended time</li>
                    <li>✓ Foreign object cases: 1 year from discovery</li>
                    <li>✓ Wrongful death: 2 years from death</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-800 mb-2">Act Immediately To:</h3>
                  <ul className="text-red-700 space-y-1">
                    <li>• Preserve medical records</li>
                    <li>• Interview witnesses</li>
                    <li>• Secure expert testimony</li>
                    <li>• Investigate the incident</li>
                    <li>• Meet pre-suit requirements</li>
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
                  Understanding Medical Malpractice
                </h2>
                <p className="text-gray-700 mb-6">
                  Medical malpractice occurs when a healthcare provider's negligence causes injury
                  to a patient. This includes errors in diagnosis, treatment, aftercare, or health
                  management. To have a valid claim, we must prove the provider violated the
                  accepted standard of care.
                </p>

                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                  Common Types of Medical Malpractice:
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Stethoscope className="w-6 h-6 text-burgundy-700 mt-1" />
                      <div>
                        <h4 className="text-lg font-bold text-burgundy-900 mb-3">
                          Diagnostic Errors
                        </h4>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Misdiagnosis of conditions</li>
                          <li>• Delayed diagnosis</li>
                          <li>• Failure to diagnose cancer</li>
                          <li>• Missed heart attack or stroke</li>
                          <li>• Laboratory errors</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Heart className="w-6 h-6 text-burgundy-700 mt-1" />
                      <div>
                        <h4 className="text-lg font-bold text-burgundy-900 mb-3">
                          Surgical Errors
                        </h4>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Wrong site surgery</li>
                          <li>• Surgical instruments left inside</li>
                          <li>• Nerve damage during surgery</li>
                          <li>• Anesthesia errors</li>
                          <li>• Post-operative infections</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <FileText className="w-6 h-6 text-burgundy-700 mt-1" />
                      <div>
                        <h4 className="text-lg font-bold text-burgundy-900 mb-3">
                          Treatment Errors
                        </h4>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Medication errors</li>
                          <li>• Incorrect dosage</li>
                          <li>• Drug interactions</li>
                          <li>• Improper treatment</li>
                          <li>• Premature discharge</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-6 h-6 text-burgundy-700 mt-1" />
                      <div>
                        <h4 className="text-lg font-bold text-burgundy-900 mb-3">Birth Injuries</h4>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Cerebral palsy</li>
                          <li>• Erb's palsy</li>
                          <li>• Brain damage</li>
                          <li>• Failure to perform C-section</li>
                          <li>• Improper use of forceps</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  The Four Elements of Medical Malpractice
                </h2>
                <p className="text-gray-700 mb-6">
                  To succeed in a medical malpractice case, we must prove four essential elements:
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">Duty of Care</h3>
                      <p className="text-gray-700">
                        A doctor-patient relationship existed, creating a legal duty for the
                        healthcare provider to meet the accepted standard of care.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Breach of Standard of Care
                      </h3>
                      <p className="text-gray-700">
                        The healthcare provider failed to meet the standard of care that a
                        reasonably competent provider would have met under similar circumstances.
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
                        The breach of the standard of care directly caused or substantially
                        contributed to the patient's injury or death.
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
                        The patient suffered actual damages (physical, emotional, or financial) as a
                        result of the medical negligence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Healthcare Providers We Hold Accountable
                </h2>
                <p className="text-gray-700 mb-6">
                  Medical malpractice can be committed by any healthcare provider or facility. We
                  have experience pursuing claims against:
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-blue-800 mb-3">Medical Professionals</h3>
                    <ul className="text-blue-700 space-y-1">
                      <li>• Doctors & Surgeons</li>
                      <li>• Nurses</li>
                      <li>• Anesthesiologists</li>
                      <li>• Radiologists</li>
                      <li>• Pharmacists</li>
                      <li>• Dentists</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-green-800 mb-3">Medical Facilities</h3>
                    <ul className="text-green-700 space-y-1">
                      <li>• Hospitals</li>
                      <li>• Emergency rooms</li>
                      <li>• Surgical centers</li>
                      <li>• Nursing homes</li>
                      <li>• Urgent care clinics</li>
                      <li>• Medical practices</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-purple-800 mb-3">Specialists</h3>
                    <ul className="text-purple-700 space-y-1">
                      <li>• OB/GYNs</li>
                      <li>• Cardiologists</li>
                      <li>• Oncologists</li>
                      <li>• Orthopedic surgeons</li>
                      <li>• Neurologists</li>
                      <li>• Psychiatrists</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Compensation in Medical Malpractice Cases
                </h2>
                <p className="text-gray-700 mb-6">
                  Medical malpractice can result in devastating injuries and losses. We fight to
                  recover full compensation for all damages:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border-2 border-burgundy-200 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-burgundy-900 mb-3">Economic Damages</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Past and future medical expenses</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Corrective surgeries and treatments</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Lost wages and earning capacity</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Life care costs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Rehabilitation and therapy</span>
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
                        <span>Permanent disability</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                        <span>Wrongful death damages</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Building Your Medical Malpractice Case
                </h2>
                <p className="text-gray-700 mb-6">
                  Medical malpractice cases are complex and require extensive investigation and
                  expert testimony. Our process includes:
                </p>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Medical Record Review
                    </h3>
                    <p className="text-gray-700">
                      We obtain and thoroughly analyze all medical records, including hospital
                      charts, nursing notes, test results, and imaging studies to identify
                      deviations from the standard of care.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Expert Medical Testimony
                    </h3>
                    <p className="text-gray-700">
                      We work with respected medical experts in the relevant specialty who can
                      testify about the standard of care and how it was breached in your case.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">Damage Assessment</h3>
                    <p className="text-gray-700">
                      We document all damages including future medical needs, lost earning capacity,
                      and the full impact of the injury on your life and family.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Pre-Suit Requirements
                    </h3>
                    <p className="text-gray-700">
                      We comply with all pre-lawsuit requirements including expert affidavits and
                      medical review panels, ensuring your case proceeds without procedural delays.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Why Choose Vasquez Law Firm for Medical Malpractice?
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">
                      Resources & Experience
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Financial resources for complex litigation</li>
                      <li>• Network of medical experts</li>
                      <li>• Experience with hospital systems</li>
                      <li>• Understanding of medical procedures</li>
                      <li>• Track record of substantial verdicts</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">
                      Client-Focused Approach
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• No upfront costs or fees</li>
                      <li>• Free medical record review</li>
                      <li>• Honest case evaluation</li>
                      <li>• Regular case updates</li>
                      <li>• Personal attention from attorneys</li>
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
                      Not all bad outcomes are malpractice. How do I know if I have a case?
                    </h3>
                    <p className="text-gray-700">
                      Medicine involves risks, and not every bad outcome is malpractice. We have a
                      valid case when a healthcare provider's negligence caused harm that
                      wouldn&apos;t have occurred with proper care. Our free consultation can help
                      determine if you have a case.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      How much does it cost to pursue a medical malpractice case?
                    </h3>
                    <p className="text-gray-700">
                      We handle all medical malpractice cases on a contingency fee basis. You pay
                      nothing unless we win. We advance all costs including expert witness fees,
                      which can be substantial in these complex cases.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      How long do medical malpractice cases take?
                    </h3>
                    <p className="text-gray-700">
                      Medical malpractice cases typically take 18-36 months due to their complexity.
                      Cases involving catastrophic injuries or death may take longer. We work
                      efficiently while ensuring we build the strongest possible case.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Are there caps on medical malpractice damages?
                    </h3>
                    <p className="text-gray-700">
                      North Carolina caps non-economic damages at $500,000 (adjusted for inflation).
                      Florida's caps were ruled unconstitutional. Economic damages are not capped in
                      either state. We'll explain how caps may affect your case.
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
              Get Justice for Medical Negligence
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              If you or a loved one has been harmed by medical malpractice, don't wait. Time limits
              apply, and evidence can disappear. Contact our experienced medical malpractice
              attorneys today for a free, confidential case review.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-burgundy-700 text-white font-bold rounded-full hover:bg-burgundy-800 transition-colors"
              >
                Free Medical Case Review
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
            serviceType: 'Personal Injury Medical Malpractice Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/personal-injury/medical-malpractice/page',
            description:
              'Personal Injury Medical Malpractice legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
