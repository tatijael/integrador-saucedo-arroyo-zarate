const publisherModel = require('../models/publisherModels'); 
const responseView = require("../views/responseView"); 

const publisherController = {
    // Obtiene todas las editoriales y devuelve la respuesta formateada
    getAllPublishers: () => {
        try {
            const publishers = publisherModel.readPublisher();
            return responseView.formatPublishers(publishers);
        } catch (error) {
            console.error('Error al obtener editoriales:', error.message);
            return responseView.formatError('No se pudieron obtener las editoriales.');
        }
    },

    // Agrega una nueva editorial y la guarda en la lista
    addPublisher: (newPublisher) => {
        try {
            const publishers = publisherModel.readPublisher();
            publishers.push(newPublisher);
            publisherModel.writePublisher(publishers);
            return responseView.formatNewItem(newPublisher, 'Editorial');
        } catch (error) {
            console.error('Error al agregar la editorial:', error.message);
            return responseView.formatError('No se pudo agregar la editorial.');
        }
    },

    // Edita una editorial existente según su ID
    editPublisher: (newPublisher) => {
        try {
            const publishers = publisherModel.readPublisher();
            const publisherIndex = publishers.findIndex(publisher => publisher.id === newPublisher.id);
            
            if (publisherIndex === -1) {
                return responseView.formatError('Editorial no encontrada');
            }

            // Actualiza solo los campos modificados
            publishers[publisherIndex] = { 
                ...publishers[publisherIndex], 
                ...newPublisher 
            };

            publisherModel.writePublisher(publishers);
            return responseView.formatEditResponse(publishers[publisherIndex], 'Editorial');
        } catch (error) {
            console.error('Error al editar la editorial:', error.message);
            return responseView.formatError('No se pudo editar la editorial.');
        }
    },

    // Elimina una editorial según su ID
    deletePublisher: (publisherId) => {
        try {
            const publishers = publisherModel.readPublisher();
            const publisherIndex = publishers.findIndex(publisher => publisher.id === publisherId);

            if (publisherIndex === -1) {
                return responseView.formatError('Editorial no encontrada');
            }

            const deletedPublisher = publishers.splice(publisherIndex, 1)[0]; // Elimina la editorial
            publisherModel.writePublisher(publishers);
            return responseView.formatDeleteResponse(deletedPublisher, 'Editorial');
        } catch (error) {
            console.error('Error al eliminar la editorial:', error.message);
            return responseView.formatError('No se pudo eliminar la editorial.');
        }
    },
};

module.exports = publisherController; 
