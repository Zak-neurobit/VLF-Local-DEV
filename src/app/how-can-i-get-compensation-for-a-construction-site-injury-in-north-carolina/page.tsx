import { Metadata } from 'next';
import PageLayout from '@/components/Layout/PageLayout';
import Section from '@/components/ui/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, Tag, AlertTriangle, HardHat, FileText, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title:
    'How Can I Get Compensation for a Construction Site Injury in North Carolina? | Vasquez Law Firm',
  description:
    "Learn about your rights to compensation after a construction site injury in North Carolina. Understand workers' comp, third-party claims, and OSHA violations.",
  alternates: {
    canonical:
      'https://www.vasquezlawnc.com/how-can-i-get-compensation-for-a-construction-site-injury-in-north-carolina',
  },
  openGraph: {
    title: 'How Can I Get Compensation for a Construction Site Injury in North Carolina?',
    description:
      "Complete guide to getting compensation for construction injuries in NC, including workers' comp and third-party liability claims.",
    type: 'article',
    publishedTime: '2023-08-15T00:00:00Z',
    authors: ['Vasquez Law Firm'],
    images: [],
  },
};

export default function ConstructionInjuryCompensationBlog() {
  return (
    <PageLayout>
      <Section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <article className="max-w-4xl mx-auto">
            {/* Blog Header */}
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-brand-charcoal mb-4">
                How Can I Get Compensation for a Construction Site Injury in North Carolina?
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time dateTime="2023-08-15">August 15, 2023</time>
                </div>

                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>Vasquez Law Firm</span>
                </div>

                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  <span>Workers' Compensation</span>
                </div>
              </div>
            </header>

            {/* Featured Icon */}
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 bg-brand-skyblue/10 rounded-full flex items-center justify-center">
                <HardHat className="w-12 h-12 text-brand-skyblue" />
              </div>
            </div>

            {/* Blog Content */}
            <Card>
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Construction sites are among the most dangerous workplaces in North Carolina.
                    With heavy machinery, heights, electrical hazards, and constantly changing
                    conditions, construction workers face significant risks every day. If you've
                    been injured on a construction site, you have several potential paths to
                    compensation, and understanding your options is crucial for protecting your
                    rights and financial future.
                  </p>

                  <h2 className="text-2xl font-bold text-brand-charcoal mt-8 mb-4">
                    Workers' Compensation: Your First Line of Protection
                  </h2>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    In North Carolina, most construction employers with three or more employees must
                    carry workers' compensation insurance. This no-fault system provides benefits
                    regardless of who caused the accident:
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    <li className="mb-2">
                      <strong>Medical Coverage:</strong> All necessary medical treatment related to
                      your injury
                    </li>
                    <li className="mb-2">
                      <strong>Wage Replacement:</strong> Two-thirds of your average weekly wage
                      while unable to work
                    </li>
                    <li className="mb-2">
                      <strong>Permanent Disability:</strong> Compensation for permanent impairments
                    </li>
                    <li className="mb-2">
                      <strong>Vocational Rehabilitation:</strong> Training for new work if you
                      can&apos;t return to construction
                    </li>
                    <li className="mb-2">
                      <strong>Death Benefits:</strong> Support for dependents in fatal accident
                      cases
                    </li>
                  </ul>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
                    <div className="flex items-start">
                      <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">Important Deadlines</p>
                        <p className="text-gray-700">
                          You must report your injury to your employer in writing within 30 days and
                          file a Form 18 with the North Carolina Industrial Commission within 2
                          years of the injury.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-brand-charcoal mt-8 mb-4">
                    Third-Party Claims: Beyond Workers' Compensation
                  </h2>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    While workers' compensation prohibits suing your employer, you may have claims
                    against other parties:
                  </p>

                  <h3 className="text-xl font-semibold text-brand-charcoal mt-6 mb-3">
                    1. General Contractors and Subcontractors
                  </h3>
                  <p className="text-gray-700 mb-6">
                    If you work for a subcontractor, the general contractor may be liable for unsafe
                    site conditions or failure to enforce safety protocols.
                  </p>

                  <h3 className="text-xl font-semibold text-brand-charcoal mt-6 mb-3">
                    2. Property Owners
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Property owners who maintain control over the work site may be responsible for
                    dangerous conditions they knew or should have known about.
                  </p>

                  <h3 className="text-xl font-semibold text-brand-charcoal mt-6 mb-3">
                    3. Equipment Manufacturers
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Defective tools, machinery, or safety equipment may give rise to product
                    liability claims against manufacturers or distributors.
                  </p>

                  <h3 className="text-xl font-semibold text-brand-charcoal mt-6 mb-3">
                    4. Architects and Engineers
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Design professionals may be liable if their plans or specifications created
                    unsafe conditions.
                  </p>

                  <h2 className="text-2xl font-bold text-brand-charcoal mt-8 mb-4">
                    Common Construction Site Injuries and Their Compensation
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card className="bg-gray-50">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-brand-charcoal mb-3">
                          Falls from Heights
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Scaffolding, ladder, and roof falls often result in spinal injuries,
                          traumatic brain injuries, and fractures requiring extensive compensation.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-50">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-brand-charcoal mb-3">
                          Struck by Objects
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Falling tools, materials, or crane accidents can cause severe head
                          injuries and permanent disabilities.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-50">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-brand-charcoal mb-3">Electrocution</h4>
                        <p className="text-gray-700 text-sm">
                          Contact with power lines or faulty wiring can cause burns, neurological
                          damage, and cardiac issues.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-50">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-brand-charcoal mb-3">Caught Between</h4>
                        <p className="text-gray-700 text-sm">
                          Crushing injuries from equipment or collapsing structures often result in
                          amputations or death.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <h2 className="text-2xl font-bold text-brand-charcoal mt-8 mb-4">
                    OSHA Violations and Your Rights
                  </h2>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    The Occupational Safety and Health Administration (OSHA) sets safety standards
                    for construction sites. Common violations that may strengthen your case include:
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    <li className="mb-2">Lack of fall protection systems</li>
                    <li className="mb-2">Missing or inadequate scaffolding safety measures</li>
                    <li className="mb-2">Electrical hazards and lockout/tagout failures</li>
                    <li className="mb-2">Inadequate personal protective equipment (PPE)</li>
                    <li className="mb-2">Trenching and excavation safety violations</li>
                    <li className="mb-2">Failure to train workers properly</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-brand-charcoal mt-8 mb-4">
                    Maximizing Your Compensation
                  </h2>

                  <div className="bg-brand-skyblue/10 rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-semibold text-brand-charcoal mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Essential Steps After a Construction Injury
                    </h3>
                    <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                      <li>Report the injury immediately to your supervisor</li>
                      <li>Seek medical treatment and follow all recommendations</li>
                      <li>Document everything: take photos, get witness statements</li>
                      <li>File your workers' compensation claim promptly</li>
                      <li>Don't give recorded statements without legal advice</li>
                      <li>Keep all medical records and receipts</li>
                      <li>Consult an attorney to explore all compensation options</li>
                    </ol>
                  </div>

                  <h2 className="text-2xl font-bold text-brand-charcoal mt-8 mb-4">
                    North Carolina's Contributory Negligence Challenge
                  </h2>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    North Carolina follows the harsh contributory negligence rule for third-party
                    claims. If you're found even 1% at fault, you may be barred from recovery.
                    However, this doesn't apply to workers' compensation claims, and experienced
                    attorneys can often overcome this defense by proving:
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    <li className="mb-2">
                      The defendant had the "last clear chance" to avoid the accident
                    </li>
                    <li className="mb-2">Gross negligence by the defendant</li>
                    <li className="mb-2">Intentional conduct or willful safety violations</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-brand-charcoal mt-8 mb-4">
                    Compensation You May Be Entitled To
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-start">
                      <DollarSign className="w-6 h-6 text-brand-crimson mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-brand-charcoal">Economic Damages</h4>
                        <ul className="text-sm text-gray-700 mt-2 space-y-1">
                          <li>• Medical expenses (past and future)</li>
                          <li>• Lost wages and earning capacity</li>
                          <li>• Rehabilitation costs</li>
                          <li>• Home modifications</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <DollarSign className="w-6 h-6 text-brand-crimson mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-brand-charcoal">Non-Economic Damages</h4>
                        <ul className="text-sm text-gray-700 mt-2 space-y-1">
                          <li>• Pain and suffering</li>
                          <li>• Emotional distress</li>
                          <li>• Loss of enjoyment of life</li>
                          <li>• Disfigurement or scarring</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="mt-12 p-8 bg-brand-crimson/10 rounded-lg">
                    <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
                      Don't Navigate This Alone
                    </h2>
                    <p className="text-gray-700 mb-6">
                      Construction injury cases are complex, involving multiple parties, insurance
                      companies, and legal theories. The construction industry and their insurers
                      have teams of lawyers protecting their interests. You deserve the same level
                      of representation.
                    </p>
                    <p className="text-gray-700 mb-6">
                      At Vasquez Law Firm, we understand the devastating impact of construction
                      injuries on workers and their families. We'll fight to ensure you receive
                      every dollar of compensation you're entitled to under the law.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href="/free-consultation"
                        className="inline-block bg-brand-crimson text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-crimson/90 transition-colors text-center"
                      >
                        Get Your Free Case Review
                      </a>
                      <a
                        href="tel:7043580470"
                        className="inline-block bg-white text-brand-charcoal px-8 py-3 rounded-lg font-semibold border-2 border-brand-charcoal hover:bg-gray-50 transition-colors text-center"
                      >
                        Call (704) 358-0470 Now
                      </a>
                    </div>
                  </div>

                  {/* Related Articles */}
                  <div className="mt-12">
                    <h3 className="text-xl font-bold text-brand-charcoal mb-4">Related Articles</h3>
                    <div className="flex flex-col gap-2">
                      <a
                        href="/practice-areas/workers-compensation"
                        className="text-brand-skyblue hover:text-brand-crimson transition-colors"
                      >
                        → Workers' Compensation Overview
                      </a>
                      <a
                        href="/practice-areas/personal-injury"
                        className="text-brand-skyblue hover:text-brand-crimson transition-colors"
                      >
                        → Personal Injury Claims in North Carolina
                      </a>
                      <a
                        href="/what-factors-will-affect-my-workers-comp-settlement"
                        className="text-brand-skyblue hover:text-brand-crimson transition-colors"
                      >
                        → Factors That Affect Your Workers' Comp Settlement
                      </a>
                      <a
                        href="/steps-to-take-if-your-workers-comp-claim-is-denied-in-north-carolina"
                        className="text-brand-skyblue hover:text-brand-crimson transition-colors"
                      >
                        → What to Do If Your Workers' Comp Claim Is Denied
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Author Bio */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-brand-charcoal mb-2">
                  About Vasquez Law Firm, PLLC
                </h3>
                <p className="text-gray-700">
                  With offices throughout North Carolina, Vasquez Law Firm represents injured
                  construction workers in workers' compensation and personal injury claims. Our
                  attorneys understand the unique challenges faced by construction workers and fight
                  aggressively to maximize compensation for workplace injuries. We work on a
                  contingency fee basis – you don't pay unless we win your case.
                </p>
              </CardContent>
            </Card>
          </article>
        </div>
      </Section>
    </PageLayout>
  );
}
