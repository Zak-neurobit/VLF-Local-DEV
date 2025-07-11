// Add this to your next.config.js redirects function

const oldSiteRedirects = [
  // Attorney redirects
  {
    source: '/attorneys/william-vasquez-attorney/index.html',
    destination: '/william-vasquez-attorney',
    permanent: true,
  },
  {
    source: '/william-vasquez-abogado/index.html',
    destination: '/william-vasquez-attorney',
    permanent: true,
  },
  {
    source: '/judith-parkes-es/index.html',
    destination: '/judith-parkes',
    permanent: true,
  },
  {
    source: '/attorneys/christopher-afanador-abogado/index.html',
    destination: '/attorneys/christopher-afanador',
    permanent: true,
  },
  {
    source: '/attorneys/jillian-baucom-es/index.html',
    destination: '/attorneys/jillian-baucom',
    permanent: true,
  },
  {
    source: '/attorneys/mark-kelsey-es/index.html',
    destination: '/attorneys/mark-kelsey',
    permanent: true,
  },

  // Practice area redirects
  {
    source: '/immigration/index.html',
    destination: '/practice-areas/immigration',
    permanent: true,
  },
  {
    source: '/personal-injury/index.html',
    destination: '/practice-areas/personal-injury',
    permanent: true,
  },
  {
    source: '/criminal-defense/index.html',
    destination: '/practice-areas/criminal-defense',
    permanent: true,
  },
  {
    source: '/family-law/index.html',
    destination: '/practice-areas/family-law',
    permanent: true,
  },
  {
    source: '/workers-compensation-job-injury/index.html',
    destination: '/practice-areas/workers-compensation',
    permanent: true,
  },

  // Blog pagination redirects
  {
    source: '/blog/page/:page(\\d+)/:path*',
    destination: '/blog',
    permanent: true,
  },
  {
    source: '/immigration/page/:page(\\d+)/:path*',
    destination: '/practice-areas/immigration',
    permanent: true,
  },
  {
    source: '/personal-injury/page/:page(\\d+)/:path*',
    destination: '/practice-areas/personal-injury',
    permanent: true,
  },

  // Spanish redirects
  {
    source: '/abogados-de-inmigracion-de-t-visa/index.html',
    destination: '/t-visa-immigration-attorneys',
    permanent: true,
  },

  // Location redirects
  {
    source: '/contact/:location-office-location/index.html',
    destination: '/:location',
    permanent: true,
  },

  // Remove index.html from all URLs

  // Remove ﹖et_blog query parameter
  {
    source: '/:path*﹖et_blog',
    destination: '/:path*',
    permanent: true,
  },

  // General .html removal
  {
    source: '/:path*.html',
    destination: '/:path*',
    permanent: true,
  },
];

module.exports = oldSiteRedirects;
