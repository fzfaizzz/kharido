require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const profileRoutes = require('./routes/profile');
const ordersRoutes = require('./routes/orders');

// MongoDB connection URI
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/stepnest";

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Import and use routes
app.use('/api/user/profile', profileRoutes);
app.use('/api/user/orders', ordersRoutes);

// Auth check route
app.get('/api/check-auth', (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    res.json({ isLoggedIn: true });
  } else {
    res.json({ isLoggedIn: false });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
