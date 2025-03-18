

#  📚 API de Gestión de Biblioteca

Esta API permite la gestión de una biblioteca mediante un servidor TCP implementado en Node.js. Facilita la administración de libros, autores y editoriales, almacenando los datos en archivos JSON locales.

##  📋 Requisitos Previos

Para ejecutar este proyecto, asegúrate de contar con:

- Node.js (versión 14 o superior)

- npm (gestor de paquetes de Node.js)

### 🔧 Instalación y Uso

Clonar el repositorio:

- git clone <https://github.com/tatijael/integrador-saucedo-arroyo-zarate/tree/main/book-api>


Instalar las dependencias:

- npm install

Iniciar el servidor:

- npm start

# 📌 Comandos Disponibles

## 📖 Gestión de Libros

**GET BOOKS**: Lista todos los libros

**ADD BOOK**: Agrega un nuevo libro (título, autor, editorial)

**EDIT BOOK**: Edita un libro existente por ID

**DELETE BOOK**: Elimina un libro existente por ID

 ## ✍️ Gestión de Autores

**GET AUTHORS**: Lista todos los autores

**ADD AUTHOR**: Agrega un nuevo autor (nombre, país)

**EDIT AUTHOR**: Edita un autor existente por ID

**DELETE AUTHOR**: Elimina un autor existente por ID

## 🏢 Gestión de Editoriales

**GET PUBLISHERS**: Lista todas las editoriales

**ADD PUBLISHER**: Agrega una nueva editorial (nombre, ubicación)

**EDIT PUBLISHER**: Edita una editorial existente por ID

**DELETE PUBLISHER**: Elimina una editorial existente por ID

 ## 🚀 Características

  ✔️Interfaz de menú interactivo que permite a los clientes navegar y utilizar las distintas opciones de la API de manera sencilla.

 ✔️ Gestión completa de libros, autores y editoriales (listar, agregar, editar, eliminar)

 ✔️ Almacenamiento persistente en archivos JSON

✔️ Comunicación eficiente mediante servidor TCP

✔️ Generación automática de IDs únicos

✔️ Manejo robusto de errores y validaciones

## 🤝 Autores

Saucedo

Arroyo

Zárate