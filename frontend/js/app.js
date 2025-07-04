// Main Angular Application
const app = angular.module('bookReviewApp', ['ngRoute']);

// Configuration
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
        // Home route
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })

        // Authentication routes
        .when('/login', {
            templateUrl: 'views/auth/login.html',
            controller: 'LoginController'
        })
        .when('/register', {
            templateUrl: 'views/auth/register.html',
            controller: 'RegisterController'
        })

        // Book routes
        .when('/books', {
            templateUrl: 'views/books/index.html',
            controller: 'BookListController'
        })
        .when('/books/:id', {
            templateUrl: 'views/books/show.html',
            controller: 'BookDetailController'
        })

        // Admin book management routes
        .when('/admin/books', {
            templateUrl: 'views/admin/books/index.html',
            controller: 'AdminBookListController',
            resolve: {
                auth: ['AuthService', function (AuthService) {
                    return AuthService.requireAuth('teacher');
                }]
            }
        })
        .when('/admin/books/new', {
            templateUrl: 'views/admin/books/create.html',
            controller: 'AdminBookCreateController',
            resolve: {
                auth: ['AuthService', function (AuthService) {
                    return AuthService.requireAuth('teacher');
                }]
            }
        })
        .when('/admin/books/edit/:id', {
            templateUrl: 'views/admin/books/edit.html',
            controller: 'AdminBookEditController',
            resolve: {
                auth: ['AuthService', function (AuthService) {
                    return AuthService.requireAuth('teacher');
                }]
            }
        })

        // Review routes
        .when('/my-reviews', {
            templateUrl: 'views/reviews/my-reviews.html',
            controller: 'MyReviewsController',
            resolve: {
                auth: ['AuthService', function (AuthService) {
                    return AuthService.requireAuth();
                }]
            }
        })

        // Default route
        .otherwise({
            redirectTo: '/'
        });
}]);

// Run block
app.run(['$rootScope', 'AuthService', function ($rootScope, AuthService) {
    // Check authentication status when app starts
    AuthService.checkAuthStatus();

    // Make auth data available in root scope
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.isLoggedIn = AuthService.isLoggedIn();
        $rootScope.user = AuthService.getCurrentUser();
        $rootScope.role = AuthService.getUserRole();
    });

    // Logout function
    $rootScope.logout = function () {
        AuthService.logout();
    };
}]); 