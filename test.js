const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Import route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Middleware to handle CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/auth', authRoutes);            // Authentication routes (login/register)
app.use('/api/users', userRoutes);           // User management routes
app.use('/api/departments', departmentRoutes); // Department-related routes
app.use('/api/courses', courseRoutes);       // Course-related routes
app.use('/api/students', studentRoutes);     // Student-related routes

// Basic test route to check server functionality
app.get('/', (req, res) => {
    res.send('Server is running. Welcome to the API!');
});

// Set port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
