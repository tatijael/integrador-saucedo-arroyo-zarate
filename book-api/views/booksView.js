const readLineSync = require("readline-sync");

const displayBooks = (books) => {
  if (books.length === 0) {
    return ("No hay libros para mostrar")
  } else {
    books.forEach((book, index) => {
      console.log(`${index + 1} - ${book.title} - ${book.year}`)
    })
  }
}

const displayAuthor = (authors) => {
  if (authors.length === 0) {
    return ("No hay authores para mostrar")
  } else {
    authors.forEach((author, index) => {
      console.log(`${index + 1} - ${author.name} - ${author.nationality} - ${author.birthYear}`)
    })
  }
}

const displayPublisher = (publishers) => {
  if (publishers.length === 0) {
    return ("No hay authores para mostrar")
  } else {
    publishers.forEach((publish, index) => {
      console.log(`${index + 1} - ${publish.name} - ${publish.country} - ${publish.foundedYear}`)
    })
  }
}

const addBooks = () => {
  const title = readLineSync.question("Ingrese el titulo del libro: ")
  const year = readLineSync.question("Ingrese el ańo del libro: ")

  return { title, year }
}

const addAuthors = () => {
  const name = readLineSync.question("Ingrese el Nombre del autor: ")
  const nationality = readLineSync.question("Ingrese la nacionalidad: ")
  const birthYear = readLineSync.question("Ingrese el año de nacimiento: ")

  return { name, nationality, birthYear }
}

const addPublishers = () => {
  const name = readLineSync.question("Ingrese el nombre de la editorial: ")
  const country = readLineSync.question("Ingrese el pais donde se fundo: ")
  const foundedYear = readLineSync.question("Ingrese el año en que se fundo: ")

  return { name, country, foundedYear}
}



module.exports = {
  displayAuthor,
  displayBooks,
  displayPublisher,
  addAuthors,
  addBooks,
  addPublishers
}