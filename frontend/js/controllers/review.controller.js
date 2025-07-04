// My Reviews Controller
app.controller('MyReviewsController', ['$scope', 'ReviewService', function ($scope, ReviewService) {
    // Initialize reviews array
    $scope.reviews = [];
    $scope.loading = true;
    $scope.error = '';
    $scope.success = '';

    // Load user's reviews
    $scope.loadReviews = function () {
        $scope.loading = true;

        ReviewService.getMyReviews()
            .then(response => {
                $scope.reviews = response.data;
                $scope.loading = false;
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
                $scope.error = 'Failed to load your reviews.';
                $scope.loading = false;
            });
    };

    // Delete a review
    $scope.deleteReview = function (id, index) {
        if (confirm('Are you sure you want to delete this review?')) {
            ReviewService.deleteReview(id)
                .then(() => {
                    $scope.reviews.splice(index, 1);
                    $scope.success = 'Review deleted successfully!';
                })
                .catch(error => {
                    console.error('Error deleting review:', error);
                    $scope.error = 'Failed to delete review. Please try again.';
                });
        }
    };

    // Open edit modal
    $scope.editReview = function (review) {
        $scope.editingReview = angular.copy(review);
        $scope.isEditing = true;
    };

    // Cancel edit
    $scope.cancelEdit = function () {
        $scope.isEditing = false;
        $scope.editingReview = null;
    };

    // Save edited review
    $scope.saveReview = function () {
        $scope.error = '';

        ReviewService.updateReview($scope.editingReview._id, {
            rating: $scope.editingReview.rating,
            comment: $scope.editingReview.comment
        })
            .then(response => {
                // Update the review in the list
                const index = $scope.reviews.findIndex(r => r._id === $scope.editingReview._id);
                if (index !== -1) {
                    $scope.reviews[index] = response.data.data;
                }

                $scope.success = 'Review updated successfully!';
                $scope.isEditing = false;
                $scope.editingReview = null;
            })
            .catch(error => {
                console.error('Error updating review:', error);
                $scope.error = 'Failed to update review. Please try again.';
            });
    };

    // Generate star rating array
    $scope.getStarRating = function (rating) {
        return Array(rating).fill(1);
    };

    // Generate empty stars array
    $scope.getEmptyStars = function (rating) {
        return Array(5 - rating).fill(1);
    };

    // Load reviews when controller initializes
    $scope.loadReviews();
}]); 