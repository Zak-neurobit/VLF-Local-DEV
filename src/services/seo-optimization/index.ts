import { Metadata } from 'next';
import { getPrismaClient } from '@/lib/prisma';
import { componentLogger } from '@/lib/logger';

import type { SchemaOrgOrganization, SchemaOrgPerson, SchemaOrgFAQ } from '@/types/services';

export interface SchemaOrgData {
  '@context': string;
  '@type': string | string[];
  name?: string;
  description?: string;
  url?: string;
  image?: string | string[];
  sameAs?: string[];
  address?: {
    '@type': 'PostalAddress';
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    reviewCount: number;
  };
  [key: string]: unknown;
}

export class SEOOptimizationService {
  // Generate optimized metadata for pages
  static async generateMetadata(params: {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    url: string;
    type?: 'website' | 'article';
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    language?: 'en' | 'es';
  }): Promise<Metadata> {
    const {
      title,
      description,
      keywords,
      image,
      url,
      type = 'website',
      publishedTime,
      modifiedTime,
      author,
      language = 'en',
    } = params;

    const siteName = 'Vasquez Law Firm, PLLC';
    const twitterHandle = '@VasquezLawNC';

    return {
      title: `${title} | ${siteName}`,
      description,
      keywords: keywords?.join(', '),
      authors: author ? [{ name: author }] : [{ name: siteName }],
      openGraph: {
        title,
        description,
        url,
        siteName,
        images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : [],
        locale: language === 'es' ? 'es_US' : 'en_US',
        type,
        ...(publishedTime && { publishedTime }),
        ...(modifiedTime && { modifiedTime }),
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        site: twitterHandle,
        creator: twitterHandle,
        images: image ? [image] : [],
      },
      alternates: {
        languages: {
          'en-US': url.replace('/es/', '/en/'),
          'es-US': url.replace('/en/', '/es/'),
        },
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      verification: {
        google: process.env.GOOGLE_SITE_VERIFICATION,
        yandex: process.env.YANDEX_VERIFICATION,
        yahoo: process.env.YAHOO_VERIFICATION,
      },
    };
  }

  // Generate Schema.org structured data
  static generateSchema(type: string, data: Record<string, unknown>): SchemaOrgData {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vasquezlawnc.com';

    switch (type) {
      case 'LawFirm':
        return {
          '@context': 'https://schema.org',
          '@type': 'LegalService',
          '@id': `${baseUrl}/#organization`,
          name: 'Vasquez Law Firm, PLLC',
          alternateName: 'VLF',
          url: baseUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/images/logo.png`,
            width: 600,
            height: 200,
          },
          image: `${baseUrl}/images/office.jpg`,
          description:
            "Full-service law firm specializing in Immigration, Personal Injury, Workers' Compensation, Criminal Defense, Family Law, and Traffic Violations. Serving North Carolina and Florida with AI-enhanced legal services.",
          slogan: 'YO PELEO POR TI™',
          foundingDate: '1989',
          priceRange: '$$$',
          telephone: '+1-844-967-3536',
          email: 'leads@vasquezlawfirm.com',
          address: {
            '@type': 'PostalAddress' as const,
            streetAddress: '123 Main St, Suite 100',
            addressLocality: 'Raleigh',
            addressRegion: 'NC',
            postalCode: '27601',
            addressCountry: 'US',
          },
          geo: [
            {
              '@type': 'GeoCoordinates',
              latitude: 35.7796,
              longitude: -78.6382,
            },
          ],
          areaServed: [
            {
              '@type': 'State',
              name: 'North Carolina',
            },
            {
              '@type': 'State',
              name: 'Florida',
            },
          ],
          serviceArea: {
            '@type': 'GeoCircle',
            geoMidpoint: {
              '@type': 'GeoCoordinates',
              latitude: 35.7796,
              longitude: -78.6382,
            },
            geoRadius: '200',
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Legal Services',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Immigration Law',
                  description:
                    'Comprehensive immigration services including visas, green cards, citizenship, and deportation defense.',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Personal Injury',
                  description:
                    'Representation for car accidents, slip and falls, and other personal injury cases.',
                },
              },
              // Add more services
            ],
          },
          sameAs: [
            'https://www.facebook.com/vasquezlawfirm',
            'https://twitter.com/vasquezlawnc',
            'https://www.linkedin.com/company/vasquez-law-firm',
            'https://www.youtube.com/vasquezlawfirm',
          ],
          review: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '523',
          },
        };

      case 'Attorney':
        return {
          '@context': 'https://schema.org',
          '@type': 'Attorney',
          '@id': `${baseUrl}/attorneys/${data.slug as string}#person`,
          name: data.name as string,
          image: data.image as string,
          jobTitle: data.title as string,
          worksFor: {
            '@id': `${baseUrl}/#organization`,
          },
          description: data.bio as string,
          alumniOf: (data.education as Array<{ name: string }>)?.map(edu => ({
            '@type': 'EducationalOrganization',
            name: edu.name,
          })),
          knowsLanguage: data.languages,
          hasOccupation: {
            '@type': 'Occupation',
            name: 'Attorney',
            occupationalCategory: '23-1011.00',
          },
        };

      case 'BlogPosting':
        return {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          '@id': `${baseUrl}/blog/${data.slug as string}#article`,
          headline: data.title as string,
          alternativeHeadline: data.metaDescription as string,
          image: data.featuredImage as string,
          author: {
            '@type': 'Person',
            name: (data.author as string) || 'Vasquez Law Team',
            url: `${baseUrl}/attorneys`,
          },
          publisher: {
            '@id': `${baseUrl}/#organization`,
          },
          datePublished: data.publishedAt,
          dateModified: data.updatedAt as string,
          description: data.excerpt as string,
          articleBody: data.content as string,
          keywords: (data.keywords as string[]).join(', '),
          wordCount: (data.content as string).split(' ').length,
          inLanguage: data.language === 'es' ? 'es-US' : 'en-US',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/blog/${data.slug as string}`,
          },
          ...((data.faqSection as Array<{ question: string; answer: string }>) && {
            hasPart: {
              '@type': 'FAQPage',
              mainEntity: (data.faqSection as Array<{ question: string; answer: string }>).map(
                faq => ({
                  '@type': 'Question',
                  name: faq.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                  },
                })
              ),
            },
          }),
        };

      case 'FAQPage':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: (data.questions as Array<{ question: string; answer: string }>).map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
              author: {
                '@id': `${baseUrl}/#organization`,
              },
            },
          })),
        };

      case 'LocalBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': `${baseUrl}/locations/${data.city}#location`,
          name: `Vasquez Law Firm - ${data.city}`,
          parentOrganization: {
            '@id': `${baseUrl}/#organization`,
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: data.address as string,
            addressLocality: data.city as string,
            addressRegion: data.state as string,
            postalCode: data.zip as string,
            addressCountry: 'US',
          },
          telephone: data.phone,
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '09:00',
              closes: '18:00',
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: 'Saturday',
              opens: '10:00',
              closes: '14:00',
            },
          ],
        };

      case 'BreadcrumbList':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: (data.items as Array<{ name: string; url: string }>).map(
            (item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.name,
              item: `${baseUrl}${item.url}`,
            })
          ),
        };

      default:
        return {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
        };
    }
  }

  // Generate XML sitemap
  static async generateSitemap(): Promise<string> {
    componentLogger.info('SEOOptimizationService.generateSitemap', {});

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vasquezlawnc.com';

    // Static pages
    const staticPages = [
      { url: '/', priority: 1.0, changefreq: 'daily' },
      { url: '/practice-areas', priority: 0.9, changefreq: 'weekly' },
      { url: '/attorneys', priority: 0.8, changefreq: 'monthly' },
      { url: '/about', priority: 0.7, changefreq: 'monthly' },
      { url: '/contact', priority: 0.8, changefreq: 'monthly' },
      { url: '/blog', priority: 0.9, changefreq: 'daily' },
    ];

    // Practice area pages
    const practiceAreas = [
      'immigration',
      'personal-injury',
      'workers-compensation',
      'criminal-defense',
      'family-law',
      'traffic-violations',
    ];

    // Blog posts
    const blogPosts = await getPrismaClient().blogPost.findMany({
      where: { status: 'published' },
      select: { slug: true, updatedAt: true },
    });

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
    xml += 'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    // Add static pages
    for (const page of staticPages) {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;

      // Add language alternatives
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en${page.url}"/>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/es${page.url}"/>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page.url}"/>\n`;

      xml += '  </url>\n';
    }

    // Add practice area pages
    for (const area of practiceAreas) {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/practice-areas/${area}</loc>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.8</priority>\n';
      xml += '  </url>\n';
    }

    // Add blog posts
    for (const post of blogPosts) {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
      xml += `    <lastmod>${post.updatedAt.toISOString()}</lastmod>\n`;
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      xml += '  </url>\n';
    }

    xml += '</urlset>';

    return xml;
  }

  // Generate robots.txt
  static generateRobotsTxt(): string {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vasquezlawnc.com';

    return `# Vasquez Law Firm Robots.txt
# AI-Enhanced Legal Services

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /static/
Disallow: /*.json$
Disallow: /*?*

# Allow search engines to access everything else
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 1

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: MJ12bot
Disallow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-blog.xml
Sitemap: ${baseUrl}/sitemap-news.xml`;
  }

  // Analyze page for SEO issues
  static async analyzePage(url: string): Promise<{
    score: number;
    issues: string[];
    suggestions: string[];
  }> {
    componentLogger.info('SEOOptimizationService.analyzePage', { url });

    const issues: string[] = [];
    const suggestions: string[] = [];
    const score = 100;

    // This would typically fetch and analyze the page
    // For now, returning mock data
    return {
      score: 95,
      issues: ['Meta description could be longer', 'Missing alt text on 2 images'],
      suggestions: ['Add FAQ schema for better rich snippets', 'Implement breadcrumbs'],
    };
  }

  // Generate hreflang tags for multilingual support
  static generateHreflangTags(currentPath: string, language: 'en' | 'es'): string {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vasquezlawnc.com';

    const tags: string[] = [];

    // English version
    tags.push(`<link rel="alternate" hreflang="en" href="${baseUrl}/en${currentPath}" />`);

    // Spanish version
    tags.push(`<link rel="alternate" hreflang="es" href="${baseUrl}/es${currentPath}" />`);

    // Default
    tags.push(`<link rel="alternate" hreflang="x-default" href="${baseUrl}${currentPath}" />`);

    return tags.join('\n');
  }

  // Generate hreflang sitemap
  async generateHreflangSitemap(): Promise<string> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vasquezlawnc.com';

    // Define pages that have translations
    const pages = [
      '/',
      '/practice-areas',
      '/practice-areas/immigration',
      '/practice-areas/personal-injury',
      '/practice-areas/workers-compensation',
      '/practice-areas/criminal-defense',
      '/practice-areas/family-law',
      '/practice-areas/traffic-violations',
      '/attorneys',
      '/about',
      '/contact',
      '/blog',
    ];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    for (const page of pages) {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${page}</loc>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page}" />\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/es${page === '/' ? '' : page}" />\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page}" />\n`;
      xml += '  </url>\n';
    }

    xml += '</urlset>';

    return xml;
  }
}
