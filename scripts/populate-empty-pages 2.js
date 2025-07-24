const fs = require('fs');
const path = require('path');

// Page content templates for different types of pages
const pageTemplates = {
  // Immigration sub-pages
  'green-cards': {
    title: 'Green Card Services',
    titleEs: 'Servicios de Tarjeta Verde',
    subtitle: 'Your Path to Permanent Residency',
    subtitleEs: 'Su Camino a la Residencia Permanente',
    description: 'Expert legal assistance for obtaining your green card through family, employment, or other eligible categories.',
    descriptionEs: 'Asistencia legal experta para obtener su tarjeta verde a través de familia, empleo u otras categorías elegibles.',
    features: [
      {
        title: 'Family-Based Green Cards',
        titleEs: 'Tarjetas Verdes por Familia',
        description: 'Reunite with your loved ones through family sponsorship'
      },
      {
        title: 'Employment-Based Green Cards',
        titleEs: 'Tarjetas Verdes por Empleo',
        description: 'Secure permanent residency through your employer'
      },
      {
        title: 'Adjustment of Status',
        titleEs: 'Ajuste de Estatus',
        description: 'Change from temporary to permanent resident status'
      }
    ]
  },
  
  'citizenship-naturalization': {
    title: 'Citizenship & Naturalization',
    titleEs: 'Ciudadanía y Naturalización',
    subtitle: 'Become a U.S. Citizen',
    subtitleEs: 'Conviértase en Ciudadano de EE.UU.',
    description: 'Complete guidance through the naturalization process, from eligibility assessment to oath ceremony.',
    descriptionEs: 'Orientación completa a través del proceso de naturalización, desde la evaluación de elegibilidad hasta la ceremonia de juramento.'
  },
  
  // Personal Injury sub-pages
  'car-accidents': {
    title: 'Car Accident Lawyers',
    titleEs: 'Abogados de Accidentes de Auto',
    subtitle: 'Maximum Compensation for Your Injuries',
    subtitleEs: 'Compensación Máxima por Sus Lesiones',
    description: 'Experienced car accident attorneys fighting for your rights. No fees unless we win your case.',
    descriptionEs: 'Abogados experimentados en accidentes automovilísticos luchando por sus derechos. Sin cargos a menos que ganemos su caso.'
  },
  
  // Criminal Defense sub-pages
  'dui-dwi': {
    title: 'DUI/DWI Defense',
    titleEs: 'Defensa de DUI/DWI',
    subtitle: 'Protect Your License and Freedom',
    subtitleEs: 'Proteja Su Licencia y Libertad',
    description: 'Aggressive DUI defense strategies to minimize penalties and protect your driving privileges.',
    descriptionEs: 'Estrategias agresivas de defensa de DUI para minimizar las sanciones y proteger sus privilegios de conducir.'
  },
  
  // Workers Compensation sub-pages
  'construction-site-injuries': {
    title: 'Construction Site Injuries',
    titleEs: 'Lesiones en Sitios de Construcción',
    subtitle: 'Get the Benefits You Deserve',
    subtitleEs: 'Obtenga los Beneficios que Merece',
    description: 'Specialized representation for construction workers injured on the job. We know the dangers you face.',
    descriptionEs: 'Representación especializada para trabajadores de la construcción lesionados en el trabajo. Conocemos los peligros que enfrenta.'
  },
  
  // Family Law sub-pages
  'divorce': {
    title: 'Divorce Attorney',
    titleEs: 'Abogado de Divorcio',
    subtitle: 'Compassionate Legal Support',
    subtitleEs: 'Apoyo Legal Compasivo',
    description: 'Navigate your divorce with experienced attorneys who understand the emotional and legal complexities.',
    descriptionEs: 'Navegue su divorcio con abogados experimentados que entienden las complejidades emocionales y legales.'
  }
};

