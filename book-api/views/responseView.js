const formatResponse = {
  // Formatea la respuesta para libros
  formatBooks: (books) => {
    if (books.length === 0) {
      return JSON.stringify({
        status: "success",
        message: "No hay libros para mostrar",
        data: [],
      });
    }
    return JSON.stringify({
      status: "success",
      data: books,
    });
  },

  // Formatea la respuesta para autores
  formatAuthors: (authors) => {
    if (authors.length === 0) {
      return JSON.stringify({
        status: "success",
        message: "No hay autores para mostrar",
        data: [],
      });
    }
    return JSON.stringify({
      status: "success",
      data: authors,
    });
  },

  // Formatea la respuesta para editoriales
  formatPublishers: (publishers) => {
    if (publishers.length === 0) {
      return JSON.stringify({
        status: "success",
        message: "No hay editoriales para mostrar",
        data: [],
      });
    }
    return JSON.stringify({
      status: "success",
      data: publishers,
    });
  },

  // Formatea la respuesta para agregar un nuevo elemento
  formatNewItem: (item, type) => {
    return JSON.stringify({
      status: "success",
      message: `${type} agregado correctamente`,
      data: item,
    });
  },

  // Formatea la respuesta para errores
  formatError: (message) => {
    return JSON.stringify({
      status: "error",
      message: message,
    });
  },

  // Formatea la respuesta para editar un elemento
  formatEditResponse: (item, type) => {
    return JSON.stringify({
      status: "success",
      message: `${type} actualizado correctamente`,
      data: item,
    });
  },

  // Formatea la respuesta para eliminar un elemento
  formatDeleteResponse: (item, type) => {
    if (!item) {
      return JSON.stringify({
        status: "error",
        message: `${type} no encontrado`,
        data: [],
      });
    }
    return JSON.stringify({
      status: "success",
      message: `${type} eliminado correctamente`,
      data: item,
    });
  },
};

module.exports = formatResponse;