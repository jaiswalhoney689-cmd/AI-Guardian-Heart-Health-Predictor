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
const SYSTEM_PROMPT = `You are a preventive cardiology risk advisor. Based on the health inputs provided, return ONLY a valid JSON object with these keys: risk_level (Low/Moderate/High), risk_score_pct (0-100 integer), summary (2 sentences, plain English), recommendations (array of 4 strings), sleep_risk (0-100 integer), stress_risk (0-100 integer). Consider all provided health factors including family history, medical history, sleep, and stress. The sleep_risk and stress_risk should reflect individual risk contributions. Do NOT provide a clinical diagnosis. Do NOT add any text outside the JSON.`

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
      systolicBPUnknown,
      cholesterol,
      cholesterolUnknown,
      smoking,
      exerciseFrequency,
      familyHeartDisease,
      familyHighBP,
      familyDiabetes,
      familyStroke,
      familyHighCholesterol,
      medicalHistory,
      otherDisease,
      smokingHabit,
      alcoholUse,
      sleepHours,
      stressLevel,
    } = req.body

    // Validation - allow BP and cholesterol to be unknown
    if (!age || !weight || !height) {
      return res.status(400).json({ error: 'Missing required fields: age, weight, height' })
    }

    // Use provided values or mark as unknown
    const hasBP = !systolicBPUnknown && systolicBP && diastolicBP
    const hasChol = !cholesterolUnknown && cholesterol

    // Validate sleep and stress
    const sleep = sleepHours || 7
    const stress = stressLevel || 3

    // Calculate BMI
    const heightInMeters = height / 100
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1)

    // Format family history
    const familyHistorySummary = [
      familyHeartDisease === 'yes' && 'heart disease',
      familyHighBP === 'yes' && 'high blood pressure',
      familyDiabetes === 'yes' && 'diabetes',
      familyStroke === 'yes' && 'stroke',
      familyHighCholesterol === 'yes' && 'high cholesterol',
    ]
      .filter(Boolean)
      .join(', ') || 'none reported'

    // Format medical history
    const medicalHistorySummary = medicalHistory
      ? Object.entries(medicalHistory)
          .filter(([_, v]) => v)
          .map(([k]) => k)
          .join(', ') || 'none'
      : 'none'

    // Create user prompt with health data
    const userPrompt = `Patient Health Data:
- Age: ${age} years
- Gender: ${gender}
- Weight: ${weight} kg
- Height: ${height} cm
- BMI: ${bmi}
- Blood Pressure: ${hasBP ? `${systolicBP}/${diastolicBP} mmHg` : 'Not provided'}
- Total Cholesterol: ${hasChol ? `${cholesterol} mg/dL` : 'Not provided'}
- Smoking Status: ${smoking}
- Exercise Frequency: ${exerciseFrequency}
- Family History: ${familyHistorySummary}
- Past/Current Medical Conditions: ${medicalHistorySummary}${otherDisease ? ` (+ ${otherDisease})` : ''}
- Current Smoking: ${smokingHabit}
- Alcohol Use: ${alcoholUse}
- Average Sleep: ${sleep} hours/night
- Daily Stress Level: ${stress}/5 (1=very low, 5=very high)

Based on these comprehensive health metrics, provide a cardiovascular disease risk assessment. Consider that:
- Sleep deprivation (<6h) and excess sleep (>10h) are risk factors
- Chronic stress (level 4-5) increases cardiovascular risk
- Family history significantly influences personal risk
- Existing medical conditions (diabetes, hypertension, etc.) increase risk
- Missing data points should be estimated conservatively

Return the response as valid JSON only with individual sleep_risk and stress_risk components (0-100).`

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
      // Fallback to local heuristic
      console.warn('Falling back to local heuristic assessment (demo mode).')
      try {
        const fallback = (input) => {
          let score = 10 // base score
          
          // Age factor
          const ageScore = Math.min(Math.max((input.age - 30) * 0.6, 0), 30)
          score += ageScore

          // BMI factor
          const h = input.height / 100 || 1
          const bmiNum = parseFloat(input.weight / (h * h))
          const bmiScore = bmiNum > 25 ? Math.min((bmiNum - 24) * 2.5, 20) : 0
          score += bmiScore

          // Blood pressure
          if (input.systolicBP) {
            const sys = Number(input.systolicBP)
            const bpScore = sys > 130 ? Math.min((sys - 120) * 0.6, 20) : 0
            score += bpScore
          }

          // Cholesterol
          if (input.cholesterol) {
            const chol = Number(input.cholesterol)
            const cholScore = chol > 200 ? Math.min((chol - 180) * 0.12, 15) : 0
            score += cholScore
          }

          // Smoking
          const smokeScore = (input.smoking === 'yes' || input.smoking === 'current') ? 15 : 0
          score += smokeScore

          // Exercise
          const exerciseScore = input.exerciseFrequency === 'sedentary' ? 10 : input.exerciseFrequency === 'vigorous' ? -5 : 0
          score += exerciseScore

          // Family history
          const familyScore = (input.familyHeartDisease === 'yes' || input.familyHighBP === 'yes') ? 10 : 0
          score += familyScore

          // Medical history
          let medicalScore = 0
          if (input.medicalHistory) {
            if (input.medicalHistory.diabetes) medicalScore += 15
            if (input.medicalHistory.hypertension) medicalScore += 12
            if (input.medicalHistory.obesity) medicalScore += 8
            if (input.medicalHistory.kidney) medicalScore += 10
          }
          score += medicalScore

          // Sleep risk
          const sleepVal = input.sleepHours || 7
          const sleepRisk = sleepVal < 6 || sleepVal > 10 ? 60 : sleepVal >= 7 && sleepVal <= 9 ? 20 : 40

          // Stress risk
          const stressVal = input.stressLevel || 3
          const stressRisk = stressVal >= 4 ? 60 : stressVal >= 3 ? 40 : 20

          score = Math.min(Math.max(Math.round(score), 1), 99)

          const level = score < 25 ? 'Low' : score < 55 ? 'Moderate' : 'High'

          const recommendations = [
            'Maintain a balanced diet and monitor weight regularly.',
            'Aim for 150 minutes of moderate exercise per week.',
            'Follow up with your primary care provider for blood pressure and cholesterol management.',
            'Consider lifestyle changes and stress reduction techniques like meditation or mindfulness.',
          ]

          return {
            risk_level: level,
            risk_score_pct: score,
            summary: `Based on your health profile, your estimated cardiovascular risk is ${level}. Key factors include your age, lifestyle habits, family history, and existing health conditions.`,
            recommendations,
            sleep_risk: Math.round(sleepRisk),
            stress_risk: Math.round(stressRisk),
            demo: true,
          }
        }

        const demoResult = fallback(req.body)
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
