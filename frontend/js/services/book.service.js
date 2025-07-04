// Book Service
app.service('BookService', ['$http', function ($http) {
    const API_URL = 'http://localhost:5000/api';

    // Get all books
    this.getBooks = function () {
        return $http.get(`${API_URL}/books`)
            .then(response => response.data);
    };

    // Get a single book
    this.getBook = function (id) {
        return $http.get(`${API_URL}/books/${id}`)
            .then(response => response.data);
    };

    // Create a new book (teachers only)
    this.createBook = function (bookData) {
        return $http.post(`${API_URL}/books`, bookData)
            .then(response => response.data);
    };

    // Update a book (teachers only)
    this.updateBook = function (id, bookData) {
        return $http.put(`${API_URL}/books/${id}`, bookData)
            .then(response => response.data);
    };

    // Delete a book (teachers only)
    this.deleteBook = function (id) {
        return $http.delete(`${API_URL}/books/${id}`)
            .then(response => response.data);
    };
}]); 