import { describe, test, expect } from '@jest/globals';
import { HreflangGenerator } from '../HreflangGenerator';

describe('HreflangGenerator', () => {
  describe('generateHreflangEntries', () => {
    test('should generate correct hreflang entries for homepage', () => {
      const entries = HreflangGenerator.generateHreflangEntries('/');

      expect(entries).toEqual([
        { hreflang: 'en', href: 'https://www.vasquezlawnc.com/' },
        { hreflang: 'en-US', href: 'https://www.vasquezlawnc.com/' },
        { hreflang: 'es', href: 'https://www.vasquezlawnc.com/es' },
        { hreflang: 'es-US', href: 'https://www.vasquezlawnc.com/es' },
        { hreflang: 'es-MX', href: 'https://www.vasquezlawnc.com/es' },
        { hreflang: 'x-default', href: 'https://www.vasquezlawnc.com/' },
      ]);
    });

    test('should generate correct hreflang entries for Spanish homepage', () => {
      const entries = HreflangGenerator.generateHreflangEntries('/es');

      expect(entries).toEqual([
        { hreflang: 'en', href: 'https://www.vasquezlawnc.com/' },
        { hreflang: 'en-US', href: 'https://www.vasquezlawnc.com/' },
        { hreflang: 'es', href: 'https://www.vasquezlawnc.com/es' },
        { hreflang: 'es-US', href: 'https://www.vasquezlawnc.com/es' },
        { hreflang: 'es-MX', href: 'https://www.vasquezlawnc.com/es' },
        { hreflang: 'x-default', href: 'https://www.vasquezlawnc.com/' },
      ]);
    });

    test('should generate correct hreflang entries for attorney pages', () => {
      const entries = HreflangGenerator.generateHreflangEntries('/attorneys/william-vasquez');

      expect(entries).toEqual([
        { hreflang: 'en', href: 'https://www.vasquezlawnc.com/attorneys/william-vasquez' },
        { hreflang: 'en-US', href: 'https://www.vasquezlawnc.com/attorneys/william-vasquez' },
        { hreflang: 'es', href: 'https://www.vasquezlawnc.com/es/abogados/william-vasquez' },
        { hreflang: 'es-US', href: 'https://www.vasquezlawnc.com/es/abogados/william-vasquez' },
        { hreflang: 'es-MX', href: 'https://www.vasquezlawnc.com/es/abogados/william-vasquez' },
        { hreflang: 'x-default', href: 'https://www.vasquezlawnc.com/attorneys/william-vasquez' },
      ]);
    });

    test('should generate correct hreflang entries for practice area pages', () => {
      const entries = HreflangGenerator.generateHreflangEntries('/practice-areas/immigration');

      expect(entries).toEqual([
        { hreflang: 'en', href: 'https://www.vasquezlawnc.com/practice-areas/immigration' },
        { hreflang: 'en-US', href: 'https://www.vasquezlawnc.com/practice-areas/immigration' },
        { hreflang: 'es', href: 'https://www.vasquezlawnc.com/es/areas-de-practica/inmigracion' },
        {
          hreflang: 'es-US',
          href: 'https://www.vasquezlawnc.com/es/areas-de-practica/inmigracion',
        },
        {
          hreflang: 'es-MX',
          href: 'https://www.vasquezlawnc.com/es/areas-de-practica/inmigracion',
        },
        { hreflang: 'x-default', href: 'https://www.vasquezlawnc.com/practice-areas/immigration' },
      ]);
    });

    test('should generate correct hreflang entries for sub-practice area pages', () => {
      const entries = HreflangGenerator.generateHreflangEntries(
        '/practice-areas/immigration/green-cards'
      );

      expect(entries).toEqual([
        {
          hreflang: 'en',
          href: 'https://www.vasquezlawnc.com/practice-areas/immigration/green-cards',
        },
        {
          hreflang: 'en-US',
          href: 'https://www.vasquezlawnc.com/practice-areas/immigration/green-cards',
        },
        {
          hreflang: 'es',
          href: 'https://www.vasquezlawnc.com/es/areas-de-practica/inmigracion/green-cards',
        },
        {
          hreflang: 'es-US',
          href: 'https://www.vasquezlawnc.com/es/areas-de-practica/inmigracion/green-cards',
        },
        {
          hreflang: 'es-MX',
          href: 'https://www.vasquezlawnc.com/es/areas-de-practica/inmigracion/green-cards',
        },
        {
          hreflang: 'x-default',
          href: 'https://www.vasquezlawnc.com/practice-areas/immigration/green-cards',
        },
      ]);
    });

    test('should generate correct hreflang entries for location pages', () => {
      const entries = HreflangGenerator.generateHreflangEntries('/locations/charlotte');

      expect(entries).toEqual([
        { hreflang: 'en', href: 'https://www.vasquezlawnc.com/locations/charlotte' },
        { hreflang: 'en-US', href: 'https://www.vasquezlawnc.com/locations/charlotte' },
        { hreflang: 'es', href: 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte' },
        { hreflang: 'es-US', href: 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte' },
        { hreflang: 'es-MX', href: 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte' },
        { hreflang: 'x-default', href: 'https://www.vasquezlawnc.com/locations/charlotte' },
      ]);
    });

    test('should generate correct hreflang entries for blog pages', () => {
      const entries = HreflangGenerator.generateHreflangEntries(
        '/blog/immigration-law-updates-2024'
      );

      expect(entries).toEqual([
        { hreflang: 'en', href: 'https://www.vasquezlawnc.com/blog/immigration-law-updates-2024' },
        {
          hreflang: 'en-US',
          href: 'https://www.vasquezlawnc.com/blog/immigration-law-updates-2024',
        },
        {
          hreflang: 'es',
          href: 'https://www.vasquezlawnc.com/es/blog/immigration-law-updates-2024',
        },
        {
          hreflang: 'es-US',
          href: 'https://www.vasquezlawnc.com/es/blog/immigration-law-updates-2024',
        },
        {
          hreflang: 'es-MX',
          href: 'https://www.vasquezlawnc.com/es/blog/immigration-law-updates-2024',
        },
        {
          hreflang: 'x-default',
          href: 'https://www.vasquezlawnc.com/blog/immigration-law-updates-2024',
        },
      ]);
    });

    test('should handle pages without Spanish translation', () => {
      const entries = HreflangGenerator.generateHreflangEntries('/some-english-only-page');

      expect(entries).toEqual([
        { hreflang: 'en', href: 'https://www.vasquezlawnc.com/some-english-only-page' },
        { hreflang: 'en-US', href: 'https://www.vasquezlawnc.com/some-english-only-page' },
        { hreflang: 'x-default', href: 'https://www.vasquezlawnc.com/some-english-only-page' },
      ]);
    });

    test('should handle Spanish pages without English equivalent', () => {
      const entries = HreflangGenerator.generateHreflangEntries('/es/some-spanish-only-page');

      expect(entries).toEqual([
        { hreflang: 'es', href: 'https://www.vasquezlawnc.com/es/some-spanish-only-page' },
        { hreflang: 'es-US', href: 'https://www.vasquezlawnc.com/es/some-spanish-only-page' },
        { hreflang: 'es-MX', href: 'https://www.vasquezlawnc.com/es/some-spanish-only-page' },
      ]);
    });
  });

  describe('generateCanonicalUrl', () => {
    test('should generate correct canonical URL for English pages', () => {
      const canonical = HreflangGenerator.generateCanonicalUrl('/attorneys/william-vasquez');
      expect(canonical).toBe('https://www.vasquezlawnc.com/attorneys/william-vasquez');
    });

    test('should generate correct canonical URL for Spanish pages', () => {
      const canonical = HreflangGenerator.generateCanonicalUrl('/es/abogados/william-vasquez');
      expect(canonical).toBe('https://www.vasquezlawnc.com/es/abogados/william-vasquez');
    });

    test('should handle homepage correctly', () => {
      const canonical = HreflangGenerator.generateCanonicalUrl('/');
      expect(canonical).toBe('https://www.vasquezlawnc.com/');
    });

    test('should handle Spanish homepage correctly', () => {
      const canonical = HreflangGenerator.generateCanonicalUrl('/es');
      expect(canonical).toBe('https://www.vasquezlawnc.com/es');
    });
  });

  describe('generateAlternateLinks', () => {
    test('should generate alternate links for bilingual pages', () => {
      const alternates = HreflangGenerator.generateAlternateLinks('/attorneys/william-vasquez');

      expect(alternates).toEqual({
        en: 'https://www.vasquezlawnc.com/attorneys/william-vasquez',
        'en-US': 'https://www.vasquezlawnc.com/attorneys/william-vasquez',
        es: 'https://www.vasquezlawnc.com/es/abogados/william-vasquez',
        'es-US': 'https://www.vasquezlawnc.com/es/abogados/william-vasquez',
        'es-MX': 'https://www.vasquezlawnc.com/es/abogados/william-vasquez',
      });
    });

    test('should generate alternate links for English-only pages', () => {
      const alternates = HreflangGenerator.generateAlternateLinks('/some-english-only-page');

      expect(alternates).toEqual({
        en: 'https://www.vasquezlawnc.com/some-english-only-page',
        'en-US': 'https://www.vasquezlawnc.com/some-english-only-page',
      });
    });
  });

  describe('generateOpenGraphLocales', () => {
    test('should generate correct OpenGraph locales for English pages', () => {
      const ogLocales = HreflangGenerator.generateOpenGraphLocales('/attorneys/william-vasquez');

      expect(ogLocales).toEqual({
        locale: 'en_US',
        alternateLocale: ['es_US', 'es_MX'],
      });
    });

    test('should generate correct OpenGraph locales for Spanish pages', () => {
      const ogLocales = HreflangGenerator.generateOpenGraphLocales('/es/abogados/william-vasquez');

      expect(ogLocales).toEqual({
        locale: 'es_US',
        alternateLocale: ['en_US'],
      });
    });

    test('should generate correct OpenGraph locales for English-only pages', () => {
      const ogLocales = HreflangGenerator.generateOpenGraphLocales('/some-english-only-page');

      expect(ogLocales).toEqual({
        locale: 'en_US',
        alternateLocale: [],
      });
    });
  });
});

describe('URL Pattern Matching', () => {
  test('should correctly identify attorney pages', () => {
    const testCases = [
      '/attorneys/william-vasquez',
      '/attorneys/adrianna-ingram',
      '/attorneys/christopher-afanador',
    ];

    testCases.forEach(path => {
      const entries = HreflangGenerator.generateHreflangEntries(path);
      expect(entries.some(entry => entry.hreflang === 'es')).toBe(true);
      expect(entries.some(entry => entry.href.includes('/es/abogados/'))).toBe(true);
    });
  });

  test('should correctly identify practice area pages', () => {
    const testCases = [
      '/practice-areas/immigration',
      '/practice-areas/personal-injury',
      '/practice-areas/criminal-defense',
      '/practice-areas/workers-compensation',
    ];

    testCases.forEach(path => {
      const entries = HreflangGenerator.generateHreflangEntries(path);
      expect(entries.some(entry => entry.hreflang === 'es')).toBe(true);
      expect(entries.some(entry => entry.href.includes('/es/areas-de-practica/'))).toBe(true);
    });
  });

  test('should correctly handle nested practice area pages', () => {
    const testCases = [
      '/practice-areas/immigration/green-cards',
      '/practice-areas/personal-injury/car-accidents',
      '/practice-areas/criminal-defense/dui-dwi',
    ];

    testCases.forEach(path => {
      const entries = HreflangGenerator.generateHreflangEntries(path);
      expect(entries.some(entry => entry.hreflang === 'es')).toBe(true);
      expect(entries.some(entry => entry.href.includes('/es/areas-de-practica/'))).toBe(true);
    });
  });

  test('should correctly handle location pages', () => {
    const testCases = ['/locations/nc/charlotte', '/locations/nc/raleigh', '/locations/nc/durham'];

    testCases.forEach(path => {
      const entries = HreflangGenerator.generateHreflangEntries(path);
      expect(entries.some(entry => entry.hreflang === 'es')).toBe(true);
      expect(entries.some(entry => entry.href.includes('/es/ubicaciones/'))).toBe(true);
    });
  });
});

describe('Edge Cases', () => {
  test('should handle empty pathname', () => {
    const entries = HreflangGenerator.generateHreflangEntries('');
    expect(entries.length).toBeGreaterThan(0);
    expect(entries.some(entry => entry.hreflang === 'x-default')).toBe(true);
  });

  test('should handle pathname with trailing slash', () => {
    const entries1 = HreflangGenerator.generateHreflangEntries('/attorneys/william-vasquez/');
    const entries2 = HreflangGenerator.generateHreflangEntries('/attorneys/william-vasquez');

    expect(entries1).toEqual(entries2);
  });

  test('should handle pathname with query parameters', () => {
    const entries = HreflangGenerator.generateHreflangEntries(
      '/attorneys/william-vasquez?utm_source=google'
    );

    // Should treat as same page and generate hreflang entries
    expect(entries.some(entry => entry.href.includes('/attorneys/william-vasquez'))).toBe(true);
    expect(entries.some(entry => entry.href.includes('/es/abogados/william-vasquez'))).toBe(true);
  });

  test('should handle malformed paths gracefully', () => {
    const testCases = ['//double-slash', '/with/extra/slashes/', '/with spaces'];

    testCases.forEach(path => {
      expect(() => {
        HreflangGenerator.generateHreflangEntries(path);
      }).not.toThrow();
    });
  });
});

describe('Integration Tests', () => {
  test('should generate valid sitemap XML structure', () => {
    const testPages = [
      '/',
      '/attorneys/william-vasquez',
      '/practice-areas/immigration',
      '/locations/charlotte',
    ];

    testPages.forEach(page => {
      const entries = HreflangGenerator.generateHreflangEntries(page);

      // Should have both English and Spanish versions
      expect(entries.some(entry => entry.hreflang === 'en')).toBe(true);
      expect(entries.some(entry => entry.hreflang === 'es')).toBe(true);

      // Should have x-default
      expect(entries.some(entry => entry.hreflang === 'x-default')).toBe(true);

      // All entries should have valid URLs
      entries.forEach(entry => {
        expect(entry.href).toMatch(/^https:\/\/www\.vasquezlawnc\.com/);
        expect(entry.hreflang).toMatch(/^(en|es|x-default)(-[A-Z]{2})?$/);
      });
    });
  });
});
