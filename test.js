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
    const html = `
        <html>
            <head>
                <style>
                    body {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                    }
                    h1 {
                        font-size: 48px;
                        color: #333;
                    }
                    p {
                        font-size: 24px;
                        color: #555;
                    }
                </style>
            </head>
            <body>
                <div>
                    <h1>Server is running. Welcome to the API!</h1>
                    <p>John Francis Volante - College of Computer Science</p>
                </div>
            </body>
        </html>
    `;
    res.send(html);
});

// Set port from environment variables or default to 3000 (adjusted)
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});