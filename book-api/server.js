const net = require('net');

const bookController = require('./controllers/booksController');
const authorController = require('./controllers/authorController');
const pusblisherController = require('./controllers/publisherController');

const { v4: uuidv4 } = require('uuid');

function isJSON(str) {
    return str.startsWith('{') && str.endsWith('}');
}

const server = net.createServer((socket) => {
    console.log("Cliente Conectado");

    socket.on('data', (data) => {
        const command = data.toString().trim();
        if (command === 'GET BOOKS') {
            const books = bookController.getAllBooks();
            socket.write(JSON.stringify(books));
        } else if (command === 'GET AUTHORS') {
            const authors = authorController.getAllAuthors();
            socket.write(JSON.stringify(authors));
        } else if (command === 'GET PUBLISHERS') {
            const publishers = pusblisherController.getAllPublishers();
            socket.write(JSON.stringify(publishers));
        } else if (command.startsWith('ADD BOOK')) {
            const bookData = command.replace('ADD BOOK ', '');
            if (isJSON(bookData)) {
                const bookObject = JSON.parse(bookData);
                bookObject.id = uuidv4();
                const newBook = bookController.addBook(bookObject);
                socket.write(JSON.stringify({ message: 'Libro agregado correctamente', book: newBook }));
            }
        } else if (command.startsWith('ADD AUTHOR')) {
            const authorData = command.replace('ADD AUTHOR ', '');
            if (isJSON(authorData)) {
                const authorObject = JSON.parse(authorData);
                authorObject.id = uuidv4();
                const newAuthor = authorController.addAuthor(authorObject);
                socket.write(JSON.stringify({ message: 'Autor agregado correctamente', author: newAuthor }));
            }
        } else if (command.startsWith('ADD PUBLISHER')) {
            const publisherData = command.replace('ADD PUBLISHER ', '');
            if (isJSON(publisherData)) {
                const publisherObject = JSON.parse(publisherData);
                publisherObject.id = uuidv4();
                const newPublisher = pusblisherController.addPublisher(publisherObject);
                socket.write(JSON.stringify({ message: 'Editorial agregada correctamente', publisher: newPublisher }));
            }
        } else if (command.startsWith('EDIT BOOK')) {
            const newBookData = command.replace('EDIT BOOK ', '');
            console.log("newBookData", newBookData);
            if (isJSON(newBookData)) {
                const parseData = JSON.parse(newBookData);
                 const { id, newDate } = parseData;
                console.log("parseData", parseData);
                const newBook = bookController.editBook(id, newDate);
                socket.write(JSON.stringify({ message: 'Libro editado correctamente', book: newBook }));
            }
        }
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });

    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});