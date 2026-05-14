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

// System prompt for Gemini
const SYSTEM_PROMPT = `You are a preventive cardiology risk advisor. Based on the health inputs provided, return ONLY a valid JSON object with these keys: risk_level (Low/Moderate/High), risk_score_pct (0-100 integer), summary (2 sentences, plain English), recommendations (array of 4 strings). Do NOT provide a clinical diagnosis. Do NOT add any text outside the JSON.`

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

Based on these metrics, provide a cardiovascular disease risk assessment. The risk should consider age, gender, blood pressure, cholesterol, smoking status, physical activity, family history, and BMI. Return the response as valid JSON only.`

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent([
      { text: SYSTEM_PROMPT },
      { text: userPrompt },
    ])

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

// Start server
app.listen(PORT, () => {
  console.log(`✓ CardioCheck AI Backend running on http://localhost:${PORT}`)
  console.log(`✓ Available endpoints:`)
  console.log(`  - POST /assess`)
  console.log(`  - GET /health`)
  
  if (!process.env.GEMINI_API_KEY) {
    console.error('⚠ WARNING: GEMINI_API_KEY environment variable is not set')
  }
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...')
  process.exit(0)
})
