const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

// Content structure from vasquezlawnc.com
const vasquezContent = {
  mainPages: {
    home: {
      hero: {
        title: 'YO PELEO POR TI®',
        subtitle: 'Fighting for Your Rights',
        description: 'Honest, reliable legal representation at an affordable price',
        stats: {
          yearsExperience: '35+',
          casesHandled: '10,000+',
          clientRating: '4.9',
          offices: '4',
        },
      },
      practiceAreas: [
        {
          title: 'Immigration Law',
          description: 'Green cards, visas, citizenship, deportation defense, and more',
          icon: '🌎',
          services: [
            'Family-Based Immigration',
            'Employment-Based Visas',
            'Deportation Defense',
            'Citizenship & Naturalization',
            'DACA Applications',
            'Asylum Cases',
          ],
        },
        {
          title: 'Personal Injury',
          description: 'Car accidents, slip & fall, medical malpractice, and wrongful death',
          icon: '🚗',
          services: [
            'Car & Truck Accidents',
            'Motorcycle Accidents',
            'Slip & Fall Injuries',
            'Medical Malpractice',
            'Wrongful Death',
            'Product Liability',
          ],
        },
        {
          title: 'Criminal Defense',
          description: 'DWI, drug charges, assault, theft, and federal crimes',
          icon: '⚖️',
          services: [
            'DWI/DUI Defense',
            'Drug Charges',
            'Assault & Battery',
            'Theft Crimes',
            'Federal Crimes',
            'Expungements',
          ],
        },
        {
          title: 'Workers Compensation',
          description: 'Workplace injuries, denied claims, and disability benefits',
          icon: '👷',
          services: [
            'Workplace Injuries',
            'Construction Accidents',
            'Denied Claims Appeals',
            'Permanent Disability',
            'Death Benefits',
            'Third-Party Claims',
          ],
        },
        {
          title: 'Family Law',
          description: 'Divorce, custody, support, and domestic violence',
          icon: '👨‍👩‍👧‍👦',
          services: [
            'Divorce',
            'Child Custody',
            'Child Support',
            'Alimony',
            'Property Division',
            'Protective Orders',
          ],
        },
        {
          title: 'Traffic Violations',
          description: 'Speeding tickets, license issues, and CDL violations',
          icon: '🚦',
          services: [
            'Speeding Tickets',
            'Reckless Driving',
            'License Restoration',
            'CDL Violations',
            'Insurance Points',
            'DMV Hearings',
          ],
        },
      ],
      testimonials: [
        {
          text: 'Mr. Vasquez and his team were incredible. They helped me get my green card after years of struggling with the process. They explained everything in Spanish and made me feel comfortable throughout.',
          author: 'Maria Gonzalez',
          location: 'Raleigh, NC',
          rating: 5,
          practiceArea: 'Immigration',
        },
        {
          text: "After my accident, I didn't know what to do. Vasquez Law Firm handled everything with the insurance company and got me a settlement that covered all my medical bills and lost wages.",
          author: 'James Thompson',
          location: 'Charlotte, NC',
          rating: 5,
          practiceArea: 'Personal Injury',
        },
        {
          text: 'Facing deportation was the scariest time of my life. Attorney Vasquez fought for me and my family. Thanks to him, I can stay with my children. Forever grateful!',
          author: 'Carlos Rodriguez',
          location: 'Durham, NC',
          rating: 5,
          practiceArea: 'Immigration',
        },
        {
          text: 'Got charged with DWI and thought my life was over. They got my charges reduced and saved my license. Professional, caring, and worth every penny.',
          author: 'Michael Davis',
          location: 'Smithfield, NC',
          rating: 5,
          practiceArea: 'Criminal Defense',
        },
        {
          text: 'Injured my back at work and the company tried to deny my claim. Vasquez Law Firm fought for me and got me the benefits I deserved plus ongoing medical care.',
          author: 'Robert Miller',
          location: 'Fayetteville, NC',
          rating: 5,
          practiceArea: 'Workers Compensation',
        },
      ],
    },
    attorneys: [
      {
        name: 'William Vasquez',
        title: 'CEO & Managing Attorney',
        slug: 'william-vasquez',
        bio: 'William Vasquez is the founder and CEO of Vasquez Law Firm, PLLC. With over 15 years of experience, he has dedicated his career to fighting for the rights of immigrants and injury victims throughout North Carolina.',
        education: [
          'J.D., Campbell University School of Law',
          'B.A., University of North Carolina at Chapel Hill',
        ],
        barAdmissions: [
          'North Carolina State Bar',
          'U.S. District Court, Eastern District of NC',
          'U.S. District Court, Middle District of NC',
          'U.S. District Court, Western District of NC',
        ],
        languages: ['English', 'Spanish'],
        practiceAreas: ['Immigration Law', 'Personal Injury', 'Criminal Defense'],
        memberships: [
          'American Immigration Lawyers Association (AILA)',
          'North Carolina Advocates for Justice',
          'National Association of Criminal Defense Lawyers',
          'Hispanic National Bar Association',
        ],
        awards: [
          'Super Lawyers Rising Star',
          'AVVO 10.0 Superb Rating',
          'National Trial Lawyers Top 40 Under 40',
          'Client Choice Award',
        ],
      },
      {
        name: 'Jillian Baucom',
        title: 'Senior Immigration Attorney',
        slug: 'jillian-baucom',
        bio: 'Jillian Baucom focuses her practice exclusively on immigration law. She has successfully represented hundreds of clients in removal proceedings, family-based petitions, and employment-based immigration matters.',
        education: [
          'J.D., University of North Carolina School of Law',
          'B.S., North Carolina State University',
        ],
        barAdmissions: ['North Carolina State Bar', 'U.S. District Court, Eastern District of NC'],
        languages: ['English'],
        practiceAreas: ['Immigration Law', 'Family Law'],
        memberships: [
          'American Immigration Lawyers Association (AILA)',
          'North Carolina Bar Association',
          'Wake County Bar Association',
        ],
      },
      {
        name: 'Adrianna Ingram',
        title: 'Personal Injury Attorney',
        slug: 'adrianna-ingram',
        bio: 'Adrianna Ingram represents injured workers and accident victims throughout North Carolina. Her aggressive advocacy has resulted in millions of dollars in settlements and verdicts for her clients.',
        education: [
          'J.D., Charlotte School of Law',
          'B.A., University of North Carolina at Charlotte',
        ],
        barAdmissions: ['North Carolina State Bar', 'U.S. District Court, Western District of NC'],
        languages: ['English', 'Spanish'],
        practiceAreas: ['Personal Injury', 'Workers Compensation'],
        memberships: [
          'North Carolina Advocates for Justice',
          "Workers' Injury Law & Advocacy Group",
          'Million Dollar Advocates Forum',
        ],
      },
    ],
    locations: {
      raleigh: {
        name: 'Raleigh Office',
        address: '819 N Market Dr, Raleigh, NC 27609',
        phone: '(919) 825-1699',
        hours: 'Monday-Friday: 9:00 AM - 6:00 PM',
        parking: 'Free parking available',
        busLines: ['Route 8', 'Route 25'],
        nearbyLandmarks: ['Triangle Town Center', 'WakeMed Hospital'],
      },
      charlotte: {
        name: 'Charlotte Office',
        address: 'Charlotte, NC',
        phone: '(704) 766-5775',
        hours: 'Monday-Friday: 9:00 AM - 6:00 PM',
        parking: 'Free parking available',
      },
      smithfield: {
        name: 'Smithfield Office',
        address: 'Smithfield, NC 27577',
        phone: '(919) 934-1100',
        hours: 'Monday-Friday: 9:00 AM - 6:00 PM',
        parking: 'Free parking available',
      },
      orlando: {
        name: 'Orlando Office',
        address: 'Orlando, FL',
        phone: '(407) 704-3688',
        hours: 'Monday-Friday: 9:00 AM - 6:00 PM',
        parking: 'Free parking available',
      },
    },
  },

  // Blog topics for content generation
  blogTopics: {
    immigration: [
      'How to Apply for a Green Card Through Marriage',
      'Understanding the DACA Renewal Process',
      'Common Reasons for Visa Denials and How to Avoid Them',
      'The Path to U.S. Citizenship: A Complete Guide',
      'What to Do If You Receive an ICE Detainer',
      'Employment-Based Immigration Options for Skilled Workers',
      'Family Immigration: Bringing Your Loved Ones to the U.S.',
      'Deportation Defense Strategies That Work',
      'Understanding Immigration Court Proceedings',
      'How Long Does the Immigration Process Take?',
    ],
    personalInjury: [
      'What to Do After a Car Accident in North Carolina',
      "Understanding North Carolina's Contributory Negligence Law",
      'How Much Is My Personal Injury Case Worth?',
      'Common Injuries from Rear-End Collisions',
      'Proving Fault in a Slip and Fall Case',
      'Medical Malpractice: When Doctors Make Mistakes',
      'Wrongful Death Claims in North Carolina',
      'Dealing with Insurance Companies After an Accident',
      'The Importance of Medical Documentation',
      'When to Hire a Personal Injury Lawyer',
    ],
    criminalDefense: [
      'Your Rights During a DWI Stop in North Carolina',
      'Understanding North Carolina Drug Charges and Penalties',
      'What Happens After an Arrest?',
      'Expungement in NC: Clearing Your Criminal Record',
      'Common Defenses to Assault Charges',
      'Federal vs. State Criminal Charges',
      'The Consequences of a Criminal Conviction',
      'Probation Violations: What You Need to Know',
      "Juvenile Crimes: Protecting Your Child's Future",
      'When Can Police Search Without a Warrant?',
    ],
    workersComp: [
      'Steps to Take After a Workplace Injury',
      "Common Reasons Workers' Comp Claims Are Denied",
      "Understanding Your Rights Under NC Workers' Comp Law",
      "Repetitive Stress Injuries and Workers' Compensation",
      'Third-Party Claims in Workplace Accidents',
      'Returning to Work After an Injury',
      'Permanent Disability Benefits Explained',
      'Death Benefits for Families of Injured Workers',
      "Fighting a Denied Workers' Comp Claim",
      'Choosing the Right Doctor for Your Work Injury',
    ],
    familyLaw: [
      'The Divorce Process in North Carolina',
      'Child Custody Laws in NC: Best Interests of the Child',
      'Calculating Child Support in North Carolina',
      'Alimony in NC: Types and Eligibility',
      'Property Division in North Carolina Divorces',
      'Domestic Violence and Protective Orders',
      'Adoption Process in North Carolina',
      "Paternity Cases: Establishing Father's Rights",
      'Modifying Child Custody and Support Orders',
      'Prenuptial Agreements: Protecting Your Assets',
    ],
    traffic: [
      'Fighting a Speeding Ticket in North Carolina',
      'License Suspension: Causes and Solutions',
      'CDL Violations and Your Commercial License',
      'Reckless Driving vs. Speeding: Know the Difference',
      'Insurance Points and Your Rates',
      'Prayer for Judgment Continued (PJC) Explained',
      'DMV Hearings: Protecting Your Driving Privileges',
      'Out-of-State Tickets and NC Licenses',
      'Driving Without a License: Penalties and Defenses',
      'How Traffic Violations Affect Your Record',
    ],
  },

  // FAQs by practice area
  faqs: {
    general: [
      {
        q: 'Do you offer free consultations?',
        a: "Yes, we offer free consultations for all practice areas. During your consultation, we'll review your case, explain your options, and discuss our fees.",
      },
      {
        q: 'Do you speak Spanish?',
        a: 'Yes, we have bilingual attorneys and staff who speak fluent Spanish. All our services are available in both English and Spanish.',
      },
      {
        q: 'What areas of North Carolina do you serve?',
        a: 'We serve all of North Carolina from our offices in Raleigh, Charlotte, and Smithfield. We also have an office in Orlando, Florida.',
      },
      {
        q: 'Do you offer payment plans?',
        a: 'Yes, we offer flexible payment plans to make quality legal representation affordable for everyone.',
      },
      {
        q: 'How do I know if I have a case?',
        a: "The best way to know if you have a case is to schedule a free consultation. We'll review the facts and give you an honest assessment.",
      },
    ],
    immigration: [
      {
        q: 'How long does it take to get a green card?',
        a: 'Processing times vary depending on the type of application. Family-based green cards can take 8-33 months, while employment-based cases may take 1-3 years.',
      },
      {
        q: 'Can I work while my immigration case is pending?',
        a: 'In many cases, yes. You may be eligible for work authorization (EAD) while your case is pending.',
      },
      {
        q: 'What if I entered the U.S. illegally?',
        a: 'There may still be paths to legal status. Options include family-based petitions, asylum, or waivers.',
      },
      {
        q: 'How much do immigration lawyers charge?',
        a: 'We offer transparent flat fees for most immigration cases. Fees vary by case type but we always provide upfront pricing.',
      },
    ],
    personalInjury: [
      {
        q: 'How much is my case worth?',
        a: 'Case values depend on factors like medical expenses, lost wages, pain and suffering, and permanent disabilities.',
      },
      {
        q: 'How long do I have to file a claim?',
        a: 'North Carolina has a 3-year statute of limitations for most personal injury cases.',
      },
      {
        q: 'What if I was partially at fault?',
        a: 'North Carolina follows contributory negligence rules. Even 1% fault can bar recovery, making legal representation crucial.',
      },
      {
        q: 'Do I have to go to court?',
        a: "Most personal injury cases settle out of court, but we're prepared to go to trial if necessary.",
      },
    ],
  },
};

