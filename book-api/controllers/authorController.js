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
        authorModel.writeAuthor(authors);
        return responseView.formatNewItem(newAuthor, 'Autor');
    },
    
    editAuthor: (newAuthor) => {
        const authors = authorModel.readAuthor();
        const authorIndex = authors.findIndex(book => book.id === newAuthor.id);
        
        if (authorIndex === -1) {
            return responseView.formatError('Author no encontrado');
        }

        authors[authorIndex] = {
            ...authors[authorIndex],
            ...newAuthor
        };

        authorModel.writeAuthor(authors);
        return responseView.formatEditResponse(authors[authorIndex], 'authors');
    },

    deleteAuthor: (authorId) => {
        const authors = authorModel.readAuthor();
        const authorIndex = authors.findIndex(author => author.id === authorId);

        if (authorIndex === -1) {
            return responseView.formatError('Author no encontrado');
        }

        const deletedAuthor = authors.splice(authorIndex, 1)[0];
        authorModel.writeAuthor(authors);
        return responseView.formatDeleteResponse(deletedAuthor, 'Author');
    },
}

module.exports = authorController
