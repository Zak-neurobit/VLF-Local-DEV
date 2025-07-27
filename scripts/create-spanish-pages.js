#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Template for Spanish pages
const createSpanishPageTemplate = (title, description, practiceArea, slug) => {
  const componentName = title.replace(/[^a-zA-Z0-9]/g, '');
  
  return `import { Metadata } from 'next';
import { StandardizedPracticeAreaTemplate } from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: '${title} | Vasquez Law Firm',
  description: '${description}',
  keywords: '${title.toLowerCase()}, abogado, servicios legales, ${practiceArea.replace('-', ' ')}',
};

export default function ${componentName}Page() {
  return (
    <StandardizedPracticeAreaTemplate
      practiceArea="${practiceArea}"
      subArea="${slug}"
      language="es"
    />
  );
}
`;
};

// Missing Spanish pages based on navigation
const spanishPages = {
  'derecho-familia': [
    { title: 'Custodia de Hijos', slug: 'custodia-hijos', desc: 'Representación legal en casos de custodia de menores' },
    { title: 'Manutención de Hijos', slug: 'manutencion-hijos', desc: 'Asistencia legal para establecer o modificar la manutención infantil' },
    { title: 'Pensión Alimenticia', slug: 'pension-alimenticia', desc: 'Ayuda legal con pensión alimenticia y manutención conyugal' },
    { title: 'División de Propiedad', slug: 'division-propiedad', desc: 'División equitativa de bienes en casos de divorcio' },
    { title: 'Acuerdos Prenupciales', slug: 'acuerdos-prenupciales', desc: 'Creación y revisión de acuerdos prenupciales' },
    { title: 'Adopción', slug: 'adopcion', desc: 'Asistencia legal con procedimientos de adopción' },
    { title: 'Protección contra Violencia Doméstica', slug: 'proteccion-violencia-domestica', desc: 'Órdenes de protección y asistencia legal contra el abuso' },
    { title: 'Tutela Legal', slug: 'tutela-legal', desc: 'Establecimiento de tutela legal para menores o adultos incapacitados' },
  ],
  'compensacion-laboral': [
    { title: 'Lesiones de Construcción', slug: 'lesiones-construccion', desc: 'Compensación laboral para accidentes en sitios de construcción' },
    { title: 'Lesiones por Estrés Repetitivo', slug: 'lesiones-estres-repetitivo', desc: 'Reclamos por túnel carpiano y otras lesiones por esfuerzo repetitivo' },
    { title: 'Enfermedades Ocupacionales', slug: 'enfermedades-ocupacionales', desc: 'Compensación por enfermedades relacionadas con el trabajo' },
    { title: 'Reclamos Negados', slug: 'reclamos-negados', desc: 'Apelación de reclamos de compensación laboral negados' },
    { title: 'Regreso al Trabajo', slug: 'regreso-trabajo', desc: 'Navegando el regreso al trabajo después de una lesión laboral' },
    { title: 'Beneficios por Discapacidad', slug: 'beneficios-discapacidad', desc: 'Asegurar beneficios por discapacidad por lesiones laborales' },
  ],
  'defensa-criminal': [
    { title: 'Delitos de Cuello Blanco', slug: 'delitos-cuello-blanco', desc: 'Defensa contra fraude, malversación y delitos financieros' },
    { title: 'Defensa de Menores', slug: 'defensa-menores', desc: 'Defensa criminal para menores en corte juvenil' },
  ],
  'lesiones-personales': [
    { title: 'Responsabilidad de Producto', slug: 'responsabilidad-producto', desc: 'Reclamos por lesiones causadas por productos defectuosos' },
  ],
  'infracciones-transito': [
    { title: 'Multas por Exceso de Velocidad', slug: 'multas-exceso-velocidad', desc: 'Defensa contra multas de velocidad y violaciones de tráfico' },
    { title: 'Conducción Imprudente', slug: 'conduccion-imprudente', desc: 'Defensa legal para cargos de conducción imprudente' },
    { title: 'Suspensión de Licencia', slug: 'suspension-licencia', desc: 'Luchando contra la suspensión de licencia y restauración' },
    { title: 'Violaciones CDL', slug: 'violaciones-cdl', desc: 'Defensa para violaciones de licencia de conducir comercial' },
    { title: 'Atropello y Fuga', slug: 'atropello-fuga', desc: 'Defensa contra cargos de atropello y fuga' },
    { title: 'Conducir sin Licencia', slug: 'conducir-sin-licencia', desc: 'Ayuda legal por conducir sin licencia válida' },
    { title: 'Representación en Corte de Tráfico', slug: 'representacion-corte-trafico', desc: 'Representación profesional en corte de tráfico' },
  ],
};

// Create the pages
function createPages() {
  const srcDir = path.join(__dirname, '..', 'src', 'app', 'es', 'areas-de-practica');
  let createdCount = 0;

  Object.entries(spanishPages).forEach(([practiceArea, pages]) => {
    pages.forEach(page => {
      const dirPath = path.join(srcDir, practiceArea, page.slug);
      const filePath = path.join(dirPath, 'page.tsx');
      
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        fs.writeFileSync(filePath, createSpanishPageTemplate(page.title, page.desc, practiceArea, page.slug));
        console.log(`✅ Created: ${filePath}`);
        createdCount++;
      }
    });
  });

  console.log(`\n📊 Total Spanish pages created: ${createdCount}`);
}

console.log('🚀 Creating missing Spanish pages...\n');
createPages();
console.log('\n✅ Spanish page creation complete!');