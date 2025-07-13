'use client';

import { useState } from 'react';
import PageLayout from '@/components/Layout/PageLayout';
import Section from '@/components/ui/Section';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // General Questions
  {
    id: 'general-1',
    category: 'General',
    question: 'Do you offer free consultations?',
    answer:
      "Yes, we offer free initial consultations for most case types. During this consultation, we\'ll discuss your legal situation, explain your options, and help you understand the best path forward. Contact us to schedule your free consultation.",
  },
  {
    id: 'general-2',
    category: 'General',
    question: 'What areas do you serve?',
    answer:
      'We have offices in Charlotte, Raleigh, Durham, Smithfield, and Winston-Salem in North Carolina, as well as Orlando, Florida. We serve clients throughout North Carolina and Florida, and we handle federal immigration cases nationwide.',
  },
  {
    id: 'general-3',
    category: 'General',
    question: 'Do you speak Spanish?',
    answer:
      "Yes! We have Spanish-speaking attorneys and staff members. We're committed to serving the Hispanic community and can conduct all communications and legal proceedings in Spanish.",
  },
  {
    id: 'general-4',
    category: 'General',
    question: 'How much do your services cost?',
    answer:
      "Our fees vary depending on the type and complexity of your case. We offer different fee structures including flat fees for many immigration cases, contingency fees for personal injury cases (you don't pay unless we win), and hourly or flat fees for criminal defense. We'll discuss all fees upfront during your consultation.",
  },

  // Immigration Questions
  {
    id: 'immigration-1',
    category: 'Immigration',
    question: 'How long does it take to get a green card?',
    answer:
      "The timeline for obtaining a green card varies significantly based on your category and country of origin. Family-based green cards can take anywhere from 8 months to several years. Employment-based green cards typically take 1-3 years. We'll provide a more specific timeline based on your individual circumstances.",
  },
  {
    id: 'immigration-2',
    category: 'Immigration',
    question: 'Can I work while my immigration case is pending?',
    answer:
      "It depends on your current status and the type of application you've filed. Many applicants can apply for work authorization (EAD) while their cases are pending. For example, adjustment of status applicants, asylum seekers (after 150 days), and certain visa holders may be eligible for work permits.",
  },
  {
    id: 'immigration-3',
    category: 'Immigration',
    question: "What happens if I\'m detained by ICE?",
    answer:
      "If you or a loved one is detained by ICE, it's crucial to act quickly. You have the right to an attorney (at your own expense), the right to remain silent, and the right to a bond hearing in most cases. Contact us immediately - we provide emergency assistance for detention cases and can help request a bond hearing.",
  },
  {
    id: 'immigration-4',
    category: 'Immigration',
    question: 'Can I travel outside the US with a pending immigration case?',
    answer:
      'Travel while a case is pending can be risky and depends on your current status. Some individuals may travel with advance parole or valid visas, while others risk abandoning their applications by leaving. Always consult with an attorney before traveling internationally with a pending case.',
  },
  {
    id: 'immigration-5',
    category: 'Immigration',
    question: 'What is DACA and am I eligible?',
    answer:
      'DACA (Deferred Action for Childhood Arrivals) provides temporary protection from deportation and work authorization for certain individuals who came to the US as children. While new DACA applications are currently not being accepted due to court decisions, renewals are still being processed. We can help determine your eligibility and assist with renewals.',
  },

  // Personal Injury Questions
  {
    id: 'pi-1',
    category: 'Personal Injury',
    question: 'What should I do after a car accident?',
    answer:
      "First, ensure everyone's safety and call 911 if needed. Document the scene with photos, get witness information, and exchange insurance details with other drivers. Seek medical attention even for minor injuries. Contact your insurance company to report the accident, but avoid giving recorded statements without consulting an attorney first.",
  },
  {
    id: 'pi-2',
    category: 'Personal Injury',
    question: 'How much is my personal injury case worth?',
    answer:
      "Case value depends on many factors including medical expenses, lost wages, pain and suffering, and the severity of your injuries. North Carolina's contributory negligence law can also impact your case. We'll evaluate all aspects of your case to pursue maximum compensation.",
  },
  {
    id: 'pi-3',
    category: 'Personal Injury',
    question: 'How long do I have to file a personal injury claim?',
    answer:
      "In North Carolina, the statute of limitations for most personal injury cases is 3 years from the date of injury. However, some cases have shorter deadlines, and evidence can disappear quickly. It's best to contact an attorney as soon as possible after your injury.",
  },

  // Criminal Defense Questions
  {
    id: 'criminal-1',
    category: 'Criminal Defense',
    question: "What should I do if I\'m arrested?",
    answer:
      "Exercise your right to remain silent and ask for an attorney immediately. Don't discuss your case with anyone except your lawyer. Be polite but firm in asserting your rights. Contact us as soon as possible - we provide emergency assistance for arrests.",
  },
  {
    id: 'criminal-2',
    category: 'Criminal Defense',
    question: 'Will a criminal conviction affect my immigration status?',
    answer:
      'Yes, criminal convictions can have serious immigration consequences including deportation, inadmissibility, and ineligibility for certain benefits. Even minor offenses can impact your status. We carefully analyze both the criminal and immigration consequences of any plea or conviction.',
  },
  {
    id: 'criminal-3',
    category: 'Criminal Defense',
    question: 'Can my criminal record be expunged?',
    answer:
      "North Carolina law allows expungement of certain criminal records. Eligibility depends on factors like the type of offense, your age at the time, and whether you\'ve had other convictions. We can review your record and determine if you're eligible for expungement.",
  },

  // Workers' Compensation Questions
  {
    id: 'wc-1',
    category: "Workers' Compensation",
    question: "What should I do if I\'m injured at work?",
    answer:
      "Report the injury to your supervisor immediately and in writing. Seek medical treatment and tell the doctor it's work-related. Document everything including the accident, injuries, and any witnesses. File a claim with the North Carolina Industrial Commission within 2 years, though it's best to act quickly.",
  },
  {
    id: 'wc-2',
    category: "Workers' Compensation",
    question: 'Can I see my own doctor for a work injury?',
    answer:
      "Initially, your employer has the right to direct your medical care. However, after 90 days or if they don\'t provide adequate care, you may have the right to change doctors. We can help you navigate the medical treatment process and ensure you get proper care.",
  },
];

