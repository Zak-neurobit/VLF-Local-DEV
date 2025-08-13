import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';
import { SmartBreadcrumbs } from '@/components/SEO/SmartBreadcrumbs';
import { InternalLinkingSection } from '@/components/SEO/InternalLinkingSection';
import { HowToSchema } from '@/components/SEO/HowToSchema';
export const metadata: Metadata = {
  title: 'Asylum Attorney NC | Political Asylum & Refugee Protection Lawyers',
  description:
    "Fleeing persecution? NC's top asylum lawyers with 94% approval rate. We win political asylum, religious persecution, LGBTQ+, and torture cases. Former asylum officers on team. Free consultation!",
  keywords:
    'asylum lawyer NC, political asylum attorney, refugee protection lawyer, persecution attorney, credible fear interview, defensive asylum, affirmative asylum, torture convention, withholding removal, asylum application',
  openGraph: {
    title: 'Asylum Attorney NC | Political Asylum & Refugee Protection Lawyers',
    description:
      "Fleeing persecution? NC's top asylum lawyers with 94% approval rate. We win political asylum, religious persecution, LGBTQ+, and torture cases. Former asylum officers on team. Free consultation!",
    url: `https://www.vasquezlawfirm.com/practice-areas/immigration/removal-defense/asylum`,
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/asylum-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Asylum and Refugee Protection Legal Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asylum Attorney NC | Political Asylum & Refugee Protection Lawyers',
    description:
      "Fleeing persecution? NC's top asylum lawyers with 94% approval rate. We win political asylum, religious persecution, LGBTQ+, and torture cases. Former asylum officers on team. Free consultation!",
    images: ['/images/practice-areas/asylum-hero.jpg'],
  },
  alternates: {
    canonical: `https://www.vasquezlawfirm.com/practice-areas/immigration/removal-defense/asylum`,
    languages: {
      'en-US': `https://www.vasquezlawfirm.com/practice-areas/immigration/removal-defense/asylum`,
      'es-ES': `https://www.vasquezlawfirm.com/es/areas-de-practica/immigration/defensa-de-remocion/asilo`,
    },
  },
};

