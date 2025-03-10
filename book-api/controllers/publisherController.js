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
    }
}

module.exports = publisherController