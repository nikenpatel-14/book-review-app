// Book List Controller
app.controller('BookListController', ['$scope', 'BookService', function ($scope, BookService) {
    // Initialize books array
    $scope.books = [];
    $scope.loading = true;

    // Fetch all books
    BookService.getBooks()
        .then(response => {
            $scope.books = response.data;
            $scope.loading = false;
        })
        .catch(error => {
            console.error('Error fetching books:', error);
            $scope.loading = false;
        });
}]);

// Book Detail Controller
app.controller('BookDetailController', ['$scope', '$routeParams', 'BookService', 'ReviewService', 'AuthService',
    function ($scope, $routeParams, BookService, ReviewService, AuthService) {
        // Initialize variables
        $scope.book = null;
        $scope.reviews = [];
        $scope.newReview = {
            rating: 5,
            comment: ''
        };
        $scope.loading = true;
        $scope.error = '';
        $scope.success = '';
        $scope.hasReviewed = false;

        // Check if user is logged in
        $scope.isLoggedIn = AuthService.isLoggedIn();

        // Fetch book details
        BookService.getBook($routeParams.id)
            .then(response => {
                $scope.book = response.data;
                $scope.loading = false;

                // Load reviews
                return ReviewService.getBookReviews($routeParams.id);
            })
            .then(response => {
                $scope.reviews = response.data;

                // Check if current user has already reviewed this book
                if ($scope.isLoggedIn) {
                    const userId = AuthService.getCurrentUser().id;
                    $scope.hasReviewed = $scope.reviews.some(review => review.user._id === userId);
                }
            })
            .catch(error => {
                console.error('Error fetching book details:', error);
                $scope.error = 'Failed to load book details.';
                $scope.loading = false;
            });

        // Submit a review
        $scope.submitReview = function () {
            $scope.error = '';
            $scope.success = '';

            ReviewService.createReview($routeParams.id, $scope.newReview)
                .then(response => {
                    // Add the new review to the list
                    $scope.reviews.unshift(response.data);
                    $scope.hasReviewed = true;
                    $scope.success = 'Your review has been added successfully!';

                    // Clear form
                    $scope.newReview = {
                        rating: 5,
                        comment: ''
                    };
                })
                .catch(error => {
                    console.error('Error submitting review:', error);
                    $scope.error = error.message || 'Failed to submit review. Please try again.';
                });
        };
    }
]);

// Admin Book List Controller
app.controller('AdminBookListController', ['$scope', 'BookService', function ($scope, BookService) {
    // Initialize books array
    $scope.books = [];
    $scope.loading = true;
    $scope.error = '';
    $scope.success = '';

    // Fetch all books
    $scope.loadBooks = function () {
        $scope.loading = true;

        BookService.getBooks()
            .then(response => {
                $scope.books = response.data;
                $scope.loading = false;
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                $scope.error = 'Failed to load books.';
                $scope.loading = false;
            });
    };

    // Delete a book
    $scope.deleteBook = function (id, index) {
        if (confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
            BookService.deleteBook(id)
                .then(() => {
                    $scope.books.splice(index, 1);
                    $scope.success = 'Book deleted successfully!';
                })
                .catch(error => {
                    console.error('Error deleting book:', error);
                    $scope.error = 'Failed to delete book. Please try again.';
                });
        }
    };

    // Load books when controller initializes
    $scope.loadBooks();
}]);

// Admin Book Create Controller
app.controller('AdminBookCreateController', ['$scope', '$location', 'BookService',
    function ($scope, $location, BookService) {
        // Initialize book data
        $scope.book = {
            title: '',
            author: '',
            description: '',
            imageUrl: ''
        };

        $scope.error = '';
        $scope.loading = false;

        // Create a new book
        $scope.createBook = function () {
            $scope.error = '';
            $scope.loading = true;

            BookService.createBook($scope.book)
                .then(() => {
                    // Redirect to admin books list
                    $location.path('/admin/books');
                })
                .catch(error => {
                    console.error('Error creating book:', error);
                    $scope.error = error.message || 'Failed to create book. Please try again.';
                    $scope.loading = false;
                });
        };
    }
]);

// Admin Book Edit Controller
app.controller('AdminBookEditController', ['$scope', '$routeParams', '$location', 'BookService',
    function ($scope, $routeParams, $location, BookService) {
        // Initialize variables
        $scope.book = null;
        $scope.loading = true;
        $scope.error = '';

        // Fetch book details
        BookService.getBook($routeParams.id)
            .then(response => {
                $scope.book = response.data;
                $scope.loading = false;
            })
            .catch(error => {
                console.error('Error fetching book details:', error);
                $scope.error = 'Failed to load book details.';
                $scope.loading = false;
            });

        // Update book
        $scope.updateBook = function () {
            $scope.error = '';
            $scope.loading = true;

            BookService.updateBook($routeParams.id, $scope.book)
                .then(() => {
                    // Redirect to admin books list
                    $location.path('/admin/books');
                })
                .catch(error => {
                    console.error('Error updating book:', error);
                    $scope.error = error.message || 'Failed to update book. Please try again.';
                    $scope.loading = false;
                });
        };
    }
]); 