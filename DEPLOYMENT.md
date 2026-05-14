# CardioCheck AI - Deployment Guide

Deploy your CardioCheck AI application to production using **Vercel** (frontend) and **Render** (backend).

## Overview

| Component | Platform | Cost | Link |
|-----------|----------|------|------|
| Frontend | Vercel | Free | https://vercel.com |
| Backend | Render | Free | https://render.com |
| Database | (Optional) Supabase | Free tier | https://supabase.com |

**Total Cost**: $0 for MVP validation phase

---

## Part 1: Frontend Deployment (Vercel)

Vercel is purpose-built for Next.js and offers the easiest deployment path.

### Prerequisites
- GitHub account with your code pushed
- Vercel account (sign up at vercel.com)

### Step 1: Push Code to GitHub

```bash
# Initialize git if not already done
cd frontend
git init
git add .
git commit -m "Initial CardioCheck AI frontend commit"

# Create a new repository on GitHub called "cardiocheck-ai-frontend"
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/cardiocheck-ai-frontend.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

**Option A: Via Vercel Web Dashboard (Easiest)**

1. Go to [vercel.com](https://vercel.com)
2. Sign up/log in with GitHub
3. Click "New Project"
4. Select your `cardiocheck-ai-frontend` repository
5. Click "Import"
6. Vercel auto-detects Next.js configuration
7. Click "Deploy"

**Option B: Via Vercel CLI**

```bash
npm install -g vercel
cd frontend
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? Select your account
# - Link to existing project? N
# - Project name? cardiocheck-ai-frontend
# - Directory? ./
# - Use defaults for build/output? Y
```

### Step 3: Configure Environment Variables

1. After deployment, go to **Project Settings** → **Environment Variables**
2. Add:
   ```
   NEXT_PUBLIC_API_URL=https://cardiocheck-api.onrender.com
   ```
   (Replace with your actual Render backend URL from Part 2)

3. **Redeploy** for changes to take effect:
   ```bash
   vercel --prod
   ```

### Step 4: Custom Domain (Optional)

In Project Settings → Domains:
1. Add your custom domain (e.g., cardiocheck.ai)
2. Update your domain registrar's DNS settings
3. Vercel will provide CNAME records

### Vercel Monitoring

- **Deployments**: See all versions at `vercel.com/dashboard`
- **Analytics**: Track usage, performance, errors
- **Logs**: Live tail with `vercel logs`

---

## Part 2: Backend Deployment (Render)

Render simplifies Node.js deployment with automatic git-based deploys.

### Prerequisites
- GitHub account with backend code pushed
- Render account (sign up at render.com)

### Step 1: Push Backend Code to GitHub

```bash
cd backend
git init
git add .
git commit -m "Initial CardioCheck AI backend commit"

# Create a new repository on GitHub called "cardiocheck-ai-backend"
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/cardiocheck-ai-backend.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Render

