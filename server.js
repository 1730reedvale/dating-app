// server.js

const express = require('express');
const app = express();

// Middleware to parse incoming JSON
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Health check route for Render
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Use Render's port or fallback to 3000 for local testing
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
