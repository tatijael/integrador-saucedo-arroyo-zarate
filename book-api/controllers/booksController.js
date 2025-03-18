const bookModel = require('../models/booksModels')
const responseView = require("../views/responseView")

const bookController = {
    // Obtiene todos los libros y los devuelve formateados
    getAllBooks: () => {
        try {
            const books = bookModel.readBook();
            return responseView.formatBooks(books);
        } catch (error) {
            console.error('Error al obtener libros:', error.message);
            return responseView.formatError('No se pudieron obtener los libros.');
        }
    },

    // Agrega un nuevo libro y lo guarda en la lista
    addBook: (newBook) => {
        try {
            const books = bookModel.readBook();
            books.push(newBook);
            bookModel.writeBook(books);
            return responseView.formatNewItem(newBook, 'Libro');
        } catch (error) {
            console.error('Error al agregar el libro:', error.message);
            return responseView.formatError('No se pudo agregar el libro.');
        }
    },

    // Edita un libro existente según su ID
    editBook: (bookData) => {
        try {
            const books = bookModel.readBook();
            const bookIndex = books.findIndex(book => book.id === bookData.id);
    
            if (bookIndex === -1) {
                return responseView.formatError('Libro no encontrado');  // Devuelve un error si no se encuentra el libro
            }
    
            // Si el libro se encuentra, actualiza
            books[bookIndex] = {
                ...books[bookIndex],
                ...bookData
            };
    
            bookModel.writeBook(books);
            return responseView.formatEditResponse(books[bookIndex], 'Libro actualizado correctamente');  // Respuesta exitosa
        } catch (error) {
            console.error('Error al editar el libro:', error.message);
            return responseView.formatError('No se pudo editar el libro.');
        }
    },
    
    
    // Elimina un libro según su ID
    deleteBook: (bookId) => {
        try {
            const books = bookModel.readBook();
            const bookIndex = books.findIndex(book => book.id === bookId);

            if (bookIndex === -1) {
                return responseView.formatError('Libro no encontrado');
            }

            const deletedBook = books.splice(bookIndex, 1)[0]; // Elimina el libro
            bookModel.writeBook(books);
            return responseView.formatDeleteResponse(deletedBook, 'Libro');
        } catch (error) {
            console.error('Error al eliminar el libro:', error.message);
            return responseView.formatError('No se pudo eliminar el libro.');
        }
    },
};

module.exports = bookController;