1. Go to [render.com](https://render.com)
2. Sign up/log in with GitHub
3. Click **New +** → **Web Service**
4. Select your `cardiocheck-ai-backend` repository
5. Configure:
   - **Name**: `cardiocheck-ai-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm run dev` → Change to `node server.js`
   - **Instance Type**: Free

6. Click **Create Web Service**

### Step 3: Add Environment Variables

1. On the Render dashboard, go to your service
2. Click **Environment**
3. Add:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=5000
   NODE_ENV=production
   ```

4. Click **Save Changes** (auto-deploys)

### Step 4: Get Your Render URL

1. Service dashboard shows your URL: `https://cardiocheck-ai-backend.onrender.com`
2. Copy this URL
3. Go back to Vercel frontend settings
4. Update `NEXT_PUBLIC_API_URL=https://cardiocheck-ai-backend.onrender.com`
5. Redeploy frontend: `vercel --prod`

### Render Monitoring

- **Logs**: Real-time output at `Logs` tab
- **Metrics**: CPU, memory, request count
- **Auto-restart**: If service crashes
- **Auto-update**: On each git push to main

---

## Part 3: Test Deployed Application

### 1. Test Frontend

Visit your Vercel URL: `https://your-app.vercel.app`

You should see:
- ✅ CardioCheck AI header
- ✅ Health form loads
- ✅ No console errors (F12 to check)

### 2. Test Backend

```bash
curl https://cardiocheck-ai-backend.onrender.com/health
```

Expected response:
```json
{"status":"OK","message":"CardioCheck AI API is running"}
```

### 3. Full End-to-End Test

1. Fill out the form on the deployed frontend
2. Click "Check My Risk"
3. Should display results within 3-5 seconds
4. Check browser console (F12) for any errors

---

## Part 4: Production Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render
- [ ] Environment variables configured on both
- [ ] Frontend can reach backend API
- [ ] Health check passes
- [ ] Full end-to-end form submission works
- [ ] No errors in browser console
- [ ] Mobile responsive verified
- [ ] Custom domains configured (optional)
- [ ] Monitoring set up (optional)

---

## Monitoring & Debugging

### Check Vercel Logs

```bash
vercel logs --tail
```

### Check Render Logs

Logs visible in Render dashboard → Logs tab (or use REST API)

### Test API Directly

```bash
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
```

### Debug CORS Issues

If frontend can't reach backend:
1. Check `NEXT_PUBLIC_API_URL` is set correctly in Vercel
2. Verify backend is running (`/health` endpoint works)
3. Check CORS middleware in `server.js` is enabled
4. Check browser Network tab for actual error

---

## Cost Analysis

| Service | Free Tier | Pro | Notes |
|---------|-----------|-----|-------|
| **Vercel** | Unlimited builds | $20/mo | Free includes: Fast deploys, custom domains, analytics |
| **Render** | 750 hours/month | $7/mo | Free tier auto-sleeps after 15 min inactivity |
| **Gemini API** | 60 requests/day | Pay-as-you-go | Free tier sufficient for MVP validation |

**MVP Total Cost**: $0 (all free tiers)

---

## Scaling Beyond MVP

When ready to scale:

1. **Add Database**: Supabase PostgreSQL ($25/mo)
2. **Render Paid Plan**: $7/mo (always-on, no sleep)
3. **Vercel Pro**: $20/mo (better analytics)
4. **Gemini API**: Pay-as-you-go ($0.075-0.30/million tokens)

---

## Common Deployment Issues

### Error: "Cannot find module 'express'"

**Solution**: 
- Render build command should be `npm install`
- Verify `package.json` exists in backend root

### Error: "GEMINI_API_KEY is undefined"

**Solution**:
- Add `GEMINI_API_KEY` to Render environment variables
- Verify exact key name matches `.env` file
- Redeploy after adding variable

### Error: "Port already in use"

**Solution**:
- Use `process.env.PORT` (Render assigns randomly)
- Our code already handles this: `PORT=5000` is optional

### Frontend can't reach backend (CORS error)

**Solution**:
1. Verify `NEXT_PUBLIC_API_URL` set on Vercel
2. Check backend is responding: `curl https://your-backend-url.onrender.com/health`
3. Verify CORS middleware enabled in `server.js`

### Render service goes to sleep

**Solution**:
- Free tier sleeps after 15 min inactivity
- Upgrade to paid tier for always-on service ($7/mo)
- Or keep MVP on free tier (acceptable for low traffic)

---

## Post-Deployment

### 1. Set Up Monitoring

**Vercel Analytics**:
- Automatically enabled
- Track page performance, user locations, errors
- View at: `vercel.com/dashboard → analytics`

**Render Monitoring**:
- View logs in real-time
- Monitor CPU/memory usage
- Set up alerts (paid feature)

### 2. Set Up Error Tracking (Optional)

Consider adding Sentry for error monitoring:
```bash
npm install @sentry/nextjs  # Frontend
npm install @sentry/node    # Backend
```

### 3. Enable Health Checks

Vercel and Render auto-restart dead services. Verify with:
```bash
curl https://your-backend.onrender.com/health
```

### 4. Set Up CI/CD

Both Vercel and Render auto-deploy on git push:
1. Push to main branch
2. Automatic build and deployment
3. Takes 1-3 minutes
4. Rollback available if needed

---

## Rollback & Disaster Recovery

### Vercel Rollback

1. Go to Deployments tab
2. Click any previous deployment
3. Click "Promote to Production"

### Render Rollback

1. Click Service
2. Click Deployments
3. Select previous deployment
4. Click "Deploy"

---

## Performance Optimization

### Frontend (Vercel)

Already optimized with:
- ✅ Next.js automatic code splitting
- ✅ Image optimization
- ✅ Edge caching
- ✅ Compression

Verify with: [WebPageTest.org](https://www.webpagetest.org/)

### Backend (Render)

To improve:
- Consider upgrading to paid tier (removes sleep)
- Add caching layer (Redis) for Gemini responses
- Monitor response times in Render logs

---

## Final Checklist

```bash
# 1. Verify code is ready
cd frontend && npm run build
cd ../backend && npm test (if tests exist)

# 2. Push to GitHub
git push origin main

# 3. Deploy
# Frontend: vercel --prod
# Backend: Render auto-deploys

# 4. Test
curl https://your-backend.onrender.com/health
open https://your-app.vercel.app

# 5. Monitor
# Vercel dashboard → Analytics
# Render dashboard → Logs
```

---

## Support

**Issues?**

1. Check Vercel logs: `vercel logs --tail`
2. Check Render logs: Dashboard → Logs tab
3. Test endpoint directly: `curl https://your-api-url/health`
4. Verify environment variables on both platforms
5. Check browser console (F12) for client-side errors

**Stuck?**
- Vercel docs: [vercel.com/docs](https://vercel.com/docs)
- Render docs: [render.com/docs](https://render.com/docs)
- Gemini docs: [ai.google.dev](https://ai.google.dev)

---

**Your application is production-ready!** 🚀

Follow this guide to go live in minutes.
