# CardioCheck AI - Installation Guide

## Prerequisites Installation

This application requires **Node.js v16+** and **npm**. Follow the steps below for your system.

### macOS

#### Option 1: Download from nodejs.org (Easiest)

1. Visit [nodejs.org](https://nodejs.org/)
2. Download the **LTS (Long Term Support)** version
3. Run the installer
4. Follow the installation wizard
5. Verify installation:
   ```bash
   node --version
   npm --version
   ```

#### Option 2: Using Homebrew

1. If you don't have Homebrew, install it first:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
   (Note: This requires administrator access)

2. Install Node.js:
   ```bash
   brew install node@18
   ```

3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

#### Option 3: Using MacPorts
```bash
sudo port install nodejs18 +universal
```

### Windows

1. Visit [nodejs.org](https://nodejs.org/)
2. Download the **LTS** version for Windows
3. Run the `.msi` installer
4. Follow the Setup Wizard (accept defaults)
5. Open PowerShell and verify:
   ```powershell
   node --version
   npm --version
   ```

### Linux (Ubuntu/Debian)

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Google Gemini API Setup

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Get API Key"
3. Click "Create API Key" in new Google Cloud project
4. Copy your API key
5. You'll add this to the `.env` file in the next step

## Project Installation

Once Node.js and npm are installed:

### Step 1: Navigate to the project directory
```bash
cd "/Users/honeyjaiswal/Public/Cardiocheck AI"
```

### Step 2: Configure Backend Environment Variables

```bash
cd backend
cp .env.example .env
```

Now edit the `.env` file and add your Gemini API key:
```
GEMINI_API_KEY=your_api_key_here
PORT=5000
NODE_ENV=development
```

### Step 3: Install Backend Dependencies
```bash
npm install
```

You should see output similar to:
```
added 67 packages in 2.5s
```

### Step 4: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

You should see output similar to:
```
added 452 packages in 1m 23s
```

## Running the Application

### Terminal 1: Start the Backend Server

```bash
cd backend
npm run dev
```

Expected output:
```
✓ CardioCheck AI Backend running on http://localhost:5000
✓ Available endpoints:
  - POST /assess
  - GET /health
```

### Terminal 2: Start the Frontend Development Server

Open a **new terminal window/tab** and run:

```bash
cd frontend
npm run dev
```

Expected output:
```
▲ Next.js 14.0.0
- Local:        http://localhost:3000
- Environments: .env.local
```

### Step 3: Open the Application

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the CardioCheck AI application with a form to enter health metrics.

## Troubleshooting

### Error: "command not found: npm"
- Node.js is not installed or not in your PATH
- Restart your terminal after installing Node.js
- Try: `which node` and `which npm` to verify installation location
- Add Node.js to PATH if necessary

### Error: "ENOSPC: no space left on device"
- Your disk is full
- Free up space on your system

### Error: "Cannot find module 'express'"
- Run `npm install` again in the backend directory
- Check that you're in the correct directory
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Backend won't start on port 5000
- Check if port is in use: `lsof -i :5000` (macOS/Linux)
- Kill the process: `kill -9 <PID>`
- Or change PORT in `.env` to another number (e.g., 5001)

### Gemini API errors
- Verify your API key is correct in `.env`
- Check that you have internet connection
- Verify you haven't exceeded your free tier quota
- Get a new API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### CORS errors in browser console
- Ensure backend is running on `http://localhost:5000`
- Frontend should be on `http://localhost:3000`
- Check that both servers are running in separate terminals

### "Port 3000 already in use" for frontend
- Kill the process on port 3000: `lsof -i :3000` then `kill -9 <PID>`
- Or change port: `npm run dev -- -p 3001`

## Verifying Installation

### Check backend is working:
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{"status":"OK","message":"CardioCheck AI API is running"}
```

### Test the full assessment flow:
```bash
curl -X POST http://localhost:5000/assess \
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

## Next Steps

Once the application is running:

1. **Test the Form** - Fill out the health metrics form
2. **View Results** - See your AI-generated risk assessment
3. **Read Recommendations** - Get personalized health advice
4. **Share Feedback** - Test the application's usability

## Production Deployment

When ready to deploy:

- **Frontend**: Deploy to [Vercel](https://vercel.com)
- **Backend**: Deploy to [Render](https://render.com)

See the main README.md for deployment instructions.

---

**Need Help?** Check the [README.md](./README.md) for more information or contact: jaiswalhoney689@gmail.com
