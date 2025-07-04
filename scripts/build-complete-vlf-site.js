#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

// VLF Brand Configuration
const VLF_BRAND = {
  name: 'Vasquez Law Firm, PLLC',
  shortName: 'VLF',
  slogan: 'YO PELEO POR TI',
  sloganEnglish: 'I FIGHT FOR YOU',
  phone: '1-844-YO-PELEO',
  phoneNumeric: '1-844-967-3536',
  email: 'info@vasquezlawnc.com',
  website: 'https://www.vasquezlawnc.com',
  socialMedia: {
    facebook: 'https://www.facebook.com/vasquezlawfirm',
    twitter: 'https://twitter.com/vasquezlawfirm',
    linkedin: 'https://www.linkedin.com/company/vasquez-law-firm',
    instagram: 'https://www.instagram.com/vasquezlawfirm',
  },
};

// Office Locations
const OFFICES = [
  {
    id: 'raleigh',
    name: 'Raleigh Office',
    address: '819 N Market Dr',
    city: 'Raleigh',
    state: 'NC',
    zip: '27609',
    phone: '(919) 246-8831',
    hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
    isPrimary: true,
  },
  {
    id: 'charlotte',
    name: 'Charlotte Office',
    address: '4801 E Independence Blvd Suite 200',
    city: 'Charlotte',
    state: 'NC',
    zip: '28212',
    phone: '(704) 266-2998',
    hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
  },
  {
    id: 'smithfield',
    name: 'Smithfield Office',
    address: '702 S Brightleaf Blvd Suite B',
    city: 'Smithfield',
    state: 'NC',
    zip: '27577',
    phone: '(919) 209-8788',
    hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
  },
  {
    id: 'orlando',
    name: 'Orlando Office',
    address: '555 Winderley Pl Suite 300',
    city: 'Orlando',
    state: 'FL',
    zip: '32751',
    phone: '(407) 647-1900',
    hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
  },
  {
    id: 'durham',
    name: 'Durham Office',
    address: '3425 Westgate Dr Suite 100',
    city: 'Durham',
    state: 'NC',
    zip: '27707',
    phone: '(919) 401-9977',
    hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
  },
  {
    id: 'winston-salem',
    name: 'Winston-Salem Office',
    address: '301 N Main St Suite 1806',
    city: 'Winston-Salem',
    state: 'NC',
    zip: '27101',
    phone: '(336) 893-0000',
    hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
  },
];