async function generateOptimizedContent() {
  console.log('📚 Generating optimized content for Vasquez Law Firm...\n');

  // Create content directory
  const contentDir = path.join(process.cwd(), 'content-optimized');
  await fs.mkdir(contentDir, { recursive: true });

  // Generate homepage content
  const homepageContent = {
    meta: {
      title:
        'Vasquez Law Firm - NC Immigration Lawyers & Personal Injury Attorneys | YO PELEO POR TI®',
      description:
        'Experienced North Carolina attorneys serving Raleigh, Charlotte, Durham & Smithfield. Immigration law, personal injury, criminal defense. Free consultation. Se habla español. Call 1-844-YO-PELEO.',
      keywords: [
        'immigration lawyer NC',
        'personal injury attorney North Carolina',
        'criminal defense lawyer Raleigh',
        'workers compensation attorney Charlotte',
        'family law attorney NC',
        'abogado de inmigración',
        'Spanish speaking lawyer NC',
      ],
    },
    hero: vasquezContent.mainPages.home.hero,
    practiceAreas: vasquezContent.mainPages.home.practiceAreas,
    testimonials: vasquezContent.mainPages.home.testimonials,
    locations: vasquezContent.mainPages.locations,
    whyChooseUs: [
      '35+ Years Combined Experience',
      'Over 10,000 Cases Handled',
      '4.9/5 Client Rating',
      'Bilingual Services (English/Spanish)',
      '4 Convenient Office Locations',
      'Available 24/7 for Emergencies',
      'Free Consultations',
      'Payment Plans Available',
    ],
  };

  await fs.writeFile(
    path.join(contentDir, 'homepage-content.json'),
    JSON.stringify(homepageContent, null, 2)
  );

  // Generate attorney profiles
  await fs.writeFile(
    path.join(contentDir, 'attorneys.json'),
    JSON.stringify(vasquezContent.mainPages.attorneys, null, 2)
  );

  // Generate blog post ideas
  const blogPosts = [];
  let postId = 1;

  for (const [category, topics] of Object.entries(vasquezContent.blogTopics)) {
    for (const topic of topics) {
      blogPosts.push({
        id: postId++,
        category,
        title: topic,
        slug: topic.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        metaDescription: `Learn about ${topic.toLowerCase()} from experienced NC attorneys. Free consultation available. Call 1-844-YO-PELEO.`,
        targetKeywords: [
          `${category} lawyer NC`,
          topic.toLowerCase(),
          `North Carolina ${category}`,
          `${category} attorney near me`,
        ],
        outline: [
          'Introduction',
          'Understanding the Law',
          'Common Scenarios',
          'Your Rights',
          'How We Can Help',
          'Frequently Asked Questions',
          'Contact Us for Help',
        ],
      });
    }
  }

  await fs.writeFile(path.join(contentDir, 'blog-posts.json'), JSON.stringify(blogPosts, null, 2));

  // Generate location-specific content
  const locationContent = {};
  const majorNCCities = [
    'Raleigh',
    'Charlotte',
    'Durham',
    'Greensboro',
    'Winston-Salem',
    'Fayetteville',
    'Cary',
    'Wilmington',
    'High Point',
    'Smithfield',
  ];

  for (const city of majorNCCities) {
    locationContent[city.toLowerCase()] = {
      title: `${city} Immigration Lawyers & Personal Injury Attorneys`,
      h1: `Experienced ${city} Attorneys Fighting for Your Rights`,
      intro: `Vasquez Law Firm proudly serves ${city} and surrounding areas with experienced legal representation in immigration, personal injury, criminal defense, and more. Our bilingual attorneys understand the unique needs of ${city}'s diverse community.`,
      whyLocal: [
        `Deep knowledge of ${city} courts and judges`,
        `Convenient location for ${city} residents`,
        `Understanding of local ${city} community needs`,
        `Established relationships with ${city} legal professionals`,
      ],
    };
  }

  await fs.writeFile(
    path.join(contentDir, 'location-content.json'),
    JSON.stringify(locationContent, null, 2)
  );

  // Generate FAQ content
  await fs.writeFile(
    path.join(contentDir, 'faqs.json'),
    JSON.stringify(vasquezContent.faqs, null, 2)
  );

  // Generate schema markup templates
  const schemaTemplates = {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: 'Vasquez Law Firm, PLLC',
      alternateName: 'VLF',
      url: 'https://www.vasquezlawnc.com',
      logo: 'https://www.vasquezlawnc.com/images/logo.png',
      telephone: '+1-844-967-3536',
      email: 'info@vasquezlawnc.com',
      address: vasquezContent.mainPages.locations.raleigh.address,
      areaServed: ['North Carolina', 'Florida'],
      priceRange: '$$',
    },
    localBusiness: Object.entries(vasquezContent.mainPages.locations).map(([key, location]) => ({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: `Vasquez Law Firm - ${location.name}`,
      address: location.address,
      telephone: location.phone,
      openingHours: 'Mo-Fr 09:00-18:00',
      parentOrganization: 'Vasquez Law Firm, PLLC',
    })),
  };

  await fs.writeFile(
    path.join(contentDir, 'schema-templates.json'),
    JSON.stringify(schemaTemplates, null, 2)
  );

  console.log('✅ Content extraction and optimization complete!');
  console.log('\n📊 Generated Files:');
  console.log('  - homepage-content.json');
  console.log('  - attorneys.json');
  console.log(`  - blog-posts.json (${blogPosts.length} post ideas)`);
  console.log('  - location-content.json');
  console.log('  - faqs.json');
  console.log('  - schema-templates.json');

  console.log('\n🎯 SEO Optimization Applied:');
  console.log('  - Long-tail keywords for each location');
  console.log('  - Practice area-specific content');
  console.log('  - Local SEO optimization');
  console.log('  - Bilingual keyword targeting');
  console.log('  - Schema markup templates');
}

// Run the extraction
generateOptimizedContent().catch(console.error);
