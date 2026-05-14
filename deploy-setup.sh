#!/bin/bash

# CardioCheck AI - Complete Deployment Setup
# Prepares both frontend and backend for deployment

echo "🚀 CardioCheck AI - Deployment Setup"
echo "===================================="
echo ""

# Check prerequisites
echo "Checking prerequisites..."
echo ""

if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Install from https://nodejs.org/"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Install Node.js"
    exit 1
fi

if ! command -v git &> /dev/null; then
    echo "❌ Git not found. Install from https://git-scm.com/"
    exit 1
fi

echo "✅ Node.js $(node --version)"
echo "✅ npm $(npm --version)"
echo "✅ Git $(git --version)"
echo ""

# Check Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo ""
echo "✅ All tools ready for deployment"
echo ""

# Initialize git if needed
if [ ! -d ".git" ]; then
    echo "📝 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial CardioCheck AI commit"
fi

echo ""
echo "📋 Next Steps for Deployment:"
echo "============================"
echo ""
echo "1. CREATE GITHUB REPOSITORIES"
echo "   a. Go to https://github.com/new"
echo "   b. Create 'cardiocheck-ai-frontend' repository"
echo "   c. Create 'cardiocheck-ai-backend' repository"
echo ""
echo "2. PUSH CODE TO GITHUB"
echo "   Frontend:"
echo "     cd frontend"
echo "     git remote add origin https://github.com/YOUR_USERNAME/cardiocheck-ai-frontend.git"
echo "     git branch -M main"
echo "     git push -u origin main"
echo ""
echo "   Backend:"
echo "     cd ../backend"
echo "     git remote add origin https://github.com/YOUR_USERNAME/cardiocheck-ai-backend.git"
echo "     git branch -M main"
echo "     git push -u origin main"
echo ""
echo "3. DEPLOY FRONTEND (Vercel)"
echo "   a. Go to https://vercel.com"
echo "   b. Sign in with GitHub"
echo "   c. Click 'New Project'"
echo "   d. Select cardiocheck-ai-frontend"
echo "   e. Click 'Deploy'"
echo ""
echo "4. DEPLOY BACKEND (Render)"
echo "   a. Go to https://render.com"
echo "   b. Sign in with GitHub"
echo "   c. Click 'New +' → 'Web Service'"
echo "   d. Select cardiocheck-ai-backend"
echo "   e. Set Build: npm install"
echo "   f. Set Start: node server.js"
echo "   g. Add GEMINI_API_KEY environment variable"
echo "   h. Click 'Create Web Service'"
echo ""
echo "5. CONNECT FRONTEND TO BACKEND"
echo "   a. Get Render backend URL from deployment"
echo "   b. Go to Vercel project settings → Environment"
echo "   c. Add: NEXT_PUBLIC_API_URL=<your-render-url>"
echo "   d. Redeploy: vercel --prod"
echo ""
echo "✅ Ready to deploy!"
echo ""
