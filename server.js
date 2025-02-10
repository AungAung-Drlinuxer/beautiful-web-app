const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.set('view engine', 'ejs'); // Set EJS as the templating engine

// Routes
app.get('/', (req, res) => {
  const imageDir = path.join(__dirname, 'public', 'images');
  fs.readdir(imageDir, (err, files) => {
    if (err) {
      console.error('Error reading images folder:', err);
      return res.status(500).send('Error loading images');
    }
    const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file)); // Filter image files
    res.render('index', { title: 'Beautiful Web App', images });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
