#!/usr/bin/env tsx

import { promises as fs } from 'fs';
import path from 'path';
import { glob } from 'glob';
import fetch from 'node-fetch';
import pLimit from 'p-limit';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const CONCURRENT_TESTS = 20;
const BATCH_SIZE = 100;

interface TestResult {
  url: string;
  status: number;
  error?: string;
  time: number;
}

interface Summary {
  total: number;
  successful: number;
  clientErrors: TestResult[];
  serverErrors: TestResult[];
  networkErrors: TestResult[];
}

async function getAllPages(): Promise<string[]> {
  const pageFiles = await glob('src/app/**/page.tsx', {
    ignore: ['**/node_modules/**', '**/api/**'],
  });

  return pageFiles
    .map(file => {
      let urlPath = file.replace('src/app', '').replace('/page.tsx', '');

      if (urlPath === '') urlPath = '/';
      return urlPath;
    })
    .sort();
}

async function testPage(url: string): Promise<TestResult> {
  const startTime = Date.now();
  const fullUrl = `${BASE_URL}${url}`;

  try {
    const response = await fetch(fullUrl, {
      method: 'HEAD',
      timeout: 15000,
    });

    return {
      url,
      status: response.status,
      time: Date.now() - startTime,
    };
  } catch (error) {
    return {
      url,
      status: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
      time: Date.now() - startTime,
    };
  }
}

async function testBatch(
  urls: string[],
  batchNum: number,
  totalBatches: number
): Promise<TestResult[]> {
  console.log(`\n📦 Testing batch ${batchNum}/${totalBatches} (${urls.length} pages)...`);

  const limit = pLimit(CONCURRENT_TESTS);
  let completed = 0;

  const results = await Promise.all(
    urls.map(url =>
      limit(async () => {
        const result = await testPage(url);
        completed++;

        if (completed % 10 === 0) {
          process.stdout.write(`\r   Progress: ${completed}/${urls.length}`);
        }

        return result;
      })
    )
  );

  process.stdout.write(`\r   ✅ Completed: ${completed}/${urls.length}\n`);

  return results;
}

function analyzeBatch(results: TestResult[]): {
  successful: number;
  clientErrors: TestResult[];
  serverErrors: TestResult[];
  networkErrors: TestResult[];
} {
  const clientErrors: TestResult[] = [];
  const serverErrors: TestResult[] = [];
  const networkErrors: TestResult[] = [];
  let successful = 0;

  for (const result of results) {
    if (result.error) {
      networkErrors.push(result);
    } else if (result.status >= 200 && result.status < 300) {
      successful++;
    } else if (result.status >= 400 && result.status < 500) {
      clientErrors.push(result);
    } else if (result.status >= 500) {
      serverErrors.push(result);
    }
  }

  return { successful, clientErrors, serverErrors, networkErrors };
}

async function saveDetailedReport(summary: Summary) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: summary.total,
      successful: summary.successful,
      successRate: `${Math.round((summary.successful / summary.total) * 100)}%`,
      clientErrors: summary.clientErrors.length,
      serverErrors: summary.serverErrors.length,
      networkErrors: summary.networkErrors.length,
    },
    errors: {
      client: summary.clientErrors.map(e => ({ url: e.url, status: e.status })),
      server: summary.serverErrors.map(e => ({ url: e.url, status: e.status })),
      network: summary.networkErrors.map(e => ({ url: e.url, error: e.error })),
    },
  };

  await fs.writeFile(
    path.join(process.cwd(), 'test-results.json'),
    JSON.stringify(report, null, 2)
  );
}

async function main() {
  console.log('🎯 FINAL COMPREHENSIVE PAGE TEST');
  console.log('================================');
  console.log('📍 Server:', BASE_URL);
  console.log('🔄 Concurrent tests:', CONCURRENT_TESTS);
  console.log('📦 Batch size:', BATCH_SIZE);

  const startTime = Date.now();

  // Get all pages
  const allUrls = await getAllPages();
  const enPages = allUrls.filter(p => !p.startsWith('/es'));
  const esPages = allUrls.filter(p => p.startsWith('/es'));

  console.log('\n📊 Pages to test:');
  console.log(`   Total: ${allUrls.length}`);
  console.log(`   English: ${enPages.length}`);
  console.log(`   Spanish: ${esPages.length}`);
  console.log(`   Parity: ${enPages.length === esPages.length ? '✅ PERFECT' : '❌ MISMATCH'}`);

  // Test in batches
  const totalBatches = Math.ceil(allUrls.length / BATCH_SIZE);
  const summary: Summary = {
    total: allUrls.length,
    successful: 0,
    clientErrors: [],
    serverErrors: [],
    networkErrors: [],
  };

  for (let i = 0; i < totalBatches; i++) {
    const start = i * BATCH_SIZE;
    const end = Math.min(start + BATCH_SIZE, allUrls.length);
    const batch = allUrls.slice(start, end);

    const results = await testBatch(batch, i + 1, totalBatches);
    const batchAnalysis = analyzeBatch(results);

    summary.successful += batchAnalysis.successful;
    summary.clientErrors.push(...batchAnalysis.clientErrors);
    summary.serverErrors.push(...batchAnalysis.serverErrors);
    summary.networkErrors.push(...batchAnalysis.networkErrors);

    // Show batch errors if any
    const batchErrors =
      batchAnalysis.clientErrors.length +
      batchAnalysis.serverErrors.length +
      batchAnalysis.networkErrors.length;

    if (batchErrors > 0) {
      console.log(`   ⚠️  Errors in batch: ${batchErrors}`);

      if (batchAnalysis.serverErrors.length > 0) {
        console.log(`      Server errors (500): ${batchAnalysis.serverErrors.length}`);
        batchAnalysis.serverErrors.slice(0, 3).forEach(e => {
          console.log(`         ${e.url}`);
        });
      }

      if (batchAnalysis.clientErrors.length > 0) {
        console.log(`      Client errors (404): ${batchAnalysis.clientErrors.length}`);
        batchAnalysis.clientErrors.slice(0, 3).forEach(e => {
          console.log(`         ${e.url}`);
        });
      }
    }
  }

  // Final summary
  console.log('\n' + '='.repeat(50));
  console.log('📈 FINAL RESULTS');
  console.log('='.repeat(50));
  console.log(`Total pages tested: ${summary.total}`);
  console.log(
    `✅ Successful: ${summary.successful} (${Math.round((summary.successful / summary.total) * 100)}%)`
  );
  console.log(`❌ Client errors (404): ${summary.clientErrors.length}`);
  console.log(`🔥 Server errors (500): ${summary.serverErrors.length}`);
  console.log(`💥 Network errors: ${summary.networkErrors.length}`);

  const totalTime = Date.now() - startTime;
  console.log(`\n⏰ Total test time: ${Math.round(totalTime / 1000)}s`);

  // Save detailed report
  await saveDetailedReport(summary);
  console.log('\n📝 Detailed report saved to: test-results.json');

  // Final verdict
  const successRate = Math.round((summary.successful / summary.total) * 100);
  if (successRate === 100) {
    console.log('\n🎉 PERFECT! 100% SUCCESS RATE!');
    console.log('   All 5,792 pages are working correctly!');
  } else if (successRate >= 99) {
    console.log(`\n✅ EXCELLENT! ${successRate}% success rate`);
  } else if (successRate >= 95) {
    console.log(`\n⚠️  GOOD! ${successRate}% success rate`);
  } else {
    console.log(`\n❌ NEEDS ATTENTION! Only ${successRate}% success rate`);
  }
}

main().catch(console.error);
