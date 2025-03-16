const formatResponse = {
  formatBooks: (books) => {
      if (books.length === 0) {
          return JSON.stringify({
              status: 'success',
              message: 'No hay libros para mostrar',
              data: []
          });
      }
      return JSON.stringify({
          status: 'success',
          data: books
      });
  },

  formatAuthors: (authors) => {
      if (authors.length === 0) {
          return JSON.stringify({
              status: 'success',
              message: 'No hay autores para mostrar',
              data: []
          });
      }
      return JSON.stringify({
          status: 'success',
          data: authors
      });
  },

  formatPublishers: (publishers) => {
      if (publishers.length === 0) {
          return JSON.stringify({
              status: 'success',
              message: 'No hay editoriales para mostrar',
              data: []
          });
      }
      return JSON.stringify({
          status: 'success',
          data: publishers
      });
  },

  formatNewItem: (item, type) => {
      return JSON.stringify({
          status: 'success',
          message: `${type} agregado correctamente`,
          data: item
      });
  },

  formatError: (message) => {
      return JSON.stringify({
          status: 'error',
          message: message
      });
  },

  formatEditResponse: (item, type) => {
    return JSON.stringify({
        status: 'success',
        message: `${type} actualizado correctamente`,
        data: item
        });
    },

  formatDeleteResponse: (item, type) => {
    return JSON.stringify({
        status:'success',
        message: `${type} eliminado correctamente`,
        data: item
        });
    }
};

module.exports = formatResponse;