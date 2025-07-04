# Book Review App

A web application where users can browse books, add reviews, and manage their content. Built with AngularJS for the frontend and Node.js, Express, and MongoDB for the backend.

## Features

- **User Authentication**: Register and login system with JWT
- **Role-based Access Control**: Students and Teachers (admin) roles
- **Book Management**: Teachers can add, update, and delete books
- **Review System**: Students can add, view, and delete their own reviews

## Tech Stack

- **Frontend**: AngularJS 1.8, Bootstrap 5, Font Awesome
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Project Structure

```
book-review-app/
├── backend/           # Node.js backend
│   ├── config/        # Configuration files
│   ├── controllers/   # API controllers
│   ├── middlewares/   # Express middlewares
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes
│   ├── .env           # Environment variables (create this file)
│   ├── package.json   # Backend dependencies
│   └── server.js      # Main server file
│
└── frontend/          # AngularJS frontend
    ├── css/           # CSS files
    ├── js/            # JavaScript files
    │   ├── controllers/ # Angular controllers
    │   └── services/    # Angular services
    ├── views/         # HTML templates
    ├── index.html     # Main HTML file
    └── package.json   # Frontend dependencies
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/book-review-app
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRES_IN=7d
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Open the `index.html` file in your browser, or use a simple HTTP server like:
   ```
   npx http-server
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a single book
- `POST /api/books` - Create a new book (teachers only)
- `PUT /api/books/:id` - Update a book (teachers only)
- `DELETE /api/books/:id` - Delete a book (teachers only)

### Reviews
- `GET /api/books/:bookId/reviews` - Get all reviews for a book
- `POST /api/books/:bookId/reviews` - Create a review for a book
- `GET /api/reviews/me` - Get all reviews by the current user
- `GET /api/reviews/:id` - Get a single review
- `PUT /api/reviews/:id` - Update a review (owner or teacher)
- `DELETE /api/reviews/:id` - Delete a review (owner or teacher)

## License

ISC 