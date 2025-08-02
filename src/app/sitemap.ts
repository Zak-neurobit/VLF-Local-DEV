import { MetadataRoute } from 'next';
import { HIGH_PRIORITY_LOCATIONS } from '@/lib/location-utils';
import { practiceAreas } from '@/data/practice-areas';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vasquezlawnc.com';

  // Core pages
  const corePages = [
    '',
    '/about',
    '/contact',
    '/practice-areas',
    '/attorneys',
    '/blog',
    '/case-results',
    '/calculators',
    '/free-consultation',
    '/ai-consultation',
  ];

  // Spanish core pages
  const spanishCorePages = [
    '/es',
    '/es/acerca-de',
    '/es/contacto',
    '/es/areas-de-practica',
    '/es/abogados',
    '/es/blog',
    '/es/resultados-de-casos',
    '/es/calculadoras',
    '/es/consulta-gratis',
    '/es/consulta-ia',
  ];

  // Practice area pages
  const practiceAreaPages: string[] = [];
  const spanishPracticeAreaPages: string[] = [];

  practiceAreas.forEach(area => {
    // Main practice area page
    practiceAreaPages.push(`/practice-areas/${area.key}`);
    spanishPracticeAreaPages.push(`/es/areas-de-practica/${area.slug.es}`);
  });

  // Attorney pages
  const attorneyPages = [
    '/attorneys/william-vasquez',
    '/attorneys/adrianna-ingram',
    '/attorneys/christopher-afanador',
    '/attorneys/jillian-baucom',
    '/attorneys/judith-parkes',
    '/attorneys/kelly-vega',
    '/attorneys/mark-kelsey',
    '/attorneys/rebecca-sommer',
    '/attorneys/roselyn-torrellas',
  ];

  const spanishAttorneyPages = attorneyPages.map(
    page => `/es${page.replace('/attorneys', '/abogados')}`
  );

  // Near me pages - using high priority locations only to optimize build
  const cities = HIGH_PRIORITY_LOCATIONS;
  const nearMePages: string[] = [];
  const spanishNearMePages: string[] = [];

  cities.forEach(city => {
    const citySlug = city.toLowerCase().replace(/\s+/g, '-');
    const services = [
      'immigration',
      'personal-injury',
      'workers-compensation',
      'criminal-defense',
      'family-law',
      'car-accidents',
      'dui',
      'divorce',
      'spanish-speaking',
    ];

    services.forEach(service => {
      nearMePages.push(`/near-me/${citySlug}-${service}-near-me`);

      // Spanish near me pages
      const spanishServiceMap: Record<string, string> = {
        immigration: 'abogado-inmigracion',
        'personal-injury': 'abogado-lesiones-personales',
        'workers-compensation': 'abogado-compensacion-laboral',
        'criminal-defense': 'abogado-defensa-criminal',
        'family-law': 'abogado-derecho-familia',
        'car-accidents': 'abogado-accidente-auto',
        dui: 'abogado-dui',
        divorce: 'abogado-divorcio',
        'spanish-speaking': 'abogado-que-habla-español',
      };

      spanishNearMePages.push(
        `/cerca-de-mi/${citySlug}-${spanishServiceMap[service] || service}-cerca-de-mi`
      );
    });
  });

  // Combine all pages
  const allPages = [
    ...corePages,
    ...spanishCorePages,
    ...practiceAreaPages,
    ...spanishPracticeAreaPages,
    ...attorneyPages,
    ...spanishAttorneyPages,
    ...nearMePages,
    ...spanishNearMePages,
  ];

  // Generate sitemap entries
  return allPages.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.includes('blog') ? 'daily' : 'weekly',
    priority:
      route === '' || route === '/es'
        ? 1.0
        : route.includes('practice-areas') || route.includes('areas-de-practica')
          ? 0.9
          : route.includes('near-me') || route.includes('cerca-de-mi')
            ? 0.8
            : 0.7,
  }));
}
