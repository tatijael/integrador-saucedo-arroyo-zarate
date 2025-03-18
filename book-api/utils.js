const { exec } = require('child_process');
const os = require('os');

function powerOff() {
    const platform = os.platform();
    let command;

    switch (platform) {
        case 'darwin': // MacOS
            command = 'kill -9 $(lsof -ti:8080)';
            break;
        case 'win32': // Windows
            command = 'FOR /F "tokens=5" %P IN (\'netstat -a -n -o ^| findstr :8080\') DO TaskKill /PID %P /F';
            break;
        default: // Linux and others
            command = 'fuser -k 8080/tcp';
            break;
    }

    exec(command, (error) => {
        if (!error) {
            console.log('Servidor detenido correctamente');
        }
        console.log('¡Adios!');
        process.exit(0);
    });
}

module.exports = {
    powerOff
};