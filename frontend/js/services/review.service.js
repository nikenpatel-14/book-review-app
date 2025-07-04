// Review Service
app.service('ReviewService', ['$http', function ($http) {
    const API_URL = 'http://localhost:5000/api';

    // Get reviews for a book
    this.getBookReviews = function (bookId) {
        return $http.get(`${API_URL}/books/${bookId}/reviews`)
            .then(response => response.data);
    };

    // Get current user's reviews
    this.getMyReviews = function () {
        return $http.get(`${API_URL}/reviews/me`)
            .then(response => response.data);
    };

    // Get a single review
    this.getReview = function (id) {
        return $http.get(`${API_URL}/reviews/${id}`)
            .then(response => response.data);
    };

    // Create a review for a book
    this.createReview = function (bookId, reviewData) {
        return $http.post(`${API_URL}/books/${bookId}/reviews`, reviewData)
            .then(response => response.data);
    };

    // Update a review
    this.updateReview = function (id, reviewData) {
        return $http.put(`${API_URL}/reviews/${id}`, reviewData)
            .then(response => response.data);
    };

    // Delete a review
    this.deleteReview = function (id) {
        return $http.delete(`${API_URL}/reviews/${id}`)
            .then(response => response.data);
    };
}]); 