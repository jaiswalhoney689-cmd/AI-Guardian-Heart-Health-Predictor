# CardioCheck AI - MVP Application

**Know your heart risk in 2 minutes.**

A web application that helps young adults (18-40) assess their cardiovascular disease risk using AI and receive personalized health recommendations.

## Architecture

### Frontend (Next.js)
- **Technology**: React with Next.js 14
- **Styling**: Tailwind CSS
- **Features**:
  - Single-page web app (no authentication required)
  - Health metrics form
  - Real-time AI risk assessment
  - Color-coded results (Low/Moderate/High)
  - Personalized recommendations display

### Backend (Node.js + Express)
- **Framework**: Express.js
- **AI Integration**: Google Gemini 1.5 Flash
- **API Endpoint**: `POST /assess`
- **Features**:
  - Structured Gemini prompts
  - JSON-based risk assessment
  - CORS-enabled for frontend communication

## Prerequisites

You need to have installed on your system:
- **Node.js** (v16 or higher) - [Download from nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Google Gemini API Key** - [Get one free from Google AI Studio](https://aistudio.google.com/app/apikey)

## Setup Instructions

### 1. Set Up Environment Variables

#### Backend (.env)
Navigate to the `backend` folder and create a `.env` file:

```bash
cd backend
cp .env.example .env
```

Edit `.env` and add your Gemini API key:
```
GEMINI_API_KEY=your_api_key_here
PORT=5000
NODE_ENV=development
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

## Running the Application

### Terminal 1: Start the Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
✓ CardioCheck AI Backend running on http://localhost:5000
✓ Available endpoints:
  - POST /assess
  - GET /health
```

### Terminal 2: Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

You should see:
```
▲ Next.js 14.0.0
- Local:        http://localhost:3000
```

### 3. Open the Application

Visit `http://localhost:3000` in your browser to use CardioCheck AI.

## API Documentation

### POST /assess

**Request:**
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
  "summary": "Your current risk is moderate based on your health metrics. Focus on lifestyle improvements to reduce risk.",
  "recommendations": [
    "Increase aerobic exercise to 150 minutes per week",
    "Reduce sodium intake and focus on heart-healthy foods",
    "Monitor your blood pressure regularly",
    "Schedule a check-up with your doctor for preventive screening"
  ]
}
```

### GET /health

Simple health check endpoint.

## Project Structure

```
Cardiocheck AI/
├── frontend/
│   ├── pages/
│   │   ├── _app.jsx
│   │   ├── _document.jsx
│   │   └── index.jsx (Main app page)
│   ├── components/
│   │   ├── HealthForm.jsx
│   │   └── RiskResult.jsx
│   ├── styles/
│   │   └── globals.css
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── .env.local
│
├── backend/
│   ├── server.js (Main server file)
│   ├── package.json
│   ├── .env (Add your Gemini API key here)
│   └── .env.example
│
└── README.md
```

## Features Implemented

✅ **MVP Core Features:**
- Single-page health metrics form
- Form fields: Age, gender, weight, height, BP, cholesterol, smoking, exercise, family history
- AI-powered risk assessment using Gemini API
- Color-coded risk scores (Low/Moderate/High)
- Personalized recommendations (4 per assessment)
- Mobile-first responsive design
- No authentication required (v1)
- No data storage/persistence (v1)
- Clean, simple UI with Tailwind CSS

❌ **Deliberately Excluded (MVP Scope):**
- User accounts/authentication
- Wearable/Apple Health integration
- Historical tracking/dashboard
- Payment/premium features
- Mobile native apps
- Database storage

## MVP Validation Metrics

Track these metrics to validate the MVP:

| Type | Metric | Target |
|------|--------|--------|
| Primary | Completion rate (users who complete form) | > 60% |
| Primary | Return visits (within 7 days) | > 20% |
| Signal | Social share/copy link | > 10% |
| Signal | Qualitative feedback (useful/actionable) | > 70% positive |
| Guard | API error rate | < 5% |
| Guard | Page load time (4G mobile) | < 3 seconds |

## Troubleshooting

### Backend won't start
- Check that port 5000 is available: `lsof -i :5000`
- Verify Gemini API key is set in `.env`
- Check internet connection (needed for Gemini API)

### Frontend won't connect to backend
- Verify backend is running on `http://localhost:5000`
- Check CORS is enabled (it is by default)
- Open browser console (F12) to see detailed error messages

### Gemini API errors
- Ensure API key is valid and from [Google AI Studio](https://aistudio.google.com/app/apikey)
- Check your free tier quota hasn't been exceeded
- Verify internet connectivity

## Deployment

### Frontend: Deploy to Vercel
```bash
npm install -g vercel
vercel deploy
```

### Backend: Deploy to Render
1. Push your `backend` folder to GitHub
2. Go to [render.com](https://render.com)
3. Create new Web Service
4. Connect GitHub repo
5. Set environment variables (GEMINI_API_KEY)
6. Deploy

## Important Legal Notes

⚠️ **Disclaimer**: This application is for informational purposes only and not a substitute for professional medical advice. Users should consult with healthcare professionals before making health decisions based on predictions from this tool.

## Contact

For issues or questions: jaiswalhoney689@gmail.com

---

**Project Timeline**: MVP built in 2-3 weeks for May 2026 launch.
**Version**: 0.1.0 (MVP)
