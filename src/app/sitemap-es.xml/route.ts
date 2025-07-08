import { NextRequest, NextResponse } from 'next/server';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  hreflang?: Array<{ lang: string; href: string }>;
}

export async function GET(request: NextRequest) {
  const baseUrl = 'https://www.vasquezlawnc.com';
  const currentDate = new Date().toISOString();

  // Spanish main pages
  const spanishStaticPages: SitemapUrl[] = [
    {
      loc: `${baseUrl}/es`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es` },
        { lang: 'en', href: `${baseUrl}/` }
      ]
    },
    {
      loc: `${baseUrl}/es/acerca-de`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/acerca-de` },
        { lang: 'en', href: `${baseUrl}/about` }
      ]
    },
    {
      loc: `${baseUrl}/es/consulta-gratuita`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.9,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/consulta-gratuita` },
        { lang: 'en', href: `${baseUrl}/free-consultation` }
      ]
    },
    {
      loc: `${baseUrl}/es/contacto`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.9,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/contacto` },
        { lang: 'en', href: `${baseUrl}/contact` }
      ]
    },
    {
      loc: `${baseUrl}/es/testimonios`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/testimonios` },
        { lang: 'en', href: `${baseUrl}/testimonials` }
      ]
    },
    {
      loc: `${baseUrl}/es/resultados-casos`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/resultados-casos` },
        { lang: 'en', href: `${baseUrl}/case-results` }
      ]
    },
    {
      loc: `${baseUrl}/es/nuestro-equipo`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/nuestro-equipo` },
        { lang: 'en', href: `${baseUrl}/our-team` }
      ]
    },
    {
      loc: `${baseUrl}/es/preguntas-frecuentes`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/preguntas-frecuentes` },
        { lang: 'en', href: `${baseUrl}/faqs` }
      ]
    },
    {
      loc: `${baseUrl}/es/hacer-pago`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/hacer-pago` },
        { lang: 'en', href: `${baseUrl}/make-payment` }
      ]
    },
    {
      loc: `${baseUrl}/es/becas`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/becas` },
        { lang: 'en', href: `${baseUrl}/scholarship` }
      ]
    },
    {
      loc: `${baseUrl}/es/politica-privacidad`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.3,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/politica-privacidad` },
        { lang: 'en', href: `${baseUrl}/privacy-policy` }
      ]
    },
    {
      loc: `${baseUrl}/es/terminos-servicio`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.3,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/terminos-servicio` },
        { lang: 'en', href: `${baseUrl}/terms-of-service` }
      ]
    }
  ];

  // Spanish attorney profiles
  const spanishAttorneyPages: SitemapUrl[] = [
    {
      loc: `${baseUrl}/es/abogados`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/abogados` },
        { lang: 'en', href: `${baseUrl}/attorneys` }
      ]
    },
    {
      loc: `${baseUrl}/es/abogados/william-vasquez`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.9,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/abogados/william-vasquez` },
        { lang: 'en', href: `${baseUrl}/attorneys/william-vasquez` }
      ]
    },
    {
      loc: `${baseUrl}/es/abogados/christopher-afanador`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/abogados/christopher-afanador` },
        { lang: 'en', href: `${baseUrl}/attorneys/christopher-afanador` }
      ]
    },
    {
      loc: `${baseUrl}/es/abogados/jillian-baucom`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/abogados/jillian-baucom` },
        { lang: 'en', href: `${baseUrl}/attorneys/jillian-baucom` }
      ]
    },
    {
      loc: `${baseUrl}/es/abogados/mark-kelsey`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/abogados/mark-kelsey` },
        { lang: 'en', href: `${baseUrl}/attorneys/mark-kelsey` }
      ]
    },
    {
      loc: `${baseUrl}/es/abogados/judith-parkes`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/abogados/judith-parkes` },
        { lang: 'en', href: `${baseUrl}/attorneys/judith-parkes` }
      ]
    },
    {
      loc: `${baseUrl}/es/abogados/roselyn-torrellas`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/abogados/roselyn-torrellas` },
        { lang: 'en', href: `${baseUrl}/attorneys/roselyn-v-torrellas` }
      ]
    },
    {
      loc: `${baseUrl}/es/abogados/adrianna-ingram`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/abogados/adrianna-ingram` },
        { lang: 'en', href: `${baseUrl}/attorneys/adrianna-ingram` }
      ]
    }
  ];

  // Spanish practice areas
  const spanishPracticeAreas: SitemapUrl[] = [
    {
      loc: `${baseUrl}/es/areas-de-practica`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.9,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/areas-de-practica` },
        { lang: 'en', href: `${baseUrl}/practice-areas` }
      ]
    },
    {
      loc: `${baseUrl}/es/areas-de-practica/inmigracion`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.95,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/areas-de-practica/inmigracion` },
        { lang: 'en', href: `${baseUrl}/practice-areas/immigration` }
      ]
    },
    {
      loc: `${baseUrl}/es/areas-de-practica/lesiones-personales`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.95,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/areas-de-practica/lesiones-personales` },
        { lang: 'en', href: `${baseUrl}/practice-areas/personal-injury` }
      ]
    },
    {
      loc: `${baseUrl}/es/areas-de-practica/defensa-criminal`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.85,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/areas-de-practica/defensa-criminal` },
        { lang: 'en', href: `${baseUrl}/practice-areas/criminal-defense` }
      ]
    },
    {
      loc: `${baseUrl}/es/areas-de-practica/compensacion-laboral`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.85,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/areas-de-practica/compensacion-laboral` },
        { lang: 'en', href: `${baseUrl}/practice-areas/workers-compensation` }
      ]
    },
    {
      loc: `${baseUrl}/es/areas-de-practica/derecho-familia`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/areas-de-practica/derecho-familia` },
        { lang: 'en', href: `${baseUrl}/practice-areas/family-law` }
      ]
    },
    {
      loc: `${baseUrl}/es/areas-de-practica/infracciones-transito`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/areas-de-practica/infracciones-transito` },
        { lang: 'en', href: `${baseUrl}/practice-areas/traffic-violations` }
      ]
    },
    {
      loc: `${baseUrl}/es/areas-de-practica/multas-de-transito`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/areas-de-practica/multas-de-transito` },
        { lang: 'en', href: `${baseUrl}/practice-areas/traffic-violations` }
      ]
    }
  ];

  // Spanish locations
  const spanishLocationPages: SitemapUrl[] = [
    {
      loc: `${baseUrl}/es/ubicaciones`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/ubicaciones` },
        { lang: 'en', href: `${baseUrl}/locations` }
      ]
    },
    {
      loc: `${baseUrl}/es/ubicaciones/raleigh`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/ubicaciones/raleigh` },
        { lang: 'en', href: `${baseUrl}/locations/raleigh` }
      ]
    },
    {
      loc: `${baseUrl}/es/ubicaciones/charlotte`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/ubicaciones/charlotte` },
        { lang: 'en', href: `${baseUrl}/locations/charlotte` }
      ]
    },
    {
      loc: `${baseUrl}/es/ubicaciones/winston-salem`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/ubicaciones/winston-salem` },
        { lang: 'en', href: `${baseUrl}/locations/winston-salem` }
      ]
    },
    {
      loc: `${baseUrl}/es/ubicaciones/smithfield`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/ubicaciones/smithfield` },
        { lang: 'en', href: `${baseUrl}/locations/smithfield` }
      ]
    },
    {
      loc: `${baseUrl}/es/ubicaciones/durham`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/ubicaciones/durham` },
        { lang: 'en', href: `${baseUrl}/locations/durham` }
      ]
    },
    {
      loc: `${baseUrl}/es/ubicaciones/orlando`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/ubicaciones/orlando` },
        { lang: 'en', href: `${baseUrl}/locations/orlando` }
      ]
    },
    // Contact office locations in Spanish
    {
      loc: `${baseUrl}/es/contacto/ubicacion-oficina-raleigh-nc`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/contacto/ubicacion-oficina-raleigh-nc` },
        { lang: 'en', href: `${baseUrl}/contact/raleigh-nc-office-location` }
      ]
    },
    {
      loc: `${baseUrl}/es/contacto/ubicacion-oficina-charlotte-nc`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/contacto/ubicacion-oficina-charlotte-nc` },
        { lang: 'en', href: `${baseUrl}/contact/charlotte-nc-office-location` }
      ]
    },
    {
      loc: `${baseUrl}/es/contacto/ubicacion-oficina-orlando-fl`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/contacto/ubicacion-oficina-orlando-fl` },
        { lang: 'en', href: `${baseUrl}/contact/orlando-fl-office-location` }
      ]
    },
    {
      loc: `${baseUrl}/es/contacto/ubicacion-oficina-smithfield`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/contacto/ubicacion-oficina-smithfield` },
        { lang: 'en', href: `${baseUrl}/contact/smithfield-office-location` }
      ]
    }
  ];

  // Spanish blog pages
  const spanishBlogPages: SitemapUrl[] = [
    {
      loc: `${baseUrl}/es/blog`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.8,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/blog` },
        { lang: 'en', href: `${baseUrl}/blog` }
      ]
    },
    // High-priority Spanish blog posts
    {
      loc: `${baseUrl}/es/7-estrategias-comprobadas-que-los-abogados-de-inmigracion-usan-para-ganar-casos-complejos`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/7-estrategias-comprobadas-que-los-abogados-de-inmigracion-usan-para-ganar-casos-complejos` },
        { lang: 'en', href: `${baseUrl}/7-proven-strategies-that-immigration-lawyers-use-to-win-complex-cases` }
      ]
    },
    {
      loc: `${baseUrl}/es/como-construi-un-negocio-de-seis-cifras-en-12-meses-como-inmigrante-de-primera-generacion`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/como-construi-un-negocio-de-seis-cifras-en-12-meses-como-inmigrante-de-primera-generacion` },
        { lang: 'en', href: `${baseUrl}/how-i-built-a-6-figure-business-in-12-months-as-a-first-generation-immigrant` }
      ]
    },
    {
      loc: `${baseUrl}/es/el-mejor-abogado-de-inmigracion-explica-5-senales-clave-de-que-su-estatus-esta-en-riesgo`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/el-mejor-abogado-de-inmigracion-explica-5-senales-clave-de-que-su-estatus-esta-en-riesgo` },
        { lang: 'en', href: `${baseUrl}/top-immigration-lawyer-explains-5-key-signs-your-status-is-at-risk` }
      ]
    },
    {
      loc: `${baseUrl}/es/guia-experta-sobre-la-reforma-migratoria-para-visas-de-estudiante`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/guia-experta-sobre-la-reforma-migratoria-para-visas-de-estudiante` },
        { lang: 'en', href: `${baseUrl}/expert-guide-to-immigration-reform-for-student-visas` }
      ]
    },
    {
      loc: `${baseUrl}/es/la-impactante-verdad-sobre-la-inmigracion-ilegal`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/la-impactante-verdad-sobre-la-inmigracion-ilegal` },
        { lang: 'en', href: `${baseUrl}/expert-insights-on-the-shocking-truth-about-illegal-immigrants` }
      ]
    },
    {
      loc: `${baseUrl}/es/la-mejor-guia-para-navegar-en-la-junta-de-apelaciones-de-inmigracion`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/la-mejor-guia-para-navegar-en-la-junta-de-apelaciones-de-inmigracion` },
        { lang: 'en', href: `${baseUrl}/best-guide-on-navigating-the-board-of-immigration-appeals` }
      ]
    },
    {
      loc: `${baseUrl}/es/como-navegar-las-complejidades-de-la-junta-de`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6
    }
  ];

  // Combine all Spanish URLs
  const allSpanishUrls = [
    ...spanishStaticPages,
    ...spanishAttorneyPages,
    ...spanishPracticeAreas,
    ...spanishLocationPages,
    ...spanishBlogPages
  ];

  // Generate XML
  const xmlContent = generateSitemapXML(allSpanishUrls);

  return new NextResponse(xmlContent, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, must-revalidate',
    },
  });
}

function generateSitemapXML(urls: SitemapUrl[]): string {
  const urlElements = urls.map(url => {
    let hreflangElements = '';
    if (url.hreflang) {
      hreflangElements = url.hreflang.map(link => 
        `<xhtml:link rel="alternate" hreflang="${link.lang}" href="${escapeXml(link.href)}" />`
      ).join('\n    ');
    }

    return `
  <url>
    <loc>${escapeXml(url.loc)}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ''}
    ${hreflangElements ? `${hreflangElements}` : ''}
  </url>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlElements}
</urlset>`;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}