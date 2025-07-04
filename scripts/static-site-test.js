#!/usr/bin/env node

/**
 * Static Site Testing Script
 * Tests site structure and code without requiring a running server
 */

const fs = require('fs').promises;
const path = require('path');

// Test configuration
const PROJECT_ROOT = process.cwd();
const SRC_DIR = path.join(PROJECT_ROOT, 'src');
const APP_DIR = path.join(SRC_DIR, 'app');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');
const SERVICES_DIR = path.join(SRC_DIR, 'services');
const LIB_DIR = path.join(SRC_DIR, 'lib');

// Test results storage
const testResults = {
  timestamp: new Date().toISOString(),
  tests: {
    pages: { passed: 0, failed: 0, total: 0, details: [] },
    spanish: { passed: 0, failed: 0, total: 0, details: [] },
    chatbot: { passed: 0, failed: 0, total: 0, details: [] },
    blog: { passed: 0, failed: 0, total: 0, details: [] },
    seo: { passed: 0, failed: 0, total: 0, details: [] },
    agents: { passed: 0, failed: 0, total: 0, details: [] },
    api: { passed: 0, failed: 0, total: 0, details: [] }
  },
  summary: {
    totalPassed: 0,
    totalFailed: 0,
    totalTests: 0
  }
};

// Utility functions
function log(message, type = 'info') {
  const prefix = {
    info: '📋',
    success: '✅',
    error: '❌',
    warning: '⚠️',
    test: '🧪'
  };
  console.log(`${prefix[type] || ''} ${message}`);
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readFile(filePath) {
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    return null;
  }
}

async function getDirectories(source) {
  try {
    const entries = await fs.readdir(source, { withFileTypes: true });
    return entries.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
  } catch {
    return [];
  }
}

async function getFiles(source) {
  try {
    const entries = await fs.readdir(source, { withFileTypes: true });
    return entries.filter(dirent => dirent.isFile()).map(dirent => dirent.name);
  } catch {
    return [];
  }
}

// Test functions
async function testPageStructure() {
  log('Testing page structure and 404 handling...', 'test');
  
  const requiredPages = [
    { path: 'page.tsx', name: 'Homepage' },
    { path: 'attorneys/page.tsx', name: 'Attorneys listing' },
    { path: 'practice-areas/page.tsx', name: 'Practice Areas' },
    { path: 'contact/page.tsx', name: 'Contact' },
    { path: 'blog/page.tsx', name: 'Blog' },
    { path: 'testimonials/page.tsx', name: 'Testimonials' },
    { path: 'scholarship/page.tsx', name: 'Scholarship' },
    { path: 'locations/page.tsx', name: 'Locations' },
    { path: 'privacy-policy/page.tsx', name: 'Privacy Policy' },
    { path: 'sitemap/page.tsx', name: 'Sitemap' },
    { path: 'not-found.tsx', name: '404 Page' },
    
    // Spanish pages
    { path: 'es/page.tsx', name: 'Spanish Homepage' },
    { path: 'es/abogados/page.tsx', name: 'Spanish Attorneys' },
    { path: 'es/contacto/page.tsx', name: 'Spanish Contact' },
    { path: 'es/blog/page.tsx', name: 'Spanish Blog' },
    
    // Attorney pages
    { path: 'attorneys/william-vasquez/page.tsx', name: 'William Vasquez' },
    { path: 'attorneys/judith-parkes/page.tsx', name: 'Judith Parkes' },
    { path: 'attorneys/christopher-afanador/page.tsx', name: 'Christopher Afanador' },
    
    // Practice area pages
    { path: 'practice-areas/immigration/page.tsx', name: 'Immigration' },
    { path: 'practice-areas/personal-injury/page.tsx', name: 'Personal Injury' },
    { path: 'practice-areas/criminal-defense/page.tsx', name: 'Criminal Defense' },
    { path: 'practice-areas/family-law/page.tsx', name: 'Family Law' },
    { path: 'practice-areas/workers-compensation/page.tsx', name: 'Workers Compensation' },
    
    // Location pages
    { path: 'locations/charlotte/page.tsx', name: 'Charlotte Office' },
    { path: 'locations/raleigh/page.tsx', name: 'Raleigh Office' },
    { path: 'locations/orlando/page.tsx', name: 'Orlando Office' }
  ];
  
  for (const page of requiredPages) {
    const fullPath = path.join(APP_DIR, page.path);
    const exists = await fileExists(fullPath);
    
    testResults.tests.pages.total++;
    if (exists) {
      testResults.tests.pages.passed++;
      log(`${page.name}: Found at ${page.path}`, 'success');
    } else {
      testResults.tests.pages.failed++;
      log(`${page.name}: Missing at ${page.path}`, 'error');
    }
    
    testResults.tests.pages.details.push({
      name: page.name,
      path: page.path,
      exists
    });
  }
}

