#!/bin/bash

# CardioCheck AI - Deploy to Vercel (Frontend)
# Prerequisites: Node.js, npm, Vercel CLI, GitHub account with frontend code pushed

echo "🚀 CardioCheck AI - Frontend Deployment (Vercel)"
echo "================================================"
echo ""

# Check for required tools
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

if ! command -v git &> /dev/null; then
    echo "❌ Git is required"
    exit 1
fi

# Navigate to frontend
cd "$(dirname "$0")/frontend" || exit 1

echo "📦 Frontend directory: $(pwd)"
echo ""

# Verify code is committed
if [ -z "$(git remote -v)" ]; then
    echo "❌ No git remote configured"
    echo ""
    echo "To fix:"
    echo "1. Create a repository on GitHub"
    echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/cardiocheck-ai-frontend.git"
    echo "3. Run: git push -u origin main"
    exit 1
fi

echo "✅ Git remote configured"
echo ""

# Ensure changes are committed
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Uncommitted changes detected"
    echo "Committing changes..."
    git add .
    git commit -m "Pre-deployment build $(date +%s)"
    git push origin main
fi

echo "✅ Code committed and pushed"
echo ""

# Deploy
echo "🔧 Deploying to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Frontend deployed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Go to your Vercel dashboard"
    echo "2. Set NEXT_PUBLIC_API_URL environment variable to your Render backend URL"
    echo "3. Redeploy: vercel --prod"
else
    echo ""
    echo "❌ Deployment failed"
    exit 1
fi
