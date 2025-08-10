const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';
const RUNS = 3; // Number of test runs to average

async function measurePerformance(url) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results = [];

  for (let i = 0; i < RUNS; i++) {
    const page = await browser.newPage();

    // Enable performance tracking
    await page.evaluateOnNewDocument(() => {
      window.performanceData = {
        resourceTimings: [],
        paintTimings: {},
        webVitals: {},
      };

      // Capture resource timings
      new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          window.performanceData.resourceTimings.push({
            name: entry.name,
            duration: entry.duration,
            size: entry.transferSize || 0,
            type: entry.initiatorType,
          });
        }
      }).observe({ entryTypes: ['resource'] });

      // Capture paint timings
      new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          window.performanceData.paintTimings[entry.name] = entry.startTime;
        }
      }).observe({ entryTypes: ['paint'] });
    });

    // Navigate and wait for load
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Wait a bit for any lazy-loaded content
    await page.waitForTimeout(3000);

    // Get performance metrics
    const metrics = await page.metrics();
    const performanceTiming = JSON.parse(
      await page.evaluate(() => JSON.stringify(window.performance.timing))
    );
    const performanceData = await page.evaluate(() => window.performanceData);

    // Calculate metrics
    const firstContentfulPaint = performanceData.paintTimings['first-contentful-paint'] || 0;
    const largestContentfulPaint = await page
      .evaluate(() => {
        return new Promise(resolve => {
          new PerformanceObserver(list => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            resolve(lastEntry.startTime);
          }).observe({ entryTypes: ['largest-contentful-paint'], buffered: true });
        });
      })
      .catch(() => 0);

    const totalBlockingTime = await page.evaluate(() => {
      return new Promise(resolve => {
        let tbt = 0;
        new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              tbt += entry.duration - 50;
            }
          }
          resolve(tbt);
        }).observe({ entryTypes: ['longtask'], buffered: true });
        setTimeout(() => resolve(tbt), 1000);
      });
    });

    const timeToInteractive = performanceTiming.loadEventEnd - performanceTiming.navigationStart;

    // Bundle size analysis
    const jsSize = performanceData.resourceTimings
      .filter(r => r.name.includes('.js'))
      .reduce((sum, r) => sum + r.size, 0);

    const cssSize = performanceData.resourceTimings
      .filter(r => r.name.includes('.css'))
      .reduce((sum, r) => sum + r.size, 0);

    const imageSize = performanceData.resourceTimings
      .filter(r => ['img', 'image'].includes(r.type))
      .reduce((sum, r) => sum + r.size, 0);

    results.push({
      run: i + 1,
      metrics: {
        firstContentfulPaint,
        largestContentfulPaint,
        timeToInteractive,
        totalBlockingTime,
        domContentLoaded:
          performanceTiming.domContentLoadedEventEnd - performanceTiming.navigationStart,
        loadComplete: performanceTiming.loadEventEnd - performanceTiming.navigationStart,
        jsHeapUsed: metrics.JSHeapUsedSize / 1024 / 1024, // MB
        jsHeapTotal: metrics.JSHeapTotalSize / 1024 / 1024, // MB
        layoutCount: metrics.LayoutCount,
        recalcStyleCount: metrics.RecalcStyleCount,
      },
      resources: {
        totalRequests: performanceData.resourceTimings.length,
        jsSize: jsSize / 1024, // KB
        cssSize: cssSize / 1024, // KB
        imageSize: imageSize / 1024, // KB
        totalSize: (jsSize + cssSize + imageSize) / 1024, // KB
      },
    });

    await page.close();
  }

  await browser.close();
  return results;
}

function calculateAverages(results) {
  const avgMetrics = {};
  const avgResources = {};

  // Calculate averages for metrics
  const metricKeys = Object.keys(results[0].metrics);
  for (const key of metricKeys) {
    const values = results.map(r => r.metrics[key]);
    avgMetrics[key] = values.reduce((a, b) => a + b, 0) / values.length;
  }

  // Calculate averages for resources
  const resourceKeys = Object.keys(results[0].resources);
  for (const key of resourceKeys) {
    const values = results.map(r => r.resources[key]);
    avgResources[key] = values.reduce((a, b) => a + b, 0) / values.length;
  }

  return { metrics: avgMetrics, resources: avgResources };
}

function generateReport(url, results, averages) {
  const report = {
    url,
    timestamp: new Date().toISOString(),
    runs: RUNS,
    averages,
    individualRuns: results,
    recommendations: [],
  };

  // Add recommendations based on metrics
  if (averages.metrics.firstContentfulPaint > 1800) {
    report.recommendations.push('⚠️ FCP is above 1.8s - optimize critical rendering path');
  }

  if (averages.metrics.largestContentfulPaint > 2500) {
    report.recommendations.push('⚠️ LCP is above 2.5s - optimize largest content element');
  }

  if (averages.metrics.totalBlockingTime > 300) {
    report.recommendations.push('⚠️ TBT is above 300ms - reduce JavaScript execution time');
  }

  if (averages.resources.jsSize > 500) {
    report.recommendations.push('⚠️ JavaScript bundle is large - consider code splitting');
  }

  if (averages.resources.totalRequests > 50) {
    report.recommendations.push('⚠️ Too many HTTP requests - consider bundling resources');
  }

  return report;
}

async function main() {
  console.log(`🚀 Running performance tests on ${SITE_URL}`);
  console.log(`📊 Running ${RUNS} test runs...`);

  try {
    const results = await measurePerformance(SITE_URL);
    const averages = calculateAverages(results);
    const report = generateReport(SITE_URL, results, averages);

    // Save report
    const reportPath = path.join(__dirname, `../performance-report-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Console output
    console.log('\n📈 Performance Report Summary:');
    console.log('================================');
    console.log(`FCP: ${averages.metrics.firstContentfulPaint.toFixed(0)}ms`);
    console.log(`LCP: ${averages.metrics.largestContentfulPaint.toFixed(0)}ms`);
    console.log(`TTI: ${averages.metrics.timeToInteractive.toFixed(0)}ms`);
    console.log(`TBT: ${averages.metrics.totalBlockingTime.toFixed(0)}ms`);
    console.log(`\n📦 Bundle Sizes:`);
    console.log(`JS: ${averages.resources.jsSize.toFixed(0)}KB`);
    console.log(`CSS: ${averages.resources.cssSize.toFixed(0)}KB`);
    console.log(`Images: ${averages.resources.imageSize.toFixed(0)}KB`);
    console.log(`Total: ${averages.resources.totalSize.toFixed(0)}KB`);

    if (report.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      report.recommendations.forEach(rec => console.log(rec));
    }

    console.log(`\n✅ Full report saved to: ${reportPath}`);
  } catch (error) {
    console.error('❌ Error running performance tests:', error);
    process.exit(1);
  }
}

main();
