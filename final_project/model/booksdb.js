let books = {
      1: {"author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {} },
      2: {"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {} },
      3: {"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {} },
      4: {"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {} },
      5: {"author": "Unknown","title": "The Book Of Job", "reviews": {} },
      6: {"author": "Unknown","title": "One Thousand and One Nights", "reviews": {} },
      7: {"author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {} },
      8: {"author": "Jane Austen","title": "Pride and Prejudice", "reviews": {} },
      9: {"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {} },
      10: {"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
}

async function getAllBooks() {
    return books;
}

async function getBookByISBN(isbn) {
    return books[isbn];
}

async function getBooksByAuthor(author) {
    return Object.values(books).filter(b => b.author === author);
}

async function getBooksByTitle(title) {
    return Object.values(books).filter(b => b.title === title);
}

async function getReviewByISBN(isbn) {
    const book = books[isbn];
    return book ? book.reviews : null;
}

async function addOrUpdateReview(isbn, username, review) {
    if (!books[isbn]) return false;
    if (!books[isbn].reviews) books[isbn].reviews = {};
    books[isbn].reviews[username] = review;
    return true;
}

async function deleteReview(isbn, username) {
    const book = books[isbn];
    if (!book) {
        return false;
    }
    if (!book.reviews[username]) {
        return false;
    }

    delete book.reviews[username];
    return true;
}

module.exports = {
    books,
    getAllBooks,
    getBookByISBN,
    getBooksByAuthor,
    getBooksByTitle,
    addOrUpdateReview,
    getReviewByISBN,
    deleteReview
};
