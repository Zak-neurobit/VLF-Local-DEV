import fs from 'fs/promises';
import path from 'path';

interface PracticeAreaContent {
  slug: string;
  title: string;
  heroTitle: string;
  description: string;
  metaDescription: string;
  keywords: string[];
  services: string[];
  faqs: Array<{ question: string; answer: string }>;
  whyChooseUs: string[];
  caseTypes: string[];
}

const practiceAreas: PracticeAreaContent[] = [
  {
    slug: 'immigration',
    title: 'Immigration Law',
    heroTitle: 'Expert Immigration Attorneys in North Carolina',
    description:
      'Navigate the complex U.S. immigration system with experienced attorneys who understand your journey.',
    metaDescription:
      'Immigration lawyers in NC helping with green cards, visas, citizenship, deportation defense. Free consultation. Se habla español.',
    keywords: [
      'immigration lawyer NC',
      'green card attorney',
      'visa lawyer',
      'deportation defense',
      'citizenship attorney',
    ],
    services: [
      'Green Card Applications (Family & Employment-Based)',
      'Marriage-Based Immigration',
      'Fiancé Visas (K-1)',
      'Work Visas (H-1B, L-1, O-1, etc.)',
      'Investor Visas (E-2, EB-5)',
      'Citizenship & Naturalization',
      'Deportation Defense',
      'Asylum & Refugee Cases',
      'DACA & TPS Applications',
      'Immigration Appeals',
      'Waivers & Hardship Cases',
      'Consular Processing',
    ],
    faqs: [
      {
        question: 'How long does it take to get a green card?',
        answer:
          'Processing times vary depending on the type of application. Family-based green cards can take 8-33 months, while employment-based cases may take 1-3 years. We help expedite your case when possible.',
      },
      {
        question: 'Can I work while my immigration case is pending?',
        answer:
          'In many cases, yes. You may be eligible for work authorization (EAD) while your case is pending. We can help you apply for work permits as part of your immigration process.',
      },
      {
        question: 'What if I entered the U.S. illegally?',
        answer:
          'There may still be paths to legal status. Options include family-based petitions, asylum, or waivers. Each case is unique, and we can evaluate your specific situation during a consultation.',
      },
    ],
    whyChooseUs: [
      'Bilingual attorneys and staff (English/Spanish)',
      'Over 1000+ successful immigration cases',
      'Same-day consultations available',
      'Payment plans available',
      'Offices across North Carolina and Florida',
    ],
    caseTypes: [
      'Family Immigration',
      'Business Immigration',
      'Humanitarian Protection',
      'Deportation Defense',
    ],
  },
  {
    slug: 'personal-injury',
    title: 'Personal Injury',
    heroTitle: 'Fighting for Maximum Compensation for Injury Victims',
    description:
      'Injured in an accident? Our experienced personal injury attorneys fight to get you the compensation you deserve.',
    metaDescription:
      'Personal injury lawyers in NC handling car accidents, slip & fall, medical malpractice. No fees unless we win. Free consultation.',
    keywords: [
      'personal injury lawyer NC',
      'car accident attorney',
      'slip fall lawyer',
      'injury compensation',
      'accident attorney',
    ],
    services: [
      'Car Accidents',
      'Truck Accidents',
      'Motorcycle Accidents',
      'Pedestrian Accidents',
      'Uber/Lyft Accidents',
      'Slip & Fall Injuries',
      'Dog Bites',
      'Medical Malpractice',
      'Nursing Home Abuse',
      'Product Liability',
      'Wrongful Death',
      'Brain & Spinal Injuries',
      'Construction Accidents',
      'Workplace Injuries',
    ],
    faqs: [
      {
        question: 'How much is my personal injury case worth?',
        answer:
          'Case values depend on factors like medical expenses, lost wages, pain and suffering, and permanent disabilities. We fight for maximum compensation including future medical costs and lost earning capacity.',
      },
      {
        question: 'How long do I have to file a personal injury claim in NC?',
        answer:
          'North Carolina has a 3-year statute of limitations for most personal injury cases. However, some cases have shorter deadlines. Contact us immediately to protect your rights.',
      },
      {
        question: 'What if I was partially at fault for the accident?',
        answer:
          'North Carolina follows contributory negligence rules. Even 1% fault can bar recovery. However, there are exceptions and defenses. We thoroughly investigate to prove the other party was 100% at fault.',
      },
    ],
    whyChooseUs: [
      'No fees unless we win your case',
      'Millions recovered for clients',
      'Available 24/7 for emergencies',
      'We handle all insurance negotiations',
      'Aggressive representation in court',
    ],
    caseTypes: [
      'Motor Vehicle Accidents',
      'Premises Liability',
      'Medical Negligence',
      'Catastrophic Injuries',
    ],
  },
  {
    slug: 'criminal-defense',
    title: 'Criminal Defense',
    heroTitle: 'Aggressive Criminal Defense When Your Freedom is at Stake',
    description:
      'Facing criminal charges? Our experienced defense attorneys protect your rights and fight for the best possible outcome.',
    metaDescription:
      'Criminal defense lawyers in NC handling DWI, drug charges, assault, theft. Available 24/7. Free consultation. Se habla español.',
    keywords: [
      'criminal defense lawyer NC',
      'DWI attorney',
      'drug charge lawyer',
      'assault defense',
      'criminal attorney',
    ],
    services: [
      'DWI/DUI Defense',
      'Drug Charges (Possession, Trafficking, Manufacturing)',
      'Assault & Battery',
      'Domestic Violence',
      'Theft & Larceny',
      'Robbery & Burglary',
      'White Collar Crimes',
      'Federal Crimes',
      'Probation Violations',
      'Expungements',
      'Gun Charges',
      'Sex Crimes',
      'Homicide & Manslaughter',
      'Juvenile Crimes',
    ],
    faqs: [
      {
        question: "Should I talk to the police if I'm arrested?",
        answer:
          'No. Exercise your right to remain silent and ask for an attorney immediately. Anything you say can be used against you. We are available 24/7 to protect your rights from the moment of arrest.',
      },
      {
        question: 'What are the penalties for DWI in North Carolina?',
        answer:
          'DWI penalties include fines, license suspension, and possible jail time. Penalties increase with BAC level and prior offenses. We fight to minimize consequences and protect your driving privileges.',
      },
      {
        question: 'Can my criminal record be expunged?',
        answer:
          'Many charges can be expunged in NC, including some misdemeanors and felonies. Eligibility depends on the charge, outcome, and time passed. We can review your record and file for expungement.',
      },
    ],
    whyChooseUs: [
      'Former prosecutors on our team',
      'Available 24/7 for emergencies',
      'Aggressive courtroom representation',
      'Extensive trial experience',
      'Bilingual legal services',
    ],
    caseTypes: ['DWI/Traffic Offenses', 'Drug Crimes', 'Violent Crimes', 'Property Crimes'],
  },
  {
    slug: 'workers-compensation',
    title: "Workers' Compensation",
    heroTitle: "Protecting Injured Workers' Rights to Benefits",
    description:
      "Injured at work? We fight to ensure you receive all workers' compensation benefits you're entitled to under NC law.",
    metaDescription:
      'Workers compensation lawyers in NC helping injured workers get medical care and lost wages. No upfront fees. Free consultation.',
    keywords: [
      'workers comp lawyer NC',
      'work injury attorney',
      'workplace accident',
      'workers compensation benefits',
      'job injury lawyer',
    ],
    services: [
      'Workplace Injury Claims',
      'Construction Accidents',
      'Factory & Manufacturing Injuries',
      'Repetitive Stress Injuries',
      'Back & Spine Injuries',
      'Occupational Diseases',
      'Third-Party Claims',
      'Denied Claims Appeals',
      'Permanent Disability Benefits',
      'Death Benefits',
      'Medical Treatment Disputes',
      'Return to Work Issues',
      'Settlement Negotiations',
    ],
    faqs: [
      {
        question: "What should I do if I'm injured at work?",
        answer:
          'Report the injury to your supervisor immediately, seek medical treatment, document everything, and contact an attorney. You have 30 days to report most injuries to preserve your rights.',
      },
      {
        question: 'Can I see my own doctor for a work injury?',
        answer:
          "Initially, you must see the employer's approved doctor. After 30 days, you may be able to change doctors. We can help you navigate the medical care process and ensure proper treatment.",
      },
      {
        question: "What if my workers' comp claim is denied?",
        answer:
          "Don't give up. Many denied claims are successfully appealed. We can file an appeal, gather additional evidence, and represent you at hearings to fight for your benefits.",
      },
    ],
    whyChooseUs: [
      'No fees unless we win benefits',
      'Direct insurance company negotiation',
      'Medical referral network',
      'Bilingual services available',
      'Fast claim processing',
    ],
    caseTypes: [
      'Construction Injuries',
      'Industrial Accidents',
      'Repetitive Motion Injuries',
      'Occupational Illnesses',
    ],
  },
  {
    slug: 'family-law',
    title: 'Family Law',
    heroTitle: 'Compassionate Family Law Representation',
    description:
      'Navigate divorce, custody, and family matters with attorneys who understand the emotional and legal complexities.',
    metaDescription:
      "Family law attorneys in NC handling divorce, child custody, support, adoption. Protecting your family's future. Free consultation.",
    keywords: [
      'family lawyer NC',
      'divorce attorney',
      'child custody lawyer',
      'family law attorney',
      'divorce lawyer',
    ],
    services: [
      'Divorce (Contested & Uncontested)',
      'Child Custody & Visitation',
      'Child Support',
      'Spousal Support/Alimony',
      'Property Division',
      'Prenuptial Agreements',
      'Domestic Violence Protection',
      'Adoption',
      'Paternity Cases',
      'Guardianship',
      'Modification of Orders',
      'Contempt Actions',
      'Mediation Services',
    ],
    faqs: [
      {
        question: 'How is child custody determined in NC?',
        answer:
          "NC courts consider the best interests of the child, including each parent's ability to provide care, the child's needs, and existing relationships. We fight for custody arrangements that protect your parental rights.",
      },
      {
        question: 'How long does a divorce take in North Carolina?',
        answer:
          'NC requires one year of separation before filing for divorce. Uncontested divorces can be finalized in 30-60 days after filing. Contested cases may take several months to over a year.',
      },
      {
        question: 'How is property divided in a NC divorce?',
        answer:
          'NC follows equitable distribution, dividing marital property fairly but not necessarily equally. Factors include length of marriage, contributions, and economic circumstances of each spouse.',
      },
    ],
    whyChooseUs: [
      'Compassionate, personalized approach',
      'Strong negotiation skills',
      'Courtroom experience when needed',
      "Focus on children's best interests",
      'Affordable payment plans',
    ],
    caseTypes: [
      'Divorce Proceedings',
      'Child Custody Matters',
      'Financial Support Issues',
      'Protective Orders',
    ],
  },
  {
    slug: 'traffic-violations',
    title: 'Traffic Violations',
    heroTitle: 'Fighting Traffic Tickets to Protect Your License',
    description:
      "Don't just pay that ticket. Our attorneys fight traffic violations to protect your license and insurance rates.",
    metaDescription:
      'Traffic ticket lawyers in NC fighting speeding tickets, reckless driving, license issues. Save your license and insurance. Free consultation.',
    keywords: [
      'traffic lawyer NC',
      'speeding ticket attorney',
      'traffic violation lawyer',
      'license restoration',
      'traffic court lawyer',
    ],
    services: [
      'Speeding Tickets',
      'Reckless Driving',
      'Driving Without License',
      'Driving While License Revoked',
      'Red Light Violations',
      'Stop Sign Violations',
      'Following Too Closely',
      'Improper Equipment',
      'CDL Violations',
      'License Restoration',
      'DMV Hearings',
      'Insurance Points Reduction',
      'Prayer for Judgment (PJC)',
    ],
    faqs: [
      {
        question: 'Should I just pay my speeding ticket?',
        answer:
          'No. Paying the ticket admits guilt and can increase insurance rates for years. We often get tickets reduced or dismissed, saving you money and protecting your license.',
      },
      {
        question: 'How many points until I lose my license in NC?',
        answer:
          'NC suspends licenses at 12 points within 3 years. Different violations carry different points. We fight to minimize or eliminate points to protect your driving privileges.',
      },
      {
        question: 'Can you appear in court for me?',
        answer:
          'Yes, in most traffic cases we can appear without you being present. This saves you time and ensures professional representation in court.',
      },
    ],
    whyChooseUs: [
      "Appear in court so you don't have to",
      'Protect your insurance rates',
      'Save your license from suspension',
      'Flat fee pricing',
      'High success rate',
    ],
    caseTypes: [
      'Moving Violations',
      'Equipment Violations',
      'License Issues',
      'Commercial Driver Violations',
    ],
  },
];

