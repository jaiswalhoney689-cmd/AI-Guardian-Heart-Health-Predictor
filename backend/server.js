require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { GoogleGenerativeAI } = require('@google/generative-ai')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const MODEL_NAME = process.env.MODEL_NAME || 'gemini-2.5-flash'

// System prompt for Gemini
const SYSTEM_PROMPT = `You are a preventive cardiology risk advisor. Based on the health inputs provided, return ONLY a valid JSON object with these keys: risk_level (Low/Moderate/High), risk_score_pct (0-100 integer), summary (2 sentences, plain English), recommendations (array of 4 strings), sleep_risk (0-100 integer), stress_risk (0-100 integer). The sleep_risk and stress_risk should reflect individual risk contributions from sleep and stress factors. Do NOT provide a clinical diagnosis. Do NOT add any text outside the JSON.`

// POST /assess - Main assessment endpoint
app.post('/assess', async (req, res) => {
  try {
    const {
      age,
      gender,
      weight,
      height,
      systolicBP,
      diastolicBP,
      cholesterol,
      smoking,
      exerciseFrequency,
      familyHistory,
      sleepHours,
      stressLevel,
    } = req.body

    // Validation
    if (
      !age ||
      !weight ||
      !height ||
      !systolicBP ||
      !diastolicBP ||
      !cholesterol
    ) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Validate sleep and stress (optional but set defaults if missing)
    const sleep = sleepHours || 7
    const stress = stressLevel || 3

    // Calculate BMI
    const heightInMeters = height / 100
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1)

    // Create user prompt with health data
    const userPrompt = `Patient Health Data:
- Age: ${age} years
- Gender: ${gender}
- Weight: ${weight} kg
- Height: ${height} cm
- BMI: ${bmi}
- Blood Pressure: ${systolicBP}/${diastolicBP} mmHg
- Total Cholesterol: ${cholesterol} mg/dL
- Smoking Status: ${smoking}
- Exercise Frequency: ${exerciseFrequency}
- Family History of Heart Disease: ${familyHistory}
- Average Sleep: ${sleep} hours/night
- Daily Stress Level: ${stress}/5 (1=very low, 5=very high)

Based on these metrics including sleep and stress factors, provide a cardiovascular disease risk assessment. Consider that sleep deprivation (<6h) and chronic stress (level 4-5) are known risk factors. The risk should consider age, gender, blood pressure, cholesterol, smoking status, physical activity, family history, BMI, sleep quality, and stress levels. Return the response as valid JSON only, including individual sleep_risk and stress_risk components (0-100).`

    // Call Gemini API
    let result
    try {
      const model = genAI.getGenerativeModel({ model: MODEL_NAME })
      result = await model.generateContent([
        { text: SYSTEM_PROMPT },
        { text: userPrompt },
      ])
    } catch (aiErr) {
      console.error('Error calling Generative AI model:', aiErr)
      // If model not found (404), try to list available models and return helpful message
      // If AI fails (missing key or model not available), fall back to a simple local heuristic
      console.warn('Falling back to local heuristic assessment (demo mode).')
      try {
        const fallback = (input) => {
          // Simple risk heuristic (demo-only): base score on age, BMI, BP, cholesterol, smoking, sleep, stress
          const ageScore = Math.min(Math.max((input.age - 30) * 0.6, 0), 30) // age contribution
          const bmi = (() => {
            const h = input.height / 100 || 1
            return Number((input.weight / (h * h))).toFixed(1)
          })()
          const bmiNum = parseFloat(bmi)
          const bmiScore = bmiNum > 25 ? Math.min((bmiNum - 24) * 2.5, 20) : 0
          const bpParts = (input.systolicBP || '0').toString().split('/').map(Number)
          const sys = Number(input.systolicBP) || (bpParts[0] || 0)
          const bpScore = sys > 130 ? Math.min((sys - 120) * 0.6, 20) : 0
          const chol = Number(input.cholesterol) || 0
          const cholScore = chol > 200 ? Math.min((chol - 180) * 0.12, 15) : 0
          const smokeScore = (input.smoking === 'yes' || input.smoking === 'current' || input.smoking === 'Current') ? 15 : 0
          
          // Sleep risk: <6h or >10h = high risk
          const sleepVal = input.sleepHours || 7
          const sleepRisk = sleepVal < 6 || sleepVal > 10 ? 60 : sleepVal >= 7 && sleepVal <= 9 ? 20 : 40
          
          // Stress risk: level 4-5 = high risk
          const stressVal = input.stressLevel || 3
          const stressRisk = stressVal >= 4 ? 60 : stressVal >= 3 ? 40 : 20

          let score = Math.round(ageScore + bmiScore + bpScore + cholScore + smokeScore)
          score = Math.min(Math.max(score, 1), 99)

          const level = score < 25 ? 'Low' : score < 55 ? 'Moderate' : 'High'

          const recommendations = [
            'Maintain a balanced diet and monitor weight regularly.',
            'Aim for 150 minutes of moderate exercise per week.',
            'Follow up with your primary care provider for blood pressure management.',
            'Consider lifestyle changes to reduce cholesterol and smoking cessation if applicable.'
          ]

          return {
            risk_level: level,
            risk_score_pct: score,
            summary: `Estimated ${level} cardiovascular risk based on provided inputs.`,
            recommendations,
            sleep_risk: Math.round(sleepRisk),
            stress_risk: Math.round(stressRisk),
            demo: true,
          }
        }

        const demoResult = fallback({ age, gender, weight, height, systolicBP, diastolicBP, cholesterol, smoking, exerciseFrequency, familyHistory, sleepHours: sleep, stressLevel: stress })
        return res.json(demoResult)
      } catch (fallbackErr) {
        console.error('Fallback assessment failed:', fallbackErr)
        return res.status(502).json({ error: 'AI request failed and local fallback failed', details: aiErr.message })
      }
    }

    const responseText = result.response.text()

    // Parse JSON response
    let assessmentData
    try {
      assessmentData = JSON.parse(responseText)
    } catch (parseError) {
      // If parsing fails, try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        assessmentData = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('Invalid JSON response from AI model')
      }
    }

    // Validate response structure
    if (
      !assessmentData.risk_level ||
      !assessmentData.risk_score_pct ||
      !assessmentData.summary ||
      !Array.isArray(assessmentData.recommendations)
    ) {
      throw new Error('Invalid response structure from AI model')
    }

    // Ensure optional fields have defaults
    if (!assessmentData.sleep_risk) {
      assessmentData.sleep_risk = sleep < 6 || sleep > 10 ? 60 : sleep >= 7 && sleep <= 9 ? 20 : 40
    }
    if (!assessmentData.stress_risk) {
      assessmentData.stress_risk = stress >= 4 ? 60 : stress >= 3 ? 40 : 20
    }

    // Ensure risk_level is properly capitalized
    assessmentData.risk_level = 
      assessmentData.risk_level.charAt(0).toUpperCase() + 
      assessmentData.risk_level.slice(1).toLowerCase()

    res.json(assessmentData)
  } catch (error) {
    console.error('Error in /assess endpoint:', error)
    res.status(500).json({
      error: 'Failed to assess heart disease risk',
      details: error.message,
    })
  }
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'CardioCheck AI API is running' })
})

// Start server with retry on EADDRINUSE
function startServer(port, attempts = 0) {
  const maxAttempts = 10
  const server = app.listen(port, () => {
    console.log(`✓ CardioCheck AI Backend running on http://localhost:${port}`)
    console.log(`✓ Available endpoints:`)
    console.log(`  - POST /assess`)
    console.log(`  - GET /health`)

    if (!process.env.GEMINI_API_KEY) {
      console.error('⚠ WARNING: GEMINI_API_KEY environment variable is not set')
    }
  })

  server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} is in use.`)
      if (attempts < maxAttempts) {
        const nextPort = port + 1
        console.log(`Trying next port: ${nextPort} (attempt ${attempts + 1}/${maxAttempts})`)
        setTimeout(() => startServer(nextPort, attempts + 1), 300)
      } else {
        console.error(`Unable to bind to ports starting at ${PORT} after ${maxAttempts} attempts.`)
        process.exit(1)
      }
    } else {
      console.error('Server error:', err)
      process.exit(1)
    }
  })
}

startServer(Number(PORT))

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...')
  process.exit(0)
})
