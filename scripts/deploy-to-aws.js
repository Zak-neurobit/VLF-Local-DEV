#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
require('dotenv').config();

const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'vasquezlawnc-website';
const DISTRIBUTION_ID = process.env.AWS_CLOUDFRONT_DISTRIBUTION_ID;
const REGION = process.env.AWS_REGION || 'us-east-1';

console.log('🚀 Deploying to AWS S3...');

if (!fs.existsSync('out')) {
  console.error('❌ No build output found. Run npm run build:full first.');
  process.exit(1);
}

try {
  // Check AWS CLI is installed
  execSync('aws --version', { stdio: 'pipe' });
} catch (error) {
  console.error('❌ AWS CLI not found. Please install it first.');
  console.log('Visit: https://aws.amazon.com/cli/');
  process.exit(1);
}

try {
  // Sync to S3 with optimized settings
  console.log(`\n📤 Syncing to s3://${BUCKET_NAME}...`);

  // HTML files - shorter cache
  execSync(
    `aws s3 sync out/ s3://${BUCKET_NAME} \
    --delete \
    --exclude "*" \
    --include "*.html" \
    --cache-control "public, max-age=3600" \
    --content-type "text/html; charset=utf-8"`,
    { stdio: 'inherit' }
  );

  // Static assets - longer cache
  execSync(
    `aws s3 sync out/ s3://${BUCKET_NAME} \
    --exclude "*.html" \
    --cache-control "public, max-age=31536000, immutable"`,
    { stdio: 'inherit' }
  );

  // Create CloudFront invalidation
  if (DISTRIBUTION_ID) {
    console.log('\n🔄 Creating CloudFront invalidation...');
    execSync(
      `aws cloudfront create-invalidation \
      --distribution-id ${DISTRIBUTION_ID} \
      --paths "/*"`,
      { stdio: 'inherit' }
    );
  }

  console.log('\n✅ Deployment completed successfully!');
  console.log(`🌐 Site available at: https://${BUCKET_NAME}.s3-website-${REGION}.amazonaws.com`);
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
