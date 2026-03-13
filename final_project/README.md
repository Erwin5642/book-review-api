# 📚 Book API

A simple REST API built with **Node.js** and **Express** that allows users to view books and manage reviews.

The API provides public endpoints for retrieving books and registering users, and authenticated endpoints for adding, updating, and deleting reviews.

---

##  Features

- View all books
- Search books by **ISBN**
- Search books by **author**
- Search books by **title**
- View book reviews
- User registration
- User login
- Add a review to a book
- Update a review
- Delete a review

---

##  Tech Stack

- **Node.js**
- **Express**
- **Express Sessions**
- **JavaScript**

---

##  Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/book-api.git
cd book-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Server 
```bash
node index.js
```

The server will run on http://localhost:3000

--- 

## API Endpoints

### Public Routes

| Method | Endpoint | Description |
|-------|----------|-------------|
| GET | `/` | Get all books |
| GET | `/isbn/:isbn` | Get a book by ISBN |
| GET | `/author/:author` | Get books by author |
| GET | `/title/:title` | Get books by title |
| GET | `/review/:isbn` | Get reviews for a book |
| POST | `/register` | Register a new user |

---

### Authenticated Routes

| Method | Endpoint | Description |
|-------|----------|-------------|
| POST | `/login` | Login a user |
| POST | `/auth/review/:isbn` | Add a review to a book |
| PUT | `/auth/review/:isbn` | Update a review |
| DELETE | `/auth/review/:isbn` | Delete a review |
