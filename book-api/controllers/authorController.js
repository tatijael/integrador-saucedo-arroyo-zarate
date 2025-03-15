const authorModel = require('../models/authorModels')
const responseView = require("../views/responseView")

const authorController = {
    getAllAuthors: () => {
        const authors = authorModel.readAuthor();
        return responseView.formatAuthors(authors);
    },

    addAuthor: (newAuthor) => {
        const authors = authorModel.readAuthor();
        authors.push(newAuthor);
        authorModel.writeAuthor(authors);x``
        return responseView.formatNewItem(newAuthor, 'Autor');
    }
}

module.exports = authorController