export default function AsylumPage() {
  const currentPage = {
    type: 'practice-area' as const,
    slug: 'asylum',
    service: 'immigration',
  };

  const services = [
    {
      title: 'Political Asylum',
      description:
        'Persecuted for political opinions? We build bulletproof cases proving government persecution, political party membership dangers, and activist targeting. Your voice matters - we protect it.',
      features: [
        'Government persecution evidence',
        'Political opinion documentation',
        'Protest participation proof',
        'Media coverage compilation',
        'Expert country witnesses',
        'Political party verification',
      ],
    },
    {
      title: 'Religious Persecution',
      description:
        'Targeted for your faith? We document religious persecution with expert testimony, church leadership support, and country condition evidence that proves your danger.',
      features: [
        'Religious persecution patterns',
        'Church leadership testimony',
        'Faith community threats',
        'Conversion danger evidence',
        'Religious minority status',
        'Worship restriction proof',
      ],
    },
    {
      title: 'LGBTQ+ Asylum',
      description:
        'Persecuted for who you are or who you love? We specialize in LGBTQ+ asylum cases, understanding the unique challenges and building compassionate, winning arguments.',
      features: [
        'Identity persecution evidence',
        'Country law documentation',
        'Social persecution patterns',
        'Medical/psychological support',
        'Community testimony',
        'Safe country analysis',
      ],
    },
    {
      title: 'Gender-Based Persecution',
      description:
        'Fleeing domestic violence, FGM, honor killings, or forced marriage? We prove government inability or unwillingness to protect you. Your safety is our mission.',
      features: [
        'Domestic violence documentation',
        'Police failure evidence',
        'FGM risk assessment',
        'Honor violence threats',
        'Forced marriage proof',
        'Gender discrimination laws',
      ],
    },
    {
      title: 'Convention Against Torture',
      description:
        'Face torture if returned? CAT protection is harder to win but provides crucial safety. We prove government involvement or acquiescence to torture with powerful evidence.',
      features: [
        'Torture likelihood evidence',
        'Government involvement proof',
        'Medical torture documentation',
        'Psychological evaluations',
        'Country torture reports',
        'Prison condition evidence',
      ],
    },
    {
      title: 'Withholding of Removal',
      description:
        'Higher burden than asylum but no time limits. We prove more likely than not persecution for protected grounds. Critical backup protection we always pursue.',
      features: [
        'Persecution probability analysis',
        'No one-year deadline',
        'Criminal bar workarounds',
        'Protected ground evidence',
        'Country documentation',
        'Expert testimony coordination',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What if I missed the one-year asylum deadline?',
      answer:
        "Don't give up! We prove extraordinary circumstances or changed country conditions that excuse late filing. Plus, withholding of removal and CAT have NO deadlines. We find solutions.",
    },
    {
      question: 'How do you prove persecution?',
      answer:
        'Through detailed testimony, country expert witnesses, medical/psychological evaluations, news reports, and government documentation. Our 94% approval rate comes from overwhelming evidence packages.',
    },
    {
      question: 'Can I work while my asylum case is pending?',
      answer:
        'YES! You can apply for work authorization 150 days after filing asylum. We file immediately at day 150 to get you working legally and supporting your family.',
    },
    {
      question: 'What happens at my credible fear interview?',
      answer:
        'This is your first chance to explain your fear. We prepare you thoroughly, attend if allowed, and ensure you present your strongest case. Most clients pass with our preparation.',
    },
    {
      question: 'Can my family be included in my asylum case?',
      answer:
        'Yes! Your spouse and unmarried children under 21 can be included as derivatives. They get asylum status when you win. We ensure all family members are properly included.',
    },
  ];

  return (
    <>
      <SmartBreadcrumbs
        customLabels={{
          asylum: 'Asylum Protection',
          'removal-defense': 'Removal Defense',
          immigration: 'Immigration Law',
          'practice-areas': 'Practice Areas',
        }}
        showHome={true}
      />

      <ModernPracticeAreaTemplate
        title="Asylum Protection: Your Shield Against Persecution"
        subtitle="94% Success Rate Winning Freedom from Fear"
        description="Fleeing persecution? Your story deserves to be heard and your life protected. Our asylum experts combine compassion with courtroom dominance. Former asylum officers know what wins. We transform fear into freedom, persecution into protection. Your new life starts with one call."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            <InternalLinkingSection
              currentPage={currentPage}
              variant="inline"
              maxLinks={5}

                className="mb-8 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-primary/20"
            />

            {/* Types of Persecution We Fight */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Persecution We Fight - Protection We Win
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-red-900/20 to-black rounded-lg p-6 border border-red-500/30">
                  <h3 className="text-xl font-bold text-red-400 mb-3">Political Opinion</h3>
                  <p className="text-gray-300">
                    Government targets you for opposing regime, supporting democracy, or political
                    activism. We prove systematic persecution and future danger.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-900/20 to-black rounded-lg p-6 border border-purple-500/30">
                  <h3 className="text-xl font-bold text-purple-400 mb-3">Religious Faith</h3>
                  <p className="text-gray-300">
                    Persecuted for practicing your religion, converting, or religious minority
                    status. We document systematic religious oppression.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-pink-900/20 to-black rounded-lg p-6 border border-pink-500/30">
                  <h3 className="text-xl font-bold text-pink-400 mb-3">LGBTQ+ Identity</h3>
                  <p className="text-gray-300">
                    Targeted for sexual orientation or gender identity. We prove criminalization,
                    violence, and government-sanctioned persecution.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-yellow-900/20 to-black rounded-lg p-6 border border-yellow-500/30">
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">Race/Ethnicity</h3>
                  <p className="text-gray-300">
                    Ethnic cleansing, racial violence, or minority persecution. We document patterns
                    of racial targeting and government complicity.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-900/20 to-black rounded-lg p-6 border border-green-500/30">
                  <h3 className="text-xl font-bold text-green-400 mb-3">Social Group</h3>
                  <p className="text-gray-300">
                    Family, profession, or social characteristics make you a target. We prove
                    particular social group membership and persecution nexus.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-900/20 to-black rounded-lg p-6 border border-blue-500/30">
                  <h3 className="text-xl font-bold text-blue-400 mb-3">Gender-Based</h3>
                  <p className="text-gray-300">
                    FGM, honor killings, domestic violence with no state protection. We prove
                    government failure to protect and cultural persecution.
                  </p>
                </div>
              </div>
            </section>

            {/* Asylum Process Timeline */}
            <section className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
              <h2 className="text-3xl font-bold mb-6 text-primary text-center">
                Your Path to Protection: The Asylum Journey
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center text-black font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-green-400 mb-2">Initial Consultation</h3>
                    <p className="text-gray-300">
                      Share your story in a safe, confidential setting. We assess your case
                      strength, identify the best protection path, and begin building your evidence.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-yellow-500 rounded-full w-12 h-12 flex items-center justify-center text-black font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-yellow-400 mb-2">Evidence Collection</h3>
                    <p className="text-gray-300">
                      We gather country condition evidence, coordinate expert witnesses, obtain
                      medical/ psychological evaluations, and build an overwhelming case for
                      protection.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-orange-500 rounded-full w-12 h-12 flex items-center justify-center text-black font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-orange-400 mb-2">Application Filing</h3>
                    <p className="text-gray-300">
                      I-589 filed with supporting evidence. For defensive cases, we file with
                      immigration court. Work authorization clock starts ticking - employment coming
                      soon!
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-red-500 rounded-full w-12 h-12 flex items-center justify-center text-black font-bold flex-shrink-0">
                    4
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-red-400 mb-2">Interview/Hearing Prep</h3>
                    <p className="text-gray-300">
                      Intensive preparation including mock interviews, testimony practice, and
                      evidence review. You'll be ready for every question. Confidence wins cases.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-black font-bold flex-shrink-0">
                    5
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-primary mb-2">Win Your Freedom</h3>
                    <p className="text-gray-300">
                      Asylum granted! You're safe, can work freely, petition for family, and apply
                      for green card in one year. From persecution to protection - you're home.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Evidence Building Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                How We Build Unbeatable Asylum Cases
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-4">Documentary Evidence</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">▶</span>
                      <span>Country condition reports from DOS, Human Rights Watch, Amnesty</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">▶</span>
                      <span>News articles documenting persecution patterns</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">▶</span>
                      <span>Government documents showing targeting</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">▶</span>
                      <span>Medical records of persecution injuries</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">▶</span>
                      <span>Photos, videos, and social media evidence</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-4">Expert Support</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">▶</span>
                      <span>Country condition experts who testify about dangers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">▶</span>
                      <span>Psychological evaluations documenting trauma</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">▶</span>
                      <span>Medical examinations consistent with torture</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">▶</span>
                      <span>Religious leaders confirming faith persecution</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">▶</span>
                      <span>Former government officials as witnesses</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Success Stories */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Lives Saved: Recent Asylum Victories
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-900/20 border border-green-500 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-green-400 mb-2">
                    Venezuelan Journalist - GRANTED
                  </h3>
                  <p className="text-gray-300">
                    Exposed government corruption, received death threats. We proved systematic
                    targeting of journalists with expert testimony. Now safe and continuing her
                    work.
                  </p>
                </div>
                <div className="bg-green-900/20 border border-green-500 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-green-400 mb-2">
                    LGBTQ+ Activist from Uganda - GRANTED
                  </h3>
                  <p className="text-gray-300">
                    Faced life imprisonment under anti-gay laws. We documented government
                    persecution and violence. Judge granted asylum in 15 minutes. Living openly and
                    freely.
                  </p>
                </div>
                <div className="bg-green-900/20 border border-green-500 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-green-400 mb-2">
                    Chinese Christian - GRANTED
                  </h3>
                  <p className="text-gray-300">
                    Underground church leader arrested multiple times. We proved religious
                    persecution with church testimony. Entire family now protected and worshipping
                    freely.
                  </p>
                </div>
                <div className="bg-green-900/20 border border-green-500 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-green-400 mb-2">
                    Afghan Interpreter - GRANTED + CAT
                  </h3>
                  <p className="text-gray-300">
                    Worked with US forces, Taliban threatened family. Won both asylum and CAT
                    protection. Proved certain torture if returned. Hero finally safe.
                  </p>
                </div>
              </div>
            </section>

            {/* Urgent CTA */}
            <section className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg p-8 border border-red-500">
              <h2 className="text-3xl font-bold mb-4 text-center text-red-400">
                Don't Wait - Your Safety Depends on Acting Now
              </h2>
              <p className="text-xl text-center text-white mb-6">
                One-year deadline for asylum. Evidence takes time to gather. Every day matters. With
                our 94% success rate and former asylum officers, your protection is within reach.
              </p>
              <div className="text-center">
                <a
                  href="tel:1-844-967-3536"
                  className="inline-block bg-red-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-red-700 transition-all transform hover:scale-105"
                >
                  Start Your Protection Now: 1-844-YO-PELEO
                </a>
              </div>
            </section>

            <InternalLinkingSection
              currentPage={currentPage}
              variant="related"
              maxLinks={6}

                className="mt-12 pt-12 border-t border-gray-800"
            />
          </div>
        }
      />

      {/* Structured Data */}
      <Script
        id="asylum-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Asylum and Refugee Protection - Vasquez Law Firm',
            description:
              'Expert asylum attorneys with 94% success rate. We handle political asylum, religious persecution, LGBTQ+ cases, and torture convention claims.',
            provider: {
              '@type': 'Attorney',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina',
            },
            serviceType: 'Asylum and Refugee Protection',
          }),
        }}
      />

      <HowToSchema practiceArea="immigration" pageType="asylum-protection" />
    </>
  );
}
