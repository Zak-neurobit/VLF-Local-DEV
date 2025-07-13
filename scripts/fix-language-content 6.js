const fs = require('fs').promises;
const path = require('path');

// Spanish translations for common UI elements
const translations = {
  // Navigation
  Home: 'Inicio',
  About: 'Acerca de',
  Attorneys: 'Abogados',
  'Practice Areas': 'Áreas de Práctica',
  Contact: 'Contacto',
  Blog: 'Blog',
  Resources: 'Recursos',

  // CTAs
  'Need Legal Help?': '¿Necesitas Ayuda Legal?',
  'Contact our experienced attorneys today for a consultation':
    'Contacta a nuestros abogados experimentados hoy para una consulta',
  'Call Now': 'Llama Ahora',
  'Schedule Consultation': 'Agendar Consulta',
  'Get Started': 'Comenzar',
  'Learn More': 'Aprende Más',
  'Contact Us': 'Contáctanos',
  'Free Consultation': 'Consulta Gratuita',

  // Practice Areas
  Immigration: 'Inmigración',
  'Personal Injury': 'Lesiones Personales',
  'Criminal Defense': 'Defensa Criminal',
  'Family Law': 'Derecho Familiar',
  'Workers Compensation': 'Compensación Laboral',

  // Common phrases
  'Contact us for more information about this practice area.':
    'Contáctanos para más información sobre esta área de práctica.',
  'Our experienced attorneys are here to help':
    'Nuestros abogados experimentados están aquí para ayudar',
  'Available 24/7': 'Disponible 24/7',
  'Over 35 years of experience': 'Más de 35 años de experiencia',
  'Fighting for your rights': 'Luchando por tus derechos',
  'YO PELEO': 'YO PELEO',

  // Footer
  'All rights reserved': 'Todos los derechos reservados',
  'Privacy Policy': 'Política de Privacidad',
  'Terms of Service': 'Términos de Servicio',
  Sitemap: 'Mapa del Sitio',

  // Contact Info
  'Office Hours': 'Horario de Oficina',
  'Monday - Friday': 'Lunes - Viernes',
  'Emergency Services Available': 'Servicios de Emergencia Disponibles',
  'Main Office': 'Oficina Principal',
  Phone: 'Teléfono',
  Email: 'Correo Electrónico',
  Address: 'Dirección',
};

async function processFile(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf8');
    const isSpanishFile = filePath.includes('/es/');

    if (isSpanishFile) {
      console.log(`Processing Spanish file: ${filePath}`);

      // Replace English phrases with Spanish
      for (const [english, spanish] of Object.entries(translations)) {
        // Case-sensitive replacement
        content = content.replace(new RegExp(english, 'g'), spanish);

        // Handle capitalized versions
        const capitalizedEnglish = english.charAt(0).toUpperCase() + english.slice(1);
        const capitalizedSpanish = spanish.charAt(0).toUpperCase() + spanish.slice(1);
        content = content.replace(new RegExp(capitalizedEnglish, 'g'), capitalizedSpanish);
      }

      // Fix specific Spanish page patterns
      content = content
        .replace(/Vasquez Law Firm, PLLC/g, 'Bufete de Abogados Vasquez, PLLC')
        .replace(/Law Firm/g, 'Bufete de Abogados')
        .replace(/Attorney/g, 'Abogado')
        .replace(/Attorneys/g, 'Abogados')
        .replace(/Legal Help/g, 'Ayuda Legal')
        .replace(/Legal Services/g, 'Servicios Legales')
        .replace(/Schedule a Consultation/g, 'Agendar una Consulta')
        .replace(/Free Case Evaluation/g, 'Evaluación Gratuita de Caso')
        .replace(/Years of Experience/g, 'Años de Experiencia')
        .replace(/Cases Won/g, 'Casos Ganados')
        .replace(/Clients Served/g, 'Clientes Atendidos')
        .replace(/Success Rate/g, 'Tasa de Éxito');
    } else {
      console.log(`Processing English file: ${filePath}`);

      // Ensure English pages don't have Spanish content
      // Remove any Spanish-only patterns
      content = content
        .replace(/Bufete de Abogados Vasquez/g, 'Vasquez Law Firm')
        .replace(/¿Necesitas Ayuda Legal\?/g, 'Need Legal Help?')
        .replace(/Contáctanos/g, 'Contact Us')
        .replace(/Áreas de Práctica/g, 'Practice Areas')
        .replace(/Abogados/g, 'Attorneys')
        .replace(/Consulta Gratuita/g, 'Free Consultation');
    }

    await fs.writeFile(filePath, content, 'utf8');
    return true;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

async function processDirectory(dir) {
  const files = await fs.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else if (file.endsWith('.tsx') && file === 'page.tsx') {
      await processFile(filePath);
    }
  }
}

async function main() {
  console.log('Starting language content fix...');

  // Process all pages
  await processDirectory(path.join(__dirname, '../src/app'));

  console.log('Language content fix completed!');
  console.log('\nNext steps:');
  console.log('1. Run: npm run build');
  console.log('2. Deploy: npx vercel --prod');
}

main().catch(console.error);
