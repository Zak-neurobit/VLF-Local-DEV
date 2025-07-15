import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import * as cheerio from 'cheerio';

interface LinkAnalysis {
  totalPages: number;
  totalInternalLinks: number;
  totalExternalLinks: number;
  pagesWithNoLinks: string[];
  pagesWithTooFewLinks: string[];
  pagesWithTooManyLinks: string[];
  orphanPages: string[];
  linkDistribution: Record<string, number>;
  anchorTextAnalysis: Record<string, number>;
  recommendations: string[];
}

// Analyze internal linking structure
async function analyzeInternalLinks(): Promise<LinkAnalysis> {
  console.log('🔍 Analyzing internal linking structure...\n');

  const analysis: LinkAnalysis = {
    totalPages: 0,
    totalInternalLinks: 0,
    totalExternalLinks: 0,
    pagesWithNoLinks: [],
    pagesWithTooFewLinks: [],
    pagesWithTooManyLinks: [],
    orphanPages: [],
    linkDistribution: {},
    anchorTextAnalysis: {},
    recommendations: [],
  };

  // Find all HTML and TSX files
  const appDir = path.join(process.cwd(), 'src/app');
  const files = await glob('**/*.{tsx,jsx}', { cwd: appDir });

  // Track which pages link to which
  const linkMap: Record<string, Set<string>> = {};
  const incomingLinks: Record<string, number> = {};

  for (const file of files) {
    if (file.includes('layout.') || file.includes('loading.') || file.includes('error.')) {
      continue;
    }

    const filePath = path.join(appDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    analysis.totalPages++;

    // Extract links using regex patterns
    const linkPatterns = [
      /href=["']([^"']+)["']/g,
      /<Link\s+href=["']([^"']+)["']/g,
      /to=["']([^"']+)["']/g,
    ];

    const pageLinks = new Set<string>();
    const anchorTexts: string[] = [];

    linkPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const href = match[1];

        // Classify link
        if (href.startsWith('/') && !href.startsWith('//')) {
          // Internal link
          analysis.totalInternalLinks++;
          pageLinks.add(href);

          // Track incoming links
          incomingLinks[href] = (incomingLinks[href] || 0) + 1;

          // Extract anchor text (simplified)
          const anchorMatch = content.substring(match.index, match.index + 200).match(/>(.*?)</);
          if (anchorMatch) {
            const anchorText = anchorMatch[1].trim().toLowerCase();
            if (anchorText && !anchorText.includes('{') && anchorText.length < 50) {
              anchorTexts.push(anchorText);
              analysis.anchorTextAnalysis[anchorText] =
                (analysis.anchorTextAnalysis[anchorText] || 0) + 1;
            }
          }
        } else if (href.startsWith('http')) {
          // External link
          analysis.totalExternalLinks++;
        }
      }
    });

    // Store link data
    const pageUrl = '/' + file.replace(/\/page\.(tsx|jsx)$/, '').replace(/\\/g, '/');
    linkMap[pageUrl] = pageLinks;

    // Analyze link count
    const linkCount = pageLinks.size;
    if (linkCount === 0) {
      analysis.pagesWithNoLinks.push(pageUrl);
    } else if (linkCount < 3) {
      analysis.pagesWithTooFewLinks.push(pageUrl);
    } else if (linkCount > 50) {
      analysis.pagesWithTooManyLinks.push(pageUrl);
    }

    // Track distribution
    const bucket = Math.floor(linkCount / 10) * 10;
    const bucketLabel = `${bucket}-${bucket + 9} links`;
    analysis.linkDistribution[bucketLabel] = (analysis.linkDistribution[bucketLabel] || 0) + 1;
  }

  // Find orphan pages (no incoming links)
  Object.keys(linkMap).forEach(page => {
    if (!incomingLinks[page] && page !== '/') {
      analysis.orphanPages.push(page);
    }
  });

  // Generate recommendations
  generateRecommendations(analysis, linkMap, incomingLinks);

  return analysis;
}

