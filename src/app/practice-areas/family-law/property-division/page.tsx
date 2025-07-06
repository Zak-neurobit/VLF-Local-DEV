import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'NC Property Division Lawyer | Equitable Distribution Attorney',
  description:
    'Protecting your assets in North Carolina divorce. Our property division attorneys fight for fair distribution of marital property, debts, and retirement accounts.',
  keywords: [
    'property division lawyer NC',
    'equitable distribution attorney North Carolina',
    'marital property lawyer',
    'divorce asset division attorney',
    'retirement division QDRO lawyer',
    'Charlotte property division attorney',
    'Raleigh equitable distribution lawyer',
    'abogado division bienes divorcio',
    'business valuation divorce NC',
    'separate property attorney',
  ],
  openGraph: {
    title: 'NC Property Division & Equitable Distribution Lawyer',
    description:
      "Fair division of marital assets and debts. We protect what you\'ve earned and fight for your financial security.",
    images: [
      {
        url: '/images/property-division-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Property Division Attorney',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/practice-areas/family-law/property-division',
    languages: {
      es: 'https://www.vasquezlawfirm.com/es/areas-de-practica/derecho-familiar/division-propiedad',
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

export default function PropertyDivisionPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#001845] to-[#003875] text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              North Carolina Property Division Lawyer
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-[#FF6B6B] mb-6">
              YO PELEO POR TI™
            </p>
            <p className="text-xl mb-8 text-gray-100">
              You&apos;ve worked hard for what you have. In divorce, North Carolina&apos;s equitable
              distribution laws determine who gets what. We fight to protect your assets and ensure
              a fair division.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-block bg-[#FF6B6B] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#FF5252] transition-colors text-center"
              >
                Protect Your Assets
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

      {/* Equitable Distribution Basics Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Understanding NC&apos;s Equitable Distribution Law
          </h2>
          <p className="text-lg text-gray-700 text-center mb-8 max-w-3xl mx-auto">
            North Carolina follows &quot;equitable distribution&quot; - meaning fair, not necessarily equal.
            Courts divide marital property based on what\&apos;s just, considering many factors.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-[#FF6B6B] mb-2">50/50</p>
              <p className="text-gray-700">Starting presumption</p>
              <p className="text-sm text-gray-500 mt-2">But can vary based on factors</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-[#FF6B6B] mb-2">3 Steps</p>
              <p className="text-gray-700">Classify, value, distribute</p>
              <p className="text-sm text-gray-500 mt-2">Each step is crucial</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-[#FF6B6B] mb-2">Date</p>
              <p className="text-gray-700">Separation date matters</p>
              <p className="text-sm text-gray-500 mt-2">Values fixed at separation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Classification of Property Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Step 1: Classifying Property - Marital vs. Separate
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-[#001845]">Marital Property</h3>
              <p className="text-gray-700 mb-4">Subject to division:</p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Property acquired during marriage</li>
                <li>✓ Income earned during marriage</li>
                <li>✓ Retirement contributions made during marriage</li>
                <li>✓ Businesses started during marriage</li>
                <li>✓ Debts incurred during marriage</li>
                <li>✓ Appreciation of separate property due to marital efforts</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-[#001845]">Separate Property</h3>
              <p className="text-gray-700 mb-4">Yours to keep:</p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Owned before marriage</li>
                <li>✓ Inherited (even during marriage)</li>
                <li>✓ Gifts to you alone</li>
                <li>✓ Personal injury settlements</li>
                <li>✓ Property in prenuptial agreement</li>
                <li>✓ Passive appreciation of separate property</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-[#001845]">
                Mixed/Divisible Property
              </h3>
              <p className="text-gray-700 mb-4">Partially marital:</p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Separate property improved with marital funds</li>
                <li>✓ Retirement accounts with pre/post marriage contributions</li>
                <li>✓ Businesses grown during marriage</li>
                <li>✓ Real estate with mixed payments</li>
                <li>✓ Appreciation between separation and distribution</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Common Assets Alert */}
      <section className="py-16 bg-[#001845] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">💰 Major Assets Often Overlooked in Divorce</h2>
            <p className="text-xl mb-8">
              Don&apos;t leave money on the table. Many spouses forget about or undervalue these marital
              assets:
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Financial Assets</h3>
                <ul className="space-y-2">
                  <li>• Stock options & RSUs</li>
                  <li>• Pension values</li>
                  <li>• Deferred compensation</li>
                  <li>• Cryptocurrency</li>
                  <li>• Business goodwill</li>
                  <li>• Tax refunds</li>
                </ul>
              </div>
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Other Values</h3>
                <ul className="space-y-2">
                  <li>• Professional degrees/licenses</li>
                  <li>• Airline/hotel points</li>
                  <li>• Club memberships</li>
                  <li>• Intellectual property</li>
                  <li>• Insurance cash values</li>
                  <li>• Season tickets</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valuation Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Step 2: Valuing Marital Assets
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-lg text-gray-700 mb-6">
                Accurate valuation is crucial. The date of separation generally sets values, but
                some assets need professional appraisal:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-[#001845]">Common Valuation Methods</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      • <strong>Real Estate:</strong> Professional appraisal or CMA
                    </li>
                    <li>
                      • <strong>Vehicles:</strong> Kelley Blue Book or NADA
                    </li>
                    <li>
                      • <strong>Retirement:</strong> Account statements + QDRO expert
                    </li>
                    <li>
                      • <strong>Bank/Investment:</strong> Statements at separation
                    </li>
                    <li>
                      • <strong>Personal Property:</strong> Garage sale or replacement value
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-[#001845]">
                    Complex Valuations Need Experts
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      • <strong>Business interests:</strong> Business valuator/CPA
                    </li>
                    <li>
                      • <strong>Professional practices:</strong> Industry specialist
                    </li>
                    <li>
                      • <strong>Stock options:</strong> Financial analyst
                    </li>
                    <li>
                      • <strong>Art/collectibles:</strong> Certified appraiser
                    </li>
                    <li>
                      • <strong>Pensions:</strong> Actuarial expert
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                <p className="text-gray-700">
                  <strong>Warning:</strong> Don&apos;t accept your spouse&apos;s valuations without
                  verification. Hidden value is common in complex assets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Distribution Factors Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Step 3: Distribution Factors Courts Consider
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">Income & Property</h3>
              <p className="text-gray-700">
                Each party&apos;s income, property brought to marriage, and earning potential. Higher
                earners may receive less to balance outcomes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">Length of Marriage</h3>
              <p className="text-gray-700">
                Longer marriages typically see more equal division. Short marriages may return
                parties closer to pre-marriage positions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">Age & Health</h3>
              <p className="text-gray-700">
                Physical and mental health, age, and ability to acquire future assets. Older or
                disabled spouses may receive more.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">Contributions</h3>
              <p className="text-gray-700">
                Both financial and non-financial contributions count. Homemaking and child-rearing
                are valued equally to income earning.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">Liquid vs. Non-Liquid</h3>
              <p className="text-gray-700">
                Need for liquid assets vs. retirement accounts. Courts try to avoid forcing sales of
                homes or liquidating retirement.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">Tax Consequences</h3>
              <p className="text-gray-700">
                Tax implications of asset transfers. Some assets carry hidden tax burdens that
                affect true value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Retirement Division Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Dividing Retirement Accounts & Pensions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">
                401(k), IRA, 403(b) Division
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Only marital portion is divided</li>
                <li>• QDRO required for 401(k)/403(b)</li>
                <li>• IRA needs transfer incident to divorce</li>
                <li>• No taxes/penalties if done correctly</li>
                <li>• Can be immediate or deferred division</li>
                <li>• Investment gains/losses shared</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Pension Division</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Complex valuation required</li>
                <li>• Present value vs. future payments</li>
                <li>• Survivor benefits must be addressed</li>
                <li>• Government pensions have special rules</li>
                <li>• Military retirement = federal law applies</li>
                <li>• Some pensions can&apos;t be divided</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
            <p className="text-lg font-semibold mb-2">⚠️ QDRO Must Be Perfect</p>
            <p className="text-gray-700">
              Qualified Domestic Relations Orders (QDROs) must meet strict requirements. One mistake
              can cost thousands or delay retirement. Always use a QDRO specialist.
            </p>
          </div>
        </div>
      </section>

      {/* Real Estate Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            The Marital Home: Your Biggest Asset
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Options for the House</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="bg-[#001845] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">Sell & Split</h4>
                  <p className="text-gray-700 text-sm">
                    Clean break, divide proceeds after paying mortgage and costs
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-[#001845] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">One Spouse Keeps</h4>
                  <p className="text-gray-700 text-sm">
                    Buy out other&apos;s equity, refinance to remove from mortgage
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-[#001845] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">Defer Sale</h4>
                  <p className="text-gray-700 text-sm">
                    Kids stay until graduation, then sell and split
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Considerations:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Can you afford the mortgage, taxes, insurance alone?</li>
                    <li>• Will you qualify to refinance in your name only?</li>
                    <li>• What about maintenance and repair costs?</li>
                    <li>• Is keeping the house worth giving up other assets?</li>
                    <li>• Tax implications of sale vs. keeping</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Debt Division Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Dividing Marital Debts
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-red-800 mb-4">
                Critical: Creditors Don&apos;t Care About Your Divorce Decree
              </h3>
              <p className="text-gray-700 mb-4">
                If your name is on a debt, creditors can come after you regardless of what the
                divorce decree says. Protect yourself:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Joint Debts</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Close joint credit cards immediately</li>
                    <li>• Refinance loans into one name</li>
                    <li>• Pay off and close if possible</li>
                    <li>• Get indemnification clauses</li>
                    <li>• Monitor credit reports</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Common Marital Debts</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Mortgages and HELOCs</li>
                    <li>• Credit card balances</li>
                    <li>• Auto loans</li>
                    <li>• Personal loans</li>
                    <li>• Tax debts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Division Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Dividing a Business in Divorce
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Valuation Challenges</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Goodwill:</strong> Personal vs. enterprise goodwill matters in NC
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Income approach:</strong> Future earnings projections
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Market approach:</strong> Comparable business sales
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Asset approach:</strong> Value of tangible assets
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Discounts:</strong> Minority interest, marketability
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Division Options</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Buy-out:</strong> One spouse keeps business, pays other
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Co-ownership:</strong> Rarely works but possible
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Sell to third party:</strong> Split proceeds
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Offset:</strong> Trade for other assets
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Payment plan:</strong> Buy-out over time
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden Assets Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Finding Hidden Assets
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">
                Red Flags of Hidden Assets
              </h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-2">Behavior Changes</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Sudden decrease in income</li>
                    <li>• Unexplained cash withdrawals</li>
                    <li>• Secret credit cards or accounts</li>
                    <li>• Defensive about finances</li>
                    <li>• Changes passwords</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Discovery Tools</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Subpoena bank records</li>
                    <li>• Forensic accountant review</li>
                    <li>• Tax return analysis</li>
                    <li>• Depositions under oath</li>
                    <li>• Lifestyle analysis</li>
                  </ul>
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                <p className="text-gray-700">
                  <strong>Common Hiding Places:</strong> Overpaying taxes (for refund later),
                  &quot;loans&quot; to family, cryptocurrency, delayed bonuses, offshore accounts, cash
                  businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre/Post Nuptial Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Prenuptial & Postnuptial Agreements
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-lg text-gray-700 mb-6">
                Valid agreements can override NC&apos;s equitable distribution laws, but they must meet
                strict requirements:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-[#001845]">Requirements for Validity</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Full financial disclosure</li>
                    <li>✓ Voluntary - no duress</li>
                    <li>✓ Time to review before signing</li>
                    <li>✓ Independent legal counsel</li>
                    <li>✓ Fair when signed</li>
                    <li>✓ Not unconscionable now</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-[#001845]">Can Be Challenged If:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>✗ Hidden assets at signing</li>
                    <li>✗ Signed under pressure</li>
                    <li>✗ No attorney review</li>
                    <li>✗ Extremely unfair terms</li>
                    <li>✗ Invalid provisions</li>
                    <li>✗ Circumstances drastically changed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Property Division FAQs
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                Is inheritance considered marital property?
              </h3>
              <p className="text-gray-700">
                Generally no - inheritance is separate property even if received during marriage.
                However, if you mix inheritance with marital funds or use it for marital purposes
                (like paying the mortgage), it may become partially marital.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                What happens to property we still owe money on?
              </h3>
              <p className="text-gray-700">
                The equity (value minus debt) is divided, not the total value. Whoever keeps the
                property usually must refinance to remove the other spouse from the loan. Both the
                asset and debt are considered.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Can I keep gifts from my spouse?</h3>
              <p className="text-gray-700">
                Gifts between spouses during marriage are generally marital property subject to
                division. Engagement rings are typically separate property. Birthday/holiday gifts
                might be considered yours, depending on value and intent.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                How are pets handled in property division?
              </h3>
              <p className="text-gray-700">
                In NC, pets are property, not subject to custody laws. Courts consider who primarily
                cared for the pet, who paid expenses, and children&apos;s attachment. Some couples create
                &quot;pet custody&quot; agreements outside court.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                What if my spouse wastes marital assets?
              </h3>
              <p className="text-gray-700">
                Dissipation of assets (gambling, affairs, excessive spending) can be considered.
                Courts may credit the wasted amount to that spouse&apos;s share of property
                division. Document all suspicious transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Office Locations */}
      <section className="py-16 bg-gradient-to-br from-[#001845] to-[#003875] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Protect What You&apos;ve Worked Hard to Build</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Property division can make the difference between financial security and starting over.
            Don&apos;t leave your future to chance - get experienced legal representation to protect your
            assets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/contact"
              className="inline-block bg-[#FF6B6B] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#FF5252] transition-colors"
            >
              Schedule Your Asset Protection Consultation
            </Link>
            <a
              href="tel:919-537-8722"
              className="inline-block bg-white text-[#001845] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Call Now: (919) 537-8722
            </a>
          </div>

          <div className="border-t border-white/20 pt-8">
            <h3 className="text-2xl font-semibold mb-6">Protecting Assets Across North Carolina</h3>
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
            serviceType: 'Family Law Property Division Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/family-law/property-division/page',
            description:
              'Family Law Property Division legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
