const express = require('express');
const {
    getBookReviews,
    getMyReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview
} = require('../controllers/review.controller');

const { protect } = require('../middlewares/auth');

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(getBookReviews)
    .post(protect, createReview);

router.route('/me').get(protect, getMyReviews);

router
    .route('/:id')
    .get(getReview)
    .put(protect, updateReview)
    .delete(protect, deleteReview);

module.exports = router; 