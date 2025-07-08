/** @type {import('next').NextConfig} */
const oldSiteRedirects = require('./redirects-config');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Skip type checking during build to speed up deployment
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['vasquezlawnc.com', 'images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.vasquezlawnc.com',
      },
    ],
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: [
      '@heroicons/react',
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      'date-fns',
      'react-hook-form',
      '@langchain/core',
      '@langchain/openai',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'gsap',
      'lottie-react',
      '@react-pdf/renderer',
      'pdf-lib',
    ],
    serverComponentsExternalPackages: ['puppeteer', 'pdf-parse', 'canvas', 'sharp', 'bcryptjs'],
    optimizeCss: true,
  },
  // Webpack optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Bundle analyzer
    if (process.env.ANALYZE === 'true') {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: `../analyze/${isServer ? 'server' : 'client'}.html`,
      }));
    }

    // Optimize imports
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    };

    // Tree shaking and optimization
    config.optimization = {
      ...config.optimization,
      // Remove usedExports as it conflicts with cacheUnaffected
      sideEffects: false,
      splitChunks: {
        chunks: 'all',
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          // Split Three.js and 3D libraries
          three: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: 'three',
            priority: 30,
            reuseExistingChunk: true,
          },
          // Split PDF libraries
          pdf: {
            test: /[\\/]node_modules[\\/](pdf-lib|@react-pdf|pdf-parse)[\\/]/,
            name: 'pdf',
            priority: 25,
            reuseExistingChunk: true,
          },
          // Split AI/LangChain libraries
          ai: {
            test: /[\\/]node_modules[\\/](@langchain|openai|ai)[\\/]/,
            name: 'ai',
            priority: 25,
            reuseExistingChunk: true,
          },
          // Split animation libraries
          animations: {
            test: /[\\/]node_modules[\\/](framer-motion|gsap|lottie-react|@react-spring)[\\/]/,
            name: 'animations',
            priority: 20,
            reuseExistingChunk: true,
          },
          // Split UI component libraries
          ui: {
            test: /[\\/]node_modules[\\/](@radix-ui|@heroicons|lucide-react)[\\/]/,
            name: 'ui',
            priority: 20,
            reuseExistingChunk: true,
          },
          // Split utility libraries
          utils: {
            test: /[\\/]node_modules[\\/](date-fns|zod|axios|lodash)[\\/]/,
            name: 'utils',
            priority: 15,
            reuseExistingChunk: true,
          },
          // React core
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
            name: 'react',
            priority: 40,
            reuseExistingChunk: true,
          },
          // Default vendors
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              if (!module.context) return 'vendor-unknown';
              const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
              if (!match) return 'vendor-unknown';
              const packageName = match[1];
              return `vendor-${packageName.replace('@', '')}`;
            },
            priority: 10,
            reuseExistingChunk: true,
            minSize: 30000, // Only create vendor chunks for packages > 30KB
          },
          // Common chunks
          common: {
            name: 'common',
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
            enforce: true,
          },
          // Styles
          styles: {
            name: 'styles',
            test: /\.(css|scss)$/,
            chunks: 'all',
            enforce: true,
            priority: 50,
          },
        },
      },
      runtimeChunk: {
        name: 'runtime',
      },
      moduleIds: 'deterministic',
    };

    // Minimize JavaScript and CSS
    if (!dev) {
      const TerserPlugin = require('terser-webpack-plugin');
      config.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
            mangle: true,
          },
        }),
        ...config.optimization.minimizer,
      ];
    }

    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Vary',
            value: 'Accept',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      ...oldSiteRedirects,
      // Additional custom redirects
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      // Spanish blog post redirects - moved to /es directory
      {
        source: '/7-estrategias-comprobadas-que-los-abogados-de-inmigracion-usan-para-ganar-casos-complejos',
        destination: '/es/7-estrategias-comprobadas-que-los-abogados-de-inmigracion-usan-para-ganar-casos-complejos',
        permanent: true,
      },
      {
        source: '/como-construi-un-negocio-de-seis-cifras-en-12-meses-como-inmigrante-de-primera-generacion',
        destination: '/es/como-construi-un-negocio-de-seis-cifras-en-12-meses-como-inmigrante-de-primera-generacion',
        permanent: true,
      },
      {
        source: '/como-navegar-las-complejidades-de-la-junta-de',
        destination: '/es/como-navegar-las-complejidades-de-la-junta-de',
        permanent: true,
      },
      {
        source: '/la-mejor-guia-para-navegar-en-la-junta-de-apelaciones-de-inmigracion',
        destination: '/es/la-mejor-guia-para-navegar-en-la-junta-de-apelaciones-de-inmigracion',
        permanent: true,
      },
      {
        source: '/el-mejor-abogado-de-inmigracion-explica-5-senales-clave-de-que-su-estatus-esta-en-riesgo',
        destination: '/es/el-mejor-abogado-de-inmigracion-explica-5-senales-clave-de-que-su-estatus-esta-en-riesgo',
        permanent: true,
      },
      {
        source: '/guia-experta-sobre-la-reforma-migratoria-para-visas-de-estudiante',
        destination: '/es/guia-experta-sobre-la-reforma-migratoria-para-visas-de-estudiante',
        permanent: true,
      },
      {
        source: '/la-impactante-verdad-sobre-la-inmigracion-ilegal',
        destination: '/es/la-impactante-verdad-sobre-la-inmigracion-ilegal',
        permanent: true,
      },
      // Spanish service page redirects
      {
        source: '/abogados-de-inmigracion-de-t-visa',
        destination: '/es/areas-de-practica/inmigracion/abogados-de-inmigracion-de-t-visa',
        permanent: true,
      },
      {
        source: '/multas-de-transito',
        destination: '/es/areas-de-practica/multas-de-transito',
        permanent: true,
      },
      // Spanish blog category redirects
      {
        source: '/es/blog/category/immigration',
        destination: '/es/blog/categoria/inmigracion',
        permanent: true,
      },
      {
        source: '/es/blog/category/traffic-violations',
        destination: '/es/blog/categoria/infracciones-transito',
        permanent: true,
      },
      {
        source: '/es/blog/category/personal-injury',
        destination: '/es/blog/categoria/lesiones-personales',
        permanent: true,
      },
      {
        source: '/es/blog/category/workers-compensation',
        destination: '/es/blog/categoria/compensacion-laboral',
        permanent: true,
      },
      {
        source: '/es/blog/category/criminal-defense',
        destination: '/es/blog/categoria/defensa-criminal',
        permanent: true,
      },
      {
        source: '/es/blog/category/family-law',
        destination: '/es/blog/categoria/derecho-familiar',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
