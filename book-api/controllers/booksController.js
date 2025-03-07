const bookModel = require('../models/booksModels')
const bookView = require("../views/booksView")

const bookController = {
  getBooks: () => {
    const books = bookModel.readBook();

    return bookView.displayBooks(books)
  },

  addBooks: (newBook) => {
    const books = bookModel.readBook();

    books.push(newBook)

    bookModel.writeBook(books)

    return "Se añadio el libro correctamente"
  }
}


module.exports = bookController
