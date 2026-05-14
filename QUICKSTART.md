## 🚀 CardioCheck AI - Quick Start (After Node.js Installation)

**Your complete application code is ready!** Follow these steps to get it running.

### Prerequisites
- ✅ Node.js v16+ installed ([node --version](https://nodejs.org/))
- ✅ npm installed (comes with Node.js)
- ✅ Google Gemini API key ([Get free key](https://aistudio.google.com/app/apikey))

### Installation (5 minutes)

#### 1. Configure Backend (.env file)
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and add:
```
GEMINI_API_KEY=YOUR_API_KEY_HERE
PORT=5000
NODE_ENV=development
```

#### 2. Install Dependencies
```bash
# Terminal 1: Backend
cd backend
npm install

# Terminal 2: Frontend  
cd frontend
npm install
```

### Running (2 terminals needed)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Wait for: `✓ CardioCheck AI Backend running on http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Wait for: `- Local: http://localhost:3000`

### Open Application
Visit: `http://localhost:3000`

---

## What's Been Built

### ✅ Features Implemented

**Frontend (Next.js + Tailwind CSS)**
- Single-page health metrics form
- Form fields: Age, gender, weight/height, BP, cholesterol, smoking, exercise, family history
- Clean mobile-first responsive design
- Real-time form validation
- Color-coded risk result display
- Personalized recommendations view
- No authentication required

**Backend (Node.js + Express)**
- RESTful API with single endpoint: `POST /assess`
- Gemini AI integration for risk calculation
- Structured JSON responses
- CORS enabled for frontend communication
- Error handling and validation

**UI/UX**
- Clean gradient design with red theme
- Mobile-optimized layout
- Clear form labels and help text
- Color-coded risk levels (Green/Yellow/Red)
- Actionable recommendations display
- Medical disclaimer included

### ❌ Deliberately Excluded (Per MVP Spec)
- User authentication/login
- Database storage
- Wearable integration
- Historical tracking
- Payment system
- Mobile native apps

---

## Project Files

```
Cardiocheck AI/
├── frontend/
│   ├── pages/
│   │   ├── _app.jsx
│   │   ├── _document.jsx
│   │   └── index.jsx (Main application)
│   ├── components/
│   │   ├── HealthForm.jsx (Form component)
│   │   └── RiskResult.jsx (Results display)
│   ├── styles/
│   │   └── globals.css (Tailwind styles)
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── backend/
│   ├── server.js (Main API server)
│   ├── package.json
│   ├── .env (Add your API key here)
│   └── .env.example
│
├── README.md (Full documentation)
├── INSTALLATION.md (Detailed setup guide)
├── setup.sh (Auto setup script)
└── quickstart.sh (Quick start script)
```

---

## API Documentation

### Endpoint: POST /assess

**Request Body:**
```json
{
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
}
```

**Response:**
```json
{
  "risk_level": "Moderate",
  "risk_score_pct": 22,
  "summary": "Your current risk is moderate based on your health metrics. Continue monitoring and consider lifestyle improvements.",
  "recommendations": [
    "Increase aerobic exercise to 150 minutes per week",
    "Reduce sodium intake to less than 2,300mg daily",
    "Monitor blood pressure every 3 months",
    "Schedule annual preventive health screening"
  ]
}
```

---

## Testing the App

1. **Open** `http://localhost:3000`
2. **Fill in** the health metrics form with sample data
3. **Click** "Check My Risk"
4. **View** your personalized risk assessment
5. **Optionally** click "Check Again" to run another assessment

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| npm: command not found | Install Node.js from nodejs.org |
| Cannot find module 'express' | Run `npm install` in backend folder |
| Port 5000 already in use | `lsof -i :5000` and `kill -9 <PID>` |
| Port 3000 already in use | `lsof -i :3000` and `kill -9 <PID>` |
| Gemini API errors | Check GEMINI_API_KEY in .env |
| CORS errors | Verify both servers running on correct ports |

---

## Deployment

**Frontend → Vercel:** `vercel deploy`
**Backend → Render:** Connect GitHub repo to render.com

See full details in README.md

---

## Key Technologies Used

✅ **Next.js 14** - React framework
✅ **Tailwind CSS** - Styling
✅ **Express.js** - Backend API
✅ **Google Gemini 1.5 Flash** - AI model
✅ **CORS** - Cross-origin requests
✅ **dotenv** - Environment variables

---

## Important Notes

⚠️ **This app is for informational purposes only** — not a medical diagnosis tool. Users should consult healthcare professionals.

📅 **MVP Built**: April 2026
🎯 **Target Launch**: May 2026
👥 **Target Users**: Young adults (18-40) wanting heart health insights

---

## Next Steps

1. ✅ Install Node.js
2. ✅ Add Gemini API key to `.env`
3. ✅ Run `npm install` in both folders
4. ✅ Start backend: `npm run dev` in backend/
5. ✅ Start frontend: `npm run dev` in frontend/
6. ✅ Visit http://localhost:3000
7. ✅ Test the complete flow
8. 📊 Collect user feedback
9. 🚀 Deploy to Vercel + Render

---

**Questions?** See INSTALLATION.md or README.md for complete documentation.
