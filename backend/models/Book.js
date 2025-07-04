const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a book title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    author: {
        type: String,
        required: [true, 'Please provide an author name'],
        trim: true,
        maxlength: [50, 'Author name cannot be more than 50 characters']
    },
    description: {
        type: String,
        required: [true, 'Please provide a book description'],
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    imageUrl: {
        type: String,
        default: 'default-book.jpg'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for reviews
BookSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'book',
    justOne: false
});

module.exports = mongoose.model('Book', BookSchema); 