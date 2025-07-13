#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const { minify } = require('terser');
const postcss = require('postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

/**
 * Mobile Performance Optimization Script
 * Target: <2 second load time on 3G
 */

class MobileOptimizer {
  constructor() {
    this.projectRoot = path.join(__dirname, '..');
    this.publicDir = path.join(this.projectRoot, 'public');
    this.srcDir = path.join(this.projectRoot, 'src');
    this.results = {
      imagesOptimized: 0,
      cssReduced: 0,
      jsMinified: 0,
      totalSavings: 0,
    };
  }

  async run() {
    console.log('🚀 Starting Mobile Performance Optimization...\n');

    try {
      // 1. Optimize Images
      await this.optimizeImages();

      // 2. Generate Critical CSS
      await this.generateCriticalCSS();

      // 3. Implement Code Splitting
      await this.implementCodeSplitting();

      // 4. Create Service Worker
      await this.createServiceWorker();

      // 5. Optimize Fonts
      await this.optimizeFonts();

      // 6. Create Performance Budget
      await this.createPerformanceBudget();

      console.log('\n✅ Mobile Optimization Complete!');
      console.log('Results:', this.results);
    } catch (error) {
      console.error('❌ Optimization failed:', error);
    }
  }

  /**
   * 1. Image Optimization
   */
  async optimizeImages() {
    console.log('📸 Optimizing images...');

    const imageDir = path.join(this.publicDir, 'images');
    const images = await this.getFiles(imageDir, ['.jpg', '.jpeg', '.png']);

    for (const imagePath of images) {
      const stats = await fs.stat(imagePath);
      const originalSize = stats.size;

      // Create WebP version
      const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      await sharp(imagePath).webp({ quality: 85 }).toFile(webpPath);

      // Create mobile-optimized versions
      const sizes = [
        { width: 320, suffix: '-mobile' },
        { width: 768, suffix: '-tablet' },
        { width: 1200, suffix: '-desktop' },
      ];

      for (const size of sizes) {
        const outputPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, `${size.suffix}.$1`);

        await sharp(imagePath)
          .resize(size.width, null, {
            withoutEnlargement: true,
            fit: 'inside',
          })
          .jpeg({ quality: 85, progressive: true })
          .toFile(outputPath);
      }

      const newStats = await fs.stat(webpPath);
      const savings = originalSize - newStats.size;
      this.results.imagesOptimized++;
      this.results.totalSavings += savings;

      console.log(`  ✓ ${path.basename(imagePath)} - Saved ${(savings / 1024).toFixed(2)}KB`);
    }
  }

  /**
   * 2. Critical CSS Generation
   */
  async generateCriticalCSS() {
    console.log('\n🎨 Generating critical CSS...');

    const criticalCSS = `
/* Critical CSS for Above-the-Fold Content */
:root {
  --color-burgundy: #7C1818;
  --color-gold: #D4AF37;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: #333;
}

/* Hero Section Critical Styles */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #7C1818 0%, #4A0E0E 100%);
  color: white;
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: bold;
  margin-bottom: 1rem;
}

.hero p {
  font-size: clamp(1rem, 2vw, 1.25rem);
  opacity: 0.9;
}

/* Critical Button Styles */
.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  border-radius: 0.375rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s;
}

.btn-primary {
  background: #D4AF37;
  color: #000;
}

.btn:active {
  transform: scale(0.95);
}

/* Loading States */
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Mobile Navigation */
@media (max-width: 768px) {
  .mobile-menu {
    position: fixed;
    top: 0;
    left: -100%;
    width: 80%;
    height: 100vh;
    background: white;
    transition: left 0.3s;
    z-index: 1000;
  }
  
  .mobile-menu.open {
    left: 0;
  }
}
`;

    // Write critical CSS
    await fs.writeFile(path.join(this.srcDir, 'styles', 'critical.css'), criticalCSS);

    // Minify critical CSS
    const result = await postcss([autoprefixer(), cssnano({ preset: 'default' })]).process(
      criticalCSS,
      { from: undefined }
    );

    await fs.writeFile(path.join(this.srcDir, 'styles', 'critical.min.css'), result.css);

    this.results.cssReduced = criticalCSS.length - result.css.length;
    console.log(`  ✓ Critical CSS generated and minified`);
  }

  /**
   * 3. Code Splitting Implementation
   */
  async implementCodeSplitting() {
    console.log('\n📦 Implementing code splitting...');

    // Create dynamic imports wrapper
    const dynamicImports = `
// Dynamic Import Utilities for Code Splitting

export const lazyLoadComponent = (componentPath) => {
  return dynamic(() => import(componentPath), {
    loading: () => <div className="skeleton h-64 w-full" />,
    ssr: false
  });
};

export const preloadComponent = (componentPath) => {
  if (typeof window !== 'undefined') {
    import(componentPath);
  }
};

// Intersection Observer for lazy loading
export const useLazyLoad = (ref, callback) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, callback]);
};
`;

    await fs.writeFile(path.join(this.srcDir, 'lib', 'dynamic-imports.js'), dynamicImports);

    console.log('  ✓ Code splitting utilities created');
  }

  /**
   * 4. Service Worker Creation
   */
  async createServiceWorker() {
    console.log('\n⚡ Creating service worker...');

    const serviceWorker = `
// Service Worker for Offline Support and Caching
const CACHE_NAME = 'vasquez-law-v1';
const urlsToCache = [
  '/',
  '/styles/critical.min.css',
  '/images/logo.svg',
  '/manifest.json'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
`;

    await fs.writeFile(path.join(this.publicDir, 'sw.js'), serviceWorker);

    console.log('  ✓ Service worker created');
  }

  /**
   * 5. Font Optimization
   */
  async optimizeFonts() {
    console.log('\n🔤 Optimizing fonts...');

    const fontCSS = `
/* Font loading is handled by Next.js font optimization */
/* Using next/font/google for Inter font */

/* Fallback font stack */
body {
  font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
}

/* Font optimization hints */
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
`;

    await fs.writeFile(path.join(this.srcDir, 'styles', 'fonts.css'), fontCSS);

    console.log('  ✓ Font optimization complete');
  }

  /**
   * 6. Performance Budget
   */
  async createPerformanceBudget() {
    console.log('\n📊 Creating performance budget...');

    const budget = {
      bundles: [
        {
          name: 'main',
          budget: 300000, // 300KB
        },
        {
          name: 'vendor',
          budget: 250000, // 250KB
        },
      ],
      metrics: {
        'first-contentful-paint': 1500, // 1.5s
        'largest-contentful-paint': 2500, // 2.5s
        'time-to-interactive': 3500, // 3.5s
        'cumulative-layout-shift': 0.1,
        'first-input-delay': 100, // 100ms
      },
      resourceTypes: [
        {
          type: 'image',
          budget: 500000, // 500KB total
        },
        {
          type: 'script',
          budget: 300000, // 300KB total
        },
        {
          type: 'style',
          budget: 100000, // 100KB total
        },
        {
          type: 'font',
          budget: 100000, // 100KB total
        },
      ],
    };

    await fs.writeFile(
      path.join(this.projectRoot, 'performance-budget.json'),
      JSON.stringify(budget, null, 2)
    );

    console.log('  ✓ Performance budget created');
  }

  /**
   * Helper: Get files recursively
   */
  async getFiles(dir, extensions = []) {
    const files = [];
    const items = await fs.readdir(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = await fs.stat(fullPath);

      if (stat.isDirectory()) {
        files.push(...(await this.getFiles(fullPath, extensions)));
      } else if (extensions.length === 0 || extensions.some(ext => fullPath.endsWith(ext))) {
        files.push(fullPath);
      }
    }

    return files;
  }
}

// Run the optimizer
if (require.main === module) {
  const optimizer = new MobileOptimizer();
  optimizer.run().catch(console.error);
}

module.exports = MobileOptimizer;
