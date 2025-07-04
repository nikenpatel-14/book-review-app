const Book = require('../models/Book');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate({
            path: 'createdBy',
            select: 'name'
        });

        res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
exports.getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
            .populate({
                path: 'createdBy',
                select: 'name'
            })
            .populate({
                path: 'reviews',
                populate: {
                    path: 'user',
                    select: 'name'
                }
            });

        if (!book) {
            return res.status(404).json({
                success: false,
                message: `Book not found with id of ${req.params.id}`
            });
        }

        res.status(200).json({
            success: true,
            data: book
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Create new book
// @route   POST /api/books
// @access  Private (Teachers only)
exports.createBook = async (req, res) => {
    try {
        // Add user to req.body
        req.body.createdBy = req.user.id;

        const book = await Book.create(req.body);

        res.status(201).json({
            success: true,
            data: book
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private (Teachers only)
exports.updateBook = async (req, res) => {
    try {
        let book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: `Book not found with id of ${req.params.id}`
            });
        }

        // Make sure user is the book creator
        if (book.createdBy.toString() !== req.user.id && req.user.role !== 'teacher') {
            return res.status(401).json({
                success: false,
                message: `User ${req.user.id} is not authorized to update this book`
            });
        }

        book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: book
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private (Teachers only)
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: `Book not found with id of ${req.params.id}`
            });
        }

        // Make sure user is the book creator
        if (book.createdBy.toString() !== req.user.id && req.user.role !== 'teacher') {
            return res.status(401).json({
                success: false,
                message: `User ${req.user.id} is not authorized to delete this book`
            });
        }

        await book.deleteOne();

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