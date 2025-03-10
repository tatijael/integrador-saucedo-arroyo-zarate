const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, '../data/authors.json')

const readAuthor = () => {
    const data = fs.readFileSync(file, 'utf-8')
    return JSON.parse(data)
}

const writeAuthor = (data) => {
    const dataJson = JSON.stringify(data, null, 2);
    fs.writeFileSync(file, dataJson);
}

module.exports = { readAuthor, writeAuthor }