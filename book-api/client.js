
const net = require('net')
const readline = require("readline");
const { editBook } = require('./controllers/booksController');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const client = net.createConnection({ port: 8080, host: 'localhost'});

function showMenu() {
    console.log('\n--- Book API Menu ---');
    console.log('1. GET BOOKS');
    console.log('2. ADD BOOK');
    console.log('3. GET AUTHOR');
    console.log('4. ADD AUTHOR');
    console.log('5. GET PUBLISHER');
    console.log('6. ADD PUBLISHER');
    console.log('7. EDIT BOOK');
    console.log('8. Exit');
    
    rl.question('Selecciona una opción: ', handleOption);
}

function handleOption(option) {
    switch(option) {
        case '1':
            client.write('GET BOOKS');
            break;
        case '2':
            addBook();
            break;
        case '3':
            client.write('GET AUTHOR');
            break;
        case '4':
            addAuthor();
            break;
        case '5':
            client.write('GET PUBLISHER');
            break;
        case '6':
            addPublisher();
            break;
        case '7':
            editBooks();
            break;
        case '8':
            console.log('Adios!');
            client.destroy();
            rl.close();
            break;
        default:
            console.log('Opción inválida');
            showMenu();
    }
}

function addBook() {
    const book = {};
    rl.question('Title: ', (title) => {
        book.title = title;
        rl.question('Author: ', (author) => {
            book.author = author;
            rl.question('Publisher: ', (publisher) => {
                book.publisher = publisher;
                client.write(`ADD BOOK ${JSON.stringify(book)}`);
            });
        });
    });
}

function addAuthor() {
    const author = {};
    rl.question('Name: ', (name) => {
        author.name = name;
        rl.question('Country: ', (country) => {
            author.country = country;
            client.write(`ADD AUTHOR ${JSON.stringify(author)}`);
        });
    });
}

function addPublisher() {
    const publisher = {};
    rl.question('Name: ', (name) => {
        publisher.name = name;
        rl.question('Location: ', (location) => {
            publisher.location = location;
            client.write(`ADD PUBLISHER ${JSON.stringify(publisher)}`);
        });
    });
}

function editBooks() {
    const newBook = {};
    rl.question('ID: ', (id) => {
        rl.question('Title: ', (title) => {
            newBook.title = title;
            rl.question('Author: ', (author) => {
                newBook.author = author;
                rl.question('Publisher: ', (publisher) => {
                    newBook.publisher = publisher;
                    client.write(`EDIT BOOK ${JSON.stringify(id, newBook)}`)
                    console.log("newBook", newBook);
                    });
                });
            });
        });
};
  

client.on('connect', () => {
    console.log("Conectado al servidor");
    showMenu();
});

client.on('data', (data) => {
    console.log("\nServidor responde:");
    console.log(data.toString());
    showMenu();
});

client.on('close', () => {
    console.log('Conexión cerrada');
});

client.on('error', (error) => {
    console.error('Error de conexión:', error);
});

