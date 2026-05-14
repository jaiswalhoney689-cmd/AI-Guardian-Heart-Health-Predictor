# CardioCheck AI - System Architecture

## Local Development Environment

```
Your Computer
├── Frontend (localhost:3000)
│   ├── Next.js development server
│   ├── React components
│   └── Tailwind CSS styling
│
├── Backend (localhost:5000)
│   ├── Express server
│   ├── API endpoints
│   └── Gemini integration
│
└── Terminal
    └── npm run dev (both services)
```

## Production Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USERS' BROWSERS                          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    HTTPS Request/Response
                             │
        ┌────────────────────┴────────────────────┐
        │                                         │
┌───────▼──────────────────┐         ┌───────────▼──────────────┐
│   VERCEL (Frontend)      │         │   RENDER (Backend)       │
│                          │         │                          │
│ ┌──────────────────────┐ │         │ ┌────────────────────┐   │
│ │ CDN (Global edge)    │ │         │ │ Node.js Server     │   │
│ │                      │ │         │ │ (Express)          │   │
│ │ - index.html         │ │         │ │                    │   │
│ │ - CSS/JS bundles     │ │         │ │ /assess endpoint   │   │
│ │ - Images             │ │         │ │ /health endpoint   │   │
│ └──────────────────────┘ │         │ └────────┬───────────┘   │
│           ▲              │         │          │               │
│           │              │         │          ▼               │
│    Auto-deploy from      │         │    Auto-deploy from     │
│    GitHub (main branch)  │         │    GitHub (main branch) │
│                          │         │                         │
│ Env vars:               │         │ Env vars:              │
│ - NEXT_PUBLIC_API_URL   │         │ - GEMINI_API_KEY       │
│                          │         │ - NODE_ENV             │
└──────────────────────────┘         └────────────────────────┘
        │                                    │
        │ Static files cached at            │ Auto-restart on failure
        │ edge (< 100ms latency)            │ Log streaming
        │                                    │
        └────────────────────┬───────────────┘
                             │
                          HTTPS
                             │
                    ┌────────▼────────┐
                    │  GitHub GitHub  │
                    │   Repository    │
                    │ (Source Code)   │
                    │                 │
                    │ - main branch   │
                    │ - Auto-pull     │
                    │ - Auto-build    │
                    │ - Auto-deploy   │
                    └─────────────────┘
```

## Request Flow

### User Submits Health Form

```
1. User fills form on frontend
   ↓
2. Form validation (client-side)
   ↓
3. HTTPS POST to backend API
   ↓
4. Backend receives JSON data
   ↓
5. Validate health metrics
   ↓
6. Send to Gemini API (with system prompt)
   ↓
7. Gemini generates risk assessment
   ↓
8. Parse JSON response
   ↓
9. Send back to frontend (HTTPS)
   ↓
10. Frontend displays color-coded results
    and personalized recommendations
   ↓
