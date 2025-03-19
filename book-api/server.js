const net = require('net');
const bookController = require('./controllers/booksController');
const authorController = require('./controllers/authorController');
const publisherController = require('./controllers/publisherController');
const formatResponse = require('./views/responseView'); // Importar formatResponse

function isJSON(str) {
    return str.startsWith('{') && str.endsWith('}');
}

const server = net.createServer((socket) => {
    console.log("Cliente Conectado");

    socket.on('data', (data) => {
        const command = data.toString().trim();
        const [action, type, ...rest] = command.split(' ');
        const jsonData = rest.join(' ');

        switch (`${action} ${type}`) {
            case 'EXIT ALL':
                socket.end();
                server.close(() => {
                    console.log('Servidor cerrado');
                    process.exit(0);
                });
                break;

            case 'GET BOOKS':
                socket.write(bookController.getAllBooks());
                break;

            case 'ADD BOOK':
                if (isJSON(jsonData)) {
                    const bookObject = JSON.parse(jsonData);
                    const newBook = bookController.addBook(bookObject);
                    socket.write(formatResponse.formatNewItem(newBook, 'Libro')); // Usar formatResponse
                } else {
                    socket.write(formatResponse.formatError('Datos de libro no válidos')); // Usar formatResponse
                }
                break;

            case 'EDIT BOOK':
                if (isJSON(jsonData)) {
                    const bookObject = JSON.parse(jsonData);
                    const updatedBook = bookController.editBook(bookObject);
                    socket.write(updatedBook); // Ya está formateado por el controlador
                } else {
                    socket.write(formatResponse.formatError('Datos de libro no válidos')); // Usar formatResponse
                }
                break;

            case 'DELETE BOOK':
                const bookId = rest[0];
                const deletedBook = bookController.deleteBook(bookId);
                socket.write(deletedBook); // Ya está formateado por el controlador
                break;

            case 'GET AUTHORS':
                socket.write(authorController.getAllAuthors());
                break;

            case 'ADD AUTHOR':
                if (isJSON(jsonData)) {
                    const authorObject = JSON.parse(jsonData);
                    const newAuthor = authorController.addAuthor(authorObject);
                    socket.write(formatResponse.formatNewItem(newAuthor, 'Autor')); // Usar formatResponse
                } else {
                    socket.write(formatResponse.formatError('Datos de autor no válidos')); // Usar formatResponse
                }
                break;

            case 'EDIT AUTHOR':
                if (isJSON(jsonData)) {
                    const authorObject = JSON.parse(jsonData);
                    const updatedAuthor = authorController.editAuthor(authorObject);
                    socket.write(updatedAuthor); // Ya está formateado por el controlador
                } else {
                    socket.write(formatResponse.formatError('Datos de autor no válidos')); // Usar formatResponse
                }
                break;

            case 'DELETE AUTHOR':
                const authorId = rest[0];
                const deletedAuthor = authorController.deleteAuthor(authorId);
                socket.write(deletedAuthor); // Ya está formateado por el controlador
                break;

            case 'GET PUBLISHERS':
                socket.write(publisherController.getAllPublishers());
                break;

            case 'ADD PUBLISHER':
                if (isJSON(jsonData)) {
                    const publisherObject = JSON.parse(jsonData);
                    const newPublisher = publisherController.addPublisher(publisherObject);
                    socket.write(formatResponse.formatNewItem(newPublisher, 'Editorial')); // Usar formatResponse
                } else {
                    socket.write(formatResponse.formatError('Datos de editorial no válidos')); // Usar formatResponse
                }
                break;

            case 'EDIT PUBLISHER':
                if (isJSON(jsonData)) {
                    const publisherObject = JSON.parse(jsonData);
                    const updatedPublisher = publisherController.editPublisher(publisherObject);
                    socket.write(updatedPublisher); // Ya está formateado por el controlador
                } else {
                    socket.write(formatResponse.formatError('Datos de editorial no válidos')); // Usar formatResponse
                }
                break;

            case 'DELETE PUBLISHER':
                const publisherId = rest[0];
                const deletedPublisher = publisherController.deletePublisher(publisherId);
                socket.write(deletedPublisher); // Ya está formateado por el controlador
                break;

            default:
                socket.write(formatResponse.formatError('Comando no reconocido')); // Usar formatResponse
                break;
        }
    });

    socket.on('end', () => console.log('Cliente desconectado'));
    socket.on('error', (error) => {
        if (error.code == 'ECONNRESET') {
            return;
        }
        console.error('Socket error:', error);
    });
});

const PORT = 8080;
server.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));