#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 AWS Hybrid Deployment - Static + Dynamic Features');
console.log('================================================');

// Configuration
const config = {
  staticBucket: process.env.AWS_STATIC_BUCKET || 'vasquezlaw-static',
  region: process.env.AWS_REGION || 'us-east-1',
  ecrRepo: process.env.ECR_REPO || 'vasquezlaw/nextjs-app',
  ecsCluster: process.env.ECS_CLUSTER || 'vasquezlaw-cluster',
  ecsService: process.env.ECS_SERVICE || 'vasquezlaw-web',
};

// Step 1: Build static pages
console.log('\n📦 Step 1: Building static pages...');
try {
  // Prepare for static build
  execSync('node scripts/prepare-full-static-build.js', { stdio: 'inherit' });

  // Build static pages with all content
  execSync('NODE_OPTIONS="--max-old-space-size=32768" next build', {
    stdio: 'inherit',
    env: { ...process.env, STATIC_BUILD: 'true' },
  });

  console.log('✅ Static pages built successfully');
} catch (error) {
  console.error('❌ Static build failed:', error.message);
  process.exit(1);
}

// Step 2: Deploy static assets to S3
console.log('\n☁️ Step 2: Deploying static assets to S3...');
try {
  // HTML pages with shorter cache
  execSync(
    `aws s3 sync out/ s3://${config.staticBucket} \
    --delete \
    --exclude "*" \
    --include "*.html" \
    --cache-control "public, max-age=3600" \
    --content-type "text/html; charset=utf-8"`,
    { stdio: 'inherit' }
  );

  // Static assets with long cache
  execSync(
    `aws s3 sync out/_next/static s3://${config.staticBucket}/_next/static \
    --cache-control "public, max-age=31536000, immutable"`,
    { stdio: 'inherit' }
  );

  // Images and other assets
  execSync(
    `aws s3 sync public/ s3://${config.staticBucket}/ \
    --exclude "*.html" \
    --cache-control "public, max-age=31536000, immutable"`,
    { stdio: 'inherit' }
  );

  console.log('✅ Static assets deployed to S3');
} catch (error) {
  console.error('❌ S3 deployment failed:', error.message);
  process.exit(1);
}

// Step 3: Build Docker image for dynamic features
console.log('\n🐳 Step 3: Building Docker image for dynamic features...');
try {
  // Create optimized Dockerfile for production
  const dockerfile = `
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
RUN npm run build:production

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy custom server for WebSocket support
COPY --from=builder /app/scripts/production-server.js ./server.js
COPY --from=builder /app/dist/lib/socket ./socket

USER nextjs

EXPOSE 3000 3001

ENV PORT 3000

CMD ["node", "server.js"]
`;

  fs.writeFileSync('Dockerfile.production', dockerfile);

  // Build Docker image
  execSync('docker build -f Dockerfile.production -t vasquezlaw-app .', { stdio: 'inherit' });

  console.log('✅ Docker image built successfully');
} catch (error) {
  console.error('❌ Docker build failed:', error.message);
  process.exit(1);
}

// Step 4: Push to ECR
console.log('\n📤 Step 4: Pushing image to ECR...');
try {
  // Get ECR login token
  execSync(
    `aws ecr get-login-password --region ${config.region} | docker login --username AWS --password-stdin ${config.ecrRepo}`,
    { stdio: 'inherit' }
  );

  // Tag image
  const imageTag = `${config.ecrRepo}:${Date.now()}`;
  const latestTag = `${config.ecrRepo}:latest`;

  execSync(`docker tag vasquezlaw-app ${imageTag}`, { stdio: 'inherit' });
  execSync(`docker tag vasquezlaw-app ${latestTag}`, { stdio: 'inherit' });

  // Push to ECR
  execSync(`docker push ${imageTag}`, { stdio: 'inherit' });
  execSync(`docker push ${latestTag}`, { stdio: 'inherit' });

  console.log('✅ Image pushed to ECR');
} catch (error) {
  console.error('❌ ECR push failed:', error.message);
  process.exit(1);
}

