const express = require('express');
const {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
} = require('../controllers/book.controller');

const { protect, authorize } = require('../middlewares/auth');

// Include other resource routers
const reviewRouter = require('./review.routes');

const router = express.Router();

// Re-route into other resource routers
router.use('/:bookId/reviews', reviewRouter);

router
    .route('/')
    .get(getBooks)
    .post(protect, authorize('teacher'), createBook);

router
    .route('/:id')
    .get(getBook)
    .put(protect, authorize('teacher'), updateBook)
    .delete(protect, authorize('teacher'), deleteBook);

module.exports = router; 