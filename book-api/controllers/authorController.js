const bookModel = require("../models/booksModels");
const bookView = require("../views/booksView");

const authorController = {
  getAuthor: () => {
    const author = bookModel.read("autor");
    return bookView.displayAuthor(author , "autor");
  },

  addAuthors: (newAuthor) => {
    const author = bookModel.read("autor");
    author.push(newAuthor);
    bookModel.write(author , "autor");

    return `Se añadio el Author correctamente ${newAuthor.name}`;
  },

  delteAuthor: (id) => {
    const author = bookModel.read("autor");
    const delteAuthor = author.find((author) => author.id === id);
    if (!delteAuthor) {
      return `No se encontro el Author con el id: ${id}`;
    } else {
      const newAuthor = author.filter((author) => author.id !== id);
      bookModel.write(newAuthor, "autor");
    }
   ;
    return `Author eliminado: ${id}`;
  },
    searchAutor: (title) => {
      const autores = bookModel.read("autor");
      const search = autores.find((autor) => autor.name === title);
      if (!search) {
        return `No se encontro el nombre del Autor: ${title}`;
      } else {
        return `ID: ${search.id} | Nombre: ${search.name} | Cumpleños: ${search.birthYear} | Ciudad: ${search.nationality}`
      }
    },

  
};

module.exports = authorController;