// Step 5: Deploy CrewAI agents
console.log('\n🤖 Step 5: Deploying CrewAI agents...');
try {
  // Build agents container
  const agentsDockerfile = `
FROM python:3.11-slim AS base
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    nodejs npm curl git \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Node dependencies for TypeScript
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm tsx && pnpm install --production

# Copy agent files
COPY src/agents/ ./src/agents/
COPY scripts/crewai-startup-system.ts ./scripts/
COPY scripts/launch-autonomous-system.ts ./scripts/

# Environment setup
ENV NODE_ENV production
ENV PYTHONUNBUFFERED 1

EXPOSE 8080

CMD ["tsx", "scripts/launch-autonomous-system.ts"]
`;

  fs.writeFileSync('Dockerfile.agents', agentsDockerfile);

  // Build and push agents image
  execSync('docker build -f Dockerfile.agents -t vasquezlaw-agents .', { stdio: 'inherit' });

  const agentsTag = `${config.ecrRepo.replace('nextjs-app', 'agents')}:latest`;
  execSync(`docker tag vasquezlaw-agents ${agentsTag}`, { stdio: 'inherit' });
  execSync(`docker push ${agentsTag}`, { stdio: 'inherit' });

  console.log('✅ CrewAI agents deployed');
} catch (error) {
  console.error('❌ Agents deployment failed:', error.message);
  process.exit(1);
}

// Step 6: Update ECS services
console.log('\n🔄 Step 6: Updating ECS services...');
try {
  // Force new deployment
  execSync(
    `aws ecs update-service \
    --cluster ${config.ecsCluster} \
    --service ${config.ecsService} \
    --force-new-deployment`,
    { stdio: 'inherit' }
  );

  // Update agents service
  execSync(
    `aws ecs update-service \
    --cluster ${config.ecsCluster} \
    --service vasquezlaw-agents \
    --force-new-deployment`,
    { stdio: 'inherit' }
  );

  console.log('✅ ECS services updated');
} catch (error) {
  console.error('❌ ECS update failed:', error.message);
  process.exit(1);
}

// Step 7: Invalidate CloudFront
console.log('\n🔄 Step 7: Invalidating CloudFront cache...');
try {
  const distributionId = process.env.CLOUDFRONT_DISTRIBUTION_ID;
  if (distributionId) {
    execSync(
      `aws cloudfront create-invalidation \
      --distribution-id ${distributionId} \
      --paths "/*"`,
      { stdio: 'inherit' }
    );
    console.log('✅ CloudFront cache invalidated');
  }
} catch (error) {
  console.error('⚠️ CloudFront invalidation failed:', error.message);
}

// Step 8: Run post-deployment checks
console.log('\n✅ Step 8: Running post-deployment checks...');

const checks = [
  {
    name: 'Static site',
    url: `https://s3.${config.region}.amazonaws.com/${config.staticBucket}/index.html`,
  },
  {
    name: 'ECS health',
    cmd: `aws ecs describe-services --cluster ${config.ecsCluster} --services ${config.ecsService} --query 'services[0].runningCount'`,
  },
  { name: 'Agent status', url: 'https://api.vasquezlawnc.com/api/crews/status' },
];

checks.forEach(check => {
  try {
    if (check.cmd) {
      const result = execSync(check.cmd, { encoding: 'utf8' });
      console.log(`✓ ${check.name}: ${result.trim()}`);
    } else if (check.url) {
      execSync(`curl -s -o /dev/null -w "%{http_code}" ${check.url}`, { stdio: 'pipe' });
      console.log(`✓ ${check.name}: OK`);
    }
  } catch (error) {
    console.error(`✗ ${check.name}: Failed`);
  }
});

console.log('\n🎉 Deployment complete!');
console.log('================================================');
console.log('Static site: https://vasquezlawnc.com');
console.log('API/Dynamic: https://api.vasquezlawnc.com');
console.log('Agents status: https://api.vasquezlawnc.com/api/crews/status');
console.log('================================================');
