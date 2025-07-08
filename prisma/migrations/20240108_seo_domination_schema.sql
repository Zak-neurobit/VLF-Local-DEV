-- SEO Domination Schema Updates
-- This migration adds tables and fields to support the autonomous SEO domination system

-- GMB Post Tracking
CREATE TABLE IF NOT EXISTS "GmbPost" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "locationId" TEXT NOT NULL,
  "platform" TEXT NOT NULL,
  "postType" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "mediaUrl" TEXT,
  "callToAction" JSONB,
  "engagement" JSONB DEFAULT '{}',
  "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Social Media Campaign Tracking
CREATE TABLE IF NOT EXISTS "SocialCampaign" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "platforms" TEXT[],
  "content" JSONB NOT NULL,
  "hashtags" TEXT[],
  "performance" JSONB DEFAULT '{}',
  "viralScore" INTEGER DEFAULT 0,
  "status" TEXT NOT NULL DEFAULT 'active',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Review Campaign Tracking
CREATE TABLE IF NOT EXISTS "ReviewCampaign" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "targetAudience" TEXT NOT NULL,
  "requestsSent" INTEGER DEFAULT 0,
  "reviewsReceived" INTEGER DEFAULT 0,
  "averageRating" DOUBLE PRECISION DEFAULT 0,
  "conversionRate" DOUBLE PRECISION DEFAULT 0,
  "status" TEXT NOT NULL DEFAULT 'active',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Review Request Tracking
CREATE TABLE IF NOT EXISTS "ReviewRequest" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "clientId" TEXT NOT NULL,
  "campaignId" TEXT,
  "method" TEXT NOT NULL,
  "platform" TEXT NOT NULL,
  "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "openedAt" TIMESTAMP(3),
  "clickedAt" TIMESTAMP(3),
  "reviewedAt" TIMESTAMP(3),
  "followUpCount" INTEGER DEFAULT 0,
  "status" TEXT NOT NULL DEFAULT 'sent',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE CASCADE,
  FOREIGN KEY ("campaignId") REFERENCES "ReviewCampaign"("id") ON DELETE SET NULL
);

-- Competitor Tracking Enhancement
ALTER TABLE "CompetitorAnalysis" 
ADD COLUMN IF NOT EXISTS "rankings" JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS "socialMetrics" JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS "technicalSEO" JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS "opportunities" JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS "weaknesses" JSONB DEFAULT '[]';

-- SEO Performance Tracking
CREATE TABLE IF NOT EXISTS "SeoPerformance" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "date" DATE NOT NULL,
  "organicTraffic" INTEGER DEFAULT 0,
  "keywordRankings" JSONB DEFAULT '{}',
  "topPages" JSONB DEFAULT '[]',
  "competitorComparison" JSONB DEFAULT '{}',
  "backlinks" JSONB DEFAULT '{}',
  "technicalHealth" JSONB DEFAULT '{}',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE("date")
);

-- Agent Coordination Log
CREATE TABLE IF NOT EXISTS "AgentCoordination" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "agents" TEXT[],
  "action" TEXT NOT NULL,
  "synergy" TEXT NOT NULL,
  "impact" TEXT NOT NULL,
  "results" JSONB DEFAULT '{}',
  "executedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Content Performance Tracking
ALTER TABLE "BlogPost" 
ADD COLUMN IF NOT EXISTS "competitorComparison" JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS "socialShares" INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS "backlinks" INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS "conversionRate" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN IF NOT EXISTS "engagementMetrics" JSONB DEFAULT '{}';

-- Review Platform Metrics
CREATE TABLE IF NOT EXISTS "ReviewPlatformMetrics" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "platform" TEXT NOT NULL,
  "totalReviews" INTEGER DEFAULT 0,
  "averageRating" DOUBLE PRECISION DEFAULT 0,
  "responseRate" DOUBLE PRECISION DEFAULT 0,
  "responseTime" INTEGER DEFAULT 0, -- in hours
  "competitorComparison" JSONB DEFAULT '{}',
  "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE("platform")
);

-- Viral Content Tracking
CREATE TABLE IF NOT EXISTS "ViralContent" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "contentType" TEXT NOT NULL,
  "platform" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "engagement" JSONB NOT NULL,
  "viralScore" INTEGER NOT NULL,
  "reachMultiplier" DOUBLE PRECISION DEFAULT 1,
  "competitorResponse" JSONB DEFAULT '{}',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "publishedAt" TIMESTAMP(3) NOT NULL
);

-- SEO Opportunity Queue
CREATE TABLE IF NOT EXISTS "SeoOpportunity" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "type" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "priority" TEXT NOT NULL,
  "estimatedImpact" INTEGER NOT NULL,
  "actionItems" TEXT[],
  "source" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'pending',
  "assignedAgent" TEXT,
  "executedAt" TIMESTAMP(3),
  "results" JSONB DEFAULT '{}',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS "GmbPost_locationId_idx" ON "GmbPost"("locationId");
CREATE INDEX IF NOT EXISTS "GmbPost_publishedAt_idx" ON "GmbPost"("publishedAt");
CREATE INDEX IF NOT EXISTS "SocialCampaign_status_idx" ON "SocialCampaign"("status");
CREATE INDEX IF NOT EXISTS "ReviewRequest_clientId_idx" ON "ReviewRequest"("clientId");
CREATE INDEX IF NOT EXISTS "ReviewRequest_status_idx" ON "ReviewRequest"("status");
CREATE INDEX IF NOT EXISTS "SeoPerformance_date_idx" ON "SeoPerformance"("date");
CREATE INDEX IF NOT EXISTS "SeoOpportunity_status_priority_idx" ON "SeoOpportunity"("status", "priority");
CREATE INDEX IF NOT EXISTS "ViralContent_platform_viralScore_idx" ON "ViralContent"("platform", "viralScore");

-- Add agent tracking to existing AgentExecutionLog
ALTER TABLE "AgentExecutionLog"
ADD COLUMN IF NOT EXISTS "impactScore" INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS "competitorImpact" JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS "coordinatedWith" TEXT[];