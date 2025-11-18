import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API Routes
app.post('/parse-cv', async (req, res) => {
  try {
    const { default: handler } = await import('./backend/parse-cv.ts');
    await handler(req, res);
  } catch (error) {
    console.error('Parse CV error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/rewrite', async (req, res) => {
  try {
    const { default: handler } = await import('./backend/rewrite.ts');
    await handler(req, res);
  } catch (error) {
    console.error('Rewrite error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/contact', async (req, res) => {
  try {
    const { default: handler } = await import('./backend/contact.ts');
    await handler(req, res);
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Development API server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints:`);
  console.log(`   POST http://localhost:${PORT}/parse-cv`);
  console.log(`   POST http://localhost:${PORT}/rewrite`);
  console.log(`   POST http://localhost:${PORT}/contact`);
  console.log(`   GET  http://localhost:${PORT}/health`);
});