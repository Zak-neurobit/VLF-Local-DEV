const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Known blog post URLs from the old site
const KNOWN_BLOG_POSTS = [
  // Immigration blogs
  '/expert-guide-to-immigration-reform-for-student-visas',
  '/expert-insights-on-the-shocking-truth-about-illegal-immigrants',
  '/expert-tips-to-navigate-a-delayed-immigration-court-case-status',
  '/guide-to-permanent-residency-through-employment-what-you-need-to-know',
  '/how-can-drug-charges-impact-immigration-status',
  '/how-to-identify-the-signs-of-illegal-immigration-in-your-community',
  '/what-are-the-eligibility-requirements-for-fiance-visas',
  '/what-are-the-requirements-for-adjustment-of-status-for-immigrants',
  '/what-is-a-conditional-green-card',
  '/what-issues-will-be-addressed-in-an-immigration-bond-hearing',
  '/what-legal-options-are-available-for-immigrants-from-venezuela',
  '/when-can-criminal-cases-affect-a-persons-immigration-status',
  '/when-is-consular-processing-required-for-immigrants-to-the-u-s',
  '/does-the-violence-against-women-act-protect-against-deportation',
  '/struggles-of-undocumented-immigrants',
  '/best-guide-on-navigating-the-board-of-immigration-appeals',
  '/the-role-of-asylum-in-immigration-law',
  '/new-rules-for-asylum-and-parole-may-affect-immigrants-to-the-u-s',
  '/understanding-the-different-kinds-of-family-visas-in-north-carolina',
  '/top-immigration-lawyer-explains-5-key-signs-your-status-is-at-risk',

  // Personal Injury blogs
  '/6-reasons-why-you-should-hire-a-personal-injury-lawyer',
  '/7-causes-of-truck-driver-fatigue-that-can-lead-to-truck-accidents',
  '/i-was-in-an-accident-with-an-emergency-vehicle-now-what',
  '/common-legal-mistakes-to-avoid-after-a-car-accident',
  '/understanding-common-causes-of-auto-accidents-tips-for-prevention',
  '/types-of-damages-in-a-motorcycle-accident-injury-claim',
  '/types-of-evidence-in-your-auto-accident-injury-claim',

  // Criminal Defense blogs
  '/can-a-lawyer-help-me-if-i-get-a-dwi',
  '/what-should-i-do-if-i-am-arrested-for-dwi-over-the-holidays',
  '/will-north-carolina-legalize-marijuana-for-medical-or-recreational-use',

  // Workers Comp blogs
  '/best-workers-compensation-quote-save-more-today',
  '/documents-you-need-for-your-workers-comp-claim',
  '/does-workers-compensation-insurance-automatically-cover-every-workplace-injury',
  '/what-factors-will-affect-my-workers-comp-settlement',
  '/who-pays-if-workers-die-from-workplace-accidents',
  '/job-related-risks-for-agricultural-workers',
  '/steps-to-take-if-your-workers-comp-claim-is-denied-in-north-carolina',
  '/how-can-i-get-compensation-for-a-construction-site-injury-in-north-carolina',

  // Other blogs
  '/can-i-sue-someone-if-their-dog-bites-me',
  '/how-i-built-a-6-figure-business-in-12-months-as-a-first-generation-immigrant',

  // Spanish blogs
  '/el-mejor-abogado-de-inmigracion-explica-5-senales-clave-de-que-su-estatus-esta-en-riesgo',
  '/7-estrategias-comprobadas-que-los-abogados-de-inmigracion-usan-para-ganar-casos-complejos',
  '/como-construi-un-negocio-de-seis-cifras-en-12-meses-como-inmigrante-de-primera-generacion',
  '/como-miles-se-han-beneficiado-al',
  '/como-navegar-las-complejidades-de-la-junta-de',
  '/guia-experta-sobre-la-reforma-migratoria-para-visas-de-estudiante',
  '/la-impactante-verdad-sobre-la-inmigracion-ilegal',
  '/la-mejor-guia-para-navegar-en-la-junta-de-apelaciones-de-inmigracion',

  // Scholarship winners
  '/scholarship-fall-2024-winner-citlali-jacqueline-flores-hernandez',
  '/scholarship-fall-2024-winner-jennifer-guzman-millan',
  '/spring-2023-scholarship-winner-briseyda',

  // Category blogs
  '/north-carolina-attorney/can-immigrants-still-qualify-for-the-daca-program-in-2021-and-beyond',
  '/north-carolina-attorney/how-can-i-get-compensation-for-a-construction-site-injury-in-north-carolina',
  '/north-carolina-attorney/if-i-am-convicted-of-a-crime-will-i-get-deported',
  '/north-carolina-attorney/when-can-criminal-cases-affect-a-person-s-immigration-status',
];

