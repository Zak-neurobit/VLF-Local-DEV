import { Metadata } from 'next';
import PageLayout from '@/components/Layout/PageLayout';
import Section from '@/components/ui/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, Tag, Clock, AlertCircle, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How Long Does Divorce Take in North Carolina? Complete Timeline Guide 2024',
  description:
    "Learn about North Carolina's divorce timeline, including the mandatory 1-year separation period, filing process, and factors that affect how long your divorce will take.",
  alternates: {
    canonical:
      'https://www.vasquezlawnc.com/how-long-does-divorce-take-in-north-carolina-complete-timeline-guide',
  },
  openGraph: {
    title: 'How Long Does Divorce Take in North Carolina? Complete Timeline Guide',
    description:
      'Comprehensive guide to NC divorce timelines, separation requirements, and the step-by-step process from filing to final decree.',
    type: 'article',
    publishedTime: '2024-01-15T00:00:00Z',
    authors: ['Vasquez Law Firm'],
    images: [],
  },
};

export default function NCDivorceTimelineBlog() {
  return (
    <PageLayout>
      <Section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <article className="max-w-4xl mx-auto">
            {/* Blog Header */}
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-brand-charcoal mb-4">
                How Long Does Divorce Take in North Carolina? Complete Timeline Guide
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time dateTime="2024-01-15">January 15, 2024</time>
                </div>

                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>Vasquez Law Firm</span>
                </div>

                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  <span>Family Law</span>
                </div>
              </div>
            </header>

            {/* Featured Icon */}
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center">
                <Clock className="w-12 h-12 text-pink-600" />
              </div>
            </div>

            {/* Blog Content */}
            <Card>
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    If you\&apos;re considering divorce in North Carolina, one of your first questions is
                    likely &quot;How long will this take?&quot; The answer depends on several factors, but
                    North Carolina has specific requirements that make the timeline more predictable
                    than in many other states. This comprehensive guide will walk you through every
                    step of the NC divorce timeline.
                  </p>

                  <h2 className="text-2xl font-bold text-brand-charcoal mt-8 mb-4">
                    North Carolina&apos;s Mandatory Separation Period
                  </h2>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    The most significant factor in North Carolina divorce timing is the mandatory
                    one-year separation period. Unlike many states, North Carolina requires couples
                    to live &quot;separate and apart&quot; for one full year before filing for absolute
                    divorce.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
                    <div className="flex items-start">
                      <Scale className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">Key Legal Requirement</p>
                        <p className="text-gray-700">
                          You must live in separate residences for 365 consecutive days with at
                          least one spouse intending the separation to be permanent. Brief
                          reconciliations can reset the clock entirely.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-brand-charcoal mt-8 mb-4">
                    Complete Timeline Breakdown
                  </h2>

                  <div className="space-y-6 mb-8">
                    <div className="border-l-4 border-brand-skyblue pl-6">
                      <h3 className="font-semibold text-lg text-brand-charcoal mb-2">
                        Day 1: Separation Begins
                      </h3>
                      <p className="text-gray-700">
                        One spouse moves out of the marital home. Document this date carefully –
                        it&apos;s crucial for your timeline. Consider drafting a separation agreement to
                        address immediate concerns.
                      </p>
                    </div>

                    <div className="border-l-4 border-brand-skyblue pl-6">
                      <h3 className="font-semibold text-lg text-brand-charcoal mb-2">
                        Months 1-12: Separation Period
                      </h3>
                      <p className="text-gray-700">
                        During this year, you can negotiate property division, custody, and support.
                        Many couples finalize their separation agreement during this time, making
                        the eventual divorce smoother.
                      </p>
                    </div>

                    <div className="border-l-4 border-brand-skyblue pl-6">
                      <h3 className="font-semibold text-lg text-brand-charcoal mb-2">
                        Day 366: File for Divorce
                      </h3>
                      <p className="text-gray-700">
                        After one year and one day of separation, you can file your complaint for
                        absolute divorce. The filing spouse must have been a North Carolina resident
                        for at least six months.
                      </p>
                    </div>

                    <div className="border-l-4 border-brand-skyblue pl-6">
                      <h3 className="font-semibold text-lg text-brand-charcoal mb-2">
                        30-60 Days: Service and Response
                      </h3>
                      <p className="text-gray-700">
                        Your spouse must be served with divorce papers and has 30 days to respond
                        (60 days if served out of state). If they don&apos;t respond, you can proceed
                        with a default judgment.
                      </p>
                    </div>

                    <div className="border-l-4 border-brand-skyblue pl-6">
                      <h3 className="font-semibold text-lg text-brand-charcoal mb-2">
                        30-90 Days: Court Hearing
                      </h3>
                      <p className="text-gray-700">
                        For uncontested divorces, the hearing is typically scheduled within 30-45
                        days. Contested divorces may take several months to reach trial.
                      </p>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-brand-charcoal mt-8 mb-4">
                    Factors That Can Extend Your Timeline
                  </h2>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>
                      <strong>Contested Issues:</strong> Disputes over property, custody, or support
                      can add months or even years
                    </li>
                    <li>
                      <strong>Court Backlog:</strong> Busy court dockets in urban counties may cause
                      delays
                    </li>
                    <li>
                      <strong>Discovery Process:</strong> Complex financial situations requiring
                      extensive document exchange
                    </li>
                    <li>
                      <strong>Reconciliation Attempts:</strong> Any cohabitation resets the one-year
                      clock
                    </li>
                    <li>
                      <strong>Service Difficulties:</strong> Problems locating or serving your
                      spouse
                    </li>
                    <li>
                      <strong>Attorney Availability:</strong> Scheduling conflicts can delay
                      proceedings
                    </li>
                  </ul>

                  <h2 className="text-2xl font-bold text-brand-charcoal mt-8 mb-4">
                    Typical Timeline Scenarios
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card className="bg-green-50">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-brand-charcoal mb-3">
                          Uncontested Divorce
                        </h4>
                        <ul className="text-gray-700 text-sm space-y-1">
                          <li>• Separation: 12 months</li>
                          <li>• Filing to Final: 45-60 days</li>
                          <li>
                            • <strong>Total: 13-14 months</strong>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-yellow-50">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-brand-charcoal mb-3">
                          Contested Divorce
                        </h4>
                        <ul className="text-gray-700 text-sm space-y-1">
                          <li>• Separation: 12 months</li>
                          <li>• Filing to Final: 6-18 months</li>
                          <li>
                            • <strong>Total: 18-30 months</strong>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <h2 className="text-2xl font-bold text-brand-charcoal mt-8 mb-4">
                    Can You Speed Up the Process?
                  </h2>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    While you cannot shorten the one-year separation requirement, you can expedite
                    other aspects:
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-semibold text-brand-charcoal mb-4">
                      Tips to Minimize Delays
                    </h3>
                    <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                      <li>Start negotiating your separation agreement immediately</li>
                      <li>Gather financial documents during the separation year</li>
                      <li>Consider mediation to resolve disputes faster</li>
                      <li>File for divorce promptly after the year expires</li>
                      <li>Ensure proper service of process</li>
                      <li>Respond to all court deadlines promptly</li>
                      <li>Consider collaborative divorce for complex cases</li>
                    </ol>
                  </div>

                  <h2 className="text-2xl font-bold text-brand-charcoal mt-8 mb-4">
                    Emergency Situations and Exceptions
                  </h2>

                  <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
                    <div className="flex items-start">
                      <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">
                          Domestic Violence Exception
                        </p>
                        <p className="text-gray-700">
                          While the one-year separation cannot be waived, victims of domestic
                          violence can obtain immediate protective orders and temporary
                          custody/support orders without waiting. Contact an attorney immediately if
                          you&apos;re in danger.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-brand-charcoal mt-8 mb-4">
                    What Happens During the Waiting Period?
                  </h2>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    The separation year isn&apos;t just waiting time. Use it productively:
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Negotiate and sign a separation agreement</li>
                    <li>Establish temporary custody arrangements</li>
                    <li>Determine temporary support payments</li>
                    <li>Begin dividing personal property</li>
                    <li>Refinance joint debts when possible</li>
                    <li>Update estate planning documents</li>
                    <li>Seek counseling or therapy for emotional support</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-brand-charcoal mt-8 mb-4">
                    Cost Considerations and Timeline
                  </h2>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    The length of your divorce directly impacts costs. Longer proceedings mean
                    higher attorney fees, court costs, and expert witness fees. An uncontested
                    divorce might cost $500-$1,500, while contested divorces can range from $5,000
                    to $30,000 or more.
                  </p>

                  {/* Call to Action */}
                  <div className="mt-12 p-8 bg-pink-50 rounded-lg">
                    <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
                      Ready to Start Your Divorce Timeline?
                    </h2>
                    <p className="text-gray-700 mb-6">
                      Understanding the timeline is just the first step. Every divorce is unique,
                      and having experienced legal guidance can help you navigate the process
                      efficiently while protecting your rights and interests.
                    </p>
                    <p className="text-gray-700 mb-6">
                      At Vasquez Law Firm, we help clients throughout North Carolina plan for and
                      execute their divorce strategy, minimizing both time and stress. We&apos;ll help
                      you understand your specific timeline and work to resolve your case as quickly
                      as possible.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href="/free-consultation"
                        className="inline-block bg-brand-crimson text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-crimson/90 transition-colors text-center"
                      >
                        Schedule Your Consultation
                      </a>
                      <a
                        href="tel:7043580470"
                        className="inline-block bg-white text-brand-charcoal px-8 py-3 rounded-lg font-semibold border-2 border-brand-charcoal hover:bg-gray-50 transition-colors text-center"
                      >
                        Call (704) 358-0470
                      </a>
                    </div>
                  </div>

                  {/* Related Articles */}
                  <div className="mt-12">
                    <h3 className="text-xl font-bold text-brand-charcoal mb-4">Related Articles</h3>
                    <div className="flex flex-col gap-2">
                      <a
                        href="/practice-areas/family-law/divorce"
                        className="text-brand-skyblue hover:text-brand-crimson transition-colors"
                      >
                        → Understanding Divorce in North Carolina
                      </a>
                      <a
                        href="/practice-areas/family-law/property-division"
                        className="text-brand-skyblue hover:text-brand-crimson transition-colors"
                      >
                        → How Property Division Works in NC Divorce
                      </a>
                      <a
                        href="/practice-areas/family-law/child-custody"
                        className="text-brand-skyblue hover:text-brand-crimson transition-colors"
                      >
                        → Child Custody Guidelines in North Carolina
                      </a>
                      <a
                        href="/practice-areas/family-law/alimony"
                        className="text-brand-skyblue hover:text-brand-crimson transition-colors"
                      >
                        → Alimony Laws and Calculations in NC
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
                  Vasquez Law Firm has been guiding North Carolina families through divorce for over
                  20 years. Our experienced family law attorneys understand that divorce is more
                  than a legal process – it&apos;s a life transition that requires compassionate guidance
                  and strategic planning. We serve clients throughout North Carolina with offices in
                  Charlotte, Raleigh, Durham, and Winston-Salem.
                </p>
              </CardContent>
            </Card>
          </article>
        </div>
      </Section>
    </PageLayout>
  );
}
