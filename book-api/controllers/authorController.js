const authorModel = require('../models/authorModels')
const responseView = require("../views/responseView")

const authorController = {
    // Obtiene todos los autores y devuelve la respuesta formateada
    getAllAuthors: () => {
        try {
            const authors = authorModel.readAuthor();
            return responseView.formatAuthors(authors);
        } catch (error) {
            console.error('Error al obtener autores:', error.message);
            return responseView.formatError('No se pudieron obtener los autores.');
        }
    },

    // Agrega un nuevo autor y lo guarda en la lista
    addAuthor: (newAuthor) => {
        try {
            const authors = authorModel.readAuthor();
            authors.push(newAuthor);
            authorModel.writeAuthor(authors);
            return responseView.formatNewItem(newAuthor, 'Autor');
        } catch (error) {
            console.error('Error al agregar el autor:', error.message);
            return responseView.formatError('No se pudo agregar el autor.');
        }
    },

    // Edita un autor existente según su ID
    editAuthor: (newAuthor) => {
        try {
            const authors = authorModel.readAuthor();
            const authorIndex = authors.findIndex(author => author.id === newAuthor.id);
            
            if (authorIndex === -1) {
                return responseView.formatError('Autor no encontrado');
            }

            // Actualiza solo los campos modificados
            authors[authorIndex] = { 
                ...authors[authorIndex], 
                ...newAuthor 
            };

            authorModel.writeAuthor(authors);
            return responseView.formatEditResponse(authors[authorIndex], 'Autor');
        } catch (error) {
            console.error('Error al editar el autor:', error.message);
            return responseView.formatError('No se pudo editar el autor.');
        }
    },

    // Elimina un autor según su ID
    deleteAuthor: (authorId) => {
        try {
            const authors = authorModel.readAuthor();
            const authorIndex = authors.findIndex(author => author.id === authorId);

            if (authorIndex === -1) {
                return responseView.formatError('Autor no encontrado');
            }

            const deletedAuthor = authors.splice(authorIndex, 1)[0]; // Elimina el autor
            authorModel.writeAuthor(authors);
            return responseView.formatDeleteResponse(deletedAuthor, 'Autor');
        } catch (error) {
            console.error('Error al eliminar el autor:', error.message);
            return responseView.formatError('No se pudo eliminar el autor.');
        }
    },
};

module.exports = authorController
