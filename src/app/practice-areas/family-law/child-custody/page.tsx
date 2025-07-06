import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'NC Child Custody Lawyer | Custody & Visitation Attorney | Vasquez Law Firm',
  description:
    'Fighting for your parental rights in North Carolina. Our child custody attorneys handle custody disputes, modifications, and visitation issues. Se habla español.',
  keywords: [
    'child custody lawyer NC',
    'North Carolina custody attorney',
    'visitation rights lawyer',
    'joint custody attorney NC',
    'child custody modification lawyer',
    'Charlotte custody lawyer',
    'Raleigh family custody attorney',
    'abogado custodia hijos',
    'emergency custody lawyer NC',
    'parenting plan attorney',
  ],
  openGraph: {
    title: 'NC Child Custody Lawyer | Fighting for Your Children',
    description:
      "Protecting parent-child relationships with experienced custody representation. We fight for your rights and your children's best interests.",
    images: [
      {
        url: '/images/child-custody-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Child Custody Attorney',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/practice-areas/family-law/child-custody',
    languages: {
      es: 'https://www.vasquezlawfirm.com/es/areas-de-practica/derecho-familiar/custodia-hijos',
    },
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

export default function ChildCustodyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#001845] to-[#003875] text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              North Carolina Child Custody Lawyer
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-[#FF6B6B] mb-6">
              YO PELEO POR TI™
            </p>
            <p className="text-xl mb-8 text-gray-100">
              Your children deserve stability and love from both parents. We fight for custody
              arrangements that protect your parental rights while prioritizing your children&apos;s best
              interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-block bg-[#FF6B6B] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#FF5252] transition-colors text-center"
              >
                Protect Your Rights
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

      {/* Best Interests Factors Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            NC&apos;s &quot;Best Interests of the Child&quot; Standard
          </h2>
          <p className="text-lg text-gray-700 text-center mb-8 max-w-3xl mx-auto">
            North Carolina courts determine custody based on what\&apos;s best for the child, not parent
            preferences. Key factors include:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">Child&apos;s Needs</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Physical & emotional health</li>
                <li>• Educational requirements</li>
                <li>• Special needs considerations</li>
                <li>• Stability and continuity</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">Parent Factors</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Living situations</li>
                <li>• Work schedules</li>
                <li>• Physical/mental health</li>
                <li>• Parenting abilities</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">Relationships</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Child&apos;s preference (if appropriate age)</li>
                <li>• Sibling bonds</li>
                <li>• Extended family ties</li>
                <li>• Community connections</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Custody Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Understanding NC Custody Types
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Physical Custody</h3>
              <p className="text-gray-700 mb-4">
                Where your child lives day-to-day. Options include:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li>
                  <strong>Primary Physical Custody:</strong> Child lives mainly with one parent,
                  other has visitation
                </li>
                <li>
                  <strong>Joint Physical Custody:</strong> Child spends substantial time with both
                  parents
                </li>
                <li>
                  <strong>Split Custody:</strong> Siblings divided between parents (rare)
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Legal Custody</h3>
              <p className="text-gray-700 mb-4">
                Decision-making authority for your child. Covers:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li>
                  <strong>Education:</strong> School choice, special needs services
                </li>
                <li>
                  <strong>Healthcare:</strong> Medical decisions, treatments
                </li>
                <li>
                  <strong>Religion:</strong> Religious upbringing and activities
                </li>
                <li>
                  <strong>Activities:</strong> Extracurriculars, travel
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
            <p className="text-lg font-semibold mb-2">💡 Most Common Arrangement</p>
            <p className="text-gray-700">
              Joint legal custody with one parent having primary physical custody is the most common
              arrangement in NC. This allows both parents to make important decisions while
              providing stability for the child.
            </p>
          </div>
        </div>
      </section>

      {/* Custody Myths Alert */}
      <section className="py-16 bg-[#001845] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">⚖️ Common NC Custody Myths Debunked</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Myth: Mothers Always Win</h3>
                <p>
                  NC law requires gender-neutral custody decisions. Fathers have equal rights to
                  custody when it serves the child&apos;s best interests.
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Myth: Kids Choose at Age 12</h3>
                <p>
                  There\&apos;s no magic age. Courts may consider a child&apos;s preference but it&apos;s
                  one factor among many, not determinative.
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Myth: 50/50 is Automatic</h3>
                <p>
                  Equal time isn\&apos;t presumed. Courts focus on stability and what works best for
                  the specific child and family.
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Myth: Custody is Permanent</h3>
                <p>
                  Custody can be modified when there&apos;s a substantial change in circumstances
                  affecting the child&apos;s welfare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Temporary vs Permanent Orders Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Temporary vs. Permanent Custody Orders
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Temporary Orders</h3>
              <p className="text-gray-700 mb-4">Immediate protection while case is pending:</p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Establishes custody during divorce/separation</li>
                <li>✓ Sets visitation schedule</li>
                <li>✓ Orders temporary support</li>
                <li>✓ Can be modified as needed</li>
                <li>✓ Often becomes template for final order</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                <strong>Important:</strong> Temporary orders set precedent - fight for favorable
                terms early!
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Permanent Orders</h3>
              <p className="text-gray-700 mb-4">
                Final custody determination after trial or agreement:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Detailed parenting plan</li>
                <li>✓ Holiday/vacation schedules</li>
                <li>✓ Decision-making authority</li>
                <li>✓ Transportation arrangements</li>
                <li>✓ Communication guidelines</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                <strong>Note:</strong> &quot;Permanent&quot; doesn&apos;t mean unchangeable - can be modified
                if circumstances change substantially.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visitation Schedules Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Common NC Visitation Schedules
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">Every Other Weekend</h3>
              <p className="text-gray-700">
                Traditional schedule: Non-custodial parent has children Friday evening through
                Sunday evening, alternating weekends. Often includes one weeknight dinner.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">2-2-5-5 Schedule</h3>
              <p className="text-gray-700">
                Joint custody option: Parent A has Mon-Tues, Parent B has Wed-Thurs, then alternate
                Fri-Sun. Equal time, consistent schedule.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">Week On/Week Off</h3>
              <p className="text-gray-700">
                50/50 arrangement: Children alternate full weeks with each parent. Works well for
                older children with fewer transitions.
              </p>
            </div>
          </div>
          <div className="mt-8 bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
            <p className="text-lg font-semibold mb-2">📅 Holiday Schedules Matter Too!</p>
            <p className="text-gray-700">
              Don&apos;t forget to address holidays, birthdays, Mother&apos;s/Father&apos;s Day, school breaks, and
              summer vacation. Alternating years for major holidays is common.
            </p>
          </div>
        </div>
      </section>

      {/* Factors That Can Hurt Your Case Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Factors That Can Impact Your Custody Case
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-red-600">Potential Red Flags</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <div>
                    <strong>Substance Abuse:</strong> Current drug/alcohol problems
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <div>
                    <strong>Domestic Violence:</strong> History of abuse or protective orders
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <div>
                    <strong>Alienation:</strong> Attempting to turn child against other parent
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <div>
                    <strong>Instability:</strong> Frequent moves, job changes, relationships
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <div>
                    <strong>Non-Compliance:</strong> Violating current court orders
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-green-600">Positive Factors</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <div>
                    <strong>Stability:</strong> Consistent home, job, and routine
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <div>
                    <strong>Co-Parenting:</strong> Encouraging child&apos;s relationship with other
                    parent
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <div>
                    <strong>Involvement:</strong> Active in school, medical care, activities
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <div>
                    <strong>Documentation:</strong> Keeping records of parenting time
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <div>
                    <strong>Child Focus:</strong> Putting child&apos;s needs above conflict
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Modification Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Modifying Custody Orders in NC
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-lg text-gray-700 mb-6">
                Life changes, and custody orders can too. NC allows modifications when there\&apos;s a
                &quot;substantial change in circumstances&quot; affecting the child&apos;s welfare.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-[#001845]">
                    Valid Reasons for Modification
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Parent relocation</li>
                    <li>• Child&apos;s changing needs</li>
                    <li>• Parent&apos;s work schedule changes</li>
                    <li>• Substance abuse issues</li>
                    <li>• Remarriage and blended families</li>
                    <li>• Child&apos;s preference (older children)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-[#001845]">
                    NOT Grounds for Modification
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Minor disagreements</li>
                    <li>• One parent earning more money</li>
                    <li>• Wanting to punish other parent</li>
                    <li>• Child&apos;s temporary preferences</li>
                    <li>• Normal childhood issues</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Two-Step Process:</strong> First prove substantial change, then show
                  modification serves child&apos;s best interests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Custody Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Emergency Custody Situations
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-red-800 mb-4">
                When Immediate Action is Needed
              </h3>
              <p className="text-gray-700 mb-4">
                Courts can issue emergency custody orders when a child faces immediate danger:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">🚨</span>
                  <div>
                    <strong>Physical Abuse:</strong> Evidence of harm or credible threats
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">🚨</span>
                  <div>
                    <strong>Sexual Abuse:</strong> Allegations require immediate investigation
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">🚨</span>
                  <div>
                    <strong>Severe Neglect:</strong> Lack of food, shelter, medical care
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">🚨</span>
                  <div>
                    <strong>Parental Incapacity:</strong> Mental health crisis, overdose
                  </div>
                </li>
              </ul>
              <div className="mt-6 bg-white p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Act Fast:</strong> Emergency orders are temporary (usually 10 days). You
                  must file for permanent custody immediately and prepare for a full hearing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grandparent Rights Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Grandparent Visitation Rights in NC
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-lg text-gray-700 mb-6">
                North Carolina recognizes limited grandparent visitation rights. Grandparents can
                seek visitation when:
              </p>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li>✓ An ongoing custody case exists between parents</li>
                <li>✓ Parents are deceased, divorced, or separated</li>
                <li>✓ Grandparent has a substantial relationship with grandchild</li>
                <li>✓ Visitation is in child&apos;s best interests</li>
              </ul>
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                <p className="text-gray-700">
                  <strong>Important:</strong> Grandparents cannot seek visitation if the nuclear
                  family is intact and both parents object. Parent&apos;s rights are constitutionally
                  protected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Child Custody FAQs</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Do I need a custody order if we agree?</h3>
              <p className="text-gray-700">
                Yes! Informal agreements aren\&apos;t enforceable. Even if you&apos;re getting along
                now, a court order protects both parents and provides stability for children. It
                also establishes child support obligations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                Can my child decide which parent to live with?
              </h3>
              <p className="text-gray-700">
                NC has no set age when children choose. Judges may consider a child&apos;s
                preference based on maturity, not age. The preference is one factor among many -
                never the sole determining factor.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                What if my ex won\&apos;t follow the custody order?
              </h3>
              <p className="text-gray-700">
                Document all violations and contact your attorney immediately. Options include
                filing for contempt of court, which can result in fines, jail time, make-up
                visitation, or custody modification.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Can I move out of state with my child?</h3>
              <p className="text-gray-700">
                Not without court permission or the other parent&apos;s consent. Relocation that
                substantially affects the other parent&apos;s visitation rights requires court
                approval, considering the move&apos;s impact on the child.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                How is custody different from child support?
              </h3>
              <p className="text-gray-700">
                They&apos;re separate issues. Custody determines where children live and who makes
                decisions. Child support is financial obligation based on income and custody
                arrangement. You can\&apos;t withhold visitation for unpaid support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Office Locations */}
      <section className="py-16 bg-gradient-to-br from-[#001845] to-[#003875] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Fight for Your Children with Experienced Legal Support
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Your relationship with your children is precious. Don&apos;t navigate custody battles alone.
            Our compassionate attorneys protect your parental rights while keeping your children&apos;s
            best interests at heart.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/contact"
              className="inline-block bg-[#FF6B6B] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#FF5252] transition-colors"
            >
              Schedule Your Consultation
            </Link>
            <a
              href="tel:919-537-8722"
              className="inline-block bg-white text-[#001845] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Call Now: (919) 537-8722
            </a>
          </div>

          <div className="border-t border-white/20 pt-8">
            <h3 className="text-2xl font-semibold mb-6">
              Protecting Families Across North Carolina
            </h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <h4 className="font-semibold mb-2">Raleigh Office</h4>
                <p className="text-sm text-gray-200">6110 Creedmoor Rd.</p>
                <p className="text-sm text-gray-200">Raleigh, NC 27612</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Charlotte Office</h4>
                <p className="text-sm text-gray-200">309 W Bland St.</p>
                <p className="text-sm text-gray-200">Charlotte, NC 28203</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Smithfield Office</h4>
                <p className="text-sm text-gray-200">503 N 3rd St.</p>
                <p className="text-sm text-gray-200">Smithfield, NC 27577</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Orlando Office</h4>
                <p className="text-sm text-gray-200">5401 S Kirkman Rd #310</p>
                <p className="text-sm text-gray-200">Orlando, FL 32819</p>
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
            serviceType: 'Family Law Child Custody Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/family-law/child-custody/page',
            description:
              'Family Law Child Custody legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