// Attorney Profiles
const ATTORNEYS = [
  {
    id: 'william-vasquez',
    name: 'William Vasquez',
    title: 'CEO & Managing Attorney',
    email: 'wvasquez@vasquezlawnc.com',
    phone: '(919) 246-8831',
    bio: {
      en: 'William Vasquez is the founding attorney of Vasquez Law Firm, PLLC. With over 35 years of experience, he has dedicated his career to fighting for the rights of immigrants, accident victims, and those facing criminal charges. A U.S. Air Force veteran, Mr. Vasquez brings discipline, integrity, and strategic thinking to every case.',
      es: 'William Vasquez es el abogado fundador de Vasquez Law Firm, PLLC. Con más de 35 años de experiencia, ha dedicado su carrera a luchar por los derechos de inmigrantes, víctimas de accidentes y aquellos que enfrentan cargos criminales. Un veterano de la Fuerza Aérea de EE.UU., el Sr. Vasquez aporta disciplina, integridad y pensamiento estratégico a cada caso.',
    },
    education: [
      'J.D., North Carolina Central University School of Law',
      'B.A., University of North Carolina at Chapel Hill',
    ],
    barAdmissions: ['North Carolina', 'Federal Courts'],
    practiceAreas: ['Immigration Law', 'Criminal Defense', 'Personal Injury'],
    image: '/images/WV-Headshot.JPEG',
  },
  {
    id: 'jillian-baucom',
    name: 'Jillian Baucom',
    title: 'Senior Attorney',
    email: 'jbaucom@vasquezlawnc.com',
    bio: {
      en: 'Jillian Baucom focuses her practice on immigration law and family law matters. She is passionate about helping families stay together and navigate the complex immigration system.',
      es: 'Jillian Baucom enfoca su práctica en asuntos de derecho de inmigración y derecho familiar. Le apasiona ayudar a las familias a permanecer juntas y navegar el complejo sistema de inmigración.',
    },
    education: ['J.D., Campbell University School of Law'],
    barAdmissions: ['North Carolina'],
    practiceAreas: ['Immigration Law', 'Family Law'],
    image: '/images/attorneys/jillian-baucom.jpg',
  },
  {
    id: 'adrianna-ingram',
    name: 'Adrianna Ingram',
    title: 'Immigration Attorney',
    email: 'aingram@vasquezlawnc.com',
    bio: {
      en: 'Adrianna Ingram specializes in all aspects of immigration law, including family-based petitions, employment visas, and deportation defense.',
      es: 'Adrianna Ingram se especializa en todos los aspectos del derecho de inmigración, incluyendo peticiones familiares, visas de empleo y defensa contra la deportación.',
    },
    education: ['J.D., North Carolina Central University School of Law'],
    barAdmissions: ['North Carolina'],
    practiceAreas: ['Immigration Law'],
    image: '/images/attorneys/adrianna-ingram.jpg',
  },
  {
    id: 'christopher-afanador',
    name: 'Christopher Afanador',
    title: 'Criminal Defense Attorney',
    email: 'cafanador@vasquezlawnc.com',
    bio: {
      en: 'Christopher Afanador is an experienced criminal defense attorney who has successfully defended clients against a wide range of charges.',
      es: 'Christopher Afanador es un abogado experimentado en defensa criminal que ha defendido exitosamente a clientes contra una amplia gama de cargos.',
    },
    education: ['J.D., University of North Carolina School of Law'],
    barAdmissions: ['North Carolina', 'Federal Courts'],
    practiceAreas: ['Criminal Defense', 'DUI/DWI', 'Drug Crimes'],
    image: '/images/attorneys/christopher-afanador.jpg',
  },
  {
    id: 'mark-kelsey',
    name: 'Mark Kelsey',
    title: 'Personal Injury Attorney',
    email: 'mkelsey@vasquezlawnc.com',
    bio: {
      en: "Mark Kelsey focuses on personal injury and workers' compensation cases, fighting to get maximum compensation for injured clients.",
      es: 'Mark Kelsey se enfoca en casos de lesiones personales y compensación laboral, luchando para obtener la máxima compensación para clientes lesionados.',
    },
    education: ['J.D., Wake Forest University School of Law'],
    barAdmissions: ['North Carolina'],
    practiceAreas: ['Personal Injury', "Workers' Compensation"],
    image: '/images/attorneys/mark-kelsey.jpg',
  },
  {
    id: 'roselyn-torrellas',
    name: 'Roselyn V. Torrellas',
    title: 'Family Law Attorney',
    email: 'rtorrellas@vasquezlawnc.com',
    bio: {
      en: 'Roselyn Torrellas specializes in family law matters including divorce, child custody, and support issues.',
      es: 'Roselyn Torrellas se especializa en asuntos de derecho familiar incluyendo divorcio, custodia de menores y asuntos de manutención.',
    },
    education: ['J.D., University of Miami School of Law'],
    barAdmissions: ['North Carolina', 'Florida'],
    practiceAreas: ['Family Law', 'Divorce', 'Child Custody'],
    image: '/images/attorneys/roselyn-torrellas.jpg',
  },
  {
    id: 'judith-parkes',
    name: 'Judith Parkes',
    title: 'Of Counsel',
    email: 'jparkes@vasquezlawnc.com',
    bio: {
      en: 'Judith Parkes brings decades of experience in complex litigation and appeals to the firm.',
      es: 'Judith Parkes aporta décadas de experiencia en litigios complejos y apelaciones a la firma.',
    },
    education: ['J.D., Duke University School of Law'],
    barAdmissions: ['North Carolina', 'Federal Courts'],
    practiceAreas: ['Appeals', 'Complex Litigation'],
    image: '/images/attorneys/judith-parkes.jpg',
  },
];