function FAQAccordion({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="mb-4">
      <CardContent className="p-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-6 text-left flex items-start justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex-1 pr-4">
            <h3 className="font-semibold text-lg text-brand-charcoal">{item.question}</h3>
          </div>
          <div className="flex-shrink-0 ml-2">
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-brand-crimson" />
            ) : (
              <ChevronDown className="w-5 h-5 text-brand-skyblue" />
            )}
          </div>
        </button>
        {isOpen && (
          <div className="px-6 pb-6">
            <p className="text-gray-700 leading-relaxed">{item.answer}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function FAQsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(faqData.map(item => item.category)))];

  const filteredFAQs =
    selectedCategory === 'All'
      ? faqData
      : faqData.filter(item => item.category === selectedCategory);

  return (
    <PageLayout>
      <Section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-brand-charcoal mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-600">
                Find answers to common questions about our legal services and processes.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-brand-crimson text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* FAQ Items */}
            <div className="mb-12">
              {filteredFAQs.map(item => (
                <FAQAccordion key={item.id} item={item} />
              ))}
            </div>

            {/* Contact CTA */}
            <Card className="bg-brand-skyblue/10">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
                  Still Have Questions?
                </h2>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                  Don&apos;t see your question answered here? Our experienced attorneys are ready to
                  help. Contact us for a free consultation to discuss your specific situation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="inline-block bg-brand-crimson text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-crimson/90 transition-colors"
                  >
                    Contact Us
                  </a>
                  <a
                    href="tel:7043580470"
                    className="inline-block bg-white text-brand-charcoal px-8 py-3 rounded-lg font-semibold border-2 border-brand-charcoal hover:bg-gray-50 transition-colors"
                  >
                    Call (704) 358-0470
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                <strong>Disclaimer:</strong> The information provided in these FAQs is for general
                informational purposes only and does not constitute legal advice. Each case is
                unique, and you should consult with an attorney for advice specific to your
                situation.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
