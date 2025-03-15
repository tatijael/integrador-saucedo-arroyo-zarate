const bookModel = require("../models/booksModels");
const bookView = require("../views/booksView");

const bookController = {
  getBooks: () => {
    const books = bookModel.read("book");

    return bookView.displayBooks(books);
  },

  addBooks: (newBook) => {
    const books = bookModel.read("book");
    books.push(newBook);
    bookModel.write(books, "book");
    return `Libro agregado: ${newBook.name}`;
  },

  deleteBooks: (id) => {
    const books = bookModel.read("book");
    const deltetBook = books.find((book) => book.id === id);
    if (!deltetBook) {
      return `No se encontro el libro con el id: ${id}`;
    } else {
      const newBook = books.filter((book) => book.id !== id);
      bookModel.write(newBook, "book");

      return `Libro eliminado: ${id}`;
    }
  },
  searchBook: (title) => {
    const books = bookModel.read("book");
    const search = books.find((book) => book.name === title);
    if (!search) {
      return `No se encontro el libro con el titulo: ${title}`;
    } else {
      return `ID: ${search.id} | Nombre: ${search.name} | Años: ${search.foundedYear} | Ciudad: ${search.country}`;
    }
  },

  editBoock: (id, newDate) => {
    const books = bookModel.read("book");
    const search = books.find((book) => book.id === id);

    if (!search) {
      return "No se encontro el libro con el id";
    } else {
      search.name = newDate.name;
      search.country = newDate.country;
      search.foundedYear = newDate.foundedYear;
      bookModel.write(books, "book");
      return ` Su Libro ha sido editado: ${id} nombre: ${newDate.name}  pais: ${newDate.country} año: ${newDate.foundedYear}`;
    }
  },
};

module.exports = bookController;
