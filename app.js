const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const workerRoutes = require('./routes/worker');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/worker', workerRoutes);

// ✅ Add this health check route
app.get('/health', (req, res) => {
  res.json({ status: "Backend is running ✅" });
});

// ✅ This must come AFTER the routes
module.exports = app;
