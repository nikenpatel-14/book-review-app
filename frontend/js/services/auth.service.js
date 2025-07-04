// Authentication Service
app.service('AuthService', ['$http', '$location', '$q', function ($http, $location, $q) {
    const API_URL = 'http://localhost:5000/api';
    let currentUser = null;

    // Check if user is authenticated
    this.isLoggedIn = function () {
        return !!localStorage.getItem('userId');
    };

    // Get current user
    this.getCurrentUser = function () {
        if (!currentUser && this.isLoggedIn()) {
            currentUser = JSON.parse(localStorage.getItem('user'));
        }
        return currentUser;
    };

    // Get user role
    this.getUserRole = function () {
        const user = this.getCurrentUser();
        return user ? user.role : null;
    };

    // Register a new user
    this.register = function (userData) {
        console.log('Register service called with:', userData);
        console.log('API URL:', `${API_URL}/auth/register`);

        return $http.post(`${API_URL}/auth/register`, userData)
            .then(response => {
                console.log('Registration API response:', response);
                if (response.data.success) {
                    localStorage.setItem('userId', response.data.user.id);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    currentUser = response.data.user;

                    // Set the user ID header for subsequent requests
                    $http.defaults.headers.common['X-User-ID'] = response.data.user.id;

                    return response.data;
                }
                return $q.reject(response.data);
            })
            .catch(error => {
                console.error('Registration API error:', error);
                return $q.reject(error.data || error);
            });
    };

    // Login a user
    this.login = function (credentials) {
        return $http.post(`${API_URL}/auth/login`, credentials)
            .then(response => {
                if (response.data.success) {
                    localStorage.setItem('userId', response.data.user.id);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    currentUser = response.data.user;

                    // Set the user ID header for subsequent requests
                    $http.defaults.headers.common['X-User-ID'] = response.data.user.id;

                    return response.data;
                }
                return $q.reject(response.data);
            });
    };

    // Logout
    this.logout = function () {
        localStorage.removeItem('userId');
        localStorage.removeItem('user');
        currentUser = null;

        // Remove the user ID header
        delete $http.defaults.headers.common['X-User-ID'];

        $location.path('/login');
    };

    // Check authentication status
    this.checkAuthStatus = function () {
        if (this.isLoggedIn()) {
            // Set user ID header for all HTTP requests
            $http.defaults.headers.common['X-User-ID'] = localStorage.getItem('userId');

            // Get current user
            return $http.get(`${API_URL}/auth/me`)
                .then(response => {
                    if (response.data.success) {
                        currentUser = response.data.user;
                        localStorage.setItem('user', JSON.stringify(currentUser));
                        return currentUser;
                    }
                    return $q.reject(response.data);
                })
                .catch(() => {
                    // If authentication fails, log out
                    this.logout();
                    return $q.reject('Authentication failed');
                });
        }
        return $q.reject('Not authenticated');
    };

    // Route authentication
    this.requireAuth = function (role) {
        const deferred = $q.defer();

        if (!this.isLoggedIn()) {
            $location.path('/login');
            deferred.reject('Not authenticated');
        } else if (role && this.getUserRole() !== role) {
            $location.path('/');
            deferred.reject('Not authorized');
        } else {
            deferred.resolve(true);
        }

        return deferred.promise;
    };

    // Set user ID header if user is logged in
    if (this.isLoggedIn()) {
        $http.defaults.headers.common['X-User-ID'] = localStorage.getItem('userId');
    }
}]); 