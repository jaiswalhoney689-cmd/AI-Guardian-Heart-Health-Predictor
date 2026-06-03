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

// System prompt for Gemini - Enhanced for transparency and reasoning
const SYSTEM_PROMPT = `You are a preventive cardiology risk advisor providing educational health information only.

IMPORTANT: You are providing EDUCATIONAL assessment only, NOT medical diagnosis or treatment advice.

Return a JSON object ONLY with these exact keys:
- risk_level: One of "Low", "Moderate", or "High"
- risk_score_pct: Integer 0-100
- summary: 2-3 sentence plain English summary (NOT medical advice)
- factors: Array of objects [{factor: string name, impact: string explanation, level: "low"/"moderate"/"high"}] - list 3-5 key factors
- recommendations: Array of 4 strings with general health awareness suggestions (NOT medical recommendations)
- ai_reasoning: Detailed explanation paragraph of how risk score was calculated and what factors contributed
- sleep_risk: 0-100 integer for sleep contribution
- stress_risk: 0-100 integer for stress contribution

Guidelines:
- Use "awareness" and "educational" language, never diagnostic language
- Explain risk factors in understandable terms
- Always note that professional medical consultation is needed
- Be transparent about what data points most influenced the assessment
- Focus on modifiable and non-modifiable risk factors
- Do NOT provide medical advice, only awareness education

Consider all provided factors: age, BMI, blood pressure, cholesterol, smoking, exercise, family history, medical conditions, sleep, stress.`

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
    const userPrompt = `EDUCATIONAL CARDIOVASCULAR AWARENESS ASSESSMENT

Patient Health Data:
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
- Medical Conditions: ${medicalHistorySummary}${otherDisease ? ` (+ ${otherDisease})` : ''}
- Current Smoking Habit: ${smokingHabit}
- Alcohol Use: ${alcoholUse}
- Average Sleep: ${sleep} hours/night
- Daily Stress Level: ${stress}/5 (1=very low, 5=very high)

Context:
This is an EDUCATIONAL assessment tool. The user is seeking awareness information about cardiovascular health factors, NOT seeking medical diagnosis or treatment. This assessment should:
1. Identify risk awareness level (Low/Moderate/High) based on evidence-based guidelines
2. List specific factors that contributed to this assessment
3. Explain the reasoning transparently
4. Provide health awareness suggestions (not medical prescriptions)

Risk Factor Considerations:
- Age is a non-modifiable factor
- Sleep: <6 hours or >10 hours significantly increases cardiovascular stress
- Chronic stress (level 4-5) is a documented cardiovascular risk factor
- Family history multiplies personal risk
- Smoking is a major modifiable risk factor
- Exercise is protective
- BMI >25 increases risk, especially with sedentary lifestyle
- Medical conditions like diabetes and hypertension significantly increase risk

Generate JSON response with:
- Clear educational messaging
- Transparent factor analysis
- Specific reasoning explanation
- Health awareness recommendations
- Sleep and stress risk components`

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
            'Maintain a balanced diet with regular monitoring of weight and health metrics.',
            'Aim for 150 minutes of moderate aerobic exercise per week.',
            'Consult with your primary care provider for regular health check-ups and risk assessment.',
            'Consider stress management techniques like meditation, yoga, or other relaxation methods.',
          ]

          // Build factors list
          const factors = []
          
          if (age > 55) {
            factors.push({ factor: 'Age', impact: `At age ${age}, cardiovascular risk naturally increases with age as a non-modifiable factor`, level: 'moderate' })
          }
          
          if (smoking === 'yes' || smoking === 'current') {
            factors.push({ factor: 'Smoking Status', impact: 'Current smoking is a major modifiable cardiovascular risk factor', level: 'high' })
          }
          
          if (bmi > 25) {
            factors.push({ factor: 'BMI', impact: `BMI of ${bmi} indicates overweight status, which increases cardiovascular stress`, level: bmi > 30 ? 'high' : 'moderate' })
          }
          
          if (medicalHistory && (medicalHistory.diabetes || medicalHistory.hypertension)) {
            factors.push({ factor: 'Medical Conditions', impact: 'Diabetes and/or hypertension are significant cardiovascular risk factors', level: 'high' })
          }
          
          if (sleepVal < 6 || sleepVal > 10) {
            factors.push({ factor: 'Sleep Pattern', impact: `${sleepVal} hours of sleep is outside the healthy range (7-9 hours), increasing cardiovascular stress`, level: 'high' })
          }
          
          if (stressVal >= 4) {
            factors.push({ factor: 'Stress Level', impact: `Daily stress level of ${stressVal}/5 indicates chronic stress, a documented cardiovascular risk factor`, level: 'high' })
          }

          // Detailed reasoning
          const reasoning = `Based on your health profile, your cardiovascular risk assessment shows a "${level}" risk level with a score of ${score}%. Key contributing factors include: ${factors.map(f => f.factor).join(', ') || 'age and general health status'}. This assessment is educational only and based on evidence-based cardiovascular risk guidelines. Professional medical evaluation by a cardiologist or physician is recommended for comprehensive diagnosis and treatment planning.`

          return {
            risk_level: level,
            risk_score_pct: score,
            summary: `Based on your health profile, your estimated cardiovascular risk awareness level is ${level}. This assessment considered your age, lifestyle, medical history, and current health metrics. Please consult a healthcare provider for professional evaluation.`,
            factors: factors.length > 0 ? factors : [
              { factor: 'General Health Status', impact: 'Your overall health metrics suggest baseline cardiovascular health considerations', level: 'low' }
            ],
            recommendations,
            ai_reasoning: reasoning,
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
      assessmentData.risk_score_pct === undefined ||
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
    
    // Ensure factors array exists
    if (!Array.isArray(assessmentData.factors)) {
      assessmentData.factors = [
        { factor: 'Age', impact: `Age ${age} is a risk factor for cardiovascular disease`, level: age > 55 ? 'moderate' : 'low' },
        { factor: 'Lifestyle', impact: 'Physical activity and exercise frequency affect cardiovascular health', level: exerciseFrequency === 'sedentary' ? 'high' : 'low' },
        { factor: 'Sleep Pattern', impact: `Average sleep of ${sleep} hours affects cardiovascular stress`, level: sleep < 6 || sleep > 10 ? 'high' : 'low' },
      ]
    }
    
    // Ensure AI reasoning exists
    if (!assessmentData.ai_reasoning) {
      assessmentData.ai_reasoning = `This educational assessment considered multiple cardiovascular risk factors from your health profile including age, lifestyle, medical history, and daily stress levels. The ${assessmentData.risk_level} risk level was determined by weighing modifiable factors (exercise, sleep, stress) against non-modifiable factors (age, family history). This is an educational awareness tool and does not replace professional medical evaluation.`
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
