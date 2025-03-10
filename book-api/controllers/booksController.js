const bookModel = require('../models/booksModels')
const responseView = require("../views/responseView")

const bookController = {
    getAllBooks: () => {
        const books = bookModel.readBook();
        return responseView.formatBooks(books);
    },

    addBook: (newBook) => {
        const books = bookModel.readBook();
        books.push(newBook);
        bookModel.writeBook(books);
        return responseView.formatNewItem(newBook, 'Libro');
    }
}

module.exports = bookController