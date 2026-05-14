# CardioCheck AI - Deployment Command Reference

Quick copy-paste commands for deploying to production.

---

## 🎯 Prerequisites

```bash
# 1. Verify Node.js is installed
node --version  # Should show v16+

# 2. Verify npm is installed
npm --version   # Should show version

# 3. Get Gemini API key
# Visit: https://aistudio.google.com/app/apikey
# (Copy and save your API key)
```

---

## 📤 GitHub Setup

### Frontend Repository

```bash
cd "/Users/honeyjaiswal/Public/Cardiocheck AI/frontend"

# Initialize Git
git init
git add .
git commit -m "CardioCheck AI - Frontend MVP"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/cardiocheck-ai-frontend.git

# Push to GitHub
git branch -M main
git push -u origin main

# Verify
git remote -v
```

### Backend Repository

```bash
cd "/Users/honeyjaiswal/Public/Cardiocheck AI/backend"

# Initialize Git
git init
git add .
git commit -m "CardioCheck AI - Backend MVP"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/cardiocheck-ai-backend.git

# Push to GitHub
git branch -M main
git push -u origin main

# Verify
git remote -v
```

---

## 🚀 Vercel Deployment (Frontend)

### Option 1: Via Vercel Dashboard (Recommended)

```
1. Visit: https://vercel.com
2. Sign in with GitHub
3. Click: "+ New Project"
4. Select: cardiocheck-ai-frontend
5. Click: "Import"
6. Wait for build to complete
7. Visit: https://[project-name].vercel.app
```

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd "/Users/honeyjaiswal/Public/Cardiocheck AI/frontend"
vercel

# For production
vercel --prod

# View deployment
vercel inspect
```

### Add Environment Variables

```bash
# Via Vercel Dashboard:
# 1. Select project
# 2. Settings → Environment Variables
# 3. Add name: NEXT_PUBLIC_API_URL
# 4. Add value: https://cardiocheck-ai-backend.onrender.com
# 5. Save
# 6. Trigger redeploy (or git push)

# Via CLI:
vercel env add NEXT_PUBLIC_API_URL
# Enter: https://cardiocheck-ai-backend.onrender.com
```

### Redeploy Frontend

```bash
# After changing environment variables
cd frontend
vercel --prod

# Or push to GitHub (auto-redeploys)
git add .
git commit -m "Update API URL"
git push origin main
```

---

## 🚀 Render Deployment (Backend)

### Option 1: Via Render Dashboard (Recommended)

```
1. Visit: https://render.com
2. Sign in with GitHub
3. Click: "+ New"
4. Select: "Web Service"
5. Select: cardiocheck-ai-backend repository
6. Configure:
   - Name: cardiocheck-ai-backend
   - Environment: Node
   - Build Command: npm install
   - Start Command: node server.js
   - Instance Type: Free
7. Click: "Create Web Service"
8. Wait for deployment
9. Get the URL (e.g., https://cardiocheck-ai-backend.onrender.com)
```

### Add Environment Variables on Render

```
After service is created:
1. Click: Your service
2. Click: "Environment"
3. Add:
   - Key: GEMINI_API_KEY
   - Value: [Your API key from Google AI Studio]
4. Add:
   - Key: NODE_ENV
   - Value: production
5. Click: "Save Changes"
6. Wait for auto-redeploy
```

### Test Backend Health

```bash
# After deployment completes, test:
curl https://cardiocheck-ai-backend.onrender.com/health

# Should return:
# {"status":"OK","message":"CardioCheck AI API is running"}
```

---

## 🔗 Connect Frontend to Backend

```bash
# 1. Copy your Render backend URL (from Render dashboard)
# Example: https://cardiocheck-ai-backend.onrender.com

# 2. Go to Vercel Dashboard
# Select: cardiocheck-ai-frontend
# Settings → Environment Variables

# 3. Add environment variable:
# Name: NEXT_PUBLIC_API_URL
# Value: https://cardiocheck-ai-backend.onrender.com

# 4. Redeploy frontend
cd "/Users/honeyjaiswal/Public/Cardiocheck AI/frontend"
vercel --prod

# OR push to GitHub (auto-deploys)
git add .
git commit -m "Add backend URL"
git push origin main
```

---

## ✅ Testing After Deployment

### Test Backend

```bash
# Health check
curl https://cardiocheck-ai-backend.onrender.com/health

# Expected response:
# {"status":"OK","message":"CardioCheck AI API is running"}

# Test assessment
curl -X POST https://cardiocheck-ai-backend.onrender.com/assess \
  -H "Content-Type: application/json" \
  -d '{
    "age": 35,
    "gender": "male",
    "weight": 75,
    "height": 180,
    "systolicBP": 130,
    "diastolicBP": 85,
    "cholesterol": 200,
    "smoking": "no",
    "exerciseFrequency": "moderate",
    "familyHistory": "no"
  }'

# Expected response:
# {
#   "risk_level": "Moderate",
#   "risk_score_pct": 22,
#   "summary": "Your heart disease risk...",
#   "recommendations": [...]
# }
```

### Test Frontend

```bash
# 1. Visit your Vercel URL
# https://[your-project].vercel.app

# 2. Check browser console (F12)
# - Should have no red errors
# - Check Network tab for API calls

