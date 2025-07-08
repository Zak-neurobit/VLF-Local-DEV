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
    serverComponentsExternalPackages: ['puppeteer', 'pdf-parse', 'canvas', 'sharp', 'bcryptjs', 'socket.io-client'],
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
