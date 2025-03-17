const publisherModel = require('../models/publisherModels')
const responseView = require("../views/responseView")

const publisherController = {
    getAllPublishers: () => {
        const publishers = publisherModel.readPublisher();
        return responseView.formatPublishers(publishers);
    },

    addPublisher: (newPublisher) => {
        const publishers = publisherModel.readPublisher();
        publishers.push(newPublisher);
        publisherModel.writePublisher(publishers);
        return responseView.formatNewItem(newPublisher, 'Editorial');
    },
    editPublisher: (newPublisher) => {
        const publishers = publisherModel.readPublisher()
        const publisherIndex = publishers.findIndex(publisher => publisher.id === newPublisher.id);
        
        if (publisherIndex === -1) {
            return responseView.formatError('Editorial no encontrada');
        }

        publishers[publisherIndex] = {
            ...publishers[publisherIndex],
            ...newPublisher
        };

        publisherModel.writePublisher(publishers);
        return responseView.formatEditResponse(publishers[publisherIndex], 'publishers');
    },

    deletePublisher: (publisherId) => {
        const publishers = publisherModel.readPublisher()
        const publisherIndex = publishers.findIndex(publisher => publisher.id === publisherId);

        if (publisherIndex  === -1) {
            return responseView.formatError('Editorial no encontrada');
        }

        const deletedPublisher = publishers.splice(publisherIndex, 1)[0];
        publisherModel.writePublisher(publishers);
        return responseView.formatDeleteResponse(deletedPublisher, 'Author');
    },
}

module.exports = publisherController