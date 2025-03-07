const net = require('net');

const bookController = require('./controllers/booksController');
const authorController = require('./controllers/authorController');
const pusblisherController = require('./controllers/publisherController');

const { v4: uuidv4 } = require('uuid');
