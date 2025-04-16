// db.js

// Load environment variables from .env file
require('dotenv').config();

// Import mysql2
const mysql = require('mysql2');

// Create a pool of connections
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the promise-based pool
module.exports = pool.promise();
