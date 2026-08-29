import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Chuba Backend' });
});

app.post('/api/travel-rules', async (req, res) => {
  try {
    const { 
      departure, 
      destination, 
      equipmentValue, 
      healthStatus, 
      securityClearance 
    } = req.body;

    if (!departure || !destination) {
      return res.status(400).json({ error: 'Missing departure or destination' });
    }

    console.log(`[Chuba] Checking: ${departure} -> ${destination}`);
    console.log(`[Chuba] Equipment: $${equipmentValue || 0}`);
    console.log(`[Chuba] Health: ${healthStatus || 'Not provided'}`);
    console.log(`[Chuba] Security: ${securityClearance || 'Not provided'}`);

    // Build requirements based on fields
    const requirements = [
      'Valid passport required',
      'No visa required for this route',
    ];

    // Equipment check
    if (equipmentValue && parseInt(equipmentValue) > 10000) {
      requirements.push('Customs declaration required for equipment over $10,000');
    } else {
      requirements.push('Equipment value within customs limits');
    }

    // Health check
    if (healthStatus === 'FULLY_VACCINATED') {
      requirements.push('Health status: Fully vaccinated - no quarantine required');
    } else if (healthStatus === 'PARTIALLY_VACCINATED') {
      requirements.push('Health status: Partially vaccinated - COVID test may be required');
    } else if (healthStatus === 'NOT_VACCINATED') {
      requirements.push('Health status: Not vaccinated - quarantine may be required');
    } else {
      requirements.push('Health declaration may be required');
    }

    // Security check
    if (securityClearance === 'CERTIFIED') {
      requirements.push('Security clearance: Certified - access granted');
    } else if (securityClearance === 'PENDING') {
      requirements.push('Security clearance: Pending - access may be delayed');
    } else {
      requirements.push('Security clearance: Not provided - may require additional screening');
    }

    // Determine eligibility
    const eligible = true; // For demo purposes

    const mockResponse = {
      departure,
      destination,
      eligible,
      message: `Eligible for travel from ${departure} to ${destination}`,
      requirements,
      source: 'mock',
      timestamp: new Date().toISOString(),
    };

    res.json(mockResponse);

  } catch (error: any) {
    console.error('[Chuba] Error:', error.message);
    res.status(500).json({
      error: 'Failed to fetch travel requirements',
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`[Chuba] Backend running on http://localhost:${PORT}`);
  console.log(`[Chuba] Hackathon mode: using mock data`);
});
