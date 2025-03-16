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
    },

    editBook: (bookData) => {
        const books = bookModel.readBook();
        const bookIndex = books.findIndex(book => book.id === bookData.id);
        
        if (bookIndex === -1) {
            return responseView.formatError('Libro no encontrado');
        }

        books[bookIndex] = {
            ...books[bookIndex],
            ...bookData
        };

        bookModel.writeBook(books);
        return responseView.formatEditResponse(books[bookIndex], 'Libro');
    }
}

module.exports = bookController