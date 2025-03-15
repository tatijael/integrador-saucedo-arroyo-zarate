const bookModel = require("../models/booksModels");
const bookView = require("../views/booksView");

const publisherController = {
  getPublisher: () => {
    const publisher = bookModel.read("publisher");
    return bookView.displayPublisher(publisher);
  },

  addPublisher: (newPublisher) => {
    const publisher = bookModel.read("publisher");
    publisher.push(newPublisher);
    bookModel.write(publisher , "publisher");
    return `Se añadio la editorial correctamente ${newPublisher.name}`;
  },

  deletePublisher: (id) => {
    const publishers = bookModel.read("publisher");
    const deletePublisher = publishers.find(
      (Publisher) => Publisher.id === id
    );
    if (!deletePublisher) {
     return `No se encontro la editorial con el id: ${id}`;

    } else{
    const newPublishers = publishers.filter((Publisher) => Publisher.id !== id);
    bookModel.write(newPublishers , "publisher");
    return  `Se elimino la editorial con el id: ${id}`;
  }
},
 searchPublisher: (title) => {
      const publishers = bookModel.read("publisher");
      const search = publishers.find((publisher) => publisher.name === title);
      if (!search) {
        return `No se encontro con  el titulo de la editorial: ${title}`;
      } else {
        return `ID: ${search.id} | Nombre: ${search.name} | Años: ${search.foundedYear} | Ciudad: ${search.country}`
      }
    },
}
module.exports = publisherController;
