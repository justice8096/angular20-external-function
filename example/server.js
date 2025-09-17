const express = require('express');
const path = require('path');

const app = express();
const root = path.join(__dirname);

// Serve static files from example
app.use(express.static(root));

// Rewrite /favicon.ico to /favicon.svg if requested
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(root, 'favicon.svg'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Example server running at http://localhost:${port}`));