// Function to generate page content
function generatePageContent(pageName, template) {
  return `'use client';

import React from 'react';
import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { 
  Scale, 
  FileText, 
  Users, 
  Award,
  Clock,
  DollarSign,
  Shield,
  Heart
} from 'lucide-react';

export default function ${pageName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}Page() {
  const features = ${JSON.stringify(template.features || [
    {
      icon: '<Scale className="w-6 h-6" />',
      title: 'Expert Legal Representation',
      titleEs: 'Representación Legal Experta',
      description: 'Decades of experience in this practice area',
      descriptionEs: 'Décadas de experiencia en esta área de práctica'
    },
    {
      icon: '<Users className="w-6 h-6" />',
      title: 'Personalized Attention',
      titleEs: 'Atención Personalizada',
      description: 'Your case gets the individual attention it deserves',
      descriptionEs: 'Su caso recibe la atención individual que merece'
    },
    {
      icon: '<DollarSign className="w-6 h-6" />',
      title: 'No Fee Unless We Win',
      titleEs: 'Sin Cargo a Menos que Ganemos',
      description: 'You pay nothing unless we secure compensation',
      descriptionEs: 'No paga nada a menos que obtengamos compensación'
    }
  ], null, 2).replace(/"<(\w+\s+className="[^"]+"\s*\/>)"/g, '$1')};

  const benefits = [
    {
      title: 'Free Consultation',
      titleEs: 'Consulta Gratuita',
      description: 'Discuss your case with our experienced attorneys at no cost',
      descriptionEs: 'Discuta su caso con nuestros abogados experimentados sin costo'
    },
    {
      title: 'Bilingual Services',
      titleEs: 'Servicios Bilingües',
      description: 'We serve our community in both English and Spanish',
      descriptionEs: 'Servimos a nuestra comunidad en inglés y español'
    },
    {
      title: 'Proven Track Record',
      titleEs: 'Historial Comprobado',
      description: 'Thousands of successful cases and satisfied clients',
      descriptionEs: 'Miles de casos exitosos y clientes satisfechos'
    },
    {
      title: '24/7 Availability',
      titleEs: 'Disponibilidad 24/7',
      description: 'We\'re here when you need us most',
      descriptionEs: 'Estamos aquí cuando más nos necesita'
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Free Consultation',
      titleEs: 'Consulta Gratuita',
      description: 'Discuss your case and understand your options',
      descriptionEs: 'Discuta su caso y comprenda sus opciones'
    },
    {
      number: '02',
      title: 'Case Evaluation',
      titleEs: 'Evaluación del Caso',
      description: 'We thoroughly analyze your situation',
      descriptionEs: 'Analizamos minuciosamente su situación'
    },
    {
      number: '03',
      title: 'Legal Strategy',
      titleEs: 'Estrategia Legal',
      description: 'Develop a customized approach for your case',
      descriptionEs: 'Desarrollamos un enfoque personalizado para su caso'
    },
    {
      number: '04',
      title: 'Resolution',
      titleEs: 'Resolución',
      description: 'Fight for the best possible outcome',
      descriptionEs: 'Luchamos por el mejor resultado posible'
    }
  ];

  const faqs = [
    {
      question: 'How much does it cost to hire an attorney?',
      questionEs: '¿Cuánto cuesta contratar a un abogado?',
      answer: 'We offer free consultations and work on a contingency fee basis for many cases. This means you pay nothing unless we win.',
      answerEs: 'Ofrecemos consultas gratuitas y trabajamos con honorarios de contingencia para muchos casos. Esto significa que no paga nada a menos que ganemos.'
    },
    {
      question: 'How long will my case take?',
      questionEs: '¿Cuánto tiempo tomará mi caso?',
      answer: 'Every case is unique. During your consultation, we\'ll provide a realistic timeline based on your specific circumstances.',
      answerEs: 'Cada caso es único. Durante su consulta, le proporcionaremos un cronograma realista basado en sus circunstancias específicas.'
    },
    {
      question: 'Do you handle cases in my area?',
      questionEs: '¿Manejan casos en mi área?',
      answer: 'Yes! We serve clients throughout North Carolina and Florida with offices in multiple locations.',
      answerEs: '¡Sí! Atendemos a clientes en todo Carolina del Norte y Florida con oficinas en múltiples ubicaciones.'
    }
  ];

  return (
    <UniversalPageTemplate
      title="${template.title}"
      titleEs="${template.titleEs}"
      subtitle="${template.subtitle || ''}"
      subtitleEs="${template.subtitleEs || ''}"
      description="${template.description}"
      descriptionEs="${template.descriptionEs}"
      features={features}
      benefits={benefits}
      processSteps={processSteps}
      faqs={faqs}
      ctaTitle="Ready to Fight for Your Rights?"
      ctaTitleEs="¿Listo para Luchar por Sus Derechos?"
      ctaDescription="Contact us today for a free consultation with our experienced attorneys"
      ctaDescriptionEs="Contáctenos hoy para una consulta gratuita con nuestros abogados experimentados"
    />
  );
}`;
}

// Function to find and update empty pages
function findAndUpdateEmptyPages(dir, baseDir = '') {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively search subdirectories
      findAndUpdateEmptyPages(filePath, path.join(baseDir, file));
    } else if (file === 'page.tsx') {
      // Read the file content
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check if it contains "under development" or is a minimal page
      if (content.includes('under development') || content.includes('Esta página está en desarrollo')) {
        // Extract the page name from the directory
        const pageName = path.basename(dir);
        const parentDir = path.basename(path.dirname(dir));
        
        console.log(`Found empty page: ${baseDir}/${file}`);
        
        // Find matching template
        let template = pageTemplates[pageName] || pageTemplates[`${parentDir}-${pageName}`];
        
        if (!template) {
          // Create a generic template
          template = {
            title: pageName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            titleEs: pageName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            description: `Professional legal services for ${pageName.replace(/-/g, ' ')} cases in North Carolina and Florida.`,
            descriptionEs: `Servicios legales profesionales para casos de ${pageName.replace(/-/g, ' ')} en Carolina del Norte y Florida.`
          };
        }
        
        // Generate new content
        const newContent = generatePageContent(pageName, template);
        
        // Write the updated content
        fs.writeFileSync(filePath, newContent);
        console.log(`✅ Updated: ${filePath}`);
      }
    }
  });
}

// Main execution
console.log('🔍 Searching for empty pages...\n');

const directories = [
  '/Users/williamvasquez/Documents/VLF Website/src/app/practice-areas',
  '/Users/williamvasquez/Documents/VLF Website/src/app/es/areas-de-practica',
  '/Users/williamvasquez/Documents/VLF Website/src/app/attorneys',
  '/Users/williamvasquez/Documents/VLF Website/src/app/es/abogados',
  '/Users/williamvasquez/Documents/VLF Website/src/app/locations',
  '/Users/williamvasquez/Documents/VLF Website/src/app/es/ubicaciones'
];

directories.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`\n📁 Checking ${dir}...`);
    findAndUpdateEmptyPages(dir);
  }
});

console.log('\n✨ Empty page population complete!');