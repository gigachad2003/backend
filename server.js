const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: 'password', // Your MySQL password
    database: 'flutter_login'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Login API
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    
    db.query(sql, [username, password], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json({ status: 'success', message: 'Login successful' });
        } else {
            res.json({ status: 'error', message: 'Invalid credentials' });
        }
    });
});

// Signup Endpoint
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error' });

        if (result.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
            if (err) return res.status(500).json({ message: 'Signup failed' });
            res.status(200).json({ message: 'Signup successful' });
        });
    });
});

// API to fetch all PSUs
app.get('/psulist', (req, res) => {
    const sql = 'SELECT * FROM PSU'; // Adjust table name accordingly
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching PSU data:', err);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.json(results);
    });
  });
  


app.listen(3000, () => {
    console.log('Server running on port 3000');
});
