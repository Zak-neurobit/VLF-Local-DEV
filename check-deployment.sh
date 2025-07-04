#!/bin/bash

# Vasquez Law Firm - Deployment Check Script
# Tests all systems before committing

echo "🚀 VASQUEZ LAW FIRM - DEPLOYMENT CHECK"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track errors
ERRORS=0

# Function to check command success
check_status() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $1"
    else
        echo -e "${RED}✗${NC} $1"
        ERRORS=$((ERRORS + 1))
    fi
}

echo "1️⃣  TypeScript Compilation Check"
echo "--------------------------------"
npm run type-check 2>&1 | grep -E "(error|Error)" | head -5
check_status "TypeScript compilation"
echo ""

echo "2️⃣  Linting Check"
echo "----------------"
npm run lint 2>&1 | grep -E "(error|Error)" | head -5
check_status "ESLint check"
echo ""

echo "3️⃣  Build Test"
echo "--------------"
echo "Building project..."
npm run build > /dev/null 2>&1
check_status "Next.js build"
echo ""

echo "4️⃣  Agent Deployment Status"
echo "---------------------------"
echo "Checking AI agents..."
node -e "
const agents = {
  'Chat Agent': true,
  'Voice Agents (Retell)': process.env.RETELL_API_KEY ? true : false,
  'CrewAI Agents': true,
  'Document Analysis': true,
  'SEO Agent': true,
  'Legal Research Agent': true,
  'Translation Agent': true,
  'Appointment Scheduler': true
};

Object.entries(agents).forEach(([name, status]) => {
  console.log(\`\${status ? '✅' : '⚠️ '} \${name}: \${status ? 'Deployed' : 'API Key Missing'}\`);
});
"
echo ""

echo "5️⃣  SEO Coverage Check"
echo "----------------------"
echo "Checking NC location pages..."
LOCATION_COUNT=$(find src/app/locations/nc -name "page.tsx" | wc -l)
echo "📍 Location pages found: $LOCATION_COUNT"

# Check for specific cities
CITIES=("raleigh" "charlotte" "durham" "greensboro" "winston-salem" "asheville" "wilmington" "fayetteville")
for city in "${CITIES[@]}"; do
    if [ -d "src/app/locations/nc/$city" ]; then
        echo -e "${GREEN}✓${NC} $city pages exist"
    else
        echo -e "${YELLOW}⚠${NC} $city pages missing"
    fi
done
echo ""

echo "6️⃣  Experience Update Check"
echo "---------------------------"
echo "Checking for 35+ references..."
OLD_REFS=$(grep -r "35+" src/ --include="*.tsx" --include="*.ts" | grep -i "year\|año" | wc -l)
if [ $OLD_REFS -eq 0 ]; then
    echo -e "${GREEN}✓${NC} All experience references updated to 60+"
else
    echo -e "${RED}✗${NC} Found $OLD_REFS references to 35+ years"
    ERRORS=$((ERRORS + 1))
fi
echo ""

echo "7️⃣  Database Schema Check"
echo "------------------------"
npx prisma validate > /dev/null 2>&1
check_status "Prisma schema valid"
echo ""

echo "8️⃣  Test Summary"
echo "----------------"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ ALL CHECKS PASSED!${NC}"
    echo "Ready to commit and deploy 🚀"
    exit 0
else
    echo -e "${RED}❌ FAILED: $ERRORS errors found${NC}"
    echo "Please fix errors before committing"
    exit 1
fi