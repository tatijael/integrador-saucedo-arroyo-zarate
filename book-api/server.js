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
        const [action, type, ...rest] = command.split(' ');
        const jsonData = rest.join(' ');

        switch(`${action} ${type}`) {
            case 'GET BOOKS':
                socket.write(bookController.getAllBooks());
                break;
            case 'GET AUTHORS':
                socket.write(authorController.getAllAuthors());
                break;
            case 'GET PUBLISHERS':
                socket.write(pusblisherController.getAllPublishers());
                break;
            case 'ADD BOOK':
                if (isJSON(jsonData)) {
                    const bookObject = JSON.parse(jsonData);
                    bookObject.id = uuidv4();
                    const newBook = bookController.addBook(bookObject);
                    socket.write(JSON.stringify({ 
                        message: 'Libro agregado correctamente', 
                        book: newBook 
                    }));
                }
                break;
            case 'ADD AUTHOR':
                if (isJSON(jsonData)) {
                    const authorObject = JSON.parse(jsonData);
                    authorObject.id = uuidv4();
                    const newAuthor = authorController.addAuthor(authorObject);
                    socket.write(JSON.stringify({ 
                        message: 'Autor agregado correctamente', 
                        author: newAuthor 
                    }));
                }
                break;
            case 'ADD PUBLISHER':
                if (isJSON(jsonData)) {
                    const publisherObject = JSON.parse(jsonData);
                    publisherObject.id = uuidv4();
                    const newPublisher = pusblisherController.addPublisher(publisherObject);
                    socket.write(JSON.stringify({ 
                        message: 'Editorial agregada correctamente', 
                        publisher: newPublisher 
                    }));
                }
                break;
            case 'EDIT BOOK':
                if (isJSON(jsonData)) {
                    const bookObject = JSON.parse(jsonData);
                    const updatedBook = bookController.editBook(bookObject);
                    socket.write(JSON.stringify({ 
                        message: 'Libro actualizado correctamente',  
                        book: updatedBook 
                    }));
                }
                break;
        }
    });

    socket.on('end', () => console.log('Client disconnected'));
    socket.on('error', (error) => console.error('Socket error:', error));
});

const PORT = 8080;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));