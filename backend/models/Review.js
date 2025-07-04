const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: [true, 'Please provide a rating'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot be more than 5']
    },
    comment: {
        type: String,
        required: [true, 'Please provide a review comment'],
        maxlength: [500, 'Comment cannot be more than 500 characters']
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Prevent user from submitting more than one review per book
ReviewSchema.index({ book: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', ReviewSchema); 