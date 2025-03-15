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

    editBook: (id, newDate) => {
        const books = bookModel.readBook();
        const search = books.find((book) => book.id === id);
    
        if (!search) {
          return "No se encontro el libro con el id";
        } else {
          search.title = newDate.title;
          search.author = newDate.author;
          search.publisher = newDate.publisher;
          bookModel.writeBook(books);
          return responseView.formatEditBook(search);
        }
    }
}

module.exports = bookController