import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Raleigh Family Law Attorneys | Vasquez Law Firm',
  description:
    "Experienced Raleigh family law attorneys providing compassionate legal support for divorce, child custody, and more. Protect your family's future today.",
  keywords: [
    'Family Law lawyer NC',
    'Family Law attorney North Carolina',
    'Vasquez Law Firm',
    'abogado Family Law',
  ],
  openGraph: {
    title: 'Raleigh Family Law Attorneys | Vasquez Law Firm',
    description:
      "Experienced Raleigh family law attorneys providing compassionate legal support for divorce, child custody, and more. Protect your family's future today.",
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/practice-areas/family-law',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function FamilyLawPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#001845] to-[#003875] text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Raleigh Family Law Attorneys
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-[#FF6B6B] mb-6">
              YO PELEO POR TI™
            </p>
            <p className="text-xl mb-8 text-gray-100">
              At the Vasquez Law Firm, PLLC, we know that you and your spouse did not get married
              with the plan of eventually seeking a divorce in the future. When you said, “I do” in
              the presence of your friends and family, you most likely did so with hopes of building
              a happy and productive life together. Sadly, things do not always go as planned,
              including marriages. Now, you might be feeling trapped in an unhealthy and unhappy
              situation. You might realize that divorce is an option you have, but you may have no
              idea of how to even get the process started. The good news is that our team can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-block bg-[#FF6B6B] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#FF5252] transition-colors text-center"
              >
                Free Consultation
              </Link>
              <a
                href="tel:919-537-8722"
                className="inline-block bg-white text-[#001845] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors text-center"
              >
                Call Now: (919) 537-8722
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 ">
              The accomplished family law attorneys at our firm have more than 35 years of combined
              family law experience. With our knowledge, skills, and resources, we are ready and
              willing to help you manage any and all challenges that may arise during your divorce.
              Do not waste another moment feeling trapped. Let the team at the Vasquez Law Firm,
              PLLC help you open the door to your happier, healthier future.
            </p>
            <p className="text-lg text-gray-700 mt-6">
              When facing a divorce, many people are hesitant to hire a lawyer because they are
              concerned about how much it costs. However, the expense associated with retaining a
              lawyer is often far less than the potential costs of a mistake in handling your
              divorce without an attorney. If you’re searching for an attorney near me in family
              law, consider our experienced team. An oversight or error that seems minor at the time
              could lead to thousands of dollars in lost assets or support payments that might have
              been avoided if you had simply hired a qualified family law lawyer.
            </p>
            <p className="text-lg text-gray-700 mt-6">
              At Vasquez Law Firm, PLLC, we appreciate the value of your hard-earned money. With
              this in mind, our lawyers are committed to assisting you in finding efficient,
              reasonable, and cost-effective resolutions to all of the issues you are facing in your
              divorce, including:
            </p>
            <p className="text-lg text-gray-700 mt-6">
              We also help with post-divorce order modifications and enforcement of family law
              orders.
            </p>
            <p className="text-lg text-gray-700 mt-6">
              When you choose our firm to assist in your family and the law, we realize that you are
              placing your trust in us. Our lawyers understand that the personal and sensitive
              nature of family-related legal matters can cause you and your former partner to
              experience a wide range of emotions as you attempt to resolve your issues. In some
              cases, such emotions can lead to extreme bitterness and contentiousness between the
              parties. Our family law lawyers realize the importance of keeping emotions and
              personal feelings in check, and we are prepared to help you do so. At the same time,
              we will work hard to ensure that your rights and best interests are fully protected at
              every stage of the proceedings.
            </p>
            <p className="text-lg text-gray-700 mt-6">
              At the Vasquez Law Firm, PLLC, we will start by meeting with you to discuss your
              circumstances and to gain a full understanding about what you need to begin moving
              forward with your life. Based on that information, our lawyers will help you negotiate
              with your spouse in the hopes of developing a workable reasonable settlement that will
              meet your needs both now and in the future. North Carolina law expects and encourages
              divorcing spouses to work together whenever possible, especially if there are children
              involved. However, working together amicably is not possible for some couples. If
              negotiations do not produce an agreement, our family law attorney near me free
              consultation, are also experienced litigators who are ready to fight on your behalf in
              court. Regardless of the challenges that arise, you can rely on us to remain at your
              side every step of the way.
            </p>
            <p className="text-lg text-gray-700 mt-6">
              For more information about the Vasquez Law Firm, PLLC and our proven approach to
              matters of divorce and family law in North Carolina, contact our office. Call
              1-844-YO-PELEO or 919-626-8450 to schedule your free, confidential consultation with
              an attorney family law of our team today. We serve clients in Raleigh, Smithfield,
              Charlotte, Wake County, Johnston County, Mecklenburg County, and the neighboring
              communities.
            </p>
            <p className="text-lg text-gray-700 mt-6">
              by wvasquez@vasquezlawfirm.com | Mar 5, 2025 | Workers&apos; Compensation
            </p>
            <p className="text-lg text-gray-700 mt-6">
              by wvasquez@vasquezlawfirm.com | Feb 7, 2025 | Uncategorized
            </p>
            <p className="text-lg text-gray-700 mt-6">
              by wvasquez@vasquezlawfirm.com | Feb 6, 2025 | Immigration
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Family Law Services
          </h2>
          <div className="max-w-4xl mx-auto">
            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">William Vasquez</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Adriana ingram</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Mark Kelsey</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Roselyn V. Torrellas</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Jillian Baucom</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Judith Parkes</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Christopher Afanador</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Immigration\n \n Family-Based Immigration\n Fiance K Visa\n Immediate Relative
                  Visas\n Family Preference Visas\n The Visa Process\n Visa Denial Assistance and
                  Appeals\n Waivers of Inadmissibility\n Adjustment of Status\n Green Cards\n Asylum
                  and Refugees\n Citizenship and Naturalization\n Deportation Removal Defense\n VAWA
                  and U Visas\n Immigration Detention Bond Hearing\n Criminal Convictions\n DACA\n
                  Memorandum on Deferred Enforced Departure for Certain Venezuelans\n
                  Employment-Based Immigration\n \n PERM Labor Certification\n TN Visa\n E Visa\n
                  H-2B Visa\n \n\n FAQs\n T Visa Immigration Attorneys
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Family-Based Immigration</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Fiance K Visa</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Immediate Relative Visas</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Family Preference Visas</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">The Visa Process</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Visa Denial Assistance and Appeals</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Waivers of Inadmissibility</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Adjustment of Status</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Green Cards</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Asylum and Refugees</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Citizenship and Naturalization</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Deportation Removal Defense</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">VAWA and U Visas</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Immigration Detention Bond Hearing</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Criminal Convictions</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">DACA</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Memorandum on Deferred Enforced Departure for Certain Venezuelans
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Employment-Based Immigration\n \n PERM Labor Certification\n TN Visa\n E Visa\n
                  H-2B Visa
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">PERM Labor Certification</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">TN Visa</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">E Visa</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">H-2B Visa</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">FAQs</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">T Visa Immigration Attorneys</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Personal Injury\n \n Car Accidents\n Truck Accidents\n Motorcycle Accidents\n
                  Pedestrian Accidents\n Drunk Driver Liability\n Mass Transit Accidents\n Boating
                  and Water Recreation Accidents\n Emergency Vehicle Accidents\n Bicycle Accidents\n
                  Uninsured and Underinsured Motorists\n Premises Liability
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Car Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Truck Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Motorcycle Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Pedestrian Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Drunk Driver Liability</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Mass Transit Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Boating and Water Recreation Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Emergency Vehicle Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Bicycle Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Uninsured and Underinsured Motorists</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Premises Liability</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Workers’ Compensation\n \n Depression and Mental Health Injuries\n Lifting
                  Injuries\n Repetitive Stress Injuries\n Equipment Accidents and Failures\n
                  Construction Site Injuries\n Third-Party Claims in Workers’ Compensation
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Depression and Mental Health Injuries</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Lifting Injuries</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Repetitive Stress Injuries</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Equipment Accidents and Failures</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Construction Site Injuries</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Third-Party Claims in Workers’ Compensation</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Criminal Defense\n \n Drug Cases\n \n Possession\n Trafficking and Distribution\n
                  Marijuana Charges\n \n\n DWI\n \n Multiple DWIs\n How to Get Your License Back\n
                  FAQs\n \n\n Domestic Violence\n Traffic Offenses\n Theft\n Expungement\n Probation
                  Violations\n Weapons Offenses\n Violent Crimes\n White Collar Crimes
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Drug Cases\n \n Possession\n Trafficking and Distribution\n Marijuana Charges
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Possession</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Trafficking and Distribution</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Marijuana Charges</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  DWI\n \n Multiple DWIs\n How to Get Your License Back\n FAQs
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Multiple DWIs</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">How to Get Your License Back</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">FAQs</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Domestic Violence</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Traffic Offenses</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Theft</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Expungement</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Probation Violations</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Weapons Offenses</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Violent Crimes</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">White Collar Crimes</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Family Law\n \n Divorce\n Alimony\n Post Separation Support\n Separation
                  Agreements\n Equitable Distribution of Property and Debt\n Domestic Violence
                  Protective Order\n Name Change\n Post Divorce Modifications and Enforcement
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Divorce</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Alimony</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Post Separation Support</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Separation Agreements</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Equitable Distribution of Property and Debt</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Domestic Violence Protective Order</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Name Change</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Post Divorce Modifications and Enforcement</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Make Payment</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Areas We Serve\n \n Charlotte, NC\n \n Charlotte, NC Workers’ Comp Lawyers\n \n\n
                  Durham, NC\n \n Durham, NC Immigration Lawyers\n \n\n Raleigh, NC\n \n Raleigh, NC
                  Workers’ Comp Lawyers\n \n\n Smithfield, NC\n \n Smithfield, NC Auto Accident
                  Lawyers\n Smithfield, NC Immigration Lawyers\n Smithfield, NC Workers’ Comp
                  Lawyers\n \n\n Winston-Salem, NC\n \n Winston-Salem, NC Auto Accident Lawyers\n
                  Winston-Salem, NC Immigration Lawyers\n Winston-Salem, NC Workers’ Comp Lawyers\n
                  \n\n Orlando, FL\n \n Orlando, FL Auto Accident Lawyers\n Orlando, FL Immigration
                  Lawyers\n Orlando, FL Workers’ Comp Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Charlotte, NC\n \n Charlotte, NC Workers’ Comp Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Charlotte, NC Workers’ Comp Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Durham, NC\n \n Durham, NC Immigration Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Durham, NC Immigration Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Raleigh, NC\n \n Raleigh, NC Workers’ Comp Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Raleigh, NC Workers’ Comp Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Smithfield, NC\n \n Smithfield, NC Auto Accident Lawyers\n Smithfield, NC
                  Immigration Lawyers\n Smithfield, NC Workers’ Comp Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Smithfield, NC Auto Accident Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Smithfield, NC Immigration Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Smithfield, NC Workers’ Comp Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Winston-Salem, NC\n \n Winston-Salem, NC Auto Accident Lawyers\n Winston-Salem, NC
                  Immigration Lawyers\n Winston-Salem, NC Workers’ Comp Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Winston-Salem, NC Auto Accident Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Winston-Salem, NC Immigration Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Winston-Salem, NC Workers’ Comp Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Orlando, FL\n \n Orlando, FL Auto Accident Lawyers\n Orlando, FL Immigration
                  Lawyers\n Orlando, FL Workers’ Comp Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Orlando, FL Auto Accident Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Orlando, FL Immigration Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Orlando, FL Workers’ Comp Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Traffic Tickets, NC</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Family-Based Immigration</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Fiance K Visa</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Immediate Relative Visas</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Family Preference Visas</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">The Visa Process</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Visa Denial Assistance and Appeals</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Waivers of Inadmissibility</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Adjustment of Status</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Green Cards</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Asylum and Refugees</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Citizenship and Naturalization</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Deportation Removal Defense</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">VAWA and U Visas</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Immigration Detention Bond Hearing</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Criminal Convictions</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">DACA</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Memorandum on Deferred Enforced Departure for Certain Venezuelans
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Employment-Based Immigration\n \n PERM Labor Certification\n TN Visa\n E Visa\n
                  H-2B Visa
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">PERM Labor Certification</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">TN Visa</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">E Visa</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">H-2B Visa</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">FAQs</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">T Visa Immigration Attorneys</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">PERM Labor Certification</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">TN Visa</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">E Visa</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">H-2B Visa</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Car Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Truck Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Motorcycle Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Pedestrian Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Drunk Driver Liability</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Mass Transit Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Boating and Water Recreation Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Emergency Vehicle Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Bicycle Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Uninsured and Underinsured Motorists</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Premises Liability</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Depression and Mental Health Injuries</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Lifting Injuries</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Repetitive Stress Injuries</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Equipment Accidents and Failures</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Construction Site Injuries</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Third-Party Claims in Workers’ Compensation</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Drug Cases\n \n Possession\n Trafficking and Distribution\n Marijuana Charges
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Possession</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Trafficking and Distribution</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Marijuana Charges</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  DWI\n \n Multiple DWIs\n How to Get Your License Back\n FAQs
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Multiple DWIs</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">How to Get Your License Back</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">FAQs</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Domestic Violence</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Traffic Offenses</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Theft</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Expungement</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Probation Violations</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Weapons Offenses</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Violent Crimes</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">White Collar Crimes</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Possession</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Trafficking and Distribution</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Marijuana Charges</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Multiple DWIs</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">How to Get Your License Back</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">FAQs</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Divorce</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Alimony</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Post Separation Support</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Separation Agreements</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Equitable Distribution of Property and Debt</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Domestic Violence Protective Order</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Name Change</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Post Divorce Modifications and Enforcement</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Charlotte, NC\n \n Charlotte, NC Workers’ Comp Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Charlotte, NC Workers’ Comp Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Durham, NC\n \n Durham, NC Immigration Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Durham, NC Immigration Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Raleigh, NC\n \n Raleigh, NC Workers’ Comp Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Raleigh, NC Workers’ Comp Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Smithfield, NC\n \n Smithfield, NC Auto Accident Lawyers\n Smithfield, NC
                  Immigration Lawyers\n Smithfield, NC Workers’ Comp Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Smithfield, NC Auto Accident Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Smithfield, NC Immigration Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Smithfield, NC Workers’ Comp Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Winston-Salem, NC\n \n Winston-Salem, NC Auto Accident Lawyers\n Winston-Salem, NC
                  Immigration Lawyers\n Winston-Salem, NC Workers’ Comp Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Winston-Salem, NC Auto Accident Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Winston-Salem, NC Immigration Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Winston-Salem, NC Workers’ Comp Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Orlando, FL\n \n Orlando, FL Auto Accident Lawyers\n Orlando, FL Immigration
                  Lawyers\n Orlando, FL Workers’ Comp Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Orlando, FL Auto Accident Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Orlando, FL Immigration Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Orlando, FL Workers’ Comp Lawyers</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Charlotte, NC Workers’ Comp Lawyers</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Durham, NC Immigration Lawyers</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Raleigh, NC Workers’ Comp Lawyers</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Smithfield, NC Auto Accident Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Smithfield, NC Immigration Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Smithfield, NC Workers’ Comp Lawyers</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Winston-Salem, NC Auto Accident Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Winston-Salem, NC Immigration Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Winston-Salem, NC Workers’ Comp Lawyers</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Orlando, FL Auto Accident Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Orlando, FL Immigration Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Orlando, FL Workers’ Comp Lawyers</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Past Winners</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Smithfield</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Raleigh</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Charlotte</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Orlando</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Goldsboro</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">William Vasquez</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Adriana ingram</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Mark Kelsey</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Roselyn V. Torrellas</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Jillian Baucom</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Judith Parkes</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Christopher Afanador</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Immigration\n \n Family-Based Immigration\n Fiance K Visa\n Immediate Relative
                  Visas\n Family Preference Visas\n The Visa Process\n Visa Denial Assistance and
                  Appeals\n Waivers of Inadmissibility\n Adjustment of Status\n Green Cards\n Asylum
                  and Refugees\n Citizenship and Naturalization\n Deportation Removal Defense\n VAWA
                  and U Visas\n Immigration Detention Bond Hearing\n Criminal Convictions\n DACA\n
                  Memorandum on Deferred Enforced Departure for Certain Venezuelans\n
                  Employment-Based Immigration\n \n PERM Labor Certification\n TN Visa\n E Visa\n
                  H-2B Visa\n \n\n FAQs\n T Visa Immigration Attorneys
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Family-Based Immigration</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Fiance K Visa</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Immediate Relative Visas</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Family Preference Visas</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">The Visa Process</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Visa Denial Assistance and Appeals</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Waivers of Inadmissibility</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Adjustment of Status</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Green Cards</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Asylum and Refugees</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Citizenship and Naturalization</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Deportation Removal Defense</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">VAWA and U Visas</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Immigration Detention Bond Hearing</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Criminal Convictions</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">DACA</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Memorandum on Deferred Enforced Departure for Certain Venezuelans
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Employment-Based Immigration\n \n PERM Labor Certification\n TN Visa\n E Visa\n
                  H-2B Visa
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">PERM Labor Certification</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">TN Visa</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">E Visa</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">H-2B Visa</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">FAQs</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">T Visa Immigration Attorneys</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Personal Injury\n \n Car Accidents\n Truck Accidents\n Motorcycle Accidents\n
                  Pedestrian Accidents\n Drunk Driver Liability\n Mass Transit Accidents\n Boating
                  and Water Recreation Accidents\n Emergency Vehicle Accidents\n Bicycle Accidents\n
                  Uninsured and Underinsured Motorists\n Premises Liability
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Car Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Truck Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Motorcycle Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Pedestrian Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Drunk Driver Liability</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Mass Transit Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Boating and Water Recreation Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Emergency Vehicle Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Bicycle Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Uninsured and Underinsured Motorists</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Premises Liability</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Workers’ Compensation\n \n Depression and Mental Health Injuries\n Lifting
                  Injuries\n Repetitive Stress Injuries\n Equipment Accidents and Failures\n
                  Construction Site Injuries\n Third-Party Claims in Workers’ Compensation
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Depression and Mental Health Injuries</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Lifting Injuries</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Repetitive Stress Injuries</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Equipment Accidents and Failures</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Construction Site Injuries</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Third-Party Claims in Workers’ Compensation</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Criminal Defense\n \n Drug Cases\n \n Possession\n Trafficking and Distribution\n
                  Marijuana Charges\n \n\n DWI\n \n Multiple DWIs\n How to Get Your License Back\n
                  FAQs\n \n\n Domestic Violence\n Traffic Offenses\n Theft\n Expungement\n Probation
                  Violations\n Weapons Offenses\n Violent Crimes\n White Collar Crimes
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Drug Cases\n \n Possession\n Trafficking and Distribution\n Marijuana Charges
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Possession</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Trafficking and Distribution</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Marijuana Charges</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  DWI\n \n Multiple DWIs\n How to Get Your License Back\n FAQs
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Multiple DWIs</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">How to Get Your License Back</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">FAQs</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Domestic Violence</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Traffic Offenses</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Theft</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Expungement</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Probation Violations</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Weapons Offenses</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Violent Crimes</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">White Collar Crimes</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Family Law\n \n Divorce\n Alimony\n Post Separation Support\n Separation
                  Agreements\n Equitable Distribution of Property and Debt\n Domestic Violence
                  Protective Order\n Name Change\n Post Divorce Modifications and Enforcement
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Divorce</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Alimony</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Post Separation Support</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Separation Agreements</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Equitable Distribution of Property and Debt</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Domestic Violence Protective Order</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Name Change</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Post Divorce Modifications and Enforcement</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Make Payment</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Areas We Serve\n \n Charlotte, NC\n \n Charlotte, NC Workers’ Comp Lawyers\n \n\n
                  Durham, NC\n \n Durham, NC Immigration Lawyers\n \n\n Raleigh, NC\n \n Raleigh, NC
                  Workers’ Comp Lawyers\n \n\n Smithfield, NC\n \n Smithfield, NC Auto Accident
                  Lawyers\n Smithfield, NC Immigration Lawyers\n Smithfield, NC Workers’ Comp
                  Lawyers\n \n\n Winston-Salem, NC\n \n Winston-Salem, NC Auto Accident Lawyers\n
                  Winston-Salem, NC Immigration Lawyers\n Winston-Salem, NC Workers’ Comp Lawyers\n
                  \n\n Orlando, FL\n \n Orlando, FL Auto Accident Lawyers\n Orlando, FL Immigration
                  Lawyers\n Orlando, FL Workers’ Comp Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Charlotte, NC\n \n Charlotte, NC Workers’ Comp Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Charlotte, NC Workers’ Comp Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Durham, NC\n \n Durham, NC Immigration Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Durham, NC Immigration Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Raleigh, NC\n \n Raleigh, NC Workers’ Comp Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Raleigh, NC Workers’ Comp Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Smithfield, NC\n \n Smithfield, NC Auto Accident Lawyers\n Smithfield, NC
                  Immigration Lawyers\n Smithfield, NC Workers’ Comp Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Smithfield, NC Auto Accident Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Smithfield, NC Immigration Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Smithfield, NC Workers’ Comp Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Winston-Salem, NC\n \n Winston-Salem, NC Auto Accident Lawyers\n Winston-Salem, NC
                  Immigration Lawyers\n Winston-Salem, NC Workers’ Comp Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Winston-Salem, NC Auto Accident Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Winston-Salem, NC Immigration Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Winston-Salem, NC Workers’ Comp Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Orlando, FL\n \n Orlando, FL Auto Accident Lawyers\n Orlando, FL Immigration
                  Lawyers\n Orlando, FL Workers’ Comp Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Orlando, FL Auto Accident Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Orlando, FL Immigration Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Orlando, FL Workers’ Comp Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Traffic Tickets, NC</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Family-Based Immigration</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Fiance K Visa</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Immediate Relative Visas</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Family Preference Visas</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">The Visa Process</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Visa Denial Assistance and Appeals</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Waivers of Inadmissibility</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Adjustment of Status</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Green Cards</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Asylum and Refugees</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Citizenship and Naturalization</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Deportation Removal Defense</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">VAWA and U Visas</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Immigration Detention Bond Hearing</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Criminal Convictions</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">DACA</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Memorandum on Deferred Enforced Departure for Certain Venezuelans
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Employment-Based Immigration\n \n PERM Labor Certification\n TN Visa\n E Visa\n
                  H-2B Visa
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">PERM Labor Certification</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">TN Visa</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">E Visa</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">H-2B Visa</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">FAQs</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">T Visa Immigration Attorneys</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">PERM Labor Certification</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">TN Visa</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">E Visa</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">H-2B Visa</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Car Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Truck Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Motorcycle Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Pedestrian Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Drunk Driver Liability</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Mass Transit Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Boating and Water Recreation Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Emergency Vehicle Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Bicycle Accidents</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Uninsured and Underinsured Motorists</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Premises Liability</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Depression and Mental Health Injuries</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Lifting Injuries</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Repetitive Stress Injuries</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Equipment Accidents and Failures</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Construction Site Injuries</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Third-Party Claims in Workers’ Compensation</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Drug Cases\n \n Possession\n Trafficking and Distribution\n Marijuana Charges
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Possession</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Trafficking and Distribution</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Marijuana Charges</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  DWI\n \n Multiple DWIs\n How to Get Your License Back\n FAQs
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Multiple DWIs</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">How to Get Your License Back</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">FAQs</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Domestic Violence</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Traffic Offenses</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Theft</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Expungement</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Probation Violations</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Weapons Offenses</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Violent Crimes</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">White Collar Crimes</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Possession</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Trafficking and Distribution</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Marijuana Charges</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Multiple DWIs</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">How to Get Your License Back</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">FAQs</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Divorce</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Alimony</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Post Separation Support</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Separation Agreements</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Equitable Distribution of Property and Debt</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Domestic Violence Protective Order</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Name Change</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Post Divorce Modifications and Enforcement</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Charlotte, NC\n \n Charlotte, NC Workers’ Comp Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Charlotte, NC Workers’ Comp Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Durham, NC\n \n Durham, NC Immigration Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Durham, NC Immigration Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Raleigh, NC\n \n Raleigh, NC Workers’ Comp Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Raleigh, NC Workers’ Comp Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Smithfield, NC\n \n Smithfield, NC Auto Accident Lawyers\n Smithfield, NC
                  Immigration Lawyers\n Smithfield, NC Workers’ Comp Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Smithfield, NC Auto Accident Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Smithfield, NC Immigration Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Smithfield, NC Workers’ Comp Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Winston-Salem, NC\n \n Winston-Salem, NC Auto Accident Lawyers\n Winston-Salem, NC
                  Immigration Lawyers\n Winston-Salem, NC Workers’ Comp Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Winston-Salem, NC Auto Accident Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Winston-Salem, NC Immigration Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Winston-Salem, NC Workers’ Comp Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Orlando, FL\n \n Orlando, FL Auto Accident Lawyers\n Orlando, FL Immigration
                  Lawyers\n Orlando, FL Workers’ Comp Lawyers
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Orlando, FL Auto Accident Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Orlando, FL Immigration Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Orlando, FL Workers’ Comp Lawyers</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Charlotte, NC Workers’ Comp Lawyers</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Durham, NC Immigration Lawyers</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Raleigh, NC Workers’ Comp Lawyers</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Smithfield, NC Auto Accident Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Smithfield, NC Immigration Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Smithfield, NC Workers’ Comp Lawyers</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Winston-Salem, NC Auto Accident Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Winston-Salem, NC Immigration Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Winston-Salem, NC Workers’ Comp Lawyers</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Orlando, FL Auto Accident Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Orlando, FL Immigration Lawyers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Orlando, FL Workers’ Comp Lawyers</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Past Winners</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Smithfield</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Raleigh</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Charlotte</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Orlando</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Goldsboro</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Follow</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Follow</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Follow</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Determining child custody arrangements</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Alimony concerns</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Post-separation support</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Separation agreements</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Equitable distribution of your marital property
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Allegations of domestic violence</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Name changes</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Immigration Attorneys</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Personal Injury Attorneys</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Workers’ Compensation Attorneys</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Criminal Defense Attorneys</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Family Law Attorneys</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Follow</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Follow</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Follow</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Follow</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Follow</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-[#FF6B6B] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Follow</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#001845] to-[#003875] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Get Expert Family Law Legal Help</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Don't face legal challenges alone. Our experienced attorneys are ready to fight for your
            rights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-[#FF6B6B] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#FF5252] transition-colors"
            >
              Schedule Your Free Consultation
            </Link>
            <a
              href="tel:919-537-8722"
              className="inline-block bg-white text-[#001845] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Call Now: (919) 537-8722
            </a>
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
            serviceType: 'Family Law Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/family-law/page',
            description:
              'Family Law legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
