import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'NC Divorce Lawyer | Separation & Family Law Attorney | Vasquez Law Firm',
  description:
    'Compassionate divorce attorneys in North Carolina. We guide you through separation, absolute divorce, and complex property division. Se habla español.',
  keywords: [
    'divorce lawyer NC',
    'North Carolina divorce attorney',
    'separation agreement lawyer',
    'absolute divorce NC',
    'uncontested divorce attorney',
    'Charlotte divorce lawyer',
    'Raleigh family law attorney',
    'abogado divorcio NC',
    'equitable distribution lawyer',
    'NC divorce process',
  ],
  openGraph: {
    title: 'NC Divorce Lawyer | Compassionate Family Law Attorney',
    description:
      'Navigate your divorce with experienced attorneys who understand NC law. We protect your rights and future.',
    images: [
      {
        url: '/images/divorce-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Divorce Attorney',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/practice-areas/family-law/divorce',
    languages: {
      es: 'https://www.vasquezlawfirm.com/es/areas-de-practica/derecho-familiar/divorcio',
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

export default function DivorcePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#001845] to-[#003875] text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              North Carolina Divorce Lawyer
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-[#FF6B6B] mb-6">
              YO PELEO POR TI™
            </p>
            <p className="text-xl mb-8 text-gray-100">
              Going through a divorce is never easy. Our compassionate attorneys guide you through
              North Carolina&apos;s divorce process while protecting your rights, assets, and children&apos;s
              best interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-block bg-[#FF6B6B] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#FF5252] transition-colors text-center"
              >
                Schedule Consultation
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

      {/* NC Divorce Requirements Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            North Carolina Divorce Requirements
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-[#FF6B6B] mb-2">6 Months</p>
              <p className="text-gray-700">Residency requirement</p>
              <p className="text-sm text-gray-500 mt-2">One spouse must live in NC</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-[#FF6B6B] mb-2">1 Year</p>
              <p className="text-gray-700">Separation period required</p>
              <p className="text-sm text-gray-500 mt-2">Living separate and apart</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-[#FF6B6B] mb-2">No Fault</p>
              <p className="text-gray-700">NC is a no-fault state</p>
              <p className="text-sm text-gray-500 mt-2">No need to prove wrongdoing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Divorce Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Types of Divorce in North Carolina
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Absolute Divorce</h3>
              <p className="text-gray-700 mb-4">
                The legal end of your marriage. Requires one year of separation and living apart
                with at least one spouse intending the separation to be permanent.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Ends the marriage legally</li>
                <li>✓ Allows remarriage</li>
                <li>✓ Must resolve property/support separately</li>
                <li>✓ Cannot be reversed once granted</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">
                Divorce from Bed and Board
              </h3>
              <p className="text-gray-700 mb-4">
                A court-ordered separation (not an actual divorce). Rarely used but available for
                fault-based grounds like abandonment or cruelty.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Legal separation only</li>
                <li>✓ Cannot remarry</li>
                <li>✓ Requires proving fault</li>
                <li>✓ Can affect property rights</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Separation Requirements Alert */}
      <section className="py-16 bg-[#001845] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              ⚖️ Understanding NC&apos;s One-Year Separation Rule
            </h2>
            <p className="text-xl mb-8">
              North Carolina requires couples to live &quot;separate and apart&quot; for one full year before
              filing for absolute divorce. This is strictly enforced.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">What Counts as Separated</h3>
                <ul className="space-y-2 text-left">
                  <li>✓ Living in different homes</li>
                  <li>✓ Separate bedrooms (same house) may qualify</li>
                  <li>✓ No romantic relationship</li>
                  <li>✓ Intent to remain separate</li>
                </ul>
              </div>
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">What Breaks Separation</h3>
                <ul className="space-y-2 text-left">
                  <li>✗ Resuming marital relations</li>
                  <li>✗ Moving back in together</li>
                  <li>✗ Isolated instances may not restart clock</li>
                  <li>✗ Must prove continuous separation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divorce Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            The NC Divorce Process Step-by-Step
          </h2>
          <div className="max-w-4xl mx-auto">
            <ol className="space-y-6">
              <li className="flex items-start">
                <span className="bg-[#FF6B6B] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  1
                </span>
                <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                  <h3 className="text-xl font-semibold mb-2">Separation Period</h3>
                  <p className="text-gray-700">
                    Live separate and apart for one full year. Document your separation date -
                    it\&apos;s crucial for filing.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-[#FF6B6B] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  2
                </span>
                <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                  <h3 className="text-xl font-semibold mb-2">File Complaint</h3>
                  <p className="text-gray-700">
                    After one year, file divorce complaint in the county where you or your spouse
                    lives.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-[#FF6B6B] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  3
                </span>
                <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                  <h3 className="text-xl font-semibold mb-2">Serve Your Spouse</h3>
                  <p className="text-gray-700">
                    Officially notify your spouse through sheriff, certified mail, or acceptance of
                    service.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-[#FF6B6B] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  4
                </span>
                <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                  <h3 className="text-xl font-semibold mb-2">Wait Period</h3>
                  <p className="text-gray-700">
                    Your spouse has 30 days to respond (60 if out-of-state). No response = proceed
                    with divorce.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-[#FF6B6B] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  5
                </span>
                <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                  <h3 className="text-xl font-semibold mb-2">Court Hearing</h3>
                  <p className="text-gray-700">
                    Simple hearing to prove separation. Judge grants divorce if requirements are
                    met.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Issues to Resolve Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Important Issues to Resolve Before Divorce
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">Property Division</h3>
              <p className="text-gray-700">
                NC follows equitable distribution - fair but not always equal division of marital
                assets and debts.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">Child Custody</h3>
              <p className="text-gray-700">
                Physical and legal custody arrangements based on children&apos;s best interests.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">Child Support</h3>
              <p className="text-gray-700">
                Calculated using NC guidelines based on income, custody time, and expenses.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">Alimony</h3>
              <p className="text-gray-700">
                Post-separation support and long-term alimony based on need and ability to pay.
              </p>
            </div>
          </div>
          <div className="mt-8 bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
            <p className="text-lg font-semibold mb-2">⚠️ Act Before Divorce is Final!</p>
            <p className="text-gray-700">
              You lose the right to pursue equitable distribution and alimony once the divorce is
              granted. File these claims before or with your divorce to protect your rights.
            </p>
          </div>
        </div>
      </section>

      {/* Uncontested vs Contested Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Uncontested vs. Contested Divorce
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Uncontested Divorce</h3>
              <p className="text-gray-700 mb-4">
                You and your spouse agree on all issues. Faster, less expensive, and less stressful.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Agreement on property division</li>
                <li>✓ Agreed custody arrangements</li>
                <li>✓ Settled support issues</li>
                <li>✓ Lower attorney fees</li>
                <li>✓ Typically 30-60 days after filing</li>
                <li>✓ Less emotional toll</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Contested Divorce</h3>
              <p className="text-gray-700 mb-4">
                Disagreements require court intervention. More complex but sometimes necessary.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Disputes over assets/debts</li>
                <li>✓ Custody disagreements</li>
                <li>✓ Support amount disputes</li>
                <li>✓ Higher costs</li>
                <li>✓ Can take 6-18 months</li>
                <li>✓ May require trial</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Separation Agreement Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            The Power of a Separation Agreement
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-lg text-gray-700 mb-6">
                A well-drafted separation agreement can resolve most divorce issues without court
                battles. This contract between spouses covers:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-[#001845]">Financial Matters</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Division of property and assets</li>
                    <li>• Allocation of debts</li>
                    <li>• Alimony/spousal support</li>
                    <li>• Tax considerations</li>
                    <li>• Insurance coverage</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-[#001845]">Children&apos;s Issues</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Custody schedules</li>
                    <li>• Decision-making authority</li>
                    <li>• Child support amounts</li>
                    <li>• College expenses</li>
                    <li>• Holiday arrangements</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                <p className="text-gray-700">
                  <strong>Benefits:</strong> Avoid court, save money, maintain privacy, and control
                  your own outcome. Courts generally honor these agreements if fair and properly
                  executed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Common Divorce Mistakes to Avoid
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-red-600">Moving Out Too Soon</h3>
              <p className="text-gray-700">
                Leaving the marital home can affect custody and property rights. Consult an attorney
                first.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-red-600">Dating During Separation</h3>
              <p className="text-gray-700">
                Can be considered adultery in NC, affecting alimony and inflaming custody disputes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-red-600">Hiding Assets</h3>
              <p className="text-gray-700">
                Courts punish dishonesty severely. Full disclosure is required by law.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-red-600">Social Media Posts</h3>
              <p className="text-gray-700">
                Everything you post can be used in court. Stay off social media during divorce.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-red-600">DIY Legal Work</h3>
              <p className="text-gray-700">
                Missing deadlines or filing incorrectly can cost you property rights and support.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-red-600">Emotional Decisions</h3>
              <p className="text-gray-700">
                Making choices based on anger or revenge usually backfires legally and financially.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Military Divorce Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Military Divorce Considerations
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-lg text-gray-700 mb-6">
                North Carolina is home to Fort Liberty (Bragg), Camp Lejeune, and other military
                installations. Military divorces have unique considerations:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-3">•</span>
                  <div>
                    <strong>Military Pension Division:</strong> Subject to federal laws and the
                    10/10 rule for direct payment
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-3">•</span>
                  <div>
                    <strong>BAH and Benefits:</strong> Housing allowances and benefits change after
                    divorce
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-3">•</span>
                  <div>
                    <strong>SCRA Protection:</strong> Service members can delay proceedings during
                    deployment
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-3">•</span>
                  <div>
                    <strong>Jurisdiction Issues:</strong> Where to file when stationed elsewhere
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-3">•</span>
                  <div>
                    <strong>Healthcare:</strong> TRICARE coverage changes for former spouses
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Understanding Divorce Costs in NC
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Typical Expenses</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-700">Court filing fees</span>
                  <span className="font-semibold">$225+</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-700">Service of process</span>
                  <span className="font-semibold">$30-100</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-700">Uncontested divorce attorney</span>
                  <span className="font-semibold">$500-1,500</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-700">Contested divorce attorney</span>
                  <span className="font-semibold">$2,500-15,000+</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Mediation (if needed)</span>
                  <span className="font-semibold">$100-300/hour</span>
                </div>
              </div>
              <div className="mt-6 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="text-gray-700">
                  <strong>Payment Plans Available:</strong> We understand divorce creates financial
                  strain. Ask about our flexible payment options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            North Carolina Divorce FAQs
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                Do I need a reason to get divorced in NC?
              </h3>
              <p className="text-gray-700">
                No. North Carolina is a &quot;no-fault&quot; divorce state. You only need to live separate and
                apart for one year with the intent to remain separate. You don\&apos;t need to prove
                adultery, abandonment, or other fault.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Can I date during separation?</h3>
              <p className="text-gray-700">
                Technically, dating during separation is adultery in NC since you&apos;re still
                legally married. This can affect alimony claims and inflame custody disputes.
                It&apos;s best to wait until after the divorce is final.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                What if my spouse won\&apos;t sign the divorce papers?
              </h3>
              <p className="text-gray-700">
                Your spouse cannot stop the divorce by refusing to sign. After proper service, they
                have 30 days to respond. If they don&apos;t, you can proceed with a default divorce.
                Their cooperation isn&apos;t required.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">How is property divided in NC?</h3>
              <p className="text-gray-700">
                NC follows &quot;equitable distribution&quot; - marital property is divided fairly but not
                necessarily 50/50. Factors include length of marriage, each spouse&apos;s income,
                contributions to the marriage, and misconduct affecting finances.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Will I have to pay alimony?</h3>
              <p className="text-gray-700">
                Alimony depends on one spouse&apos;s need and the other&apos;s ability to pay. Factors
                include marriage length, standard of living, ages, earning capacities, and marital
                misconduct. It&apos;s not automatic and varies case by case.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Office Locations */}
      <section className="py-16 bg-gradient-to-br from-[#001845] to-[#003875] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Navigate Your Divorce with Compassionate Legal Support
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Divorce is difficult, but you don\&apos;t have to face it alone. Our experienced attorneys
            guide you through every step while protecting your rights and future.
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
            <h3 className="text-2xl font-semibold mb-6">Serving Families Across North Carolina</h3>
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
            serviceType: 'Family Law Divorce Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/family-law/divorce/page',
            description:
              'Family Law Divorce legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
