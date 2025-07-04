// Login Controller
app.controller('LoginController', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {
    // Initialize login form data
    $scope.loginData = {
        email: '',
        password: ''
    };

    // Initialize error message
    $scope.error = '';

    // Handle form submission
    $scope.login = function () {
        // Reset error message
        $scope.error = '';

        // Attempt to login
        AuthService.login($scope.loginData)
            .then(() => {
                // Redirect to home page on success
                $location.path('/');
            })
            .catch(error => {
                // Display error message
                $scope.error = error.message || 'Failed to login. Please check your credentials.';
            });
    };
}]);

// Register Controller
app.controller('RegisterController', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {
    // Initialize registration form data
    $scope.registerData = {
        name: '',
        email: '',
        password: '',
        role: 'student' // Default role
    };

    // Initialize error message
    $scope.error = '';

    // Define available roles
    $scope.roles = [
        { value: 'student', label: 'Student' },
        { value: 'teacher', label: 'Teacher' }
    ];

    // Handle form submission
    $scope.register = function () {
        // Reset error message
        $scope.error = '';

        console.log('Attempting to register with data:', $scope.registerData);

        // Attempt to register
        AuthService.register($scope.registerData)
            .then((response) => {
                console.log('Registration success:', response);
                // Redirect to home page on success
                $location.path('/');
            })
            .catch(error => {
                console.error('Registration error:', error);
                // Display error message
                $scope.error = error.message || 'Failed to register. Please try again.';
            });
    };
}]);

// Home Controller
app.controller('HomeController', ['$scope', 'BookService', function ($scope, BookService) {
    // Initialize books array
    $scope.books = [];
    $scope.loading = true;

    // Fetch recent books for home page
    BookService.getBooks()
        .then(response => {
            // Display only the latest 4 books
            $scope.books = response.data.slice(0, 4);
            $scope.loading = false;
        })
        .catch(error => {
            console.error('Error fetching books:', error);
            $scope.loading = false;
        });
}]); 