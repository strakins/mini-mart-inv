const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration for development
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://pos-amber-eight.vercel.app'
  ],
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
    environment: process.env.NODE_ENV,
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
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

// FIXED: 404 handler - use proper middleware without path pattern
app.use('/api', (req, res) => {
  res.status(404).json({ 
    message: 'API endpoint not found',
    path: req.path,
    method: req.method,
    availableEndpoints: [
      '/api/auth/login',
      '/api/auth/register',
      '/api/auth/health',
      '/api/products',
      '/api/sales',
      '/api/users',
      '/api/test-cors'
    ]
  });
});

// Catch-all 404 handler for non-API routes
app.use((req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// MongoDB connection with better error handling
const connectDB = async () => {
  try {
    // Use local MongoDB for development
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/inventory-app';
    
    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', mongoURI.replace(/mongodb\+srv:\/\/[^@]+@/, 'mongodb+srv://***@')); // Hide password
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('💡 Tips:');
    console.log('1. Make sure MongoDB is running locally: mongod');
    console.log('2. Or check your MONGODB_URI in .env file');
    console.log('3. For local development, use: mongodb://localhost:27017/inventory-app');
    
    // Don't exit in development, allow the server to start
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
    throw error; // Re-throw to handle in the startup
  }
};

// Connect to database and then start server
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📡 API URL: http://localhost:${PORT}/api`);
    console.log(`🔧 Health check: http://localhost:${PORT}/api/health`);
  });
}).catch(error => {
  console.error('❌ Failed to start server due to database connection error');
  console.log('💡 Starting server in limited mode...');
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} (Limited mode - no database)`);
    console.log('⚠️  Some features requiring database will not work');
  });
});