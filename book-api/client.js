
const net = require('net')
const readline = require("readline");
const { v4: uuidv4 } = require('uuid');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const client = net.createConnection({ port: 8080, host: 'localhost'});

function showMenu() {
    console.log('\n--- Book API Menu ---');
    console.log('1. GET BOOKS');
    console.log('2. ADD BOOK');
    console.log('3. EDIT BOOK');
    console.log('4. DELETE BOOK');
    console.log('5. GET AUTHORS');
    console.log('6. ADD AUTHOR');
    console.log('7. EDIT AUTHOR');
    console.log('8. DELETE AUTHOR');
    console.log('9. GET PUBLISHERS');
    console.log('10. ADD PUBLISHER');
    console.log('11. EDIT PUBLISHER');
    console.log('12. DELETE PUBLISHER');
  
    console.log('13. Exit');
    
    rl.question('Selecciona una opción (Ingresar solo el número): ', handleOption);
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
            editBooks();
            break;
        case '4':
            deleteBook();
            break;
        case '5':
            client.write('GET AUTHORS');
            break;
        case '6':
            addAuthor();
            break;
        case '7' :
            editAuthor();
            break;
        case '8':
            deleteAuthor();
            break;
        case '9':
            client.write('GET PUBLISHERS');
            break;
        case '10':
            addPublisher();
            break;
        case '11':
            editPublisher();
            break;
        case '12':
            deletePublisher();
            break;
        case '13':
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
    book.id = uuidv4();
    rl.question('Title Book: ', (title) => {
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

function editBooks() {
    const book = {};
    rl.question('ID del libro a editar: ', (id) => {
        book.id = id;
        rl.question('New Title: ', (title) => {
            if (title) book.title = title;
            rl.question('New Author: ', (author) => {
                if (author) book.author = author;
                rl.question('New publisher: ', (publisher) => {
                    if (publisher) book.publisher = publisher;
                    client.write(`EDIT BOOK ${JSON.stringify(book)}`);
                });
            });
        });
    });
}

function deleteBook() {
    rl.question('ID del libro a eliminar: ', (id) => {
        client.write(`DELETE BOOK ${id}`);
    });
}

function addAuthor() {
    const author = {};
    author.id = uuidv4();
    rl.question('Name author: ', (name) => {
        author.name = name;
        rl.question('Country: ', (country) => {
            author.country = country;
            client.write(`ADD AUTHOR ${JSON.stringify(author)}`);
        });
    });
}

function editAuthor() {
    const author = {};
        rl.question('ID del Author a editar: ', (id) => {
            author.id = id;
        rl.question('New name author: ', (name) => {
            author.name = name;
            rl.question('Country: ', (country) => {
                author.country = country;
                client.write(`EDIT AUTHOR ${JSON.stringify(author)}`);
            });
        });
    });
}

function deleteAuthor() {
    rl.question('ID del author a eliminar: ', (id) => {
        client.write(`DELETE AUTHOR ${id}`);
    });
}

function addPublisher() {
    const publisher = {};
    publisher.id = uuidv4();
    rl.question('Name publisher: ', (name) => {
        publisher.name = name;
        rl.question('Country: ', (country) => {
            publisher.country = country;
        rl.question('Founded Year: ', (year) => {
            publisher.foundedYear = year;
            client.write(`ADD PUBLISHER ${JSON.stringify(publisher)}`);
             });
        });
    }
)};

function editPublisher() {
    const publisher = {};
    rl.question('ID editorial a editar: ', (id) => {
        publisher.id = id;
        rl.question('New name publisher: ', (name) => {
            if (name) publisher.name = name;
            rl.question('New country: ', (country) => {
                if (country) publisher.country = country;
                rl.question('New foundedYear: ', (year) => {
                    if (year) publisher.foundedYear = year
                    client.write(`EDIT PUBLISHER ${JSON.stringify(publisher)}`);
                });
            });
        });
    });
}

function deletePublisher() {
    rl.question('ID del editorial a eliminar: ', (id) => {
        client.write(`DELETE PUBLISHER ${id}`);
    });
}


client.on('connect', () => {
    console.log("Conectado al servidor");
    showMenu();
});

client.on('data', (data) => {
    console.log("\n=== RESPUESTA SERVIDOR ===");
    const response = JSON.parse(data.toString());
    
    if (response.status === 'success') {
        if (response.data) {
            if (Array.isArray(response.data)) {
                console.log('\nListado:');
                console.log(JSON.stringify(response.data, null, 2));
            }
        } else if (response.message) {
            console.log('Mensaje:', response.message);
        }
    }
    
    if (response.message && (response.book || response.author || response.publisher)) {
        console.log('Mensaje:', response.message);
        const itemData = response.book || response.author || response.publisher;
        console.log(JSON.stringify(JSON.parse(itemData), null, 2));
    }
    
    console.log('\n============================');
    showMenu();
});

client.on('close', () => {
    console.log('Conexión cerrada');
});

client.on('error', (error) => {
    console.error('Error de conexión:', error);
});

