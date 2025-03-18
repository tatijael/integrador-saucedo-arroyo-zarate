const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, '../data/publishers.json')

// Lee el archivo JSON y devuelve los editores o un array vacío si hay error
const readPublisher = () => {
    try {
        const data = fs.readFileSync(file, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer publishers.json:', error.message);
        return []; // Devuelve un array vacío si hay un error
    }
}

// Escribe los datos en el archivo JSON, manejando errores
const writePublisher = (data) => {
    try {
        const dataJson = JSON.stringify(data, null, 2);
        fs.writeFileSync(file, dataJson);
    } catch (error) {
        console.error('Error al escribir en publishers.json:', error.message);
    }
}

module.exports = { readPublisher, writePublisher }
