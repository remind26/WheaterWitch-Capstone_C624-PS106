const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Add this line to enable CORS

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Koneksi database MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'weatherwitch',
});

// Cek koneksi database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Endpoint untuk login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
      throw err;
    }

    if (result.length > 0) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Username or password incorrect' });
    }
  });
});

// Endpoint untuk registrasi
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Periksa apakah username atau email sudah ada dalam database
  const checkUserQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
  db.query(checkUserQuery, [username, email], (err, result) => {
    if (err) {
      console.error('Error checking user:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    if (result.length > 0) {
      // Jika username atau email sudah ada
      res.status(409).json({ message: 'Username or email already exists.' });
    } else {
      // Jika username dan email belum ada, lakukan insert ke database
      const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      // eslint-disable-next-line no-shadow
      db.query(insertUserQuery, [username, email, password], (err) => {
        if (err) {
          console.error('Error registering user:', err);
          res.status(500).json({ message: 'Failed to register user.' });
          return;
        }
        res.status(201).json({ message: 'User registered successfully.' });
      });
    }
  });
});

// Server listening
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
