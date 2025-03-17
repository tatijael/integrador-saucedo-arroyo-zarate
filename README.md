##📚 API de Gestión de Biblioteca

Este proyecto es una API para gestionar una biblioteca utilizando un servidor TCP implementado en Node.js. 
Permite manejar libros, autores y editoriales, almacenando los datos en archivos JSON locales.

## 📋 Requisitos Previos

-e Node.js (versión 14 o superior)
- npm (gestor de paquetes d Node.js)

## 🔧 Instalación y Uso

- Clonar el repositorio
- Instalar dependencias: npm install
- Correr el proyecto: npm start

### Comandos Disponibles
- GET BOOKS: Lista todos los libros
- ADD BOOK: Agrega un nuevo libro (título, autor, editorial)
- EDIT BOOK: Edita un libro existente por id 
- DELETE BOOK: Elimina un libro existente por id

- GET AUTHORS: Lista todos los autores
- ADD AUTHOR: Agrega un nuevo autor (nombre, país)
- EDIT AUTHOR: Edita un autor existente por id 
- DELETE AUTHORS: Elimina un autor existente por id

- GET PUBLISHERS: Lista todas las editoriales
- ADD PUBLISHER: Agrega una nueva editorial (nombre, ubicación)
- EDIT PUBLISHER: Edita una editorial existente por id
- DELETE PUBLISHER: Elimina un editorial existente por id

## 🚀 Características

- Gestión completa de libros (listar, agregar, editar, eliminar)
- Gestión de autores (listar, agregar, editar, eliminar)
- Gestión de editoriales (listar, agregar, editar, eliminar)
- Almacenamiento persistente en archivos JSON
- Comunicación mediante servidor TCP
- Generación automática de IDs únicos
- Manejo de errores y validaciones

## ✨ Autores
- Saucedo
- Arroyo
- Zarate