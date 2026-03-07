const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoute');
const rendezVousRoutes = require('./routes/rendezVousRoute');
const notifRoutes = require('./routes/notifRoute');

require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());


// Routes
app.use('/auth', authRoutes);
app.use('/rendez_vous', rendezVousRoutes);
app.use('/notif' , notifRoutes ) ;

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`♥ Server running on port ${PORT}`);
});
