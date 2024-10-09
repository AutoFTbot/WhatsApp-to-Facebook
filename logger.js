const fs = require('fs');
const path = require('path');

function log(message) {
    const logMessage = `[${new Date().toISOString()}] ${message}\n`;
    console.log(logMessage);
    fs.appendFileSync(path.resolve(__dirname, 'app.log'), logMessage);
}

function error(message) {
    const errorMessage = `[${new Date().toISOString()}] ERROR: ${message}\n`;
    console.error(errorMessage);
    fs.appendFileSync(path.resolve(__dirname, 'app.log'), errorMessage);
}

module.exports = { log, error };