async function testSpanishTranslations() {
  log('Testing Spanish translations...', 'test');
  
  const spanishFiles = [
    { path: 'es/page.tsx', name: 'Spanish Homepage' },
    { path: 'es/abogados/page.tsx', name: 'Spanish Attorneys' },
    { path: 'es/areas-de-practica/page.tsx', name: 'Spanish Practice Areas' },
    { path: 'es/contacto/page.tsx', name: 'Spanish Contact' },
    { path: 'es/blog/page.tsx', name: 'Spanish Blog' },
    { path: 'es/testimonios/page.tsx', name: 'Spanish Testimonials' },
    { path: 'es/politica-privacidad/page.tsx', name: 'Spanish Privacy Policy' }
  ];
  
  // Check translation files
  const translationFile = path.join(LIB_DIR, 'i18n/locales/es.json');
  const hasTranslationFile = await fileExists(translationFile);
  
  testResults.tests.spanish.total++;
  if (hasTranslationFile) {
    testResults.tests.spanish.passed++;
    log('Spanish translation file found', 'success');
    
    // Check content
    const content = await readFile(translationFile);
    if (content) {
      try {
        const translations = JSON.parse(content);
        const keyCount = Object.keys(translations).length;
        log(`Spanish translations contain ${keyCount} keys`, 'info');
      } catch (error) {
        log('Spanish translation file is invalid JSON', 'error');
      }
    }
  } else {
    testResults.tests.spanish.failed++;
    log('Spanish translation file missing', 'error');
  }
  
  // Check Spanish pages
  for (const file of spanishFiles) {
    const fullPath = path.join(APP_DIR, file.path);
    const exists = await fileExists(fullPath);
    
    testResults.tests.spanish.total++;
    if (exists) {
      testResults.tests.spanish.passed++;
      log(`${file.name}: Found`, 'success');
      
      // Check if it contains Spanish content
      const content = await readFile(fullPath);
      if (content && content.includes('español')) {
        log(`${file.name}: Contains Spanish content`, 'success');
      }
    } else {
      testResults.tests.spanish.failed++;
      log(`${file.name}: Missing`, 'error');
    }
    
    testResults.tests.spanish.details.push({
      name: file.name,
      path: file.path,
      exists
    });
  }
}

async function testChatbotComponents() {
  log('Testing chatbot functionality...', 'test');
  
  const chatbotFiles = [
    { path: 'components/ChatWidget/index.tsx', name: 'ChatWidget Component' },
    { path: 'components/ChatWidget.tsx', name: 'ChatWidget Alternative' },
    { path: 'app/api/chat/route.ts', name: 'Chat API Endpoint' },
    { path: 'stores/chat.ts', name: 'Chat Store' },
    { path: 'types/chat.ts', name: 'Chat Types' }
  ];
  
  for (const file of chatbotFiles) {
    const fullPath = path.join(SRC_DIR, file.path);
    const exists = await fileExists(fullPath);
    
    testResults.tests.chatbot.total++;
    if (exists) {
      testResults.tests.chatbot.passed++;
      log(`${file.name}: Found`, 'success');
      
      // Check content
      const content = await readFile(fullPath);
      if (content) {
        if (content.includes('OpenAI') || content.includes('openai')) {
          log(`${file.name}: Uses OpenAI integration`, 'info');
        }
        if (content.includes('language') || content.includes('español')) {
          log(`${file.name}: Supports multiple languages`, 'info');
        }
      }
    } else {
      testResults.tests.chatbot.failed++;
      log(`${file.name}: Missing`, 'error');
    }
    
    testResults.tests.chatbot.details.push({
      name: file.name,
      path: file.path,
      exists
    });
  }
}

