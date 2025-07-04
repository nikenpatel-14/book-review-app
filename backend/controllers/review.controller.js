const Review = require('../models/Review');
const Book = require('../models/Book');

// @desc    Get reviews for a book
// @route   GET /api/books/:bookId/reviews
// @access  Public
exports.getBookReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ book: req.params.bookId })
            .populate({
                path: 'user',
                select: 'name'
            });

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all reviews by current user
// @route   GET /api/reviews/me
// @access  Private
exports.getMyReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ user: req.user.id })
            .populate({
                path: 'book',
                select: 'title author'
            });

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Public
exports.getReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate({
                path: 'user',
                select: 'name'
            })
            .populate({
                path: 'book',
                select: 'title author'
            });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: `Review not found with id of ${req.params.id}`
            });
        }

        res.status(200).json({
            success: true,
            data: review
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Create review
// @route   POST /api/books/:bookId/reviews
// @access  Private
exports.createReview = async (req, res) => {
    try {
        req.body.book = req.params.bookId;
        req.body.user = req.user.id;

        // Check if book exists
        const book = await Book.findById(req.params.bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: `Book not found with id of ${req.params.bookId}`
            });
        }

        // Check if review already exists
        const existingReview = await Review.findOne({
            user: req.user.id,
            book: req.params.bookId
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: 'You have already reviewed this book'
            });
        }

        const review = await Review.create(req.body);

        res.status(201).json({
            success: true,
            data: review
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReview = async (req, res) => {
    try {
        let review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: `Review not found with id of ${req.params.id}`
            });
        }

        // Make sure review belongs to user or user is admin
        if (review.user.toString() !== req.user.id && req.user.role !== 'teacher') {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to update this review'
            });
        }

        review = await Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: review
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: `Review not found with id of ${req.params.id}`
            });
        }

        // Make sure review belongs to user or user is admin
        if (review.user.toString() !== req.user.id && req.user.role !== 'teacher') {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to delete this review'
            });
        }

        await review.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}; 