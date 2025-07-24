// Build override to limit static page generation
// This file helps reduce build time by limiting which pages are statically generated

const ALLOWED_STATIC_PATHS = [
  '/',
  '/contact',
  '/attorneys', 
  '/practice-areas',
  '/practice-areas/immigration',
  '/practice-areas/personal-injury',
  '/practice-areas/criminal-defense',
  '/practice-areas/workers-compensation',
  '/blog',
  '/about',
  '/es',
  '/es/contacto',
  '/es/abogados',
  '/es/areas-de-practica',
];

// Override Next.js static generation
if (process.env.VERCEL) {
  console.log('🚀 Build override active - limiting static generation to essential pages only');
  
  // Set environment variable to limit static generation
  process.env.LIMIT_STATIC_GENERATION = 'true';
  process.env.STATIC_GENERATION_WHITELIST = JSON.stringify(ALLOWED_STATIC_PATHS);
}

module.exports = {
  ALLOWED_STATIC_PATHS,
};