function checkExistingBlogs() {
  console.log('🔍 Checking for missing blog posts...\n');

  // Get all existing pages
  const existingPages = new Set();
  try {
    const output = execSync('find src/app -name "page.tsx" -type f', { encoding: 'utf8' });
    const files = output
      .trim()
      .split('\n')
      .filter(f => f);

    files.forEach(file => {
      const relativePath = file.replace('src/app', '').replace('/page.tsx', '') || '/';
      existingPages.add(relativePath);
    });
  } catch (error) {
    console.error('Error checking existing pages:', error);
  }

  // Check which blogs are missing
  const missingBlogs = [];
  const existingBlogs = [];

  KNOWN_BLOG_POSTS.forEach(blogPath => {
    if (existingPages.has(blogPath)) {
      existingBlogs.push(blogPath);
    } else {
      missingBlogs.push(blogPath);
    }
  });

  // Display results
  console.log(`📊 Blog Import Status:\n`);
  console.log(`✅ Existing blog posts: ${existingBlogs.length}`);
  console.log(`❌ Missing blog posts: ${missingBlogs.length}`);
  console.log(
    `📈 Completion: ${Math.round((existingBlogs.length / KNOWN_BLOG_POSTS.length) * 100)}%\n`
  );

  if (missingBlogs.length > 0) {
    console.log('❌ Missing Blog Posts:\n');

    // Group by category
    const categorized = {
      immigration: [],
      'personal-injury': [],
      'criminal-defense': [],
      'workers-comp': [],
      spanish: [],
      other: [],
    };

    missingBlogs.forEach(blog => {
      if (blog.includes('/es/') || blog.includes('guia-') || blog.includes('como-')) {
        categorized.spanish.push(blog);
      } else if (
        blog.includes('immigration') ||
        blog.includes('visa') ||
        blog.includes('immigrant')
      ) {
        categorized.immigration.push(blog);
      } else if (blog.includes('accident') || blog.includes('injury')) {
        categorized['personal-injury'].push(blog);
      } else if (blog.includes('criminal') || blog.includes('dwi') || blog.includes('arrest')) {
        categorized['criminal-defense'].push(blog);
      } else if (blog.includes('workers') || blog.includes('comp')) {
        categorized['workers-comp'].push(blog);
      } else {
        categorized.other.push(blog);
      }
    });

    Object.entries(categorized).forEach(([category, blogs]) => {
      if (blogs.length > 0) {
        console.log(`\n📁 ${category.toUpperCase()}:`);
        blogs.forEach(blog => console.log(`   - ${blog}`));
      }
    });
  }

  if (existingBlogs.length > 0) {
    console.log('\n✅ Already Imported:\n');
    existingBlogs.slice(0, 10).forEach(blog => console.log(`   - ${blog}`));
    if (existingBlogs.length > 10) {
      console.log(`   ... and ${existingBlogs.length - 10} more`);
    }
  }

  // Save report
  const report = {
    checkDate: new Date().toISOString(),
    totalKnownBlogs: KNOWN_BLOG_POSTS.length,
    existingCount: existingBlogs.length,
    missingCount: missingBlogs.length,
    completionRate: Math.round((existingBlogs.length / KNOWN_BLOG_POSTS.length) * 100),
    missingBlogs,
    existingBlogs,
  };

  fs.writeFileSync(
    path.join(process.cwd(), 'blog-status-report.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('\n📄 Full report saved to: blog-status-report.json');

  if (missingBlogs.length > 0) {
    console.log('\n💡 To import missing blogs, run:');
    console.log('   node scripts/import-all-blogs.js');
  }
}

// Run the check
checkExistingBlogs();