# 3. Fill form and submit
# - Should see loading indicator
# - Should see risk results in 3-5 seconds
# - Check Network tab to see /assess call
```

---

## 🔄 Auto-Deploys (After Initial Setup)

Both Vercel and Render automatically redeploy when you push to GitHub:

```bash
# Make changes locally
cd frontend
# ... edit files ...

# Commit and push
git add .
git commit -m "Fix form styling"
git push origin main

# Vercel automatically builds and deploys!
# No action needed - within 1-2 minutes it's live
```

---

## 📊 Monitor Deployments

### Vercel

```bash
# View live logs
vercel logs --tail

# View all deployments
vercel deployments

# View project info
vercel projects

# Link an existing project
vercel link
```

### Render

```
Via Dashboard:
1. Go to https://dashboard.render.com
2. Select your service
3. Click "Logs" tab for real-time logs
4. Click "Metrics" tab for CPU/memory
5. Click "Deployments" to see history
```

---

## 🔙 Rollback to Previous Version

### Vercel Rollback

```bash
# Via CLI
vercel list              # See all deployments
vercel rollback          # Rollback to previous

# Via Dashboard
# 1. Go to Deployments
# 2. Click previous deployment
# 3. Click "Promote to Production"
```

### Render Rollback

```
Via Dashboard:
1. Select your service
2. Click "Deployments"
3. Select previous deployment
4. Click "Deploy" button
```

---

## 🆘 Troubleshooting Commands

### Frontend Issues

```bash
# Check build locally
cd frontend
npm run build

# Check for errors
npm run lint

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Test locally
npm run dev
# Visit: http://localhost:3000
```

### Backend Issues

```bash
# Check for errors
cd backend
npm install  # Reinstall if needed

# Test locally
npm run dev
# Should show: ✓ CardioCheck AI Backend running on http://localhost:5000

# Check health
curl http://localhost:5000/health

# View logs
npm run dev 2>&1 | tee backend.log
```

### Check git status

```bash
# Verify repos are connected
git remote -v

# Check status
git status

# View commit history
git log --oneline | head -5
```

---

## 📋 Deployment Checklist Commands

```bash
# 1. Check Node.js
node --version

# 2. Install dependencies
cd frontend && npm install
cd ../backend && npm install

# 3. Test locally
cd backend && npm run dev  # Terminal 1
cd frontend && npm run dev  # Terminal 2
# Open: http://localhost:3000

# 4. Push to GitHub
cd frontend && git push origin main
cd ../backend && git push origin main

# 5. Verify deployments
curl https://cardiocheck-ai-backend.onrender.com/health
open https://[your-vercel-app].vercel.app

# 6. Test full flow
# Visit frontend URL
# Fill form
# Submit
# See results within 3-5 seconds
```

---

## 🚀 Complete Deployment Sequence

```bash
# Summary: All commands to go from local to production

# Prerequisites
node --version              # v16+
npm --version              # v7+
# Get API key from ai.google.dev

# 1. Setup GitHub - Frontend
cd "/Users/honeyjaiswal/Public/Cardiocheck AI/frontend"
git init
git add .
git commit -m "CardioCheck AI Frontend"
git remote add origin https://github.com/YOUR_USERNAME/cardiocheck-ai-frontend.git
git push -u origin main

# 2. Setup GitHub - Backend
cd ../backend
git init
git add .
git commit -m "CardioCheck AI Backend"
git remote add origin https://github.com/YOUR_USERNAME/cardiocheck-ai-backend.git
git push -u origin main

# 3. Deploy Frontend (via Vercel dashboard)
# - Go to vercel.com
# - Import cardiocheck-ai-frontend
# - Wait for deployment
# - Copy URL

# 4. Deploy Backend (via Render dashboard)
# - Go to render.com
# - Create Web Service
# - Select cardiocheck-ai-backend
# - Set Build: npm install
# - Set Start: node server.js
# - Add GEMINI_API_KEY env var
# - Wait for deployment
# - Copy URL

# 5. Connect them
# - In Vercel, add env var NEXT_PUBLIC_API_URL = [Render URL]
# - Redeploy frontend

# 6. Verify
curl https://cardiocheck-ai-backend.onrender.com/health
open https://[vercel-url].vercel.app

# Done! App is live! 🚀
```

---

## 💡 Pro Tips

```bash
# Tip 1: Keep your API key safe
# Never commit .env files
# Use environment variables on platforms

# Tip 2: Test before pushing
npm run build  # Frontend
# Make sure it succeeds

# Tip 3: Use meaningful commit messages
git commit -m "Fix form validation" # Good
git commit -m "fix" # Bad

# Tip 4: Check logs frequently
vercel logs --tail     # Vercel logs
# Render logs in dashboard

# Tip 5: Deploy frequently
# Small changes = less risk
# Deploy after each feature

# Tip 6: Monitor after deploy
# Check analytics in Vercel
# Check logs in Render
# Test the full flow
```

---

## 📚 See Also

- Full guide: DEPLOYMENT.md
- Checklist: DEPLOYMENT-CHECKLIST.md
- Overview: DEPLOYMENT-SUMMARY.md
- Architecture: ARCHITECTURE.md

---

**This is your complete command reference for deploying CardioCheck AI to production!** ✅

Keep these commands handy for deployment and maintenance.