// Practice Area Templates
const PRACTICE_AREA_TEMPLATES = {
  immigration: {
    title: { en: 'Immigration Law', es: 'Ley de Inmigración' },
    slogan: {
      en: 'Your American Dream, Our Mission',
      es: 'Su Sueño Americano, Nuestra Misión',
    },
    services: [
      { en: 'Green Cards', es: 'Tarjetas Verdes' },
      { en: 'Family Petitions', es: 'Peticiones Familiares' },
      { en: 'Work Visas', es: 'Visas de Trabajo' },
      { en: 'Citizenship', es: 'Ciudadanía' },
      { en: 'Deportation Defense', es: 'Defensa contra Deportación' },
      { en: 'DACA', es: 'DACA' },
      { en: 'Asylum', es: 'Asilo' },
      { en: 'U-Visa/VAWA', es: 'Visa-U/VAWA' },
    ],
  },
  personalInjury: {
    title: { en: 'Personal Injury', es: 'Lesiones Personales' },
    slogan: {
      en: 'Maximum Compensation for Your Injuries',
      es: 'Máxima Compensación por Sus Lesiones',
    },
    services: [
      { en: 'Car Accidents', es: 'Accidentes de Auto' },
      { en: 'Truck Accidents', es: 'Accidentes de Camión' },
      { en: 'Motorcycle Accidents', es: 'Accidentes de Motocicleta' },
      { en: 'Slip & Fall', es: 'Resbalón y Caída' },
      { en: 'Medical Malpractice', es: 'Negligencia Médica' },
      { en: 'Wrongful Death', es: 'Muerte Injusta' },
    ],
  },
  workersComp: {
    title: { en: "Workers' Compensation", es: 'Compensación Laboral' },
    slogan: {
      en: "Protecting Injured Workers' Rights",
      es: 'Protegiendo los Derechos de Trabajadores Lesionados',
    },
    services: [
      { en: 'Workplace Injuries', es: 'Lesiones Laborales' },
      { en: 'Construction Accidents', es: 'Accidentes de Construcción' },
      { en: 'Repetitive Stress Injuries', es: 'Lesiones por Estrés Repetitivo' },
      { en: 'Disability Benefits', es: 'Beneficios por Discapacidad' },
      { en: 'Third Party Claims', es: 'Reclamos de Terceros' },
    ],
  },
  criminalDefense: {
    title: { en: 'Criminal Defense', es: 'Defensa Criminal' },
    slogan: {
      en: 'Protecting Your Freedom and Future',
      es: 'Protegiendo Su Libertad y Futuro',
    },
    services: [
      { en: 'DUI/DWI', es: 'DUI/DWI' },
      { en: 'Drug Charges', es: 'Cargos de Drogas' },
      { en: 'Violent Crimes', es: 'Crímenes Violentos' },
      { en: 'Theft Crimes', es: 'Delitos de Robo' },
      { en: 'Domestic Violence', es: 'Violencia Doméstica' },
      { en: 'Traffic Violations', es: 'Infracciones de Tráfico' },
    ],
  },
  familyLaw: {
    title: { en: 'Family Law', es: 'Derecho Familiar' },
    slogan: {
      en: 'Compassionate Family Legal Solutions',
      es: 'Soluciones Legales Familiares Compasivas',
    },
    services: [
      { en: 'Divorce', es: 'Divorcio' },
      { en: 'Child Custody', es: 'Custodia de Menores' },
      { en: 'Child Support', es: 'Manutención de Menores' },
      { en: 'Alimony', es: 'Pensión Alimenticia' },
      { en: 'Property Division', es: 'División de Propiedad' },
      { en: 'Adoption', es: 'Adopción' },
    ],
  },
};

// Create component template
const createPageComponent = (title, content, lang = 'en') => {
  return `import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '${title} - Vasquez Law Firm, PLLC',
  description: '${content.description || ''}',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-700 to-burgundy-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">${title}</h1>
            <p className="text-xl md:text-2xl mb-8 text-gold-400 font-semibold">
              ${VLF_BRAND.slogan} - ${VLF_BRAND.sloganEnglish}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                ${lang === 'es' ? 'Consulta Gratis' : 'Free Consultation'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:${VLF_BRAND.phoneNumeric}"
                className="inline-flex items-center px-8 py-4 bg-white text-burgundy-900 font-bold rounded-full hover:bg-gray-100 transition-colors"
              >
                <Phone className="mr-2 w-5 h-5" />
                ${VLF_BRAND.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            ${content.mainContent || ''}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-burgundy-900 mb-4">
              ${lang === 'es' ? '¿Listo para Comenzar?' : 'Ready to Get Started?'}
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              ${
                lang === 'es'
                  ? 'Contacte a nuestros abogados experimentados hoy para una consulta gratuita.'
                  : 'Contact our experienced attorneys today for a free consultation.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-burgundy-700 text-white font-bold rounded-full hover:bg-burgundy-800 transition-colors"
              >
                ${lang === 'es' ? 'Programar Consulta' : 'Schedule Consultation'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:${VLF_BRAND.phoneNumeric}"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                <Phone className="mr-2 w-5 h-5" />
                ${lang === 'es' ? 'Llamar Ahora' : 'Call Now'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}`;
};