11. User sees complete assessment in 3-5 seconds
```

## Component Interactions

```
Frontend (Vercel)              Backend (Render)              External API
┌─────────────────┐             ┌──────────────┐             ┌──────────┐
│ React App       │             │ Express API  │             │ Gemini   │
│                 │             │              │             │          │
│ ┌─────────────┐ │             │ ┌──────────┐ │             │ ┌──────┐ │
│ │ Health Form │─────POST /assess─→│ server.js│────LLM call─→│ Flash  │
│ └─────────────┘ │             │ └──────────┘ │             │ Model  │
│                 │             │              │             │        │
│ ┌─────────────┐ │             │ ┌──────────┐ │             │ ┌──────┐ │
│ │Risk Result  │←─────JSON──────│ Risk Data │←─────JSON─────│ Result │
│ └─────────────┘ │             │ └──────────┘ │             │        │
│                 │             │              │             │        │
└─────────────────┘             └──────────────┘             └──────────┘
   HTTPS                           HTTPS                      API
   (port 443)                      (port 443)                 (secure)
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│  Browser (localhost:3000)                                       │
│                                                                  │
│  ┌────────────────────────┐                                     │
│  │  HealthForm.jsx        │                                     │
│  │  • age: 35             │                                     │
│  │  • gender: male        │                                     │
│  │  • weight: 75 kg       │                                     │
│  │  • height: 180 cm      │                                     │
│  │  • systolicBP: 130     │                                     │
│  │  • diastolicBP: 85     │                                     │
│  │  • cholesterol: 200    │                                     │
│  │  • smoking: no         │                                     │
│  │  • exercise: moderate  │                                     │
│  │  • familyHistory: no   │                                     │
│  └──────────────┬─────────┘                                     │
│                 │ JSON payload                                  │
│                 │ via fetch() / axios                           │
│                 ▼                                               │
│         ┌───────────────┐                                       │
│         │ axios.post()  │                                       │
│         │ endpoint:     │                                       │
│         │ /assess       │                                       │
│         └───────┬───────┘                                       │
└─────────────────┼──────────────────────────────────────────────┘
                  │ HTTPS
                  │ request sent to backend URL
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│  Server (https://backend.onrender.com:5000)                     │
│                                                                  │
│  ┌──────────────────────────────┐                               │
│  │ server.js                    │                               │
│  │ POST /assess endpoint        │                               │
│  └───────────────┬──────────────┘                               │
│                  │ receives JSON                                │
│                  ▼                                              │
│  ┌──────────────────────────────┐                               │
│  │ Validate Data                │                               │
│  │ • Check required fields      │                               │
│  │ • Parse numbers              │                               │
│  └───────────────┬──────────────┘                               │
│                  │                                              │
│                  ▼                                              │
│  ┌──────────────────────────────┐                               │
│  │ Calculate Metrics            │                               │
│  │ • BMI = weight/(height²)     │                               │
│  │ • Create user prompt         │                               │
│  └───────────────┬──────────────┘                               │
│                  │                                              │
│                  ▼                                              │
│  ┌──────────────────────────────┐                               │
│  │ Call Gemini API              │                               │
│  │ • System prompt (role)       │                               │
│  │ • User prompt (data)         │                               │
│  │ • Request response as JSON   │                               │
│  └───────────────┬──────────────┘                               │
└─────────────────┼────────────────────────────────────────────────┘
                  │ HTTPS
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│  Google Gemini API                                              │
│                                                                  │
│  ┌──────────────────────────────────┐                           │
│  │ 1.5 Flash Model                  │                           │
│  │ • Analyzes health data           │                           │
│  │ • Calculates risk level          │                           │
│  │ • Generates recommendations      │                           │
│  │ • Returns JSON response          │                           │
│  └───────────────┬──────────────────┘                           │
│                  │                                              │
│                  ▼                                              │
│  Response: {                                                    │
│    "risk_level": "Moderate",                                   │
│    "risk_score_pct": 22,                                       │
│    "summary": "Your risk is moderate...",                      │
│    "recommendations": ["Exercise...", "Reduce salt...", ...]  │
│  }                                                              │
│                                                                  │
└─────────────────┬────────────────────────────────────────────────┘
                  │ HTTPS
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│  Server (localhost:5000)                                        │
│                                                                  │
│  ┌────────────────────────────────┐                             │
│  │ Parse Gemini Response          │                             │
│  │ • Extract JSON                 │                             │
│  │ • Validate structure           │                             │
│  │ • Format for frontend          │                             │
│  └────────────────┬───────────────┘                             │
│                   │ res.json()                                  │
└───────────────────┼───────────────────────────────────────────┬─┘
                    │ HTTPS
                    ▼
┌─────────────────────────────────────────────────────────────────┐
│  Browser (localhost:3000)                                       │
│                                                                  │
│  ┌──────────────────────────────┐                               │
│  │ RiskResult.jsx               │                               │
│  │ • Display risk score          │                              │
│  │ • Show color-coded card       │                              │
│  │ • List recommendations        │                              │
│  │ • Show disclaimer             │                              │
│  │ • Option to reset form        │                              │
│  └──────────────────────────────┘                               │
│                                                                  │
│  USER SEES: Green/Yellow/Red card with score and advice        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Deployment Workflow

```
Developer's Computer
        │
        ▼
Git Repository (GitHub)
        │
        ├─────────────────────┐
        │                     │
        ▼                     ▼
   Frontend Repo         Backend Repo
   (main branch)         (main branch)
        │                     │
        │ (Webhook)           │ (Webhook)
        ▼                     ▼
   Vercel Build         Render Build
   (automatic)          (automatic)
        │                     │
        ▼                     ▼
   Vercel Deploy        Render Deploy
   (CDN worldwide)      (Container)
        │                     │
        └──────────┬──────────┘
                   │
                   ▼
            Users' Browsers
            https://app.vercel.app
                   │ HTTPS
                   │
    https://api.onrender.com
```

## Environment Variables

```
Frontend (Vercel)
├── NEXT_PUBLIC_API_URL=https://api.onrender.com
└── (passed to browser as window config)

Backend (Render)
├── GEMINI_API_KEY=sk-xxxx...
├── NODE_ENV=production  
└── PORT=5000
```

## Monitoring Points

```
User → Browser         [Vercel Analytics]
       → Frontend      [Network tab - F12]
       → Backend       [Render Logs]
       → Gemini API    [API quotas]
```

---

## Key Points

✅ **Zero database** - Stateless design
✅ **Auto-scaling** - Both platforms auto-scale
✅ **Auto-deploy** - Push to GitHub = automatic deploy
✅ **Auto-restart** - Services restart on crash
✅ **Global CDN** - Vercel serves from edge
✅ **Secure** - HTTPS/TLS everywhere
✅ **No custom infrastructure** - Fully managed

---

**This architecture can scale from MVP to production without changes!** 🚀
