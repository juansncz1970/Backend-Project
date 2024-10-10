const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Determine if using a remote database
const useRemoteDB = process.env.DB_ENV === 'remote';

// Log the database connection details
console.log(`Connecting to ${useRemoteDB ? 'remote' : 'local'} database at ${useRemoteDB ? process.env.REMOTE_DB_HOST : process.env.DB_HOST}`);

// Create a connection pool
const pool = mysql.createPool({
    host: useRemoteDB ? process.env.REMOTE_DB_HOST : process.env.DB_HOST,
    user: useRemoteDB ? process.env.REMOTE_DB_USER : process.env.DB_USER,
    password: useRemoteDB ? process.env.REMOTE_DB_PASSWORD : process.env.DB_PASSWORD,
    database: useRemoteDB ? process.env.REMOTE_DB_NAME : process.env.DB_NAME,
    port: useRemoteDB ? process.env.REMOTE_DB_PORT : process.env.DB_PORT || 3306, // Default to 3306 if not set
    waitForConnections: true,
    connectionLimit: 10,     // Adjust based on your app's needs
    queueLimit: 0
});

// Test the connection using async/await
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log(`Successfully connected to the ${useRemoteDB ? 'remote' : 'local'} MySQL database!`);
        connection.release(); // Release the connection back to the pool
    } catch (err) {
        // Enhanced error logging
        console.error('Database connection error:', err.message);
        if (err.code) {
            console.error('Error code:', err.code);
        }
    }
};

// Invoke the test connection function
testConnection();

// Export the pool for use in other modules
module.exports = pool;
