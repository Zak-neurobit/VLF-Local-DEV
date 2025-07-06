import { Metadata } from 'next';
import PageLayout from '@/components/Layout/PageLayout';
import Section from '@/components/ui/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, Tag, Users, Shield, Heart, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'North Carolina Child Custody Laws: Best Interests Factors Explained | 2024 Guide',
  description:
    'Complete guide to NC child custody laws, including the 12 best interest factors judges consider, types of custody, visitation rights, and how to win your custody case.',
  alternates: {
    canonical:
      'https://www.vasquezlawnc.com/north-carolina-child-custody-laws-best-interests-factors-explained',
  },
  openGraph: {
    title: 'North Carolina Child Custody Laws: Best Interests Factors Explained',
    description:
      'Learn how NC judges determine child custody using the best interests standard, types of custody arrangements, and strategies for your case.',
    type: 'article',
    publishedTime: '2024-01-16T00:00:00Z',
    authors: ['Vasquez Law Firm'],
    images: [],
  },
};

export default function NCChildCustodyBlog() {
  return (
    <PageLayout>
      <Section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <article className="max-w-4xl mx-auto">
            {/* Blog Header */}
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-brand-charcoal mb-4">
                North Carolina Child Custody Laws: Understanding the Best Interests Standard
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time dateTime="2024-01-16">January 16, 2024</time>
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
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-12 h-12 text-blue-600" />
              </div>
            </div>

            {/* Blog Content */}
            <Card>
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    When North Carolina parents separate or divorce, determining child custody
                    becomes one of the most emotionally charged and legally complex issues they
                    face. Understanding how North Carolina courts make custody decisions can help
                    you better prepare for your case and work toward an arrangement that serves your
                    child&apos;s best interests.
                  </p>

                  <h2 className="text-2xl font-bold text-brand-charcoal mt-8 mb-4">
                    The Best Interests of the Child Standard
                  </h2>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    North Carolina law requires judges to base all custody decisions on the &quot;best
                    interests of the child.&quot; This standard is intentionally broad, allowing judges
                    to consider the unique circumstances of each family. While this flexibility can
                    be beneficial, it also means outcomes can be less predictable than in states
                    with more rigid guidelines.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
                    <div className="flex items-start">
                      <Shield className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">
                          Important Legal Principle
                        </p>
                        <p className="text-gray-700">
                          North Carolina does not presume that either parent is better suited for
                          custody based on gender. Both mothers and fathers have equal rights to
                          seek custody, and courts must evaluate each parent&apos;s ability to serve the
                          child&apos;s best interests.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-brand-charcoal mt-8 mb-4">
                    Key Factors NC Judges Consider
                  </h2>

                  <p className="text-gray-700 leading-relaxed mb-4">
                    While judges have discretion, North Carolina case law has established several
                    factors courts typically consider:
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="border-l-4 border-brand-skyblue pl-6">
                      <h3 className="font-semibold text-brand-charcoal mb-2">
                        1. Child&apos;s Safety and Welfare
                      </h3>
                      <p className="text-gray-700">
                        The paramount concern is always the child&apos;s physical safety and emotional
                        well-being. Any history of abuse, neglect, or domestic violence weighs
                        heavily in custody decisions.
                      </p>
                    </div>

                    <div className="border-l-4 border-brand-skyblue pl-6">
                      <h3 className="font-semibold text-brand-charcoal mb-2">
                        2. Primary Caregiver History
                      </h3>
                      <p className="text-gray-700">
                        Courts consider which parent has been the primary caregiver, including who
                        handles daily routines, medical appointments, school activities, and
                        homework assistance.
                      </p>
                    </div>

                    <div className="border-l-4 border-brand-skyblue pl-6">
                      <h3 className="font-semibold text-brand-charcoal mb-2">
                        3. Stability and Continuity
                      </h3>
                      <p className="text-gray-700">
                        Judges favor arrangements that minimize disruption to the child&apos;s life,
                        including maintaining school enrollment, community ties, and relationships
                        with extended family.
                      </p>
                    </div>

                    <div className="border-l-4 border-brand-skyblue pl-6">
                      <h3 className="font-semibold text-brand-charcoal mb-2">
                        4. Parent-Child Relationships
                      </h3>
                      <p className="text-gray-700">
                        The quality of each parent&apos;s relationship with the child, including
                        emotional bonds, communication, and the parent&apos;s understanding of the
                        child&apos;s needs.
                      </p>
                    </div>

                    <div className="border-l-4 border-brand-skyblue pl-6">
                      <h3 className="font-semibold text-brand-charcoal mb-2">
                        5. Co-Parenting Ability
                      </h3>
                      <p className="text-gray-700">
                        Courts favor parents who demonstrate willingness to facilitate the child&apos;s
                        relationship with the other parent and communicate effectively about the
                        child&apos;s needs.
                      </p>
                    </div>

                    <div className="border-l-4 border-brand-skyblue pl-6">
                      <h3 className="font-semibold text-brand-charcoal mb-2">
                        6. Living Situations
                      </h3>
                      <p className="text-gray-700">
                        The adequacy of each parent&apos;s home, including safety, space, and proximity
                        to school and activities. Financial disparities alone don\&apos;t determine
                        custody.
                      </p>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-brand-charcoal mt-8 mb-4">
                    Types of Custody in North Carolina
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card className="bg-gray-50">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-brand-charcoal mb-3 flex items-center">
                          <Home className="w-5 h-5 mr-2 text-brand-skyblue" />
                          Physical Custody
                        </h4>
                        <p className="text-gray-700 text-sm mb-3">
                          Determines where the child lives and who provides daily care.
                        </p>
                        <ul className="text-gray-700 text-sm space-y-1">
                          <li>
                            • <strong>Sole:</strong> Child lives primarily with one parent
                          </li>
                          <li>
                            • <strong>Joint:</strong> Child spends significant time with both
                          </li>
                          <li>
                            • <strong>Split:</strong> Siblings divided between parents (rare)
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-50">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-brand-charcoal mb-3 flex items-center">
                          <Shield className="w-5 h-5 mr-2 text-brand-crimson" />
                          Legal Custody
                        </h4>
                        <p className="text-gray-700 text-sm mb-3">
                          Authority to make major decisions about the child&apos;s upbringing.
                        </p>
                        <ul className="text-gray-700 text-sm space-y-1">
                          <li>
                            • <strong>Sole:</strong> One parent makes all major decisions
                          </li>
                          <li>
                            • <strong>Joint:</strong> Parents share decision-making
                          </li>
                          <li>
                            • <strong>Hybrid:</strong> Divided by area (medical, education)
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <h2 className="text-2xl font-bold text-brand-charcoal mt-8 mb-4">
                    Child&apos;s Preference in Custody Decisions
                  </h2>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    North Carolina has no set age when a child can choose which parent to live with.
                    However, judges may consider a child&apos;s preference if the child has sufficient
                    age and maturity to express a reasoned opinion. Typically:
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Children under 8: Preferences rarely considered</li>
                    <li>Ages 8-11: May be considered with caution</li>
                    <li>Ages 12-17: Given more weight but not determinative</li>
                    <li>The judge may interview the child privately in chambers</li>
                    <li>Preference is one factor among many, not controlling</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-brand-charcoal mt-8 mb-4">
                    Common Custody Schedules in North Carolina
                  </h2>

                  <div className="bg-gray-50 rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-semibold text-brand-charcoal mb-4">
                      Popular Parenting Time Arrangements
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-800">Every Other Weekend</p>
                        <p className="text-gray-700 text-sm">
                          Non-custodial parent has children Friday evening through Sunday evening,
                          alternating weeks. Often includes one weeknight dinner.
                        </p>
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800">2-2-3 Schedule</p>
                        <p className="text-gray-700 text-sm">
                          Children spend 2 days with one parent, 2 with the other, then 3-day
                          weekend alternating. Equal time but frequent transitions.
                        </p>
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800">Week On/Week Off</p>
                        <p className="text-gray-700 text-sm">
                          Children alternate full weeks with each parent. Works well for older
                          children who can handle longer separations.
                        </p>
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800">Extended Summer Schedule</p>
                        <p className="text-gray-700 text-sm">
                          School year with one parent, extended summer time with the other. Common
                          when parents live far apart.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-brand-charcoal mt-8 mb-4">
                    Modifying Custody Orders in North Carolina
                  </h2>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    Custody orders can be modified when there\&apos;s been a &quot;substantial change in
                    circumstances&quot; affecting the child&apos;s welfare. Common reasons include:
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Parent relocation affecting visitation</li>
                    <li>Changes in work schedules impacting care</li>
                    <li>Child&apos;s developmental needs changing with age</li>
                    <li>Emergence of safety concerns</li>
                    <li>Parent&apos;s remarriage or cohabitation</li>
                    <li>Significant changes in either parent&apos;s stability</li>
                  </ul>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
                    <div className="flex items-start">
                      <Heart className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">
                          Protecting Your Child&apos;s Well-Being
                        </p>
                        <p className="text-gray-700">
                          Remember that custody litigation can be stressful for children. Consider
                          mediation or collaborative approaches when possible. Courts favor parents
                          who prioritize the child&apos;s emotional needs over winning.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-brand-charcoal mt-8 mb-4">
                    Emergency Custody Orders
                  </h2>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    North Carolina courts can issue emergency (ex parte) custody orders when a child
                    faces immediate danger. These orders are temporary and require:
                  </p>

                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Verified allegations of immediate harm or risk</li>
                    <li>Evidence of abuse, neglect, or abandonment</li>
                    <li>Risk of parental kidnapping</li>
                    <li>A full hearing within 10 days</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-brand-charcoal mt-8 mb-4">
                    Building a Strong Custody Case
                  </h2>

                  <div className="bg-brand-skyblue/10 rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-semibold text-brand-charcoal mb-4">
                      Evidence That Strengthens Your Case
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>✓ Documentation of your involvement in daily care</li>
                      <li>✓ School and medical records showing your participation</li>
                      <li>✓ Evidence of a stable, child-friendly home</li>
                      <li>✓ Witnesses to your parenting (teachers, coaches, doctors)</li>
                      <li>✓ Communication logs showing co-parenting efforts</li>
                      <li>✓ Financial records demonstrating ability to provide</li>
                      <li>✓ Any evidence of the other parent&apos;s unfitness (if applicable)</li>
                    </ul>
                  </div>

                  {/* Call to Action */}
                  <div className="mt-12 p-8 bg-blue-50 rounded-lg">
                    <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
                      Fighting for Your Children&apos;s Best Interests
                    </h2>
                    <p className="text-gray-700 mb-6">
                      Child custody cases require careful preparation and skilled advocacy. The
                      decisions made now will affect your relationship with your children for years
                      to come. Don&apos;t navigate this critical process alone.
                    </p>
                    <p className="text-gray-700 mb-6">
                      At Vasquez Law Firm, we understand that your children are your world. Our
                      experienced family law attorneys will help you build the strongest possible
                      case while keeping your children&apos;s well-being at the forefront of every
                      decision.
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
                        href="/how-long-does-divorce-take-in-north-carolina-complete-timeline-guide"
                        className="text-brand-skyblue hover:text-brand-crimson transition-colors"
                      >
                        → How Long Does Divorce Take in North Carolina?
                      </a>
                      <a
                        href="/practice-areas/family-law/child-custody"
                        className="text-brand-skyblue hover:text-brand-crimson transition-colors"
                      >
                        → Child Custody Legal Services
                      </a>
                      <a
                        href="/practice-areas/family-law"
                        className="text-brand-skyblue hover:text-brand-crimson transition-colors"
                      >
                        → Family Law Practice Overview
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
                  For over two decades, Vasquez Law Firm has helped North Carolina parents protect
                  their relationships with their children. Our family law team combines
                  compassionate guidance with aggressive advocacy to achieve custody arrangements
                  that serve our clients&apos; children&apos;s best interests. We handle custody cases
                  throughout North Carolina from our offices in Charlotte, Raleigh, Durham, and
                  Winston-Salem.
                </p>
              </CardContent>
            </Card>
          </article>
        </div>
      </Section>
    </PageLayout>
  );
}
