const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/books', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));

// Models
const Book = require('./models/Book');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const bookRoutes = require('./routes/bookRoutes.js');
app.use('/api/books', bookRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