async function testBlogSystem() {
  log('Testing blog categorization and functionality...', 'test');
  
  // Check blog structure
  const blogDir = path.join(APP_DIR, 'blog');
  const categoryDir = path.join(blogDir, 'category');
  
  // Check if blog directory exists
  const blogExists = await fileExists(blogDir);
  testResults.tests.blog.total++;
  if (blogExists) {
    testResults.tests.blog.passed++;
    log('Blog directory exists', 'success');
  } else {
    testResults.tests.blog.failed++;
    log('Blog directory missing', 'error');
    return;
  }
  
  // Check categories
  const expectedCategories = ['immigration', 'criminal-defense', 'family-law', 'personal-injury', 'workers-compensation'];
  const categoriesExist = await fileExists(categoryDir);
  
  if (categoriesExist) {
    const categories = await getDirectories(categoryDir);
    
    for (const category of expectedCategories) {
      testResults.tests.blog.total++;
      if (categories.includes(category)) {
        testResults.tests.blog.passed++;
        log(`Blog category '${category}' exists`, 'success');
      } else {
        testResults.tests.blog.failed++;
        log(`Blog category '${category}' missing`, 'error');
      }
    }
  } else {
    log('Blog category directory missing', 'error');
  }
  
  // Check blog API endpoints
  const blogApiFiles = [
    { path: 'app/api/blog/route.ts', name: 'Blog API' },
    { path: 'app/api/blog/[slug]/route.ts', name: 'Blog Slug API' },
    { path: 'app/api/blog/rss/route.ts', name: 'Blog RSS Feed' },
    { path: 'app/api/blog/sitemap/route.ts', name: 'Blog Sitemap' }
  ];
  
  for (const file of blogApiFiles) {
    const fullPath = path.join(SRC_DIR, file.path);
    const exists = await fileExists(fullPath);
    
    testResults.tests.blog.total++;
    if (exists) {
      testResults.tests.blog.passed++;
      log(`${file.name}: Found`, 'success');
    } else {
      testResults.tests.blog.failed++;
      log(`${file.name}: Missing`, 'error');
    }
  }
  
  // Check for blog posts
  const blogFiles = await getFiles(blogDir);
  const blogPosts = blogFiles.filter(f => !['page.tsx', 'layout.tsx', 'metadata.ts'].includes(f));
  log(`Found ${blogPosts.length} blog post directories`, 'info');
}

async function testSEOImplementation() {
  log('Testing SEO elements...', 'test');
  
  const seoFiles = [
    { path: 'app/sitemap.ts', name: 'Sitemap Generator' },
    { path: 'app/robots.ts', name: 'Robots.txt' },
    { path: 'components/SEO/MetaTags.tsx', name: 'Meta Tags Component' },
    { path: 'components/SEO/StructuredData.tsx', name: 'Structured Data' },
    { path: 'components/SEO/HreflangTags.tsx', name: 'Hreflang Tags' }
  ];
  
  for (const file of seoFiles) {
    const fullPath = path.join(SRC_DIR, file.path);
    const exists = await fileExists(fullPath);
    
    testResults.tests.seo.total++;
    if (exists) {
      testResults.tests.seo.passed++;
      log(`${file.name}: Found`, 'success');
      
      // Check content
      const content = await readFile(fullPath);
      if (content) {
        if (file.name === 'Sitemap Generator' && content.includes('export default function sitemap')) {
          log('Sitemap generator properly exported', 'info');
        }
        if (file.name === 'Structured Data' && content.includes('application/ld+json')) {
          log('Structured data includes JSON-LD', 'info');
        }
      }
    } else {
      testResults.tests.seo.failed++;
      log(`${file.name}: Missing`, 'error');
    }
  }
  
  // Check for SEO in pages
  const homepage = await readFile(path.join(APP_DIR, 'page.tsx'));
  if (homepage) {
    testResults.tests.seo.total++;
    if (homepage.includes('metadata') || homepage.includes('generateMetadata')) {
      testResults.tests.seo.passed++;
      log('Homepage has metadata configuration', 'success');
    } else {
      testResults.tests.seo.failed++;
      log('Homepage missing metadata configuration', 'error');
    }
  }
}

