import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration - allow both the old and new frontend addresses
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Chuba Backend' });
});

// Travel rules endpoint
app.post('/api/travel-rules', async (req, res) => {
  try {
    const { departure, destination } = req.body;

    if (!departure || !destination) {
      return res.status(400).json({ error: 'Missing departure or destination' });
    }

    console.log(`[Chuba] Checking: ${departure} -> ${destination}`);

    const mockResponse = {
      departure,
      destination,
      eligible: true,
      message: `Eligible for travel from ${departure} to ${destination}`,
      requirements: ['Valid passport', 'No visa required'],
    };

    res.json(mockResponse);
  } catch (error) {
    console.error('[Chuba] Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`[Chuba] Backend running on http://localhost:${PORT}`);
});
