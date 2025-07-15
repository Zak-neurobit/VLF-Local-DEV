#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// AILA CLE knowledge topics to extract
const KNOWLEDGE_TOPICS = {
  removal_defense: [
    'bond hearings',
    'cancellation of removal',
    'asylum',
    'withholding',
    'CAT protection',
    'voluntary departure',
    'administrative closure',
    'prosecutorial discretion',
    'motions to reopen',
    'appeals to BIA',
    'circuit court review',
  ],
  business_immigration: [
    'H-1B',
    'L-1',
    'O-1',
    'E-2',
    'PERM',
    'EB-1',
    'EB-2',
    'EB-3',
    'prevailing wage',
    'labor certification',
    'I-140',
    'premium processing',
  ],
  family_immigration: [
    'I-130',
    'adjustment of status',
    'consular processing',
    'provisional waivers',
    'extreme hardship',
    'CSPA',
    'priority dates',
    'visa bulletin',
    'affidavit of support',
    'public charge',
  ],
};

async function extractAILAKnowledge() {
  console.log('🔍 Starting AILA CLE knowledge extraction...\n');

  const desktopPath = path.join(process.env.HOME, 'Desktop');
  const ailaPath = path.join(desktopPath, 'AILA');
  const ailaCLEPath = path.join(desktopPath, 'AILA CLE');

  // Check which path exists
  let targetPath;
  if (fs.existsSync(ailaCLEPath)) {
    targetPath = ailaCLEPath;
    console.log(`✅ Found AILA CLE folder at: ${ailaCLEPath}`);
  } else if (fs.existsSync(ailaPath)) {
    targetPath = ailaPath;
    console.log(`✅ Found AILA folder at: ${ailaPath}`);
  } else {
    console.error('❌ Could not find AILA or AILA CLE folder on desktop');
    console.log('\nPlease ensure one of these folders exists:');
    console.log(`  - ${ailaPath}`);
    console.log(`  - ${ailaCLEPath}`);
    return;
  }

  // List all PDF and EPUB files
  console.log('\n📚 Scanning for training materials...');

  try {
    const { stdout } = await execPromise(
      `find "${targetPath}" -type f \\( -name "*.pdf" -o -name "*.epub" \\) | head -50`
    );
    const files = stdout
      .trim()
      .split('\n')
      .filter(f => f);

    console.log(`\nFound ${files.length} training documents:\n`);

    // Categorize files by topic
    const categorizedFiles = {
      removal_defense: [],
      business_immigration: [],
      family_immigration: [],
      general: [],
    };

    files.forEach(file => {
      const filename = path.basename(file).toLowerCase();

      if (
        filename.includes('removal') ||
        filename.includes('deportation') ||
        filename.includes('asylum') ||
        filename.includes('detention') ||
        filename.includes('bond')
      ) {
        categorizedFiles.removal_defense.push(file);
      } else if (
        filename.includes('h-1b') ||
        filename.includes('h1b') ||
        filename.includes('perm') ||
        filename.includes('business') ||
        filename.includes('employment')
      ) {
        categorizedFiles.business_immigration.push(file);
      } else if (
        filename.includes('family') ||
        filename.includes('i-130') ||
        filename.includes('adjustment') ||
        filename.includes('consular')
      ) {
        categorizedFiles.family_immigration.push(file);
      } else {
        categorizedFiles.general.push(file);
      }
    });

    // Display categorized results
    console.log('📂 Categorized Training Materials:\n');

    console.log('🚨 Removal Defense:');
    categorizedFiles.removal_defense.forEach(f => console.log(`  - ${path.basename(f)}`));

    console.log('\n💼 Business Immigration:');
    categorizedFiles.business_immigration.forEach(f => console.log(`  - ${path.basename(f)}`));

    console.log('\n👨‍👩‍👧‍👦 Family Immigration:');
    categorizedFiles.family_immigration.forEach(f => console.log(`  - ${path.basename(f)}`));

    console.log('\n📑 General Resources:');
    categorizedFiles.general.slice(0, 10).forEach(f => console.log(`  - ${path.basename(f)}`));

    // Create knowledge base structure
    const knowledgeBase = {
      removal_defense: {
        files: categorizedFiles.removal_defense.map(f => path.basename(f)),
        topics: KNOWLEDGE_TOPICS.removal_defense,
        key_resources: [
          'Immigration Court Practice Manual',
          'BIA Practice Manual',
          'Bond hearing strategies',
          'Cancellation of removal requirements',
        ],
      },
      business_immigration: {
        files: categorizedFiles.business_immigration.map(f => path.basename(f)),
        topics: KNOWLEDGE_TOPICS.business_immigration,
        key_resources: [
          'H-1B Cap and lottery process',
          'PERM recruitment requirements',
          'Prevailing wage determinations',
          'RFE response strategies',
        ],
      },
      family_immigration: {
        files: categorizedFiles.family_immigration.map(f => path.basename(f)),
        topics: KNOWLEDGE_TOPICS.family_immigration,
        key_resources: [
          'I-130 filing procedures',
          'Adjustment vs consular processing',
          'Provisional waiver requirements',
          'CSPA calculations',
        ],
      },
    };

    // Save knowledge base
    const outputPath = path.join(
      process.cwd(),
      'src/config/agents/knowledge-base/aila-knowledge.json'
    );
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(knowledgeBase, null, 2));

    console.log(`\n✅ Knowledge base saved to: ${outputPath}`);

    // Generate training recommendations
    console.log('\n📋 Training Recommendations:\n');
    console.log('1. Use PDF text extraction tools to process document content');
    console.log('2. Create topic-specific training datasets from each category');
    console.log('3. Focus on practical scenarios from AILA practice advisories');
    console.log('4. Extract form instructions and filing tips');
    console.log('5. Build a glossary of immigration terms and acronyms');
  } catch (error) {
    console.error('Error processing files:', error.message);
  }
}

// Run the extraction
extractAILAKnowledge().catch(console.error);
