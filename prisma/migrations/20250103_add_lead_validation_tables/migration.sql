-- CreateTable for Lead Validation
CREATE TABLE "LeadValidation" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "tier" TEXT NOT NULL,
    "priorityLevel" TEXT NOT NULL,
    "practiceAreas" TEXT[],
    "languagePreference" TEXT NOT NULL,
    "estimatedCaseValue" DOUBLE PRECISION,
    "factors" JSONB NOT NULL,
    "recommendations" TEXT[],
    "followUpStrategy" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "validatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeadValidation_pkey" PRIMARY KEY ("id")
);

-- CreateTable for Follow Up Sequences
CREATE TABLE "FollowUpSequence" (
    "id" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "sequenceType" TEXT NOT NULL,
    "steps" JSONB NOT NULL,
    "personalizations" JSONB NOT NULL,
    "status" TEXT NOT NULL,
    "currentStep" INTEGER NOT NULL DEFAULT 0,
    "completedSteps" INTEGER NOT NULL DEFAULT 0,
    "lastExecutedAt" TIMESTAMP(3),
    "nextStepAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FollowUpSequence_pkey" PRIMARY KEY ("id")
);

-- CreateTable for Agent Execution Logs
CREATE TABLE "AgentExecutionLog" (
    "id" TEXT NOT NULL,
    "agentName" TEXT NOT NULL,
    "executionType" TEXT NOT NULL,
    "input" JSONB NOT NULL,
    "output" JSONB NOT NULL,
    "duration" INTEGER NOT NULL,
    "success" BOOLEAN NOT NULL,
    "error" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgentExecutionLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LeadValidation_email_idx" ON "LeadValidation"("email");
CREATE INDEX "LeadValidation_tier_idx" ON "LeadValidation"("tier");
CREATE INDEX "LeadValidation_priorityLevel_idx" ON "LeadValidation"("priorityLevel");
CREATE INDEX "LeadValidation_validatedAt_idx" ON "LeadValidation"("validatedAt");

CREATE INDEX "FollowUpSequence_contactId_idx" ON "FollowUpSequence"("contactId");
CREATE INDEX "FollowUpSequence_status_idx" ON "FollowUpSequence"("status");
CREATE INDEX "FollowUpSequence_nextStepAt_idx" ON "FollowUpSequence"("nextStepAt");

CREATE INDEX "AgentExecutionLog_agentName_idx" ON "AgentExecutionLog"("agentName");
CREATE INDEX "AgentExecutionLog_createdAt_idx" ON "AgentExecutionLog"("createdAt");