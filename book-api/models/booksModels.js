const fs = require('fs')

const path = require('path')

const file = path.join(__dirname, '../data/authors.json')
const file2 = path.join(__dirname, '../data/books.json')
const file3 = path.join(__dirname, '../data/publishers.json')

const readAuthor = () => {
  const data = fs.readFileSync(file, 'utf-8')
  return JSON.parse(data)
}

const readBook = () => {
  const data = fs.readFileSync(file2, 'utf-8')
  return JSON.parse(data)
}

const readPublisher = () => {
  const data = fs.readFileSync(file3, 'utf-8')
  return JSON.parse(data)
}

const writeAuthor = (data) => {
  const dataJson = JSON.stringify(data, null, 2);
  fs.writeFileSync(file, dataJson);
}

const writeBook = (data) => {
  const dataJson = JSON.stringify(data, null, 2);
  fs.writeFileSync(file2, dataJson);
}

const writePublisher = (data) => {
  const dataJson = JSON.stringify(data, null, 2);
  fs.writeFileSync(file3, dataJson);
}

module.exports = { readAuthor,
  readBook,
  readPublisher,
  writeAuthor,
  writeBook,
  writePublisher
}