// Generate SEO recommendations
function generateRecommendations(
  analysis: LinkAnalysis,
  linkMap: Record<string, Set<string>>,
  incomingLinks: Record<string, number>
) {
  // Recommendation 1: Fix pages with no internal links
  if (analysis.pagesWithNoLinks.length > 0) {
    analysis.recommendations.push(
      `🚨 CRITICAL: ${analysis.pagesWithNoLinks.length} pages have NO internal links. ` +
        `Add at least 3-5 contextual links to: ${analysis.pagesWithNoLinks.slice(0, 3).join(', ')}`
    );
  }

  // Recommendation 2: Improve pages with too few links
  if (analysis.pagesWithTooFewLinks.length > 0) {
    analysis.recommendations.push(
      `⚠️  WARNING: ${analysis.pagesWithTooFewLinks.length} pages have fewer than 3 internal links. ` +
        `SEO best practice is 3-10 internal links per page.`
    );
  }

  // Recommendation 3: Fix orphan pages
  if (analysis.orphanPages.length > 0) {
    analysis.recommendations.push(
      `🔗 ORPHAN PAGES: ${analysis.orphanPages.length} pages have no incoming links. ` +
        `These pages won't be discovered by search engines: ${analysis.orphanPages.slice(0, 3).join(', ')}`
    );
  }

  // Recommendation 4: Diversify anchor text
  const overusedAnchors = Object.entries(analysis.anchorTextAnalysis)
    .filter(([text, count]) => count > 10)
    .sort((a, b) => b[1] - a[1]);

  if (overusedAnchors.length > 0) {
    analysis.recommendations.push(
      `📝 ANCHOR TEXT: Diversify anchor text. Most overused: ` +
        overusedAnchors
          .slice(0, 3)
          .map(([text, count]) => `"${text}" (${count}x)`)
          .join(', ')
    );
  }

  // Recommendation 5: Link distribution
  const avgLinksPerPage = analysis.totalInternalLinks / analysis.totalPages;
  if (avgLinksPerPage < 5) {
    analysis.recommendations.push(
      `📊 LINK DENSITY: Average of ${avgLinksPerPage.toFixed(1)} internal links per page is too low. ` +
        `Target 5-15 internal links per page for optimal SEO.`
    );
  }

  // Recommendation 6: Hub pages
  const hubPages = Object.entries(incomingLinks)
    .filter(([url, count]) => count > 20)
    .sort((a, b) => b[1] - a[1]);

  if (hubPages.length > 0) {
    analysis.recommendations.push(
      `🎯 HUB PAGES: Leverage these high-authority pages with many incoming links: ` +
        hubPages
          .slice(0, 3)
          .map(([url, count]) => `${url} (${count} links)`)
          .join(', ')
    );
  }

  // Recommendation 7: Create topic clusters
  analysis.recommendations.push(
    `🕸️  TOPIC CLUSTERS: Create content clusters by interlinking related pages. ` +
      `E.g., link all immigration pages together, all Charlotte pages together.`
  );
}

// Generate report
async function generateReport() {
  try {
    const analysis = await analyzeInternalLinks();

    console.log('📊 Internal Linking Analysis Report\n');
    console.log('═══════════════════════════════════════\n');

    console.log('📈 Overview:');
    console.log(`   Total Pages: ${analysis.totalPages}`);
    console.log(`   Total Internal Links: ${analysis.totalInternalLinks}`);
    console.log(`   Total External Links: ${analysis.totalExternalLinks}`);
    console.log(
      `   Average Links per Page: ${(analysis.totalInternalLinks / analysis.totalPages).toFixed(1)}`
    );
    console.log('');

    console.log('🔍 Issues Found:');
    console.log(`   Pages with NO links: ${analysis.pagesWithNoLinks.length}`);
    console.log(`   Pages with <3 links: ${analysis.pagesWithTooFewLinks.length}`);
    console.log(`   Pages with >50 links: ${analysis.pagesWithTooManyLinks.length}`);
    console.log(`   Orphan pages: ${analysis.orphanPages.length}`);
    console.log('');

    console.log('📊 Link Distribution:');
    Object.entries(analysis.linkDistribution)
      .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
      .forEach(([range, count]) => {
        console.log(`   ${range}: ${count} pages`);
      });
    console.log('');

    console.log('🏷️  Top Anchor Texts:');
    Object.entries(analysis.anchorTextAnalysis)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .forEach(([text, count]) => {
        console.log(`   "${text}": ${count} times`);
      });
    console.log('');

    console.log('💡 Recommendations:');
    analysis.recommendations.forEach((rec, index) => {
      console.log(`\n${index + 1}. ${rec}`);
    });

    // Save detailed report
    const reportPath = path.join(process.cwd(), 'internal-linking-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(analysis, null, 2));
    console.log(`\n\n✅ Detailed report saved to: ${reportPath}`);
  } catch (error) {
    console.error('Error analyzing internal links:', error);
  }
}

// Run the analysis
generateReport();
