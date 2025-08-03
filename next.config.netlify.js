// Reduced configuration for Netlify deployment testing
const baseConfig = require('./next.config.js');

module.exports = {
  ...baseConfig,
  // Limit pages for initial deployment
  experimental: {
    ...baseConfig.experimental,
    // Reduce pages generated
    excludeDefaultMomentLocales: true,
  },
  // Add page generation limits
  async generateStaticParams() {
    // Only generate a subset of pages for testing
    return {
      '/': { params: {} },
      '/attorneys': { params: {} },
      '/practice-areas': { params: {} },
      '/contact': { params: {} },
      '/about': { params: {} },
      // Limit location pages to major cities only
      '/locations/north-carolina/charlotte': { params: {} },
      '/locations/florida/orlando': { params: {} },
    };
  },
};