async function buildFullSite() {
  console.log('🚀 Building complete Vasquez Law Firm website...\n');

  // Create all practice area pages
  for (const area of practiceAreas) {
    const pageContent = `'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ${area.title.replace(/\s+/g, '')}Page() {
  const [showFAQ, setShowFAQ] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ${area.heroTitle}
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              ${area.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-[#C9974D] hover:bg-[#D4A574] text-white font-bold rounded-lg transition-all transform hover:scale-105"
              >
                Get Free Consultation
              </Link>
              <a
                href="tel:1-844-967-3536"
                className="px-8 py-4 bg-white text-[#6B1F2E] font-bold rounded-lg hover:bg-gray-100 transition-all"
              >
                Call 1-844-YO-PELEO
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Our ${area.title} Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${area.services
              .map(
                service => `
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#C9974D]"
            >
              <h3 className="font-semibold text-lg text-[#6B1F2E] mb-2">${service}</h3>
            </motion.div>`
              )
              .join('')}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#6B1F2E] mb-8">
                Why Choose Vasquez Law Firm for ${area.title}?
              </h2>
              <ul className="space-y-4">
                ${area.whyChooseUs
                  .map(
                    reason => `
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#C9974D] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">${reason}</span>
                </li>`
                  )
                  .join('')}
              </ul>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/imported/${area.slug}-law.jpg"
                alt="${area.title} Services"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            ${area.faqs
              .map(
                (faq, index) => `
            <div className="bg-white rounded-lg shadow-md">
              <button
                onClick={() => setShowFAQ(showFAQ === ${index} ? null : ${index})}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-[#6B1F2E]">${faq.question}</span>
                <svg
                  className={\`w-5 h-5 text-[#C9974D] transform transition-transform \${
                    showFAQ === ${index} ? 'rotate-180' : ''
                  }\`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showFAQ === ${index} && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700">${faq.answer}</p>
                </div>
              )}
            </div>`
              )
              .join('')}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#6B1F2E] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Get the Legal Help You Need Today
          </h2>
          <p className="text-xl mb-8">
            Don't wait to protect your rights. Contact us now for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#C9974D] hover:bg-[#D4A574] text-white font-bold rounded-lg transition-all transform hover:scale-105"
            >
              Schedule Free Consultation
            </Link>
            <a
              href="tel:1-844-967-3536"
              className="px-8 py-4 bg-white text-[#6B1F2E] font-bold rounded-lg hover:bg-gray-100 transition-all"
            >
              Call Now: 1-844-YO-PELEO
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}`;

    // Create directory if it doesn't exist
    const dirPath = path.join(process.cwd(), 'src', 'app', 'practice-areas', area.slug);
    await fs.mkdir(dirPath, { recursive: true });

    // Write the page file
    await fs.writeFile(path.join(dirPath, 'page.tsx'), pageContent);

    console.log(`✅ Created ${area.title} page at /practice-areas/${area.slug}`);
  }

  // Create attorney profiles data
  const attorneys = [
    {
      slug: 'william-vasquez',
      name: 'William Vasquez',
      title: 'CEO & Managing Attorney',
      image: '/images/imported/william-vasquez.jpg',
      bio: 'William Vasquez founded Vasquez Law Firm with a mission to provide exceptional legal representation to the Hispanic community and all North Carolinians. With over 15 years of experience, he has helped thousands of clients navigate complex legal matters.',
      education: [
        'Juris Doctor, Campbell University School of Law',
        'Bachelor of Arts, University of North Carolina',
      ],
      barAdmissions: ['North Carolina', 'Florida', 'Federal Courts'],
      languages: ['English', 'Spanish'],
      practiceAreas: ['Immigration Law', 'Personal Injury', 'Criminal Defense'],
      achievements: [
        'Super Lawyers Rising Star',
        'National Trial Lawyers Top 40 Under 40',
        'AVVO 10.0 Rating',
      ],
    },
    {
      slug: 'jillian-baucom',
      name: 'Jillian Baucom',
      title: 'Senior Immigration Attorney',
      image: '/images/imported/jillian-baucom.jpg',
      bio: 'Jillian Baucom specializes in immigration law and has helped hundreds of families navigate the complex immigration system. She is passionate about reuniting families and helping individuals achieve their American dream.',
      education: [
        'Juris Doctor, University of North Carolina School of Law',
        'Bachelor of Science, NC State University',
      ],
      barAdmissions: ['North Carolina'],
      languages: ['English'],
      practiceAreas: ['Immigration Law', 'Family Law'],
      achievements: [
        'American Immigration Lawyers Association Member',
        'Pro Bono Service Award',
        'Client Choice Award 2023',
      ],
    },
    {
      slug: 'adrianna-ingram',
      name: 'Adrianna Ingram',
      title: 'Personal Injury Attorney',
      image: '/images/imported/adrianna-ingram.jpg',
      bio: 'Adrianna Ingram focuses on personal injury and workers compensation cases, fighting for fair compensation for injured clients. Her aggressive representation has resulted in millions in settlements for her clients.',
      education: ['Juris Doctor, Charlotte School of Law', 'Bachelor of Arts, UNC Charlotte'],
      barAdmissions: ['North Carolina'],
      languages: ['English', 'Spanish'],
      practiceAreas: ['Personal Injury', 'Workers Compensation'],
      achievements: [
        'Million Dollar Advocates Forum',
        'National Academy of Personal Injury Attorneys',
        'Top 100 Trial Lawyers',
      ],
    },
  ];

  // Create attorney pages
  for (const attorney of attorneys) {
    const attorneyPage = `'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ${attorney.name.replace(/\s+/g, '')}Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Attorney Header */}
      <section className="bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="${attorney.image}"
                alt="${attorney.name}"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold mb-2">${attorney.name}</h1>
              <p className="text-2xl text-[#C9974D] mb-6">${attorney.title}</p>
              <p className="text-lg mb-6">${attorney.bio}</p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-[#C9974D] hover:bg-[#D4A574] text-white font-bold rounded-lg transition-all"
                >
                  Schedule Consultation
                </Link>
                <a
                  href="tel:1-844-967-3536"
                  className="px-6 py-3 bg-white text-[#6B1F2E] font-bold rounded-lg hover:bg-gray-100 transition-all"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Attorney Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Education & Admissions */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-[#6B1F2E] mb-4">Education</h3>
                <ul className="space-y-2">
                  ${attorney.education.map(edu => `<li className="text-gray-700">• ${edu}</li>`).join('')}
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-[#6B1F2E] mb-4">Bar Admissions</h3>
                <ul className="space-y-2">
                  ${attorney.barAdmissions.map(bar => `<li className="text-gray-700">• ${bar}</li>`).join('')}
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-[#6B1F2E] mb-4">Languages</h3>
                <ul className="space-y-2">
                  ${attorney.languages.map(lang => `<li className="text-gray-700">• ${lang}</li>`).join('')}
                </ul>
              </div>
            </div>

            {/* Practice Areas & Achievements */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#6B1F2E] mb-6">Practice Areas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  ${attorney.practiceAreas
                    .map(
                      area => `
                  <Link
                    href="/practice-areas/${area.toLowerCase().replace(/\s+/g, '-')}"
                    className="bg-white border-2 border-[#C9974D] rounded-lg p-4 hover:bg-[#C9974D] hover:text-white transition-all"
                  >
                    <h4 className="font-semibold">${area}</h4>
                  </Link>`
                    )
                    .join('')}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#6B1F2E] mb-6">Awards & Recognition</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  ${attorney.achievements
                    .map(
                      achievement => `
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-[#C9974D] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray-700">${achievement}</span>
                  </div>`
                    )
                    .join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#6B1F2E] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Schedule a Consultation with ${attorney.name.split(' ')[0]}
          </h2>
          <p className="text-xl mb-8">
            Get experienced legal representation for your case.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-[#C9974D] hover:bg-[#D4A574] text-white font-bold rounded-lg transition-all transform hover:scale-105"
          >
            Book Your Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}`;

    const attorneyDir = path.join(process.cwd(), 'src', 'app', 'attorneys', attorney.slug);
    await fs.mkdir(attorneyDir, { recursive: true });
    await fs.writeFile(path.join(attorneyDir, 'page.tsx'), attorneyPage);
    console.log(`✅ Created attorney page for ${attorney.name}`);
  }

  // Create location pages
  const locations = [
    { city: 'raleigh', name: 'Raleigh', address: '819 N Market Dr, Raleigh, NC 27609' },
    { city: 'charlotte', name: 'Charlotte', address: 'Charlotte, NC' },
    { city: 'smithfield', name: 'Smithfield', address: 'Smithfield, NC' },
    { city: 'orlando', name: 'Orlando', address: 'Orlando, FL' },
  ];

  for (const location of locations) {
    const locationPage = `export default function ${location.name}OfficePage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[#6B1F2E] mb-8">
          ${location.name} Office - Vasquez Law Firm
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Serving ${location.name} and Surrounding Areas</h2>
            <p className="text-gray-700 mb-6">
              Our ${location.name} office provides comprehensive legal services including immigration, 
              personal injury, criminal defense, family law, and workers' compensation.
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-[#6B1F2E] mb-4">Office Information</h3>
              <p className="mb-2"><strong>Address:</strong> ${location.address}</p>
              <p className="mb-2"><strong>Phone:</strong> 1-844-YO-PELEO (967-3536)</p>
              <p className="mb-2"><strong>Hours:</strong> Monday-Friday 9:00 AM - 6:00 PM</p>
              <p><strong>Languages:</strong> English, Spanish</p>
            </div>
          </div>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.5!2d-78.6382!3d35.7796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ2JzQ2LjYiTiA3OMKwMzgnMTcuNSJX!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}`;

    const locationDir = path.join(process.cwd(), 'src', 'app', 'locations', location.city);
    await fs.mkdir(locationDir, { recursive: true });
    await fs.writeFile(path.join(locationDir, 'page.tsx'), locationPage);
    console.log(`✅ Created location page for ${location.name}`);
  }

  console.log('\n✨ Full site build completed!');
  console.log('\n📊 Created:');
  console.log(`- ${practiceAreas.length} practice area pages`);
  console.log(`- ${attorneys.length} attorney profile pages`);
  console.log(`- ${locations.length} location pages`);
  console.log('\n🚀 Your website now has a complete structure ready for launch!');
}

// Run the builder
buildFullSite().catch(console.error);
