const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, '../data/books.json')

const readBook = () => { 
    const data = fs.readFileSync(file, 'utf-8') 
    return JSON.parse(data) 
}

const writeBook = (data) => {  
    const dataJson = JSON.stringify(data, null, 2);
    fs.writeFileSync(file, dataJson);
}

module.exports = { readBook, writeBook }