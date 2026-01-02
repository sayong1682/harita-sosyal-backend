const express = require('express');
const path = require('path');
const app = express();

// Statik dosyaları sun
app.use(express.static(path.join(__dirname, 'frontend')));

// Route'lar
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'register.html'));
});

app.get('/create-event', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'create-event.html'));
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
