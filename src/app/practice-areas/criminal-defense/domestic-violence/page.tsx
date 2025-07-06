import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Phone, MapPin, ArrowRight, AlertTriangle, Home, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Domestic Violence Defense Lawyers NC & FL | Protective Orders | Vasquez Law Firm',
  description:
    'Expert domestic violence defense attorneys in Raleigh, Charlotte, Smithfield & Orlando. Defending false accusations, protective order violations, and domestic assault charges.',
  keywords:
    'domestic violence lawyer, protective order attorney, restraining order defense, domestic assault, false accusations, 50B order, criminal defense, Raleigh NC, Charlotte NC, Orlando FL',
  openGraph: {
    title: 'Domestic Violence Defense Lawyers | Protective Orders | Vasquez Law Firm',
    description:
      'Expert domestic violence defense attorneys protecting your rights against false accusations.',
    type: 'website',
    images: [
      {
        url: '/images/domestic-violence-defense-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Domestic Violence Defense Lawyers',
      },
    ],
  },
};

export default function DomesticViolencePage() {
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
              href="/practice-areas/criminal-defense"
              className="text-burgundy-700 hover:underline"
            >
              Criminal Defense
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">Domestic Violence</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-700 to-burgundy-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Domestic Violence Defense</h1>
            <p className="text-xl md:text-2xl mb-8 text-gold-400 font-semibold">
              YO PELEO POR TI™ - I FIGHT FOR YOU
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Domestic violence accusations can destroy your life, family, and future. Our
              experienced defense attorneys protect innocent people from false allegations and fight
              for fair treatment in a system often biased against the accused.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                Emergency Defense Consultation
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

      {/* Immediate Consequences Section */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-100 border-l-4 border-red-500 p-6 mb-8">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-red-800">
                  Immediate Consequences of DV Charges
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-red-800 mb-2">Automatic Results:</h3>
                  <ul className="text-red-700 space-y-1">
                    <li>✓ Removal from your home</li>
                    <li>✓ No contact with family</li>
                    <li>✓ Loss of child custody</li>
                    <li>✓ Firearms confiscation</li>
                    <li>✓ Arrest on mere accusation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-800 mb-2">Long-Term Impact:</h3>
                  <ul className="text-red-700 space-y-1">
                    <li>• Permanent criminal record</li>
                    <li>• Loss of gun rights forever</li>
                    <li>• Immigration consequences</li>
                    <li>• Employment difficulties</li>
                    <li>• Housing discrimination</li>
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
                  Understanding Domestic Violence Charges
                </h2>
                <p className="text-gray-700 mb-6">
                  Domestic violence encompasses various charges involving family members, intimate
                  partners, or household members. These cases are prosecuted aggressively, often
                  based solely on accusations.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-burgundy-900 mb-3">Criminal Charges</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Domestic assault</li>
                      <li>• Assault on a female (NC)</li>
                      <li>• Domestic battery</li>
                      <li>• Strangulation</li>
                      <li>• Violation of protective order</li>
                      <li>• Stalking/harassment</li>
                      <li>• Criminal threats</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-burgundy-900 mb-3">Civil Consequences</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Protective orders (50B/DVPO)</li>
                      <li>• Emergency removal from home</li>
                      <li>• Temporary custody orders</li>
                      <li>• Supervised visitation only</li>
                      <li>• Mandatory counseling</li>
                      <li>• Civil contempt charges</li>
                      <li>• Attorney fee awards</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  The Truth About False Accusations
                </h2>
                <p className="text-gray-700 mb-6">
                  False domestic violence allegations are more common than people realize, often
                  arising from:
                </p>

                <div className="space-y-6">
                  <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                    <h3 className="text-xl font-bold text-yellow-800 mb-3">
                      Divorce & Custody Battles
                    </h3>
                    <p className="text-gray-700 mb-2">
                      False accusations used to gain advantage in divorce or custody proceedings:
                    </p>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Immediate custody advantage</li>
                      <li>• Exclusive use of marital home</li>
                      <li>• Leverage in property division</li>
                      <li>• Sympathy from the court</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-xl font-bold text-blue-800 mb-3">Relationship Conflicts</h3>
                    <p className="text-gray-700 mb-2">
                      Emotions and conflicts escalated to criminal allegations:
                    </p>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Arguments exaggerated</li>
                      <li>• Revenge for breakups</li>
                      <li>• Jealousy and control</li>
                      <li>• Mental health issues</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                    <h3 className="text-xl font-bold text-green-800 mb-3">
                      Immigration Advantages
                    </h3>
                    <p className="text-gray-700 mb-2">
                      VAWA and U-visa benefits motivate false claims:
                    </p>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Path to green card</li>
                      <li>• Work authorization</li>
                      <li>• Protection from deportation</li>
                      <li>• Government benefits</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Protective Orders: Know Your Rights
                </h2>
                <p className="text-gray-700 mb-6">
                  Protective orders (restraining orders) can be issued with minimal evidence and
                  have severe consequences:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border-2 border-burgundy-200 p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <FileText className="w-6 h-6 text-burgundy-700 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-burgundy-900 mb-3">
                          Types of Orders
                        </h3>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Ex parte (immediate, no hearing)</li>
                          <li>• Temporary (10-day)</li>
                          <li>• Permanent (up to 1 year)</li>
                          <li>• Criminal no-contact orders</li>
                          <li>• Mutual restraining orders</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border-2 border-burgundy-200 p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Home className="w-6 h-6 text-burgundy-700 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-burgundy-900 mb-3">
                          Order Restrictions
                        </h3>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Cannot return home</li>
                          <li>• No contact with children</li>
                          <li>• Stay away from work/school</li>
                          <li>• Surrender all firearms</li>
                          <li>• No third-party contact</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mt-6">
                  <h3 className="text-xl font-bold text-orange-800 mb-2">
                    Violation = Immediate Arrest
                  </h3>
                  <p className="text-orange-700">
                    Any violation of a protective order, even responding to a text or email from the
                    protected party, results in mandatory arrest and new criminal charges. The
                    protected party cannot &quot;drop&quot; the order without court approval.
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Defense Strategies That Work
                </h2>
                <p className="text-gray-700 mb-6">
                  Every domestic violence case is unique, but proven defense strategies include:
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">Self-Defense</h3>
                      <p className="text-gray-700">
                        You have the right to protect yourself from physical harm. We prove you were
                        the actual victim defending against the aggressor.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        False Allegations
                      </h3>
                      <p className="text-gray-700">
                        Exposing motives for lying, inconsistent statements, lack of injuries, and
                        witness testimony that contradicts accusations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">Mutual Combat</h3>
                      <p className="text-gray-700">
                        Both parties engaged in physical altercation. Challenging why only one
                        person was arrested when both were involved.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Accidental Contact
                      </h3>
                      <p className="text-gray-700">
                        No intent to harm. Incidental contact during argument or trying to leave
                        situation peacefully.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Constitutional Violations
                      </h3>
                      <p className="text-gray-700">
                        Warrantless entry, coerced statements, denial of counsel, and other police
                        misconduct.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">What to Do If Accused</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-green-800 mb-3">DO:</h3>
                    <ul className="text-green-700 space-y-2">
                      <li>✓ Remain calm and silent</li>
                      <li>✓ Request an attorney immediately</li>
                      <li>✓ Document injuries you have</li>
                      <li>✓ Save all texts/emails</li>
                      <li>✓ List potential witnesses</li>
                      <li>✓ Follow court orders exactly</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-red-800 mb-3">DON&apos;T:</h3>
                    <ul className="text-red-700 space-y-2">
                      <li>✗ Try to explain to police</li>
                      <li>✗ Contact the accuser</li>
                      <li>✗ Violate any court order</li>
                      <li>✗ Discuss on social media</li>
                      <li>✗ Return home if ordered out</li>
                      <li>✗ Destroy any evidence</li>
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
                      Understanding & Experience
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• We know false accusations happen</li>
                      <li>• Former prosecutor insights</li>
                      <li>• Thousands of DV cases handled</li>
                      <li>• Protective order expertise</li>
                      <li>• Trial-ready representation</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">Aggressive Defense</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• 24/7 emergency response</li>
                      <li>• Immediate investigation</li>
                      <li>• Challenge false allegations</li>
                      <li>• Fight for your rights</li>
                      <li>• Protect your future</li>
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
                      Can the victim drop domestic violence charges?
                    </h3>
                    <p className="text-gray-700">
                      No. Once charges are filed, only the prosecutor can dismiss them. The victim
                      becomes a witness for the state and can even be forced to testify against
                      their will.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      What if we want to reconcile?
                    </h3>
                    <p className="text-gray-700">
                      Protective orders and no-contact orders remain in effect regardless of
                      reconciliation. Violating them is a new crime. We can petition the court to
                      modify orders, but it requires legal process.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Will I lose my gun rights?
                    </h3>
                    <p className="text-gray-700">
                      Federal law prohibits firearm possession for anyone convicted of domestic
                      violence or subject to certain protective orders. This is often permanent and
                      affects employment in law enforcement, military, or security.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Can I see my children?
                    </h3>
                    <p className="text-gray-700">
                      Protective orders often include children initially. We can seek modifications
                      for supervised visitation or custody arrangements, but it requires careful
                      legal navigation to avoid violations.
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
              Don&apos;t Let False Accusations Destroy Your Life
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Domestic violence accusations require immediate action. Your freedom, family, and
              future are at stake. Our experienced attorneys understand the system&apos;s bias and fight
              aggressively to protect innocent people. Contact us now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-burgundy-700 text-white font-bold rounded-full hover:bg-burgundy-800 transition-colors"
              >
                Get Emergency Defense Help
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
            serviceType: 'Criminal Defense Domestic Violence Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/criminal-defense/domestic-violence/page',
            description:
              'Criminal Defense Domestic Violence legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
