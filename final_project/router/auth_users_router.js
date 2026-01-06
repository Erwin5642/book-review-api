const express = require('express');
let booksModel = require('../model/booksdb');

const auth_users_router = express.Router();

let users = [];

const userExists = (username) => {
    return users.some(user => user.username === username);
};

const authenticatedUser = (username, password) => {
  return users.some(user => user.username === username && user.password === password);
};

auth_users_router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({message: 'Username and password are required'});
    }

    if(!authenticatedUser(username, password)) {
        return res.status(401).json({message: 'Authentication failed'});
    }

    req.session.user = {username};

    return res.status(200).json({message: 'Login successful'});
});

auth_users_router.post('/auth/review/:isbn', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'User not logged in' });
    }

    const username = req.session.user.username;
    const { isbn } = req.params;
    const { review } = req.body;
    try{
        const success = await booksModel.addOrUpdateReview(isbn, username, review);

        if (!success) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Review added' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


auth_users_router.put('/auth/review/:isbn', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'User not logged in' });
    }

    const username = req.session.user.username;
    const { isbn } = req.params;
    const { review } = req.body;
    try{
        const success = await booksModel.addOrUpdateReview(isbn, username, review);

        if (!success) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json({ message: 'Review updated' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

auth_users_router.delete("/auth/review/:isbn", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Login required" });
    }

    const username = req.session.user.username;
    const {isbn} = req.params;

    try{
        const success = await booksModel.deleteReview(isbn, username);

        if (!success) {
            return res.status(404).json({ message: "Review or book not found" });
        }

        return res.status(200).json({ message: `Review deleted for book ${isbn}` });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports.authenticated = auth_users_router;
module.exports.userExists = userExists;
module.exports.users = users;