const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, '../data/publishers.json')

const readPublisher = () => {
    const data = fs.readFileSync(file, 'utf-8')
    return JSON.parse(data)
}

const writePublisher = (data) => {
    const dataJson = JSON.stringify(data, null, 2);
    fs.writeFileSync(file, dataJson);
}

module.exports = { readPublisher, writePublisher }