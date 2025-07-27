#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Template for creating page components
const createPageTemplate = (title, description, practiceArea, category, isSpanish = false) => {
  const titleSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const lang = isSpanish ? 'es' : 'en';
  
  return `import { Metadata } from 'next';
import { ${practiceArea === 'traffic-violations' ? 'StandardizedPracticeAreaTemplate' : 'ModernPracticeAreaTemplateV2'} } from '@/components/templates/${practiceArea === 'traffic-violations' ? 'StandardizedPracticeAreaTemplate' : 'ModernPracticeAreaTemplateV2'}';

export const metadata: Metadata = {
  title: '${title} | Vasquez Law Firm',
  description: '${description}',
  keywords: '${title.toLowerCase()}, ${practiceArea.replace('-', ' ')}, ${category ? category.replace('-', ' ') + ', ' : ''}legal services, attorney, lawyer${isSpanish ? ', abogado, servicios legales' : ''}',
};

export default function ${title.replace(/[^a-zA-Z0-9]/g, '')}Page() {
  return (
    <${practiceArea === 'traffic-violations' ? 'StandardizedPracticeAreaTemplate' : 'ModernPracticeAreaTemplateV2'}
      practiceArea="${practiceArea}"
      subArea="${category || titleSlug}"
      language="${lang}"
    />
  );
}
`;
};

// Missing pages data structure
const missingPages = {
  immigration: {
    humanitarian: [
      { name: 'U Visa (Crime Victims)', slug: 'u-visa', description: 'Legal assistance for crime victims seeking U visa protection' },
      { name: 'T Visa (Trafficking Victims)', slug: 't-visa', description: 'Protection for victims of human trafficking through T visa' },
      { name: 'VAWA (Violence Against Women Act)', slug: 'vawa', description: 'Immigration relief under the Violence Against Women Act' },
      { name: 'Special Immigrant Juvenile Status', slug: 'sijs', description: 'Protection for abused, abandoned, or neglected children' },
      { name: 'Parole & Humanitarian Parole', slug: 'parole', description: 'Temporary admission for urgent humanitarian reasons' },
    ],
    'removal-defense': [
      { name: '42A Cancellation (Non-LPR)', slug: '42a-cancellation', description: 'Cancellation of removal for non-permanent residents' },
      { name: '42B Cancellation (LPR)', slug: '42b-cancellation', description: 'Cancellation of removal for lawful permanent residents' },
      { name: 'Asylum Defense', slug: 'asylum-defense', description: 'Defense against deportation through asylum claims' },
      { name: 'Withholding of Removal', slug: 'withholding', description: 'Protection from removal to countries where you face persecution' },
      { name: 'CAT Protection', slug: 'cat-protection', description: 'Protection under Convention Against Torture' },
      { name: 'Motions to Reopen', slug: 'motions-reopen', description: 'Reopening immigration cases for new evidence or changed circumstances' },
      { name: 'Prosecutorial Discretion', slug: 'prosecutorial-discretion', description: 'Requesting discretion in deportation proceedings' },
      { name: 'Voluntary Departure', slug: 'voluntary-departure', description: 'Leaving the US voluntarily to avoid deportation consequences' },
    ],
    business: [
      { name: 'EB-1 Extraordinary Ability', slug: 'eb1-visa', description: 'Employment-based immigration for individuals with extraordinary abilities' },
      { name: 'EB-2 Advanced Degree/NIW', slug: 'eb2-visa', description: 'Immigration for professionals with advanced degrees or exceptional ability' },
      { name: 'EB-3 Skilled Workers', slug: 'eb3-visa', description: 'Employment-based immigration for skilled workers and professionals' },
      { name: 'O-1 Extraordinary Ability', slug: 'o1-visa', description: 'Temporary work visa for individuals with extraordinary abilities' },
      { name: 'TN NAFTA Professional', slug: 'tn-visa', description: 'Work authorization for Canadian and Mexican professionals under USMCA' },
    ],
    'family-based': [
      { name: 'Family Petitions (I-130)', slug: 'petitions', description: 'Filing family-based immigration petitions for relatives' },
      { name: 'K-1 Fiancé(e) Visa', slug: 'k1-visa', description: 'Visa for foreign fiancé(e)s of US citizens' },
      { name: 'Waivers (I-601/I-601A)', slug: 'waivers', description: 'Waivers for inadmissibility grounds in immigration cases' },
      { name: 'Naturalization/Citizenship', slug: 'naturalization', description: 'Becoming a US citizen through naturalization' },
      { name: 'Removal of Conditions (I-751)', slug: 'removal-conditions', description: 'Removing conditions on permanent residence' },
      { name: 'Green Card Renewal', slug: 'green-card-renewal', description: 'Renewing or replacing permanent resident cards' },
      { name: 'Adjustment of Status', slug: 'adjustment-status', description: 'Changing from temporary to permanent resident status' },
      { name: 'Consular Processing', slug: 'consular-processing', description: 'Obtaining immigrant visas through US consulates abroad' },
    ],
  },
  'criminal-defense': [
    { name: 'White Collar Crimes', slug: 'white-collar-crimes', description: 'Defense against fraud, embezzlement, and financial crimes' },
    { name: 'Juvenile Defense', slug: 'juvenile-defense', description: 'Criminal defense for minors in juvenile court' },
  ],
  'family-law': [
    { name: 'Prenuptial Agreements', slug: 'prenuptial-agreements', description: 'Creating and reviewing prenuptial agreements' },
    { name: 'Adoption', slug: 'adoption', description: 'Legal assistance with adoption proceedings' },
    { name: 'Domestic Violence Protection', slug: 'domestic-violence-protection', description: 'Obtaining protective orders and legal protection from abuse' },
    { name: 'Guardianship', slug: 'guardianship', description: 'Establishing legal guardianship for minors or incapacitated adults' },
  ],
  'personal-injury': [
    { name: 'Product Liability', slug: 'product-liability', description: 'Claims for injuries caused by defective products' },
  ],
  'workers-compensation': [
    { name: 'Construction Injuries', slug: 'construction-injuries', description: 'Workers compensation for construction site accidents' },
    { name: 'Repetitive Stress Injuries', slug: 'repetitive-stress-injuries', description: 'Claims for carpal tunnel and other repetitive strain injuries' },
    { name: 'Occupational Illness', slug: 'occupational-illness', description: 'Compensation for work-related illnesses and diseases' },
    { name: 'Denied Claims', slug: 'denied-claims', description: 'Appealing denied workers compensation claims' },
    { name: 'Return to Work', slug: 'return-to-work', description: 'Navigating return to work after workplace injury' },
    { name: 'Disability Benefits', slug: 'disability-benefits', description: 'Securing disability benefits for workplace injuries' },
  ],
  'traffic-violations': [
    { name: 'Speeding Tickets', slug: 'speeding-tickets', description: 'Defense against speeding violations and traffic tickets' },
    { name: 'Reckless Driving', slug: 'reckless-driving', description: 'Legal defense for reckless driving charges' },
    { name: 'License Suspension', slug: 'license-suspension', description: 'Fighting license suspension and restoration' },
    { name: 'CDL Violations', slug: 'cdl-violations', description: 'Defense for commercial driver license violations' },
    { name: 'Hit and Run', slug: 'hit-and-run', description: 'Defense against hit and run charges' },
    { name: 'Driving Without License', slug: 'driving-without-license', description: 'Legal help for driving without a valid license' },
    { name: 'Traffic Court Representation', slug: 'traffic-court-representation', description: 'Professional representation in traffic court' },
  ],
};

