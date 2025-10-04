const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration - Update with your actual Vercel URL
const allowedOrigins = [
  'http://localhost:3000',
  'https://pos-strakins-projects.vercel.app', // Your Vercel frontend URL
  'https://pos-b9nt4emqx-strakins-projects.vercel.app/' // If you have a custom domain
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      console.log('CORS blocked origin:', origin);
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/sales', require('./routes/sales'));
app.use('/api/users', require('./routes/users'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend is working!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Test route to verify CORS
app.get('/api/test-cors', (req, res) => {
  res.json({ 
    message: 'CORS is working!',
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    message: 'API endpoint not found',
    path: req.path,
    method: req.method
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/inventory-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`CORS allowed origins: ${allowedOrigins.join(', ')}`);
});