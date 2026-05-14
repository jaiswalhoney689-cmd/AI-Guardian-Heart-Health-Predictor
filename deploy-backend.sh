#!/bin/bash

# CardioCheck AI - Deploy to Render (Backend)
# Prerequisites: Node.js, npm, GitHub account with backend code pushed, Render account

echo "🚀 CardioCheck AI - Backend Deployment (Render)"
echo "==============================================="
echo ""

# Check for required tools
if ! command -v git &> /dev/null; then
    echo "❌ Git is required"
    exit 1
fi

# Navigate to backend
cd "$(dirname "$0")/backend" || exit 1

echo "📦 Backend directory: $(pwd)"
echo ""

# Verify code is committed
if [ -z "$(git remote -v)" ]; then
    echo "❌ No git remote configured"
    echo ""
    echo "To fix:"
    echo "1. Create a repository on GitHub"
    echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/cardiocheck-ai-backend.git"
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

echo "📋 Manual Render Deployment Steps:"
echo "=================================="
echo ""
echo "1. Go to https://render.com"
echo "2. Sign in with GitHub"
echo "3. Click 'New +' → 'Web Service'"
echo "4. Select your cardiocheck-ai-backend repository"
echo "5. Configure:"
echo "   • Name: cardiocheck-ai-backend"
echo "   • Environment: Node"
echo "   • Build Command: npm install"
echo "   • Start Command: node server.js"
echo "   • Instance Type: Free"
echo ""
echo "6. Click 'Create Web Service'"
echo ""
echo "7. After deployment, add environment variables:"
echo "   • GEMINI_API_KEY: your_actual_api_key"
echo "   • NODE_ENV: production"
echo ""
echo "8. Copy your Render URL (e.g., https://cardiocheck-ai-backend.onrender.com)"
echo "9. Go to Vercel and update NEXT_PUBLIC_API_URL with this URL"
echo ""
echo "✅ Backend will auto-deploy on every git push to main!"
echo ""
