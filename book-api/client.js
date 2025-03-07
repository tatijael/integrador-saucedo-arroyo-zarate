
const net = require('net')
const readline = require("readline-sync");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const client = net.createConnection({ port: 8080, host: 'localhost'});

client.on('connect', () => {
  console.log("Conectado al servidor")

  rl.question('Escribe un comando (GET BOOK | GET AUTHOR | GET PUBLISHER | ADD BOOK | ADD AUTHOR | ADD PUBLISHER),', (command) => {
    client.write(command);
  })
})

client.on('data', (data) => {
  console.log("Respuesta del servidor: ")
  console.log(data.toString())

  rl.close();

  client.destroy();
})


client.on('close', () => {
  console.log('Conexión cerrada')
})