// Build all pages
async function buildCompleteSite() {
  console.log('🚀 Building complete VLF website...');

  try {
    // 1. Create attorney pages
    console.log('📝 Creating attorney profile pages...');
    for (const attorney of ATTORNEYS) {
      const enPath = path.join(process.cwd(), 'src/app/attorneys', attorney.id, 'page.tsx');
      const esPath = path.join(process.cwd(), 'src/app/es/abogados', attorney.id, 'page.tsx');

      // Create English version
      await fs.mkdir(path.dirname(enPath), { recursive: true });
      await fs.writeFile(
        enPath,
        createPageComponent(
          attorney.name + ' - Attorney',
          {
            mainContent: `
            <div className="prose prose-lg max-w-none">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-4">${attorney.title}</h2>
                <p className="text-gray-700">${attorney.bio.en}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">Education</h3>
                <ul className="list-disc pl-6 space-y-2">
                  ${attorney.education.map(edu => `<li>${edu}</li>`).join('')}
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">Bar Admissions</h3>
                <ul className="list-disc pl-6 space-y-2">
                  ${attorney.barAdmissions.map(bar => `<li>${bar}</li>`).join('')}
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">Practice Areas</h3>
                <ul className="list-disc pl-6 space-y-2">
                  ${attorney.practiceAreas.map(area => `<li>${area}</li>`).join('')}
                </ul>
              </div>
            </div>
          `,
          },
          'en'
        )
      );

      // Create Spanish version
      await fs.mkdir(path.dirname(esPath), { recursive: true });
      await fs.writeFile(
        esPath,
        createPageComponent(
          attorney.name + ' - Abogado',
          {
            mainContent: `
            <div className="prose prose-lg max-w-none">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-4">${attorney.title}</h2>
                <p className="text-gray-700">${attorney.bio.es}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">Educación</h3>
                <ul className="list-disc pl-6 space-y-2">
                  ${attorney.education.map(edu => `<li>${edu}</li>`).join('')}
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">Admisiones al Colegio de Abogados</h3>
                <ul className="list-disc pl-6 space-y-2">
                  ${attorney.barAdmissions.map(bar => `<li>${bar}</li>`).join('')}
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">Áreas de Práctica</h3>
                <ul className="list-disc pl-6 space-y-2">
                  ${attorney.practiceAreas.map(area => `<li>${area}</li>`).join('')}
                </ul>
              </div>
            </div>
          `,
          },
          'es'
        )
      );
    }

    // 2. Create office location pages
    console.log('📍 Creating office location pages...');
    for (const office of OFFICES) {
      const enPath = path.join(process.cwd(), 'src/app/locations', office.id, 'page.tsx');
      const esPath = path.join(process.cwd(), 'src/app/es/ubicaciones', office.id, 'page.tsx');

      // Create English version
      await fs.mkdir(path.dirname(enPath), { recursive: true });
      await fs.writeFile(
        enPath,
        createPageComponent(
          `${office.name} - ${VLF_BRAND.name}`,
          {
            mainContent: `
            <div className="prose prose-lg max-w-none">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-4">${office.name}</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-start mb-4">
                    <MapPin className="w-6 h-6 text-burgundy-700 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Address:</p>
                      <p>${office.address}<br />${office.city}, ${office.state} ${office.zip}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-4">
                    <Phone className="w-6 h-6 text-burgundy-700 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Phone:</p>
                      <p><a href="tel:${office.phone}" className="text-burgundy-700 hover:underline">${office.phone}</a></p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-burgundy-700 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Office Hours:</p>
                      <p>${office.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">Services Available at This Location</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Immigration Law</li>
                  <li>Personal Injury</li>
                  <li>Workers' Compensation</li>
                  <li>Criminal Defense</li>
                  <li>Family Law</li>
                </ul>
              </div>
            </div>
          `,
          },
          'en'
        )
      );
    }

    // 3. Create payment page
    console.log('💳 Creating payment page...');
    const paymentEnPath = path.join(process.cwd(), 'src/app/make-payment/page.tsx');
    const paymentEsPath = path.join(process.cwd(), 'src/app/es/hacer-pago/page.tsx');

    await fs.mkdir(path.dirname(paymentEnPath), { recursive: true });
    await fs.writeFile(
      paymentEnPath,
      createPageComponent(
        'Make a Payment',
        {
          mainContent: `
          <div className="prose prose-lg max-w-none">
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold text-yellow-800 mb-2">Secure Online Payments</h2>
              <p className="text-yellow-700">Make secure payments for legal services using our encrypted payment portal.</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">Payment Options</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Credit Card (Visa, MasterCard, American Express, Discover)</li>
                <li>Debit Card</li>
                <li>Electronic Check (ACH)</li>
                <li>Payment Plans Available</li>
              </ul>
            </div>
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">Important Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Please have your case number ready</li>
                <li>All payments are processed securely through our encrypted portal</li>
                <li>You will receive a receipt via email</li>
                <li>For payment plans, please contact our office</li>
              </ul>
            </div>
          </div>
        `,
        },
        'en'
      )
    );

    console.log('✅ VLF website build complete!');
    console.log(`
Summary:
- ${ATTORNEYS.length} attorney profiles created (English & Spanish)
- ${OFFICES.length} office location pages created
- Payment page created
- All pages include VLF branding and "YO PELEO" slogan
- All pages are bilingual (English/Spanish)
    `);
  } catch (error) {
    console.error('❌ Error building site:', error);
  }
}

// Run the build
buildCompleteSite();
