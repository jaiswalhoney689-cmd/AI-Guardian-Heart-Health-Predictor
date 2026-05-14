# Production Environment Configuration

## Frontend (Vercel) - Environment Variables

Add these to your Vercel project settings:

```
NEXT_PUBLIC_API_URL=https://cardiocheck-ai-backend.onrender.com
```

Or with custom domain:
```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## Backend (Render) - Environment Variables

Add these to your Render service:

```
GEMINI_API_KEY=your_actual_api_key_here
NODE_ENV=production
PORT=5000
```

---

## Vercel Deployment Checklist

- [ ] Frontend code pushed to GitHub
- [ ] `next.config.js` configured (included)
- [ ] `vercel.json` created (included)
- [ ] Projects connects via GitHub in Vercel dashboard
- [ ] Build succeeds (check build logs)
- [ ] `NEXT_PUBLIC_API_URL` environment variable set
- [ ] Frontend redeploys after env var change
- [ ] Health check page loads: https://your-frontend.vercel.app/
- [ ] Form loads without errors

---

## Render Deployment Checklist

- [ ] Backend code pushed to GitHub
- [ ] `server.js` runs locally: `node server.js`
- [ ] Render Web Service created and connected to GitHub
- [ ] Build command: `npm install`
- [ ] Start command: `node server.js`
- [ ] Instance type: Free
- [ ] `GEMINI_API_KEY` environment variable set
- [ ] Health check passes: `curl https://your-backend.onrender.com/health`
- [ ] Backend auto-deploys on git push

---

## Connecting Frontend to Backend

1. Get your Render backend URL
2. Go to Vercel → Project Settings → Environment Variables
3. Add: `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com`
4. Trigger redeploy: `vercel --prod` or push to GitHub
5. Wait 2-3 minutes for redeploy
6. Test by submitting form on frontend

---

## Monitoring Production

### Vercel
- Dashboard: https://vercel.com/dashboard
- Projects → CardioCheck AI Frontend → Analytics
- Check: Response times, Page load times, Error rates

### Render
- Dashboard: https://dashboard.render.com
- Service → Logs (real-time)
- Service → Metrics (CPU, memory)

---

## Manual Testing After Deployment

### 1. Health Check Backend
```bash
curl https://your-render-backend.onrender.com/health
```
Should return: `{"status":"OK","message":"CardioCheck AI API is running"}`

### 2. Test Full Assessment
```bash
curl -X POST https://your-render-backend.onrender.com/assess \
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

### 3. Visit Frontend in Browser
- Open: https://your-vercel-frontend.vercel.app
- Fill form
- Submit
- Should see risk assessment within 3-5 seconds

### 4. Check Console for Errors (F12)
- No red errors
- Check Network tab for successful API calls

---

## Rollback Plan

### If Frontend Has Issues
1. Go to Vercel Dashboard
2. Click Deployments
3. Select previous successful deployment
4. Click "Promote to Production"
5. Redeploy: `vercel --prod`

### If Backend Has Issues
1. Go to Render Dashboard
2. Click Deployments
3. Select previous deployment
4. Click "Deploy"

---

## Staying in Free Tier

- Vercel: Unlimited free deployments
- Render: 750 free hours / month (= 24/7 for ~25 days)
- Gemini: 60 free API calls/day

**Tips to stay free:**
1. Use free instances (included)
2. Render free tier auto-sleeps after 15 min inactivity (acceptable for MVP)
3. Keep API calls under 60/day during testing
4. Monitor usage weekly

---

## Scaling Beyond MVP

**When you need to scale:**

1. **Always-on Backend**: Upgrade Render to paid plan ($7/mo)
2. **Better Analytics**: Upgrade Vercel to Pro ($20/mo)
3. **Database**: Add Supabase for user data ($25/mo)
4. **Gemini API**: Switch to pay-as-you-go pricing

**Total Scaling Cost**: ~$50/month

---

## Support Resources

- Vercel: https://vercel.com/support
- Render: https://render.com/docs
- Google Gemini: https://ai.google.dev/docs
- Next.js: https://nextjs.org/docs
- Express: https://expressjs.com/

---

**Your app is production-ready!** Deploy with confidence.
