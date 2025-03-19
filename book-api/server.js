const net = require('net');
const bookController = require('./controllers/booksController');
const authorController = require('./controllers/authorController');
const publisherController = require('./controllers/publisherController');

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
                    socket.write(JSON.stringify({  message: 'Libro agregado correctamente',  book: newBook }));
                } else {
                    socket.write(JSON.stringify({ message: 'Datos de libro no válidos', status: 'error'  }));
                }
                break;

            case 'EDIT BOOK':
                if (isJSON(jsonData)) {
                const bookObject = JSON.parse(jsonData);
                const updatedBook = bookController.editBook(bookObject);            
                const response = JSON.parse(updatedBook); // Convertir el resultado en un objeto
            
                    if (response.status === 'error') {
                        socket.write(JSON.stringify({ status: 'error', message: "Libro no encontrado" }));
                    } else {
                        socket.write(JSON.stringify({ status: 'success', message: 'Libro actualizado correctamente', book: response }));
                    }
                } else {
                    socket.write(JSON.stringify({ status: 'error', message: 'Datos de libro no válidos' }));
                }
                break;              
                
            case 'DELETE BOOK':
                const bookId = rest[0];
                const deletedBook = bookController.deleteBook(bookId);
            
                // Verificar si la respuesta es un error o éxito
                const response = JSON.parse(deletedBook); // Suponiendo que la respuesta es un string JSON
            
                if (response.status === 'error') {
                    // Si hay un error (libro no encontrado)
                    socket.write(JSON.stringify({ status: 'error', message: 'Libro no encontrado' }));
                } else {
                    // Si la eliminación es exitosa
                    socket.write(JSON.stringify({ status: 'success', book: 'Libro eliminado correctamente'  })); // El libro eliminado
                }
                break;

            case 'GET AUTHORS':
                socket.write(authorController.getAllAuthors());
                break;
        
            case 'ADD AUTHOR':
                if (isJSON(jsonData)) {
                    const authorObject = JSON.parse(jsonData);
                    const newAuthor = authorController.addAuthor(authorObject);
                    socket.write(JSON.stringify({ message: 'Autor agregado correctamente',  author: newAuthor }));
                } else {
                    socket.write(JSON.stringify({  message: 'Datos de autor no válidos',  status: 'error'  }));
                }
                break;

            case 'EDIT AUTHOR':
                if (isJSON(jsonData)) {
                    const authorObject = JSON.parse(jsonData);
                    const updatedAuthor = JSON.parse(authorController.editAuthor(authorObject));

                    if (updatedAuthor.status === 'error') {
                        socket.write(JSON.stringify({ status: 'error', message: 'Autor no encontrado' }));
                    } else {
                        socket.write(JSON.stringify({ status: 'success', author: updatedAuthor }));
                    }
                } else {
                    socket.write(JSON.stringify({ status: 'error',  message: 'El ID no corresponde a ningun Autor' }));
                }
                break;
        
            case 'DELETE AUTHOR':
                const authorId = rest[0];
                const deletedAuthor = authorController.deleteAuthor(authorId);
                const authorResponse = JSON.parse(deletedAuthor);
                
                if (authorResponse.status === 'error') {
                    socket.write(JSON.stringify({ status: 'error', message: 'Autor no encontrado' }));
                } else {
                    socket.write(JSON.stringify({ status: 'success', message: 'Autor eliminado correctamente',  author: authorResponse.author  })); // Ejemplo: "Autor eliminado correctamente" // El autor eliminado
                }
                break;
    
            case 'GET PUBLISHERS':
                socket.write(publisherController.getAllPublishers());
                break;

            case 'ADD PUBLISHER':
                if (isJSON(jsonData)) {
                    const publisherObject = JSON.parse(jsonData);
                    const newPublisher = publisherController.addPublisher(publisherObject);
                    socket.write(JSON.stringify({  message: 'Editorial agregada correctamente',   publisher: newPublisher  }));
                } else {
                    socket.write(JSON.stringify({  message: 'Datos de editorial no válidos',  status: 'error'  }));
                }
                break;  

            case 'EDIT PUBLISHER':
                if (isJSON(jsonData)) {
                    const publisherObject = JSON.parse(jsonData);
                    const updatedPublisher = JSON.parse(publisherController.editPublisher(publisherObject));

                    if (updatedPublisher.status === 'error') {
                        socket.write(JSON.stringify({ status: 'error',  message: 'Editorial no encotrada' }));
                    } else {
                        socket.write(JSON.stringify({ status: 'success', message: 'Editorial actualizada correctamente', publisher: updatedPublisher }));
                    }
                } else {
                    socket.write(JSON.stringify({ status: 'error', message: 'Datos de editorial no válidos' }));
                }
                break;
        
            case 'DELETE PUBLISHER':
                const publisherId = rest[0];
                const deletedPublisher = publisherController.deletePublisher(publisherId);
                const publisherResponse = JSON.parse(deletedPublisher);
                
                if (publisherResponse.status === 'error') {
                    socket.write(JSON.stringify({ status: 'error',  message: 'Editorial no encontrada' }));
                } else {
                    socket.write(JSON.stringify({ status: 'success', message: 'Editorial eliminada correctamente',  publisher: publisherResponse.publisher  }));
                }
                break;       
        }
  
    });

    socket.on('end', () => console.log('Cliente desconectado'));
    socket.on('error', (error) => {
        if (error.code == 'ECONNRESET') {
           return;
        }

        console.error('Socket error:', error)
    });
});

const PORT = 8080;
server.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));