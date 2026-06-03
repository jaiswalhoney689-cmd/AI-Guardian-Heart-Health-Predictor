# Firebase Invalid API Key - Deployment Fix

## Problem
The build is failing with `Firebase: Error (auth/invalid-api-key)` because Firebase is trying to initialize with empty environment variables during the Vercel build process.

## Root Cause
- Firebase initialization was happening at build time instead of client-side only
- Environment variables weren't set in Vercel
- Next.js was trying to initialize Firebase during server-side rendering

## Solution Applied
1. ✅ Updated `frontend/lib/firebase.ts` to initialize Firebase only on the client
2. ✅ Updated `frontend/context/AuthContext.tsx` to handle client-side initialization
3. ✅ Created proper `.env.example` files with placeholders

## Deployment Steps

### Frontend (Vercel)

#### Step 1: Get Firebase Credentials
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click **Settings** (⚙️) → **Project Settings**
4. Find your Web app configuration and copy:
   - `apiKey` 
   - `authDomain`
   - `projectId`

#### Step 2: Set Vercel Environment Variables
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables for all environments (Production, Preview, Development):
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY = your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID = your_project_id_here
   ```
5. For local development, update `frontend/.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

#### Step 3: Test Locally
```bash
cd frontend
npm install
npm run build
npm run dev
```

#### Step 4: Deploy
```bash
git add .
git commit -m "Fix Firebase client-side initialization"
git push
```

### Backend (Render)

#### Step 1: Set Render Environment Variables
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Select your backend service
3. Go to **Environment** tab
4. Add these variables:
   ```
   GEMINI_API_KEY = your_gemini_api_key
   PORT = 5000
   NODE_ENV = production
   FRONTEND_URL = https://your-vercel-app.vercel.app
   ```

#### Step 2: Update Backend .env
Create `backend/.env` with your production values:
```
GEMINI_API_KEY=your_actual_key
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-vercel-app.vercel.app
```

#### Step 3: Test Locally
```bash
cd backend
npm install
node server.js
```
Should start on port 5000

#### Step 4: Push to Deploy
```bash
git add .
git commit -m "Configure backend for production"
git push
```

### Verify Deployment

#### Frontend
- Visit your Vercel URL
- Open DevTools Console (F12)
- No Firebase errors should appear
- Auth context should initialize properly

#### Backend
- Test API endpoint: `curl https://your-render-backend.onrender.app/health`
- Should respond with 200 OK

### Troubleshooting

**If you still see "invalid-api-key" error:**
1. Verify all three Firebase environment variables are set in Vercel
2. Double-check values match exactly (no extra spaces)
3. Redeploy: trigger a new build in Vercel dashboard

**If backend won't start:**
1. Check `NODE_ENV=production` is set
2. Verify GEMINI_API_KEY is correct
3. Check Render logs for detailed errors

**CORS issues between frontend and backend:**
1. Update backend CORS to include your Vercel URL
2. Set `FRONTEND_URL` environment variable on Render
3. Update `NEXT_PUBLIC_API_URL` in Vercel to match your Render backend URL

## Security Notes
- `NEXT_PUBLIC_*` variables are safe to expose (they're loaded into frontend)
- Never commit actual API keys to git
- Use `.env.local` for local development (already in .gitignore)
- Verify `.gitignore` includes `.env.local`
