

const displayBooks = (books) => {
  if (books.length === 0) {
    return "No hay libros para mostrar";
  } else {
    return books
      .map((book, index) => {
        return `${index + 1}. Id:${book.id} | Nombre: ${book.name} | Años: ${
          book.foundedYear
        }  | Ciudad: ${book.country}`;
      })
      .join("\n");
  }
};


const displayAuthor = (authors) => {
  if (authors.length === 0) {
    return "No hay authores para mostrar";
  } else {
    return authors
      .map((author, index) => {
        return `${index + 1}.  Id:${author.id}| Nombre: ${
          author.name
        } | Nacionalidad: ${author.nationality} | Nacimiento: ${
          author.birthYear
        }`;
      })
      .join("\n");
  }
};

const displayPublisher = (publishers) => {
  if (publishers.length === 0) {
    return "No hay editoriales para mostrar";
  } else {
    return publishers
      .map((publish, index) => {
        return `${index + 1}. Id:${publish.id} Nombre: ${
          publish.name
        } Ciudad: ${publish.country} Año de fundación: ${publish.foundedYear}`;
      })
      .join("\n");
  }
};

module.exports = {
  displayBooks,
  displayAuthor,
  displayPublisher,
}