async function testAIAgents() {
  log('Testing trained AI agents...', 'test');
  
  const agentFiles = [
    { path: 'lib/agents/lead-validation-agent.ts', name: 'Lead Validation Agent' },
    { path: 'lib/agents/follow-up-automation-agent.ts', name: 'Follow-up Agent' },
    { path: 'lib/agents/agent-orchestrator.ts', name: 'Agent Orchestrator' },
    { path: 'lib/crewai/enhanced-crew-coordinator.ts', name: 'CrewAI Coordinator' },
    { path: 'services/agents/agent-manager.ts', name: 'Agent Manager' },
    { path: 'app/api/agents/lead-validation/route.ts', name: 'Lead Validation API' },
    { path: 'app/api/agents/monitor/route.ts', name: 'Agent Monitor API' }
  ];
  
  for (const file of agentFiles) {
    const fullPath = path.join(SRC_DIR, file.path);
    const exists = await fileExists(fullPath);
    
    testResults.tests.agents.total++;
    if (exists) {
      testResults.tests.agents.passed++;
      log(`${file.name}: Found`, 'success');
      
      // Check content
      const content = await readFile(fullPath);
      if (content) {
        if (content.includes('OpenAI') || content.includes('GPT')) {
          log(`${file.name}: Uses AI integration`, 'info');
        }
        if (content.includes('GoHighLevel') || content.includes('GHL')) {
          log(`${file.name}: Integrates with GoHighLevel`, 'info');
        }
      }
    } else {
      testResults.tests.agents.failed++;
      log(`${file.name}: Missing`, 'error');
    }
  }
  
  // Check training data
  const trainingDataPath = path.join(SRC_DIR, 'config/agents/training-data');
  const hasTrainingData = await fileExists(trainingDataPath);
  
  testResults.tests.agents.total++;
  if (hasTrainingData) {
    testResults.tests.agents.passed++;
    log('Agent training data directory found', 'success');
    
    const trainingFiles = await getFiles(trainingDataPath);
    log(`Found ${trainingFiles.length} training data files`, 'info');
  } else {
    testResults.tests.agents.failed++;
    log('Agent training data directory missing', 'error');
  }
}

async function testAPIEndpoints() {
  log('Testing API endpoints structure...', 'test');
  
  const apiEndpoints = [
    { path: 'app/api/deploy-check/route.ts', name: 'Deploy Check API' },
    { path: 'app/api/health/route.ts', name: 'Health Check API' },
    { path: 'app/api/contact/route.ts', name: 'Contact Form API' },
    { path: 'app/api/newsletter/route.ts', name: 'Newsletter API' },
    { path: 'app/api/chat/route.ts', name: 'Chat API' },
    { path: 'app/api/leads/capture/route.ts', name: 'Lead Capture API' },
    { path: 'app/api/crewai/intake/route.ts', name: 'CrewAI Intake API' },
    { path: 'app/api/agents/health/route.ts', name: 'Agents Health API' }
  ];
  
  for (const endpoint of apiEndpoints) {
    const fullPath = path.join(SRC_DIR, endpoint.path);
    const exists = await fileExists(fullPath);
    
    testResults.tests.api.total++;
    if (exists) {
      testResults.tests.api.passed++;
      log(`${endpoint.name}: Found`, 'success');
      
      // Check if it exports required methods
      const content = await readFile(fullPath);
      if (content) {
        const methods = ['GET', 'POST', 'PUT', 'DELETE'];
        const exportedMethods = methods.filter(m => content.includes(`export async function ${m}`));
        if (exportedMethods.length > 0) {
          log(`${endpoint.name}: Exports ${exportedMethods.join(', ')}`, 'info');
        }
      }
    } else {
      testResults.tests.api.failed++;
      log(`${endpoint.name}: Missing`, 'error');
    }
  }
}

