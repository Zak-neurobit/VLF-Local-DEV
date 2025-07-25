// Build override - FULL STATIC GENERATION for ALL pages
// BUILD UP NOT DOWN - Generate everything!

console.log('🚀 Full static generation enabled - building ALL pages');
console.log('📊 No restrictions - every page will be statically generated');
console.log('⚡ Maximum performance mode activated');

// Remove all environment restrictions
delete process.env.LIMIT_STATIC_GENERATION;
delete process.env.STATIC_GENERATION_WHITELIST;

// Force full static generation
process.env.NEXT_PUBLIC_BUILD_ALL_PAGES = 'true';
process.env.BUILD_ALL_PAGES = 'true';

module.exports = {
  ALLOWED_STATIC_PATHS: [], // No restrictions - build everything!
};