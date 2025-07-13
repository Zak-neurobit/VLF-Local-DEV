#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

const API_ROUTES_TO_FIX = [
  // Admin & Monitoring
  'src/app/api/admin/cache/route.ts',
  'src/app/api/agents/metrics/route.ts',
  'src/app/api/agents/restart/route.ts',
  'src/app/api/crews/metrics/route.ts',
  'src/app/api/dashboard/sessions/route.ts',
  
  // Analytics
  'src/app/api/analytics/events/route.ts',
  'src/app/api/analytics/page-views/route.ts',
  'src/app/api/dashboard/overview/route.ts',
  
  // Blog & SEO
  'src/app/api/blog/import/route.ts',
  'src/app/api/seo-domination/query/route.ts',
  'src/app/api/seo-domination/search/route.ts',
  'src/app/api/content-factory/generate/route.ts',
  'src/app/api/crewai/execute/[crewName]/route.ts',
  'src/app/api/crewai/run/[crewName]/route.ts',
  
  // CrewAI
  'src/app/api/crewai/agent-army/deploy/route.ts',
  'src/app/api/crewai/deploy/route.ts',
  'src/app/api/crewai/manager/route.ts',
  'src/app/api/crewai/orchestrator/route.ts',
  'src/app/api/crewai/report/route.ts',
  'src/app/api/crewai/status/route.ts',
  
  // Crew Management
  'src/app/api/crews/deploy/route.ts',
  'src/app/api/crews/logs/route.ts',
  'src/app/api/crews/status/route.ts',
  'src/app/api/crews/tasks/route.ts',
  
  // Payment & Integrations
  'src/app/api/payments/route.ts',
  'src/app/api/payment/create/route.ts',
  'src/app/api/payment/subscription/route.ts',
  'src/app/api/ghl/contacts/route.ts',
  'src/app/api/ghl/webhook/route.ts',
  'src/app/api/retell/agents/route.ts',
  'src/app/api/retell/phone-numbers/route.ts',
  
  // Other
  'src/app/api/analytics/route.ts',
  'src/app/api/cases/[caseId]/route.ts',
  'src/app/api/cases/route.ts',
  'src/app/api/chat/route.ts',
  'src/app/api/email/send/route.ts',
  'src/app/api/hodos/[...path]/route.ts',
  'src/app/api/leads/capture/route.ts',
  'src/app/api/location/route.ts',
  'src/app/api/reviews/route.ts',
  'src/app/api/webhooks/retell/route.ts',
  'src/app/api/webhooks/stripe/route.ts',
];

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function fixRoute(filePath: string): Promise<boolean> {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    
    if (!await fileExists(fullPath)) {
      console.log(`❌ File not found: ${filePath}`);
      return false;
    }
    
    const content = await fs.readFile(fullPath, 'utf-8');
    
    // Check if already has dynamic export
    if (content.includes("export const dynamic = 'force-dynamic'")) {
      console.log(`✅ Already fixed: ${filePath}`);
      return true;
    }
    
    // Find the right place to insert (after imports)
    const lines = content.split('\n');
    let insertIndex = 0;
    let lastImportIndex = -1;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('import ') || line.startsWith('import{')) {
        lastImportIndex = i;
      }
      // Stop at first non-import, non-comment line
      if (lastImportIndex !== -1 && 
          !line.startsWith('import') && 
          !line.startsWith('//') && 
          !line.startsWith('/*') &&
          line !== '') {
        insertIndex = lastImportIndex + 1;
        break;
      }
    }
    
    // If no imports found, add at the beginning
    if (insertIndex === 0) {
      insertIndex = 0;
    }
    
    // Insert the dynamic export
    lines.splice(insertIndex + 1, 0, '', "export const dynamic = 'force-dynamic';");
    
    // Check if it's a NextAuth route and needs runtime export
    if (content.includes('getServerSession') || content.includes('next-auth')) {
      lines.splice(insertIndex + 2, 0, "export const runtime = 'nodejs';");
    }
    
    // Write the fixed content
    await fs.writeFile(fullPath, lines.join('\n'));
    console.log(`✅ Fixed: ${filePath}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error);
    return false;
  }
}

async function main() {
  console.log('🔧 Fixing Dynamic Server Usage Errors\n');
  console.log(`Found ${API_ROUTES_TO_FIX.length} routes to fix\n`);
  
  let fixed = 0;
  let failed = 0;
  let alreadyFixed = 0;
  
  for (const route of API_ROUTES_TO_FIX) {
    const result = await fixRoute(route);
    if (result) {
      if (route.includes('Already fixed')) {
        alreadyFixed++;
      } else {
        fixed++;
      }
    } else {
      failed++;
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`✅ Fixed: ${fixed}`);
  console.log(`✅ Already fixed: ${alreadyFixed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📁 Total: ${API_ROUTES_TO_FIX.length}`);
  
  if (failed > 0) {
    console.log('\n⚠️  Some routes failed to fix. Please check the errors above.');
    process.exit(1);
  } else {
    console.log('\n🎉 All routes fixed successfully!');
    console.log('\nNext steps:');
    console.log('1. Run: npm run verify:dynamic');
    console.log('2. Run: npm run build');
    console.log('3. Test the API routes');
  }
}

main().catch(console.error);