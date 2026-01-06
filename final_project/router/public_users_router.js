const express = require('express');
const public_users_router = express.Router();
let booksModel = require('../model/booksdb');
let users = require('./auth_users_router').users;
const userExists = require('./auth_users_router').userExists;

public_users_router.get('/', (req, res) => {
   return res.status(200).json(booksModel.getAllBooks());
});

public_users_router.get('/isbn/:isbn', (req, res) => {
    const {isbn} = req.params;
    const book = booksModel.getBookByISBN(isbn);
    if(!book) return res.status(404).json({message: 'Book not Found'});
    return res.status(200).json(book);
});

public_users_router.get('/author/:author', (req, res) => {
    const {author} = req.params;
    const books = booksModel.getBooksByAuthor(author);
    if(!books) return res.status(404).json({message: 'Book not Found'});
    return res.status(200).json(books);
});

public_users_router.get('/title/:title', (req, res) => {
    const {title} = req.params;
    const books = booksModel.getBooksByTitle(title);
    if(!books) return res.status(404).json({message: 'Book not Found'});
    return res.status(200).json(books);
});

public_users_router.get('/review/:isbn', (req, res) => {
    const {isbn} = req.params;
    const reviews = booksModel.getReviewByISBN(isbn);
    if(!reviews) return res.status(404).json({message: 'Reviews not Found'});
    return res.status(200).json(reviews);
});

public_users_router.post('/register', (req, res) => {
   const {username, password} = req.body;

   if(!username || !password) {
       return res.status(400).json({message: 'Username and password is required'});
   }

   if(userExists(username)) {
       return res.status(409).json({message: 'User already exists'});
   }

   users.push({ username, password });
   return res.status(200).json({message: 'User successfully registered'});
});

module.exports.general = public_users_router;