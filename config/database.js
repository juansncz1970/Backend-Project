const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const useRemoteDB = process.env.DB_ENV === 'remote';  // You can control this via .env file

// Create a connection pool
const pool = mysql.createPool({
    host: useRemoteDB ? process.env.REMOTE_DB_HOST : process.env.DB_HOST,
    user: useRemoteDB ? process.env.REMOTE_DB_USER : process.env.DB_USER,
    password: useRemoteDB ? process.env.REMOTE_DB_PASSWORD : process.env.DB_PASSWORD,
    database: useRemoteDB ? process.env.REMOTE_DB_NAME : process.env.DB_NAME,
    port: useRemoteDB ? process.env.REMOTE_DB_PORT : process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,     // Adjust based on your app's needs
    queueLimit: 0
});

// Test the connection
pool.getConnection()
  .then(() => console.log(`Connected to the ${useRemoteDB ? 'remote' : 'local'} MySQL database!`))
  .catch(err => console.error('Database connection error:', err));

module.exports = pool;
