const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/book.routes');
const reviewRoutes = require('./routes/review.routes');

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/book-review-app');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

connectDB();

// Simple test route
app.get('/', (req, res) => {
    res.send('Book Review API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 