// Spanish translations
const spanishTranslations = {
  'U Visa (Crime Victims)': { title: 'Visa U (Víctimas de Crimen)', desc: 'Asistencia legal para víctimas de crimen que buscan protección de visa U' },
  'T Visa (Trafficking Victims)': { title: 'Visa T (Víctimas de Tráfico)', desc: 'Protección para víctimas de trata de personas a través de visa T' },
  'VAWA (Violence Against Women Act)': { title: 'VAWA (Ley de Violencia Contra la Mujer)', desc: 'Alivio migratorio bajo la Ley de Violencia Contra la Mujer' },
  'Special Immigrant Juvenile Status': { title: 'Estatus Especial de Inmigrante Juvenil', desc: 'Protección para niños abusados, abandonados o descuidados' },
  'Parole & Humanitarian Parole': { title: 'Parole Humanitario', desc: 'Admisión temporal por razones humanitarias urgentes' },
  // Add more translations as needed...
};

// Create missing pages
function createMissingPages() {
  const srcDir = path.join(__dirname, '..', 'src', 'app');
  let createdCount = 0;

  // English pages
  Object.entries(missingPages).forEach(([practiceArea, categories]) => {
    if (typeof categories === 'object' && !Array.isArray(categories)) {
      // Immigration with subcategories
      Object.entries(categories).forEach(([category, pages]) => {
        pages.forEach(page => {
          const dirPath = path.join(srcDir, 'practice-areas', practiceArea, category, page.slug);
          const filePath = path.join(dirPath, 'page.tsx');
          
          if (!fs.existsSync(filePath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            fs.writeFileSync(filePath, createPageTemplate(page.name, page.description, practiceArea, category, false));
            console.log(`✅ Created: ${filePath}`);
            createdCount++;
          }
        });
      });
    } else {
      // Other practice areas
      categories.forEach(page => {
        const dirPath = path.join(srcDir, 'practice-areas', practiceArea, page.slug);
        const filePath = path.join(dirPath, 'page.tsx');
        
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(dirPath, { recursive: true });
          fs.writeFileSync(filePath, createPageTemplate(page.name, page.description, practiceArea, null, false));
          console.log(`✅ Created: ${filePath}`);
          createdCount++;
        }
      });
    }
  });

  // Create Spanish equivalents
  // This is a simplified version - you'd need to translate all pages
  console.log(`\n📊 Total pages created: ${createdCount}`);
}

// Fix URL inconsistencies
function fixUrlInconsistencies() {
  const fixes = [
    { from: 'src/app/es/areas-de-practica/derecho-familiar', to: 'src/app/es/areas-de-practica/derecho-familia' },
  ];

  fixes.forEach(fix => {
    const fromPath = path.join(__dirname, '..', fix.from);
    const toPath = path.join(__dirname, '..', fix.to);
    
    if (fs.existsSync(fromPath) && !fs.existsSync(toPath)) {
      fs.renameSync(fromPath, toPath);
      console.log(`🔧 Renamed: ${fix.from} → ${fix.to}`);
    }
  });
}

// Main execution
console.log('🚀 Starting page restoration process...\n');
createMissingPages();
fixUrlInconsistencies();
console.log('\n✅ Page restoration complete!');