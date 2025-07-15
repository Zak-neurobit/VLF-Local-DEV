const fs = require('fs').promises;
const path = require('path');

// Map of pages that should have Spanish translations
const pagesToTranslate = {
  'attorneys/page.tsx': 'abogados/page.tsx',
  'practice-areas/page.tsx': 'areas-de-practica/page.tsx',
  'practice-areas/immigration/page.tsx': 'areas-de-practica/inmigracion/page.tsx',
  'practice-areas/personal-injury/page.tsx': 'areas-de-practica/lesiones-personales/page.tsx',
  'practice-areas/workers-compensation/page.tsx': 'areas-de-practica/compensacion-laboral/page.tsx',
  'practice-areas/criminal-defense/page.tsx': 'areas-de-practica/defensa-criminal/page.tsx',
  'practice-areas/family-law/page.tsx': 'areas-de-practica/derecho-familia/page.tsx',
  'practice-areas/traffic-violations/page.tsx': 'areas-de-practica/infracciones-transito/page.tsx',
  'contact/page.tsx': 'contacto/page.tsx',
  'locations/page.tsx': 'ubicaciones/page.tsx',
  'locations/charlotte/page.tsx': 'ubicaciones/charlotte/page.tsx',
  'locations/durham/page.tsx': 'ubicaciones/durham/page.tsx',
  'locations/raleigh/page.tsx': 'ubicaciones/raleigh/page.tsx',
  'locations/smithfield/page.tsx': 'ubicaciones/smithfield/page.tsx',
  'locations/orlando/page.tsx': 'ubicaciones/orlando/page.tsx',
  'locations/winston-salem/page.tsx': 'ubicaciones/winston-salem/page.tsx',
  'about/page.tsx': 'acerca-de/page.tsx',
  'testimonials/page.tsx': 'testimonios/page.tsx',
  'faqs/page.tsx': 'preguntas-frecuentes/page.tsx',
  'privacy-policy/page.tsx': 'politica-privacidad/page.tsx',
  'terms-of-service/page.tsx': 'terminos-servicio/page.tsx',
  'sitemap/page.tsx': 'mapa-del-sitio/page.tsx',
  'case-results/page.tsx': 'resultados-casos/page.tsx',
  'free-consultation/page.tsx': 'consulta-gratuita/page.tsx',
  'make-payment/page.tsx': 'hacer-pago/page.tsx',
};

// Template for a Spanish page that uses translations
const createSpanishPageTemplate = (englishPath, componentName) => {
  return `import { Metadata } from 'next';
import { getTranslations } from '@/lib/i18n';
import ${componentName} from '@/app/${englishPath.replace('/page.tsx', '')}/page';

const translations = getTranslations('es');

export const metadata: Metadata = {
  title: translations.seo.title || 'Bufete de Abogados Vasquez - YO PELEO POR TI™',
  description: translations.seo.description || 'Abogados de inmigración, lesiones personales y defensa criminal. Servimos NC y FL. Consulta gratuita. Se habla español.',
  alternates: {
    canonical: \`https://www.vasquezlawnc.com/es/\${window.location.pathname.replace('/es/', '')}\`,
    languages: {
      'en-US': \`https://www.vasquezlawnc.com/\${window.location.pathname.replace('/es/', '')}\`,
      'es-ES': \`https://www.vasquezlawnc.com\${window.location.pathname}\`,
    },
  },
};

export default function SpanishPage() {
  return <${componentName} locale="es" />;
}
`;
};

// Create a simple wrapper template for pages without specific translations yet
const createSimpleSpanishWrapper = pagePath => {
  const pageName = pagePath.split('/').filter(Boolean).pop() || 'home';
  const titleMap = {
    attorneys: 'Abogados',
    'practice-areas': 'Áreas de Práctica',
    immigration: 'Inmigración',
    'personal-injury': 'Lesiones Personales',
    'workers-compensation': 'Compensación Laboral',
    'criminal-defense': 'Defensa Criminal',
    'family-law': 'Derecho Familiar',
    'traffic-violations': 'Infracciones de Tráfico',
    contact: 'Contacto',
    locations: 'Ubicaciones',
    about: 'Acerca de Nosotros',
    testimonials: 'Testimonios',
    faqs: 'Preguntas Frecuentes',
    'privacy-policy': 'Política de Privacidad',
    'terms-of-service': 'Términos de Servicio',
    sitemap: 'Mapa del Sitio',
    'case-results': 'Resultados de Casos',
    'free-consultation': 'Consulta Gratuita',
    'make-payment': 'Hacer un Pago',
    charlotte: 'Charlotte, NC',
    durham: 'Durham, NC',
    raleigh: 'Raleigh, NC',
    smithfield: 'Smithfield, NC',
    orlando: 'Orlando, FL',
    'winston-salem': 'Winston-Salem, NC',
  };

  const title = titleMap[pageName] || pageName;

  return `import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: '${title} | Bufete de Abogados Vasquez - YO PELEO POR TI™',
  description: 'Abogados de inmigración, lesiones personales y defensa criminal. Más de 30,000 casos ganados. Consulta gratuita. Disponible 24/7.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">${title}</h1>
          <p className="text-xl max-w-3xl">
            YO PELEO POR TI™ - Representación legal confiable con más de 60 años de experiencia combinada.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">¿Necesita Ayuda Legal?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Contacte a nuestros abogados experimentados hoy para una consulta gratuita. 
              Disponible 24/7 para ayudarle con sus necesidades legales.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/es/contacto"
              className="bg-[#C9974D] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#B88740] transition-colors inline-block text-center"
            >
              Agendar Consulta Gratuita
            </Link>
            <a
              href="tel:1-844-967-3536"
              className="bg-white text-[#6B1F2E] border-2 border-[#6B1F2E] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#6B1F2E] hover:text-white transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" />
              1-844-YO-PELEO
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
`;
};

async function generateSpanishPages() {
  const srcDir = path.join(process.cwd(), 'src/app');
  const esDir = path.join(srcDir, 'es');

  // Create es directory if it doesn't exist
  try {
    await fs.access(esDir);
  } catch {
    await fs.mkdir(esDir, { recursive: true });
  }

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const [englishPath, spanishPath] of Object.entries(pagesToTranslate)) {
    const englishFile = path.join(srcDir, englishPath);
    const spanishFile = path.join(esDir, spanishPath);
    const spanishDir = path.dirname(spanishFile);

    try {
      // Check if English file exists
      await fs.access(englishFile);

      // Check if Spanish file already exists
      try {
        await fs.access(spanishFile);
        console.log(`✓ Spanish page already exists: ${spanishPath}`);
        skipped++;
        continue;
      } catch {
        // Spanish file doesn't exist, create it
      }

      // Create directory structure
      await fs.mkdir(spanishDir, { recursive: true });

      // Create Spanish page
      const content = createSimpleSpanishWrapper(englishPath.replace('/page.tsx', ''));
      await fs.writeFile(spanishFile, content);
      console.log(`✅ Created Spanish page: ${spanishPath}`);
      created++;
    } catch (error) {
      console.error(`❌ Error processing ${englishPath}:`, error.message);
      errors++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`✅ Created: ${created} pages`);
  console.log(`✓ Skipped (already exist): ${skipped} pages`);
  console.log(`❌ Errors: ${errors}`);
}

// Run the script
generateSpanishPages().catch(console.error);
