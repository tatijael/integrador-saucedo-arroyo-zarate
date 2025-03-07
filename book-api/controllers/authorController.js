const bookModel = require('../models/booksModels')
const bookView = require("../views/booksView")

const authorController = {
  getBooks: () => {
    const author = bookModel.readAuthor();

    return bookView.displayAuthor(author)
  },

  addBooks: (newAuthor) => {
    const author = bookModel.readAuthor();

    author.push(newAuthor)

    bookModel.writeAuthor(author)

    return "Se añadio el Author correctamente"
  }
}


module.exports = authorController
