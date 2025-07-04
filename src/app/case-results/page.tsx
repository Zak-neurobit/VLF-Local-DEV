import { Metadata } from 'next';
import PageLayout from '@/components/Layout/PageLayout';
import Section from '@/components/ui/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Heart, Briefcase, CheckCircle, DollarSign, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Case Results | Vasquez Law Firm, PLLC',
  description:
    'View our successful case results in immigration, personal injury, criminal defense, and workers compensation. Real victories for real clients.',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/case-results',
  },
};

interface CaseResult {
  id: string;
  category: string;
  title: string;
  outcome: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: string;
}

const caseResults: CaseResult[] = [
  // Immigration Cases
  {
    id: 'imm-1',
    category: 'Immigration',
    title: 'Deportation Defense Victory',
    outcome: 'Cancellation of Removal Granted',
    description:
      'Successfully obtained cancellation of removal for a client facing deportation after 15 years in the US. Client can now apply for green card.',
    icon: Shield,
    highlight: 'Family Kept Together',
  },
  {
    id: 'imm-2',
    category: 'Immigration',
    title: 'Complex Asylum Case',
    outcome: 'Asylum Granted',
    description:
      'Won asylum for a family fleeing persecution in their home country. Case involved extensive country condition evidence and expert testimony.',
    icon: Heart,
  },
  {
    id: 'imm-3',
    category: 'Immigration',
    title: 'H-1B Visa Approval',
    outcome: 'Visa Approved After RFE',
    description:
      'Successfully responded to Request for Evidence and secured H-1B approval for software engineer. Overcame specialty occupation challenges.',
    icon: Briefcase,
  },
  {
    id: 'imm-4',
    category: 'Immigration',
    title: 'DACA to Green Card',
    outcome: 'Adjustment of Status Approved',
    description:
      'Helped DACA recipient adjust status to permanent resident through marriage to US citizen. Navigated complex inadmissibility issues.',
    icon: CheckCircle,
  },
  {
    id: 'imm-5',
    category: 'Immigration',
    title: 'U-Visa Success',
    outcome: 'U-Visa Approved',
    description:
      'Obtained U-visa for crime victim who assisted law enforcement. Client received work authorization and path to green card.',
    icon: Shield,
  },

  // Personal Injury Cases
  {
    id: 'pi-1',
    category: 'Personal Injury',
    title: 'Major Car Accident Settlement',
    outcome: '$275,000 Settlement',
    description:
      'Secured substantial settlement for client who suffered back injuries in rear-end collision. Covered medical bills, lost wages, and pain and suffering.',
    icon: DollarSign,
    highlight: '$275,000',
  },
  {
    id: 'pi-2',
    category: 'Personal Injury',
    title: 'Workplace Injury Case',
    outcome: '$150,000 Recovery',
    description:
      'Won significant compensation for construction worker injured due to unsafe conditions. Included future medical care and disability benefits.',
    icon: DollarSign,
    highlight: '$150,000',
  },
  {
    id: 'pi-3',
    category: 'Personal Injury',
    title: 'Slip and Fall Victory',
    outcome: '$85,000 Settlement',
    description:
      'Obtained settlement for client injured in grocery store fall. Proved negligent maintenance despite contributory negligence defense.',
    icon: DollarSign,
    highlight: '$85,000',
  },

  // Criminal Defense Cases
  {
    id: 'cd-1',
    category: 'Criminal Defense',
    title: 'DUI Charges Dismissed',
    outcome: 'Case Dismissed',
    description:
      'Successfully challenged traffic stop and breathalyzer procedures, resulting in complete dismissal of DUI charges.',
    icon: Shield,
    highlight: 'Charges Dropped',
  },
  {
    id: 'cd-2',
    category: 'Criminal Defense',
    title: 'Federal Drug Case',
    outcome: 'Reduced Sentence',
    description:
      'Negotiated plea agreement reducing potential 10-year sentence to 2 years. Client avoided mandatory minimum through cooperation.',
    icon: CheckCircle,
  },
  {
    id: 'cd-3',
    category: 'Criminal Defense',
    title: 'Domestic Violence Defense',
    outcome: 'Not Guilty Verdict',
    description:
      'Won not guilty verdict at trial for client falsely accused of domestic violence. Protected immigration status and employment.',
    icon: Shield,
    highlight: 'Not Guilty',
  },

  // Workers' Compensation Cases
  {
    id: 'wc-1',
    category: "Workers' Compensation",
    title: 'Back Injury Settlement',
    outcome: '$125,000 Settlement',
    description:
      'Secured settlement for warehouse worker with herniated discs. Included ongoing medical treatment and vocational rehabilitation.',
    icon: DollarSign,
    highlight: '$125,000',
  },
  {
    id: 'wc-2',
    category: "Workers' Compensation",
    title: 'Denied Claim Reversed',
    outcome: 'Benefits Approved',
    description:
      "Successfully appealed denied workers' comp claim. Client received back pay, medical treatment, and ongoing disability benefits.",
    icon: CheckCircle,
  },
];

