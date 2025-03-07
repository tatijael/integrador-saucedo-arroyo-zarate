const bookModel = require('../models/booksModels')
const bookView = require("../views/booksView")

const publisherController = {
  getBooks: () => {
    const publisher = bookModel.readPublisher();

    return bookView.displayBooks(publisher)
  },

  addBooks: (newPublisher) => {
    const publisher = bookModel.readPublisher();

    publisher.push(newPublisher)

    bookModel.writeBook(publisher)

    return "Se añadio la editorial correctamente"
  }
}


module.exports = publisherController
