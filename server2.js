const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());



const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // from Supabase pooling URL
  ssl: {
    rejectUnauthorized: false
  }
});


// // PostgreSQL (Supabase) connection
// const pool = new Pool({
//   user: 'postgres.bqeuwmonxyysxpwwumvz',                  // from Supabase
//   host: 'aws-0-ap-south-1.pooler.supabase.com',        // from Supabase
//   database: 'postgres',              // default database name in Supabase
//   password: 'Akshit@42069',         // from Supabase
//   port: 6543,                        // default PostgreSQL port
//   ssl: { rejectUnauthorized: false } // required for Supabase
// });



//Login API
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (result.rows.length > 0) {
      res.json({ status: 'success', message: 'Login successful' });
    } else {
      res.json({ status: 'error', message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Database error' });
  }
});

// // Signup API
// app.post('/signup', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const check = await pool.query(
//       'SELECT * FROM users WHERE username = $1',
//       [username]
//     );

//     if (check.rows.length > 0) {
//       return res.status(400).json({ message: 'Username already exists' });
//     }

//     await pool.query(
//       'INSERT INTO users (username, password) VALUES ($1, $2)',
//       [username, password]
//     );

//     res.status(200).json({ message: 'Signup successful' });
//   } catch (err) {
//     console.error('Signup error:', err);
//     res.status(500).json({ message: 'Signup failed' });
//   }
// });

// // PSU list API
// app.get('/psulist', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM psu'); // table name must match
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error fetching PSU data:', err);
//     res.status(500).json({ error: 'Database error' });
//   }
// });

// Start server

app.listen(3000, () => {
  console.log('Server running on port 3000');
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  console.log("pg version:", require('pg/package.json').version);


});