const categoryIcons = {
  Immigration: Users,
  'Personal Injury': Heart,
  'Criminal Defense': Shield,
  "Workers' Compensation": Briefcase,
};

export default function CaseResultsPage() {
  const categories = Array.from(new Set(caseResults.map(result => result.category)));

  // Calculate statistics
  const totalCases = caseResults.length;
  const settlementTotal = caseResults
    .filter(r => r.highlight?.includes('$'))
    .reduce((sum, r) => {
      const amount = parseInt(r.highlight?.replace(/\D/g, '') || '0');
      return sum + amount;
    }, 0);

  return (
    <PageLayout>
      <Section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-brand-charcoal mb-4">Proven Case Results</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We&apos;re proud of our track record of success. Here are some recent victories
                we&apos;ve achieved for our clients across all practice areas.
              </p>
            </div>

            {/* Statistics */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-brand-crimson mb-2">{totalCases}+</div>
                  <p className="text-gray-600">Successful Cases Shown</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-brand-crimson mb-2">
                    ${(settlementTotal / 1000).toFixed(0)}K+
                  </div>
                  <p className="text-gray-600">In Settlements Shown</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-brand-crimson mb-2">1000+</div>
                  <p className="text-gray-600">Families Helped</p>
                </CardContent>
              </Card>
            </div>

            {/* Case Results by Category */}
            {categories.map(category => {
              const CategoryIcon =
                categoryIcons[category as keyof typeof categoryIcons] || CheckCircle;
              const categoryResults = caseResults.filter(r => r.category === category);

              return (
                <div key={category} className="mb-12">
                  <div className="flex items-center mb-6">
                    <CategoryIcon className="w-8 h-8 text-brand-skyblue mr-3" />
                    <h2 className="text-2xl font-bold text-brand-charcoal">{category}</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {categoryResults.map(result => {
                      const Icon = result.icon;
                      return (
                        <Card key={result.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 mr-4">
                                <div className="w-12 h-12 bg-brand-skyblue/10 rounded-full flex items-center justify-center">
                                  <Icon className="w-6 h-6 text-brand-skyblue" />
                                </div>
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg text-brand-charcoal mb-2">
                                  {result.title}
                                </h3>
                                {result.highlight && (
                                  <div className="inline-block bg-brand-crimson text-white px-3 py-1 rounded-full text-sm font-bold mb-3">
                                    {result.highlight}
                                  </div>
                                )}
                                <p className="text-brand-skyblue font-semibold mb-2">
                                  {result.outcome}
                                </p>
                                <p className="text-gray-700">{result.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Call to Action */}
            <Card className="bg-gradient-to-br from-brand-skyblue to-brand-crimson text-white">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Add Your Success Story?</h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                  Every case is unique, but our commitment to winning for our clients never changes.
                  Let us fight for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="inline-block bg-white text-brand-charcoal px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Get Started Today
                  </a>
                  <a
                    href="tel:7043580470"
                    className="inline-block bg-transparent text-white px-8 py-3 rounded-lg font-semibold border-2 border-white hover:bg-white hover:text-brand-charcoal transition-colors"
                  >
                    Call (704) 358-0470
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Disclaimer:</strong> The case results shown are specific to the facts and
                legal circumstances of each client&apos;s case. Past results do not guarantee or
                predict a similar outcome in any future case. Each case is unique and must be
                evaluated on its own merits. Some details have been modified to protect client
                confidentiality.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