async function generateReport() {
  log('Generating test report...', 'info');
  
  // Calculate totals
  for (const category of Object.keys(testResults.tests)) {
    testResults.summary.totalPassed += testResults.tests[category].passed;
    testResults.summary.totalFailed += testResults.tests[category].failed;
    testResults.summary.totalTests += testResults.tests[category].total;
  }
  
  // Generate markdown report
  const report = `# VLF Website Static Test Report

**Generated**: ${new Date().toLocaleString()}  
**Type**: Static Code Analysis (No Server Required)

## Summary

- **Total Tests**: ${testResults.summary.totalTests}
- **Passed**: ${testResults.summary.totalPassed} (${((testResults.summary.totalPassed / testResults.summary.totalTests) * 100).toFixed(1)}%)
- **Failed**: ${testResults.summary.totalFailed} (${((testResults.summary.totalFailed / testResults.summary.totalTests) * 100).toFixed(1)}%)

## Test Categories

### 1. Page Structure (404 Prevention)
- **Total**: ${testResults.tests.pages.total}
- **Passed**: ${testResults.tests.pages.passed}
- **Failed**: ${testResults.tests.pages.failed}

${testResults.tests.pages.details.filter(d => !d.exists).length > 0 ? `
**Missing Pages**:
${testResults.tests.pages.details.filter(d => !d.exists).map(d => `- ${d.name}: ${d.path}`).join('\n')}
` : '✅ All required pages exist'}

### 2. Spanish Translations
- **Total**: ${testResults.tests.spanish.total}
- **Passed**: ${testResults.tests.spanish.passed}
- **Failed**: ${testResults.tests.spanish.failed}

${testResults.tests.spanish.details.filter(d => !d.exists).length > 0 ? `
**Missing Spanish Pages**:
${testResults.tests.spanish.details.filter(d => !d.exists).map(d => `- ${d.name}: ${d.path}`).join('\n')}
` : '✅ All Spanish pages exist'}

### 3. Chatbot Components
- **Total**: ${testResults.tests.chatbot.total}
- **Passed**: ${testResults.tests.chatbot.passed}
- **Failed**: ${testResults.tests.chatbot.failed}

${testResults.tests.chatbot.details.filter(d => !d.exists).length > 0 ? `
**Missing Chatbot Components**:
${testResults.tests.chatbot.details.filter(d => !d.exists).map(d => `- ${d.name}: ${d.path}`).join('\n')}
` : '✅ All chatbot components exist'}

### 4. Blog System
- **Total**: ${testResults.tests.blog.total}
- **Passed**: ${testResults.tests.blog.passed}
- **Failed**: ${testResults.tests.blog.failed}

### 5. SEO Implementation
- **Total**: ${testResults.tests.seo.total}
- **Passed**: ${testResults.tests.seo.passed}
- **Failed**: ${testResults.tests.seo.failed}

### 6. AI Agents
- **Total**: ${testResults.tests.agents.total}
- **Passed**: ${testResults.tests.agents.passed}
- **Failed**: ${testResults.tests.agents.failed}

${testResults.tests.agents.details ? testResults.tests.agents.details.filter(d => !d.exists).length > 0 ? `
**Missing Agent Components**:
${testResults.tests.agents.details.filter(d => !d.exists).map(d => `- ${d.name}`).join('\n')}
` : '✅ All agent components exist' : ''}

### 7. API Endpoints
- **Total**: ${testResults.tests.api.total}
- **Passed**: ${testResults.tests.api.passed}
- **Failed**: ${testResults.tests.api.failed}

${testResults.tests.api.details ? testResults.tests.api.details.filter(d => !d.exists).length > 0 ? `
**Missing API Endpoints**:
${testResults.tests.api.details.filter(d => !d.exists).map(d => `- ${d.name}: ${d.path}`).join('\n')}
` : '✅ All API endpoints exist' : ''}

## Recommendations

${testResults.summary.totalFailed > 0 ? `
### Issues to Fix

1. **Missing Pages**: Create any missing page files to prevent 404 errors
2. **Spanish Content**: Ensure all Spanish translations are complete
3. **API Endpoints**: Implement any missing API routes
4. **Agent Components**: Verify all AI agent files are properly created

### Next Steps

1. Run \`npm run build\` to verify the build process
2. Start the dev server with \`npm run dev\` for runtime testing
3. Fix any TypeScript or linting errors
4. Deploy to staging for full integration testing
` : `
### ✅ All Tests Passed!

The codebase structure looks complete. Next steps:
1. Run \`npm run build\` to verify compilation
2. Start dev server with \`npm run dev\` for runtime testing
3. Run integration tests with live server
4. Deploy to production
`}

