const net = require('net');
const bookController = require('./controllers/booksController');
const authorController = require('./controllers/authorController');
const pusblisherController = require('./controllers/publisherController');

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

        case 'ADD BOOK':
            if (isJSON(jsonData)) {
                const bookObject = JSON.parse(jsonData);
                const newBook = bookController.addBook(bookObject);
                socket.write(JSON.stringify({ 
                    message: 'Libro agregado correctamente',  book: newBook }));
            }
            break;

        case 'EDIT BOOK':
            if (isJSON(jsonData)) {
                const bookObject = JSON.parse(jsonData);
                const updatedBook = bookController.editBook(bookObject);
                socket.write(JSON.stringify({ message: 'Libro actualizado correctamente',   book: updatedBook }));
            }
            break;

        case 'DELETE BOOK':
            const bookId = rest[0];
            const deletedBook = bookController.deleteBook(bookId);
            socket.write(JSON.stringify({ message: 'Libro eliminado correctamente', book: deletedBook }));
            break;

        case 'GET AUTHORS':
            socket.write(authorController.getAllAuthors());
            break;
        
        case 'ADD AUTHOR':
            if (isJSON(jsonData)) {
                const authorObject = JSON.parse(jsonData);
                const newAuthor = authorController.addAuthor(authorObject);
                socket.write(JSON.stringify({ message: 'Autor agregado correctamente', author: newAuthor }));
            }
            break;

        case 'EDIT AUTHOR':
            if (isJSON(jsonData)) {
                const authorObject = JSON.parse(jsonData);
                const updatedAuthor = authorController.editAuthor(authorObject);
                socket.write(JSON.stringify({ message: 'Autor actualizado correctamente',   author: updatedAuthor }));
            }
            break;
        
        case 'DELETE AUTHOR':
            const authorId = rest[0];
            const deletedAuthor = authorController.deleteAuthor(authorId);
            socket.write(JSON.stringify({ message: 'Author eliminado correctamente', author: deletedAuthor}));
            break;
    
        case 'GET PUBLISHERS':
            socket.write(pusblisherController.getAllPublishers());
            break;

        case 'ADD PUBLISHER':
            if (isJSON(jsonData)) {
                const publisherObject = JSON.parse(jsonData);
                const newPublisher = pusblisherController.addPublisher(publisherObject);
                socket.write(JSON.stringify({  message: 'Editorial agregada correctamente',  publisher: newPublisher }));
            }
            break;  

        case 'EDIT PUBLISHER':
            if (isJSON(jsonData)) {
                const publisherObject = JSON.parse(jsonData);
                const updatedPublisher = pusblisherController.editPublisher(publisherObject);
                socket.write(JSON.stringify({ message: 'Autor actualizado correctamente',  publisher: updatedPublisher }));
            }
            break;
        
        case 'DELETE PUBLISHER':
            const publisherId = rest[0];
            const deletedPublisher = pusblisherController.deletePublisher(publisherId);
            socket.write(JSON.stringify({ message: 'Editorial eliminada correctamente', publisher: deletedPublisher}));
            break;
            
        }
  
    });

    socket.on('end', () => console.log('Cliente desconectado'));
    socket.on('error', (error) => console.error('Socket error:', error));
});

const PORT = 8080;
server.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));