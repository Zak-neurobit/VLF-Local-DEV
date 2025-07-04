#!/bin/bash

# Deployment Script for VLF + HODOS
set -e

echo "🚀 VLF + HODOS Deployment Script"
echo "================================"
echo ""
echo "Choose your deployment platform:"
echo "1) Vercel (VLF) + Railway (HODOS) - Recommended for quick start"
echo "2) DigitalOcean App Platform - Managed hosting"
echo "3) AWS/VPS with Docker - Full control"
echo "4) Local production test - Try before deploying"
echo ""
read -p "Enter choice [1-4]: " choice

case $choice in
    1)
        echo "📦 Deploying to Vercel + Railway..."
        
        # Deploy VLF to Vercel
        echo "→ Deploying VLF Website to Vercel..."
        
        # Check if Vercel CLI is installed
        if ! command -v vercel &> /dev/null; then
            echo "Installing Vercel CLI..."
            npm i -g vercel
        fi
        
        # Create vercel.json
        cat > vercel.json << 'EOF'
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "env": {
    "DATABASE_URL": "@database_url",
    "NEXTAUTH_URL": "@nextauth_url",
    "NEXTAUTH_SECRET": "@nextauth_secret",
    "HODOS_API_URL": "@hodos_api_url",
    "HODOS_API_KEY": "@hodos_api_key"
  },
  "build": {
    "env": {
      "NEXT_PUBLIC_APP_URL": "@nextauth_url"
    }
  }
}
EOF
        
        echo "✓ Created vercel.json"
        echo ""
        echo "Running Vercel deployment..."
        echo "Note: You'll need to set environment variables in Vercel dashboard"
        vercel --prod
        
        echo ""
        echo "→ Next: Deploy HODOS to Railway"
        echo "1. Install Railway CLI: brew install railway"
        echo "2. cd /Users/williamvasquez/Documents/HODOS/HODOS"
        echo "3. railway login"
        echo "4. railway init"
        echo "5. railway up"
        ;;
        
    2)
        echo "📦 Deploying to DigitalOcean App Platform..."
        
        # Create app spec
        cat > app-spec.yaml << 'EOF'
name: vasquez-law-platform
region: nyc
services:
  - name: vlf-website
    github:
      repo: your-github-username/vasquez-law-website
      branch: main
      deploy_on_push: true
    build_command: npm run build
    run_command: npm start
    environment_slug: node-js
    instance_count: 1
    instance_size_slug: basic-xxs
    envs:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        type: SECRET
      - key: NEXTAUTH_SECRET
        type: SECRET
    http_port: 3000
    
  - name: hodos-platform
    github:
      repo: your-github-username/hodos
      branch: main
      deploy_on_push: true
    build_command: npm run build
    run_command: npm start
    environment_slug: node-js
    instance_count: 1
    instance_size_slug: basic-xxs
    envs:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        type: SECRET
    http_port: 3001

databases:
  - name: vlf-postgres
    engine: PG
    version: "15"
  - name: hodos-mongodb
    engine: MONGODB
    version: "7"
EOF
        
        echo "✓ Created app-spec.yaml"
        echo ""
        echo "Next steps:"
        echo "1. Push code to GitHub"
        echo "2. Go to https://cloud.digitalocean.com/apps"
        echo "3. Create new app from app-spec.yaml"
        echo "4. Connect GitHub repositories"
        echo "5. Deploy!"
        ;;
        
    3)
        echo "📦 Deploying with Docker..."
        
        # Create deployment package
        echo "→ Creating deployment package..."
        
        mkdir -p deploy-package
        cp docker-compose.production.yml deploy-package/
        cp nginx.prod.conf deploy-package/
        cp .env.example deploy-package/.env
        
        # Create deployment script
        cat > deploy-package/deploy.sh << 'EOF'
#!/bin/bash
echo "Deploying VLF + HODOS..."

# Update system
sudo apt-get update
sudo apt-get install -y docker.io docker-compose

# Start services
docker-compose -f docker-compose.production.yml up -d

echo "Deployment complete!"
echo "Configure your .env file with production values"
EOF
        
        chmod +x deploy-package/deploy.sh
        
        # Create README
        cat > deploy-package/README.md << 'EOF'
# Deployment Instructions

1. Copy this folder to your server:
   ```
   scp -r deploy-package/ user@your-server:~/
   ```

2. SSH to your server:
   ```
   ssh user@your-server
   ```

3. Run deployment:
   ```
   cd deploy-package
   ./deploy.sh
   ```

4. Configure environment variables in .env

5. Set up SSL with Let's Encrypt:
   ```
   sudo certbot --nginx -d yourdomain.com
   ```
EOF
        
        echo "✓ Created deployment package in ./deploy-package/"
        echo ""
        echo "Next: Copy deploy-package/ to your server and run deploy.sh"
        ;;
        
    4)
        echo "🧪 Starting local production test..."
        
        # Create production env
        cat > .env.production.local << 'EOF'
NODE_ENV=production
DATABASE_URL=postgresql://postgres:password@localhost:5432/vlf_prod
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=local-test-secret-change-in-production
HODOS_API_URL=http://localhost:3001
HODOS_API_KEY=local-test-key
EOF
        
        echo "→ Building for production..."
        npm run build
        
        echo ""
        echo "→ Starting production server..."
        echo "Note: Make sure PostgreSQL is running locally"
        echo ""
        NODE_ENV=production npm start
        ;;
        
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "📋 Post-Deployment Checklist:"
echo "□ Environment variables configured"
echo "□ Database migrations run"
echo "□ SSL certificates installed"
echo "□ DNS records updated"
echo "□ Health checks passing"
echo "□ Monitoring configured"
echo "□ Backups scheduled"
echo ""
echo "🎉 Good luck with your deployment!"