## File Structure Health

- **Pages**: ${testResults.tests.pages.passed}/${testResults.tests.pages.total} exist
- **Spanish Pages**: ${testResults.tests.spanish.passed}/${testResults.tests.spanish.total} exist
- **API Routes**: ${testResults.tests.api.passed}/${testResults.tests.api.total} exist
- **Components**: Chatbot, SEO, and Agent components checked

---
*This was a static analysis. For full functionality testing, run the server and use the comprehensive test suite.*
`;

  // Save report
  const reportPath = path.join(PROJECT_ROOT, 'STATIC-TEST-REPORT.md');
  await fs.writeFile(reportPath, report);
  
  // Save JSON results
  const jsonPath = path.join(PROJECT_ROOT, 'static-test-results.json');
  await fs.writeFile(jsonPath, JSON.stringify(testResults, null, 2));
  
  log(`Test report saved to: ${reportPath}`, 'success');
  log(`JSON results saved to: ${jsonPath}`, 'success');
  
  return report;
}

// Main test runner
async function runTests() {
  try {
    log('VLF Website Static Testing', 'info');
    log('==========================', 'info');
    log('Testing without requiring a running server...', 'info');
    log('', 'info');
    
    // Run all tests
    await testPageStructure();
    await testSpanishTranslations();
    await testChatbotComponents();
    await testBlogSystem();
    await testSEOImplementation();
    await testAIAgents();
    await testAPIEndpoints();
    
    // Generate report
    const report = await generateReport();
    
    // Display summary
    log('', 'info');
    log('Test Summary:', 'info');
    log(`Total: ${testResults.summary.totalTests} tests`, 'info');
    log(`Passed: ${testResults.summary.totalPassed} (${((testResults.summary.totalPassed / testResults.summary.totalTests) * 100).toFixed(1)}%)`, 'success');
    log(`Failed: ${testResults.summary.totalFailed} (${((testResults.summary.totalFailed / testResults.summary.totalTests) * 100).toFixed(1)}%)`, testResults.summary.totalFailed > 0 ? 'error' : 'success');
    
    // Provide guidance
    log('', 'info');
    if (testResults.summary.totalFailed > 0) {
      log('⚠️  Some tests failed. Check the report for details.', 'warning');
      log('Run `npm run build` to check for compilation errors.', 'info');
    } else {
      log('✅ All static tests passed!', 'success');
      log('Next: Run `npm run dev` and use comprehensive-site-test.js for runtime testing.', 'info');
    }
    
  } catch (error) {
    log(`Test runner error: ${error.message}`, 'error');
    console.error(error);
  }
}

// Run tests
runTests().catch(console.error);